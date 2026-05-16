# Swiped

Swiped is a mobile-first productivity PWA prototype with a section wheel, swipe-up detail views, customizable sections, and budget and people templates.

## Deploying on Render

This repo includes a `render.yaml` Blueprint for a Render Static Site.

1. Push this repo to GitHub.
2. In Render, choose **New** > **Blueprint**.
3. Connect the GitHub repo.
4. Render will use `render.yaml` to publish the static app from the repo root.

No build step is required.

## Supabase Sync

The app is connected to the Supabase project `Swiped` and stores each signed-in user's app data in `public.user_data`.

For account confirmation emails, add the deployed Render URL to Supabase Auth:

1. Open the Supabase `Swiped` project.
2. Go to **Authentication** > **URL Configuration**.
3. Set **Site URL** to the Render app URL.
4. Add the same Render URL to **Redirect URLs**.
