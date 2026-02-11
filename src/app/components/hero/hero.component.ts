
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
        <h1 class="greeting">Hi, I'm <span class="text-gradient">Binod Prasad</span></h1>
        <h2 class="subtitle">
          <span [appTypingEffect]="['Full Stack Developer', 'Angular Expert', 'Gen AI Enthusiast', '.NET Core Developer']"></span>
        </h2>
        <p class="bio">
          I build scalable web solutions using Angular, .NET Core, and Node.js. 
          Currently transforming ideas into reality at Deloitte.
        </p>
        <div class="actions">
          <a mat-raised-button color="primary" href="#projects">View My Work</a>
          <a mat-stroked-button href="assets/Prasad_BinodCV.pdf" target="_blank">
            <mat-icon>download</mat-icon> Download Resume
          </a>
        </div>
      </div>
      <div class="visual">
        <div class="profile-container">
            <img src="assets/images/profile.jpg" alt="Binod Prasad" class="profile-img">
            <div class="orbit-circle"></div>
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

    .content {
      flex: 1;
      max-width: 600px;
    }

    .greeting {
      font-size: 4rem;
      font-weight: 800;
      line-height: 1.1;
      margin-bottom: 16px;
      
      @media (max-width: 768px) { font-size: 3rem; }
    }

    .subtitle {
      font-size: 1.5rem;
      color: var(--text-muted);
      margin-bottom: 24px;
      font-weight: 500;
    }

    .bio {
      font-size: 1.1rem;
      line-height: 1.6;
      color: var(--text-color);
      margin-bottom: 32px;
      opacity: 0.9;
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
      width: 350px;
      height: 350px;
      
      .profile-img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 50%;
        position: relative;
        z-index: 2;
        border: 4px solid var(--surface-color);
        box-shadow: 0 20px 60px rgba(20, 184, 166, 0.2);
      }

      .orbit-circle {
        position: absolute;
        top: -10px;
        left: -10px;
        right: -10px;
        bottom: -10px;
        border-radius: 50%;
        border: 2px dashed var(--primary-color);
        z-index: 1;
        animation: spin 20s linear infinite;
      }
    }

    @keyframes spin {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
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
