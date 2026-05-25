import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from "../ui/alert-dialog";

import {
  Button
} from "../ui/button";

interface Props {
  onConfirm:
    () => void;
  open: boolean;                             // Tambahan untuk kontrol state
  onOpenChange: (open: boolean) => void;

  loading?: boolean;

  title?: string;

  description?: string;

  variant?: "default" | "outline" | "secondary" | "destructive";
}

export const CustomDialog =
  ({
    onConfirm,
    loading,
    title,
    description,
    variant = "default"
  }: Props) => {
    return (
      <AlertDialog>
        <AlertDialogTrigger
          asChild
        >
          <Button
            variant={variant}
            className="
            w-full
            mt-2
          "
          >
            {title ||
              "Delete"}
          </Button>
        </AlertDialogTrigger>

        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {title ||
                "Delete item"}
            </AlertDialogTitle>

            <AlertDialogDescription>
              {description ||
                "This action cannot be undone."}
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel>
              Cancel
            </AlertDialogCancel>

            <AlertDialogAction
              onClick={
                onConfirm
              }
            >
              {loading
                ? "Loading..."
                : "Continue"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );
  };