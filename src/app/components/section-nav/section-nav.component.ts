
import { Component, ChangeDetectionStrategy, ChangeDetectorRef, NgZone, OnInit, OnDestroy, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-section-nav',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <nav class="section-nav" aria-label="Page sections">
      @for (section of sections; track section.id; let i = $index) {
        <a [href]="'#' + section.id"
           class="sdot"
           [class.active]="activeSection === section.id"
           [attr.aria-label]="section.label">
          <span class="snum">{{ pad(i + 1) }}</span>
          <span class="spip"></span>
          <span class="slabel">{{ section.label }}</span>
        </a>
      }
    </nav>
  `,
  styles: [`
    .section-nav {
      position: fixed;
      left: 18px;
      top: 50%;
      transform: translateY(-50%);
      z-index: 890;
      display: flex;
      flex-direction: column;
      gap: 22px;

      @media (max-width: 1180px) { display: none; }
    }

    .sdot {
      display: flex;
      align-items: center;
      gap: 9px;
      text-decoration: none;
      cursor: pointer;

      .snum {
        font-size: 0.62rem;
        color: rgba(255,255,255,0.18);
        font-weight: 700;
        font-family: monospace;
        width: 18px;
        text-align: right;
        transition: color 0.3s;
      }

      .spip {
        width: 5px;
        height: 5px;
        border-radius: 50%;
        background: rgba(255,255,255,0.15);
        flex-shrink: 0;
        transition: background 0.3s,
                    width 0.38s cubic-bezier(0.34, 1.56, 0.64, 1),
                    border-radius 0.38s,
                    box-shadow 0.3s;
      }

      .slabel {
        font-size: 0.66rem;
        color: var(--primary-color);
        text-transform: uppercase;
        letter-spacing: 1.6px;
        font-weight: 600;
        white-space: nowrap;
        opacity: 0;
        max-width: 0;
        overflow: hidden;
        transition: max-width 0.4s ease, opacity 0.35s ease;
      }

      &:hover {
        .snum  { color: rgba(255,255,255,0.55); }
        .spip  { background: rgba(255,255,255,0.4); }
        .slabel { opacity: 1; max-width: 110px; }
      }

      &.active {
        .snum  { color: var(--primary-color); }
        .spip  {
          background: var(--primary-color);
          width: 16px;
          border-radius: 3px;
          box-shadow: 0 0 12px var(--primary-color);
        }
        .slabel { opacity: 1; max-width: 110px; }
      }
    }
  `]
})
export class SectionNavComponent implements OnInit, OnDestroy {
  sections = [
    { id: 'about',      label: 'About' },
    { id: 'projects',   label: 'Projects' },
    { id: 'experience', label: 'Experience' },
    { id: 'skills',     label: 'Skills' },
    { id: 'contact',    label: 'Contact' },
  ];

  activeSection = 'about';
  private observer!: IntersectionObserver;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private ngZone: NgZone,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    this.observer = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) this.ngZone.run(() => { this.activeSection = e.target.id; this.cdr.markForCheck(); });
      });
    }, { threshold: 0.35 });

    this.sections.forEach(s => {
      const el = document.getElementById(s.id);
      if (el) this.observer.observe(el);
    });
  }

  ngOnDestroy(): void {
    if (this.observer) this.observer.disconnect();
  }

  pad(n: number): string {
    return n.toString().padStart(2, '0');
  }
}
