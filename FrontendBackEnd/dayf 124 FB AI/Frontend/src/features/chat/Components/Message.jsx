export default function Message({ type, text }) {
  const isUser = type === "user";

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>

      <div
        className={`max-w-lg w-fit p-4 rounded-xl ${
          isUser
            ? "bg-[#5A2E1B] text-white"
            : "bg-[#2D1A0F] text-gray-200"
        }`}
      >
        {text}
      </div>

    </div>
  );
}
