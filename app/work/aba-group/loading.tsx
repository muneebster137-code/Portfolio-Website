import React from "react";

export default function AbaGroupLoading() {
  return (
    <div className="w-full pb-20">
      {/* 1. Header Banner Skeleton */}
      <section className="w-full min-h-[55vh] flex flex-col justify-end py-16 px-6 md:px-12 bg-line/15 animate-pulse relative overflow-hidden">
        <div className="max-w-[1280px] mx-auto w-full space-y-6">
          {/* Breadcrumb path placeholder */}
          <div className="h-4 w-32 bg-line/30 rounded-md" />
          
          <div className="flex flex-col md:flex-row md:items-center gap-6">
            {/* Visual Icon Badge */}
            <div className="w-16 h-16 rounded-2xl bg-line/30 shrink-0" />
            {/* Project title */}
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

      {/* 2. Core ABA Content Skeletons */}
      <div className="max-w-[1280px] mx-auto px-6 md:px-12 py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Group Description */}
          <div className="lg:col-span-8 space-y-12 animate-pulse">
            {/* Summary */}
            <div className="space-y-4">
              <div className="h-5 w-40 bg-line/30 rounded-md mb-4" />
              <div className="h-4 w-full bg-line/20 rounded" />
              <div className="h-4 w-[98%] bg-line/20 rounded" />
              <div className="h-4 w-[92%] bg-line/20 rounded" />
            </div>

            {/* Bullets List */}
            <div className="space-y-4 pt-4 border-t border-line/20">
              {[...Array(3)].map((_, idx) => (
                <div key={idx} className="flex gap-4 items-start">
                  <div className="w-5 h-5 rounded-full bg-line/25 shrink-0" />
                  <div className="space-y-2 w-full">
                    <div className="h-4 w-[90%] bg-line/15 rounded" />
                    <div className="h-4 w-[60%] bg-line/15 rounded" />
                  </div>
                </div>
              ))}
            </div>

            {/* Tabs placeholder for 5 sub-brands */}
            <div className="space-y-6 pt-6 border-t border-line/20">
              <div className="h-5 w-56 bg-line/30 rounded-md" />
              <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                {[...Array(5)].map((_, idx) => (
                  <div key={idx} className="h-12 rounded-xl bg-line/15 border border-line/20" />
                ))}
              </div>
              {/* Tabs Content Box */}
              <div className="p-6 border border-line/20 rounded-2xl space-y-4 bg-paper/20">
                <div className="h-4 w-32 bg-line/25 rounded" />
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {[...Array(3)].map((_, idx) => (
                    <div key={idx} className="space-y-2">
                      <div className="h-3 w-16 bg-line/20 rounded" />
                      <div className="h-3.5 w-32 bg-line/15 rounded" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: CTA & Metadata Sidebar */}
          <div className="lg:col-span-4 space-y-8 animate-pulse">
            <div className="border border-line/30 rounded-3xl p-8 space-y-6 bg-paper/20">
              <div className="h-4 w-28 bg-line/30 rounded-md" />
              <div className="space-y-2">
                <div className="h-3.5 w-full bg-line/15 rounded" />
                <div className="h-3.5 w-[90%] bg-line/15 rounded" />
              </div>
              <div className="h-12 w-full bg-line/35 rounded-2xl" />
            </div>
          </div>

        </div>

        {/* 3. Staggered Masonry (3 Artifacts) Gallery Section Placeholder */}
        <section className="w-full border-t border-line/20 py-20 mt-16 space-y-12 animate-pulse">
          <div className="space-y-3">
            <div className="h-3 w-24 bg-line/20 rounded" />
            <div className="h-8 w-48 bg-line/30 rounded-lg" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-stretch">
            {/* Box 1 (Takes 4 cols, height 350) */}
            <div className="md:col-span-4 min-h-[350px] border border-line/20 rounded-3xl bg-line/10" />
            {/* Box 2 (Takes 4 cols, height 350) */}
            <div className="md:col-span-4 min-h-[350px] border border-line/20 rounded-3xl bg-line/10" />
            {/* Box 3 (Takes 4 cols, height 350) */}
            <div className="md:col-span-4 min-h-[350px] border border-line/20 rounded-3xl bg-line/10" />
          </div>
        </section>
      </div>
    </div>
  );
}
