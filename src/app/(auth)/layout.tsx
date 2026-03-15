import { DarkModeToggle } from "@/components/common/dark-mode-toggle";
import { ThreeDViewIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import Image from "next/image";

export default function AuthLayout({children}: {children: React.ReactNode}) {
    return (
        <div className="relative flex items-center justify-items-center w-full">
            <div className="absolute top-4 right-4 z-11">
                <DarkModeToggle></DarkModeToggle>
            </div>
            <div
              className="absolute inset-0 -z-1 h-full w-full bg-white dark:bg-black bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#101010_1px,transparent_1px),linear-gradient(to_bottom,#101010_1px,transparent_1px)] bg-[size:48px_48px]"
            ></div>            
            <main className="w-1/2 mx-32 flex flex-col gap-4 sm:items-start">
              <div className="mx-auto flex flex-col w-2/3 text-center mb-2">
                <div className="flex items-center justify-items-center mb-2 mx-auto">
                  <div className="rounded-lg bg-primary p-2 text-white">
                    <HugeiconsIcon icon={ThreeDViewIcon} size={36} strokeWidth={1.5}></HugeiconsIcon>
                  </div>
                  <h1 className="text-2xl font-bold ml-2">Realtime POS</h1>
                </div>
              </div>
              <div className="w-4/5 mx-auto">
                {children}
              </div>
            </main>
            <Image alt="cashier.jpg" className="w-1/2 h-screen object-cover z-10 rounded-l-xl" width={100} height={100} src={"/img/cashier.jpg"} unoptimized>
            </Image>            
        </div>
    );
}