export default function ChatHeader() {
  return (
    <div className="h-16 flex items-center justify-between px-6 border-b border-[#3D2517]">
      <h2 className="text-lg font-semibold text-white">
        AI Assistant
      </h2>

      <button className="text-gray-400 hover:text-white">
        ⚙️
      </button>
    </div>
  );
}
