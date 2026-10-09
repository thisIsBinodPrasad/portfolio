
import { Component, AfterViewInit, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { AnimationOptions, LottieComponent } from 'ngx-lottie';

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [CommonModule, LottieComponent],
  template: `
    <section id="skills" class="section-padding container">
      <h2 class="section-title">Skills <span class="dot">.</span></h2>

      <div class="content-wrapper">
        <div class="skills-grid">
          @for (category of skillCategories; track category.title) {
            <div class="skill-category glass-card" appScrollReveal>
              <div class="category-header">
                <span class="category-icon">{{ category.icon }}</span>
                <h3>{{ category.title }}</h3>
              </div>
              <div class="skill-bars">
                @for (skill of category.skills; track skill.name) {
                  <div class="skill-item">
                    <div class="skill-label">
                      <span class="skill-name">{{ skill.name }}</span>
                      <span class="skill-percent">{{ skill.level }}%</span>
                    </div>
                    <div class="skill-track">
                      <div
                        class="skill-fill"
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

        <div class="lottie-container glass-card">
          <ng-lottie [options]="options"></ng-lottie>
          <p class="lottie-caption">Always learning, always evolving.</p>
          <div class="tech-count-row">
            <div class="tech-count">
              <span class="count-num">18+</span>
              <span class="count-lbl">Technologies</span>
            </div>
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
      margin-bottom: 40px;
      .dot { color: var(--primary-color); }
    }

    .content-wrapper {
      display: grid;
      grid-template-columns: 2fr 1fr;
      gap: 24px;
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
      .category-header {
        display: flex;
        align-items: center;
        gap: 10px;
        margin-bottom: 20px;

        .category-icon {
          font-size: 1.4rem;
        }

        h3 {
          margin: 0;
          color: var(--primary-color);
          font-size: 1rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
      }
    }

    .skill-item {
      margin-bottom: 14px;

      .skill-label {
        display: flex;
        justify-content: space-between;
        margin-bottom: 6px;

        .skill-name {
          font-size: 0.88rem;
          font-weight: 500;
          color: var(--text-color);
        }

        .skill-percent {
          font-size: 0.8rem;
          color: var(--text-muted);
          font-weight: 600;
        }
      }

      .skill-track {
        height: 6px;
        background: rgba(255, 255, 255, 0.08);
        border-radius: 3px;
        overflow: hidden;

        .skill-fill {
          height: 100%;
          border-radius: 3px;
          transition: width 1.2s cubic-bezier(0.4, 0, 0.2, 1);
        }
      }
    }

    .lottie-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      min-height: 300px;
      padding: 20px;

      .lottie-caption {
        margin-top: 15px;
        color: var(--text-muted);
        font-style: italic;
        text-align: center;
      }

      .tech-count-row {
        display: flex;
        gap: 24px;
        margin-top: 20px;

        .tech-count {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 4px;

          .count-num {
            font-size: 1.6rem;
            font-weight: 800;
            background: linear-gradient(135deg, var(--primary-color), var(--accent-color));
            -webkit-background-clip: text;
            background-clip: text;
            -webkit-text-fill-color: transparent;
          }

          .count-lbl {
            font-size: 0.75rem;
            color: var(--text-muted);
            text-transform: uppercase;
            letter-spacing: 0.5px;
          }
        }
      }
    }
  `]
})
export class SkillsComponent implements AfterViewInit {
  options: AnimationOptions = {
    path: '/assets/lottie/education.json',
  };

  skillCategories = [
    {
      title: 'Frontend & Web',
      icon: '🖥️',
      color: 'linear-gradient(90deg, #14b8a6, #06b6d4)',
      skills: [
        { name: 'Angular', level: 95, animated: false },
        { name: 'TypeScript', level: 90, animated: false },
        { name: 'JavaScript', level: 92, animated: false },
        { name: 'RxJS / NgRx', level: 88, animated: false },
        { name: 'HTML5 / CSS3 / SCSS', level: 90, animated: false },
        { name: 'SEO Optimization', level: 78, animated: false },
      ]
    },
    {
      title: 'Backend & Cloud',
      icon: '⚙️',
      color: 'linear-gradient(90deg, #ec4899, #f43f5e)',
      skills: [
        { name: '.NET Core / C#', level: 85, animated: false },
        { name: 'Node.js', level: 80, animated: false },
        { name: 'REST APIs', level: 92, animated: false },
        { name: 'SQL / Databases', level: 82, animated: false },
        { name: 'IBM Cloud', level: 75, animated: false },
        { name: 'Git / DevOps', level: 88, animated: false },
      ]
    },
    {
      title: 'Data Science & AI',
      icon: '🤖',
      color: 'linear-gradient(90deg, #8b5cf6, #ec4899)',
      skills: [
        { name: 'Python', level: 80, animated: false },
        { name: 'Pandas / NumPy', level: 78, animated: false },
        { name: 'Machine Learning', level: 72, animated: false },
        { name: 'Gen AI Integration', level: 82, animated: false },
        { name: 'Data Visualization', level: 75, animated: false },
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
              cat.skills.forEach(skill => skill.animated = true);
            });
          }, 200);
          observer.disconnect();
        }
      });
    }, { threshold: 0.2 });

    const section = document.querySelector('#skills');
    if (section) observer.observe(section);
  }
}
