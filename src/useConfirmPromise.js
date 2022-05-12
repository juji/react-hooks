import { useState } from 'react'

export default function useConfirmPromise(){

  const [ confirm, setConfirm ] = useState()
  const waitConfirmation = () => new Promise((r,j) => {
    let resolved = false;
    let rejected = false;
    setConfirm({
      confirm(){
        if(rejected) return;
        resolved = true
        r(true)
        setConfirm(null)
      },
      cancel(){
        if(resolved) return;
        rejected = true;
        r(false)
        setConfirm(null)
      },
      close(){
        if(!resolved && !rejected){
          rejected = true
          r(false)
        }
        setConfirm(null)
      }
    })
  })

  return [
    confirm,
    waitConfirmation
  ]

}
