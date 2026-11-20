const protectedPaths = new Set(['/dashboard', '/quiz', '/settings', '/uzorisadmin']);

export function safeAuthRedirect(candidate: string | null | undefined, origin: string): string {
  if (!candidate?.startsWith('/') || candidate.startsWith('//')) return '/dashboard';

  try {
    const url = new URL(candidate, origin);
    if (url.origin !== origin || !protectedPaths.has(url.pathname)) return '/dashboard';
    return `${url.pathname}${url.search}`;
  } catch {
    return '/dashboard';
  }
}
