import { memo } from 'react';
import style from './style.module.scss';

const byteFormatter = new Intl.NumberFormat('en', {
  notation: 'compact',
  style: 'unit',
  unit: 'byte',
  unitDisplay: 'narrow',
} as any).format;

export const FileInput = memo(({ file }: { file: File }) => {
  return (
    <div className={style.container}>
      <span className={style.fileName}>{file.name}</span>
      <span className={style.fileSize}>({byteFormatter(file.size)})</span>
    </div>
  );
});
