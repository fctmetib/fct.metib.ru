import {Injectable} from '@angular/core';

export type ClassesObject = { [key: string]: boolean }

export interface TransliterateMap {
  [key: string]: string;
}

export type Word = string | undefined | null;

export interface FIO {
  firstName: Word,
  lastName: Word,
  secondName: Word
}

export function extractBase64(dataURL: string): string {
  return dataURL.split(',')[1];
}

function getMimeTypeByFileName(filename: string): string {
  const extension = filename.split('.').pop()?.toLowerCase();
  switch (extension) {
    case 'pdf':
      return 'application/pdf';
    case 'doc':
      return 'application/msword';
    case 'docx':
      return 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
    case 'xls':
      return 'application/vnd.ms-excel';
    case 'xlsx':
      return 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
    case 'jpg':
    case 'jpeg':
      return 'image/jpeg';
    case 'png':
      return 'image/png';
    default:
      return 'application/octet-stream'; // общий тип файла, если расширение не распознано
  }
}

export function downloadBase64File(base64Data: string, filename: string) {
  const mimeType = getMimeTypeByFileName(filename);

  const byteCharacters = atob(base64Data);
  const byteNumbers = new Array(byteCharacters.length);
  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i);
  }
  const byteArray = new Uint8Array(byteNumbers);

  const blob = new Blob([byteArray], { type: mimeType });

  const blobUrl = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = blobUrl;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(blobUrl);
}



@Injectable({
  providedIn: 'root'
})
export class ToolsService {

  public generateId = () => {
    return `f${(~~(Math.random() * 1e8)).toString(16)}`;
  };

