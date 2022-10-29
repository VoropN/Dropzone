import type { DragEvent } from 'react';
import { memo, useState } from 'react';
import cn from 'classnames';
import style from './style.module.scss';

export const Dropzone = memo(() => {
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
  };
  const onDragLeave = (event: DragEvent<HTMLLabelElement>) => {
    onHover({ isHovered: false, event });
  };
  const onDragEnter = (event: DragEvent<HTMLLabelElement>) => {
    onHover({ isHovered: true, event });
  };
  const onDrop = (event: DragEvent<HTMLLabelElement>) => {
    onHover({ isHovered: false, event });
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
        <input multiple type="file" tabIndex={-1} className={style.fileInput} />
      </label>
    </div>
  );
});
