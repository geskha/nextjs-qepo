import { Button } from "~/components/ui/button";
import { supabase } from "~/lib/supabase/client";

import { api } from "~/utils/api";

export default function Home() {
  const hello = api.post.hello.useQuery({ text: "GESKHAAAA 222" });

  const handleLogout = () => {
    void supabase.auth.signOut();
  };

  return (
    <>
      <main className="flex min-h-screen flex-col items-center justify-center gap-y-3">
        <h1 className="text-3xl text-primary">Hello Cuk</h1>
        <Button>Sentuk Aku</Button>
        <Button variant="destructive" onClick={handleLogout}>
          Logout
        </Button>
      </main>
    </>
  );
}
