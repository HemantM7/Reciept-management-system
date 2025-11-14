# 🌓 Dark Mode Guide

## Overview

The app now features a fully functional **dark mode** that persists across sessions and applies to all components.

---

## 🎯 How to Use

### Toggle Dark Mode

1. Look for the **sun/moon icon** in the top-right corner of the navbar
2. Click the icon to toggle between light and dark modes
3. The entire app will smoothly transition to the selected theme

### Icon Indicators

- ☀️ **Sun Icon** (Brightness7) - Currently in dark mode, click to switch to light
- 🌙 **Moon Icon** (Brightness4) - Currently in light mode, click to switch to dark

---

## ✨ Features

### Persistent Theme
- Your theme preference is **saved in localStorage**
- Returns to your last selected theme when you reopen the app
- No need to toggle every time

### Smooth Transitions
- All components transition smoothly (0.3s ease)
- No jarring color changes
- Professional fade effects

### Complete Coverage
Dark mode applies to:
- ✅ Background gradients
- ✅ Navigation bar
- ✅ Footer
- ✅ Statistics cards
- ✅ Charts and graphs
- ✅ Chart labels and text
- ✅ Paper components
- ✅ Borders and shadows
- ✅ All text colors

---

## 🎨 Color Scheme

### Light Mode
- **Background**: Light gradient (#f8f9fa → #e9ecef)
- **Cards**: White with light shadows
- **Text**: Dark colors for readability
- **Borders**: Light gray (#e0e0e0)

### Dark Mode
- **Background**: Dark gradient (#1a1a2e → #16213e)
- **Cards**: Dark blue (#0f3460) with darker shadows
- **Text**: White/light colors
- **Borders**: Dark gray (#333)
- **Charts**: White text on dark backgrounds

---

## 📊 Chart Adaptations

### In Dark Mode, Charts Feature:

1. **Dark Backgrounds**
   - Chart containers use dark blue (#0f3460)
   - Seamless integration with page background

2. **White Text**
   - All labels and legends in white
   - High contrast for readability
   - Axis labels clearly visible

3. **Enhanced Shadows**
   - Deeper shadows for depth
   - Better visual separation

4. **Preserved Colors**
   - Chart data colors remain vibrant
   - Status colors (Draft, Pending, Paid, Cancelled) unchanged
   - Category colors maintain visibility

---

## 🔧 Technical Implementation

### React Context
- Uses React Context API for global state
- `ThemeProvider` wraps entire app
- `useTheme()` hook available in all components

### LocalStorage
- Theme preference saved as `"darkMode": true/false`
- Automatically loads on app start
- Persists across browser sessions

### CSS Classes
- `dark-mode` class added to body element
- CSS transitions for smooth changes
- Custom properties for theme colors

---

## 💡 Best Practices

### When to Use Dark Mode

**Dark Mode is Great For:**
- 🌙 Working at night
- 👁️ Reducing eye strain
- 🔋 Saving battery (OLED screens)
- 😎 Personal preference
- 🎨 Modern aesthetic

**Light Mode is Great For:**
- ☀️ Bright environments
- 📄 Reading detailed content
- 🖨️ Printing documents
- 👴 Users preferring traditional UI

---

## 🎯 User Experience

### Accessibility
- High contrast in both modes
- WCAG compliant color ratios
- Clear visual indicators
- Smooth, non-jarring transitions

### Performance
- Instant toggle response
- No page reload required
- Minimal performance impact
- Efficient CSS transitions

---

## 🐛 Troubleshooting

### Theme Not Persisting?
- Check if browser allows localStorage
- Try clearing browser cache
- Ensure cookies/storage not blocked

### Colors Look Wrong?
- Hard refresh the page (Ctrl+F5)
- Clear browser cache
- Check browser compatibility

### Toggle Not Working?
- Ensure JavaScript is enabled
- Check browser console for errors
- Try a different browser

---

## 🔮 Future Enhancements

Potential improvements:
- 🎨 Multiple theme options (not just light/dark)
- 🌈 Custom color schemes
- ⏰ Auto-switch based on time of day
- 🖥️ Follow system preference
- 🎭 Theme preview before applying

---

## 📱 Mobile Support

Dark mode works perfectly on:
- 📱 iOS Safari
- 📱 Android Chrome
- 📱 Mobile Firefox
- 📱 All modern mobile browsers

---

## 🎨 Customization

### For Developers

Want to customize dark mode colors? Edit these files:

**1. Theme Context** (`src/context/ThemeContext.tsx`)
```typescript
// Change dark mode background
document.body.style.backgroundColor = "#1a1a2e"; // Your color here
```

**2. CSS Variables** (`src/App.css`)
```css
:root {
    --dark-bg: #1a1a2e;        /* Main dark background */
    --dark-card: #16213e;       /* Card background */
    --dark-card-hover: #0f3460; /* Card hover state */
}
```

**3. Component Styles**
Each component checks `darkMode` and applies appropriate colors:
```typescript
bgcolor: darkMode ? "#0f3460" : "white"
```

---

## ✅ Checklist

When dark mode is active, verify:
- [ ] Background is dark
- [ ] All text is readable
- [ ] Charts display correctly
- [ ] Borders are visible
- [ ] Shadows provide depth
- [ ] Icons are visible
- [ ] Buttons are clear
- [ ] No white flashes on navigation

---

## 🎉 Summary

Dark mode is now fully functional with:
- ✅ Persistent theme preference
- ✅ Smooth transitions
- ✅ Complete component coverage
- ✅ Chart adaptations
- ✅ Accessible design
- ✅ Mobile support
- ✅ Easy toggle

**Enjoy your new dark mode! 🌙✨**
