"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Loader2 } from "lucide-react";

export default function Home() {
  const router = useRouter();
  const [Loading, setLoading] = useState(false);

  async function handleAction() {
    setLoading(true);
    // wait for 3 seconds
    await new Promise((resolve) => setTimeout(resolve, 3000));
    setLoading(false);
    router.push("/accounts");
  }
  return (
    <div className="bg-gradient-to-br from-[#0f0f0f] to-[#222222] min-h-screen flex flex-col items-center justify-center text-white p-4">
      <h1 className="text-6xl font-bold text-center">Twitter Bot Automation</h1>
      <p className="mt-4 text-xl text-center">
        Powered by <span className="font-bold">AWS</span>
      </p>
      <Button
        onClick={handleAction}
        className="mt-8 bg-[#bd1e59] hover:bg-[#a31648] text-white font-bold py-2 px-4 rounded"
      >
        {Loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        Get Started
      </Button>
    </div>
  );
}