  public transformDatesToISO(obj: any): any {
    const dateRegex = /^\d{4}-\d{2}-\d{2}(T\d{2}:\d{2}:\d{2}.\d{3}Z)?$/; // Регулярное выражение для проверки даты

    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        const value = obj[key];
        if (typeof value === 'string' && dateRegex.test(value)) {
          // Если строка соответствует формату даты
          obj[key] = new Date(value).toISOString();
        }
      }
    }

    return obj;
  }

  parseClassesObject(classesObj: ClassesObject, callback: (string) => void) {
    Object.keys(classesObj).forEach(className => {
      if (classesObj[className]) {
        callback(className)
      }
    });
  }

  safeJson(data: string) {
    try {
      const split = data.split(';');
      const source = split.length > 0 ? split[0].trim() : null;
      if (source && source !== 'undefined') { // Проверяем, не равна ли source строке 'undefined'
        return JSON.parse(source);
      } else {
        console.log('Источник данных пуст, undefined или равен строке \'undefined\'.');
        return false;
      }
    } catch (e) {
      console.error('При парсинге JSON произошла ошибка', e);
      return false;
    }
  }

  public deepFilter<T = any>(array: T[], searchValue: string): T[] {
    return array.filter(request =>
        request && Object.values(request).some((value: any) =>
          value && typeof value === 'object' ?
            this.deepFilter(Array.isArray(value) ? value : [value], searchValue).length > 0 :
            value && value.toString().toLowerCase().includes(searchValue.toLowerCase())
        )
    );
  }

  subtractFromDate(date: Date, { days = 0, months = 0, years = 0 }: { days?: number; months?: number; years?: number; }): Date {
    const result = new Date(date); // Создаем копию переданной даты, чтобы не изменять оригинал

    // Отнимаем года, месяцы и дни
    result.setDate(result.getDate() - days);
    result.setMonth(result.getMonth() - months);
    result.setFullYear(result.getFullYear() - years);

    return result;
  }

  combineDateTime(date: string, time: string) {
    const defaultTime = '12:30:00';
    const actualTime = time || defaultTime;
    return new Date(`${date}T${actualTime}`);
  }

  getTextWidth(text: string, fontSize: number, fontFamily: string = 'Arial') {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');

    context!.font = fontSize + ` ${fontFamily}`; // Здесь вы можете установить нужный вам шрифт
    const metrics = context!.measureText(text);

    return metrics.width;
  }

  public getRandomInt(max: number): number {
    return Math.floor(Math.random() * max);
  }

  public tokenExpired(token: string): boolean {
    // if (token) {
    //   const expiry = (JSON.parse(window.atob(token.split('.')[1]))).exp;
    //   return (Math.floor((new Date).getTime() / 1000)) >= expiry;
    // }
    return false
  }

  public transliterate(text: string, reverse: boolean = false): string {
    const rusToEngMap: TransliterateMap = {
      'а': 'a', 'б': 'b', 'в': 'v', 'г': 'g', 'д': 'd', 'е': 'e', 'ё': 'yo', 'ж': 'zh',
      'з': 'z', 'и': 'i', 'й': 'y', 'к': 'k', 'л': 'l', 'м': 'm', 'н': 'n', 'о': 'o',
      'п': 'p', 'р': 'r', 'с': 's', 'т': 't', 'у': 'u', 'ф': 'f', 'х': 'h', 'ц': 'c',
      'ч': 'ch', 'ш': 'sh', 'щ': 'sch', 'ъ': '', 'ы': 'y', 'ь': '', 'э': 'e', 'ю': 'yu',
      'я': 'ya', 'А': 'A', 'Б': 'B', 'В': 'V', 'Г': 'G', 'Д': 'D', 'Е': 'E', 'Ё': 'Yo',
      'Ж': 'Zh', 'З': 'Z', 'И': 'I', 'Й': 'Y', 'К': 'K', 'Л': 'L', 'М': 'M', 'Н': 'N',
      'О': 'O', 'П': 'P', 'Р': 'R', 'С': 'S', 'Т': 'T', 'У': 'U', 'Ф': 'F', 'Х': 'H',
      'Ц': 'C', 'Ч': 'Ch', 'Ш': 'Sh', 'Щ': 'Sch', 'Ъ': '', 'Ы': 'Y', 'Ь': '', 'Э': 'E',
      'Ю': 'Yu', 'Я': 'Ya'
    };

    const engToRusMap: TransliterateMap = {};
    for (const key in rusToEngMap) {
      engToRusMap[rusToEngMap[key]] = key;
    }

    const map: TransliterateMap = reverse ? engToRusMap : rusToEngMap;

    return text.split('').map(char => map[char] || map[char] === '' ? map[char] : char).join('');
  }

  concatArray(array: Word[]): string {
    return array.filter(x => x).join(' ')
  }

  getFormattedName(data: FIO): string {
    const {lastName = '', firstName = '', secondName = ''} = data;
    const formattedLastName = lastName ? `${lastName} ` : '';
    const formattedFirstNameInitial = firstName ? `${firstName.charAt(0)}. ` : '';
    const formattedSecondNameInitial = secondName ? `${secondName.charAt(0)}.` : '';

    return `${formattedLastName}${formattedFirstNameInitial}${formattedSecondNameInitial}`;
  }

  public mobileAndTabletCheck(isBrowser: boolean) {
    if (isBrowser) {
      let check = false;
      (function (a) {
        if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) check = true;
      })(navigator.userAgent || navigator.vendor);
      return check;
    }
    return false
  };

  public calculateAge(birthDate: Date): number {
    const today = new Date();
    const birthDateCopy = new Date(birthDate);
    let age = today.getFullYear() - birthDateCopy.getFullYear();
    const monthDiff = today.getMonth() - birthDateCopy.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDateCopy.getDate())) {
      age--;
    }

    return age;
  }

  declineWord(value: number, words: [string, string, string]): string {
    value = Math.abs(value) % 100;
    const num = value % 10;
    if (value > 10 && value < 20) return words[2]; // Род. п. мн. ч для чисел от 11 до 19
    if (num > 1 && num < 5) return words[1]; // Род. п. ед. ч для 2-4
    if (num == 1) return words[0]; // Им. п. ед. ч для 1
    return words[2]; // Род. п. мн. ч для 0, 5-9, 10, а также 11-19
  }

  convertBytesToMegabytes(bytes: number): string {
    const megabytes = bytes / (1024 * 1024);
    return megabytes.toFixed(1) + ' MB';
  }

  formatNumber(num: number): string {
    return num.toString().padStart(2, '0');
  }

  createEmptyArray(length: number): null[] {
    return new Array(length).fill(null);
  }

}

export function deepMerge(target, source) {
  // Проверяем, является ли значение объектом
  function isObject(obj) {
    return obj && typeof obj === 'object' && !Array.isArray(obj);
  }

  // Проходим по всем ключам из source
  for (const key of Object.keys(source)) {
    if (isObject(source[key])) {
      // Если ключ в target не объект, создаём его как объект
      if (!isObject(target[key])) {
        target[key] = {};
      }
      // Рекурсивно объединяем объекты
      deepMerge(target[key], source[key]);
    } else if (source[key] !== undefined) {
      // Заменяем значение из source, если оно не undefined
      target[key] = source[key];
    }
  }

  return target;
}
