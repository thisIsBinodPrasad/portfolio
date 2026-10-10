
import { Component, AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ScrollRevealDirective } from '../../directives/scroll-reveal.directive';

@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [CommonModule, ScrollRevealDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section id="experience" class="section-padding container">
      <h2 class="section-title">
        Experience <span class="dot">.</span>
        <span class="title-underline"></span>
      </h2>

      <div class="timeline" [class.line-animated]="lineVisible">
        @for (job of jobs; track job.company; let i = $index) {
          <div
            class="timeline-item"
            [appScrollReveal]="i % 2 === 0 ? 'left' : 'right'"
            [appScrollRevealDelay]="i * 100">

            <div class="timeline-marker" [class.current]="job.current">
              <span class="marker-ring r1"></span>
              <span class="marker-ring r2"></span>
            </div>

            <div class="timeline-content glass-card" [class.current-role]="job.current">
              <div class="header">
                <div class="role-row">
                  <h3>{{ job.role }}</h3>
                  @if (job.current) {
                    <span class="current-badge">
                      <span class="live-dot"></span> Current
                    </span>
                  }
                </div>
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
      margin-bottom: 64px;
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

    /* ── Timeline ── */
    .timeline {
      position: relative;
      max-width: 820px;
      margin: 0 auto;

      &::before {
        content: '';
        position: absolute;
        left: 0;
        top: 0;
        bottom: 0;
        width: 2px;
        background: linear-gradient(to bottom, var(--primary-color), var(--accent-color), var(--primary-color));
        transform-origin: top center;
        transform: scaleY(0);
        transition: transform 1.4s cubic-bezier(0.22, 1, 0.36, 1);

        @media (min-width: 768px) {
          left: 50%;
          transform: translateX(-50%) scaleY(0);
        }
      }

      &.line-animated::before {
        transform: scaleY(1);

        @media (min-width: 768px) {
          transform: translateX(-50%) scaleY(1);
        }
      }
    }

    /* ── Items ── */
    .timeline-item {
      position: relative;
      margin-bottom: 44px;

      @media (min-width: 768px) {
        width: 50%;
        padding-right: 44px;

        &:nth-child(even) {
          margin-left: 50%;
          padding-right: 0;
          padding-left: 44px;
          .timeline-marker { left: -7px; right: auto; }
        }

        &:nth-child(odd) {
          .timeline-marker { right: -7px; left: auto; }
        }
      }

      @media (max-width: 767px) {
        padding-left: 34px;
        .timeline-marker { left: -6px; }
      }
    }

    /* ── Marker ── */
    .timeline-marker {
      position: absolute;
      top: 22px;
      width: 14px;
      height: 14px;
      border-radius: 50%;
      background: var(--primary-color);
      box-shadow: 0 0 0 4px rgba(20, 184, 166, 0.2), 0 0 14px rgba(20, 184, 166, 0.5);
      z-index: 2;
      transition: box-shadow 0.3s ease;

      &.current {
        background: #22c55e;
        box-shadow: 0 0 0 4px rgba(34, 197, 94, 0.25), 0 0 18px rgba(34, 197, 94, 0.6);
      }

      &:hover {
        box-shadow: 0 0 0 8px rgba(20, 184, 166, 0.15), 0 0 20px rgba(20, 184, 166, 0.6);
      }
    }

    .marker-ring {
      position: absolute;
      top: 50%; left: 50%;
      border-radius: 50%;
      border: 1px solid var(--primary-color);
      animation: markerPulse 2.5s ease-out infinite;
      transform: translate(-50%, -50%) scale(0.5);
      pointer-events: none;
    }
    .r1 { width: 26px; height: 26px; animation-delay: 0s; }
    .r2 { width: 40px; height: 40px; animation-delay: 0.8s; opacity: 0.6; }

    .timeline-marker.current .marker-ring {
      border-color: #22c55e;
    }

    @keyframes markerPulse {
      0%   { transform: translate(-50%,-50%) scale(0.4); opacity: 1; }
      100% { transform: translate(-50%,-50%) scale(2.2); opacity: 0; }
    }

    /* ── Content Card ── */
    .timeline-content {
      padding: 24px 28px;
      position: relative;
      overflow: hidden;

      &::after {
        content: '';
        position: absolute;
        top: -50%; left: -80%;
        width: 50%; height: 200%;
        background: linear-gradient(90deg, transparent, rgba(255,255,255,0.03), transparent);
        transform: skewX(-20deg);
        transition: left 0.6s ease;
      }

      &:hover::after { left: 160%; }

      &.current-role {
        border-color: rgba(34, 197, 94, 0.35);
        background: rgba(34, 197, 94, 0.04);
      }

      .header {
        margin-bottom: 16px;
        border-bottom: 1px solid rgba(255,255,255,0.05);
        padding-bottom: 14px;

        .role-row {
          display: flex;
          align-items: center;
          gap: 10px;
          flex-wrap: wrap;
          margin-bottom: 6px;
        }

        h3 {
          margin: 0;
          color: var(--text-color);
          font-size: 1.2rem;
          font-weight: 700;
        }

        .current-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 0.72rem;
          font-weight: 700;
          color: #22c55e;
          background: rgba(34, 197, 94, 0.1);
          border: 1px solid rgba(34, 197, 94, 0.3);
          padding: 3px 10px;
          border-radius: 12px;
          letter-spacing: 0.5px;

          .live-dot {
            width: 6px; height: 6px;
            border-radius: 50%;
            background: #22c55e;
            animation: livePulse 1.5s ease-in-out infinite;
          }
        }

        @keyframes livePulse {
          0%, 100% { opacity: 1; box-shadow: 0 0 4px #22c55e; }
          50%       { opacity: 0.5; box-shadow: none; }
        }

        .company {
          display: block;
          color: var(--primary-color);
          font-weight: 600;
          font-size: 0.95rem;
        }

        .period {
          display: block;
          font-size: 0.82rem;
          color: var(--text-muted);
          margin-top: 4px;
        }
      }

      .achievements {
        margin: 0;
        padding-left: 20px;
        color: var(--text-muted);

        li {
          margin-bottom: 8px;
          line-height: 1.6;
          font-size: 0.94rem;
          position: relative;

          &::marker {
            color: var(--primary-color);
          }
        }
      }
    }
  `]
})
export class ExperienceComponent implements AfterViewInit {
  lineVisible = false;

  jobs: { role: string; company: string; period: string; points: string[]; current?: boolean }[] = [
    {
      role: 'Consultant',
      company: 'Deloitte',
      period: 'Nov 2025 – Present',
      current: true,
      points: [
        'Built scalable and reusable Angular components for dynamic web applications, optimizing performance.',
        'Participated in Agile ceremonies, improving sprint deliverables through iterative development practices.',
        'Built and deployed Angular-based web solutions for enterprise clients.'
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

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private cdr: ChangeDetectorRef
  ) {}

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.lineVisible = true;
          this.cdr.markForCheck();
          observer.disconnect();
        }
      });
    }, { threshold: 0.1 });

    const section = document.querySelector('#experience');
    if (section) observer.observe(section);
  }
}
