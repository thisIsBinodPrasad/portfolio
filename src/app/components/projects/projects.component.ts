
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { ScrollRevealDirective } from '../../directives/scroll-reveal.directive';
import { TiltDirective } from '../../directives/tilt.directive';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ProjectDetailsDialogComponent } from '../project-details-dialog/project-details-dialog.component';

export interface Project {
  title: string;
  description: string;
  tags: string[];
  link?: string;
  image?: string;
  role?: string;
  featured?: boolean;
  icon?: string;
  color?: string;
  highlights?: string[];
  category?: string;
}

type FilterTab = 'All' | 'Frontend' | 'Fullstack' | 'AI & Data' | 'Enterprise';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatChipsModule, MatIconModule,
            ScrollRevealDirective, MatDialogModule, TiltDirective],
  template: `
    <section id="projects" class="section-padding container">
      <h2 class="section-title">
        Featured Work<span class="dot">.</span>
        <span class="title-underline"></span>
      </h2>

      <!-- Filter Tabs -->
      <div class="filter-tabs">
        @for (tab of tabs; track tab) {
          <button class="tab-btn" [class.active]="activeTab === tab" (click)="setTab(tab)">
            {{ tab }}
            @if (activeTab === tab) { <span class="tab-pip"></span> }
          </button>
        }
      </div>

      <div class="featured-grid">
        @for (p of filteredFeatured; track p.title; let i = $index) {
          <mat-card class="project-card featured glass-card"
                    [class.zigtravel-card]="p.title === 'ZigTravel'"
                    [appScrollReveal]="i % 2 === 0 ? 'left' : 'right'"
                    [appScrollRevealDelay]="i * 100"
                    appTilt>
            <div class="project-image-wrapper">
              @if (p.image) {
                <img [src]="p.image" [alt]="p.title" class="project-img">
              } @else {
                <div class="project-preview-placeholder" [class]="p.title === 'ZigTravel' ? 'zigtravel-bg' : 'resume-master-bg'">
                  <mat-icon>{{ p.title === 'ZigTravel' ? 'flight_takeoff' : 'description' }}</mat-icon>
                  <span>{{ p.title }}</span>
                </div>
              }
              <div class="overlay">
                <button mat-fab extended color="accent" (click)="openProjectDetails(p)">
                  <mat-icon>visibility</mat-icon> Details
                </button>
                <a mat-fab extended color="primary" [href]="p.link" target="_blank">
                  <mat-icon>open_in_new</mat-icon> {{ p.link?.includes('github') ? 'Live Demo' : 'Visit Site' }}
                </a>
              </div>
            </div>
            <mat-card-content>
              <div class="project-header">
                <h3 class="highlight">
                  {{ p.title }}
                  @if (p.title === 'ZigTravel') { <span class="new-badge">NEW</span> }
                </h3>
                <span class="role-badge">{{ p.role }}</span>
              </div>
              <p>{{ p.description }}</p>
              <span class="cat-chip">{{ p.category }}</span>
            </mat-card-content>
          </mat-card>
        }

        @if (filteredFeatured.length === 0) {
          <div class="empty-state">
            <mat-icon>search_off</mat-icon>
            <p>No featured projects in this category</p>
          </div>
        }
      </div>

      <h3 class="sub-title">More Projects</h3>
      <div class="grid">
        @for (project of filteredOther; track project.title; let i = $index) {
          <mat-card class="glass-card compact-card"
                    appScrollReveal
                    [appScrollRevealDelay]="i * 80"
                    [style.border-top-color]="project.color">
            <mat-card-header>
              <div mat-card-avatar class="project-icon" [style.background-color]="project.color + '20'">
                <mat-icon [style.color]="project.color">{{ project.icon }}</mat-icon>
              </div>
              <mat-card-title>{{ project.title }}</mat-card-title>
              <mat-card-subtitle>{{ project.role }}</mat-card-subtitle>
            </mat-card-header>
            <mat-card-content>
              <p>{{ project.description }}</p>
              <mat-chip-set>
                @for (tag of project.tags; track tag) {
                  <mat-chip>{{ tag }}</mat-chip>
                }
              </mat-chip-set>
            </mat-card-content>
            <mat-card-actions align="end">
              <a class="arrow-link" href="javascript:void(0)" (click)="openProjectDetails(project)">
                <span>View Details</span>
                <mat-icon class="arrow-icon">arrow_forward</mat-icon>
              </a>
            </mat-card-actions>
          </mat-card>
        }

        @if (filteredOther.length === 0 && activeTab !== 'All') {
          <p class="no-results">No projects match this filter.</p>
        }
      </div>
    </section>
  `,
  styles: [`
    .section-title {
      font-size: 2.5rem;
      font-weight: 700;
      margin-bottom: 32px;
      position: relative;
      display: inline-block;

      .dot { color: var(--primary-color); }

      .title-underline {
        position: absolute;
        bottom: -10px; left: 0;
        height: 3px; width: 0;
        background: linear-gradient(90deg, var(--primary-color), var(--accent-color));
        border-radius: 2px;
        animation: growLine 1s cubic-bezier(0.22, 1, 0.36, 1) 0.4s forwards;
      }
    }

    @keyframes growLine { to { width: 100%; } }

    /* ── Filter Tabs ── */
    .filter-tabs {
      display: flex;
      gap: 10px;
      flex-wrap: wrap;
      margin-bottom: 40px;
    }

    .tab-btn {
      position: relative;
      padding: 8px 20px;
      border-radius: 24px;
      border: 1px solid rgba(255,255,255,0.1);
      background: rgba(255,255,255,0.03);
      color: var(--text-muted);
      font-size: 0.85rem;
      font-weight: 500;
      cursor: pointer;
      transition: background 0.3s, color 0.3s, border-color 0.3s, transform 0.2s;
      overflow: hidden;
      font-family: 'Inter', sans-serif;

      &:hover {
        background: rgba(20,184,166,0.07);
        color: var(--text-color);
        border-color: rgba(20,184,166,0.3);
        transform: translateY(-1px);
      }

      &.active {
        background: rgba(20,184,166,0.12);
        color: var(--primary-color);
        border-color: rgba(20,184,166,0.45);
        box-shadow: 0 0 14px rgba(20,184,166,0.18);
      }

      .tab-pip {
        display: inline-block;
        width: 5px; height: 5px;
        border-radius: 50%;
        background: var(--primary-color);
        margin-left: 6px;
        vertical-align: middle;
        animation: pipPop 0.3s cubic-bezier(0.34, 1.56, 0.64, 1) both;
      }
    }

    @keyframes pipPop {
      from { transform: scale(0); }
      to   { transform: scale(1); }
    }

    .sub-title {
      font-size: 1.8rem;
      margin: 60px 0 30px;
      color: var(--text-muted);
    }

    .featured-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 32px;
      min-height: 200px;

      @media (max-width: 960px) { grid-template-columns: 1fr; }
    }

    .project-card.featured {
      overflow: hidden;
      padding: 0;
      border: 1px solid var(--glass-border);
      transition: transform 0.38s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.38s ease, border-color 0.38s ease;
      position: relative;
      animation: cardIn 0.5s cubic-bezier(0.22, 1, 0.36, 1) both;

      &::before {
        content: '';
        position: absolute;
        top: -50%; left: -80%;
        width: 50%; height: 200%;
        background: linear-gradient(90deg, transparent, rgba(255,255,255,0.04), transparent);
        transform: skewX(-20deg);
        transition: left 0.65s ease;
        z-index: 10;
        pointer-events: none;
      }

      &:hover {
        transform: translateY(-8px);
        box-shadow: 0 20px 50px rgba(0,0,0,0.3), 0 0 24px rgba(20, 184, 166, 0.18);
        border-color: rgba(20, 184, 166, 0.45);
        &::before { left: 160%; }
      }

      .project-image-wrapper {
        position: relative;
        height: 280px;
        overflow: hidden;

        .project-img {
          width: 100%; height: 100%;
          object-fit: cover;
          transition: transform 0.55s ease;
        }

        .overlay {
          position: absolute;
          inset: 0;
          background: rgba(0,0,0,0.65);
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 16px;
          opacity: 0;
          transition: opacity 0.35s ease;
        }

        &:hover {
          .project-img { transform: scale(1.08); }
          .overlay { opacity: 1; }
        }
      }

      mat-card-content {
        padding: 22px 24px;

        h3 { font-size: 1.45rem; margin: 0; color: var(--text-color); }

        .project-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 10px;
          flex-wrap: wrap;
          gap: 8px;
        }

        .role-badge {
          font-size: 0.82rem;
          color: var(--primary-color);
          border: 1px solid rgba(20,184,166,0.35);
          padding: 3px 10px;
          border-radius: 12px;
        }

        p { color: var(--text-muted); line-height: 1.6; margin: 0 0 10px; }

        .cat-chip {
          font-size: 0.72rem;
          background: rgba(99,102,241,0.12);
          color: #818cf8;
          border: 1px solid rgba(99,102,241,0.25);
          padding: 2px 10px;
          border-radius: 10px;
        }
      }
    }

    @keyframes cardIn {
      from { opacity: 0; transform: scale(0.97) translateY(16px); }
      to   { opacity: 1; transform: scale(1) translateY(0); }
    }

    .empty-state {
      grid-column: 1 / -1;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 12px;
      padding: 60px 0;
      color: var(--text-muted);
      mat-icon { font-size: 48px; width: 48px; height: 48px; opacity: 0.3; }
    }

    .no-results {
      color: var(--text-muted);
      text-align: center;
      padding: 40px 0;
      grid-column: 1 / -1;
    }

    .grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
      gap: 24px;
    }

    .compact-card {
      height: 100%;
      background: var(--card-bg-custom) !important;
      border-top: 4px solid transparent;
      display: flex;
      flex-direction: column;
      transition: transform 0.3s ease, box-shadow 0.3s ease, background 0.3s;

      &:hover {
        transform: translateY(-5px);
        background: var(--card-bg-hover-custom) !important;
        box-shadow: 0 8px 24px rgba(0,0,0,0.25);
        .arrow-icon { transform: translateX(5px); }
      }

      mat-card-header { margin-bottom: 16px; }

      .project-icon {
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
      }

      mat-card-title    { font-size: 1.25rem; font-weight: 600; margin-bottom: 4px; }
      mat-card-subtitle { color: var(--text-muted); font-size: 0.9rem; }

      mat-card-content {
        flex-grow: 1;
        p {
          color: var(--text-muted);
          margin-bottom: 16px;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      }

      mat-chip-set { margin-top: auto; }

      mat-card-actions {
        padding: 16px;
        border-top: 1px solid rgba(255,255,255,0.05);
      }
    }

    .arrow-link {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 0.9rem;
      font-weight: 500;
      color: var(--text-color);
      transition: color 0.3s;
      cursor: pointer;
      text-decoration: none;

      .arrow-icon {
        font-size: 18px;
        width: 18px; height: 18px;
        transition: transform 0.3s ease;
      }

      &:hover { color: var(--primary-color); }
    }

    .project-preview-placeholder {
      width: 100%; height: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 12px;
      font-size: 1.4rem;
      font-weight: 700;
      color: white;
      mat-icon { font-size: 48px; width: 48px; height: 48px; }
    }

    .zigtravel-bg    { background: linear-gradient(135deg, #0ea5e9 0%, #0284c7 50%, #0369a1 100%); }
    .resume-master-bg { background: linear-gradient(135deg, #6366f1 0%, #4f46e5 50%, #4338ca 100%); }

    .new-badge {
      font-size: 0.7rem;
      background: linear-gradient(135deg, var(--accent-color), #f43f5e);
      color: white;
      padding: 2px 8px;
      border-radius: 10px;
      vertical-align: middle;
      margin-left: 6px;
      font-weight: 700;
      letter-spacing: 0.5px;
    }
  `]
})
export class ProjectsComponent {
  tabs: FilterTab[] = ['All', 'Frontend', 'Fullstack', 'AI & Data', 'Enterprise'];
  activeTab: FilterTab = 'All';

