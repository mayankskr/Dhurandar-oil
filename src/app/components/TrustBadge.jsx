export default function TrustBadge() {
  return (
    <section className="TrustBadge flex h-fit w-fit gap-2 rounded-xl bg-blue-200 px-2 py-1">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label="Award icon"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="lucide lucide-award my-1 h-4 w-4 text-blue-700"
      >
        <path d="m15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.197 0l-3.586 2.686a.5.5 0 0 1-.81-.469l1.514-8.526"></path>
        <circle cx="12" cy="8" r="6"></circle>
      </svg>
      <span className="text-md text-blue-700">Trusted by 20 Lakhs+ customers</span>
    </section>
  )
}
