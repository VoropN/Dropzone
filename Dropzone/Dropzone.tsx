import style from './style.module.scss';

export const Dropzone = () => {
  return (
    <div className={style.container}>
      <label className={style.dropzone}>
        <input multiple type="file" tabIndex={-1} className={style.fileInput} />
      </label>
    </div>
  );
};
