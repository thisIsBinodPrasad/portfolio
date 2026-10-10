
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section id="contact" class="section-padding container">
      <div class="contact-wrap">
        <!-- Floating decorative orbs behind the card -->
        <div class="deco-orb deco-1"></div>
        <div class="deco-orb deco-2"></div>

        <div class="contact-card glass-card">
          <!-- animated border ring -->
          <div class="border-ring"></div>

          <div class="contact-inner">
            <h2 class="section-title">
              Let's Connect <span class="dot">.</span>
            </h2>
            <p class="cta-text">
              Currently open for new opportunities. Whether you have a question
              or just want to say hi, I'll get back to you!
            </p>

            <div class="links">
              <a
                mat-raised-button
                color="primary"
                href="mailto:prasadbinod490@gmail.com"
                target="_blank"
                rel="noopener noreferrer"
                class="link-btn email-btn">
                <mat-icon>email</mat-icon>
                <span>Email Me</span>
              </a>

              <a
                mat-stroked-button
                href="https://linkedin.com/in/binod-prasad-0aa73714a"
                target="_blank"
                rel="noopener noreferrer"
                class="link-btn linkedin-btn">
                <mat-icon>link</mat-icon>
                <span>LinkedIn</span>
              </a>

              <a
                mat-stroked-button
                href="https://github.com/thisIsBinodPrasad"
                target="_blank"
                rel="noopener noreferrer"
                class="link-btn github-btn">
                <mat-icon>code</mat-icon>
                <span>GitHub</span>
              </a>
            </div>

            <p class="footer-hint">
              Response within 24 hours · Always happy to collaborate
            </p>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .contact-wrap {
      position: relative;
      max-width: 680px;
      margin: 0 auto;
    }

    /* Floating background orbs */
    .deco-orb {
      position: absolute;
      border-radius: 50%;
      filter: blur(80px);
      pointer-events: none;
      animation: decoFloat 12s ease-in-out infinite alternate;
    }

    .deco-1 {
      width: 320px; height: 320px;
      top: -80px; left: -100px;
      background: radial-gradient(circle, rgba(20,184,166,0.25), transparent 70%);
      animation-delay: 0s;
    }

    .deco-2 {
      width: 280px; height: 280px;
      bottom: -60px; right: -80px;
      background: radial-gradient(circle, rgba(236,72,153,0.22), transparent 70%);
      animation-delay: -5s;
    }

    @keyframes decoFloat {
      0%   { transform: translate(0, 0) scale(1); }
      50%  { transform: translate(30px, -20px) scale(1.1); }
      100% { transform: translate(-20px, 30px) scale(0.95); }
    }

    /* ── Card ── */
    .contact-card {
      position: relative;
      overflow: visible;
      animation: cardReveal 0.9s cubic-bezier(0.22, 1, 0.36, 1) both;
    }

    @keyframes cardReveal {
      from { opacity: 0; transform: translateY(40px) scale(0.97); }
      to   { opacity: 1; transform: translateY(0) scale(1); }
    }

    .border-ring {
      position: absolute;
      inset: -2px;
      border-radius: 18px;
      background: conic-gradient(from 0deg, #14b8a6, #ec4899, #6366f1, #38bdf8, #14b8a6);
      animation: rotateBorderRing 6s linear infinite;
      z-index: 0;
      mask: radial-gradient(farthest-side, transparent calc(100% - 2px), white calc(100% - 2px));
      -webkit-mask: radial-gradient(farthest-side, transparent calc(100% - 2px), white calc(100% - 2px));
      opacity: 0.7;
    }

    @keyframes rotateBorderRing {
      from { transform: rotate(0deg); }
      to   { transform: rotate(360deg); }
    }

    .contact-inner {
      position: relative;
      z-index: 1;
      text-align: center;
      padding: 20px;
    }

    /* ── Section Title ── */
    .section-title {
      font-size: 2.6rem;
      font-weight: 700;
      margin-bottom: 16px;
      background: linear-gradient(135deg, var(--text-color) 40%, var(--primary-color));
      -webkit-background-clip: text;
      background-clip: text;
      -webkit-text-fill-color: transparent;
      animation: titleShimmer 4s ease-in-out infinite;

      .dot { -webkit-text-fill-color: var(--primary-color); }
    }

    @keyframes titleShimmer {
      0%, 100% { filter: drop-shadow(0 0 8px rgba(20,184,166,0.25)); }
      50%       { filter: drop-shadow(0 0 20px rgba(236,72,153,0.35)); }
    }

    .cta-text {
      color: var(--text-muted);
      font-size: 1.08rem;
      margin-bottom: 40px;
      line-height: 1.65;
      max-width: 480px;
      margin-left: auto;
      margin-right: auto;
    }

    /* ── Link Buttons ── */
    .links {
      display: flex;
      justify-content: center;
      gap: 18px;
      flex-wrap: wrap;
      margin-bottom: 28px;
    }

    .link-btn {
      position: relative;
      overflow: hidden;
      padding: 14px 28px !important;
      font-size: 1rem !important;
      font-weight: 600 !important;
      display: inline-flex !important;
      align-items: center;
      gap: 8px;
      transition: transform 0.25s ease, box-shadow 0.3s ease !important;

      mat-icon { font-size: 20px; }

      &::after {
        content: '';
        position: absolute;
        top: -50%; left: -80%;
        width: 55%; height: 200%;
        background: rgba(255,255,255,0.14);
        transform: skewX(-20deg);
        transition: left 0.5s ease;
        pointer-events: none;
      }

      &:hover {
        transform: translateY(-3px);
        &::after { left: 160%; }
      }
    }

    .email-btn:hover {
      box-shadow: 0 0 28px rgba(20, 184, 166, 0.5) !important;
    }

    .linkedin-btn:hover {
      box-shadow: 0 0 22px rgba(10, 102, 194, 0.5) !important;
      border-color: #0a66c2 !important;
      color: #0a66c2 !important;
    }

    .github-btn:hover {
      box-shadow: 0 0 22px rgba(99, 102, 241, 0.5) !important;
      border-color: #6366f1 !important;
      color: #6366f1 !important;
    }

    .footer-hint {
      font-size: 0.8rem;
      color: var(--text-muted);
      opacity: 0.7;
      animation: hintFade 2s ease-in-out infinite alternate;
    }

    @keyframes hintFade {
      from { opacity: 0.5; }
      to   { opacity: 0.85; }
    }
  `]
})
export class ContactComponent {}
