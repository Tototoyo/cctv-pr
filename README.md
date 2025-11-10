# CCTV Prompt Generator

AI-powered tool to generate realistic surveillance-style video prompts for AI video generation platforms like Runway, Pika, and Sora.

## Features

- 🎥 Generate realistic CCTV-style video prompts using Google Gemini AI
- 💾 Save and browse prompts with Supabase database
- 🎨 Customize location, time, weather, and visual artifacts
- 📋 Copy or download generated prompts
- 🌐 Production-ready with React + TypeScript + Vite

## Prerequisites

1. **Google Gemini API Key**: Get from [Google AI Studio](https://makersuite.google.com/app/apikey)
2. **Supabase Account**: Create at [Supabase](https://supabase.com)

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Supabase

1. Create a new project at [Supabase](https://supabase.com)
2. Go to SQL Editor in your Supabase dashboard
3. Run the SQL schema from `supabase-schema.sql`
4. Get your Supabase URL and Anon Key from Settings > API

### 3. Configure Environment Variables

Create a `.env` file in the project root:

```bash
cp .env.example .env
```

Edit `.env` with your credentials:

```env
VITE_GEMINI_API_KEY=your_actual_gemini_api_key
VITE_SUPABASE_URL=your_actual_supabase_url
VITE_SUPABASE_ANON_KEY=your_actual_supabase_anon_key
```

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### 5. Build for Production

```bash
npm run build
```

The production build will be in the `dist` folder.

## Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import project in [Vercel](https://vercel.com)
3. Add environment variables in Vercel dashboard
4. Deploy

### Netlify

1. Push to GitHub
2. Import project in [Netlify](https://netlify.com)
3. Add environment variables in Netlify dashboard
4. Deploy

### Other Platforms

Upload the `dist` folder after running `npm run build`. Make sure to configure environment variables on your hosting platform.

## Project Structure

```
cctv-prompt-generator/
├── src/
│   ├── components/          # React components
│   │   ├── Header.tsx
│   │   ├── PromptGenerator.tsx
│   │   ├── PromptDisplay.tsx
│   │   ├── PromptGallery.tsx
│   │   └── Footer.tsx
│   ├── services/            # API services
│   │   ├── geminiService.ts
│   │   └── supabaseService.ts
│   ├── types/               # TypeScript types
│   │   └── index.ts
│   ├── App.tsx              # Main component
│   ├── main.tsx             # Entry point
│   └── index.css            # Global styles
├── supabase-schema.sql      # Database schema
├── package.json
├── vite.config.ts
├── tsconfig.json
└── README.md
```

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `VITE_GEMINI_API_KEY` | Google Gemini AI API key | Yes |
| `VITE_SUPABASE_URL` | Supabase project URL | Yes |
| `VITE_SUPABASE_ANON_KEY` | Supabase anonymous key | Yes |

## Technologies Used

- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **Google Gemini AI** - Prompt generation
- **Supabase** - Database and backend
- **Lucide React** - Icons

## Troubleshooting

### "Configuration Error" on startup
- Check that all environment variables are set in `.env`
- Restart the dev server after changing `.env`

### "Failed to generate prompt"
- Verify Gemini API key is valid
- Check internet connection
- Check browser console for errors

### Database errors
- Verify Supabase URL and key are correct
- Make sure you ran the SQL schema
- Check Supabase dashboard for errors

## License

MIT

## Support

For issues or questions, please create an issue on GitHub.
