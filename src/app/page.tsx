import Sidebar from "@/components/layout/sidebar";
import DashboardCards from "@/components/dashboard/dashboard-cards";
import HabitTracker from "@/components/tracker/habit-tracker";

export default function Home() {
  return (
    <main className="min-h-screen bg-neutral-950 text-white flex">
      <Sidebar />

      <section className="flex-1 p-10">
        <div className="max-w-6xl mx-auto space-y-10">
          
          {/* HEADER */}
          <div>
            <h1 className="text-3xl font-semibold">
              Dashboard
            </h1>

            <p className="text-sm text-neutral-400 mt-1">
              Track habits, mood, motivation, and progress insights
            </p>
          </div>

          {/* STATS */}
          <DashboardCards />

          {/* TRACKER */}
          <HabitTracker />

        </div>
      </section>
    </main>
  );
}
