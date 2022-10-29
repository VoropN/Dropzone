export interface IFile {
  name: string;
  file: File;
  loaded?: boolean;
}

export type IFileSet = IFile[];
