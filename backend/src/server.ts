import app from "./app";

import { env }
  from "./config/env";

import { transactionCron }
  from "./cron/transaction.cron";

const PORT = env.PORT;

transactionCron();

app.listen(PORT, () => {
  console.log(
    `Server running on port ${PORT}`
  );
});