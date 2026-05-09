import cron from "node-cron";

import {
  expiredTransactionJob,
  canceledTransactionJob
} from "../services/cron.service";

export const transactionCron =
  () => {
    cron.schedule(
      "* * * * *",
      async () => {
        console.log(
          "Running expired transaction cron..."
        );

        await expiredTransactionJob();
      }
    );

    cron.schedule(
      "0 * * * *",
      async () => {
        console.log(
          "Running canceled transaction cron..."
        );

        await canceledTransactionJob();
      }
    );
  };