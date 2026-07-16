import { useState } from "react";
import { BookOpen, ChevronDown, ChevronUp } from "lucide-react";

interface Term {
  word: string;
  definition: string;
}

const TERMS: Term[] = [
  { word: "Agent Traffic", definition: "Store visits made by autonomous AI software acting on behalf of a human user — browsing, comparing, and executing purchases." },
  { word: "Classifier Signals", definition: "The behavioral clues analyzed to distinguish humans from agents: keystroke dynamics, mouse track paths, load sequences, and rendering checks." },
  { word: "False Decline", definition: "Legitimate transactions cancelled by legacy fraud tools because a delegated agent checkout 'looks too bot-like' (instant inputs, no scroll)." },
  { word: "Agent Attribution", definition: "Correctly identifying and crediting checkout revenue to the specific agent platform (e.g. 'attributed to OpenClaw agent sale')." },
  { word: "Offer Feed / AEO", definition: "Agent Engine Optimization. Providing structured product data (sku, price, inventory) at a static endpoint instead of a heavy HTML interface." },
];

export function JargonDecoder() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="rounded-xl border border-border bg-card p-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between font-sans text-sm font-bold text-foreground focus:outline-none"
      >
        <span className="flex items-center gap-2">
          <BookOpen className="h-4 w-4 text-accent" />
          Jargon Decoder
        </span>
        {isOpen ? <ChevronUp className="h-4 w-4 text-muted-foreground" /> : <ChevronDown className="h-4 w-4 text-muted-foreground" />}
      </button>

      {isOpen && (
        <div className="mt-4 overflow-x-auto">
          <table className="w-full border-collapse text-left text-xs md:text-sm">
            <thead>
              <tr className="border-b border-border/80 bg-foreground/[0.02]">
                <th className="p-3 font-semibold text-foreground">Term</th>
                <th className="p-3 font-semibold text-foreground">Meaning</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/40">
              {TERMS.map((term, idx) => (
                <tr key={idx} className="hover:bg-foreground/[0.01]">
                  <td className="p-3 font-semibold text-accent whitespace-nowrap">{term.word}</td>
                  <td className="p-3 text-muted-foreground leading-relaxed">{term.definition}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
