import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

interface Education {
    degree: string;
    institution: string;
    year: string;
    description: string;
    icon: string;
}

@Component({
    selector: 'app-education',
    standalone: true,
    imports: [CommonModule, MatCardModule, MatIconModule],
    templateUrl: './education.component.html',
    styleUrl: './education.component.scss'
})
export class EducationComponent {
    educationList: Education[] = [
        {
            degree: 'PG Certificate in Data Science',
            institution: 'Indian Institute of Technology, Roorkee',
            year: 'December 2021 – December 2022',
            description: 'Acquired expertise in Data Preprocessing, Machine Learning, and Data Visualization.',
            icon: 'analytics'
        },
        {
            degree: 'B.Tech in Computer Science',
            institution: 'THDC Institute of Hydropower Engineering and Technology',
            year: 'July 2014 – August 2018',
            description: 'Specialized in Computer Science fundamentals and software engineering.',
            icon: 'school'
        }
    ];
}
