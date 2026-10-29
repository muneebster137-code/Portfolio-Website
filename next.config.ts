import type { NextConfig } from "next";

// Case studies moved from /work to /case-studies (masterplan v3.1, section 6.3). Projects that are
// resume side projects rather than case studies fall back to the index.
const renamed: Record<string, string> = { "treats-for-life": "treatsforlife", "safir-wear": "safirwear" };
const kept = "anebos-studios|trenddeck|aba-group|facingnorth|beatrix-konnect|bakebox|ndrmf|tim-hortons";
const dropped = "bic-szabist|green-pakistan-agro|pm-office|fairmans-uk|homeloom-uk|watch-how-malaysia";

const nextConfig: NextConfig = {
  // Pages and share cards read public/media while the site is built, so Next would otherwise pack the
  // whole folder (videos included, 300+ MB) into every server function, past Vercel's 250 MB limit.
  // Those files are served straight from the CDN; functions never need them.
  outputFileTracingExcludes: {
    "/**": ["./public/**/*", "./scripts/**/*", "./*.mp4"],
  },
  async redirects() {
    return [
      { source: "/work", destination: "/case-studies", permanent: true },
      ...Object.entries(renamed).flatMap(([from, to]) => [
        { source: `/work/${from}`, destination: `/case-studies/${to}`, permanent: true },
        { source: `/case-studies/${from}`, destination: `/case-studies/${to}`, permanent: true },
      ]),
      { source: `/work/:slug(${kept})`, destination: "/case-studies/:slug", permanent: true },
      { source: `/work/:slug(${dropped})`, destination: "/case-studies", permanent: true },
      { source: `/case-studies/:slug(${dropped})`, destination: "/case-studies", permanent: false },
    ];
  },
};

export default nextConfig;
