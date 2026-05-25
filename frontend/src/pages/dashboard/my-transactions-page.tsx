import {
  useQuery,
  useMutation
} from "@tanstack/react-query";

import { useState, useRef } from "react";

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
  CustomDialog
} from "../../components/common/custom-dialog";

import {
  cancelTransactionService
} from "../../services/transaction.service";
import { Input } from "@/components/ui/input";


export default function MyTransactionsPage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedFileEvent, setSelectedFileEvent] = useState<React.ChangeEvent<HTMLInputElement> | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

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

      onError: (error: any) => {
        const serverMessage = error.response?.data?.message;
        toast.error(serverMessage || "Gagal mengunggah file karena terlalu besar.");
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
        window.location.reload();
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

  // Fungsi 1: Menangkap perubahan file
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validasi ukuran file (seperti solusi sebelumnya)
    const MAX_FILE_SIZE = 2 * 1024 * 1024; 
    if (file.size > MAX_FILE_SIZE) {
      toast.error("Ukuran file terlalu besar! Maksimal 2 MB.");
      e.target.value = ""; 
      return;
    }

    // Simpan data event file ke state sementara, lalu munculkan dialog konfirmasi
    setSelectedFileEvent(e);
    setIsDialogOpen(true);
  };

  // Fungsi 2: Dieksekusi jika menekan "Continue" di Dialog
  const handleConfirmUpload = (id: string) => {
    if (!selectedFileEvent) return;

    // Panggil fungsi handleUpload asli milik Anda
    handleUpload(selectedFileEvent, id);
    
    // Tutup dialog dan bersihkan state penampung
    setIsDialogOpen(false);
    setSelectedFileEvent(null);
  };

  // Fungsi 3: Jika user menekan batal ("Cancel")
  const handleCancelDialog = (open: boolean) => {
    setIsDialogOpen(open);
    if (!open) {
      // Bersihkan input file agar user bisa memilih ulang file yang sama jika ingin mencoba lagi
      if (fileInputRef.current) fileInputRef.current.value = "";
      setSelectedFileEvent(null);
    }
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
                        Qty:{" "}
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

                      {trx.status ===
                      "WAITING_FOR_PAYMENT" && (
                        <div
                          className="
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
                    
                  </div>

                  {trx.status ===
                    "WAITING_FOR_PAYMENT" && (
                    <div>
                      <label
                        htmlFor={`file-input-${trx.id}`}
                        className="block mb-2 text-sm font-medium text-gray-900"
                      >
                        Upload Payment Proof
                      </label>
                      <Input
                        type="file"
                        placeholder="Price"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        accept="image/*"
                        className="block w-full text-sm"
                      />
                      {fileInputRef.current?.value && (<CustomDialog
                        open={isDialogOpen}
                        onOpenChange={handleCancelDialog}
                        onConfirm={() => handleConfirmUpload(trx.id)} // pastikan id transaksi yang benar diteruskan
                        loading={mutation.isPending} // ambil dari state status react-query Anda
                        title="Upload?"
                        description="Pastikan gambar bukti transfer Anda sudah benar dan terbaca jelas sebelum melanjutkan."
                      />)}
                      
                      <CustomDialog
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
                        open={false}
                        onOpenChange={() => {}}
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