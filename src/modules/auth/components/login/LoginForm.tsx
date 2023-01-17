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
  useSession,
} from "next-auth/react";
import {
  BaseButton,
  FormInput,
  FormInputPassword,
} from "~modules-core/components";
import { toast } from "~modules-core/toast";
import { setBearerToken } from "src/api/instance";
import Link from "next/link";
import { useCallback } from "react";
import moment from "moment";
import PersonIcon from "@mui/icons-material/Person";
import LockIcon from "@mui/icons-material/Lock";

type TLoginCredential = {
  username: string;
  password: string;
};

export function LoginForm() {
  // LOCAL STATE AND EXTRACT PROPS
  const session = useSession();

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

  // SIDE EFFECTS
  React.useEffect(() => {
    const { callbackUrl } = router.query;

    const { accessToken, expires } = session.data || {};

    const isTokenExpired = moment(expires).isBefore();

    if (accessToken && !isTokenExpired) {
      router.push((callbackUrl as string) || "/dashboard/quotations/requests");
    }
  }, [session]);

  const onSubmit = useCallback(
    async (data: TLoginCredential) => {
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
          router.push(
            (callbackUrl as string) || "/dashboard/quotations/requests"
          );

          toast.success("Đăng nhập thành công!");

          const { accessToken } = (await getSession()) || {};

          accessToken && setBearerToken(accessToken);
        }

        if (!ok && error) {
          console.log(error);

          const errorData = JSON.parse(decodeURIComponent(error as string));

          toast.error(errorData?.resultMessage);
        }
      } catch (error) {
        console.log(error);
        toast.error("Lỗi không xác định!");
      }
    },
    [router]
  );

  return (
    <Container
      component="main"
      maxWidth={false}
      className="h-screen w-full flex items-center justify-center bg-[#f6f7fd]"
    >
      <Paper className="w-[500px] grid gap-4 p-8 shadow-xl bg-[#fff] justify-center">
        <Avatar className="mx-auto" sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>

        <Typography
          className="mx-auto font-semibold"
          component="h1"
          variant="h5"
        >
          Đăng nhập
        </Typography>

        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          className="w-[375px] grid gap-4 mt-4"
        >
          <Box className="flex gap-2">
            <PersonIcon className="bg-[#f4f6f8] p-2 w-[46px] h-[46px] rounded" />
            <FormInput
              controlProps={{
                control: control,
                name: "username",
                rules: { required: "Phải nhập tên đăng nhập" },
              }}
              label="Tên đăng nhập"
              variant="standard"
              className="!rounded-none"
            />
          </Box>

          <Box className="flex gap-2">
            <LockIcon className="bg-[#f4f6f8] p-2 w-[46px] h-[46px] rounded" />
            <FormInputPassword
              controlProps={{
                control: control,
                name: "password",
                rules: { required: "Phải nhập mật khẩu" },
              }}
              variant="standard"
            />
          </Box>

          <BaseButton
            type="submit"
            isSubmitting={isSubmitting}
            className="bg-[#214d73] font-bold"
          >
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
