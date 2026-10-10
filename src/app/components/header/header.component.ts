
import { Component, HostListener, inject, Inject, PLATFORM_ID, OnInit } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ThemeService } from '../../theme.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, MatToolbarModule, MatButtonModule, MatIconModule, RouterModule],
  template: `
    <div class="scroll-progress" [style.width.%]="scrollProgress"></div>

    <mat-toolbar class="navbar">
      <span class="logo">
        <span class="name">Binod</span>
        <span class="dot">.</span>
        <span class="initial">P</span>
      </span>

      <span class="spacer"></span>

      <nav class="nav-links">
        <a mat-button href="#about"      class="nav-link"><span>About</span></a>
        <a mat-button href="#experience" class="nav-link"><span>Experience</span></a>
        <a mat-button href="#projects"   class="nav-link"><span>Projects</span></a>
        <a mat-button href="#skills"     class="nav-link"><span>Skills</span></a>
        <a mat-button href="#contact"    class="nav-link contact-link"><span>Contact</span></a>
      </nav>

      <button mat-icon-button (click)="themeService.toggleTheme()" aria-label="Toggle theme" class="theme-btn">
        <mat-icon>{{ themeService.darkMode() ? 'light_mode' : 'dark_mode' }}</mat-icon>
      </button>
    </mat-toolbar>
  `,
  styles: [`
    /* ── Scroll Progress Bar ── */
    .scroll-progress {
      position: fixed;
      top: 0;
      left: 0;
      height: 3px;
      background: linear-gradient(90deg, var(--primary-color), var(--accent-color), #6366f1);
      z-index: 1001;
      transition: width 0.1s linear;
      box-shadow: 0 0 10px rgba(20, 184, 166, 0.6);
    }

    /* ── Navbar ── */
    .navbar {
      background: rgba(15, 23, 42, 0.82);
      backdrop-filter: blur(16px);
      -webkit-backdrop-filter: blur(16px);
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      z-index: 1000;
      border-bottom: 1px solid rgba(255, 255, 255, 0.06);
      padding: 0 20px;
      animation: navSlideDown 0.7s cubic-bezier(0.22, 1, 0.36, 1) both;
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
      cursor: default;
      position: relative;

      &::after {
        content: '';
        position: absolute;
        bottom: -3px; left: 0;
        width: 0; height: 2px;
        background: linear-gradient(90deg, var(--primary-color), var(--accent-color));
        border-radius: 1px;
        transition: width 0.4s ease;
      }

      &:hover::after { width: 100%; }

      .name    { color: var(--text-color); }
      .dot     { color: var(--accent-color); }
      .initial { color: var(--primary-color); }
    }

    /* ── Nav Links ── */
    .nav-links {
      display: flex;
      gap: 4px;
      margin-right: 12px;
      @media (max-width: 768px) { display: none; }
    }

    .nav-link {
      color: var(--text-muted) !important;
      font-weight: 500 !important;
      position: relative;
      overflow: hidden;
      transition: color 0.25s ease !important;

      span {
        position: relative;
        z-index: 1;
      }

      /* Animated underline */
      &::after {
        content: '';
        position: absolute;
        bottom: 6px;
        left: 50%;
        width: 0;
        height: 2px;
        background: linear-gradient(90deg, var(--primary-color), var(--accent-color));
        border-radius: 1px;
        transition: width 0.3s cubic-bezier(0.22, 1, 0.36, 1), left 0.3s cubic-bezier(0.22, 1, 0.36, 1);
      }

      &:hover {
        color: var(--text-color) !important;

        &::after {
          width: calc(100% - 24px);
          left: 12px;
        }
      }
    }

    .contact-link {
      color: var(--primary-color) !important;
      border: 1px solid rgba(20, 184, 166, 0.35) !important;
      border-radius: 20px !important;
      margin-left: 8px;
      transition: background 0.3s, box-shadow 0.3s, color 0.3s !important;

      &:hover {
        background: rgba(20, 184, 166, 0.12) !important;
        box-shadow: 0 0 16px rgba(20, 184, 166, 0.35);
      }

      &::after { display: none; }
    }

    /* ── Theme Toggle ── */
    .theme-btn {
      color: var(--text-muted) !important;
      transition: color 0.3s, transform 0.4s !important;

      &:hover {
        color: var(--primary-color) !important;
        transform: rotate(20deg);
      }
    }
  `]
})
export class HeaderComponent implements OnInit {
  themeService = inject(ThemeService);
  scrollProgress = 0;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit(): void {}

  @HostListener('window:scroll')
  onWindowScroll(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    const scrollTop    = document.documentElement.scrollTop || document.body.scrollTop;
    const totalHeight  = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    this.scrollProgress = totalHeight > 0 ? (scrollTop / totalHeight) * 100 : 0;
  }
}
