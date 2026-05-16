"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import api from "@/lib/axios";

import AdminLogin from "@/components/admin/AdminLogin";
import DashboardStats from "@/components/admin/DashboardStats";

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loginLoading, setLoginLoading] = useState(false);

  useEffect(() => {
    checkAdminSession();
  }, []);

  const checkAdminSession = async () => {
    try {
      const check = await api.get("/admin/check");
      if (check.status === 200) {
        const res = await api.get("/admin/dashboard");
        setDashboardData(res.data.data);
        setIsAuthenticated(true);
      }
    } catch {
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (username, password) => {
    try {
      setLoginLoading(true);
      await api.post("/admin/login", { username, password });
      const res = await api.get("/admin/dashboard");
      setDashboardData(res.data.data);
      setIsAuthenticated(true);
      toast.success("Admin login successful");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Login failed");
    } finally {
      setLoginLoading(false);
    }
  };

  /* ── Full-screen themed loader ── */
  if (loading) {
    return (
      <main className="relative min-h-screen overflow-hidden flex flex-col items-center justify-center">
        {/* Background */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1540910419892-4a36d2c3266c?auto=format&fit=crop&w=2000&q=80')",
          }}
        />
        <div className="absolute inset-0 bg-[#020810]/85" />
        <div className="absolute top-0 left-0 right-0 h-[2px] z-20 bg-gradient-to-r from-transparent via-blue-600 to-transparent" />

        <div className="relative z-10 flex flex-col items-center gap-5">
          {/* Spinner */}
          <div className="relative h-14 w-14">
            <div className="absolute inset-0 rounded-full border border-white/10" />
            <div className="absolute inset-0 rounded-full border border-t-blue-400 border-r-transparent border-b-transparent border-l-transparent animate-spin" />
            <div className="absolute inset-2 rounded-full border border-t-transparent border-r-blue-700 border-b-transparent border-l-transparent animate-spin [animation-direction:reverse] [animation-duration:0.7s]" />
          </div>
          <div className="flex flex-col items-center gap-1">
            <p className="text-[10px] font-black uppercase tracking-[0.25em] text-blue-400 animate-pulse">
              Verifying Session
            </p>
            <p className="text-[9px] uppercase tracking-[0.15em] text-white/20">
              Electoral Commission · Admin Terminal
            </p>
          </div>
        </div>
      </main>
    );
  }

  /* ── Unauthenticated → Login ── */
  if (!isAuthenticated) {
    return <AdminLogin onLogin={handleLogin} loading={loginLoading} />;
  }

  /* ── Authenticated → Dashboard ── */
  return (
    <main className="relative min-h-screen overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1540910419892-4a36d2c3266c?auto=format&fit=crop&w=2000&q=80')",
        }}
      />
      <div className="absolute inset-0 bg-[#020810]/88" />
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

      {/* Top nav bar */}
      <header className="relative z-10 border-b border-[#1e3a5f] bg-[#050d1a]/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
          {/* Left: branding */}
          <div className="flex items-center gap-3">
            <div
              className="flex h-8 w-8 items-center justify-center border border-blue-700/50"
              style={{
                borderRadius: "3px",
                background: "rgba(37,99,235,0.08)",
              }}
            >
              <svg
                viewBox="0 0 24 24"
                className="w-4 h-4 text-blue-400"
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
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-400 leading-none">
                Electoral Commission
              </p>
              <p className="text-[9px] uppercase tracking-[0.15em] text-white/25 leading-none mt-0.5">
                Admin Dashboard
              </p>
            </div>
          </div>

          {/* Right: status badges */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-red-500" />
              </span>
              <span className="text-[9px] font-black uppercase tracking-[0.2em] text-red-400">
                Live Election
              </span>
            </div>
            <div className="h-3 w-px bg-white/10" />
            <div className="flex items-center gap-1.5">
              <div className="h-1.5 w-1.5 rounded-full bg-blue-500 animate-pulse" />
              <span className="text-[9px] uppercase tracking-[0.15em] text-blue-400">
                Authenticated
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Dashboard content */}
      <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <DashboardStats initialData={dashboardData} />
      </section>
    </main>
  );
}
