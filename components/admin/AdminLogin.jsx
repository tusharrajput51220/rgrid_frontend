"use client";

import { useState } from "react";

export default function AdminLogin({ onLogin, loading }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(username, password);
  };

  return (
    <main className="relative min-h-screen overflow-hidden flex items-center justify-center">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1540910419892-4a36d2c3266c?auto=format&fit=crop&w=2000&q=80')",
        }}
      />
      <div className="absolute inset-0 bg-[#020810]/85" />
      {/* Noise grain */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")",
        }}
      />
      {/* Top accent */}
      <div className="absolute top-0 left-0 right-0 h-[2px] z-20 bg-gradient-to-r from-transparent via-blue-600 to-transparent" />

      {/* Card */}
      <div
        className="relative z-10 w-full max-w-sm mx-4 border border-[#1e3a5f] overflow-hidden"
        style={{
          borderRadius: "6px",
          background: "rgba(5,13,26,0.85)",
          backdropFilter: "blur(20px)",
          boxShadow:
            "0 0 0 1px rgba(37,99,235,0.07), 0 32px 64px rgba(0,0,0,0.6)",
        }}
      >
        {/* Top bar */}
        <div
          className="h-1 w-full"
          style={{
            background:
              "linear-gradient(90deg, #1e3a5f 0%, #2563eb 50%, #1e3a5f 100%)",
          }}
        />

        {/* Machine header strip */}
        <div
          className="flex items-center justify-between px-4 py-2 border-b border-[#1e3a5f]"
          style={{ background: "rgba(10,22,40,0.9)" }}
        >
          <div className="flex items-center gap-2">
            <div className="h-1.5 w-1.5 rounded-full bg-red-500 opacity-60" />
            <div className="h-1.5 w-1.5 rounded-full bg-yellow-500 opacity-60" />
            <div className="h-1.5 w-1.5 rounded-full bg-green-500 opacity-60" />
          </div>
          <p className="text-[9px] uppercase tracking-[0.25em] text-white/20">
            Admin Terminal — Secure Access
          </p>
          <div className="flex items-center gap-1.5">
            <div className="h-1.5 w-1.5 rounded-full bg-blue-500 animate-pulse" />
            <span className="text-[9px] text-blue-400 tracking-widest">
              SECURE
            </span>
          </div>
        </div>

        <div className="px-8 pt-8 pb-8">
          {/* Emblem */}
          <div className="flex flex-col items-center mb-8">
            <div
              className="flex h-14 w-14 items-center justify-center border border-blue-700/50 mb-4"
              style={{
                borderRadius: "3px",
                background: "rgba(37,99,235,0.08)",
              }}
            >
              <svg
                viewBox="0 0 24 24"
                className="w-7 h-7 text-blue-400"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"
                />
              </svg>
            </div>

            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-blue-400 mb-1">
              Electoral Commission
            </p>
            <h1
              className="text-2xl font-black text-white text-center leading-tight"
              style={{
                fontFamily: "'Georgia', serif",
                letterSpacing: "-0.02em",
              }}
            >
              Admin Portal
            </h1>
            <p className="mt-1.5 text-[11px] text-white/30 uppercase tracking-[0.15em]">
              Authorised Personnel Only
            </p>
          </div>

          {/* Divider */}
          <div className="flex items-center gap-3 mb-7">
            <div className="flex-1 h-px bg-[#1e3a5f]" />
            <span className="text-[9px] uppercase tracking-[0.2em] text-white/20">
              Credentials
            </span>
            <div className="flex-1 h-px bg-[#1e3a5f]" />
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Username */}
            <div>
              <label className="block text-[10px] font-black uppercase tracking-[0.18em] text-blue-400/80 mb-2">
                Username
              </label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
                  <svg
                    viewBox="0 0 24 24"
                    className="w-4 h-4 text-white/20"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                    />
                  </svg>
                </div>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="admin"
                  required
                  autoComplete="username"
                  className="w-full pl-9 pr-4 py-3 text-sm text-white placeholder-white/20 border border-[#1e3a5f] bg-[#050d1a] outline-none transition-all duration-200 focus:border-blue-600 focus:bg-[#070f1f]"
                  style={{ borderRadius: "3px", letterSpacing: "0.04em" }}
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-[10px] font-black uppercase tracking-[0.18em] text-blue-400/80 mb-2">
                Password
              </label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
                  <svg
                    viewBox="0 0 24 24"
                    className="w-4 h-4 text-white/20"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
                    />
                  </svg>
                </div>
                <input
                  type={showPass ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  autoComplete="current-password"
                  className="w-full pl-9 pr-11 py-3 text-sm text-white placeholder-white/20 border border-[#1e3a5f] bg-[#050d1a] outline-none transition-all duration-200 focus:border-blue-600 focus:bg-[#070f1f]"
                  style={{ borderRadius: "3px", letterSpacing: "0.06em" }}
                />
                <button
                  type="button"
                  onClick={() => setShowPass((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/20 hover:text-white/50 transition-colors"
                  tabIndex={-1}
                >
                  {showPass ? (
                    <svg
                      viewBox="0 0 24 24"
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={1.5}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                      />
                    </svg>
                  ) : (
                    <svg
                      viewBox="0 0 24 24"
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={1.5}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Submit */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className={`relative w-full py-3 text-xs font-black uppercase tracking-[0.2em] transition-all duration-200 overflow-hidden
                  ${
                    loading
                      ? "cursor-not-allowed bg-[#0a1628] text-white/20 border border-[#1e3a5f]"
                      : "bg-blue-700 hover:bg-blue-600 text-white border border-blue-600 hover:border-blue-400 active:scale-[0.99]"
                  }`}
                style={{ borderRadius: "3px" }}
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg
                      className="animate-spin h-3.5 w-3.5 text-white/30"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v8z"
                      />
                    </svg>
                    Authenticating…
                  </span>
                ) : (
                  "Authenticate & Enter"
                )}
              </button>
            </div>
          </form>

          {/* Footer note */}
          <p className="mt-6 text-center text-[9px] uppercase tracking-[0.15em] text-white/15 leading-relaxed">
            Unauthorised access is a criminal offence
          </p>
        </div>

        {/* Bottom bar */}
        <div
          className="h-[3px] w-full"
          style={{
            background:
              "linear-gradient(90deg, transparent, #1e3a5f, transparent)",
          }}
        />
      </div>
    </main>
  );
}
