import type { CaseGallery as Gallery, SocialSet } from "@/lib/media-manifest";
import type { Lang } from "@/lib/i18n";
import { ui } from "@/lib/ui";
import { MediaSlot } from "@/components/ui/Slot";
import { CarouselSlot } from "@/components/ui/CarouselSlot";
import { VideoSlot } from "@/components/ui/VideoSlot";
import type { Resolved } from "@/lib/media.server";

type R<T> = T extends Array<infer U> ? R<U>[] : T extends object ? { [K in keyof T]: R<T[K]> } : T;

const Caption = ({ children }: { children: React.ReactNode }) => <p className="label text-fog mt-3">{children}</p>;

// Posts, one carousel and one reel side by side, each in the format it was made for.
function SocialRow({ set, lang }: { set: R<SocialSet>; lang: Lang }) {
  const posts = set.posts as Resolved[];
  return (
    <div className="grid grid-cols-2 md:grid-cols-[repeat(var(--cols),minmax(0,1fr))] gap-4 md:gap-5 items-end" style={{ ["--cols" as string]: posts.length + 2 }}>
      {posts.map((p, i) => (
        <div key={p.path} data-rise>
          <MediaSlot slot={p} sizes="(min-width: 768px) 20vw, 50vw" />
          <Caption>{ui[lang].gallery.post} {String(i + 1).padStart(2, "0")}</Caption>
        </div>
      ))}
      <div data-rise>
        <CarouselSlot slides={set.carousel as Resolved[]} />
        <Caption>{ui[lang].gallery.carousel} · {set.carousel.length} {ui[lang].gallery.slides}</Caption>
      </div>
      <div data-rise>
        <VideoSlot slot={set.reel as Resolved} />
        <Caption>{ui[lang].gallery.reel}</Caption>
      </div>
    </div>
  );
}

export function CaseGallery({ gallery, unitText, lang }: { gallery: R<Gallery>; unitText?: Record<string, string>; lang: Lang }) {
  if (gallery.type === "social") return <SocialRow set={gallery.set} lang={lang} />;

  if (gallery.type === "units") {
    return (
      <div className="space-y-20">
        {gallery.units.map((u, i) => (
          <div key={u.slug}>
            <div className="flex flex-wrap items-baseline justify-between gap-4 border-t border-hair pt-5 mb-8">
              <h3 className="type-m text-[28px] md:text-[40px] leading-none">
                <span className="label text-fog mr-4 align-middle">{String(i + 1).padStart(2, "0")}</span>
                {u.name}
              </h3>
              {unitText?.[u.name] && <p className="text-mist text-[15px]">{unitText[u.name]}</p>}
            </div>
            <SocialRow set={u.set} lang={lang} />
          </div>
        ))}
      </div>
    );
  }

  const slots = gallery.slots as Resolved[];
  const cols = slots[0]?.ratio === "16/9" ? "md:grid-cols-2" : slots.length === 4 ? "grid-cols-2 md:grid-cols-4" : "sm:grid-cols-3";
  return (
    <div className={`grid gap-5 ${cols}`}>
      {slots.map((s) => (
        <div key={s.path} data-rise>
          <MediaSlot slot={s} sizes="(min-width: 768px) 40vw, 100vw" />
        </div>
      ))}
    </div>
  );
}
