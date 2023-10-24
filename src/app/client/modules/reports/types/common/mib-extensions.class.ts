export class MibExtensions {
  public static addDays(date: Date, days: number): Date {
    date.setDate(date.getDate() + days);
    return date;
  }
}
