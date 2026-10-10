
import { Component, AfterViewInit, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { TypingEffectDirective } from '../../directives/typing-effect.directive';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule, TypingEffectDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section id="about" class="hero-section container">
      <div class="content">
        <div class="role-chip anim-item anim-d0">
          <span class="status-dot">
            <span class="ripple r1"></span>
            <span class="ripple r2"></span>
            <span class="ripple r3"></span>
          </span>
          SDE 2 @ Deloitte · Open to Collaborations
        </div>

        <h1 class="greeting anim-item anim-d1">
          Hi, I'm <span class="text-gradient name-shimmer">Binod Prasad</span>
        </h1>

        <h2 class="subtitle anim-item anim-d2">
          <span [appTypingEffect]="['Full Stack Developer', 'Angular Expert', 'Gen AI Enthusiast', '.NET Core Developer']"></span>
        </h2>

        <p class="bio anim-item anim-d3">
          I build high-performance web applications using Angular, .NET Core, Python, and Node.js.
          Currently transforming digital experiences as an SDE 2 at Deloitte.
        </p>

        <div class="hero-stats anim-item anim-d4">
          <div class="stat-item">
            <span class="stat-num text-gradient">{{ displayedYears }}+</span>
            <span class="stat-lbl">Years Experience</span>
          </div>
          <div class="stat-divider"></div>
          <div class="stat-item">
            <span class="stat-num text-gradient">{{ displayedProjects }}+</span>
            <span class="stat-lbl">Featured Projects</span>
          </div>
          <div class="stat-divider"></div>
          <div class="stat-item">
            <span class="stat-num text-gradient">Deloitte</span>
            <span class="stat-lbl">& IBM Ex-Dev</span>
          </div>
        </div>

        <div class="actions anim-item anim-d5">
          <a mat-raised-button color="primary" href="#projects" class="glow-btn">
            <mat-icon>work</mat-icon> View My Work
          </a>
          <a mat-stroked-button href="assets/Prasad_BinodCV.pdf" target="_blank" class="outline-btn">
            <mat-icon>download</mat-icon> Download Resume
          </a>
        </div>
      </div>

      <div class="visual anim-item anim-d2">
        <div class="profile-container">
          <div class="gradient-ring"></div>
          <div class="orbit-ring orbit-1"></div>
          <div class="orbit-ring orbit-2"></div>
          <div class="orbit-ring orbit-3"></div>
          <img src="assets/images/profile.jpg" alt="Binod Prasad" class="profile-img" fetchpriority="high" decoding="async">
          <div class="floating-badge badge-1">
            <mat-icon>code</mat-icon> Angular & RxJS
          </div>
          <div class="floating-badge badge-2">
            <mat-icon>auto_awesome</mat-icon> Gen AI & .NET
          </div>
          <div class="floating-badge badge-3">
            <mat-icon>cloud</mat-icon> Cloud & APIs
          </div>
        </div>
      </div>

      <a href="#projects" class="scroll-indicator">
        <span class="scroll-label">Scroll</span>
        <div class="scroll-chevron">
          <mat-icon>expand_more</mat-icon>
          <mat-icon>expand_more</mat-icon>
        </div>
      </a>
    </section>
  `,
  styles: [`
    .hero-section {
      display: flex;
      align-items: center;
      justify-content: space-between;
      min-height: 100vh;
      padding-top: 80px;
      position: relative;
      @media (max-width: 960px) {
        flex-direction: column-reverse;
        text-align: center;
        justify-content: center;
        gap: 40px;
        padding-top: 100px;
        padding-bottom: 60px;
      }
    }

    /* ── Staggered Entrance ── */
    .anim-item {
      opacity: 0;
      animation: heroUp 0.85s cubic-bezier(0.22, 1, 0.36, 1) forwards;
    }
    .anim-d0 { animation-delay: 0.1s; }
    .anim-d1 { animation-delay: 0.25s; }
    .anim-d2 { animation-delay: 0.4s; }
    .anim-d3 { animation-delay: 0.55s; }
    .anim-d4 { animation-delay: 0.7s; }
    .anim-d5 { animation-delay: 0.85s; }

    @keyframes heroUp {
      from { opacity: 0; transform: translateY(36px); }
      to   { opacity: 1; transform: translateY(0); }
    }

    /* ── Role Chip ── */
    .role-chip {
      display: inline-flex;
      align-items: center;
      gap: 10px;
      padding: 7px 16px;
      border-radius: 24px;
      background: rgba(20, 184, 166, 0.08);
      border: 1px solid rgba(20, 184, 166, 0.3);
      color: var(--primary-color);
      font-size: 0.85rem;
      font-weight: 500;
      margin-bottom: 20px;
      position: relative;
      overflow: hidden;

      &::after {
        content: '';
        position: absolute;
        top: 0; left: -100%;
        width: 60%; height: 100%;
        background: linear-gradient(90deg, transparent, rgba(20,184,166,0.25), transparent);
        animation: chipShimmer 3.5s ease-in-out infinite;
      }
    }

    @keyframes chipShimmer {
      0%      { left: -100%; }
      40%, 100% { left: 160%; }
    }

    .status-dot {
      width: 8px; height: 8px;
      border-radius: 50%;
      background: var(--primary-color);
      box-shadow: 0 0 8px var(--primary-color);
      position: relative;
      flex-shrink: 0;
    }

    .ripple {
      position: absolute;
      top: 50%; left: 50%;
      border-radius: 50%;
      border: 1px solid var(--primary-color);
      animation: dotRipple 2.4s ease-out infinite;
      transform: translate(-50%, -50%) scale(0.5);
    }
    .r1 { width: 14px; height: 14px; animation-delay: 0s; }
    .r2 { width: 22px; height: 22px; animation-delay: 0.7s; }
    .r3 { width: 30px; height: 30px; animation-delay: 1.4s; }

    @keyframes dotRipple {
      0%   { transform: translate(-50%,-50%) scale(0.4); opacity: 1; }
      100% { transform: translate(-50%,-50%) scale(2.2);  opacity: 0; }
    }

    /* ── Text ── */
    .content { flex: 1; max-width: 650px; }

    .greeting {
      font-size: 4.4rem;
      font-weight: 800;
      line-height: 1.1;
      margin-bottom: 16px;
      letter-spacing: -1px;
      @media (max-width: 768px) { font-size: 3rem; }
    }

    .name-shimmer {
      position: relative;
      display: inline-block;
      animation: nameGlow 4s ease-in-out infinite alternate;
    }

    @keyframes nameGlow {
      0%   { filter: drop-shadow(0 0 12px rgba(20, 184, 166, 0.35)); }
      100% { filter: drop-shadow(0 0 28px rgba(236, 72, 153, 0.5)); }
    }

    .subtitle {
      font-size: 1.6rem;
      color: var(--text-muted);
      margin-bottom: 24px;
      font-weight: 500;
      min-height: 2.2rem;
    }

    .bio {
      font-size: 1.08rem;
      line-height: 1.75;
      color: var(--text-color);
      margin-bottom: 28px;
      opacity: 0.88;
    }

    /* ── Stats ── */
    .hero-stats {
      display: flex;
      align-items: center;
      gap: 24px;
      margin-bottom: 36px;
      @media (max-width: 960px) { justify-content: center; }

      .stat-item {
        display: flex;
        flex-direction: column;
        gap: 3px;

        .stat-num {
          font-size: 1.75rem;
          font-weight: 800;
          line-height: 1;
        }

        .stat-lbl {
          font-size: 0.76rem;
          color: var(--text-muted);
          text-transform: uppercase;
          letter-spacing: 0.6px;
        }
      }

      .stat-divider {
        width: 1px;
        height: 44px;
        background: linear-gradient(to bottom, transparent, rgba(255,255,255,0.15), transparent);
        flex-shrink: 0;
      }
    }

    /* ── Actions ── */
    .actions {
      display: flex;
      gap: 16px;
      @media (max-width: 960px) { justify-content: center; }
    }

    .glow-btn {
      position: relative;
      overflow: hidden;
      transition: box-shadow 0.3s ease, transform 0.2s ease !important;

      &::after {
        content: '';
        position: absolute;
        top: -50%; left: -80%;
        width: 55%; height: 200%;
        background: rgba(255,255,255,0.14);
        transform: skewX(-20deg);
        transition: left 0.55s ease;
        pointer-events: none;
      }

      &:hover {
        box-shadow: 0 0 28px rgba(20, 184, 166, 0.55) !important;
        transform: translateY(-2px);
        &::after { left: 160%; }
      }
    }

    .outline-btn {
      transition: transform 0.2s ease !important;
      &:hover { transform: translateY(-2px); }
    }

    /* ── Visual / Profile ── */
    .visual {
      flex: 1;
      display: flex;
      justify-content: center;
      position: relative;
    }

    .profile-container {
      position: relative;
      width: 360px;
      height: 360px;

      @media (max-width: 960px) {
        width: 260px;
        height: 260px;
      }

      @media (max-width: 480px) {
        width: 220px;
        height: 220px;
      }

      .profile-img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 50%;
        position: relative;
        z-index: 3;
        border: 4px solid var(--surface-color);
        box-shadow: 0 20px 60px rgba(20, 184, 166, 0.25);
      }

      .gradient-ring {
        position: absolute;
        top: -5px; left: -5px; right: -5px; bottom: -5px;
        border-radius: 50%;
        background: conic-gradient(from 0deg, #14b8a6 0%, #ec4899 33%, #6366f1 66%, #14b8a6 100%);
        z-index: 2;
        animation: rotateBorder 5s linear infinite;
        mask: radial-gradient(farthest-side, transparent calc(100% - 4px), white calc(100% - 4px));
        -webkit-mask: radial-gradient(farthest-side, transparent calc(100% - 4px), white calc(100% - 4px));
      }

      @keyframes rotateBorder {
        from { transform: rotate(0deg); }
        to   { transform: rotate(360deg); }
      }

      .orbit-ring {
        position: absolute;
        top: 50%; left: 50%;
        border-radius: 50%;
        z-index: 1;
      }

      .orbit-1 {
        width: 430px; height: 430px;
        transform: translate(-50%, -50%);
        border: 1.5px dashed rgba(20, 184, 166, 0.35);
        animation: orbitSpin 26s linear infinite;
      }

      .orbit-2 {
        width: 500px; height: 500px;
        transform: translate(-50%, -50%);
        border: 1px solid rgba(236, 72, 153, 0.15);
        animation: orbitSpin 42s linear infinite reverse;
      }

      .orbit-3 {
        width: 310px; height: 310px;
        transform: translate(-50%, -50%);
        border: 1px dotted rgba(99, 102, 241, 0.3);
        animation: orbitSpin 16s linear infinite;
      }

      @keyframes orbitSpin {
        from { transform: translate(-50%, -50%) rotate(0deg); }
        to   { transform: translate(-50%, -50%) rotate(360deg); }
      }

      .floating-badge {
        position: absolute;
        z-index: 4;
        background: rgba(15, 23, 42, 0.85);
        backdrop-filter: blur(12px);
        -webkit-backdrop-filter: blur(12px);
        border: 1px solid rgba(255, 255, 255, 0.1);
        padding: 8px 14px;
        border-radius: 22px;
        font-size: 0.78rem;
        font-weight: 600;
        color: var(--text-color);
        display: flex;
        align-items: center;
        gap: 6px;
        box-shadow: 0 8px 24px rgba(0,0,0,0.35);
        white-space: nowrap;
        transition: box-shadow 0.3s ease;

        mat-icon { font-size: 14px; width: 14px; height: 14px; color: var(--primary-color); }

        &:hover { box-shadow: 0 12px 32px rgba(0,0,0,0.5); }
      }

      .badge-1 {
        top: 8%;
        left: -18%;
        animation: floatBadge 4.2s ease-in-out infinite alternate;
      }

      .badge-2 {
        bottom: 12%;
        right: -14%;
        animation: floatBadge 5.1s ease-in-out infinite alternate-reverse;
        mat-icon { color: var(--accent-color); }
      }

      .badge-3 {
        top: 48%;
        right: -22%;
        animation: floatBadge 3.7s ease-in-out infinite alternate;
        animation-delay: -1.8s;
        mat-icon { color: #38bdf8; }
      }

      @keyframes floatBadge {
        0%   { transform: translateY(0); }
        100% { transform: translateY(-14px); }
      }
    }

    /* ── Scroll Indicator ── */
    .scroll-indicator {
      position: absolute;
      bottom: 28px;
      left: 50%;
      transform: translateX(-50%);
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 2px;
      opacity: 0;
      animation: fadeInIndicator 1s ease 1.8s forwards;
      text-decoration: none;
      color: var(--text-muted);

      .scroll-label {
        font-size: 0.65rem;
        text-transform: uppercase;
        letter-spacing: 2.5px;
      }

      .scroll-chevron {
        display: flex;
        flex-direction: column;
        align-items: center;
        animation: bounceChevron 1.8s ease-in-out infinite;
        color: var(--primary-color);

        mat-icon {
          font-size: 18px;
          display: block;
          &:first-child { margin-bottom: -12px; opacity: 0.5; }
        }
      }
    }

    @keyframes fadeInIndicator { to { opacity: 0.65; } }

    @keyframes bounceChevron {
      0%, 100% { transform: translateY(0); }
      50%       { transform: translateY(7px); }
    }

    /* ── Cursor blink ── */
    ::ng-deep .cursor {
      animation: blink 1s infinite;
      color: var(--primary-color);
      font-weight: 100;
    }

    @keyframes blink {
      0%, 100% { opacity: 1; }
      50%       { opacity: 0; }
    }
  `]
})
export class HeroComponent implements AfterViewInit, OnDestroy {
  displayedYears = 0;
  displayedProjects = 0;

  private intervalId: ReturnType<typeof setInterval> | null = null;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private cdr: ChangeDetectorRef
  ) {}

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    // Start counter after entrance animations settle
    setTimeout(() => this.runCounter(), 1000);
  }

  ngOnDestroy(): void {
    if (this.intervalId) clearInterval(this.intervalId);
  }

  private yearsOfExperience(): number {
    const start = new Date(2020, 1, 1); // February 2020
    const now = new Date();
    let years = now.getFullYear() - start.getFullYear();
    const monthDiff = now.getMonth() - start.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && now.getDate() < start.getDate())) {
      years--;
    }
    return years;
  }

  private runCounter(): void {
    const duration = 1600;
    const steps = 50;
    const stepMs = duration / steps;
    const targetYears = this.yearsOfExperience();
    const targetProjects = 10;
    let current = 0;

    this.intervalId = setInterval(() => {
      current++;
      const t = current / steps;
      const eased = 1 - Math.pow(1 - t, 3);
      this.displayedYears    = Math.floor(eased * targetYears);
      this.displayedProjects = Math.floor(eased * targetProjects);

      if (current >= steps) {
        clearInterval(this.intervalId!);
        this.displayedYears    = targetYears;
        this.displayedProjects = targetProjects;
        this.cdr.markForCheck();
      }
      this.cdr.markForCheck();
    }, stepMs);
  }
}
