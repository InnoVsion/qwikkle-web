const promises = [
  "We never read your messages",
  "We never sell your data",
  "We never show you ads",
  "We never share data with third parties",
] as const;

function LockIcon(): React.ReactElement {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#E91E63"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  );
}

export function PrivacyPromiseCard(): React.ReactElement {
  return (
    <div
      className="rounded-2xl p-6"
      style={{
        background: 'rgba(233, 30, 99, 0.04)',
        border: '1px solid rgba(233, 30, 99, 0.15)',
      }}
    >
      <div className="mb-4 flex items-center gap-2.5">
        <LockIcon />
        <h3 className="text-base font-bold text-[#263238]">Our Privacy Promise</h3>
      </div>
      <ul className="mb-4 flex flex-col gap-2.5">
        {promises.map((promise) => (
          <li key={promise} className="flex items-start gap-2.5">
            <span
              className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-xs font-bold"
              style={{
                background: 'rgba(233, 30, 99, 0.10)',
                color: '#E91E63',
              }}
              aria-hidden="true"
            >
              ✗
            </span>
            <span className="text-sm font-medium text-[#263238]">{promise}</span>
          </li>
        ))}
      </ul>
      <p className="text-sm leading-relaxed text-[#9E9E9E]">
        These aren&apos;t just policies — they&apos;re technical guarantees. Our end-to-end
        encryption means we are architecturally incapable of reading your conversations, even if we
        wanted to.
      </p>
    </div>
  );
}
