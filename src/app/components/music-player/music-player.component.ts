
import { Component, OnInit, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-music-player',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <button
      class="music-btn"
      [class.playing]="isPlaying"
      [class.visible]="visible"
      (click)="toggle($event)"
      [attr.aria-label]="isPlaying ? 'Pause music' : 'Play music'">

      <span class="icon-wrap">
        @if (isPlaying) {
          <span class="bars">
            <span class="bar b1"></span>
            <span class="bar b2"></span>
            <span class="bar b3"></span>
            <span class="bar b4"></span>
          </span>
        } @else {
          <svg viewBox="0 0 24 24" fill="currentColor" width="17" height="17" aria-hidden="true">
            <path d="M12 3v10.55A4 4 0 1 0 14 17V7h4V3h-6z"/>
          </svg>
        }
      </span>

      <span class="label-wrap">
        @if (isPlaying) {
          <span class="marquee-track">
            <span class="marquee-text">Bitter Sweet Symphony &nbsp;·&nbsp; The Verve &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Bitter Sweet Symphony &nbsp;·&nbsp; The Verve &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
          </span>
        } @else {
          <span class="static-label">Play music</span>
        }
      </span>

      <span class="glow-ring"></span>
    </button>
  `,
  styles: [`
    .music-btn {
      position: fixed;
      bottom: 36px;
      left: 28px;
      z-index: 900;
      display: inline-flex;
      align-items: center;
      gap: 9px;
      padding: 9px 16px 9px 12px;
      border-radius: 50px;
      border: 1px solid rgba(20,184,166,0.28);
      background: rgba(10,16,32,0.82);
      backdrop-filter: blur(14px);
      -webkit-backdrop-filter: blur(14px);
      color: var(--primary-color);
      cursor: pointer;
      font-family: 'Inter', sans-serif;
      font-size: 0.78rem;
      font-weight: 500;
      letter-spacing: 0.2px;
      opacity: 0;
      transform: translateY(12px);
      transition: opacity 0.5s ease, transform 0.5s ease, border-color 0.3s, box-shadow 0.3s, background 0.3s;
      overflow: hidden;
      white-space: nowrap;
      position: fixed;

      &.visible {
        opacity: 1;
        transform: translateY(0);
      }

      &:hover {
        border-color: rgba(20,184,166,0.6);
        box-shadow: 0 0 22px rgba(20,184,166,0.22);
      }

      &.playing {
        border-color: rgba(20,184,166,0.55);
        background: rgba(20,184,166,0.08);
        box-shadow: 0 0 28px rgba(20,184,166,0.18);
      }
    }

    .icon-wrap {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 20px;
      flex-shrink: 0;
    }

    /* ── Equalizer bars ── */
    .bars {
      display: flex;
      align-items: flex-end;
      gap: 2px;
      height: 17px;
    }

    .bar {
      width: 3px;
      border-radius: 2px 2px 0 0;
      background: var(--primary-color);
      animation: barBounce 1.1s ease-in-out infinite;
    }

    .b1 { animation-delay: 0s;    }
    .b2 { animation-delay: 0.18s; }
    .b3 { animation-delay: 0.35s; }
    .b4 { animation-delay: 0.12s; }

    @keyframes barBounce {
      0%, 100% { height: 3px;  opacity: 0.7; }
      50%       { height: 17px; opacity: 1;   }
    }

    /* ── Label ── */
    .label-wrap {
      max-width: 160px;
      overflow: hidden;
    }

    .static-label {
      display: block;
    }

    .marquee-track {
      display: block;
      overflow: hidden;
      width: 140px;
    }

    .marquee-text {
      display: inline-block;
      animation: marqueeScroll 9s linear infinite;
      font-size: 0.76rem;
      color: rgba(20,184,166,0.9);
    }

    @keyframes marqueeScroll {
      0%   { transform: translateX(0); }
      100% { transform: translateX(-50%); }
    }

    /* ── Glow ring pulse when playing ── */
    .glow-ring {
      position: absolute;
      inset: -1px;
      border-radius: 50px;
      border: 1px solid rgba(20,184,166,0);
      pointer-events: none;
      transition: border-color 0.3s;
    }

    .playing .glow-ring {
      border-color: rgba(20,184,166,0.3);
      animation: ringPulse 2.4s ease-in-out infinite;
    }

    @keyframes ringPulse {
      0%, 100% { box-shadow: 0 0 0 0 rgba(20,184,166,0.3); }
      50%       { box-shadow: 0 0 0 6px rgba(20,184,166,0); }
    }

    @media (max-width: 480px) {
      .music-btn { bottom: 24px; left: 16px; padding: 8px 14px 8px 10px; }
      .marquee-track { width: 110px; }
    }
  `]
})
export class MusicPlayerComponent implements OnInit, OnDestroy {
  isPlaying = false;
  visible   = false;

  private audio: HTMLAudioElement | null = null;
  private interactionHandler: (() => void) | null = null;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    this.audio = new Audio('assets/The Verve - Bitter Sweet Symphony.mp3');
    this.audio.loop   = true;
    this.audio.volume = 0.35;

    // Show button after a short delay
    setTimeout(() => { this.visible = true; this.cdr.markForCheck(); }, 1200);

    // Auto-play on first user interaction
    this.interactionHandler = () => {
      this.removeListeners();
      if (!this.isPlaying) this.playAudio();
    };

    document.addEventListener('click',   this.interactionHandler);
    document.addEventListener('scroll',  this.interactionHandler, { passive: true });
    document.addEventListener('keydown', this.interactionHandler);
  }

  toggle(event: Event): void {
    event.stopPropagation();
    this.removeListeners();
    if (!this.audio) return;

    if (this.isPlaying) {
      this.audio.pause();
      this.isPlaying = false;
    } else {
      this.isPlaying = true;
      this.audio.play().catch(() => { this.isPlaying = false; this.cdr.markForCheck(); });
    }
    this.cdr.markForCheck();
  }

  private playAudio(): void {
    if (!this.audio || this.isPlaying) return;
    this.isPlaying = true;
    this.cdr.markForCheck();
    this.audio.play().catch(() => { this.isPlaying = false; this.cdr.markForCheck(); });
  }

  private removeListeners(): void {
    if (this.interactionHandler) {
      document.removeEventListener('click',   this.interactionHandler);
      document.removeEventListener('scroll',  this.interactionHandler);
      document.removeEventListener('keydown', this.interactionHandler);
      this.interactionHandler = null;
    }
  }

  ngOnDestroy(): void {
    if (this.audio) { this.audio.pause(); this.audio = null; }
    this.removeListeners();
  }
}
