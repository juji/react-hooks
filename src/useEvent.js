// it's just a simple event system

import { useState, useRef } from 'react'


export function SimpleEvent(){

  let callback = {}

  // cache for message emits
  let emitCache = {}

  //
  this.subscribe = (ev, cb) => {

    // random key as id for callback
    const key = 'μ'+Math.random()

    callback[ev] = {
      ...(callback[ev]||{}),
      [key]: cb
    }

    // run the callback if there's something in cache
    emitCache[ev]?.forEach(args => {
      cb.apply(null, args)
    })

    // returning a function to unsubscribe
    return () => {

      const { [key]: asdf, ...restCallback } = callback[ev]

      // remove event if it's empty
      if(!Object.keys(restCallback).length){

        const { [ev]: zxcv, ...restEvent } = callback
        callback = restEvent

      // remove callback
      }else{

        callback[ev] = restCallback

      }
    }
  }

  //
  let clearCacheTimeouts = {}
  this.emit = function(ev){

    const data = [ ...arguments ].slice(1)

    // waiting for subsriber,
    // cache the emit message
    if(!callback[ev]) {

      emitCache[ev] = [
        ...(emitCache[ev]||[]),
        data
      ]

      // clean up emitcache after 5s
      if(clearCacheTimeouts[ev]) clearTimeout(clearCacheTimeouts[ev])
      clearCacheTimeouts[ev] = setTimeout(() => {

        if(!emitCache[ev]) return;
        const { [ev]: asdf, ...rest } = emitCache
        emitCache = rest

        // remove timeout id from `timeouts`
        const { [ev]: ommitTo, ...restTimeouts } = clearCacheTimeouts
        clearCacheTimeouts = restTimeouts

      }, 5000)

      return;
    }

    Object.keys(callback[ev]).forEach(key => {
      callback[ev][key].apply(null, data)
    })

  }

  //
  this.remove = (ev) => {

    if(!ev) return;

    if(typeof ev === 'string'){
      const { [ev]: asdf, ...rest } = callback
      callback = rest
    }

    else if(ev instanceof RegExp){
      Object.keys(callback).forEach(key => {
        if(ev.test(key)){
          const { [key]: asdf, ...rest } = callback
          callback = rest
        }
      })
    }
  }

  this.removeAll = () => {
    callback = {}
  }

  this._getCallback = () => callback

}

export default function useEvent(){

  const [ event, setEvent ] = useState(
    global._μSimpleEvent = global._μSimpleEvent || new SimpleEvent()
  )

  return event

}
