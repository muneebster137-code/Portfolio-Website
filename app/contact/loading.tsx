import React from "react";

export default function ContactLoading() {
  return (
    <div className="max-w-[1000px] mx-auto px-6 md:px-12 py-16 md:py-24">
      {/* 1. Header Section */}
      <section className="mb-16 space-y-6 animate-pulse">
        <div className="h-4 w-32 bg-line/25 rounded-md" />
        <div className="h-12 w-80 bg-line/30 rounded-xl" />
        <div className="h-4 w-[60%] bg-line/20 rounded" />
      </section>

      {/* 2. Grid Skeletons */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start animate-pulse">
        
        {/* Left Side: Coordinates & Networks */}
        <div className="md:col-span-5 space-y-8">
          <div className="space-y-4">
            <div className="h-4 w-28 bg-line/30 rounded" />
            {[...Array(3)].map((_, idx) => (
              <div key={idx} className="space-y-1">
                <div className="h-3 w-16 bg-line/20 rounded" />
                <div className="h-4 w-44 bg-line/25 rounded" />
              </div>
            ))}
          </div>

          <div className="space-y-4">
            <div className="h-4 w-24 bg-line/30 rounded" />
            <div className="flex gap-4">
              {[...Array(3)].map((_, idx) => (
                <div key={idx} className="w-10 h-10 rounded-xl bg-line/25" />
              ))}
            </div>
          </div>
        </div>

        {/* Right Side: Message Form */}
        <div className="md:col-span-7 border border-line/40 rounded-3xl p-8 space-y-6">
          <div className="h-5 w-36 bg-line/35 rounded-md" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <div className="h-3.5 w-12 bg-line/20 rounded" />
              <div className="h-11 w-full bg-line/15 rounded-xl border border-line/20" />
            </div>
            <div className="space-y-2">
              <div className="h-3.5 w-12 bg-line/20 rounded" />
              <div className="h-11 w-full bg-line/15 rounded-xl border border-line/20" />
            </div>
          </div>
          <div className="space-y-2">
            <div className="h-3.5 w-20 bg-line/20 rounded" />
            <div className="h-32 w-full bg-line/15 rounded-xl border border-line/20" />
          </div>
          <div className="h-12 w-full bg-line/35 rounded-xl" />
        </div>

      </div>
    </div>
  );
}
