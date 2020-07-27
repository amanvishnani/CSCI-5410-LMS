import React, { useState, useEffect } from "react";
import { findAll } from "./UploadFileService";
import { GCF_BASE_URL } from "../BaseUrls";

function UploadFile(props) {
  const [files, setFiles] = useState([]);
  const [onlineFiles, setOnlineFiles] = useState(null);

  async function refreshFiles() {
    try {
      let res = await findAll();
      let _files = [];
      for (const f of res.files) {
        _files.push({
          name: f.name,
          metadata: JSON.stringify(f.metadata),
        });
      }
      setOnlineFiles(_files);
    } catch (error) {
      debugger;
      alert("Somthing went wrong while fetching file list");
    }
  }

  useEffect(() => {
    // @TODO: Get Files
    if (onlineFiles == null) {
      refreshFiles();
    }
    return () => {};
  }, [onlineFiles]);
  async function uploadFiles() {
    if (files.length === 0) {
      alert("Please select file to upload");
    } else {
      const formData = new FormData();
      let file = files[0];
      let name = file.name;
      formData.append(name, files[0]);
      // Ideally Should be in a Service call.
      let resp = await fetch(`${GCF_BASE_URL}/uploadFile`, {
        method: "POST",
        body: formData,
      });
      let result = await resp.json();
      debugger;
      if (result.message === "OK") {
        alert("Upload Complete!");
        refreshFiles();
      }
    }
  }

  return (
    <div>
      <h1 style={{ marginLeft: "1em" }}>Upload file</h1>
      <input
        style={{ marginLeft: "1em", marginTop: "1em" }}
        onChange={(evt) => setFiles(evt.target.files)}
        type="file"
        id="fileUpload"
      />
      <button className="btn btn-info" onClick={(_) => uploadFiles()}>
        Upload
      </button>
      <br />
      <br />
      <button
        style={{ marginLeft: "1em" }}
        className="btn btn-info"
        onClick={(_) => refreshFiles()}
      >
        Refresh Files
      </button>
      <br />
      <br />
      <table style={{ marginLeft: "1em" }}>
        <thead>
          <tr>
            <th>File Name</th>
            <th>Metadata</th>
          </tr>
        </thead>
        <tbody>
          {onlineFiles &&
            onlineFiles.map((file) => {
              return (
                <tr key={file.name}>
                  <td>{file.name}</td>
                  <td>{file.metadata}</td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
}

export default UploadFile;
