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

import { useState } from "react";
import { CustomDialog } from "@/components/common/custom-dialog";

export default function OrganizerTransactionsPage() {
  // State untuk mengontrol dialog Accept
  const [isAcceptDialogOpen, setIsAcceptDialogOpen] = useState(false);

  // State untuk mengontrol dialog Reject
  const [isRejectDialogOpen, setIsRejectDialogOpen] = useState(false);

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
                          .title
                      }
                    </h2>
                    
                    <div className="flex flex-col md:flex-row gap-1 md:gap-8 mt-2">
                      <p>
                        Customer:
                        {" "}
                        {
                          trx.user
                            .name
                        }
                      </p>

                      <p>
                        Quantity:
                        {" "}
                        {
                          trx.quantity
                        }
                      </p>

                      <p>
                        Total:
                        {" "}
                        {trx?.total?.toLocaleString("id-ID", {
                          style: "currency",
                          currency: "IDR",
                          minimumFractionDigits: 0
                        }) || 0}
                      </p>
                      
                      <StatusBadge
                        status={
                          trx.status
                        }
                      />
                    </div>
                  </div>

                  {trx.paymentProof && (
                    <>
                    <label
                      className="
                      block
                      text-sm
                      font-medium
                      text-gray-900
                      "
                    >
                      Payment Proof
                    </label>
                  
                    <img
                      src={`http://localhost:5000/uploads/payment-proofs/${trx.paymentProof}`}
                      alt="proof"
                      className="
                      w-64
                      rounded-lg
                    "
                    />
                    </>
                  )}

                  {trx.status ===
                    "WAITING_FOR_ADMIN_CONFIRMATION" && (
                    <div
                      className="
                      grid
                      grid-cols-2
                      gap-3
                    "
                    >
                      
                      <CustomDialog
                        open={isAcceptDialogOpen}
                        onOpenChange={setIsAcceptDialogOpen}
                        onConfirm={() => {
                          acceptMutation.mutate(trx.id);
                          setIsAcceptDialogOpen(false); // Otomatis tutup setelah konfirmasi
                        }}
                        loading={acceptMutation.isPending}
                        title="Accept"
                        description="Apakah Anda yakin ingin menyetujui transaksi ini? Tindakan ini akan mengubah status transaksi menjadi berhasil."
                      />

                      <CustomDialog
                        open={isRejectDialogOpen}
                        onOpenChange={setIsRejectDialogOpen}
                        onConfirm={() => {
                          rejectMutation.mutate(trx.id);
                          setIsRejectDialogOpen(false); // Otomatis tutup setelah konfirmasi
                        }}
                        loading={rejectMutation.isPending}
                        title="Reject"
                        description="Apakah Anda yakin ingin menolak transaksi ini? Pengguna akan menerima notifikasi bahwa transaksi mereka ditolak."
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