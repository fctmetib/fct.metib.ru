import { DocumentCardInterface } from './document-card.interface';

export interface DocumentModelInterface {
  ID: number;
  Card: DocumentCardInterface;
  Code: string;
}
