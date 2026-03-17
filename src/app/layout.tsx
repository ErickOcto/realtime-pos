import { Public_Sans } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/providers/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip"
import AuthStoreProvider from "@/providers/auth-store-provider";
import { cookies } from "next/headers";

const publicSans = Public_Sans({subsets:['latin'],variable:'--font-sans'});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const profile = JSON.parse(cookieStore.get('user_profile')?.value ?? '{}');
  return (
    <html lang="en" className={cn("font-sans", publicSans.variable)} suppressHydrationWarning>
      <body>
        <AuthStoreProvider profile={profile}>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            <TooltipProvider>
              {children}
            </TooltipProvider>
            <Toaster></Toaster>
          </ThemeProvider>
        </AuthStoreProvider>
      </body>
    </html>
  );
}
