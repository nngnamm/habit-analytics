import {
  Calendar,
  BarChart3,
  Settings,
} from "lucide-react";

export default function Sidebar() {
  return (
    <aside className="w-64 border-r border-neutral-800 p-6">
      <h1 className="text-2xl font-bold">
        Momentum
      </h1>

      <nav className="mt-10 space-y-4">
        <div className="flex items-center gap-3 text-neutral-300">
          <Calendar size={20} />
          Tracker
        </div>

        <div className="flex items-center gap-3 text-neutral-300">
          <BarChart3 size={20} />
          Stats
        </div>

        <div className="flex items-center gap-3 text-neutral-300">
          <Settings size={20} />
          Settings
        </div>
      </nav>
    </aside>
  );
}
