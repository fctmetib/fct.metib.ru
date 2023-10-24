import { PeriodReportArgs } from './period-report-args.class';

export class StandartReportArgs extends PeriodReportArgs {
  DebtorID: number = 0;

  constructor(type: string, title: string) {
    super(type, title);
  }
}
