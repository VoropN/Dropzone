import * as React from 'react';
import { FileInfo } from './FileInfo';
import { IFile } from '../types';

interface IFileUploader {
  file: IFile;
  progress?: number;
}

export const FileUploader = React.memo(({ file, progress }: IFileUploader) => {
  return (
    <div>
      <FileInfo file={file} />
      {(progress || file.loaded) && <progress max="100" value={progress} />}
    </div>
  );
});
