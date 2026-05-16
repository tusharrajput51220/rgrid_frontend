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
    <div className="space-y-8">
      {/* heading */}
      <div className="text-center">
        <h1 className="text-3xl md:text-5xl font-bold text-gray-900">
          Admin Dashboard
        </h1>

        <p className="mt-2 text-gray-600">Live vote tracking in real time</p>
      </div>

      {/* total votes */}
      <div className="rounded-3xl bg-gradient-to-r from-blue-600 to-indigo-600 p-8 text-white shadow-xl">
        <p className="text-lg">Total Votes</p>

        <h2 className="mt-2 text-5xl font-bold">{totalVotes}</h2>
      </div>

      {/* nominee cards */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
        {nominees.map((item) => (
          <div
            key={item._id}
            className="rounded-2xl bg-white p-6 shadow-md border border-gray-200 text-center"
          >
            <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-blue-600 text-xl font-bold text-white">
              {item.name.charAt(0)}
            </div>

            <h3 className="font-bold text-gray-900">{item.name}</h3>

            <p className="mt-2 text-2xl font-bold text-blue-600">
              {item.votes}
            </p>
          </div>
        ))}
      </div>

      {/* chart */}
      <VoteChart data={nominees} />
    </div>
  );
}
