type AppEnvironment = Record<string, string | undefined>;

export function getAppConfigIssues(env: AppEnvironment): string[] {
  const issues: string[] = [];
  const url = env.VITE_SUPABASE_URL?.trim();
  const key = env.VITE_SUPABASE_PUBLISHABLE_KEY?.trim();

  if (!url || url.includes('your-project')) {
    issues.push('VITE_SUPABASE_URL');
  } else {
    try {
      const parsed = new URL(url);
      if (!['http:', 'https:'].includes(parsed.protocol)) issues.push('VITE_SUPABASE_URL');
    } catch {
      issues.push('VITE_SUPABASE_URL');
    }
  }

  if (!key || key === 'sb_publishable_your_project_key') {
    issues.push('VITE_SUPABASE_PUBLISHABLE_KEY');
  }

  return issues;
}
