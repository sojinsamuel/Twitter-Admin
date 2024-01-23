"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <div className="bg-gradient-to-br from-[#0f0f0f] to-[#222222] min-h-screen flex flex-col items-center justify-center text-white p-4">
      <h1 className="text-6xl font-bold text-center">Twitter Bot Automation</h1>
      <p className="mt-4 text-xl text-center">
        Powered by <span className="font-bold">AWS</span>
      </p>
      <Button
        onClick={() => router.push("/accounts")}
        className="mt-8 bg-[#bd1e59] hover:bg-[#a31648] text-white font-bold py-2 px-4 rounded"
      >
        Get Started
      </Button>
    </div>
  );
}
