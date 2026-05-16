"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

export default function VoteChart({ data }) {
  return (
    <div className="h-full flex flex-col bg-[#131926]/40 border border-gray-800/80 rounded-2xl p-5 shadow-xl">
      <div className="mb-4 shrink-0">
        <h2 className="text-sm font-bold text-gray-400 uppercase tracking-wider">
          Vote Distribution
        </h2>
      </div>

      {/* Recharts container dynamically scales to the explicit heights of the dashboard grid */}
      <div className="flex-1 w-full min-h-[300px] lg:min-h-0">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
          >
            <defs>
              <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#6366f1" stopOpacity={1} />
                <stop offset="100%" stopColor="#3b82f6" stopOpacity={0.2} />
              </linearGradient>
            </defs>

            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#1f293d"
              vertical={false}
            />

            <XAxis
              dataKey="name"
              stroke="#64748b"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              dy={10}
            />

            <YAxis
              stroke="#64748b"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              allowDecimals={false}
            />

            <Tooltip
              contentStyle={{
                backgroundColor: "#161f30",
                borderColor: "#374151",
                borderRadius: "12px",
                color: "#f3f4f6",
              }}
              cursor={{ fill: "#1e293b", opacity: 0.4 }}
            />

            <Bar
              dataKey="votes"
              radius={[6, 6, 0, 0]}
              fill="url(#barGradient)"
              maxBarSize={50}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
