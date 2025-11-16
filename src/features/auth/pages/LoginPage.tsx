import { useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { toast } from "sonner";
import { PageContainer } from "~/components/layout/PageContainer";
import { SectionContainer } from "~/components/layout/SectionContainer";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "~/components/ui/card";
import { Form } from "~/components/ui/form";
import { api } from "~/utils/api";
import RegisterFormInner from "../components/RegisterFormInner";
import { registerFormShcema, type RegisterFormSchema } from "../forms/register";

const LoginPage = () => {
  const form = useForm<RegisterFormSchema>({
    resolver: zodResolver(registerFormShcema),
  });

  const { mutate: registerUser, isPending: registerUserIsPending } =
    api.auth.register.useMutation({
      onSuccess: () => {
        toast("Akun kamu berhasil dibuat");
        form.setValue("email", "");
        form.setValue("password", "");
      },
      onError: () => {
        toast.error("Ada kesalahan terjadi, coba beberapa saat lagi");
      },
    });

  const handleRegisterSubmit = (values: RegisterFormSchema) => {
    registerUser(values);
  };

  return (
    <PageContainer>
      <SectionContainer
        padded
        className="flex min-h-[calc(100vh-144px)] w-full flex-col justify-center"
      >
        <Card className="w-full max-w-[480px] self-center">
          <CardHeader className="flex flex-col items-center justify-center">
            <h1 className="text-3xl font-bold text-primary">
              Selamat Datang Kembali
            </h1>
            <p className="text-muted-foreground">Masuk kalo Qepo 🙉</p>
            <Button variant="secondary" className="w-full" size="lg">
              <FcGoogle />
              Masuk dengan Google
            </Button>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <RegisterFormInner
                isLoading={registerUserIsPending}
                onRegisterSubmit={handleRegisterSubmit}
                buttonText="Masuk"
                showPassword={false}
              />
            </Form>
          </CardContent>

          <CardFooter className="flex flex-col gap-4">
            <p>
              Belum punya akun?{" "}
              <Link href="/register" className="font-bold text-purple-600">
                Daftar dong
              </Link>
            </p>
          </CardFooter>
        </Card>
      </SectionContainer>
    </PageContainer>
  );
};

export default LoginPage;
