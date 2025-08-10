# Pupilla Multi-Language PDF Feature

## How to Add Multiple Language PDFs

To add multiple language versions of a PDF, use the `pdfs` field instead of the single `pdf` field in your preprint's front matter:

### Example Configuration:

```yaml
---
layout: preprint
title: "Your Paper Title"
authors:
  - Author Name
pdfs:
  - language: "English"
    url: "/assets/pdfs/your-paper-en.pdf"
    flag: "🇺🇸"
  - language: "Italiano" 
    url: "/assets/pdfs/your-paper-it.pdf"
    flag: "🇮🇹"
  - language: "Français"
    url: "/assets/pdfs/your-paper-fr.pdf"
    flag: "🇫🇷"
---
```

### Field Explanations:

- **`language`**: The display name for the language (can be in the native language)
- **`url`**: Path to the PDF file
- **`flag`**: Emoji flag representing the language/country (optional - system will auto-detect common ones)

### Supported Auto-Flags:

The system automatically detects flags for common languages:

- English → 🇺🇸
- Italiano/Italian → 🇮🇹  
- Français/French → 🇫🇷
- Deutsch/German → 🇩🇪
- Español/Spanish → 🇪🇸
- Português/Portuguese → 🇵🇹
- 中文/Chinese → 🇨🇳
- 日本語/Japanese → 🇯🇵

### Features:

✅ **Individual download tracking**: Each language PDF is tracked separately  
✅ **Responsive design**: Buttons stack vertically on mobile  
✅ **Accessibility**: Proper ARIA labels and keyboard navigation  
✅ **Fallback support**: Still works with single `pdf` field for backward compatibility  

### Migration from Single PDF:

**Old format:**
```yaml
pdf: /assets/pdfs/paper.pdf
```

**New format:**
```yaml
pdfs:
  - language: "English"
    url: "/assets/pdfs/paper.pdf"
    flag: "🇺🇸"
```

Both formats are supported simultaneously.
