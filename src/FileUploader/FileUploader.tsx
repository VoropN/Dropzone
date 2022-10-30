import * as React from 'react';
import axios from 'axios';
import { Button } from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import cn from 'classnames';

import { FileStatus } from '../FileStatus';
import { IFile } from '../types';

import style from './style.module.scss';

interface IFileUploader {
  files: IFile[];
  setFiles: (files: IFile[]) => void;
  updateFile: (newFile: IFile) => void;
}

export const FileUploader = React.memo(
  ({ files, updateFile, setFiles }: IFileUploader) => {
    const [uploadingProgress, setUploadingProgress] = React.useState<
      Record<string, number>
    >({});
    const onUploadFiles = async () => {
      const filesLoaded: IFile[] = [];
      const filesToUpload = files.filter(
        (file) => !file.loaded && !file.inProgress
      );
      setFiles(
        files.map((file) =>
          file.loaded
            ? file
            : { ...file, errors: null, hasError: false, inProgress: true }
        )
      );
      for await (const file of filesToUpload) {
        const formData = new FormData();
        formData.append(file.name, file.file);
        await axios
          .post('/api/save-file', formData, {
            onUploadProgress: (progressEvent: ProgressEvent) => {
              const { loaded, total } = progressEvent;
              const precentage = Math.floor((loaded * 100) / total);
              setUploadingProgress((state) => ({
                ...state,
                [file.id]: precentage,
              }));
            },
          })
          .then(() => {
            updateFile({
              ...file,
              loaded: true,
              inProgress: false,
              errors: null,
              hasErrors: false,
            });
            filesLoaded.push(file);
          })
          .catch((err) => {
            updateFile({
              ...file,
              errors: err.message,
              hasErrors: true,
            });
            showNotification({
              title: 'Error',
              message: `${file.name} was not loaded! ${err.message}`,
              color: 'red',
            });
          });
      }
      showNotification({
        title: `Success`,
        message: `${filesLoaded.length} files loaded. ${filesLoaded
          .map(({ name }) => name)
          .join(', ')}`,
      });
    };

    return (
      <div>
        <Button
          className={cn(style.uploadButton, {
            [style.hideUploadButton]: files.every((file) => file.loaded),
          })}
          onClick={onUploadFiles}
        >
          Upload
        </Button>

        {files.map((file) => (
          <FileStatus
            file={file}
            key={file.id}
            updateFile={updateFile}
            progress={uploadingProgress[file.id]}
          />
        ))}
      </div>
    );
  }
);
