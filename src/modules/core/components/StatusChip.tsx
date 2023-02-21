import { Chip } from "@mui/material";

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
};
export const StatusChip: React.FC<TProps> = ({ status, label, color }) => {
  switch (status) {
    case 0:
      return <Chip size="small" label={label} color={color || "default"} />;
    case 1:
      return <Chip size="small" label={label} color={color || "success"} />;
    case 2:
      return <Chip size="small" label={label} color={color || "warning"} />;
    case 3:
      return <Chip size="small" label={label} color={color || "error"} />;
    case 4:
      return <Chip size="small" label={label} color={color || "info"} />;
    case 5:
      return <Chip size="small" label={label} color={color || "secondary"} />;
    case 6:
      return <Chip size="small" label={label} color={color || "primary"} />;
    default:
      return <Chip size="small" label={label} color={color} />;
  }
};
