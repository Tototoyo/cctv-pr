# Deployment Guide

## Quick Deploy

### Vercel (Easiest)

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin YOUR_GITHUB_REPO
   git push -u origin main
   ```

2. **Deploy on Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "Import Project"
   - Select your GitHub repository
   - Add environment variables:
     - `VITE_GEMINI_API_KEY`
     - `VITE_SUPABASE_URL`
     - `VITE_SUPABASE_ANON_KEY`
   - Click Deploy

### Netlify

1. **Build the project**
   ```bash
   npm run build
   ```

2. **Deploy**
   - Go to [netlify.com](https://netlify.com)
   - Drag and drop the `dist` folder
   - Or connect to GitHub and auto-deploy

3. **Add Environment Variables**
   - Go to Site Settings > Build & Deploy > Environment
   - Add all VITE_ variables

### Manual Hosting

1. **Build**
   ```bash
   npm run build
   ```

2. **Upload `dist` folder** to any static hosting:
   - AWS S3 + CloudFront
   - Google Cloud Storage
   - Azure Static Web Apps
   - GitHub Pages
   - Any web server

3. **Configure Environment Variables**
   - Some hosts require build-time variables
   - Add them before building

## Environment Variables Setup

All platforms need these variables:

```
VITE_GEMINI_API_KEY=your_gemini_api_key
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Post-Deployment Checklist

- [ ] All environment variables are set
- [ ] Supabase SQL schema is executed
- [ ] App loads without errors
- [ ] Can generate prompts
- [ ] Prompts save to database
- [ ] Recent prompts display correctly

## Troubleshooting

### Build Fails
- Check Node.js version (>=18)
- Clear cache: `rm -rf node_modules package-lock.json && npm install`

### Runtime Errors
- Verify environment variables are set correctly
- Check browser console for specific errors
- Ensure Supabase project is active

### Database Issues
- Run the SQL schema in Supabase SQL Editor
- Check Row Level Security (RLS) policies are enabled
- Verify API keys have correct permissions
