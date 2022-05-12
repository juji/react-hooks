import { useRef } from 'react'


export default function useTimeout(){


  const t = useRef()

  function clear(){
    if(t.current) clearTimeout(t.current)
    t.current = null
  }

  function timeout(fn, n){
    clear()
    t.current = setTimeout(fn,n)
  }


  return [
    timeout, clear
  ]

}
