import React from "react";

export default function WorkIndexLoading() {
  return (
    <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-16 md:py-24">
      {/* Page Header */}
      <section className="mb-16 space-y-6 animate-pulse">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-line/25" />
          <div className="h-4 w-32 bg-line/25 rounded-md" />
        </div>
        <div className="h-14 w-80 bg-line/30 rounded-xl" />
        <div className="h-4 w-[60%] bg-line/20 rounded" />
      </section>

      {/* 1. Filter Bar Skeletons */}
      <section className="mb-16 border-b border-line pb-6 animate-pulse">
        <div className="flex flex-wrap gap-2 md:gap-3">
          {[...Array(5)].map((_, idx) => (
            <div key={idx} className="h-10 w-28 rounded-full bg-line/25" />
          ))}
        </div>
        <div className="mt-6 h-3.5 w-48 bg-line/20 rounded" />
      </section>

      {/* 2. Cards Grid Skeletons */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 animate-pulse">
        {[...Array(4)].map((_, idx) => (
          <div key={idx} className="border border-line/30 rounded-3xl p-8 space-y-6 min-h-[320px] flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex justify-between items-start">
                <div className="space-y-2">
                  {/* Category label */}
                  <div className="h-3 w-16 bg-line/20 rounded" />
                  {/* Title */}
                  <div className="h-7 w-48 bg-line/35 rounded-lg" />
                </div>
                {/* Arrow icon */}
                <div className="w-8 h-8 rounded-full bg-line/20" />
              </div>
              {/* Short summary text */}
              <div className="space-y-2">
                <div className="h-3.5 w-full bg-line/15 rounded" />
                <div className="h-3.5 w-[90%] bg-line/15 rounded" />
              </div>
            </div>
            {/* Tags row */}
            <div className="flex flex-wrap gap-2">
              {[...Array(3)].map((_, tagIdx) => (
                <div key={tagIdx} className="h-6 w-20 bg-line/25 rounded-full" />
              ))}
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
