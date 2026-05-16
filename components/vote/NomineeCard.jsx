"use client";

export default function NomineeCard({
  nominee,
  onVote,
  voting,
  hasVoted,
  index,
}) {
  return (
    <div className="group relative flex items-center justify-between border border-slate-800 bg-[#131929] p-4 shadow-sm transition-all duration-200 hover:border-slate-700 hover:bg-[#161d30]">
      {/* Index Number Indicator (EVM Serial Panel) */}
      <div className="flex h-10 w-10 flex-none items-center justify-center border border-slate-800 bg-slate-950 font-mono text-xs font-bold text-slate-400 group-hover:border-slate-700 group-hover:text-slate-200">
        {String(index).padStart(2, "0")}
      </div>

      {/* Candidate Identifier Plate */}
      <div className="ml-5 flex-1 min-w-0">
        <h2 className="truncate text-base font-bold tracking-tight text-slate-200">
          {nominee.name}
        </h2>
        <div className="mt-0.5 flex items-center gap-3 font-mono text-xs text-slate-500">
          <span>ID: {nominee._id?.substring(0, 8).toUpperCase() || "N/A"}</span>
          <span className="inline-block h-1 w-1 rounded-full bg-slate-700" />
          <span>
            Aggregated Votes:{" "}
            <strong className="font-semibold text-slate-400">
              {nominee.votes}
            </strong>
          </span>
        </div>
      </div>

      {/* EVM Mechanical Action Station */}
      <div className="ml-4 flex items-center gap-6 flex-none">
        {/* Status Light Beacon */}
        <div className="flex flex-col items-center gap-1">
          <span className="text-[9px] font-mono tracking-wider text-slate-600 uppercase font-bold">
            Ready
          </span>
          <div
            className={`h-3 w-3 rounded-full transition-all duration-300 ${
              hasVoted
                ? "bg-slate-800 shadow-none"
                : "bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.6)] animate-pulse"
            }`}
          />
        </div>

        {/* Tactile EVM Mechanical Trigger Button */}
        <button
          onClick={() => onVote(nominee._id)}
          disabled={voting || hasVoted}
          className={`relative h-11 px-6 font-mono text-xs font-bold uppercase tracking-wider transition-all duration-150 active:translate-y-0.5
            ${
              voting || hasVoted
                ? "cursor-not-allowed border border-slate-800 bg-slate-900 text-slate-600"
                : "border-b-4 border-blue-800 bg-blue-600 text-white shadow-md shadow-blue-950/50 hover:bg-blue-500 active:border-b-0 active:mt-[4px]"
            }`}
          style={{ minWidth: "120px" }}
        >
          {hasVoted ? "Recorded" : voting ? "Casting..." : "Vote"}
        </button>
      </div>

      {/* Left Highlight Edge Accent */}
      <div className="absolute top-0 bottom-0 left-0 w-[2px] bg-transparent group-hover:bg-blue-500/50 transition-colors" />
    </div>
  );
}
