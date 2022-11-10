export interface IFile {
  name: string;
  file: File;
  loaded?: boolean;
  errors?: any;
  hasErrors?: boolean;
  inProgress?: boolean;
  id: number;
  custodian?: string;
}
