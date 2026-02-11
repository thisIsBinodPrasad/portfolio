
import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
    selector: '[appTilt]',
    standalone: true
})
export class TiltDirective {
    constructor(private el: ElementRef, private renderer: Renderer2) { }

    @HostListener('mousemove', ['$event'])
    onMouseMove(e: MouseEvent) {
        const el = this.el.nativeElement;
        const rect = el.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        // Calculate rotation (max 10 degrees)
        const rotateX = ((y - centerY) / centerY) * -10;
        const rotateY = ((x - centerX) / centerX) * 10;

        this.renderer.setStyle(el, 'transform',
            `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`);
    }

    @HostListener('mouseleave')
    onMouseLeave() {
        this.renderer.setStyle(this.el.nativeElement, 'transform',
            'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)');
    }
}
