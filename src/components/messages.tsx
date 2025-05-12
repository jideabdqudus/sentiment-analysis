import { motion } from "framer-motion";
interface Message {
  id: string;
  content: string;
  type: "user" | "assistant";
}

interface MessagesProps {
  messages: Message[];
  probability: number;
}

export function Messages({ messages, probability }: MessagesProps) {
  if (messages.length === 0) {
    return (
      <div className="w-full max-w-4xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ delay: 0.5 }}
          className="text-6xl font-bold mb-2"
        >
          Hello there!
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ delay: 0.6 }}
          className=" text-zinc-500"
        >
          Enter a product review below to analyze its sentiment, or use one of
          the examples below.
        </motion.div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl px-4 py-8 h-full overflow-y-auto">
      {messages.map((message) => (
        <div
          key={message.id}
          className={`flex ${
            message.type === "user" ? "justify-end" : "justify-start"
          } mb-4`}
        >
          <div
            className={`max-w-[80%] p-2 rounded-lg ${
              message.type === "user"
                ? "bg-white text-black"
                : "bg-black text-white-300"
            }`}
          >
            {message.content}
            {message.type === "assistant" &&
              ` (${(probability * 100)?.toFixed(0)}% probability)`}
          </div>
        </div>
      ))}
    </div>
  );
}
