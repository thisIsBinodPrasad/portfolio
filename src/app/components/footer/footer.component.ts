
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-footer',
    standalone: true,
    imports: [CommonModule],
    template: `
    <footer class="footer">
      <div class="container">
        <p>© 2026 Binod Prasad. Built with Angular 19 & Material.</p>
      </div>
    </footer>
  `,
    styles: [`
    .footer {
      border-top: 1px solid rgba(255,255,255,0.05);
      padding: 40px 0;
      text-align: center;
      color: var(--text-muted);
      margin-top: 40px;
      
      p { margin: 0; font-size: 0.9rem; }
    }
  `]
})
export class FooterComponent { }
