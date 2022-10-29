export default {
  post: async (
    path: string,
    data: any,
    {
      onUploadProgress,
    }: { onUploadProgress: (progressEvent: ProgressEvent) => void }
  ) => {
    return new Promise((resolve) => {
      const total = 1000;
      let loaded = 0;
      const step = () => {
        onUploadProgress({ loaded, total } as any);
        if (loaded <= total) {
          window.requestAnimationFrame(step);
        } else {
          resolve('done');
        }
        loaded += 1;
      };
      window.requestAnimationFrame(step);
    });
  },
};
