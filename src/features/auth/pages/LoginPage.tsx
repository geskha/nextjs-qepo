import { useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";

import { zodResolver } from "@hookform/resolvers/zod";
import { AuthError } from "@supabase/supabase-js";
import Link from "next/link";
import { useRouter } from "next/router";
import { toast } from "sonner";
import { GuestRoute } from "~/components/layout/GuestRoute";
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
import { SupabaseAuthErrorCode } from "~/lib/supabase/authErrorCodes";
import { supabase } from "~/lib/supabase/client";
import RegisterFormInner from "../components/RegisterFormInner";
import { registerFormShcema, type RegisterFormSchema } from "../forms/register";

const LoginPage = () => {
  const form = useForm<RegisterFormSchema>({
    resolver: zodResolver(registerFormShcema),
  });

  const router = useRouter();

  const handleLoginSubmit = async (values: RegisterFormSchema) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: values.email,
        password: values.password,
      });

      if (error) throw error;

      await router.replace("/");
    } catch (error) {
      // Handle error supabase auth
      if (error instanceof AuthError) {
        switch (error.code) {
          case SupabaseAuthErrorCode.invalid_credentials:
            form.setError("email", { message: "Email atau password salah" });
            form.setError("password", { message: "Email atau password salah" });
            break;

          case SupabaseAuthErrorCode.email_not_confirmed:
            form.setError("email", { message: "Email belum diverifikasi" });
            break;
          default:
            toast.error("Sebuah kesalahan terjadi, coba beberapa saat lagi");
        }
      }
    }
  };

  return (
    <GuestRoute>
      <PageContainer>
        <SectionContainer padded minFullscreen className="justify-center">
          <Card className="w-full max-w-[480px] self-center">
            <CardHeader className="flex flex-col items-center justify-center">
              <h1 className="text-3xl font-bold text-primary">
                Selamat Datang Kembali 🙉
              </h1>
              <p className="text-muted-foreground">Masuk kalo Qepo</p>
              <Button variant="secondary" className="w-full" size="lg">
                <FcGoogle />
                Masuk dengan Google
              </Button>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <RegisterFormInner
                  // isLoading={registerUserIsPending}
                  onRegisterSubmit={handleLoginSubmit}
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
    </GuestRoute>
  );
};

export default LoginPage;
