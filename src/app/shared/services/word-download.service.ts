import {Injectable} from '@angular/core';
import {Packer, Document, Paragraph, TextRun} from 'docx';
import {saveAs} from 'file-saver';

@Injectable({
  providedIn: 'root',
})
export class WordDownloadService {

  constructor() {
  }

  public downloadDocWithText(text: string, name: string = 'requisites'): void {
    const doc = new Document({
      sections: [
        {
          properties: {},
          children: [
            new Paragraph({
              children: [
                new TextRun(text),
              ],
            }),
          ],
        },
      ],
    });

    // Генерация документа и его сохранение
    Packer.toBlob(doc).then(blob => {
      saveAs(blob, `${name}.docx`);
    }).catch(err => console.error(err));
  }
}
