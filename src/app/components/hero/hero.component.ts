
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { TypingEffectDirective } from '../../directives/typing-effect.directive';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule, TypingEffectDirective],
  template: `
    <section class="hero-section container">
      <div class="content">
        <div class="role-chip">
          <span class="status-dot"></span> Available for Senior Angular & Full Stack Roles
        </div>
        <h1 class="greeting">Hi, I'm <span class="text-gradient">Binod Prasad</span></h1>
        <h2 class="subtitle">
          <span [appTypingEffect]="['Full Stack Developer', 'Angular Expert', 'Gen AI Enthusiast', '.NET Core Developer']"></span>
        </h2>
        <p class="bio">
          I build high-performance web applications using Angular, .NET Core, Python, and Node.js. 
          Currently transforming digital experiences as a Consultant at Deloitte.
        </p>

        <!-- Quick Stats Grid -->
        <div class="hero-stats">
          <div class="stat-item">
            <span class="stat-num text-gradient">5+</span>
            <span class="stat-lbl">Years Experience</span>
          </div>
          <div class="stat-item">
            <span class="stat-num text-gradient">10+</span>
            <span class="stat-lbl">Featured Projects</span>
          </div>
          <div class="stat-item">
            <span class="stat-num text-gradient">Deloitte</span>
            <span class="stat-lbl">& IBM Ex-Dev</span>
          </div>
        </div>

        <div class="actions">
          <a mat-raised-button color="primary" href="#projects">
            <mat-icon>work</mat-icon> View My Work
          </a>
          <a mat-stroked-button href="assets/Prasad_BinodCV.pdf" target="_blank">
            <mat-icon>download</mat-icon> Download Resume
          </a>
        </div>
      </div>

      <div class="visual">
        <div class="profile-container">
            <img src="assets/images/profile.jpg" alt="Binod Prasad" class="profile-img">
            <div class="orbit-circle"></div>
            <div class="floating-badge badge-1">
              <mat-icon>code</mat-icon> Angular & RxJS
            </div>
            <div class="floating-badge badge-2">
              <mat-icon>auto_awesome</mat-icon> Gen AI & .NET
            </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .hero-section {
      display: flex;
      align-items: center;
      justify-content: space-between;
      min-height: 100vh;
      padding-top: 80px;

      @media (max-width: 960px) {
        flex-direction: column-reverse;
        text-align: center;
        justify-content: center;
        gap: 40px;
      }
    }

    .role-chip {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 6px 14px;
      border-radius: 20px;
      background: rgba(20, 184, 166, 0.1);
      border: 1px solid rgba(20, 184, 166, 0.3);
      color: var(--primary-color);
      font-size: 0.85rem;
      font-weight: 500;
      margin-bottom: 16px;

      .status-dot {
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background-color: var(--primary-color);
        box-shadow: 0 0 10px var(--primary-color);
      }
    }

    .content {
      flex: 1;
      max-width: 650px;
    }

    .greeting {
      font-size: 4.2rem;
      font-weight: 800;
      line-height: 1.1;
      margin-bottom: 16px;
      letter-spacing: -1px;
      
      @media (max-width: 768px) { font-size: 3rem; }
    }

    .subtitle {
      font-size: 1.6rem;
      color: var(--text-muted);
      margin-bottom: 24px;
      font-weight: 500;
      min-height: 2.2rem;
    }

    .bio {
      font-size: 1.1rem;
      line-height: 1.7;
      color: var(--text-color);
      margin-bottom: 28px;
      opacity: 0.9;
    }

    .hero-stats {
      display: flex;
      gap: 28px;
      margin-bottom: 32px;

      @media (max-width: 960px) { justify-content: center; }

      .stat-item {
        display: flex;
        flex-direction: column;

        .stat-num {
          font-size: 1.6rem;
          font-weight: 800;
        }

        .stat-lbl {
          font-size: 0.8rem;
          color: var(--text-muted);
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
      }
    }

    .actions {
      display: flex;
      gap: 16px;
      @media (max-width: 960px) { justify-content: center; }
    }

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
      
      .profile-img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 50%;
        position: relative;
        z-index: 2;
        border: 4px solid var(--surface-color);
        box-shadow: 0 20px 60px rgba(20, 184, 166, 0.3);
      }

      .orbit-circle {
        position: absolute;
        top: -14px;
        left: -14px;
        right: -14px;
        bottom: -14px;
        border-radius: 50%;
        border: 2px dashed rgba(20, 184, 166, 0.5);
        z-index: 1;
        animation: spin 24s linear infinite;
      }

      .floating-badge {
        position: absolute;
        z-index: 3;
        background: rgba(30, 41, 59, 0.85);
        backdrop-filter: blur(10px);
        border: 1px solid rgba(255, 255, 255, 0.15);
        padding: 8px 14px;
        border-radius: 20px;
        font-size: 0.8rem;
        font-weight: 600;
        color: var(--text-color);
        display: flex;
        align-items: center;
        gap: 6px;
        box-shadow: 0 10px 20px rgba(0,0,0,0.3);
        animation: floatBadge 4s ease-in-out infinite alternate;

        mat-icon { font-size: 16px; width: 16px; height: 16px; color: var(--primary-color); }
      }

      .badge-1 {
        top: 20px;
        left: -30px;
      }

      .badge-2 {
        bottom: 30px;
        right: -20px;
        animation-delay: -2s;
        mat-icon { color: var(--accent-color); }
      }
    }

    @keyframes spin {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }

    @keyframes floatBadge {
      0% { transform: translateY(0); }
      100% { transform: translateY(-10px); }
    }

    ::ng-deep .cursor {
      animation: blink 1s infinite;
      color: var(--primary-color);
      font-weight: 100;
    }

    @keyframes blink {
      0% { opacity: 1; }
      50% { opacity: 0; }
      100% { opacity: 1; }
    }
  `]
})
export class HeroComponent { }
