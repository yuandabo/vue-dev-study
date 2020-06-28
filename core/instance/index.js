import { initMixin } from './init'
import { stateMixin } from './state'
import { renderMixin } from './render'
import { eventsMixin } from './events'
import { lifecycleMixin } from './lifecycle'
import { warn } from '../util/index'

function Vue (options) {
  if (process.env.NODE_ENV !== 'production' &&
    !(this instanceof Vue)
  ) {
    warn('Vue is a constructor and should be called with the `new` keyword')
  }
  this._init(options)
}

initMixin(Vue) // Vue.prototype add _init()
stateMixin(Vue)// Vue.prototype add '$data,$props',$set,$delete ,$watch
eventsMixin(Vue)// Vue.prototype add $on,$once,$off,$emit
lifecycleMixin(Vue)// Vue.prototype add   _update, $forceUpdate,$destroy
renderMixin(Vue)

export default Vue
