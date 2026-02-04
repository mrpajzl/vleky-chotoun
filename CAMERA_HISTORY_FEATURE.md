# 📹 Camera History Viewer - Feature Documentation

## Overview

Added a video-like camera history viewer that plays through 216 historical images per camera, with full timeline controls.

---

## ✨ Features

### Video-like Playback
- **Play/Pause** - Start/stop automatic playback
- **Timeline Scrubber** - Drag to any point in history
- **Skip Controls** - Jump forward/back by 10 frames
- **Speed Control** - 0.5x, 1x (default), 2x, 4x playback speeds
- **Reset** - Jump back to start
- **Smooth Transitions** - Images preloaded before display to prevent flickering

### Visual Feedback
- **LIVE Indicator** - Shows when viewing latest frame
- **Time Labels** - "X hours X minutes ago" for each frame
- **Frame Counter** - Current frame out of total (e.g. "52/216")
- **Progress Bar** - Visual timeline with current position

### Smart Image URLs
Images follow pattern: `https://www.vlekychotoun.cz/camera/{cameraName}-{frameNumber}.jpg`
- **cameraName**: w1, w2, w3, etc.
- **frameNumber**: 0 to 216
- Example: `w1-0.jpg` (oldest), `w1-216.jpg` (newest/live)

---

## 🎯 How to Use

### For Admins:

1. **Go to Admin Panel**: `/admin/cameras`
2. **Edit or Create Camera**
3. **Fill Camera History Settings**:
   - **Camera Name**: Enter `w1`, `w2`, `w3`, etc.
   - **History Image Count**: Usually `216` (default)
4. **Save**

Once a camera has a `cameraName`, it automatically displays with the history viewer instead of static image.

### For Users:

1. **Go to Cameras Page**: `/kamery`
2. **View Camera History**:
   - Click **Play** to watch history unfold
   - **Drag timeline** to jump to any moment
   - **Use skip buttons** to navigate quickly
   - **Change speed** for faster/slower playback
3. **Latest Frame**: Shows "LIVE" indicator

---

## 📊 Technical Details

### Schema Changes

```typescript
cameras: {
  // Existing fields...
  cameraName: v.optional(v.string()), // "w1", "w2", "w3"
  historyCount: v.optional(v.number()), // Default: 216
}
```

### Component Structure

**CameraHistoryViewer** (`components/CameraHistoryViewer.tsx`):
- Takes `cameraName`, `historyCount`, `name`, `description`
- Constructs URLs: `{baseUrl}/{cameraName}-{frameNumber}.jpg`
- Auto-plays through frames at configurable speed
- Full timeline controls with React state management

**Kamery Page** (`app/kamery/page.tsx`):
- Checks if camera has `cameraName`
- If yes → Use `CameraHistoryViewer`
- If no → Use `LiveCamera` (old behavior)

### Admin Form

Added new section in camera admin:
```
📹 Camera History Settings (Optional)
- Camera Name (for history): w1, w2, w3
- History Image Count: 216
```

With live URL preview: `https://www.vlekychotoun.cz/camera/w1-0.jpg`

---

## 🎮 User Controls

| Button | Action |
|--------|--------|
| ⏮️ Reset | Jump to frame 0 (oldest) |
| ⏪ Skip Back | Go back 10 frames |
| ▶️ Play | Start auto-playback |
| ⏸️ Pause | Stop auto-playback |
| ⏩ Skip Forward | Go forward 10 frames |
| 🎚️ Speed | Change playback speed |
| 🖱️ Timeline Drag | Jump to any frame |

---

## 📐 Image Requirements

### URL Pattern
```
https://www.vlekychotoun.cz/camera/{cameraName}-{frameNumber}.jpg

Examples:
- w1-0.jpg → Oldest image
- w1-108.jpg → Middle (~9 hours ago)
- w1-216.jpg → Newest/Live image
```

### Assumptions
- **216 images** total per camera
- Images are **10 minutes apart** (~36 hours of history)
- Frame 216 is the **latest/live** image
- Frame 0 is the **oldest** image

---

## 🚀 Example Setup

### Camera 1 (Main Slope)
```
Name (Czech): Hlavní sjezdovka
Name (English): Main Slope
Camera Name: w1
History Count: 216
Image URL: https://www.vlekychotoun.cz/camera/w1-216.jpg
Type: image
```

### Camera 2 (Kids Area)
```
Name (Czech): Dětský areál
Name (English): Kids Area
Camera Name: w2
History Count: 216
Image URL: https://www.vlekychotoun.cz/camera/w2-216.jpg
Type: image
```

### Camera 3 (Parking)
```
Name (Czech): Parkoviště
Name (English): Parking
Camera Name: w3
History Count: 216
Image URL: https://www.vlekychotoun.cz/camera/w3-216.jpg
Type: image
```

---

## 🎨 UI Features

### Timeline Scrubber
- Blue progress bar shows current position
- Smooth dragging with immediate feedback
- Labels: "Oldest" ← → "Latest (Live)"

### Overlay Info
- **Top Left**: Camera name and description
- **Top Right**: Frame counter and time label
- **Top Center** (when at latest): "LIVE" indicator with pulse animation

### Playback Controls
- Clean, centered layout
- Large play/pause button
- Skip buttons on sides
- Speed selector on right
- Reset button on left

### Responsive Design
- Works on desktop, tablet, mobile
- Touch-friendly timeline scrubber
- Adaptive button sizes
- Full-screen camera view

---

## 💡 Tips

1. **Set cameraName** for all cameras to enable history
2. **Keep historyCount at 216** unless you have different setup
3. **Test the URLs** before saving (check in browser)
4. **Latest image** is always at frame 216 (live view)
5. **Speed 2x or 4x** is great for quick review

---

## 🔧 Troubleshooting

### Camera shows "Camera Offline"
- Check if images exist at URLs
- Verify cameraName is correct (w1, w2, w3)
- Test URL manually: `https://www.vlekychotoun.cz/camera/w1-0.jpg`

### Timeline jumps or stutters
- Normal behavior - loading 216 images
- Images are loaded on-demand per frame
- Consider preloading nearby frames (future enhancement)

### History seems wrong
- Verify images are actually 5 minutes apart
- Check if historyCount matches actual images
- Ensure frame 216 is the latest image

---

## 📝 Migration Notes

### Existing Cameras
- Old cameras without `cameraName` still work
- They display with `LiveCamera` component (old behavior)
- No breaking changes - backward compatible

### New Cameras
- Add `cameraName` field to enable history
- Set `historyCount` (default 216)
- History viewer automatically activates

---

## 🎉 Result

Users can now:
- ✅ Watch weather changes over ~36 hours
- ✅ See snow accumulation timeline
- ✅ Check conditions from earlier today or yesterday
- ✅ Review slope traffic patterns
- ✅ Jump to any moment in history
- ✅ Play it like a video with smooth transitions

**Perfect for checking "How was it 3 hours ago?" 🎿**

---

## ⚡ Performance Improvements (v1.1)

### Preloading System
- Images are **preloaded before display** to prevent flickering
- Smooth transitions between frames
- Loading indicator shows during image fetch
- Controls disabled while loading to prevent race conditions

### Optimized Playback
- **Slower default speed** (400ms per frame) for better viewing
- Speed options: 0.5x (800ms), 1x (400ms), 2x (200ms), 4x (100ms)
- Automatic pause when reaching end of timeline
- Error handling with graceful fallback

### User Experience
- Visual loading indicator overlay
- Disabled controls during loading
- Time labels reflect 10-minute intervals
- Accurate history duration display (~36 hours)

---

Built on 2026-02-04 | Camera History Viewer v1.1
