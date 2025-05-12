import { motion } from "framer-motion";
interface ExamplePromptProps {
  onSelect: (content: string) => void;
}

const EXAMPLE_PROMPTS = [
  {
    title: "Exceeded expectations",
    content:
      "This product has completely transformed my daily routine! The quality is outstanding, and it's even better than advertised. Worth every penny and then some.",
  },
  {
    title: "Travel companion",
    content:
      "Tested this during my 3-month backpacking trip. Durable, reliable, and perfect for travelers. Worked flawlessly in various conditions and climates.",
  },
  {
    title: "Premium user",
    content:
      "Yes, it's expensive, but the premium features and just enough to justify the price. If you can afford it, it's worth looking at other options.",
  },
  {
    title: "Developer review",
    content:
      "The API documentation is not as comprehensive as I hoped, integration was difficult, and the performance metrics are not impressive.",
  },
];

function truncate(text: string, length: number = 100) {
  if (text.length > length) {
    return text.substring(0, length) + "...";
  }
  return text;
}

export function Prompts({ onSelect }: ExamplePromptProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
      {EXAMPLE_PROMPTS.map((prompt) => (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ delay: 0.5 }}
          key={prompt.title}
        >
          <button
            onClick={() => onSelect(prompt.content)}
            className="p-4 border border-zinc-900 rounded-lg hover:bg-zinc-800 transition-colors text-left cursor-pointer"
          >
            <p className="text-sm text-gray-400">{prompt.title}</p>
            <p className="text-sm">{truncate(prompt.content)}</p>
          </button>
        </motion.div>
      ))}
    </div>
  );
}
