
import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { ScrollRevealDirective } from '../../directives/scroll-reveal.directive';
import {
  BlogDetailDialogComponent,
  BlogPost
} from '../blog-detail-dialog/blog-detail-dialog.component';

/* ── SVG diagram strings ─────────────────────────────────────────── */

const SVG_BUNDLE = `<svg viewBox="0 0 540 296" xmlns="http://www.w3.org/2000/svg" style="width:100%;font-family:Inter,sans-serif">
  <rect width="540" height="296" fill="rgba(15,23,42,0.85)" rx="10"/>
  <text x="270" y="24" fill="#94a3b8" font-size="11" font-weight="600" text-anchor="middle">Cumulative Bundle Size Reduction (gzipped KB)</text>
  <line x1="174" y1="36" x2="174" y2="272" stroke="rgba(255,255,255,0.08)" stroke-width="1"/>
  <text x="168" y="58" fill="#94a3b8" font-size="10" text-anchor="end">Baseline</text>
  <rect x="174" y="46" height="20" rx="4" fill="#475569" opacity="0.85" width="260"/>
  <text x="442" y="60" fill="#e2e8f0" font-size="10">450 KB</text>
  <text x="168" y="98" fill="#94a3b8" font-size="10" text-anchor="end">+Standalone</text>
  <rect x="174" y="86" height="20" rx="4" fill="#14b8a6" opacity="0.85" width="185"/>
  <text x="367" y="100" fill="#e2e8f0" font-size="10">320 KB (-130)</text>
  <text x="168" y="138" fill="#94a3b8" font-size="10" text-anchor="end">+Lazy Routes</text>
  <rect x="174" y="126" height="20" rx="4" fill="#14b8a6" opacity="0.85" width="113"/>
  <text x="295" y="140" fill="#e2e8f0" font-size="10">195 KB (-125)</text>
  <text x="168" y="178" fill="#94a3b8" font-size="10" text-anchor="end">+@defer</text>
  <rect x="174" y="166" height="20" rx="4" fill="#ec4899" opacity="0.85" width="66"/>
  <text x="248" y="180" fill="#e2e8f0" font-size="10">115 KB (-80)</text>
  <text x="168" y="218" fill="#94a3b8" font-size="10" text-anchor="end">+Zoneless</text>
  <rect x="174" y="206" height="20" rx="4" fill="#a855f7" opacity="0.85" width="51"/>
  <text x="233" y="220" fill="#e2e8f0" font-size="10">88 KB (-27)</text>
  <text x="168" y="258" fill="#94a3b8" font-size="10" text-anchor="end">+lodash-es</text>
  <rect x="174" y="246" height="20" rx="4" fill="#a855f7" opacity="0.85" width="36"/>
  <text x="218" y="260" fill="#e2e8f0" font-size="10">62 KB (-26)</text>
  <text x="174" y="288" fill="#64748b" font-size="9">0</text>
  <text x="428" y="288" fill="#64748b" font-size="9">450 KB</text>
</svg>`;

const SVG_ARCH = `<svg viewBox="0 0 560 175" xmlns="http://www.w3.org/2000/svg" style="width:100%;font-family:Inter,sans-serif">
  <defs>
    <marker id="ah" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
      <polygon points="0,0 6,3 0,6" fill="#475569"/>
    </marker>
  </defs>
  <rect width="560" height="175" fill="rgba(15,23,42,0.85)" rx="10"/>
  <text x="280" y="22" fill="#94a3b8" font-size="11" font-weight="600" text-anchor="middle">Claude API Integration Architecture</text>
  <rect x="15" y="45" width="140" height="80" rx="10" fill="rgba(99,102,241,0.18)" stroke="#6366f1" stroke-width="1.5"/>
  <text x="85" y="75" fill="#e2e8f0" font-size="11" font-weight="700" text-anchor="middle">Angular App</text>
  <text x="85" y="91" fill="#a5b4fc" font-size="9" text-anchor="middle">Signal + ReadableStream</text>
  <text x="85" y="107" fill="#64748b" font-size="9" text-anchor="middle">User Browser</text>
  <rect x="210" y="45" width="140" height="80" rx="10" fill="rgba(20,184,166,0.18)" stroke="#14b8a6" stroke-width="1.5"/>
  <text x="280" y="75" fill="#e2e8f0" font-size="11" font-weight="700" text-anchor="middle">NestJS Backend</text>
  <text x="280" y="91" fill="#5eead4" font-size="9" text-anchor="middle">Anthropic SDK</text>
  <text x="280" y="107" fill="#64748b" font-size="9" text-anchor="middle">API key lives here</text>
  <rect x="405" y="45" width="140" height="80" rx="10" fill="rgba(236,72,153,0.18)" stroke="#ec4899" stroke-width="1.5"/>
  <text x="475" y="75" fill="#e2e8f0" font-size="11" font-weight="700" text-anchor="middle">Claude API</text>
  <text x="475" y="91" fill="#f9a8d4" font-size="9" text-anchor="middle">claude-opus-5-5</text>
  <text x="475" y="107" fill="#64748b" font-size="9" text-anchor="middle">Anthropic</text>
  <line x1="158" y1="70" x2="207" y2="70" stroke="#14b8a6" stroke-width="1.5" marker-end="url(#ah)"/>
  <text x="182" y="63" fill="#14b8a6" font-size="8" text-anchor="middle">POST /chat</text>
  <line x1="353" y1="70" x2="402" y2="70" stroke="#14b8a6" stroke-width="1.5" marker-end="url(#ah)"/>
  <text x="377" y="63" fill="#14b8a6" font-size="8" text-anchor="middle">messages.stream()</text>
  <line x1="207" y1="112" x2="158" y2="112" stroke="#6366f1" stroke-width="1.5" marker-end="url(#ah)"/>
  <text x="182" y="132" fill="#6366f1" font-size="8" text-anchor="middle">ReadableStream</text>
  <line x1="402" y1="112" x2="353" y2="112" stroke="#6366f1" stroke-width="1.5" marker-end="url(#ah)"/>
  <text x="377" y="132" fill="#6366f1" font-size="8" text-anchor="middle">SSE text chunks</text>
</svg>`;

