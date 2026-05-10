import dayjs
  from "dayjs";

import duration
  from "dayjs/plugin/duration";

import {
  useEffect,
  useState
} from "react";

dayjs.extend(duration);

interface Props {
  expiredAt: string;
}

export const Countdown =
  ({
    expiredAt
  }: Props) => {
    const calculateTime =
      () => {
        const now =
          dayjs();

        const expired =
          dayjs(
            expiredAt
          );

        const diff =
          expired.diff(now);

        if (diff <= 0) {
          return "Expired";
        }

        const durationData =
          dayjs.duration(
            diff
          );

        return `${durationData.hours()}h ${durationData.minutes()}m ${durationData.seconds()}s`;
      };

    const [time, setTime] =
      useState(
        calculateTime()
      );

    useEffect(() => {
      const interval =
        setInterval(() => {
          setTime(
            calculateTime()
          );
        }, 1000);

      return () =>
        clearInterval(
          interval
        );
    }, []);

    return (
      <span>
        {time}
      </span>
    );
  };