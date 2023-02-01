import { Box, Collapse, List, ListItemButton, Typography } from "@mui/material";
import { useCallback, useState } from "react";
import { AddButton, DeleteButton } from "~modules-core/components";
import { CustomersBill } from "./CustomersBill";
import { CustomersCurator } from "./CustomersCurator";
import { CustomersReceiver } from "./CustomersReceiver";

type TProps = {
  isDisable: boolean;
};

export const CustomersReceiveInfoForm: React.FC<TProps> = ({ isDisable }) => {
  const [collapses, setCollapses] = useState<number[]>([0]);

  const [curators, setCurators] = useState<any[]>([{}]);

  // METHODS
  const handleCollapse = useCallback(
    (index: number) => {
      collapses.includes(index)
        ? setCollapses((prev) => prev.filter((i) => i !== index))
        : setCollapses([...collapses, index]);
    },
    [collapses]
  );

  const handleAdd = useCallback(() => {
    setCurators([...curators, {}]);
  }, [curators]);

  const handleRemove = useCallback(
    (index: number) => {
      if (confirm("Xác nhận xóa thông tin liên hệ " + index + 1)) {
        setCurators((prev) => prev.filter((c: any, i: number) => i !== index));
      }
    },
    [curators]
  );

  return (
    <Box>
      <List className="pt-0">
        {curators.map((curator: any, index: number) => (
          <Box className="!border-grey-2 !rounded-[4px] mb-2">
            <ListItemButton
              component="fieldset"
              onClick={() => handleCollapse(index)}
              className="border-b-2 border-solid border-[#e9e9e9] mb-3"
            >
              <Typography className="font-semibold w-full">{`Thông tin liên hệ ${
                index + 1
              }`}</Typography>

              {index > 0 && (
                <DeleteButton
                  color="error"
                  onClick={() => handleRemove(index)}
                />
              )}
            </ListItemButton>

            <Collapse
              in={collapses.includes(index)}
              timeout="auto"
              unmountOnExit
              className="w-full"
            >
              <CustomersCurator isDisable={isDisable} index={index} />

              <CustomersReceiver isDisable={isDisable} index={index} />

              <CustomersBill isDisable={isDisable} index={index} />
            </Collapse>
          </Box>
        ))}
      </List>

      <AddButton onClick={handleAdd}>Thêm thông tin liên hệ</AddButton>
    </Box>
  );
};
