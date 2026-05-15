(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))n(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const i of r.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&n(i)}).observe(document,{childList:!0,subtree:!0});function a(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(s){if(s.ep)return;s.ep=!0;const r=a(s);fetch(s.href,r)}})();const P=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 48" fill="none">
  <defs>
    <linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#22d3ee"/>
      <stop offset="55%" stop-color="#a78bfa"/>
      <stop offset="100%" stop-color="#f472b6"/>
    </linearGradient>
    <filter id="soft" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="0.8" result="b"/>
      <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
  </defs>
  <text x="4" y="34" font-family="system-ui,Segoe UI,sans-serif" font-size="28" font-weight="800" fill="url(#g)" filter="url(#soft)">BrainBoosty</text>
</svg>
`,K="/assets/full-glowing-brain-Cl127Rfm.png",Z="/assets/amygdala-DP7dGDc4.png",X="/assets/lobes-uZqghd8w.png",ee="/assets/frontal-gyrus-DPq4mhR0.png",te="/assets/insula-CAJDukm_.png",ne="/assets/pfc-BE-jJY5g.png",ae="/assets/tpj-Cgg8S5Iu.png",N=["prefrontal_cortex","brain_lobes","insular_cortex","temporoparietal_junction","amygdala","frontal_gyrus"],se={prefrontal_cortex:ne,brain_lobes:X,insular_cortex:te,temporoparietal_junction:ae,amygdala:Z,frontal_gyrus:ee},re=K;function ie(e){const t=N.map(n=>Number(e[n]??0)),a=t.reduce((n,s)=>n+s,0);return Math.round(a/Math.max(t.length,1)*10)/10}function oe(e){const t={"Content-Type":"application/json"};return e&&(t["X-Telegram-Init-Data"]=e),t}async function C(e,{initData:t,method:a="GET",body:n}={}){const s=await fetch(`/api/webapp${e}`,{method:a,headers:oe(t),body:n?JSON.stringify(n):void 0});if(!s.ok){const r=new Error(`HTTP ${s.status}`);r.status=s.status;try{r.detail=(await s.json()).detail}catch{}throw r}return s.json()}function G(e,t){var r,i;const a=e.lang==="en"?"en":e.lang==="ru"?"ru":t,n={};for(const o of N)n[o]=Number(((r=e.scores)==null?void 0:r[o])??0);const s={};for(const o of N){const l=((i=e.regions)==null?void 0:i[o])??{};s[o]={main:Number(l.main??n[o]),bullets:l.bullets??[],submetrics:(l.submetrics??[]).map(b=>({label:b.label??b.label_ru??"",value:Number(b.value??n[o])}))}}return{lang:a,userDisplayName:e.userDisplayName??e.user_display_name??"Guest",paid:!!e.paid,hasMap:!!(e.hasMap??e.has_map??Object.keys(e.scores||{}).length),testVariant:e.testVariant??e.test_variant??"development",tributeUrl:e.tributeUrl??e.tribute_url??"",neuroScore:e.neuroScore!=null?Number(e.neuroScore):ie(n),scores:n,connectivity:e.connectivity??[],regions:s,snapshotId:e.snapshotId??e.snapshot_id??null,createdAt:e.createdAt??e.created_at??null}}async function le(){return C("/landing",{initData:""})}async function k(e){const t=await C("/profile",{initData:e.initData});return G(t,e.lang)}async function ce(e){return C("/history",{initData:e.initData})}async function de(e,t="development"){return C(`/test/questions?variant=${encodeURIComponent(t)}`,{initData:e.initData})}async function ue(e,{variant:t,answers:a}){const n={variant:t,answers:a},s=await C("/test/submit",{initData:e.initData,method:"POST",body:n});return G(s.profile,e.lang)}const be={landingKicker:"BrainBoosty · neuroscience, no fluff",landingTitle:"Upgrade your brain — see your Neural Map",landingTagline:"7 questions → a personal 6-zone brain map, NeuroScore, and clear next steps. All in Telegram.",landingCta:"Boost my brain",landingCtaSub:"Free start in the bot · 2 minutes",landingNavAbout:"About me",landingNavProject:"The project",landingNavCta:"Open bot",landingAboutTitle:"About me",landingAboutParagraphs:["Hi, I'm @androgenautist — creator of BrainBoosty.","I went from anxiety, brain fog, and tension to clarity, inner strength, and confidence. Now I help others with neurobiology, hormones, and cognitive habits.","On my channel I share actionable insights—no marketing noise, only what actually shifts your state."],landingChannelLink:"→ Channel @androgenautist",landingProjectTitle:"What's inside",landingFeatures:["7-question cognitive test — development or sexual profile","Neural Map: 6 brain zones with NeuroScore and recommendations","Progress history and test-to-test comparison","Daily hooks and a private exercise channel"],landingFinalTitle:"Ready to see your map?",landingFinalSub:"Open the bot — onboarding takes a few minutes; your first map is free.",heroBrain:"NEURAL MAP",scoreLabel:"NeuroScore",coverLine:"Six zones · one profile. Numbers, focus, and a clear read—no clutter.",connectivityTitle:"Inter-region links (educational model)",zoneLevel:"Integrated zone level",progressMain:e=>`Your progress ${e}%`,recTitle:"Why this zone is your biggest pleasure lever",footer:"BrainBoosty · educational model · not a medical diagnosis",premiumCta:"Get full access",premiumBadge:"Full access",premiumTitle:"Get full access — today",premiumSub:"A 30-day personal plan, progress tracker, exercises for your profile, and the private channel.",premiumBullets:["Full brain map and all zone recommendations","Progress history with test comparisons","Retests and trend tracking","Private channel and daily hooks"],navMap:"Map",navHistory:"History",navTest:"Test",navPremium:"Access",appBrandName:"BrainBoosty",appHeaderTitle:"Neural Map",loading:"Loading your neuro profile…",computing:"Computing your brain map…",errorLoad:"Could not load data. Please try again later.",authError:"Open the app from the Telegram bot.",notRegistered:"Complete the bot questionnaire first (/start).",historyTitle:"Progress history",historySub:"Zone comparison across tests. Arrows show percentage-point change.",historyEmpty:"No saved tests yet. Take your first test to see history here.",startTest:"Take the test",latest:"Latest",openThisMap:"Open map",testTitle:"Cognitive test",testPickVariant:"Choose question style (7 steps):",variantDev:"Development & cognition",variantSex:"Sexual profile",variantSexBadge:"Maximum insight",variantSexHint:"Pleasure, drive, and your neural edge",variantDevHint:"Focus, habits, and cognitive style",questionProgress:(e,t)=>`Question ${e} of ${t}`,regions:{prefrontal_cortex:"Prefrontal cortex",brain_lobes:"Brain lobes · imagery",insular_cortex:"Insular cortex",temporoparietal_junction:"Temporoparietal junction",amygdala:"Amygdala",frontal_gyrus:"Frontal gyrus"}},U={landingKicker:"BrainBoosty · нейробиология без воды",landingTitle:"Прокачай мозг — увидь свою Neural Map",landingTagline:"7 вопросов → персональная карта из 6 зон мозга, NeuroScore и понятные шаги. Всё в Telegram.",landingCta:"Прокачать мозг",landingCtaSub:"Бесплатный старт в боте · 2 минуты",landingNavAbout:"Обо мне",landingNavProject:"Проект",landingNavCta:"В бота",landingAboutTitle:"Обо мне",landingAboutParagraphs:["Привет, я @androgenautist — автор BrainBoosty.","Сам прошёл путь от тревожности, тумана в голове и зажатости — к ясности, внутренней силе и уверенности. Сейчас помогаю другим по нейробиологии, гормонам и когнитивным привычкам.","В канале делюсь рабочими инсайтами без маркетинговой шелухи — только то, что реально меняет состояние."],landingChannelLink:"→ Канал @androgenautist",landingProjectTitle:"Что внутри",landingFeatures:["Когнитивный тест из 7 вопросов — два стиля (развитие / сексуальный профиль)","Neural Map: 6 зон мозга с NeuroScore и рекомендациями","История прогресса и сравнение между тестами","Ежедневные хуки и закрытый канал с упражнениями"],landingFinalTitle:"Готов увидеть свою карту?",landingFinalSub:"Открой бота — анкета займёт пару минут, первая карта бесплатно.",heroBrain:"NEURAL MAP",scoreLabel:"NeuroScore",coverLine:"Шесть зон · один профиль. Цифры, акценты и ясная картина без лишнего шума.",connectivityTitle:"Связность зон (образовательная модель)",zoneLevel:"Интегральный уровень зоны",progressMain:e=>`Твой прогресс ${e}%`,recTitle:"Почему эта зона — твой главный рычаг удовольствия",footer:"BrainBoosty · образовательная модель · не медицинский диагноз",premiumCta:"Забрать полный доступ",premiumBadge:"Полный доступ",premiumTitle:"Забери полный доступ — сегодня",premiumSub:"Персональный план на 30 дней, трекер прогресса, упражнения под твой профиль и закрытый канал.",premiumBullets:["Полная карта мозга и все рекомендации по зонам","История прогресса с сравнением тестов","Повторные тесты и отслеживание динамики","Закрытый канал и ежедневные хуки"],navMap:"Карта",navHistory:"История",navTest:"Тест",navPremium:"Доступ",appBrandName:"BrainBoosty",appHeaderTitle:"Neural Map",loading:"Загружаем нейропрофиль…",computing:"Считаем твою карту мозга…",errorLoad:"Не удалось загрузить данные. Попробуйте позже.",authError:"Откройте приложение из Telegram-бота.",notRegistered:"Сначала пройдите анкету в боте (/start).",historyTitle:"История прогресса",historySub:"Сравнение зон между прохождениями. Стрелки — изменение в процентных пунктах.",historyEmpty:"Пока нет сохранённых тестов. Пройдите первый тест — и здесь появится история.",startTest:"Пройти тест",latest:"Актуально",openThisMap:"Открыть карту",testTitle:"Когнитивный тест",testPickVariant:"Выберите стиль вопросов (7 шагов):",variantDev:"Развитие и когниция",variantSex:"Сексуальный профиль",variantSexBadge:"Максимум инсайта",variantSexHint:"Удовольствие, драйв и нейронный рельеф",variantDevHint:"Фокус, привычки и когнитивный стиль",questionProgress:(e,t)=>`Вопрос ${e} из ${t}`,regions:{prefrontal_cortex:"Префронтальная кора",brain_lobes:"Доли мозга · образы",insular_cortex:"Островковая кора",temporoparietal_junction:"Височно-теменной узел",amygdala:"Амигдала",frontal_gyrus:"Лобная извилина"}},pe={ru:U,en:be};function x(e){return pe[e==="en"?"en":"ru"]??U}const q=new Set;function V(){const e=(window.location.hash||"#map").replace(/^#/,""),[t,a]=e.split("?");return{name:t||"map",params:new URLSearchParams(a||"")}}function w(e,t={}){var n;const a=((n=t.toString)==null?void 0:n.call(t))||new URLSearchParams(t).toString();window.location.hash=a?`${e}?${a}`:e}function ge(e){return q.add(e),()=>q.delete(e)}function W(){const e=V();for(const t of q)t(e)}window.addEventListener("hashchange",W);function me(){W()}function fe(){var n,s,r;const e=(n=window.Telegram)==null?void 0:n.WebApp;if(!e)return{tg:null,initData:"",user:null,lang:"ru"};e.ready(),e.expand(),e.enableClosingConfirmation(),e.disableVerticalSwipes&&e.disableVerticalSwipes(),j(),e.onEvent("themeChanged",j);const t=((s=e.initDataUnsafe)==null?void 0:s.user)??null,a=(t==null?void 0:t.language_code)==="en"||(r=t==null?void 0:t.language_code)!=null&&r.startsWith("en")?"en":"ru";return e.setHeaderColor&&e.setHeaderColor("#010108"),e.setBackgroundColor&&e.setBackgroundColor("#010108"),{tg:e,initData:e.initData||"",user:t,lang:a}}function j(){const e=document.documentElement;e.style.setProperty("--bb-tg-bg","#010108"),e.style.setProperty("--bb-tg-text","#f1f5f9")}function he(e){var a;const t=(a=window.Telegram)==null?void 0:a.WebApp;if(t!=null&&t.openTelegramLink&&e.includes("t.me/")){t.openTelegramLink(e);return}if(t!=null&&t.openLink){t.openLink(e);return}window.open(e,"_blank","noopener,noreferrer")}function E(){var e,t,a,n;(n=(a=(t=(e=window.Telegram)==null?void 0:e.WebApp)==null?void 0:t.HapticFeedback)==null?void 0:a.impactOccurred)==null||n.call(a,"light")}function $(e){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}function ve(e,{displayName:t,neuroScore:a,connectivity:n}){const s=(n==null?void 0:n.length)>0?`
    <div class="bb-connectivity glass rounded-2xl p-4 mt-5">
      <p class="bb-connectivity__title">${$(e.connectivityTitle)}</p>
      ${n.map(r=>`<p>• ${$(r)}</p>`).join(`
      `)}
    </div>`:"";return`
