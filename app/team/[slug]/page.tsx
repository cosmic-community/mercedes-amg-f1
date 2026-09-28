// app/team/[slug]/page.tsx
import { notFound } from 'next/navigation';
import { getTeamMemberBySlug } from '@/lib/cosmic';

export const revalidate = 60;

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function TeamMemberPage({ params }: PageProps) {
  const { slug } = await params;
  const member = await getTeamMemberBySlug(slug);

  if (!member) {
    notFound();
  }

  const image = member.metadata?.featured_image;
  const role = member.metadata?.role;
  const content = member.metadata?.content || member.content;

  return (
    <article className="max-w-5xl mx-auto px-6 py-16">
      <div className="grid md:grid-cols-2 gap-10 items-start mb-12">
        <div className="rounded-2xl overflow-hidden">
          {image && (
            <img
              src={`${image.imgix_url}?w=1200&h=1400&fit=crop&auto=format,compress`}
              alt={member.title}
              className="w-full h-auto object-cover"
              width={600}
              height={700}
            />
          )}
        </div>
        <div>
          {role && (
            <span className="text-f1-teal text-xs uppercase tracking-[0.3em]">{role}</span>
          )}
          <h1 className="text-4xl sm:text-5xl font-bold uppercase mt-3 font-heading">
            {member.title}
          </h1>
          {member.metadata?.seo_description && (
            <p className="text-gray-400 mt-6 leading-relaxed">{member.metadata.seo_description}</p>
          )}
        </div>
      </div>
      {content && (
        <div
          className="prose prose-invert prose-lg max-w-none"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      )}
    </article>
  );
}