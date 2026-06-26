import React from "react";

export default function AboutLoading() {
  return (
    <div className="w-full pb-20">
      {/* 1. Header Banner Skeleton */}
      <section className="w-full min-h-[55vh] flex flex-col justify-end py-16 px-6 md:px-12 bg-line/15 animate-pulse relative overflow-hidden">
        <div className="max-w-[1280px] mx-auto w-full space-y-6">
          {/* Breadcrumb path placeholder */}
          <div className="h-4 w-32 bg-line/30 rounded-md" />
          
          <div className="flex flex-col md:flex-row md:items-center gap-6">
            {/* Compass badge placeholder */}
            <div className="w-16 h-16 rounded-2xl bg-line/30 shrink-0" />
            {/* Name title placeholder */}
            <div className="h-12 w-80 bg-line/35 rounded-xl" />
          </div>

          {/* Metadata Grid placeholder */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 border-t border-line/20 pt-8 mt-6">
            {[...Array(4)].map((_, idx) => (
              <div key={idx} className="space-y-2">
                <div className="h-3 w-16 bg-line/30 rounded" />
                <div className="h-4 w-36 bg-line/35 rounded-md" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 2. Content Layout Skeletons */}
      <div className="max-w-[1280px] mx-auto px-6 md:px-12 py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Biography Placeholder */}
          <div className="lg:col-span-8 space-y-6 animate-pulse">
            <div className="h-5 w-48 bg-line/30 rounded-md mb-8" />
            <div className="space-y-4">
              <div className="h-4 w-full bg-line/25 rounded" />
              <div className="h-4 w-[95%] bg-line/25 rounded" />
              <div className="h-4 w-[98%] bg-line/25 rounded" />
              <div className="h-4 w-[85%] bg-line/25 rounded" />
            </div>
            <div className="space-y-4 pt-4">
              <div className="h-4 w-full bg-line/25 rounded" />
              <div className="h-4 w-[90%] bg-line/25 rounded" />
              <div className="h-4 w-[93%] bg-line/25 rounded" />
              <div className="h-4 w-[60%] bg-line/25 rounded" />
            </div>
          </div>

          {/* Right Column: Experience Timeline Placeholder */}
          <div className="lg:col-span-4 space-y-6 animate-pulse">
            <div className="h-4 w-28 bg-line/30 rounded-md mb-6" />
            {[...Array(3)].map((_, idx) => (
              <div key={idx} className="p-5 border border-line/40 rounded-2xl space-y-3">
                <div className="flex justify-between">
                  <div className="h-4 w-24 bg-line/30 rounded" />
                  <div className="h-3.5 w-16 bg-line/25 rounded" />
                </div>
                <div className="h-3.5 w-32 bg-line/20 rounded" />
              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
}
