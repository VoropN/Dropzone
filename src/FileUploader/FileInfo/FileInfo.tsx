import * as React from 'react';
import style from './style.module.scss';
import { MdEdit } from 'react-icons/md';
import { IFile } from '../../types';

const byteFormatter = new Intl.NumberFormat('en', {
  notation: 'compact',
  style: 'unit',
  unit: 'byte',
  unitDisplay: 'narrow',
} as any).format;

export const FileInfo = React.memo(({ file }: { file: IFile }) => {
  const onNameChnage = (event: React.ChangeEvent<HTMLInputElement>) => {
    file.name = event.target.value;
  };

  return (
    <div className={style.container}>
      <span contentEditable onInput={onNameChnage}>
        {file.name}
      </span>
      <span className={style.fileSize}>({byteFormatter(file.file.size)})</span>
    </div>
  );
});
