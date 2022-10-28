import { memo, DragEvent } from 'react';
import style from './style.module.scss';

export const Dropzone = memo(() => {
  const onDragOver = (event: DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
  };
  const onDrop = (event: DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
  };

  return (
    <div className={style.container}>
      <label className={style.dropzone} onDrop={onDrop} onDragOver={onDragOver}>
        <input multiple type="file" tabIndex={-1} className={style.fileInput} />
      </label>
    </div>
  );
});
