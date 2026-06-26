import React from "react";

export default function ResumeLoading() {
  return (
    <div className="min-h-screen bg-paper py-12 px-6 md:px-12">
      {/* 1. Header Toolbar (Pulse) */}
      <div className="max-w-[850px] mx-auto mb-8 flex items-center justify-between border-b border-line pb-6 animate-pulse">
        <div className="h-4 w-28 bg-line/25 rounded-md" />
        <div className="h-10 w-44 bg-line/35 rounded-xl" />
      </div>

      {/* 2. Main CV A4 Container Skeleton */}
      <article className="max-w-[850px] mx-auto bg-paper p-8 md:p-12 border border-line rounded-3xl space-y-8 animate-pulse">
        {/* CV Header */}
        <header className="border-b-2 border-line pb-6 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3">
            <div className="h-10 w-64 bg-line/30 rounded-lg" />
            <div className="h-4 w-48 bg-line/25 rounded" />
          </div>
          <div className="space-y-1.5 md:text-right">
            <div className="h-3 w-40 bg-line/20 rounded ml-auto" />
            <div className="h-3 w-32 bg-line/20 rounded ml-auto" />
            <div className="h-3 w-44 bg-line/20 rounded ml-auto" />
          </div>
        </header>

        {/* Objective Section */}
        <section className="py-2 border-b border-line space-y-3">
          <div className="h-4 w-full bg-line/15 rounded" />
          <div className="h-4 w-[98%] bg-line/15 rounded" />
          <div className="h-4 w-[85%] bg-line/15 rounded" />
        </section>

        {/* Grid Skeletons */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 py-2">
          {/* Left Column: Experience */}
          <div className="md:col-span-8 space-y-6">
            <div className="h-4 w-36 bg-line/30 rounded-md border-b-2 border-line pb-1" />
            {[...Array(3)].map((_, idx) => (
              <div key={idx} className="space-y-2">
                <div className="flex justify-between">
                  <div className="h-4 w-40 bg-line/25 rounded" />
                  <div className="h-3 w-16 bg-line/20 rounded" />
                </div>
                <div className="h-3.5 w-32 bg-line/20 rounded" />
                <div className="space-y-1.5 pl-4 pt-1">
                  <div className="h-3.5 w-[90%] bg-line/15 rounded" />
                  <div className="h-3.5 w-[95%] bg-line/15 rounded" />
                  <div className="h-3.5 w-[75%] bg-line/15 rounded" />
                </div>
              </div>
            ))}
          </div>

          {/* Right Column: Education & Skills */}
          <div className="md:col-span-4 space-y-8">
            <div className="space-y-4">
              <div className="h-4 w-28 bg-line/30 rounded-md border-b-2 border-line pb-1" />
              {[...Array(2)].map((_, idx) => (
                <div key={idx} className="space-y-1.5">
                  <div className="h-3.5 w-full bg-line/25 rounded" />
                  <div className="h-3 w-32 bg-line/20 rounded" />
                </div>
              ))}
            </div>

            <div className="space-y-4">
              <div className="h-4 w-28 bg-line/30 rounded-md border-b-2 border-line pb-1" />
              {[...Array(4)].map((_, idx) => (
                <div key={idx} className="space-y-2">
                  <div className="h-3 w-20 bg-line/25 rounded" />
                  <div className="h-3.5 w-full bg-line/15 rounded" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </article>
    </div>
  );
}
