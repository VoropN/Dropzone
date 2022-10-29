import { memo, useState } from 'react';
import type { DragEvent, ChangeEvent } from 'react';
import { FiUpload } from 'react-icons/fi';
import cn from 'classnames';

import style from './style.module.scss';

export const Dropzone = memo(
  ({ setFiles }: { setFiles: (files: File[]) => void }) => {
    const [isDropzoneHovered, setIsDropzoneHovered] = useState(false);
    const onHover = ({
      isHovered,
      event,
    }: {
      isHovered: boolean;
      event: DragEvent<HTMLLabelElement>;
    }) => {
      event.preventDefault();
      if (isDropzoneHovered !== isHovered) {
        setIsDropzoneHovered(isHovered);
      }
    };
    const onDragOver = (event: DragEvent<HTMLLabelElement>) => {
      onHover({ isHovered: true, event });
      event.dataTransfer.dropEffect = 'move';
    };
    const onDragLeave = (event: DragEvent<HTMLLabelElement>) => {
      onHover({ isHovered: false, event });
    };
    const onDragEnter = (event: DragEvent<HTMLLabelElement>) => {
      onHover({ isHovered: true, event });
    };
    const onDrop = (event: DragEvent<HTMLLabelElement>) => {
      onHover({ isHovered: false, event });
      const { files } = event.dataTransfer;
      onLoadFiles(files);
    };
    const onLoadFiles = (files: FileList | null) => {
      if (files?.length) {
        const fileList = [];
        for (let i = 0; i < files.length; i++) {
          fileList.push(files[i]);
        }
        setFiles(fileList);
      }
    };
    const onSelectFile = (event: ChangeEvent<HTMLInputElement>) => {
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