const SVG_RXJS = `<svg viewBox="0 0 520 262" xmlns="http://www.w3.org/2000/svg" style="width:100%;font-family:Inter,sans-serif">
  <rect width="520" height="262" fill="rgba(15,23,42,0.85)" rx="10"/>
  <rect x="12" y="12" width="237" height="34" rx="8" fill="rgba(99,102,241,0.28)"/>
  <text x="130" y="34" fill="#a5b4fc" font-size="13" font-weight="700" text-anchor="middle">Use Signal</text>
  <rect x="271" y="12" width="237" height="34" rx="8" fill="rgba(20,184,166,0.28)"/>
  <text x="389" y="34" fill="#5eead4" font-size="13" font-weight="700" text-anchor="middle">Use RxJS</text>
  <line x1="260" y1="10" x2="260" y2="250" stroke="rgba(255,255,255,0.07)" stroke-width="1"/>
  <text x="130" y="69" fill="#94a3b8" font-size="10" text-anchor="middle">Component-local state</text>
  <text x="389" y="69" fill="#94a3b8" font-size="10" text-anchor="middle">HTTP requests</text>
  <line x1="12" y1="77" x2="508" y2="77" stroke="rgba(255,255,255,0.04)" stroke-width="1"/>
  <text x="130" y="107" fill="#94a3b8" font-size="10" text-anchor="middle">Sync derived (computed)</text>
  <text x="389" y="107" fill="#94a3b8" font-size="10" text-anchor="middle">debounce / throttle / delay</text>
  <line x1="12" y1="115" x2="508" y2="115" stroke="rgba(255,255,255,0.04)" stroke-width="1"/>
  <text x="130" y="145" fill="#94a3b8" font-size="10" text-anchor="middle">UI toggles / loading flags</text>
  <text x="389" y="145" fill="#94a3b8" font-size="10" text-anchor="middle">Multi-stream combineLatest</text>
  <line x1="12" y1="153" x2="508" y2="153" stroke="rgba(255,255,255,0.04)" stroke-width="1"/>
  <text x="130" y="183" fill="#94a3b8" font-size="10" text-anchor="middle">Template auto-tracking</text>
  <text x="389" y="183" fill="#94a3b8" font-size="10" text-anchor="middle">switchMap (cancellation)</text>
  <line x1="12" y1="191" x2="508" y2="191" stroke="rgba(255,255,255,0.04)" stroke-width="1"/>
  <text x="130" y="221" fill="#94a3b8" font-size="10" text-anchor="middle">input() / output() / model()</text>
  <text x="389" y="221" fill="#94a3b8" font-size="10" text-anchor="middle">WebSocket / SSE / fromEvent</text>
  <line x1="12" y1="229" x2="508" y2="229" stroke="rgba(255,255,255,0.04)" stroke-width="1"/>
  <rect x="80" y="237" width="360" height="20" rx="6" fill="rgba(251,191,36,0.12)"/>
  <text x="260" y="251" fill="#fbbf24" font-size="9" text-anchor="middle" font-weight="600">Bridge: toSignal(obs$) and toObservable(sig) connect both worlds</text>
</svg>`;

const SVG_PORTFOLIO = `<svg viewBox="0 0 560 310" xmlns="http://www.w3.org/2000/svg" style="width:100%;font-family:Inter,sans-serif">
  <rect width="560" height="310" fill="rgba(15,23,42,0.85)" rx="10"/>
  <text x="280" y="20" fill="#94a3b8" font-size="11" font-weight="600" text-anchor="middle">17 Standalone Angular Components</text>
  <rect x="195" y="30" width="170" height="26" rx="8" fill="rgba(20,184,166,0.25)" stroke="#14b8a6" stroke-width="1.5"/>
  <text x="280" y="47" fill="#e2e8f0" font-size="10" font-weight="700" text-anchor="middle">app.ts — Root Component</text>
  <line x1="280" y1="56" x2="280" y2="68" stroke="#334155" stroke-width="1"/>
  <line x1="125" y1="68" x2="435" y2="68" stroke="#334155" stroke-width="1"/>
  <line x1="125" y1="68" x2="125" y2="80" stroke="#334155" stroke-width="1"/>
  <line x1="435" y1="68" x2="435" y2="80" stroke="#334155" stroke-width="1"/>
  <rect x="15" y="80" width="220" height="18" rx="4" fill="rgba(99,102,241,0.2)" stroke="rgba(99,102,241,0.5)" stroke-width="1"/>
  <text x="125" y="92" fill="#a5b4fc" font-size="9" font-weight="700" text-anchor="middle">FIXED / OVERLAY</text>
  <rect x="325" y="80" width="220" height="18" rx="4" fill="rgba(20,184,166,0.2)" stroke="rgba(20,184,166,0.5)" stroke-width="1"/>
  <text x="435" y="92" fill="#5eead4" font-size="9" font-weight="700" text-anchor="middle">SCROLLABLE SECTIONS</text>
  <rect x="20" y="108" width="100" height="18" rx="4" fill="rgba(99,102,241,0.1)" stroke="rgba(99,102,241,0.35)" stroke-width="1"/>
  <text x="70" y="120" fill="#94a3b8" font-size="9" text-anchor="middle">AnimatedBg</text>
  <rect x="130" y="108" width="100" height="18" rx="4" fill="rgba(99,102,241,0.1)" stroke="rgba(99,102,241,0.35)" stroke-width="1"/>
  <text x="180" y="120" fill="#94a3b8" font-size="9" text-anchor="middle">Header</text>
  <rect x="20" y="134" width="100" height="18" rx="4" fill="rgba(99,102,241,0.1)" stroke="rgba(99,102,241,0.35)" stroke-width="1"/>
  <text x="70" y="146" fill="#94a3b8" font-size="9" text-anchor="middle">PageLoader</text>
  <rect x="130" y="134" width="100" height="18" rx="4" fill="rgba(99,102,241,0.1)" stroke="rgba(99,102,241,0.35)" stroke-width="1"/>
  <text x="180" y="146" fill="#94a3b8" font-size="9" text-anchor="middle">BackToTop</text>
  <rect x="20" y="160" width="100" height="18" rx="4" fill="rgba(99,102,241,0.1)" stroke="rgba(99,102,241,0.35)" stroke-width="1"/>
  <text x="70" y="172" fill="#94a3b8" font-size="9" text-anchor="middle">SectionNav</text>
  <rect x="130" y="160" width="100" height="18" rx="4" fill="rgba(99,102,241,0.1)" stroke="rgba(99,102,241,0.35)" stroke-width="1"/>
  <text x="180" y="172" fill="#94a3b8" font-size="9" text-anchor="middle">AiChatbot</text>
  <rect x="330" y="108" width="100" height="18" rx="4" fill="rgba(20,184,166,0.1)" stroke="rgba(20,184,166,0.35)" stroke-width="1"/>
  <text x="380" y="120" fill="#94a3b8" font-size="9" text-anchor="middle">Hero / About</text>
  <rect x="440" y="108" width="100" height="18" rx="4" fill="rgba(20,184,166,0.1)" stroke="rgba(20,184,166,0.35)" stroke-width="1"/>
  <text x="490" y="120" fill="#94a3b8" font-size="9" text-anchor="middle">Experience</text>
  <rect x="330" y="134" width="100" height="18" rx="4" fill="rgba(20,184,166,0.1)" stroke="rgba(20,184,166,0.35)" stroke-width="1"/>
  <text x="380" y="146" fill="#94a3b8" font-size="9" text-anchor="middle">Projects</text>
  <rect x="440" y="134" width="100" height="18" rx="4" fill="rgba(20,184,166,0.1)" stroke="rgba(20,184,166,0.35)" stroke-width="1"/>
  <text x="490" y="146" fill="#94a3b8" font-size="9" text-anchor="middle">Skills</text>
  <rect x="325" y="160" width="220" height="58" rx="6" fill="rgba(251,191,36,0.06)" stroke="rgba(251,191,36,0.25)" stroke-width="1" stroke-dasharray="5 3"/>
  <text x="435" y="172" fill="#fbbf24" font-size="8" text-anchor="middle" font-weight="600">@defer — code-split on viewport</text>
  <rect x="330" y="178" width="62" height="18" rx="4" fill="rgba(236,72,153,0.12)" stroke="rgba(236,72,153,0.4)" stroke-width="1"/>
  <text x="361" y="190" fill="#94a3b8" font-size="8" text-anchor="middle">Testimonials</text>
  <rect x="400" y="178" width="66" height="18" rx="4" fill="rgba(236,72,153,0.12)" stroke="rgba(236,72,153,0.4)" stroke-width="1"/>
  <text x="433" y="190" fill="#94a3b8" font-size="8" text-anchor="middle">Certifications</text>
  <rect x="474" y="178" width="62" height="18" rx="4" fill="rgba(236,72,153,0.12)" stroke="rgba(236,72,153,0.4)" stroke-width="1"/>
  <text x="505" y="190" fill="#94a3b8" font-size="8" text-anchor="middle">Blog</text>
  <rect x="330" y="228" width="100" height="18" rx="4" fill="rgba(20,184,166,0.1)" stroke="rgba(20,184,166,0.35)" stroke-width="1"/>
  <text x="380" y="240" fill="#94a3b8" font-size="9" text-anchor="middle">Contact</text>
  <rect x="440" y="228" width="100" height="18" rx="4" fill="rgba(20,184,166,0.1)" stroke="rgba(20,184,166,0.35)" stroke-width="1"/>
  <text x="490" y="240" fill="#94a3b8" font-size="9" text-anchor="middle">Footer</text>
  <rect x="15" y="264" width="530" height="20" rx="4" fill="rgba(168,85,247,0.12)" stroke="rgba(168,85,247,0.35)" stroke-width="1"/>
  <text x="280" y="278" fill="#d8b4fe" font-size="9" text-anchor="middle">ScrollRevealDirective · ThemeService · MatDialog · CSS Custom Properties</text>
  <rect x="15" y="290" width="10" height="10" rx="2" fill="rgba(99,102,241,0.2)" stroke="#6366f1" stroke-width="1"/>
  <text x="30" y="299" fill="#64748b" font-size="8">Fixed</text>
  <rect x="75" y="290" width="10" height="10" rx="2" fill="rgba(20,184,166,0.2)" stroke="#14b8a6" stroke-width="1"/>
  <text x="90" y="299" fill="#64748b" font-size="8">Section</text>
  <rect x="145" y="290" width="10" height="10" rx="2" fill="rgba(236,72,153,0.2)" stroke="#ec4899" stroke-width="1"/>
  <text x="160" y="299" fill="#64748b" font-size="8">@defer loaded</text>
  <rect x="218" y="290" width="10" height="10" rx="2" fill="rgba(251,191,36,0.1)" stroke="rgba(251,191,36,0.4)" stroke-width="1" stroke-dasharray="4 2"/>
  <text x="233" y="299" fill="#64748b" font-size="8">Lazy boundary</text>
</svg>`;

