import { useState } from 'react';
import { Dropzone } from './src/Dropzone';
import { FileUploader } from './src/FileUploader';
import './style.scss';

export default function App() {
  const [files, setFiles] = useState<null | File[]>(null);

  return files ? (
    <FileUploader files={files} setFiles={setFiles} />
  ) : (
    <Dropzone setFiles={setFiles} />
  );
}
