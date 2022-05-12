import { useState } from 'react'

export default function useToggle(init){

  const [ state, setState ] = useState(!!init)
  const toggle = () => setState(!state)

  return [ state, toggle, setState ]

}