/* ── Full article content ────────────────────────────────────────── */

const PORTFOLIO_PROMPT = `You are an expert Angular 21 developer and UI/UX designer.
Build me a complete, production-ready personal portfolio website.
I will provide my resume — extract all data from it (name, title,
roles, skills, experience, projects, certifications, education,
contact info) and use it to populate every section.

TECH STACK
- Angular 21, standalone components (no NgModules), SSR (@angular/ssr)
- Angular Material (toolbar, icon, button, dialog, form-field, chip)
- TypeScript strict mode, SCSS, CSS custom properties
- ChangeDetectionStrategy.OnPush on ALL components
- Claude API (claude-opus-5-5) for an AI chatbot sidebar

VISUAL DESIGN — dark theme default, light mode toggle
Color tokens: primary #14b8a6, accent #ec4899, bg #0f172a,
surface #1e293b, text #f8fafc, muted #94a3b8.
Font: Inter (body) + Outfit (headings), preconnected via Google Fonts.
Glass cards: rgba(30,41,59,0.7) bg, backdrop-filter blur(14px),
1px rgba(255,255,255,0.1) border, border-radius 16px.
Section titles: gradient ::after underline animates width 0→100%
on 1s cubic-bezier(0.22,1,0.36,1) after 0.4s delay.

ANIMATED BACKGROUND (fixed, z-index -1, pointer-events none)
Canvas particle system: 60-95 particles (min(area/10000, 95)),
each with position, velocity (±0.325), radius (0.7-3.1), baseAlpha,
color from ['#14b8a6','#ec4899','#6366f1','#38bdf8','#a855f7'],
pulseOffset. Per frame: move, bounce edges, repel from mouse
(radius 180px), pulse alpha with sin(), draw circle, connect
particles <145px with fading lines. Squared distances only.
runOutsideAngular(). Pause on tab hidden. 30fps cap on mobile.
CSS layer: 5 glow orbs (blur 90px radial gradients, floatOrb),
2 aurora bands (blur 70px, auroraMove), dot grid (gridPulse),
4 floating geometric shapes (floatShape). Mobile: halve blur.

HEADER (fixed, z-index 1000)
3px teal→pink→indigo scroll progress bar above navbar, rAF-updated.
Frosted glass: backdrop-filter blur(18px). IntersectionObserver
(threshold 0.35) on section elements for active nav link. Logo
hover grows ::after underline. Nav links: hover expands centered
underline from 50%. Contact link as teal pill. Sound toggle via
Web Audio API brown noise (lowpass 280Hz, gain 0.04). Theme toggle
persisted to localStorage. Hamburger → slide-in mobile menu from
right. All async state: markForCheck() after ngZone.run().

PAGE LOADER — full-screen, z-index 9999, animated progress bar,
fades out after 2.4s. OnPush + markForCheck() in setInterval.

HERO — two-column: gradient name text, typewriter subtitle cycling
roles via setInterval (OnPush + markForCheck), 3 animated counters
(years / projects / technologies), Download CV button (download
attr), View Work scroll-to anchor, social links. Profile image:
fetchpriority="high" decoding="async", circular gradient border.
Animated SVG code symbol in background.

EXPERIENCE — timeline cards with left color-accent border,
company, role, date range, bullet points, tech chip tags.
Scroll reveal left/right alternating.

PROJECTS — filter tabs (All + category tabs), grid of cards,
thumbnail (loading="lazy" decoding="async"), title, description,
tech chips, GitHub + demo links. Image zooms 1.08x on hover.
Staggered scroll reveal (i * 80ms delay).

SKILLS — category tabs, animated progress bars fill on
IntersectionObserver, tech icon grid with hover effects.

TESTIMONIALS — 2-column glass cards, format_quote icon, italic
text, initials avatar colored by company, verified icon badge.

CERTIFICATIONS — cards with credential name, issuer, date,
external verify link.

BLOG / WRITING — 3-column card grid, click opens MatDialog
with full article: headings, paragraphs, code blocks, lists,
inline SVG diagrams. DomSanitizer.bypassSecurityTrustHtml().

CONTACT — ReactiveFormsModule: name, email, subject, message.
Validators: required, email, minLength. Success/error feedback.

AI CHATBOT — floating FAB (bottom-right), slide-up chat panel,
POST /api/chat → SSE stream → ReadableStream in Angular →
WritableSignal<string> buffer updated token by token. System
prompt baked with full resume so Claude answers accurately.

ScrollRevealDirective — IntersectionObserver threshold 0.1,
adds .reveal-hidden / .reveal-left / .reveal-right on init,
.reveal-visible on intersect. [appScrollRevealDelay] sets
CSS transition-delay for staggered entrance.

PERFORMANCE (implement ALL)
OnPush + markForCheck() after every async update.
@defer (on viewport; prefetch on idle) on testimonials,
certifications, blog.
content-visibility: auto + contain-intrinsic-size: 0 700px
on those three sections.
ngZone.runOutsideAngular() for canvas animation loop.
rAF + ticking flag for scroll events.
Squared distances in hot loop.
30fps mobile cap (delta < 33ms check).
cancelAnimationFrame on tab hidden.
fetchpriority="high" on hero image; loading="lazy" on rest.
Google Fonts via preconnect + preload.
provideHttpClient(withFetch()) in app.config.ts.
Reduced backdrop-filter blur on mobile.

BackToTop — fixed bottom-right, visible after 400px, OnPush.
SectionNav — fixed side dots, active via IntersectionObserver.

Generate the complete project: app.config.ts, app.ts, theme.service.ts,
one folder per component, scroll-reveal.directive.ts, index.html,
styles.scss, angular.json (SSR configured), server.ts.
Replace all placeholders with data from the resume I will provide.`;

