import * as React from 'react';
import { FiUpload } from 'react-icons/fi';
import cn from 'classnames';

import { IFile } from '../types';
import style from './style.module.scss';

export const Dropzone = React.memo(
  ({ setFiles }: { setFiles: (files: IFile[]) => void }) => {
    const [isDropzoneHovered, setIsDropzoneHovered] = React.useState(false);
    const onHover = ({
      isHovered,
      event,
    }: {
      isHovered: boolean;
      event: React.DragEvent<HTMLLabelElement>;
    }) => {
      event.preventDefault();
      if (isDropzoneHovered !== isHovered) {
        setIsDropzoneHovered(isHovered);
      }
    };
    const onLoadFiles = (files: FileList | null) => {
      if (files?.length) {
        const fileList = [];
        for (let i = 0; i < files.length; i++) {
          const file = files[i];
          fileList.push({ name: file.name, file });
        }
        setFiles(fileList);
      }
    };
    const onDragOver = (event: React.DragEvent<HTMLLabelElement>) => {
      onHover({ isHovered: true, event });
      event.dataTransfer.dropEffect = 'move';
    };
    const onDragLeave = (event: React.DragEvent<HTMLLabelElement>) => {
      onHover({ isHovered: false, event });
    };
    const onDragEnter = (event: React.DragEvent<HTMLLabelElement>) => {
      onHover({ isHovered: true, event });
    };
    const onDrop = (event: React.DragEvent<HTMLLabelElement>) => {
      onHover({ isHovered: false, event });
      const { files } = event.dataTransfer;
      onLoadFiles(files);
    };
    const onSelectFile = (event: React.ChangeEvent<HTMLInputElement>) => {
      const { files } = event.target;
      onLoadFiles(files);
    };

    return (
      <div className={style.container}>
        <label
          className={cn(style.dropzone, {
            [style.dropzoneHover]: isDropzoneHovered,
          })}
          onDrop={onDrop}
          onDragOver={onDragOver}
          onDragLeave={onDragLeave}
          onDragEnter={onDragEnter}
        >
          <FiUpload className={style.uploadIcon} />
          <input
            multiple
            type="file"
            tabIndex={-1}
            onChange={onSelectFile}
            className={style.fileInput}
          />
        </label>
      </div>
    );
  }
);
