import { FileModeInterface } from "src/app/shared/types/file/file-model.interface";

export interface DocumentSignatureInterface {
  File: FileModeInterface;
  User: string;
  Organization: string;
  Date: Date;
  ID: number;
}
