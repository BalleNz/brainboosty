(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))a(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const i of r.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&a(i)}).observe(document,{childList:!0,subtree:!0});function n(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function a(s){if(s.ep)return;s.ep=!0;const r=n(s);fetch(s.href,r)}})();const xe="/assets/full-glowing-brain-Cl127Rfm.png",ve="/assets/amygdala-DP7dGDc4.png",ye="/assets/lobes-uZqghd8w.png",_e="/assets/frontal-gyrus-DPq4mhR0.png",we="/assets/insula-CAJDukm_.png",$e="/assets/pfc-BE-jJY5g.png",Le="/assets/tpj-Cgg8S5Iu.png",P=["prefrontal_cortex","brain_lobes","insular_cortex","temporoparietal_junction","amygdala","frontal_gyrus"],ke={prefrontal_cortex:$e,brain_lobes:ye,insular_cortex:we,temporoparietal_junction:Le,amygdala:ve,frontal_gyrus:_e},Te=xe;function Ee(e){const t=P.map(a=>Number(e[a]??0)),n=t.reduce((a,s)=>a+s,0);return Math.round(n/Math.max(t.length,1)*10)/10}const G="bb-site-session",V="bb-site-user";function Se(e,t){const n={"Content-Type":"application/json"};e&&(n["X-Telegram-Init-Data"]=e);const a=(t||"").trim();return a&&(n.Authorization=`Bearer ${a}`),n}async function N(e,{initData:t="",siteToken:n="",method:a="GET",body:s}={}){const r=await fetch(`/api/webapp${e}`,{method:a,headers:Se(t,n),body:s?JSON.stringify(s):void 0});if(!r.ok){const i=new Error(`HTTP ${r.status}`);i.status=r.status;try{i.detail=(await r.json()).detail}catch{}throw i}return r.json()}function oe(e){var s,r;const t=e.lang==="en"?"en":"ru",n={};for(const i of P)n[i]=Number(((s=e.scores)==null?void 0:s[i])??0);const a={};for(const i of P){const o=((r=e.regions)==null?void 0:r[i])??{};a[i]={main:Number(o.main??n[i]),bullets:o.bullets??[],submetrics:(o.submetrics??[]).map(b=>({label:b.label??b.label_ru??"",value:Number(b.value??n[i])}))}}return{lang:t,userDisplayName:e.userDisplayName??e.user_display_name??"Guest",paid:!!e.paid,hasMap:!!(e.hasMap??e.has_map??Object.keys(e.scores||{}).length),testVariant:e.testVariant??e.test_variant??"development",tributeUrl:e.tributeUrl??e.tribute_url??"",neuroScore:e.neuroScore!=null?Number(e.neuroScore):Ee(n),scores:n,connectivity:e.connectivity??[],regions:a,snapshotId:e.snapshotId??e.snapshot_id??null,createdAt:e.createdAt??e.created_at??null}}async function Ae(){return N("/landing",{initData:"",siteToken:""})}async function R(e){const t=await N("/profile",{initData:e.initData??"",siteToken:e.siteToken??""});return oe(t)}async function ze(e){return N("/history",{initData:e.initData??"",siteToken:e.siteToken??""})}async function Me(e,t="development"){return N(`/test/questions?variant=${encodeURIComponent(t)}`,{initData:e.initData??"",siteToken:e.siteToken??""})}async function Ce(e,{variant:t,answers:n}){const a={variant:t,answers:n},s=await N("/test/submit",{initData:e.initData??"",siteToken:e.siteToken??"",method:"POST",body:a});return oe(s.profile)}async function He(e,t){return N(`/exercises/${encodeURIComponent(String(t))}`,{initData:e.initData??"",siteToken:e.siteToken??""})}async function Ne(){return N("/auth/site/link",{initData:"",siteToken:"",method:"POST"})}async function Be(e){return N(`/auth/site/poll?token=${encodeURIComponent(e)}`,{initData:"",siteToken:""})}const Pe={landingKicker:"BrainBoosty · neuroscience, no fluff",landingTitle:"Upgrade your brain — see your Neural Map",landingTagline:"7 questions → a personal 6-zone brain map, NeuroScore, and clear next steps. All in Telegram.",landingCta:"Boost my brain",landingCtaSub:"Free start in the bot · 2 minutes",landingNavAbout:"About me",landingNavProject:"The project",landingNavHub:"Neural Map Hub",landingNavCta:"Open bot",landingHubTitle:"Neural Map Hub",landingHubLead:"Your brain map, test, history, and exercises—in the browser, same account as the bot and Mini App.",landingHubHint:"You need a profile after the bot onboarding. Tap the button — Telegram opens with /start and a one-time token; confirm with «Start», then return here; this tab will log you in automatically.",landingHubStartLogin:"Open Telegram and confirm",landingHubPrepare:"Preparing your link…",landingHubPolling:"Waiting for confirmation in Telegram… keep this tab open.",landingHubExpired:"That link expired. Tap the button to try again.",landingHubPopupBlocked:"Your browser blocked the Telegram window. Allow pop-ups for this site and try again.",landingLoginTelegram:"Log in with Telegram",landingChannelAria:"Telegram channel",landingAboutTitle:"About me",landingAboutParagraphs:["Hi, I'm Damian — creator of BrainBoosty.","I went from anxiety, brain fog, and tension to clarity, inner strength, and confidence. Now I help others with neurobiology, hormones, and cognitive habits.","On my channel I share actionable insights—no marketing noise, only what actually shifts your state."],landingChannelLink:"→ Channel @androgenautist",landingProjectTitle:"What's inside",landingFeatures:["7-question cognitive test — development or sexual profile","Neural Map: 6 brain zones with NeuroScore and recommendations","Progress history and test-to-test comparison","Daily hooks and a private exercise channel"],landingFinalTitle:"Ready to see your map?",landingFinalSub:"Open the bot — onboarding takes a few minutes; your first map is free.",heroBrain:"NEURAL MAP",scoreLabel:"NeuroScore",coverLine:"Six zones · one profile. Numbers, focus, and a clear read—no clutter.",connectivityTitle:"Inter-region links (educational model)",zoneLevel:"Integrated zone level",progressMain:e=>`Your progress ${e}%`,recTitle:"Why this zone is your biggest pleasure lever",footer:"BrainBoosty · educational model · not a medical diagnosis",premiumCta:"Get full access",premiumBadge:"Full access",premiumTitle:"Get full access — today",premiumSub:"A 30-day personal plan, progress tracker, exercises for your profile, and the private channel.",premiumBullets:["Full brain map and all zone recommendations","Progress history with test comparisons","Retests and trend tracking","Private channel and daily hooks"],navMap:"Map",navHistory:"History",navTest:"Test",navPremium:"Access",navLogout:"Log out",appBrandName:"BrainBoosty",appHeaderTitle:"Neural Map",loading:"Loading your neuro profile…",computing:"Computing your brain map…",errorLoad:"Could not load data. Please try again later.",authError:"Open the app from the Telegram bot.",notRegistered:"Complete the bot questionnaire first (/start).",historyTitle:"Progress history",historySub:"Zone comparison across tests. Arrows show percentage-point change.",historyEmpty:"No saved tests yet. Take your first test to see history here.",startTest:"Take the test",latest:"Latest",openThisMap:"Open map",testTitle:"Cognitive test",testPickVariant:"Choose question style (7 steps):",variantDev:"Development & cognition",variantSex:"Sexual profile",variantSexBadge:"Maximum insight",variantSexHint:"Pleasure, drive, and your neural edge",variantDevHint:"Focus, habits, and cognitive style",questionProgress:(e,t)=>`Question ${e} of ${t}`,regions:{prefrontal_cortex:"Prefrontal cortex",brain_lobes:"Brain lobes · imagery",insular_cortex:"Insular cortex",temporoparietal_junction:"Temporoparietal junction",amygdala:"Amygdala",frontal_gyrus:"Frontal gyrus"},interactiveBrainKicker:"Zone",zoneIllustrationOpenAria:"open zone card",zoneDrawerCloseAria:"Close",zoneCurrentLevel:"Current level",zoneWhyTitle:"Why it matters",zoneBoostCta:"Boost this zone",zoneUnlockNote:"Full access unlocks personal drills per zone, progress tracking, and training history.",zoneOpenHistory:"History for this zone",zoneExercisesHeading:"Zone exercises",zoneExerciseListCap:"In your program for this zone:",zoneExercisePlaceholder:"More protocols are on the way — your full access already includes the base track.",zonePaidHint:"More protocols and metrics tailored to your profile are coming next.",zoneReadMoreDetail:"Full zone breakdown below in the feed",zoneWhy:{prefrontal_cortex:"Planning, impulse control, and focus. A stronger PFC means clearer decisions and fewer spirals.",brain_lobes:"Integrates imagery, language, and space. Balance here improves how you read reality and old patterns.",insular_cortex:"Interoception and emotional regulation — the bridge between body state and action.",temporoparietal_junction:"Perspective, attention, and social context — helps you update stories instead of locking in one view.",amygdala:"Threat and reward signaling. Tuning it reduces false alarms while keeping healthy drive.",frontal_gyrus:"Links effort, intention, and follow-through — trained with sequenced action and repetition."},zoneExercises:{prefrontal_cortex:[{title:"90-second stop frame",body:"Before an impulsive reply, state one value and one tiny next step out loud."}],brain_lobes:[{title:"Sensory anchor",body:"For 30s describe one object: color, texture, sound — no judgments."}],insular_cortex:[{title:"Rib-cage breath",body:"4 cycles: inhale 4 counts, soft pause, exhale 6 — attention on rib expansion.",exerciseId:1}],temporoparietal_junction:[{title:"Perspective swap",body:"Phrase the same situation two neutral ways — without «I'm right» framing."}],amygdala:[{title:"Tolerance window",body:"2 min: note 3 neutral facts around a trigger, then one action 2% softer."}],frontal_gyrus:[{title:"Three-step chain",body:"Write three micro-steps for one goal today; track completion only."}]},exerciseLoading:"Loading protocol…",exerciseNotFound:"Exercise not found.",exerciseBackAria:"Back",exerciseTagForWho:"For who",exerciseTagEfficiency:"Effectiveness",exerciseTagFirstResult:"First results",exerciseDifficulty:"Difficulty",exerciseFirstResultDays:e=>`~${e} days`,exerciseEfficiencyLabels:["Low","Moderate","High","Exceptional","Best for this region"],exerciseAccInstruction:"Instruction",exerciseAccResearch:"Research",exerciseAccAmplify:"How to amplify",exerciseAccResults:"Expected outcomes",exerciseNoResearch:"Links will appear here soon.",exerciseCtaPrimary:"Add to my training plan",exerciseCtaMessage:"Sync with your bot plan is coming soon. For now, block time on your calendar and log completion.",exercisePremiumTitle:"Full access",exercisePremiumText:"Channel exercises are available with BrainBoosty full access.",zoneOpenFullExercise:"Open full exercise"},le={landingKicker:"BrainBoosty · нейробиология без воды",landingTitle:"Прокачай мозг — увидь свою Neural Map",landingTagline:"7 вопросов → персональная карта из 6 зон мозга, NeuroScore и понятные шаги. Всё в Telegram.",landingCta:"Прокачать мозг",landingCtaSub:"Бесплатный старт в боте · 2 минуты",landingNavAbout:"Обо мне",landingNavProject:"Проект",landingNavHub:"Neural Map Hub",landingNavCta:"В бота",landingHubTitle:"Neural Map Hub",landingHubLead:"Карта мозга, тест, история и упражнения — в браузере, тот же аккаунт, что в боте и мини-приложении.",landingHubHint:"Нужен аккаунт после анкеты в боте. Нажми кнопку — откроется Telegram с командой /start и одноразовым токеном; подтверди «Start», вернись сюда: страница сама авторизуется.",landingHubStartLogin:"Открыть Telegram и подтвердить вход",landingHubPrepare:"Готовим ссылку…",landingHubPolling:"Ждём подтверждение в Telegram… не закрывай эту вкладку.",landingHubExpired:"Ссылка устарела. Нажми кнопку ещё раз.",landingHubPopupBlocked:"Браузер заблокировал окно Telegram. Разреши всплывающие окна для этого сайта и нажми кнопку снова.",landingLoginTelegram:"Войти через Telegram",landingChannelAria:"Канал в Telegram",landingAboutTitle:"Обо мне",landingAboutParagraphs:["Привет, я Дамиан — автор BrainBoosty.","Сам прошёл путь от тревожности, тумана в голове и зажатости — к ясности, внутренней силе и уверенности. Сейчас помогаю другим по нейробиологии, гормонам и когнитивным привычкам.","В канале делюсь рабочими инсайтами без маркетинговой шелухи — только то, что реально меняет состояние."],landingChannelLink:"→ Канал @androgenautist",landingProjectTitle:"Что внутри",landingFeatures:["Когнитивный тест из 7 вопросов — два стиля (развитие / сексуальный профиль)","Neural Map: 6 зон мозга с NeuroScore и рекомендациями","История прогресса и сравнение между тестами","Ежедневные хуки и закрытый канал с упражнениями"],landingFinalTitle:"Готов увидеть свою карту?",landingFinalSub:"Открой бота — анкета займёт пару минут, первая карта бесплатно.",heroBrain:"NEURAL MAP",scoreLabel:"NeuroScore",coverLine:"Шесть зон · один профиль. Цифры, акценты и ясная картина без лишнего шума.",connectivityTitle:"Связность зон (образовательная модель)",zoneLevel:"Интегральный уровень зоны",progressMain:e=>`Твой прогресс ${e}%`,recTitle:"Почему эта зона — твой главный рычаг удовольствия",footer:"BrainBoosty · образовательная модель · не медицинский диагноз",premiumCta:"Забрать полный доступ",premiumBadge:"Полный доступ",premiumTitle:"Забери полный доступ — сегодня",premiumSub:"Персональный план на 30 дней, трекер прогресса, упражнения под твой профиль и закрытый канал.",premiumBullets:["Полная карта мозга и все рекомендации по зонам","История прогресса с сравнением тестов","Повторные тесты и отслеживание динамики","Закрытый канал и ежедневные хуки"],navMap:"Карта",navHistory:"История",navTest:"Тест",navPremium:"Доступ",navLogout:"Выйти",appBrandName:"BrainBoosty",appHeaderTitle:"Neural Map",loading:"Загружаем нейропрофиль…",computing:"Считаем твою карту мозга…",errorLoad:"Не удалось загрузить данные. Попробуйте позже.",authError:"Откройте приложение из Telegram-бота.",notRegistered:"Сначала пройдите анкету в боте (/start).",historyTitle:"История прогресса",historySub:"Сравнение зон между прохождениями. Стрелки — изменение в процентных пунктах.",historyEmpty:"Пока нет сохранённых тестов. Пройдите первый тест — и здесь появится история.",startTest:"Пройти тест",latest:"Актуально",openThisMap:"Открыть карту",testTitle:"Когнитивный тест",testPickVariant:"Выберите стиль вопросов (7 шагов):",variantDev:"Развитие и когниция",variantSex:"Сексуальный профиль",variantSexBadge:"Максимум инсайта",variantSexHint:"Удовольствие, драйв и нейронный рельеф",variantDevHint:"Фокус, привычки и когнитивный стиль",questionProgress:(e,t)=>`Вопрос ${e} из ${t}`,regions:{prefrontal_cortex:"Префронтальная кора",brain_lobes:"Доли мозга · образы",insular_cortex:"Островковая кора",temporoparietal_junction:"Височно-теменной узел",amygdala:"Амигдала",frontal_gyrus:"Лобная извилина"},interactiveBrainKicker:"Зона",zoneIllustrationOpenAria:"открыть карточку зоны",zoneDrawerCloseAria:"Закрыть",zoneCurrentLevel:"Текущий уровень",zoneWhyTitle:"Почему это важно",zoneBoostCta:"Прокачать эту зону",zoneUnlockNote:"Полный доступ открывает персональные упражнения под каждую зону, трекер и историю прокачки.",zoneOpenHistory:"История этой зоны",zoneExercisesHeading:"Упражнения для зоны",zoneExerciseListCap:"Сейчас в программе для этой зоны:",zoneExercisePlaceholder:"Скоро добавим ещё шаги — уже доступен базовый протокол в полном доступе.",zonePaidHint:"Дальше — больше протоколов и метрик именно под твой профиль.",zoneReadMoreDetail:"Подробный разбор зоны в ленте ниже",zoneWhy:{prefrontal_cortex:"Планирование, торможение импульсов и фокус. Сильная ПФК — ясные решения, меньше хаоса и откатов.",brain_lobes:"Интеграция образов, языка и пространства. Баланс здесь — лучшее восприятие реальности и выученные паттерны.",insular_cortex:"Телесная осознанность и эмоциональная регуляция. Островок связывает «что чувствую» с «что делаю».",temporoparietal_junction:"Перспектива, внимание и социальный контекст. TPJ помогает не застревать в одной интерпретации событий.",amygdala:"Детектор угроз и сигналов награды. Настрой амигдалы — меньше ложной тревоги, больше спокойного драйва.",frontal_gyrus:"Связь моторики, намерения и усилия. Тренируется через последовательные действия и повторение цели."},zoneExercises:{prefrontal_cortex:[{title:"90 секунд «стоп-рамка»",body:"Перед импульсивным ответом назови вслух одну ценность и одно следующее маленькое действие."}],brain_lobes:[{title:"Сенсорный якорь",body:"30 секунд описывай предмет из комнаты: цвет, фактура, звук — без оценок."}],insular_cortex:[{title:"Дыхание в ребро",body:"4 цикла: вдох 4 счёта, мягкая пауза, выдох 6 — внимание на расширении рёбер.",exerciseId:1}],temporoparietal_junction:[{title:"Смена ракурса",body:"Сформулируй ту же ситуацию двумя нейтральными формулировками, без «я прав»."}],amygdala:[{title:"Окно толерантности",body:"2 минуты: найди 3 нейтральных факта вокруг триггера, затем одно действие на 2% мягче."}],frontal_gyrus:[{title:"Цепочка на 3 шага",body:"Запиши три микрошага к одной цели на сегодня; отмечай только факт выполнения."}]},exerciseLoading:"Загружаем протокол…",exerciseNotFound:"Упражнение не найдено.",exerciseBackAria:"Назад",exerciseTagForWho:"Для кого",exerciseTagEfficiency:"Эффективность",exerciseTagFirstResult:"Первый результат",exerciseDifficulty:"Сложность",exerciseFirstResultDays:e=>`ориентир ≈ ${e} дн.`,exerciseEfficiencyLabels:["Низкая","Средняя","Высокая","Чрезвычайная","Оптимально для отдела"],exerciseAccInstruction:"Инструкция",exerciseAccResearch:"Исследования",exerciseAccAmplify:"Как усилить эффект",exerciseAccResults:"Ожидаемые результаты",exerciseNoResearch:"Ссылки будут добавлены.",exerciseCtaPrimary:"Добавить в мой план прокачки",exerciseCtaMessage:"Скоро здесь будет синхронизация с твоим планом в боте. Пока закрепи время в календаре и отметь выполнение в заметках.",exercisePremiumTitle:"Полный доступ",exercisePremiumText:"Экран упражнений из закрытого канала доступен с подпиской BrainBoosty.",zoneOpenFullExercise:"Полный экран упражнения"},qe={ru:le,en:Pe};function C(e){return qe[e==="en"?"en":"ru"]??le}const X=new Set;function Z(){const e=(window.location.hash||"#map").replace(/^#/,""),[t,n]=e.split("?");return{name:t||"map",params:new URLSearchParams(n||"")}}function M(e,t={}){var a;const n=((a=t.toString)==null?void 0:a.call(t))||new URLSearchParams(t).toString();window.location.hash=n?`${e}?${n}`:e}function Ie(e){return X.add(e),()=>X.delete(e)}function ce(){const e=Z();for(const t of X)t(e)}window.addEventListener("hashchange",ce);function Fe(){ce()}function De(){var a,s,r;const e=(a=window.Telegram)==null?void 0:a.WebApp;if(!e)return{tg:null,initData:"",user:null,lang:"ru"};e.ready(),e.expand(),e.enableClosingConfirmation(),e.disableVerticalSwipes&&e.disableVerticalSwipes(),J(),e.onEvent("themeChanged",J);const t=((s=e.initDataUnsafe)==null?void 0:s.user)??null,n=(t==null?void 0:t.language_code)==="en"||(r=t==null?void 0:t.language_code)!=null&&r.startsWith("en")?"en":"ru";return e.setHeaderColor&&e.setHeaderColor("#010108"),e.setBackgroundColor&&e.setBackgroundColor("#010108"),{tg:e,initData:e.initData||"",user:t,lang:n}}function J(){const e=document.documentElement;e.style.setProperty("--bb-tg-bg","#010108"),e.style.setProperty("--bb-tg-text","#f1f5f9")}function U(e){var n;const t=(n=window.Telegram)==null?void 0:n.WebApp;if(t!=null&&t.openTelegramLink&&e.includes("t.me/")){t.openTelegramLink(e);return}if(t!=null&&t.openLink){t.openLink(e);return}window.open(e,"_blank","noopener,noreferrer")}function S(){var e,t,n,a;(a=(n=(t=(e=window.Telegram)==null?void 0:e.WebApp)==null?void 0:t.HapticFeedback)==null?void 0:n.impactOccurred)==null||a.call(n,"light")}function E(e){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}function Re(){return`
    <div class="bb-zone-drawer__bar-track">
      <div class="bb-zone-drawer__bar-fill" style="width: 0%"></div>
    </div>`}function Oe(e,t,n={}){var d,y,u,_,w,T;const a=C(e.lang),s=a.regions[t]??t,r=((d=a.zoneWhy)==null?void 0:d[t])??"",i=Number(((y=e.scores)==null?void 0:y[t])??0).toFixed(1),o=((u=a.zoneExercises)==null?void 0:u[t])??[],b=o.length>0?o.map(p=>`
                  <li class="bb-zone-drawer__exercise">
                    <p class="bb-zone-drawer__exercise-title">${E(p.title)}</p>
                    <p class="bb-zone-drawer__exercise-body">${E(p.body)}</p>
                    ${p.exerciseId!=null?`<button type="button" class="bb-zone-drawer__ex-open" data-open-exercise="${Number(p.exerciseId)}">${E(a.zoneOpenFullExercise)}</button>`:""}
                  </li>`).join(""):`<li class="bb-zone-drawer__exercise"><p class="bb-zone-drawer__exercise-body">${E(a.zoneExercisePlaceholder)}</p></li>`,l=document.createElement("div");l.className="bb-zone-drawer-host",l.innerHTML=`
    <div class="bb-zone-drawer-backdrop" data-close="1" aria-hidden="true"></div>
    <aside class="bb-zone-drawer glass" role="dialog" aria-modal="true" aria-labelledby="bb-zone-drawer-title">
      <header class="bb-zone-drawer__header">
        <div>
          <p class="bb-zone-drawer__eyebrow">${E(a.interactiveBrainKicker)}</p>
          <h2 id="bb-zone-drawer-title" class="bb-zone-drawer__title">${E(s)}</h2>
        </div>
        <button type="button" class="bb-zone-drawer__close" data-close="1" aria-label="${E(a.zoneDrawerCloseAria)}">
          <span aria-hidden="true">×</span>
        </button>
      </header>
      <div class="bb-zone-drawer__body">
        <div class="bb-zone-drawer__meter">
          <div class="bb-zone-drawer__meter-row">
            <span class="bb-zone-drawer__meter-label">${E(a.zoneCurrentLevel)}</span>
            <span class="bb-zone-drawer__meter-value">${E(i)}%</span>
          </div>
          ${Re()}
        </div>
        <div class="bb-zone-drawer__why">
          <p class="bb-zone-drawer__why-title">${E(a.zoneWhyTitle)}</p>
          <p class="bb-zone-drawer__why-text">${E(r)}</p>
        </div>
        <div class="bb-zone-drawer__actions" data-paid-block="${e.paid?"1":"0"}">
          ${e.paid?`
            <div class="bb-zone-drawer__paid-menu">
              <button type="button" class="bb-zone-drawer__btn bb-zone-drawer__btn--ghost" data-go="history">
                ${E(a.zoneOpenHistory)}
              </button>
              <button type="button" class="bb-zone-drawer__btn bb-zone-drawer__btn--ghost" data-toggle="exercises">
                ${E(a.zoneExercisesHeading)}
              </button>
            </div>
            <div class="bb-zone-drawer__exercises" data-exercises hidden>
              <p class="bb-zone-drawer__exercises-cap">${E(a.zoneExerciseListCap)}</p>
              <ul class="bb-zone-drawer__exercise-list">
                ${b}
              </ul>
            </div>
            <p class="bb-zone-drawer__paid-hint">${E(a.zonePaidHint)}</p>
            <button type="button" class="bb-zone-drawer__btn bb-zone-drawer__btn--ghost bb-zone-drawer__btn--compact" data-scroll-zone="${t}">
              ${E(a.zoneReadMoreDetail)}
            </button>`:`
            <p class="bb-zone-drawer__lock-note">${E(a.zoneUnlockNote)}</p>
            <button type="button" class="bb-zone-drawer__btn bb-zone-drawer__btn--primary" data-go="boost">
              ${E(a.zoneBoostCta)}
            </button>
            <button type="button" class="bb-zone-drawer__btn bb-zone-drawer__btn--ghost bb-zone-drawer__btn--compact" data-scroll-zone="${t}">
              ${E(a.zoneReadMoreDetail)}
            </button>`}
        </div>
      </div>
    </aside>
  `,document.body.appendChild(l),document.body.classList.add("bb-zone-drawer-open");const k=l.querySelector(".bb-zone-drawer"),c=l.querySelector("[data-exercises]"),h=l.querySelector(".bb-zone-drawer-backdrop"),g=l.querySelector(".bb-zone-drawer__bar-fill"),v=()=>{var p;document.removeEventListener("keydown",m),document.body.classList.remove("bb-zone-drawer-open"),l.remove(),(p=n.onClose)==null||p.call(n)},m=p=>{p.key==="Escape"&&v()};return document.addEventListener("keydown",m),l.querySelectorAll("[data-close]").forEach(p=>{p.addEventListener("click",()=>{S(),v()})}),(_=l.querySelector('[data-go="boost"]'))==null||_.addEventListener("click",()=>{S(),e.tributeUrl?U(e.tributeUrl):M("premium"),v()}),(w=l.querySelector('[data-go="history"]'))==null||w.addEventListener("click",()=>{S(),M("history",{zone:t}),v()}),(T=l.querySelector('[data-toggle="exercises"]'))==null||T.addEventListener("click",()=>{if(S(),!c)return;c.hasAttribute("hidden")?c.removeAttribute("hidden"):c.setAttribute("hidden","")}),l.querySelectorAll("[data-scroll-zone]").forEach(p=>{p.addEventListener("click",()=>{S();const H=p.getAttribute("data-scroll-zone")||t;v(),requestAnimationFrame(()=>{var z;(z=document.getElementById(`zone-${H}`))==null||z.scrollIntoView({behavior:"smooth",block:"start"})})})}),l.querySelectorAll("[data-open-exercise]").forEach(p=>{p.addEventListener("click",()=>{S();const H=p.getAttribute("data-open-exercise")||"1";v(),M("exercise",{id:H})})}),requestAnimationFrame(()=>{if(k==null||k.classList.add("is-open"),h==null||h.classList.add("is-open"),g){const p=Math.max(0,Math.min(100,Number(i)||0));g.style.width="0%",requestAnimationFrame(()=>{g.style.width=`${p.toFixed(1)}%`})}}),{close:()=>{v()}}}function B(e){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}function je(e,{displayName:t,neuroScore:n,connectivity:a}){const s=(a==null?void 0:a.length)>0?`
    <div class="bb-connectivity glass rounded-2xl p-4 mt-5">
      <p class="bb-connectivity__title">${B(e.connectivityTitle)}</p>
      ${a.map(r=>`<p>• ${B(r)}</p>`).join(`
      `)}
    </div>`:"";return`
<section class="bb-section bb-cover" data-section="cover">
  <img src="${Te}" alt="" class="cover-full-brain-hero mb-4" width="360" height="260" decoding="async" />
  <div class="glass rounded-3xl p-6 sm:p-8 cover-neon-card border border-cyan-500/20">
    <p class="text-center text-sm uppercase tracking-[0.35em] text-cyan-200 mt-1 font-semibold drop-shadow-[0_0_16px_rgba(34,211,238,0.55)] bb-cover__kicker">
      ${B(e.heroBrain)}
    </p>
    <h1 class="text-center text-2xl sm:text-3xl font-bold mt-5 text-white drop-shadow-[0_0_20px_rgba(167,139,250,0.25)] neon-zone-title">
      ${B(t)}
    </h1>
    <p class="text-center text-slate-300/95 mt-3 text-[15px] leading-relaxed max-w-md mx-auto tracking-wide px-2">
      ${B(e.coverLine)}
    </p>
    <div class="mt-8 flex flex-col items-center justify-center">
      <p class="bb-cover__score-label text-cyan-100/90 text-sm mb-2 font-medium tracking-wide drop-shadow-[0_0_10px_rgba(34,211,238,0.35)]">
        ${B(e.scoreLabel)}
      </p>
      <div class="text-6xl sm:text-7xl font-black bg-gradient-to-r from-cyan-200 via-violet-300 to-fuchsia-300 bg-clip-text text-transparent neon-score-cover" data-neuro-score>
        ${Number(n).toFixed(1)}
      </div>
    </div>
    ${s}
  </div>
  <p class="text-center text-[11px] text-slate-500 mt-6">${B(e.footer)}</p>
</section>`}function Q({label:e,value:t,glow:n=!1}){const a=Math.max(0,Math.min(100,Number(t)||0)),s=Math.max(0,100-a),r=n?"pdf-bar-gradient pdf-bar-gradient--main":"pdf-bar-gradient pdf-bar-gradient--sub",i=Ue(e);return[`<div class="mb-3.5" data-bar-value="${a}">`,'<div class="flex justify-between text-xs text-slate-400 mb-1">',`<span>${i}</span>`,`<span class="text-cyan-100 font-bold tracking-wide">${a.toFixed(1)}%</span>`,"</div>",'<div class="pdf-bar-track">',`<div class="${r}" style="clip-path: inset(0 ${s.toFixed(2)}% 0 0);"></div>`,"</div>","</div>"].join(`
  `)}function Ue(e){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}function I(e){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}function We(e,t,n){const a=e.regions[t]??t,s=ke[t],r=Number(n.main??0),i=e.progressMain(`${r.toFixed(1)}`),o=[Q({label:e.zoneLevel,value:r,glow:!0}),...(n.submetrics??[]).map(l=>Q({label:l.label,value:l.value,glow:!1}))].join(`
`),b=(n.bullets??[]).map(l=>`<li>${I(l)}</li>`).join(`
        `);return`
<section class="bb-section bb-region" data-section="region" data-region="${t}" id="zone-${t}">
  <button type="button" class="bb-region__illu-hit" data-open-zone="${t}" aria-label="${I(a)} — ${I(e.zoneIllustrationOpenAria)}">
    <img src="${s}" alt="" class="brain-float-top bb-region__illu" width="320" height="220" loading="lazy" decoding="async" />
  </button>
  <h2 class="bb-region__title neon-zone-title px-2">${I(a)}</h2>
  <p class="bb-region__progress-label">${I(i)}</p>
  <div class="glass rounded-2xl p-4 max-w-xl mx-auto w-full">
    ${o}
  </div>
  <div class="glass rounded-2xl p-4 mt-4 max-w-xl mx-auto w-full">
    <p class="bb-rec-title">${I(e.recTitle)}</p>
    <ul class="bb-rec-list">
        ${b}
    </ul>
  </div>
</section>`}function Ge(e,t,n){const a=C(t.lang),s=t.userDisplayName||(t.lang==="en"?"Guest":"Гость"),r=[je(a,{displayName:s,neuroScore:t.neuroScore,connectivity:t.connectivity}),...P.map(i=>{var o,b;return We(a,i,{main:t.scores[i],bullets:((o=t.regions[i])==null?void 0:o.bullets)??[],submetrics:((b=t.regions[i])==null?void 0:b.submetrics)??[]})})];e.innerHTML=r.join(`
`),Ye(e),Xe(e),Ze(e),Ve(e,t,n)}function Ve(e,t,n){var o,b;const a=e.querySelectorAll("[data-open-zone]");if(!a.length)return;const s=l=>{e.querySelectorAll(".bb-region").forEach(k=>{const c=k.dataset.region;k.classList.toggle("is-zone-hot",!!l&&c===l)})},r=l=>{!l||!P.includes(l)||(s(l),Oe(t,l,{onClose:()=>s(null)}))};a.forEach(l=>{l.addEventListener("pointerenter",()=>s(l.getAttribute("data-open-zone")||"")),l.addEventListener("pointerleave",k=>{const c=k.relatedTarget;c instanceof Node&&e.contains(c)&&c.closest("[data-open-zone]")||s(null)}),l.addEventListener("click",k=>{k.preventDefault();const c=l.getAttribute("data-open-zone");c&&(S(),r(c))})});const i=(b=(o=n==null?void 0:n.params)==null?void 0:o.get)==null?void 0:b.call(o,"zone");i&&P.includes(i)&&requestAnimationFrame(()=>r(i))}function Ye(e){const t=e.querySelectorAll(".bb-section"),n=new IntersectionObserver(a=>{for(const s of a)s.isIntersecting&&(s.target.classList.add("is-visible"),n.unobserve(s.target))},{root:null,rootMargin:"0px 0px -8% 0px",threshold:.08});t.forEach(a=>n.observe(a))}function Xe(e){const t=e.querySelector("[data-neuro-score]");if(!t)return;const n=parseFloat(t.textContent||"0"),a=1200,s=performance.now(),r=i=>{const o=Math.min(1,(i-s)/a),b=1-(1-o)**3;t.textContent=(n*b).toFixed(1),o<1&&requestAnimationFrame(r)};requestAnimationFrame(r)}function Ze(e){const t=e.querySelectorAll("[data-bar-value]"),n=new IntersectionObserver(a=>{for(const s of a){if(!s.isIntersecting)continue;const r=s.target,i=parseFloat(r.getAttribute("data-bar-value")||"0"),o=r.querySelector(".pdf-bar-gradient");o&&(o.style.clipPath="inset(0 100% 0 0)",requestAnimationFrame(()=>{o.style.clipPath=`inset(0 ${Math.max(0,100-i).toFixed(2)}% 0 0)`})),n.unobserve(r)}},{threshold:.2});t.forEach(a=>n.observe(a))}function f(e){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}function Je(){return{instruction:'<svg class="ex-ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.25" aria-hidden="true"><path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01"/></svg>',research:'<svg class="ex-ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.25" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3M11 8v6M8 11h6"/></svg>',amplify:'<svg class="ex-ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.25" aria-hidden="true"><path d="M12 3l1.8 5.5h5.7l-4.6 3.4 1.8 5.5-4.7-3.4-4.7 3.4 1.8-5.5-4.6-3.4h5.7L12 3z"/></svg>',results:'<svg class="ex-ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.25" aria-hidden="true"><path d="M4 19V5M9 19v-6M14 19V9M19 19v-9"/><path d="M4 19h16" stroke-linecap="round"/></svg>'}}function Y(e){return String(e||"").split(`
`).map(n=>`<p>${f(n)}</p>`).join("")}function Qe(e){e.querySelectorAll(".ex-acc").forEach(t=>{const n=t.querySelector(".ex-acc__trigger");n&&n.addEventListener("click",()=>{const s=!(t.getAttribute("data-open")==="true");t.setAttribute("data-open",String(s)),n.setAttribute("aria-expanded",String(s)),S()})})}function O(e){requestAnimationFrame(()=>{var t;(t=e.querySelector(".ex-lux"))==null||t.classList.add("is-visible")})}async function Ke(e,t,n,a){var v,m;const s=C(n.lang),r=Je();e.className="bb-root bb-root--spa bb-root--exercise",e.innerHTML=`
    <div class="ex-lux">
      <div class="ex-lux__grid-bg" aria-hidden="true"></div>
      <header class="ex-lux__top">
        <button type="button" class="ex-lux__back" id="ex-back" aria-label="${f(s.exerciseBackAria)}">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M15 6l-6 6 6 6"/></svg>
        </button>
      </header>
      <div class="ex-lux__scroll">
        <div class="ex-lux__inner">
          <div class="ex-lux__loading">
            <div class="ex-lux__pulse"></div>
            <p>${f(s.exerciseLoading)}</p>
          </div>
        </div>
      </div>
      <div class="ex-lux__cta-bar">
        <button type="button" class="ex-lux__cta" id="ex-cta">${f(s.exerciseCtaPrimary)}</button>
      </div>
    </div>`;const i=e.querySelector("#ex-back");if(i==null||i.addEventListener("click",()=>{S(),M("map")}),!Number.isFinite(a)||a<1){const d=e.querySelector(".ex-lux__scroll .ex-lux__inner");d&&(d.innerHTML=`<p class="ex-lux__err">${f(s.exerciseNotFound)}</p>`),O(e);return}if(!n.paid){e.querySelector(".ex-lux__scroll .ex-lux__inner").innerHTML=`
      <div class="ex-lux__hero">
        <p class="ex-lux__lock-title">${f(s.exercisePremiumTitle)}</p>
        <p class="ex-lux__lock-text">${f(s.exercisePremiumText)}</p>
        <button type="button" class="ex-lux__cta ex-lux__cta--inline" id="ex-unlock">${f(s.premiumCta)}</button>
      </div>`,(v=e.querySelector("#ex-unlock"))==null||v.addEventListener("click",()=>{S(),n.tributeUrl?U(n.tributeUrl):M("premium")}),e.querySelector("#ex-cta").textContent=s.premiumCta,(m=e.querySelector("#ex-cta"))==null||m.addEventListener("click",()=>{S(),n.tributeUrl?U(n.tributeUrl):M("premium")}),O(e);return}let o;try{o=await He(t,a)}catch(d){const y=e.querySelector(".ex-lux__scroll .ex-lux__inner"),u=(d==null?void 0:d.status)===403?s.exercisePremiumTitle:(d==null?void 0:d.status)===404?s.exerciseNotFound:s.errorLoad;y&&(y.innerHTML=`<p class="ex-lux__err">${f(u)}</p>`),O(e);return}const b=Math.max(0,Math.min(4,(o.effectiveness||3)-1)),l=s.exerciseEfficiencyLabels[b]??"—",k=(o.regions||[]).map(d=>`<span class="ex-lux__pill">${f(s.regions[d]??d)}</span>`).join(""),c=(o.researchLinks||[]).map(d=>`<a class="ex-lux__link" href="${f(d.url)}" target="_blank" rel="noopener noreferrer">${f(d.label||d.url)}</a>`).join(""),h=o.instructionImageUrl?`<figure class="ex-lux__figure"><img src="${f(o.instructionImageUrl)}" alt="" loading="lazy" decoding="async" /></figure>`:"";e.querySelector(".ex-lux__scroll .ex-lux__inner").innerHTML=`
    <div class="ex-lux__hero">
      <div class="ex-lux__emoji" aria-hidden="true">${f(o.emoji||"◆")}</div>
      <h1 class="ex-lux__title">${f(o.title)}</h1>
      <p class="ex-lux__lede">${f(o.shortDescription)}</p>
      <div class="ex-lux__tags">
        <span class="ex-lux__tag"><span class="ex-lux__tag-k">${f(s.exerciseTagForWho)}</span>${f(o.forWho)}</span>
        <span class="ex-lux__tag"><span class="ex-lux__tag-k">${f(s.exerciseTagEfficiency)}</span>${f(l)}</span>
        <span class="ex-lux__tag"><span class="ex-lux__tag-k">${f(s.exerciseTagFirstResult)}</span>${f(s.exerciseFirstResultDays(o.firstResultDays))}</span>
      </div>
      <div class="ex-lux__meta-row">
        <div class="ex-lux__diff">
          <span class="ex-lux__diff-label">${f(s.exerciseDifficulty)}</span>
          <div class="ex-lux__diff-track"><span class="ex-lux__diff-fill" style="width: ${Number(o.difficulty||0)}%"></span></div>
          <span class="ex-lux__diff-num">${f(Number(o.difficulty||0))}</span>
        </div>
      </div>
      <div class="ex-lux__pills">${k}</div>
      ${h}
    </div>

    <div class="ex-lux__accords">
      <div class="ex-acc" data-open="true">
        <button type="button" class="ex-acc__trigger" aria-expanded="true">
          <span class="ex-acc__ic">${r.instruction}</span>
          <span class="ex-acc__label">${f(s.exerciseAccInstruction)}</span>
          <span class="ex-acc__chev" aria-hidden="true"></span>
        </button>
        <div class="ex-acc__panel">
          <div class="ex-acc__panel-inner ex-lux__prose">${Y(o.instruction)}</div>
        </div>
      </div>
      <div class="ex-acc" data-open="false">
        <button type="button" class="ex-acc__trigger" aria-expanded="false">
          <span class="ex-acc__ic">${r.research}</span>
          <span class="ex-acc__label">${f(s.exerciseAccResearch)}</span>
          <span class="ex-acc__chev" aria-hidden="true"></span>
        </button>
        <div class="ex-acc__panel">
          <div class="ex-acc__panel-inner ex-lux__prose ex-lux__links">${c||`<p>${f(s.exerciseNoResearch)}</p>`}</div>
        </div>
      </div>
      <div class="ex-acc" data-open="false">
        <button type="button" class="ex-acc__trigger" aria-expanded="false">
          <span class="ex-acc__ic">${r.amplify}</span>
          <span class="ex-acc__label">${f(s.exerciseAccAmplify)}</span>
          <span class="ex-acc__chev" aria-hidden="true"></span>
        </button>
        <div class="ex-acc__panel">
          <div class="ex-acc__panel-inner ex-lux__prose">${Y(o.amplify)}</div>
        </div>
      </div>
      <div class="ex-acc" data-open="false">
        <button type="button" class="ex-acc__trigger" aria-expanded="false">
          <span class="ex-acc__ic">${r.results}</span>
          <span class="ex-acc__label">${f(s.exerciseAccResults)}</span>
          <span class="ex-acc__chev" aria-hidden="true"></span>
        </button>
        <div class="ex-acc__panel">
          <div class="ex-acc__panel-inner ex-lux__prose">${Y(o.expectedResults)}</div>
        </div>
      </div>
    </div>
    <div class="ex-lux__scroll-pad"></div>`,Qe(e);const g=e.querySelector("#ex-cta");g==null||g.addEventListener("click",()=>{var d,y,u;S(),(u=(y=(d=window.Telegram)==null?void 0:d.WebApp)==null?void 0:y.showAlert)==null||u.call(y,s.exerciseCtaMessage)}),O(e)}function j(e){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}function et(e,t){if(!e)return"—";try{return new Date(e).toLocaleString(t==="en"?"en-GB":"ru-RU",{day:"2-digit",month:"short",year:"numeric",hour:"2-digit",minute:"2-digit"})}catch{return e}}async function tt(e,t,n){var l,k;const a=C(n.lang),s=Z().params.get("zone"),r=document.createElement("section");r.className="bb-section is-visible bb-history",r.innerHTML=`
    <h2 class="bb-page-title bb-page-title--premium neon-zone-title">${j(a.historyTitle)}</h2>
    <p class="bb-page-sub text-slate-300/90 text-sm mb-4">${j(a.historySub)}</p>
  `;const i=document.createElement("div");i.className="space-y-3",i.textContent=a.loading,r.appendChild(i),e.replaceChildren(r);let o;try{o=await ze(t)}catch{i.innerHTML=`<p class="bb-error">${j(a.errorLoad)}</p>`;return}const b=o.items??[];if(i.replaceChildren(),!b.length){const c=document.createElement("div");c.className="glass rounded-2xl p-5 text-center";const h=document.createElement("p");h.className="text-slate-200 mb-4",h.textContent=a.historyEmpty;const g=document.createElement("button");g.type="button",g.className="bb-btn-primary",g.textContent=a.startTest,g.addEventListener("click",()=>M("test")),c.append(h,g),i.appendChild(c);return}for(const[c,h]of b.entries()){const g=document.createElement("article");g.className=`glass rounded-2xl p-4 bb-history-card${c===0?" is-active":""}`;const v=document.createElement("div");v.className="flex justify-between items-start gap-2 mb-2";const m=document.createElement("div");if(m.innerHTML=`
      <p class="text-xs text-cyan-200/80 uppercase tracking-wide">${j(et(h.createdAt,n.lang))}</p>
      <p class="text-lg font-bold text-white mt-1 bb-type-display">NeuroScore <span class="text-cyan-200">${Number(h.neuroScore).toFixed(1)}</span></p>
    `,v.appendChild(m),c===0){const u=document.createElement("span");u.className="bb-badge",u.textContent=a.latest,v.appendChild(u)}g.appendChild(v);const d=document.createElement("div");d.className="bb-history-deltas";for(const u of P){const _=a.regions[u]??u,w=Number(((l=h.scores)==null?void 0:l[u])??0).toFixed(1),T=h.isFirst?"—":((k=h.deltas)==null?void 0:k[u])??"·",p=document.createElement("div");p.className=`bb-history-row${s===u?" bb-history-row--focus":""}`;const H=document.createElement("span");H.textContent=_;const z=document.createElement("span");z.textContent=`${w}%`;const q=document.createElement("span");q.textContent=T,typeof T=="string"&&T.includes("↑")&&(q.className="bb-delta-up"),typeof T=="string"&&T.includes("↓")&&(q.className="bb-delta-down"),p.append(H,z,q),d.appendChild(p)}g.appendChild(d);const y=document.createElement("button");y.type="button",y.className="bb-btn-ghost mt-3 w-full",y.textContent=a.openThisMap,y.addEventListener("click",()=>M("map")),g.appendChild(y),i.appendChild(g)}s&&b.length&&requestAnimationFrame(()=>{var c;(c=r.querySelector(".bb-history-row--focus"))==null||c.scrollIntoView({block:"center",behavior:"smooth"})})}function F(e){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}function nt(e,t){var a;const n=C(t.lang);e.innerHTML=`
    <section class="bb-section is-visible bb-premium">
      <div class="mb-3 rounded-full px-5 py-1.5 border border-cyan-400/30 bg-cyan-500/10 text-xs font-bold uppercase tracking-[0.35em] text-cyan-100 text-center bb-type-display">
        ${F(n.premiumBadge)}
      </div>
      <h2 class="bb-page-title bb-page-title--premium neon-cta-title mb-4">
        ${F(n.premiumTitle)}
      </h2>
      <p class="text-slate-200 text-center text-sm leading-relaxed mb-6">${F(n.premiumSub)}</p>
      <ul class="bb-premium-list glass rounded-2xl p-5 mb-6 space-y-3 text-sm text-slate-200">
        ${n.premiumBullets.map(s=>`<li>${F(s)}</li>`).join("")}
      </ul>
      <button type="button" class="bb-btn-premium-buy w-full" id="bb-premium-buy">${F(n.premiumCta)}</button>
    </section>
  `,(a=e.querySelector("#bb-premium-buy"))==null||a.addEventListener("click",()=>{S(),t.tributeUrl&&U(t.tributeUrl)})}function A(e){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}async function at(e,t,n,{onProfile:a}={}){const s=C(n.lang),r={variant:n.testVariant||"development",questions:[],answers:{},step:0},i=document.createElement("section");i.className="bb-section is-visible bb-test",e.replaceChildren(i);async function o(){i.innerHTML=`<p class="text-cyan-200/80 text-sm">${A(s.loading)}</p>`;try{const c=await Me(t,r.variant);r.questions=c.questions??[],r.step=0,r.answers={},l()}catch{i.innerHTML=`<p class="bb-error">${A(s.errorLoad)}</p>`}}function b(){i.innerHTML=`
      <div class="bb-test-pick">
        <div class="bb-test-pick__glow" aria-hidden="true"></div>
        <h2 class="bb-page-title bb-page-title--premium neon-zone-title">${A(s.testTitle)}</h2>
        <p class="bb-page-sub text-slate-300/90 text-sm mb-1 leading-relaxed">${A(s.testPickVariant)}</p>
        <div class="bb-test-variant-grid">
          <button type="button" class="bb-btn-hero" data-variant="sexual">
            <span class="bb-btn-hero__badge">${A(s.variantSexBadge)}</span>
            <span class="bb-btn-hero__label">${A(s.variantSex)}</span>
            <span class="bb-btn-hero__hint">${A(s.variantSexHint)}</span>
          </button>
          <button type="button" class="bb-btn-alt" data-variant="development">
            <span class="bb-btn-alt__label">${A(s.variantDev)}</span>
            <span class="bb-btn-alt__hint">${A(s.variantDevHint)}</span>
          </button>
        </div>
      </div>
    `,i.querySelectorAll("[data-variant]").forEach(c=>{c.addEventListener("click",()=>{S(),r.variant=c.getAttribute("data-variant")||"development",o()})})}function l(){const c=r.questions[r.step];if(!c){b();return}const h=r.questions.length,g=(r.step+1)/h*100;i.innerHTML=`
      <div class="bb-test-progress mb-4">
        <div class="flex justify-between text-xs text-cyan-200/80 mb-1">
          <span>${A(s.questionProgress(r.step+1,h))}</span>
          <span>${Math.round(g)}%</span>
        </div>
        <div class="pdf-bar-track"><div class="pdf-bar-gradient pdf-bar-gradient--main" style="clip-path: inset(0 ${(100-g).toFixed(1)}% 0 0)"></div></div>
      </div>
      <h2 class="bb-test-q-title">${A(c.topic)}</h2>
      <p class="text-slate-200 mb-4 leading-relaxed">${A(c.text)}</p>
      <div class="grid gap-2 bb-test-options" id="bb-test-options"></div>
    `;const v=i.querySelector("#bb-test-options");for(const m of c.options??[]){const d=document.createElement("button");d.type="button",d.className="bb-test-option",d.innerHTML=`<span class="bb-test-option-key">${A(m.key)}</span><span>${A(m.label)}</span>`,d.addEventListener("click",()=>k(m.key)),v.appendChild(d)}}async function k(c){S();const h=r.questions[r.step];if(r.answers[h.id]=c,r.step+1<r.questions.length){r.step+=1,l();return}i.innerHTML=`
      <div class="bb-loading">
        <div class="bb-loading__pulse"></div>
        <p class="text-sm text-cyan-200/80">${A(s.computing)}</p>
      </div>`;try{const g={};for(const[m,d]of Object.entries(r.answers))g[String(m)]=d;const v=await Ce(t,{variant:r.variant,answers:g});a&&a(v),M("map")}catch{i.innerHTML=`<p class="bb-error">${A(s.errorLoad)}</p>`}}b()}let x=null,L=null;function st(e){const t=document.getElementById("bb-nav");t&&t.querySelectorAll(".bb-nav__btn[data-route]").forEach(n=>{n.classList.toggle("is-active",n.dataset.route===e)})}function rt(e){if(!x)return;const t=e==="en"?"en":"ru";if(x.lang===t)return;x.lang=t,document.documentElement.lang=t;const n=C(t),a=document.getElementById("bb-header-wordmark");a&&(a.textContent=n.appBrandName),de(t)}function D(e){e!=null&&e.lang&&rt(e.lang)}function it(e){var a;if((a=document.querySelector(".bb-premium-fab"))==null||a.remove(),e.paid||!e.tributeUrl)return;const t=C((x==null?void 0:x.lang)||e.lang),n=document.createElement("button");n.type="button",n.className="bb-premium-fab",n.textContent=t.premiumCta,n.addEventListener("click",()=>{S(),M("premium")}),document.body.appendChild(n)}function de(e){var s;const t=document.getElementById("bb-nav");if(!t)return;const n=C(e);t.hidden=!1;const a=x!=null&&x.siteToken?`<button type="button" class="bb-nav__btn bb-nav__btn--logout" data-site-logout>${n.navLogout}</button>`:"";t.innerHTML=`
    <button type="button" class="bb-nav__btn" data-route="map">${n.navMap}</button>
    <button type="button" class="bb-nav__btn" data-route="history">${n.navHistory}</button>
    <button type="button" class="bb-nav__btn" data-route="test">${n.navTest}</button>
    <button type="button" class="bb-nav__btn" data-route="premium">${n.navPremium}</button>
    ${a}
  `,t.querySelectorAll(".bb-nav__btn[data-route]").forEach(r=>{r.addEventListener("click",()=>{S(),M(r.dataset.route||"map")})}),(s=t.querySelector("[data-site-logout]"))==null||s.addEventListener("click",()=>{S();try{localStorage.removeItem(G),localStorage.removeItem(V)}catch{}window.location.replace("/")})}async function K(e){var s,r;const t=document.getElementById("bb-root");if(!t||!x)return;const n=document.getElementById("bb-nav"),a=e.name==="exercise";if(document.body.classList.toggle("bb-route-exercise",a),n&&(n.hidden=a),a||st(e.name),e.name!=="map"&&((s=document.querySelector(".bb-premium-fab"))==null||s.remove()),e.name==="premium"){L||(L=await R(x),D(L)),nt(t,L);return}if(e.name==="test"){L||(L=await R(x),D(L)),await at(t,x,L,{onProfile:i=>{L=i,D(i)}});return}if(e.name==="history"){L||(L=await R(x),D(L)),await tt(t,x,L);return}if(!L){const i=C(x.lang);t.innerHTML=`
      <div class="bb-loading">
        <div class="bb-loading__pulse"></div>
        <p class="text-sm text-cyan-200/80">${i.loading}</p>
      </div>`;try{L=await R(x),D(L),(r=x.user)!=null&&r.first_name&&!L.userDisplayName&&(L.userDisplayName=[x.user.first_name,x.user.last_name].filter(Boolean).join(" "))}catch(o){if((o==null?void 0:o.status)===401&&(o==null?void 0:o.detail)==="invalid_site_token"&&(x!=null&&x.siteToken)){try{localStorage.removeItem(G),localStorage.removeItem(V)}catch{}window.location.replace("/");return}const b=(o==null?void 0:o.status)===403?i.notRegistered:(o==null?void 0:o.status)===401?i.authError:i.errorLoad;t.innerHTML=`<p class="bb-error">${b}</p>`;return}}if(e.name==="exercise"){const i=parseInt(e.params.get("id")||"0",10);await Ke(t,x,L,i);return}if(!L.hasMap&&e.name==="map"){M("test");return}Ge(t,L,e),it(L)}async function ee(e){const t=e.lang==="en"?"en":"ru";x={initData:e.initData??"",user:e.user??null,lang:t,siteToken:e.siteToken??""},L=null,document.body.classList.add("bb-app--telegram"),x.siteToken&&document.body.classList.add("bb-app--site");const n=document.getElementById("bb-root");if(!n)return;n.classList.add("bb-root--spa");const a=C(x.lang),s=document.getElementById("bb-header-wordmark");s&&(s.textContent=a.appBrandName),de(x.lang),Ie(i=>{K(i).catch(()=>{})}),Fe();const r=Z();window.location.hash?await K(r):M("map")}const te="/assets/full-glowing-brain-Cl127Rfm.png",ne=.088,ae=15,se=2,re=.4;function W(e,t,n){return Math.max(t,Math.min(n,e))}function ot(){var e,t;return((t=(e=window.matchMedia)==null?void 0:e.call(window,"(prefers-reduced-motion: reduce)"))==null?void 0:t.matches)??!1}function lt(e,t,n){const a=e.getBoundingClientRect(),s=80,r=Math.max(a.width+s*2,1),i=Math.max(a.height+s*2,1),o=a.left+a.width/2,b=a.top+a.height/2;return{nx:W((t-o)/(r*.5),-1,1),ny:W((n-b)/(i*.5),-1,1)}}function ct(e){var u,_;if(ot())return()=>{};const t=e.querySelector("[data-parallax-brain]"),n=e.querySelector("[data-parallax-glow]");if(!t)return()=>{};let a={nx:0,ny:0},s=!1,r={nx:0,ny:0},i=!1,o=0,b=0,l=0;const k=((_=(u=window.matchMedia)==null?void 0:u.call(window,"(pointer: coarse)"))==null?void 0:_.matches)??!1,c=()=>s?{tx:a.nx,ty:a.ny}:i?{tx:r.nx*.62,ty:r.ny*.62}:{tx:0,ty:0},h=()=>{l=0;const{tx:w,ty:T}=c();o+=(w-o)*ne,b+=(T-b)*ne;const p=o*ae,H=b*ae,z=b*-se,q=o*se;if(t.style.transform=`translate3d(${p}px, ${H}px, 0) rotateX(${z}deg) rotateY(${q}deg)`,n){const he=-p*re,fe=-H*re;n.style.transform=`translate3d(calc(-50% + ${he}px), calc(-50% + ${fe}px), 0) scale(1.06)`}const{tx:be,ty:pe}=c(),ge=Math.abs(o-be)>.003||Math.abs(b-pe)>.003,me=Math.abs(o)>.004||Math.abs(b)>.004;(ge||me||i)&&(l=requestAnimationFrame(h))},g=()=>{l||(l=requestAnimationFrame(h))},v=w=>{if(!w.isTrusted)return;const{nx:T,ny:p}=lt(e,w.clientX,w.clientY);a={nx:T,ny:p},s=!0,g()},m=()=>{s=!0},d=()=>{s=!1,g()};e.addEventListener("pointermove",v,{passive:!0}),e.addEventListener("pointerenter",m),e.addEventListener("pointerleave",d),e.addEventListener("pointerdown",()=>{k&&typeof(DeviceOrientationEvent==null?void 0:DeviceOrientationEvent.requestPermission)=="function"&&DeviceOrientationEvent.requestPermission().then(w=>{w==="granted"&&(i=!0)}).catch(()=>{})},{passive:!0});let y=null;return window.DeviceOrientationEvent&&(y=w=>{if(w.gamma==null||w.beta==null)return;const T=W(w.gamma/32,-1,1),p=W((w.beta-44)/36,-1,1);r={nx:T,ny:p},i=!0,g()},window.addEventListener("deviceorientation",y,!0)),t.style.willChange="transform",n&&(n.style.willChange="transform"),g(),()=>{e.removeEventListener("pointermove",v),e.removeEventListener("pointerenter",m),e.removeEventListener("pointerleave",d),y&&window.removeEventListener("deviceorientation",y,!0),l&&cancelAnimationFrame(l),t.style.willChange="",t.style.transform="",n&&(n.style.willChange="",n.style.transform="")}}const dt={root:null,rootMargin:"0px 0px -10% 0px",threshold:.08};function ut(e,{reducedMotion:t}){if(t)return e.querySelectorAll(".bb-landing-reveal").forEach(s=>s.classList.add("is-in-view")),()=>{};const n=e.querySelectorAll(".bb-landing-reveal");if(!n.length)return()=>{};const a=new IntersectionObserver(s=>{for(const r of s)r.isIntersecting&&(r.target.classList.add("is-in-view"),a.unobserve(r.target))},dt);return n.forEach(s=>a.observe(s)),()=>{a.disconnect()}}function $(e){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}const ue="bb-landing-lang";function bt(){try{const e=localStorage.getItem(ue);if(e==="en"||e==="ru")return e}catch{}return null}function pt(e){document.body.classList.add("bb-lang-gate-open");const t=document.createElement("div");t.className="bb-lang-gate",t.setAttribute("role","dialog"),t.setAttribute("aria-modal","true"),t.setAttribute("aria-labelledby","bb-lang-gate-title"),t.innerHTML=`
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
  `,document.body.appendChild(t);const n=a=>{try{localStorage.setItem(ue,a)}catch{}document.body.classList.remove("bb-lang-gate-open"),t.remove(),e(a)};t.querySelectorAll("[data-lang]").forEach(a=>{a.addEventListener("click",()=>n(a.getAttribute("data-lang")||"ru"))}),requestAnimationFrame(()=>{var a;(a=t.querySelector(".bb-lang-gate__btn"))==null||a.focus()})}async function gt(){const e=document.getElementById("bb-header"),t=document.getElementById("bb-nav");e&&(e.hidden=!0),t&&(t.hidden=!0);const n=document.getElementById("bb-root");if(!n)return;const a=bt();if(!a){n.className="bb-root",n.innerHTML="",pt(s=>{ie(s).catch(()=>{})});return}await ie(a)}async function ie(e){const t=C(e);document.documentElement.lang=e;const n=document.getElementById("bb-root");if(!n)return;n.className="bb-root bb-root--landing",n.innerHTML=`
    <div class="bb-loading">
      <div class="bb-loading__pulse"></div>
    </div>`;let a={botUrl:"https://t.me/brainboosty?start=site",webappEntryUrl:"https://t.me/brainboosty?start=webapp",channelUrl:"https://t.me/androgenautist",hasAuthorPhoto:!1,hasChannelAvatar:!1,neuralMapHubUrl:"/#hub-login",hubHostDisplay:"neuralmap.brainboosty.app"};try{a={...a,...await Ae()}}catch{}const s="/api/webapp/landing/photo",r=t.landingFeatures.map(u=>`<li>${$(u)}</li>`).join(""),i=window.matchMedia("(prefers-reduced-motion: reduce)").matches;n.innerHTML=`
    <div class="bb-landing">
      <header id="top" class="bb-landing-hero">
        <div class="bb-landing-hero__visual-anchor">
          <div class="bb-landing-hero__glow" aria-hidden="true" data-parallax-glow></div>
          <div class="bb-landing-hero__brain-layer" data-parallax-brain>
            <img class="bb-landing-hero__brain" src="${te}" alt="" width="280" height="280" decoding="async" />
          </div>
        </div>
        <div class="bb-landing-hero__copy bb-landing-reveal">
        <p class="bb-landing-kicker">${$(t.landingKicker)}</p>
        <h1 class="bb-landing-title neon-zone-title">${$(t.landingTitle)}</h1>
        <p class="bb-landing-tagline">${$(t.landingTagline)}</p>
        <div class="bb-landing-hero__ctas">
          <a class="bb-landing-cta-primary" href="${$(a.botUrl)}" rel="noopener noreferrer">
            ${$(t.landingCta)}
          </a>
          <button type="button" class="bb-landing-cta-secondary" data-start-site-login>
            ${$(t.landingLoginTelegram)}
          </button>
        </div>
        <p class="bb-landing-cta-sub">${$(t.landingCtaSub)}</p>
        </div>
      </header>

      <section id="about" class="bb-landing-section bb-landing-reveal">
        <h2 class="bb-landing-section__title">${$(t.landingAboutTitle)}</h2>
        <article class="bb-landing-about glass bb-landing-hover-rise">
          <div class="bb-landing-about__photo-wrap">
            <img class="bb-landing-about__photo" src="${s}" alt="" width="320" height="320" loading="lazy" data-fallback-src="${te}" />
            <div class="bb-landing-about__ring" aria-hidden="true"></div>
          </div>
          <div class="bb-landing-about__text">
            ${t.landingAboutParagraphs.map(u=>`<p>${$(u)}</p>`).join("")}
            <a class="bb-landing-link" href="${$(a.channelUrl)}" target="_blank" rel="noopener noreferrer">
              ${$(t.landingChannelLink)}
            </a>
          </div>
        </article>
      </section>

      <section id="project" class="bb-landing-section bb-landing-reveal">
        <h2 class="bb-landing-section__title">${$(t.landingProjectTitle)}</h2>
        <ul class="bb-landing-features">${r}</ul>
        <p class="bb-landing-disclaimer">${$(t.footer)}</p>
      </section>

      <section id="hub-login" class="bb-landing-section bb-landing-hub bb-landing-reveal">
        <p class="bb-landing-hub__domain" translate="no">${$(a.hubHostDisplay)}</p>
        <h2 class="bb-landing-section__title bb-landing-hub__title">${$(t.landingHubTitle)}</h2>
        <p class="bb-landing-hub__lead">${$(t.landingHubLead)}</p>
        <p class="bb-landing-hub__hint">${$(t.landingHubHint)}</p>
        <div class="bb-landing-hub__card glass bb-landing-hover-rise">
          <button type="button" class="bb-landing-hub__start" data-start-site-login>${$(t.landingHubStartLogin)}</button>
          <p class="bb-landing-hub__status" hidden></p>
        </div>
      </section>

      <section id="start" class="bb-landing-section bb-landing-final bb-landing-reveal">
        <div class="glass bb-landing-final__card bb-landing-hover-rise">
          <h2 class="bb-landing-final__title">${$(t.landingFinalTitle)}</h2>
          <p class="bb-landing-final__sub">${$(t.landingFinalSub)}</p>
          <a class="bb-landing-cta-primary bb-landing-cta-primary--lg" href="${$(a.botUrl)}" rel="noopener noreferrer">
            ${$(t.landingCta)}
          </a>
        </div>
      </section>

      <footer class="bb-landing-footer">
        <span>BrainBoosty · Neural Map</span>
      </footer>
    </div>
  `,n.querySelectorAll(".bb-landing-about__photo").forEach(u=>{const _=u.getAttribute("data-fallback-src");_&&u.addEventListener("error",()=>{u.removeAttribute("data-fallback-src"),u.src=_})}),n.querySelectorAll('a[href^="#"]').forEach(u=>{u.addEventListener("click",_=>{var p;const w=(p=u.getAttribute("href"))==null?void 0:p.slice(1);if(!w)return;const T=document.getElementById(w);T&&(_.preventDefault(),T.scrollIntoView({behavior:"smooth",block:"start"}))})});const o=n.querySelector(".bb-landing"),b=ut(o||n,{reducedMotion:i}),l=n.querySelector(".bb-landing-hero"),k=l?ct(l):()=>{};let c=null;const h=()=>{c!=null&&(clearInterval(c),c=null)},g=()=>{h(),b(),k(),window.removeEventListener("pagehide",g)};window.addEventListener("pagehide",g);const v=n.querySelectorAll("[data-start-site-login]"),m=n.querySelector(".bb-landing-hub__status"),d=u=>{v.forEach(_=>{_.disabled=u})},y=u=>{const _=window.open("about:blank","_blank");return _?(_.location.href=u,!0):!1};v.forEach(u=>{u.addEventListener("click",async()=>{var w;const _=C(e);h(),(w=document.getElementById("hub-login"))==null||w.scrollIntoView({behavior:"smooth",block:"start"}),d(!0),m&&(m.hidden=!1,m.textContent=_.landingHubPrepare);try{const T=await Ne();if(!y(T.telegramLink)){h(),d(!1),m&&(m.hidden=!1,m.textContent=_.landingHubPopupBlocked);return}m&&(m.textContent=_.landingHubPolling),c=setInterval(async()=>{var p,H;try{const z=await Be(T.loginToken);if(z.status==="ready"){h(),localStorage.setItem(G,z.accessToken),localStorage.setItem(V,JSON.stringify({first_name:((p=z.user)==null?void 0:p.first_name)??"",last_name:((H=z.user)==null?void 0:H.last_name)??"",language_code:z.lang==="en"?"en":"ru"})),window.location.replace("/#map"),window.location.reload();return}(z.status==="expired"||z.status==="not_found")&&(h(),d(!1),m&&(m.textContent=_.landingHubExpired))}catch{}},2e3)}catch{h(),d(!1),m&&(m.hidden=!1,m.textContent=_.errorLoad)}})})}function mt(){try{const e=navigator.userAgent||"";if(/Telegram/i.test(e))return!0;const t=`${window.location.hash||""}${window.location.search||""}`;if(/tgWebAppPlatform|tgWebAppData|tgWebAppVersion/i.test(t))return!0}catch{}return!1}function ht(){var e;return(e=window.Telegram)!=null&&e.WebApp?Promise.resolve():new Promise(t=>{const n=document.createElement("script");n.src="https://telegram.org/js/telegram-web-app.js",n.async=!0,n.onload=()=>t(),n.onerror=()=>t(),document.head.appendChild(n)})}function ft(){var n;const e=(n=window.Telegram)==null?void 0:n.WebApp;return e?(e.initData||"").trim().length>0:!1}function xt(){var e;try{return((e=localStorage.getItem(G))==null?void 0:e.trim())||""}catch{return""}}function vt(){try{const e=localStorage.getItem(V);return e?JSON.parse(e):null}catch{return null}}async function yt(){var a,s;mt()&&await ht();const{initData:e,user:t,lang:n}=De();if(ft())ee({initData:e,user:t,lang:n,siteToken:""});else{const r=xt();if(r){const i=vt(),o=(i==null?void 0:i.language_code)==="en"||(s=(a=i==null?void 0:i.language_code)==null?void 0:a.startsWith)!=null&&s.call(a,"en")||n==="en"?"en":"ru";ee({initData:"",user:i?{first_name:i.first_name,last_name:i.last_name,language_code:i.language_code}:null,lang:o,siteToken:r})}else gt()}}yt().catch(()=>{});
