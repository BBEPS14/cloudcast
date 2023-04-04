import { useState } from 'react';

export default function Upload() {
  const [message, setMessage] = useState();
  const [file, setFile] = useState();

  const uploadFile = async (e) => {
    const file = e.target.files?.[0];
    const filename = encodeURIComponent(file.name);
    const fileType = encodeURIComponent(file.type);
    setFile(file);
    const res = await fetch(
      `/api/upload?file=${filename}&fileType=${fileType}`
    );
    const { url, fields } = await res.json();
    const formData = new FormData();

    Object.entries({ ...fields, file }).forEach(([key, value]) => {
      formData.append(key, value);
    });

    const upload = await fetch(url, {
      method: 'POST',
      body: formData,
    });

    if (upload.ok) {
      console.log('Uploaded successfully!');
    } else {
      console.error('Upload failed.');
    }
  };

  return (
    <>
      <p>Upload an audio file.</p>
      <input onChange={uploadFile} type="file" />
    </>
  );
}
