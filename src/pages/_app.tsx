import { GeistSans } from "geist/font/sans";
import { type AppType } from "next/app";
import { ThemeProvider } from "~/components/theme-provider";

import { api } from "~/utils/api";

import { Toaster } from "~/components/ui/sonner";
import "~/styles/globals.css";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem
      disableTransitionOnChange
    >
      <div className={GeistSans.className}>
        <Component {...pageProps} />
        <Toaster position="top-center" />
      </div>
    </ThemeProvider>
  );
};

export default api.withTRPC(MyApp);
