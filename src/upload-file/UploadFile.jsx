import React, { useState } from 'react'
import PropTypes from 'prop-types'

function UploadFile(props) {
    const [files, setFiles] = useState([])
    async function uploadFiles() {
        if(files.length == 0) {
            alert("Please select file to upload")
        } else {
            const formData = new FormData()
            let file = files[0]
            let name = file.name;
            formData.append(name, files[0])

            let resp = await fetch('https://us-central1-csci-5410-av.cloudfunctions.net/uploadFile', {
                method: 'POST',
                body: formData
            })
            console.log(await resp.json())
        }
    }

    return (
        <div>
            <h1>Upload file</h1>
            <input onChange={(evt) => setFiles(evt.target.files)} type="file" id="fileUpload" />
            <button onClick={_ => uploadFiles()}>Upload</button>
        </div>
    )
}

UploadFile.propTypes = {

}

export default UploadFile

