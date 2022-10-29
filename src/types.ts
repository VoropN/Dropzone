export interface IFile {
  name: string;
  file: File;
  loaded?: boolean;
}

export interface IFileSet {
  files: IFile[];
}
