import * as React from 'react';
import axios from '../api/axios';
import { Button } from '@mantine/core';
import { FileInfo } from './FileInfo';
import { IFile } from '../types';

import style from './style.module.scss';

interface IFileUploader {
  file: IFile;
  progress: number;
}

export const FileUploader = React.memo(({ file, progress }: IFileUploader) => {
  return (
    <div>
      <FileInfo file={file} />
      {(progress || file.loaded) && <progress max="100" value={progress} />}
    </div>
  );
});
