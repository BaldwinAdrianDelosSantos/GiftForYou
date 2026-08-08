# 🎂 Birthday Surprise Website

A magical, interactive single-page birthday surprise website with 7 beautiful scenes, CSS animations, and smooth transitions. No backend required — works offline and on GitHub Pages.

## 📁 Project Structure

```
birthdaygift/
├── index.html      # Main HTML file with all 7 scenes
├── style.css       # Complete styling with animations & responsive design
├── script.js       # Scene management, interactions, confetti, music
├── README.md       # This file
└── assets/
    ├── her-photo.svg   # Placeholder for her photo (Polaroid frame)
    ├── photo1.svg      # Placeholder photo 1
    ├── photo2.svg      # Placeholder photo 2
    ├── photo3.svg      # Placeholder photo 3
    ├── photo4.svg      # Placeholder photo 4
    └── music.mp3       # Optional background music
```

## 🎨 How to Replace Photos

### Replace `her-photo.svg` (Scene 7)
Replace the file `assets/her-photo.svg` with your own image. Recommended dimensions: 400x400px.
- Supported formats: JPG, PNG, SVG, WebP
- The image will be displayed in a Polaroid-style frame with fairy lights and decorations

### Replace Photo Placeholders (Scene 4)
Replace the files in the `assets/` folder:
- `photo1.svg` → your-photo-1.jpg
- `photo2.svg` → your-photo-2.jpg
- `photo3.svg` → your-photo-3.jpg
- `photo4.svg` → your-photo-4.jpg

Then update the `src` attributes in `index.html` (lines with `<img src="assets/photoX.svg">`).

## ✏️ How to Replace Messages

All personalizable content is in the `CONFIG` object at the top of `script.js`:

```javascript
const CONFIG = {
    name: 'you',  // Change this to her name
    messages: {
        scene1: 'Someone left you something special...',
        scene2: 'Hey, you! 🌷...',
        // ... etc
    }
};
```

Simply edit the text values in the `messages` object. The HTML will automatically display these values.

## 🎵 How to Add Music

1. Place your audio file in the `assets/` folder.
   - Supported formats: MP3, OGG, WAV
   - Recommended: 2-3 minute loop, gentle background music
   - File size: Keep under 5MB for fast loading

2. Rename your file to `musicforbirthday.mp3` (or update the path in `script.js`):
   ```javascript
   musicFile: 'assets/musicforbirthday.mp3',
   ```

3. Music will now **automatically start** when the gift is opened in Scene 6.

4. On the final screen (Scene 7), users can toggle music with the "Music: On/Off ♪" button.

**Note:** Some browsers may block autoplay. If music doesn't start automatically, the user can click the music toggle button on the final screen.

## 🧪 How to Test Locally

### Option 1: Open directly in browser
1. Navigate to `C:\xampp\htdocs\birthdaygift\`
2. Double-click `index.html` to open in your browser
3. Or right-click → Open with → Chrome/Firefox/Edge

### Option 2: Use XAMPP (recommended for testing)
1. Start Apache in XAMPP Control Panel
2. Open browser and go to: `http://localhost/birthdaygift/`
3. This also enables testing on mobile devices via your local network

### Option 3: Use a local server
```bash
# Using Python 3
python -m http.server 8000

# Using Node.js
npx serve .

# Using PHP
php -S localhost:8000
```
Then open: `http://localhost:8000`

## 🚀 How to Upload to GitHub and Enable Pages

### 1. Create a GitHub Repository
1. Go to [github.com](https://github.com) and log in
2. Click "+" → "New repository"
3. Name it: `birthdaygift` (or any name you prefer)
4. Keep it **Public** (required for free GitHub Pages)
5. Click "Create repository"

### 2. Upload Files
**Option A: Via GitHub Website**
1. In your new repository, click "Add file" → "Upload files"
2. Drag and drop all files from `C:\xampp\htdocs\birthdaygift\` (including the `assets/` folder)
3. Scroll down, add a commit message (e.g., "Initial birthday surprise website")
4. Click "Commit changes"

**Option B: Via Git Command Line**
```bash
cd C:\xampp\htdocs\birthdaygift
git init
git add .
git commit -m "Initial birthday surprise website"
git branch -M main
git remote add origin https://github.com/yourusername/birthdaygift.git
git push -u origin main
```

### 3. Enable GitHub Pages
1. In your repository, click "Settings"
2. In the left sidebar, click "Pages"
3. Under "Source", select:
   - Branch: `main` (or `master`)
   - Folder: `/ (root)`
4. Click "Save"
5. Wait 2-3 minutes for deployment
6. Your site will be live at: `https://yourusername.github.io/birthdaygift/`

### 4. Share the Link
Send the GitHub Pages URL to the birthday person! 🎉

## 🎭 Scene Overview

| Scene | Name | Description |
|-------|------|-------------|
| 1 | ✉️ Envelope | Opens with 3D animation, sparkles, and floating petals |
| 2 | 💌 Letter | Beautiful paper letter with heartfelt message |
| 3 | 🎂 Cake | CSS cake with glowing candles — make a wish! |
| 4 | 📸 Photos | Polaroid photos on a clothesline with swing animation |
| 5 | 📝 Notes | Colorful notes that flip to reveal sweet messages |
| 6 | 🎁 Gift | Animated gift box with confetti explosion |
| 7 | 🎉 Final | Birthday message, photo frame, fairy lights, and decorations |

## 🛠️ Customization Tips

### Change Colors
Edit CSS variables in `style.css`:
```css
:root {
    --pink: #ff9ecf;
    --purple: #c9a0dc;
    --cream: #fff8e7;
    --blue: #a8d8ea;
}
```

### Change Animations Speed
In `style.css`, modify the `--transition` variable:
```css
:root {
    --transition: 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}
```

### Add More Scenes
1. Add a new `<div class="scene" id="scene-X">` in `index.html`
2. Add styles in `style.css`
3. Add navigation logic in `script.js`

### Add More Notes (Scene 5)
Duplicate a `.note` div in `index.html` and update the message text. The flip animation works automatically.

## 📱 Browser Support

- Chrome/Edge: ✅ Full support
- Firefox: ✅ Full support
- Safari: ✅ Full support
- Mobile browsers: ✅ Fully responsive
- Internet Explorer: ❌ Not supported (use modern browser)

## 📝 Notes

- All animations use CSS transforms and opacity for optimal performance
- The site works completely offline — no external dependencies
- Confetti is implemented with vanilla JavaScript (no external libraries)
- Images use lazy loading for better performance
- Touch events are supported for mobile interactions

## 💖 Made with Love

This website is a personal gift. Customize it, make it yours, and spread the joy! 🌸

---

*For questions or improvements, feel free to modify the code. Happy coding! 🎂*
