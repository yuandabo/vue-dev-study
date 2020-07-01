/* @flow */

import type Watcher from './watcher'
import { remove } from '../util/index'
import config from '../config'

// dep标识计数器
let uid = 0

/**
 * A dep is an observable that can have multiple
 * directives subscribing to it.
 * *dep是一个可以有多个
  *   订阅它的指令。
  * dep对象里面保存watcher数组
 */
/* 
new Dep()
*/
export default class Dep {
  static target: ?Watcher;  // watcher对象
  id: number;
  subs: Array<Watcher>;

  constructor() {  //prototype 
    this.id = uid++
    this.subs = []
  }
  // 加入watcher队列
  addSub (sub: Watcher) {
    this.subs.push(sub)
  }
  // 移除watcher队列
  removeSub (sub: Watcher) {
    remove(this.subs, sub)
  }

  depend () {
    if (Dep.target) {
      // 调用Watch对象的加入依赖队列方法
      Dep.target.addDep(this)
    }
  }

  notify () {
    // stabilize the subscriber list first
    const subs = this.subs.slice()
    if (process.env.NODE_ENV !== 'production' && !config.async) {
      // subs aren't sorted in scheduler if not running async
      // we need to sort them now to make sure they fire in correct
      // order
      subs.sort((a, b) => a.id - b.id)
    }
    for (let i = 0, l = subs.length; i < l; i++) {
      // 调用钩子函数
      subs[i].update()
    }
  }
}

// The current target watcher being evaluated.
// This is globally unique because only one watcher
// can be evaluated at a time.
//正在评估的当前目标观察程序。
//这是全局唯一的，因为只有一个观察者
//可以一次评估。
Dep.target = null
const targetStack = []

export function pushTarget (target: ?Watcher) {
  targetStack.push(target)
  Dep.target = target
}

export function popTarget () {
  targetStack.pop()
  Dep.target = targetStack[targetStack.length - 1]
}
