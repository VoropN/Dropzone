import { memo } from 'react';
import { Button } from '@mantine/core';
import { FileInfo } from '../FileInfo';

export const UploadFile = memo(({ files }: { files: FileList }) => {
  return (
    <div>
      <Button>Upload</Button>
      {files.map((file, i) => (
        <FileInfo key={`${file.name}_idx-${i}`} file={file} />
      ))}
    </div>
  );
});
