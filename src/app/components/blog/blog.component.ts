
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

/* ── Full article content ────────────────────────────────────────── */

const POSTS: BlogPost[] = [
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
