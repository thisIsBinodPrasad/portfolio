
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ScrollRevealDirective } from '../../directives/scroll-reveal.directive';

@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [CommonModule, ScrollRevealDirective],
  template: `
    <section id="experience" class="section-padding container">
      <h2 class="section-title">Experience <span class="dot">.</span></h2>
      
      <div class="timeline">
        @for (job of jobs; track job.company) {
          <div class="timeline-item" appScrollReveal>
            <div class="timeline-marker"></div>
            <div class="timeline-content glass-card">
              <div class="header">
                <h3>{{ job.role }}</h3>
                <span class="company">{{ job.company }}</span>
                <span class="period">{{ job.period }}</span>
              </div>
              <ul class="achievements">
                @for (point of job.points; track point) {
                  <li>{{ point }}</li>
                }
              </ul>
            </div>
          </div>
        }
      </div>
    </section>
  `,
  styles: [`
    .section-title {
      font-size: 2.5rem;
      font-weight: 700;
      margin-bottom: 60px;
      .dot { color: var(--primary-color); }
    }

    .timeline {
      position: relative;
      max-width: 800px;
      margin: 0 auto;
      
      &::before {
        content: '';
        position: absolute;
        left: 0;
        top: 0;
        bottom: 0;
        width: 2px;
        background: rgba(255, 255, 255, 0.1);
        @media (min-width: 768px) { left: 50%; transform: translateX(-50%); }
      }
    }

    .timeline-item {
      position: relative;
      margin-bottom: 40px;
      
      @media (min-width: 768px) {
        width: 50%;
        padding-right: 40px;
        &:nth-child(even) {
            margin-left: 50%;
            padding-right: 0;
            padding-left: 40px;
            
            .timeline-marker { left: -6px; }
        }
        &:nth-child(odd) {
             .timeline-marker { right: -6px; left: auto; }
        }
      }
      
      @media (max-width: 767px) {
          padding-left: 30px;
          .timeline-marker { left: -5px; }
      }
    }

    .timeline-marker {
      position: absolute;
      top: 20px;
      width: 12px;
      height: 12px;
      border-radius: 50%;
      background: var(--primary-color);
      box-shadow: 0 0 0 4px rgba(20, 184, 166, 0.2);
    }

    .timeline-content {
      padding: 24px;
      
      .header {
        margin-bottom: 16px;
        border-bottom: 1px solid rgba(255,255,255,0.05);
        padding-bottom: 12px;
        
        h3 { margin: 0; color: var(--text-color); font-size: 1.25rem; }
        .company { display: block; color: var(--primary-color); font-weight: 500; margin-top: 4px; }
        .period { display: block; font-size: 0.85rem; color: var(--text-muted); margin-top: 4px; }
      }

      .achievements {
        margin: 0;
        padding-left: 20px;
        color: var(--text-muted);
        li { margin-bottom: 8px; line-height: 1.5; }
      }
    }
  `]
})
export class ExperienceComponent {
  jobs = [
    {
      role: 'Consultant',
      company: 'Deloitte',
      period: 'Nov 2025 – Present',
      points: [
        'Building scalable Angular components for dynamic web apps.',
        'Improving sprint deliverables through Agile practices.',
        'Deploying optimized Angular solutions.'
      ]
    },
    {
      role: 'Application Developer',
      company: 'IBM',
      period: 'July 2024 – Oct 2025',
      points: [
        'Designed mentor search functionality using RxJS, reducing latency.',
        'Integrated Angular with IBM Cloud services.',
        'Built reusable services using Node.js.'
      ]
    },
    {
      role: 'Freelance Software Engineer',
      company: 'Remote',
      period: 'Nov 2023 – June 2024',
      points: [
        'Developed Angular multi-service booking platform.',
        'Built system for British Railways using .NET Core.',
        'Optimized SEO and load times.'
      ]
    },
    {
      role: 'Software Engineer',
      company: 'Anicca Data Science Solutions',
      period: 'Nov 2022 – Oct 2023',
      points: [
        'Engineered real-time inventory dashboards using Angular.',
        'Automated forecasting using Python DAGs.',
        'Conducted EDA using Pandas.'
      ]
    },
    {
      role: 'Software Engineer',
      company: 'Gloify',
      period: 'May 2022 – Oct 2022',
      points: [
        'Integrated Angular solutions with Python APIs.',
        'Enhanced web apps for SEO compliance.'
      ]
    },
    {
      role: 'Software Developer',
      company: 'Vidhikara',
      period: 'Feb 2020 – April 2022',
      points: [
        'Designed Angular frontend interfaces.',
        'Built RESTful APIs using .NET Core.'
      ]
    }
  ];
}
