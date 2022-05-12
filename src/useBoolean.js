import { useState } from 'react'

export default function useBoolean( init ){

  const [ state, setState ] = useState(init||false)
  const setTrue = () => setState(true)
  const setFalse = () => setState(false)
  
  return [
    state,
    setTrue,
    setFalse,
    setState
  ]

}
