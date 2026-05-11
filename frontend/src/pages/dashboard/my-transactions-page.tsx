import {
  useQuery,
  useMutation
} from "@tanstack/react-query";

import {
  getMyTransactionsService,
  uploadPaymentProofService
} from "../../services/transaction.service";

import {
  Card,
  CardContent
} from "../../components/ui/card";

import {
  StatusBadge
} from "../../components/common/status-badge";

import {
  Countdown
} from "../../components/common/countdown";

import {
  EmptyState
} from "../../components/common/empty-state";

import { toast }
  from "sonner";

import {
  DeleteDialog
} from "../../components/common/delete-dialog";

import {
  cancelTransactionService
} from "../../services/transaction.service";

export default function MyTransactionsPage() {
  const { data } =
    useQuery({
      queryKey: [
        "my-transactions"
      ],

      queryFn:
        getMyTransactionsService
    });

  const mutation =
    useMutation({
      mutationFn: ({
        id,
        formData
      }: any) =>
        uploadPaymentProofService(
          id,
          formData
        ),

      onSuccess: () => {
        toast.success(
          "Payment proof uploaded"
        );

        window.location.reload();
      },

      onError: () => {
        toast.error(
          "Upload failed"
        );
      }
    });

  const cancelMutation =
    useMutation({
      mutationFn:
        cancelTransactionService,

      onSuccess: () => {
        toast.success(
          "Transaction canceled"
        );
      },

      onError: (
        error: any
      ) => {
        toast.error(
          error.response?.data
            ?.message ||
            "Failed"
        );
      }
    });

  const handleUpload =
    (
      e: any,
      id: string
    ) => {
      const file =
        e.target.files[0];

      const formData =
        new FormData();

      formData.append(
        "paymentProof",
        file
      );

      mutation.mutate({
        id,
        formData
      });
    };

  return (
    <div>
      <h1
        className="
        text-3xl
        font-bold
        mb-6
      "
      >
        My Transactions
      </h1>

      {data?.data?.length ===
        0 ? (
          <EmptyState
            title="No transactions"
            description="Your purchased tickets will appear here."
          />
        ) : (
          <div
            className="
            grid
            gap-6
          "
          >
          {data?.data?.map(
            (trx: any) => (
              <Card
                key={trx.id}
              >
                <CardContent
                  className="
                  p-6
                  flex
                  flex-col
                  md:flex-row
                  md:items-center
                  md:justify-between
                  gap-4
                "
                >
                  <div>
                    <h2
                      className="
                      text-xl
                      font-bold
                    "
                    >
                      {
                        trx.event
                          .title
                      }
                    </h2>

                    <p>
                      Qty:{" "}
                      {
                        trx.quantity
                      }
                    </p>

                    <p>
                      Total:
                      Rp{" "}
                      {trx?.totalPrice?.toLocaleString() || 0}
                    </p>

                    <div
                      className="
                      mt-2
                    "
                    >
                      <StatusBadge
                        status={
                          trx.status
                        }
                      />
                    </div>

                    {trx.status ===
                      "WAITING_FOR_PAYMENT" && (
                      <div
                        className="
                        mt-2
                        text-red-500
                      "
                      >
                        <Countdown
                          expiredAt={
                            trx.expiredAt
                          }
                        />
                      </div>
                    )}
                  </div>

                  {trx.status ===
                    "WAITING_FOR_PAYMENT" && (
                    <div>
                      <input
                        type="file"
                        onChange={(
                          e
                        ) =>
                          handleUpload(
                            e,
                            trx.id
                          )
                        }
                      />
                      <DeleteDialog
                        title="Cancel Transaction"
                        description="This transaction will be canceled."
                        onConfirm={() =>
                          cancelMutation.mutate(
                            trx.id
                          )
                        }
                        loading={
                          cancelMutation.isPending
                        }
                      />
                    </div>
                  )}
                </CardContent>
              </Card>
            )
          )}
        </div>
      )}
    </div>
  );
}