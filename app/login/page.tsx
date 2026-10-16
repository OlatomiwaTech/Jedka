"use client";

import { useState } from "react";

export default function LoginPage() {
  const [phone, setPhone] = useState("8123456789");
  const [displayName, setDisplayName] = useState("Ada");
  const [otp, setOtp] = useState("123456");
  const [status, setStatus] = useState<string | null>(null);

  async function handleRequestOtp() {
    const response = await fetch("/api/auth/request-otp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ phone, countryCode: "+234" }),
    });

    const data = await response.json();
    setStatus(JSON.stringify(data, null, 2));
  }

  async function handleVerifyOtp() {
    const response = await fetch("/api/auth/verify-otp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ phone, code: otp, displayName }),
    });

    const data = await response.json();
    setStatus(JSON.stringify(data, null, 2));
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-950 px-4 text-slate-100">
      <div className="w-full max-w-md rounded-3xl border border-slate-800 bg-slate-900 p-6 shadow-2xl shadow-emerald-950/30">
        <p className="text-xs uppercase tracking-[0.25em] text-emerald-400">ChatWave</p>
        <h1 className="mt-3 text-3xl font-semibold">Welcome back</h1>
        <p className="mt-2 text-sm text-slate-400">Sign in with your phone number and verify the demo OTP.</p>

        <div className="mt-6 space-y-4">
          <label className="block text-sm text-slate-300">
            Phone number
            <input
              value={phone}
              onChange={(event) => setPhone(event.target.value)}
              className="mt-1 w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-slate-100 focus:border-emerald-500 focus:outline-none"
            />
          </label>

          <label className="block text-sm text-slate-300">
            Display name
            <input
              value={displayName}
              onChange={(event) => setDisplayName(event.target.value)}
              className="mt-1 w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-slate-100 focus:border-emerald-500 focus:outline-none"
            />
          </label>

          <label className="block text-sm text-slate-300">
            OTP
            <input
              value={otp}
              onChange={(event) => setOtp(event.target.value)}
              className="mt-1 w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-slate-100 focus:border-emerald-500 focus:outline-none"
            />
          </label>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={handleRequestOtp}
              className="flex-1 rounded-xl border border-slate-700 bg-slate-800 px-4 py-2 font-medium text-slate-100 hover:bg-slate-700"
            >
              Request OTP
            </button>
            <button
              type="button"
              onClick={handleVerifyOtp}
              className="flex-1 rounded-xl bg-emerald-500 px-4 py-2 font-medium text-slate-950 hover:bg-emerald-400"
            >
              Verify
            </button>
          </div>

          {status ? (
            <pre className="overflow-auto rounded-xl border border-slate-800 bg-slate-950 p-3 text-xs text-emerald-300">
              {status}
            </pre>
          ) : null}
        </div>
      </div>
    </main>
  );
}
