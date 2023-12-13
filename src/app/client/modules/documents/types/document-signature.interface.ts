import { FileMode } from "src/app/shared/types/file/file-model.interface";

export interface DocumentSignatureInterface {
  File: FileMode;
  User: string;
  Organization: string;
  Date: Date;
  ID: number;
}
