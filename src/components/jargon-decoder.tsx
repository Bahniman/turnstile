import { useState } from "react";
import { BookOpen, ChevronDown, ChevronUp } from "lucide-react";

interface Term {
  word: string;
  definition: string;
}

const TERMS: Term[] = [
  { word: "Delegated shopping", definition: "A person asks software to research or take steps toward a purchase on their behalf. Capabilities vary by service." },
  { word: "Classification signal", definition: "A measured or declared feature a system might use to assess a session. Any one signal can be incomplete or misleading." },
  { word: "False decline", definition: "A legitimate purchase attempt that a control mistakenly rejects. This prototype does not measure how often it occurs." },
  { word: "Agent attribution", definition: "An idea for recording which assistant referred or initiated a shopping session; attribution is not implemented in this demo." },
  { word: "Structured offer", definition: "Product details such as price and availability in a format software can read. This sandbox shows a mockup, not a live feed." },
];

export function JargonDecoder() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="decoder">
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-controls="turnstile-jargon-table"
        className="flex w-full items-center justify-between font-sans text-sm font-bold text-foreground"
      >
        <span className="flex items-center gap-2">
          <BookOpen className="h-4 w-4 text-accent" />
          Jargon Decoder
        </span>
        {isOpen ? <ChevronUp className="h-4 w-4 text-muted-foreground" /> : <ChevronDown className="h-4 w-4 text-muted-foreground" />}
      </button>

      {isOpen && (
        <div id="turnstile-jargon-table" className="mt-4 overflow-x-auto">
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
