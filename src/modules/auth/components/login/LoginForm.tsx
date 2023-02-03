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
  BaseButton,
  FormInput,
  FormInputPassword,
} from "~modules-core/components";
import { toast } from "~modules-core/toast";
import Link from "next/link";
import { useCallback, useEffect } from "react";
import PersonIcon from "@mui/icons-material/Person";
import LockIcon from "@mui/icons-material/Lock";
import { useMutation } from "react-query";
import { authenticate } from "src/api";
import { _format } from "~modules-core/utility/fomat";
import { parseJwt } from "~modules-core/utility";
import { useSession } from "~modules-core/customHooks/useSession";
import { defaultRoute } from "~modules-core/constance";

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
  useEffect(() => {
    const { callbackUrl } = router.query;

    const { accessToken } = session;

    if (accessToken) {
      router.push((callbackUrl as string) || defaultRoute);
    }
  }, [session]);

  const mutateLogin = useMutation((data: TLoginCredential) =>
    authenticate.login(data).then((res) => res.data)
  );

  const handleRedirect = () => {
    const callbackUrl = router.query.callbackUrl as string;
    
    router.push(callbackUrl || defaultRoute);
  };

  const onSubmit = useCallback(
    async (data: TLoginCredential) => {

      try {
        const { token } = await mutateLogin.mutateAsync(data);

        const userInfo = parseJwt(token);

        localStorage.setItem("accessToken", token);

        localStorage.setItem("userInfo", JSON.stringify(userInfo));

        toast.success("Đăng nhập thành công !");

        handleRedirect();
      } catch (error) {
        console.log(error);
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
          <FormInput
            controlProps={{
              control: control,
              name: "username",
              rules: { required: "Phải nhập tên đăng nhập" },
            }}
            label="Tên đăng nhập"
            variant="standard"
            className="!rounded-none"
            shrinkLabel
            InputProps={{
              startAdornment: (
                <PersonIcon className="bg-[#f4f6f8] p-2 w-[46px] h-[46px] rounded" />
              ),
            }}
          />

          <FormInputPassword
            controlProps={{
              control: control,
              name: "password",
              rules: { required: "Phải nhập mật khẩu" },
            }}
            variant="standard"
            shrinkLabel
            InputProps={{
              startAdornment: (
                <LockIcon className="bg-[#f4f6f8] p-2 w-[46px] h-[46px] rounded" />
              ),
            }}
          />

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
