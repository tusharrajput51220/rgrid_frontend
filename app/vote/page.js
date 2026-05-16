"use client";

import { useEffect, useState } from "react";
import api from "@/lib/axios";
import toast from "react-hot-toast";
import NomineeCard from "@/components/vote/NomineeCard";

export default function VotePage() {
  const [nominees, setNominees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [voting, setVoting] = useState(false);
  const [hasVoted, setHasVoted] = useState(false);

  useEffect(() => {
    fetchNominees();
  }, []);

  const fetchNominees = async () => {
    try {
      const res = await api.get("/votes/nominees");
      setNominees(res.data.data);
    } catch (error) {
      toast.error("Failed to load nominees");
    } finally {
      setLoading(false);
    }
  };

  const handleVote = async (nomineeId) => {
    try {
      setVoting(true);

      await api.post("/votes/cast", {
        nomineeId,
      });

      setHasVoted(true);

      toast.success("Vote submitted successfully");

      await fetchNominees();
    } catch (error) {
      toast.error(error?.response?.data?.message || "Voting failed");
    } finally {
      setVoting(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50">
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16">
        <div className="mb-12 text-center">
          <h1 className="text-3xl md:text-5xl font-bold text-gray-900">
            Online Live Polling
          </h1>

          <p className="mt-3 text-base md:text-lg text-gray-600">
            Vote once for your favorite nominee
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="h-14 w-14 rounded-full border-4 border-blue-600 border-t-transparent animate-spin" />
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {nominees.map((nominee) => (
              <NomineeCard
                key={nominee._id}
                nominee={nominee}
                onVote={handleVote}
                voting={voting}
                hasVoted={hasVoted}
              />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
