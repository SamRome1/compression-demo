# Image Compression Demo 🎨

A React-based demo application that showcases image compression to demonstrate how Supabase Storage can hold significantly more content than expected.

## Features

- **Drag & Drop Upload**: Easy image selection with file validation
- **Client-Side Compression**: Compress images by up to 85% using browser-image-compression
- **Visual Comparison**: Side-by-side view of original vs compressed images
- **Detailed Statistics**: Shows file sizes, reduction percentage, and storage savings
- **Supabase Integration**: Upload compressed images to Supabase Storage
- **Demo-Ready UI**: Clean, modern interface perfect for screen recording

## Tech Stack

- **React** - UI framework
- **Vite** - Build tool
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **browser-image-compression** - Image compression
- **Supabase** - Cloud storage
- **Lucide React** - Icons
- **React Hot Toast** - Notifications

## Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Supabase (Required for Upload Feature)

#### Create a Supabase Project

1. Go to [https://supabase.com](https://supabase.com)
2. Create a new project
3. Wait for database provisioning (2-3 minutes)

#### Create Storage Bucket

1. In your Supabase dashboard, navigate to **Storage**
2. Click **New Bucket**
3. Name: `demo-images`
4. Public: **Yes** (enable public access for easy demo)
5. Click **Create Bucket**

#### Configure Storage Policies

1. Go to **SQL Editor** in your Supabase dashboard
2. Copy the contents of `supabase-setup.sql` (included in this project)
3. Paste and run the SQL to create the policies

Or manually create these policies via **Storage** → **Policies**:
- Policy 1: Allow public uploads (INSERT permission)
- Policy 2: Allow public access (SELECT permission)

#### Set Environment Variables

1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

2. Add your Supabase credentials to `.env`:
   ```
   VITE_SUPABASE_URL=https://your-project.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-key
   ```

3. Find these values in your Supabase dashboard:
   - Go to **Settings** → **API**
   - Copy **Project URL** → `VITE_SUPABASE_URL`
   - Copy **anon/public** key → `VITE_SUPABASE_ANON_KEY`

### 3. Start Development Server

```bash
npm run dev
```

The app will be available at [http://localhost:5173](http://localhost:5173)

## Usage

1. **Upload an Image**: Click or drag a ~3MB image into the upload zone
2. **Watch Compression**: See the progress bar as the image is compressed
3. **View Results**: See the impressive reduction percentage and side-by-side comparison
4. **Upload to Supabase**: Click the upload button to store the compressed image
5. **Share the URL**: Copy the public URL to share your compressed image

## Demo Recording Tips

For the best short-form video:

1. **Prepare**: Use a high-quality ~3MB JPEG (landscape/portrait photo)
2. **Browser Setup**: Zoom to 110-125% for better visibility
3. **Clear Screen**: Close unnecessary tabs and applications
4. **Highlight**:
   - Drag-and-drop upload
   - Compression progress
   - **Big reveal**: The reduction percentage (prominently displayed)
   - Side-by-side comparison showing identical quality
   - Supabase upload success
   - Final message about storage capacity

### Suggested Script

1. "Watch this: a 3MB image compressed to 400KB in seconds"
2. "That's 87% smaller with zero visible quality loss"
3. "Now uploading to Supabase storage..."
4. "Same storage capacity now holds 7 times more content!"

## Project Structure

```
src/
├── components/           # UI Components
│   ├── ImageUploader.tsx     # Drag-drop file upload
│   ├── ProgressBar.tsx       # Compression progress
│   ├── CompressionStats.tsx  # Statistics display
│   ├── ImageComparison.tsx   # Side-by-side view
│   └── SupabaseUpload.tsx    # Upload to Supabase
├── hooks/
│   └── useImageCompression.ts # Compression logic
├── lib/
│   ├── compression.ts        # Utility functions
│   └── supabase.ts          # Supabase client
├── types/
│   └── index.ts             # TypeScript interfaces
├── App.tsx                  # Main app component
├── main.tsx                 # Entry point
└── index.css                # Global styles
```

## Compression Settings

The app uses these optimal compression settings:

- **Max Size**: 500KB (from ~3MB = 83-85% reduction)
- **Max Dimension**: 1920px (HD quality maintained)
- **Quality**: 0.8 (good visual fidelity)
- **Format**: JPEG (best for photos)
- **Web Worker**: Enabled (non-blocking UI)

## Build for Production

```bash
npm run build
npm run preview
```

## License

MIT

## Credits

Built to demonstrate the power of image compression and Supabase Storage capabilities.
