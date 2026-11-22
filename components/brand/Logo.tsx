export function LogoMark({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
      <rect width="48" height="48" rx="15" fill="#1E4D35" />
      <path
        d="M15 33c0-7 3-13 9-17"
        stroke="#C7DD93"
        strokeWidth="3.4"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M24 33c0-7 3-13 9-17"
        stroke="#8AB97B"
        strokeWidth="3.4"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M8 33h32"
        stroke="#EADFC4"
        strokeWidth="2.6"
        strokeLinecap="round"
        opacity="0.85"
      />
      <circle cx="31.5" cy="12.5" r="2.2" fill="#C7DD93" />
    </svg>
  );
}

export function Wordmark({ className = "" }: { className?: string }) {
  return (
    <span className={`flex items-center gap-2.5 ${className}`}>
      <LogoMark className="h-9 w-9 shrink-0" />
      <span className="font-display text-[1.35rem] font-extrabold leading-none tracking-tight text-forest-900">
        WILD<span className="text-forest-600">NEST</span>
      </span>
    </span>
  );
}
