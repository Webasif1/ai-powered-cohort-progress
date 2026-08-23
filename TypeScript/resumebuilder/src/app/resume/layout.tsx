import type { Metadata } from "next";

/**
 * Everything under `/resume` is one user's private document. These pages are
 * client components and cannot export metadata themselves, so the noindex
 * directive has to live on the segment.
 *
 * Deliberately no `title` here — that would apply to the editor and the
 * preview as well as the dashboard, and mislabel both.
 */
export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default function ResumeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
