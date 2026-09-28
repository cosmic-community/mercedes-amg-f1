import Link from 'next/link';
import type { TeamMember } from '@/types';

interface DriverCardProps {
  member: TeamMember;
}

export default function DriverCard({ member }: DriverCardProps) {
  const image = member.metadata?.featured_image;
  const role = member.metadata?.role;

  return (
    <Link
      href={`/team/${member.slug}`}
      className="group relative block rounded-2xl overflow-hidden bg-neutral-900 h-[420px]"
    >
      {image && (
        <img
          src={`${image.imgix_url}?w=800&h=1000&fit=crop&auto=format,compress`}
          alt={member.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          width={400}
          height={500}
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent" />
      <div className="absolute bottom-0 left-0 p-5">
        {role && <p className="text-f1-teal text-xs uppercase tracking-widest mb-1">{role}</p>}
        <h3 className="text-xl font-bold uppercase">{member.title}</h3>
      </div>
    </Link>
  );
}