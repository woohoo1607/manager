import * as dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

export const parseDate = ({ date, format = "DD.MM.YYYY HH:mm:ss" }) =>
  dayjs(date).isValid() ? dayjs(date).format(format) : "";

export const getRelativeTime = (date) =>
  dayjs(date).isValid() ? dayjs(date).fromNow() : "";
