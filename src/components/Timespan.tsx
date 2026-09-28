import { MILLISECONDS_PER_HOUR } from "@/constants"
import { WORKDAY_HOURS } from "@/settings"
import { getTimeDifference, millisecondsToHhMm } from "@/utils"

const MILLISECONDS_PER_WORKDAY = WORKDAY_HOURS * MILLISECONDS_PER_HOUR

type Props = {
  start: string;
  end: string;
}

export default function ({ start, end }: Props) {
  const timespanMilliseconds = getTimeDifference(start, end)
  const timespanHhMm = millisecondsToHhMm(timespanMilliseconds)
  const workedEnoughTime = timespanMilliseconds >= MILLISECONDS_PER_WORKDAY

  const className = [
    "timespan",
    workedEnoughTime ? "green" : "red",
  ].join(" ")

  return (
    <span className={className}>
      {" "}({timespanHhMm})
    </span>
  )
}

