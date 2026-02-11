
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule
  ],
  template: `
    <section id="contact" class="section-padding container">
      <div class="glass-card contact-box">
        <h2 class="section-title">Let's Connect <span class="dot">.</span></h2>
        <p class="cta-text">
          Currently open for new opportunities. Whether you have a question or just want to say hi, 
          I'll try my best to get back to you!
        </p>
        
        <div class="links">
          <a mat-raised-button color="primary" href="mailto:prasadbinod490@gmail.com" target="_blank" rel="noopener noreferrer" class="big-btn">
            <mat-icon>email</mat-icon> prasadbinod490@gmail.com
          </a>
          <a mat-stroked-button href="https://linkedin.com/in/binod-prasad-0aa73714a" target="_blank" class="big-btn">
            <mat-icon>link</mat-icon> LinkedIn
          </a>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .contact-box {
      text-align: center;
      max-width: 600px;
      margin: 0 auto;
      padding: 60px 20px;
    }

    .section-title {
      font-size: 2.5rem;
      font-weight: 700;
      margin-bottom: 16px;
      .dot { color: var(--primary-color); }
    }

    .cta-text {
      color: var(--text-muted);
      font-size: 1.1rem;
      margin-bottom: 40px;
      line-height: 1.6;
    }

    .links {
      display: flex;
      justify-content: center;
      gap: 20px;
      flex-wrap: wrap;
    }

    .big-btn {
      padding: 24px 32px;
      font-size: 1.1rem;
    }
  `]
})
export class ContactComponent { }
