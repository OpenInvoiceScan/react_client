import React from 'react'
import DownloadIcon from '../assets/download.svg'

export default function FinishMessage() {

  return (
    <div className='download-container'>
        <p>La descarga ha comenzado</p>
        <img src={DownloadIcon} alt='Download Icon'className='download-icon' />
    </div>
  )

}
