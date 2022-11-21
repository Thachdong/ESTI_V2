import { Button, CircularProgress, Tooltip } from "@mui/material";
import { useCallback, useState } from "react";
import { TBaseButton } from "~types/buttons";

export const BaseButton: React.FC<TBaseButton> = (props) => {
  const {
    tooltipPlacement,
    tooltipText,
    children,
    onClick,
    isSubmitting,
    ...rest
  } = props;

  const [loading, setLoading] = useState(false);

  // TOGGLE LOADING FLAG
  // MUST USE TRY-CATCH BECAUSE USEMUTATION  WILL THROW ERROR WHEN SOMETHING FAILED
  const handleClick = useCallback(async () => {
    setLoading(true);
    try {
      await onClick?.();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, [onClick]);

  return (
    <Tooltip title={tooltipText} placement={tooltipPlacement || "top"}>
      <Button
        variant="contained"
        onClick={handleClick}
        disabled={loading || isSubmitting}
        {...rest}
      >
        {children}

        {(loading || isSubmitting) && (
          <CircularProgress size="1rem" color="inherit" />
        )}
      </Button>
    </Tooltip>
  );
};
