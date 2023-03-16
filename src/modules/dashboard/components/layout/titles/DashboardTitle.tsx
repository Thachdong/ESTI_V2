import { useRouter } from "next/router";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { branchs } from "src/api";
import { FormSelectAsync } from "~modules-core/components";
import { defaultBranchId } from "~modules-core/constance";

export const DashboardTitle: React.FC = () => {
  const router = useRouter();

  const { control, setValue, watch } = useForm();

  const branchId = watch("branchId") || defaultBranchId;

  useEffect(() => {
    setValue("branchId", defaultBranchId);
  }, []);

  useEffect(() => {
    router.push({
      pathname: "/dashboard",
      query: {
        branchId,
      },
    });
  }, [branchId]);

  return (
    <FormSelectAsync
      fetcher={branchs.getList}
      controlProps={{ control, name: "branchId" }}
      shrinkLabel
      label={""}
      className="w-[250px]"
      labelKey="code"
    />
  );
};
