import { Component, ElementRef, HostListener, NgZone, OnDestroy, OnInit, ViewChild, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  baseAlpha: number;
  color: string;
  pulseOffset: number;
}

@Component({
  selector: 'app-animated-bg',
  standalone: true,
  imports: [CommonModule],
  template: `
    <canvas #bgCanvas class="animated-canvas"></canvas>
    <div class="glow-orb orb-1"></div>
    <div class="glow-orb orb-2"></div>
    <div class="glow-orb orb-3"></div>
    <div class="glow-orb orb-4"></div>
    <div class="glow-orb orb-5"></div>
    <div class="aurora-layer aurora-1"></div>
    <div class="aurora-layer aurora-2"></div>
    <div class="grid-overlay"></div>
    <div class="floating-shape shape-1"></div>
    <div class="floating-shape shape-2"></div>
    <div class="floating-shape shape-3"></div>
    <div class="floating-shape shape-4"></div>
  `,
  styles: [`
    :host {
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      pointer-events: none;
      z-index: -1;
      overflow: hidden;
    }

    .animated-canvas {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }

    .glow-orb {
      position: absolute;
      border-radius: 50%;
      filter: blur(90px);
      animation: floatOrb 20s ease-in-out infinite alternate;
      will-change: transform;
    }

    .orb-1 {
      width: 520px;
      height: 520px;
      background: radial-gradient(circle, rgba(20, 184, 166, 0.65), transparent 70%);
      top: -150px;
      left: -120px;
      opacity: 0.28;
    }

    .orb-2 {
      width: 620px;
      height: 620px;
      background: radial-gradient(circle, rgba(236, 72, 153, 0.55), transparent 70%);
      bottom: -180px;
      right: -120px;
      animation-delay: -6s;
      animation-duration: 24s;
      opacity: 0.22;
    }

    .orb-3 {
      width: 400px;
      height: 400px;
      background: radial-gradient(circle, rgba(99, 102, 241, 0.5), transparent 70%);
      top: 38%;
      left: 48%;
      transform: translate(-50%, -50%);
      animation-delay: -12s;
      animation-duration: 18s;
      opacity: 0.18;
    }

    .orb-4 {
      width: 380px;
      height: 380px;
      background: radial-gradient(circle, rgba(56, 189, 248, 0.5), transparent 70%);
      top: 15%;
      right: 10%;
      animation-delay: -4s;
      animation-duration: 26s;
      opacity: 0.2;
    }

    .orb-5 {
      width: 320px;
      height: 320px;
      background: radial-gradient(circle, rgba(168, 85, 247, 0.5), transparent 70%);
      bottom: 18%;
      left: 8%;
      animation-delay: -9s;
      animation-duration: 16s;
      opacity: 0.18;
    }

    .aurora-layer {
      position: absolute;
      width: 250%;
      height: 280px;
      left: -75%;
      border-radius: 60%;
      filter: blur(70px);
      will-change: transform;
    }

    .aurora-1 {
      top: -80px;
      background: linear-gradient(90deg, transparent 5%, rgba(20,184,166,0.12) 30%, rgba(99,102,241,0.1) 60%, transparent 95%);
      animation: auroraMove 14s ease-in-out infinite alternate;
      opacity: 1;
    }

    .aurora-2 {
      bottom: -80px;
      background: linear-gradient(90deg, transparent 5%, rgba(236,72,153,0.1) 30%, rgba(168,85,247,0.1) 65%, transparent 95%);
      animation: auroraMove 18s ease-in-out infinite alternate-reverse;
      opacity: 0.8;
    }

    .grid-overlay {
      position: absolute;
      inset: 0;
      background-image: radial-gradient(circle, rgba(255,255,255,0.055) 1px, transparent 1px);
      background-size: 52px 52px;
      animation: gridPulse 10s ease-in-out infinite alternate;
    }

    .floating-shape {
      position: absolute;
      animation: floatShape 22s ease-in-out infinite alternate;
      will-change: transform;
    }

    .shape-1 {
      width: 140px;
      height: 140px;
      top: 12%;
      right: 7%;
      border: 1.5px solid rgba(20, 184, 166, 0.18);
      border-radius: 20px;
      transform: rotate(15deg);
      animation-duration: 20s;
      opacity: 0.7;
    }

    .shape-2 {
      width: 90px;
      height: 90px;
      bottom: 22%;
      left: 5%;
      border: 1.5px solid rgba(236, 72, 153, 0.18);
      border-radius: 50%;
      animation-delay: -5s;
      animation-duration: 25s;
      opacity: 0.7;
    }

    .shape-3 {
      width: 70px;
      height: 70px;
      top: 58%;
      right: 22%;
      border: 1.5px solid rgba(99, 102, 241, 0.2);
      animation-delay: -10s;
      animation-duration: 28s;
      opacity: 0.6;
      transform: rotate(45deg);
    }

    .shape-4 {
      width: 55px;
      height: 55px;
      top: 75%;
      right: 40%;
      border: 1.5px solid rgba(56, 189, 248, 0.18);
      border-radius: 12px;
      animation-delay: -15s;
      animation-duration: 18s;
      opacity: 0.6;
      transform: rotate(30deg);
    }

    @keyframes floatOrb {
      0%   { transform: translate(0, 0) scale(1); }
      33%  { transform: translate(50px, 30px) scale(1.1); }
      66%  { transform: translate(-30px, 60px) scale(0.95); }
      100% { transform: translate(20px, -40px) scale(1.05); }
    }

    @keyframes auroraMove {
      0%   { transform: translateX(0) scaleX(1);     opacity: 0.7; }
      50%  { transform: translateX(12%) scaleX(1.08); opacity: 1; }
      100% { transform: translateX(-8%) scaleX(0.96); opacity: 0.8; }
    }

    @keyframes gridPulse {
      0%   { opacity: 0.6; background-size: 52px 52px; }
      100% { opacity: 1;   background-size: 56px 56px; }
    }

    @keyframes floatShape {
      0%   { transform: rotate(15deg) translateY(0)   scale(1);    opacity: 0.4; }
      40%  { transform: rotate(30deg) translateY(-25px) scale(1.05); opacity: 0.7; }
      100% { transform: rotate(0deg)  translateY(18px)  scale(0.95); opacity: 0.5; }
    }
  `]
})
export class AnimatedBgComponent implements OnInit, OnDestroy {
  @ViewChild('bgCanvas', { static: true }) canvasRef!: ElementRef<HTMLCanvasElement>;

