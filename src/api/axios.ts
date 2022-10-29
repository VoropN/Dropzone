export default {
  post: async (
    path: string,
    data: any,
    {
      onUploadProgress,
    }: { onUploadProgress: (progressEvent: ProgressEvent) => void }
  ) => {
    const total = 100;
    let loaded = 0;
    const step = () => {
      onUploadProgress({ loaded, total } as any);
      if (loaded <= total) {
        window.requestAnimationFrame(step);
      } else {
        Promise.resolve();
      }
      loaded += 1;
    };
    window.requestAnimationFrame(step);
  },
};
