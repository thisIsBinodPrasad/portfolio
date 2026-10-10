
import { Component, AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { ScrollRevealDirective } from '../../directives/scroll-reveal.directive';

interface Skill { name: string; level: number; animated: boolean; displayed: number; }
interface SkillCategory { title: string; matIcon: string; color: string; skills: Skill[]; }

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [CommonModule, MatIconModule, ScrollRevealDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section id="skills" class="section-padding container">
      <h2 class="section-title">
        Skills<span class="dot">.</span>
        <span class="title-underline"></span>
      </h2>

      <div class="content-wrapper">
        <div class="skills-grid">
          @for (category of skillCategories; track category.title; let i = $index) {
            <div class="skill-category glass-card"
                 [appScrollReveal]="i === 0 ? 'left' : i === 1 ? '' : 'right'"
                 [appScrollRevealDelay]="i * 120">

              <div class="category-header">
                <div class="cat-icon-wrap" [style.background]="category.color + '18'" [style.border-color]="category.color + '44'">
                  <mat-icon class="cat-mat-icon">{{ category.matIcon }}</mat-icon>
                </div>
                <h3 [style.color]="'var(--primary-color)'">{{ category.title }}</h3>
              </div>

              <div class="skill-bars">
                @for (skill of category.skills; track skill.name) {
                  <div class="skill-item">
                    <div class="skill-label">
                      <span class="skill-name">{{ skill.name }}</span>
                      <span class="skill-percent">{{ skill.displayed }}%</span>
                    </div>
                    <div class="skill-track">
                      <div class="skill-fill"
                           [class.shimmer-active]="skill.animated"
                           [style.width.%]="skill.animated ? skill.level : 0"
                           [style.background]="category.color">
                      </div>
                    </div>
                  </div>
                }
              </div>
            </div>
          }
        </div>

        <!-- Animated SVG Knowledge Graph -->
        <div class="graph-container glass-card" appScrollReveal>
          <div class="graph-title">Tech Stack</div>
          <svg class="skill-graph" viewBox="0 0 290 268" fill="none" xmlns="http://www.w3.org/2000/svg">
            <!-- Connection lines -->
            <line x1="145" y1="134" x2="60"  y2="58"  stroke="rgba(20,184,166,0.35)"  stroke-width="1.5" stroke-dasharray="5 4" class="fl fl0"/>
            <line x1="145" y1="134" x2="232" y2="58"  stroke="rgba(99,102,241,0.35)"  stroke-width="1.5" stroke-dasharray="5 4" class="fl fl1"/>
            <line x1="145" y1="134" x2="28"  y2="155" stroke="rgba(56,189,248,0.35)"  stroke-width="1.5" stroke-dasharray="5 4" class="fl fl2"/>
            <line x1="145" y1="134" x2="262" y2="155" stroke="rgba(251,146,60,0.35)"  stroke-width="1.5" stroke-dasharray="5 4" class="fl fl3"/>
            <line x1="145" y1="134" x2="82"  y2="222" stroke="rgba(167,139,250,0.35)" stroke-width="1.5" stroke-dasharray="5 4" class="fl fl4"/>
            <line x1="145" y1="134" x2="208" y2="222" stroke="rgba(34,197,94,0.35)"   stroke-width="1.5" stroke-dasharray="5 4" class="fl fl5"/>

            <!-- Center node -->
            <circle cx="145" cy="134" r="34" fill="rgba(20,184,166,0.08)" stroke="#14b8a6" stroke-width="2" class="cn"/>
            <circle cx="145" cy="134" r="26" fill="rgba(20,184,166,0.04)" stroke="rgba(20,184,166,0.25)" stroke-width="1"/>
            <text x="145" y="130" text-anchor="middle" fill="#14b8a6" font-size="10" font-weight="800" font-family="Inter,sans-serif">FULL</text>
            <text x="145" y="144" text-anchor="middle" fill="#14b8a6" font-size="10" font-weight="800" font-family="Inter,sans-serif">STACK</text>

            <!-- Angular -->
            <circle cx="60"  cy="58"  r="26" fill="rgba(236,72,153,0.07)"  stroke="#ec4899" stroke-width="1.5" class="sn sn0"/>
            <text x="60"  y="63"  text-anchor="middle" fill="#ec4899" font-size="9.5" font-weight="600" font-family="Inter,sans-serif">Angular</text>

            <!-- .NET -->
            <circle cx="232" cy="58"  r="24" fill="rgba(99,102,241,0.07)"  stroke="#6366f1" stroke-width="1.5" class="sn sn1"/>
            <text x="232" y="63"  text-anchor="middle" fill="#6366f1" font-size="9.5" font-weight="600" font-family="Inter,sans-serif">.NET</text>

            <!-- Cloud -->
            <circle cx="28"  cy="155" r="22" fill="rgba(56,189,248,0.07)"  stroke="#38bdf8" stroke-width="1.5" class="sn sn2"/>
            <text x="28"  y="160" text-anchor="middle" fill="#38bdf8" font-size="9.5" font-weight="600" font-family="Inter,sans-serif">Cloud</text>

            <!-- Python -->
            <circle cx="262" cy="155" r="22" fill="rgba(251,146,60,0.07)"  stroke="#fb923c" stroke-width="1.5" class="sn sn3"/>
            <text x="262" y="160" text-anchor="middle" fill="#fb923c" font-size="9.5" font-weight="600" font-family="Inter,sans-serif">Python</text>

            <!-- Gen AI -->
            <circle cx="82"  cy="222" r="24" fill="rgba(167,139,250,0.07)" stroke="#a78bfa" stroke-width="1.5" class="sn sn4"/>
            <text x="82"  y="227" text-anchor="middle" fill="#a78bfa" font-size="9.5" font-weight="600" font-family="Inter,sans-serif">Gen AI</text>

            <!-- SQL -->
            <circle cx="208" cy="222" r="22" fill="rgba(34,197,94,0.07)"   stroke="#22c55e" stroke-width="1.5" class="sn sn5"/>
            <text x="208" y="227" text-anchor="middle" fill="#22c55e" font-size="9.5" font-weight="600" font-family="Inter,sans-serif">SQL</text>
          </svg>

          <p class="graph-caption">Always learning, always evolving.</p>
          <div class="tech-count-row">
            <div class="tech-count">
              <span class="count-num">18+</span>
              <span class="count-lbl">Technologies</span>
            </div>
            <div class="tc-divider"></div>
            <div class="tech-count">
              <span class="count-num">6+</span>
              <span class="count-lbl">Years Coding</span>
            </div>
          </div>
          <a href="https://github.com/thisisbinodprasad" target="_blank" rel="noopener" class="github-link">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
            </svg>
            View on GitHub
          </a>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .section-title {
      font-size: 2.5rem;
      font-weight: 700;
      margin-bottom: 48px;
      position: relative;
      display: inline-block;

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

    .content-wrapper {
      display: grid;
      grid-template-columns: 2fr 1fr;
      gap: 28px;
      align-items: start;

      @media (max-width: 960px) { grid-template-columns: 1fr; }
    }

    .skills-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 24px;
    }

    .skill-category {
      position: relative;
      overflow: hidden;
    }

    .category-header {
      display: flex;
      align-items: center;
      gap: 12px;
      margin-bottom: 22px;
    }

    .cat-icon-wrap {
      width: 38px; height: 38px;
      border-radius: 10px;
      border: 1px solid;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }

    .cat-mat-icon {
      font-size: 20px;
      width: 20px;
      height: 20px;
      color: var(--primary-color);
    }

    .category-header h3 {
      margin: 0;
      font-size: 1rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.7px;
    }

    .skill-item {
      margin-bottom: 16px;

      .skill-label {
        display: flex;
        justify-content: space-between;
        margin-bottom: 7px;

        .skill-name {
          font-size: 0.88rem;
          font-weight: 500;
          color: var(--text-color);
        }

        .skill-percent {
          font-size: 0.8rem;
          color: var(--primary-color);
          font-weight: 700;
          min-width: 36px;
          text-align: right;
        }
      }

      .skill-track {
        height: 7px;
        background: rgba(255,255,255,0.07);
        border-radius: 4px;
        overflow: hidden;

        .skill-fill {
          height: 100%;
          border-radius: 4px;
          transition: width 1.3s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          overflow: hidden;

          &.shimmer-active::after {
            content: '';
            position: absolute;
            top: 0; left: -60%;
            width: 55%; height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255,255,255,0.45), transparent);
            animation: barShimmer 2.2s ease-in-out infinite;
            animation-delay: 1.4s;
          }
        }
      }
    }

    @keyframes barShimmer {
      from { left: -60%; }
      to   { left: 120%; }
    }

    /* ── Knowledge Graph ── */
    .graph-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 24px 16px;
      position: relative;
      overflow: hidden;

      &::before {
        content: '';
        position: absolute;
        inset: 0;
        border-radius: 16px;
        padding: 1px;
        background: conic-gradient(from 0deg, rgba(20,184,166,0.4), rgba(236,72,153,0.3), rgba(99,102,241,0.3), rgba(20,184,166,0.4));
        mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
        -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
        mask-composite: exclude;
        -webkit-mask-composite: xor;
        animation: borderSpin 8s linear infinite;
        pointer-events: none;
      }
    }

    @keyframes borderSpin {
      from { background: conic-gradient(from 0deg,   rgba(20,184,166,0.4), rgba(236,72,153,0.3), rgba(99,102,241,0.3), rgba(20,184,166,0.4)); }
      to   { background: conic-gradient(from 360deg, rgba(20,184,166,0.4), rgba(236,72,153,0.3), rgba(99,102,241,0.3), rgba(20,184,166,0.4)); }
    }

    .graph-title {
      font-size: 0.7rem;
      text-transform: uppercase;
      letter-spacing: 2.5px;
      color: var(--text-muted);
      margin-bottom: 16px;
      font-weight: 600;
    }

    .skill-graph {
      width: 100%;
      max-width: 290px;

      /* Center node pulse */
      .cn {
        animation: cnPulse 3.5s ease-in-out infinite;
        transform-origin: 145px 134px;
      }
      @keyframes cnPulse {
        0%, 100% { opacity: 0.8; transform: scale(1); }
        50%       { opacity: 1;   transform: scale(1.04); }
      }

      /* Satellite nodes breathe */
      .sn  { animation: snBreath 2.8s ease-in-out infinite alternate; }
      .sn0 { animation-delay: 0s;     transform-origin: 60px  58px;  }
      .sn1 { animation-delay: -0.5s;  transform-origin: 232px 58px;  }
      .sn2 { animation-delay: -1.0s;  transform-origin: 28px  155px; }
      .sn3 { animation-delay: -1.5s;  transform-origin: 262px 155px; }
      .sn4 { animation-delay: -2.0s;  transform-origin: 82px  222px; }
      .sn5 { animation-delay: -2.5s;  transform-origin: 208px 222px; }

      @keyframes snBreath {
        from { opacity: 0.6; transform: scale(1); }
        to   { opacity: 1;   transform: scale(1.06); }
      }

      /* Animated flow lines */
      .fl {
        animation: flowDash 2s linear infinite;
      }
      .fl0 { animation-delay: 0s; }
      .fl1 { animation-delay: -0.35s; }
      .fl2 { animation-delay: -0.7s; }
      .fl3 { animation-delay: -1.05s; }
      .fl4 { animation-delay: -1.4s; }
      .fl5 { animation-delay: -1.75s; }

      @keyframes flowDash {
        from { stroke-dashoffset: 0; }
        to   { stroke-dashoffset: -18; }
      }
    }

    .graph-caption {
      margin-top: 14px;
      color: var(--text-muted);
      font-style: italic;
      text-align: center;
      font-size: 0.88rem;
    }

    .tech-count-row {
      display: flex;
      align-items: center;
      gap: 20px;
      margin-top: 18px;

      .tc-divider { width: 1px; height: 36px; background: rgba(255,255,255,0.1); }

      .tech-count {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 3px;

        .count-num {
          font-size: 1.65rem;
          font-weight: 800;
          background: linear-gradient(135deg, var(--primary-color), var(--accent-color));
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .count-lbl {
          font-size: 0.7rem;
          color: var(--text-muted);
          text-transform: uppercase;
          letter-spacing: 0.6px;
        }
      }
    }

    .github-link {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-top: 20px;
      padding: 9px 20px;
      border-radius: 20px;
      border: 1px solid rgba(255,255,255,0.1);
      color: var(--text-muted);
      text-decoration: none;
      font-size: 0.82rem;
      font-weight: 500;
      transition: color 0.3s, border-color 0.3s, background 0.3s;

      svg { flex-shrink: 0; }

      &:hover {
        color: var(--text-color);
        border-color: rgba(20,184,166,0.4);
        background: rgba(20,184,166,0.06);
      }
    }
  `]
})
export class SkillsComponent implements AfterViewInit {
  skillCategories: SkillCategory[] = [
    {
      title: 'Frontend & Web',
      matIcon: 'desktop_windows',
      color: 'linear-gradient(90deg, #14b8a6, #06b6d4)',
      skills: [
        { name: 'Angular',             level: 95, animated: false, displayed: 0 },
        { name: 'TypeScript',          level: 90, animated: false, displayed: 0 },
        { name: 'JavaScript',          level: 92, animated: false, displayed: 0 },
        { name: 'RxJS / NgRx',         level: 88, animated: false, displayed: 0 },
        { name: 'HTML5 / CSS3 / SCSS', level: 90, animated: false, displayed: 0 },
        { name: 'SEO Optimization',    level: 78, animated: false, displayed: 0 },
      ]
    },
    {
      title: 'Backend & Cloud',
      matIcon: 'dns',
      color: 'linear-gradient(90deg, #ec4899, #f43f5e)',
      skills: [
        { name: '.NET Core / C#',  level: 85, animated: false, displayed: 0 },
        { name: 'Node.js',         level: 80, animated: false, displayed: 0 },
        { name: 'REST APIs',       level: 92, animated: false, displayed: 0 },
        { name: 'SQL / Databases', level: 82, animated: false, displayed: 0 },
        { name: 'IBM Cloud / AWS', level: 78, animated: false, displayed: 0 },
        { name: 'Git / DevOps',    level: 88, animated: false, displayed: 0 },
      ]
    },
    {
      title: 'Data Science & AI',
      matIcon: 'psychology',
      color: 'linear-gradient(90deg, #8b5cf6, #ec4899)',
      skills: [
        { name: 'Python',             level: 80, animated: false, displayed: 0 },
        { name: 'Pandas / NumPy',     level: 78, animated: false, displayed: 0 },
        { name: 'Machine Learning',   level: 72, animated: false, displayed: 0 },
        { name: 'Gen AI Integration', level: 85, animated: false, displayed: 0 },
        { name: 'Data Visualization', level: 75, animated: false, displayed: 0 },
      ]
    }
  ];

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private cdr: ChangeDetectorRef
  ) {}

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            this.skillCategories.forEach(cat => {
              cat.skills.forEach(skill => {
                skill.animated = true;
                this.animateSkill(skill);
              });
            });
            this.cdr.markForCheck();
          }, 200);
          observer.disconnect();
        }
      });
    }, { threshold: 0.2 });

    const section = document.querySelector('#skills');
    if (section) observer.observe(section);
  }

  private animateSkill(skill: Skill): void {
    const duration = 1300;
    const steps    = 45;
    const stepMs   = duration / steps;
    let current    = 0;

    const interval = setInterval(() => {
      current++;
      const t     = current / steps;
      const eased = 1 - Math.pow(1 - t, 2.5);
      skill.displayed = Math.round(eased * skill.level);
      if (current >= steps) {
        clearInterval(interval);
        skill.displayed = skill.level;
      }
      this.cdr.markForCheck();
    }, stepMs);
  }
}
