
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { ScrollRevealDirective } from '../../directives/scroll-reveal.directive';
import { TiltDirective } from '../../directives/tilt.directive';

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
}

import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ProjectDetailsDialogComponent } from '../project-details-dialog/project-details-dialog.component';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatChipsModule, MatIconModule, ScrollRevealDirective, MatDialogModule],
  template: `
    <section id="projects" class="section-padding container">
      <h2 class="section-title">Featured Work <span class="dot">.</span></h2>
      
      <div class="featured-grid">
        <!-- Featured Project 1: Koshex -->
        <mat-card class="project-card featured glass-card" appScrollReveal appTilt>
          <div class="project-image-wrapper">
             <img src="assets/images/koshex-preview.png" alt="Koshex Dashboard" class="project-img">
             <div class="overlay">
               <button mat-fab extended color="accent" (click)="openProjectDetails(koshexProject)">
                 <mat-icon>visibility</mat-icon> Details
               </button>
               <a mat-fab extended color="primary" href="https://koshex.com/" target="_blank">
                 <mat-icon>open_in_new</mat-icon> Visit Site
               </a>
             </div>
          </div>
          <mat-card-content>
            <div class="project-header">
                <h3 class="highlight">Koshex</h3>
                <span class="role-badge">Angular • Python • SEO</span>
            </div>
            <p>
              An intuitive platform for managing mutual fund investments and savings. 
              Features real-time portfolio tracking, goal-based investing tools, and personalized recommendations.
            </p>
          </mat-card-content>
        </mat-card>

        <!-- Featured Project 2: Flexflier -->
        <mat-card class="project-card featured glass-card" appScrollReveal appTilt>
          <div class="project-image-wrapper">
             <img src="assets/images/flexflier-preview.png" alt="Flexflier Website" class="project-img">
             <div class="overlay">
               <button mat-fab extended color="accent" (click)="openProjectDetails(flexflierProject)">
                 <mat-icon>visibility</mat-icon> Details
               </button>
               <a mat-fab extended color="primary" href="https://flexflier.com/home" target="_blank">
                 <mat-icon>open_in_new</mat-icon> Visit Site
               </a>
             </div>
          </div>
          <mat-card-content>
            <div class="project-header">
                <h3 class="highlight">Flexflier</h3>
                <span class="role-badge">Angular • Git</span>
            </div>
            <p>
              A responsive web application for booking hotels, flights, and car rentals.
              Designed for high performance and SEO best practices, resulting in improved visibility.
            </p>
          </mat-card-content>
        </mat-card>
      </div>

      <h3 class="sub-title">More Projects</h3>
      <div class="grid">
        @for (project of otherProjects; track project.title) {
          <mat-card class="glass-card compact-card" appScrollReveal [style.border-top-color]="project.color">
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
      </div>
    </section>
  `,
  styles: [`
    .section-title {
      font-size: 2.5rem;
      font-weight: 700;
      margin-bottom: 40px;
      .dot { color: var(--primary-color); }
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
      
      @media (max-width: 960px) { grid-template-columns: 1fr; }
    }

    .project-card.featured {
      overflow: hidden;
      padding: 0;
      border: 1px solid var(--glass-border);
      transition: transform 0.3s ease, box-shadow 0.3s ease;
      
      &:hover {
        transform: translateY(-5px);
        box-shadow: 0 10px 30px rgba(0,0,0,0.2);
      }

      .project-image-wrapper {
        position: relative;
        height: 300px;
        overflow: hidden;
        
        .project-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s ease;
        }

        .overlay {
          position: absolute;
          inset: 0;
          background: rgba(0,0,0,0.6);
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 16px;
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        &:hover {
          .project-img { transform: scale(1.05); }
          .overlay { opacity: 1; }
        }
      }

      mat-card-content {
        padding: 24px;
        
        h3 {
          font-size: 1.5rem;
          margin: 0;
          color: var(--text-color);
        }
        
        .project-header {
             display: flex;
             justify-content: space-between;
             align-items: center;
             margin-bottom: 12px;
        }
        
        .role-badge {
            font-size: 0.85rem;
            color: var(--primary-color);
            border: 1px solid var(--primary-color);
            padding: 4px 8px;
            border-radius: 12px;
        }

        p { color: var(--text-muted); line-height: 1.6; }
      }
    }

    .grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
      gap: 24px;
    }

    .compact-card {
      height: 100%;
      background: var(--card-bg-custom) !important;
      border-top: 4px solid transparent; // colored by binding
      display: flex;
      flex-direction: column;
      transition: transform 0.3s ease, box-shadow 0.3s ease, background 0.3s;
      
      &:hover {
        transform: translateY(-5px);
        background: var(--card-bg-hover-custom) !important;
        box-shadow: 0 8px 24px rgba(0,0,0,0.25);
        
        .arrow-link .arrow-icon {
           transform: translateX(5px);
        }
      }
      
      mat-card-header {
        margin-bottom: 16px;
      }

      .project-icon {
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
      }
      
      mat-card-title { font-size: 1.25rem; font-weight: 600; margin-bottom: 4px; }
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
            width: 18px;
            height: 18px;
            transition: transform 0.3s ease;
        }
        
        &:hover {
            color: var(--primary-color);
        }
    }
  `]
})
export class ProjectsComponent {
  koshexProject: Project = {
    title: 'Koshex',
    description: 'An intuitive platform for managing mutual fund investments and savings. Features real-time portfolio tracking, goal-based investing tools, and personalized recommendations. Integrated advanced data flows for seamless user experience.',
    role: 'Angular • Python • SEO',
    tags: ['Angular', 'Python', 'SEO', 'FinTech'],
    link: 'https://koshex.com/',
    highlights: [
      'Built efficient routing mechanisms enabling seamless user navigation.',
      'Implemented real-time portfolio tracking and goal-based investing features.',
      'Enhanced user confidence in financial planning through personalized recommendations.',
      'Optimized application performance and SEO compliance.'
    ]
  };

