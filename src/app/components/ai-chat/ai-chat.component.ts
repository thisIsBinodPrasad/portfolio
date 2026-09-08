import { Component, ElementRef, ViewChild, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

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
    MatButtonModule
  ],
  template: `
    <!-- Floating Trigger Button Container -->
    <div class="ai-chat-trigger-wrapper">
      <button 
        type="button"
        class="ai-chat-trigger-btn" 
        [class.active]="isOpen"
        (click)="toggleChat($event)" 
        aria-label="Toggle AI Chat">
        <mat-icon class="trigger-icon">{{ isOpen ? 'close' : 'smart_toy' }}</mat-icon>
      </button>
      <span class="pulse-ring" *ngIf="!isOpen"></span>
      <span class="unread-badge" *ngIf="unreadCount > 0 && !isOpen">{{ unreadCount }}</span>
    </div>

    <!-- Chat Drawer Modal -->
    <div class="ai-chat-container" [class.open]="isOpen">
      <!-- Header -->
      <div class="chat-header">
        <div class="header-info">
          <div class="ai-avatar">
            <mat-icon>auto_awesome</mat-icon>
          </div>
          <div>
            <h3>Gemini AI Assistant</h3>
            <span class="status-text">
              <span class="status-dot"></span> Binod's Resume & Portfolio Assistant
            </span>
          </div>
        </div>
        <div class="header-actions">
          <button type="button" class="icon-btn" (click)="toggleSettings($event)" title="Settings">
            <mat-icon>settings</mat-icon>
          </button>
          <button type="button" class="icon-btn" (click)="clearChat($event)" title="Clear Chat">
            <mat-icon>delete_sweep</mat-icon>
          </button>
          <button type="button" class="icon-btn" (click)="toggleChat($event)" title="Close">
            <mat-icon>close</mat-icon>
          </button>
        </div>
      </div>

      <!-- Settings Sub-panel -->
      <div class="settings-panel" *ngIf="showSettings">
        <div class="settings-content">
          <h4><mat-icon class="sm-icon">key</mat-icon> Gemini API Settings</h4>
          <p>By default, Gemini AI answers using Binod's built-in resume knowledge engine. Optionally enter a custom Gemini API key for dynamic generation:</p>
          <input 
            type="password" 
            class="custom-api-input"
            [value]="customApiKey" 
            (input)="customApiKey = $any($event.target).value"
            placeholder="AIzaSy..." />
          <div class="settings-actions">
            <button type="button" class="action-btn primary" (click)="saveApiKey($event)">Save Key</button>
            <button type="button" class="action-btn secondary" (click)="showSettings = false">Close</button>
          </div>
        </div>
      </div>

      <!-- Quick Prompt Pills -->
      <div class="quick-prompts">
        <button 
          type="button" 
          class="prompt-chip" 
          *ngFor="let prompt of quickPrompts" 
          (click)="sendQuickPrompt(prompt, $event)">
          {{ prompt }}
        </button>
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
          class="chat-input"
          [value]="userPrompt" 
          (input)="onInputChange($event)"
          (keydown.enter)="sendMessage($event)" 
          placeholder="Ask about Binod's Deloitte role, skills, projects..."
          [disabled]="isThinking" />
        
        <button 
          type="button"
          class="send-btn" 
          (click)="sendMessage($event)" 
          [disabled]="!userPrompt.trim() || isThinking"
          aria-label="Send message">
          <mat-icon>send</mat-icon>
        </button>
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
      position: fixed;
      bottom: 0;
      right: 0;
      z-index: 999999;
      pointer-events: none;
    }

    .ai-chat-trigger-wrapper {
      position: fixed;
      bottom: 24px;
      right: 24px;
      z-index: 1000000;
      pointer-events: auto;
    }

    .ai-chat-trigger-btn {
      width: 60px;
      height: 60px;
      border-radius: 50%;
      background: linear-gradient(135deg, #14b8a6, #ec4899);
      border: none;
      color: white;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      box-shadow: 0 8px 30px rgba(20, 184, 166, 0.5);
      transition: transform 0.3s ease, background 0.3s ease;
      outline: none;

      &:hover {
        transform: scale(1.1) rotate(5deg);
      }

      &.active {
        background: linear-gradient(135deg, #ec4899, #f43f5e);
      }

      .trigger-icon {
        font-size: 28px;
        width: 28px;
        height: 28px;
      }
    }

    .pulse-ring {
      position: absolute;
      inset: -6px;
      border-radius: 50%;
      border: 2px solid #14b8a6;
      animation: pulseEffect 2s infinite;
      pointer-events: none;
    }

    .unread-badge {
      position: absolute;
      top: -4px;
      right: -4px;
      background: #f43f5e;
      color: white;
      font-size: 11px;
      font-weight: 700;
      width: 20px;
      height: 20px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      border: 2px solid #0f172a;
      pointer-events: none;
    }

    @keyframes pulseEffect {
      0% { transform: scale(1); opacity: 0.8; }
      100% { transform: scale(1.4); opacity: 0; }
    }

    .ai-chat-container {
      position: fixed;
      bottom: 96px;
      right: 24px;
      width: 420px;
      height: 590px;
      max-width: calc(100vw - 32px);
      max-height: calc(100vh - 120px);
      background: rgba(15, 23, 42, 0.95);
      backdrop-filter: blur(16px);
      -webkit-backdrop-filter: blur(16px);
      border: 1px solid rgba(255, 255, 255, 0.15);
      border-radius: 20px;
      box-shadow: 0 20px 60px rgba(0, 0, 0, 0.6), 0 0 30px rgba(20, 184, 166, 0.2);
      display: flex;
      flex-direction: column;
      overflow: hidden;
      opacity: 0;
      pointer-events: none;
      transform: translateY(20px) scale(0.95);
      transition: opacity 0.3s ease, transform 0.3s ease;

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
      background: rgba(30, 41, 59, 0.9);
      border-bottom: 1px solid rgba(255, 255, 255, 0.08);

      .header-info {
        display: flex;
        align-items: center;
        gap: 12px;

        .ai-avatar {
          width: 38px;
          height: 38px;
          border-radius: 12px;
          background: linear-gradient(135deg, #14b8a6, #ec4899);
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;

          mat-icon { font-size: 20px; width: 20px; height: 20px; }
        }

        h3 {
          margin: 0;
          font-size: 1rem;
          font-weight: 700;
          color: #f8fafc;
        }

        .status-text {
          font-size: 0.75rem;
          color: #94a3b8;
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
        gap: 4px;

        .icon-btn {
          background: transparent;
          border: none;
          color: #94a3b8;
          cursor: pointer;
          padding: 6px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;

          &:hover {
            color: #f8fafc;
            background: rgba(255, 255, 255, 0.1);
          }

          mat-icon { font-size: 18px; width: 18px; height: 18px; }
        }
      }
    }

    .settings-panel {
      background: rgba(30, 41, 59, 0.98);
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
      padding: 16px;

      h4 {
        margin: 0 0 8px;
        font-size: 0.95rem;
        display: flex;
        align-items: center;
        gap: 6px;
        color: #14b8a6;
      }

      p {
        font-size: 0.8rem;
        color: #94a3b8;
        margin-bottom: 12px;
        line-height: 1.4;
      }

      .custom-api-input {
        width: 100%;
        box-sizing: border-box;
        background: rgba(15, 23, 42, 0.8);
        border: 1px solid rgba(255, 255, 255, 0.15);
        border-radius: 8px;
        padding: 8px 12px;
        color: white;
        font-size: 0.85rem;
        outline: none;
        margin-bottom: 12px;

        &:focus { border-color: #14b8a6; }
      }

      .settings-actions {
        display: flex;
        justify-content: flex-end;
        gap: 8px;

        .action-btn {
          padding: 6px 14px;
          border-radius: 6px;
          font-size: 0.8rem;
          cursor: pointer;
          border: none;

          &.primary {
            background: #14b8a6;
            color: white;
          }

          &.secondary {
            background: rgba(255,255,255,0.1);
            color: #94a3b8;
          }
        }
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
        color: #94a3b8;
        cursor: pointer;
        outline: none;
        transition: all 0.2s ease;

        &:hover {
          background: rgba(20, 184, 166, 0.2);
          border-color: #14b8a6;
          color: white;
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
          background: linear-gradient(135deg, #14b8a6, #0d9488);
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
          border: 1px solid #ec4899;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #ec4899;
          flex-shrink: 0;

          mat-icon { font-size: 16px; width: 16px; height: 16px; }
        }

        .msg-content {
          background: rgba(30, 41, 59, 0.85);
          border: 1px solid rgba(255, 255, 255, 0.08);
          color: #f8fafc;
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
          &:hover { color: #ec4899; }
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
        color: #94a3b8;
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
        background-color: #14b8a6;
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
      background: rgba(15, 23, 42, 0.98);
      border-top: 1px solid rgba(255, 255, 255, 0.08);
      gap: 8px;

      .chat-input {
        flex: 1;
        background: rgba(30, 41, 59, 0.8);
        border: 1px solid rgba(255, 255, 255, 0.15);
        border-radius: 20px;
        padding: 10px 16px;
        color: white;
        font-size: 0.88rem;
        outline: none;
        box-sizing: border-box;

        &:focus {
          border-color: #14b8a6;
        }

        &::placeholder {
          color: #94a3b8;
        }
      }

      .send-btn {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        background: #14b8a6;
        border: none;
        color: white;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        outline: none;

        &:disabled {
          background: rgba(255, 255, 255, 0.1);
          color: #64748b;
          cursor: not-allowed;
        }

        mat-icon { font-size: 18px; width: 18px; height: 18px; }
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

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId) && typeof localStorage !== 'undefined') {
      const savedKey = localStorage.getItem('gemini_api_key');
      if (savedKey) this.customApiKey = savedKey;
    }
  }

  toggleChat(event?: Event): void {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
    this.isOpen = !this.isOpen;
    if (this.isOpen) {
      this.unreadCount = 0;
      setTimeout(() => this.scrollToBottom(), 100);
    }
  }

  toggleSettings(event?: Event): void {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
    this.showSettings = !this.showSettings;
  }

  saveApiKey(event?: Event): void {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
    if (isPlatformBrowser(this.platformId) && typeof localStorage !== 'undefined') {
      if (this.customApiKey.trim()) {
        localStorage.setItem('gemini_api_key', this.customApiKey.trim());
      } else {
        localStorage.removeItem('gemini_api_key');
      }
    }
    this.showSettings = false;
  }

  clearChat(event?: Event): void {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
    this.messages = [
      {
        sender: 'ai',
        text: "Chat history cleared! How can I assist you with Binod's profile?",
        timestamp: this.getCurrentTime()
      }
    ];
  }

  onInputChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    if (target) {
      this.userPrompt = target.value;
    }
  }

  sendQuickPrompt(promptText: string, event?: Event): void {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
    this.userPrompt = promptText;
    this.sendMessage();
  }

  sendMessage(event?: Event): void {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }

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
      }, 400);
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
    const q = query.toLowerCase().trim();

    if (q === 'hi' || q === 'hello' || q === 'hey' || q.startsWith('hi ') || q.startsWith('hello ')) {
      return `👋 Hi there! I'm **Binod's Gemini AI Assistant**.\n\nI can answer any questions about Binod Prasad's resume, work at **Deloitte** & **IBM**, skills in **Angular / .NET / Python**, or projects like **ZigTravel** and **Resume Master**!`;
    }

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

    if (q.includes('skill') || q.includes('tech') || q.includes('stack') || q.includes('languages') || q.includes('framework')) {
      return `⚡ **Binod's Technical Expertise**:\n\n` +
        `• **Frontend**: ${this.resumeKnowledge.skills.frontend.join(', ')}\n` +
        `• **Backend & Cloud**: ${this.resumeKnowledge.skills.backend.join(', ')}\n` +
        `• **Data Science & AI**: ${this.resumeKnowledge.skills.dataAi.join(', ')}`;
    }

    if (q.includes('deloitte') || q.includes('ibm') || q.includes('experience') || q.includes('work') || q.includes('history') || q.includes('company') || q.includes('job') || q.includes('career')) {
      return `💼 **Binod's Work History Highlights**:\n\n` +
        `1. **Deloitte** (*Nov 2025 - Present*) – Consultant creating scalable Angular applications.\n` +
        `2. **IBM** (*July 2024 - Oct 2025*) – Application Developer (RxJS optimizations, IBM Cloud).\n` +
        `3. **Freelance** (*Nov 2023 - June 2024*) – British Railways maintenance platform (.NET Core) & booking software.\n` +
        `4. **Anicca Data Science** (*Nov 2022 - Oct 2023*) – Real-time inventory dashboards & Python DAG forecasting.\n` +
        `5. **Gloify & Vidhikara** (*2020 - 2022*) – Angular & .NET Core RESTful APIs.`;
    }

    if (q.includes('project') || q.includes('portfolio') || q.includes('built') || q.includes('app')) {
      return `🚀 **Key Projects Built by Binod**:\n\n` +
        `• 🌴 **[ZigTravel](https://thisisbinodprasad.github.io/zigtravel/)**: Travel booking & trip curation app.\n` +
        `• 📜 **[Resume Master](https://thisisbinodprasad.github.io/resumeMaster/)**: ATS resume builder using Angular Signals.\n` +
        `• 📈 **[Koshex](https://koshex.com/)**: Investment & mutual fund tracking platform.\n` +
        `• ✈️ **[Flexflier](https://flexflier.com/home)**: Flight & hotel booking portal.`;
    }

    if (q.includes('education') || q.includes('degree') || q.includes('college') || q.includes('university') || q.includes('study')) {
      return `🎓 **Education & Background**:\n\n` +
        `Binod holds a degree in Computer Science / Engineering and has completed continuous certifications in Angular, Cloud Architecture, and Generative AI integrations.`;
    }

    if (q.includes('contact') || q.includes('email') || q.includes('hire') || q.includes('reach') || q.includes('phone') || q.includes('message')) {
      return `📬 **Get in Touch with Binod**:\n\n` +
        `• **GitHub**: [github.com/thisIsBinodPrasad](https://github.com/thisIsBinodPrasad)\n` +
        `• **Resume PDF**: Download directly from the hero header banner!\n` +
        `• Feel free to fill out the **Contact Form** at the bottom of the page!`;
    }

    if (q.includes('who') || q.includes('about') || q.includes('binod') || q.includes('summary') || q.includes('intro')) {
      return `👋 ${this.resumeKnowledge.bio}\n\nHe specializes in building high-performance web apps, reactive frontends with Angular Signals, and AI-driven solutions.`;
    }

    return `I can help you explore Binod's profile! Try asking:\n` +
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

    formatted = formatted.replace(
      /\[([^\]]+)\]\(([^)]+)\)/g,
      '<a href="$2" target="_blank" rel="noopener">$1</a>'
    );

    formatted = formatted.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
    formatted = formatted.replace(/\*([^*]+)\*/g, '<em>$1</em>');
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
