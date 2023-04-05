import { useState } from 'react';
import { Box, TextField, Button, Grid } from '@mui/material';
import toast, { Toaster } from 'react-hot-toast';
import { PhotoCamera, AudioFile, CloudUpload } from '@mui/icons-material';

export default function Upload() {
  const [show, setShow] = useState();
  const [episode, setEpisode] = useState();
  const [description, setDescription] = useState();
  const [selectedImage, setSelectedImage] = useState();
  const [selectedAudio, setSelectedAudio] = useState();
  const [imageURL, setImageURL] = useState();
  const [audioURL, setAudioURL] = useState();

  const retrieveURL = async (type) => {
    if (!type) return;
    const baseURL = new URL(
      'https://rx1l25hr33.execute-api.us-east-2.amazonaws.com/test'
    );
    const paramsObj = new URLSearchParams([
      ['show_title', show],
      ['filename', type],
    ]);
    baseURL.search = paramsObj.toString();
    const res = await fetch(baseURL);
    const { url } = await res.json();
    console.log(`successfully retrieved ${url} for ${type}`);
    if (type === 'image') {
      setImageURL(url);
    } else {
      setAudioURL(url);
    }
  };

  const changeHandler = (event, type) => {
    console.log('changeHandler was hit');
    if (type === 'audio') {
      setSelectedAudio(event.target.files[0]);
    } else if (type === 'image') {
      setSelectedImage(event.target.files[0]);
    }
  };

  const handleSubmission = async (e) => {
    e.preventDefault();
    if (!audioURL && !imageURL) {
      return;
    }
    console.log('handleSubmission was hit');
    let upload;
    if (imageURL) {
      const formData = new FormData();
      formData.append('File', selectedImage);
      upload = fetch(imageURL, {
        method: 'PUT',
        body: selectedImage,
      });
    }

    if (audioURL) {
      const formData = new FormData();
      formData.append('File', selectedAudio);
      upload = fetch(audioURL, {
        method: 'PUT',
        body: selectedAudio,
      });
    }

    toast.promise(upload, {
      loading: 'Uploading...',
      success: 'Uploaded successfully!',
      error: 'Upload failed.',
    });
    setImageURL(null);
    setAudioURL(null);
  };

  return (
    <>
      <Toaster />
      <Box
        sx={{
          width: 300,
          height: 360,
          display: 'flex',
          flexDirection: 'column',
        }}
        component="form"
        justifyContent="space-around"
        alignItems="center"
        onSubmit={handleSubmission}
      >
        <TextField
          label="Show Title"
          variant="outlined"
          size="small"
          type="text"
          id="show"
          name="show"
          onChange={(e) => setShow(e.target.value)}
        ></TextField>
        <TextField
          label="Episode Name"
          variant="outlined"
          size="small"
          type="text"
          id="episode"
          name="episode"
          onChange={(e) => setEpisode(e.target.value)}
        ></TextField>
        <TextField
          label="Episode Description"
          variant="outlined"
          size="small"
          type="text"
          id="description"
          name="description"
          onChange={(e) => setDescription(e.target.value)}
        ></TextField>
        <Button variant="outlined" component="label" endIcon={<PhotoCamera />}>
          Upload Image
          <input
            hidden
            accept="image/*"
            id="image-upload"
            type="file"
            name="image"
            onChange={(e) => changeHandler(e, 'image')}
            onClick={() => retrieveURL('image')}
          />
        </Button>
        <Button variant="outlined" component="label" endIcon={<AudioFile />}>
          Upload Audio
          <input
            hidden
            accept="audio/*"
            type="file"
            name="file"
            onClick={() => retrieveURL(episode)}
            onChange={(e) => changeHandler(e, 'audio')}
          ></input>
        </Button>
        <Button type="submit" variant="contained" endIcon={<CloudUpload />}>
          Upload
        </Button>
      </Box>
    </>
  );
}