<section class="bb-section bb-cover" data-section="cover">
  <div class="bb-cover__logo">${P}</div>
  <img src="${re}" alt="" class="cover-full-brain-hero mb-4" width="360" height="260" decoding="async" />
  <div class="glass rounded-3xl p-6 sm:p-8 cover-neon-card border border-cyan-500/20">
    <p class="text-center text-sm uppercase tracking-[0.35em] text-cyan-200 mt-1 font-semibold drop-shadow-[0_0_16px_rgba(34,211,238,0.55)] bb-cover__kicker">
      ${$(e.heroBrain)}
    </p>
    <h1 class="text-center text-2xl sm:text-3xl font-bold mt-5 text-white drop-shadow-[0_0_20px_rgba(167,139,250,0.25)] neon-zone-title">
      ${$(t)}
    </h1>
    <p class="text-center text-slate-300/95 mt-3 text-[15px] leading-relaxed max-w-md mx-auto tracking-wide px-2">
      ${$(e.coverLine)}
    </p>
    <div class="mt-8 flex flex-col items-center justify-center">
      <p class="bb-cover__score-label text-cyan-100/90 text-sm mb-2 font-medium tracking-wide drop-shadow-[0_0_10px_rgba(34,211,238,0.35)]">
        ${$(e.scoreLabel)}
      </p>
      <div class="text-6xl sm:text-7xl font-black bg-gradient-to-r from-cyan-200 via-violet-300 to-fuchsia-300 bg-clip-text text-transparent neon-score-cover" data-neuro-score>
        ${Number(a).toFixed(1)}
      </div>
    </div>
    ${s}
  </div>
  <p class="text-center text-[11px] text-slate-500 mt-6">${$(e.footer)}</p>
