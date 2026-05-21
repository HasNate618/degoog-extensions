# homelab degoog extensions

![zen theme preview](themes/zen/screenshots/preview.png)

Custom theme and plugins for the homelab degoog instance.

## Contents

### zen theme

Modified version of the official zen theme with:

- **Glass morphism** — `.degoog-panel`, search bars, badges, inputs, dropdowns, icon buttons with backdrop-filter blur and subtle shadows
- **Google-style search focus** — content blurs when the search bar is focused; search bar grows and shifts up
- **Instant unfocus** — no delay when pressing Escape or clicking outside the search bar
- **Color modes** — light (6% opacity glass) and dark (20% opacity glass)

### Keyboard Navigation plugin

`!hotkeys` — navigate search results entirely from the keyboard:

| Key | Action |
|-----|--------|
| `j` / `k` | Next / previous result (stops at ends) |
| `o` / `Enter` | Open selected result |
| `t` | Open result in new tab |
| `Escape` | Blur search bar / deselect result |
| `g` / `G` | Scroll to top / bottom (selection preserved) |
| `y` | Copy result URL to clipboard |

All keys are ignored while typing in an input field.

## Usage

Add this repo URL in **Settings → Store → Add**:

```
https://github.com/nate/homelab-degoog-extensions.git
```

Install the theme from **Settings → Themes** and the plugin from **Settings → Plugins**. Once the plugin is installed, `!hotkeys` shows the key reference, and the hotkeys work immediately on any search results page.
