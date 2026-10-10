
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { ScrollRevealDirective } from '../../directives/scroll-reveal.directive';

interface BlogPost {
  title: string;
  date: string;
  readTime: string;
  excerpt: string;
  tags: string[];
  accentColor: string;
}

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [CommonModule, MatIconModule, ScrollRevealDirective],
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
                Coming soon
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
      cursor: default;
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
      opacity: 0.7;
      font-style: italic;

      mat-icon { font-size: 16px; width: 16px; height: 16px; }
    }

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
  posts: BlogPost[] = [
    {
      title: 'Optimizing Angular Bundle Size: What Actually Works',
      date: 'Sep 2025',
      readTime: '5 min read',
      excerpt: 'After building 10+ production Angular apps, here are the techniques that genuinely move the needle on bundle size and time-to-interactive — lazy loading, preloading strategies, and zone-less change detection.',
      tags: ['Angular', 'Performance', 'Web Dev'],
      accentColor: '#14b8a6'
    },
    {
      title: 'Building AI-Powered Apps with Claude API',
      date: 'Aug 2025',
      readTime: '7 min read',
      excerpt: 'Integrating Claude AI into production Angular apps is simpler than you think. Here\'s how I designed a real-time conversational UI with streaming responses, tool-use, and intelligent fallbacks.',
      tags: ['AI', 'Claude', 'Angular'],
      accentColor: '#ec4899'
    },
    {
      title: 'Why RxJS Still Matters in the Signals Era',
      date: 'Jul 2025',
      readTime: '4 min read',
      excerpt: 'Angular Signals are a great addition for synchronous reactive state, but RxJS wins for complex async orchestration, event streams, and cross-service coordination. Here\'s when to use each.',
      tags: ['Angular', 'RxJS', 'Signals'],
      accentColor: '#6366f1'
    }
  ];
}
