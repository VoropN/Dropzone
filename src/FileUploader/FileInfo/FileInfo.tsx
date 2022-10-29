import * as React from 'react';
import style from './style.module.scss';
import { IFile } from '../../types';

const byteFormatter = new Intl.NumberFormat('en', {
  notation: 'compact',
  style: 'unit',
  unit: 'byte',
  unitDisplay: 'narrow',
} as any).format;

export const FileInfo = React.memo(({ file }: { file: IFile }) => {
  const onNameChnage = (event: React.ChangeEvent<HTMLInputElement>) => {
    file.name = event.target.textContent;
  };

  return (
    <div className={style.container}>
      {file.loaded ? (
        <span onInput={onNameChnage}>{file.name}</span>
      ) : (
        <input value={file.name} onChange={onNameChnage} />
      )}
      <span className={style.fileSize}>({byteFormatter(file.file.size)})</span>
    </div>
  );
});
