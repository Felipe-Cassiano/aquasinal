import { LOCAL } from "../../constants/config";

export default function Header() {
  return (
    <header className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white px-5 py-3.5">
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-6 w-6 text-blue-600"
          aria-hidden="true"
        >
          <path d="M12 3c3 4 6 7 6 11a6 6 0 0 1-12 0c0-4 3-7 6-11z" />
        </svg>
        <h1 className="text-2xl font-semibold text-slate-900 sm:text-3xl">AquaSinal</h1>
      </div>
      <p className="text-sm text-slate-500">{LOCAL}</p>
    </header>
  );
}
