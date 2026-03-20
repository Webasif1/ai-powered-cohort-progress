import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";


export default function Message({ type, text }) {
  const isUser = type === "user";

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>

      <div
        className={`max-w-[40vw] w-fit p-4 rounded-xl ${isUser
          ? "bg-[#5A2E1B] text-white"
          : "bg-[#2D1A0F] text-gray-200"
          }`}
      >

        <ReactMarkdown
          components={{
            p: ({ children }) => <p className='mb-2 last:mb-0'>{children}</p>,
            ul: ({ children }) => <ul className='mb-2 list-disc pl-5'>{children}</ul>,
            ol: ({ children }) => <ol className='mb-2 list-decimal pl-5'>{children}</ol>,
            code: ({ children }) => <code className='rounded bg-white/10 px-1 py-0.5'>{children}</code>,
            pre: ({ children }) => <pre className='mb-2 overflow-x-auto rounded-xl bg-black/30 p-3'>{children}</pre>
          }}
        >

          {text}
        </ReactMarkdown>
      </div>

    </div>
  );
}
