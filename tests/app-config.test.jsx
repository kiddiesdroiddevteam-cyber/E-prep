import { expect, test } from 'vitest';
import { getAppConfigIssues } from '../appConfig';

test('reports missing and example Supabase configuration before app startup', () => {
  expect(getAppConfigIssues({})).toEqual(['VITE_SUPABASE_URL', 'VITE_SUPABASE_PUBLISHABLE_KEY']);
  expect(getAppConfigIssues({
    VITE_SUPABASE_URL: 'https://your-project.supabase.co',
    VITE_SUPABASE_PUBLISHABLE_KEY: 'sb_publishable_your_project_key',
  })).toEqual(['VITE_SUPABASE_URL', 'VITE_SUPABASE_PUBLISHABLE_KEY']);
});

test('accepts configured Supabase values and rejects an invalid URL', () => {
  expect(getAppConfigIssues({
    VITE_SUPABASE_URL: 'https://example.supabase.co',
    VITE_SUPABASE_PUBLISHABLE_KEY: 'sb_publishable_example',
  })).toEqual([]);
  expect(getAppConfigIssues({
    VITE_SUPABASE_URL: 'not-a-url',
    VITE_SUPABASE_PUBLISHABLE_KEY: 'sb_publishable_example',
  })).toEqual(['VITE_SUPABASE_URL']);
});
