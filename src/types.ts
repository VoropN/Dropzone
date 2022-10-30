export interface IFile {
  name: string;
  file: File;
  loaded?: boolean;
  errors?: any;
  hasErrors?: boolean;
  id: number;
}
