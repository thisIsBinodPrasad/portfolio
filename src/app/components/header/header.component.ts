
import {
  Component, ChangeDetectionStrategy, ChangeDetectorRef, HostListener, inject, Inject, NgZone, PLATFORM_ID,
  OnInit, OnDestroy
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ThemeService } from '../../theme.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, MatToolbarModule, MatButtonModule, MatIconModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="scroll-progress" [style.width.%]="scrollProgress"></div>

    <mat-toolbar class="navbar">
      <a href="#about" class="logo">
        <span class="name">Binod</span><span class="dot">.</span><span class="initial">P</span>
      </a>

      <span class="spacer"></span>

      <nav class="nav-links">
        <a href="#about"      class="nav-link" [class.active]="activeSection==='about'"><span>About</span></a>
        <a href="#experience" class="nav-link" [class.active]="activeSection==='experience'"><span>Experience</span></a>
        <a href="#projects"   class="nav-link" [class.active]="activeSection==='projects'"><span>Projects</span></a>
        <a href="#skills"     class="nav-link" [class.active]="activeSection==='skills'"><span>Skills</span></a>
        <a href="#contact"    class="nav-link contact-link" [class.active]="activeSection==='contact'"><span>Contact</span></a>
      </nav>

      <div class="nav-actions">
        <button mat-icon-button (click)="toggleSound()" class="sound-btn" [attr.aria-label]="soundOn ? 'Mute ambient' : 'Play ambient'">
          <mat-icon>{{ soundOn ? 'volume_up' : 'volume_off' }}</mat-icon>
        </button>

        <button mat-icon-button (click)="themeService.toggleTheme()" aria-label="Toggle theme" class="theme-btn">
          <mat-icon>{{ themeService.darkMode() ? 'light_mode' : 'dark_mode' }}</mat-icon>
        </button>

        <button class="hamburger" [class.open]="menuOpen" (click)="toggleMenu()" aria-label="Toggle menu">
          <span></span><span></span><span></span>
        </button>
      </div>
    </mat-toolbar>

    <!-- Mobile overlay menu -->
    <div class="mobile-menu" [class.open]="menuOpen" (click)="closeMenu()">
      <div class="mobile-menu-inner" (click)="$event.stopPropagation()">
        <button class="close-btn" (click)="closeMenu()" aria-label="Close menu">
          <mat-icon>close</mat-icon>
        </button>
        <div class="mobile-logo">
          <span class="name">Binod</span><span class="dot">.</span><span class="initial">P</span>
        </div>
        <nav class="mobile-nav">
          <a href="#about"        (click)="closeMenu()" [class.active]="activeSection==='about'">
            <span class="mn-num">01</span>About
          </a>
          <a href="#experience"   (click)="closeMenu()" [class.active]="activeSection==='experience'">
            <span class="mn-num">02</span>Experience
          </a>
          <a href="#projects"     (click)="closeMenu()" [class.active]="activeSection==='projects'">
            <span class="mn-num">03</span>Projects
          </a>
          <a href="#skills"       (click)="closeMenu()" [class.active]="activeSection==='skills'">
            <span class="mn-num">04</span>Skills
          </a>
          <a href="#testimonials" (click)="closeMenu()">
            <span class="mn-num">05</span>Testimonials
          </a>
          <a href="#certifications" (click)="closeMenu()">
            <span class="mn-num">06</span>Certifications
          </a>
          <a href="#contact"      (click)="closeMenu()" [class.active]="activeSection==='contact'">
            <span class="mn-num">07</span>Contact
          </a>
        </nav>
        <div class="mobile-footer-row">
          <button mat-icon-button (click)="toggleSound()" class="sound-btn">
            <mat-icon>{{ soundOn ? 'volume_up' : 'volume_off' }}</mat-icon>
          </button>
          <button mat-icon-button (click)="themeService.toggleTheme()" class="theme-btn">
            <mat-icon>{{ themeService.darkMode() ? 'light_mode' : 'dark_mode' }}</mat-icon>
          </button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    /* ── Scroll Progress Bar ── */
    .scroll-progress {
      position: fixed;
      top: 0; left: 0;
      height: 3px;
      background: linear-gradient(90deg, #14b8a6, #ec4899, #6366f1);
      z-index: 1001;
      transition: width 0.1s linear;
      box-shadow: 0 0 12px rgba(20, 184, 166, 0.7);
    }

    /* ── Navbar ── */
    .navbar {
      background: rgba(15, 23, 42, 0.82);
      backdrop-filter: blur(18px);
      -webkit-backdrop-filter: blur(18px);
      position: fixed;
      top: 0; left: 0; right: 0;
      z-index: 1000;
      border-bottom: 1px solid rgba(255, 255, 255, 0.06);
      padding: 0 20px;
      animation: navSlideDown 0.7s cubic-bezier(0.22, 1, 0.36, 1) both;

      @media (max-width: 768px) {
        backdrop-filter: blur(8px);
        -webkit-backdrop-filter: blur(8px);
        background: rgba(15, 23, 42, 0.92);
      }
    }

    @keyframes navSlideDown {
      from { transform: translateY(-100%); opacity: 0; }
      to   { transform: translateY(0);     opacity: 1; }
    }

    .spacer { flex: 1; }

    /* ── Logo ── */
    .logo {
      font-weight: 800;
      font-size: 1.5rem;
      letter-spacing: -0.5px;
      text-decoration: none;
      position: relative;

      .name    { color: var(--text-color); }
      .dot     { color: var(--accent-color); }
      .initial { color: var(--primary-color); }

      &::after {
        content: '';
        position: absolute;
        bottom: -2px; left: 0;
        width: 0; height: 2px;
        background: linear-gradient(90deg, var(--primary-color), var(--accent-color));
        border-radius: 1px;
        transition: width 0.4s ease;
      }
      &:hover::after { width: 100%; }
    }

    /* ── Nav Links ── */
    .nav-links {
      display: flex;
      gap: 4px;
      margin-right: 8px;
      @media (max-width: 768px) { display: none; }
    }

    .nav-link {
      color: var(--text-muted) !important;
      font-weight: 500;
      position: relative;
      overflow: hidden;
      text-decoration: none;
      padding: 6px 14px;
      border-radius: 6px;
      transition: color 0.25s ease;

      span { position: relative; z-index: 1; }

      &::after {
        content: '';
        position: absolute;
        bottom: 5px; left: 50%;
        width: 0; height: 2px;
        background: linear-gradient(90deg, var(--primary-color), var(--accent-color));
        border-radius: 1px;
        transition: width 0.3s cubic-bezier(0.22, 1, 0.36, 1), left 0.3s cubic-bezier(0.22, 1, 0.36, 1);
      }

      &:hover {
        color: var(--text-color) !important;
        &::after { width: calc(100% - 28px); left: 14px; }
      }

      &.active {
        color: var(--primary-color) !important;
        &::after { width: calc(100% - 28px); left: 14px; background: var(--primary-color); }
      }
    }

    .contact-link {
      color: var(--primary-color) !important;
      border: 1px solid rgba(20, 184, 166, 0.35) !important;
      border-radius: 20px !important;
      margin-left: 8px;
      transition: background 0.3s, box-shadow 0.3s !important;
      &:hover { background: rgba(20, 184, 166, 0.12) !important; box-shadow: 0 0 16px rgba(20, 184, 166, 0.35); }
      &::after { display: none; }
    }

    /* ── Nav Actions ── */
    .nav-actions {
      display: flex;
      align-items: center;
      gap: 4px;
    }

    .sound-btn, .theme-btn {
      color: var(--text-muted) !important;
      transition: color 0.3s, transform 0.4s !important;
      &:hover { color: var(--primary-color) !important; transform: scale(1.15); }
    }

    /* ── Hamburger ── */
    .hamburger {
      display: none;
      flex-direction: column;
      gap: 5px;
      padding: 8px;
      background: none;
      border: none;
      cursor: pointer;
      z-index: 1002;

      @media (max-width: 768px) { display: flex; }

      span {
        display: block;
        width: 22px;
        height: 2px;
        background: var(--text-color);
        border-radius: 2px;
        transition: transform 0.35s cubic-bezier(0.23, 1, 0.32, 1), opacity 0.35s ease, width 0.35s ease;
      }

      &.open {
        span:nth-child(1) { transform: translateY(7px) rotate(45deg); }
        span:nth-child(2) { opacity: 0; width: 0; }
        span:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }
      }
    }

    /* ── Mobile Overlay ── */
    .mobile-menu {
      position: fixed;
      inset: 0;
      z-index: 999;
      background: rgba(8, 14, 26, 0.85);
      backdrop-filter: blur(8px);
      opacity: 0;
      pointer-events: none;
      transition: opacity 0.35s ease;

      &.open {
        opacity: 1;
        pointer-events: all;
        .mobile-menu-inner { transform: translateX(0); }
      }
    }

    .mobile-menu-inner {
      position: absolute;
      top: 0; right: 0;
      width: min(320px, 85vw);
      height: 100%;
      background: rgba(15, 23, 42, 0.98);
      border-left: 1px solid rgba(255,255,255,0.07);
      padding: 28px 28px 40px;
      display: flex;
      flex-direction: column;
      transform: translateX(100%);
      transition: transform 0.4s cubic-bezier(0.22, 1, 0.36, 1);
      overflow-y: auto;
    }

    .close-btn {
      align-self: flex-end;
      background: none;
      border: none;
      cursor: pointer;
      color: var(--text-muted);
      transition: color 0.3s;
      mat-icon { font-size: 28px; width: 28px; height: 28px; }
      &:hover { color: var(--text-color); }
    }

    .mobile-logo {
      font-size: 2rem;
      font-weight: 800;
      letter-spacing: -0.5px;
      margin: 16px 0 36px;
      .name { color: var(--text-color); }
      .dot  { color: var(--accent-color); }
      .initial { color: var(--primary-color); }
    }

    .mobile-nav {
      display: flex;
      flex-direction: column;
      gap: 4px;
      flex: 1;

      a {
        display: flex;
        align-items: center;
        gap: 16px;
        padding: 14px 16px;
        border-radius: 10px;
        text-decoration: none;
        color: var(--text-muted);
        font-size: 1.1rem;
        font-weight: 600;
        transition: background 0.3s, color 0.3s, transform 0.3s;
        letter-spacing: 0.2px;

        .mn-num {
          font-size: 0.7rem;
          color: rgba(255,255,255,0.2);
          font-family: monospace;
          font-weight: 700;
          transition: color 0.3s;
        }

        &:hover {
          background: rgba(20,184,166,0.08);
          color: var(--text-color);
          transform: translateX(6px);
          .mn-num { color: var(--primary-color); }
        }

        &.active {
          background: rgba(20,184,166,0.1);
          color: var(--primary-color);
          .mn-num { color: var(--primary-color); }
        }
      }
    }

    .mobile-footer-row {
      display: flex;
      gap: 8px;
      padding-top: 24px;
      border-top: 1px solid rgba(255,255,255,0.06);
    }
  `]
})
export class HeaderComponent implements OnInit, OnDestroy {
  themeService = inject(ThemeService);
  scrollProgress = 0;
  activeSection = 'about';
  menuOpen = false;
  soundOn = false;

  private observer!: IntersectionObserver;
  private audioCtx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private scrollTicking = false;

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

    ['about', 'experience', 'projects', 'skills', 'contact'].forEach(id => {
      const el = document.getElementById(id);
      if (el) this.observer.observe(el);
    });
  }

  ngOnDestroy(): void {
    if (this.observer) this.observer.disconnect();
    if (this.audioCtx) this.audioCtx.close();
  }

  @HostListener('window:scroll')
  onWindowScroll(): void {
    if (!isPlatformBrowser(this.platformId) || this.scrollTicking) return;
    this.scrollTicking = true;
    requestAnimationFrame(() => {
      const scrollTop   = document.documentElement.scrollTop || document.body.scrollTop;
      const totalHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      this.scrollProgress = totalHeight > 0 ? (scrollTop / totalHeight) * 100 : 0;
      this.scrollTicking = false;
      this.cdr.markForCheck();
    });
  }

  toggleMenu(): void { this.menuOpen = !this.menuOpen; }
  closeMenu(): void  { this.menuOpen = false; }

  toggleSound(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    if (!this.audioCtx) {
      this.audioCtx   = new AudioContext();
      this.masterGain = this.audioCtx.createGain();
      this.masterGain.gain.value = 0.04;
      this.masterGain.connect(this.audioCtx.destination);

      const rate       = this.audioCtx.sampleRate;
      const bufferSize = rate * 4;
      const buf        = this.audioCtx.createBuffer(1, bufferSize, rate);
      const data       = buf.getChannelData(0);
      let last = 0;
      for (let i = 0; i < bufferSize; i++) {
        const w = Math.random() * 2 - 1;
        data[i] = (last + 0.02 * w) / 1.02;
        last = data[i];
        data[i] *= 3.5;
      }

      const src = this.audioCtx.createBufferSource();
      src.buffer = buf;
      src.loop   = true;

      const filter = this.audioCtx.createBiquadFilter();
      filter.type            = 'lowpass';
      filter.frequency.value = 280;

      src.connect(filter);
      filter.connect(this.masterGain);
      src.start();
      this.soundOn = true;
    } else if (this.soundOn) {
      this.audioCtx.suspend();
      this.soundOn = false;
    } else {
      this.audioCtx.resume();
      this.soundOn = true;
    }
  }
}
