
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-footer',
    standalone: true,
    imports: [CommonModule],
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
    <footer class="footer">
      <!-- Wave SVG -->
      <div class="wave-top">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 56" preserveAspectRatio="none">
          <path
            fill="rgba(20,184,166,0.06)"
            d="M0,28 C240,56 480,0 720,28 C960,56 1200,0 1440,28 L1440,56 L0,56 Z"/>
          <path
            fill="rgba(236,72,153,0.04)"
            d="M0,42 C360,14 720,56 1080,28 C1260,14 1380,42 1440,36 L1440,56 L0,56 Z"/>
        </svg>
      </div>

      <div class="footer-body container">
        <!-- Logo -->
        <div class="footer-logo">
          <span class="logo-name">Binod</span><span class="logo-dot">.</span><span class="logo-initial">P</span>
        </div>

        <!-- Tech stack pills -->
        <div class="tech-row">
          <span class="tech-pill">Angular 21</span>
          <span class="tech-pill">TypeScript</span>
          <span class="tech-pill">.NET Core</span>
          <span class="tech-pill">Node.js</span>
          <span class="tech-pill">Python</span>
        </div>

        <!-- Copyright -->
        <p class="copyright">
          © 2026 <span class="copy-name">Binod Prasad</span> · Built with
          <span class="heart">♥</span> using Angular 21 & Material
        </p>
      </div>
    </footer>
  `,
    styles: [`
    .footer {
      position: relative;
      border-top: 1px solid rgba(255,255,255,0.04);
      margin-top: 40px;
      overflow: hidden;
      animation: footerReveal 0.8s cubic-bezier(0.22, 1, 0.36, 1) both;
    }

    @keyframes footerReveal {
      from { opacity: 0; transform: translateY(24px); }
      to   { opacity: 1; transform: translateY(0); }
    }

    /* Wave */
    .wave-top {
      position: absolute;
      top: 0; left: 0; right: 0;
      height: 56px;
      svg { width: 100%; height: 100%; display: block; }
    }

    /* Body */
    .footer-body {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 20px;
      padding-top: 48px;
      padding-bottom: 36px;
      text-align: center;
    }

    /* Logo */
    .footer-logo {
      font-size: 1.6rem;
      font-weight: 800;
      letter-spacing: -0.5px;
      animation: logoGlow 4s ease-in-out infinite alternate;

      .logo-name  { color: var(--text-color); }
      .logo-dot   { color: var(--accent-color); }
      .logo-initial { color: var(--primary-color); }
    }

    @keyframes logoGlow {
      0%   { filter: drop-shadow(0 0 0px transparent); }
      100% { filter: drop-shadow(0 0 14px rgba(20,184,166,0.4)); }
    }

    /* Tech pills */
    .tech-row {
      display: flex;
      gap: 10px;
      flex-wrap: wrap;
      justify-content: center;
    }

    .tech-pill {
      font-size: 0.75rem;
      font-weight: 600;
      padding: 4px 12px;
      border-radius: 20px;
      background: rgba(20,184,166,0.08);
      border: 1px solid rgba(20,184,166,0.2);
      color: var(--text-muted);
      transition: background 0.3s, color 0.3s, border-color 0.3s, transform 0.2s;
      animation: pillFade 0.6s both;

      &:nth-child(1) { animation-delay: 0.1s; }
      &:nth-child(2) { animation-delay: 0.2s; }
      &:nth-child(3) { animation-delay: 0.3s; }
      &:nth-child(4) { animation-delay: 0.4s; }
      &:nth-child(5) { animation-delay: 0.5s; }

      &:hover {
        background: rgba(20,184,166,0.18);
        border-color: var(--primary-color);
        color: var(--primary-color);
        transform: translateY(-2px);
      }
    }

    @keyframes pillFade {
      from { opacity: 0; transform: translateY(10px); }
      to   { opacity: 1; transform: translateY(0); }
    }

    /* Copyright */
    .copyright {
      margin: 0;
      font-size: 0.88rem;
      color: var(--text-muted);

      .copy-name {
        background: linear-gradient(135deg, var(--primary-color), var(--accent-color));
        -webkit-background-clip: text;
        background-clip: text;
        -webkit-text-fill-color: transparent;
        font-weight: 600;
      }

      .heart {
        color: var(--accent-color);
        display: inline-block;
        animation: heartBeat 1.4s ease-in-out infinite;
      }
    }

    @keyframes heartBeat {
      0%, 100% { transform: scale(1); }
      14%       { transform: scale(1.3); }
      28%       { transform: scale(1); }
      42%       { transform: scale(1.2); }
      70%       { transform: scale(1); }
    }
  `]
})
export class FooterComponent {}