  featuredProjects: Project[] = [
    {
      title: 'ZigTravel',
      description: 'A modern, dynamic travel booking & itinerary curation platform featuring interactive trip discovery, destination filtering, and sleek responsive UI.',
      role: 'Angular • Travel Tech • Responsive',
      tags: ['Angular', 'TypeScript', 'Travel Tech', 'SCSS', 'UX'],
      link: 'https://thisisbinodprasad.github.io/zigtravel/',
      category: 'Frontend',
      highlights: [
        'Engineered interactive destination discovery and travel itinerary workflows.',
        'Designed responsive UI components optimized for high performance and speed.',
        'Integrated real-time trip booking flows and dynamic search filters.',
        'Achieved seamless cross-device compatibility and modern travel UX.'
      ]
    },
    {
      title: 'Resume Master',
      description: 'A premium resume builder with real-time preview, multiple templates, and ATS-optimized PDF export. Features Angular Signals for state management.',
      role: 'Angular • Signals • PDF.js',
      tags: ['Angular', 'Signals', 'PDF.js', 'SCSS'],
      link: 'https://thisisbinodprasad.github.io/resumeMaster/',
      category: 'Frontend',
      highlights: [
        'Developed a real-time reactive preview using Angular Signals.',
        'Implemented multiple professional templates (Modern, Classic, Student).',
        'Engineered a color-coded section identification system in the editor.',
        'Optimized PDF generation for 90+ ATS compatibility scores.'
      ]
    },
    {
      title: 'Koshex',
      description: 'An intuitive platform for managing mutual fund investments and savings. Features real-time portfolio tracking and goal-based investing tools.',
      role: 'Angular • Python • SEO',
      tags: ['Angular', 'Python', 'SEO', 'FinTech'],
      link: 'https://koshex.com/',
      image: 'assets/images/koshex-preview.png',
      category: 'Fullstack',
      highlights: [
        'Built efficient routing mechanisms enabling seamless user navigation.',
        'Implemented real-time portfolio tracking and goal-based investing features.',
        'Enhanced user confidence in financial planning through personalized recommendations.',
        'Optimized application performance and SEO compliance.'
      ]
    },
    {
      title: 'Flexflier',
      description: 'A responsive web application for booking hotels, flights, and car rentals designed for high performance and SEO best practices.',
      role: 'Angular • Git',
      tags: ['Angular', 'Git', 'Travel Tech'],
      link: 'https://flexflier.com/home',
      image: 'assets/images/flexflier-preview.png',
      category: 'Frontend',
      highlights: [
        'Developed responsive UI for booking hotels, flights, and car rentals.',
        'Achieved improved visibility and user engagement through SEO best practices.',
        'Implemented robust search capabilities for complex travel itineraries.',
        'Ensured seamless user experience across devices.'
      ]
    }
  ];

