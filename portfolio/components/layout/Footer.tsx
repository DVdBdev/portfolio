export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-[#21262D] bg-[#11161D]/30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-[#3FB950]" />
          <span className="font-mono text-xs text-[#484F58]">
            dvdb.dev — {year}
          </span>
        </div>
        <div className="flex items-center gap-4">
          <a
            href="https://github.com/dvdbdev"
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-xs text-[#484F58] hover:text-[#8B949E] transition-colors"
          >
            github
          </a>
          <span className="text-[#21262D]">/</span>
          <a
            href="mailto:Dries.Van.den.Brande@proton.me"
            className="font-mono text-xs text-[#484F58] hover:text-[#8B949E] transition-colors"
          >
            email
          </a>
        </div>
        <span className="font-mono text-[10px] text-[#484F58]">
          build v2026.05 · self-hosted
        </span>
      </div>
    </footer>
  );
}
