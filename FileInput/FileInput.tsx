import { memo, useEffect, useRef } from 'react';
import { Button } from '@mantine/core';

export const FileInput = memo(({ file }: { file: File }) => {
  const fileRef = useRef(null);
  useEffect(() => {
    fileRef.current.files = file;
  }, [file]);

  return (
    <div>
      <Button size="xs">Upload</Button>
      <input type="file" ref={fileRef} />
    </div>
  );
});
