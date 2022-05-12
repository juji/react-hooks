import { useEffect, useState } from 'react'


export default function useArray(array){

  const [ value, setValue ] = useState(array)

  useEffect(() => {
    setValue( array )
  },[ array ])

  const replace = (index, data) => {
    const copy = [
      ...value.slice(0,index),
      data,
      ...value.slice(index+1),
    ]
    setValue(copy)
    return copy
  }

  const swap = (index1, index2) => {
    let copy = [ ...value ]
    [
      copy[index2],
      copy[index1]
    ] = [
      copy[index1],
      copy[index2]
    ]
    setValue(copy)
    return copy
  }

  const move = (oldIndex, newIndex) => {
    let copy = [ ...value ]
    copy.splice(newIndex, 0, copy.splice(oldIndex,1)[0])
    setValue(copy)
    return copy
  }

  const remove = (index) => {
    const copy = [
      ...value.slice(0,index),
      ...value.slice(index+1),
    ]
    setValue(copy)
    return value[index]
  }

  function push(){
    const copy = [
      ...value,
      ...arguments,
    ]
    setValue(copy)
    return copy
  }

  function unshift(){
    const copy = [
      ...arguments,
      ...value,
    ]
    setValue(copy)
    return copy
  }

  const pop = () => {
    setValue([
      ...value.slice(0,-1),
    ])
    return value[value.length-1]
  }

  const shift = () => {
    setValue([
      ...value.slice(1),
    ])
    return value[0]
  }

  function splice(){
    const copy = [...value]
    const ret = copy.splice.apply(value, [...arguments])
    setValue(copy)
    return ret
  }

  function sort(fn){
    const copy = [...value].sort(fn)
    setValue(copy)
    return copy
  }

  function reverse(){
    const copy = [...value].reverse()
    setValue(copy)
    return copy
  }

  return [
    value,
    {
      setValue,
      replace,
      swap,
      move,
      remove,
      push,
      unshift,
      pop,
      shift,
      splice,
      sort,
      reverse,
    }
  ]

}
