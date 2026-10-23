// A section's heading: a small label for orientation and a title big enough to read from across the room.
export function SectionHead({ id, label, title, className = "" }: { id?: string; label?: string; title: string; className?: string }) {
  return (
    <div className={className}>
      {label && <p className="label text-fog" data-fade>{label}</p>}
      <h2 id={id} className={`overflow-hidden ${label ? "mt-5" : ""}`}>
        <span data-line className="block type-x text-[11vw] md:text-[clamp(40px,5vw,88px)] leading-[0.95]">{title}</span>
      </h2>
    </div>
  );
}