  flexflierProject: Project = {
    title: 'Flexflier',
    description: 'A responsive web application for booking hotels, flights, and car rentals. Designed for high performance and SEO best practices, resulting in improved visibility. Features a robust search capability and intuitive interface.',
    role: 'Angular • Git',
    tags: ['Angular', 'Git', 'Travel Tech'],
    link: 'https://flexflier.com/home',
    highlights: [
      'Developed responsive UI for booking hotels, flights, and car rentals.',
      'Achieved improved visibility and user engagement through SEO best practices.',
      'Implemented robust search capabilities for complex travel itineraries.',
      'Ensured seamless user experience across devices.'
    ]
  };

  otherProjects: Project[] = [
    {
      title: 'IBM Internal',
      description: 'Internal employee data management system enabling efficient tracking of roles and milestones.',
      role: 'Angular, Node',
      tags: ['Angular', 'Node.js', 'Git'],
      icon: 'business',
      color: '#34495e',
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
      highlights: [
        'Optimized stock levels and predicted sales trends using Machine Learning models.',
        'Provided real-time dashboards for precise demand forecasting.',
        'Automated data workflows, reducing manual processes.',
        'Significantly improved inventory planning accuracy.'
      ]
    },
    {
      title: 'RFM McDonald\'s Dashboard',
      description: 'Store management system tailored for McDonald’s operations integrating HR and POS systems.',
      role: 'Enterprise App',
      tags: ['Angular', 'Cypress', 'Git'],
      icon: 'fastfood',
      color: '#f1c40f',
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
      highlights: [
        'Enhanced transportation efficiency and safety with GPS-based fleet tracking.',
        'Provided real-time insights into speed, driving behavior, and route adherence.',
        'Empowered stakeholders with advanced alert mechanisms.',
        'Improved operational decision-making and fleet reliability.'
      ]
    }
  ];

  constructor(private dialog: MatDialog) { }

  openProjectDetails(project: Project) {
    this.dialog.open(ProjectDetailsDialogComponent, {
      data: project,
      panelClass: 'glass-dialog', // Custom class if needed, or rely on internal styling
      backdropClass: 'blur-backdrop'
    });
  }
}
