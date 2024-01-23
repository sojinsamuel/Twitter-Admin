"use client";

import { Loader2, PlusIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { unstable_noStore as noStore } from "next/cache";
export function AddAccount() {
  noStore();
  const [oauthURL, setOauthURL] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleAddNewAccount = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("/api/add-account", {
        next: { revalidate: 0 },
        cache: "no-store",
      });
      const data = await response.json();
      console.log("====================================");
      console.log("OAuth URL", data.url);
      console.log("====================================");
      location.href = data.url;
      setOauthURL(data.url);
    } catch (error) {
      console.error("Failed to fetch OAuth URL:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button variant="blue" disabled={isLoading} onClick={handleAddNewAccount}>
      {isLoading ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Please wait
        </>
      ) : (
        <>
          <PlusIcon className="mr-2 h-4 w-4" /> Add Account
        </>
      )}{" "}
    </Button>
  );
}