  private ctx!: CanvasRenderingContext2D | null;
  private animationFrameId: number = 0;
  private particles: Particle[] = [];
  private mouse = { x: -1000, y: -1000, radius: 180 };
  private colors = ['#14b8a6', '#ec4899', '#6366f1', '#38bdf8', '#a855f7', '#22d3ee'];
  private time = 0;
  private lastFrameTime = 0;
  private mobile = false;
  // Pre-computed squared thresholds — avoids Math.sqrt in the hot path
  private readonly mouseRadiusSq = 180 * 180;
  private readonly connectDistSq = 145 * 145;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private ngZone: NgZone
  ) {}

  ngOnInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    const canvas = this.canvasRef.nativeElement;
    this.ctx = canvas.getContext('2d');
    this.mobile = window.innerWidth < 768;
    this.resizeCanvas();
    this.initParticles();
    // Run entirely outside Angular zone — prevents change detection on every rAF tick
    this.ngZone.runOutsideAngular(() => this.animate(0));
  }

  ngOnDestroy(): void {
    if (this.animationFrameId) cancelAnimationFrame(this.animationFrameId);
  }

  // Pause canvas when tab is backgrounded, resume when visible again
  @HostListener('document:visibilitychange')
  onVisibilityChange(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    if (document.hidden) {
      if (this.animationFrameId) {
        cancelAnimationFrame(this.animationFrameId);
        this.animationFrameId = 0;
      }
    } else if (!this.animationFrameId) {
      this.ngZone.runOutsideAngular(() => this.animate(0));
    }
  }

  @HostListener('window:resize')
  onResize(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    this.mobile = window.innerWidth < 768;
    this.resizeCanvas();
    this.initParticles();
  }

  @HostListener('window:mousemove', ['$event'])
  onMouseMove(event: MouseEvent): void {
    if (!isPlatformBrowser(this.platformId)) return;
    this.mouse.x = event.clientX;
    this.mouse.y = event.clientY;
  }

  @HostListener('window:mouseleave')
  onMouseLeave(): void {
    this.mouse.x = -1000;
    this.mouse.y = -1000;
  }

  private resizeCanvas(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    const canvas = this.canvasRef.nativeElement;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  private initParticles(): void {
    const canvas = this.canvasRef.nativeElement;
    const count = Math.min(Math.floor((canvas.width * canvas.height) / 10000), 95);
    this.particles = [];
    for (let i = 0; i < count; i++) {
      this.particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.65,
        vy: (Math.random() - 0.5) * 0.65,
        radius: Math.random() * 2.4 + 0.7,
        baseAlpha: Math.random() * 0.45 + 0.18,
        color: this.colors[Math.floor(Math.random() * this.colors.length)],
        pulseOffset: Math.random() * Math.PI * 2
      });
    }
  }

  private animate = (timestamp: number): void => {
    if (!this.ctx) return;

    // Limit to ~30fps on mobile to halve GPU load while keeping all animations
    if (this.mobile) {
      const elapsed = timestamp - this.lastFrameTime;
      if (elapsed < 33) {
        this.animationFrameId = requestAnimationFrame(this.animate);
        return;
      }
      this.lastFrameTime = timestamp - (elapsed % 33);
    }

    const canvas = this.canvasRef.nativeElement;
    this.ctx.clearRect(0, 0, canvas.width, canvas.height);
    this.time += 0.012;

    for (let i = 0; i < this.particles.length; i++) {
      const p = this.particles[i];

      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0 || p.x > canvas.width)  p.vx *= -1;
      if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

      // Squared distance check — skips sqrt for the ~99% of particles outside radius
      const dx = this.mouse.x - p.x;
      const dy = this.mouse.y - p.y;
      const distSq = dx * dx + dy * dy;
      if (distSq < this.mouseRadiusSq && distSq > 0) {
        const dist = Math.sqrt(distSq);
        const force = (this.mouse.radius - dist) / this.mouse.radius;
        p.x -= (dx / dist) * force * 2.2;
        p.y -= (dy / dist) * force * 2.2;
      }

      const pulseAlpha = p.baseAlpha + Math.sin(this.time * 1.4 + p.pulseOffset) * 0.14;

      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      this.ctx.fillStyle = p.color;
      this.ctx.globalAlpha = Math.max(0.05, pulseAlpha);
      this.ctx.fill();

      for (let j = i + 1; j < this.particles.length; j++) {
        const p2 = this.particles[j];
        const pDx = p.x - p2.x;
        const pDy = p.y - p2.y;
        const pDistSq = pDx * pDx + pDy * pDy;

        if (pDistSq < this.connectDistSq) {
          const pDist = Math.sqrt(pDistSq);
          this.ctx.beginPath();
          this.ctx.moveTo(p.x, p.y);
          this.ctx.lineTo(p2.x, p2.y);
          this.ctx.strokeStyle = p.color;
          this.ctx.globalAlpha = (1 - pDist / 145) * 0.18;
          this.ctx.lineWidth = 0.75;
          this.ctx.stroke();
        }
      }
    }

    this.ctx.globalAlpha = 1;
    this.animationFrameId = requestAnimationFrame(this.animate);
  };
}
