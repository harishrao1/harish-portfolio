/** Round headshot inside a slowly spinning gold ring with three drifting orbit dots. */
export function OrbitAvatar({
  src,
  alt,
  status,
  initials,
}: {
  src?: string
  alt: string
  status: string
  initials: string
}) {
  return (
    <div className="relative mx-auto h-[clamp(9rem,24vw,14rem)] w-[clamp(9rem,24vw,14rem)]">
      <div
        aria-hidden
        className="absolute -inset-[13%] animate-[spin_24s_linear_infinite] rounded-full border border-accent/25"
      >
        <span className="absolute left-1/2 top-0 h-2 w-2 -translate-x-1/2 -translate-y-1/2 animate-[orbit-drift_5s_ease-in-out_infinite] rounded-full bg-accent" />
        <span className="absolute left-full top-[62%] h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 animate-[orbit-drift_7s_ease-in-out_infinite_-2s] rounded-full bg-accent/70" />
        <span className="absolute left-[14%] top-[88%] h-1 w-1 -translate-x-1/2 -translate-y-1/2 animate-[orbit-drift_6s_ease-in-out_infinite_-4s] rounded-full bg-accent/50" />
      </div>

      {src ? (
        <img
          src={src}
          alt={alt}
          width={224}
          height={224}
          loading="eager"
          fetchPriority="high"
          className="relative h-full w-full rounded-full object-cover ring-1 ring-rule-strong"
        />
      ) : (
        // No photo yet: initials in the display face (set profile.avatarUrl to replace)
        <div
          role="img"
          aria-label={alt}
          className="relative flex h-full w-full items-center justify-center rounded-full border border-dashed border-rule-strong bg-surface"
        >
          <span
            className="display bg-gradient-to-r from-accent-hi to-accent bg-clip-text text-transparent"
            style={{ fontSize: 'clamp(2.8rem,7vw,4.4rem)' }}
          >
            {initials}
          </span>
        </div>
      )}

      <span title={status} className="absolute bottom-[6%] right-[6%] h-4 w-4 rounded-full bg-accent ring-4 ring-page">
        <span className="sr-only">{status}</span>
      </span>
    </div>
  )
}
