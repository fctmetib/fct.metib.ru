import { DocumentCardInterface } from './document-card.interface';

export interface DocumentInterface {
  ID: number;
  Card: DocumentCardInterface;
  Code: string;
}
