import Link from "next/link";
import { Button } from "~/components/ui/button";

import { api } from "~/utils/api";

export default function Home() {
  const hello = api.post.hello.useQuery({ text: "GESKHAAAA 222" });

  return (
    <>
      <main className="flex min-h-screen flex-col items-center justify-center gap-y-3">
        <h1 className="text-3xl text-primary">Hello Cuk</h1>
        <Link href="/register">
          <Button>Register</Button>
        </Link>
      </main>
    </>
  );
}
