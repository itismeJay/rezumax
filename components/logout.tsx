"use client";
import { authClient } from "@/lib/auth-client";
import { Button } from "./ui/button";
import { Loader2, LogOut } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import React from "react";

export const Logout = () => {
  const router = useRouter();
  const [loading, setLoading] = React.useState<boolean>(false);

  const handleLogout = async () => {
    try {
      setLoading(true);
      await authClient.signOut();
      toast.success("Logged out successfully");
      router.push("/");
    } catch (error) {
      toast.error("Logout failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      onClick={handleLogout}
      disabled={loading}
      variant="outline"
      className="flex items-center justify-center cursor-pointer"
    >
      {loading ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : (
        <>
          Logout <LogOut className="h-4 w-4 ml-2" />
        </>
      )}
    </Button>
  );
};
