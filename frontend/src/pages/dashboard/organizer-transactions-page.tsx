import {
  useQuery,
  useMutation
} from "@tanstack/react-query";

import {
  getOrganizerTransactionsService,
  acceptTransactionService,
  rejectTransactionService
} from "../../services/organizer.service";

import {
  Card,
  CardContent
} from "../../components/ui/card";

import {
  Button
} from "../../components/ui/button";

import {
  StatusBadge
} from "../../components/common/status-badge";

import { toast }
  from "sonner";

import {
  EmptyState
} from "../../components/common/empty-state";

export default function OrganizerTransactionsPage() {
  const { data, refetch } =
    useQuery({
      queryKey: [
        "organizer-transactions"
      ],

      queryFn:
        getOrganizerTransactionsService
    });

  const acceptMutation =
    useMutation({
      mutationFn:
        acceptTransactionService,

      onSuccess: () => {
        toast.success(
          "Transaction accepted"
        );

        refetch();
      }
    });

  const rejectMutation =
    useMutation({
      mutationFn:
        rejectTransactionService,

      onSuccess: () => {
        toast.success(
          "Transaction rejected"
        );

        refetch();
      }
    });

  return (
    <div>
      <h1
        className="
        text-3xl
        font-bold
        mb-6
      "
      >
        Organizer Transactions
      </h1>

      {data?.data?.length ===
        0 ? (
          <EmptyState
            title="No transactions yet"
            description="Customer transactions will appear here."
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
                          .name
                      }
                    </h2>

                    <p>
                      Customer:
                      {" "}
                      {
                        trx.user
                          .name
                      }
                    </p>

                    <p>
                      Total:
                      Rp{" "}
                      {trx?.total?.toLocaleString()}
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
                  </div>

                  {trx.paymentProof && (
                    <img
                      src={`http://localhost:5000/uploads/payment-proofs/${trx.paymentProof}`}
                      alt="proof"
                      className="
                      w-64
                      rounded-lg
                    "
                    />
                  )}

                  {trx.status ===
                    "WAITING_FOR_ADMIN_CONFIRMATION" && (
                    <div
                      className="
                      flex
                      gap-3
                    "
                    >
                      <Button
                        onClick={() =>
                          acceptMutation.mutate(
                            trx.id
                          )
                        }
                      >
                        Accept
                      </Button>

                      <Button
                        variant="destructive"
                        onClick={() =>
                          rejectMutation.mutate(
                            trx.id
                          )
                        }
                      >
                        Reject
                      </Button>
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