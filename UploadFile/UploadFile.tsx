import { memo } from 'react';
import axios from 'axios';
import { Button } from '@mantine/core';
import { FileInfo } from '../FileInfo';

import style from './style.module.scss';

export const UploadFile = memo(({ files }: { files: File[] }) => {
  const onUploadFiles = () => {
    const formData = new FormData();
    files.forEach((file) => formData.append(file.name, file));

    axios.post('./', formData);
    //   .then((res) => {
    //     alert('File Upload success');
    //   })
    //   .catch((err) => alert('File Upload Error'));
  };
  return (
    <div>
      {files.map((file, i) => (
        <FileInfo key={`${file.name}_idx-${i}`} file={file} />
      ))}
      <Button className={style.uploadButton} onClick={onUploadFiles}>
        Upload
      </Button>
    </div>
  );
});
