import { DarkModeToggle } from "@/components/common/dark-mode-toggle";
import { ThreeDViewIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

export default function AuthLayout({children}: {children: React.ReactNode}) {
    return (
    <div className="grid min-h-svh lg:grid-cols-2">
            <div className="absolute top-4 right-4 z-11">
                <DarkModeToggle></DarkModeToggle>
            </div>
            <div
              className="absolute inset-0 -z-1 h-full w-full bg-white dark:bg-black bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#101010_1px,transparent_1px),linear-gradient(to_bottom,#101010_1px,transparent_1px)] bg-size-[48px_48px]"
            ></div>         
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <a href="#" className="flex items-center gap-2 font-medium">
            <div className="flex size-12 items-center justify-center bg-primary text-primary-foreground rounded-lg">
              <HugeiconsIcon icon={ThreeDViewIcon} size={36} strokeWidth={1.5}></HugeiconsIcon>
            </div>
            <h1 className="text-2xl font-bold">Realtime POS</h1>
          </a>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            {children}
          </div>
        </div>
      </div>
      <div className="relative hidden lg:block">
        <img
          src="/img/cashier.jpg"
          alt="Image"
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] rounded-l-4xl dark:grayscale"
        />
      </div>
    </div>
    )
}

