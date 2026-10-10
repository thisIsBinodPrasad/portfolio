
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { ScrollRevealDirective } from '../../directives/scroll-reveal.directive';

interface Cert {
  title: string;
  issuer: string;
  year: string;
  badgeColor: string;
  bgColor: string;
  issuerLogo: string;
}

@Component({
  selector: 'app-certifications',
  standalone: true,
  imports: [CommonModule, MatIconModule, ScrollRevealDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section id="certifications" class="section-padding container">
      <div class="section-head">
        <h2 class="section-title">
          Certifications<span class="dot">.</span>
          <span class="title-underline"></span>
        </h2>
        <p class="section-sub">Validated expertise across cloud and AI platforms.</p>
      </div>

      <div class="cert-grid">
        @for (cert of certs; track cert.title; let i = $index) {
          <div class="cert-card glass-card"
               appScrollReveal
               [appScrollRevealDelay]="i * 80"
               [style.--badge]="cert.badgeColor">
            <div class="cert-badge" [style.background]="cert.bgColor">
              <div class="badge-inner" [innerHTML]="cert.issuerLogo"></div>
            </div>
            <div class="cert-info">
              <span class="cert-year" [style.color]="cert.badgeColor">{{ cert.year }}</span>
              <h3 class="cert-title">{{ cert.title }}</h3>
              <span class="cert-issuer">{{ cert.issuer }}</span>
            </div>
            <mat-icon class="cert-verified" [style.color]="cert.badgeColor">verified</mat-icon>
          </div>
        }
      </div>

      <!-- GitHub Activity row -->
      <div class="github-row glass-card" appScrollReveal>
        <div class="gh-left">
          <div class="gh-icon">
            <svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
            </svg>
          </div>
          <div class="gh-text">
            <span class="gh-handle">thisisbinodprasad</span>
            <span class="gh-sub">Active contributor · Open source</span>
          </div>
        </div>
        <div class="gh-heatmap">
          @for (week of heatmap; track $index) {
            <div class="hm-col">
              @for (day of week; track $index) {
                <div class="hm-cell" [style.opacity]="day"></div>
              }
            </div>
          }
        </div>
        <a href="https://github.com/thisisbinodprasad" target="_blank" rel="noopener" class="gh-btn">
          <mat-icon>open_in_new</mat-icon> View Profile
        </a>
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

    .cert-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
      gap: 20px;
      margin-bottom: 32px;
    }

    .cert-card {
      display: flex;
      align-items: center;
      gap: 16px;
      padding: 18px 20px;
      position: relative;
      overflow: hidden;
      transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.35s ease, border-color 0.35s;

      &::after {
        content: '';
        position: absolute;
        bottom: 0; left: 0;
        height: 2px; width: 0;
        background: linear-gradient(90deg, var(--badge, var(--primary-color)), transparent);
        transition: width 0.5s ease;
      }

      &:hover {
        transform: translateY(-6px);
        box-shadow: 0 14px 40px rgba(0,0,0,0.28), 0 0 20px rgba(20,184,166,0.1);
        border-color: rgba(20,184,166,0.3);
        &::after { width: 100%; }
      }
    }

    .cert-badge {
      width: 52px; height: 52px;
      border-radius: 14px;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }

    .badge-inner {
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .cert-info {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 3px;
    }

    .cert-year {
      font-size: 0.7rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 1px;
    }

    .cert-title {
      font-size: 0.88rem;
      font-weight: 700;
      color: var(--text-color);
      margin: 0;
      line-height: 1.3;
    }

    .cert-issuer {
      font-size: 0.78rem;
      color: var(--text-muted);
    }

    .cert-verified {
      font-size: 20px; width: 20px; height: 20px;
      flex-shrink: 0;
    }

    /* ── GitHub Row ── */
    .github-row {
      display: flex;
      align-items: center;
      gap: 28px;
      padding: 22px 28px;
      flex-wrap: wrap;

      @media (max-width: 768px) {
        flex-direction: column;
        align-items: flex-start;
        gap: 18px;
      }
    }

    .gh-left {
      display: flex;
      align-items: center;
      gap: 14px;
    }

    .gh-icon {
      width: 52px; height: 52px;
      border-radius: 50%;
      background: rgba(255,255,255,0.05);
      border: 1px solid rgba(255,255,255,0.1);
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--text-color);
      flex-shrink: 0;
    }

    .gh-text {
      display: flex;
      flex-direction: column;
      gap: 3px;

      .gh-handle {
        font-weight: 700;
        font-size: 0.95rem;
        color: var(--text-color);
      }

      .gh-sub {
        font-size: 0.8rem;
        color: var(--text-muted);
      }
    }

    .gh-heatmap {
      flex: 1;
      display: flex;
      gap: 3px;
      overflow: hidden;
      min-width: 0;

      @media (max-width: 768px) { width: 100%; }
    }

    .hm-col {
      display: flex;
      flex-direction: column;
      gap: 3px;
    }

    .hm-cell {
      width: 11px; height: 11px;
      border-radius: 2px;
      background: var(--primary-color);
      transition: transform 0.2s;

      &:hover { transform: scale(1.3); }
    }

    .gh-btn {
      display: flex;
      align-items: center;
      gap: 6px;
      padding: 9px 20px;
      border-radius: 20px;
      background: rgba(20,184,166,0.08);
      border: 1px solid rgba(20,184,166,0.3);
      color: var(--primary-color);
      text-decoration: none;
      font-size: 0.85rem;
      font-weight: 500;
      white-space: nowrap;
      transition: background 0.3s, box-shadow 0.3s;

      mat-icon { font-size: 16px; width: 16px; height: 16px; }

      &:hover {
        background: rgba(20,184,166,0.14);
        box-shadow: 0 0 16px rgba(20,184,166,0.3);
      }
    }
  `]
})
export class CertificationsComponent {
  certs: Cert[] = [
    {
      title: 'AWS Certified Developer – Associate',
      issuer: 'Amazon Web Services',
      year: '2024',
      badgeColor: '#FF9900',
      bgColor: 'rgba(255,153,0,0.12)',
      issuerLogo: `<svg viewBox="0 0 40 24" width="40" height="24"><text x="0" y="18" font-family="Inter,sans-serif" font-weight="900" font-size="16" fill="#FF9900">AWS</text></svg>`
    },
    {
      title: 'AWS AI Practitioner',
      issuer: 'Amazon Web Services',
      year: '2024',
      badgeColor: '#FF9900',
      bgColor: 'rgba(255,153,0,0.12)',
      issuerLogo: `<svg viewBox="0 0 40 24" width="40" height="24"><text x="0" y="18" font-family="Inter,sans-serif" font-weight="900" font-size="16" fill="#FF9900">AWS</text></svg>`
    },
    {
      title: 'Claude Code: Foundation',
      issuer: 'Anthropic',
      year: '2025',
      badgeColor: '#d97706',
      bgColor: 'rgba(217,119,6,0.12)',
      issuerLogo: `<svg viewBox="0 0 28 28" width="28" height="28" fill="none"><circle cx="14" cy="14" r="12" stroke="#d97706" stroke-width="2"/><text x="14" y="19" text-anchor="middle" font-family="Inter,sans-serif" font-weight="900" font-size="11" fill="#d97706">A</text></svg>`
    },
    {
      title: 'Claude Code: Developer',
      issuer: 'Anthropic',
      year: '2025',
      badgeColor: '#7c3aed',
      bgColor: 'rgba(124,58,237,0.12)',
      issuerLogo: `<svg viewBox="0 0 28 28" width="28" height="28" fill="none"><circle cx="14" cy="14" r="12" stroke="#7c3aed" stroke-width="2"/><text x="14" y="19" text-anchor="middle" font-family="Inter,sans-serif" font-weight="900" font-size="11" fill="#7c3aed">A</text></svg>`
    },
    {
      title: 'Claude Code: Architect',
      issuer: 'Anthropic',
      year: '2025',
      badgeColor: '#0ea5e9',
      bgColor: 'rgba(14,165,233,0.12)',
      issuerLogo: `<svg viewBox="0 0 28 28" width="28" height="28" fill="none"><circle cx="14" cy="14" r="12" stroke="#0ea5e9" stroke-width="2"/><text x="14" y="19" text-anchor="middle" font-family="Inter,sans-serif" font-weight="900" font-size="11" fill="#0ea5e9">A</text></svg>`
    }
  ];

  heatmap: number[][] = this.buildHeatmap();

  private buildHeatmap(): number[][] {
    const weeks = 26;
    const cols: number[][] = [];
    const seed  = [0.9, 0.7, 0.5, 0.8, 0.3, 0.6, 0.95, 0.4, 0.85, 0.65, 0.1, 0.75, 0.55];
    for (let w = 0; w < weeks; w++) {
      const days: number[] = [];
      for (let d = 0; d < 7; d++) {
        const v = seed[(w * 7 + d) % seed.length];
        days.push(v < 0.15 ? 0.05 : v);
      }
      cols.push(days);
    }
    return cols;
  }
}
