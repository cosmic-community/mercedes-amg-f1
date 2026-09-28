import { getTeamMembers } from '@/lib/cosmic';
import DriverCard from '@/components/DriverCard';

export const revalidate = 60;

export const metadata = {
  title: 'Drivers & Team | Mercedes-AMG F1',
  description: 'Meet the drivers and team behind the Mercedes-AMG PETRONAS Formula One Team.',
};

export default async function TeamPage() {
  const members = await getTeamMembers();

  return (
    <div className="max-w-7xl mx-auto px-6 py-16">
      <div className="mb-12">
        <span className="text-f1-teal text-xs uppercase tracking-[0.3em]">The Squad</span>
        <h1 className="text-4xl sm:text-6xl font-bold uppercase mt-3 font-heading">
          Drivers &amp; Team
        </h1>
      </div>
      {members.length === 0 ? (
        <p className="text-gray-500">No team members available right now.</p>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {members.map((member) => (
            <DriverCard key={member.id} member={member} />
          ))}
        </div>
      )}
    </div>
  );
}