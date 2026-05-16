(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))n(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const i of r.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&n(i)}).observe(document,{childList:!0,subtree:!0});function a(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(s){if(s.ep)return;s.ep=!0;const r=a(s);fetch(s.href,r)}})();const xe="/assets/full-glowing-brain-Cl127Rfm.png",ve="/assets/amygdala-DP7dGDc4.png",we="/assets/lobes-uZqghd8w.png",Le="/assets/frontal-gyrus-DPq4mhR0.png",$e="/assets/insula-CAJDukm_.png",Te="/assets/pfc-BE-jJY5g.png",Ee="/assets/tpj-Cgg8S5Iu.png",j=["prefrontal_cortex","brain_lobes","insular_cortex","temporoparietal_junction","amygdala","frontal_gyrus"],ke={prefrontal_cortex:Te,brain_lobes:we,insular_cortex:$e,temporoparietal_junction:Ee,amygdala:ve,frontal_gyrus:Le},Se=xe;function Ae(e){const t=j.map(n=>Number(e[n]??0)),a=t.reduce((n,s)=>n+s,0);return Math.round(a/Math.max(t.length,1)*10)/10}const Z="bb-site-session",Q="bb-site-user",ne="bb-site-login-poll";function ze(e,t=""){const a=e==null?void 0:e.detail;return typeof a=="string"&&a.trim()?a.trim():Array.isArray(a)&&a.length?a.map(n=>typeof n=="object"&&(n!=null&&n.msg)?n.msg:String(n)).filter(Boolean).join("; "):t||(e==null?void 0:e.message)||""}function Ne(e,t){const a={"Content-Type":"application/json"};e&&(a["X-Telegram-Init-Data"]=e);const n=(t||"").trim();return n&&(a.Authorization=`Bearer ${n}`),a}async function R(e,{initData:t="",siteToken:a="",method:n="GET",body:s}={}){const r=await fetch(`/api/webapp${e}`,{method:n,headers:Ne(t,a),body:s?JSON.stringify(s):void 0,cache:"no-store"});if(!r.ok){const i=new Error(`HTTP ${r.status}`);i.status=r.status;try{i.detail=(await r.json()).detail}catch{}throw i}return r.json()}function ge(e){var s,r;const t=e.lang==="en"?"en":"ru",a={};for(const i of j)a[i]=Number(((s=e.scores)==null?void 0:s[i])??0);const n={};for(const i of j){const o=((r=e.regions)==null?void 0:r[i])??{};n[i]={main:Number(o.main??a[i]),bullets:o.bullets??[],submetrics:(o.submetrics??[]).map(u=>({label:u.label??u.label_ru??"",value:Number(u.value??a[i])}))}}return{lang:t,userDisplayName:e.userDisplayName??e.user_display_name??"Guest",paid:!!e.paid,hasMap:!!(e.hasMap??e.has_map??Object.keys(e.scores||{}).length),testVariant:e.testVariant??e.test_variant??"development",tributeUrl:e.tributeUrl??e.tribute_url??"",neuroScore:e.neuroScore!=null?Number(e.neuroScore):Ae(a),scores:a,connectivity:e.connectivity??[],regions:n,snapshotId:e.snapshotId??e.snapshot_id??null,createdAt:e.createdAt??e.created_at??null}}async function Ce(){return R("/landing",{initData:"",siteToken:""})}async function Me(e){const t=await R("/profile",{initData:e.initData??"",siteToken:e.siteToken??""});return ge(t)}async function He(e){return R("/history",{initData:e.initData??"",siteToken:e.siteToken??""})}async function Pe(e,t="development"){return R(`/test/questions?variant=${encodeURIComponent(t)}`,{initData:e.initData??"",siteToken:e.siteToken??""})}async function Be(e,{variant:t,answers:a}){const n={variant:t,answers:a},s=await R("/test/submit",{initData:e.initData??"",siteToken:e.siteToken??"",method:"POST",body:n});return ge(s.profile)}async function Ie(e,t){return R(`/exercises/${encodeURIComponent(String(t))}`,{initData:e.initData??"",siteToken:e.siteToken??""})}async function qe(){return R("/auth/site/link",{initData:"",siteToken:"",method:"POST"})}async function Fe(e){return R(`/auth/site/poll?token=${encodeURIComponent(e)}`,{initData:"",siteToken:""})}const De={landingKicker:"BrainBoosty · neuroscience, no fluff",landingTitle:"Upgrade your brain — see your Neural Map",landingTagline:"7 questions → a personal 6-zone brain map, NeuroScore, and clear next steps. All in Telegram.",landingCta:"Boost my brain",landingCtaSub:"Free start in the bot · 2 minutes",landingNavAbout:"About me",landingNavProject:"The project",landingNavHub:"Neural Map Hub",landingNavCta:"Open bot",landingHubTitle:"Neural Map Hub",landingHubLead:"Your brain map, test, history, and exercises—in the browser, same account as the bot and Mini App.",landingHubHint:"You need a profile after the bot onboarding. Tap the button — Telegram opens with /start and a one-time token; confirm with «Start», then return here; this tab will log you in automatically.",landingHubStartLogin:"Open Telegram and confirm",landingHubPrepare:"Preparing your link…",landingHubPolling:"Waiting for confirmation in Telegram… keep this tab open.",landingHubExpired:"That link expired. Tap the button to try again.",landingHubPopupBlocked:"Pop-ups are blocked, so we couldn't open a separate small window. Allow pop-ups for this site or use the button below.",landingHubTryOpenWindow:"Open Telegram in a separate window",landingLoginTelegram:"Log in with Telegram",landingChannelAria:"Telegram channel",landingAboutTitle:"About me",landingAboutParagraphs:["Hi, I'm Damian — creator of BrainBoosty.","I went from anxiety, brain fog, and tension to clarity, inner strength, and confidence. Now I help others with neurobiology, hormones, and cognitive habits.","On my channel I share actionable insights—no marketing noise, only what actually shifts your state."],landingChannelLink:"→ Channel @androgenautist",landingProjectTitle:"What's inside",landingFeatures:["7-question cognitive test — development or sexual profile","Neural Map: 6 brain zones with NeuroScore and recommendations","Progress history and test-to-test comparison","Daily hooks and a private exercise channel"],landingFinalTitle:"Ready to see your map?",landingFinalSub:"Open the bot — onboarding takes a few minutes; your first map is free.",heroBrain:"NEURAL MAP",scoreLabel:"NeuroScore",coverLine:"Six zones · one profile. Numbers, focus, and a clear read—no clutter.",connectivityTitle:"Inter-region links (educational model)",zoneLevel:"Integrated zone level",progressMain:e=>`Your progress ${e}%`,recTitle:"Why this zone is your biggest pleasure lever",footer:"BrainBoosty · educational model · not a medical diagnosis",premiumCta:"Get full access",premiumBadge:"Full access",premiumTitle:"Get full access — today",premiumSub:"A 30-day personal plan, progress tracker, exercises for your profile, and the private channel.",premiumBullets:["Full brain map and all zone recommendations","Progress history with test comparisons","Retests and trend tracking","Private channel and daily hooks"],navMap:"Map",navHistory:"History",navTest:"Test",navPremium:"Access",navLogout:"Log out",appBrandName:"BrainBoosty",appHeaderTitle:"Neural Map",loading:"Loading your neuro profile…",computing:"Computing your brain map…",errorLoad:"Could not load data. Please try again later.",authError:"Open the app from the Telegram bot.",notRegistered:"Take the test in the bot first!",historyTitle:"Progress history",historySub:"Zone comparison across tests. Arrows show percentage-point change.",historyEmpty:"No saved tests yet. Take your first test to see history here.",startTest:"Take the test",latest:"Latest",openThisMap:"Open map",testTitle:"Cognitive test",testPickVariant:"Choose question style (7 steps):",variantDev:"Development & cognition",variantSex:"Sexual profile",variantSexBadge:"Maximum insight",variantSexHint:"Pleasure, drive, and your neural edge",variantDevHint:"Focus, habits, and cognitive style",questionProgress:(e,t)=>`Question ${e} of ${t}`,regions:{prefrontal_cortex:"Prefrontal cortex",brain_lobes:"Brain lobes · imagery",insular_cortex:"Insular cortex",temporoparietal_junction:"Temporoparietal junction",amygdala:"Amygdala",frontal_gyrus:"Frontal gyrus"},interactiveBrainKicker:"Zone",zoneIllustrationOpenAria:"open zone card",zoneDrawerCloseAria:"Close",zoneCurrentLevel:"Current level",zoneWhyTitle:"Why it matters",zoneBoostCta:"Boost this zone",zoneUnlockNote:"Full access unlocks personal drills per zone, progress tracking, and training history.",zoneOpenHistory:"History for this zone",zoneExercisesHeading:"Zone exercises",zoneExerciseListCap:"In your program for this zone:",zoneExercisePlaceholder:"More protocols are on the way — your full access already includes the base track.",zonePaidHint:"More protocols and metrics tailored to your profile are coming next.",zoneReadMoreDetail:"Full zone breakdown below in the feed",zoneWhy:{prefrontal_cortex:"Planning, impulse control, and focus. A stronger PFC means clearer decisions and fewer spirals.",brain_lobes:"Integrates imagery, language, and space. Balance here improves how you read reality and old patterns.",insular_cortex:"Interoception and emotional regulation — the bridge between body state and action.",temporoparietal_junction:"Perspective, attention, and social context — helps you update stories instead of locking in one view.",amygdala:"Threat and reward signaling. Tuning it reduces false alarms while keeping healthy drive.",frontal_gyrus:"Links effort, intention, and follow-through — trained with sequenced action and repetition."},zoneExercises:{prefrontal_cortex:[{title:"90-second stop frame",body:"Before an impulsive reply, state one value and one tiny next step out loud."}],brain_lobes:[{title:"Sensory anchor",body:"For 30s describe one object: color, texture, sound — no judgments."}],insular_cortex:[{title:"Rib-cage breath",body:"4 cycles: inhale 4 counts, soft pause, exhale 6 — attention on rib expansion.",exerciseId:1}],temporoparietal_junction:[{title:"Perspective swap",body:"Phrase the same situation two neutral ways — without «I'm right» framing."}],amygdala:[{title:"Tolerance window",body:"2 min: note 3 neutral facts around a trigger, then one action 2% softer."}],frontal_gyrus:[{title:"Three-step chain",body:"Write three micro-steps for one goal today; track completion only."}]},exerciseLoading:"Loading protocol…",exerciseNotFound:"Exercise not found.",exerciseBackAria:"Back",exerciseTagForWho:"For who",exerciseTagEfficiency:"Effectiveness",exerciseTagFirstResult:"First results",exerciseDifficulty:"Difficulty",exerciseFirstResultDays:e=>`~${e} days`,exerciseEfficiencyLabels:["Low","Moderate","High","Exceptional","Best for this region"],exerciseAccInstruction:"Instruction",exerciseAccResearch:"Research",exerciseAccAmplify:"How to amplify",exerciseAccResults:"Expected outcomes",exerciseNoResearch:"Links will appear here soon.",exerciseCtaPrimary:"Add to my training plan",exerciseCtaMessage:"Sync with your bot plan is coming soon. For now, block time on your calendar and log completion.",exercisePremiumTitle:"Full access",exercisePremiumText:"Channel exercises are available with BrainBoosty full access.",zoneOpenFullExercise:"Open full exercise"},me={landingKicker:"BrainBoosty · нейробиология без воды",landingTitle:"Прокачай мозг — увидь свою Neural Map",landingTagline:"7 вопросов → персональная карта из 6 зон мозга, NeuroScore и понятные шаги. Всё в Telegram.",landingCta:"Прокачать мозг",landingCtaSub:"Бесплатный старт в боте · 2 минуты",landingNavAbout:"Обо мне",landingNavProject:"Проект",landingNavHub:"Neural Map Hub",landingNavCta:"В бота",landingHubTitle:"Neural Map Hub",landingHubLead:"Карта мозга, тест, история и упражнения — в браузере, тот же аккаунт, что в боте и мини-приложении.",landingHubHint:"Нужен аккаунт после анкеты в боте. Нажми кнопку — откроется Telegram с командой /start и одноразовым токеном; подтверди «Start», вернись сюда: страница сама авторизуется.",landingHubStartLogin:"Открыть Telegram и подтвердить вход",landingHubPrepare:"Готовим ссылку…",landingHubPolling:"Ждём подтверждение в Telegram… не закрывай эту вкладку.",landingHubExpired:"Ссылка устарела. Нажми кнопку ещё раз.",landingHubPopupBlocked:"Не удалось открыть отдельное окно для Telegram (блокировка всплывающих окон). Разреши окна для этого сайта или нажми кнопку ниже — откроется компактное окно.",landingHubTryOpenWindow:"Открыть Telegram в отдельном окне",landingLoginTelegram:"Войти через Telegram",landingChannelAria:"Канал в Telegram",landingAboutTitle:"Обо мне",landingAboutParagraphs:["Привет, я Дамиан — автор BrainBoosty.","Сам прошёл путь от тревожности, тумана в голове и зажатости — к ясности, внутренней силе и уверенности. Сейчас помогаю другим по нейробиологии, гормонам и когнитивным привычкам.","В канале делюсь рабочими инсайтами без маркетинговой шелухи — только то, что реально меняет состояние."],landingChannelLink:"→ Канал @androgenautist",landingProjectTitle:"Что внутри",landingFeatures:["Когнитивный тест из 7 вопросов — два стиля (развитие / сексуальный профиль)","Neural Map: 6 зон мозга с NeuroScore и рекомендациями","История прогресса и сравнение между тестами","Ежедневные хуки и закрытый канал с упражнениями"],landingFinalTitle:"Готов увидеть свою карту?",landingFinalSub:"Открой бота — анкета займёт пару минут, первая карта бесплатно.",heroBrain:"NEURAL MAP",scoreLabel:"NeuroScore",coverLine:"Шесть зон · один профиль. Цифры, акценты и ясная картина без лишнего шума.",connectivityTitle:"Связность зон (образовательная модель)",zoneLevel:"Интегральный уровень зоны",progressMain:e=>`Твой прогресс ${e}%`,recTitle:"Почему эта зона — твой главный рычаг удовольствия",footer:"BrainBoosty · образовательная модель · не медицинский диагноз",premiumCta:"Забрать полный доступ",premiumBadge:"Полный доступ",premiumTitle:"Забери полный доступ — сегодня",premiumSub:"Персональный план на 30 дней, трекер прогресса, упражнения под твой профиль и закрытый канал.",premiumBullets:["Полная карта мозга и все рекомендации по зонам","История прогресса с сравнением тестов","Повторные тесты и отслеживание динамики","Закрытый канал и ежедневные хуки"],navMap:"Карта",navHistory:"История",navTest:"Тест",navPremium:"Доступ",navLogout:"Выйти",appBrandName:"BrainBoosty",appHeaderTitle:"Neural Map",loading:"Загружаем нейропрофиль…",computing:"Считаем твою карту мозга…",errorLoad:"Не удалось загрузить данные. Попробуйте позже.",authError:"Откройте приложение из Telegram-бота.",notRegistered:"Пройди тест в боте!",historyTitle:"История прогресса",historySub:"Сравнение зон между прохождениями. Стрелки — изменение в процентных пунктах.",historyEmpty:"Пока нет сохранённых тестов. Пройдите первый тест — и здесь появится история.",startTest:"Пройти тест",latest:"Актуально",openThisMap:"Открыть карту",testTitle:"Когнитивный тест",testPickVariant:"Выберите стиль вопросов (7 шагов):",variantDev:"Развитие и когниция",variantSex:"Сексуальный профиль",variantSexBadge:"Максимум инсайта",variantSexHint:"Удовольствие, драйв и нейронный рельеф",variantDevHint:"Фокус, привычки и когнитивный стиль",questionProgress:(e,t)=>`Вопрос ${e} из ${t}`,regions:{prefrontal_cortex:"Префронтальная кора",brain_lobes:"Доли мозга · образы",insular_cortex:"Островковая кора",temporoparietal_junction:"Височно-теменной узел",amygdala:"Амигдала",frontal_gyrus:"Лобная извилина"},interactiveBrainKicker:"Зона",zoneIllustrationOpenAria:"открыть карточку зоны",zoneDrawerCloseAria:"Закрыть",zoneCurrentLevel:"Текущий уровень",zoneWhyTitle:"Почему это важно",zoneBoostCta:"Прокачать эту зону",zoneUnlockNote:"Полный доступ открывает персональные упражнения под каждую зону, трекер и историю прокачки.",zoneOpenHistory:"История этой зоны",zoneExercisesHeading:"Упражнения для зоны",zoneExerciseListCap:"Сейчас в программе для этой зоны:",zoneExercisePlaceholder:"Скоро добавим ещё шаги — уже доступен базовый протокол в полном доступе.",zonePaidHint:"Дальше — больше протоколов и метрик именно под твой профиль.",zoneReadMoreDetail:"Подробный разбор зоны в ленте ниже",zoneWhy:{prefrontal_cortex:"Планирование, торможение импульсов и фокус. Сильная ПФК — ясные решения, меньше хаоса и откатов.",brain_lobes:"Интеграция образов, языка и пространства. Баланс здесь — лучшее восприятие реальности и выученные паттерны.",insular_cortex:"Телесная осознанность и эмоциональная регуляция. Островок связывает «что чувствую» с «что делаю».",temporoparietal_junction:"Перспектива, внимание и социальный контекст. TPJ помогает не застревать в одной интерпретации событий.",amygdala:"Детектор угроз и сигналов награды. Настрой амигдалы — меньше ложной тревоги, больше спокойного драйва.",frontal_gyrus:"Связь моторики, намерения и усилия. Тренируется через последовательные действия и повторение цели."},zoneExercises:{prefrontal_cortex:[{title:"90 секунд «стоп-рамка»",body:"Перед импульсивным ответом назови вслух одну ценность и одно следующее маленькое действие."}],brain_lobes:[{title:"Сенсорный якорь",body:"30 секунд описывай предмет из комнаты: цвет, фактура, звук — без оценок."}],insular_cortex:[{title:"Дыхание в ребро",body:"4 цикла: вдох 4 счёта, мягкая пауза, выдох 6 — внимание на расширении рёбер.",exerciseId:1}],temporoparietal_junction:[{title:"Смена ракурса",body:"Сформулируй ту же ситуацию двумя нейтральными формулировками, без «я прав»."}],amygdala:[{title:"Окно толерантности",body:"2 минуты: найди 3 нейтральных факта вокруг триггера, затем одно действие на 2% мягче."}],frontal_gyrus:[{title:"Цепочка на 3 шага",body:"Запиши три микрошага к одной цели на сегодня; отмечай только факт выполнения."}]},exerciseLoading:"Загружаем протокол…",exerciseNotFound:"Упражнение не найдено.",exerciseBackAria:"Назад",exerciseTagForWho:"Для кого",exerciseTagEfficiency:"Эффективность",exerciseTagFirstResult:"Первый результат",exerciseDifficulty:"Сложность",exerciseFirstResultDays:e=>`ориентир ≈ ${e} дн.`,exerciseEfficiencyLabels:["Низкая","Средняя","Высокая","Чрезвычайная","Оптимально для отдела"],exerciseAccInstruction:"Инструкция",exerciseAccResearch:"Исследования",exerciseAccAmplify:"Как усилить эффект",exerciseAccResults:"Ожидаемые результаты",exerciseNoResearch:"Ссылки будут добавлены.",exerciseCtaPrimary:"Добавить в мой план прокачки",exerciseCtaMessage:"Скоро здесь будет синхронизация с твоим планом в боте. Пока закрепи время в календаре и отметь выполнение в заметках.",exercisePremiumTitle:"Полный доступ",exercisePremiumText:"Экран упражнений из закрытого канала доступен с подпиской BrainBoosty.",zoneOpenFullExercise:"Полный экран упражнения"},Re={ru:me,en:De};function P(e){return Re[e==="en"?"en":"ru"]??me}const te=new Set;function ae(){const e=(window.location.hash||"#map").replace(/^#/,""),[t,a]=e.split("?");return{name:t||"map",params:new URLSearchParams(a||"")}}function q(e,t={}){var n;const a=((n=t.toString)==null?void 0:n.call(t))||new URLSearchParams(t).toString();window.location.hash=a?`${e}?${a}`:e}function Oe(e){return te.add(e),()=>te.delete(e)}function he(){const e=ae();for(const t of te)t(e)}window.addEventListener("hashchange",he);function je(){he()}function Ue(){var n,s,r;const e=(n=window.Telegram)==null?void 0:n.WebApp;if(!e)return{tg:null,initData:"",user:null,lang:"ru"};e.ready(),e.expand(),e.enableClosingConfirmation(),e.disableVerticalSwipes&&e.disableVerticalSwipes(),se(),e.onEvent("themeChanged",se);const t=((s=e.initDataUnsafe)==null?void 0:s.user)??null,a=(t==null?void 0:t.language_code)==="en"||(r=t==null?void 0:t.language_code)!=null&&r.startsWith("en")?"en":"ru";return e.setHeaderColor&&e.setHeaderColor("#010108"),e.setBackgroundColor&&e.setBackgroundColor("#010108"),{tg:e,initData:e.initData||"",user:t,lang:a}}function se(){const e=document.documentElement;e.style.setProperty("--bb-tg-bg","#010108"),e.style.setProperty("--bb-tg-text","#f1f5f9")}function J(e){var a;const t=(a=window.Telegram)==null?void 0:a.WebApp;if(t!=null&&t.openTelegramLink&&e.includes("t.me/")){t.openTelegramLink(e);return}if(t!=null&&t.openLink){t.openLink(e);return}window.open(e,"_blank","noopener,noreferrer")}function z(){var e,t,a,n;(n=(a=(t=(e=window.Telegram)==null?void 0:e.WebApp)==null?void 0:t.HapticFeedback)==null?void 0:a.impactOccurred)==null||n.call(a,"light")}function A(e){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}function We(){return`
    <div class="bb-zone-drawer__bar-track">
      <div class="bb-zone-drawer__bar-fill" style="width: 0%"></div>
    </div>`}function Ge(e,t,a={}){var d,_,w,T,L,k;const n=P(e.lang),s=n.regions[t]??t,r=((d=n.zoneWhy)==null?void 0:d[t])??"",i=Number(((_=e.scores)==null?void 0:_[t])??0).toFixed(1),o=((w=n.zoneExercises)==null?void 0:w[t])??[],u=o.length>0?o.map(g=>`
                  <li class="bb-zone-drawer__exercise">
                    <p class="bb-zone-drawer__exercise-title">${A(g.title)}</p>
                    <p class="bb-zone-drawer__exercise-body">${A(g.body)}</p>
                    ${g.exerciseId!=null?`<button type="button" class="bb-zone-drawer__ex-open" data-open-exercise="${Number(g.exerciseId)}">${A(n.zoneOpenFullExercise)}</button>`:""}
                  </li>`).join(""):`<li class="bb-zone-drawer__exercise"><p class="bb-zone-drawer__exercise-body">${A(n.zoneExercisePlaceholder)}</p></li>`,l=document.createElement("div");l.className="bb-zone-drawer-host",l.innerHTML=`
    <div class="bb-zone-drawer-backdrop" data-close="1" aria-hidden="true"></div>
    <aside class="bb-zone-drawer glass" role="dialog" aria-modal="true" aria-labelledby="bb-zone-drawer-title">
      <header class="bb-zone-drawer__header">
        <div>
          <p class="bb-zone-drawer__eyebrow">${A(n.interactiveBrainKicker)}</p>
          <h2 id="bb-zone-drawer-title" class="bb-zone-drawer__title">${A(s)}</h2>
        </div>
        <button type="button" class="bb-zone-drawer__close" data-close="1" aria-label="${A(n.zoneDrawerCloseAria)}">
          <span aria-hidden="true">×</span>
        </button>
      </header>
      <div class="bb-zone-drawer__body">
        <div class="bb-zone-drawer__meter">
          <div class="bb-zone-drawer__meter-row">
            <span class="bb-zone-drawer__meter-label">${A(n.zoneCurrentLevel)}</span>
            <span class="bb-zone-drawer__meter-value">${A(i)}%</span>
          </div>
          ${We()}
        </div>
        <div class="bb-zone-drawer__why">
          <p class="bb-zone-drawer__why-title">${A(n.zoneWhyTitle)}</p>
          <p class="bb-zone-drawer__why-text">${A(r)}</p>
        </div>
        <div class="bb-zone-drawer__actions" data-paid-block="${e.paid?"1":"0"}">
          ${e.paid?`
            <div class="bb-zone-drawer__paid-menu">
              <button type="button" class="bb-zone-drawer__btn bb-zone-drawer__btn--ghost" data-go="history">
                ${A(n.zoneOpenHistory)}
              </button>
              <button type="button" class="bb-zone-drawer__btn bb-zone-drawer__btn--ghost" data-toggle="exercises">
                ${A(n.zoneExercisesHeading)}
              </button>
            </div>
            <div class="bb-zone-drawer__exercises" data-exercises hidden>
              <p class="bb-zone-drawer__exercises-cap">${A(n.zoneExerciseListCap)}</p>
              <ul class="bb-zone-drawer__exercise-list">
                ${u}
              </ul>
            </div>
            <p class="bb-zone-drawer__paid-hint">${A(n.zonePaidHint)}</p>
            <button type="button" class="bb-zone-drawer__btn bb-zone-drawer__btn--ghost bb-zone-drawer__btn--compact" data-scroll-zone="${t}">
              ${A(n.zoneReadMoreDetail)}
            </button>`:`
            <p class="bb-zone-drawer__lock-note">${A(n.zoneUnlockNote)}</p>
            <button type="button" class="bb-zone-drawer__btn bb-zone-drawer__btn--primary" data-go="boost">
              ${A(n.zoneBoostCta)}
            </button>
            <button type="button" class="bb-zone-drawer__btn bb-zone-drawer__btn--ghost bb-zone-drawer__btn--compact" data-scroll-zone="${t}">
              ${A(n.zoneReadMoreDetail)}
            </button>`}
        </div>
      </div>
    </aside>
  `,document.body.appendChild(l),document.body.classList.add("bb-zone-drawer-open");const E=l.querySelector(".bb-zone-drawer"),c=l.querySelector("[data-exercises]"),b=l.querySelector(".bb-zone-drawer-backdrop"),p=l.querySelector(".bb-zone-drawer__bar-fill"),y=()=>{var g;document.removeEventListener("keydown",v),document.body.classList.remove("bb-zone-drawer-open"),l.remove(),(g=a.onClose)==null||g.call(a)},v=g=>{g.key==="Escape"&&y()};return document.addEventListener("keydown",v),l.querySelectorAll("[data-close]").forEach(g=>{g.addEventListener("click",()=>{z(),y()})}),(T=l.querySelector('[data-go="boost"]'))==null||T.addEventListener("click",()=>{z(),e.tributeUrl?J(e.tributeUrl):q("premium"),y()}),(L=l.querySelector('[data-go="history"]'))==null||L.addEventListener("click",()=>{z(),q("history",{zone:t}),y()}),(k=l.querySelector('[data-toggle="exercises"]'))==null||k.addEventListener("click",()=>{if(z(),!c)return;c.hasAttribute("hidden")?c.removeAttribute("hidden"):c.setAttribute("hidden","")}),l.querySelectorAll("[data-scroll-zone]").forEach(g=>{g.addEventListener("click",()=>{z();const B=g.getAttribute("data-scroll-zone")||t;y(),requestAnimationFrame(()=>{var I;(I=document.getElementById(`zone-${B}`))==null||I.scrollIntoView({behavior:"smooth",block:"start"})})})}),l.querySelectorAll("[data-open-exercise]").forEach(g=>{g.addEventListener("click",()=>{z();const B=g.getAttribute("data-open-exercise")||"1";y(),q("exercise",{id:B})})}),requestAnimationFrame(()=>{if(E==null||E.classList.add("is-open"),b==null||b.classList.add("is-open"),p){const g=Math.max(0,Math.min(100,Number(i)||0));p.style.width="0%",requestAnimationFrame(()=>{p.style.width=`${g.toFixed(1)}%`})}}),{close:()=>{y()}}}function O(e){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}function Ve(e,{displayName:t,neuroScore:a,connectivity:n}){const s=(n==null?void 0:n.length)>0?`
    <div class="bb-connectivity glass rounded-2xl p-4 mt-5">
      <p class="bb-connectivity__title">${O(e.connectivityTitle)}</p>
      ${n.map(r=>`<p>• ${O(r)}</p>`).join(`
      `)}
    </div>`:"";return`
<section class="bb-section bb-cover" data-section="cover">
  <img src="${Se}" alt="" class="cover-full-brain-hero mb-4" width="360" height="260" decoding="async" />
  <div class="glass rounded-3xl p-6 sm:p-8 cover-neon-card border border-cyan-500/20">
    <p class="text-center text-sm uppercase tracking-[0.35em] text-cyan-200 mt-1 font-semibold drop-shadow-[0_0_16px_rgba(34,211,238,0.55)] bb-cover__kicker">
      ${O(e.heroBrain)}
    </p>
    <h1 class="text-center text-2xl sm:text-3xl font-bold mt-5 text-white drop-shadow-[0_0_20px_rgba(167,139,250,0.25)] neon-zone-title">
      ${O(t)}
    </h1>
    <p class="text-center text-slate-300/95 mt-3 text-[15px] leading-relaxed max-w-md mx-auto tracking-wide px-2">
      ${O(e.coverLine)}
    </p>
    <div class="mt-8 flex flex-col items-center justify-center">
      <p class="bb-cover__score-label text-cyan-100/90 text-sm mb-2 font-medium tracking-wide drop-shadow-[0_0_10px_rgba(34,211,238,0.35)]">
        ${O(e.scoreLabel)}
      </p>
      <div class="text-6xl sm:text-7xl font-black bg-gradient-to-r from-cyan-200 via-violet-300 to-fuchsia-300 bg-clip-text text-transparent neon-score-cover" data-neuro-score>
        ${Number(a).toFixed(1)}
      </div>
    </div>
    ${s}
  </div>
  <p class="text-center text-[11px] text-slate-500 mt-6">${O(e.footer)}</p>
</section>`}function re({label:e,value:t,glow:a=!1}){const n=Math.max(0,Math.min(100,Number(t)||0)),s=Math.max(0,100-n),r=a?"pdf-bar-gradient pdf-bar-gradient--main":"pdf-bar-gradient pdf-bar-gradient--sub",i=Ye(e);return[`<div class="mb-3.5" data-bar-value="${n}">`,'<div class="flex justify-between text-xs text-slate-400 mb-1">',`<span>${i}</span>`,`<span class="text-cyan-100 font-bold tracking-wide">${n.toFixed(1)}%</span>`,"</div>",'<div class="pdf-bar-track">',`<div class="${r}" style="clip-path: inset(0 ${s.toFixed(2)}% 0 0);"></div>`,"</div>","</div>"].join(`
  `)}function Ye(e){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}function U(e){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}function Je(e,t,a){const n=e.regions[t]??t,s=ke[t],r=Number(a.main??0),i=e.progressMain(`${r.toFixed(1)}`),o=[re({label:e.zoneLevel,value:r,glow:!0}),...(a.submetrics??[]).map(l=>re({label:l.label,value:l.value,glow:!1}))].join(`
`),u=(a.bullets??[]).map(l=>`<li>${U(l)}</li>`).join(`
        `);return`
<section class="bb-section bb-region" data-section="region" data-region="${t}" id="zone-${t}">
  <button type="button" class="bb-region__illu-hit" data-open-zone="${t}" aria-label="${U(n)} — ${U(e.zoneIllustrationOpenAria)}">
    <img src="${s}" alt="" class="brain-float-top bb-region__illu" width="320" height="220" loading="lazy" decoding="async" />
  </button>
  <h2 class="bb-region__title neon-zone-title px-2">${U(n)}</h2>
  <p class="bb-region__progress-label">${U(i)}</p>
  <div class="glass rounded-2xl p-4 max-w-xl mx-auto w-full">
    ${o}
  </div>
  <div class="glass rounded-2xl p-4 mt-4 max-w-xl mx-auto w-full">
    <p class="bb-rec-title">${U(e.recTitle)}</p>
    <ul class="bb-rec-list">
        ${u}
    </ul>
  </div>
</section>`}function Xe(e,t,a){const n=P(t.lang),s=t.userDisplayName||(t.lang==="en"?"Guest":"Гость"),r=[Ve(n,{displayName:s,neuroScore:t.neuroScore,connectivity:t.connectivity}),...j.map(i=>{var o,u;return Je(n,i,{main:t.scores[i],bullets:((o=t.regions[i])==null?void 0:o.bullets)??[],submetrics:((u=t.regions[i])==null?void 0:u.submetrics)??[]})})];e.innerHTML=r.join(`
`),Qe(e),Ke(e),et(e),Ze(e,t,a)}function Ze(e,t,a){var o,u;const n=e.querySelectorAll("[data-open-zone]");if(!n.length)return;const s=l=>{e.querySelectorAll(".bb-region").forEach(E=>{const c=E.dataset.region;E.classList.toggle("is-zone-hot",!!l&&c===l)})},r=l=>{!l||!j.includes(l)||(s(l),Ge(t,l,{onClose:()=>s(null)}))};n.forEach(l=>{l.addEventListener("pointerenter",()=>s(l.getAttribute("data-open-zone")||"")),l.addEventListener("pointerleave",E=>{const c=E.relatedTarget;c instanceof Node&&e.contains(c)&&c.closest("[data-open-zone]")||s(null)}),l.addEventListener("click",E=>{E.preventDefault();const c=l.getAttribute("data-open-zone");c&&(z(),r(c))})});const i=(u=(o=a==null?void 0:a.params)==null?void 0:o.get)==null?void 0:u.call(o,"zone");i&&j.includes(i)&&requestAnimationFrame(()=>r(i))}function Qe(e){const t=e.querySelectorAll(".bb-section"),a=new IntersectionObserver(n=>{for(const s of n)s.isIntersecting&&(s.target.classList.add("is-visible"),a.unobserve(s.target))},{root:null,rootMargin:"0px 0px -8% 0px",threshold:.08});t.forEach(n=>a.observe(n))}function Ke(e){const t=e.querySelector("[data-neuro-score]");if(!t)return;const a=parseFloat(t.textContent||"0"),n=1200,s=performance.now(),r=i=>{const o=Math.min(1,(i-s)/n),u=1-(1-o)**3;t.textContent=(a*u).toFixed(1),o<1&&requestAnimationFrame(r)};requestAnimationFrame(r)}function et(e){const t=e.querySelectorAll("[data-bar-value]"),a=new IntersectionObserver(n=>{for(const s of n){if(!s.isIntersecting)continue;const r=s.target,i=parseFloat(r.getAttribute("data-bar-value")||"0"),o=r.querySelector(".pdf-bar-gradient");o&&(o.style.clipPath="inset(0 100% 0 0)",requestAnimationFrame(()=>{o.style.clipPath=`inset(0 ${Math.max(0,100-i).toFixed(2)}% 0 0)`})),a.unobserve(r)}},{threshold:.2});t.forEach(n=>a.observe(n))}function m(e){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}function tt(){return{instruction:'<svg class="ex-ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.25" aria-hidden="true"><path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01"/></svg>',research:'<svg class="ex-ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.25" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3M11 8v6M8 11h6"/></svg>',amplify:'<svg class="ex-ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.25" aria-hidden="true"><path d="M12 3l1.8 5.5h5.7l-4.6 3.4 1.8 5.5-4.7-3.4-4.7 3.4 1.8-5.5-4.6-3.4h5.7L12 3z"/></svg>',results:'<svg class="ex-ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.25" aria-hidden="true"><path d="M4 19V5M9 19v-6M14 19V9M19 19v-9"/><path d="M4 19h16" stroke-linecap="round"/></svg>'}}function ee(e){return String(e||"").split(`
`).map(a=>`<p>${m(a)}</p>`).join("")}function nt(e){e.querySelectorAll(".ex-acc").forEach(t=>{const a=t.querySelector(".ex-acc__trigger");a&&a.addEventListener("click",()=>{const s=!(t.getAttribute("data-open")==="true");t.setAttribute("data-open",String(s)),a.setAttribute("aria-expanded",String(s)),z()})})}function V(e){requestAnimationFrame(()=>{var t;(t=e.querySelector(".ex-lux"))==null||t.classList.add("is-visible")})}async function at(e,t,a,n){var y,v;const s=P(a.lang),r=tt();e.className="bb-root bb-root--spa bb-root--exercise",e.innerHTML=`
    <div class="ex-lux">
      <div class="ex-lux__grid-bg" aria-hidden="true"></div>
      <header class="ex-lux__top">
        <button type="button" class="ex-lux__back" id="ex-back" aria-label="${m(s.exerciseBackAria)}">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M15 6l-6 6 6 6"/></svg>
        </button>
      </header>
      <div class="ex-lux__scroll">
        <div class="ex-lux__inner">
          <div class="ex-lux__loading">
            <div class="ex-lux__pulse"></div>
            <p>${m(s.exerciseLoading)}</p>
          </div>
        </div>
      </div>
      <div class="ex-lux__cta-bar">
        <button type="button" class="ex-lux__cta" id="ex-cta">${m(s.exerciseCtaPrimary)}</button>
      </div>
    </div>`;const i=e.querySelector("#ex-back");if(i==null||i.addEventListener("click",()=>{z(),q("map")}),!Number.isFinite(n)||n<1){const d=e.querySelector(".ex-lux__scroll .ex-lux__inner");d&&(d.innerHTML=`<p class="ex-lux__err">${m(s.exerciseNotFound)}</p>`),V(e);return}if(!a.paid){e.querySelector(".ex-lux__scroll .ex-lux__inner").innerHTML=`
      <div class="ex-lux__hero">
        <p class="ex-lux__lock-title">${m(s.exercisePremiumTitle)}</p>
        <p class="ex-lux__lock-text">${m(s.exercisePremiumText)}</p>
        <button type="button" class="ex-lux__cta ex-lux__cta--inline" id="ex-unlock">${m(s.premiumCta)}</button>
      </div>`,(y=e.querySelector("#ex-unlock"))==null||y.addEventListener("click",()=>{z(),a.tributeUrl?J(a.tributeUrl):q("premium")}),e.querySelector("#ex-cta").textContent=s.premiumCta,(v=e.querySelector("#ex-cta"))==null||v.addEventListener("click",()=>{z(),a.tributeUrl?J(a.tributeUrl):q("premium")}),V(e);return}let o;try{o=await Ie(t,n)}catch(d){const _=e.querySelector(".ex-lux__scroll .ex-lux__inner"),w=(d==null?void 0:d.status)===403?s.exercisePremiumTitle:(d==null?void 0:d.status)===404?s.exerciseNotFound:s.errorLoad;_&&(_.innerHTML=`<p class="ex-lux__err">${m(w)}</p>`),V(e);return}const u=Math.max(0,Math.min(4,(o.effectiveness||3)-1)),l=s.exerciseEfficiencyLabels[u]??"—",E=(o.regions||[]).map(d=>`<span class="ex-lux__pill">${m(s.regions[d]??d)}</span>`).join(""),c=(o.researchLinks||[]).map(d=>`<a class="ex-lux__link" href="${m(d.url)}" target="_blank" rel="noopener noreferrer">${m(d.label||d.url)}</a>`).join(""),b=o.instructionImageUrl?`<figure class="ex-lux__figure"><img src="${m(o.instructionImageUrl)}" alt="" loading="lazy" decoding="async" /></figure>`:"";e.querySelector(".ex-lux__scroll .ex-lux__inner").innerHTML=`
    <div class="ex-lux__hero">
      <div class="ex-lux__emoji" aria-hidden="true">${m(o.emoji||"◆")}</div>
      <h1 class="ex-lux__title">${m(o.title)}</h1>
      <p class="ex-lux__lede">${m(o.shortDescription)}</p>
      <div class="ex-lux__tags">
        <span class="ex-lux__tag"><span class="ex-lux__tag-k">${m(s.exerciseTagForWho)}</span>${m(o.forWho)}</span>
        <span class="ex-lux__tag"><span class="ex-lux__tag-k">${m(s.exerciseTagEfficiency)}</span>${m(l)}</span>
        <span class="ex-lux__tag"><span class="ex-lux__tag-k">${m(s.exerciseTagFirstResult)}</span>${m(s.exerciseFirstResultDays(o.firstResultDays))}</span>
      </div>
      <div class="ex-lux__meta-row">
        <div class="ex-lux__diff">
          <span class="ex-lux__diff-label">${m(s.exerciseDifficulty)}</span>
          <div class="ex-lux__diff-track"><span class="ex-lux__diff-fill" style="width: ${Number(o.difficulty||0)}%"></span></div>
          <span class="ex-lux__diff-num">${m(Number(o.difficulty||0))}</span>
        </div>
      </div>
      <div class="ex-lux__pills">${E}</div>
      ${b}
    </div>

    <div class="ex-lux__accords">
      <div class="ex-acc" data-open="true">
        <button type="button" class="ex-acc__trigger" aria-expanded="true">
          <span class="ex-acc__ic">${r.instruction}</span>
          <span class="ex-acc__label">${m(s.exerciseAccInstruction)}</span>
          <span class="ex-acc__chev" aria-hidden="true"></span>
        </button>
        <div class="ex-acc__panel">
          <div class="ex-acc__panel-inner ex-lux__prose">${ee(o.instruction)}</div>
        </div>
      </div>
      <div class="ex-acc" data-open="false">
        <button type="button" class="ex-acc__trigger" aria-expanded="false">
          <span class="ex-acc__ic">${r.research}</span>
          <span class="ex-acc__label">${m(s.exerciseAccResearch)}</span>
          <span class="ex-acc__chev" aria-hidden="true"></span>
        </button>
        <div class="ex-acc__panel">
          <div class="ex-acc__panel-inner ex-lux__prose ex-lux__links">${c||`<p>${m(s.exerciseNoResearch)}</p>`}</div>
        </div>
      </div>
      <div class="ex-acc" data-open="false">
        <button type="button" class="ex-acc__trigger" aria-expanded="false">
          <span class="ex-acc__ic">${r.amplify}</span>
          <span class="ex-acc__label">${m(s.exerciseAccAmplify)}</span>
          <span class="ex-acc__chev" aria-hidden="true"></span>
        </button>
        <div class="ex-acc__panel">
          <div class="ex-acc__panel-inner ex-lux__prose">${ee(o.amplify)}</div>
        </div>
      </div>
      <div class="ex-acc" data-open="false">
        <button type="button" class="ex-acc__trigger" aria-expanded="false">
          <span class="ex-acc__ic">${r.results}</span>
          <span class="ex-acc__label">${m(s.exerciseAccResults)}</span>
          <span class="ex-acc__chev" aria-hidden="true"></span>
        </button>
        <div class="ex-acc__panel">
          <div class="ex-acc__panel-inner ex-lux__prose">${ee(o.expectedResults)}</div>
        </div>
      </div>
    </div>
    <div class="ex-lux__scroll-pad"></div>`,nt(e);const p=e.querySelector("#ex-cta");p==null||p.addEventListener("click",()=>{var d,_,w;z(),(w=(_=(d=window.Telegram)==null?void 0:d.WebApp)==null?void 0:_.showAlert)==null||w.call(_,s.exerciseCtaMessage)}),V(e)}function Y(e){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}function st(e,t){if(!e)return"—";try{return new Date(e).toLocaleString(t==="en"?"en-GB":"ru-RU",{day:"2-digit",month:"short",year:"numeric",hour:"2-digit",minute:"2-digit"})}catch{return e}}async function rt(e,t,a){var l,E;const n=P(a.lang),s=ae().params.get("zone"),r=document.createElement("section");r.className="bb-section is-visible bb-history",r.innerHTML=`
    <h2 class="bb-page-title bb-page-title--premium neon-zone-title">${Y(n.historyTitle)}</h2>
    <p class="bb-page-sub text-slate-300/90 text-sm mb-4">${Y(n.historySub)}</p>
  `;const i=document.createElement("div");i.className="space-y-3",i.textContent=n.loading,r.appendChild(i),e.replaceChildren(r);let o;try{o=await He(t)}catch{i.innerHTML=`<p class="bb-error">${Y(n.errorLoad)}</p>`;return}const u=o.items??[];if(i.replaceChildren(),!u.length){const c=document.createElement("div");c.className="glass rounded-2xl p-5 text-center";const b=document.createElement("p");b.className="text-slate-200 mb-4",b.textContent=n.historyEmpty;const p=document.createElement("button");p.type="button",p.className="bb-btn-primary",p.textContent=n.startTest,p.addEventListener("click",()=>q("test")),c.append(b,p),i.appendChild(c);return}for(const[c,b]of u.entries()){const p=document.createElement("article");p.className=`glass rounded-2xl p-4 bb-history-card${c===0?" is-active":""}`;const y=document.createElement("div");y.className="flex justify-between items-start gap-2 mb-2";const v=document.createElement("div");if(v.innerHTML=`
      <p class="text-xs text-cyan-200/80 uppercase tracking-wide">${Y(st(b.createdAt,a.lang))}</p>
      <p class="text-lg font-bold text-white mt-1 bb-type-display">NeuroScore <span class="text-cyan-200">${Number(b.neuroScore).toFixed(1)}</span></p>
    `,y.appendChild(v),c===0){const w=document.createElement("span");w.className="bb-badge",w.textContent=n.latest,y.appendChild(w)}p.appendChild(y);const d=document.createElement("div");d.className="bb-history-deltas";for(const w of j){const T=n.regions[w]??w,L=Number(((l=b.scores)==null?void 0:l[w])??0).toFixed(1),k=b.isFirst?"—":((E=b.deltas)==null?void 0:E[w])??"·",g=document.createElement("div");g.className=`bb-history-row${s===w?" bb-history-row--focus":""}`;const B=document.createElement("span");B.textContent=T;const I=document.createElement("span");I.textContent=`${L}%`;const D=document.createElement("span");D.textContent=k,typeof k=="string"&&k.includes("↑")&&(D.className="bb-delta-up"),typeof k=="string"&&k.includes("↓")&&(D.className="bb-delta-down"),g.append(B,I,D),d.appendChild(g)}p.appendChild(d);const _=document.createElement("button");_.type="button",_.className="bb-btn-ghost mt-3 w-full",_.textContent=n.openThisMap,_.addEventListener("click",()=>q("map")),p.appendChild(_),i.appendChild(p)}s&&u.length&&requestAnimationFrame(()=>{var c;(c=r.querySelector(".bb-history-row--focus"))==null||c.scrollIntoView({block:"center",behavior:"smooth"})})}function W(e){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}function it(e,t){var n;const a=P(t.lang);e.innerHTML=`
    <section class="bb-section is-visible bb-premium">
      <div class="mb-3 rounded-full px-5 py-1.5 border border-cyan-400/30 bg-cyan-500/10 text-xs font-bold uppercase tracking-[0.35em] text-cyan-100 text-center bb-type-display">
        ${W(a.premiumBadge)}
      </div>
      <h2 class="bb-page-title bb-page-title--premium neon-cta-title mb-4">
        ${W(a.premiumTitle)}
      </h2>
      <p class="text-slate-200 text-center text-sm leading-relaxed mb-6">${W(a.premiumSub)}</p>
      <ul class="bb-premium-list glass rounded-2xl p-5 mb-6 space-y-3 text-sm text-slate-200">
        ${a.premiumBullets.map(s=>`<li>${W(s)}</li>`).join("")}
      </ul>
      <button type="button" class="bb-btn-premium-buy w-full" id="bb-premium-buy">${W(a.premiumCta)}</button>
    </section>
  `,(n=e.querySelector("#bb-premium-buy"))==null||n.addEventListener("click",()=>{z(),t.tributeUrl&&J(t.tributeUrl)})}function C(e){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}async function ot(e,t,a,{onProfile:n}={}){const s=P(a.lang),r={variant:a.testVariant||"development",questions:[],answers:{},step:0},i=document.createElement("section");i.className="bb-section is-visible bb-test",e.replaceChildren(i);async function o(){i.innerHTML=`<p class="text-cyan-200/80 text-sm">${C(s.loading)}</p>`;try{const c=await Pe(t,r.variant);r.questions=c.questions??[],r.step=0,r.answers={},l()}catch{i.innerHTML=`<p class="bb-error">${C(s.errorLoad)}</p>`}}function u(){i.innerHTML=`
      <div class="bb-test-pick">
        <div class="bb-test-pick__glow" aria-hidden="true"></div>
        <h2 class="bb-page-title bb-page-title--premium neon-zone-title">${C(s.testTitle)}</h2>
        <p class="bb-page-sub text-slate-300/90 text-sm mb-1 leading-relaxed">${C(s.testPickVariant)}</p>
        <div class="bb-test-variant-grid">
          <button type="button" class="bb-btn-hero" data-variant="sexual">
            <span class="bb-btn-hero__badge">${C(s.variantSexBadge)}</span>
            <span class="bb-btn-hero__label">${C(s.variantSex)}</span>
            <span class="bb-btn-hero__hint">${C(s.variantSexHint)}</span>
          </button>
          <button type="button" class="bb-btn-alt" data-variant="development">
            <span class="bb-btn-alt__label">${C(s.variantDev)}</span>
            <span class="bb-btn-alt__hint">${C(s.variantDevHint)}</span>
          </button>
        </div>
      </div>
    `,i.querySelectorAll("[data-variant]").forEach(c=>{c.addEventListener("click",()=>{z(),r.variant=c.getAttribute("data-variant")||"development",o()})})}function l(){const c=r.questions[r.step];if(!c){u();return}const b=r.questions.length,p=(r.step+1)/b*100;i.innerHTML=`
      <div class="bb-test-progress mb-4">
        <div class="flex justify-between text-xs text-cyan-200/80 mb-1">
          <span>${C(s.questionProgress(r.step+1,b))}</span>
          <span>${Math.round(p)}%</span>
        </div>
        <div class="pdf-bar-track"><div class="pdf-bar-gradient pdf-bar-gradient--main" style="clip-path: inset(0 ${(100-p).toFixed(1)}% 0 0)"></div></div>
      </div>
      <h2 class="bb-test-q-title">${C(c.topic)}</h2>
      <p class="text-slate-200 mb-4 leading-relaxed">${C(c.text)}</p>
      <div class="grid gap-2 bb-test-options" id="bb-test-options"></div>
    `;const y=i.querySelector("#bb-test-options");for(const v of c.options??[]){const d=document.createElement("button");d.type="button",d.className="bb-test-option",d.innerHTML=`<span class="bb-test-option-key">${C(v.key)}</span><span>${C(v.label)}</span>`,d.addEventListener("click",()=>E(v.key)),y.appendChild(d)}}async function E(c){z();const b=r.questions[r.step];if(r.answers[b.id]=c,r.step+1<r.questions.length){r.step+=1,l();return}i.innerHTML=`
      <div class="bb-loading">
        <div class="bb-loading__pulse"></div>
        <p class="text-sm text-cyan-200/80">${C(s.computing)}</p>
      </div>`;try{const p={};for(const[v,d]of Object.entries(r.answers))p[String(v)]=d;const y=await Be(t,{variant:r.variant,answers:p});n&&n(y),q("map")}catch{i.innerHTML=`<p class="bb-error">${C(s.errorLoad)}</p>`}}u()}let f=null,H=null;function lt(e){var r;document.body.classList.add("bb-app--needs-bot"),(r=document.querySelector(".bb-premium-fab"))==null||r.remove();const t=document.getElementById("bb-nav");t&&(t.hidden=!0,t.innerHTML="");const a=P(f.lang);e.className="bb-root bb-root--spa bb-root--bot-gate",e.replaceChildren();const n=document.createElement("div");n.className="bb-bot-gate",n.setAttribute("role","status");const s=document.createElement("p");s.className="bb-bot-gate__line",s.textContent=a.notRegistered,n.appendChild(s),e.appendChild(n)}async function ct(e){var a;if(H)return document.body.classList.remove("bb-app--needs-bot"),!0;const t=P(f.lang);e.className="bb-root bb-root--spa",e.innerHTML=`
      <div class="bb-loading">
        <div class="bb-loading__pulse"></div>
        <p class="text-sm text-cyan-200/80">${t.loading}</p>
      </div>`;try{return H=await Me(f),document.body.classList.remove("bb-app--needs-bot"),fe(H),(a=f.user)!=null&&a.first_name&&!H.userDisplayName&&(H.userDisplayName=[f.user.first_name,f.user.last_name].filter(Boolean).join(" ")),!0}catch(n){if((n==null?void 0:n.status)===401&&(n==null?void 0:n.detail)==="invalid_site_token"&&(f!=null&&f.siteToken)){try{localStorage.removeItem(Z),localStorage.removeItem(Q)}catch{}return window.location.replace("/"),!1}if((n==null?void 0:n.status)===403&&(n==null?void 0:n.detail)==="not_registered")return lt(e),!1;const s=(n==null?void 0:n.status)===403?t.notRegistered:(n==null?void 0:n.status)===401?t.authError:t.errorLoad;return e.className="bb-root bb-root--spa",e.innerHTML=`<p class="bb-error">${s}</p>`,!1}}function dt(e){const t=document.getElementById("bb-nav");t&&t.querySelectorAll(".bb-nav__btn[data-route]").forEach(a=>{a.classList.toggle("is-active",a.dataset.route===e)})}function ut(e){if(!f)return;const t=e==="en"?"en":"ru";if(f.lang===t)return;f.lang=t,document.documentElement.lang=t;const a=P(t),n=document.getElementById("bb-header-wordmark");n&&(n.textContent=a.appBrandName),ye(t)}function fe(e){e!=null&&e.lang&&ut(e.lang)}function bt(e){var n;if((n=document.querySelector(".bb-premium-fab"))==null||n.remove(),e.paid||!e.tributeUrl)return;const t=P((f==null?void 0:f.lang)||e.lang),a=document.createElement("button");a.type="button",a.className="bb-premium-fab",a.textContent=t.premiumCta,a.addEventListener("click",()=>{z(),q("premium")}),document.body.appendChild(a)}function ye(e){var s;const t=document.getElementById("bb-nav");if(!t)return;const a=P(e);t.hidden=!1;const n=f!=null&&f.siteToken?`<button type="button" class="bb-nav__btn bb-nav__btn--logout" data-site-logout>${a.navLogout}</button>`:"";t.innerHTML=`
    <button type="button" class="bb-nav__btn" data-route="map">${a.navMap}</button>
    <button type="button" class="bb-nav__btn" data-route="history">${a.navHistory}</button>
    <button type="button" class="bb-nav__btn" data-route="test">${a.navTest}</button>
    <button type="button" class="bb-nav__btn" data-route="premium">${a.navPremium}</button>
    ${n}
  `,t.querySelectorAll(".bb-nav__btn[data-route]").forEach(r=>{r.addEventListener("click",()=>{z(),q(r.dataset.route||"map")})}),(s=t.querySelector("[data-site-logout]"))==null||s.addEventListener("click",()=>{z();try{localStorage.removeItem(Z),localStorage.removeItem(Q)}catch{}window.location.replace("/")})}async function ie(e){var s;const t=document.getElementById("bb-root");if(!t||!f)return;const a=document.getElementById("bb-nav"),n=e.name==="exercise";if(document.body.classList.toggle("bb-route-exercise",n),n||dt(e.name),e.name!=="map"&&((s=document.querySelector(".bb-premium-fab"))==null||s.remove()),!!await ct(t)){if(ye(f.lang),a&&(a.hidden=n),e.name==="premium"){it(t,H);return}if(e.name==="test"){await ot(t,f,H,{onProfile:r=>{H=r,fe(r)}});return}if(e.name==="history"){await rt(t,f,H);return}if(e.name==="exercise"){const r=parseInt(e.params.get("id")||"0",10);await at(t,f,H,r);return}if(!H.hasMap&&e.name==="map"){q("test");return}Xe(t,H,e),bt(H)}}async function oe(e){const t=e.lang==="en"?"en":"ru";f={initData:e.initData??"",user:e.user??null,lang:t,siteToken:e.siteToken??""},H=null,document.body.classList.add("bb-app--telegram"),f.siteToken&&document.body.classList.add("bb-app--site");const a=document.getElementById("bb-root");if(!a)return;a.classList.add("bb-root--spa");const n=P(f.lang),s=document.getElementById("bb-header-wordmark");s&&(s.textContent=n.appBrandName),Oe(i=>{ie(i).catch(()=>{})}),je();const r=ae();window.location.hash?await ie(r):q("map")}const le="/assets/full-glowing-brain-Cl127Rfm.png",ce=.088,de=15,ue=2,be=.4;function X(e,t,a){return Math.max(t,Math.min(a,e))}function pt(){var e,t;return((t=(e=window.matchMedia)==null?void 0:e.call(window,"(prefers-reduced-motion: reduce)"))==null?void 0:t.matches)??!1}function gt(e,t,a){const n=e.getBoundingClientRect(),s=80,r=Math.max(n.width+s*2,1),i=Math.max(n.height+s*2,1),o=n.left+n.width/2,u=n.top+n.height/2;return{nx:X((t-o)/(r*.5),-1,1),ny:X((a-u)/(i*.5),-1,1)}}function mt(e){var w,T;if(pt())return()=>{};const t=e.querySelector("[data-parallax-brain]"),a=e.querySelector("[data-parallax-glow]");if(!t)return()=>{};let n={nx:0,ny:0},s=!1,r={nx:0,ny:0},i=!1,o=0,u=0,l=0;const E=((T=(w=window.matchMedia)==null?void 0:w.call(window,"(pointer: coarse)"))==null?void 0:T.matches)??!1,c=()=>s?{tx:n.nx,ty:n.ny}:i?{tx:r.nx*.62,ty:r.ny*.62}:{tx:0,ty:0},b=()=>{l=0;const{tx:L,ty:k}=c();o+=(L-o)*ce,u+=(k-u)*ce;const g=o*de,B=u*de,I=u*-ue,D=o*ue;if(t.style.transform=`translate3d(${g}px, ${B}px, 0) rotateX(${I}deg) rotateY(${D}deg)`,a){const S=-g*be,M=-B*be;a.style.transform=`translate3d(calc(-50% + ${S}px), calc(-50% + ${M}px), 0) scale(1.06)`}const{tx:x,ty:h}=c(),F=Math.abs(o-x)>.003||Math.abs(u-h)>.003,N=Math.abs(o)>.004||Math.abs(u)>.004;(F||N||i)&&(l=requestAnimationFrame(b))},p=()=>{l||(l=requestAnimationFrame(b))},y=L=>{if(!L.isTrusted)return;const{nx:k,ny:g}=gt(e,L.clientX,L.clientY);n={nx:k,ny:g},s=!0,p()},v=()=>{s=!0},d=()=>{s=!1,p()};e.addEventListener("pointermove",y,{passive:!0}),e.addEventListener("pointerenter",v),e.addEventListener("pointerleave",d),e.addEventListener("pointerdown",()=>{E&&typeof(DeviceOrientationEvent==null?void 0:DeviceOrientationEvent.requestPermission)=="function"&&DeviceOrientationEvent.requestPermission().then(L=>{L==="granted"&&(i=!0)}).catch(()=>{})},{passive:!0});let _=null;return window.DeviceOrientationEvent&&(_=L=>{if(L.gamma==null||L.beta==null)return;const k=X(L.gamma/32,-1,1),g=X((L.beta-44)/36,-1,1);r={nx:k,ny:g},i=!0,p()},window.addEventListener("deviceorientation",_,!0)),t.style.willChange="transform",a&&(a.style.willChange="transform"),p(),()=>{e.removeEventListener("pointermove",y),e.removeEventListener("pointerenter",v),e.removeEventListener("pointerleave",d),_&&window.removeEventListener("deviceorientation",_,!0),l&&cancelAnimationFrame(l),t.style.willChange="",t.style.transform="",a&&(a.style.willChange="",a.style.transform="")}}const ht={root:null,rootMargin:"0px 0px -10% 0px",threshold:.08};function ft(e,{reducedMotion:t}){if(t)return e.querySelectorAll(".bb-landing-reveal").forEach(s=>s.classList.add("is-in-view")),()=>{};const a=e.querySelectorAll(".bb-landing-reveal");if(!a.length)return()=>{};const n=new IntersectionObserver(s=>{for(const r of s)r.isIntersecting&&(r.target.classList.add("is-in-view"),n.unobserve(r.target))},ht);return a.forEach(s=>n.observe(s)),()=>{n.disconnect()}}function $(e){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}const _e="bb-landing-lang",yt=960*1e3;function _t(){try{const e=sessionStorage.getItem(ne);if(!e)return null;const t=JSON.parse(e);return!(t!=null&&t.loginToken)||typeof t.loginToken!="string"||typeof t.startedAt!="number"||t.lang!=="en"&&t.lang!=="ru"?null:t}catch{return null}}function xt(e){try{sessionStorage.setItem(ne,JSON.stringify(e))}catch{}}function G(){try{sessionStorage.removeItem(ne)}catch{}}function vt(){try{const e=localStorage.getItem(_e);if(e==="en"||e==="ru")return e}catch{}return null}function wt(e){document.body.classList.add("bb-lang-gate-open");const t=document.createElement("div");t.className="bb-lang-gate",t.setAttribute("role","dialog"),t.setAttribute("aria-modal","true"),t.setAttribute("aria-labelledby","bb-lang-gate-title"),t.innerHTML=`
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
  `,document.body.appendChild(t);const a=n=>{try{localStorage.setItem(_e,n)}catch{}document.body.classList.remove("bb-lang-gate-open"),t.remove(),e(n)};t.querySelectorAll("[data-lang]").forEach(n=>{n.addEventListener("click",()=>a(n.getAttribute("data-lang")||"ru"))}),requestAnimationFrame(()=>{var n;(n=t.querySelector(".bb-lang-gate__btn"))==null||n.focus()})}async function Lt(){const e=document.getElementById("bb-header"),t=document.getElementById("bb-nav");e&&(e.hidden=!0),t&&(t.hidden=!0);const a=document.getElementById("bb-root");if(!a)return;const n=vt();if(!n){a.className="bb-root",a.innerHTML="",wt(s=>{pe(s).catch(()=>{})});return}await pe(n)}async function pe(e){var D;const t=P(e);document.documentElement.lang=e;const a=document.getElementById("bb-root");if(!a)return;a.className="bb-root bb-root--landing",a.innerHTML=`
    <div class="bb-loading">
      <div class="bb-loading__pulse"></div>
    </div>`;let n={botUrl:"https://t.me/brainboosty?start=site",webappEntryUrl:"https://t.me/brainboosty?start=webapp",channelUrl:"https://t.me/androgenautist",hasAuthorPhoto:!1,hasChannelAvatar:!1,neuralMapHubUrl:"/#hub-login",hubHostDisplay:"neuralmap.brainboosty.app"};try{n={...n,...await Ce()}}catch{}const s="/api/webapp/landing/photo",r=t.landingFeatures.map(x=>`<li>${$(x)}</li>`).join(""),i=window.matchMedia("(prefers-reduced-motion: reduce)").matches;a.innerHTML=`
    <div class="bb-landing">
      <header id="top" class="bb-landing-hero">
        <div class="bb-landing-hero__visual-anchor">
          <div class="bb-landing-hero__glow" aria-hidden="true" data-parallax-glow></div>
          <div class="bb-landing-hero__brain-layer" data-parallax-brain>
            <img class="bb-landing-hero__brain" src="${le}" alt="" width="280" height="280" decoding="async" />
          </div>
        </div>
        <div class="bb-landing-hero__copy bb-landing-reveal">
        <p class="bb-landing-kicker">${$(t.landingKicker)}</p>
        <h1 class="bb-landing-title neon-zone-title">${$(t.landingTitle)}</h1>
        <p class="bb-landing-tagline">${$(t.landingTagline)}</p>
        <div class="bb-landing-hero__ctas">
          <a class="bb-landing-cta-primary" href="${$(n.botUrl)}" rel="noopener noreferrer">
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
            <img class="bb-landing-about__photo" src="${s}" alt="" width="320" height="320" loading="lazy" data-fallback-src="${le}" />
            <div class="bb-landing-about__ring" aria-hidden="true"></div>
          </div>
          <div class="bb-landing-about__text">
            ${t.landingAboutParagraphs.map(x=>`<p>${$(x)}</p>`).join("")}
            <a class="bb-landing-link" href="${$(n.channelUrl)}" target="_blank" rel="noopener noreferrer">
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
        <p class="bb-landing-hub__domain" translate="no">${$(n.hubHostDisplay)}</p>
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
          <a class="bb-landing-cta-primary bb-landing-cta-primary--lg" href="${$(n.botUrl)}" rel="noopener noreferrer">
            ${$(t.landingCta)}
          </a>
        </div>
      </section>

      <footer class="bb-landing-footer">
        <span>BrainBoosty · Neural Map</span>
      </footer>
    </div>
  `,a.querySelectorAll(".bb-landing-about__photo").forEach(x=>{const h=x.getAttribute("data-fallback-src");h&&x.addEventListener("error",()=>{x.removeAttribute("data-fallback-src"),x.src=h})}),a.querySelectorAll('a[href^="#"]').forEach(x=>{x.addEventListener("click",h=>{var S;const F=(S=x.getAttribute("href"))==null?void 0:S.slice(1);if(!F)return;const N=document.getElementById(F);N&&(h.preventDefault(),N.scrollIntoView({behavior:"smooth",block:"start"}))})});const o=a.querySelector(".bb-landing"),u=ft(o||a,{reducedMotion:i}),l=a.querySelector(".bb-landing-hero"),E=l?mt(l):()=>{};let c=null,b=null;const p="bb_tg_site_login",y="width=440,height=720,left=100,top=80,scrollbars=yes,resizable=yes,toolbar=no,menubar=no,location=no,status=no,directories=no",v=()=>{try{b&&!b.closed&&b.close()}catch{}b=null},d=()=>{c!=null&&(clearInterval(c),c=null)},_=()=>{u(),E(),window.removeEventListener("pagehide",_)};window.addEventListener("pagehide",_);const w=a.querySelectorAll("[data-start-site-login]"),T=a.querySelector(".bb-landing-hub__status"),L=x=>{w.forEach(h=>{h.disabled=x})},k=x=>{if(!T||(T.replaceChildren(),!x))return;const h=document.createElement("p");h.className="bb-landing-hub__status-line",h.textContent=x,T.appendChild(h)},g=(x,h)=>{if(!T)return;T.hidden=!1,T.replaceChildren();const F=document.createElement("p");F.className="bb-landing-hub__status-line",F.textContent=h.landingHubPopupBlocked;const N=document.createElement("button");N.type="button",N.className="bb-landing-hub__manual-popup",N.textContent=h.landingHubTryOpenWindow,N.addEventListener("click",()=>{const S=window.open(x,p,y);S&&(b=S,k(h.landingHubPolling))}),T.appendChild(F),T.appendChild(N)},B=(x,h)=>{d();const F=async()=>{var N,S;try{const M=await Fe(x);if(M.status==="ready"){d(),G(),v(),localStorage.setItem(Z,M.accessToken),localStorage.setItem(Q,JSON.stringify({first_name:((N=M.user)==null?void 0:N.first_name)??"",last_name:((S=M.user)==null?void 0:S.last_name)??"",language_code:M.lang==="en"?"en":"ru"})),window.location.replace("/#map"),window.location.reload();return}(M.status==="expired"||M.status==="not_found")&&(d(),G(),v(),L(!1),k(h.landingHubExpired))}catch{}};c=setInterval(F,2e3),F()};w.forEach(x=>{x.addEventListener("click",async()=>{var N;const h=P(e);d(),G(),(N=document.getElementById("hub-login"))==null||N.scrollIntoView({behavior:"smooth",block:"start"}),L(!0),T&&(T.hidden=!1,k(h.landingHubPrepare)),v(),b=window.open("about:blank",p,y);try{const S=await qe(),M=S==null?void 0:S.loginToken,K=S==null?void 0:S.telegramLink;if(!M||!K)throw new Error(h.errorLoad);if(xt({loginToken:M,lang:e,startedAt:Date.now()}),b&&!b.closed){try{b.location.href=K}catch{}try{b.focus()}catch{}k(h.landingHubPolling),B(M,h);return}v(),g(K,h),B(M,h),L(!1)}catch(S){d(),G(),v(),L(!1),T&&(T.hidden=!1,k(ze(S,h.errorLoad)))}})});const I=_t();I&&I.lang===e&&Date.now()-I.startedAt<yt?((D=document.getElementById("hub-login"))==null||D.scrollIntoView({behavior:"smooth",block:"start"}),L(!0),T&&(T.hidden=!1,k(t.landingHubPolling)),B(I.loginToken,t)):I&&G()}function $t(){try{const e=navigator.userAgent||"";if(/Telegram/i.test(e))return!0;const t=`${window.location.hash||""}${window.location.search||""}`;if(/tgWebAppPlatform|tgWebAppData|tgWebAppVersion/i.test(t))return!0}catch{}return!1}function Tt(){var e;return(e=window.Telegram)!=null&&e.WebApp?Promise.resolve():new Promise(t=>{const a=document.createElement("script");a.src="https://telegram.org/js/telegram-web-app.js",a.async=!0,a.onload=()=>t(),a.onerror=()=>t(),document.head.appendChild(a)})}function Et(){var a;const e=(a=window.Telegram)==null?void 0:a.WebApp;return e?(e.initData||"").trim().length>0:!1}function kt(){var e;try{return((e=localStorage.getItem(Z))==null?void 0:e.trim())||""}catch{return""}}function St(){try{const e=localStorage.getItem(Q);return e?JSON.parse(e):null}catch{return null}}async function At(){var n,s;$t()&&await Tt();const{initData:e,user:t,lang:a}=Ue();if(Et())oe({initData:e,user:t,lang:a,siteToken:""});else{const r=kt();if(r){const i=St(),o=(i==null?void 0:i.language_code)==="en"||(s=(n=i==null?void 0:i.language_code)==null?void 0:n.startsWith)!=null&&s.call(n,"en")||a==="en"?"en":"ru";oe({initData:"",user:i?{first_name:i.first_name,last_name:i.last_name,language_code:i.language_code}:null,lang:o,siteToken:r})}else Lt()}}At().catch(()=>{});
