import React from 'react'
import Loader from 'react-loaders'
import 'loaders.css/loaders.min.css'


export default function LoaderSpinner() {
  return (
    <>
        <div className='loader-container'>
        <p>Procesando archivos, por favor espere...</p>
        <Loader type='ball-pulse-sync' active innerClassName='loader' ></Loader>
        </div>
    </>
  )
}
