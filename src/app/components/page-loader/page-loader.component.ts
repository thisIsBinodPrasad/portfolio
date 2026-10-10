
import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-page-loader',
  standalone: true,
  imports: [CommonModule],
  template: `
    @if (visible) {
      <div class="loader-wrap" [class.fade-out]="fadeOut">
        <div class="bg-orb orb1"></div>
        <div class="bg-orb orb2"></div>
        <div class="loader-content">
          <div class="logo-anim">
            <span class="l l-b">B</span>
            <span class="l l-i">i</span>
            <span class="l l-n">n</span>
            <span class="l l-o">o</span>
            <span class="l l-d">d</span>
            <span class="l l-dot">.</span>
            <span class="l l-p">P</span>
          </div>
          <div class="loader-track">
            <div class="loader-fill" [style.width.%]="progress">
              <span class="fill-glow"></span>
            </div>
          </div>
          <span class="loader-label">Crafting your experience</span>
        </div>
      </div>
    }
  `,
  styles: [`
    .loader-wrap {
      position: fixed;
      inset: 0;
      z-index: 10000;
      background: #080e1a;
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
      transition: opacity 0.8s ease, transform 0.8s cubic-bezier(0.4, 0, 0.2, 1);

      &.fade-out {
        opacity: 0;
        transform: scale(1.06);
        pointer-events: none;
      }
    }

    .bg-orb {
      position: absolute;
      border-radius: 50%;
      filter: blur(90px);
      pointer-events: none;
      animation: orbDrift 8s ease-in-out infinite alternate;
    }

    .orb1 {
      width: 500px; height: 500px;
      background: rgba(20, 184, 166, 0.07);
      top: -20%; left: -15%;
    }

    .orb2 {
      width: 420px; height: 420px;
      background: rgba(236, 72, 153, 0.07);
      bottom: -20%; right: -15%;
      animation-delay: -4s;
    }

    @keyframes orbDrift {
      from { transform: translate(0, 0) scale(1); }
      to   { transform: translate(50px, 40px) scale(1.1); }
    }

    .loader-content {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 36px;
      position: relative;
      z-index: 1;
    }

    .logo-anim {
      font-size: 4.5rem;
      font-weight: 800;
      letter-spacing: -2px;
      font-family: 'Outfit', 'Inter', sans-serif;
    }

    .l {
      display: inline-block;
      opacity: 0;
      animation: letterPop 0.65s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
    }

    .l-b   { color: #f8fafc; animation-delay: 0.04s; }
    .l-i   { color: #f8fafc; animation-delay: 0.11s; }
    .l-n   { color: #f8fafc; animation-delay: 0.18s; }
    .l-o   { color: #f8fafc; animation-delay: 0.25s; }
    .l-d   { color: #f8fafc; animation-delay: 0.32s; }
    .l-dot { color: #ec4899; animation-delay: 0.41s; }
    .l-p   { color: #14b8a6; animation-delay: 0.50s; }

    @keyframes letterPop {
      from { opacity: 0; transform: translateY(-30px) rotate(-8deg) scale(0.8); }
      to   { opacity: 1; transform: translateY(0) rotate(0) scale(1); }
    }

    .loader-track {
      width: 240px;
      height: 2px;
      background: rgba(255,255,255,0.07);
      border-radius: 2px;
      overflow: visible;
      position: relative;
    }

    .loader-fill {
      height: 100%;
      background: linear-gradient(90deg, #14b8a6, #ec4899, #6366f1);
      border-radius: 2px;
      transition: width 0.04s linear;
      position: relative;
    }

    .fill-glow {
      position: absolute;
      right: -2px;
      top: 50%;
      transform: translateY(-50%);
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: white;
      box-shadow: 0 0 10px rgba(255,255,255,0.9), 0 0 20px rgba(20,184,166,0.8);
    }

    .loader-label {
      font-size: 0.7rem;
      color: rgba(255,255,255,0.28);
      text-transform: uppercase;
      letter-spacing: 3.5px;
      animation: labelSlide 0.9s ease 0.6s both;
    }

    @keyframes labelSlide {
      from { opacity: 0; transform: translateY(10px); }
      to   { opacity: 1; transform: translateY(0); }
    }
  `]
})
export class PageLoaderComponent implements OnInit {
  visible = true;
  fadeOut = false;
  progress = 0;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit(): void {
    if (!isPlatformBrowser(this.platformId)) {
      this.visible = false;
      return;
    }
    let p = 0;
    const interval = setInterval(() => {
      p += p < 55 ? 4 : p < 80 ? 2 : p < 93 ? 1 : 0.5;
      this.progress = Math.min(p, 99);
      if (p >= 100) {
        clearInterval(interval);
        this.progress = 100;
        setTimeout(() => {
          this.fadeOut = true;
          setTimeout(() => { this.visible = false; }, 820);
        }, 180);
      }
    }, 22);
  }
}
