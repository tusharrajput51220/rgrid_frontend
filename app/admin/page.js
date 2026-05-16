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
      <main className="relative h-screen w-screen overflow-hidden flex flex-col items-center justify-center">
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
    <main className="relative h-screen w-screen overflow-hidden flex flex-col">
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

      {/* Dashboard content — fills remaining height, no scroll */}
      <section className="relative z-10 flex-1 min-h-0 flex flex-col w-full max-w-10xl mx-auto px-4 sm:px-6 lg:px-8">
        <DashboardStats initialData={dashboardData} />
      </section>
    </main>
  );
}
