import * as React from 'react';
import axios from 'axios';
import { showNotification } from '@mantine/notifications';

import { FileUploader } from '../FileUploader';
import { IFile } from '../types';
import { Button } from '@mantine/core';

import style from './style.module.scss';

export const FileSet = React.memo(
  ({ files, updateFile }: { files: IFile[]; updateFile: any }) => {
    const [uploadingProgress, setUploadingProgress] = React.useState({
      fileIndex: -1,
      value: 0,
    });
    const onUploadFiles = async () => {
      let fileIndex = 0;
      for await (const file of files) {
        const formData = new FormData();
        formData.append(file.name, file.file);
        await axios
          .post('/api/save-file', formData, {
            onUploadProgress: (progressEvent: ProgressEvent) => {
              const { loaded, total } = progressEvent;
              const precentage = Math.floor((loaded * 100) / total);
              setUploadingProgress({ value: precentage, fileIndex });
            },
          })
          .catch((err) =>
            showNotification({
              title: `Error ${file.name}`,
              message: err.message,
              color: 'red',
            })
          );
        updateFile(fileIndex++, { ...file, loaded: true });
      }
    };

    return (
      <div>
        {files.map((file, idx) => (
          <FileUploader
            file={file}
            key={`${file.name}-idx-${idx}`}
            progress={
              uploadingProgress.fileIndex === idx
                ? uploadingProgress.value
                : file.loaded
                ? 100
                : 0
            }
          />
        ))}
        {uploadingProgress.fileIndex === -1 && (
          <Button className={style.uploadButton} onClick={onUploadFiles}>
            Upload
          </Button>
        )}
      </div>
    );
  }
);
