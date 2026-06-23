"use client";

import React from "react";

export default function AuthShell({
  children,
  sideContent,
}: {
  children: React.ReactNode;
  sideContent: React.ReactNode;
}) {
  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2">

      {/* LEFT SIDE (Marketing / Image) */}
      <div className="relative hidden md:flex items-center justify-center bg-gradient-to-br from-orange-100 to-yellow-50 p-10">
        {sideContent}
      </div>

      {/* RIGHT SIDE (Form) */}
      <div className="flex items-center justify-center bg-white p-6">
        <div className="w-full max-w-md">{children}</div>
      </div>

    </div>
  );
}
