import { memo } from 'react';
import { Button } from '@mantine/core';
import { FileInfo } from '../FileInfo';

import style from './style.module.scss';

export const UploadFile = memo(({ files }: { files: File[] }) => {
  return (
    <div>
      {files.map((file, i) => (
        <FileInfo key={`${file.name}_idx-${i}`} file={file} />
      ))}
      <Button className={style.uploadButton}>Upload</Button>
    </div>
  );
});
