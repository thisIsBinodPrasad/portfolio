
import { Directive, ElementRef, AfterViewInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Directive({
  selector: '[appScrambleText]',
  standalone: true
})
export class ScrambleTextDirective implements AfterViewInit {
  private chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&!';

  constructor(
    private el: ElementRef,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    const original = this.el.nativeElement.textContent as string;

    const observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        this.scramble(original);
        observer.disconnect();
      }
    }, { threshold: 0.5 });

    observer.observe(this.el.nativeElement);
  }

  private scramble(text: string): void {
    let iter = 0;
    const maxIter = text.length * 2;

    const interval = setInterval(() => {
      this.el.nativeElement.textContent = text
        .split('')
        .map((char, i) => {
          if (char === ' ') return ' ';
          if (i < iter)    return char;
          return this.chars[Math.floor(Math.random() * this.chars.length)];
        })
        .join('');

      iter += 0.45;
      if (iter > maxIter) {
        clearInterval(interval);
        this.el.nativeElement.textContent = text;
      }
    }, 38);
  }
}
