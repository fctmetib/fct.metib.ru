export class PasteHandler {
  public processData(data) {
    const pasteData = data.split('\n');
    for (let i = 0; i < pasteData.length; i++) {
      pasteData[i] = pasteData[i].split('\t');
      // Проверка строки на правильность
      if (
        pasteData[pasteData.length - 1].length === 1 &&
        pasteData[pasteData.length - 1][0] === ''
      ) {
        pasteData.pop();
      }
      // Удаляем пустые данные
      if (
        pasteData.length === 1 &&
        pasteData[0].length === 1 &&
        (pasteData[0][0] === '' || pasteData[0][0] === '\r')
      ) {
        pasteData.pop();
      }
    }
    return pasteData;
  }
}
