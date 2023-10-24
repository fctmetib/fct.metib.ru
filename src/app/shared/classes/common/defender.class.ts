export class Defender {
  static defendValue(dangerValue: string): string {
    let result = '';
    result = this._removeDangerCharacters(dangerValue);
    result = this._removeDangerWords(result);

    return result;
  }

  private static _removeDangerCharacters(dangerString): string {
    return dangerString.replace(/'|_|>|<|&|"|;|$|%|/g,'');
  }

  private static _removeDangerWords(dangerString): string {
    let result = '';

    result = dangerString.replace('script', '');
    result = result.replace('iframe', '');
    result = result.replace('input', '');
    result = result.replace('function', '');
    result = result.replace('img', '');
    result = result.replace('video', '');
    result = result.replace('src', '');
    result = result.replace('href', '');
    result = result.replace('=', '');
    result = result.replace('doc', '');
    result = result.replace('eval', '');
    result = result.replace('function', '');
    result = result.replace('createElement', '');
    result = result.replace('source', '');
    result = result.replace('open', '');
    result = result.replace('GET', '');
    result = result.replace('POST', '');

    return result;
  }
}
