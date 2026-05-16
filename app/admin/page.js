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
    } catch (error) {
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (username, password) => {
    try {
      setLoading(true);

      await api.post("/admin/login", {
        username,
        password,
      });

      const res = await api.get("/admin/dashboard");

      setDashboardData(res.data.data);

      setIsAuthenticated(true);

      toast.success("Admin login successful");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="h-14 w-14 rounded-full border-4 border-blue-600 border-t-transparent animate-spin" />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16">
        {!isAuthenticated ? (
          <AdminLogin onLogin={handleLogin} loading={loading} />
        ) : (
          <DashboardStats initialData={dashboardData} />
        )}
      </section>
    </main>
  );
}
