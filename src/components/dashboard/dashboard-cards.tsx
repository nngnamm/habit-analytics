type CardProps = {
  title: string;
  value: string;
};

function StatCard({ title, value }: CardProps) {
  return (
    <div className="rounded-2xl bg-neutral-900 p-6">
      <h3 className="text-neutral-400">
        {title}
      </h3>

      <p className="mt-4 text-3xl font-bold">
        {value}
      </p>
    </div>
  );
}

export default function DashboardCards() {
  return (
    <div className="mt-8 grid grid-cols-3 gap-6">
      <StatCard title="Total Habits" value="5" />
      <StatCard title="Completion Rate" value="82%" />
      <StatCard title="Mood Average" value="7.4" />
    </div>
  );
}
