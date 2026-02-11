
import { Directive, ElementRef, Input, OnInit, OnDestroy, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Directive({
    selector: '[appTypingEffect]',
    standalone: true
})
export class TypingEffectDirective implements OnInit, OnDestroy {
    @Input('appTypingEffect') words: string[] = [];
    @Input() typeSpeed: number = 100;
    @Input() deleteSpeed: number = 50;
    @Input() delay: number = 2000;

    private txt = '';
    private wordIndex = 0;
    private isDeleting = false;
    private timer: any;

    constructor(private el: ElementRef, @Inject(PLATFORM_ID) private platformId: Object) { }

    ngOnInit() {
        if (isPlatformBrowser(this.platformId)) {
            this.type();
        }
    }

    ngOnDestroy() {
        clearTimeout(this.timer);
    }

    type() {
        const current = this.wordIndex % this.words.length;
        const fullTxt = this.words[current];

        if (this.isDeleting) {
            this.txt = fullTxt.substring(0, this.txt.length - 1);
        } else {
            this.txt = fullTxt.substring(0, this.txt.length + 1);
        }

        this.el.nativeElement.innerHTML = `<span class="wrap">${this.txt}</span><span class="cursor">|</span>`;

        let typeSpeed = this.typeSpeed;

        if (this.isDeleting) {
            typeSpeed = this.deleteSpeed;
        }

        if (!this.isDeleting && this.txt === fullTxt) {
            typeSpeed = this.delay;
            this.isDeleting = true;
        } else if (this.isDeleting && this.txt === '') {
            this.isDeleting = false;
            this.wordIndex++;
            typeSpeed = 500;
        }

        this.timer = setTimeout(() => this.type(), typeSpeed);
    }
}
