import * as React from 'react';
import { FileInfo } from '../FileInfo';
import { IFile } from '../types';
import style from './style.module.scss';

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
        <progress
          className={style.progressBar}
          max="100"
          value={file.loaded ? 100 : progress ?? 0}
        />
      </div>
    );
  }
);
