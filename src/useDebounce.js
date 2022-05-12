import { useRef } from 'react'

export default function useDebounce( t = 500 ){

  const r = useRef()
  const debounce = (fn) => {
    if(r.current) clearTimeout(r.current)
    r.current = setTimeout(() => fn(),t)
  }

  return debounce;

}

export function DebounceRef(t = 500) {

  let _timeout;

  this.run = (fn, t2) => {
    if(_timeout) clearTimeout(_timeout)
    _timeout = setTimeout(() => {
      fn()
    }, t2 || t)
  }

}
