import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import PDFDropzone from "./components/PDFDropzone";
import Header from "./components/Header";
import PDFFiles from "./components/PDFFiles";
import axios from "axios";
import useFiles from "./useFiles";
import Loader from "./components/Loader";
import LoaderSpinner from "./components/Loader";
import FinishMessage from "./components/FinishMessage";

function App() {

  const { error, files, finished, loading, onDrop} = useFiles();

  useEffect(() => {
    if (finished) {
      //Reload the page after 5 seconds
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    }

  }, [loading, finished, files, error]);

  return (
    <>
      <main>
        <Header></Header>

        {!loading && !finished && <PDFDropzone onDrop={onDrop}></PDFDropzone>}
        {loading && !finished && <LoaderSpinner></LoaderSpinner>}
        {finished && <FinishMessage></FinishMessage>}
      </main>
    </>
  );
}

export default App;
