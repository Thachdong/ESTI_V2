import * as React from "react";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import {
  Paper,
  Container,
  Typography,
  Box,
  Link as MuiLink,
  Avatar,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import {
  getSession,
  signIn,
  SignInOptions,
  SignInResponse,
} from "next-auth/react";
import { BaseButton, FormInput, FormInputPassword } from "~modules-core/components";
import { toast } from "~modules-core/toast";
import { setBearerToken } from "src/api/instance";
import Link from "next/link";

type TLoginCredential = {
  username: string;
  password: string;
};

export function LoginForm() {
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<TLoginCredential>({
    defaultValues: {
      username: "admin",
      password: "23312331",
    },
    mode: "onBlur",
  });

  const router = useRouter();

  const onSubmit = async (data: TLoginCredential) => {
    const { callbackUrl } = router.query;
    try {
      const signInPayload: SignInOptions = {
        data: JSON.stringify(data),
        callbackUrl: callbackUrl as string,
        redirect: false,
      };

      const response: SignInResponse | undefined = await signIn(
        "credentials-signin",
        signInPayload
      );

      const { error, ok } = response || {};

      if (ok) {        
        router.push(callbackUrl as string || "/dashboard/quotations/requests");

        toast.success("Đăng nhập thành công!");

        const session = await getSession();

        session?.accessToken && setBearerToken(session.accessToken);
      }

      if (!ok && error) {
        const errorData = JSON.parse(decodeURIComponent(error as string));

        toast.error(errorData?.resultMessage);
      }
    } catch (error) {
      console.log(error);
      toast.error("Lỗi không xác định!");
    }
  };

  return (
    <Container component="main" maxWidth="sm">
      <Paper className="w-full grid gap-4 justify-center p-8 mt-10">
        <Avatar className="mx-auto" sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>

        <Typography className="mx-auto" component="h1" variant="h5">
          Đăng nhập
        </Typography>

        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          className="w-[375px] grid gap-4 mt-4"
        >
          <FormInput
            controlProps={{
              control: control,
              name: "username",
              rules: { required: "Phải nhập tên đăng nhập" },
            }}
            label="Tên đăng nhập"
          />

          <FormInputPassword
            controlProps={{
              control: control,
              name: "password",
              rules: { required: "Phải nhập mật khẩu" },
            }}
          />

          <BaseButton type="submit" isSubmitting={isSubmitting}>
            Đăng nhập
          </BaseButton>

          <Typography className="text-right">
            <Link
              href={`/auth/reset-password?callbackUrl=${router.query.callbackUrl}`}
            >
              <MuiLink className="mr-4" variant="body2">
                Quên mật khẩu?
              </MuiLink>
            </Link>
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
}
