(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))a(r);new MutationObserver(r=>{for(const s of r)if(s.type==="childList")for(const i of s.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&a(i)}).observe(document,{childList:!0,subtree:!0});function n(r){const s={};return r.integrity&&(s.integrity=r.integrity),r.referrerPolicy&&(s.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?s.credentials="include":r.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function a(r){if(r.ep)return;r.ep=!0;const s=n(r);fetch(r.href,s)}})();const ve="/assets/full-glowing-brain-Cl127Rfm.png",_e="/assets/amygdala-DP7dGDc4.png",we="/assets/lobes-uZqghd8w.png",$e="/assets/frontal-gyrus-DPq4mhR0.png",Te="/assets/insula-CAJDukm_.png",Le="/assets/pfc-BE-jJY5g.png",ke="/assets/tpj-Cgg8S5Iu.png",I=["prefrontal_cortex","brain_lobes","insular_cortex","temporoparietal_junction","amygdala","frontal_gyrus"],Se={prefrontal_cortex:Le,brain_lobes:we,insular_cortex:Te,temporoparietal_junction:ke,amygdala:_e,frontal_gyrus:$e},Ee=ve;function Ae(e){const t=I.map(a=>Number(e[a]??0)),n=t.reduce((a,r)=>a+r,0);return Math.round(n/Math.max(t.length,1)*10)/10}const Y="bb-site-session",J="bb-site-user",Q="bb-site-login-poll";function ze(e,t=""){const n=e==null?void 0:e.detail;return typeof n=="string"&&n.trim()?n.trim():Array.isArray(n)&&n.length?n.map(a=>typeof a=="object"&&(a!=null&&a.msg)?a.msg:String(a)).filter(Boolean).join("; "):t||(e==null?void 0:e.message)||""}function Me(e,t){const n={"Content-Type":"application/json"};e&&(n["X-Telegram-Init-Data"]=e);const a=(t||"").trim();return a&&(n.Authorization=`Bearer ${a}`),n}async function B(e,{initData:t="",siteToken:n="",method:a="GET",body:r}={}){const s=await fetch(`/api/webapp${e}`,{method:a,headers:Me(t,n),body:r?JSON.stringify(r):void 0});if(!s.ok){const i=new Error(`HTTP ${s.status}`);i.status=s.status;try{i.detail=(await s.json()).detail}catch{}throw i}return s.json()}function de(e){var r,s;const t=e.lang==="en"?"en":"ru",n={};for(const i of I)n[i]=Number(((r=e.scores)==null?void 0:r[i])??0);const a={};for(const i of I){const o=((s=e.regions)==null?void 0:s[i])??{};a[i]={main:Number(o.main??n[i]),bullets:o.bullets??[],submetrics:(o.submetrics??[]).map(b=>({label:b.label??b.label_ru??"",value:Number(b.value??n[i])}))}}return{lang:t,userDisplayName:e.userDisplayName??e.user_display_name??"Guest",paid:!!e.paid,hasMap:!!(e.hasMap??e.has_map??Object.keys(e.scores||{}).length),testVariant:e.testVariant??e.test_variant??"development",tributeUrl:e.tributeUrl??e.tribute_url??"",neuroScore:e.neuroScore!=null?Number(e.neuroScore):Ae(n),scores:n,connectivity:e.connectivity??[],regions:a,snapshotId:e.snapshotId??e.snapshot_id??null,createdAt:e.createdAt??e.created_at??null}}async function Ce(){return B("/landing",{initData:"",siteToken:""})}async function j(e){const t=await B("/profile",{initData:e.initData??"",siteToken:e.siteToken??""});return de(t)}async function He(e){return B("/history",{initData:e.initData??"",siteToken:e.siteToken??""})}async function Ne(e,t="development"){return B(`/test/questions?variant=${encodeURIComponent(t)}`,{initData:e.initData??"",siteToken:e.siteToken??""})}async function Pe(e,{variant:t,answers:n}){const a={variant:t,answers:n},r=await B("/test/submit",{initData:e.initData??"",siteToken:e.siteToken??"",method:"POST",body:a});return de(r.profile)}async function Be(e,t){return B(`/exercises/${encodeURIComponent(String(t))}`,{initData:e.initData??"",siteToken:e.siteToken??""})}async function qe(){return B("/auth/site/link",{initData:"",siteToken:"",method:"POST"})}async function Ie(e){return B(`/auth/site/poll?token=${encodeURIComponent(e)}`,{initData:"",siteToken:""})}const Fe={landingKicker:"BrainBoosty · neuroscience, no fluff",landingTitle:"Upgrade your brain — see your Neural Map",landingTagline:"7 questions → a personal 6-zone brain map, NeuroScore, and clear next steps. All in Telegram.",landingCta:"Boost my brain",landingCtaSub:"Free start in the bot · 2 minutes",landingNavAbout:"About me",landingNavProject:"The project",landingNavHub:"Neural Map Hub",landingNavCta:"Open bot",landingHubTitle:"Neural Map Hub",landingHubLead:"Your brain map, test, history, and exercises—in the browser, same account as the bot and Mini App.",landingHubHint:"You need a profile after the bot onboarding. Tap the button — Telegram opens with /start and a one-time token; confirm with «Start», then return here; this tab will log you in automatically.",landingHubStartLogin:"Open Telegram and confirm",landingHubPrepare:"Preparing your link…",landingHubPolling:"Waiting for confirmation in Telegram… keep this tab open.",landingHubExpired:"That link expired. Tap the button to try again.",landingHubPopupBlocked:"Your browser blocked the Telegram window. Allow pop-ups for this site and try again.",landingHubReturnSameTab:"Telegram will open next. After you tap Start in the bot, return to this browser tab to finish sign-in.",landingLoginTelegram:"Log in with Telegram",landingChannelAria:"Telegram channel",landingAboutTitle:"About me",landingAboutParagraphs:["Hi, I'm Damian — creator of BrainBoosty.","I went from anxiety, brain fog, and tension to clarity, inner strength, and confidence. Now I help others with neurobiology, hormones, and cognitive habits.","On my channel I share actionable insights—no marketing noise, only what actually shifts your state."],landingChannelLink:"→ Channel @androgenautist",landingProjectTitle:"What's inside",landingFeatures:["7-question cognitive test — development or sexual profile","Neural Map: 6 brain zones with NeuroScore and recommendations","Progress history and test-to-test comparison","Daily hooks and a private exercise channel"],landingFinalTitle:"Ready to see your map?",landingFinalSub:"Open the bot — onboarding takes a few minutes; your first map is free.",heroBrain:"NEURAL MAP",scoreLabel:"NeuroScore",coverLine:"Six zones · one profile. Numbers, focus, and a clear read—no clutter.",connectivityTitle:"Inter-region links (educational model)",zoneLevel:"Integrated zone level",progressMain:e=>`Your progress ${e}%`,recTitle:"Why this zone is your biggest pleasure lever",footer:"BrainBoosty · educational model · not a medical diagnosis",premiumCta:"Get full access",premiumBadge:"Full access",premiumTitle:"Get full access — today",premiumSub:"A 30-day personal plan, progress tracker, exercises for your profile, and the private channel.",premiumBullets:["Full brain map and all zone recommendations","Progress history with test comparisons","Retests and trend tracking","Private channel and daily hooks"],navMap:"Map",navHistory:"History",navTest:"Test",navPremium:"Access",navLogout:"Log out",appBrandName:"BrainBoosty",appHeaderTitle:"Neural Map",loading:"Loading your neuro profile…",computing:"Computing your brain map…",errorLoad:"Could not load data. Please try again later.",authError:"Open the app from the Telegram bot.",notRegistered:"Complete the bot questionnaire first (/start).",historyTitle:"Progress history",historySub:"Zone comparison across tests. Arrows show percentage-point change.",historyEmpty:"No saved tests yet. Take your first test to see history here.",startTest:"Take the test",latest:"Latest",openThisMap:"Open map",testTitle:"Cognitive test",testPickVariant:"Choose question style (7 steps):",variantDev:"Development & cognition",variantSex:"Sexual profile",variantSexBadge:"Maximum insight",variantSexHint:"Pleasure, drive, and your neural edge",variantDevHint:"Focus, habits, and cognitive style",questionProgress:(e,t)=>`Question ${e} of ${t}`,regions:{prefrontal_cortex:"Prefrontal cortex",brain_lobes:"Brain lobes · imagery",insular_cortex:"Insular cortex",temporoparietal_junction:"Temporoparietal junction",amygdala:"Amygdala",frontal_gyrus:"Frontal gyrus"},interactiveBrainKicker:"Zone",zoneIllustrationOpenAria:"open zone card",zoneDrawerCloseAria:"Close",zoneCurrentLevel:"Current level",zoneWhyTitle:"Why it matters",zoneBoostCta:"Boost this zone",zoneUnlockNote:"Full access unlocks personal drills per zone, progress tracking, and training history.",zoneOpenHistory:"History for this zone",zoneExercisesHeading:"Zone exercises",zoneExerciseListCap:"In your program for this zone:",zoneExercisePlaceholder:"More protocols are on the way — your full access already includes the base track.",zonePaidHint:"More protocols and metrics tailored to your profile are coming next.",zoneReadMoreDetail:"Full zone breakdown below in the feed",zoneWhy:{prefrontal_cortex:"Planning, impulse control, and focus. A stronger PFC means clearer decisions and fewer spirals.",brain_lobes:"Integrates imagery, language, and space. Balance here improves how you read reality and old patterns.",insular_cortex:"Interoception and emotional regulation — the bridge between body state and action.",temporoparietal_junction:"Perspective, attention, and social context — helps you update stories instead of locking in one view.",amygdala:"Threat and reward signaling. Tuning it reduces false alarms while keeping healthy drive.",frontal_gyrus:"Links effort, intention, and follow-through — trained with sequenced action and repetition."},zoneExercises:{prefrontal_cortex:[{title:"90-second stop frame",body:"Before an impulsive reply, state one value and one tiny next step out loud."}],brain_lobes:[{title:"Sensory anchor",body:"For 30s describe one object: color, texture, sound — no judgments."}],insular_cortex:[{title:"Rib-cage breath",body:"4 cycles: inhale 4 counts, soft pause, exhale 6 — attention on rib expansion.",exerciseId:1}],temporoparietal_junction:[{title:"Perspective swap",body:"Phrase the same situation two neutral ways — without «I'm right» framing."}],amygdala:[{title:"Tolerance window",body:"2 min: note 3 neutral facts around a trigger, then one action 2% softer."}],frontal_gyrus:[{title:"Three-step chain",body:"Write three micro-steps for one goal today; track completion only."}]},exerciseLoading:"Loading protocol…",exerciseNotFound:"Exercise not found.",exerciseBackAria:"Back",exerciseTagForWho:"For who",exerciseTagEfficiency:"Effectiveness",exerciseTagFirstResult:"First results",exerciseDifficulty:"Difficulty",exerciseFirstResultDays:e=>`~${e} days`,exerciseEfficiencyLabels:["Low","Moderate","High","Exceptional","Best for this region"],exerciseAccInstruction:"Instruction",exerciseAccResearch:"Research",exerciseAccAmplify:"How to amplify",exerciseAccResults:"Expected outcomes",exerciseNoResearch:"Links will appear here soon.",exerciseCtaPrimary:"Add to my training plan",exerciseCtaMessage:"Sync with your bot plan is coming soon. For now, block time on your calendar and log completion.",exercisePremiumTitle:"Full access",exercisePremiumText:"Channel exercises are available with BrainBoosty full access.",zoneOpenFullExercise:"Open full exercise"},ue={landingKicker:"BrainBoosty · нейробиология без воды",landingTitle:"Прокачай мозг — увидь свою Neural Map",landingTagline:"7 вопросов → персональная карта из 6 зон мозга, NeuroScore и понятные шаги. Всё в Telegram.",landingCta:"Прокачать мозг",landingCtaSub:"Бесплатный старт в боте · 2 минуты",landingNavAbout:"Обо мне",landingNavProject:"Проект",landingNavHub:"Neural Map Hub",landingNavCta:"В бота",landingHubTitle:"Neural Map Hub",landingHubLead:"Карта мозга, тест, история и упражнения — в браузере, тот же аккаунт, что в боте и мини-приложении.",landingHubHint:"Нужен аккаунт после анкеты в боте. Нажми кнопку — откроется Telegram с командой /start и одноразовым токеном; подтверди «Start», вернись сюда: страница сама авторизуется.",landingHubStartLogin:"Открыть Telegram и подтвердить вход",landingHubPrepare:"Готовим ссылку…",landingHubPolling:"Ждём подтверждение в Telegram… не закрывай эту вкладку.",landingHubExpired:"Ссылка устарела. Нажми кнопку ещё раз.",landingHubPopupBlocked:"Браузер заблокировал окно Telegram. Разреши всплывающие окна для этого сайта и нажми кнопку снова.",landingHubReturnSameTab:"Сейчас откроется Telegram. После кнопки Start в боте вернись в этот браузер на эту вкладку — вход завершится сам.",landingLoginTelegram:"Войти через Telegram",landingChannelAria:"Канал в Telegram",landingAboutTitle:"Обо мне",landingAboutParagraphs:["Привет, я Дамиан — автор BrainBoosty.","Сам прошёл путь от тревожности, тумана в голове и зажатости — к ясности, внутренней силе и уверенности. Сейчас помогаю другим по нейробиологии, гормонам и когнитивным привычкам.","В канале делюсь рабочими инсайтами без маркетинговой шелухи — только то, что реально меняет состояние."],landingChannelLink:"→ Канал @androgenautist",landingProjectTitle:"Что внутри",landingFeatures:["Когнитивный тест из 7 вопросов — два стиля (развитие / сексуальный профиль)","Neural Map: 6 зон мозга с NeuroScore и рекомендациями","История прогресса и сравнение между тестами","Ежедневные хуки и закрытый канал с упражнениями"],landingFinalTitle:"Готов увидеть свою карту?",landingFinalSub:"Открой бота — анкета займёт пару минут, первая карта бесплатно.",heroBrain:"NEURAL MAP",scoreLabel:"NeuroScore",coverLine:"Шесть зон · один профиль. Цифры, акценты и ясная картина без лишнего шума.",connectivityTitle:"Связность зон (образовательная модель)",zoneLevel:"Интегральный уровень зоны",progressMain:e=>`Твой прогресс ${e}%`,recTitle:"Почему эта зона — твой главный рычаг удовольствия",footer:"BrainBoosty · образовательная модель · не медицинский диагноз",premiumCta:"Забрать полный доступ",premiumBadge:"Полный доступ",premiumTitle:"Забери полный доступ — сегодня",premiumSub:"Персональный план на 30 дней, трекер прогресса, упражнения под твой профиль и закрытый канал.",premiumBullets:["Полная карта мозга и все рекомендации по зонам","История прогресса с сравнением тестов","Повторные тесты и отслеживание динамики","Закрытый канал и ежедневные хуки"],navMap:"Карта",navHistory:"История",navTest:"Тест",navPremium:"Доступ",navLogout:"Выйти",appBrandName:"BrainBoosty",appHeaderTitle:"Neural Map",loading:"Загружаем нейропрофиль…",computing:"Считаем твою карту мозга…",errorLoad:"Не удалось загрузить данные. Попробуйте позже.",authError:"Откройте приложение из Telegram-бота.",notRegistered:"Сначала пройдите анкету в боте (/start).",historyTitle:"История прогресса",historySub:"Сравнение зон между прохождениями. Стрелки — изменение в процентных пунктах.",historyEmpty:"Пока нет сохранённых тестов. Пройдите первый тест — и здесь появится история.",startTest:"Пройти тест",latest:"Актуально",openThisMap:"Открыть карту",testTitle:"Когнитивный тест",testPickVariant:"Выберите стиль вопросов (7 шагов):",variantDev:"Развитие и когниция",variantSex:"Сексуальный профиль",variantSexBadge:"Максимум инсайта",variantSexHint:"Удовольствие, драйв и нейронный рельеф",variantDevHint:"Фокус, привычки и когнитивный стиль",questionProgress:(e,t)=>`Вопрос ${e} из ${t}`,regions:{prefrontal_cortex:"Префронтальная кора",brain_lobes:"Доли мозга · образы",insular_cortex:"Островковая кора",temporoparietal_junction:"Височно-теменной узел",amygdala:"Амигдала",frontal_gyrus:"Лобная извилина"},interactiveBrainKicker:"Зона",zoneIllustrationOpenAria:"открыть карточку зоны",zoneDrawerCloseAria:"Закрыть",zoneCurrentLevel:"Текущий уровень",zoneWhyTitle:"Почему это важно",zoneBoostCta:"Прокачать эту зону",zoneUnlockNote:"Полный доступ открывает персональные упражнения под каждую зону, трекер и историю прокачки.",zoneOpenHistory:"История этой зоны",zoneExercisesHeading:"Упражнения для зоны",zoneExerciseListCap:"Сейчас в программе для этой зоны:",zoneExercisePlaceholder:"Скоро добавим ещё шаги — уже доступен базовый протокол в полном доступе.",zonePaidHint:"Дальше — больше протоколов и метрик именно под твой профиль.",zoneReadMoreDetail:"Подробный разбор зоны в ленте ниже",zoneWhy:{prefrontal_cortex:"Планирование, торможение импульсов и фокус. Сильная ПФК — ясные решения, меньше хаоса и откатов.",brain_lobes:"Интеграция образов, языка и пространства. Баланс здесь — лучшее восприятие реальности и выученные паттерны.",insular_cortex:"Телесная осознанность и эмоциональная регуляция. Островок связывает «что чувствую» с «что делаю».",temporoparietal_junction:"Перспектива, внимание и социальный контекст. TPJ помогает не застревать в одной интерпретации событий.",amygdala:"Детектор угроз и сигналов награды. Настрой амигдалы — меньше ложной тревоги, больше спокойного драйва.",frontal_gyrus:"Связь моторики, намерения и усилия. Тренируется через последовательные действия и повторение цели."},zoneExercises:{prefrontal_cortex:[{title:"90 секунд «стоп-рамка»",body:"Перед импульсивным ответом назови вслух одну ценность и одно следующее маленькое действие."}],brain_lobes:[{title:"Сенсорный якорь",body:"30 секунд описывай предмет из комнаты: цвет, фактура, звук — без оценок."}],insular_cortex:[{title:"Дыхание в ребро",body:"4 цикла: вдох 4 счёта, мягкая пауза, выдох 6 — внимание на расширении рёбер.",exerciseId:1}],temporoparietal_junction:[{title:"Смена ракурса",body:"Сформулируй ту же ситуацию двумя нейтральными формулировками, без «я прав»."}],amygdala:[{title:"Окно толерантности",body:"2 минуты: найди 3 нейтральных факта вокруг триггера, затем одно действие на 2% мягче."}],frontal_gyrus:[{title:"Цепочка на 3 шага",body:"Запиши три микрошага к одной цели на сегодня; отмечай только факт выполнения."}]},exerciseLoading:"Загружаем протокол…",exerciseNotFound:"Упражнение не найдено.",exerciseBackAria:"Назад",exerciseTagForWho:"Для кого",exerciseTagEfficiency:"Эффективность",exerciseTagFirstResult:"Первый результат",exerciseDifficulty:"Сложность",exerciseFirstResultDays:e=>`ориентир ≈ ${e} дн.`,exerciseEfficiencyLabels:["Низкая","Средняя","Высокая","Чрезвычайная","Оптимально для отдела"],exerciseAccInstruction:"Инструкция",exerciseAccResearch:"Исследования",exerciseAccAmplify:"Как усилить эффект",exerciseAccResults:"Ожидаемые результаты",exerciseNoResearch:"Ссылки будут добавлены.",exerciseCtaPrimary:"Добавить в мой план прокачки",exerciseCtaMessage:"Скоро здесь будет синхронизация с твоим планом в боте. Пока закрепи время в календаре и отметь выполнение в заметках.",exercisePremiumTitle:"Полный доступ",exercisePremiumText:"Экран упражнений из закрытого канала доступен с подпиской BrainBoosty.",zoneOpenFullExercise:"Полный экран упражнения"},De={ru:ue,en:Fe};function P(e){return De[e==="en"?"en":"ru"]??ue}const Z=new Set;function K(){const e=(window.location.hash||"#map").replace(/^#/,""),[t,n]=e.split("?");return{name:t||"map",params:new URLSearchParams(n||"")}}function N(e,t={}){var a;const n=((a=t.toString)==null?void 0:a.call(t))||new URLSearchParams(t).toString();window.location.hash=n?`${e}?${n}`:e}function Re(e){return Z.add(e),()=>Z.delete(e)}function be(){const e=K();for(const t of Z)t(e)}window.addEventListener("hashchange",be);function Oe(){be()}function je(){var a,r,s;const e=(a=window.Telegram)==null?void 0:a.WebApp;if(!e)return{tg:null,initData:"",user:null,lang:"ru"};e.ready(),e.expand(),e.enableClosingConfirmation(),e.disableVerticalSwipes&&e.disableVerticalSwipes(),ee(),e.onEvent("themeChanged",ee);const t=((r=e.initDataUnsafe)==null?void 0:r.user)??null,n=(t==null?void 0:t.language_code)==="en"||(s=t==null?void 0:t.language_code)!=null&&s.startsWith("en")?"en":"ru";return e.setHeaderColor&&e.setHeaderColor("#010108"),e.setBackgroundColor&&e.setBackgroundColor("#010108"),{tg:e,initData:e.initData||"",user:t,lang:n}}function ee(){const e=document.documentElement;e.style.setProperty("--bb-tg-bg","#010108"),e.style.setProperty("--bb-tg-text","#f1f5f9")}function G(e){var n;const t=(n=window.Telegram)==null?void 0:n.WebApp;if(t!=null&&t.openTelegramLink&&e.includes("t.me/")){t.openTelegramLink(e);return}if(t!=null&&t.openLink){t.openLink(e);return}window.open(e,"_blank","noopener,noreferrer")}function A(){var e,t,n,a;(a=(n=(t=(e=window.Telegram)==null?void 0:e.WebApp)==null?void 0:t.HapticFeedback)==null?void 0:n.impactOccurred)==null||a.call(n,"light")}function S(e){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}function Ue(){return`
    <div class="bb-zone-drawer__bar-track">
      <div class="bb-zone-drawer__bar-fill" style="width: 0%"></div>
    </div>`}function We(e,t,n={}){var u,v,_,C,k,p;const a=P(e.lang),r=a.regions[t]??t,s=((u=a.zoneWhy)==null?void 0:u[t])??"",i=Number(((v=e.scores)==null?void 0:v[t])??0).toFixed(1),o=((_=a.zoneExercises)==null?void 0:_[t])??[],b=o.length>0?o.map(c=>`
                  <li class="bb-zone-drawer__exercise">
                    <p class="bb-zone-drawer__exercise-title">${S(c.title)}</p>
                    <p class="bb-zone-drawer__exercise-body">${S(c.body)}</p>
                    ${c.exerciseId!=null?`<button type="button" class="bb-zone-drawer__ex-open" data-open-exercise="${Number(c.exerciseId)}">${S(a.zoneOpenFullExercise)}</button>`:""}
                  </li>`).join(""):`<li class="bb-zone-drawer__exercise"><p class="bb-zone-drawer__exercise-body">${S(a.zoneExercisePlaceholder)}</p></li>`,l=document.createElement("div");l.className="bb-zone-drawer-host",l.innerHTML=`
    <div class="bb-zone-drawer-backdrop" data-close="1" aria-hidden="true"></div>
    <aside class="bb-zone-drawer glass" role="dialog" aria-modal="true" aria-labelledby="bb-zone-drawer-title">
      <header class="bb-zone-drawer__header">
        <div>
          <p class="bb-zone-drawer__eyebrow">${S(a.interactiveBrainKicker)}</p>
          <h2 id="bb-zone-drawer-title" class="bb-zone-drawer__title">${S(r)}</h2>
        </div>
        <button type="button" class="bb-zone-drawer__close" data-close="1" aria-label="${S(a.zoneDrawerCloseAria)}">
          <span aria-hidden="true">×</span>
        </button>
      </header>
      <div class="bb-zone-drawer__body">
        <div class="bb-zone-drawer__meter">
          <div class="bb-zone-drawer__meter-row">
            <span class="bb-zone-drawer__meter-label">${S(a.zoneCurrentLevel)}</span>
            <span class="bb-zone-drawer__meter-value">${S(i)}%</span>
          </div>
          ${Ue()}
        </div>
        <div class="bb-zone-drawer__why">
          <p class="bb-zone-drawer__why-title">${S(a.zoneWhyTitle)}</p>
          <p class="bb-zone-drawer__why-text">${S(s)}</p>
        </div>
        <div class="bb-zone-drawer__actions" data-paid-block="${e.paid?"1":"0"}">
          ${e.paid?`
            <div class="bb-zone-drawer__paid-menu">
              <button type="button" class="bb-zone-drawer__btn bb-zone-drawer__btn--ghost" data-go="history">
                ${S(a.zoneOpenHistory)}
              </button>
              <button type="button" class="bb-zone-drawer__btn bb-zone-drawer__btn--ghost" data-toggle="exercises">
                ${S(a.zoneExercisesHeading)}
              </button>
            </div>
            <div class="bb-zone-drawer__exercises" data-exercises hidden>
              <p class="bb-zone-drawer__exercises-cap">${S(a.zoneExerciseListCap)}</p>
              <ul class="bb-zone-drawer__exercise-list">
                ${b}
              </ul>
            </div>
            <p class="bb-zone-drawer__paid-hint">${S(a.zonePaidHint)}</p>
            <button type="button" class="bb-zone-drawer__btn bb-zone-drawer__btn--ghost bb-zone-drawer__btn--compact" data-scroll-zone="${t}">
              ${S(a.zoneReadMoreDetail)}
            </button>`:`
            <p class="bb-zone-drawer__lock-note">${S(a.zoneUnlockNote)}</p>
            <button type="button" class="bb-zone-drawer__btn bb-zone-drawer__btn--primary" data-go="boost">
              ${S(a.zoneBoostCta)}
            </button>
            <button type="button" class="bb-zone-drawer__btn bb-zone-drawer__btn--ghost bb-zone-drawer__btn--compact" data-scroll-zone="${t}">
              ${S(a.zoneReadMoreDetail)}
            </button>`}
        </div>
      </div>
    </aside>
  `,document.body.appendChild(l),document.body.classList.add("bb-zone-drawer-open");const L=l.querySelector(".bb-zone-drawer"),d=l.querySelector("[data-exercises]"),h=l.querySelector(".bb-zone-drawer-backdrop"),g=l.querySelector(".bb-zone-drawer__bar-fill"),y=()=>{var c;document.removeEventListener("keydown",m),document.body.classList.remove("bb-zone-drawer-open"),l.remove(),(c=n.onClose)==null||c.call(n)},m=c=>{c.key==="Escape"&&y()};return document.addEventListener("keydown",m),l.querySelectorAll("[data-close]").forEach(c=>{c.addEventListener("click",()=>{A(),y()})}),(C=l.querySelector('[data-go="boost"]'))==null||C.addEventListener("click",()=>{A(),e.tributeUrl?G(e.tributeUrl):N("premium"),y()}),(k=l.querySelector('[data-go="history"]'))==null||k.addEventListener("click",()=>{A(),N("history",{zone:t}),y()}),(p=l.querySelector('[data-toggle="exercises"]'))==null||p.addEventListener("click",()=>{if(A(),!d)return;d.hasAttribute("hidden")?d.removeAttribute("hidden"):d.setAttribute("hidden","")}),l.querySelectorAll("[data-scroll-zone]").forEach(c=>{c.addEventListener("click",()=>{A();const E=c.getAttribute("data-scroll-zone")||t;y(),requestAnimationFrame(()=>{var T;(T=document.getElementById(`zone-${E}`))==null||T.scrollIntoView({behavior:"smooth",block:"start"})})})}),l.querySelectorAll("[data-open-exercise]").forEach(c=>{c.addEventListener("click",()=>{A();const E=c.getAttribute("data-open-exercise")||"1";y(),N("exercise",{id:E})})}),requestAnimationFrame(()=>{if(L==null||L.classList.add("is-open"),h==null||h.classList.add("is-open"),g){const c=Math.max(0,Math.min(100,Number(i)||0));g.style.width="0%",requestAnimationFrame(()=>{g.style.width=`${c.toFixed(1)}%`})}}),{close:()=>{y()}}}function q(e){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}function Ge(e,{displayName:t,neuroScore:n,connectivity:a}){const r=(a==null?void 0:a.length)>0?`
    <div class="bb-connectivity glass rounded-2xl p-4 mt-5">
      <p class="bb-connectivity__title">${q(e.connectivityTitle)}</p>
      ${a.map(s=>`<p>• ${q(s)}</p>`).join(`
      `)}
    </div>`:"";return`
<section class="bb-section bb-cover" data-section="cover">
  <img src="${Ee}" alt="" class="cover-full-brain-hero mb-4" width="360" height="260" decoding="async" />
  <div class="glass rounded-3xl p-6 sm:p-8 cover-neon-card border border-cyan-500/20">
    <p class="text-center text-sm uppercase tracking-[0.35em] text-cyan-200 mt-1 font-semibold drop-shadow-[0_0_16px_rgba(34,211,238,0.55)] bb-cover__kicker">
      ${q(e.heroBrain)}
    </p>
    <h1 class="text-center text-2xl sm:text-3xl font-bold mt-5 text-white drop-shadow-[0_0_20px_rgba(167,139,250,0.25)] neon-zone-title">
      ${q(t)}
    </h1>
    <p class="text-center text-slate-300/95 mt-3 text-[15px] leading-relaxed max-w-md mx-auto tracking-wide px-2">
      ${q(e.coverLine)}
    </p>
    <div class="mt-8 flex flex-col items-center justify-center">
      <p class="bb-cover__score-label text-cyan-100/90 text-sm mb-2 font-medium tracking-wide drop-shadow-[0_0_10px_rgba(34,211,238,0.35)]">
        ${q(e.scoreLabel)}
      </p>
      <div class="text-6xl sm:text-7xl font-black bg-gradient-to-r from-cyan-200 via-violet-300 to-fuchsia-300 bg-clip-text text-transparent neon-score-cover" data-neuro-score>
        ${Number(n).toFixed(1)}
      </div>
    </div>
    ${r}
  </div>
  <p class="text-center text-[11px] text-slate-500 mt-6">${q(e.footer)}</p>
</section>`}function te({label:e,value:t,glow:n=!1}){const a=Math.max(0,Math.min(100,Number(t)||0)),r=Math.max(0,100-a),s=n?"pdf-bar-gradient pdf-bar-gradient--main":"pdf-bar-gradient pdf-bar-gradient--sub",i=Ve(e);return[`<div class="mb-3.5" data-bar-value="${a}">`,'<div class="flex justify-between text-xs text-slate-400 mb-1">',`<span>${i}</span>`,`<span class="text-cyan-100 font-bold tracking-wide">${a.toFixed(1)}%</span>`,"</div>",'<div class="pdf-bar-track">',`<div class="${s}" style="clip-path: inset(0 ${r.toFixed(2)}% 0 0);"></div>`,"</div>","</div>"].join(`
  `)}function Ve(e){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}function F(e){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}function Ye(e,t,n){const a=e.regions[t]??t,r=Se[t],s=Number(n.main??0),i=e.progressMain(`${s.toFixed(1)}`),o=[te({label:e.zoneLevel,value:s,glow:!0}),...(n.submetrics??[]).map(l=>te({label:l.label,value:l.value,glow:!1}))].join(`
`),b=(n.bullets??[]).map(l=>`<li>${F(l)}</li>`).join(`
        `);return`
<section class="bb-section bb-region" data-section="region" data-region="${t}" id="zone-${t}">
  <button type="button" class="bb-region__illu-hit" data-open-zone="${t}" aria-label="${F(a)} — ${F(e.zoneIllustrationOpenAria)}">
    <img src="${r}" alt="" class="brain-float-top bb-region__illu" width="320" height="220" loading="lazy" decoding="async" />
  </button>
  <h2 class="bb-region__title neon-zone-title px-2">${F(a)}</h2>
  <p class="bb-region__progress-label">${F(i)}</p>
  <div class="glass rounded-2xl p-4 max-w-xl mx-auto w-full">
    ${o}
  </div>
  <div class="glass rounded-2xl p-4 mt-4 max-w-xl mx-auto w-full">
    <p class="bb-rec-title">${F(e.recTitle)}</p>
    <ul class="bb-rec-list">
        ${b}
    </ul>
  </div>
</section>`}function Je(e,t,n){const a=P(t.lang),r=t.userDisplayName||(t.lang==="en"?"Guest":"Гость"),s=[Ge(a,{displayName:r,neuroScore:t.neuroScore,connectivity:t.connectivity}),...I.map(i=>{var o,b;return Ye(a,i,{main:t.scores[i],bullets:((o=t.regions[i])==null?void 0:o.bullets)??[],submetrics:((b=t.regions[i])==null?void 0:b.submetrics)??[]})})];e.innerHTML=s.join(`
`),Ze(e),Qe(e),Ke(e),Xe(e,t,n)}function Xe(e,t,n){var o,b;const a=e.querySelectorAll("[data-open-zone]");if(!a.length)return;const r=l=>{e.querySelectorAll(".bb-region").forEach(L=>{const d=L.dataset.region;L.classList.toggle("is-zone-hot",!!l&&d===l)})},s=l=>{!l||!I.includes(l)||(r(l),We(t,l,{onClose:()=>r(null)}))};a.forEach(l=>{l.addEventListener("pointerenter",()=>r(l.getAttribute("data-open-zone")||"")),l.addEventListener("pointerleave",L=>{const d=L.relatedTarget;d instanceof Node&&e.contains(d)&&d.closest("[data-open-zone]")||r(null)}),l.addEventListener("click",L=>{L.preventDefault();const d=l.getAttribute("data-open-zone");d&&(A(),s(d))})});const i=(b=(o=n==null?void 0:n.params)==null?void 0:o.get)==null?void 0:b.call(o,"zone");i&&I.includes(i)&&requestAnimationFrame(()=>s(i))}function Ze(e){const t=e.querySelectorAll(".bb-section"),n=new IntersectionObserver(a=>{for(const r of a)r.isIntersecting&&(r.target.classList.add("is-visible"),n.unobserve(r.target))},{root:null,rootMargin:"0px 0px -8% 0px",threshold:.08});t.forEach(a=>n.observe(a))}function Qe(e){const t=e.querySelector("[data-neuro-score]");if(!t)return;const n=parseFloat(t.textContent||"0"),a=1200,r=performance.now(),s=i=>{const o=Math.min(1,(i-r)/a),b=1-(1-o)**3;t.textContent=(n*b).toFixed(1),o<1&&requestAnimationFrame(s)};requestAnimationFrame(s)}function Ke(e){const t=e.querySelectorAll("[data-bar-value]"),n=new IntersectionObserver(a=>{for(const r of a){if(!r.isIntersecting)continue;const s=r.target,i=parseFloat(s.getAttribute("data-bar-value")||"0"),o=s.querySelector(".pdf-bar-gradient");o&&(o.style.clipPath="inset(0 100% 0 0)",requestAnimationFrame(()=>{o.style.clipPath=`inset(0 ${Math.max(0,100-i).toFixed(2)}% 0 0)`})),n.unobserve(s)}},{threshold:.2});t.forEach(a=>n.observe(a))}function f(e){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}function et(){return{instruction:'<svg class="ex-ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.25" aria-hidden="true"><path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01"/></svg>',research:'<svg class="ex-ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.25" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3M11 8v6M8 11h6"/></svg>',amplify:'<svg class="ex-ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.25" aria-hidden="true"><path d="M12 3l1.8 5.5h5.7l-4.6 3.4 1.8 5.5-4.7-3.4-4.7 3.4 1.8-5.5-4.6-3.4h5.7L12 3z"/></svg>',results:'<svg class="ex-ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.25" aria-hidden="true"><path d="M4 19V5M9 19v-6M14 19V9M19 19v-9"/><path d="M4 19h16" stroke-linecap="round"/></svg>'}}function X(e){return String(e||"").split(`
`).map(n=>`<p>${f(n)}</p>`).join("")}function tt(e){e.querySelectorAll(".ex-acc").forEach(t=>{const n=t.querySelector(".ex-acc__trigger");n&&n.addEventListener("click",()=>{const r=!(t.getAttribute("data-open")==="true");t.setAttribute("data-open",String(r)),n.setAttribute("aria-expanded",String(r)),A()})})}function U(e){requestAnimationFrame(()=>{var t;(t=e.querySelector(".ex-lux"))==null||t.classList.add("is-visible")})}async function nt(e,t,n,a){var y,m;const r=P(n.lang),s=et();e.className="bb-root bb-root--spa bb-root--exercise",e.innerHTML=`
    <div class="ex-lux">
      <div class="ex-lux__grid-bg" aria-hidden="true"></div>
      <header class="ex-lux__top">
        <button type="button" class="ex-lux__back" id="ex-back" aria-label="${f(r.exerciseBackAria)}">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M15 6l-6 6 6 6"/></svg>
        </button>
      </header>
      <div class="ex-lux__scroll">
        <div class="ex-lux__inner">
          <div class="ex-lux__loading">
            <div class="ex-lux__pulse"></div>
            <p>${f(r.exerciseLoading)}</p>
          </div>
        </div>
      </div>
      <div class="ex-lux__cta-bar">
        <button type="button" class="ex-lux__cta" id="ex-cta">${f(r.exerciseCtaPrimary)}</button>
      </div>
    </div>`;const i=e.querySelector("#ex-back");if(i==null||i.addEventListener("click",()=>{A(),N("map")}),!Number.isFinite(a)||a<1){const u=e.querySelector(".ex-lux__scroll .ex-lux__inner");u&&(u.innerHTML=`<p class="ex-lux__err">${f(r.exerciseNotFound)}</p>`),U(e);return}if(!n.paid){e.querySelector(".ex-lux__scroll .ex-lux__inner").innerHTML=`
      <div class="ex-lux__hero">
        <p class="ex-lux__lock-title">${f(r.exercisePremiumTitle)}</p>
        <p class="ex-lux__lock-text">${f(r.exercisePremiumText)}</p>
        <button type="button" class="ex-lux__cta ex-lux__cta--inline" id="ex-unlock">${f(r.premiumCta)}</button>
      </div>`,(y=e.querySelector("#ex-unlock"))==null||y.addEventListener("click",()=>{A(),n.tributeUrl?G(n.tributeUrl):N("premium")}),e.querySelector("#ex-cta").textContent=r.premiumCta,(m=e.querySelector("#ex-cta"))==null||m.addEventListener("click",()=>{A(),n.tributeUrl?G(n.tributeUrl):N("premium")}),U(e);return}let o;try{o=await Be(t,a)}catch(u){const v=e.querySelector(".ex-lux__scroll .ex-lux__inner"),_=(u==null?void 0:u.status)===403?r.exercisePremiumTitle:(u==null?void 0:u.status)===404?r.exerciseNotFound:r.errorLoad;v&&(v.innerHTML=`<p class="ex-lux__err">${f(_)}</p>`),U(e);return}const b=Math.max(0,Math.min(4,(o.effectiveness||3)-1)),l=r.exerciseEfficiencyLabels[b]??"—",L=(o.regions||[]).map(u=>`<span class="ex-lux__pill">${f(r.regions[u]??u)}</span>`).join(""),d=(o.researchLinks||[]).map(u=>`<a class="ex-lux__link" href="${f(u.url)}" target="_blank" rel="noopener noreferrer">${f(u.label||u.url)}</a>`).join(""),h=o.instructionImageUrl?`<figure class="ex-lux__figure"><img src="${f(o.instructionImageUrl)}" alt="" loading="lazy" decoding="async" /></figure>`:"";e.querySelector(".ex-lux__scroll .ex-lux__inner").innerHTML=`
    <div class="ex-lux__hero">
      <div class="ex-lux__emoji" aria-hidden="true">${f(o.emoji||"◆")}</div>
      <h1 class="ex-lux__title">${f(o.title)}</h1>
      <p class="ex-lux__lede">${f(o.shortDescription)}</p>
      <div class="ex-lux__tags">
        <span class="ex-lux__tag"><span class="ex-lux__tag-k">${f(r.exerciseTagForWho)}</span>${f(o.forWho)}</span>
        <span class="ex-lux__tag"><span class="ex-lux__tag-k">${f(r.exerciseTagEfficiency)}</span>${f(l)}</span>
        <span class="ex-lux__tag"><span class="ex-lux__tag-k">${f(r.exerciseTagFirstResult)}</span>${f(r.exerciseFirstResultDays(o.firstResultDays))}</span>
      </div>
      <div class="ex-lux__meta-row">
        <div class="ex-lux__diff">
          <span class="ex-lux__diff-label">${f(r.exerciseDifficulty)}</span>
          <div class="ex-lux__diff-track"><span class="ex-lux__diff-fill" style="width: ${Number(o.difficulty||0)}%"></span></div>
          <span class="ex-lux__diff-num">${f(Number(o.difficulty||0))}</span>
        </div>
      </div>
      <div class="ex-lux__pills">${L}</div>
      ${h}
    </div>

    <div class="ex-lux__accords">
      <div class="ex-acc" data-open="true">
        <button type="button" class="ex-acc__trigger" aria-expanded="true">
          <span class="ex-acc__ic">${s.instruction}</span>
          <span class="ex-acc__label">${f(r.exerciseAccInstruction)}</span>
          <span class="ex-acc__chev" aria-hidden="true"></span>
        </button>
        <div class="ex-acc__panel">
          <div class="ex-acc__panel-inner ex-lux__prose">${X(o.instruction)}</div>
        </div>
      </div>
      <div class="ex-acc" data-open="false">
        <button type="button" class="ex-acc__trigger" aria-expanded="false">
          <span class="ex-acc__ic">${s.research}</span>
          <span class="ex-acc__label">${f(r.exerciseAccResearch)}</span>
          <span class="ex-acc__chev" aria-hidden="true"></span>
        </button>
        <div class="ex-acc__panel">
          <div class="ex-acc__panel-inner ex-lux__prose ex-lux__links">${d||`<p>${f(r.exerciseNoResearch)}</p>`}</div>
        </div>
      </div>
      <div class="ex-acc" data-open="false">
        <button type="button" class="ex-acc__trigger" aria-expanded="false">
          <span class="ex-acc__ic">${s.amplify}</span>
          <span class="ex-acc__label">${f(r.exerciseAccAmplify)}</span>
          <span class="ex-acc__chev" aria-hidden="true"></span>
        </button>
        <div class="ex-acc__panel">
          <div class="ex-acc__panel-inner ex-lux__prose">${X(o.amplify)}</div>
        </div>
      </div>
      <div class="ex-acc" data-open="false">
        <button type="button" class="ex-acc__trigger" aria-expanded="false">
          <span class="ex-acc__ic">${s.results}</span>
          <span class="ex-acc__label">${f(r.exerciseAccResults)}</span>
          <span class="ex-acc__chev" aria-hidden="true"></span>
        </button>
        <div class="ex-acc__panel">
          <div class="ex-acc__panel-inner ex-lux__prose">${X(o.expectedResults)}</div>
        </div>
      </div>
    </div>
    <div class="ex-lux__scroll-pad"></div>`,tt(e);const g=e.querySelector("#ex-cta");g==null||g.addEventListener("click",()=>{var u,v,_;A(),(_=(v=(u=window.Telegram)==null?void 0:u.WebApp)==null?void 0:v.showAlert)==null||_.call(v,r.exerciseCtaMessage)}),U(e)}function W(e){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}function at(e,t){if(!e)return"—";try{return new Date(e).toLocaleString(t==="en"?"en-GB":"ru-RU",{day:"2-digit",month:"short",year:"numeric",hour:"2-digit",minute:"2-digit"})}catch{return e}}async function rt(e,t,n){var l,L;const a=P(n.lang),r=K().params.get("zone"),s=document.createElement("section");s.className="bb-section is-visible bb-history",s.innerHTML=`
    <h2 class="bb-page-title bb-page-title--premium neon-zone-title">${W(a.historyTitle)}</h2>
    <p class="bb-page-sub text-slate-300/90 text-sm mb-4">${W(a.historySub)}</p>
  `;const i=document.createElement("div");i.className="space-y-3",i.textContent=a.loading,s.appendChild(i),e.replaceChildren(s);let o;try{o=await He(t)}catch{i.innerHTML=`<p class="bb-error">${W(a.errorLoad)}</p>`;return}const b=o.items??[];if(i.replaceChildren(),!b.length){const d=document.createElement("div");d.className="glass rounded-2xl p-5 text-center";const h=document.createElement("p");h.className="text-slate-200 mb-4",h.textContent=a.historyEmpty;const g=document.createElement("button");g.type="button",g.className="bb-btn-primary",g.textContent=a.startTest,g.addEventListener("click",()=>N("test")),d.append(h,g),i.appendChild(d);return}for(const[d,h]of b.entries()){const g=document.createElement("article");g.className=`glass rounded-2xl p-4 bb-history-card${d===0?" is-active":""}`;const y=document.createElement("div");y.className="flex justify-between items-start gap-2 mb-2";const m=document.createElement("div");if(m.innerHTML=`
      <p class="text-xs text-cyan-200/80 uppercase tracking-wide">${W(at(h.createdAt,n.lang))}</p>
      <p class="text-lg font-bold text-white mt-1 bb-type-display">NeuroScore <span class="text-cyan-200">${Number(h.neuroScore).toFixed(1)}</span></p>
    `,y.appendChild(m),d===0){const _=document.createElement("span");_.className="bb-badge",_.textContent=a.latest,y.appendChild(_)}g.appendChild(y);const u=document.createElement("div");u.className="bb-history-deltas";for(const _ of I){const C=a.regions[_]??_,k=Number(((l=h.scores)==null?void 0:l[_])??0).toFixed(1),p=h.isFirst?"—":((L=h.deltas)==null?void 0:L[_])??"·",c=document.createElement("div");c.className=`bb-history-row${r===_?" bb-history-row--focus":""}`;const E=document.createElement("span");E.textContent=C;const T=document.createElement("span");T.textContent=`${k}%`;const z=document.createElement("span");z.textContent=p,typeof p=="string"&&p.includes("↑")&&(z.className="bb-delta-up"),typeof p=="string"&&p.includes("↓")&&(z.className="bb-delta-down"),c.append(E,T,z),u.appendChild(c)}g.appendChild(u);const v=document.createElement("button");v.type="button",v.className="bb-btn-ghost mt-3 w-full",v.textContent=a.openThisMap,v.addEventListener("click",()=>N("map")),g.appendChild(v),i.appendChild(g)}r&&b.length&&requestAnimationFrame(()=>{var d;(d=s.querySelector(".bb-history-row--focus"))==null||d.scrollIntoView({block:"center",behavior:"smooth"})})}function D(e){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}function st(e,t){var a;const n=P(t.lang);e.innerHTML=`
    <section class="bb-section is-visible bb-premium">
      <div class="mb-3 rounded-full px-5 py-1.5 border border-cyan-400/30 bg-cyan-500/10 text-xs font-bold uppercase tracking-[0.35em] text-cyan-100 text-center bb-type-display">
        ${D(n.premiumBadge)}
      </div>
      <h2 class="bb-page-title bb-page-title--premium neon-cta-title mb-4">
        ${D(n.premiumTitle)}
      </h2>
      <p class="text-slate-200 text-center text-sm leading-relaxed mb-6">${D(n.premiumSub)}</p>
      <ul class="bb-premium-list glass rounded-2xl p-5 mb-6 space-y-3 text-sm text-slate-200">
        ${n.premiumBullets.map(r=>`<li>${D(r)}</li>`).join("")}
      </ul>
      <button type="button" class="bb-btn-premium-buy w-full" id="bb-premium-buy">${D(n.premiumCta)}</button>
    </section>
  `,(a=e.querySelector("#bb-premium-buy"))==null||a.addEventListener("click",()=>{A(),t.tributeUrl&&G(t.tributeUrl)})}function M(e){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}async function it(e,t,n,{onProfile:a}={}){const r=P(n.lang),s={variant:n.testVariant||"development",questions:[],answers:{},step:0},i=document.createElement("section");i.className="bb-section is-visible bb-test",e.replaceChildren(i);async function o(){i.innerHTML=`<p class="text-cyan-200/80 text-sm">${M(r.loading)}</p>`;try{const d=await Ne(t,s.variant);s.questions=d.questions??[],s.step=0,s.answers={},l()}catch{i.innerHTML=`<p class="bb-error">${M(r.errorLoad)}</p>`}}function b(){i.innerHTML=`
      <div class="bb-test-pick">
        <div class="bb-test-pick__glow" aria-hidden="true"></div>
        <h2 class="bb-page-title bb-page-title--premium neon-zone-title">${M(r.testTitle)}</h2>
        <p class="bb-page-sub text-slate-300/90 text-sm mb-1 leading-relaxed">${M(r.testPickVariant)}</p>
        <div class="bb-test-variant-grid">
          <button type="button" class="bb-btn-hero" data-variant="sexual">
            <span class="bb-btn-hero__badge">${M(r.variantSexBadge)}</span>
            <span class="bb-btn-hero__label">${M(r.variantSex)}</span>
            <span class="bb-btn-hero__hint">${M(r.variantSexHint)}</span>
          </button>
          <button type="button" class="bb-btn-alt" data-variant="development">
            <span class="bb-btn-alt__label">${M(r.variantDev)}</span>
            <span class="bb-btn-alt__hint">${M(r.variantDevHint)}</span>
          </button>
        </div>
      </div>
    `,i.querySelectorAll("[data-variant]").forEach(d=>{d.addEventListener("click",()=>{A(),s.variant=d.getAttribute("data-variant")||"development",o()})})}function l(){const d=s.questions[s.step];if(!d){b();return}const h=s.questions.length,g=(s.step+1)/h*100;i.innerHTML=`
      <div class="bb-test-progress mb-4">
        <div class="flex justify-between text-xs text-cyan-200/80 mb-1">
          <span>${M(r.questionProgress(s.step+1,h))}</span>
          <span>${Math.round(g)}%</span>
        </div>
        <div class="pdf-bar-track"><div class="pdf-bar-gradient pdf-bar-gradient--main" style="clip-path: inset(0 ${(100-g).toFixed(1)}% 0 0)"></div></div>
      </div>
      <h2 class="bb-test-q-title">${M(d.topic)}</h2>
      <p class="text-slate-200 mb-4 leading-relaxed">${M(d.text)}</p>
      <div class="grid gap-2 bb-test-options" id="bb-test-options"></div>
    `;const y=i.querySelector("#bb-test-options");for(const m of d.options??[]){const u=document.createElement("button");u.type="button",u.className="bb-test-option",u.innerHTML=`<span class="bb-test-option-key">${M(m.key)}</span><span>${M(m.label)}</span>`,u.addEventListener("click",()=>L(m.key)),y.appendChild(u)}}async function L(d){A();const h=s.questions[s.step];if(s.answers[h.id]=d,s.step+1<s.questions.length){s.step+=1,l();return}i.innerHTML=`
      <div class="bb-loading">
        <div class="bb-loading__pulse"></div>
        <p class="text-sm text-cyan-200/80">${M(r.computing)}</p>
      </div>`;try{const g={};for(const[m,u]of Object.entries(s.answers))g[String(m)]=u;const y=await Pe(t,{variant:s.variant,answers:g});a&&a(y),N("map")}catch{i.innerHTML=`<p class="bb-error">${M(r.errorLoad)}</p>`}}b()}let x=null,$=null;function ot(e){const t=document.getElementById("bb-nav");t&&t.querySelectorAll(".bb-nav__btn[data-route]").forEach(n=>{n.classList.toggle("is-active",n.dataset.route===e)})}function lt(e){if(!x)return;const t=e==="en"?"en":"ru";if(x.lang===t)return;x.lang=t,document.documentElement.lang=t;const n=P(t),a=document.getElementById("bb-header-wordmark");a&&(a.textContent=n.appBrandName),pe(t)}function R(e){e!=null&&e.lang&&lt(e.lang)}function ct(e){var a;if((a=document.querySelector(".bb-premium-fab"))==null||a.remove(),e.paid||!e.tributeUrl)return;const t=P((x==null?void 0:x.lang)||e.lang),n=document.createElement("button");n.type="button",n.className="bb-premium-fab",n.textContent=t.premiumCta,n.addEventListener("click",()=>{A(),N("premium")}),document.body.appendChild(n)}function pe(e){var r;const t=document.getElementById("bb-nav");if(!t)return;const n=P(e);t.hidden=!1;const a=x!=null&&x.siteToken?`<button type="button" class="bb-nav__btn bb-nav__btn--logout" data-site-logout>${n.navLogout}</button>`:"";t.innerHTML=`
    <button type="button" class="bb-nav__btn" data-route="map">${n.navMap}</button>
    <button type="button" class="bb-nav__btn" data-route="history">${n.navHistory}</button>
    <button type="button" class="bb-nav__btn" data-route="test">${n.navTest}</button>
    <button type="button" class="bb-nav__btn" data-route="premium">${n.navPremium}</button>
    ${a}
  `,t.querySelectorAll(".bb-nav__btn[data-route]").forEach(s=>{s.addEventListener("click",()=>{A(),N(s.dataset.route||"map")})}),(r=t.querySelector("[data-site-logout]"))==null||r.addEventListener("click",()=>{A();try{localStorage.removeItem(Y),localStorage.removeItem(J)}catch{}window.location.replace("/")})}async function ne(e){var r,s;const t=document.getElementById("bb-root");if(!t||!x)return;const n=document.getElementById("bb-nav"),a=e.name==="exercise";if(document.body.classList.toggle("bb-route-exercise",a),n&&(n.hidden=a),a||ot(e.name),e.name!=="map"&&((r=document.querySelector(".bb-premium-fab"))==null||r.remove()),e.name==="premium"){$||($=await j(x),R($)),st(t,$);return}if(e.name==="test"){$||($=await j(x),R($)),await it(t,x,$,{onProfile:i=>{$=i,R(i)}});return}if(e.name==="history"){$||($=await j(x),R($)),await rt(t,x,$);return}if(!$){const i=P(x.lang);t.innerHTML=`
      <div class="bb-loading">
        <div class="bb-loading__pulse"></div>
        <p class="text-sm text-cyan-200/80">${i.loading}</p>
      </div>`;try{$=await j(x),R($),(s=x.user)!=null&&s.first_name&&!$.userDisplayName&&($.userDisplayName=[x.user.first_name,x.user.last_name].filter(Boolean).join(" "))}catch(o){if((o==null?void 0:o.status)===401&&(o==null?void 0:o.detail)==="invalid_site_token"&&(x!=null&&x.siteToken)){try{localStorage.removeItem(Y),localStorage.removeItem(J)}catch{}window.location.replace("/");return}const b=(o==null?void 0:o.status)===403?i.notRegistered:(o==null?void 0:o.status)===401?i.authError:i.errorLoad;t.innerHTML=`<p class="bb-error">${b}</p>`;return}}if(e.name==="exercise"){const i=parseInt(e.params.get("id")||"0",10);await nt(t,x,$,i);return}if(!$.hasMap&&e.name==="map"){N("test");return}Je(t,$,e),ct($)}async function ae(e){const t=e.lang==="en"?"en":"ru";x={initData:e.initData??"",user:e.user??null,lang:t,siteToken:e.siteToken??""},$=null,document.body.classList.add("bb-app--telegram"),x.siteToken&&document.body.classList.add("bb-app--site");const n=document.getElementById("bb-root");if(!n)return;n.classList.add("bb-root--spa");const a=P(x.lang),r=document.getElementById("bb-header-wordmark");r&&(r.textContent=a.appBrandName),pe(x.lang),Re(i=>{ne(i).catch(()=>{})}),Oe();const s=K();window.location.hash?await ne(s):N("map")}const re="/assets/full-glowing-brain-Cl127Rfm.png",se=.088,ie=15,oe=2,le=.4;function V(e,t,n){return Math.max(t,Math.min(n,e))}function dt(){var e,t;return((t=(e=window.matchMedia)==null?void 0:e.call(window,"(prefers-reduced-motion: reduce)"))==null?void 0:t.matches)??!1}function ut(e,t,n){const a=e.getBoundingClientRect(),r=80,s=Math.max(a.width+r*2,1),i=Math.max(a.height+r*2,1),o=a.left+a.width/2,b=a.top+a.height/2;return{nx:V((t-o)/(s*.5),-1,1),ny:V((n-b)/(i*.5),-1,1)}}function bt(e){var _,C;if(dt())return()=>{};const t=e.querySelector("[data-parallax-brain]"),n=e.querySelector("[data-parallax-glow]");if(!t)return()=>{};let a={nx:0,ny:0},r=!1,s={nx:0,ny:0},i=!1,o=0,b=0,l=0;const L=((C=(_=window.matchMedia)==null?void 0:_.call(window,"(pointer: coarse)"))==null?void 0:C.matches)??!1,d=()=>r?{tx:a.nx,ty:a.ny}:i?{tx:s.nx*.62,ty:s.ny*.62}:{tx:0,ty:0},h=()=>{l=0;const{tx:k,ty:p}=d();o+=(k-o)*se,b+=(p-b)*se;const c=o*ie,E=b*ie,T=b*-oe,z=o*oe;if(t.style.transform=`translate3d(${c}px, ${E}px, 0) rotateX(${T}deg) rotateY(${z}deg)`,n){const xe=-c*le,ye=-E*le;n.style.transform=`translate3d(calc(-50% + ${xe}px), calc(-50% + ${ye}px), 0) scale(1.06)`}const{tx:H,ty:me}=d(),he=Math.abs(o-H)>.003||Math.abs(b-me)>.003,fe=Math.abs(o)>.004||Math.abs(b)>.004;(he||fe||i)&&(l=requestAnimationFrame(h))},g=()=>{l||(l=requestAnimationFrame(h))},y=k=>{if(!k.isTrusted)return;const{nx:p,ny:c}=ut(e,k.clientX,k.clientY);a={nx:p,ny:c},r=!0,g()},m=()=>{r=!0},u=()=>{r=!1,g()};e.addEventListener("pointermove",y,{passive:!0}),e.addEventListener("pointerenter",m),e.addEventListener("pointerleave",u),e.addEventListener("pointerdown",()=>{L&&typeof(DeviceOrientationEvent==null?void 0:DeviceOrientationEvent.requestPermission)=="function"&&DeviceOrientationEvent.requestPermission().then(k=>{k==="granted"&&(i=!0)}).catch(()=>{})},{passive:!0});let v=null;return window.DeviceOrientationEvent&&(v=k=>{if(k.gamma==null||k.beta==null)return;const p=V(k.gamma/32,-1,1),c=V((k.beta-44)/36,-1,1);s={nx:p,ny:c},i=!0,g()},window.addEventListener("deviceorientation",v,!0)),t.style.willChange="transform",n&&(n.style.willChange="transform"),g(),()=>{e.removeEventListener("pointermove",y),e.removeEventListener("pointerenter",m),e.removeEventListener("pointerleave",u),v&&window.removeEventListener("deviceorientation",v,!0),l&&cancelAnimationFrame(l),t.style.willChange="",t.style.transform="",n&&(n.style.willChange="",n.style.transform="")}}const pt={root:null,rootMargin:"0px 0px -10% 0px",threshold:.08};function gt(e,{reducedMotion:t}){if(t)return e.querySelectorAll(".bb-landing-reveal").forEach(r=>r.classList.add("is-in-view")),()=>{};const n=e.querySelectorAll(".bb-landing-reveal");if(!n.length)return()=>{};const a=new IntersectionObserver(r=>{for(const s of r)s.isIntersecting&&(s.target.classList.add("is-in-view"),a.unobserve(s.target))},pt);return n.forEach(r=>a.observe(r)),()=>{a.disconnect()}}function w(e){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}const ge="bb-landing-lang",mt=960*1e3;function ht(){try{const e=sessionStorage.getItem(Q);if(!e)return null;const t=JSON.parse(e);return!(t!=null&&t.loginToken)||typeof t.loginToken!="string"||typeof t.startedAt!="number"||t.lang!=="en"&&t.lang!=="ru"?null:t}catch{return null}}function ft(e){try{sessionStorage.setItem(Q,JSON.stringify(e))}catch{}}function O(){try{sessionStorage.removeItem(Q)}catch{}}function xt(){try{const e=localStorage.getItem(ge);if(e==="en"||e==="ru")return e}catch{}return null}function yt(e){document.body.classList.add("bb-lang-gate-open");const t=document.createElement("div");t.className="bb-lang-gate",t.setAttribute("role","dialog"),t.setAttribute("aria-modal","true"),t.setAttribute("aria-labelledby","bb-lang-gate-title"),t.innerHTML=`
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
  `,document.body.appendChild(t);const n=a=>{try{localStorage.setItem(ge,a)}catch{}document.body.classList.remove("bb-lang-gate-open"),t.remove(),e(a)};t.querySelectorAll("[data-lang]").forEach(a=>{a.addEventListener("click",()=>n(a.getAttribute("data-lang")||"ru"))}),requestAnimationFrame(()=>{var a;(a=t.querySelector(".bb-lang-gate__btn"))==null||a.focus()})}async function vt(){const e=document.getElementById("bb-header"),t=document.getElementById("bb-nav");e&&(e.hidden=!0),t&&(t.hidden=!0);const n=document.getElementById("bb-root");if(!n)return;const a=xt();if(!a){n.className="bb-root",n.innerHTML="",yt(r=>{ce(r).catch(()=>{})});return}await ce(a)}async function ce(e){var k;const t=P(e);document.documentElement.lang=e;const n=document.getElementById("bb-root");if(!n)return;n.className="bb-root bb-root--landing",n.innerHTML=`
    <div class="bb-loading">
      <div class="bb-loading__pulse"></div>
    </div>`;let a={botUrl:"https://t.me/brainboosty?start=site",webappEntryUrl:"https://t.me/brainboosty?start=webapp",channelUrl:"https://t.me/androgenautist",hasAuthorPhoto:!1,hasChannelAvatar:!1,neuralMapHubUrl:"/#hub-login",hubHostDisplay:"neuralmap.brainboosty.app"};try{a={...a,...await Ce()}}catch{}const r="/api/webapp/landing/photo",s=t.landingFeatures.map(p=>`<li>${w(p)}</li>`).join(""),i=window.matchMedia("(prefers-reduced-motion: reduce)").matches;n.innerHTML=`
    <div class="bb-landing">
      <header id="top" class="bb-landing-hero">
        <div class="bb-landing-hero__visual-anchor">
          <div class="bb-landing-hero__glow" aria-hidden="true" data-parallax-glow></div>
          <div class="bb-landing-hero__brain-layer" data-parallax-brain>
            <img class="bb-landing-hero__brain" src="${re}" alt="" width="280" height="280" decoding="async" />
          </div>
        </div>
        <div class="bb-landing-hero__copy bb-landing-reveal">
        <p class="bb-landing-kicker">${w(t.landingKicker)}</p>
        <h1 class="bb-landing-title neon-zone-title">${w(t.landingTitle)}</h1>
        <p class="bb-landing-tagline">${w(t.landingTagline)}</p>
        <div class="bb-landing-hero__ctas">
          <a class="bb-landing-cta-primary" href="${w(a.botUrl)}" rel="noopener noreferrer">
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
            <img class="bb-landing-about__photo" src="${r}" alt="" width="320" height="320" loading="lazy" data-fallback-src="${re}" />
            <div class="bb-landing-about__ring" aria-hidden="true"></div>
          </div>
          <div class="bb-landing-about__text">
            ${t.landingAboutParagraphs.map(p=>`<p>${w(p)}</p>`).join("")}
            <a class="bb-landing-link" href="${w(a.channelUrl)}" target="_blank" rel="noopener noreferrer">
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
        <p class="bb-landing-hub__domain" translate="no">${w(a.hubHostDisplay)}</p>
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
          <a class="bb-landing-cta-primary bb-landing-cta-primary--lg" href="${w(a.botUrl)}" rel="noopener noreferrer">
            ${w(t.landingCta)}
          </a>
        </div>
      </section>

      <footer class="bb-landing-footer">
        <span>BrainBoosty · Neural Map</span>
      </footer>
    </div>
  `,n.querySelectorAll(".bb-landing-about__photo").forEach(p=>{const c=p.getAttribute("data-fallback-src");c&&p.addEventListener("error",()=>{p.removeAttribute("data-fallback-src"),p.src=c})}),n.querySelectorAll('a[href^="#"]').forEach(p=>{p.addEventListener("click",c=>{var z;const E=(z=p.getAttribute("href"))==null?void 0:z.slice(1);if(!E)return;const T=document.getElementById(E);T&&(c.preventDefault(),T.scrollIntoView({behavior:"smooth",block:"start"}))})});const o=n.querySelector(".bb-landing"),b=gt(o||n,{reducedMotion:i}),l=n.querySelector(".bb-landing-hero"),L=l?bt(l):()=>{};let d=null;const h=()=>{d!=null&&(clearInterval(d),d=null)},g=()=>{b(),L(),window.removeEventListener("pagehide",g)};window.addEventListener("pagehide",g);const y=n.querySelectorAll("[data-start-site-login]"),m=n.querySelector(".bb-landing-hub__status"),u=p=>{y.forEach(c=>{c.disabled=p})},v=p=>{const c=window.open("about:blank","_blank");return c?(c.location.href=p,!0):!1},_=(p,c)=>{h();const E=async()=>{var T,z;try{const H=await Ie(p);if(H.status==="ready"){h(),O(),localStorage.setItem(Y,H.accessToken),localStorage.setItem(J,JSON.stringify({first_name:((T=H.user)==null?void 0:T.first_name)??"",last_name:((z=H.user)==null?void 0:z.last_name)??"",language_code:H.lang==="en"?"en":"ru"})),window.location.replace("/#map"),window.location.reload();return}(H.status==="expired"||H.status==="not_found")&&(h(),O(),u(!1),m&&(m.textContent=c.landingHubExpired))}catch{}};d=setInterval(E,2e3),E()};y.forEach(p=>{p.addEventListener("click",async()=>{var E;const c=P(e);h(),O(),(E=document.getElementById("hub-login"))==null||E.scrollIntoView({behavior:"smooth",block:"start"}),u(!0),m&&(m.hidden=!1,m.textContent=c.landingHubPrepare);try{const T=await qe(),z=T==null?void 0:T.loginToken,H=T==null?void 0:T.telegramLink;if(!z||!H)throw new Error(c.errorLoad);if(ft({loginToken:z,lang:e,startedAt:Date.now()}),v(H)){m&&(m.textContent=c.landingHubPolling),_(z,c);return}m&&(m.textContent=c.landingHubReturnSameTab),window.location.href=H}catch(T){h(),O(),u(!1),m&&(m.hidden=!1,m.textContent=ze(T,c.errorLoad))}})});const C=ht();C&&C.lang===e&&Date.now()-C.startedAt<mt?((k=document.getElementById("hub-login"))==null||k.scrollIntoView({behavior:"smooth",block:"start"}),u(!0),m&&(m.hidden=!1,m.textContent=t.landingHubPolling),_(C.loginToken,t)):C&&O()}function _t(){try{const e=navigator.userAgent||"";if(/Telegram/i.test(e))return!0;const t=`${window.location.hash||""}${window.location.search||""}`;if(/tgWebAppPlatform|tgWebAppData|tgWebAppVersion/i.test(t))return!0}catch{}return!1}function wt(){var e;return(e=window.Telegram)!=null&&e.WebApp?Promise.resolve():new Promise(t=>{const n=document.createElement("script");n.src="https://telegram.org/js/telegram-web-app.js",n.async=!0,n.onload=()=>t(),n.onerror=()=>t(),document.head.appendChild(n)})}function $t(){var n;const e=(n=window.Telegram)==null?void 0:n.WebApp;return e?(e.initData||"").trim().length>0:!1}function Tt(){var e;try{return((e=localStorage.getItem(Y))==null?void 0:e.trim())||""}catch{return""}}function Lt(){try{const e=localStorage.getItem(J);return e?JSON.parse(e):null}catch{return null}}async function kt(){var a,r;_t()&&await wt();const{initData:e,user:t,lang:n}=je();if($t())ae({initData:e,user:t,lang:n,siteToken:""});else{const s=Tt();if(s){const i=Lt(),o=(i==null?void 0:i.language_code)==="en"||(r=(a=i==null?void 0:i.language_code)==null?void 0:a.startsWith)!=null&&r.call(a,"en")||n==="en"?"en":"ru";ae({initData:"",user:i?{first_name:i.first_name,last_name:i.last_name,language_code:i.language_code}:null,lang:o,siteToken:s})}else vt()}}kt().catch(()=>{});
