export interface UploadInterface {
  progress: number
  state: 'PENDING' | 'IN_PROGRESS' | 'DONE'
}
