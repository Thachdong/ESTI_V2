import { Box, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { useFormContext } from "react-hook-form";
import { useQuery } from "react-query";
import { FormInput, FormSelect } from "~modules-core/components";
import { curatorDepartments } from "~modules-core/constance";
import { customer as customerApi } from "src/api";
import { useCallback, useEffect, useState } from "react";

type TProps = {
  disabled: boolean;
};

export const QuoteRequestDetailContact: React.FC<TProps> = ({ disabled }) => {
  const [curators, setCurators] = useState<any[]>([]);

  const { control, watch, setValue } = useFormContext();

  const { customerId, customerAvailable, curatorId } = watch();

  const { id } = useRouter().query;

  const { data } = useQuery(
    ["customerDetail", customerId],
    () => customerApi.getById(customerId).then((res) => res.data),
    {
      enabled: !!customerId,
    }
  );

  useEffect(() => {
    const { curatorInfo = [] } = data || {};

    setCurators([...curatorInfo]);
  }, [data]);

  useEffect(() => {
    const selectedCurator = curators.find((cur) => cur.id === curatorId);

    if (!!selectedCurator) {
      const {
        curatorName,
        curatorDepartment,
        curatorPhone,
        curatorEmail,
        id,
        receiverById,
      } = selectedCurator;

      setValue("curatorName", curatorName);

      setValue("curatorDepartmentId", curatorDepartment);

      setValue("curatorPhone", curatorPhone);

      setValue("curatorEmail", curatorEmail);

      setValue("curatorId", id);

      setValue("receiverAddress", receiverById?.address);
    }
  }, [curatorId, curators]);

  const renderCuratorTag = useCallback(() => {
    if (!!id) {
      if (customerId) {
        return (
          <FormSelect
            controlProps={{
              name: "curatorId",
              control: control,
              rules: { required: "Phải chọn người phụ trách" },
            }}
            options={curators}
            label="Người phụ trách:"
            className="mb-4"
            disabled={disabled}
            getOptionLabel={(opt) => !!opt ? opt?.curatorName + " - " + opt?.statusName : ""}
          />
        );
      } else {
        return (
          <FormInput
            controlProps={{
              name: "curatorName",
              control: control,
              rules: { required: "Phải nhập người phụ trách" },
            }}
            label="Người phụ trách:"
            className="mb-4"
            disabled={disabled}
          />
        );
      }
    }

    if (customerAvailable || !!id) {
      return (
        <FormSelect
          controlProps={{
            name: "curatorId",
            control: control,
            rules: { required: "Phải chọn người phụ trách" },
          }}
          options={curators}
          label="Người phụ trách:"
          className="mb-4"
          disabled={disabled}
          getOptionLabel={(opt) => !!opt ? opt?.curatorName + " - " + opt?.statusName : ""}
        />
      );
    }
  }, [customerId, customerAvailable, curators, curatorId, disabled]);

  return (
    <Box className="flex flex-col">
      <Typography className="font-bold uppercase mb-3 text-sm">
        thông tin liên hệ
      </Typography>

      <Box className="bg-white rounded grid gap-3 p-3">
        {renderCuratorTag()}

        <FormSelect
          controlProps={{
            name: "curatorDepartmentId",
            control: control,
            rules: { required: "Phải chọn phòng ban" },
          }}
          options={curatorDepartments}
          label="Phòng ban:"
          disabled={!!id}
        />

        <FormInput
          controlProps={{
            name: "curatorPhone",
            control: control,
            rules: { required: "Phải nhập điện thoại" },
          }}
          label="Điện thoại:"
          disabled={!!id}
        />

        <FormInput
          controlProps={{
            name: "curatorEmail",
            control: control,
            rules: { required: "Phải nhập Email" },
          }}
          label="Email:"
          disabled={!!id}
        />
      </Box>
    </Box>
  );
};