</section>`}function F({label:e,value:t,glow:a=!1}){const n=Math.max(0,Math.min(100,Number(t)||0)),s=Math.max(0,100-n),r=a?"pdf-bar-gradient pdf-bar-gradient--main":"pdf-bar-gradient pdf-bar-gradient--sub",i=ye(e);return[`<div class="mb-3.5" data-bar-value="${n}">`,'<div class="flex justify-between text-xs text-slate-400 mb-1">',`<span>${i}</span>`,`<span class="text-cyan-100 font-bold tracking-wide">${n.toFixed(1)}%</span>`,"</div>",'<div class="pdf-bar-track">',`<div class="${r}" style="clip-path: inset(0 ${s.toFixed(2)}% 0 0);"></div>`,"</div>","</div>"].join(`
  `)}function ye(e){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}function M(e){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}function xe(e,t,a){const n=e.regions[t]??t,s=se[t],r=Number(a.main??0),i=e.progressMain(`${r.toFixed(1)}`),o=[F({label:e.zoneLevel,value:r,glow:!0}),...(a.submetrics??[]).map(b=>F({label:b.label,value:b.value,glow:!1}))].join(`
`),l=(a.bullets??[]).map(b=>`<li>${M(b)}</li>`).join(`
        `);return`
<section class="bb-section bb-region" data-section="region" data-region="${t}" id="zone-${t}">
  <img src="${s}" alt="" class="brain-float-top mb-3" width="320" height="220" loading="lazy" decoding="async" />
  <h2 class="bb-region__title neon-zone-title px-2">${M(n)}</h2>
  <p class="bb-region__progress-label">${M(i)}</p>
  <div class="glass rounded-2xl p-4 max-w-xl mx-auto w-full">
    ${o}
  </div>
  <div class="glass rounded-2xl p-4 mt-4 max-w-xl mx-auto w-full">
    <p class="bb-rec-title">${M(e.recTitle)}</p>
    <ul class="bb-rec-list">
        ${l}
    </ul>
  </div>
