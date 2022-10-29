import * as React from 'react';
import { Dropzone } from './src/Dropzone';
import { IFileSet } from './src/types';
import { FileSet } from './src/FileSet';

import './style.scss';

export default function App() {
  const [fileSets, setFileSets] = React.useState<IFileSet[]>([]);
  const addNewFileSet = React.useCallback(
    (iFileSet: IFileSet) => setFileSets((state) => [...state, iFileSet]),
    [setFileSets]
  );
  console.log(fileSets);
  return (
    <div>
      {fileSets.map(({ files }, idx) => (
        <FileSet files={files} key={idx} />
      ))}
      <Dropzone addNewFileSet={addNewFileSet} />
    </div>
  );
}
