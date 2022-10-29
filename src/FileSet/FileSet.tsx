import * as React from 'react';
import { FileUploader} from '../FileUploader';
import {IFileSet} from '../types'

const FileSet = React.memo(({ fileSet }: { fileSet: IFileSet }) => {
  return fileSet.map((file, idx) => (
    <FileUploader file={file} key={`${file.name}-idx-${idx}`} />
  );
});