const POSTS: BlogPost[] = [
  {
    title: 'Building This Portfolio: Every Feature, Animation & Optimization Explained',
    date: 'Oct 2026',
    readTime: '12 min read',
    excerpt: 'A complete behind-the-scenes breakdown of how this portfolio was built with Angular 21, SSR, and Claude AI — every animation, every performance trick, every minute detail, and the prompt that made it possible.',
    tags: ['Angular', 'Portfolio', 'AI', 'Performance'],
    accentColor: '#38bdf8',
    content: [
      {
        type: 'paragraph',
        content: 'This portfolio was built from scratch using Angular 21 with SSR, Angular Material, and a layered animation system — and every line was generated through AI-assisted development using Claude Code. Here is a complete breakdown of every section, animation, directive, and performance optimization that went into it.'
      },
      {
        type: 'heading',
        content: 'Tech Stack'
      },
      {
        type: 'list',
        items: [
          'Angular 21 — standalone components (no NgModules), SSR via @angular/ssr',
          'Angular Material — toolbar, icon, button, dialog, form-field, ripple, chip',
          'TypeScript strict mode throughout',
          'SCSS with CSS custom properties (color tokens, glass variables)',
          'Vite dev server (Angular CLI), Express for SSR',
          'Claude API (claude-opus-5-5) for the AI chatbot',
          'Web Audio API for the ambient brown noise toggle',
          'Canvas 2D API for the particle system'
        ]
      },
      {
        type: 'heading',
        content: 'Design System — Color Tokens & Glass Morphism'
      },
      {
        type: 'paragraph',
        content: 'The entire visual language flows from three core color tokens. Every gradient, glow, border highlight, and tag uses these three values — nothing is hard-coded in components.'
      },
      {
        type: 'code',
        content: `:root {
  --primary-color: #14b8a6;  /* Teal 500  */
  --accent-color:  #ec4899;  /* Pink 500  */
  --bg-color:      #0f172a;  /* Slate 900 */
  --surface-color: #1e293b;  /* Slate 800 */
  --text-color:    #f8fafc;  /* Slate 50  */
  --text-muted:    #94a3b8;  /* Slate 400 */

  /* Glass morphism card */
  --glass-bg:     rgba(30, 41, 59, 0.7);
  --glass-border: rgba(255, 255, 255, 0.1);
  --glass-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
}

/* Light theme overrides on <html class="light-theme"> */
.light-theme {
  --bg-color:      #f8fafc;
  --surface-color: #ffffff;
  --text-color:    #0f172a;
  --text-muted:    #64748b;
  --glass-bg:      rgba(255, 255, 255, 0.7);
}`
      },
      {
        type: 'heading',
        content: 'Component Architecture — 17 Standalone Components'
      },
      {
        type: 'diagram',
        svg: SVG_PORTFOLIO
      },
      {
        type: 'heading',
        content: 'Animated Background — Canvas + CSS Layers'
      },
      {
        type: 'paragraph',
        content: 'The background runs two parallel animation systems: a Canvas 2D particle engine and a pure CSS layer. Both are entirely outside Angular\'s change detection cycle to prevent per-frame CD runs.'
      },
      {
        type: 'list',
        items: [
          'Canvas particles: count = min(width×height / 10000, 95) — scales to screen size',
          'Mouse repulsion: squared distance check (dx²+dy² vs 180²) avoids Math.sqrt for ~99% of particles',
          'Connection lines: drawn between particles within 145px, alpha = (1 - dist/145) × 0.18',
          'Pulsing alpha: baseAlpha + sin(time×1.4 + pulseOffset) × 0.14 — each particle breathes independently',
          '5 CSS glow orbs: teal top-left, pink bottom-right, indigo center, sky top-right, purple bottom-left; floatOrb keyframe (translate+scale, 16-26s, alternate)',
          '2 Aurora layers: 250%-width blurred gradient bands, auroraMove keyframe (translateX+scaleX, 14-18s)',
          'Dot grid: radial-gradient 52px grid, gridPulse keyframe pulses size and opacity',
          '4 floating geometric shapes: square, circle, diamond, rounded square with floatShape (rotate+translateY+scale)',
          'Tab visibility: cancelAnimationFrame on document.hidden, resume on visibilitychange',
          'Mobile (max-width 768px): blur halved (90→45px, 70→35px), shapes hidden, grid animation disabled, 30fps cap'
        ]
      },
      {
        type: 'heading',
        content: 'The Header — Every Detail'
      },
      {
        type: 'list',
        items: [
          'Scroll progress bar: 3px gradient strip (teal→pink→indigo), box-shadow glow, rAF-updated, fixed above navbar',
          'Navbar entrance: navSlideDown keyframe (translateY(-100%)→0 + opacity 0→1, 0.7s cubic-bezier)',
          'Active section: IntersectionObserver with threshold 0.35 on #about, #experience, #projects, #skills, #contact',
          'Logo: "Binod.P" in three styled spans; ::after pseudo-element underline grows width 0→100% on hover',
          'Nav link hover: ::after underline expands outward from center — left moves left as width grows right',
          'Contact link: pill border (border-radius 20px, 1px teal border), teal glow on hover',
          'Sound toggle: first click creates AudioContext + lowpass-filtered brown noise buffer (loop, gain 0.04, cutoff 280Hz); subsequent clicks suspend/resume',
          'Theme toggle: toggles .light-theme class on <html>, persisted to localStorage',
          'Hamburger → X: span 1 translateY(7px)+rotate(45deg), span 2 opacity 0, span 3 translateY(-7px)+rotate(-45deg)',
          'Mobile overlay: slides from right (translateX 100%→0, 0.4s cubic-bezier), numbered items (01-07), backdrop blur'
        ]
      },
      {
        type: 'heading',
        content: 'Hero Section'
      },
      {
        type: 'list',
        items: [
          'Gradient name: background-clip: text with linear-gradient from primary to accent',
          'Typewriter subtitle: setInterval cycles through role strings, OnPush + markForCheck() on each tick',
          '3 stat counters: setInterval from 0 to target (years / projects / technologies), staggered start',
          'Profile image: fetchpriority="high" decoding="async", circular clip, gradient border glow ring',
          'Animated SVG: rotating bracket/code symbol in background with CSS keyframe rotation',
          'Download CV: anchor tag with download attribute pointing to /assets/resume.pdf',
          'View Work button: smooth scroll to #experience via anchor href',
          'Social links: GitHub, LinkedIn, Email — each with hover color and scale transition'
        ]
      },
      {
        type: 'heading',
        content: 'Scroll Reveal Directive'
      },
      {
        type: 'paragraph',
        content: 'Every major element in the portfolio has a custom ScrollRevealDirective applied. It uses IntersectionObserver at threshold 0.1 to fire a one-time CSS transition from hidden to visible. Three directional modes let different elements slide in from different angles.'
      },
      {
        type: 'code',
        content: `// Applied to host element on init — one of three classes:
.reveal-hidden  { opacity: 0; transform: translateY(42px);  }  // default
.reveal-left    { opacity: 0; transform: translateX(-64px); }  // direction='left'
.reveal-right   { opacity: 0; transform: translateX(64px);  }  // direction='right'

// Transition: 0.85s cubic-bezier(0.5, 0, 0, 1) — slightly springy

// When element enters viewport:
.reveal-visible { opacity: 1 !important; transform: translate(0) !important; }

// Staggered with [appScrollRevealDelay]="i * 80" → transition-delay: 80ms, 160ms, 240ms...
// Observer disconnects after first fire — zero ongoing overhead`
      },
      {
        type: 'heading',
        content: 'Sections at a Glance'
      },
      {
        type: 'list',
        items: [
          'Experience: left-bordered timeline cards (3px primary-color border), company, role, dates, bullet points, tech chips. Scroll reveal left/right alternating.',
          'Projects: filter tab bar (All + categories), 3-column grid, image zoom 1.08x on hover, overlay fades in with links. Staggered scroll reveal.',
          'Skills: animated width fill on progress bars triggered by IntersectionObserver, categorized tabs, tech icon grid.',
          'Testimonials: 2-column glass cards, format_quote icon in gradient, initials avatar with company-colored border, verified badge. Scroll reveal left/right.',
          'Certifications: cards with issuer, date, credential ID, external verification link.',
          'Blog/Writing: 3-column card grid, tag chips, click opens MatDialog with full article content + inline SVG diagrams.',
          'Contact: ReactiveFormsModule with Validators.required, Validators.email, Validators.minLength; success/error state on submit.',
          'Footer: social links, built-with attribution, copyright.'
        ]
      },
      {
        type: 'heading',
        content: 'AI Chatbot — Claude API Integration'
      },
      {
        type: 'list',
        items: [
          'Floating FAB (bottom-right), click opens slide-up chat panel with 400px max-height',
          'Frontend POSTs to /api/chat; backend proxies to Claude API with streaming enabled',
          'Backend forwards SSE chunks; Angular reads via ReadableStream + TextDecoder',
          'Response buffer: WritableSignal<string> — update(r => r + chunk) on each token',
          'isStreaming signal drives a typing indicator (animated dots) in the UI',
          'System prompt embeds full resume data so Claude answers portfolio questions accurately',
          'Model: claude-opus-5-5 with max_tokens: 1024 and a portfolio-specific context',
          'Error handling: graceful degradation message when API is unavailable'
        ]
      },
      {
        type: 'heading',
        content: 'Performance — Everything Implemented'
      },
      {
        type: 'list',
        items: [
          'ChangeDetectionStrategy.OnPush on all 17 components — eliminates full-tree CD on every scroll/rAF tick',
          'markForCheck() called after every async state update (IntersectionObserver, setInterval, rAF callbacks)',
          '@defer (on viewport; prefetch on idle) on Testimonials, Certifications, Blog — 3 separate lazy chunks',
          'content-visibility: auto + contain-intrinsic-size: 0 700px on those three sections',
          'Canvas animation runs in ngZone.runOutsideAngular() — zero CD events from 60fps rAF loop',
          'Scroll progress and back-to-top use requestAnimationFrame + scrollTicking boolean to batch DOM reads',
          'Squared distance checks (dx²+dy² vs threshold²) — avoids Math.sqrt in O(n²) particle inner loop',
          '30fps mobile cap: if (timestamp - lastFrame < 33) return — halves GPU load on phones',
          'cancelAnimationFrame on document.hidden, resume on visibilitychange — zero CPU when tab is hidden',
          'Hero image: fetchpriority="high" decoding="async" — prioritizes LCP element over other resources',
          'Project images: loading="lazy" decoding="async" — defers off-screen decode',
          'Google Fonts: preconnect + preload link tag — eliminates FOUT, single combined request',
          'provideHttpClient(withFetch()) — uses native fetch API for SSR compatibility (fixes NG02801)',
          'Mobile backdrop-filter: blur(18px) → blur(8px) on max-width 768px'
        ]
      },
      {
        type: 'heading',
        content: 'The Minute Details'
      },
      {
        type: 'list',
        items: [
          'Scroll progress bar glow: box-shadow: 0 0 12px rgba(20,184,166,0.7) — the bar itself glows',
          'Navbar animation: cubic-bezier(0.22, 1, 0.36, 1) — slight overshoot, feels physical not linear',
          'Logo: "Binod" in --text-color, "." in --accent-color, "P" in --primary-color — three different CSS vars',
          'Glass card hover: border-color transitions to rgba(20,184,166,0.45) + 0 0 28px rgba(20,184,166,0.18) shadow',
          'Section nav dots: tooltip appears on hover via CSS :hover + adjacent sibling, no JavaScript',
          'Particle inner loop connection: pDistSq compared to 145*145 = 21025 — no division, no sqrt',
          'Ambient noise uses AudioContext.createBuffer with 4s of samples, src.loop = true — gapless',
          'Typewriter cursor: ::after with opacity animation, blinks while typing pauses',
          'Page loader uses same teal→pink gradient as the scroll progress bar — brand-consistent',
          'Back-to-top button: opacity 0 → 1 transition with pointer-events toggle — no layout shift',
          'Project filter tabs use signal-based filtering — filtered = computed(() => ...) with no subscriptions',
          'Custom scrollbar: 8px width, --surface-color track, teal thumb on :hover',
          'All section title underlines use the same growLine keyframe (to { width: 100% }) — one shared CSS rule'
        ]
      },
      {
        type: 'callout',
        content: 'See what Magic a prompt can bring'
      },
      {
        type: 'paragraph',
        content: 'Here is the exact prompt used to create this entire portfolio. Give it to any AI Agent along with your resume — it will generate every component, every animation, every performance optimization, and populate it with your personal data. Zero manual configuration.'
      },
      {
        type: 'code',
        content: PORTFOLIO_PROMPT
      }
    ]
  },
  {
    title: 'Optimizing Angular Bundle Size: What Actually Works',
    date: 'Sep 2025',
    readTime: '5 min read',
    excerpt: 'After building 10+ production Angular apps, here are the techniques that genuinely move the needle on bundle size and time-to-interactive — lazy loading, preloading strategies, and zone-less change detection.',
    tags: ['Angular', 'Performance', 'Web Dev'],
    accentColor: '#14b8a6',
    content: [
      {
        type: 'paragraph',
        content: 'Bundle bloat is one of the most common performance bottlenecks in Angular apps. After working on 10+ production applications at Deloitte, I\'ve found that some techniques genuinely move the needle while others feel productive but don\'t matter much. Here\'s what actually works, ordered by impact.'
      },
      {
        type: 'heading',
        content: 'Measure First — Use Stats JSON'
      },
      {
        type: 'paragraph',
        content: 'Before changing anything, run a production build with --stats-json and load the output into webpack-bundle-analyzer. You\'ll immediately see which chunks are largest, which dependencies are duplicated, and where the quick wins are.'
      },
      {
        type: 'code',
        content: `npx ng build --stats-json
npx webpack-bundle-analyzer dist/your-app/browser/stats.json`
      },
      {
        type: 'heading',
        content: 'Switch to Standalone Components'
      },
      {
        type: 'paragraph',
        content: 'The highest-impact change you can make: migrate from NgModule-based architecture to standalone components. NgModules force Angular\'s compiler to keep entire module trees in the bundle even if only a fraction of each module\'s exports are used.'
      },
      {
        type: 'list',
        items: [
          'Replace @NgModule with standalone: true on every component',
          'Import only the specific modules/directives each component needs',
          'Replace app.module.ts with app.config.ts + standalone bootstrap',
          'Typical result: 25–35% bundle size reduction with no functional change'
        ]
      },
      {
        type: 'heading',
        content: 'Lazy-Load Every Route'
      },
      {
        type: 'paragraph',
        content: 'Every route beyond the initial landing page should be loaded on demand. With loadComponent (Angular 15+), this is a one-liner per route and requires zero manual chunk configuration.'
      },
      {
        type: 'code',
        content: `const routes: Routes = [
  {
    path: 'dashboard',
    loadComponent: () => import('./dashboard/dashboard.component')
      .then(m => m.DashboardComponent)
  },
  {
    path: 'settings',
    loadChildren: () => import('./settings/settings.routes')
      .then(m => m.SETTINGS_ROUTES)
  }
];`
      },
      {
        type: 'heading',
        content: 'Use @defer for Below-Fold Content'
      },
      {
        type: 'paragraph',
        content: 'Angular 17\'s @defer block automatically code-splits any component into a separate chunk — no webpack configuration required. Wrap components that only appear below the fold (charts, modals, testimonials, heavy tables) and they\'ll be excluded from the initial bundle entirely.'
      },
      {
        type: 'code',
        content: `@defer (on viewport; prefetch on idle) {
  <app-analytics-dashboard />
} @placeholder {
  <div class="placeholder" style="min-height:400px"></div>
} @loading {
  <app-skeleton-loader />
}`
      },
      {
        type: 'heading',
        content: 'Eliminate Heavy Utility Libraries'
      },
      {
        type: 'paragraph',
        content: 'Lodash imported as import _ from \'lodash\' pulls in 72KB gzipped even with tree-shaking. Switch to lodash-es (fully tree-shakable) or replace with modern JS equivalents.'
      },
      {
        type: 'list',
        items: [
          '_.debounce → rxjs debounceTime or a 3-line native implementation',
          '_.cloneDeep → structuredClone() (native in all modern browsers)',
          '_.groupBy, _.sortBy → Array.reduce() and Array.sort()',
          'moment.js → date-fns (modular) or native Intl.DateTimeFormat',
          'Result: typically saves 40–60KB per heavy utility library removed'
        ]
      },
      {
        type: 'heading',
        content: 'Bundle Size Impact'
      },
      {
        type: 'diagram',
        svg: SVG_BUNDLE
      }
    ]
  },
  {
    title: 'Building AI-Powered Apps with Claude API',
    date: 'Aug 2025',
    readTime: '7 min read',
    excerpt: 'Integrating Claude AI into production Angular apps is simpler than you think. Here\'s how I designed a real-time conversational UI with streaming responses, tool-use, and intelligent fallbacks.',
    tags: ['AI', 'Claude', 'Angular'],
    accentColor: '#ec4899',
    content: [
      {
        type: 'paragraph',
        content: 'Adding AI to a production app isn\'t just about calling an API — it\'s about designing the UX for latency, handling errors gracefully, and streaming responses in real time. Here\'s what I learned building this portfolio\'s chatbot with Claude API and Angular 21.'
      },
      {
        type: 'heading',
        content: 'Architecture: Always Proxy Through Your Backend'
      },
      {
        type: 'paragraph',
        content: 'The golden rule: never call the Claude API directly from the browser. Proxy through your own server. This keeps your API key out of client-side code, lets you add rate limiting, conversation history, logging, and user-specific context — none of which are possible from the browser.'
      },
      {
        type: 'diagram',
        svg: SVG_ARCH
      },
      {
        type: 'heading',
        content: 'Streaming with Server-Sent Events'
      },
      {
        type: 'paragraph',
        content: 'The key UX improvement is streaming — sending tokens to the browser as they\'re generated instead of waiting for the full response. This makes Claude feel instant even on long answers. The backend forwards Claude\'s SSE stream directly to the client.'
      },
      {
        type: 'code',
        content: `// NestJS controller
@Post('chat')
async stream(@Body() dto: ChatDto, @Res() res: Response) {
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('X-Accel-Buffering', 'no');

  const stream = this.anthropic.messages.stream({
    model: 'claude-opus-5-5',
    max_tokens: 1024,
    messages: [{ role: 'user', content: dto.message }]
  });

  for await (const event of stream) {
    if (event.type === 'content_block_delta'
        && event.delta.type === 'text_delta') {
      res.write('data: ' + JSON.stringify({ text: event.delta.text }) + '\\n\\n');
    }
  }
  res.write('data: [DONE]\\n\\n');
  res.end();
}`
      },
      {
        type: 'heading',
        content: 'Consuming the Stream in Angular'
      },
      {
        type: 'paragraph',
        content: 'On the Angular side, use a WritableSignal as the response buffer and append chunks as they arrive. This gives reactive template rendering without subscriptions, async pipes, or manual change detection.'
      },
      {
        type: 'code',
        content: `readonly reply = signal('');
readonly streaming = signal(false);

async send(message: string) {
  this.streaming.set(true);
  this.reply.set('');

  const res = await fetch('/api/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message })
  });

  const reader = res.body!.getReader();
  const decoder = new TextDecoder();

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    const chunk = decoder.decode(value, { stream: true });
    for (const line of chunk.split('\\n')) {
      if (line.startsWith('data: ') && !line.includes('[DONE]')) {
        const data = JSON.parse(line.slice(6));
        this.reply.update(r => r + data.text);
      }
    }
  }
  this.streaming.set(false);
}`
      },
      {
        type: 'heading',
        content: 'Tool Use for Structured Responses'
      },
      {
        type: 'paragraph',
        content: 'Claude\'s tool use feature lets the model call functions you define, returning structured JSON instead of free text. I use this for portfolio-specific queries so the chatbot returns typed data the Angular component can display directly.'
      },
      {
        type: 'code',
        content: `const tools = [{
  name: 'get_project_details',
  description: 'Returns details about a specific project',
  input_schema: {
    type: 'object',
    properties: {
      projectName: { type: 'string' }
    },
    required: ['projectName']
  }
}];

const response = await anthropic.messages.create({
  model: 'claude-opus-5-5',
  tools,
  messages: [{ role: 'user', content: 'Tell me about the Angular projects' }]
});`
      },
      {
        type: 'heading',
        content: 'Production Checklist'
      },
      {
        type: 'list',
        items: [
          'Always set max_tokens — an uncapped response can exhaust your monthly budget in minutes',
          'Implement exponential backoff for 529 (overloaded) errors; they\'re common during peak hours',
          'Use Anthropic\'s prompt caching for system prompts — cuts costs 90% on repeated context',
          'Add a circuit breaker: degrade gracefully to a static FAQ when the API is unavailable',
          'Log all requests server-side — you\'ll need it to debug edge-case hallucinations in prod'
        ]
      }
    ]
  },
  {
    title: 'Why RxJS Still Matters in the Signals Era',
    date: 'Jul 2025',
    readTime: '4 min read',
    excerpt: 'Angular Signals are a great addition for synchronous reactive state, but RxJS wins for complex async orchestration, event streams, and cross-service coordination. Here\'s when to use each.',
    tags: ['Angular', 'RxJS', 'Signals'],
    accentColor: '#6366f1',
    content: [
      {
        type: 'paragraph',
        content: 'When Angular Signals became stable in v17, many developers declared RxJS obsolete. Two years later, with Signals fully mature in Angular 21, the picture is more nuanced: Signals and RxJS solve different problems, and knowing when to use each is now a core Angular skill.'
      },
      {
        type: 'heading',
        content: 'Where Signals Win'
      },
      {
        type: 'paragraph',
        content: 'Signals excel at synchronous, component-local reactive state — any value that should update the template the moment it changes. The Angular template engine has first-class optimization for signals: it tracks exactly which signal each expression reads and updates only what changed.'
      },
      {
        type: 'code',
        content: `readonly loading = signal(false);
readonly activeTab = signal<'projects' | 'skills' | 'all'>('all');
readonly filtered = computed(() =>
  this.projects().filter(p =>
    this.activeTab() === 'all' || p.category === this.activeTab()
  )
);

// Template consumes these with no async pipe, no subscription,
// no manual change detection — Angular handles it automatically`
      },
      {
        type: 'heading',
        content: 'Where RxJS Still Wins'
      },
      {
        type: 'paragraph',
        content: 'RxJS becomes essential the moment you need operators — especially time-based, multi-stream, or cancellation operators. There are no Signal equivalents for these patterns:'
      },
      {
        type: 'list',
        items: [
          'debounceTime / throttleTime — essential for search typeahead and resize event handling',
          'switchMap — cancels the previous HTTP request when a new one fires, preventing race conditions',
          'combineLatest / withLatestFrom — combines multiple streams with precise semantics',
          'retryWhen / retry({ count, delay }) — exponential backoff for flaky network requests',
          'WebSocket and SSE streams — fromEvent and custom Observables still have no Signal equivalent'
        ]
      },
      {
        type: 'heading',
        content: 'The Bridge: toSignal() and toObservable()'
      },
      {
        type: 'paragraph',
        content: 'The real breakthrough in Angular 16+ is the interop layer — toSignal() and toObservable() let you cross the boundary without architectural gymnastics. Use RxJS where it shines, Signal where it shines, and bridge at the seam.'
      },
      {
        type: 'code',
        content: `import { toSignal, toObservable } from '@angular/core/rxjs-interop';

// Pattern 1: HTTP Observable → Signal (no async pipe in template)
readonly users = toSignal(
  this.http.get<User[]>('/api/users'),
  { initialValue: [] }
);

// Pattern 2: Signal → Observable → back to Signal
// Gives you RxJS operators on top of a Signal value
readonly results = toSignal(
  toObservable(this.searchTerm).pipe(
    debounceTime(300),
    filter(term => term.length > 1),
    switchMap(term => this.http.get<Result[]>('/api/search?q=' + term)),
    catchError(() => of([]))
  ),
  { initialValue: [] }
);`
      },
      {
        type: 'heading',
        content: 'Signal vs RxJS — Quick Reference'
      },
      {
        type: 'diagram',
        svg: SVG_RXJS
      },
      {
        type: 'heading',
        content: 'Bottom Line'
      },
      {
        type: 'paragraph',
        content: 'Default to Signals for all local component state — they\'re simpler, faster, and the Angular compiler optimizes for them specifically. Reach for RxJS when you need operators, cancellation, or complex async orchestration. Use toSignal()/toObservable() at the boundaries between the two worlds. The two tools are complementary, not competing.'
      }
    ]
  }
];

