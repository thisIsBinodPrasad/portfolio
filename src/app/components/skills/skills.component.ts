
import { Component, AfterViewInit, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { AnimationOptions, LottieComponent } from 'ngx-lottie';
import { ScrollRevealDirective } from '../../directives/scroll-reveal.directive';

interface Skill { name: string; level: number; animated: boolean; displayed: number; }
interface SkillCategory { title: string; icon: string; color: string; skills: Skill[]; }

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [CommonModule, LottieComponent, ScrollRevealDirective],
  template: `
    <section id="skills" class="section-padding container">
      <h2 class="section-title">
        Skills <span class="dot">.</span>
        <span class="title-underline"></span>
      </h2>

      <div class="content-wrapper">
        <div class="skills-grid">
          @for (category of skillCategories; track category.title; let i = $index) {
            <div
              class="skill-category glass-card"
              [appScrollReveal]="i === 0 ? 'left' : i === 1 ? '' : 'right'"
              [appScrollRevealDelay]="i * 120">

              <div class="category-header">
                <span class="category-icon">{{ category.icon }}</span>
                <h3>{{ category.title }}</h3>
              </div>

              <div class="skill-bars">
                @for (skill of category.skills; track skill.name) {
                  <div class="skill-item">
                    <div class="skill-label">
                      <span class="skill-name">{{ skill.name }}</span>
                      <span class="skill-percent">{{ skill.displayed }}%</span>
                    </div>
                    <div class="skill-track">
                      <div
                        class="skill-fill"
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

        <div class="lottie-container glass-card" appScrollReveal>
          <ng-lottie [options]="options"></ng-lottie>
          <p class="lottie-caption">Always learning, always evolving.</p>
          <div class="tech-count-row">
            <div class="tech-count">
              <span class="count-num">18+</span>
              <span class="count-lbl">Technologies</span>
            </div>
            <div class="tc-divider"></div>
            <div class="tech-count">
              <span class="count-num">5+</span>
              <span class="count-lbl">Years Coding</span>
            </div>
          </div>
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
        bottom: -10px;
        left: 0;
        height: 3px;
        width: 0;
        background: linear-gradient(90deg, var(--primary-color), var(--accent-color));
        border-radius: 2px;
        animation: growLine 1s cubic-bezier(0.22, 1, 0.36, 1) 0.4s forwards;
      }
    }

    @keyframes growLine {
      to { width: 100%; }
    }

    .content-wrapper {
      display: grid;
      grid-template-columns: 2fr 1fr;
      gap: 28px;
      align-items: start;

      @media (max-width: 960px) {
        grid-template-columns: 1fr;
      }
    }

    .skills-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 24px;
    }

    .skill-category {
      position: relative;
      overflow: hidden;

      .category-header {
        display: flex;
        align-items: center;
        gap: 10px;
        margin-bottom: 22px;

        .category-icon {
          font-size: 1.5rem;
          animation: iconBounce 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) both;
        }

        h3 {
          margin: 0;
          color: var(--primary-color);
          font-size: 1rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.7px;
        }
      }
    }

    @keyframes iconBounce {
      from { transform: scale(0.5) rotate(-15deg); opacity: 0; }
      to   { transform: scale(1) rotate(0); opacity: 1; }
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
          transition: color 0.3s;
        }
      }

      .skill-track {
        height: 7px;
        background: rgba(255, 255, 255, 0.07);
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
            top: 0;
            left: -60%;
            width: 55%;
            height: 100%;
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

    /* ── Lottie Sidebar ── */
    .lottie-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      min-height: 300px;
      padding: 28px 20px;
      position: relative;
      overflow: hidden;

      &::before {
        content: '';
        position: absolute;
        inset: 0;
        border-radius: 16px;
        padding: 1px;
        background: linear-gradient(135deg, rgba(20,184,166,0.3), rgba(236,72,153,0.3));
        mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
        -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
        mask-composite: exclude;
        -webkit-mask-composite: xor;
        animation: borderRotate 6s linear infinite;
        pointer-events: none;
      }

      .lottie-caption {
        margin-top: 12px;
        color: var(--text-muted);
        font-style: italic;
        text-align: center;
        font-size: 0.9rem;
      }

      .tech-count-row {
        display: flex;
        align-items: center;
        gap: 20px;
        margin-top: 22px;

        .tc-divider {
          width: 1px;
          height: 36px;
          background: rgba(255,255,255,0.1);
        }

        .tech-count {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 3px;

          .count-num {
            font-size: 1.7rem;
            font-weight: 800;
            background: linear-gradient(135deg, var(--primary-color), var(--accent-color));
            -webkit-background-clip: text;
            background-clip: text;
            -webkit-text-fill-color: transparent;
            animation: countPop 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) both;
          }

          .count-lbl {
            font-size: 0.72rem;
            color: var(--text-muted);
            text-transform: uppercase;
            letter-spacing: 0.6px;
          }
        }
      }
    }

    @keyframes countPop {
      from { transform: scale(0.6); opacity: 0; }
      to   { transform: scale(1); opacity: 1; }
    }

    @keyframes borderRotate {
      0%   { background: linear-gradient(0deg, rgba(20,184,166,0.4), rgba(236,72,153,0.2)); }
      50%  { background: linear-gradient(180deg, rgba(236,72,153,0.4), rgba(99,102,241,0.3)); }
      100% { background: linear-gradient(360deg, rgba(20,184,166,0.4), rgba(236,72,153,0.2)); }
    }
  `]
})
export class SkillsComponent implements AfterViewInit {
  options: AnimationOptions = { path: '/assets/lottie/education.json' };

