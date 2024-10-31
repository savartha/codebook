import  { useEffect } from 'react'

export const useTitle = (title) => {

    useEffect(()=>{
        document.title=`${title} - Code Books`
    },[title])

  return null;
}
