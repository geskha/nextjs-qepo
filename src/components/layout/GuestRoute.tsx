import { useRouter } from "next/router";
import { PropsWithChildren, useEffect } from "react";
import { supabase } from "~/lib/supabase/client";

export const GuestRoute = (props: PropsWithChildren) => {
  const router = useRouter();

  useEffect(() => {
    void (async function () {
      const { data, error } = await supabase.auth.getUser();

      if (data.user) {
        await router.replace("/");
      }
    })();
  }, []);

  return props.children;
};
