export default function Sidebar() {

  const titles = [
    "REST API vs GraphQL","Python Script Debugging"
  ]

  return (
    <aside className="w-72 bg-[#1A0F08] border-r border-[#3D2517] flex flex-col p-4">

      {/* New Chat */}
      <button className="w-full py-3 rounded-xl bg-[#C95A32] text-white font-semibold mb-6">
        + New Chat
      </button>

      {/* Recent */}
      <p className="text-xs text-gray-500 mb-3">RECENT ACTIVITY</p>

      <div className="space-y-2 flex-1">
        {titles.map((title)=>{
          return <div className="p-2 hover:bg-[#2D1A0F] active:bg-[#2D1A0F] rounded-lg">
          {title}
        </div>
        })}
      </div>

      {/* Profile */}
      <div className="mt-auto text-sm text-gray-400">
        User Profile
      </div>
    </aside>
  );
}
