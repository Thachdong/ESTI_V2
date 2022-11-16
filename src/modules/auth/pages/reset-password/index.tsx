import {
  Avatar,
  Box,
  Container,
  Paper,
  Typography,
  Link as MuiLink,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { Button, FormInput } from "~modules-core/components";
import LockResetOutlinedIcon from "@mui/icons-material/LockResetOutlined";
import { useRouter } from "next/router";
import Link from "next/link";
import { useMutation } from "react-query";
import { authenticate } from "src/api";
import { toast } from "~modules-core/toast";

export const ResetPasswordForm: React.FC = () => {
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<{ userName: string }>({
    mode: "onBlur",
  });

  const router = useRouter();

  const mutatePut = useMutation(
    (userName: string) => authenticate.fotgotPassword({ userName }),
    {
      onSuccess: (data) => {
        toast.success("Vui lòng kiểm tra mail của bạn!");
      },
      onError: (error: any) => {
        toast.error(error?.resultMessage);
      },
    }
  );

  return (
    <Container component="main" maxWidth="sm">
      <Paper className="w-full grid gap-4 justify-center p-8 mt-10">
        <Avatar className="mx-auto" sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockResetOutlinedIcon />
        </Avatar>

        <Typography className="mx-auto" component="h1" variant="h5">
          Quên mật khẩu
        </Typography>

        <Box
          component="form"
          onSubmit={handleSubmit((data) =>
            mutatePut.mutateAsync(data.userName)
          )}
          className="w-[375px] grid gap-4 mt-4"
        >
          <FormInput
            controlProps={{
              control: control,
              name: "userName",
              rules: { required: "Phải nhập tên đăng nhập" },
            }}
            baseProps={{ label: "Tên đăng nhập" }}
          />

          <Button buttonProps={{ type: "submit", loading: isSubmitting }}>
            Lấy lại mật khẩu
          </Button>

          <Typography className="text-right">
            <Link href={`/auth/login?callbackUrl=${router.query.callbackUrl}`}>
              <MuiLink className="mr-4" variant="body2">
                Về trang đăng nhập
              </MuiLink>
            </Link>
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};
