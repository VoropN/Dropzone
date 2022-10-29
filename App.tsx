import * as React from 'react';
import { MantineProvider } from '@mantine/core';
import { NotificationsProvider } from '@mantine/notifications';
import { Dropzone } from './src/Dropzone';
import { IFileSet, IFile } from './src/types';
import { FileSet } from './src/FileSet';

import './style.scss';

export default function App() {
  const [fileSets, setFileSets] = React.useState<IFileSet[]>([]);
  const addNewFileSet = React.useCallback(
    (iFileSet: IFileSet) => setFileSets((state) => [...state, iFileSet]),
    [setFileSets]
  );
  const updateFile = React.useCallback(
    (setIndex: number) => (fileIndex: number, newFile: IFile) =>
      setFileSets((state) => [
        ...state.slice(0, setIndex),
        {
          files: [
            ...state[setIndex].files.slice(0, fileIndex),
            newFile,
            ...state[setIndex].files.slice(fileIndex + 1),
          ],
        },
        ...state.slice(setIndex + 1),
      ]),
    [setFileSets]
  );

  return (
    <MantineProvider withNormalizeCSS withGlobalStyles>
      <NotificationsProvider>
        {fileSets.map(({ files }, idx) => (
          <FileSet files={files} key={idx} updateFile={updateFile(idx)} />
        ))}
        <Dropzone addNewFileSet={addNewFileSet} />
      </NotificationsProvider>
    </MantineProvider>
  );
}
