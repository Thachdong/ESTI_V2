import { Chip } from "@mui/material";
import clsx from "clsx";

type TProps = {
  status: number;
  label: string;
  color?:
    | "default"
    | "success"
    | "primary"
    | "secondary"
    | "error"
    | "info"
    | "warning";
  className?: string;
};
export const StatusChip: React.FC<TProps> = ({
  status,
  label,
  color,
  className,
}) => {
  switch (status) {
    case 0:
      return (
        <Chip
          size="small"
          label={label}
          color={color || "default"}
          className={className}
        />
      );
    case 1:
      return (
        <Chip
          size="small"
          label={label}
          color={color || "success"}
          className={className}
        />
      );
    case 2:
      return (
        <Chip
          size="small"
          label={label}
          color={color || "warning"}
          className={className}
        />
      );
    case 3:
      return (
        <Chip
          size="small"
          label={label}
          color={color || "error"}
          className={className}
        />
      );
    case 4:
      return (
        <Chip
          size="small"
          label={label}
          color={color || "info"}
          className={className}
        />
      );
    case 5:
      return (
        <Chip
          size="small"
          label={label}
          color={color || "secondary"}
          className={className}
        />
      );
    case 6:
      return (
        <Chip
          size="small"
          label={label}
          color={color || "primary"}
          className={className}
        />
      );
    default:
      return (
        <Chip size="small" label={label} color={color} className={className} />
      );
  }
};
