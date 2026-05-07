import Sidebar from "@/components/layout/sidebar";
import DashboardCards from "@/components/dashboard/dashboard-cards";
import HabitTracker from "@/components/tracker/habit-tracker";

export default function Home() {
  return (
    <main className="min-h-screen bg-neutral-950 text-white flex">
      <Sidebar />

      <section className="flex-1 p-10">
        <h2 className="text-3xl font-semibold">
          Dashboard
        </h2>

        <DashboardCards />
        <HabitTracker />
      </section>
    </main>
  );
}
