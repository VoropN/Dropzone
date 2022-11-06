import * as React from 'react';
import { VscError } from 'react-icons/vsc';
import { AiOutlineCheckCircle } from 'react-icons/ai';
import style from './style.module.scss';
import { IFile } from '../types';

const byteFormatter = new Intl.NumberFormat('en', {
  notation: 'compact',
  style: 'unit',
  unit: 'byte',
  unitDisplay: 'narrow',
} as any).format;

interface IFileInfo {
  file: IFile;
  updateFile: (file: IFile) => void;
}

export const FileInfo = React.memo(({ file, updateFile }: IFileInfo) => {
  const [fileName, setFileName] = React.useState(file.name);
  const onNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFileName(event.target.value);
  };
  const applyUpdateName = () => updateFile({ ...file, name: fileName });

  return (
    <div className={style.container}>
      <div className={style.status}>
        {file.hasErrors && <VscError className={style.fileHasErrors} />}
        {file.loaded && <AiOutlineCheckCircle className={style.fileLoaded} />}
      </div>
      <div className={style.fileName}>
        {file.loaded ? (
          <span>{fileName}</span>
        ) : (
          <input
            value={fileName}
            onChange={onNameChange}
            onBlur={applyUpdateName}
          />
        )}
      </div>
      <span className={style.fileSize}>({byteFormatter(file.file.size)})</span>
    </div>
  );
});
