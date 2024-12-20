import {Menu, MenuIcon, MenuSquareIcon} from "lucide-react";
import {Button} from "../ui/button";
import {useTheme} from "@solorev/react-themes";
import {motion} from "motion/react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {DialogHeader} from "../ui/dialog";
import {useEffect, useId, useRef, useState} from "react";
import {useRouter} from "@tanstack/react-router";
import Image from "../scrapp/image";

export function Header() {
  const {theme, setTheme} = useTheme();

  const router = useRouter();
  const divRef = useRef<HTMLDivElement>(null);
  console.log(theme);

  return (
    <div>
      <div className="sticky top-0 z-10 flex h-16 w-full justify-center border-t border-neutral-200 bg-neutral-800 font-khand dark:border-neutral-800 dark:bg-neutral-200">
        <meta
          name="theme-color"
          content={theme == "light" ? "#262626" : "#E5E5E5"}
          key={"tsidididi"}
        />
        <meta
          name="theme-colorxxxxx"
          content={theme == "light" ? "#262626" : "#E5E5E5"}
        />
        <div className="z-50 flex w-11/12 items-center justify-between md:w-4/5">
          <div className="flex h-full items-center justify-start md:flex-1">
            <div className="hidden h-full w-full max-w-32 items-center justify-center border-x-neutral-200 text-background dark:border-x-neutral-800 md:flex md:border-x">
              <motion.div
                ref={divRef}
                layout
                initial={{y: -50}}
                animate={{y: 0}}
                transition={{
                  layout: {
                    type: "spring",
                    bounce: 0,
                    visualDuration: 1,
                  },
                }}
                className="relative top-0 hidden h-full w-full items-center justify-center bg-neutral-800 transition-all duration-300 ease-in-out hover:top-2 dark:bg-neutral-200 md:flex"
              >
                <p className="font-medium">Partners</p>
              </motion.div>
            </div>
          </div>
          <div className="flex flex-1 md:flex-[3] md:justify-center">
            <Image />
          </div>
          <div className="flex flex-1 justify-end">
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  variant={"secondary"}
                  className=""
                  onClick={() => (document.body.className = "overflow-hidden")}
                >
                  <MenuSquareIcon size={48} className="h-24 w-24" />
                </Button>
              </DialogTrigger>
              <DialogContent
                className="flex h-full w-full flex-col bg-neutral-800 text-background dark:bg-neutral-200"
                onCloseAutoFocus={() => (document.body.className = "xxx")}
              >
                <motion.div
                  layout
                  initial={{x: -100}}
                  animate={{x: 0}}
                  transition={{layout: {type: "spring", duration: 3}}}
                  className=""
                >
                  <div>
                    <button
                      className="bg-red-300"
                      onClick={() => {
                        setTheme("light");
                      }}
                    >
                      <p>light</p>
                    </button>
                    <button
                      className="bg-green-200"
                      onClick={() => {
                        setTheme("dark");
                      }}
                    >
                      <p>dark</p>
                    </button>
                  </div>
                </motion.div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
      {/* <div className="sticky top-0 flex w-full items-center justify-center border-t border-neutral-200 bg-neutral-800 px-4 py-2 font-khand text-3xl font-semibold text-background dark:border-neutral-800 dark:bg-neutral-200 md:hidden"></div> */}
    </div>
  );
}