</section>`}function _e(e,t){const a=x(t.lang),n=t.userDisplayName||(t.lang==="en"?"Guest":"Гость"),s=[ve(a,{displayName:n,neuroScore:t.neuroScore,connectivity:t.connectivity}),...N.map(i=>{var o,l;return xe(a,i,{main:t.scores[i],bullets:((o=t.regions[i])==null?void 0:o.bullets)??[],submetrics:((l=t.regions[i])==null?void 0:l.submetrics)??[]})})];e.innerHTML=s.join(`
`);const r=document.getElementById("bb-header-logo");r&&(r.innerHTML=P),$e(e),we(e),Te(e)}function $e(e){const t=e.querySelectorAll(".bb-section"),a=new IntersectionObserver(n=>{for(const s of n)s.isIntersecting&&(s.target.classList.add("is-visible"),a.unobserve(s.target))},{root:null,rootMargin:"0px 0px -8% 0px",threshold:.08});t.forEach(n=>a.observe(n))}function we(e){const t=e.querySelector("[data-neuro-score]");if(!t)return;const a=parseFloat(t.textContent||"0"),n=1200,s=performance.now(),r=i=>{const o=Math.min(1,(i-s)/n),l=1-(1-o)**3;t.textContent=(a*l).toFixed(1),o<1&&requestAnimationFrame(r)};requestAnimationFrame(r)}function Te(e){const t=e.querySelectorAll("[data-bar-value]"),a=new IntersectionObserver(n=>{for(const s of n){if(!s.isIntersecting)continue;const r=s.target,i=parseFloat(r.getAttribute("data-bar-value")||"0"),o=r.querySelector(".pdf-bar-gradient");o&&(o.style.clipPath="inset(0 100% 0 0)",requestAnimationFrame(()=>{o.style.clipPath=`inset(0 ${Math.max(0,100-i).toFixed(2)}% 0 0)`})),a.unobserve(r)}},{threshold:.2});t.forEach(n=>a.observe(n))}function A(e){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}function Le(e,t){if(!e)return"—";try{return new Date(e).toLocaleString(t==="en"?"en-GB":"ru-RU",{day:"2-digit",month:"short",year:"numeric",hour:"2-digit",minute:"2-digit"})}catch{return e}}async function Se(e,t,a){var l,b;const n=x(a.lang),s=document.createElement("section");s.className="bb-section is-visible bb-history",s.innerHTML=`
    <h2 class="bb-page-title bb-page-title--premium neon-zone-title">${A(n.historyTitle)}</h2>
    <p class="bb-page-sub text-slate-300/90 text-sm mb-4">${A(n.historySub)}</p>
  `;const r=document.createElement("div");r.className="space-y-3",r.textContent=n.loading,s.appendChild(r),e.replaceChildren(s);let i;try{i=await ce(t)}catch{r.innerHTML=`<p class="bb-error">${A(n.errorLoad)}</p>`;return}const o=i.items??[];if(r.replaceChildren(),!o.length){const h=document.createElement("div");h.className="glass rounded-2xl p-5 text-center";const c=document.createElement("p");c.className="text-slate-200 mb-4",c.textContent=n.historyEmpty;const p=document.createElement("button");p.type="button",p.className="bb-btn-primary",p.textContent=n.startTest,p.addEventListener("click",()=>w("test")),h.append(c,p),r.appendChild(h);return}for(const[h,c]of o.entries()){const p=document.createElement("article");p.className=`glass rounded-2xl p-4 bb-history-card${h===0?" is-active":""}`;const v=document.createElement("div");v.className="flex justify-between items-start gap-2 mb-2";const T=document.createElement("div");if(T.innerHTML=`
      <p class="text-xs text-cyan-200/80 uppercase tracking-wide">${A(Le(c.createdAt,a.lang))}</p>
      <p class="text-lg font-bold text-white mt-1 bb-type-display">NeuroScore <span class="text-cyan-200">${Number(c.neuroScore).toFixed(1)}</span></p>
    `,v.appendChild(T),h===0){const _=document.createElement("span");_.className="bb-badge",_.textContent=n.latest,v.appendChild(_)}p.appendChild(v);const y=document.createElement("div");y.className="bb-history-deltas";for(const _ of N){const J=n.regions[_]??_,Q=Number(((l=c.scores)==null?void 0:l[_])??0).toFixed(1),L=c.isFirst?"—":((b=c.deltas)==null?void 0:b[_])??"·",H=document.createElement("div");H.className="bb-history-row";const I=document.createElement("span");I.textContent=J;const D=document.createElement("span");D.textContent=`${Q}%`;const B=document.createElement("span");B.textContent=L,typeof L=="string"&&L.includes("↑")&&(B.className="bb-delta-up"),typeof L=="string"&&L.includes("↓")&&(B.className="bb-delta-down"),H.append(I,D,B),y.appendChild(H)}p.appendChild(y);const m=document.createElement("button");m.type="button",m.className="bb-btn-ghost mt-3 w-full",m.textContent=n.openThisMap,m.addEventListener("click",()=>w("map")),p.appendChild(m),r.appendChild(p)}}function S(e){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}function Ne(e,t){var n;const a=x(t.lang);e.innerHTML=`
    <section class="bb-section is-visible bb-premium">
      <div class="mb-3 rounded-full px-5 py-1.5 border border-cyan-400/30 bg-cyan-500/10 text-xs font-bold uppercase tracking-[0.35em] text-cyan-100 text-center bb-type-display">
        ${S(a.premiumBadge)}
      </div>
      <h2 class="bb-page-title bb-page-title--premium neon-cta-title mb-4">
        ${S(a.premiumTitle)}
      </h2>
      <p class="text-slate-200 text-center text-sm leading-relaxed mb-6">${S(a.premiumSub)}</p>
      <ul class="bb-premium-list glass rounded-2xl p-5 mb-6 space-y-3 text-sm text-slate-200">
        ${a.premiumBullets.map(s=>`<li>${S(s)}</li>`).join("")}
      </ul>
      <button type="button" class="bb-btn-premium-buy w-full" id="bb-premium-buy">${S(a.premiumCta)}</button>
    </section>
  `,(n=e.querySelector("#bb-premium-buy"))==null||n.addEventListener("click",()=>{E(),t.tributeUrl&&he(t.tributeUrl)})}function g(e){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}async function Ee(e,t,a,{onProfile:n}={}){const s=x(a.lang),r={variant:a.testVariant||"development",questions:[],answers:{},step:0},i=document.createElement("section");i.className="bb-section is-visible bb-test",e.replaceChildren(i);async function o(){i.innerHTML=`<p class="text-cyan-200/80 text-sm">${g(s.loading)}</p>`;try{const c=await de(t,r.variant);r.questions=c.questions??[],r.step=0,r.answers={},b()}catch{i.innerHTML=`<p class="bb-error">${g(s.errorLoad)}</p>`}}function l(){i.innerHTML=`
      <div class="bb-test-pick">
        <div class="bb-test-pick__glow" aria-hidden="true"></div>
        <h2 class="bb-page-title bb-page-title--premium neon-zone-title">${g(s.testTitle)}</h2>
        <p class="bb-page-sub text-slate-300/90 text-sm mb-1 leading-relaxed">${g(s.testPickVariant)}</p>
        <div class="bb-test-variant-grid">
          <button type="button" class="bb-btn-hero" data-variant="sexual">
            <span class="bb-btn-hero__badge">${g(s.variantSexBadge)}</span>
            <span class="bb-btn-hero__label">${g(s.variantSex)}</span>
            <span class="bb-btn-hero__hint">${g(s.variantSexHint)}</span>
          </button>
          <button type="button" class="bb-btn-alt" data-variant="development">
            <span class="bb-btn-alt__label">${g(s.variantDev)}</span>
            <span class="bb-btn-alt__hint">${g(s.variantDevHint)}</span>
          </button>
        </div>
      </div>
    `,i.querySelectorAll("[data-variant]").forEach(c=>{c.addEventListener("click",()=>{E(),r.variant=c.getAttribute("data-variant")||"development",o()})})}function b(){const c=r.questions[r.step];if(!c){l();return}const p=r.questions.length,v=(r.step+1)/p*100;i.innerHTML=`
      <div class="bb-test-progress mb-4">
        <div class="flex justify-between text-xs text-cyan-200/80 mb-1">
          <span>${g(s.questionProgress(r.step+1,p))}</span>
          <span>${Math.round(v)}%</span>
        </div>
        <div class="pdf-bar-track"><div class="pdf-bar-gradient pdf-bar-gradient--main" style="clip-path: inset(0 ${(100-v).toFixed(1)}% 0 0)"></div></div>
      </div>
      <h2 class="bb-test-q-title">${g(c.topic)}</h2>
      <p class="text-slate-200 mb-4 leading-relaxed">${g(c.text)}</p>
      <div class="grid gap-2 bb-test-options" id="bb-test-options"></div>
    `;const T=i.querySelector("#bb-test-options");for(const y of c.options??[]){const m=document.createElement("button");m.type="button",m.className="bb-test-option",m.innerHTML=`<span class="bb-test-option-key">${g(y.key)}</span><span>${g(y.label)}</span>`,m.addEventListener("click",()=>h(y.key)),T.appendChild(m)}}async function h(c){E();const p=r.questions[r.step];if(r.answers[p.id]=c,r.step+1<r.questions.length){r.step+=1,b();return}i.innerHTML=`
      <div class="bb-loading">
        <div class="bb-loading__pulse"></div>
        <p class="text-sm text-cyan-200/80">${g(s.computing)}</p>
      </div>`;try{const v={};for(const[y,m]of Object.entries(r.answers))v[String(y)]=m;const T=await ue(t,{variant:r.variant,answers:v});n&&n(T),w("map")}catch{i.innerHTML=`<p class="bb-error">${g(s.errorLoad)}</p>`}}l()}let f=null,u=null;function Ce(e){const t=document.getElementById("bb-nav");t&&t.querySelectorAll(".bb-nav__btn").forEach(a=>{a.classList.toggle("is-active",a.dataset.route===e)})}function Be(e){var n;if((n=document.querySelector(".bb-premium-fab"))==null||n.remove(),e.paid||!e.tributeUrl)return;const t=x(e.lang),a=document.createElement("button");a.type="button",a.className="bb-premium-fab",a.textContent=t.premiumCta,a.addEventListener("click",()=>{E(),w("premium")}),document.body.appendChild(a)}function ke(e){const t=document.getElementById("bb-nav");if(!t)return;const a=x(e);t.hidden=!1,t.innerHTML=`
    <button type="button" class="bb-nav__btn" data-route="map">${a.navMap}</button>
    <button type="button" class="bb-nav__btn" data-route="history">${a.navHistory}</button>
    <button type="button" class="bb-nav__btn" data-route="test">${a.navTest}</button>
    <button type="button" class="bb-nav__btn" data-route="premium">${a.navPremium}</button>
  `,t.querySelectorAll(".bb-nav__btn").forEach(n=>{n.addEventListener("click",()=>{E(),w(n.dataset.route||"map")})})}async function O(e){var a;const t=document.getElementById("bb-root");if(!(!t||!f)){if(Ce(e.name),e.name==="premium"){u||(u=await k(f)),Ne(t,u);return}if(e.name==="test"){u||(u=await k(f)),await Ee(t,f,u,{onProfile:n=>{u=n}});return}if(e.name==="history"){u||(u=await k(f)),await Se(t,f,u);return}if(!u){const n=x(f.lang);t.innerHTML=`
      <div class="bb-loading">
        <div class="bb-loading__pulse"></div>
        <p class="text-sm text-cyan-200/80">${n.loading}</p>
      </div>`;try{u=await k(f),(a=f.user)!=null&&a.first_name&&!u.userDisplayName&&(u.userDisplayName=[f.user.first_name,f.user.last_name].filter(Boolean).join(" "))}catch(s){const r=(s==null?void 0:s.status)===403?n.notRegistered:(s==null?void 0:s.status)===401?n.authError:n.errorLoad;t.innerHTML=`<p class="bb-error">${r}</p>`;return}}if(!u.hasMap&&e.name==="map"){w("test");return}_e(t,u),Be(u)}}async function Me(e){f=e,u=null,document.body.classList.add("bb-app--telegram");const t=document.getElementById("bb-root");if(!t)return;t.classList.add("bb-root--spa");const a=x(e.lang),n=document.getElementById("bb-header"),s=document.getElementById("bb-header-wordmark"),r=document.getElementById("bb-header-title"),i=document.getElementById("bb-header-logo");s&&(s.textContent=a.appBrandName),r&&(r.textContent=a.appHeaderTitle),i&&(i.innerHTML=P),n&&(n.hidden=!1,n.classList.add("is-visible")),ke(e.lang),ge(l=>{O(l).catch(()=>{})}),me();const o=V();window.location.hash?await O(o):w("map")}const R="/assets/full-glowing-brain-Cl127Rfm.png";function d(e){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}const Y="bb-landing-lang";function Ae(){try{const e=localStorage.getItem(Y);if(e==="en"||e==="ru")return e}catch{}return null}function Pe(e){document.body.classList.add("bb-lang-gate-open");const t=document.createElement("div");t.className="bb-lang-gate",t.setAttribute("role","dialog"),t.setAttribute("aria-modal","true"),t.setAttribute("aria-labelledby","bb-lang-gate-title"),t.innerHTML=`
    <div class="bb-lang-gate__backdrop" aria-hidden="true"></div>
    <div class="bb-lang-gate__dialog glass">
      <p id="bb-lang-gate-title" class="bb-lang-gate__title">BrainBoosty</p>
      <p class="bb-lang-gate__sub">Выберите язык · Choose language</p>
      <div class="bb-lang-gate__choices">
        <button type="button" class="bb-lang-gate__btn" data-lang="ru">
          <span class="bb-lang-gate__flag" aria-hidden="true">🇷🇺</span>
          <span>Русский</span>
        </button>
        <button type="button" class="bb-lang-gate__btn" data-lang="en">
          <span class="bb-lang-gate__flag" aria-hidden="true">🇬🇧</span>
          <span>English</span>
        </button>
      </div>
    </div>
  `,document.body.appendChild(t);const a=n=>{try{localStorage.setItem(Y,n)}catch{}document.body.classList.remove("bb-lang-gate-open"),t.remove(),e(n)};t.querySelectorAll("[data-lang]").forEach(n=>{n.addEventListener("click",()=>a(n.getAttribute("data-lang")||"ru"))}),requestAnimationFrame(()=>{var n;(n=t.querySelector(".bb-lang-gate__btn"))==null||n.focus()})}async function He(){const e=document.getElementById("bb-header"),t=document.getElementById("bb-nav");e&&(e.hidden=!0),t&&(t.hidden=!0);const a=document.getElementById("bb-root");if(!a)return;const n=Ae();if(!n){a.className="bb-root",a.innerHTML="",Pe(s=>{z(s).catch(()=>{})});return}await z(n)}async function z(e){const t=x(e);document.documentElement.lang=e;const a=document.getElementById("bb-root");if(!a)return;a.className="bb-root bb-root--landing",a.innerHTML=`
    <div class="bb-loading">
      <div class="bb-loading__pulse"></div>
    </div>`;let n={botUrl:"https://t.me/BRAINBOOSTY?start=site",channelUrl:"https://t.me/androgenautist",hasAuthorPhoto:!1};try{n=await le()}catch{}const s="/api/webapp/landing/photo",r=t.landingFeatures.map(i=>`<li>${d(i)}</li>`).join("");a.innerHTML=`
    <div class="bb-landing">
      <nav class="bb-landing-nav glass" aria-label="Menu">
        <a href="#top" class="bb-landing-nav__logo">${P}</a>
        <div class="bb-landing-nav__links">
          <a href="#about">${d(t.landingNavAbout)}</a>
          <a href="#project">${d(t.landingNavProject)}</a>
          <a href="#start" class="bb-landing-nav__cta">${d(t.landingNavCta)}</a>
        </div>
      </nav>

      <header id="top" class="bb-landing-hero">
        <div class="bb-landing-hero__glow" aria-hidden="true"></div>
        <img class="bb-landing-hero__brain" src="${R}" alt="" width="280" height="280" />
        <p class="bb-landing-kicker">${d(t.landingKicker)}</p>
        <h1 class="bb-landing-title neon-zone-title">${d(t.landingTitle)}</h1>
        <p class="bb-landing-tagline">${d(t.landingTagline)}</p>
        <a class="bb-landing-cta-primary" href="${d(n.botUrl)}" rel="noopener noreferrer">
          ${d(t.landingCta)}
        </a>
        <p class="bb-landing-cta-sub">${d(t.landingCtaSub)}</p>
      </header>

      <section id="about" class="bb-landing-section">
        <h2 class="bb-landing-section__title">${d(t.landingAboutTitle)}</h2>
        <article class="bb-landing-about glass">
          <div class="bb-landing-about__photo-wrap">
            <img class="bb-landing-about__photo" src="${s}" alt="" width="320" height="320" loading="lazy" data-fallback-src="${R}" />
            <div class="bb-landing-about__ring" aria-hidden="true"></div>
          </div>
          <div class="bb-landing-about__text">
            ${t.landingAboutParagraphs.map(i=>`<p>${d(i)}</p>`).join("")}
            <a class="bb-landing-link" href="${d(n.channelUrl)}" target="_blank" rel="noopener noreferrer">
              ${d(t.landingChannelLink)}
            </a>
          </div>
        </article>
      </section>

      <section id="project" class="bb-landing-section">
        <h2 class="bb-landing-section__title">${d(t.landingProjectTitle)}</h2>
        <ul class="bb-landing-features">${r}</ul>
        <p class="bb-landing-disclaimer">${d(t.footer)}</p>
      </section>

      <section id="start" class="bb-landing-section bb-landing-final">
        <div class="glass bb-landing-final__card">
          <h2 class="bb-landing-final__title">${d(t.landingFinalTitle)}</h2>
          <p class="bb-landing-final__sub">${d(t.landingFinalSub)}</p>
          <a class="bb-landing-cta-primary bb-landing-cta-primary--lg" href="${d(n.botUrl)}" rel="noopener noreferrer">
            ${d(t.landingCta)}
          </a>
        </div>
      </section>

      <footer class="bb-landing-footer">
        <span>BrainBoosty · Neural Map</span>
      </footer>
    </div>
  `,a.querySelectorAll(".bb-landing-about__photo").forEach(i=>{const o=i.getAttribute("data-fallback-src");o&&i.addEventListener("error",()=>{i.removeAttribute("data-fallback-src"),i.src=o})}),a.querySelectorAll('a[href^="#"]').forEach(i=>{i.addEventListener("click",o=>{var h;const l=(h=i.getAttribute("href"))==null?void 0:h.slice(1);if(!l)return;const b=document.getElementById(l);b&&(o.preventDefault(),b.scrollIntoView({behavior:"smooth",block:"start"}))})})}function qe(){var a;const e=(a=window.Telegram)==null?void 0:a.WebApp;return e?(e.initData||"").trim().length>0:!1}const{initData:Ie,user:De,lang:je}=fe();qe()?Me({initData:Ie,user:De,lang:je}):He();
