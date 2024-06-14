import React from 'react'
import logo from '../assets/logo.png'

export default function Header() {
  return (
    <header>
      <img className="header_logo" src={logo} alt="" />
      <h1 className="header_title">AVALON</h1>
    </header>
  )
}
