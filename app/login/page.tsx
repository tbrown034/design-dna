"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import { signIn } from "@/lib/auth-client";

export default function LoginPage() {
  return (
    <Suspense>
      <LoginCard />
    </Suspense>
  );
}

function LoginCard() {
  const params = useSearchParams();
  const redirectTo = params.get("redirect") || "/dashboard";

  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleGoogle() {
    setError(null);
    setPending(true);
    const result = await signIn.social({
      provider: "google",
      callbackURL: redirectTo,
    });
    // On success the browser redirects to Google; we only reach here on error.
    if (result?.error) {
      setError(result.error.message ?? "Sign-in failed.");
      setPending(false);
    }
  }

  return (
    <div className="flex min-h-dvh flex-col items-center justify-center bg-paper px-6">
      <div className="w-full max-w-sm">
        <Link href="/" className="font-serif text-2xl tracking-tight text-ink">
          Design DNA
        </Link>

        <h1 className="mt-10 font-serif text-3xl tracking-tight">
          Welcome back
        </h1>
        <p className="mt-2 text-sm text-muted">
          This is a private app. Sign in with the allowlisted Google account.
        </p>

        <button
          type="button"
          onClick={handleGoogle}
          disabled={pending}
          className="mt-8 flex w-full items-center justify-center gap-3 rounded-full border border-line-strong bg-paper-raised py-3 text-ink transition-colors hover:border-ink disabled:opacity-60"
        >
          <GoogleMark />
          {pending ? "Redirecting to Google" : "Continue with Google"}
        </button>

        {error && (
          <p className="mt-4 text-sm text-accent" role="alert">
            {error}
          </p>
        )}

        <p className="mt-8 text-xs text-muted">
          Access is limited to approved accounts. Other Google accounts will be
          declined.
        </p>
      </div>
    </div>
  );
}

function GoogleMark() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden>
      <path
        fill="#4285F4"
        d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844a4.14 4.14 0 0 1-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615z"
      />
      <path
        fill="#34A853"
        d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z"
      />
      <path
        fill="#FBBC05"
        d="M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332z"
      />
      <path
        fill="#EA4335"
        d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z"
      />
    </svg>
  );
}
