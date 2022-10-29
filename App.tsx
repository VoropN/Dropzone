import * as React from 'react';
import { Dropzone } from './src/Dropzone';
import { FileUploader } from './src/FileUploader';
import { IFile } from './src/types';

import './style.scss';

export default function App() {
  const [files, setFiles] = React.useState<null | IFile[]>(null);

  return files ? (
    <FileUploader files={files} setFiles={setFiles} />
  ) : (
    <Dropzone setFiles={setFiles} />
  );
}
