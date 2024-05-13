import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import FileUpload from './components/FileUpload'

function App() {
  const [text, setText] = useState('Hello Vite + React!')

  useEffect(() => {
    fetch("http://127.0.0.1:5000").then((res) => res.text()).then(setText)
  }, [])


  return (
    <>
      <FileUpload></FileUpload>
    </>
  )
}

export default App
