import { useState, useRef } from 'react';
import Input from '@mui/material/Input';
import Button from '@mui/material/Button';
import toast, { Toaster } from 'react-hot-toast';

export default function Upload() {
  const [file, setFile] = useState();
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

  // const fileInputRef = useRef();

  // const handleFileSelected = (file) => {
  //   console.log('Selected file:', file);
  //   // Process the selected file, e.g., upload it to your server or read its contents
  // };

  // const handleButtonClick = () => {
  //   if (fileInputRef.current) {
  //     fileInputRef.current.click();
  //   }
  //   uploadFile();
  // };

  // const handleFileChange = (e) => {
  //   if (e.target.files && e.target.files.length > 0) {
  //     handleFileSelected(e.target.files[0]);
  //   }
  // };

  // const uploadFile = async (e) => {
  //   const showName = e.target.show.value;
  //   const episodeName = e.target.episode.value;
  //   const S3URL = await retrieveURL();
  //   const file = e.target.file.value;
  //   console.log(file);
  //   const upload = await fetch(S3URL, {
  //     method: 'PUT',
  //     body: fileInputRef,
  //   });
  //   if (upload.ok) {
  //     toast.success('Uploaded successfully!');
  //   } else {
  //     toast.error('Upload failed.');
  //   }
  //   setFile(null);
  // };

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
/*
const [selectedFile, setSelectedFile] = useState();

const changeHandler = (event) => {
  setSelectedFile(event.target.files[0]);
  setIsFilePicked(true);
};

const handleSubmission = () => {
  const formData = new FormData();

  formData.append('File', selectedFile);

  fetch('S3URL', {
    method: 'put',
    body: formData,
  })
    .then((response) => response.json())
    .then((result) => {
      console.log('Success:', result);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
};

return (
  <div>
    <input type="file" name="file" onChange={changeHandler} />
    <div>
      <button onClick={handleSubmission}>Submit</button>
    </div>
  </div>
);
*/
