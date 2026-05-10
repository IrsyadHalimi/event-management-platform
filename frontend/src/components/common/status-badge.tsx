import {
  Badge
} from "../ui/badge";

interface Props {
  status: string;
}

export const StatusBadge =
  ({ status }: Props) => {
    const variantMap:
      Record<
        string,
        string
      > = {
      WAITING_FOR_PAYMENT:
        "secondary",

      WAITING_FOR_ADMIN_CONFIRMATION:
        "default",

      DONE:
        "default",

      REJECTED:
        "destructive",

      EXPIRED:
        "destructive",

      CANCELED:
        "outline"
    };

    return (
      <Badge
        variant={
          variantMap[
            status
          ] as any
        }
      >
        {status.replaceAll(
          "_",
          " "
        )}
      </Badge>
    );
  };