"use client";

import { useEffect, useState } from "react";
import { useSocket } from "@/context/SocketContext";
import VoteChart from "./VoteChart";

export default function DashboardStats({ initialData }) {
  const socket = useSocket();
  const [nominees, setNominees] = useState(initialData?.nominees || []);
  const [totalVotes, setTotalVotes] = useState(initialData?.totalVotes || 0);

  useEffect(() => {
    socket.connect();
    socket.emit("joinAdminDashboard");

    socket.on("voteUpdated", (data) => {
      setNominees(data);
      const total = data.reduce((sum, item) => sum + item.votes, 0);
      setTotalVotes(total);
    });

    return () => {
      socket.off("voteUpdated");
      socket.disconnect();
    };
  }, [socket]);

  return (
    <div className="min-h-screen lg:h-screen w-full bg-[#0b0f19] text-gray-100 p-4 lg:p-6 flex flex-col overflow-x-hidden">
      {/* Header - Compact and Clean */}
      <div className="flex flex-col sm:flex-row justify-between items-center border-b border-gray-800/60 pb-4 mb-6 shrink-0">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
            Admin Dashboard
          </h1>
          <p className="text-xs md:text-sm text-gray-400 mt-0.5 flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            Live vote tracking in real time
          </p>
        </div>
      </div>

      {/* Main Grid Split Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 flex-1 min-h-0">
        {/* LEFT COLUMN: Stats & Cards (Takes 5/12 width) */}
        <div className="lg:col-span-5 flex flex-col gap-6 min-h-0">
          {/* Total Votes Card */}
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-600 via-indigo-700 to-blue-700 p-6 shadow-xl shadow-indigo-950/20 shrink-0">
            <div className="absolute right-0 bottom-0 translate-x-4 translate-y-4 opacity-10 pointer-events-none">
              <svg
                width="160"
                height="160"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" />
              </svg>
            </div>
            <p className="text-xs font-semibold uppercase tracking-wider text-indigo-200">
              Total Valid Votes
            </p>
            <h2 className="mt-1 text-4xl lg:text-5xl font-black tracking-tight">
              {totalVotes}
            </h2>
          </div>

          {/* Individual Nominee List Wrapper */}
          <div className="flex-1 min-h-0 bg-[#131926]/40 border border-gray-800/80 rounded-2xl p-4 flex flex-col">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 px-1 shrink-0">
              Nominees Standings
            </h3>

            {/* Scrollable container optimized if items overflow, but handles layout nicely */}
            <div className="flex-1 overflow-y-auto custom-scrollbar pr-1 space-y-2.5">
              {nominees.map((item) => (
                <div
                  key={item._id}
                  className="flex items-center justify-between p-3.5 rounded-xl bg-[#161f30]/60 border border-gray-800/50 hover:border-gray-700/60 transition-all duration-200 group"
                >
                  <div className="flex items-center gap-3.5">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-sm font-bold text-indigo-400 group-hover:bg-indigo-500 group-hover:text-white transition-all duration-300">
                      {item.name.charAt(0).toUpperCase()}
                    </div>
                    <span className="font-medium text-sm text-gray-200 group-hover:text-white transition-colors">
                      {item.name}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-lg font-bold font-mono text-indigo-400 bg-indigo-500/5 px-3 py-1 rounded-md border border-indigo-500/10">
                      {item.votes}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Visual Analytics Chart (Takes 7/12 width) */}
        <div className="lg:col-span-7 flex flex-col min-h-0">
          <VoteChart data={nominees} />
        </div>
      </div>
    </div>
  );
}
