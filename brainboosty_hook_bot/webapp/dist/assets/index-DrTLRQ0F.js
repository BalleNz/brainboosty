(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))n(r);new MutationObserver(r=>{for(const s of r)if(s.type==="childList")for(const i of s.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&n(i)}).observe(document,{childList:!0,subtree:!0});function a(r){const s={};return r.integrity&&(s.integrity=r.integrity),r.referrerPolicy&&(s.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?s.credentials="include":r.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function n(r){if(r.ep)return;r.ep=!0;const s=a(r);fetch(r.href,s)}})();const de="/assets/full-glowing-brain-Cl127Rfm.png",ue="/assets/amygdala-DP7dGDc4.png",be="/assets/lobes-uZqghd8w.png",pe="/assets/frontal-gyrus-DPq4mhR0.png",ge="/assets/insula-CAJDukm_.png",me="/assets/pfc-BE-jJY5g.png",fe="/assets/tpj-Cgg8S5Iu.png",B=["prefrontal_cortex","brain_lobes","insular_cortex","temporoparietal_junction","amygdala","frontal_gyrus"],he={prefrontal_cortex:me,brain_lobes:be,insular_cortex:ge,temporoparietal_junction:fe,amygdala:ue,frontal_gyrus:pe},ve=de;function ye(e){const t=B.map(n=>Number(e[n]??0)),a=t.reduce((n,r)=>n+r,0);return Math.round(a/Math.max(t.length,1)*10)/10}function xe(e){const t={"Content-Type":"application/json"};return e&&(t["X-Telegram-Init-Data"]=e),t}async function q(e,{initData:t,method:a="GET",body:n}={}){const r=await fetch(`/api/webapp${e}`,{method:a,headers:xe(t),body:n?JSON.stringify(n):void 0});if(!r.ok){const s=new Error(`HTTP ${r.status}`);s.status=r.status;try{s.detail=(await r.json()).detail}catch{}throw s}return r.json()}function Q(e){var r,s;const t=e.lang==="en"?"en":"ru",a={};for(const i of B)a[i]=Number(((r=e.scores)==null?void 0:r[i])??0);const n={};for(const i of B){const o=((s=e.regions)==null?void 0:s[i])??{};n[i]={main:Number(o.main??a[i]),bullets:o.bullets??[],submetrics:(o.submetrics??[]).map(d=>({label:d.label??d.label_ru??"",value:Number(d.value??a[i])}))}}return{lang:t,userDisplayName:e.userDisplayName??e.user_display_name??"Guest",paid:!!e.paid,hasMap:!!(e.hasMap??e.has_map??Object.keys(e.scores||{}).length),testVariant:e.testVariant??e.test_variant??"development",tributeUrl:e.tributeUrl??e.tribute_url??"",neuroScore:e.neuroScore!=null?Number(e.neuroScore):ye(a),scores:a,connectivity:e.connectivity??[],regions:n,snapshotId:e.snapshotId??e.snapshot_id??null,createdAt:e.createdAt??e.created_at??null}}async function _e(){return q("/landing",{initData:""})}async function I(e){const t=await q("/profile",{initData:e.initData});return Q(t)}async function we(e){return q("/history",{initData:e.initData})}async function $e(e,t="development"){return q(`/test/questions?variant=${encodeURIComponent(t)}`,{initData:e.initData})}async function Le(e,{variant:t,answers:a}){const n={variant:t,answers:a},r=await q("/test/submit",{initData:e.initData,method:"POST",body:n});return Q(r.profile)}const Te={landingKicker:"BrainBoosty · neuroscience, no fluff",landingTitle:"Upgrade your brain — see your Neural Map",landingTagline:"7 questions → a personal 6-zone brain map, NeuroScore, and clear next steps. All in Telegram.",landingCta:"Boost my brain",landingCtaSub:"Free start in the bot · 2 minutes",landingNavAbout:"About me",landingNavProject:"The project",landingNavCta:"Open bot",landingLoginTelegram:"Log in with Telegram",landingChannelAria:"Telegram channel",landingAboutTitle:"About me",landingAboutParagraphs:["Hi, I'm @androgenautist — creator of BrainBoosty.","I went from anxiety, brain fog, and tension to clarity, inner strength, and confidence. Now I help others with neurobiology, hormones, and cognitive habits.","On my channel I share actionable insights—no marketing noise, only what actually shifts your state."],landingChannelLink:"→ Channel @androgenautist",landingProjectTitle:"What's inside",landingFeatures:["7-question cognitive test — development or sexual profile","Neural Map: 6 brain zones with NeuroScore and recommendations","Progress history and test-to-test comparison","Daily hooks and a private exercise channel"],landingFinalTitle:"Ready to see your map?",landingFinalSub:"Open the bot — onboarding takes a few minutes; your first map is free.",heroBrain:"NEURAL MAP",scoreLabel:"NeuroScore",coverLine:"Six zones · one profile. Numbers, focus, and a clear read—no clutter.",connectivityTitle:"Inter-region links (educational model)",zoneLevel:"Integrated zone level",progressMain:e=>`Your progress ${e}%`,recTitle:"Why this zone is your biggest pleasure lever",footer:"BrainBoosty · educational model · not a medical diagnosis",premiumCta:"Get full access",premiumBadge:"Full access",premiumTitle:"Get full access — today",premiumSub:"A 30-day personal plan, progress tracker, exercises for your profile, and the private channel.",premiumBullets:["Full brain map and all zone recommendations","Progress history with test comparisons","Retests and trend tracking","Private channel and daily hooks"],navMap:"Map",navHistory:"History",navTest:"Test",navPremium:"Access",appBrandName:"BrainBoosty",appHeaderTitle:"Neural Map",loading:"Loading your neuro profile…",computing:"Computing your brain map…",errorLoad:"Could not load data. Please try again later.",authError:"Open the app from the Telegram bot.",notRegistered:"Complete the bot questionnaire first (/start).",historyTitle:"Progress history",historySub:"Zone comparison across tests. Arrows show percentage-point change.",historyEmpty:"No saved tests yet. Take your first test to see history here.",startTest:"Take the test",latest:"Latest",openThisMap:"Open map",testTitle:"Cognitive test",testPickVariant:"Choose question style (7 steps):",variantDev:"Development & cognition",variantSex:"Sexual profile",variantSexBadge:"Maximum insight",variantSexHint:"Pleasure, drive, and your neural edge",variantDevHint:"Focus, habits, and cognitive style",questionProgress:(e,t)=>`Question ${e} of ${t}`,regions:{prefrontal_cortex:"Prefrontal cortex",brain_lobes:"Brain lobes · imagery",insular_cortex:"Insular cortex",temporoparietal_junction:"Temporoparietal junction",amygdala:"Amygdala",frontal_gyrus:"Frontal gyrus"}},K={landingKicker:"BrainBoosty · нейробиология без воды",landingTitle:"Прокачай мозг — увидь свою Neural Map",landingTagline:"7 вопросов → персональная карта из 6 зон мозга, NeuroScore и понятные шаги. Всё в Telegram.",landingCta:"Прокачать мозг",landingCtaSub:"Бесплатный старт в боте · 2 минуты",landingNavAbout:"Обо мне",landingNavProject:"Проект",landingNavCta:"В бота",landingLoginTelegram:"Войти через Telegram",landingChannelAria:"Канал в Telegram",landingAboutTitle:"Обо мне",landingAboutParagraphs:["Привет, я @androgenautist — автор BrainBoosty.","Сам прошёл путь от тревожности, тумана в голове и зажатости — к ясности, внутренней силе и уверенности. Сейчас помогаю другим по нейробиологии, гормонам и когнитивным привычкам.","В канале делюсь рабочими инсайтами без маркетинговой шелухи — только то, что реально меняет состояние."],landingChannelLink:"→ Канал @androgenautist",landingProjectTitle:"Что внутри",landingFeatures:["Когнитивный тест из 7 вопросов — два стиля (развитие / сексуальный профиль)","Neural Map: 6 зон мозга с NeuroScore и рекомендациями","История прогресса и сравнение между тестами","Ежедневные хуки и закрытый канал с упражнениями"],landingFinalTitle:"Готов увидеть свою карту?",landingFinalSub:"Открой бота — анкета займёт пару минут, первая карта бесплатно.",heroBrain:"NEURAL MAP",scoreLabel:"NeuroScore",coverLine:"Шесть зон · один профиль. Цифры, акценты и ясная картина без лишнего шума.",connectivityTitle:"Связность зон (образовательная модель)",zoneLevel:"Интегральный уровень зоны",progressMain:e=>`Твой прогресс ${e}%`,recTitle:"Почему эта зона — твой главный рычаг удовольствия",footer:"BrainBoosty · образовательная модель · не медицинский диагноз",premiumCta:"Забрать полный доступ",premiumBadge:"Полный доступ",premiumTitle:"Забери полный доступ — сегодня",premiumSub:"Персональный план на 30 дней, трекер прогресса, упражнения под твой профиль и закрытый канал.",premiumBullets:["Полная карта мозга и все рекомендации по зонам","История прогресса с сравнением тестов","Повторные тесты и отслеживание динамики","Закрытый канал и ежедневные хуки"],navMap:"Карта",navHistory:"История",navTest:"Тест",navPremium:"Доступ",appBrandName:"BrainBoosty",appHeaderTitle:"Neural Map",loading:"Загружаем нейропрофиль…",computing:"Считаем твою карту мозга…",errorLoad:"Не удалось загрузить данные. Попробуйте позже.",authError:"Откройте приложение из Telegram-бота.",notRegistered:"Сначала пройдите анкету в боте (/start).",historyTitle:"История прогресса",historySub:"Сравнение зон между прохождениями. Стрелки — изменение в процентных пунктах.",historyEmpty:"Пока нет сохранённых тестов. Пройдите первый тест — и здесь появится история.",startTest:"Пройти тест",latest:"Актуально",openThisMap:"Открыть карту",testTitle:"Когнитивный тест",testPickVariant:"Выберите стиль вопросов (7 шагов):",variantDev:"Развитие и когниция",variantSex:"Сексуальный профиль",variantSexBadge:"Максимум инсайта",variantSexHint:"Удовольствие, драйв и нейронный рельеф",variantDevHint:"Фокус, привычки и когнитивный стиль",questionProgress:(e,t)=>`Вопрос ${e} из ${t}`,regions:{prefrontal_cortex:"Префронтальная кора",brain_lobes:"Доли мозга · образы",insular_cortex:"Островковая кора",temporoparietal_junction:"Височно-теменной узел",amygdala:"Амигдала",frontal_gyrus:"Лобная извилина"}},Ee={ru:K,en:Te};function $(e){return Ee[e==="en"?"en":"ru"]??K}const j=new Set;function Z(){const e=(window.location.hash||"#map").replace(/^#/,""),[t,a]=e.split("?");return{name:t||"map",params:new URLSearchParams(a||"")}}function N(e,t={}){var n;const a=((n=t.toString)==null?void 0:n.call(t))||new URLSearchParams(t).toString();window.location.hash=a?`${e}?${a}`:e}function Se(e){return j.add(e),()=>j.delete(e)}function ee(){const e=Z();for(const t of j)t(e)}window.addEventListener("hashchange",ee);function Ne(){ee()}function Ae(){var n,r,s;const e=(n=window.Telegram)==null?void 0:n.WebApp;if(!e)return{tg:null,initData:"",user:null,lang:"ru"};e.ready(),e.expand(),e.enableClosingConfirmation(),e.disableVerticalSwipes&&e.disableVerticalSwipes(),R(),e.onEvent("themeChanged",R);const t=((r=e.initDataUnsafe)==null?void 0:r.user)??null,a=(t==null?void 0:t.language_code)==="en"||(s=t==null?void 0:t.language_code)!=null&&s.startsWith("en")?"en":"ru";return e.setHeaderColor&&e.setHeaderColor("#010108"),e.setBackgroundColor&&e.setBackgroundColor("#010108"),{tg:e,initData:e.initData||"",user:t,lang:a}}function R(){const e=document.documentElement;e.style.setProperty("--bb-tg-bg","#010108"),e.style.setProperty("--bb-tg-text","#f1f5f9")}function Me(e){var a;const t=(a=window.Telegram)==null?void 0:a.WebApp;if(t!=null&&t.openTelegramLink&&e.includes("t.me/")){t.openTelegramLink(e);return}if(t!=null&&t.openLink){t.openLink(e);return}window.open(e,"_blank","noopener,noreferrer")}function P(){var e,t,a,n;(n=(a=(t=(e=window.Telegram)==null?void 0:e.WebApp)==null?void 0:t.HapticFeedback)==null?void 0:a.impactOccurred)==null||n.call(a,"light")}function S(e){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}function Ce(e,{displayName:t,neuroScore:a,connectivity:n}){const r=(n==null?void 0:n.length)>0?`
    <div class="bb-connectivity glass rounded-2xl p-4 mt-5">
      <p class="bb-connectivity__title">${S(e.connectivityTitle)}</p>
      ${n.map(s=>`<p>• ${S(s)}</p>`).join(`
      `)}
    </div>`:"";return`
<section class="bb-section bb-cover" data-section="cover">
  <img src="${ve}" alt="" class="cover-full-brain-hero mb-4" width="360" height="260" decoding="async" />
  <div class="glass rounded-3xl p-6 sm:p-8 cover-neon-card border border-cyan-500/20">
    <p class="text-center text-sm uppercase tracking-[0.35em] text-cyan-200 mt-1 font-semibold drop-shadow-[0_0_16px_rgba(34,211,238,0.55)] bb-cover__kicker">
      ${S(e.heroBrain)}
    </p>
    <h1 class="text-center text-2xl sm:text-3xl font-bold mt-5 text-white drop-shadow-[0_0_20px_rgba(167,139,250,0.25)] neon-zone-title">
      ${S(t)}
    </h1>
    <p class="text-center text-slate-300/95 mt-3 text-[15px] leading-relaxed max-w-md mx-auto tracking-wide px-2">
      ${S(e.coverLine)}
    </p>
    <div class="mt-8 flex flex-col items-center justify-center">
      <p class="bb-cover__score-label text-cyan-100/90 text-sm mb-2 font-medium tracking-wide drop-shadow-[0_0_10px_rgba(34,211,238,0.35)]">
        ${S(e.scoreLabel)}
      </p>
      <div class="text-6xl sm:text-7xl font-black bg-gradient-to-r from-cyan-200 via-violet-300 to-fuchsia-300 bg-clip-text text-transparent neon-score-cover" data-neuro-score>
        ${Number(a).toFixed(1)}
      </div>
    </div>
    ${r}
  </div>
  <p class="text-center text-[11px] text-slate-500 mt-6">${S(e.footer)}</p>
</section>`}function U({label:e,value:t,glow:a=!1}){const n=Math.max(0,Math.min(100,Number(t)||0)),r=Math.max(0,100-n),s=a?"pdf-bar-gradient pdf-bar-gradient--main":"pdf-bar-gradient pdf-bar-gradient--sub",i=ke(e);return[`<div class="mb-3.5" data-bar-value="${n}">`,'<div class="flex justify-between text-xs text-slate-400 mb-1">',`<span>${i}</span>`,`<span class="text-cyan-100 font-bold tracking-wide">${n.toFixed(1)}%</span>`,"</div>",'<div class="pdf-bar-track">',`<div class="${s}" style="clip-path: inset(0 ${r.toFixed(2)}% 0 0);"></div>`,"</div>","</div>"].join(`
  `)}function ke(e){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}function F(e){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}function Be(e,t,a){const n=e.regions[t]??t,r=he[t],s=Number(a.main??0),i=e.progressMain(`${s.toFixed(1)}`),o=[U({label:e.zoneLevel,value:s,glow:!0}),...(a.submetrics??[]).map(f=>U({label:f.label,value:f.value,glow:!1}))].join(`
`),d=(a.bullets??[]).map(f=>`<li>${F(f)}</li>`).join(`
        `);return`
<section class="bb-section bb-region" data-section="region" data-region="${t}" id="zone-${t}">
  <img src="${r}" alt="" class="brain-float-top mb-3" width="320" height="220" loading="lazy" decoding="async" />
  <h2 class="bb-region__title neon-zone-title px-2">${F(n)}</h2>
  <p class="bb-region__progress-label">${F(i)}</p>
  <div class="glass rounded-2xl p-4 max-w-xl mx-auto w-full">
    ${o}
  </div>
  <div class="glass rounded-2xl p-4 mt-4 max-w-xl mx-auto w-full">
    <p class="bb-rec-title">${F(e.recTitle)}</p>
    <ul class="bb-rec-list">
        ${d}
    </ul>
  </div>
</section>`}function Pe(e,t){const a=$(t.lang),n=t.userDisplayName||(t.lang==="en"?"Guest":"Гость"),r=[Ce(a,{displayName:n,neuroScore:t.neuroScore,connectivity:t.connectivity}),...B.map(s=>{var i,o;return Be(a,s,{main:t.scores[s],bullets:((i=t.regions[s])==null?void 0:i.bullets)??[],submetrics:((o=t.regions[s])==null?void 0:o.submetrics)??[]})})];e.innerHTML=r.join(`
`),qe(e),He(e),Ie(e)}function qe(e){const t=e.querySelectorAll(".bb-section"),a=new IntersectionObserver(n=>{for(const r of n)r.isIntersecting&&(r.target.classList.add("is-visible"),a.unobserve(r.target))},{root:null,rootMargin:"0px 0px -8% 0px",threshold:.08});t.forEach(n=>a.observe(n))}function He(e){const t=e.querySelector("[data-neuro-score]");if(!t)return;const a=parseFloat(t.textContent||"0"),n=1200,r=performance.now(),s=i=>{const o=Math.min(1,(i-r)/n),d=1-(1-o)**3;t.textContent=(a*d).toFixed(1),o<1&&requestAnimationFrame(s)};requestAnimationFrame(s)}function Ie(e){const t=e.querySelectorAll("[data-bar-value]"),a=new IntersectionObserver(n=>{for(const r of n){if(!r.isIntersecting)continue;const s=r.target,i=parseFloat(s.getAttribute("data-bar-value")||"0"),o=s.querySelector(".pdf-bar-gradient");o&&(o.style.clipPath="inset(0 100% 0 0)",requestAnimationFrame(()=>{o.style.clipPath=`inset(0 ${Math.max(0,100-i).toFixed(2)}% 0 0)`})),a.unobserve(s)}},{threshold:.2});t.forEach(n=>a.observe(n))}function D(e){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}function Fe(e,t){if(!e)return"—";try{return new Date(e).toLocaleString(t==="en"?"en-GB":"ru-RU",{day:"2-digit",month:"short",year:"numeric",hour:"2-digit",minute:"2-digit"})}catch{return e}}async function De(e,t,a){var d,f;const n=$(a.lang),r=document.createElement("section");r.className="bb-section is-visible bb-history",r.innerHTML=`
    <h2 class="bb-page-title bb-page-title--premium neon-zone-title">${D(n.historyTitle)}</h2>
    <p class="bb-page-sub text-slate-300/90 text-sm mb-4">${D(n.historySub)}</p>
  `;const s=document.createElement("div");s.className="space-y-3",s.textContent=n.loading,r.appendChild(s),e.replaceChildren(r);let i;try{i=await we(t)}catch{s.innerHTML=`<p class="bb-error">${D(n.errorLoad)}</p>`;return}const o=i.items??[];if(s.replaceChildren(),!o.length){const w=document.createElement("div");w.className="glass rounded-2xl p-5 text-center";const l=document.createElement("p");l.className="text-slate-200 mb-4",l.textContent=n.historyEmpty;const p=document.createElement("button");p.type="button",p.className="bb-btn-primary",p.textContent=n.startTest,p.addEventListener("click",()=>N("test")),w.append(l,p),s.appendChild(w);return}for(const[w,l]of o.entries()){const p=document.createElement("article");p.className=`glass rounded-2xl p-4 bb-history-card${w===0?" is-active":""}`;const v=document.createElement("div");v.className="flex justify-between items-start gap-2 mb-2";const u=document.createElement("div");if(u.innerHTML=`
      <p class="text-xs text-cyan-200/80 uppercase tracking-wide">${D(Fe(l.createdAt,a.lang))}</p>
      <p class="text-lg font-bold text-white mt-1 bb-type-display">NeuroScore <span class="text-cyan-200">${Number(l.neuroScore).toFixed(1)}</span></p>
    `,v.appendChild(u),w===0){const x=document.createElement("span");x.className="bb-badge",x.textContent=n.latest,v.appendChild(x)}p.appendChild(v);const g=document.createElement("div");g.className="bb-history-deltas";for(const x of B){const E=n.regions[x]??x,H=Number(((d=l.scores)==null?void 0:d[x])??0).toFixed(1),y=l.isFirst?"—":((f=l.deltas)==null?void 0:f[x])??"·",L=document.createElement("div");L.className="bb-history-row";const T=document.createElement("span");T.textContent=E;const M=document.createElement("span");M.textContent=`${H}%`;const A=document.createElement("span");A.textContent=y,typeof y=="string"&&y.includes("↑")&&(A.className="bb-delta-up"),typeof y=="string"&&y.includes("↓")&&(A.className="bb-delta-down"),L.append(T,M,A),g.appendChild(L)}p.appendChild(g);const h=document.createElement("button");h.type="button",h.className="bb-btn-ghost mt-3 w-full",h.textContent=n.openThisMap,h.addEventListener("click",()=>N("map")),p.appendChild(h),s.appendChild(p)}}function C(e){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}function Oe(e,t){var n;const a=$(t.lang);e.innerHTML=`
    <section class="bb-section is-visible bb-premium">
      <div class="mb-3 rounded-full px-5 py-1.5 border border-cyan-400/30 bg-cyan-500/10 text-xs font-bold uppercase tracking-[0.35em] text-cyan-100 text-center bb-type-display">
        ${C(a.premiumBadge)}
      </div>
      <h2 class="bb-page-title bb-page-title--premium neon-cta-title mb-4">
        ${C(a.premiumTitle)}
      </h2>
      <p class="text-slate-200 text-center text-sm leading-relaxed mb-6">${C(a.premiumSub)}</p>
      <ul class="bb-premium-list glass rounded-2xl p-5 mb-6 space-y-3 text-sm text-slate-200">
        ${a.premiumBullets.map(r=>`<li>${C(r)}</li>`).join("")}
      </ul>
      <button type="button" class="bb-btn-premium-buy w-full" id="bb-premium-buy">${C(a.premiumCta)}</button>
    </section>
  `,(n=e.querySelector("#bb-premium-buy"))==null||n.addEventListener("click",()=>{P(),t.tributeUrl&&Me(t.tributeUrl)})}function _(e){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}async function je(e,t,a,{onProfile:n}={}){const r=$(a.lang),s={variant:a.testVariant||"development",questions:[],answers:{},step:0},i=document.createElement("section");i.className="bb-section is-visible bb-test",e.replaceChildren(i);async function o(){i.innerHTML=`<p class="text-cyan-200/80 text-sm">${_(r.loading)}</p>`;try{const l=await $e(t,s.variant);s.questions=l.questions??[],s.step=0,s.answers={},f()}catch{i.innerHTML=`<p class="bb-error">${_(r.errorLoad)}</p>`}}function d(){i.innerHTML=`
      <div class="bb-test-pick">
        <div class="bb-test-pick__glow" aria-hidden="true"></div>
        <h2 class="bb-page-title bb-page-title--premium neon-zone-title">${_(r.testTitle)}</h2>
        <p class="bb-page-sub text-slate-300/90 text-sm mb-1 leading-relaxed">${_(r.testPickVariant)}</p>
        <div class="bb-test-variant-grid">
          <button type="button" class="bb-btn-hero" data-variant="sexual">
            <span class="bb-btn-hero__badge">${_(r.variantSexBadge)}</span>
            <span class="bb-btn-hero__label">${_(r.variantSex)}</span>
            <span class="bb-btn-hero__hint">${_(r.variantSexHint)}</span>
          </button>
          <button type="button" class="bb-btn-alt" data-variant="development">
            <span class="bb-btn-alt__label">${_(r.variantDev)}</span>
            <span class="bb-btn-alt__hint">${_(r.variantDevHint)}</span>
          </button>
        </div>
      </div>
    `,i.querySelectorAll("[data-variant]").forEach(l=>{l.addEventListener("click",()=>{P(),s.variant=l.getAttribute("data-variant")||"development",o()})})}function f(){const l=s.questions[s.step];if(!l){d();return}const p=s.questions.length,v=(s.step+1)/p*100;i.innerHTML=`
      <div class="bb-test-progress mb-4">
        <div class="flex justify-between text-xs text-cyan-200/80 mb-1">
          <span>${_(r.questionProgress(s.step+1,p))}</span>
          <span>${Math.round(v)}%</span>
        </div>
        <div class="pdf-bar-track"><div class="pdf-bar-gradient pdf-bar-gradient--main" style="clip-path: inset(0 ${(100-v).toFixed(1)}% 0 0)"></div></div>
      </div>
      <h2 class="bb-test-q-title">${_(l.topic)}</h2>
      <p class="text-slate-200 mb-4 leading-relaxed">${_(l.text)}</p>
      <div class="grid gap-2 bb-test-options" id="bb-test-options"></div>
    `;const u=i.querySelector("#bb-test-options");for(const g of l.options??[]){const h=document.createElement("button");h.type="button",h.className="bb-test-option",h.innerHTML=`<span class="bb-test-option-key">${_(g.key)}</span><span>${_(g.label)}</span>`,h.addEventListener("click",()=>w(g.key)),u.appendChild(h)}}async function w(l){P();const p=s.questions[s.step];if(s.answers[p.id]=l,s.step+1<s.questions.length){s.step+=1,f();return}i.innerHTML=`
      <div class="bb-loading">
        <div class="bb-loading__pulse"></div>
        <p class="text-sm text-cyan-200/80">${_(r.computing)}</p>
      </div>`;try{const v={};for(const[g,h]of Object.entries(s.answers))v[String(g)]=h;const u=await Le(t,{variant:s.variant,answers:v});n&&n(u),N("map")}catch{i.innerHTML=`<p class="bb-error">${_(r.errorLoad)}</p>`}}d()}let m=null,b=null;function Re(e){const t=document.getElementById("bb-nav");t&&t.querySelectorAll(".bb-nav__btn").forEach(a=>{a.classList.toggle("is-active",a.dataset.route===e)})}function Ue(e){if(!m)return;const t=e==="en"?"en":"ru";if(m.lang===t)return;m.lang=t,document.documentElement.lang=t;const a=$(t),n=document.getElementById("bb-header-wordmark");n&&(n.textContent=a.appBrandName),te(t)}function k(e){e!=null&&e.lang&&Ue(e.lang)}function Ge(e){var n;if((n=document.querySelector(".bb-premium-fab"))==null||n.remove(),e.paid||!e.tributeUrl)return;const t=$((m==null?void 0:m.lang)||e.lang),a=document.createElement("button");a.type="button",a.className="bb-premium-fab",a.textContent=t.premiumCta,a.addEventListener("click",()=>{P(),N("premium")}),document.body.appendChild(a)}function te(e){const t=document.getElementById("bb-nav");if(!t)return;const a=$(e);t.hidden=!1,t.innerHTML=`
    <button type="button" class="bb-nav__btn" data-route="map">${a.navMap}</button>
    <button type="button" class="bb-nav__btn" data-route="history">${a.navHistory}</button>
    <button type="button" class="bb-nav__btn" data-route="test">${a.navTest}</button>
    <button type="button" class="bb-nav__btn" data-route="premium">${a.navPremium}</button>
  `,t.querySelectorAll(".bb-nav__btn").forEach(n=>{n.addEventListener("click",()=>{P(),N(n.dataset.route||"map")})})}async function G(e){var a;const t=document.getElementById("bb-root");if(!(!t||!m)){if(Re(e.name),e.name==="premium"){b||(b=await I(m),k(b)),Oe(t,b);return}if(e.name==="test"){b||(b=await I(m),k(b)),await je(t,m,b,{onProfile:n=>{b=n,k(n)}});return}if(e.name==="history"){b||(b=await I(m),k(b)),await De(t,m,b);return}if(!b){const n=$(m.lang);t.innerHTML=`
      <div class="bb-loading">
        <div class="bb-loading__pulse"></div>
        <p class="text-sm text-cyan-200/80">${n.loading}</p>
      </div>`;try{b=await I(m),k(b),(a=m.user)!=null&&a.first_name&&!b.userDisplayName&&(b.userDisplayName=[m.user.first_name,m.user.last_name].filter(Boolean).join(" "))}catch(r){const s=(r==null?void 0:r.status)===403?n.notRegistered:(r==null?void 0:r.status)===401?n.authError:n.errorLoad;t.innerHTML=`<p class="bb-error">${s}</p>`;return}}if(!b.hasMap&&e.name==="map"){N("test");return}Pe(t,b),Ge(b)}}async function ze(e){m={...e,lang:"ru"},b=null,document.body.classList.add("bb-app--telegram");const t=document.getElementById("bb-root");if(!t)return;t.classList.add("bb-root--spa");const a=$(m.lang),n=document.getElementById("bb-header"),r=document.getElementById("bb-header-wordmark");r&&(r.textContent=a.appBrandName),n&&(n.hidden=!1,n.classList.add("is-visible")),te(m.lang),Se(i=>{G(i).catch(()=>{})}),Ne();const s=Z();window.location.hash?await G(s):N("map")}const z="/assets/full-glowing-brain-Cl127Rfm.png",Ve=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 48" fill="none">
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
`,V=.088,W=15,Y=2,X=.4;function O(e,t,a){return Math.max(t,Math.min(a,e))}function We(){var e,t;return((t=(e=window.matchMedia)==null?void 0:e.call(window,"(prefers-reduced-motion: reduce)"))==null?void 0:t.matches)??!1}function Ye(e,t,a){const n=e.getBoundingClientRect(),r=80,s=Math.max(n.width+r*2,1),i=Math.max(n.height+r*2,1),o=n.left+n.width/2,d=n.top+n.height/2;return{nx:O((t-o)/(s*.5),-1,1),ny:O((a-d)/(i*.5),-1,1)}}function Xe(e){var E,H;if(We())return()=>{};const t=e.querySelector("[data-parallax-brain]"),a=e.querySelector("[data-parallax-glow]");if(!t)return()=>{};let n={nx:0,ny:0},r=!1,s={nx:0,ny:0},i=!1,o=0,d=0,f=0;const w=((H=(E=window.matchMedia)==null?void 0:E.call(window,"(pointer: coarse)"))==null?void 0:H.matches)??!1,l=()=>r?{tx:n.nx,ty:n.ny}:i?{tx:s.nx*.62,ty:s.ny*.62}:{tx:0,ty:0},p=()=>{f=0;const{tx:y,ty:L}=l();o+=(y-o)*V,d+=(L-d)*V;const T=o*W,M=d*W,A=d*-Y,ae=o*Y;if(t.style.transform=`translate3d(${T}px, ${M}px, 0) rotateX(${A}deg) rotateY(${ae}deg)`,a){const le=-T*X,ce=-M*X;a.style.transform=`translate3d(calc(-50% + ${le}px), calc(-50% + ${ce}px), 0) scale(1.06)`}const{tx:re,ty:se}=l(),ie=Math.abs(o-re)>.003||Math.abs(d-se)>.003,oe=Math.abs(o)>.004||Math.abs(d)>.004;(ie||oe||i)&&(f=requestAnimationFrame(p))},v=()=>{f||(f=requestAnimationFrame(p))},u=y=>{if(!y.isTrusted)return;const{nx:L,ny:T}=Ye(e,y.clientX,y.clientY);n={nx:L,ny:T},r=!0,v()},g=()=>{r=!0},h=()=>{r=!1,v()};e.addEventListener("pointermove",u,{passive:!0}),e.addEventListener("pointerenter",g),e.addEventListener("pointerleave",h),e.addEventListener("pointerdown",()=>{w&&typeof(DeviceOrientationEvent==null?void 0:DeviceOrientationEvent.requestPermission)=="function"&&DeviceOrientationEvent.requestPermission().then(y=>{y==="granted"&&(i=!0)}).catch(()=>{})},{passive:!0});let x=null;return window.DeviceOrientationEvent&&(x=y=>{if(y.gamma==null||y.beta==null)return;const L=O(y.gamma/32,-1,1),T=O((y.beta-44)/36,-1,1);s={nx:L,ny:T},i=!0,v()},window.addEventListener("deviceorientation",x,!0)),t.style.willChange="transform",a&&(a.style.willChange="transform"),v(),()=>{e.removeEventListener("pointermove",u),e.removeEventListener("pointerenter",g),e.removeEventListener("pointerleave",h),x&&window.removeEventListener("deviceorientation",x,!0),f&&cancelAnimationFrame(f),t.style.willChange="",t.style.transform="",a&&(a.style.willChange="",a.style.transform="")}}const Je={root:null,rootMargin:"0px 0px -10% 0px",threshold:.08};function Qe(e,{reducedMotion:t}){if(t)return e.querySelectorAll(".bb-landing-reveal").forEach(r=>r.classList.add("is-in-view")),()=>{};const a=e.querySelectorAll(".bb-landing-reveal");if(!a.length)return()=>{};const n=new IntersectionObserver(r=>{for(const s of r)s.isIntersecting&&(s.target.classList.add("is-in-view"),n.unobserve(s.target))},Je);return a.forEach(r=>n.observe(r)),()=>{n.disconnect()}}function c(e){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}const ne="bb-landing-lang";function Ke(){try{const e=localStorage.getItem(ne);if(e==="en"||e==="ru")return e}catch{}return null}function Ze(e){document.body.classList.add("bb-lang-gate-open");const t=document.createElement("div");t.className="bb-lang-gate",t.setAttribute("role","dialog"),t.setAttribute("aria-modal","true"),t.setAttribute("aria-labelledby","bb-lang-gate-title"),t.innerHTML=`
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
  `,document.body.appendChild(t);const a=n=>{try{localStorage.setItem(ne,n)}catch{}document.body.classList.remove("bb-lang-gate-open"),t.remove(),e(n)};t.querySelectorAll("[data-lang]").forEach(n=>{n.addEventListener("click",()=>a(n.getAttribute("data-lang")||"ru"))}),requestAnimationFrame(()=>{var n;(n=t.querySelector(".bb-lang-gate__btn"))==null||n.focus()})}async function et(){const e=document.getElementById("bb-header"),t=document.getElementById("bb-nav");e&&(e.hidden=!0),t&&(t.hidden=!0);const a=document.getElementById("bb-root");if(!a)return;const n=Ke();if(!n){a.className="bb-root",a.innerHTML="",Ze(r=>{J(r).catch(()=>{})});return}await J(n)}async function J(e){const t=$(e);document.documentElement.lang=e;const a=document.getElementById("bb-root");if(!a)return;a.className="bb-root bb-root--landing",a.innerHTML=`
    <div class="bb-loading">
      <div class="bb-loading__pulse"></div>
    </div>`;let n={botUrl:"https://t.me/BRAINBOOSTY?start=site",webappEntryUrl:"https://t.me/BRAINBOOSTY?start=webapp",channelUrl:"https://t.me/androgenautist",hasAuthorPhoto:!1,hasChannelAvatar:!1};try{n={...n,...await _e()}}catch{}const r="/api/webapp/landing/photo",i=n.hasChannelAvatar?'<img class="bb-landing-nav__channel-img" src="/api/webapp/landing/channel-avatar" alt="" width="38" height="38" loading="lazy" />':'<span class="bb-landing-nav__channel-fallback" aria-hidden="true">TG</span>',o=t.landingFeatures.map(u=>`<li>${c(u)}</li>`).join(""),d=window.matchMedia("(prefers-reduced-motion: reduce)").matches;a.innerHTML=`
    <div class="bb-landing">
      <nav class="bb-landing-nav glass bb-landing-reveal bb-landing-reveal--fade-only" aria-label="Menu">
        <a href="#top" class="bb-landing-nav__logo">${Ve}</a>
        <div class="bb-landing-nav__tail">
          <div class="bb-landing-nav__links">
            <a href="#about">${c(t.landingNavAbout)}</a>
            <a href="#project">${c(t.landingNavProject)}</a>
            <a href="#start" class="bb-landing-nav__cta">${c(t.landingNavCta)}</a>
          </div>
          <div class="bb-landing-nav__extras">
            <a class="bb-landing-nav__channel" href="${c(n.channelUrl)}" target="_blank" rel="noopener noreferrer" aria-label="${c(t.landingChannelAria)}">
              ${i}
            </a>
            <a class="bb-landing-nav__login" href="${c(n.webappEntryUrl)}" rel="noopener noreferrer">${c(t.landingLoginTelegram)}</a>
          </div>
        </div>
      </nav>

      <header id="top" class="bb-landing-hero">
        <div class="bb-landing-hero__visual-anchor">
          <div class="bb-landing-hero__glow" aria-hidden="true" data-parallax-glow></div>
          <div class="bb-landing-hero__brain-layer" data-parallax-brain>
            <img class="bb-landing-hero__brain" src="${z}" alt="" width="280" height="280" decoding="async" />
          </div>
        </div>
        <div class="bb-landing-hero__copy bb-landing-reveal">
        <p class="bb-landing-kicker">${c(t.landingKicker)}</p>
        <h1 class="bb-landing-title neon-zone-title">${c(t.landingTitle)}</h1>
        <p class="bb-landing-tagline">${c(t.landingTagline)}</p>
        <div class="bb-landing-hero__ctas">
          <a class="bb-landing-cta-primary" href="${c(n.botUrl)}" rel="noopener noreferrer">
            ${c(t.landingCta)}
          </a>
          <a class="bb-landing-cta-secondary" href="${c(n.webappEntryUrl)}" rel="noopener noreferrer">
            ${c(t.landingLoginTelegram)}
          </a>
        </div>
        <p class="bb-landing-cta-sub">${c(t.landingCtaSub)}</p>
        </div>
      </header>

      <section id="about" class="bb-landing-section bb-landing-reveal">
        <h2 class="bb-landing-section__title">${c(t.landingAboutTitle)}</h2>
        <article class="bb-landing-about glass bb-landing-hover-rise">
          <div class="bb-landing-about__photo-wrap">
            <img class="bb-landing-about__photo" src="${r}" alt="" width="320" height="320" loading="lazy" data-fallback-src="${z}" />
            <div class="bb-landing-about__ring" aria-hidden="true"></div>
          </div>
          <div class="bb-landing-about__text">
            ${t.landingAboutParagraphs.map(u=>`<p>${c(u)}</p>`).join("")}
            <a class="bb-landing-link" href="${c(n.channelUrl)}" target="_blank" rel="noopener noreferrer">
              ${c(t.landingChannelLink)}
            </a>
          </div>
        </article>
      </section>

      <section id="project" class="bb-landing-section bb-landing-reveal">
        <h2 class="bb-landing-section__title">${c(t.landingProjectTitle)}</h2>
        <ul class="bb-landing-features">${o}</ul>
        <p class="bb-landing-disclaimer">${c(t.footer)}</p>
      </section>

      <section id="start" class="bb-landing-section bb-landing-final bb-landing-reveal">
        <div class="glass bb-landing-final__card bb-landing-hover-rise">
          <h2 class="bb-landing-final__title">${c(t.landingFinalTitle)}</h2>
          <p class="bb-landing-final__sub">${c(t.landingFinalSub)}</p>
          <a class="bb-landing-cta-primary bb-landing-cta-primary--lg" href="${c(n.botUrl)}" rel="noopener noreferrer">
            ${c(t.landingCta)}
          </a>
        </div>
      </section>

      <footer class="bb-landing-footer">
        <span>BrainBoosty · Neural Map</span>
      </footer>
    </div>
  `,a.querySelectorAll(".bb-landing-about__photo").forEach(u=>{const g=u.getAttribute("data-fallback-src");g&&u.addEventListener("error",()=>{u.removeAttribute("data-fallback-src"),u.src=g})}),a.querySelectorAll(".bb-landing-nav__channel-img").forEach(u=>{u.addEventListener("error",()=>{const g=u.closest(".bb-landing-nav__channel");g&&(g.innerHTML='<span class="bb-landing-nav__channel-fallback" aria-hidden="true">TG</span>')})}),a.querySelectorAll('a[href^="#"]').forEach(u=>{u.addEventListener("click",g=>{var E;const h=(E=u.getAttribute("href"))==null?void 0:E.slice(1);if(!h)return;const x=document.getElementById(h);x&&(g.preventDefault(),x.scrollIntoView({behavior:"smooth",block:"start"}))})});const f=a.querySelector(".bb-landing"),w=Qe(f||a,{reducedMotion:d}),l=a.querySelector(".bb-landing-hero"),p=l?Xe(l):()=>{},v=()=>{w(),p(),window.removeEventListener("pagehide",v)};window.addEventListener("pagehide",v)}function tt(){var a;const e=(a=window.Telegram)==null?void 0:a.WebApp;return e?(e.initData||"").trim().length>0:!1}const{initData:nt,user:at,lang:rt}=Ae();tt()?ze({initData:nt,user:at,lang:rt}):et();
