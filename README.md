# iWanPass

iWanPass helps students prepare for exams with past questions, AI-generated quizzes, and progress tracking.

## Run locally

1. Install Node.js 22.12 or newer and run `npm ci`.
2. Copy `.env.example` to `.env.local` and replace the placeholders you need. The two Supabase values are required to load the app and use authentication. The past-question and Gemini values are needed for their respective quiz features.
3. Run `npm run dev`. Vite serves the app at `http://localhost:3000`. Restart the dev server after changing environment values.

Use `.env.local` for your local values. Keep `.env.example` as the committed list of variable names; do not commit `.env.local`, `.env`, or production credentials. For the deployed site, set the same applicable values in Vercel Project Settings → Environment Variables for the appropriate environment and create a new deployment after changing them. The current `VITE_*` API tokens are included in the browser bundle, so do not use private, unrestricted credentials there.

## Auth email links

In Supabase Authentication → URL Configuration, allow `http://localhost:3000/auth` for sign-up confirmation and `http://localhost:3000/reset-password` for password recovery. Add the equivalent URLs for each deployed origin. Set the Site URL to the correct deployment origin. If you use custom email templates, ensure they honor the redirect URL passed by the app.

## Brand password reset emails

Password reset emails are sent by Supabase Auth; the sender name and address cannot be changed in this frontend or in Vercel environment variables.

1. Set up a verified sending address with an SMTP email provider, such as `no-reply@iwanpass.com` if you control that domain. Follow the provider's DNS instructions for SPF, DKIM, and DMARC.
2. In the Supabase project dashboard, open **Authentication → SMTP Settings**, enable custom SMTP, and enter the provider's host, port, username, and password. Set **Sender name** to `iWanPass` and **Sender email** to the verified address. Keep SMTP credentials in Supabase, not in this repository.
3. Open **Authentication → Email Templates → Reset Password**. Set the subject to `Reset your iWanPass password` and paste the contents of [`supabase/templates/recovery.html`](supabase/templates/recovery.html) into the template body. Keep `{{ .ConfirmationURL }}` unchanged so the reset link works.
4. Request a reset email and check its From name and address, subject, appearance, and link to `/reset-password`.

Supabase's default sending service cannot provide an iWanPass sender address. For new free-tier projects using the default service, Supabase also restricts template edits; custom SMTP allows branded templates.

The selected student category is saved in Supabase Auth user metadata as `category`, alongside `full_name`. It is not a column in the current `profiles` table.

Run `npm test` for auth validation and component tests, and `npm run build` for the production bundle. A live Supabase project is needed to verify email delivery, confirmation links, and password recovery end to end.
