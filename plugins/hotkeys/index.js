const HELP_HTML = `<div class="command-result" style="padding: 12px 0">
<table style="width:100%; border-collapse:collapse; font-size:0.9em">
<tr><th style="text-align:left; padding:6px 12px; color:var(--text-secondary)">Key</th><th style="text-align:left; padding:6px 12px; color:var(--text-secondary)">Action</th></tr>
<tr><td style="padding:6px 12px"><code>j</code></td><td style="padding:6px 12px">Next result</td></tr>
<tr><td style="padding:6px 12px"><code>k</code></td><td style="padding:6px 12px">Previous result</td></tr>
<tr><td style="padding:6px 12px"><code>o</code> / <code>Enter</code></td><td style="padding:6px 12px">Open selected result</td></tr>
<tr><td style="padding:6px 12px"><code>t</code></td><td style="padding:6px 12px">Open selected result in new tab</td></tr>
<tr><td style="padding:6px 12px"><code>Escape</code></td><td style="padding:6px 12px">Blur search bar / deselect result</td></tr>
<tr><td style="padding:6px 12px"><code>g</code></td><td style="padding:6px 12px">Scroll to top</td></tr>
<tr><td style="padding:6px 12px"><code>G</code> (Shift+g)</td><td style="padding:6px 12px">Scroll to bottom</td></tr>
<tr><td style="padding:6px 12px"><code>y</code></td><td style="padding:6px 12px">Copy result URL to clipboard</td></tr>
</table>
</div>`;

export default {
  isClientExposed: false,
  name: "Keyboard Navigation",
  description: "j/k/Enter/o/t/g/G/y/Esc hotkeys for search results.",
  trigger: "hotkeys",
  aliases: ["keys", "shortcuts"],
  settingsSchema: [],
  execute() {
    return { title: "Keyboard Navigation", html: HELP_HTML };
  },
};
