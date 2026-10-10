import{j as B,m as E,o as F,p as L,q as H,s as N,u as w}from"./chunk-FBAGWX33.js";import{e as b,l as D,s as y,t as v,u as R}from"./chunk-PXADYNGJ.js";import{Ab as f,Eb as T,Gb as I,Ib as s,Ka as O,Oa as l,Pb as d,Sb as i,Tb as c,U as S,Ub as p,Xa as C,Z as _,_ as P,bb as x,rb as A,sb as M,tb as z,ub as m,vb as g,wb as h,xb as u,yb as o,zb as n}from"./chunk-YTLQIWCB.js";function V(t,r){if(t&1&&(o(0,"span",9),i(1),n()),t&2){let e=r.$implicit,a=s();d("background",a.data.accentColor+"18")("color",a.data.accentColor)("border-color",a.data.accentColor+"44"),l(),c(e)}}function $(t,r){if(t&1&&(o(0,"h3",16),i(1),n()),t&2){let e=s().$implicit,a=s();d("border-color",a.data.accentColor)("color",a.data.accentColor),l(),p(" ",e.content," ")}}function X(t,r){if(t&1&&(o(0,"p",11),i(1),n()),t&2){let e=s().$implicit;l(),c(e.content)}}function K(t,r){if(t&1&&(o(0,"pre",12)(1,"code"),i(2),n()()),t&2){let e=s().$implicit;l(2),c(e.content)}}function Y(t,r){if(t&1&&(o(0,"li"),i(1),n()),t&2){let e=r.$implicit;l(),c(e)}}function Z(t,r){if(t&1&&(o(0,"ul",17),g(1,Y,2,1,"li",null,m),n()),t&2){let e=s().$implicit,a=s();d("--bullet",a.data.accentColor),l(),h(e.items)}}function Q(t,r){if(t&1&&f(0,"div",14),t&2){let e=s().$implicit,a=s();u("innerHTML",a.safe(e.svg),O)}}function ee(t,r){if(t&1&&(o(0,"div",15),i(1),n()),t&2){let e=s().$implicit;l(),c(e.content)}}function te(t,r){if(t&1&&A(0,$,2,5,"h3",10)(1,X,2,1,"p",11)(2,K,3,1,"pre",12)(3,Z,3,2,"ul",13)(4,Q,1,1,"div",14)(5,ee,2,1,"div",15),t&2){let e,a=r.$implicit;M((e=a.type)==="heading"?0:e==="paragraph"?1:e==="code"?2:e==="list"?3:e==="diagram"?4:e==="callout"?5:-1)}}var k=class t{constructor(r,e){this.data=r;this.sanitizer=e}safe(r){return this.sanitizer.bypassSecurityTrustHtml(r)}static \u0275fac=function(e){return new(e||t)(C(F),C(D))};static \u0275cmp=x({type:t,selectors:[["app-blog-detail-dialog"]],decls:22,vars:3,consts:[[1,"dlg-header"],[1,"header-top"],[1,"post-tags"],[1,"tag",3,"background","color","border-color"],["mat-icon-button","","mat-dialog-close","","aria-label","Close",1,"close-btn"],[1,"post-meta"],[1,"sep"],[1,"post-title"],[1,"dlg-body"],[1,"tag"],[1,"s-heading",3,"border-color","color"],[1,"s-para"],[1,"s-code"],[1,"s-list",3,"--bullet"],[1,"s-diagram",3,"innerHTML"],[1,"s-callout"],[1,"s-heading"],[1,"s-list"]],template:function(e,a){e&1&&(o(0,"div",0)(1,"div",1)(2,"div",2),g(3,V,2,7,"span",3,m),n(),o(5,"button",4)(6,"mat-icon"),i(7,"close"),n()()(),o(8,"div",5)(9,"mat-icon"),i(10,"calendar_today"),n(),i(11),o(12,"span",6),i(13,"\xB7"),n(),o(14,"mat-icon"),i(15,"schedule"),n(),i(16),n(),o(17,"h2",7),i(18),n()(),o(19,"mat-dialog-content",8),g(20,te,6,1,null,null,z),n()),e&2&&(l(3),h(a.data.tags),l(8),p("",a.data.date," "),l(5),p("",a.data.readTime," "),l(2),c(a.data.title),l(2),h(a.data.content))},dependencies:[b,w,H,N,E,B,v,y],styles:['[_nghost-%COMP%]{display:block;background:#0a1020;border-radius:16px;overflow:hidden;border:1px solid rgba(255,255,255,.06)}.dlg-header[_ngcontent-%COMP%]{padding:24px 28px 20px;border-bottom:1px solid rgba(255,255,255,.07);background:linear-gradient(135deg,#0f172ae6,#0a101e)}.header-top[_ngcontent-%COMP%]{display:flex;align-items:flex-start;justify-content:space-between;gap:12px;margin-bottom:10px}.post-tags[_ngcontent-%COMP%]{display:flex;gap:7px;flex-wrap:wrap}.post-tags[_ngcontent-%COMP%]   .tag[_ngcontent-%COMP%]{font-size:.67rem;font-weight:700;padding:3px 10px;border-radius:12px;border:1px solid;text-transform:uppercase;letter-spacing:.5px}.close-btn[_ngcontent-%COMP%]{color:#fff6!important;flex-shrink:0;margin-top:-4px;transition:color .2s!important}.close-btn[_ngcontent-%COMP%]:hover{color:#ffffffe6!important}.post-meta[_ngcontent-%COMP%]{display:flex;align-items:center;gap:5px;font-size:.78rem;color:#ffffff59;margin-bottom:12px}.post-meta[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%]{font-size:13px;width:13px;height:13px}.post-meta[_ngcontent-%COMP%]   .sep[_ngcontent-%COMP%]{margin:0 4px}.post-title[_ngcontent-%COMP%]{font-size:1.45rem;font-weight:700;line-height:1.3;margin:0;color:#e2e8f0}@media(max-width:600px){.post-title[_ngcontent-%COMP%]{font-size:1.2rem}}.dlg-body[_ngcontent-%COMP%]{padding:24px 28px!important;color:#cbd5e1;font-size:.94rem;line-height:1.75;max-height:62vh}.s-heading[_ngcontent-%COMP%]{font-size:1.05rem;font-weight:700;margin:28px 0 10px;padding-left:12px;border-left:3px solid}.s-para[_ngcontent-%COMP%]{margin:0 0 16px;color:#94a3b8}.s-code[_ngcontent-%COMP%]{background:#00000073;border:1px solid rgba(255,255,255,.07);border-radius:10px;padding:16px 18px;margin:0 0 18px;overflow-x:auto}.s-code[_ngcontent-%COMP%]   code[_ngcontent-%COMP%]{font-family:JetBrains Mono,Fira Code,Cascadia Code,Courier New,monospace;font-size:.8rem;color:#a5f3fc;white-space:pre;line-height:1.7}.s-list[_ngcontent-%COMP%]{margin:0 0 18px;padding-left:20px;display:flex;flex-direction:column;gap:6px}.s-list[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]{color:#94a3b8;line-height:1.65}.s-list[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]::marker{color:var(--bullet, #14b8a6)}.s-callout[_ngcontent-%COMP%]{margin:36px -28px 8px;padding:40px 28px 32px;font-size:2.1rem;font-weight:900;text-align:center;line-height:1.2;letter-spacing:-.5px;background:linear-gradient(135deg,#14b8a6,#ec4899,#6366f1);-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent;position:relative}.s-callout[_ngcontent-%COMP%]:before{content:"";position:absolute;inset:0;background:linear-gradient(135deg,#14b8a60f,#ec48990f,#6366f10f);pointer-events:none}@media(max-width:600px){.s-callout[_ngcontent-%COMP%]{font-size:1.5rem;padding:28px 16px 24px}}.s-diagram[_ngcontent-%COMP%]{margin:20px 0 8px;border-radius:10px;overflow:hidden}.s-diagram[_ngcontent-%COMP%]     svg{display:block;width:100%;height:auto}'],changeDetection:0})};var ne=(t,r)=>r.title;function oe(t,r){if(t&1&&(o(0,"span",22),i(1),n()),t&2){let e=r.$implicit,a=s().$implicit;d("background",a.accentColor+"15")("color",a.accentColor)("border-color",a.accentColor+"40"),l(),p(" ",e," ")}}function ie(t,r){if(t&1){let e=T();o(0,"article",10),I("click",function(){let q=_(e).$implicit,G=s();return P(G.openPost(q))}),o(1,"div",11)(2,"div",12),g(3,oe,2,7,"span",13,m),n(),o(5,"div",14)(6,"span",15)(7,"mat-icon"),i(8,"calendar_today"),n(),i(9),n(),o(10,"span",16)(11,"mat-icon"),i(12,"schedule"),n(),i(13),n()()(),o(14,"h3",17),i(15),n(),o(16,"p",18),i(17),n(),o(18,"div",19)(19,"div",20),i(20," Read article "),o(21,"mat-icon"),i(22,"arrow_forward"),n()(),f(23,"div",21),n()()}if(t&2){let e=r.$implicit,a=r.$index;d("--accent",e.accentColor),u("appScrollReveal",a===0?"left":a===1?"":"right")("appScrollRevealDelay",a*80),l(3),h(e.tags),l(6),p("",e.date," "),l(4),p("",e.readTime," "),l(2),c(e.title),l(2),c(e.excerpt),l(2),d("color",e.accentColor),l(4),d("background","linear-gradient(90deg, "+e.accentColor+", transparent)")}}var ae=`<svg viewBox="0 0 540 296" xmlns="http://www.w3.org/2000/svg" style="width:100%;font-family:Inter,sans-serif">
  <rect width="540" height="296" fill="rgba(15,23,42,0.85)" rx="10"/>
  <text x="270" y="24" fill="#94a3b8" font-size="11" font-weight="600" text-anchor="middle">Cumulative Bundle Size Reduction (gzipped KB)</text>
  <line x1="174" y1="36" x2="174" y2="272" stroke="rgba(255,255,255,0.08)" stroke-width="1"/>
  <text x="168" y="58" fill="#94a3b8" font-size="10" text-anchor="end">Baseline</text>
  <rect x="174" y="46" height="20" rx="4" fill="#475569" opacity="0.85" width="260"/>
  <text x="442" y="60" fill="#e2e8f0" font-size="10">450 KB</text>
  <text x="168" y="98" fill="#94a3b8" font-size="10" text-anchor="end">+Standalone</text>
  <rect x="174" y="86" height="20" rx="4" fill="#14b8a6" opacity="0.85" width="185"/>
  <text x="367" y="100" fill="#e2e8f0" font-size="10">320 KB (-130)</text>
  <text x="168" y="138" fill="#94a3b8" font-size="10" text-anchor="end">+Lazy Routes</text>
  <rect x="174" y="126" height="20" rx="4" fill="#14b8a6" opacity="0.85" width="113"/>
  <text x="295" y="140" fill="#e2e8f0" font-size="10">195 KB (-125)</text>
  <text x="168" y="178" fill="#94a3b8" font-size="10" text-anchor="end">+@defer</text>
  <rect x="174" y="166" height="20" rx="4" fill="#ec4899" opacity="0.85" width="66"/>
  <text x="248" y="180" fill="#e2e8f0" font-size="10">115 KB (-80)</text>
  <text x="168" y="218" fill="#94a3b8" font-size="10" text-anchor="end">+Zoneless</text>
  <rect x="174" y="206" height="20" rx="4" fill="#a855f7" opacity="0.85" width="51"/>
  <text x="233" y="220" fill="#e2e8f0" font-size="10">88 KB (-27)</text>
  <text x="168" y="258" fill="#94a3b8" font-size="10" text-anchor="end">+lodash-es</text>
  <rect x="174" y="246" height="20" rx="4" fill="#a855f7" opacity="0.85" width="36"/>
  <text x="218" y="260" fill="#e2e8f0" font-size="10">62 KB (-26)</text>
  <text x="174" y="288" fill="#64748b" font-size="9">0</text>
  <text x="428" y="288" fill="#64748b" font-size="9">450 KB</text>
</svg>`,re=`<svg viewBox="0 0 560 175" xmlns="http://www.w3.org/2000/svg" style="width:100%;font-family:Inter,sans-serif">
  <defs>
    <marker id="ah" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
      <polygon points="0,0 6,3 0,6" fill="#475569"/>
    </marker>
  </defs>
  <rect width="560" height="175" fill="rgba(15,23,42,0.85)" rx="10"/>
  <text x="280" y="22" fill="#94a3b8" font-size="11" font-weight="600" text-anchor="middle">Claude API Integration Architecture</text>
  <rect x="15" y="45" width="140" height="80" rx="10" fill="rgba(99,102,241,0.18)" stroke="#6366f1" stroke-width="1.5"/>
  <text x="85" y="75" fill="#e2e8f0" font-size="11" font-weight="700" text-anchor="middle">Angular App</text>
  <text x="85" y="91" fill="#a5b4fc" font-size="9" text-anchor="middle">Signal + ReadableStream</text>
  <text x="85" y="107" fill="#64748b" font-size="9" text-anchor="middle">User Browser</text>
  <rect x="210" y="45" width="140" height="80" rx="10" fill="rgba(20,184,166,0.18)" stroke="#14b8a6" stroke-width="1.5"/>
  <text x="280" y="75" fill="#e2e8f0" font-size="11" font-weight="700" text-anchor="middle">NestJS Backend</text>
  <text x="280" y="91" fill="#5eead4" font-size="9" text-anchor="middle">Anthropic SDK</text>
  <text x="280" y="107" fill="#64748b" font-size="9" text-anchor="middle">API key lives here</text>
  <rect x="405" y="45" width="140" height="80" rx="10" fill="rgba(236,72,153,0.18)" stroke="#ec4899" stroke-width="1.5"/>
  <text x="475" y="75" fill="#e2e8f0" font-size="11" font-weight="700" text-anchor="middle">Claude API</text>
  <text x="475" y="91" fill="#f9a8d4" font-size="9" text-anchor="middle">claude-opus-5-5</text>
  <text x="475" y="107" fill="#64748b" font-size="9" text-anchor="middle">Anthropic</text>
  <line x1="158" y1="70" x2="207" y2="70" stroke="#14b8a6" stroke-width="1.5" marker-end="url(#ah)"/>
  <text x="182" y="63" fill="#14b8a6" font-size="8" text-anchor="middle">POST /chat</text>
  <line x1="353" y1="70" x2="402" y2="70" stroke="#14b8a6" stroke-width="1.5" marker-end="url(#ah)"/>
  <text x="377" y="63" fill="#14b8a6" font-size="8" text-anchor="middle">messages.stream()</text>
  <line x1="207" y1="112" x2="158" y2="112" stroke="#6366f1" stroke-width="1.5" marker-end="url(#ah)"/>
  <text x="182" y="132" fill="#6366f1" font-size="8" text-anchor="middle">ReadableStream</text>
  <line x1="402" y1="112" x2="353" y2="112" stroke="#6366f1" stroke-width="1.5" marker-end="url(#ah)"/>
  <text x="377" y="132" fill="#6366f1" font-size="8" text-anchor="middle">SSE text chunks</text>
</svg>`,le=`<svg viewBox="0 0 520 262" xmlns="http://www.w3.org/2000/svg" style="width:100%;font-family:Inter,sans-serif">
  <rect width="520" height="262" fill="rgba(15,23,42,0.85)" rx="10"/>
  <rect x="12" y="12" width="237" height="34" rx="8" fill="rgba(99,102,241,0.28)"/>
  <text x="130" y="34" fill="#a5b4fc" font-size="13" font-weight="700" text-anchor="middle">Use Signal</text>
  <rect x="271" y="12" width="237" height="34" rx="8" fill="rgba(20,184,166,0.28)"/>
  <text x="389" y="34" fill="#5eead4" font-size="13" font-weight="700" text-anchor="middle">Use RxJS</text>
  <line x1="260" y1="10" x2="260" y2="250" stroke="rgba(255,255,255,0.07)" stroke-width="1"/>
  <text x="130" y="69" fill="#94a3b8" font-size="10" text-anchor="middle">Component-local state</text>
  <text x="389" y="69" fill="#94a3b8" font-size="10" text-anchor="middle">HTTP requests</text>
  <line x1="12" y1="77" x2="508" y2="77" stroke="rgba(255,255,255,0.04)" stroke-width="1"/>
  <text x="130" y="107" fill="#94a3b8" font-size="10" text-anchor="middle">Sync derived (computed)</text>
  <text x="389" y="107" fill="#94a3b8" font-size="10" text-anchor="middle">debounce / throttle / delay</text>
  <line x1="12" y1="115" x2="508" y2="115" stroke="rgba(255,255,255,0.04)" stroke-width="1"/>
  <text x="130" y="145" fill="#94a3b8" font-size="10" text-anchor="middle">UI toggles / loading flags</text>
  <text x="389" y="145" fill="#94a3b8" font-size="10" text-anchor="middle">Multi-stream combineLatest</text>
  <line x1="12" y1="153" x2="508" y2="153" stroke="rgba(255,255,255,0.04)" stroke-width="1"/>
  <text x="130" y="183" fill="#94a3b8" font-size="10" text-anchor="middle">Template auto-tracking</text>
  <text x="389" y="183" fill="#94a3b8" font-size="10" text-anchor="middle">switchMap (cancellation)</text>
  <line x1="12" y1="191" x2="508" y2="191" stroke="rgba(255,255,255,0.04)" stroke-width="1"/>
  <text x="130" y="221" fill="#94a3b8" font-size="10" text-anchor="middle">input() / output() / model()</text>
  <text x="389" y="221" fill="#94a3b8" font-size="10" text-anchor="middle">WebSocket / SSE / fromEvent</text>
  <line x1="12" y1="229" x2="508" y2="229" stroke="rgba(255,255,255,0.04)" stroke-width="1"/>
  <rect x="80" y="237" width="360" height="20" rx="6" fill="rgba(251,191,36,0.12)"/>
  <text x="260" y="251" fill="#fbbf24" font-size="9" text-anchor="middle" font-weight="600">Bridge: toSignal(obs$) and toObservable(sig) connect both worlds</text>
</svg>`,se=`<svg viewBox="0 0 560 310" xmlns="http://www.w3.org/2000/svg" style="width:100%;font-family:Inter,sans-serif">
  <rect width="560" height="310" fill="rgba(15,23,42,0.85)" rx="10"/>
  <text x="280" y="20" fill="#94a3b8" font-size="11" font-weight="600" text-anchor="middle">17 Standalone Angular Components</text>
  <rect x="195" y="30" width="170" height="26" rx="8" fill="rgba(20,184,166,0.25)" stroke="#14b8a6" stroke-width="1.5"/>
  <text x="280" y="47" fill="#e2e8f0" font-size="10" font-weight="700" text-anchor="middle">app.ts \u2014 Root Component</text>
  <line x1="280" y1="56" x2="280" y2="68" stroke="#334155" stroke-width="1"/>
  <line x1="125" y1="68" x2="435" y2="68" stroke="#334155" stroke-width="1"/>
  <line x1="125" y1="68" x2="125" y2="80" stroke="#334155" stroke-width="1"/>
  <line x1="435" y1="68" x2="435" y2="80" stroke="#334155" stroke-width="1"/>
  <rect x="15" y="80" width="220" height="18" rx="4" fill="rgba(99,102,241,0.2)" stroke="rgba(99,102,241,0.5)" stroke-width="1"/>
  <text x="125" y="92" fill="#a5b4fc" font-size="9" font-weight="700" text-anchor="middle">FIXED / OVERLAY</text>
  <rect x="325" y="80" width="220" height="18" rx="4" fill="rgba(20,184,166,0.2)" stroke="rgba(20,184,166,0.5)" stroke-width="1"/>
  <text x="435" y="92" fill="#5eead4" font-size="9" font-weight="700" text-anchor="middle">SCROLLABLE SECTIONS</text>
  <rect x="20" y="108" width="100" height="18" rx="4" fill="rgba(99,102,241,0.1)" stroke="rgba(99,102,241,0.35)" stroke-width="1"/>
  <text x="70" y="120" fill="#94a3b8" font-size="9" text-anchor="middle">AnimatedBg</text>
  <rect x="130" y="108" width="100" height="18" rx="4" fill="rgba(99,102,241,0.1)" stroke="rgba(99,102,241,0.35)" stroke-width="1"/>
  <text x="180" y="120" fill="#94a3b8" font-size="9" text-anchor="middle">Header</text>
  <rect x="20" y="134" width="100" height="18" rx="4" fill="rgba(99,102,241,0.1)" stroke="rgba(99,102,241,0.35)" stroke-width="1"/>
  <text x="70" y="146" fill="#94a3b8" font-size="9" text-anchor="middle">PageLoader</text>
  <rect x="130" y="134" width="100" height="18" rx="4" fill="rgba(99,102,241,0.1)" stroke="rgba(99,102,241,0.35)" stroke-width="1"/>
  <text x="180" y="146" fill="#94a3b8" font-size="9" text-anchor="middle">BackToTop</text>
  <rect x="20" y="160" width="100" height="18" rx="4" fill="rgba(99,102,241,0.1)" stroke="rgba(99,102,241,0.35)" stroke-width="1"/>
  <text x="70" y="172" fill="#94a3b8" font-size="9" text-anchor="middle">SectionNav</text>
  <rect x="130" y="160" width="100" height="18" rx="4" fill="rgba(99,102,241,0.1)" stroke="rgba(99,102,241,0.35)" stroke-width="1"/>
  <text x="180" y="172" fill="#94a3b8" font-size="9" text-anchor="middle">AiChatbot</text>
  <rect x="330" y="108" width="100" height="18" rx="4" fill="rgba(20,184,166,0.1)" stroke="rgba(20,184,166,0.35)" stroke-width="1"/>
  <text x="380" y="120" fill="#94a3b8" font-size="9" text-anchor="middle">Hero / About</text>
  <rect x="440" y="108" width="100" height="18" rx="4" fill="rgba(20,184,166,0.1)" stroke="rgba(20,184,166,0.35)" stroke-width="1"/>
  <text x="490" y="120" fill="#94a3b8" font-size="9" text-anchor="middle">Experience</text>
  <rect x="330" y="134" width="100" height="18" rx="4" fill="rgba(20,184,166,0.1)" stroke="rgba(20,184,166,0.35)" stroke-width="1"/>
  <text x="380" y="146" fill="#94a3b8" font-size="9" text-anchor="middle">Projects</text>
  <rect x="440" y="134" width="100" height="18" rx="4" fill="rgba(20,184,166,0.1)" stroke="rgba(20,184,166,0.35)" stroke-width="1"/>
  <text x="490" y="146" fill="#94a3b8" font-size="9" text-anchor="middle">Skills</text>
  <rect x="325" y="160" width="220" height="58" rx="6" fill="rgba(251,191,36,0.06)" stroke="rgba(251,191,36,0.25)" stroke-width="1" stroke-dasharray="5 3"/>
  <text x="435" y="172" fill="#fbbf24" font-size="8" text-anchor="middle" font-weight="600">@defer \u2014 code-split on viewport</text>
  <rect x="330" y="178" width="62" height="18" rx="4" fill="rgba(236,72,153,0.12)" stroke="rgba(236,72,153,0.4)" stroke-width="1"/>
  <text x="361" y="190" fill="#94a3b8" font-size="8" text-anchor="middle">Testimonials</text>
  <rect x="400" y="178" width="66" height="18" rx="4" fill="rgba(236,72,153,0.12)" stroke="rgba(236,72,153,0.4)" stroke-width="1"/>
  <text x="433" y="190" fill="#94a3b8" font-size="8" text-anchor="middle">Certifications</text>
  <rect x="474" y="178" width="62" height="18" rx="4" fill="rgba(236,72,153,0.12)" stroke="rgba(236,72,153,0.4)" stroke-width="1"/>
  <text x="505" y="190" fill="#94a3b8" font-size="8" text-anchor="middle">Blog</text>
  <rect x="330" y="228" width="100" height="18" rx="4" fill="rgba(20,184,166,0.1)" stroke="rgba(20,184,166,0.35)" stroke-width="1"/>
  <text x="380" y="240" fill="#94a3b8" font-size="9" text-anchor="middle">Contact</text>
  <rect x="440" y="228" width="100" height="18" rx="4" fill="rgba(20,184,166,0.1)" stroke="rgba(20,184,166,0.35)" stroke-width="1"/>
  <text x="490" y="240" fill="#94a3b8" font-size="9" text-anchor="middle">Footer</text>
  <rect x="15" y="264" width="530" height="20" rx="4" fill="rgba(168,85,247,0.12)" stroke="rgba(168,85,247,0.35)" stroke-width="1"/>
  <text x="280" y="278" fill="#d8b4fe" font-size="9" text-anchor="middle">ScrollRevealDirective \xB7 ThemeService \xB7 MatDialog \xB7 CSS Custom Properties</text>
  <rect x="15" y="290" width="10" height="10" rx="2" fill="rgba(99,102,241,0.2)" stroke="#6366f1" stroke-width="1"/>
  <text x="30" y="299" fill="#64748b" font-size="8">Fixed</text>
  <rect x="75" y="290" width="10" height="10" rx="2" fill="rgba(20,184,166,0.2)" stroke="#14b8a6" stroke-width="1"/>
  <text x="90" y="299" fill="#64748b" font-size="8">Section</text>
  <rect x="145" y="290" width="10" height="10" rx="2" fill="rgba(236,72,153,0.2)" stroke="#ec4899" stroke-width="1"/>
  <text x="160" y="299" fill="#64748b" font-size="8">@defer loaded</text>
  <rect x="218" y="290" width="10" height="10" rx="2" fill="rgba(251,191,36,0.1)" stroke="rgba(251,191,36,0.4)" stroke-width="1" stroke-dasharray="4 2"/>
  <text x="233" y="299" fill="#64748b" font-size="8">Lazy boundary</text>
</svg>`,ce=`You are an expert Angular 21 developer and UI/UX designer.
Build me a complete, production-ready personal portfolio website.
I will provide my resume \u2014 extract all data from it (name, title,
roles, skills, experience, projects, certifications, education,
contact info) and use it to populate every section.

TECH STACK
- Angular 21, standalone components (no NgModules), SSR (@angular/ssr)
- Angular Material (toolbar, icon, button, dialog, form-field, chip)
- TypeScript strict mode, SCSS, CSS custom properties
- ChangeDetectionStrategy.OnPush on ALL components
- Claude API (claude-opus-5-5) for an AI chatbot sidebar

VISUAL DESIGN \u2014 dark theme default, light mode toggle
Color tokens: primary #14b8a6, accent #ec4899, bg #0f172a,
surface #1e293b, text #f8fafc, muted #94a3b8.
Font: Inter (body) + Outfit (headings), preconnected via Google Fonts.
Glass cards: rgba(30,41,59,0.7) bg, backdrop-filter blur(14px),
1px rgba(255,255,255,0.1) border, border-radius 16px.
Section titles: gradient ::after underline animates width 0\u2192100%
on 1s cubic-bezier(0.22,1,0.36,1) after 0.4s delay.

ANIMATED BACKGROUND (fixed, z-index -1, pointer-events none)
Canvas particle system: 60-95 particles (min(area/10000, 95)),
each with position, velocity (\xB10.325), radius (0.7-3.1), baseAlpha,
color from ['#14b8a6','#ec4899','#6366f1','#38bdf8','#a855f7'],
pulseOffset. Per frame: move, bounce edges, repel from mouse
(radius 180px), pulse alpha with sin(), draw circle, connect
particles <145px with fading lines. Squared distances only.
runOutsideAngular(). Pause on tab hidden. 30fps cap on mobile.
CSS layer: 5 glow orbs (blur 90px radial gradients, floatOrb),
2 aurora bands (blur 70px, auroraMove), dot grid (gridPulse),
4 floating geometric shapes (floatShape). Mobile: halve blur.

HEADER (fixed, z-index 1000)
3px teal\u2192pink\u2192indigo scroll progress bar above navbar, rAF-updated.
Frosted glass: backdrop-filter blur(18px). IntersectionObserver
(threshold 0.35) on section elements for active nav link. Logo
hover grows ::after underline. Nav links: hover expands centered
underline from 50%. Contact link as teal pill. Sound toggle via
Web Audio API brown noise (lowpass 280Hz, gain 0.04). Theme toggle
persisted to localStorage. Hamburger \u2192 slide-in mobile menu from
right. All async state: markForCheck() after ngZone.run().

PAGE LOADER \u2014 full-screen, z-index 9999, animated progress bar,
fades out after 2.4s. OnPush + markForCheck() in setInterval.

HERO \u2014 two-column: gradient name text, typewriter subtitle cycling
roles via setInterval (OnPush + markForCheck), 3 animated counters
(years / projects / technologies), Download CV button (download
attr), View Work scroll-to anchor, social links. Profile image:
fetchpriority="high" decoding="async", circular gradient border.
Animated SVG code symbol in background.

EXPERIENCE \u2014 timeline cards with left color-accent border,
company, role, date range, bullet points, tech chip tags.
Scroll reveal left/right alternating.

PROJECTS \u2014 filter tabs (All + category tabs), grid of cards,
thumbnail (loading="lazy" decoding="async"), title, description,
tech chips, GitHub + demo links. Image zooms 1.08x on hover.
Staggered scroll reveal (i * 80ms delay).

SKILLS \u2014 category tabs, animated progress bars fill on
IntersectionObserver, tech icon grid with hover effects.

TESTIMONIALS \u2014 2-column glass cards, format_quote icon, italic
text, initials avatar colored by company, verified icon badge.

CERTIFICATIONS \u2014 cards with credential name, issuer, date,
external verify link.

BLOG / WRITING \u2014 3-column card grid, click opens MatDialog
with full article: headings, paragraphs, code blocks, lists,
inline SVG diagrams. DomSanitizer.bypassSecurityTrustHtml().

CONTACT \u2014 ReactiveFormsModule: name, email, subject, message.
Validators: required, email, minLength. Success/error feedback.

AI CHATBOT \u2014 floating FAB (bottom-right), slide-up chat panel,
POST /api/chat \u2192 SSE stream \u2192 ReadableStream in Angular \u2192
WritableSignal<string> buffer updated token by token. System
prompt baked with full resume so Claude answers accurately.

ScrollRevealDirective \u2014 IntersectionObserver threshold 0.1,
adds .reveal-hidden / .reveal-left / .reveal-right on init,
.reveal-visible on intersect. [appScrollRevealDelay] sets
CSS transition-delay for staggered entrance.

PERFORMANCE (implement ALL)
OnPush + markForCheck() after every async update.
@defer (on viewport; prefetch on idle) on testimonials,
certifications, blog.
content-visibility: auto + contain-intrinsic-size: 0 700px
on those three sections.
ngZone.runOutsideAngular() for canvas animation loop.
rAF + ticking flag for scroll events.
Squared distances in hot loop.
30fps mobile cap (delta < 33ms check).
cancelAnimationFrame on tab hidden.
fetchpriority="high" on hero image; loading="lazy" on rest.
Google Fonts via preconnect + preload.
provideHttpClient(withFetch()) in app.config.ts.
Reduced backdrop-filter blur on mobile.

BackToTop \u2014 fixed bottom-right, visible after 400px, OnPush.
SectionNav \u2014 fixed side dots, active via IntersectionObserver.

Generate the complete project: app.config.ts, app.ts, theme.service.ts,
one folder per component, scroll-reveal.directive.ts, index.html,
styles.scss, angular.json (SSR configured), server.ts.
Replace all placeholders with data from the resume I will provide.`,de=[{title:"Building This Portfolio: Every Feature, Animation & Optimization Explained",date:"Oct 2026",readTime:"12 min read",excerpt:"A complete behind-the-scenes breakdown of how this portfolio was built with Angular 21, SSR, and Claude AI \u2014 every animation, every performance trick, every minute detail, and the prompt that made it possible.",tags:["Angular","Portfolio","AI","Performance"],accentColor:"#38bdf8",content:[{type:"paragraph",content:"This portfolio was built from scratch using Angular 21 with SSR, Angular Material, and a layered animation system \u2014 and every line was generated through AI-assisted development using Claude Code. Here is a complete breakdown of every section, animation, directive, and performance optimization that went into it."},{type:"heading",content:"Tech Stack"},{type:"list",items:["Angular 21 \u2014 standalone components (no NgModules), SSR via @angular/ssr","Angular Material \u2014 toolbar, icon, button, dialog, form-field, ripple, chip","TypeScript strict mode throughout","SCSS with CSS custom properties (color tokens, glass variables)","Vite dev server (Angular CLI), Express for SSR","Claude API (claude-opus-5-5) for the AI chatbot","Web Audio API for the ambient brown noise toggle","Canvas 2D API for the particle system"]},{type:"heading",content:"Design System \u2014 Color Tokens & Glass Morphism"},{type:"paragraph",content:"The entire visual language flows from three core color tokens. Every gradient, glow, border highlight, and tag uses these three values \u2014 nothing is hard-coded in components."},{type:"code",content:`:root {
  --primary-color: #14b8a6;  /* Teal 500  */
  --accent-color:  #ec4899;  /* Pink 500  */
  --bg-color:      #0f172a;  /* Slate 900 */
  --surface-color: #1e293b;  /* Slate 800 */
  --text-color:    #f8fafc;  /* Slate 50  */
  --text-muted:    #94a3b8;  /* Slate 400 */

  /* Glass morphism card */
  --glass-bg:     rgba(30, 41, 59, 0.7);
  --glass-border: rgba(255, 255, 255, 0.1);
  --glass-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
}

/* Light theme overrides on <html class="light-theme"> */
.light-theme {
  --bg-color:      #f8fafc;
  --surface-color: #ffffff;
  --text-color:    #0f172a;
  --text-muted:    #64748b;
  --glass-bg:      rgba(255, 255, 255, 0.7);
}`},{type:"heading",content:"Component Architecture \u2014 17 Standalone Components"},{type:"diagram",svg:se},{type:"heading",content:"Animated Background \u2014 Canvas + CSS Layers"},{type:"paragraph",content:"The background runs two parallel animation systems: a Canvas 2D particle engine and a pure CSS layer. Both are entirely outside Angular's change detection cycle to prevent per-frame CD runs."},{type:"list",items:["Canvas particles: count = min(width\xD7height / 10000, 95) \u2014 scales to screen size","Mouse repulsion: squared distance check (dx\xB2+dy\xB2 vs 180\xB2) avoids Math.sqrt for ~99% of particles","Connection lines: drawn between particles within 145px, alpha = (1 - dist/145) \xD7 0.18","Pulsing alpha: baseAlpha + sin(time\xD71.4 + pulseOffset) \xD7 0.14 \u2014 each particle breathes independently","5 CSS glow orbs: teal top-left, pink bottom-right, indigo center, sky top-right, purple bottom-left; floatOrb keyframe (translate+scale, 16-26s, alternate)","2 Aurora layers: 250%-width blurred gradient bands, auroraMove keyframe (translateX+scaleX, 14-18s)","Dot grid: radial-gradient 52px grid, gridPulse keyframe pulses size and opacity","4 floating geometric shapes: square, circle, diamond, rounded square with floatShape (rotate+translateY+scale)","Tab visibility: cancelAnimationFrame on document.hidden, resume on visibilitychange","Mobile (max-width 768px): blur halved (90\u219245px, 70\u219235px), shapes hidden, grid animation disabled, 30fps cap"]},{type:"heading",content:"The Header \u2014 Every Detail"},{type:"list",items:["Scroll progress bar: 3px gradient strip (teal\u2192pink\u2192indigo), box-shadow glow, rAF-updated, fixed above navbar","Navbar entrance: navSlideDown keyframe (translateY(-100%)\u21920 + opacity 0\u21921, 0.7s cubic-bezier)","Active section: IntersectionObserver with threshold 0.35 on #about, #experience, #projects, #skills, #contact",'Logo: "Binod.P" in three styled spans; ::after pseudo-element underline grows width 0\u2192100% on hover',"Nav link hover: ::after underline expands outward from center \u2014 left moves left as width grows right","Contact link: pill border (border-radius 20px, 1px teal border), teal glow on hover","Sound toggle: first click creates AudioContext + lowpass-filtered brown noise buffer (loop, gain 0.04, cutoff 280Hz); subsequent clicks suspend/resume","Theme toggle: toggles .light-theme class on <html>, persisted to localStorage","Hamburger \u2192 X: span 1 translateY(7px)+rotate(45deg), span 2 opacity 0, span 3 translateY(-7px)+rotate(-45deg)","Mobile overlay: slides from right (translateX 100%\u21920, 0.4s cubic-bezier), numbered items (01-07), backdrop blur"]},{type:"heading",content:"Hero Section"},{type:"list",items:["Gradient name: background-clip: text with linear-gradient from primary to accent","Typewriter subtitle: setInterval cycles through role strings, OnPush + markForCheck() on each tick","3 stat counters: setInterval from 0 to target (years / projects / technologies), staggered start",'Profile image: fetchpriority="high" decoding="async", circular clip, gradient border glow ring',"Animated SVG: rotating bracket/code symbol in background with CSS keyframe rotation","Download CV: anchor tag with download attribute pointing to /assets/resume.pdf","View Work button: smooth scroll to #experience via anchor href","Social links: GitHub, LinkedIn, Email \u2014 each with hover color and scale transition"]},{type:"heading",content:"Scroll Reveal Directive"},{type:"paragraph",content:"Every major element in the portfolio has a custom ScrollRevealDirective applied. It uses IntersectionObserver at threshold 0.1 to fire a one-time CSS transition from hidden to visible. Three directional modes let different elements slide in from different angles."},{type:"code",content:`// Applied to host element on init \u2014 one of three classes:
.reveal-hidden  { opacity: 0; transform: translateY(42px);  }  // default
.reveal-left    { opacity: 0; transform: translateX(-64px); }  // direction='left'
.reveal-right   { opacity: 0; transform: translateX(64px);  }  // direction='right'

// Transition: 0.85s cubic-bezier(0.5, 0, 0, 1) \u2014 slightly springy

// When element enters viewport:
.reveal-visible { opacity: 1 !important; transform: translate(0) !important; }

// Staggered with [appScrollRevealDelay]="i * 80" \u2192 transition-delay: 80ms, 160ms, 240ms...
// Observer disconnects after first fire \u2014 zero ongoing overhead`},{type:"heading",content:"Sections at a Glance"},{type:"list",items:["Experience: left-bordered timeline cards (3px primary-color border), company, role, dates, bullet points, tech chips. Scroll reveal left/right alternating.","Projects: filter tab bar (All + categories), 3-column grid, image zoom 1.08x on hover, overlay fades in with links. Staggered scroll reveal.","Skills: animated width fill on progress bars triggered by IntersectionObserver, categorized tabs, tech icon grid.","Testimonials: 2-column glass cards, format_quote icon in gradient, initials avatar with company-colored border, verified badge. Scroll reveal left/right.","Certifications: cards with issuer, date, credential ID, external verification link.","Blog/Writing: 3-column card grid, tag chips, click opens MatDialog with full article content + inline SVG diagrams.","Contact: ReactiveFormsModule with Validators.required, Validators.email, Validators.minLength; success/error state on submit.","Footer: social links, built-with attribution, copyright."]},{type:"heading",content:"AI Chatbot \u2014 Claude API Integration"},{type:"list",items:["Floating FAB (bottom-right), click opens slide-up chat panel with 400px max-height","Frontend POSTs to /api/chat; backend proxies to Claude API with streaming enabled","Backend forwards SSE chunks; Angular reads via ReadableStream + TextDecoder","Response buffer: WritableSignal<string> \u2014 update(r => r + chunk) on each token","isStreaming signal drives a typing indicator (animated dots) in the UI","System prompt embeds full resume data so Claude answers portfolio questions accurately","Model: claude-opus-5-5 with max_tokens: 1024 and a portfolio-specific context","Error handling: graceful degradation message when API is unavailable"]},{type:"heading",content:"Performance \u2014 Everything Implemented"},{type:"list",items:["ChangeDetectionStrategy.OnPush on all 17 components \u2014 eliminates full-tree CD on every scroll/rAF tick","markForCheck() called after every async state update (IntersectionObserver, setInterval, rAF callbacks)","@defer (on viewport; prefetch on idle) on Testimonials, Certifications, Blog \u2014 3 separate lazy chunks","content-visibility: auto + contain-intrinsic-size: 0 700px on those three sections","Canvas animation runs in ngZone.runOutsideAngular() \u2014 zero CD events from 60fps rAF loop","Scroll progress and back-to-top use requestAnimationFrame + scrollTicking boolean to batch DOM reads","Squared distance checks (dx\xB2+dy\xB2 vs threshold\xB2) \u2014 avoids Math.sqrt in O(n\xB2) particle inner loop","30fps mobile cap: if (timestamp - lastFrame < 33) return \u2014 halves GPU load on phones","cancelAnimationFrame on document.hidden, resume on visibilitychange \u2014 zero CPU when tab is hidden",'Hero image: fetchpriority="high" decoding="async" \u2014 prioritizes LCP element over other resources','Project images: loading="lazy" decoding="async" \u2014 defers off-screen decode',"Google Fonts: preconnect + preload link tag \u2014 eliminates FOUT, single combined request","provideHttpClient(withFetch()) \u2014 uses native fetch API for SSR compatibility (fixes NG02801)","Mobile backdrop-filter: blur(18px) \u2192 blur(8px) on max-width 768px"]},{type:"heading",content:"The Minute Details"},{type:"list",items:["Scroll progress bar glow: box-shadow: 0 0 12px rgba(20,184,166,0.7) \u2014 the bar itself glows","Navbar animation: cubic-bezier(0.22, 1, 0.36, 1) \u2014 slight overshoot, feels physical not linear",'Logo: "Binod" in --text-color, "." in --accent-color, "P" in --primary-color \u2014 three different CSS vars',"Glass card hover: border-color transitions to rgba(20,184,166,0.45) + 0 0 28px rgba(20,184,166,0.18) shadow","Section nav dots: tooltip appears on hover via CSS :hover + adjacent sibling, no JavaScript","Particle inner loop connection: pDistSq compared to 145*145 = 21025 \u2014 no division, no sqrt","Ambient noise uses AudioContext.createBuffer with 4s of samples, src.loop = true \u2014 gapless","Typewriter cursor: ::after with opacity animation, blinks while typing pauses","Page loader uses same teal\u2192pink gradient as the scroll progress bar \u2014 brand-consistent","Back-to-top button: opacity 0 \u2192 1 transition with pointer-events toggle \u2014 no layout shift","Project filter tabs use signal-based filtering \u2014 filtered = computed(() => ...) with no subscriptions","Custom scrollbar: 8px width, --surface-color track, teal thumb on :hover","All section title underlines use the same growLine keyframe (to { width: 100% }) \u2014 one shared CSS rule"]},{type:"callout",content:"See what Magic a prompt can bring"},{type:"paragraph",content:"Here is the exact prompt used to create this entire portfolio. Give it to any AI Agent along with your resume \u2014 it will generate every component, every animation, every performance optimization, and populate it with your personal data. Zero manual configuration."},{type:"code",content:ce}]},{title:"Optimizing Angular Bundle Size: What Actually Works",date:"Sep 2025",readTime:"5 min read",excerpt:"After building 10+ production Angular apps, here are the techniques that genuinely move the needle on bundle size and time-to-interactive \u2014 lazy loading, preloading strategies, and zone-less change detection.",tags:["Angular","Performance","Web Dev"],accentColor:"#14b8a6",content:[{type:"paragraph",content:"Bundle bloat is one of the most common performance bottlenecks in Angular apps. After working on 10+ production applications at Deloitte, I've found that some techniques genuinely move the needle while others feel productive but don't matter much. Here's what actually works, ordered by impact."},{type:"heading",content:"Measure First \u2014 Use Stats JSON"},{type:"paragraph",content:"Before changing anything, run a production build with --stats-json and load the output into webpack-bundle-analyzer. You'll immediately see which chunks are largest, which dependencies are duplicated, and where the quick wins are."},{type:"code",content:`npx ng build --stats-json
npx webpack-bundle-analyzer dist/your-app/browser/stats.json`},{type:"heading",content:"Switch to Standalone Components"},{type:"paragraph",content:"The highest-impact change you can make: migrate from NgModule-based architecture to standalone components. NgModules force Angular's compiler to keep entire module trees in the bundle even if only a fraction of each module's exports are used."},{type:"list",items:["Replace @NgModule with standalone: true on every component","Import only the specific modules/directives each component needs","Replace app.module.ts with app.config.ts + standalone bootstrap","Typical result: 25\u201335% bundle size reduction with no functional change"]},{type:"heading",content:"Lazy-Load Every Route"},{type:"paragraph",content:"Every route beyond the initial landing page should be loaded on demand. With loadComponent (Angular 15+), this is a one-liner per route and requires zero manual chunk configuration."},{type:"code",content:`const routes: Routes = [
  {
    path: 'dashboard',
    loadComponent: () => import('./dashboard/dashboard.component')
      .then(m => m.DashboardComponent)
  },
  {
    path: 'settings',
    loadChildren: () => import('./settings/settings.routes')
      .then(m => m.SETTINGS_ROUTES)
  }
];`},{type:"heading",content:"Use @defer for Below-Fold Content"},{type:"paragraph",content:"Angular 17's @defer block automatically code-splits any component into a separate chunk \u2014 no webpack configuration required. Wrap components that only appear below the fold (charts, modals, testimonials, heavy tables) and they'll be excluded from the initial bundle entirely."},{type:"code",content:`@defer (on viewport; prefetch on idle) {
  <app-analytics-dashboard />
} @placeholder {
  <div class="placeholder" style="min-height:400px"></div>
} @loading {
  <app-skeleton-loader />
}`},{type:"heading",content:"Eliminate Heavy Utility Libraries"},{type:"paragraph",content:"Lodash imported as import _ from 'lodash' pulls in 72KB gzipped even with tree-shaking. Switch to lodash-es (fully tree-shakable) or replace with modern JS equivalents."},{type:"list",items:["_.debounce \u2192 rxjs debounceTime or a 3-line native implementation","_.cloneDeep \u2192 structuredClone() (native in all modern browsers)","_.groupBy, _.sortBy \u2192 Array.reduce() and Array.sort()","moment.js \u2192 date-fns (modular) or native Intl.DateTimeFormat","Result: typically saves 40\u201360KB per heavy utility library removed"]},{type:"heading",content:"Bundle Size Impact"},{type:"diagram",svg:ae}]},{title:"Building AI-Powered Apps with Claude API",date:"Aug 2025",readTime:"7 min read",excerpt:"Integrating Claude AI into production Angular apps is simpler than you think. Here's how I designed a real-time conversational UI with streaming responses, tool-use, and intelligent fallbacks.",tags:["AI","Claude","Angular"],accentColor:"#ec4899",content:[{type:"paragraph",content:"Adding AI to a production app isn't just about calling an API \u2014 it's about designing the UX for latency, handling errors gracefully, and streaming responses in real time. Here's what I learned building this portfolio's chatbot with Claude API and Angular 21."},{type:"heading",content:"Architecture: Always Proxy Through Your Backend"},{type:"paragraph",content:"The golden rule: never call the Claude API directly from the browser. Proxy through your own server. This keeps your API key out of client-side code, lets you add rate limiting, conversation history, logging, and user-specific context \u2014 none of which are possible from the browser."},{type:"diagram",svg:re},{type:"heading",content:"Streaming with Server-Sent Events"},{type:"paragraph",content:"The key UX improvement is streaming \u2014 sending tokens to the browser as they're generated instead of waiting for the full response. This makes Claude feel instant even on long answers. The backend forwards Claude's SSE stream directly to the client."},{type:"code",content:`// NestJS controller
@Post('chat')
async stream(@Body() dto: ChatDto, @Res() res: Response) {
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('X-Accel-Buffering', 'no');

  const stream = this.anthropic.messages.stream({
    model: 'claude-opus-5-5',
    max_tokens: 1024,
    messages: [{ role: 'user', content: dto.message }]
  });

  for await (const event of stream) {
    if (event.type === 'content_block_delta'
        && event.delta.type === 'text_delta') {
      res.write('data: ' + JSON.stringify({ text: event.delta.text }) + '\\n\\n');
    }
  }
  res.write('data: [DONE]\\n\\n');
  res.end();
}`},{type:"heading",content:"Consuming the Stream in Angular"},{type:"paragraph",content:"On the Angular side, use a WritableSignal as the response buffer and append chunks as they arrive. This gives reactive template rendering without subscriptions, async pipes, or manual change detection."},{type:"code",content:`readonly reply = signal('');
readonly streaming = signal(false);

async send(message: string) {
  this.streaming.set(true);
  this.reply.set('');

  const res = await fetch('/api/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message })
  });

  const reader = res.body!.getReader();
  const decoder = new TextDecoder();

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    const chunk = decoder.decode(value, { stream: true });
    for (const line of chunk.split('\\n')) {
      if (line.startsWith('data: ') && !line.includes('[DONE]')) {
        const data = JSON.parse(line.slice(6));
        this.reply.update(r => r + data.text);
      }
    }
  }
  this.streaming.set(false);
}`},{type:"heading",content:"Tool Use for Structured Responses"},{type:"paragraph",content:"Claude's tool use feature lets the model call functions you define, returning structured JSON instead of free text. I use this for portfolio-specific queries so the chatbot returns typed data the Angular component can display directly."},{type:"code",content:`const tools = [{
  name: 'get_project_details',
  description: 'Returns details about a specific project',
  input_schema: {
    type: 'object',
    properties: {
      projectName: { type: 'string' }
    },
    required: ['projectName']
  }
}];

const response = await anthropic.messages.create({
  model: 'claude-opus-5-5',
  tools,
  messages: [{ role: 'user', content: 'Tell me about the Angular projects' }]
});`},{type:"heading",content:"Production Checklist"},{type:"list",items:["Always set max_tokens \u2014 an uncapped response can exhaust your monthly budget in minutes","Implement exponential backoff for 529 (overloaded) errors; they're common during peak hours","Use Anthropic's prompt caching for system prompts \u2014 cuts costs 90% on repeated context","Add a circuit breaker: degrade gracefully to a static FAQ when the API is unavailable","Log all requests server-side \u2014 you'll need it to debug edge-case hallucinations in prod"]}]},{title:"Why RxJS Still Matters in the Signals Era",date:"Jul 2025",readTime:"4 min read",excerpt:"Angular Signals are a great addition for synchronous reactive state, but RxJS wins for complex async orchestration, event streams, and cross-service coordination. Here's when to use each.",tags:["Angular","RxJS","Signals"],accentColor:"#6366f1",content:[{type:"paragraph",content:"When Angular Signals became stable in v17, many developers declared RxJS obsolete. Two years later, with Signals fully mature in Angular 21, the picture is more nuanced: Signals and RxJS solve different problems, and knowing when to use each is now a core Angular skill."},{type:"heading",content:"Where Signals Win"},{type:"paragraph",content:"Signals excel at synchronous, component-local reactive state \u2014 any value that should update the template the moment it changes. The Angular template engine has first-class optimization for signals: it tracks exactly which signal each expression reads and updates only what changed."},{type:"code",content:`readonly loading = signal(false);
readonly activeTab = signal<'projects' | 'skills' | 'all'>('all');
readonly filtered = computed(() =>
  this.projects().filter(p =>
    this.activeTab() === 'all' || p.category === this.activeTab()
  )
);

// Template consumes these with no async pipe, no subscription,
// no manual change detection \u2014 Angular handles it automatically`},{type:"heading",content:"Where RxJS Still Wins"},{type:"paragraph",content:"RxJS becomes essential the moment you need operators \u2014 especially time-based, multi-stream, or cancellation operators. There are no Signal equivalents for these patterns:"},{type:"list",items:["debounceTime / throttleTime \u2014 essential for search typeahead and resize event handling","switchMap \u2014 cancels the previous HTTP request when a new one fires, preventing race conditions","combineLatest / withLatestFrom \u2014 combines multiple streams with precise semantics","retryWhen / retry({ count, delay }) \u2014 exponential backoff for flaky network requests","WebSocket and SSE streams \u2014 fromEvent and custom Observables still have no Signal equivalent"]},{type:"heading",content:"The Bridge: toSignal() and toObservable()"},{type:"paragraph",content:"The real breakthrough in Angular 16+ is the interop layer \u2014 toSignal() and toObservable() let you cross the boundary without architectural gymnastics. Use RxJS where it shines, Signal where it shines, and bridge at the seam."},{type:"code",content:`import { toSignal, toObservable } from '@angular/core/rxjs-interop';

// Pattern 1: HTTP Observable \u2192 Signal (no async pipe in template)
readonly users = toSignal(
  this.http.get<User[]>('/api/users'),
  { initialValue: [] }
);

// Pattern 2: Signal \u2192 Observable \u2192 back to Signal
// Gives you RxJS operators on top of a Signal value
readonly results = toSignal(
  toObservable(this.searchTerm).pipe(
    debounceTime(300),
    filter(term => term.length > 1),
    switchMap(term => this.http.get<Result[]>('/api/search?q=' + term)),
    catchError(() => of([]))
  ),
  { initialValue: [] }
);`},{type:"heading",content:"Signal vs RxJS \u2014 Quick Reference"},{type:"diagram",svg:le},{type:"heading",content:"Bottom Line"},{type:"paragraph",content:"Default to Signals for all local component state \u2014 they're simpler, faster, and the Angular compiler optimizes for them specifically. Reach for RxJS when you need operators, cancellation, or complex async orchestration. Use toSignal()/toObservable() at the boundaries between the two worlds. The two tools are complementary, not competing."}]}],j=class t{dialog=S(L);posts=de;openPost(r){this.dialog.open(k,{data:r,width:"85vw",maxWidth:"860px",maxHeight:"92vh",autoFocus:!1,panelClass:"blog-detail-panel"})}static \u0275fac=function(e){return new(e||t)};static \u0275cmp=x({type:t,selectors:[["app-blog"]],decls:20,vars:0,consts:[["id","blog",1,"section-padding","container"],[1,"section-head"],[1,"section-title"],[1,"dot"],[1,"title-underline"],[1,"section-sub"],[1,"blog-grid"],[1,"blog-card","glass-card",3,"appScrollReveal","appScrollRevealDelay","--accent"],["appScrollReveal","",1,"blog-cta"],["href","https://github.com/thisisbinodprasad","target","_blank","rel","noopener"],[1,"blog-card","glass-card",3,"click","appScrollReveal","appScrollRevealDelay"],[1,"card-top"],[1,"post-tags"],[1,"tag",3,"background","color","border-color"],[1,"post-meta"],[1,"post-date"],[1,"post-rt"],[1,"post-title"],[1,"post-excerpt"],[1,"card-bottom"],[1,"read-more"],[1,"accent-bar"],[1,"tag"]],template:function(e,a){e&1&&(o(0,"section",0)(1,"div",1)(2,"h2",2),i(3," Writing"),o(4,"span",3),i(5,"."),n(),f(6,"span",4),n(),o(7,"p",5),i(8,"Thoughts on engineering, AI, and the craft of building things."),n()(),o(9,"div",6),g(10,ie,24,12,"article",7,ne),n(),o(12,"div",8)(13,"mat-icon"),i(14,"edit_note"),n(),o(15,"p"),i(16,"More articles in progress \u2014 follow on "),o(17,"a",9),i(18,"GitHub"),n(),i(19," for updates."),n()()()),e&2&&(l(10),h(a.posts))},dependencies:[b,v,y,w,R],styles:['.section-head[_ngcontent-%COMP%]{margin-bottom:44px}.section-title[_ngcontent-%COMP%]{font-size:2.5rem;font-weight:700;position:relative;display:inline-block;margin-bottom:12px}.section-title[_ngcontent-%COMP%]   .dot[_ngcontent-%COMP%]{color:var(--primary-color)}.section-title[_ngcontent-%COMP%]   .title-underline[_ngcontent-%COMP%]{position:absolute;bottom:-10px;left:0;height:3px;width:0;background:linear-gradient(90deg,var(--primary-color),var(--accent-color));border-radius:2px;animation:_ngcontent-%COMP%_growLine 1s cubic-bezier(.22,1,.36,1) .4s forwards}@keyframes _ngcontent-%COMP%_growLine{to{width:100%}}.section-sub[_ngcontent-%COMP%]{color:var(--text-muted);font-size:1rem;margin:20px 0 0}.blog-grid[_ngcontent-%COMP%]{display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:24px;margin-bottom:40px}.blog-card[_ngcontent-%COMP%]{display:flex;flex-direction:column;padding:28px;position:relative;overflow:hidden;cursor:pointer;transition:transform .38s cubic-bezier(.16,1,.3,1),box-shadow .38s ease}.blog-card[_ngcontent-%COMP%]:before{content:"";position:absolute;top:0;left:0;right:0;height:2px;background:linear-gradient(90deg,var(--accent, var(--primary-color)),transparent);transform:scaleX(0);transform-origin:left;transition:transform .5s cubic-bezier(.22,1,.36,1)}.blog-card[_ngcontent-%COMP%]:hover{transform:translateY(-8px);box-shadow:0 20px 48px #0000004d,0 0 20px #14b8a61a}.blog-card[_ngcontent-%COMP%]:hover:before{transform:scaleX(1)}.card-top[_ngcontent-%COMP%]{margin-bottom:18px}.post-tags[_ngcontent-%COMP%]{display:flex;gap:8px;flex-wrap:wrap;margin-bottom:12px}.post-tags[_ngcontent-%COMP%]   .tag[_ngcontent-%COMP%]{font-size:.7rem;font-weight:600;padding:3px 10px;border-radius:12px;border:1px solid;text-transform:uppercase;letter-spacing:.5px}.post-meta[_ngcontent-%COMP%]{display:flex;gap:16px}.post-meta[_ngcontent-%COMP%]   .post-date[_ngcontent-%COMP%], .post-meta[_ngcontent-%COMP%]   .post-rt[_ngcontent-%COMP%]{display:flex;align-items:center;gap:4px;font-size:.78rem;color:var(--text-muted)}.post-meta[_ngcontent-%COMP%]   .post-date[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%], .post-meta[_ngcontent-%COMP%]   .post-rt[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%]{font-size:14px;width:14px;height:14px}.post-title[_ngcontent-%COMP%]{font-size:1.15rem;font-weight:700;color:var(--text-color);line-height:1.4;margin:0 0 12px;flex:1}.post-excerpt[_ngcontent-%COMP%]{color:var(--text-muted);font-size:.9rem;line-height:1.65;margin:0 0 20px;display:-webkit-box;-webkit-line-clamp:3;-webkit-box-orient:vertical;overflow:hidden}.card-bottom[_ngcontent-%COMP%]{position:relative;padding-top:16px;border-top:1px solid rgba(255,255,255,.06);margin-top:auto}.read-more[_ngcontent-%COMP%]{display:flex;align-items:center;gap:6px;font-size:.85rem;font-weight:600;transition:gap .25s ease}.read-more[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%]{font-size:16px;width:16px;height:16px}.blog-card[_ngcontent-%COMP%]:hover   .read-more[_ngcontent-%COMP%]{gap:10px}.accent-bar[_ngcontent-%COMP%]{position:absolute;bottom:-16px;left:-28px;height:1px;width:0;transition:width .6s ease}.blog-card[_ngcontent-%COMP%]:hover   .accent-bar[_ngcontent-%COMP%]{width:calc(100% + 56px)}.blog-cta[_ngcontent-%COMP%]{display:flex;align-items:center;gap:12px;padding:18px 24px;border-radius:12px;background:#ffffff05;border:1px dashed rgba(255,255,255,.1)}.blog-cta[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%]{color:var(--primary-color);flex-shrink:0}.blog-cta[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{margin:0;color:var(--text-muted);font-size:.9rem}.blog-cta[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]{color:var(--primary-color);text-decoration:none;font-weight:600}.blog-cta[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]:hover{text-decoration:underline}'],changeDetection:0})};export{j as BlogComponent};
