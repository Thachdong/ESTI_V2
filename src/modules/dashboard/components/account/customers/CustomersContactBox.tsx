import { Box, Collapse, ListItemButton, Typography } from "@mui/material";
import { useCallback, useEffect, useRef, useState } from "react";
import { DeleteButton } from "~modules-core/components";
import { CustomersBill } from "./CustomersBill";
import { CustomersCurator } from "./CustomersCurator";
import { CustomersReceiver } from "./CustomersReceiver";

type TProps = {
  type: string;
  index: number;
  handleRemove: (index: number) => void;
};

export const CustomersContactBox: React.FC<TProps> = ({
  type,
  index,
  handleRemove,
}) => {
  const [collapses, setCollapses] = useState<number[]>([0]);

  const firstRenderRef = useRef<boolean>(true);

  // METHODS
  const handleCollapse = useCallback(
    (index: number) => {
      collapses.includes(index)
        ? setCollapses((prev) => prev.filter((i) => i !== index))
        : setCollapses([...collapses, index]);
    },
    [collapses]
  );

  // SIDE EFFECTS
  useEffect(() => {
    firstRenderRef.current = false;
  }, []);

  return (
    <Box className="!border-grey-2 !rounded-[4px] mb-2">
      <Box className="border-0 border-b-2 flex border-solid border-[#e9e9e9] mb-3 pt-3">
        <ListItemButton
          component="fieldset"
          onClick={() => handleCollapse(index)}
        >
          <Typography className="font-semibold w-full">{`Thông tin liên hệ ${
            index + 1
          }`}</Typography>

          {index > 0 && (
            <DeleteButton color="error" onClick={() => handleRemove(index)} />
          )}
        </ListItemButton>
      </Box>

      <Collapse
        in={collapses.includes(index)}
        timeout="auto"
        unmountOnExit
        className="w-full"
      >
        <CustomersCurator index={index} />

        <CustomersReceiver type={type} index={index} />

        <CustomersBill type={type} index={index} />
      </Collapse>
    </Box>
  );
};