/* ── Component ───────────────────────────────────────────────────── */

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatDialogModule, ScrollRevealDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section id="blog" class="section-padding container">
      <div class="section-head">
        <h2 class="section-title">
          Writing<span class="dot">.</span>
          <span class="title-underline"></span>
        </h2>
        <p class="section-sub">Thoughts on engineering, AI, and the craft of building things.</p>
      </div>

      <div class="blog-grid">
        @for (post of posts; track post.title; let i = $index) {
          <article class="blog-card glass-card"
                   (click)="openPost(post)"
                   [appScrollReveal]="i === 0 ? 'left' : i === 1 ? '' : 'right'"
                   [appScrollRevealDelay]="i * 80"
                   [style.--accent]="post.accentColor">
            <div class="card-top">
              <div class="post-tags">
                @for (tag of post.tags; track tag) {
                  <span class="tag" [style.background]="post.accentColor + '15'" [style.color]="post.accentColor" [style.border-color]="post.accentColor + '40'">
                    {{ tag }}
                  </span>
                }
              </div>
              <div class="post-meta">
                <span class="post-date">
                  <mat-icon>calendar_today</mat-icon>{{ post.date }}
                </span>
                <span class="post-rt">
                  <mat-icon>schedule</mat-icon>{{ post.readTime }}
                </span>
              </div>
            </div>
            <h3 class="post-title">{{ post.title }}</h3>
            <p class="post-excerpt">{{ post.excerpt }}</p>
            <div class="card-bottom">
              <div class="read-more" [style.color]="post.accentColor">
                Read article
                <mat-icon>arrow_forward</mat-icon>
              </div>
              <div class="accent-bar" [style.background]="'linear-gradient(90deg, ' + post.accentColor + ', transparent)'"></div>
            </div>
          </article>
        }
      </div>

      <div class="blog-cta" appScrollReveal>
        <mat-icon>edit_note</mat-icon>
        <p>More articles in progress — follow on <a href="https://github.com/thisisbinodprasad" target="_blank" rel="noopener">GitHub</a> for updates.</p>
      </div>
    </section>
  `,
  styles: [`
    .section-head { margin-bottom: 44px; }

    .section-title {
      font-size: 2.5rem;
      font-weight: 700;
      position: relative;
      display: inline-block;
      margin-bottom: 12px;

      .dot { color: var(--primary-color); }

      .title-underline {
        position: absolute;
        bottom: -10px; left: 0;
        height: 3px; width: 0;
        background: linear-gradient(90deg, var(--primary-color), var(--accent-color));
        border-radius: 2px;
        animation: growLine 1s cubic-bezier(0.22, 1, 0.36, 1) 0.4s forwards;
      }
    }

    @keyframes growLine { to { width: 100%; } }

    .section-sub {
      color: var(--text-muted);
      font-size: 1rem;
      margin: 20px 0 0;
    }

    .blog-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 24px;
      margin-bottom: 40px;
    }

    .blog-card {
      display: flex;
      flex-direction: column;
      padding: 28px;
      position: relative;
      overflow: hidden;
      cursor: pointer;
      transition: transform 0.38s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.38s ease;

      &::before {
        content: '';
        position: absolute;
        top: 0; left: 0; right: 0;
        height: 2px;
        background: linear-gradient(90deg, var(--accent, var(--primary-color)), transparent);
        transform: scaleX(0);
        transform-origin: left;
        transition: transform 0.5s cubic-bezier(0.22, 1, 0.36, 1);
      }

      &:hover {
        transform: translateY(-8px);
        box-shadow: 0 20px 48px rgba(0,0,0,0.3), 0 0 20px rgba(20,184,166,0.1);
        &::before { transform: scaleX(1); }
      }
    }

    .card-top { margin-bottom: 18px; }

    .post-tags {
      display: flex;
      gap: 8px;
      flex-wrap: wrap;
      margin-bottom: 12px;

      .tag {
        font-size: 0.7rem;
        font-weight: 600;
        padding: 3px 10px;
        border-radius: 12px;
        border: 1px solid;
        text-transform: uppercase;
        letter-spacing: 0.5px;
      }
    }

    .post-meta {
      display: flex;
      gap: 16px;

      .post-date, .post-rt {
        display: flex;
        align-items: center;
        gap: 4px;
        font-size: 0.78rem;
        color: var(--text-muted);

        mat-icon { font-size: 14px; width: 14px; height: 14px; }
      }
    }

    .post-title {
      font-size: 1.15rem;
      font-weight: 700;
      color: var(--text-color);
      line-height: 1.4;
      margin: 0 0 12px;
      flex: 1;
    }

    .post-excerpt {
      color: var(--text-muted);
      font-size: 0.9rem;
      line-height: 1.65;
      margin: 0 0 20px;
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }

    .card-bottom {
      position: relative;
      padding-top: 16px;
      border-top: 1px solid rgba(255,255,255,0.06);
      margin-top: auto;
    }

    .read-more {
      display: flex;
      align-items: center;
      gap: 6px;
      font-size: 0.85rem;
      font-weight: 600;
      transition: gap 0.25s ease;

      mat-icon { font-size: 16px; width: 16px; height: 16px; }
    }

    .blog-card:hover .read-more { gap: 10px; }

    .accent-bar {
      position: absolute;
      bottom: -16px; left: -28px;
      height: 1px;
      width: 0;
      transition: width 0.6s ease;
    }

    .blog-card:hover .accent-bar { width: calc(100% + 56px); }

    .blog-cta {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 18px 24px;
      border-radius: 12px;
      background: rgba(255,255,255,0.02);
      border: 1px dashed rgba(255,255,255,0.1);

      mat-icon {
        color: var(--primary-color);
        flex-shrink: 0;
      }

      p {
        margin: 0;
        color: var(--text-muted);
        font-size: 0.9rem;

        a {
          color: var(--primary-color);
          text-decoration: none;
          font-weight: 600;
          &:hover { text-decoration: underline; }
        }
      }
    }
  `]
})
export class BlogComponent {
  private dialog = inject(MatDialog);

  posts: BlogPost[] = POSTS;

  openPost(post: BlogPost): void {
    this.dialog.open(BlogDetailDialogComponent, {
      data: post,
      width: '85vw',
      maxWidth: '860px',
      maxHeight: '92vh',
      autoFocus: false,
      panelClass: 'blog-detail-panel'
    });
  }
}
