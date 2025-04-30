"use client";

import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

interface BackButtonProps {
  className?: string;
}

export default function BackButton({ className = "" }: BackButtonProps) {
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()}
      className={`flex items-center text-gray-400 hover:text-white transition-colors ${className}`}
    >
      <ArrowLeft className="w-4 h-4 mr-2" />
      Back
    </button>
  );
}
