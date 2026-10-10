
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent }        from './components/header/header.component';
import { HeroComponent }          from './components/hero/hero.component';
import { ExperienceComponent }    from './components/experience/experience.component';
import { ProjectsComponent }      from './components/projects/projects.component';
import { SkillsComponent }        from './components/skills/skills.component';
import { ContactComponent }       from './components/contact/contact.component';
import { FooterComponent }        from './components/footer/footer.component';
import { EducationComponent }     from './components/education/education.component';
import { AnimatedBgComponent }    from './components/animated-bg/animated-bg.component';
import { PageLoaderComponent }    from './components/page-loader/page-loader.component';
import { CursorGlowComponent }    from './components/cursor-glow/cursor-glow.component';
import { BackToTopComponent }     from './components/back-to-top/back-to-top.component';
import { SectionNavComponent }    from './components/section-nav/section-nav.component';
import { TestimonialsComponent }  from './components/testimonials/testimonials.component';
import { CertificationsComponent} from './components/certifications/certifications.component';
import { BlogComponent }          from './components/blog/blog.component';
import { MusicPlayerComponent }   from './components/music-player/music-player.component';

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
    AnimatedBgComponent,
    PageLoaderComponent,
    CursorGlowComponent,
    BackToTopComponent,
    SectionNavComponent,
    TestimonialsComponent,
    CertificationsComponent,
    BlogComponent,
    MusicPlayerComponent,
  ],
  template: `
    <app-page-loader></app-page-loader>
    <app-cursor-glow></app-cursor-glow>
    <app-animated-bg></app-animated-bg>
    <app-section-nav></app-section-nav>
    <app-music-player></app-music-player>
    <app-header></app-header>
    <main>
      <app-hero></app-hero>
      <app-projects></app-projects>
      <app-experience></app-experience>
      <app-skills></app-skills>
      <app-education></app-education>
      @defer (on viewport; prefetch on idle) {
        <app-testimonials></app-testimonials>
      } @placeholder {
        <section id="testimonials" style="min-height:600px"></section>
      }
      @defer (on viewport; prefetch on idle) {
        <app-certifications></app-certifications>
      } @placeholder {
        <section id="certifications" style="min-height:700px"></section>
      }
      @defer (on viewport; prefetch on idle) {
        <app-blog></app-blog>
      } @placeholder {
        <section id="blog" style="min-height:600px"></section>
      }
      <app-contact></app-contact>
    </main>
    <app-footer></app-footer>
    <app-back-to-top></app-back-to-top>
  `,
  styleUrl: './app.scss'
})
export class App { }
