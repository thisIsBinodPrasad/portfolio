
import { Component, HostListener, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-back-to-top',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  template: `
    <button class="back-top" [class.visible]="show" (click)="scrollToTop()" aria-label="Back to top">
      <span class="ring r1"></span>
      <span class="ring r2"></span>
      <mat-icon>keyboard_arrow_up</mat-icon>
    </button>
  `,
  styles: [`
    .back-top {
      position: fixed;
      bottom: 36px;
      right: 32px;
      z-index: 998;
      width: 50px;
      height: 50px;
      border-radius: 50%;
      border: none;
      background: linear-gradient(135deg, #14b8a6, #6366f1);
      color: white;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      opacity: 0;
      transform: translateY(20px) scale(0.75);
      transition: opacity 0.4s cubic-bezier(0.34, 1.56, 0.64, 1),
                  transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1),
                  box-shadow 0.3s ease;
      pointer-events: none;
      box-shadow: 0 4px 20px rgba(20,184,166,0.35);
      overflow: hidden;

      &.visible {
        opacity: 1;
        transform: translateY(0) scale(1);
        pointer-events: all;
      }

      &:hover {
        box-shadow: 0 8px 32px rgba(20,184,166,0.6);
        transform: translateY(-4px) scale(1.1) !important;
        .r1, .r2 { animation-play-state: running; }
      }

      mat-icon {
        font-size: 26px;
        width: 26px;
        height: 26px;
        position: relative;
        z-index: 2;
      }

      .ring {
        position: absolute;
        inset: 0;
        border-radius: 50%;
        border: 1.5px solid rgba(20,184,166,0.5);
        animation: ringPulse 2.2s ease-out infinite;
        animation-play-state: paused;
      }
      .r2 { animation-delay: 0.7s; }
    }

    @keyframes ringPulse {
      0%   { transform: scale(1); opacity: 0.7; }
      100% { transform: scale(2.4); opacity: 0; }
    }
  `]
})
export class BackToTopComponent {
  show = false;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  @HostListener('window:scroll')
  onScroll(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    this.show = window.scrollY > 400;
  }

  scrollToTop(): void {
    if (isPlatformBrowser(this.platformId)) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }
}
