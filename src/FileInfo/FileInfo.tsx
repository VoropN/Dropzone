import * as React from 'react';
import style from './style.module.scss';
import { IFile } from '../types';

const byteFormatter = new Intl.NumberFormat('en', {
  notation: 'compact',
  style: 'unit',
  unit: 'byte',
  unitDisplay: 'narrow',
} as any).format;

export const FileInfo = React.memo(
  ({ file, updateFile }: { file: IFile; updateFile: any }) => {
    const [fileName, setFileName] = React.useState(file.name);
    const onNameChnage = (event: React.ChangeEvent<HTMLInputElement>) => {
      setFileName(event.target.value);
    };
    const applyUpdateName = () => updateFile({ ...file, name: fileName });

    return (
      <div className={style.container}>
        {file.loaded ? (
          <span onInput={onNameChnage}>{fileName}</span>
        ) : (
          <input
            value={fileName}
            onChange={onNameChnage}
            onBlur={applyUpdateName}
          />
        )}
        <span className={style.fileSize}>
          ({byteFormatter(file.file.size)})
        </span>
      </div>
    );
  }
);
