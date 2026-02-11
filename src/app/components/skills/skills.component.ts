
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
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
          <!-- Tech Skills -->
          <div class="skill-category glass-card">
            <h3>Frontend & Web</h3>
            <div class="tags">
              @for (skill of skills.web; track skill) { <span class="tag">{{ skill }}</span> }
            </div>
          </div>
          
          <div class="skill-category glass-card">
            <h3>Backend & Cloud</h3>
            <div class="tags">
              @for (skill of skills.backend; track skill) { <span class="tag">{{ skill }}</span> }
            </div>
          </div>

          <div class="skill-category glass-card">
            <h3>Data Science</h3>
            <div class="tags">
              @for (skill of skills.data; track skill) { <span class="tag">{{ skill }}</span> }
            </div>
          </div>
        </div>

        <div class="lottie-container glass-card">
             <ng-lottie [options]="options"></ng-lottie> 
             <p class="lottie-caption">Always learning, always evolving.</p>
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
        grid-template-columns: 2fr 1fr; // Skills take more space, Lottie takes less
        gap: 24px;
        align-items: start;

        @media (max-width: 960px) {
            grid-template-columns: 1fr;
        }
    }

    .skills-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 24px;
    }

    .skill-category {
      h3 { margin-top: 0; color: var(--primary-color); margin-bottom: 20px; }
      
      .tags {
        display: flex;
        flex-wrap: wrap;
        gap: 12px;
      }
      
      .tag {
        background: rgba(255,255,255,0.05);
        padding: 8px 16px;
        border-radius: 20px;
        border: 1px solid rgba(255,255,255,0.1);
        font-size: 0.9rem;
        transition: all 0.2s;
        
        &:hover {
          background: var(--primary-color);
          color: #fff;
          transform: translateY(-2px);
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
        }
    }
  `]
})
export class SkillsComponent {
  options: AnimationOptions = {
    path: '/assets/lottie/education.json',
  };

  skills = {
    web: ['Angular', 'TypeScript', 'JavaScript', 'HTML5', 'CSS3/SCSS', 'RxJS', 'NgRx', 'SEO'],
    backend: ['Node.js', '.NET Core', 'C#', 'SQL', 'IBM Cloud', 'REST API', 'Git'],
    data: ['Python', 'Pandas', 'Machine Learning', 'Data Visualization']
  };
}
