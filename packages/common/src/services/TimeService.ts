import * as dayjs from "dayjs";
import * as relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

export class Time {
  static formatFullDate(date: Date): string {
    return dayjs(date).format("HH:mm DD-MM-YYYY");
  }

  static formatShortDate(date: Date): string {
    return dayjs(date).format("DD-MM-YYYY");
  }

  static fromNow(date: Date): string {
    return dayjs(date).fromNow();
  }
}
