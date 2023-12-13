export type Base64Url = string | ArrayBuffer | null;

export interface FileDnd {
  file: File;
  url: Base64Url;
  arrayBuffer: ArrayBuffer | null;
}
