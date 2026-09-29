import ReactMarkdown from 'react-markdown';
import type { Components } from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface MarkdownContentProps {
  content: string;
  /** When provided, a leading H1 matching the page title is removed to avoid a duplicate heading. */
  title?: string;
  className?: string;
}

function normalize(value: string): string {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
}

function stripDuplicateTitle(content: string, title?: string): string {
  const trimmed = content.replace(/^\s+/, '');
  const match = trimmed.match(/^#\s+(.+?)\s*(?:\n|$)/);
  if (!match || !title) return trimmed;
  const heading = match[1] ?? '';
  if (normalize(heading) === normalize(title)) {
    return trimmed.slice(match[0].length);
  }
  return trimmed;
}

const components: Components = {
  a: ({ href, children, ...props }) => {
    const isExternal = typeof href === 'string' && /^https?:\/\//.test(href);
    return (
      <a
        href={href}
        {...props}
        {...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      >
        {children}
      </a>
    );
  },
  img: ({ src, alt }) => {
    if (!src || typeof src !== 'string') return null;
    return (
      <img
        src={src}
        alt={alt ?? ''}
        loading="lazy"
        className="rounded-xl w-full h-auto"
      />
    );
  },
};

export default function MarkdownContent({ content, title, className }: MarkdownContentProps) {
  const markdown = stripDuplicateTitle(content, title);

  return (
    <div
      className={
        className ??
        'prose prose-invert prose-lg max-w-none prose-headings:font-heading prose-headings:uppercase prose-a:text-f1-teal hover:prose-a:text-f1-teal-dark prose-strong:text-white'
      }
    >
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
        {markdown}
      </ReactMarkdown>
    </div>
  );
}
