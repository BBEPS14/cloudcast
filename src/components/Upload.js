import { useState, useRef } from 'react';
import Input from '@mui/material/Input';
import Button from '@mui/material/Button';
import toast, { Toaster } from 'react-hot-toast';

export default function Upload() {
  const [show, setShow] = useState();
  const [episode, setEpisode] = useState();

  const retrieveURL = async () => {
    const baseURL = new URL(
      'https://rx1l25hr33.execute-api.us-east-2.amazonaws.com/test'
    );
    const paramsObj = new URLSearchParams([
      ['show_title', show],
      ['episode_filename', episode],
    ]);
    baseURL.search = paramsObj.toString();
    const res = await fetch(baseURL);
    const { url } = await res.json();
    console.log('successfully retrieved ', url);
    setUploadURL(url);
  };

  const [selectedFile, setSelectedFile] = useState();
  const [uploadURL, setUploadURL] = useState();

  const changeHandler = (event) => {
    console.log('changeHandler was hit');
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmission = async (e) => {
    e.preventDefault();
    console.log('handleSubmission was hit');
    const formData = new FormData();
    formData.append('File', selectedFile);
    if (!uploadURL) {
      return;
    }
    const upload = fetch(uploadURL, {
      method: 'PUT',
      body: selectedFile,
    });
    toast.promise(upload, {
      loading: 'Uploading...',
      success: 'Uploaded successfully!',
      error: 'Upload failed.',
    });
  };

  return (
    <>
      <Toaster />
      <form onSubmit={handleSubmission}>
        <label htmlFor="show">Show Title:</label>
        <input
          type="text"
          id="show"
          name="show"
          onChange={(e) => setShow(e.target.value)}
        ></input>
        <label htmlFor="episode">Episode Name:</label>
        <input
          type="text"
          id="episode"
          name="episode"
          onChange={(e) => setEpisode(e.target.value)}
        ></input>
        <br></br>
        <input
          type="file"
          name="file"
          onClick={retrieveURL}
          onChange={changeHandler}
        />
        <input type="submit" value="Upload"></input>
      </form>
    </>
  );
}
