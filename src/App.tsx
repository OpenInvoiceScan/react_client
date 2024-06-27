import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import PDFDropzone from "./components/PDFDropzone";
import Header from "./components/Header";
import PDFFiles from "./components/PDFFiles";
import axios from "axios";
import useFiles from "./useFiles";
import LoaderSpinner from "./components/Loader";
import FinishMessage from "./components/FinishMessage";
import ExtractViewer from "./components/ExtractViewer";
import { FormControlLabel, Switch } from "@mui/material";

function App() {

  const { error, files, finished, loading, onDrop, invoices, onlyJson, handleJsonOption } = useFiles();

  /*
  useEffect(() => {
    if (finished) {
      //Reload the page after 5 seconds
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    }

  }, [loading, finished, files, error]);

  */
  const handleSwitchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    handleJsonOption(event.target.checked);
  };


  return (
    <>
      <main>
        <Header></Header>
        {!loading && <FormControlLabel
          control={
            <Switch
              checked={onlyJson}
              onChange={handleSwitchChange}
              name="onlyJsonSwitch"
              color="primary"
            />
          }
          label="Only JSON"
        />}
        {!loading && !finished && <PDFDropzone onDrop={onDrop}></PDFDropzone>}
        {loading && !finished && <LoaderSpinner></LoaderSpinner>}
        {!onlyJson && finished && <FinishMessage></FinishMessage>}
        {onlyJson && finished && <ExtractViewer invoices={invoices}></ExtractViewer>}
        {error && <p>{error}</p>}



      </main>
    </>
  );
}

export default App;
