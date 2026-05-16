(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))n(r);new MutationObserver(r=>{for(const s of r)if(s.type==="childList")for(const i of s.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&n(i)}).observe(document,{childList:!0,subtree:!0});function a(r){const s={};return r.integrity&&(s.integrity=r.integrity),r.referrerPolicy&&(s.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?s.credentials="include":r.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function n(r){if(r.ep)return;r.ep=!0;const s=a(r);fetch(r.href,s)}})();const fe="/assets/full-glowing-brain-Cl127Rfm.png",_e="/assets/amygdala-DP7dGDc4.png",xe="/assets/lobes-uZqghd8w.png",ve="/assets/frontal-gyrus-DPq4mhR0.png",ye="/assets/insula-CAJDukm_.png",we="/assets/pfc-BE-jJY5g.png",Ee="/assets/tpj-Cgg8S5Iu.png",B=["prefrontal_cortex","brain_lobes","insular_cortex","temporoparietal_junction","amygdala","frontal_gyrus"],$e={prefrontal_cortex:we,brain_lobes:xe,insular_cortex:ye,temporoparietal_junction:Ee,amygdala:_e,frontal_gyrus:ve},Le=fe;function Te(e){const t=B.map(n=>Number(e[n]??0)),a=t.reduce((n,r)=>n+r,0);return Math.round(a/Math.max(t.length,1)*10)/10}const R="bb-site-session",D="bb-site-user";function ke(e,t,{jsonBody:a=!1}={}){const n={};a&&(n["Content-Type"]="application/json"),e&&(n["X-Telegram-Init-Data"]=e);const r=(t||"").trim();return r&&(n.Authorization=`Bearer ${r}`),n}async function P(e,{initData:t="",siteToken:a="",method:n="GET",body:r}={}){const s=await fetch(`/api/webapp${e}`,{method:n,headers:ke(t,a,{jsonBody:!!r}),body:r?JSON.stringify(r):void 0,cache:"no-store"});if(!s.ok){const i=new Error(`HTTP ${s.status}`);i.status=s.status;try{i.detail=(await s.json()).detail}catch{}throw i}return s.json()}function se(e){var r,s;const t=e.lang==="en"?"en":"ru",a={};for(const i of B)a[i]=Number(((r=e.scores)==null?void 0:r[i])??0);const n={};for(const i of B){const o=((s=e.regions)==null?void 0:s[i])??{};n[i]={main:Number(o.main??a[i]),bullets:o.bullets??[],submetrics:(o.submetrics??[]).map(d=>({label:d.label??d.label_ru??"",value:Number(d.value??a[i])}))}}return{lang:t,userDisplayName:e.userDisplayName??e.user_display_name??"Guest",paid:!!e.paid,hasMap:!!(e.hasMap??e.has_map??Object.keys(e.scores||{}).length),testVariant:e.testVariant??e.test_variant??"development",tributeUrl:e.tributeUrl??e.tribute_url??"",neuroScore:e.neuroScore!=null?Number(e.neuroScore):Te(a),scores:a,connectivity:e.connectivity??[],regions:n,snapshotId:e.snapshotId??e.snapshot_id??null,createdAt:e.createdAt??e.created_at??null}}async function Se(){return P("/landing",{initData:"",siteToken:""})}async function Ae(e){const t=await P("/profile",{initData:e.initData??"",siteToken:e.siteToken??""});return se(t)}async function ze(e){return P("/history",{initData:e.initData??"",siteToken:e.siteToken??""})}async function Ce(e,t="development"){return P(`/test/questions?variant=${encodeURIComponent(t)}`,{initData:e.initData??"",siteToken:e.siteToken??""})}async function Ne(e,{variant:t,answers:a}){const n={variant:t,answers:a},r=await P("/test/submit",{initData:e.initData??"",siteToken:e.siteToken??"",method:"POST",body:n});return se(r.profile)}async function Me(e,t){return P(`/exercises/${encodeURIComponent(String(t))}`,{initData:e.initData??"",siteToken:e.siteToken??""})}const He={landingKicker:"BrainBoosty · neuroscience, no fluff",landingTitle:"Upgrade your brain — see your Neural Map",landingTagline:"7 questions → a personal 6-zone brain map, NeuroScore, and clear next steps. All in Telegram.",landingCta:"Boost my brain",landingCtaSub:"Free start in the bot · 2 minutes",landingNavAbout:"About me",landingNavProject:"The project",landingNavHub:"Neural Map Hub",landingNavCta:"Open bot",landingHubTitle:"Neural Map Hub",landingHubLead:"Your brain map, test, history, and exercises—in the browser, same account as the bot and Mini App.",landingHubHint:"You need a profile after bot onboarding. Tap the button — official Telegram login opens; after you approve, you'll return here automatically.",landingHubStartLogin:"Log in with Telegram",landingHubErrorNotRegistered:"Finish onboarding in the bot (/start) first, then try «Log in with Telegram» again.",landingHubErrorNotConfigured:"Telegram login isn't configured on the server (TELEGRAM_OIDC_CLIENT_ID / SECRET in .env and Allowed URLs in BotFather).",landingHubErrorOidc:"Telegram sign-in failed. Please try again.",landingLoginTelegram:"Log in with Telegram",landingChannelAria:"Telegram channel",landingAboutTitle:"About me",landingAboutParagraphs:["Hi, I'm Damian — creator of BrainBoosty.","I went from anxiety, brain fog, and tension to clarity, inner strength, and confidence. Now I help others with neurobiology, hormones, and cognitive habits.","On my channel I share actionable insights—no marketing noise, only what actually shifts your state."],landingChannelLink:"→ Channel @androgenautist",landingProjectTitle:"What's inside",landingFeatures:["7-question cognitive test — development or sexual profile","Neural Map: 6 brain zones with NeuroScore and recommendations","Progress history and test-to-test comparison","Daily hooks and a private exercise channel"],landingFinalTitle:"Ready to see your map?",landingFinalSub:"Open the bot — onboarding takes a few minutes; your first map is free.",heroBrain:"NEURAL MAP",scoreLabel:"NeuroScore",coverLine:"Six zones · one profile. Numbers, focus, and a clear read—no clutter.",connectivityTitle:"Inter-region links (educational model)",zoneLevel:"Integrated zone level",progressMain:e=>`Your progress ${e}%`,recTitle:"Why this zone is your biggest pleasure lever",footer:"BrainBoosty · educational model · not a medical diagnosis",premiumCta:"Get full access",premiumBadge:"Full access",premiumTitle:"Get full access — today",premiumSub:"A 30-day personal plan, progress tracker, exercises for your profile, and the private channel.",premiumBullets:["Full brain map and all zone recommendations","Progress history with test comparisons","Retests and trend tracking","Private channel and daily hooks"],navMap:"Map",navHistory:"History",navTest:"Test",navPremium:"Access",navLogout:"Log out",appBrandName:"BrainBoosty",appHeaderTitle:"Neural Map",loading:"Loading your neuro profile…",computing:"Computing your brain map…",errorLoad:"Could not load data. Please try again later.",authError:"Open the app from the Telegram bot.",notRegistered:"Take the test in the bot first!",historyTitle:"Progress history",historySub:"Zone comparison across tests. Arrows show percentage-point change.",historyEmpty:"No saved tests yet. Take your first test to see history here.",startTest:"Take the test",latest:"Latest",openThisMap:"Open map",testTitle:"Cognitive test",testPickVariant:"Choose question style (7 steps):",variantDev:"Development & cognition",variantSex:"Sexual profile",variantSexBadge:"Maximum insight",variantSexHint:"Pleasure, drive, and your neural edge",variantDevHint:"Focus, habits, and cognitive style",questionProgress:(e,t)=>`Question ${e} of ${t}`,regions:{prefrontal_cortex:"Prefrontal cortex",brain_lobes:"Brain lobes · imagery",insular_cortex:"Insular cortex",temporoparietal_junction:"Temporoparietal junction",amygdala:"Amygdala",frontal_gyrus:"Frontal gyrus"},interactiveBrainKicker:"Zone",zoneIllustrationOpenAria:"open zone card",zoneDrawerCloseAria:"Close",zoneCurrentLevel:"Current level",zoneWhyTitle:"Why it matters",zoneBoostCta:"Boost this zone",zoneUnlockNote:"Full access unlocks personal drills per zone, progress tracking, and training history.",zoneOpenHistory:"History for this zone",zoneExercisesHeading:"Zone exercises",zoneExerciseListCap:"In your program for this zone:",zoneExercisePlaceholder:"More protocols are on the way — your full access already includes the base track.",zonePaidHint:"More protocols and metrics tailored to your profile are coming next.",zoneReadMoreDetail:"Full zone breakdown below in the feed",zoneWhy:{prefrontal_cortex:"Planning, impulse control, and focus. A stronger PFC means clearer decisions and fewer spirals.",brain_lobes:"Integrates imagery, language, and space. Balance here improves how you read reality and old patterns.",insular_cortex:"Interoception and emotional regulation — the bridge between body state and action.",temporoparietal_junction:"Perspective, attention, and social context — helps you update stories instead of locking in one view.",amygdala:"Threat and reward signaling. Tuning it reduces false alarms while keeping healthy drive.",frontal_gyrus:"Links effort, intention, and follow-through — trained with sequenced action and repetition."},zoneExercises:{prefrontal_cortex:[{title:"90-second stop frame",body:"Before an impulsive reply, state one value and one tiny next step out loud."}],brain_lobes:[{title:"Sensory anchor",body:"For 30s describe one object: color, texture, sound — no judgments."}],insular_cortex:[{title:"Rib-cage breath",body:"4 cycles: inhale 4 counts, soft pause, exhale 6 — attention on rib expansion.",exerciseId:1}],temporoparietal_junction:[{title:"Perspective swap",body:"Phrase the same situation two neutral ways — without «I'm right» framing."}],amygdala:[{title:"Tolerance window",body:"2 min: note 3 neutral facts around a trigger, then one action 2% softer."}],frontal_gyrus:[{title:"Three-step chain",body:"Write three micro-steps for one goal today; track completion only."}]},exerciseLoading:"Loading protocol…",exerciseNotFound:"Exercise not found.",exerciseBackAria:"Back",exerciseTagForWho:"For who",exerciseTagEfficiency:"Effectiveness",exerciseTagFirstResult:"First results",exerciseDifficulty:"Difficulty",exerciseFirstResultDays:e=>`~${e} days`,exerciseEfficiencyLabels:["Low","Moderate","High","Exceptional","Best for this region"],exerciseAccInstruction:"Instruction",exerciseAccResearch:"Research",exerciseAccAmplify:"How to amplify",exerciseAccResults:"Expected outcomes",exerciseNoResearch:"Links will appear here soon.",exerciseCtaPrimary:"Add to my training plan",exerciseCtaMessage:"Sync with your bot plan is coming soon. For now, block time on your calendar and log completion.",exercisePremiumTitle:"Full access",exercisePremiumText:"Channel exercises are available with BrainBoosty full access.",zoneOpenFullExercise:"Open full exercise"},ie={landingKicker:"BrainBoosty · нейробиология без воды",landingTitle:"Прокачай мозг — увидь свою Neural Map",landingTagline:"7 вопросов → персональная карта из 6 зон мозга, NeuroScore и понятные шаги. Всё в Telegram.",landingCta:"Прокачать мозг",landingCtaSub:"Бесплатный старт в боте · 2 минуты",landingNavAbout:"Обо мне",landingNavProject:"Проект",landingNavHub:"Neural Map Hub",landingNavCta:"В бота",landingHubTitle:"Neural Map Hub",landingHubLead:"Карта мозга, тест, история и упражнения — в браузере, тот же аккаунт, что в боте и мини-приложении.",landingHubHint:"Нужен аккаунт после анкеты в боте. Нажми кнопку — откроется официальный вход Telegram (Log in with Telegram), после подтверждения вернёшься сюда автоматически.",landingHubStartLogin:"Войти через Telegram",landingHubErrorNotRegistered:"Сначала пройди анкету в боте (/start), затем снова нажми «Войти через Telegram».",landingHubErrorNotConfigured:"Вход через Telegram не настроен на сервере (TELEGRAM_OIDC_CLIENT_ID / SECRET в .env и Allowed URLs в BotFather).",landingHubErrorOidc:"Не удалось войти через Telegram. Попробуй ещё раз.",landingLoginTelegram:"Войти через Telegram",landingChannelAria:"Канал в Telegram",landingAboutTitle:"Обо мне",landingAboutParagraphs:["Привет, я Дамиан — автор BrainBoosty.","Сам прошёл путь от тревожности, тумана в голове и зажатости — к ясности, внутренней силе и уверенности. Сейчас помогаю другим по нейробиологии, гормонам и когнитивным привычкам.","В канале делюсь рабочими инсайтами без маркетинговой шелухи — только то, что реально меняет состояние."],landingChannelLink:"→ Канал @androgenautist",landingProjectTitle:"Что внутри",landingFeatures:["Когнитивный тест из 7 вопросов — два стиля (развитие / сексуальный профиль)","Neural Map: 6 зон мозга с NeuroScore и рекомендациями","История прогресса и сравнение между тестами","Ежедневные хуки и закрытый канал с упражнениями"],landingFinalTitle:"Готов увидеть свою карту?",landingFinalSub:"Открой бота — анкета займёт пару минут, первая карта бесплатно.",heroBrain:"NEURAL MAP",scoreLabel:"NeuroScore",coverLine:"Шесть зон · один профиль. Цифры, акценты и ясная картина без лишнего шума.",connectivityTitle:"Связность зон (образовательная модель)",zoneLevel:"Интегральный уровень зоны",progressMain:e=>`Твой прогресс ${e}%`,recTitle:"Почему эта зона — твой главный рычаг удовольствия",footer:"BrainBoosty · образовательная модель · не медицинский диагноз",premiumCta:"Забрать полный доступ",premiumBadge:"Полный доступ",premiumTitle:"Забери полный доступ — сегодня",premiumSub:"Персональный план на 30 дней, трекер прогресса, упражнения под твой профиль и закрытый канал.",premiumBullets:["Полная карта мозга и все рекомендации по зонам","История прогресса с сравнением тестов","Повторные тесты и отслеживание динамики","Закрытый канал и ежедневные хуки"],navMap:"Карта",navHistory:"История",navTest:"Тест",navPremium:"Доступ",navLogout:"Выйти",appBrandName:"BrainBoosty",appHeaderTitle:"Neural Map",loading:"Загружаем нейропрофиль…",computing:"Считаем твою карту мозга…",errorLoad:"Не удалось загрузить данные. Попробуйте позже.",authError:"Откройте приложение из Telegram-бота.",notRegistered:"Пройди тест в боте!",historyTitle:"История прогресса",historySub:"Сравнение зон между прохождениями. Стрелки — изменение в процентных пунктах.",historyEmpty:"Пока нет сохранённых тестов. Пройдите первый тест — и здесь появится история.",startTest:"Пройти тест",latest:"Актуально",openThisMap:"Открыть карту",testTitle:"Когнитивный тест",testPickVariant:"Выберите стиль вопросов (7 шагов):",variantDev:"Развитие и когниция",variantSex:"Сексуальный профиль",variantSexBadge:"Максимум инсайта",variantSexHint:"Удовольствие, драйв и нейронный рельеф",variantDevHint:"Фокус, привычки и когнитивный стиль",questionProgress:(e,t)=>`Вопрос ${e} из ${t}`,regions:{prefrontal_cortex:"Префронтальная кора",brain_lobes:"Доли мозга · образы",insular_cortex:"Островковая кора",temporoparietal_junction:"Височно-теменной узел",amygdala:"Амигдала",frontal_gyrus:"Лобная извилина"},interactiveBrainKicker:"Зона",zoneIllustrationOpenAria:"открыть карточку зоны",zoneDrawerCloseAria:"Закрыть",zoneCurrentLevel:"Текущий уровень",zoneWhyTitle:"Почему это важно",zoneBoostCta:"Прокачать эту зону",zoneUnlockNote:"Полный доступ открывает персональные упражнения под каждую зону, трекер и историю прокачки.",zoneOpenHistory:"История этой зоны",zoneExercisesHeading:"Упражнения для зоны",zoneExerciseListCap:"Сейчас в программе для этой зоны:",zoneExercisePlaceholder:"Скоро добавим ещё шаги — уже доступен базовый протокол в полном доступе.",zonePaidHint:"Дальше — больше протоколов и метрик именно под твой профиль.",zoneReadMoreDetail:"Подробный разбор зоны в ленте ниже",zoneWhy:{prefrontal_cortex:"Планирование, торможение импульсов и фокус. Сильная ПФК — ясные решения, меньше хаоса и откатов.",brain_lobes:"Интеграция образов, языка и пространства. Баланс здесь — лучшее восприятие реальности и выученные паттерны.",insular_cortex:"Телесная осознанность и эмоциональная регуляция. Островок связывает «что чувствую» с «что делаю».",temporoparietal_junction:"Перспектива, внимание и социальный контекст. TPJ помогает не застревать в одной интерпретации событий.",amygdala:"Детектор угроз и сигналов награды. Настрой амигдалы — меньше ложной тревоги, больше спокойного драйва.",frontal_gyrus:"Связь моторики, намерения и усилия. Тренируется через последовательные действия и повторение цели."},zoneExercises:{prefrontal_cortex:[{title:"90 секунд «стоп-рамка»",body:"Перед импульсивным ответом назови вслух одну ценность и одно следующее маленькое действие."}],brain_lobes:[{title:"Сенсорный якорь",body:"30 секунд описывай предмет из комнаты: цвет, фактура, звук — без оценок."}],insular_cortex:[{title:"Дыхание в ребро",body:"4 цикла: вдох 4 счёта, мягкая пауза, выдох 6 — внимание на расширении рёбер.",exerciseId:1}],temporoparietal_junction:[{title:"Смена ракурса",body:"Сформулируй ту же ситуацию двумя нейтральными формулировками, без «я прав»."}],amygdala:[{title:"Окно толерантности",body:"2 минуты: найди 3 нейтральных факта вокруг триггера, затем одно действие на 2% мягче."}],frontal_gyrus:[{title:"Цепочка на 3 шага",body:"Запиши три микрошага к одной цели на сегодня; отмечай только факт выполнения."}]},exerciseLoading:"Загружаем протокол…",exerciseNotFound:"Упражнение не найдено.",exerciseBackAria:"Назад",exerciseTagForWho:"Для кого",exerciseTagEfficiency:"Эффективность",exerciseTagFirstResult:"Первый результат",exerciseDifficulty:"Сложность",exerciseFirstResultDays:e=>`ориентир ≈ ${e} дн.`,exerciseEfficiencyLabels:["Низкая","Средняя","Высокая","Чрезвычайная","Оптимально для отдела"],exerciseAccInstruction:"Инструкция",exerciseAccResearch:"Исследования",exerciseAccAmplify:"Как усилить эффект",exerciseAccResults:"Ожидаемые результаты",exerciseNoResearch:"Ссылки будут добавлены.",exerciseCtaPrimary:"Добавить в мой план прокачки",exerciseCtaMessage:"Скоро здесь будет синхронизация с твоим планом в боте. Пока закрепи время в календаре и отметь выполнение в заметках.",exercisePremiumTitle:"Полный доступ",exercisePremiumText:"Экран упражнений из закрытого канала доступен с подпиской BrainBoosty.",zoneOpenFullExercise:"Полный экран упражнения"},Be={ru:ie,en:He};function z(e){return Be[e==="en"?"en":"ru"]??ie}const V=new Set;function Y(){const e=(window.location.hash||"#map").replace(/^#/,""),[t,a]=e.split("?");return{name:t||"map",params:new URLSearchParams(a||"")}}function C(e,t={}){var n;const a=((n=t.toString)==null?void 0:n.call(t))||new URLSearchParams(t).toString();window.location.hash=a?`${e}?${a}`:e}function qe(e){return V.add(e),()=>V.delete(e)}function oe(){const e=Y();for(const t of V)t(e)}window.addEventListener("hashchange",oe);function Ie(){oe()}function Pe(){var n,r,s;const e=(n=window.Telegram)==null?void 0:n.WebApp;if(!e)return{tg:null,initData:"",user:null,lang:"ru"};e.ready(),e.expand(),e.enableClosingConfirmation(),e.disableVerticalSwipes&&e.disableVerticalSwipes(),J(),e.onEvent("themeChanged",J);const t=((r=e.initDataUnsafe)==null?void 0:r.user)??null,a=(t==null?void 0:t.language_code)==="en"||(s=t==null?void 0:t.language_code)!=null&&s.startsWith("en")?"en":"ru";return e.setHeaderColor&&e.setHeaderColor("#010108"),e.setBackgroundColor&&e.setBackgroundColor("#010108"),{tg:e,initData:e.initData||"",user:t,lang:a}}function J(){const e=document.documentElement;e.style.setProperty("--bb-tg-bg","#010108"),e.style.setProperty("--bb-tg-text","#f1f5f9")}function U(e){var a;const t=(a=window.Telegram)==null?void 0:a.WebApp;if(t!=null&&t.openTelegramLink&&e.includes("t.me/")){t.openTelegramLink(e);return}if(t!=null&&t.openLink){t.openLink(e);return}window.open(e,"_blank","noopener,noreferrer")}function T(){var e,t,a,n;(n=(a=(t=(e=window.Telegram)==null?void 0:e.WebApp)==null?void 0:t.HapticFeedback)==null?void 0:a.impactOccurred)==null||n.call(a,"light")}function $(e){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}function Fe(){return`
    <div class="bb-zone-drawer__bar-track">
      <div class="bb-zone-drawer__bar-fill" style="width: 0%"></div>
    </div>`}function Re(e,t,a={}){var u,v,b,L,y,k;const n=z(e.lang),r=n.regions[t]??t,s=((u=n.zoneWhy)==null?void 0:u[t])??"",i=Number(((v=e.scores)==null?void 0:v[t])??0).toFixed(1),o=((b=n.zoneExercises)==null?void 0:b[t])??[],d=o.length>0?o.map(p=>`
                  <li class="bb-zone-drawer__exercise">
                    <p class="bb-zone-drawer__exercise-title">${$(p.title)}</p>
                    <p class="bb-zone-drawer__exercise-body">${$(p.body)}</p>
                    ${p.exerciseId!=null?`<button type="button" class="bb-zone-drawer__ex-open" data-open-exercise="${Number(p.exerciseId)}">${$(n.zoneOpenFullExercise)}</button>`:""}
                  </li>`).join(""):`<li class="bb-zone-drawer__exercise"><p class="bb-zone-drawer__exercise-body">${$(n.zoneExercisePlaceholder)}</p></li>`,l=document.createElement("div");l.className="bb-zone-drawer-host",l.innerHTML=`
    <div class="bb-zone-drawer-backdrop" data-close="1" aria-hidden="true"></div>
    <aside class="bb-zone-drawer glass" role="dialog" aria-modal="true" aria-labelledby="bb-zone-drawer-title">
      <header class="bb-zone-drawer__header">
        <div>
          <p class="bb-zone-drawer__eyebrow">${$(n.interactiveBrainKicker)}</p>
          <h2 id="bb-zone-drawer-title" class="bb-zone-drawer__title">${$(r)}</h2>
        </div>
        <button type="button" class="bb-zone-drawer__close" data-close="1" aria-label="${$(n.zoneDrawerCloseAria)}">
          <span aria-hidden="true">×</span>
        </button>
      </header>
      <div class="bb-zone-drawer__body">
        <div class="bb-zone-drawer__meter">
          <div class="bb-zone-drawer__meter-row">
            <span class="bb-zone-drawer__meter-label">${$(n.zoneCurrentLevel)}</span>
            <span class="bb-zone-drawer__meter-value">${$(i)}%</span>
          </div>
          ${Fe()}
        </div>
        <div class="bb-zone-drawer__why">
          <p class="bb-zone-drawer__why-title">${$(n.zoneWhyTitle)}</p>
          <p class="bb-zone-drawer__why-text">${$(s)}</p>
        </div>
        <div class="bb-zone-drawer__actions" data-paid-block="${e.paid?"1":"0"}">
          ${e.paid?`
            <div class="bb-zone-drawer__paid-menu">
              <button type="button" class="bb-zone-drawer__btn bb-zone-drawer__btn--ghost" data-go="history">
                ${$(n.zoneOpenHistory)}
              </button>
              <button type="button" class="bb-zone-drawer__btn bb-zone-drawer__btn--ghost" data-toggle="exercises">
                ${$(n.zoneExercisesHeading)}
              </button>
            </div>
            <div class="bb-zone-drawer__exercises" data-exercises hidden>
              <p class="bb-zone-drawer__exercises-cap">${$(n.zoneExerciseListCap)}</p>
              <ul class="bb-zone-drawer__exercise-list">
                ${d}
              </ul>
            </div>
            <p class="bb-zone-drawer__paid-hint">${$(n.zonePaidHint)}</p>
            <button type="button" class="bb-zone-drawer__btn bb-zone-drawer__btn--ghost bb-zone-drawer__btn--compact" data-scroll-zone="${t}">
              ${$(n.zoneReadMoreDetail)}
            </button>`:`
            <p class="bb-zone-drawer__lock-note">${$(n.zoneUnlockNote)}</p>
            <button type="button" class="bb-zone-drawer__btn bb-zone-drawer__btn--primary" data-go="boost">
              ${$(n.zoneBoostCta)}
            </button>
            <button type="button" class="bb-zone-drawer__btn bb-zone-drawer__btn--ghost bb-zone-drawer__btn--compact" data-scroll-zone="${t}">
              ${$(n.zoneReadMoreDetail)}
            </button>`}
        </div>
      </div>
    </aside>
  `,document.body.appendChild(l),document.body.classList.add("bb-zone-drawer-open");const x=l.querySelector(".bb-zone-drawer"),c=l.querySelector("[data-exercises]"),f=l.querySelector(".bb-zone-drawer-backdrop"),g=l.querySelector(".bb-zone-drawer__bar-fill"),h=()=>{var p;document.removeEventListener("keydown",E),document.body.classList.remove("bb-zone-drawer-open"),l.remove(),(p=a.onClose)==null||p.call(a)},E=p=>{p.key==="Escape"&&h()};return document.addEventListener("keydown",E),l.querySelectorAll("[data-close]").forEach(p=>{p.addEventListener("click",()=>{T(),h()})}),(L=l.querySelector('[data-go="boost"]'))==null||L.addEventListener("click",()=>{T(),e.tributeUrl?U(e.tributeUrl):C("premium"),h()}),(y=l.querySelector('[data-go="history"]'))==null||y.addEventListener("click",()=>{T(),C("history",{zone:t}),h()}),(k=l.querySelector('[data-toggle="exercises"]'))==null||k.addEventListener("click",()=>{if(T(),!c)return;c.hasAttribute("hidden")?c.removeAttribute("hidden"):c.setAttribute("hidden","")}),l.querySelectorAll("[data-scroll-zone]").forEach(p=>{p.addEventListener("click",()=>{T();const N=p.getAttribute("data-scroll-zone")||t;h(),requestAnimationFrame(()=>{var M;(M=document.getElementById(`zone-${N}`))==null||M.scrollIntoView({behavior:"smooth",block:"start"})})})}),l.querySelectorAll("[data-open-exercise]").forEach(p=>{p.addEventListener("click",()=>{T();const N=p.getAttribute("data-open-exercise")||"1";h(),C("exercise",{id:N})})}),requestAnimationFrame(()=>{if(x==null||x.classList.add("is-open"),f==null||f.classList.add("is-open"),g){const p=Math.max(0,Math.min(100,Number(i)||0));g.style.width="0%",requestAnimationFrame(()=>{g.style.width=`${p.toFixed(1)}%`})}}),{close:()=>{h()}}}function H(e){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}function De(e,{displayName:t,neuroScore:a,connectivity:n}){const r=(n==null?void 0:n.length)>0?`
    <div class="bb-connectivity glass rounded-2xl p-4 mt-5">
      <p class="bb-connectivity__title">${H(e.connectivityTitle)}</p>
      ${n.map(s=>`<p>• ${H(s)}</p>`).join(`
      `)}
    </div>`:"";return`
<section class="bb-section bb-cover" data-section="cover">
  <img src="${Le}" alt="" class="cover-full-brain-hero mb-4" width="360" height="260" decoding="async" />
  <div class="glass rounded-3xl p-6 sm:p-8 cover-neon-card border border-cyan-500/20">
    <p class="text-center text-sm uppercase tracking-[0.35em] text-cyan-200 mt-1 font-semibold drop-shadow-[0_0_16px_rgba(34,211,238,0.55)] bb-cover__kicker">
      ${H(e.heroBrain)}
    </p>
    <h1 class="text-center text-2xl sm:text-3xl font-bold mt-5 text-white drop-shadow-[0_0_20px_rgba(167,139,250,0.25)] neon-zone-title">
      ${H(t)}
    </h1>
    <p class="text-center text-slate-300/95 mt-3 text-[15px] leading-relaxed max-w-md mx-auto tracking-wide px-2">
      ${H(e.coverLine)}
    </p>
    <div class="mt-8 flex flex-col items-center justify-center">
      <p class="bb-cover__score-label text-cyan-100/90 text-sm mb-2 font-medium tracking-wide drop-shadow-[0_0_10px_rgba(34,211,238,0.35)]">
        ${H(e.scoreLabel)}
      </p>
      <div class="text-6xl sm:text-7xl font-black bg-gradient-to-r from-cyan-200 via-violet-300 to-fuchsia-300 bg-clip-text text-transparent neon-score-cover" data-neuro-score>
        ${Number(a).toFixed(1)}
      </div>
    </div>
    ${r}
  </div>
  <p class="text-center text-[11px] text-slate-500 mt-6">${H(e.footer)}</p>
</section>`}function X({label:e,value:t,glow:a=!1}){const n=Math.max(0,Math.min(100,Number(t)||0)),r=Math.max(0,100-n),s=a?"pdf-bar-gradient pdf-bar-gradient--main":"pdf-bar-gradient pdf-bar-gradient--sub",i=Oe(e);return[`<div class="mb-3.5" data-bar-value="${n}">`,'<div class="flex justify-between text-xs text-slate-400 mb-1">',`<span>${i}</span>`,`<span class="text-cyan-100 font-bold tracking-wide">${n.toFixed(1)}%</span>`,"</div>",'<div class="pdf-bar-track">',`<div class="${s}" style="clip-path: inset(0 ${r.toFixed(2)}% 0 0);"></div>`,"</div>","</div>"].join(`
  `)}function Oe(e){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}function I(e){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}function je(e,t,a){const n=e.regions[t]??t,r=$e[t],s=Number(a.main??0),i=e.progressMain(`${s.toFixed(1)}`),o=[X({label:e.zoneLevel,value:s,glow:!0}),...(a.submetrics??[]).map(l=>X({label:l.label,value:l.value,glow:!1}))].join(`
`),d=(a.bullets??[]).map(l=>`<li>${I(l)}</li>`).join(`
        `);return`
<section class="bb-section bb-region" data-section="region" data-region="${t}" id="zone-${t}">
  <button type="button" class="bb-region__illu-hit" data-open-zone="${t}" aria-label="${I(n)} — ${I(e.zoneIllustrationOpenAria)}">
    <img src="${r}" alt="" class="brain-float-top bb-region__illu" width="320" height="220" loading="lazy" decoding="async" />
  </button>
  <h2 class="bb-region__title neon-zone-title px-2">${I(n)}</h2>
  <p class="bb-region__progress-label">${I(i)}</p>
  <div class="glass rounded-2xl p-4 max-w-xl mx-auto w-full">
    ${o}
  </div>
  <div class="glass rounded-2xl p-4 mt-4 max-w-xl mx-auto w-full">
    <p class="bb-rec-title">${I(e.recTitle)}</p>
    <ul class="bb-rec-list">
        ${d}
    </ul>
  </div>
</section>`}function Ue(e,t,a){const n=z(t.lang),r=t.userDisplayName||(t.lang==="en"?"Guest":"Гость"),s=[De(n,{displayName:r,neuroScore:t.neuroScore,connectivity:t.connectivity}),...B.map(i=>{var o,d;return je(n,i,{main:t.scores[i],bullets:((o=t.regions[i])==null?void 0:o.bullets)??[],submetrics:((d=t.regions[i])==null?void 0:d.submetrics)??[]})})];e.innerHTML=s.join(`
`),Ge(e),Ve(e),Ye(e),We(e,t,a)}function We(e,t,a){var o,d;const n=e.querySelectorAll("[data-open-zone]");if(!n.length)return;const r=l=>{e.querySelectorAll(".bb-region").forEach(x=>{const c=x.dataset.region;x.classList.toggle("is-zone-hot",!!l&&c===l)})},s=l=>{!l||!B.includes(l)||(r(l),Re(t,l,{onClose:()=>r(null)}))};n.forEach(l=>{l.addEventListener("pointerenter",()=>r(l.getAttribute("data-open-zone")||"")),l.addEventListener("pointerleave",x=>{const c=x.relatedTarget;c instanceof Node&&e.contains(c)&&c.closest("[data-open-zone]")||r(null)}),l.addEventListener("click",x=>{x.preventDefault();const c=l.getAttribute("data-open-zone");c&&(T(),s(c))})});const i=(d=(o=a==null?void 0:a.params)==null?void 0:o.get)==null?void 0:d.call(o,"zone");i&&B.includes(i)&&requestAnimationFrame(()=>s(i))}function Ge(e){const t=e.querySelectorAll(".bb-section"),a=new IntersectionObserver(n=>{for(const r of n)r.isIntersecting&&(r.target.classList.add("is-visible"),a.unobserve(r.target))},{root:null,rootMargin:"0px 0px -8% 0px",threshold:.08});t.forEach(n=>a.observe(n))}function Ve(e){const t=e.querySelector("[data-neuro-score]");if(!t)return;const a=parseFloat(t.textContent||"0"),n=1200,r=performance.now(),s=i=>{const o=Math.min(1,(i-r)/n),d=1-(1-o)**3;t.textContent=(a*d).toFixed(1),o<1&&requestAnimationFrame(s)};requestAnimationFrame(s)}function Ye(e){const t=e.querySelectorAll("[data-bar-value]"),a=new IntersectionObserver(n=>{for(const r of n){if(!r.isIntersecting)continue;const s=r.target,i=parseFloat(s.getAttribute("data-bar-value")||"0"),o=s.querySelector(".pdf-bar-gradient");o&&(o.style.clipPath="inset(0 100% 0 0)",requestAnimationFrame(()=>{o.style.clipPath=`inset(0 ${Math.max(0,100-i).toFixed(2)}% 0 0)`})),a.unobserve(s)}},{threshold:.2});t.forEach(n=>a.observe(n))}function m(e){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}function Je(){return{instruction:'<svg class="ex-ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.25" aria-hidden="true"><path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01"/></svg>',research:'<svg class="ex-ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.25" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3M11 8v6M8 11h6"/></svg>',amplify:'<svg class="ex-ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.25" aria-hidden="true"><path d="M12 3l1.8 5.5h5.7l-4.6 3.4 1.8 5.5-4.7-3.4-4.7 3.4 1.8-5.5-4.6-3.4h5.7L12 3z"/></svg>',results:'<svg class="ex-ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.25" aria-hidden="true"><path d="M4 19V5M9 19v-6M14 19V9M19 19v-9"/><path d="M4 19h16" stroke-linecap="round"/></svg>'}}function G(e){return String(e||"").split(`
`).map(a=>`<p>${m(a)}</p>`).join("")}function Xe(e){e.querySelectorAll(".ex-acc").forEach(t=>{const a=t.querySelector(".ex-acc__trigger");a&&a.addEventListener("click",()=>{const r=!(t.getAttribute("data-open")==="true");t.setAttribute("data-open",String(r)),a.setAttribute("aria-expanded",String(r)),T()})})}function O(e){requestAnimationFrame(()=>{var t;(t=e.querySelector(".ex-lux"))==null||t.classList.add("is-visible")})}async function Ze(e,t,a,n){var h,E;const r=z(a.lang),s=Je();e.className="bb-root bb-root--spa bb-root--exercise",e.innerHTML=`
    <div class="ex-lux">
      <div class="ex-lux__grid-bg" aria-hidden="true"></div>
      <header class="ex-lux__top">
        <button type="button" class="ex-lux__back" id="ex-back" aria-label="${m(r.exerciseBackAria)}">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M15 6l-6 6 6 6"/></svg>
        </button>
      </header>
      <div class="ex-lux__scroll">
        <div class="ex-lux__inner">
          <div class="ex-lux__loading">
            <div class="ex-lux__pulse"></div>
            <p>${m(r.exerciseLoading)}</p>
          </div>
        </div>
      </div>
      <div class="ex-lux__cta-bar">
        <button type="button" class="ex-lux__cta" id="ex-cta">${m(r.exerciseCtaPrimary)}</button>
      </div>
    </div>`;const i=e.querySelector("#ex-back");if(i==null||i.addEventListener("click",()=>{T(),C("map")}),!Number.isFinite(n)||n<1){const u=e.querySelector(".ex-lux__scroll .ex-lux__inner");u&&(u.innerHTML=`<p class="ex-lux__err">${m(r.exerciseNotFound)}</p>`),O(e);return}if(!a.paid){e.querySelector(".ex-lux__scroll .ex-lux__inner").innerHTML=`
      <div class="ex-lux__hero">
        <p class="ex-lux__lock-title">${m(r.exercisePremiumTitle)}</p>
        <p class="ex-lux__lock-text">${m(r.exercisePremiumText)}</p>
        <button type="button" class="ex-lux__cta ex-lux__cta--inline" id="ex-unlock">${m(r.premiumCta)}</button>
      </div>`,(h=e.querySelector("#ex-unlock"))==null||h.addEventListener("click",()=>{T(),a.tributeUrl?U(a.tributeUrl):C("premium")}),e.querySelector("#ex-cta").textContent=r.premiumCta,(E=e.querySelector("#ex-cta"))==null||E.addEventListener("click",()=>{T(),a.tributeUrl?U(a.tributeUrl):C("premium")}),O(e);return}let o;try{o=await Me(t,n)}catch(u){const v=e.querySelector(".ex-lux__scroll .ex-lux__inner"),b=(u==null?void 0:u.status)===403?r.exercisePremiumTitle:(u==null?void 0:u.status)===404?r.exerciseNotFound:r.errorLoad;v&&(v.innerHTML=`<p class="ex-lux__err">${m(b)}</p>`),O(e);return}const d=Math.max(0,Math.min(4,(o.effectiveness||3)-1)),l=r.exerciseEfficiencyLabels[d]??"—",x=(o.regions||[]).map(u=>`<span class="ex-lux__pill">${m(r.regions[u]??u)}</span>`).join(""),c=(o.researchLinks||[]).map(u=>`<a class="ex-lux__link" href="${m(u.url)}" target="_blank" rel="noopener noreferrer">${m(u.label||u.url)}</a>`).join(""),f=o.instructionImageUrl?`<figure class="ex-lux__figure"><img src="${m(o.instructionImageUrl)}" alt="" loading="lazy" decoding="async" /></figure>`:"";e.querySelector(".ex-lux__scroll .ex-lux__inner").innerHTML=`
    <div class="ex-lux__hero">
      <div class="ex-lux__emoji" aria-hidden="true">${m(o.emoji||"◆")}</div>
      <h1 class="ex-lux__title">${m(o.title)}</h1>
      <p class="ex-lux__lede">${m(o.shortDescription)}</p>
      <div class="ex-lux__tags">
        <span class="ex-lux__tag"><span class="ex-lux__tag-k">${m(r.exerciseTagForWho)}</span>${m(o.forWho)}</span>
        <span class="ex-lux__tag"><span class="ex-lux__tag-k">${m(r.exerciseTagEfficiency)}</span>${m(l)}</span>
        <span class="ex-lux__tag"><span class="ex-lux__tag-k">${m(r.exerciseTagFirstResult)}</span>${m(r.exerciseFirstResultDays(o.firstResultDays))}</span>
      </div>
      <div class="ex-lux__meta-row">
        <div class="ex-lux__diff">
          <span class="ex-lux__diff-label">${m(r.exerciseDifficulty)}</span>
          <div class="ex-lux__diff-track"><span class="ex-lux__diff-fill" style="width: ${Number(o.difficulty||0)}%"></span></div>
          <span class="ex-lux__diff-num">${m(Number(o.difficulty||0))}</span>
        </div>
      </div>
      <div class="ex-lux__pills">${x}</div>
      ${f}
    </div>

    <div class="ex-lux__accords">
      <div class="ex-acc" data-open="true">
        <button type="button" class="ex-acc__trigger" aria-expanded="true">
          <span class="ex-acc__ic">${s.instruction}</span>
          <span class="ex-acc__label">${m(r.exerciseAccInstruction)}</span>
          <span class="ex-acc__chev" aria-hidden="true"></span>
        </button>
        <div class="ex-acc__panel">
          <div class="ex-acc__panel-inner ex-lux__prose">${G(o.instruction)}</div>
        </div>
      </div>
      <div class="ex-acc" data-open="false">
        <button type="button" class="ex-acc__trigger" aria-expanded="false">
          <span class="ex-acc__ic">${s.research}</span>
          <span class="ex-acc__label">${m(r.exerciseAccResearch)}</span>
          <span class="ex-acc__chev" aria-hidden="true"></span>
        </button>
        <div class="ex-acc__panel">
          <div class="ex-acc__panel-inner ex-lux__prose ex-lux__links">${c||`<p>${m(r.exerciseNoResearch)}</p>`}</div>
        </div>
      </div>
      <div class="ex-acc" data-open="false">
        <button type="button" class="ex-acc__trigger" aria-expanded="false">
          <span class="ex-acc__ic">${s.amplify}</span>
          <span class="ex-acc__label">${m(r.exerciseAccAmplify)}</span>
          <span class="ex-acc__chev" aria-hidden="true"></span>
        </button>
        <div class="ex-acc__panel">
          <div class="ex-acc__panel-inner ex-lux__prose">${G(o.amplify)}</div>
        </div>
      </div>
      <div class="ex-acc" data-open="false">
        <button type="button" class="ex-acc__trigger" aria-expanded="false">
          <span class="ex-acc__ic">${s.results}</span>
          <span class="ex-acc__label">${m(r.exerciseAccResults)}</span>
          <span class="ex-acc__chev" aria-hidden="true"></span>
        </button>
        <div class="ex-acc__panel">
          <div class="ex-acc__panel-inner ex-lux__prose">${G(o.expectedResults)}</div>
        </div>
      </div>
    </div>
    <div class="ex-lux__scroll-pad"></div>`,Xe(e);const g=e.querySelector("#ex-cta");g==null||g.addEventListener("click",()=>{var u,v,b;T(),(b=(v=(u=window.Telegram)==null?void 0:u.WebApp)==null?void 0:v.showAlert)==null||b.call(v,r.exerciseCtaMessage)}),O(e)}function j(e){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}function Qe(e,t){if(!e)return"—";try{return new Date(e).toLocaleString(t==="en"?"en-GB":"ru-RU",{day:"2-digit",month:"short",year:"numeric",hour:"2-digit",minute:"2-digit"})}catch{return e}}async function Ke(e,t,a){var l,x;const n=z(a.lang),r=Y().params.get("zone"),s=document.createElement("section");s.className="bb-section is-visible bb-history",s.innerHTML=`
    <h2 class="bb-page-title bb-page-title--premium neon-zone-title">${j(n.historyTitle)}</h2>
    <p class="bb-page-sub text-slate-300/90 text-sm mb-4">${j(n.historySub)}</p>
  `;const i=document.createElement("div");i.className="space-y-3",i.textContent=n.loading,s.appendChild(i),e.replaceChildren(s);let o;try{o=await ze(t)}catch{i.innerHTML=`<p class="bb-error">${j(n.errorLoad)}</p>`;return}const d=o.items??[];if(i.replaceChildren(),!d.length){const c=document.createElement("div");c.className="glass rounded-2xl p-5 text-center";const f=document.createElement("p");f.className="text-slate-200 mb-4",f.textContent=n.historyEmpty;const g=document.createElement("button");g.type="button",g.className="bb-btn-primary",g.textContent=n.startTest,g.addEventListener("click",()=>C("test")),c.append(f,g),i.appendChild(c);return}for(const[c,f]of d.entries()){const g=document.createElement("article");g.className=`glass rounded-2xl p-4 bb-history-card${c===0?" is-active":""}`;const h=document.createElement("div");h.className="flex justify-between items-start gap-2 mb-2";const E=document.createElement("div");if(E.innerHTML=`
      <p class="text-xs text-cyan-200/80 uppercase tracking-wide">${j(Qe(f.createdAt,a.lang))}</p>
      <p class="text-lg font-bold text-white mt-1 bb-type-display">NeuroScore <span class="text-cyan-200">${Number(f.neuroScore).toFixed(1)}</span></p>
    `,h.appendChild(E),c===0){const b=document.createElement("span");b.className="bb-badge",b.textContent=n.latest,h.appendChild(b)}g.appendChild(h);const u=document.createElement("div");u.className="bb-history-deltas";for(const b of B){const L=n.regions[b]??b,y=Number(((l=f.scores)==null?void 0:l[b])??0).toFixed(1),k=f.isFirst?"—":((x=f.deltas)==null?void 0:x[b])??"·",p=document.createElement("div");p.className=`bb-history-row${r===b?" bb-history-row--focus":""}`;const N=document.createElement("span");N.textContent=L;const M=document.createElement("span");M.textContent=`${y}%`;const q=document.createElement("span");q.textContent=k,typeof k=="string"&&k.includes("↑")&&(q.className="bb-delta-up"),typeof k=="string"&&k.includes("↓")&&(q.className="bb-delta-down"),p.append(N,M,q),u.appendChild(p)}g.appendChild(u);const v=document.createElement("button");v.type="button",v.className="bb-btn-ghost mt-3 w-full",v.textContent=n.openThisMap,v.addEventListener("click",()=>C("map")),g.appendChild(v),i.appendChild(g)}r&&d.length&&requestAnimationFrame(()=>{var c;(c=s.querySelector(".bb-history-row--focus"))==null||c.scrollIntoView({block:"center",behavior:"smooth"})})}function F(e){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}function et(e,t){var n;const a=z(t.lang);e.innerHTML=`
    <section class="bb-section is-visible bb-premium">
      <div class="mb-3 rounded-full px-5 py-1.5 border border-cyan-400/30 bg-cyan-500/10 text-xs font-bold uppercase tracking-[0.35em] text-cyan-100 text-center bb-type-display">
        ${F(a.premiumBadge)}
      </div>
      <h2 class="bb-page-title bb-page-title--premium neon-cta-title mb-4">
        ${F(a.premiumTitle)}
      </h2>
      <p class="text-slate-200 text-center text-sm leading-relaxed mb-6">${F(a.premiumSub)}</p>
      <ul class="bb-premium-list glass rounded-2xl p-5 mb-6 space-y-3 text-sm text-slate-200">
        ${a.premiumBullets.map(r=>`<li>${F(r)}</li>`).join("")}
      </ul>
      <button type="button" class="bb-btn-premium-buy w-full" id="bb-premium-buy">${F(a.premiumCta)}</button>
    </section>
  `,(n=e.querySelector("#bb-premium-buy"))==null||n.addEventListener("click",()=>{T(),t.tributeUrl&&U(t.tributeUrl)})}function S(e){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}async function tt(e,t,a,{onProfile:n}={}){const r=z(a.lang),s={variant:a.testVariant||"development",questions:[],answers:{},step:0},i=document.createElement("section");i.className="bb-section is-visible bb-test",e.replaceChildren(i);async function o(){i.innerHTML=`<p class="text-cyan-200/80 text-sm">${S(r.loading)}</p>`;try{const c=await Ce(t,s.variant);s.questions=c.questions??[],s.step=0,s.answers={},l()}catch{i.innerHTML=`<p class="bb-error">${S(r.errorLoad)}</p>`}}function d(){i.innerHTML=`
      <div class="bb-test-pick">
        <div class="bb-test-pick__glow" aria-hidden="true"></div>
        <h2 class="bb-page-title bb-page-title--premium neon-zone-title">${S(r.testTitle)}</h2>
        <p class="bb-page-sub text-slate-300/90 text-sm mb-1 leading-relaxed">${S(r.testPickVariant)}</p>
        <div class="bb-test-variant-grid">
          <button type="button" class="bb-btn-hero" data-variant="sexual">
            <span class="bb-btn-hero__badge">${S(r.variantSexBadge)}</span>
            <span class="bb-btn-hero__label">${S(r.variantSex)}</span>
            <span class="bb-btn-hero__hint">${S(r.variantSexHint)}</span>
          </button>
          <button type="button" class="bb-btn-alt" data-variant="development">
            <span class="bb-btn-alt__label">${S(r.variantDev)}</span>
            <span class="bb-btn-alt__hint">${S(r.variantDevHint)}</span>
          </button>
        </div>
      </div>
    `,i.querySelectorAll("[data-variant]").forEach(c=>{c.addEventListener("click",()=>{T(),s.variant=c.getAttribute("data-variant")||"development",o()})})}function l(){const c=s.questions[s.step];if(!c){d();return}const f=s.questions.length,g=(s.step+1)/f*100;i.innerHTML=`
      <div class="bb-test-progress mb-4">
        <div class="flex justify-between text-xs text-cyan-200/80 mb-1">
          <span>${S(r.questionProgress(s.step+1,f))}</span>
          <span>${Math.round(g)}%</span>
        </div>
        <div class="pdf-bar-track"><div class="pdf-bar-gradient pdf-bar-gradient--main" style="clip-path: inset(0 ${(100-g).toFixed(1)}% 0 0)"></div></div>
      </div>
      <h2 class="bb-test-q-title">${S(c.topic)}</h2>
      <p class="text-slate-200 mb-4 leading-relaxed">${S(c.text)}</p>
      <div class="grid gap-2 bb-test-options" id="bb-test-options"></div>
    `;const h=i.querySelector("#bb-test-options");for(const E of c.options??[]){const u=document.createElement("button");u.type="button",u.className="bb-test-option",u.innerHTML=`<span class="bb-test-option-key">${S(E.key)}</span><span>${S(E.label)}</span>`,u.addEventListener("click",()=>x(E.key)),h.appendChild(u)}}async function x(c){T();const f=s.questions[s.step];if(s.answers[f.id]=c,s.step+1<s.questions.length){s.step+=1,l();return}i.innerHTML=`
      <div class="bb-loading">
        <div class="bb-loading__pulse"></div>
        <p class="text-sm text-cyan-200/80">${S(r.computing)}</p>
      </div>`;try{const g={};for(const[E,u]of Object.entries(s.answers))g[String(E)]=u;const h=await Ne(t,{variant:s.variant,answers:g});n&&n(h),C("map")}catch{i.innerHTML=`<p class="bb-error">${S(r.errorLoad)}</p>`}}d()}let _=null,A=null;function nt(e){var s;document.body.classList.add("bb-app--needs-bot"),(s=document.querySelector(".bb-premium-fab"))==null||s.remove();const t=document.getElementById("bb-nav");t&&(t.hidden=!0,t.innerHTML="");const a=z(_.lang);e.className="bb-root bb-root--spa bb-root--bot-gate",e.replaceChildren();const n=document.createElement("div");n.className="bb-bot-gate",n.setAttribute("role","status");const r=document.createElement("p");r.className="bb-bot-gate__line",r.textContent=a.notRegistered,n.appendChild(r),e.appendChild(n)}async function at(e){var a;if(A)return document.body.classList.remove("bb-app--needs-bot"),!0;const t=z(_.lang);e.className="bb-root bb-root--spa",e.innerHTML=`
      <div class="bb-loading">
        <div class="bb-loading__pulse"></div>
        <p class="text-sm text-cyan-200/80">${t.loading}</p>
      </div>`;try{return A=await Ae(_),document.body.classList.remove("bb-app--needs-bot"),le(A),(a=_.user)!=null&&a.first_name&&!A.userDisplayName&&(A.userDisplayName=[_.user.first_name,_.user.last_name].filter(Boolean).join(" ")),!0}catch(n){if((n==null?void 0:n.status)===401&&(n==null?void 0:n.detail)==="invalid_site_token"&&(_!=null&&_.siteToken)){try{localStorage.removeItem(R),localStorage.removeItem(D)}catch{}return window.location.replace("/"),!1}if((n==null?void 0:n.status)===403&&(n==null?void 0:n.detail)==="not_registered")return nt(e),!1;const r=(n==null?void 0:n.status)===403?t.notRegistered:(n==null?void 0:n.status)===401?t.authError:t.errorLoad;return e.className="bb-root bb-root--spa",e.innerHTML=`<p class="bb-error">${r}</p>`,!1}}function rt(e){const t=document.getElementById("bb-nav");t&&t.querySelectorAll(".bb-nav__btn[data-route]").forEach(a=>{a.classList.toggle("is-active",a.dataset.route===e)})}function st(e){if(!_)return;const t=e==="en"?"en":"ru";if(_.lang===t)return;_.lang=t,document.documentElement.lang=t;const a=z(t),n=document.getElementById("bb-header-wordmark");n&&(n.textContent=a.appBrandName),ce(t)}function le(e){e!=null&&e.lang&&st(e.lang)}function it(e){var n;if((n=document.querySelector(".bb-premium-fab"))==null||n.remove(),e.paid||!e.tributeUrl)return;const t=z((_==null?void 0:_.lang)||e.lang),a=document.createElement("button");a.type="button",a.className="bb-premium-fab",a.textContent=t.premiumCta,a.addEventListener("click",()=>{T(),C("premium")}),document.body.appendChild(a)}function ce(e){var r;const t=document.getElementById("bb-nav");if(!t)return;const a=z(e);t.hidden=!1;const n=_!=null&&_.siteToken?`<button type="button" class="bb-nav__btn bb-nav__btn--logout" data-site-logout>${a.navLogout}</button>`:"";t.innerHTML=`
    <button type="button" class="bb-nav__btn" data-route="map">${a.navMap}</button>
    <button type="button" class="bb-nav__btn" data-route="history">${a.navHistory}</button>
    <button type="button" class="bb-nav__btn" data-route="test">${a.navTest}</button>
    <button type="button" class="bb-nav__btn" data-route="premium">${a.navPremium}</button>
    ${n}
  `,t.querySelectorAll(".bb-nav__btn[data-route]").forEach(s=>{s.addEventListener("click",()=>{T(),C(s.dataset.route||"map")})}),(r=t.querySelector("[data-site-logout]"))==null||r.addEventListener("click",()=>{T();try{localStorage.removeItem(R),localStorage.removeItem(D)}catch{}window.location.replace("/")})}async function Z(e){var r;const t=document.getElementById("bb-root");if(!t||!_)return;const a=document.getElementById("bb-nav"),n=e.name==="exercise";if(document.body.classList.toggle("bb-route-exercise",n),n||rt(e.name),e.name!=="map"&&((r=document.querySelector(".bb-premium-fab"))==null||r.remove()),!!await at(t)){if(ce(_.lang),a&&(a.hidden=n),e.name==="premium"){et(t,A);return}if(e.name==="test"){await tt(t,_,A,{onProfile:s=>{A=s,le(s)}});return}if(e.name==="history"){await Ke(t,_,A);return}if(e.name==="exercise"){const s=parseInt(e.params.get("id")||"0",10);await Ze(t,_,A,s);return}if(!A.hasMap&&e.name==="map"){C("test");return}Ue(t,A,e),it(A)}}async function Q(e){const t=e.lang==="en"?"en":"ru";_={initData:e.initData??"",user:e.user??null,lang:t,siteToken:e.siteToken??""},A=null,document.body.classList.add("bb-app--telegram"),_.siteToken&&document.body.classList.add("bb-app--site");const a=document.getElementById("bb-root");if(!a)return;a.classList.add("bb-root--spa");const n=z(_.lang),r=document.getElementById("bb-header-wordmark");r&&(r.textContent=n.appBrandName),qe(i=>{Z(i).catch(()=>{})}),Ie();const s=Y();window.location.hash?await Z(s):C("map")}const K="/assets/full-glowing-brain-Cl127Rfm.png",ee=.088,te=15,ne=2,ae=.4;function W(e,t,a){return Math.max(t,Math.min(a,e))}function ot(){var e,t;return((t=(e=window.matchMedia)==null?void 0:e.call(window,"(prefers-reduced-motion: reduce)"))==null?void 0:t.matches)??!1}function lt(e,t,a){const n=e.getBoundingClientRect(),r=80,s=Math.max(n.width+r*2,1),i=Math.max(n.height+r*2,1),o=n.left+n.width/2,d=n.top+n.height/2;return{nx:W((t-o)/(s*.5),-1,1),ny:W((a-d)/(i*.5),-1,1)}}function ct(e){var b,L;if(ot())return()=>{};const t=e.querySelector("[data-parallax-brain]"),a=e.querySelector("[data-parallax-glow]");if(!t)return()=>{};let n={nx:0,ny:0},r=!1,s={nx:0,ny:0},i=!1,o=0,d=0,l=0;const x=((L=(b=window.matchMedia)==null?void 0:b.call(window,"(pointer: coarse)"))==null?void 0:L.matches)??!1,c=()=>r?{tx:n.nx,ty:n.ny}:i?{tx:s.nx*.62,ty:s.ny*.62}:{tx:0,ty:0},f=()=>{l=0;const{tx:y,ty:k}=c();o+=(y-o)*ee,d+=(k-d)*ee;const p=o*te,N=d*te,M=d*-ne,q=o*ne;if(t.style.transform=`translate3d(${p}px, ${N}px, 0) rotateX(${M}deg) rotateY(${q}deg)`,a){const me=-p*ae,he=-N*ae;a.style.transform=`translate3d(calc(-50% + ${me}px), calc(-50% + ${he}px), 0) scale(1.06)`}const{tx:ue,ty:be}=c(),pe=Math.abs(o-ue)>.003||Math.abs(d-be)>.003,ge=Math.abs(o)>.004||Math.abs(d)>.004;(pe||ge||i)&&(l=requestAnimationFrame(f))},g=()=>{l||(l=requestAnimationFrame(f))},h=y=>{if(!y.isTrusted)return;const{nx:k,ny:p}=lt(e,y.clientX,y.clientY);n={nx:k,ny:p},r=!0,g()},E=()=>{r=!0},u=()=>{r=!1,g()};e.addEventListener("pointermove",h,{passive:!0}),e.addEventListener("pointerenter",E),e.addEventListener("pointerleave",u),e.addEventListener("pointerdown",()=>{x&&typeof(DeviceOrientationEvent==null?void 0:DeviceOrientationEvent.requestPermission)=="function"&&DeviceOrientationEvent.requestPermission().then(y=>{y==="granted"&&(i=!0)}).catch(()=>{})},{passive:!0});let v=null;return window.DeviceOrientationEvent&&(v=y=>{if(y.gamma==null||y.beta==null)return;const k=W(y.gamma/32,-1,1),p=W((y.beta-44)/36,-1,1);s={nx:k,ny:p},i=!0,g()},window.addEventListener("deviceorientation",v,!0)),t.style.willChange="transform",a&&(a.style.willChange="transform"),g(),()=>{e.removeEventListener("pointermove",h),e.removeEventListener("pointerenter",E),e.removeEventListener("pointerleave",u),v&&window.removeEventListener("deviceorientation",v,!0),l&&cancelAnimationFrame(l),t.style.willChange="",t.style.transform="",a&&(a.style.willChange="",a.style.transform="")}}const dt={root:null,rootMargin:"0px 0px -10% 0px",threshold:.08};function ut(e,{reducedMotion:t}){if(t)return e.querySelectorAll(".bb-landing-reveal").forEach(r=>r.classList.add("is-in-view")),()=>{};const a=e.querySelectorAll(".bb-landing-reveal");if(!a.length)return()=>{};const n=new IntersectionObserver(r=>{for(const s of r)s.isIntersecting&&(s.target.classList.add("is-in-view"),n.unobserve(s.target))},dt);return a.forEach(r=>n.observe(r)),()=>{n.disconnect()}}function w(e){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}const de="bb-landing-lang",bt={not_registered:"landingHubErrorNotRegistered",oidc_not_configured:"landingHubErrorNotConfigured",token_exchange_failed:"landingHubErrorOidc",invalid_state:"landingHubErrorOidc",state_expired:"landingHubErrorOidc",missing_code:"landingHubErrorOidc"};function pt(){try{const e=localStorage.getItem(de);if(e==="en"||e==="ru")return e}catch{}return null}function gt(e,t){const a=bt[t];return a&&e[a]?e[a]:e.landingHubErrorOidc}function mt(){const e=(window.location.hash||"").replace(/^#/,"");if(!e.startsWith("hub-login"))return null;const t=e.includes("?")?e.slice(e.indexOf("?")+1):"";return new URLSearchParams(t).get("error")}function ht(e){document.body.classList.add("bb-lang-gate-open");const t=document.createElement("div");t.className="bb-lang-gate",t.setAttribute("role","dialog"),t.setAttribute("aria-modal","true"),t.setAttribute("aria-labelledby","bb-lang-gate-title"),t.innerHTML=`
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
  `,document.body.appendChild(t);const a=n=>{try{localStorage.setItem(de,n)}catch{}document.body.classList.remove("bb-lang-gate-open"),t.remove(),e(n)};t.querySelectorAll("[data-lang]").forEach(n=>{n.addEventListener("click",()=>a(n.getAttribute("data-lang")||"ru"))}),requestAnimationFrame(()=>{var n;(n=t.querySelector(".bb-lang-gate__btn"))==null||n.focus()})}async function ft(){const e=document.getElementById("bb-header"),t=document.getElementById("bb-nav");e&&(e.hidden=!0),t&&(t.hidden=!0);const a=document.getElementById("bb-root");if(!a)return;const n=pt();if(!n){a.className="bb-root",a.innerHTML="",ht(r=>{re(r).catch(()=>{})});return}await re(n)}async function re(e){var v;const t=z(e);document.documentElement.lang=e;const a=document.getElementById("bb-root");if(!a)return;a.className="bb-root bb-root--landing",a.innerHTML=`
    <div class="bb-loading">
      <div class="bb-loading__pulse"></div>
    </div>`;let n={botUrl:"https://t.me/brainboosty?start=webapp",webappEntryUrl:"https://t.me/brainboosty?start=webapp",channelUrl:"https://t.me/androgenautist",hasAuthorPhoto:!1,hasChannelAvatar:!1,neuralMapHubUrl:"/#hub-login",hubHostDisplay:"neuralmap.brainboosty.app",oidcLoginUrl:"/api/webapp/auth/oidc/start",oidcConfigured:!1};try{n={...n,...await Se()}}catch{}const r="/api/webapp/landing/photo",s=t.landingFeatures.map(b=>`<li>${w(b)}</li>`).join(""),i=window.matchMedia("(prefers-reduced-motion: reduce)").matches,o=n.oidcLoginUrl||"/api/webapp/auth/oidc/start";a.innerHTML=`
    <div class="bb-landing">
      <header id="top" class="bb-landing-hero">
        <div class="bb-landing-hero__visual-anchor">
          <div class="bb-landing-hero__glow" aria-hidden="true" data-parallax-glow></div>
          <div class="bb-landing-hero__brain-layer" data-parallax-brain>
            <img class="bb-landing-hero__brain" src="${K}" alt="" width="280" height="280" decoding="async" />
          </div>
        </div>
        <div class="bb-landing-hero__copy bb-landing-reveal">
        <p class="bb-landing-kicker">${w(t.landingKicker)}</p>
        <h1 class="bb-landing-title neon-zone-title">${w(t.landingTitle)}</h1>
        <p class="bb-landing-tagline">${w(t.landingTagline)}</p>
        <div class="bb-landing-hero__ctas">
          <a class="bb-landing-cta-primary" href="${w(n.botUrl)}" rel="noopener noreferrer">
            ${w(t.landingCta)}
          </a>
          <button type="button" class="bb-landing-cta-secondary" data-start-site-login>
            ${w(t.landingLoginTelegram)}
          </button>
        </div>
        <p class="bb-landing-cta-sub">${w(t.landingCtaSub)}</p>
        </div>
      </header>

      <section id="about" class="bb-landing-section bb-landing-reveal">
        <h2 class="bb-landing-section__title">${w(t.landingAboutTitle)}</h2>
        <article class="bb-landing-about glass bb-landing-hover-rise">
          <div class="bb-landing-about__photo-wrap">
            <img class="bb-landing-about__photo" src="${r}" alt="" width="320" height="320" loading="lazy" data-fallback-src="${K}" />
            <div class="bb-landing-about__ring" aria-hidden="true"></div>
          </div>
          <div class="bb-landing-about__text">
            ${t.landingAboutParagraphs.map(b=>`<p>${w(b)}</p>`).join("")}
            <a class="bb-landing-link" href="${w(n.channelUrl)}" target="_blank" rel="noopener noreferrer">
              ${w(t.landingChannelLink)}
            </a>
          </div>
        </article>
      </section>

      <section id="project" class="bb-landing-section bb-landing-reveal">
        <h2 class="bb-landing-section__title">${w(t.landingProjectTitle)}</h2>
        <ul class="bb-landing-features">${s}</ul>
        <p class="bb-landing-disclaimer">${w(t.footer)}</p>
      </section>

      <section id="hub-login" class="bb-landing-section bb-landing-hub bb-landing-reveal">
        <p class="bb-landing-hub__domain" translate="no">${w(n.hubHostDisplay)}</p>
        <h2 class="bb-landing-section__title bb-landing-hub__title">${w(t.landingHubTitle)}</h2>
        <p class="bb-landing-hub__lead">${w(t.landingHubLead)}</p>
        <p class="bb-landing-hub__hint">${w(t.landingHubHint)}</p>
        <div class="bb-landing-hub__card glass bb-landing-hover-rise">
          <button type="button" class="bb-landing-hub__start" data-start-site-login>${w(t.landingHubStartLogin)}</button>
          <p class="bb-landing-hub__status" hidden></p>
        </div>
      </section>

      <section id="start" class="bb-landing-section bb-landing-final bb-landing-reveal">
        <div class="glass bb-landing-final__card bb-landing-hover-rise">
          <h2 class="bb-landing-final__title">${w(t.landingFinalTitle)}</h2>
          <p class="bb-landing-final__sub">${w(t.landingFinalSub)}</p>
          <a class="bb-landing-cta-primary bb-landing-cta-primary--lg" href="${w(n.botUrl)}" rel="noopener noreferrer">
            ${w(t.landingCta)}
          </a>
        </div>
      </section>

      <footer class="bb-landing-footer">
        <span>BrainBoosty · Neural Map</span>
      </footer>
    </div>
  `,a.querySelectorAll(".bb-landing-about__photo").forEach(b=>{const L=b.getAttribute("data-fallback-src");L&&b.addEventListener("error",()=>{b.removeAttribute("data-fallback-src"),b.src=L})}),a.querySelectorAll('a[href^="#"]').forEach(b=>{b.addEventListener("click",L=>{var p;const y=(p=b.getAttribute("href"))==null?void 0:p.slice(1);if(!y)return;const k=document.getElementById(y);k&&(L.preventDefault(),k.scrollIntoView({behavior:"smooth",block:"start"}))})});const d=a.querySelector(".bb-landing"),l=ut(d||a,{reducedMotion:i}),x=a.querySelector(".bb-landing-hero"),c=x?ct(x):()=>{},f=()=>{l(),c(),window.removeEventListener("pagehide",f)};window.addEventListener("pagehide",f);const g=a.querySelectorAll("[data-start-site-login]"),h=a.querySelector(".bb-landing-hub__status"),E=b=>{if(!h||(h.hidden=!b,h.replaceChildren(),!b))return;const L=document.createElement("p");L.className="bb-landing-hub__status-line",L.textContent=b,h.appendChild(L)};g.forEach(b=>{b.addEventListener("click",()=>{var y;const L=z(e);if((y=document.getElementById("hub-login"))==null||y.scrollIntoView({behavior:"smooth",block:"start"}),!n.oidcConfigured){E(L.landingHubErrorNotConfigured);return}window.location.href=o})});const u=mt();u&&((v=document.getElementById("hub-login"))==null||v.scrollIntoView({behavior:"smooth",block:"start"}),E(gt(t,u)),window.location.hash="hub-login")}function _t(){try{const e=navigator.userAgent||"";if(/Telegram/i.test(e))return!0;const t=`${window.location.hash||""}${window.location.search||""}`;if(/tgWebAppPlatform|tgWebAppData|tgWebAppVersion/i.test(t))return!0}catch{}return!1}function xt(){var e;return(e=window.Telegram)!=null&&e.WebApp?Promise.resolve():new Promise(t=>{const a=document.createElement("script");a.src="https://telegram.org/js/telegram-web-app.js",a.async=!0,a.onload=()=>t(),a.onerror=()=>t(),document.head.appendChild(a)})}function vt(){var a;const e=(a=window.Telegram)==null?void 0:a.WebApp;return e?(e.initData||"").trim().length>0:!1}function yt(){var e;try{return((e=localStorage.getItem(R))==null?void 0:e.trim())||""}catch{return""}}async function wt(){var a,n,r,s,i;const t=(a=new URLSearchParams(window.location.search).get("oidc_handoff"))==null?void 0:a.trim();if(!t)return!1;try{const o=await fetch(`/api/webapp/auth/oidc/handoff?oidc_handoff=${encodeURIComponent(t)}`,{cache:"no-store"});if(!o.ok)return!1;const d=await o.json(),l=(n=d==null?void 0:d.accessToken)==null?void 0:n.trim();if(!l)return!1;const x=d.lang==="en"?"en":"ru";localStorage.setItem(R,l),localStorage.setItem(D,JSON.stringify({first_name:((r=d.user)==null?void 0:r.first_name)??"",last_name:((s=d.user)==null?void 0:s.last_name)??"",language_code:((i=d.user)==null?void 0:i.language_code)==="en"?"en":x}));const c=window.location.pathname||"/";return window.history.replaceState(null,"",c),window.location.hash="map",window.location.reload(),!0}catch{return!1}}function Et(){var s;const e=(window.location.hash||"").replace(/^#/,"");if(!e.startsWith("auth/callback"))return!1;const t=e.includes("?")?e.slice(e.indexOf("?")+1):"",a=new URLSearchParams(t),n=(s=a.get("access_token"))==null?void 0:s.trim();if(!n)return!1;const r=a.get("lang")==="en"?"en":"ru";try{localStorage.setItem(R,n),localStorage.setItem(D,JSON.stringify({first_name:a.get("first_name")||"",last_name:"",language_code:r}))}catch{return!1}return window.location.replace("/#map"),!0}function $t(){try{const e=localStorage.getItem(D);return e?JSON.parse(e):null}catch{return null}}async function Lt(){var n,r;if(await wt()||Et())return;_t()&&await xt();const{initData:e,user:t,lang:a}=Pe();if(vt())Q({initData:e,user:t,lang:a,siteToken:""});else{const s=yt();if(s){const i=$t(),o=(i==null?void 0:i.language_code)==="en"||(r=(n=i==null?void 0:i.language_code)==null?void 0:n.startsWith)!=null&&r.call(n,"en")||a==="en"?"en":"ru";Q({initData:"",user:i?{first_name:i.first_name,last_name:i.last_name,language_code:i.language_code}:null,lang:o,siteToken:s})}else ft()}}Lt().catch(()=>{});
