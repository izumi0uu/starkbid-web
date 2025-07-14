'use client';
import React, { Suspense } from "react";
import Preloader from "@/components/ui/Preloader";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={<Preloader />}>
      {children}
    </Suspense>
  );
}
