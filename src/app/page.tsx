import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center w-full h-screen text-center">
      <h1 className="text-2xl font-bold">Welcome{" "}<span className="text-orange-300">Nigga!</span><br/></h1>
      <p className="text-muted-foreground mb-4">Access Ya Dashboard Here</p>
      <Button>
        <Link href={"/admin"}>Go to Dashboard</Link>
      </Button>
    </div>
  );
}
