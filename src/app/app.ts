
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { HeroComponent } from './components/hero/hero.component';
import { ExperienceComponent } from './components/experience/experience.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { SkillsComponent } from './components/skills/skills.component';
import { ContactComponent } from './components/contact/contact.component';
import { FooterComponent } from './components/footer/footer.component';
import { EducationComponent } from './components/education/education.component';
import { AnimatedBgComponent } from './components/animated-bg/animated-bg.component';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent,
    HeroComponent,
    ExperienceComponent,
    ProjectsComponent,
    SkillsComponent,
    EducationComponent,
    ContactComponent,
    FooterComponent,
    AnimatedBgComponent
  ],
  template: `
    <app-animated-bg></app-animated-bg>
    <app-header></app-header>
    <main>
      <app-hero></app-hero>
      <app-projects></app-projects>
      <app-experience></app-experience>
      <app-skills></app-skills>
      <app-education></app-education>
      <app-contact></app-contact>
    </main>
    <app-footer></app-footer>
  `,
  styleUrl: './app.scss'
})
export class App { }
