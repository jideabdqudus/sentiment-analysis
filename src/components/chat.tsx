import { motion } from "framer-motion";
import { Send } from "lucide-react";

interface ChatProps {
  value: string;
  onChange: (value: string) => void;
  onSend: (content: string) => void;
}

export function Chat({ value, onChange, onSend }: ChatProps) {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      onSend(value);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e.target.value);
    e.target.style.height = "auto";
    e.target.style.height = `${Math.min(e.target.scrollHeight, 200)}px`;
  };

  return (
    <div className="w-full max-w-4xl px-4 mb-8">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 10 }}
        transition={{ delay: 0.5 }}
      >
        <div className="relative flex items-center">
          <textarea
            value={value}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            placeholder="Enter a product review..."
            className="w-full p-4 pr-24 rounded-lg bg-zinc-900 border border-zinc-800 focus:outline-none focus:border-zinc-700 resize-none overflow-hidden min-h-[56px] max-h-[200px]"
            rows={1}
          />
          <div className="absolute right-4 flex items-center space-x-2">
            <button
              onClick={() => onSend(value)}
              className="p-2 hover:bg-zinc-800 rounded-lg transition-colors"
            >
              <Send className="w-5 h-5 text-gray-400" />
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
