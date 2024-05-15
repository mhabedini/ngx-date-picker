import {CalendarType, ValueFormat} from "../config/datePicker-config";
import DateInfo from "./dateInfo";

export default class DateTransform {

  constructor(private date: Date, private calendarType: CalendarType) {
  }

  transformDate(format: ValueFormat): string {

    let {year, month: m, day: d} = new DateInfo(this.calendarType).getInfoOfDate(this.date)

    // months starts from 0 index
    m += 1;

    let month = m.toString().padStart(2, "0")
    let day = d.toString().padStart(2, "0")

    let result: string;

    switch (format) {
      case "MM-DD-YYYY":
        result = [month, day, year].join("-");
        break;

      case "DD-MM-YYYY":
        result = [day, month, year].join("-");
        break;

      case "MM/DD/YYYY":
        result = [month, day, year].join("/");
        break;

      case "DD/MM/YYYY":
        result = [day, month, year].join("/");
        break;

      case "YYYY/MM/DD":
        result = [year, month, day].join("/");
        break;

      case "YYYY/DD/MM":
        result = [year, day, month].join("/");
        break;
    }

    return result;
  }

  getOutputData(fields: any) {
    const dateInfo: any = new DateInfo(this.calendarType).getInfoOfDate(this.date)
    let res = {}
    for (let field in dateInfo) {
      if (fields[field]) {
        res = {
          ...res,
          [field]: dateInfo[field]
        }
      }
    }
    return res
  }
}
