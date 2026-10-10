
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { ScrollRevealDirective } from '../../directives/scroll-reveal.directive';

interface Testimonial {
  name: string;
  role: string;
  company: string;
  companyColor: string;
  initials: string;
  text: string;
}

@Component({
  selector: 'app-testimonials',
  standalone: true,
  imports: [CommonModule, MatIconModule, ScrollRevealDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section id="testimonials" class="section-padding container">
      <div class="section-head">
        <h2 class="section-title">
          What People Say<span class="dot">.</span>
          <span class="title-underline"></span>
        </h2>
        <p class="section-sub">Colleagues who've experienced the work first-hand.</p>
      </div>

      <div class="t-grid">
        @for (t of testimonials; track t.name; let i = $index) {
          <div class="t-card glass-card" [appScrollReveal]="i % 2 === 0 ? 'left' : 'right'" [appScrollRevealDelay]="i * 100">
            <div class="quote-mark">
              <mat-icon>format_quote</mat-icon>
            </div>
            <p class="t-text">{{ t.text }}</p>
            <div class="t-author">
              <div class="avatar" [style.background]="t.companyColor + '18'" [style.border-color]="t.companyColor + '55'">
                <span [style.color]="t.companyColor">{{ t.initials }}</span>
              </div>
              <div class="author-info">
                <span class="author-name">{{ t.name }}</span>
                <span class="author-role">{{ t.role }}</span>
                <span class="author-company" [style.color]="t.companyColor">{{ t.company }}</span>
              </div>
              <mat-icon class="verified-icon">verified</mat-icon>
            </div>
          </div>
        }
      </div>
    </section>
  `,
  styles: [`
    .section-head {
      margin-bottom: 48px;
    }

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

    .t-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 28px;

      @media (max-width: 768px) { grid-template-columns: 1fr; }
    }

    .t-card {
      position: relative;
      padding: 32px 28px 24px;
      overflow: hidden;
      transition: transform 0.38s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.38s ease;

      &::before {
        content: '';
        position: absolute;
        top: 0; left: 0;
        width: 3px; height: 100%;
        background: linear-gradient(to bottom, var(--primary-color), var(--accent-color));
        border-radius: 0 2px 2px 0;
        opacity: 0;
        transform: scaleY(0);
        transform-origin: top;
        transition: transform 0.5s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.3s;
      }

      &:hover {
        transform: translateY(-8px);
        box-shadow: 0 20px 50px rgba(0,0,0,0.3), 0 0 24px rgba(20,184,166,0.15);

        &::before { transform: scaleY(1); opacity: 1; }
      }
    }

    .quote-mark {
      width: 44px; height: 44px;
      border-radius: 12px;
      background: linear-gradient(135deg, rgba(20,184,166,0.12), rgba(236,72,153,0.12));
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 20px;

      mat-icon {
        font-size: 24px; width: 24px; height: 24px;
        background: linear-gradient(135deg, var(--primary-color), var(--accent-color));
        -webkit-background-clip: text;
        background-clip: text;
        -webkit-text-fill-color: transparent;
      }
    }

    .t-text {
      color: var(--text-color);
      line-height: 1.75;
      font-size: 0.96rem;
      opacity: 0.88;
      margin: 0 0 24px;
      font-style: italic;
    }

    .t-author {
      display: flex;
      align-items: center;
      gap: 14px;
      padding-top: 20px;
      border-top: 1px solid rgba(255,255,255,0.07);
    }

    .avatar {
      width: 48px; height: 48px;
      border-radius: 50%;
      border: 2px solid;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;

      span {
        font-size: 1rem;
        font-weight: 800;
        font-family: 'Outfit', 'Inter', sans-serif;
      }
    }

    .author-info {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 2px;

      .author-name {
        font-weight: 700;
        font-size: 0.95rem;
        color: var(--text-color);
      }

      .author-role {
        font-size: 0.8rem;
        color: var(--text-muted);
      }

      .author-company {
        font-size: 0.78rem;
        font-weight: 600;
      }
    }

    .verified-icon {
      font-size: 20px; width: 20px; height: 20px;
      color: #3b82f6;
      opacity: 0.9;
      flex-shrink: 0;
    }
  `]
})
export class TestimonialsComponent {
  testimonials: Testimonial[] = [
    {
      name: 'Navjeet Bisht',
      role: 'Software Engineer',
      company: 'IBM',
      companyColor: '#0f62fe',
      initials: 'NB',
      text: 'Working alongside Binod was an enriching experience. He consistently demonstrated deep expertise in Angular and TypeScript, translating complex requirements into clean, scalable solutions. His commitment to code quality, proactive problem-solving, and willingness to mentor teammates made a noticeable difference to our team\'s velocity and output. I\'d highly recommend Binod to any organization looking for a senior full-stack developer.'
    },
    {
      name: 'Siddharth Mall',
      role: 'Software Engineer',
      company: 'HL Mando',
      companyColor: '#14b8a6',
      initials: 'SM',
      text: 'I had the pleasure of working with Binod on multiple product initiatives, and he stood out as one of the most technically sharp and reliable developers I\'ve collaborated with. His command of the Angular ecosystem is exceptional, and his ability to deliver polished, high-performance UIs on tight deadlines is impressive. Beyond the technical skills, he brings genuine enthusiasm and clear communication to every project. Highly recommend.'
    }
  ];
}
