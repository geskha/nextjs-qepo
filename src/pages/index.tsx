import Link from "next/link";
import { Button } from "~/components/ui/button";
import { supabase } from "~/lib/supabase/client";

import { api } from "~/utils/api";

export default function Home() {
  const { data: getProfileData } = api.profile.getProfile.useQuery();

  const handleLogout = () => {
    void supabase.auth.signOut();
  };

  return (
    <>
      <main className="flex min-h-screen flex-col items-center justify-center gap-y-3">
        <h1 className="text-3xl text-primary">Hello Cuk</h1>
        <Button>Sentuk Aku</Button>
        {getProfileData?.username ? (
          <Button variant="destructive" onClick={handleLogout}>
            Logout
          </Button>
        ) : (
          <Link href="/login" className="font-bold">
            Login
          </Link>
        )}
      </main>
    </>
  );
}
