
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
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
    <mat-toolbar class="navbar">
      <span class="logo">
        <span class="name">Binod</span>
        <span class="dot">.</span>
        <span class="initial">P</span>
      </span>
      <span class="spacer"></span>
      <div class="nav-links">
        <a mat-button href="#about">About</a>
        <a mat-button href="#experience">Experience</a>
        <a mat-button href="#projects">Projects</a>
        <a mat-button href="#skills">Skills</a>
        <a mat-button href="#contact" variant="raised" color="primary">Contact</a>
      </div>
      <button mat-icon-button (click)="themeService.toggleTheme()" aria-label="Toggle theme">
        <mat-icon>{{ themeService.darkMode() ? 'light_mode' : 'dark_mode' }}</mat-icon>
      </button>
    </mat-toolbar>
  `,
  styles: [`
    .navbar {
      background: rgba(15, 23, 42, 0.8);
      backdrop-filter: blur(12px);
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      z-index: 1000;
      border-bottom: 1px solid rgba(255,255,255,0.05);
      padding: 0 20px;
    }
    .spacer { flex: 1; }
    .logo {
      font-weight: 700;
      font-size: 1.5rem;
      
      .name { color: var(--text-color); }
      .dot { color: var(--accent-color); }
      .initial { color: var(--primary-color); }
    }
    .nav-links {
      display: flex;
      gap: 16px;
      margin-right: 16px;
      
      @media (max-width: 768px) {
        display: none; // TODO: Add mobile menu
      }
    }
    a[mat-button] {
      color: var(--text-color);
      &:hover { color: var(--primary-color); }
    }
  `]
})
export class HeaderComponent {
  themeService = inject(ThemeService);
}
