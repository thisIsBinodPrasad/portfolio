import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { Project } from '../projects/projects.component';

@Component({
    selector: 'app-project-details-dialog',
    standalone: true,
    imports: [CommonModule, MatDialogModule, MatButtonModule, MatIconModule, MatChipsModule],
    template: `
    <div class="dialog-container glass-card">
      <div class="dialog-header">
        <h2 mat-dialog-title>
          <div class="title-wrapper">
             <mat-icon [style.color]="data.color" *ngIf="data.icon">{{data.icon}}</mat-icon>
             {{data.title}}
          </div>
        </h2>
        <button mat-icon-button (click)="dialogRef.close()" class="close-btn">
          <mat-icon>close</mat-icon>
        </button>
      </div>

      <mat-dialog-content>
        <div class="project-meta">
          <span class="role-badge">{{ data.role }}</span>
        </div>

        <p class="description">{{ data.description }}</p>

        <div class="highlights" *ngIf="data.highlights?.length">
          <h3>Key Features & Impact:</h3>
          <ul>
            <li *ngFor="let item of data.highlights">
              <mat-icon class="bullet-icon">check_circle</mat-icon>
              <span>{{ item }}</span>
            </li>
          </ul>
        </div>

        <mat-chip-set class="tech-stack">
          <mat-chip *ngFor="let tag of data.tags">{{ tag }}</mat-chip>
        </mat-chip-set>
      </mat-dialog-content>

      <mat-dialog-actions align="end">
        <button mat-button (click)="dialogRef.close()">Close</button>
        <a *ngIf="data.link" mat-raised-button color="primary" [href]="data.link" target="_blank">
          <mat-icon>open_in_new</mat-icon> Visit Project
        </a>
      </mat-dialog-actions>
    </div>
  `,
    styles: [`
    :host {
      display: block;
      max-width: 100vw;
    }

    /* Override default dialog styles for glassmorphism */
    ::ng-deep .mat-mdc-dialog-container .mat-mdc-dialog-surface {
        background: transparent !important;
        box-shadow: none !important;
        overflow: hidden !important;
    }

    .dialog-container {
      background: rgba(23, 25, 35, 0.95); /* Deep dark background */
      backdrop-filter: blur(16px);
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 16px;
      padding: 24px;
      color: var(--text-color);
      max-width: 600px;
      width: 100%;
      margin: 0 auto;
      box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
    }

    .dialog-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;
      border-bottom: 1px solid rgba(255,255,255,0.1);
      padding-bottom: 16px;
    }

    h2 {
      margin: 0;
      font-size: 1.5rem;
      font-weight: 700;
      
      .title-wrapper {
        display: flex;
        align-items: center;
        gap: 12px;
      }
    }

    .close-btn {
      color: var(--text-muted);
      &:hover { color: var(--text-color); }
    }

    mat-dialog-content {
      margin: 0;
      padding: 0;
      max-height: 70vh;
      overflow-y: auto;
      
      /* Custom scrollbar */
      &::-webkit-scrollbar {
        width: 6px;
      }
      &::-webkit-scrollbar-track {
        background: rgba(255,255,255,0.05);
      }
      &::-webkit-scrollbar-thumb {
        background: rgba(255,255,255,0.2);
        border-radius: 3px;
      }
    }

    .project-meta {
      margin-bottom: 16px;
      .role-badge {
        color: var(--accent-color);
        font-weight: 600;
        font-size: 0.9rem;
        background: rgba(var(--accent-rgb), 0.1);
        padding: 4px 12px;
        border-radius: 99px;
      }
    }

    .description {
      color: var(--text-muted);
      line-height: 1.6;
      margin-bottom: 24px;
      font-size: 1rem;
    }

    .highlights {
      margin-bottom: 24px;
      background: rgba(255,255,255,0.03);
      padding: 20px;
      border-radius: 12px;

      h3 {
        font-size: 1.1rem;
        margin: 0 0 16px 0;
        color: var(--text-color);
      }

      ul {
        list-style: none;
        padding: 0;
        margin: 0;
      }

      li {
        display: flex;
        gap: 12px;
        margin-bottom: 12px;
        color: var(--text-muted);
        line-height: 1.5;
        
        &:last-child { margin-bottom: 0; }

        .bullet-icon {
          font-size: 20px;
          height: 20px;
          width: 20px;
          color: var(--primary-color);
          flex-shrink: 0;
          margin-top: 2px;
        }
      }
    }

    .tech-stack {
      margin-bottom: 24px;
    }

    mat-dialog-actions {
      padding: 16px 0 0 0;
      border-top: 1px solid rgba(255,255,255,0.1);
      margin-bottom: 0;
      min-height: auto;
      gap: 12px;
    }
  `]
})
export class ProjectDetailsDialogComponent {
    constructor(
        public dialogRef: MatDialogRef<ProjectDetailsDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: Project
    ) { }
}
