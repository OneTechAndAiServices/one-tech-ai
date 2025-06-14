'use client';

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/admin/Navbar";

export default function AdminLayout({ children }) {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/login");
    }
  }, [router]); // ✅ Add router as a dependency

  return (
    <>
      <Navbar />
      {children}
    </>
  );
}
