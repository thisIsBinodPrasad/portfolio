
import { Component, Inject, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

export interface ContentSection {
  type: 'heading' | 'paragraph' | 'code' | 'list' | 'diagram' | 'callout';
  content?: string;
  items?: string[];
  svg?: string;
}

export interface BlogPost {
  title: string;
  date: string;
  readTime: string;
  excerpt: string;
  tags: string[];
  accentColor: string;
  content: ContentSection[];
}

@Component({
  selector: 'app-blog-detail-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule, MatIconModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="dlg-header">
      <div class="header-top">
        <div class="post-tags">
          @for (tag of data.tags; track tag) {
            <span class="tag"
              [style.background]="data.accentColor + '18'"
              [style.color]="data.accentColor"
              [style.border-color]="data.accentColor + '44'">{{ tag }}</span>
          }
        </div>
        <button mat-icon-button class="close-btn" mat-dialog-close aria-label="Close">
          <mat-icon>close</mat-icon>
        </button>
      </div>
      <div class="post-meta">
        <mat-icon>calendar_today</mat-icon>{{ data.date }}
        <span class="sep">·</span>
        <mat-icon>schedule</mat-icon>{{ data.readTime }}
      </div>
      <h2 class="post-title">{{ data.title }}</h2>
    </div>

    <mat-dialog-content class="dlg-body">
      @for (section of data.content; track $index) {
        @switch (section.type) {
          @case ('heading') {
            <h3 class="s-heading" [style.border-color]="data.accentColor" [style.color]="data.accentColor">
              {{ section.content }}
            </h3>
          }
          @case ('paragraph') {
            <p class="s-para">{{ section.content }}</p>
          }
          @case ('code') {
            <pre class="s-code"><code>{{ section.content }}</code></pre>
          }
          @case ('list') {
            <ul class="s-list" [style.--bullet]="data.accentColor">
              @for (item of section.items!; track item) {
                <li>{{ item }}</li>
              }
            </ul>
          }
          @case ('diagram') {
            <div class="s-diagram" [innerHTML]="safe(section.svg!)"></div>
          }
          @case ('callout') {
            <div class="s-callout">{{ section.content }}</div>
          }
        }
      }
    </mat-dialog-content>
  `,
  styles: [`
    :host {
      display: block;
      background: #0a1020;
      border-radius: 16px;
      overflow: hidden;
      border: 1px solid rgba(255,255,255,0.06);
    }

    .dlg-header {
      padding: 24px 28px 20px;
      border-bottom: 1px solid rgba(255,255,255,0.07);
      background: linear-gradient(135deg, rgba(15,23,42,0.9), rgba(10,16,30,1));
    }

    .header-top {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      gap: 12px;
      margin-bottom: 10px;
    }

    .post-tags {
      display: flex;
      gap: 7px;
      flex-wrap: wrap;

      .tag {
        font-size: 0.67rem;
        font-weight: 700;
        padding: 3px 10px;
        border-radius: 12px;
        border: 1px solid;
        text-transform: uppercase;
        letter-spacing: 0.5px;
      }
    }

    .close-btn {
      color: rgba(255,255,255,0.4) !important;
      flex-shrink: 0;
      margin-top: -4px;
      transition: color 0.2s !important;
      &:hover { color: rgba(255,255,255,0.9) !important; }
    }

    .post-meta {
      display: flex;
      align-items: center;
      gap: 5px;
      font-size: 0.78rem;
      color: rgba(255,255,255,0.35);
      margin-bottom: 12px;

      mat-icon { font-size: 13px; width: 13px; height: 13px; }
      .sep { margin: 0 4px; }
    }

    .post-title {
      font-size: 1.45rem;
      font-weight: 700;
      line-height: 1.3;
      margin: 0;
      color: #e2e8f0;

      @media (max-width: 600px) { font-size: 1.2rem; }
    }

    .dlg-body {
      padding: 24px 28px !important;
      color: #cbd5e1;
      font-size: 0.94rem;
      line-height: 1.75;
      max-height: 62vh;
    }

    .s-heading {
      font-size: 1.05rem;
      font-weight: 700;
      margin: 28px 0 10px;
      padding-left: 12px;
      border-left: 3px solid;
    }

    .s-para {
      margin: 0 0 16px;
      color: #94a3b8;
    }

    .s-code {
      background: rgba(0,0,0,0.45);
      border: 1px solid rgba(255,255,255,0.07);
      border-radius: 10px;
      padding: 16px 18px;
      margin: 0 0 18px;
      overflow-x: auto;

      code {
        font-family: 'JetBrains Mono', 'Fira Code', 'Cascadia Code', 'Courier New', monospace;
        font-size: 0.8rem;
        color: #a5f3fc;
        white-space: pre;
        line-height: 1.7;
      }
    }

    .s-list {
      margin: 0 0 18px;
      padding-left: 20px;
      display: flex;
      flex-direction: column;
      gap: 6px;

      li {
        color: #94a3b8;
        line-height: 1.65;
        &::marker { color: var(--bullet, #14b8a6); }
      }
    }

    .s-callout {
      margin: 36px -28px 8px;
      padding: 40px 28px 32px;
      font-size: 2.1rem;
      font-weight: 900;
      text-align: center;
      line-height: 1.2;
      letter-spacing: -0.5px;
      background: linear-gradient(135deg, #14b8a6 0%, #ec4899 50%, #6366f1 100%);
      -webkit-background-clip: text;
      background-clip: text;
      -webkit-text-fill-color: transparent;
      position: relative;

      &::before {
        content: '';
        position: absolute;
        inset: 0;
        background: linear-gradient(135deg, rgba(20,184,166,0.06), rgba(236,72,153,0.06), rgba(99,102,241,0.06));
        pointer-events: none;
      }

      @media (max-width: 600px) { font-size: 1.5rem; padding: 28px 16px 24px; }
    }

    .s-diagram {
      margin: 20px 0 8px;
      border-radius: 10px;
      overflow: hidden;

      ::ng-deep svg {
        display: block;
        width: 100%;
        height: auto;
      }
    }
  `]
})
export class BlogDetailDialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: BlogPost,
    private sanitizer: DomSanitizer
  ) {}

  safe(html: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }
}
