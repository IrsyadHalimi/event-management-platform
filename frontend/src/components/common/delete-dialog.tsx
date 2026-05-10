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

  loading?: boolean;

  title?: string;

  description?: string;
}

export const DeleteDialog =
  ({
    onConfirm,
    loading,
    title,
    description
  }: Props) => {
    return (
      <AlertDialog>
        <AlertDialogTrigger
          asChild
        >
          <Button
            variant="destructive"
            className="
            w-full
            mt-2
          "
          >
            Delete
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