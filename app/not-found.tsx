import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-6">
      <span className="text-f1-teal text-sm uppercase tracking-[0.3em] mb-4">404</span>
      <h1 className="text-4xl sm:text-6xl font-bold uppercase mb-6 font-heading">
        Page Not Found
      </h1>
      <p className="text-gray-500 mb-8 max-w-md">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <Link
        href="/"
        className="px-6 py-3 bg-f1-teal text-black font-bold uppercase text-sm tracking-wider rounded-full hover:bg-f1-teal-dark transition-colors"
      >
        Back to Home
      </Link>
    </div>
  );
}