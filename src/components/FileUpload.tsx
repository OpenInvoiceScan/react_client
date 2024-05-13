import React from 'react';
import axios from 'axios';
import { useForm, SubmitHandler } from 'react-hook-form';

interface IFormInput {
  files: FileList;
}

export default function PDFUpload() {
  const { register, handleSubmit, formState: { errors } } = useForm<IFormInput>();

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    const formData = new FormData();
    Array.from(data.files).forEach(file => {
      formData.append('files', file);
    });

    try {
      const response = await axios.post('http://127.0.0.1:5000/pdf_upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log('Response:', response.data);
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="fileInput">Upload PDF</label>
        <input
          type="file"
          id="fileInput"
          {...register('files', { required: true })}
          multiple
          accept="application/pdf"
        />
        {errors.files && <span>This field is required</span>}
      </div>
      <button type="submit">Upload</button>
    </form>
  );
}