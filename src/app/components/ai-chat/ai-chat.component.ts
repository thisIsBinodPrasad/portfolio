import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';

interface ChatMessage {
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
  isTyping?: boolean;
}

@Component({
  selector: 'app-ai-chat',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatTooltipModule
  ],
  template: `
    <!-- Floating Trigger Button -->
    <button 
      class="ai-chat-trigger" 
      [class.active]="isOpen"
      (click)="toggleChat()" 
      mat-fab 
      color="primary"
      matTooltip="Ask Gemini AI about Binod"
      aria-label="Toggle AI Chat">
      <mat-icon>{{ isOpen ? 'close' : 'smart_toy' }}</mat-icon>
      <span class="pulse-ring" *ngIf="!isOpen"></span>
      <span class="badge" *ngIf="unreadCount > 0 && !isOpen">{{ unreadCount }}</span>
    </button>

    <!-- Chat Drawer Modal -->
    <div class="ai-chat-container glass-dialog-box" [class.open]="isOpen">
      <!-- Header -->
      <div class="chat-header">
        <div class="header-info">
          <div class="ai-avatar">
            <mat-icon>auto_awesome</mat-icon>
          </div>
          <div>
            <h3>Gemini AI Assistant</h3>
            <span class="status-text">
              <span class="status-dot"></span> Binod's Resume & Portfolio Bot
            </span>
          </div>
        </div>
        <div class="header-actions">
          <button mat-icon-button (click)="toggleSettings()" matTooltip="Gemini API Key Settings">
            <mat-icon>settings</mat-icon>
          </button>
          <button mat-icon-button (click)="clearChat()" matTooltip="Clear Chat">
            <mat-icon>delete_sweep</mat-icon>
          </button>
          <button mat-icon-button (click)="toggleChat()" matTooltip="Close">
            <mat-icon>close</mat-icon>
          </button>
        </div>
      </div>

      <!-- Settings Sub-panel -->
      <div class="settings-panel" *ngIf="showSettings">
        <div class="settings-content">
          <h4><mat-icon class="sm-icon">key</mat-icon> Gemini API Settings</h4>
          <p>By default, Gemini AI answers using Binod's built-in resume knowledge engine. Optionally enter a custom Gemini API key for dynamic live generation:</p>
          <mat-form-field appearance="outline" class="full-width">
            <mat-label>Gemini API Key (Optional)</mat-label>
            <input matInput type="password" [(ngModel)]="customApiKey" placeholder="AIzaSy..." />
          </mat-form-field>
          <div class="settings-actions">
            <button mat-flat-button color="primary" (click)="saveApiKey()">Save Key</button>
            <button mat-button (click)="showSettings = false">Close</button>
          </div>
        </div>
      </div>

      <!-- Quick Prompt Pills -->
      <div class="quick-prompts">
        <span class="prompt-chip" *ngFor="let prompt of quickPrompts" (click)="sendQuickPrompt(prompt)">
          {{ prompt }}
        </span>
      </div>

      <!-- Messages Body -->
      <div class="chat-messages" #scrollContainer>
        <div 
          *ngFor="let msg of messages" 
          class="message-bubble" 
          [class.user-msg]="msg.sender === 'user'"
          [class.ai-msg]="msg.sender === 'ai'">
          
          <div class="msg-avatar" *ngIf="msg.sender === 'ai'">
            <mat-icon>auto_awesome</mat-icon>
          </div>

          <div class="msg-content">
            <div class="msg-text" [innerHTML]="formatMessage(msg.text)"></div>
            <span class="msg-time">{{ msg.timestamp }}</span>
          </div>
        </div>

        <!-- Typing Indicator -->
        <div class="message-bubble ai-msg" *ngIf="isThinking">
          <div class="msg-avatar">
            <mat-icon>auto_awesome</mat-icon>
          </div>
          <div class="msg-content thinking-box">
            <span class="typing-dot"></span>
            <span class="typing-dot"></span>
            <span class="typing-dot"></span>
          </div>
        </div>
      </div>

      <!-- Input Bar -->
      <div class="chat-input-bar">
        <input 
          type="text" 
          [(ngModel)]="userPrompt" 
          (keyup.enter)="sendMessage()" 
          placeholder="Ask anything about Binod's skills, experience, projects..."
          [disabled]="isThinking" />
        
        <button 
          mat-icon-button 
          color="primary" 
          (click)="sendMessage()" 
          [disabled]="!userPrompt.trim() || isThinking"
          aria-label="Send message">
          <mat-icon>send</mat-icon>
        </button>
      </div>
    </div>
  `,
  styles: [`
    .ai-chat-trigger {
      position: fixed;
      bottom: 24px;
      right: 24px;
      z-index: 1000;
      box-shadow: 0 8px 30px rgba(20, 184, 166, 0.4);
      transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);

      &:hover {
        transform: scale(1.1) rotate(5deg);
      }

      &.active {
        background-color: var(--accent-color) !important;
      }

      .pulse-ring {
        position: absolute;
        inset: -4px;
        border-radius: 50%;
        border: 2px solid var(--primary-color);
        animation: pulseEffect 2s infinite;
      }

      .badge {
        position: absolute;
        top: -4px;
        right: -4px;
        background: var(--accent-color);
        color: white;
        font-size: 11px;
        font-weight: 700;
        width: 20px;
        height: 20px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        border: 2px solid var(--surface-color);
      }
    }

    @keyframes pulseEffect {
      0% { transform: scale(1); opacity: 0.8; }
      100% { transform: scale(1.4); opacity: 0; }
    }

    .ai-chat-container {
      position: fixed;
      bottom: 96px;
      right: 24px;
      width: 400px;
      height: 580px;
      max-width: calc(100vw - 32px);
      max-height: calc(100vh - 120px);
      background: rgba(15, 23, 42, 0.92);
      backdrop-filter: blur(16px);
      -webkit-backdrop-filter: blur(16px);
      border: 1px solid rgba(255, 255, 255, 0.15);
      border-radius: 20px;
      box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5), 0 0 30px rgba(20, 184, 166, 0.15);
      z-index: 999;
      display: flex;
      flex-direction: column;
      overflow: hidden;
      opacity: 0;
      pointer-events: none;
      transform: translateY(20px) scale(0.95);
      transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);

      &.open {
        opacity: 1;
        pointer-events: auto;
        transform: translateY(0) scale(1);
      }
    }

    .chat-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 14px 18px;
      background: rgba(30, 41, 59, 0.8);
      border-bottom: 1px solid rgba(255, 255, 255, 0.08);

      .header-info {
        display: flex;
        align-items: center;
        gap: 12px;

        .ai-avatar {
          width: 38px;
          height: 38px;
          border-radius: 12px;
          background: linear-gradient(135deg, var(--primary-color), var(--accent-color));
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          box-shadow: 0 4px 12px rgba(20, 184, 166, 0.3);

          mat-icon { font-size: 20px; width: 20px; height: 20px; }
        }

        h3 {
          margin: 0;
          font-size: 1rem;
          font-weight: 700;
          color: var(--text-color);
        }

        .status-text {
          font-size: 0.75rem;
          color: var(--text-muted);
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .status-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background-color: #22c55e;
          box-shadow: 0 0 8px #22c55e;
        }
      }

      .header-actions {
        display: flex;
        gap: 2px;
        button { color: var(--text-muted); }
      }
    }

    .settings-panel {
      background: rgba(30, 41, 59, 0.95);
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
      padding: 16px;
      animation: fadeIn 0.2s ease;

      h4 {
        margin: 0 0 8px;
        font-size: 0.95rem;
        display: flex;
        align-items: center;
        gap: 6px;
        color: var(--primary-color);
      }

      p {
        font-size: 0.8rem;
        color: var(--text-muted);
        margin-bottom: 12px;
        line-height: 1.4;
      }

      .full-width { width: 100%; }

      .settings-actions {
        display: flex;
        justify-content: flex-end;
        gap: 8px;
      }
    }

    .quick-prompts {
      display: flex;
      gap: 8px;
      padding: 10px 14px;
      overflow-x: auto;
      white-space: nowrap;
      border-bottom: 1px solid rgba(255, 255, 255, 0.05);

      &::-webkit-scrollbar { height: 4px; }
      &::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 2px; }

      .prompt-chip {
        font-size: 0.75rem;
        padding: 6px 12px;
        background: rgba(255, 255, 255, 0.06);
        border: 1px solid rgba(255, 255, 255, 0.12);
        border-radius: 16px;
        color: var(--text-muted);
        cursor: pointer;
        transition: all 0.2s ease;

        &:hover {
          background: rgba(20, 184, 166, 0.2);
          border-color: var(--primary-color);
          color: var(--text-color);
        }
      }
    }

    .chat-messages {
      flex: 1;
      overflow-y: auto;
      padding: 16px;
      display: flex;
      flex-direction: column;
      gap: 14px;
    }

    .message-bubble {
      display: flex;
      gap: 10px;
      max-width: 88%;

      &.user-msg {
        align-self: flex-end;
        flex-direction: row-reverse;

        .msg-content {
          background: linear-gradient(135deg, var(--primary-color), #0d9488);
          color: white;
          border-radius: 16px 16px 2px 16px;
        }

        .msg-time { color: rgba(255, 255, 255, 0.7); }
      }

      &.ai-msg {
        align-self: flex-start;

        .msg-avatar {
          width: 28px;
          height: 28px;
          border-radius: 8px;
          background: rgba(236, 72, 153, 0.2);
          border: 1px solid var(--accent-color);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--accent-color);
          flex-shrink: 0;

          mat-icon { font-size: 16px; width: 16px; height: 16px; }
        }

        .msg-content {
          background: rgba(30, 41, 59, 0.75);
          border: 1px solid rgba(255, 255, 255, 0.08);
          color: var(--text-color);
          border-radius: 16px 16px 16px 2px;
        }
      }
    }

    .msg-content {
      padding: 10px 14px;
      font-size: 0.88rem;
      line-height: 1.5;

      .msg-text {
        word-break: break-word;

        ::ng-deep a {
          color: #38bdf8;
          text-decoration: underline;
          &:hover { color: var(--accent-color); }
        }

        ::ng-deep code {
          background: rgba(0,0,0,0.3);
          padding: 2px 6px;
          border-radius: 4px;
          font-family: monospace;
          font-size: 0.82rem;
        }
      }

      .msg-time {
        display: block;
        font-size: 0.68rem;
        color: var(--text-muted);
        margin-top: 4px;
        text-align: right;
      }
    }

    .thinking-box {
      display: flex;
      align-items: center;
      gap: 6px;
      padding: 12px 16px;

      .typing-dot {
        width: 6px;
        height: 6px;
        border-radius: 50%;
        background-color: var(--primary-color);
        animation: typingBounce 1.4s infinite ease-in-out both;

        &:nth-child(1) { animation-delay: -0.32s; }
        &:nth-child(2) { animation-delay: -0.16s; }
      }
    }

    @keyframes typingBounce {
      0%, 80%, 100% { transform: scale(0); }
      40% { transform: scale(1); }
    }

    .chat-input-bar {
      display: flex;
      align-items: center;
      padding: 10px 14px;
      background: rgba(15, 23, 42, 0.95);
      border-top: 1px solid rgba(255, 255, 255, 0.08);
      gap: 8px;

      input {
        flex: 1;
        background: rgba(30, 41, 59, 0.8);
        border: 1px solid rgba(255, 255, 255, 0.1);
        border-radius: 20px;
        padding: 10px 16px;
        color: var(--text-color);
        font-size: 0.88rem;
        outline: none;
        transition: border-color 0.2s;

        &:focus {
          border-color: var(--primary-color);
        }

        &::placeholder {
          color: var(--text-muted);
        }
      }
    }

    .sm-icon { font-size: 16px; width: 16px; height: 16px; }
  `]
})
export class AiChatComponent implements OnInit {
  @ViewChild('scrollContainer') private scrollContainer!: ElementRef;

