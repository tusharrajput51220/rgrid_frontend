"use client";

export default function NomineeCard({ nominee, onVote, voting, hasVoted }) {
  return (
    <div className="group rounded-2xl border border-gray-200 bg-white p-6 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-3xl font-bold text-white shadow-lg">
        {nominee.name.charAt(0)}
      </div>

      <h2 className="text-center text-2xl font-bold text-gray-900">
        {nominee.name}
      </h2>

      <p className="mt-2 text-center text-gray-500">
        Current Votes:
        <span className="ml-2 font-semibold text-blue-600">
          {nominee.votes}
        </span>
      </p>

      <button
        onClick={() => onVote(nominee._id)}
        disabled={voting || hasVoted}
        className={`mt-6 w-full rounded-xl py-3 font-semibold text-white transition-all duration-300
          ${
            voting || hasVoted
              ? "cursor-not-allowed bg-gray-400"
              : "bg-blue-600 hover:bg-blue-700 hover:scale-[1.02]"
          }`}
      >
        {hasVoted ? "Already Voted" : voting ? "Submitting..." : "Vote Now"}
      </button>
    </div>
  );
}
