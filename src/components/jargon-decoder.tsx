import { useState } from "react";
import { BookOpen, ChevronDown, ChevronUp } from "lucide-react";

interface Term {
  word: string;
  definition: string;
}

const TERMS: Term[] = [
  { word: "Delegated shopping", definition: "A person asks an AI assistant to find, compare or buy something for them." },
  { word: "Classification signal", definition: "Something the store can measure about a visit, like mouse movement or request speed. One signal alone can be faked, so Turnstile weighs several." },
  { word: "False decline", definition: "A real buyer the store turns away because its bot filter thought they were a bot." },
  { word: "Agent attribution", definition: "Recording which assistant brought a sale, the way stores already track which ad brought one. On the roadmap." },
  { word: "Structured offer", definition: "Price, stock and specs as clean data an agent can read, instead of a page built for eyes." },
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
          The words, in plain English
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