  isOpen = false;
  showSettings = false;
  unreadCount = 1;
  userPrompt = '';
  isThinking = false;
  customApiKey = '';

  quickPrompts = [
    'Tell me about Binod',
    'What is ZigTravel?',
    'Top technical skills?',
    'Binod\'s work history',
    'How to contact Binod?'
  ];

  messages: ChatMessage[] = [
    {
      sender: 'ai',
      text: "👋 Hi! I'm **Binod's Gemini AI Assistant**. Ask me anything about his experience at **Deloitte** & **IBM**, his skills in **Angular / .NET / Python**, or projects like **ZigTravel** and **Resume Master**!",
      timestamp: this.getCurrentTime()
    }
  ];

  private resumeKnowledge = {
    bio: "Binod Prasad is a Full Stack Developer & Gen AI Enthusiast with 5+ years of experience building scalable web solutions using Angular, TypeScript, .NET Core, Python, and Node.js. Currently working as a Consultant at Deloitte.",
    currentRole: "Consultant at Deloitte (since Nov 2025), working on scalable Angular web applications and Agile delivery.",
    experience: [
      { role: "Consultant", company: "Deloitte", period: "Nov 2025 – Present", description: "Building scalable Angular components for dynamic web apps and optimizing sprint deliverables." },
      { role: "Application Developer", company: "IBM", period: "July 2024 – Oct 2025", description: "Designed mentor search functionality using RxJS, reducing latency; integrated Angular with IBM Cloud services and Node.js services." },
      { role: "Freelance Software Engineer", company: "Remote", period: "Nov 2023 – June 2024", description: "Developed multi-service booking platform and British Railways maintenance scheduling platform using .NET Core." },
      { role: "Software Engineer", company: "Anicca Data Science Solutions", period: "Nov 2022 – Oct 2023", description: "Engineered real-time inventory dashboards using Angular and automated forecasting DAGs with Python & Pandas." },
      { role: "Software Engineer", company: "Gloify", period: "May 2022 – Oct 2022", description: "Integrated Angular solutions with Python APIs and enhanced web apps for SEO." },
      { role: "Software Developer", company: "Vidhikara", period: "Feb 2020 – April 2022", description: "Designed Angular frontend interfaces and built RESTful APIs using .NET Core." }
    ],
    projects: [
      { name: "ZigTravel", url: "https://thisisbinodprasad.github.io/zigtravel/", desc: "Immersive travel booking & itinerary exploration platform featuring dynamic search, destination curation, and responsive UI." },
      { name: "Resume Master", url: "https://thisisbinodprasad.github.io/resumeMaster/", desc: "Premium resume builder built with Angular Signals, PDF.js, and real-time ATS optimization." },
      { name: "Koshex", url: "https://koshex.com/", desc: "Mutual fund investment tracking platform with real-time portfolio analysis." },
      { name: "Flexflier", url: "https://flexflier.com/home", desc: "High performance hotel, flight, and car booking engine." }
    ],
    skills: {
      frontend: ["Angular", "TypeScript", "JavaScript", "RxJS", "Angular Signals", "HTML5/CSS3/SCSS"],
      backend: ["Node.js", ".NET Core", "C#", "SQL", "IBM Cloud", "REST APIs"],
      dataAi: ["Python", "Pandas", "Machine Learning", "Gen AI Integration"]
    },
    contact: "Email: available on resume | GitHub: github.com/thisIsBinodPrasad | Resume: assets/Prasad_BinodCV.pdf"
  };

