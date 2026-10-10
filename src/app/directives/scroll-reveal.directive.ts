
import { Directive, ElementRef, Input, OnInit, Renderer2, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Directive({
    selector: '[appScrollReveal]',
    standalone: true
})
export class ScrollRevealDirective implements OnInit {
    /** Direction: '' or 'up' (default), 'left', 'right' */
    @Input('appScrollReveal') direction: string = '';
    /** Optional stagger delay in milliseconds */
    @Input() appScrollRevealDelay: number = 0;

    constructor(
        private el: ElementRef,
        private renderer: Renderer2,
        @Inject(PLATFORM_ID) private platformId: Object
    ) { }

    ngOnInit() {
        if (!isPlatformBrowser(this.platformId)) return;

        const dir = (this.direction || 'up').toLowerCase();
        let hiddenClass = 'reveal-hidden';
        if (dir === 'left')  hiddenClass = 'reveal-left';
        if (dir === 'right') hiddenClass = 'reveal-right';

        this.renderer.addClass(this.el.nativeElement, hiddenClass);

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        this.renderer.addClass(this.el.nativeElement, 'reveal-visible');
                    }, this.appScrollRevealDelay);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.08 });

        observer.observe(this.el.nativeElement);
    }
}
