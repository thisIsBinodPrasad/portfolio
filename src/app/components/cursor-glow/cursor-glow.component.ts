
import { Component, ChangeDetectionStrategy, HostListener, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-cursor-glow',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="cursor-glow"
         [style.left.px]="x"
         [style.top.px]="y"
         [style.opacity]="opacity">
    </div>
  `,
  styles: [`
    :host { pointer-events: none; }
    .cursor-glow {
      position: fixed;
      width: 500px;
      height: 500px;
      border-radius: 50%;
      background: radial-gradient(
        circle,
        rgba(20,184,166,0.055) 0%,
        rgba(20,184,166,0.02)  35%,
        transparent             70%
      );
      pointer-events: none;
      transform: translate(-50%, -50%);
      transition: left 0.22s ease-out, top 0.22s ease-out, opacity 0.5s ease;
      z-index: 1;
      mix-blend-mode: screen;
    }
  `]
})
export class CursorGlowComponent {
  x = -1000;
  y = -1000;
  opacity = 0;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(e: MouseEvent): void {
    if (!isPlatformBrowser(this.platformId)) return;
    this.x = e.clientX;
    this.y = e.clientY;
    this.opacity = 1;
  }

  @HostListener('document:mouseleave')
  onMouseLeave(): void { this.opacity = 0; }
}
