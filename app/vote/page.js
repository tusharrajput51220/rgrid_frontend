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
      await api.post("/votes/cast", { nomineeId });
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
    <main className="flex h-screen w-screen overflow-hidden bg-[#0b0f19] font-sans antialiased text-slate-200">
      {/* ── LEFT SECTION: BRANDING & PORTAL META ── */}
      <section className="relative hidden w-5/12 flex-col justify-between p-12 md:flex border-r border-slate-800/60 select-none">
        {/* Crisp Unsplash Background with Premium Dark Multi-Overlay */}
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 scale-105"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1540910419892-4a36d2c3266c?auto=format&fit=crop&q=80&w=1200')`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#070a12]/95 via-[#0b0f19]/90 to-[#1e293b]/70 mix-blend-multiply" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(59,130,246,0.15),transparent_60%)]" />

        {/* Header Branding */}
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2.5 rounded-full border border-blue-500/30 bg-blue-500/10 px-3.5 py-1 backdrop-blur-md">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-blue-500" />
            </span>
            <span className="text-[10px] font-bold uppercase tracking-widest text-blue-400">
              SECURE DEPLOYMENT v2.4
            </span>
          </div>

          <h1 className="mt-8 text-4xl font-extrabold tracking-tight text-white xl:text-5xl leading-none">
            Electoral <br />
            <span className="bg-gradient-to-r from-blue-400 via-indigo-300 to-cyan-400 bg-clip-text text-transparent">
              Voting Terminal
            </span>
          </h1>

          <p className="mt-4 max-w-sm text-sm leading-relaxed text-slate-400/90">
            Welcome to the cryptographic polling portal. Your identity is
            verified, and your selection remains completely anonymous.
          </p>
        </div>

        {/* Dynamic Context / Status State */}
        <div className="relative z-10 max-w-sm rounded-xl border border-slate-800 bg-slate-950/60 p-5 backdrop-blur-md">
          {hasVoted ? (
            <div>
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm tracking-wide mb-1">
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                TRANSACTION CONFIRMED
              </div>
              <p className="text-xs text-slate-400 leading-normal">
                Your receipt token has been anchored to the ledger. Thank you
                for utilizing your democratic right.
              </p>
            </div>
          ) : (
            <div>
              <div className="flex items-center gap-2 text-amber-400 font-bold text-sm tracking-wide mb-1">
                <span className="h-2 w-2 rounded-full bg-amber-500 animate-pulse" />
                AWAITING INPUT
              </div>
              <p className="text-xs text-slate-400 leading-normal">
                Review the candidates carefully. You are permitted exactly{" "}
                <strong className="text-slate-200 font-semibold">one</strong>{" "}
                irrevocable submission.
              </p>
            </div>
          )}
        </div>

        {/* Meta / Rules Footer */}
        <div className="relative z-10 border-t border-slate-800/80 pt-6">
          <div className="grid grid-cols-2 gap-4 text-[11px] uppercase tracking-wider text-slate-500">
            <div>
              <span className="block text-slate-400 font-medium">
                System State:
              </span>
              Encrypted (AES-256)
            </div>
            <div>
              <span className="block text-slate-400 font-medium">
                Authentication:
              </span>
              Single Token Guarded
            </div>
          </div>
        </div>
      </section>

      {/* ── RIGHT SECTION: THE FIXED EVM BALLOT CONSOLE ── */}
      <section className="relative flex w-full flex-col bg-[#0f1322] p-8 md:w-7/12 lg:p-12">
        {/* Subtle geometric layout grid overlay */}
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:32px_32px]" />

        {/* EVM Top Structural Header Bezel */}
        <div className="relative z-10 mb-6 flex flex-none items-center justify-between rounded-xl border border-slate-800 bg-slate-900/50 px-6 py-4 shadow-inner">
          <div className="flex items-center gap-3">
            <div className="h-2.5 w-2.5 rounded-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.7)]" />
            <span className="text-xs font-bold uppercase tracking-widest text-slate-400">
              Electronic Ballot Unit
            </span>
          </div>
          <div className="text-right">
            <span className="text-[10px] block uppercase tracking-widest text-slate-500 font-semibold">
              Ballot Status
            </span>
            <span className="text-xs font-mono font-bold text-slate-300">
              {loading
                ? "SYNCING..."
                : `${nominees.length} CERTIFIED CANDIDATES`}
            </span>
          </div>
        </div>

        {/* Scroll-locked Interface Content Area */}
        <div className="relative z-10 flex flex-1 flex-col justify-center min-h-0">
          {loading ? (
            /* Premium Core Loader */
            <div className="flex flex-col items-center justify-center gap-4 py-12">
              <div className="relative h-12 w-12">
                <div className="absolute inset-0 rounded-full border-2 border-slate-800" />
                <div className="absolute inset-0 rounded-full border-2 border-t-blue-500 border-r-transparent border-b-transparent border-l-transparent animate-spin" />
              </div>
              <p className="text-xs font-mono tracking-widest uppercase text-slate-500 animate-pulse">
                Initializing Interface...
              </p>
            </div>
          ) : nominees.length === 0 ? (
            /* Empty State */
            <div className="flex flex-col items-center justify-center gap-3 py-12 border border-dashed border-slate-800 rounded-xl bg-slate-900/20">
              <p className="text-sm text-slate-500">
                No active nominees detected within this district array.
              </p>
            </div>
          ) : (
            /* The EVM Tactile Array Stack */
            <div className="flex flex-col gap-3 overflow-y-auto pr-1 max-h-[68vh] xl:max-h-[72vh] custom-scrollbar">
              {nominees.map((nominee, idx) => (
                <div
                  key={nominee._id}
                  className="opacity-0 animate-[evmSlideIn_0.4s_cubic-bezier(0.16,1,0.3,1)_forwards]"
                  style={{ animationDelay: `${idx * 60}ms` }}
                >
                  <NomineeCard
                    nominee={nominee}
                    onVote={handleVote}
                    voting={voting}
                    hasVoted={hasVoted}
                    index={idx + 1}
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Fixed Footing Bezel */}
        <div className="mt-4 flex flex-none items-center justify-between text-[10px] font-mono uppercase tracking-widest text-slate-600">
          <span>Module: EBU-X80</span>
          <span>End-to-End Verifiable</span>
        </div>
      </section>

      {/* Modern CSS Injection for Scroll Handling and Custom Animations */}
      <style>{`
        @keyframes evmSlideIn {
          from { opacity: 0; transform: translateX(15px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 5px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #1e293b;
          border-radius: 99px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #334155;
        }
      `}</style>
    </main>
  );
}
