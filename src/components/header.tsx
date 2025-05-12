import { motion } from "framer-motion";
interface HeaderProps {
  onReset: () => void;
}

export function Header({ onReset }: HeaderProps) {
  return (
    <div
      className="w-full max-w-4xl px-4 pt-8 cursor-pointer"
      onClick={onReset}
    >
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 10 }}
        transition={{ delay: 0.5 }}
        className="text-sm font-bold mb-2"
      >
        Sentiment Analysis Tool.
      </motion.div>
    </div>
  );
}
