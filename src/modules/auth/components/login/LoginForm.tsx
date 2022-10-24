import * as React from "react";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import {
  Paper,
  Container,
  Typography,
  Box,
  Grid,
  Link,
  Avatar,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { signIn, SignInOptions, SignInResponse } from "next-auth/react";
import { Button, FormInput, FormInputPassword } from "~modules-core/components";
import { toast } from "~modules-core/toast";

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

      const { error, ok, url } = response || {};

      if (ok) {
        router.push(url || "/dashboard/qoutation/requests");

        toast.success("Đăng nhập thành công!");
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
    <Container component="main" maxWidth="xs">
      <Paper className="grid gap-4 justify-center p-8 mt-10">
        <Avatar className="mx-auto" sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>

        <Typography className="mx-auto" component="h1" variant="h5">
          Đăng nhập
        </Typography>

        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          className="grid gap-4 mt-4"
        >
          <FormInput
            control={control}
            name="username"
            inputProps={{ label: "Email / tên đăng nhập" }}
            rules={{ required: "Phải nhập email / tên đăng nhập" }}
          />

          <FormInputPassword control={control} name="password" />

          <Button buttonProps={{ type: "submit", loading: isSubmitting }}>
            Đăng nhập
          </Button>

          <Grid container>
            <Grid item xs>
              <Link className="mr-4" href="#" variant="body2">
                Quên mật khẩu?
              </Link>
            </Grid>
            <Grid item>
              <Link href="#" variant="body2">
                {"Bạn chưa có tài khoản? đăng ký"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Container>
  );
}