  ngOnInit(): void {
    if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
      const savedKey = localStorage.getItem('gemini_api_key');
      if (savedKey) this.customApiKey = savedKey;
    }
  }

  toggleChat(): void {
    this.isOpen = !this.isOpen;
    if (this.isOpen) {
      this.unreadCount = 0;
      setTimeout(() => this.scrollToBottom(), 100);
    }
  }

  toggleSettings(): void {
    this.showSettings = !this.showSettings;
  }

  saveApiKey(): void {
    if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
      if (this.customApiKey.trim()) {
        localStorage.setItem('gemini_api_key', this.customApiKey.trim());
      } else {
        localStorage.removeItem('gemini_api_key');
      }
    }
    this.showSettings = false;
  }

  clearChat(): void {
    this.messages = [
      {
        sender: 'ai',
        text: "Chat history cleared! How can I assist you with Binod's profile?",
        timestamp: this.getCurrentTime()
      }
    ];
  }

  sendQuickPrompt(prompt: string): void {
    this.userPrompt = prompt;
    this.sendMessage();
  }

  sendMessage(): void {
    const query = this.userPrompt.trim();
    if (!query || this.isThinking) return;

    this.messages.push({
      sender: 'user',
      text: query,
      timestamp: this.getCurrentTime()
    });

    this.userPrompt = '';
    this.isThinking = true;
    setTimeout(() => this.scrollToBottom(), 50);

    if (this.customApiKey) {
      this.callGeminiApi(query);
    } else {
      setTimeout(() => {
        const responseText = this.generateLocalAiResponse(query);
        this.messages.push({
          sender: 'ai',
          text: responseText,
          timestamp: this.getCurrentTime()
        });
        this.isThinking = false;
        setTimeout(() => this.scrollToBottom(), 100);
      }, 750);
    }
  }

  private async callGeminiApi(userQuery: string): Promise<void> {
    try {
      const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${this.customApiKey}`;
      const systemInstruction = `You are Binod Prasad's AI portfolio representative. Answer concisely, professionally, and enthusiastically using this background: ${JSON.stringify(this.resumeKnowledge)}. Format key points with markdown bullet points and markdown links.`;

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: `${systemInstruction}\n\nUser Question: ${userQuery}` }] }]
        })
      });

      const data = await response.json();
      const aiText = data?.candidates?.[0]?.content?.parts?.[0]?.text || this.generateLocalAiResponse(userQuery);

      this.messages.push({
        sender: 'ai',
        text: aiText,
        timestamp: this.getCurrentTime()
      });
    } catch {
      this.messages.push({
        sender: 'ai',
        text: this.generateLocalAiResponse(userQuery),
        timestamp: this.getCurrentTime()
      });
    } finally {
      this.isThinking = false;
      setTimeout(() => this.scrollToBottom(), 100);
    }
  }

  private generateLocalAiResponse(query: string): string {
    const q = query.toLowerCase();

    if (q.includes('zigtravel') || q.includes('travel')) {
      return `🌟 **ZigTravel** is Binod's latest travel booking & itinerary exploration platform!\n\n` +
        `• **Live Demo**: [https://thisisbinodprasad.github.io/zigtravel/](https://thisisbinodprasad.github.io/zigtravel/)\n` +
        `• **Highlights**: Built with Angular, featuring interactive trip discovery, destination filtering, high performance, and smooth responsive design.\n` +
        `Check it out live directly in the **Featured Work** section above!`;
    }

    if (q.includes('resume master') || q.includes('resumemaster')) {
      return `📄 **Resume Master** is Binod's premium ATS-optimized resume builder!\n\n` +
        `• **Live Demo**: [https://thisisbinodprasad.github.io/resumeMaster/](https://thisisbinodprasad.github.io/resumeMaster/)\n` +
        `• **Highlights**: Built with **Angular Signals** for reactive state, PDF.js for export, and section-specific color workflows.`;
    }

    if (q.includes('skill') || q.includes('tech') || q.includes('stack')) {
      return `⚡ **Binod's Technical Expertise**:\n\n` +
        `• **Frontend**: ${this.resumeKnowledge.skills.frontend.join(', ')}\n` +
        `• **Backend & Cloud**: ${this.resumeKnowledge.skills.backend.join(', ')}\n` +
        `• **Data Science & AI**: ${this.resumeKnowledge.skills.dataAi.join(', ')}`;
    }

    if (q.includes('deloitte') || q.includes('ibm') || q.includes('experience') || q.includes('work') || q.includes('history') || q.includes('company')) {
      return `💼 **Binod's Work History Highlights**:\n\n` +
        `1. **Deloitte** (*Nov 2025 - Present*) – Consultant creating scalable Angular applications.\n` +
        `2. **IBM** (*July 2024 - Oct 2025*) – Application Developer (RxJS optimizations, IBM Cloud).\n` +
        `3. **Freelance** (*Nov 2023 - June 2024*) – British Railways maintenance platform (.NET Core) & booking software.\n` +
        `4. **Anicca Data Science** (*Nov 2022 - Oct 2023*) – Real-time inventory dashboards & Python DAG forecasting.\n` +
        `5. **Gloify & Vidhikara** (*2020 - 2022*) – Angular & .NET Core RESTful APIs.`;
    }

    if (q.includes('project') || q.includes('portfolio') || q.includes('work') || q.includes('built')) {
      return `🚀 **Key Projects Built by Binod**:\n\n` +
        `• 🌴 **[ZigTravel](https://thisisbinodprasad.github.io/zigtravel/)**: Travel booking & trip curation app.\n` +
        `• 📜 **[Resume Master](https://thisisbinodprasad.github.io/resumeMaster/)**: ATS resume builder using Angular Signals.\n` +
        `• 📈 **[Koshex](https://koshex.com/)**: Investment & mutual fund tracking platform.\n` +
        `• ✈️ **[Flexflier](https://flexflier.com/home)**: Flight & hotel booking portal.`;
    }

    if (q.includes('contact') || q.includes('email') || q.includes('hire') || q.includes('reach')) {
      return `📬 **Get in Touch with Binod**:\n\n` +
        `• **GitHub**: [github.com/thisIsBinodPrasad](https://github.com/thisIsBinodPrasad)\n` +
        `• **Resume PDF**: Download directly from the hero header banner!\n` +
        `• Feel free to fill out the **Contact Form** at the bottom of the page!`;
    }

    if (q.includes('who') || q.includes('about') || q.includes('binod')) {
      return `👋 ${this.resumeKnowledge.bio}\n\nHe specializes in building high-performance web apps, reactive frontends with Angular Signals, and AI-driven solutions.`;
    }

    return `I can help you explore Binod's experience! Here are quick things you can ask:\n` +
      `• *"Tell me about ZigTravel"*\n` +
      `• *"What is his role at Deloitte?"*\n` +
      `• *"What tech stack does he use?"*\n` +
      `• *"List his top featured projects"*`;
  }

  formatMessage(text: string): string {
    let formatted = text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');

    // Links [text](url)
    formatted = formatted.replace(
      /\[([^\]]+)\]\(([^)]+)\)/g,
      '<a href="$2" target="_blank" rel="noopener">$1</a>'
    );

    // Bold **text**
    formatted = formatted.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');

    // Italic *text*
    formatted = formatted.replace(/\*([^*]+)\*/g, '<em>$1</em>');

    // Line breaks
    formatted = formatted.replace(/\n/g, '<br>');

    return formatted;
  }

  private getCurrentTime(): string {
    const now = new Date();
    return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }

  private scrollToBottom(): void {
    if (this.scrollContainer) {
      this.scrollContainer.nativeElement.scrollTop = this.scrollContainer.nativeElement.scrollHeight;
    }
  }
}
