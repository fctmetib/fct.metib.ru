import { DigitalSignerModelInterface } from './digital-signer-model.interface';
import { DocumentModelInterface } from './document-model.interface';

export interface SignActivityDataModelInterface {
  Signer: DigitalSignerModelInterface;
  Documents: DocumentModelInterface[];
}
