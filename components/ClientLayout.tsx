'use client';
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Preloader from "@/components/ui/Preloader";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setLoading(false);
    const handleStart = () => setLoading(true);
    const handleComplete = () => setLoading(false);

    // @ts-ignore
    router.events?.on("routeChangeStart", handleStart);
    // @ts-ignore
    router.events?.on("routeChangeComplete", handleComplete);
    // @ts-ignore
    router.events?.on("routeChangeError", handleComplete);

    return () => {
      // @ts-ignore
      router.events?.off("routeChangeStart", handleStart);
      // @ts-ignore
      router.events?.off("routeChangeComplete", handleComplete);
      // @ts-ignore
      router.events?.off("routeChangeError", handleComplete);
    };
  }, [router]);

  return (
    <>
      {loading && <Preloader />}
      {children}
    </>
  );
}