  otherProjects: Project[] = [
    {
      title: 'IBM Internal',
      description: 'Internal employee data management system enabling efficient tracking of roles and milestones.',
      role: 'Angular, Node',
      tags: ['Angular', 'Node.js', 'Git'],
      icon: 'business',
      color: '#34495e',
      category: 'Fullstack',
      highlights: [
        'Designed to manage and structure internal employee data efficiently.',
        'Enabled tracking of various internal roles and milestones within the organization.',
        'Built scalable and reusable Angular components.',
        'Integrated with IBM Cloud services for seamless deployment.'
      ]
    },
    {
      title: 'Instinct',
      description: 'Maintenance scheduling & reporting tool for British Railways. Real-time visualization & safety protocol adherence.',
      role: 'British Railways',
      tags: ['Angular', '.NET Core', 'Data'],
      icon: 'train',
      color: '#e74c3c',
      category: 'Enterprise',
      highlights: [
        'Streamlined maintenance scheduling and inventory management for British Railway system.',
        'Featured real-time data visualization and seamless integration with existing systems.',
        'Enhanced operational efficiency and ensured adherence to safety protocols.',
        'Empowered teams to deliver reliable railway services.'
      ]
    },
    {
      title: 'Inventory Planner',
      description: 'Data-driven tool utilizing ML to predict sales trends and optimize stock levels.',
      role: 'ML & Analytics',
      tags: ['Angular', 'Python', 'ML'],
      icon: 'inventory',
      color: '#2ecc71',
      category: 'AI & Data',
      highlights: [
        'Optimized stock levels and predicted sales trends using Machine Learning models.',
        'Provided real-time dashboards for precise demand forecasting.',
        'Automated data workflows, reducing manual processes.',
        'Significantly improved inventory planning accuracy.'
      ]
    },
    {
      title: "RFM McDonald's Dashboard",
      description: "Store management system tailored for McDonald's operations integrating HR and POS systems.",
      role: 'Enterprise App',
      tags: ['Angular', 'Cypress', 'Git'],
      icon: 'fastfood',
      color: '#f1c40f',
      category: 'Enterprise',
      highlights: [
        'Comprehensive store management system integrated with HR and POS.',
        'Streamlined operational workflows through real-time visualizations and analytics.',
        'Empowered managers to optimize store performance.',
        'Ensured platform reliability using automated testing frameworks (Cypress).'
      ]
    },
    {
      title: 'Televisory',
      description: 'Global stock market analysis platform with extensive data visualization tools.',
      role: 'FinTech',
      tags: ['Angular', 'Data Viz', 'Finance'],
      icon: 'show_chart',
      color: '#3498db',
      category: 'AI & Data',
      highlights: [
        'Offered extensive tools for real-time data visualization and portfolio management.',
        'Enabled historical trend analysis for informed investment decisions.',
        'Allowed investors to customize alerts and derive actionable insights.',
        'Foster informed investment decisions in a user-friendly interface.'
      ]
    },
    {
      title: 'Aikone & GPS',
      description: 'GPS-based fleet tracking solution improving transport efficiency and safety.',
      role: 'IoT',
      tags: ['Angular', '.NET Core', 'SQL'],
      icon: 'gps_fixed',
      color: '#9b59b6',
      category: 'Fullstack',
      highlights: [
        'Enhanced transportation efficiency and safety with GPS-based fleet tracking.',
        'Provided real-time insights into speed, driving behavior, and route adherence.',
        'Empowered stakeholders with advanced alert mechanisms.',
        'Improved operational decision-making and fleet reliability.'
      ]
    }
  ];

  get filteredFeatured(): Project[] {
    if (this.activeTab === 'All') return this.featuredProjects;
    return this.featuredProjects.filter(p => p.category === this.activeTab);
  }

  get filteredOther(): Project[] {
    if (this.activeTab === 'All') return this.otherProjects;
    return this.otherProjects.filter(p => p.category === this.activeTab);
  }

  setTab(tab: FilterTab): void { this.activeTab = tab; }

  constructor(private dialog: MatDialog) {}

  openProjectDetails(project: Project) {
    this.dialog.open(ProjectDetailsDialogComponent, {
      data: project,
      panelClass: 'glass-dialog',
      backdropClass: 'blur-backdrop'
    });
  }
}
