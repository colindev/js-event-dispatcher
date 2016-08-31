(function(factory){
    self.define && self.define.amd && define(factory) || (self['EventDispatcher'] = factory()); 
})(function(){ "use strict";
    
    function init(){
        var handlers = {};
        return {
            on: function(event, handler){
                if (typeof handler != 'function') {
                    console.error('args 2 must be a function');
                    return
                }
                handlers[event] = handlers[event] || [];
                handlers[event].push(handler);
                return this;
            },
            off: function(event, handler){
                if (handlers[event]) {
                    var i = handlers[event].length;
                    while (i-- > 0) {
                        if (handler == handlers[event][i]) {
                            handlers[event].splice(i, 1);
                        }
                    }
                }

                return this;
            },
            trigger: function(event, data){
                if (handlers[event]) {
                    var i = handlers[event].length;
                    while (i-- > 0) {
                        handlers[event][i].call(this, data);
                    }
                }

                return this
            }
        }
    }

    function extend(target, o) {
        for (var fn in o) {
            if (o.hasOwnProperty(fn)) target[fn] = o[fn];
        }

        return target;
    }

    return {
        init: function(obj){
            return extend(obj, init());
        }
    };
});
