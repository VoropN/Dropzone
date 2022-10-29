import * as React from 'react';
import { FileInfo } from '../FileInfo';
import { IFile } from '../types';

interface IFileStatus {
  file: IFile;
  progress: number | null;
  loaded?: boolean;
  updateFile: (file: IFile) => void;
}

export const FileStatus = React.memo(
  ({ file, progress, updateFile }: IFileStatus) => {
    return (
      <div>
        <FileInfo file={file} updateFile={updateFile} />
        {(file.loaded || progress) && (
          <progress max="100" value={file.loaded ? 100 : progress} />
        )}
      </div>
    );
  }
);
