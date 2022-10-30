import * as React from 'react';
import { MantineProvider } from '@mantine/core';
import { NotificationsProvider } from '@mantine/notifications';
import { Dropzone } from './src/Dropzone';
import { IFile } from './src/types';
import { FileUploader } from './src/FileUploader';

import './style.scss';

export default function App() {
  const [files, setFiles] = React.useState<IFile[]>([]);
  const addFiles = React.useCallback(
    (files: IFile[]) => setFiles((state) => [...state, ...files]),
    [setFiles]
  );
  const updateFile = React.useCallback(
    (newFile: IFile) =>
      setFiles((state) =>
        state.map((file) => (file.id === newFile.id ? newFile : file))
      ),
    [setFiles]
  );

  return (
    <MantineProvider withNormalizeCSS withGlobalStyles>
      <NotificationsProvider>
        <Dropzone addFiles={addFiles} />
        <FileUploader files={files} updateFile={updateFile} setFiles={setFiles}/>
      </NotificationsProvider>
    </MantineProvider>
  );
}
