import { useState, useEffect, useRef } from 'react'

// if you don't know what this is you should watch more youtube
export default function useLessMachine( init, t = 1000 ){

  const [ state, setState ] = useState( init )
  const timeout = useRef()

  useEffect(() => {
    if(state === init) return undefined;
    if(timeout.current) clearTimeout(timeout.current)
    timeout.current = setTimeout(() => {
      setState(init)
    },t)
  },[ state ])

  const changeState = ( n ) => {
    if(timeout.current) clearTimeout(timeout.current)
    setState(n)
  }

  return [ state, changeState ]

}
