import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { Button } from "../ui/button";

export const Header = () => {
  const { setTheme, theme } = useTheme();

  return (
    <header className="flex h-16 items-center justify-between border-b-2 border-border bg-secondary px-4 md:h-20 md:px-8">
      <Link
        href={"/"}
        className="text-2xl font-bold text-primary hover:cursor-pointer md:text-3xl"
      >
        Qepo App
      </Link>
      <div className="flex gap-x-2">
        <Button onClick={() => setTheme("dark")} size={"icon"}>
          <Moon />
        </Button>
        <Button onClick={() => setTheme("light")} size={"icon"}>
          <Sun />
        </Button>
      </div>
    </header>
  );
};