  skillCategories: SkillCategory[] = [
    {
      title: 'Frontend & Web',
      icon: '🖥️',
      color: 'linear-gradient(90deg, #14b8a6, #06b6d4)',
      skills: [
        { name: 'Angular',            level: 95, animated: false, displayed: 0 },
        { name: 'TypeScript',         level: 90, animated: false, displayed: 0 },
        { name: 'JavaScript',         level: 92, animated: false, displayed: 0 },
        { name: 'RxJS / NgRx',        level: 88, animated: false, displayed: 0 },
        { name: 'HTML5 / CSS3 / SCSS',level: 90, animated: false, displayed: 0 },
        { name: 'SEO Optimization',   level: 78, animated: false, displayed: 0 },
      ]
    },
    {
      title: 'Backend & Cloud',
      icon: '⚙️',
      color: 'linear-gradient(90deg, #ec4899, #f43f5e)',
      skills: [
        { name: '.NET Core / C#',  level: 85, animated: false, displayed: 0 },
        { name: 'Node.js',         level: 80, animated: false, displayed: 0 },
        { name: 'REST APIs',       level: 92, animated: false, displayed: 0 },
        { name: 'SQL / Databases', level: 82, animated: false, displayed: 0 },
        { name: 'IBM Cloud',       level: 75, animated: false, displayed: 0 },
        { name: 'Git / DevOps',    level: 88, animated: false, displayed: 0 },
      ]
    },
    {
      title: 'Data Science & AI',
      icon: '🤖',
      color: 'linear-gradient(90deg, #8b5cf6, #ec4899)',
      skills: [
        { name: 'Python',             level: 80, animated: false, displayed: 0 },
        { name: 'Pandas / NumPy',     level: 78, animated: false, displayed: 0 },
        { name: 'Machine Learning',   level: 72, animated: false, displayed: 0 },
        { name: 'Gen AI Integration', level: 82, animated: false, displayed: 0 },
        { name: 'Data Visualization', level: 75, animated: false, displayed: 0 },
      ]
    }
  ];

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            this.skillCategories.forEach(cat => {
              cat.skills.forEach(skill => {
                skill.animated = true;
                this.animateSkill(skill);
              });
            });
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
    const steps = 45;
    const stepMs = duration / steps;
    let current = 0;

    const interval = setInterval(() => {
      current++;
      const t = current / steps;
      const eased = 1 - Math.pow(1 - t, 2.5);
      skill.displayed = Math.round(eased * skill.level);
      if (current >= steps) {
        clearInterval(interval);
        skill.displayed = skill.level;
      }
    }, stepMs);
  }
}
