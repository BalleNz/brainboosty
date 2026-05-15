(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))n(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&n(o)}).observe(document,{childList:!0,subtree:!0});function a(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(s){if(s.ep)return;s.ep=!0;const r=a(s);fetch(s.href,r)}})();const J="/webapp/assets/full-glowing-brain-Cl127Rfm.png",Q="/webapp/assets/amygdala-DP7dGDc4.png",Z="/webapp/assets/lobes-uZqghd8w.png",K="/webapp/assets/frontal-gyrus-DPq4mhR0.png",X="/webapp/assets/insula-CAJDukm_.png",ee="/webapp/assets/pfc-BE-jJY5g.png",te="/webapp/assets/tpj-Cgg8S5Iu.png",N=["prefrontal_cortex","brain_lobes","insular_cortex","temporoparietal_junction","amygdala","frontal_gyrus"],ne={prefrontal_cortex:ee,brain_lobes:Z,insular_cortex:X,temporoparietal_junction:te,amygdala:Q,frontal_gyrus:K},ae=J;function se(e){const t=N.map(n=>Number(e[n]??0)),a=t.reduce((n,s)=>n+s,0);return Math.round(a/Math.max(t.length,1)*10)/10}function re(e){const t={"Content-Type":"application/json"};return e&&(t["X-Telegram-Init-Data"]=e),t}async function E(e,{initData:t,method:a="GET",body:n}={}){const s=await fetch(`/api/webapp${e}`,{method:a,headers:re(t),body:n?JSON.stringify(n):void 0});if(!s.ok){const r=new Error(`HTTP ${s.status}`);r.status=s.status;try{r.detail=(await s.json()).detail}catch{}throw r}return s.json()}function z(e,t){var r,o;const a=e.lang==="en"?"en":e.lang==="ru"?"ru":t,n={};for(const l of N)n[l]=Number(((r=e.scores)==null?void 0:r[l])??0);const s={};for(const l of N){const i=((o=e.regions)==null?void 0:o[l])??{};s[l]={main:Number(i.main??n[l]),bullets:i.bullets??[],submetrics:(i.submetrics??[]).map(u=>({label:u.label??u.label_ru??"",value:Number(u.value??n[l])}))}}return{lang:a,userDisplayName:e.userDisplayName??e.user_display_name??"Guest",paid:!!e.paid,hasMap:!!(e.hasMap??e.has_map??Object.keys(e.scores||{}).length),testVariant:e.testVariant??e.test_variant??"development",tributeUrl:e.tributeUrl??e.tribute_url??"",neuroScore:e.neuroScore!=null?Number(e.neuroScore):se(n),scores:n,connectivity:e.connectivity??[],regions:s,snapshotId:e.snapshotId??e.snapshot_id??null,createdAt:e.createdAt??e.created_at??null}}async function oe(){return E("/landing",{initData:""})}async function M(e){const t=await E("/profile",{initData:e.initData});return z(t,e.lang)}async function ie(e){return E("/history",{initData:e.initData})}async function le(e,t="development"){return E(`/test/questions?variant=${encodeURIComponent(t)}`,{initData:e.initData})}async function ce(e,{variant:t,answers:a}){const n={variant:t,answers:a},s=await E("/test/submit",{initData:e.initData,method:"POST",body:n});return z(s.profile,e.lang)}const de={landingKicker:"BrainBoosty · neuroscience, no fluff",landingTitle:"Upgrade your brain — see your Neural Map",landingTagline:"7 questions → a personal 6-zone brain map, NeuroScore, and clear next steps. All in Telegram.",landingCta:"Boost my brain",landingCtaSub:"Free start in the bot · 2 minutes",landingNavAbout:"About me",landingNavProject:"The project",landingNavCta:"Open bot",landingAboutTitle:"About me",landingAboutParagraphs:["Hi, I'm @androgenautist — creator of BrainBoosty.","I went from anxiety, brain fog, and tension to clarity, inner strength, and confidence. Now I help others with neurobiology, hormones, and cognitive habits.","On my channel I share actionable insights—no marketing noise, only what actually shifts your state."],landingChannelLink:"→ Channel @androgenautist",landingProjectTitle:"What's inside",landingFeatures:["7-question cognitive test — development or sexual profile","Neural Map: 6 brain zones with NeuroScore and recommendations","Progress history and test-to-test comparison","Daily hooks and a private exercise channel"],landingFinalTitle:"Ready to see your map?",landingFinalSub:"Open the bot — onboarding takes a few minutes; your first map is free.",heroBrain:"NEURAL MAP",scoreLabel:"NeuroScore",coverLine:"Six zones · one profile. Numbers, focus, and a clear read—no clutter.",connectivityTitle:"Inter-region links (educational model)",zoneLevel:"Integrated zone level",progressMain:e=>`Your progress ${e}%`,recTitle:"Why this zone is your biggest pleasure lever",footer:"BrainBoosty · educational model · not a medical diagnosis",premiumCta:"Get full access",premiumBadge:"Full access",premiumTitle:"Get full access — today",premiumSub:"A 30-day personal plan, progress tracker, exercises for your profile, and the private channel.",premiumBullets:["Full brain map and all zone recommendations","Progress history with test comparisons","Retests and trend tracking","Private channel and daily hooks"],navMap:"Map",navHistory:"History",navTest:"Test",navPremium:"Access",loading:"Loading your neuro profile…",computing:"Computing your brain map…",errorLoad:"Could not load data. Please try again later.",authError:"Open the app from the Telegram bot.",notRegistered:"Complete the bot questionnaire first (/start).",historyTitle:"Progress history",historySub:"Zone comparison across tests. Arrows show percentage-point change.",historyEmpty:"No saved tests yet. Take your first test to see history here.",startTest:"Take the test",latest:"Latest",openThisMap:"Open map",testTitle:"Cognitive test",testPickVariant:"Choose question style (7 steps):",variantDev:"Development & cognition",variantSex:"Sexual profile",questionProgress:(e,t)=>`Question ${e} of ${t}`,regions:{prefrontal_cortex:"Prefrontal cortex",brain_lobes:"Brain lobes · imagery",insular_cortex:"Insular cortex",temporoparietal_junction:"Temporoparietal junction",amygdala:"Amygdala",frontal_gyrus:"Frontal gyrus"}},U={landingKicker:"BrainBoosty · нейробиология без воды",landingTitle:"Прокачай мозг — увидь свою Neural Map",landingTagline:"7 вопросов → персональная карта из 6 зон мозга, NeuroScore и понятные шаги. Всё в Telegram.",landingCta:"Прокачать мозг",landingCtaSub:"Бесплатный старт в боте · 2 минуты",landingNavAbout:"Обо мне",landingNavProject:"Проект",landingNavCta:"В бота",landingAboutTitle:"Обо мне",landingAboutParagraphs:["Привет, я @androgenautist — автор BrainBoosty.","Сам прошёл путь от тревожности, тумана в голове и зажатости — к ясности, внутренней силе и уверенности. Сейчас помогаю другим по нейробиологии, гормонам и когнитивным привычкам.","В канале делюсь рабочими инсайтами без маркетинговой шелухи — только то, что реально меняет состояние."],landingChannelLink:"→ Канал @androgenautist",landingProjectTitle:"Что внутри",landingFeatures:["Когнитивный тест из 7 вопросов — два стиля (развитие / сексуальный профиль)","Neural Map: 6 зон мозга с NeuroScore и рекомендациями","История прогресса и сравнение между тестами","Ежедневные хуки и закрытый канал с упражнениями"],landingFinalTitle:"Готов увидеть свою карту?",landingFinalSub:"Открой бота — анкета займёт пару минут, первая карта бесплатно.",heroBrain:"NEURAL MAP",scoreLabel:"NeuroScore",coverLine:"Шесть зон · один профиль. Цифры, акценты и ясная картина без лишнего шума.",connectivityTitle:"Связность зон (образовательная модель)",zoneLevel:"Интегральный уровень зоны",progressMain:e=>`Твой прогресс ${e}%`,recTitle:"Почему эта зона — твой главный рычаг удовольствия",footer:"BrainBoosty · образовательная модель · не медицинский диагноз",premiumCta:"Забрать полный доступ",premiumBadge:"Полный доступ",premiumTitle:"Забери полный доступ — сегодня",premiumSub:"Персональный план на 30 дней, трекер прогресса, упражнения под твой профиль и закрытый канал.",premiumBullets:["Полная карта мозга и все рекомендации по зонам","История прогресса с сравнением тестов","Повторные тесты и отслеживание динамики","Закрытый канал и ежедневные хуки"],navMap:"Карта",navHistory:"История",navTest:"Тест",navPremium:"Доступ",loading:"Загружаем нейропрофиль…",computing:"Считаем твою карту мозга…",errorLoad:"Не удалось загрузить данные. Попробуйте позже.",authError:"Откройте приложение из Telegram-бота.",notRegistered:"Сначала пройдите анкету в боте (/start).",historyTitle:"История прогресса",historySub:"Сравнение зон между прохождениями. Стрелки — изменение в процентных пунктах.",historyEmpty:"Пока нет сохранённых тестов. Пройдите первый тест — и здесь появится история.",startTest:"Пройти тест",latest:"Актуально",openThisMap:"Открыть карту",testTitle:"Когнитивный тест",testPickVariant:"Выберите стиль вопросов (7 шагов):",variantDev:"Развитие и когниция",variantSex:"Сексуальный профиль",questionProgress:(e,t)=>`Вопрос ${e} из ${t}`,regions:{prefrontal_cortex:"Префронтальная кора",brain_lobes:"Доли мозга · образы",insular_cortex:"Островковая кора",temporoparietal_junction:"Височно-теменной узел",amygdala:"Амигдала",frontal_gyrus:"Лобная извилина"}},ue={ru:U,en:de};function _(e){return ue[e==="en"?"en":"ru"]??U}const q=new Set;function G(){const e=(window.location.hash||"#map").replace(/^#/,""),[t,a]=e.split("?");return{name:t||"map",params:new URLSearchParams(a||"")}}function w(e,t={}){var n;const a=((n=t.toString)==null?void 0:n.call(t))||new URLSearchParams(t).toString();window.location.hash=a?`${e}?${a}`:e}function be(e){return q.add(e),()=>q.delete(e)}function V(){const e=G();for(const t of q)t(e)}window.addEventListener("hashchange",V);function pe(){V()}function ge(){var n,s,r;const e=(n=window.Telegram)==null?void 0:n.WebApp;if(!e)return{tg:null,initData:"",user:null,lang:"ru"};e.ready(),e.expand(),e.enableClosingConfirmation(),e.disableVerticalSwipes&&e.disableVerticalSwipes(),D(e.themeParams),e.onEvent("themeChanged",()=>D(e.themeParams));const t=((s=e.initDataUnsafe)==null?void 0:s.user)??null,a=(t==null?void 0:t.language_code)==="en"||(r=t==null?void 0:t.language_code)!=null&&r.startsWith("en")?"en":"ru";return e.setHeaderColor&&e.setHeaderColor("#010108"),e.setBackgroundColor&&e.setBackgroundColor("#010108"),{tg:e,initData:e.initData||"",user:t,lang:a}}function D(e={}){const t=document.documentElement;e.bg_color&&t.style.setProperty("--bb-tg-bg",e.bg_color),e.text_color&&t.style.setProperty("--bb-tg-text",e.text_color)}function me(e){var a;const t=(a=window.Telegram)==null?void 0:a.WebApp;if(t!=null&&t.openTelegramLink&&e.includes("t.me/")){t.openTelegramLink(e);return}if(t!=null&&t.openLink){t.openLink(e);return}window.open(e,"_blank","noopener,noreferrer")}function C(){var e,t,a,n;(n=(a=(t=(e=window.Telegram)==null?void 0:e.WebApp)==null?void 0:t.HapticFeedback)==null?void 0:a.impactOccurred)==null||n.call(a,"light")}const I=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 48" fill="none">
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
`;function $(e){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}function fe(e,{displayName:t,neuroScore:a,connectivity:n}){const s=(n==null?void 0:n.length)>0?`
    <div class="bb-connectivity glass rounded-2xl p-4 mt-5">
      <p class="bb-connectivity__title">${$(e.connectivityTitle)}</p>
      ${n.map(r=>`<p>• ${$(r)}</p>`).join(`
      `)}
    </div>`:"";return`
<section class="bb-section bb-cover" data-section="cover">
  <div class="bb-cover__logo">${I}</div>
  <img src="${ae}" alt="" class="cover-full-brain-hero mb-4" width="360" height="260" decoding="async" />
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
</section>`}function F({label:e,value:t,glow:a=!1}){const n=Math.max(0,Math.min(100,Number(t)||0)),s=Math.max(0,100-n),r=a?"pdf-bar-gradient pdf-bar-gradient--main":"pdf-bar-gradient pdf-bar-gradient--sub",o=he(e);return[`<div class="mb-3.5" data-bar-value="${n}">`,'<div class="flex justify-between text-xs text-slate-400 mb-1">',`<span>${o}</span>`,`<span class="text-cyan-100 font-bold tracking-wide">${n.toFixed(1)}%</span>`,"</div>",'<div class="pdf-bar-track">',`<div class="${r}" style="clip-path: inset(0 ${s.toFixed(2)}% 0 0);"></div>`,"</div>","</div>"].join(`
  `)}function he(e){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}function A(e){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}function ve(e,t,a){const n=e.regions[t]??t,s=ne[t],r=Number(a.main??0),o=e.progressMain(`${r.toFixed(1)}`),l=[F({label:e.zoneLevel,value:r,glow:!0}),...(a.submetrics??[]).map(u=>F({label:u.label,value:u.value,glow:!1}))].join(`
`),i=(a.bullets??[]).map(u=>`<li>${A(u)}</li>`).join(`
        `);return`
<section class="bb-section bb-region" data-section="region" data-region="${t}" id="zone-${t}">
  <img src="${s}" alt="" class="brain-float-top mb-3" width="320" height="220" loading="lazy" decoding="async" />
  <h2 class="bb-region__title neon-zone-title px-2">${A(n)}</h2>
  <p class="bb-region__progress-label">${A(o)}</p>
  <div class="glass rounded-2xl p-4 max-w-xl mx-auto w-full">
    ${l}
  </div>
  <div class="glass rounded-2xl p-4 mt-4 max-w-xl mx-auto w-full">
    <p class="bb-rec-title">${A(e.recTitle)}</p>
    <ul class="bb-rec-list">
        ${i}
    </ul>
  </div>
</section>`}function ye(e,t){const a=_(t.lang),n=t.userDisplayName||(t.lang==="en"?"Guest":"Гость"),s=[fe(a,{displayName:n,neuroScore:t.neuroScore,connectivity:t.connectivity}),...N.map(o=>{var l,i;return ve(a,o,{main:t.scores[o],bullets:((l=t.regions[o])==null?void 0:l.bullets)??[],submetrics:((i=t.regions[o])==null?void 0:i.submetrics)??[]})})];e.innerHTML=s.join(`
`);const r=document.getElementById("bb-header-logo");r&&(r.innerHTML=I),xe(e),_e(e),$e(e)}function xe(e){const t=e.querySelectorAll(".bb-section"),a=new IntersectionObserver(r=>{for(const o of r)o.isIntersecting&&(o.target.classList.add("is-visible"),a.unobserve(o.target))},{root:null,rootMargin:"0px 0px -8% 0px",threshold:.08});t.forEach(r=>a.observe(r));const n=document.getElementById("bb-header"),s=e.querySelector('[data-section="cover"]');n&&s&&new IntersectionObserver(([o])=>{n.hidden=!1,n.classList.toggle("is-visible",!o.isIntersecting)},{threshold:.15}).observe(s)}function _e(e){const t=e.querySelector("[data-neuro-score]");if(!t)return;const a=parseFloat(t.textContent||"0"),n=1200,s=performance.now(),r=o=>{const l=Math.min(1,(o-s)/n),i=1-(1-l)**3;t.textContent=(a*i).toFixed(1),l<1&&requestAnimationFrame(r)};requestAnimationFrame(r)}function $e(e){const t=e.querySelectorAll("[data-bar-value]"),a=new IntersectionObserver(n=>{for(const s of n){if(!s.isIntersecting)continue;const r=s.target,o=parseFloat(r.getAttribute("data-bar-value")||"0"),l=r.querySelector(".pdf-bar-gradient");l&&(l.style.clipPath="inset(0 100% 0 0)",requestAnimationFrame(()=>{l.style.clipPath=`inset(0 ${Math.max(0,100-o).toFixed(2)}% 0 0)`})),a.unobserve(r)}},{threshold:.2});t.forEach(n=>a.observe(n))}function B(e){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}function we(e,t){if(!e)return"—";try{return new Date(e).toLocaleString(t==="en"?"en-GB":"ru-RU",{day:"2-digit",month:"short",year:"numeric",hour:"2-digit",minute:"2-digit"})}catch{return e}}async function Te(e,t,a){var i,u;const n=_(a.lang),s=document.createElement("section");s.className="bb-section is-visible bb-history",s.innerHTML=`
    <h2 class="bb-page-title neon-zone-title">${B(n.historyTitle)}</h2>
    <p class="bb-page-sub text-slate-300/90 text-sm mb-4">${B(n.historySub)}</p>
  `;const r=document.createElement("div");r.className="space-y-3",r.textContent=n.loading,s.appendChild(r),e.replaceChildren(s);let o;try{o=await ie(t)}catch{r.innerHTML=`<p class="bb-error">${B(n.errorLoad)}</p>`;return}const l=o.items??[];if(r.replaceChildren(),!l.length){const h=document.createElement("div");h.className="glass rounded-2xl p-5 text-center";const c=document.createElement("p");c.className="text-slate-200 mb-4",c.textContent=n.historyEmpty;const b=document.createElement("button");b.type="button",b.className="bb-btn-primary",b.textContent=n.startTest,b.addEventListener("click",()=>w("test")),h.append(c,b),r.appendChild(h);return}for(const[h,c]of l.entries()){const b=document.createElement("article");b.className=`glass rounded-2xl p-4 bb-history-card${h===0?" is-active":""}`;const v=document.createElement("div");v.className="flex justify-between items-start gap-2 mb-2";const T=document.createElement("div");if(T.innerHTML=`
      <p class="text-xs text-cyan-200/80 uppercase tracking-wide">${B(we(c.createdAt,a.lang))}</p>
      <p class="text-lg font-bold text-white mt-1 bb-type-display">NeuroScore <span class="text-cyan-200">${Number(c.neuroScore).toFixed(1)}</span></p>
    `,v.appendChild(T),h===0){const x=document.createElement("span");x.className="bb-badge",x.textContent=n.latest,v.appendChild(x)}b.appendChild(v);const y=document.createElement("div");y.className="bb-history-deltas";for(const x of N){const W=n.regions[x]??x,Y=Number(((i=c.scores)==null?void 0:i[x])??0).toFixed(1),L=c.isFirst?"—":((u=c.deltas)==null?void 0:u[x])??"·",P=document.createElement("div");P.className="bb-history-row";const H=document.createElement("span");H.textContent=W;const j=document.createElement("span");j.textContent=`${Y}%`;const k=document.createElement("span");k.textContent=L,typeof L=="string"&&L.includes("↑")&&(k.className="bb-delta-up"),typeof L=="string"&&L.includes("↓")&&(k.className="bb-delta-down"),P.append(H,j,k),y.appendChild(P)}b.appendChild(y);const g=document.createElement("button");g.type="button",g.className="bb-btn-ghost mt-3 w-full",g.textContent=n.openThisMap,g.addEventListener("click",()=>w("map")),b.appendChild(g),r.appendChild(b)}}function S(e){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}function Le(e,t){var n;const a=_(t.lang);e.innerHTML=`
    <section class="bb-section is-visible bb-premium">
      <div class="mb-3 rounded-full px-5 py-1.5 border border-cyan-400/30 bg-cyan-500/10 text-xs font-bold uppercase tracking-[0.35em] text-cyan-100 text-center bb-type-display">
        ${S(a.premiumBadge)}
      </div>
      <h2 class="text-3xl font-black text-center bg-gradient-to-r from-cyan-100 via-violet-200 to-fuchsia-300 bg-clip-text text-transparent mb-4 neon-cta-title">
        ${S(a.premiumTitle)}
      </h2>
      <p class="text-slate-200 text-center text-sm leading-relaxed mb-6">${S(a.premiumSub)}</p>
      <ul class="bb-premium-list glass rounded-2xl p-5 mb-6 space-y-3 text-sm text-slate-200">
        ${a.premiumBullets.map(s=>`<li>${S(s)}</li>`).join("")}
      </ul>
      <button type="button" class="bb-btn-primary w-full" id="bb-premium-buy">${S(a.premiumCta)}</button>
    </section>
  `,(n=e.querySelector("#bb-premium-buy"))==null||n.addEventListener("click",()=>{C(),t.tributeUrl&&me(t.tributeUrl)})}function m(e){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}async function Se(e,t,a,{onProfile:n}={}){const s=_(a.lang),r={variant:a.testVariant||"development",questions:[],answers:{},step:0},o=document.createElement("section");o.className="bb-section is-visible bb-test",e.replaceChildren(o);async function l(){o.innerHTML=`<p class="text-cyan-200/80 text-sm">${m(s.loading)}</p>`;try{const c=await le(t,r.variant);r.questions=c.questions??[],r.step=0,r.answers={},u()}catch{o.innerHTML=`<p class="bb-error">${m(s.errorLoad)}</p>`}}function i(){o.innerHTML=`
      <h2 class="bb-page-title neon-zone-title">${m(s.testTitle)}</h2>
      <p class="bb-page-sub text-slate-300/90 text-sm mb-4">${m(s.testPickVariant)}</p>
      <div class="grid gap-3">
        <button type="button" class="bb-btn-primary" data-variant="development">${m(s.variantDev)}</button>
        <button type="button" class="bb-btn-ghost" data-variant="sexual">${m(s.variantSex)}</button>
      </div>
    `,o.querySelectorAll("[data-variant]").forEach(c=>{c.addEventListener("click",()=>{C(),r.variant=c.getAttribute("data-variant")||"development",l()})})}function u(){const c=r.questions[r.step];if(!c){i();return}const b=r.questions.length,v=(r.step+1)/b*100;o.innerHTML=`
      <div class="bb-test-progress mb-4">
        <div class="flex justify-between text-xs text-cyan-200/80 mb-1">
          <span>${m(s.questionProgress(r.step+1,b))}</span>
          <span>${Math.round(v)}%</span>
        </div>
        <div class="pdf-bar-track"><div class="pdf-bar-gradient pdf-bar-gradient--main" style="clip-path: inset(0 ${(100-v).toFixed(1)}% 0 0)"></div></div>
      </div>
      <h2 class="text-lg font-bold text-cyan-100 mb-2 neon-zone-title">${m(c.topic)}</h2>
      <p class="text-slate-200 mb-4 leading-relaxed">${m(c.text)}</p>
      <div class="grid gap-2 bb-test-options" id="bb-test-options"></div>
    `;const T=o.querySelector("#bb-test-options");for(const y of c.options??[]){const g=document.createElement("button");g.type="button",g.className="bb-test-option",g.innerHTML=`<span class="bb-test-option-key">${m(y.key)}</span><span>${m(y.label)}</span>`,g.addEventListener("click",()=>h(y.key)),T.appendChild(g)}}async function h(c){C();const b=r.questions[r.step];if(r.answers[b.id]=c,r.step+1<r.questions.length){r.step+=1,u();return}o.innerHTML=`
      <div class="bb-loading">
        <div class="bb-loading__pulse"></div>
        <p class="text-sm text-cyan-200/80">${m(s.computing)}</p>
      </div>`;try{const v={};for(const[y,g]of Object.entries(r.answers))v[String(y)]=g;const T=await ce(t,{variant:r.variant,answers:v});n&&n(T),w("map")}catch{o.innerHTML=`<p class="bb-error">${m(s.errorLoad)}</p>`}}i()}let f=null,p=null;function Ne(e){const t=document.getElementById("bb-nav");t&&t.querySelectorAll(".bb-nav__btn").forEach(a=>{a.classList.toggle("is-active",a.dataset.route===e)})}function Ce(e){var n;if((n=document.querySelector(".bb-premium-fab"))==null||n.remove(),e.paid||!e.tributeUrl)return;const t=_(e.lang),a=document.createElement("button");a.type="button",a.className="bb-premium-fab",a.textContent=t.premiumCta,a.addEventListener("click",()=>{C(),w("premium")}),document.body.appendChild(a)}function Ee(e){const t=document.getElementById("bb-nav");if(!t)return;const a=_(e);t.hidden=!1,t.innerHTML=`
    <button type="button" class="bb-nav__btn" data-route="map">${a.navMap}</button>
    <button type="button" class="bb-nav__btn" data-route="history">${a.navHistory}</button>
    <button type="button" class="bb-nav__btn" data-route="test">${a.navTest}</button>
    <button type="button" class="bb-nav__btn" data-route="premium">${a.navPremium}</button>
  `,t.querySelectorAll(".bb-nav__btn").forEach(n=>{n.addEventListener("click",()=>{C(),w(n.dataset.route||"map")})})}async function O(e){var a;const t=document.getElementById("bb-root");if(!(!t||!f)){if(Ne(e.name),e.name==="premium"){p||(p=await M(f)),Le(t,p);return}if(e.name==="test"){p||(p=await M(f)),await Se(t,f,p,{onProfile:n=>{p=n}});return}if(e.name==="history"){p||(p=await M(f)),await Te(t,f,p);return}if(!p){const n=_(f.lang);t.innerHTML=`
      <div class="bb-loading">
        <div class="bb-loading__pulse"></div>
        <p class="text-sm text-cyan-200/80">${n.loading}</p>
      </div>`;try{p=await M(f),(a=f.user)!=null&&a.first_name&&!p.userDisplayName&&(p.userDisplayName=[f.user.first_name,f.user.last_name].filter(Boolean).join(" "))}catch(s){const r=(s==null?void 0:s.status)===403?n.notRegistered:(s==null?void 0:s.status)===401?n.authError:n.errorLoad;t.innerHTML=`<p class="bb-error">${r}</p>`;return}}if(!p.hasMap&&e.name==="map"){w("test");return}ye(t,p),Ce(p)}}async function ke(e){if(f=e,p=null,!document.getElementById("bb-root"))return;Ee(e.lang),be(n=>{O(n).catch(()=>{})}),pe();const a=G();window.location.hash?await O(a):w("map")}const R="/webapp/assets/full-glowing-brain-Cl127Rfm.png";function d(e){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}function Me(){return(navigator.language||"ru").toLowerCase().startsWith("en")?"en":"ru"}async function Ae(){const e=Me(),t=_(e);document.documentElement.lang=e;const a=document.getElementById("bb-header"),n=document.getElementById("bb-nav");a&&(a.hidden=!0),n&&(n.hidden=!0);const s=document.getElementById("bb-root");if(!s)return;s.className="bb-root bb-root--landing",s.innerHTML=`
    <div class="bb-loading">
      <div class="bb-loading__pulse"></div>
    </div>`;let r={botUrl:"https://t.me/BRAINBOOSTY?start=site",channelUrl:"https://t.me/androgenautist",hasAuthorPhoto:!1};try{r=await oe()}catch{}const o="/api/webapp/landing/photo",l=t.landingFeatures.map(i=>`<li>${d(i)}</li>`).join("");s.innerHTML=`
    <div class="bb-landing">
      <nav class="bb-landing-nav glass" aria-label="Menu">
        <a href="#top" class="bb-landing-nav__logo">${I}</a>
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
        <a class="bb-landing-cta-primary" href="${d(r.botUrl)}" rel="noopener noreferrer">
          ${d(t.landingCta)}
        </a>
        <p class="bb-landing-cta-sub">${d(t.landingCtaSub)}</p>
      </header>

      <section id="about" class="bb-landing-section">
        <h2 class="bb-landing-section__title">${d(t.landingAboutTitle)}</h2>
        <article class="bb-landing-about glass">
          <div class="bb-landing-about__photo-wrap">
            <img class="bb-landing-about__photo" src="${o}" alt="" width="320" height="320" loading="lazy" data-fallback-src="${R}" />
            <div class="bb-landing-about__ring" aria-hidden="true"></div>
          </div>
          <div class="bb-landing-about__text">
            ${t.landingAboutParagraphs.map(i=>`<p>${d(i)}</p>`).join("")}
            <a class="bb-landing-link" href="${d(r.channelUrl)}" target="_blank" rel="noopener noreferrer">
              ${d(t.landingChannelLink)}
            </a>
          </div>
        </article>
      </section>

      <section id="project" class="bb-landing-section">
        <h2 class="bb-landing-section__title">${d(t.landingProjectTitle)}</h2>
        <ul class="bb-landing-features">${l}</ul>
        <p class="bb-landing-disclaimer">${d(t.footer)}</p>
      </section>

      <section id="start" class="bb-landing-section bb-landing-final">
        <div class="glass bb-landing-final__card">
          <h2 class="bb-landing-final__title">${d(t.landingFinalTitle)}</h2>
          <p class="bb-landing-final__sub">${d(t.landingFinalSub)}</p>
          <a class="bb-landing-cta-primary bb-landing-cta-primary--lg" href="${d(r.botUrl)}" rel="noopener noreferrer">
            ${d(t.landingCta)}
          </a>
        </div>
      </section>

      <footer class="bb-landing-footer">
        <span>BrainBoosty · Neural Map</span>
      </footer>
    </div>
  `,s.querySelectorAll(".bb-landing-about__photo").forEach(i=>{const u=i.getAttribute("data-fallback-src");u&&i.addEventListener("error",()=>{i.removeAttribute("data-fallback-src"),i.src=u})}),s.querySelectorAll('a[href^="#"]').forEach(i=>{i.addEventListener("click",u=>{var b;const h=(b=i.getAttribute("href"))==null?void 0:b.slice(1);if(!h)return;const c=document.getElementById(h);c&&(u.preventDefault(),c.scrollIntoView({behavior:"smooth",block:"start"}))})})}function Be(){var a;const e=(a=window.Telegram)==null?void 0:a.WebApp;return e?(e.initData||"").trim().length>0:!1}const{initData:Pe,user:qe,lang:Ie}=ge();Be()?ke({initData:Pe,user:qe,lang:Ie}):Ae();
