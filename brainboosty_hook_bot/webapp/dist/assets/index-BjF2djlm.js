(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))n(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const i of r.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&n(i)}).observe(document,{childList:!0,subtree:!0});function a(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(s){if(s.ep)return;s.ep=!0;const r=a(s);fetch(s.href,r)}})();const xe="/assets/full-glowing-brain-Cl127Rfm.png",_e="/assets/amygdala-DP7dGDc4.png",ve="/assets/lobes-uZqghd8w.png",we="/assets/frontal-gyrus-DPq4mhR0.png",Le="/assets/insula-CAJDukm_.png",$e="/assets/pfc-BE-jJY5g.png",Te="/assets/tpj-Cgg8S5Iu.png",O=["prefrontal_cortex","brain_lobes","insular_cortex","temporoparietal_junction","amygdala","frontal_gyrus"],Ee={prefrontal_cortex:$e,brain_lobes:ve,insular_cortex:Le,temporoparietal_junction:Te,amygdala:_e,frontal_gyrus:we},Se=xe;function ke(e){const t=O.map(n=>Number(e[n]??0)),a=t.reduce((n,s)=>n+s,0);return Math.round(a/Math.max(t.length,1)*10)/10}const X="bb-site-session",Z="bb-site-user",ee="bb-site-login-poll";function Ae(e,t=""){const a=e==null?void 0:e.detail;return typeof a=="string"&&a.trim()?a.trim():Array.isArray(a)&&a.length?a.map(n=>typeof n=="object"&&(n!=null&&n.msg)?n.msg:String(n)).filter(Boolean).join("; "):t||(e==null?void 0:e.message)||""}function ze(e,t){const a={"Content-Type":"application/json"};e&&(a["X-Telegram-Init-Data"]=e);const n=(t||"").trim();return n&&(a.Authorization=`Bearer ${n}`),a}async function D(e,{initData:t="",siteToken:a="",method:n="GET",body:s}={}){const r=await fetch(`/api/webapp${e}`,{method:n,headers:ze(t,a),body:s?JSON.stringify(s):void 0,cache:"no-store"});if(!r.ok){const i=new Error(`HTTP ${r.status}`);i.status=r.status;try{i.detail=(await r.json()).detail}catch{}throw i}return r.json()}function be(e){var s,r;const t=e.lang==="en"?"en":"ru",a={};for(const i of O)a[i]=Number(((s=e.scores)==null?void 0:s[i])??0);const n={};for(const i of O){const o=((r=e.regions)==null?void 0:r[i])??{};n[i]={main:Number(o.main??a[i]),bullets:o.bullets??[],submetrics:(o.submetrics??[]).map(u=>({label:u.label??u.label_ru??"",value:Number(u.value??a[i])}))}}return{lang:t,userDisplayName:e.userDisplayName??e.user_display_name??"Guest",paid:!!e.paid,hasMap:!!(e.hasMap??e.has_map??Object.keys(e.scores||{}).length),testVariant:e.testVariant??e.test_variant??"development",tributeUrl:e.tributeUrl??e.tribute_url??"",neuroScore:e.neuroScore!=null?Number(e.neuroScore):ke(a),scores:a,connectivity:e.connectivity??[],regions:n,snapshotId:e.snapshotId??e.snapshot_id??null,createdAt:e.createdAt??e.created_at??null}}async function Me(){return D("/landing",{initData:"",siteToken:""})}async function Ce(e){const t=await D("/profile",{initData:e.initData??"",siteToken:e.siteToken??""});return be(t)}async function Ne(e){return D("/history",{initData:e.initData??"",siteToken:e.siteToken??""})}async function He(e,t="development"){return D(`/test/questions?variant=${encodeURIComponent(t)}`,{initData:e.initData??"",siteToken:e.siteToken??""})}async function Pe(e,{variant:t,answers:a}){const n={variant:t,answers:a},s=await D("/test/submit",{initData:e.initData??"",siteToken:e.siteToken??"",method:"POST",body:n});return be(s.profile)}async function Be(e,t){return D(`/exercises/${encodeURIComponent(String(t))}`,{initData:e.initData??"",siteToken:e.siteToken??""})}async function Ie(){return D("/auth/site/link",{initData:"",siteToken:"",method:"POST"})}async function qe(e){return D(`/auth/site/poll?token=${encodeURIComponent(e)}`,{initData:"",siteToken:""})}const Fe={landingKicker:"BrainBoosty · neuroscience, no fluff",landingTitle:"Upgrade your brain — see your Neural Map",landingTagline:"7 questions → a personal 6-zone brain map, NeuroScore, and clear next steps. All in Telegram.",landingCta:"Boost my brain",landingCtaSub:"Free start in the bot · 2 minutes",landingNavAbout:"About me",landingNavProject:"The project",landingNavHub:"Neural Map Hub",landingNavCta:"Open bot",landingHubTitle:"Neural Map Hub",landingHubLead:"Your brain map, test, history, and exercises—in the browser, same account as the bot and Mini App.",landingHubHint:"You need a profile after the bot onboarding. Tap the button — Telegram opens with /start and a one-time token; confirm with «Start», then return here; this tab will log you in automatically.",landingHubStartLogin:"Open Telegram and confirm",landingHubPrepare:"Preparing your link…",landingHubPolling:"Waiting for confirmation in Telegram… keep this tab open.",landingHubExpired:"That link expired. Tap the button to try again.",landingHubPopupBlocked:"Your browser blocked the Telegram window. Allow pop-ups for this site and try again.",landingHubReturnSameTab:"Telegram will open next. After you tap Start in the bot, return to this browser tab to finish sign-in.",landingLoginTelegram:"Log in with Telegram",landingChannelAria:"Telegram channel",landingAboutTitle:"About me",landingAboutParagraphs:["Hi, I'm Damian — creator of BrainBoosty.","I went from anxiety, brain fog, and tension to clarity, inner strength, and confidence. Now I help others with neurobiology, hormones, and cognitive habits.","On my channel I share actionable insights—no marketing noise, only what actually shifts your state."],landingChannelLink:"→ Channel @androgenautist",landingProjectTitle:"What's inside",landingFeatures:["7-question cognitive test — development or sexual profile","Neural Map: 6 brain zones with NeuroScore and recommendations","Progress history and test-to-test comparison","Daily hooks and a private exercise channel"],landingFinalTitle:"Ready to see your map?",landingFinalSub:"Open the bot — onboarding takes a few minutes; your first map is free.",heroBrain:"NEURAL MAP",scoreLabel:"NeuroScore",coverLine:"Six zones · one profile. Numbers, focus, and a clear read—no clutter.",connectivityTitle:"Inter-region links (educational model)",zoneLevel:"Integrated zone level",progressMain:e=>`Your progress ${e}%`,recTitle:"Why this zone is your biggest pleasure lever",footer:"BrainBoosty · educational model · not a medical diagnosis",premiumCta:"Get full access",premiumBadge:"Full access",premiumTitle:"Get full access — today",premiumSub:"A 30-day personal plan, progress tracker, exercises for your profile, and the private channel.",premiumBullets:["Full brain map and all zone recommendations","Progress history with test comparisons","Retests and trend tracking","Private channel and daily hooks"],navMap:"Map",navHistory:"History",navTest:"Test",navPremium:"Access",navLogout:"Log out",appBrandName:"BrainBoosty",appHeaderTitle:"Neural Map",loading:"Loading your neuro profile…",computing:"Computing your brain map…",errorLoad:"Could not load data. Please try again later.",authError:"Open the app from the Telegram bot.",notRegistered:"Take the test in the bot first!",historyTitle:"Progress history",historySub:"Zone comparison across tests. Arrows show percentage-point change.",historyEmpty:"No saved tests yet. Take your first test to see history here.",startTest:"Take the test",latest:"Latest",openThisMap:"Open map",testTitle:"Cognitive test",testPickVariant:"Choose question style (7 steps):",variantDev:"Development & cognition",variantSex:"Sexual profile",variantSexBadge:"Maximum insight",variantSexHint:"Pleasure, drive, and your neural edge",variantDevHint:"Focus, habits, and cognitive style",questionProgress:(e,t)=>`Question ${e} of ${t}`,regions:{prefrontal_cortex:"Prefrontal cortex",brain_lobes:"Brain lobes · imagery",insular_cortex:"Insular cortex",temporoparietal_junction:"Temporoparietal junction",amygdala:"Amygdala",frontal_gyrus:"Frontal gyrus"},interactiveBrainKicker:"Zone",zoneIllustrationOpenAria:"open zone card",zoneDrawerCloseAria:"Close",zoneCurrentLevel:"Current level",zoneWhyTitle:"Why it matters",zoneBoostCta:"Boost this zone",zoneUnlockNote:"Full access unlocks personal drills per zone, progress tracking, and training history.",zoneOpenHistory:"History for this zone",zoneExercisesHeading:"Zone exercises",zoneExerciseListCap:"In your program for this zone:",zoneExercisePlaceholder:"More protocols are on the way — your full access already includes the base track.",zonePaidHint:"More protocols and metrics tailored to your profile are coming next.",zoneReadMoreDetail:"Full zone breakdown below in the feed",zoneWhy:{prefrontal_cortex:"Planning, impulse control, and focus. A stronger PFC means clearer decisions and fewer spirals.",brain_lobes:"Integrates imagery, language, and space. Balance here improves how you read reality and old patterns.",insular_cortex:"Interoception and emotional regulation — the bridge between body state and action.",temporoparietal_junction:"Perspective, attention, and social context — helps you update stories instead of locking in one view.",amygdala:"Threat and reward signaling. Tuning it reduces false alarms while keeping healthy drive.",frontal_gyrus:"Links effort, intention, and follow-through — trained with sequenced action and repetition."},zoneExercises:{prefrontal_cortex:[{title:"90-second stop frame",body:"Before an impulsive reply, state one value and one tiny next step out loud."}],brain_lobes:[{title:"Sensory anchor",body:"For 30s describe one object: color, texture, sound — no judgments."}],insular_cortex:[{title:"Rib-cage breath",body:"4 cycles: inhale 4 counts, soft pause, exhale 6 — attention on rib expansion.",exerciseId:1}],temporoparietal_junction:[{title:"Perspective swap",body:"Phrase the same situation two neutral ways — without «I'm right» framing."}],amygdala:[{title:"Tolerance window",body:"2 min: note 3 neutral facts around a trigger, then one action 2% softer."}],frontal_gyrus:[{title:"Three-step chain",body:"Write three micro-steps for one goal today; track completion only."}]},exerciseLoading:"Loading protocol…",exerciseNotFound:"Exercise not found.",exerciseBackAria:"Back",exerciseTagForWho:"For who",exerciseTagEfficiency:"Effectiveness",exerciseTagFirstResult:"First results",exerciseDifficulty:"Difficulty",exerciseFirstResultDays:e=>`~${e} days`,exerciseEfficiencyLabels:["Low","Moderate","High","Exceptional","Best for this region"],exerciseAccInstruction:"Instruction",exerciseAccResearch:"Research",exerciseAccAmplify:"How to amplify",exerciseAccResults:"Expected outcomes",exerciseNoResearch:"Links will appear here soon.",exerciseCtaPrimary:"Add to my training plan",exerciseCtaMessage:"Sync with your bot plan is coming soon. For now, block time on your calendar and log completion.",exercisePremiumTitle:"Full access",exercisePremiumText:"Channel exercises are available with BrainBoosty full access.",zoneOpenFullExercise:"Open full exercise"},pe={landingKicker:"BrainBoosty · нейробиология без воды",landingTitle:"Прокачай мозг — увидь свою Neural Map",landingTagline:"7 вопросов → персональная карта из 6 зон мозга, NeuroScore и понятные шаги. Всё в Telegram.",landingCta:"Прокачать мозг",landingCtaSub:"Бесплатный старт в боте · 2 минуты",landingNavAbout:"Обо мне",landingNavProject:"Проект",landingNavHub:"Neural Map Hub",landingNavCta:"В бота",landingHubTitle:"Neural Map Hub",landingHubLead:"Карта мозга, тест, история и упражнения — в браузере, тот же аккаунт, что в боте и мини-приложении.",landingHubHint:"Нужен аккаунт после анкеты в боте. Нажми кнопку — откроется Telegram с командой /start и одноразовым токеном; подтверди «Start», вернись сюда: страница сама авторизуется.",landingHubStartLogin:"Открыть Telegram и подтвердить вход",landingHubPrepare:"Готовим ссылку…",landingHubPolling:"Ждём подтверждение в Telegram… не закрывай эту вкладку.",landingHubExpired:"Ссылка устарела. Нажми кнопку ещё раз.",landingHubPopupBlocked:"Браузер заблокировал окно Telegram. Разреши всплывающие окна для этого сайта и нажми кнопку снова.",landingHubReturnSameTab:"Сейчас откроется Telegram. После кнопки Start в боте вернись в этот браузер на эту вкладку — вход завершится сам.",landingLoginTelegram:"Войти через Telegram",landingChannelAria:"Канал в Telegram",landingAboutTitle:"Обо мне",landingAboutParagraphs:["Привет, я Дамиан — автор BrainBoosty.","Сам прошёл путь от тревожности, тумана в голове и зажатости — к ясности, внутренней силе и уверенности. Сейчас помогаю другим по нейробиологии, гормонам и когнитивным привычкам.","В канале делюсь рабочими инсайтами без маркетинговой шелухи — только то, что реально меняет состояние."],landingChannelLink:"→ Канал @androgenautist",landingProjectTitle:"Что внутри",landingFeatures:["Когнитивный тест из 7 вопросов — два стиля (развитие / сексуальный профиль)","Neural Map: 6 зон мозга с NeuroScore и рекомендациями","История прогресса и сравнение между тестами","Ежедневные хуки и закрытый канал с упражнениями"],landingFinalTitle:"Готов увидеть свою карту?",landingFinalSub:"Открой бота — анкета займёт пару минут, первая карта бесплатно.",heroBrain:"NEURAL MAP",scoreLabel:"NeuroScore",coverLine:"Шесть зон · один профиль. Цифры, акценты и ясная картина без лишнего шума.",connectivityTitle:"Связность зон (образовательная модель)",zoneLevel:"Интегральный уровень зоны",progressMain:e=>`Твой прогресс ${e}%`,recTitle:"Почему эта зона — твой главный рычаг удовольствия",footer:"BrainBoosty · образовательная модель · не медицинский диагноз",premiumCta:"Забрать полный доступ",premiumBadge:"Полный доступ",premiumTitle:"Забери полный доступ — сегодня",premiumSub:"Персональный план на 30 дней, трекер прогресса, упражнения под твой профиль и закрытый канал.",premiumBullets:["Полная карта мозга и все рекомендации по зонам","История прогресса с сравнением тестов","Повторные тесты и отслеживание динамики","Закрытый канал и ежедневные хуки"],navMap:"Карта",navHistory:"История",navTest:"Тест",navPremium:"Доступ",navLogout:"Выйти",appBrandName:"BrainBoosty",appHeaderTitle:"Neural Map",loading:"Загружаем нейропрофиль…",computing:"Считаем твою карту мозга…",errorLoad:"Не удалось загрузить данные. Попробуйте позже.",authError:"Откройте приложение из Telegram-бота.",notRegistered:"Пройди тест в боте!",historyTitle:"История прогресса",historySub:"Сравнение зон между прохождениями. Стрелки — изменение в процентных пунктах.",historyEmpty:"Пока нет сохранённых тестов. Пройдите первый тест — и здесь появится история.",startTest:"Пройти тест",latest:"Актуально",openThisMap:"Открыть карту",testTitle:"Когнитивный тест",testPickVariant:"Выберите стиль вопросов (7 шагов):",variantDev:"Развитие и когниция",variantSex:"Сексуальный профиль",variantSexBadge:"Максимум инсайта",variantSexHint:"Удовольствие, драйв и нейронный рельеф",variantDevHint:"Фокус, привычки и когнитивный стиль",questionProgress:(e,t)=>`Вопрос ${e} из ${t}`,regions:{prefrontal_cortex:"Префронтальная кора",brain_lobes:"Доли мозга · образы",insular_cortex:"Островковая кора",temporoparietal_junction:"Височно-теменной узел",amygdala:"Амигдала",frontal_gyrus:"Лобная извилина"},interactiveBrainKicker:"Зона",zoneIllustrationOpenAria:"открыть карточку зоны",zoneDrawerCloseAria:"Закрыть",zoneCurrentLevel:"Текущий уровень",zoneWhyTitle:"Почему это важно",zoneBoostCta:"Прокачать эту зону",zoneUnlockNote:"Полный доступ открывает персональные упражнения под каждую зону, трекер и историю прокачки.",zoneOpenHistory:"История этой зоны",zoneExercisesHeading:"Упражнения для зоны",zoneExerciseListCap:"Сейчас в программе для этой зоны:",zoneExercisePlaceholder:"Скоро добавим ещё шаги — уже доступен базовый протокол в полном доступе.",zonePaidHint:"Дальше — больше протоколов и метрик именно под твой профиль.",zoneReadMoreDetail:"Подробный разбор зоны в ленте ниже",zoneWhy:{prefrontal_cortex:"Планирование, торможение импульсов и фокус. Сильная ПФК — ясные решения, меньше хаоса и откатов.",brain_lobes:"Интеграция образов, языка и пространства. Баланс здесь — лучшее восприятие реальности и выученные паттерны.",insular_cortex:"Телесная осознанность и эмоциональная регуляция. Островок связывает «что чувствую» с «что делаю».",temporoparietal_junction:"Перспектива, внимание и социальный контекст. TPJ помогает не застревать в одной интерпретации событий.",amygdala:"Детектор угроз и сигналов награды. Настрой амигдалы — меньше ложной тревоги, больше спокойного драйва.",frontal_gyrus:"Связь моторики, намерения и усилия. Тренируется через последовательные действия и повторение цели."},zoneExercises:{prefrontal_cortex:[{title:"90 секунд «стоп-рамка»",body:"Перед импульсивным ответом назови вслух одну ценность и одно следующее маленькое действие."}],brain_lobes:[{title:"Сенсорный якорь",body:"30 секунд описывай предмет из комнаты: цвет, фактура, звук — без оценок."}],insular_cortex:[{title:"Дыхание в ребро",body:"4 цикла: вдох 4 счёта, мягкая пауза, выдох 6 — внимание на расширении рёбер.",exerciseId:1}],temporoparietal_junction:[{title:"Смена ракурса",body:"Сформулируй ту же ситуацию двумя нейтральными формулировками, без «я прав»."}],amygdala:[{title:"Окно толерантности",body:"2 минуты: найди 3 нейтральных факта вокруг триггера, затем одно действие на 2% мягче."}],frontal_gyrus:[{title:"Цепочка на 3 шага",body:"Запиши три микрошага к одной цели на сегодня; отмечай только факт выполнения."}]},exerciseLoading:"Загружаем протокол…",exerciseNotFound:"Упражнение не найдено.",exerciseBackAria:"Назад",exerciseTagForWho:"Для кого",exerciseTagEfficiency:"Эффективность",exerciseTagFirstResult:"Первый результат",exerciseDifficulty:"Сложность",exerciseFirstResultDays:e=>`ориентир ≈ ${e} дн.`,exerciseEfficiencyLabels:["Низкая","Средняя","Высокая","Чрезвычайная","Оптимально для отдела"],exerciseAccInstruction:"Инструкция",exerciseAccResearch:"Исследования",exerciseAccAmplify:"Как усилить эффект",exerciseAccResults:"Ожидаемые результаты",exerciseNoResearch:"Ссылки будут добавлены.",exerciseCtaPrimary:"Добавить в мой план прокачки",exerciseCtaMessage:"Скоро здесь будет синхронизация с твоим планом в боте. Пока закрепи время в календаре и отметь выполнение в заметках.",exercisePremiumTitle:"Полный доступ",exercisePremiumText:"Экран упражнений из закрытого канала доступен с подпиской BrainBoosty.",zoneOpenFullExercise:"Полный экран упражнения"},De={ru:pe,en:Fe};function H(e){return De[e==="en"?"en":"ru"]??pe}const K=new Set;function te(){const e=(window.location.hash||"#map").replace(/^#/,""),[t,a]=e.split("?");return{name:t||"map",params:new URLSearchParams(a||"")}}function B(e,t={}){var n;const a=((n=t.toString)==null?void 0:n.call(t))||new URLSearchParams(t).toString();window.location.hash=a?`${e}?${a}`:e}function Re(e){return K.add(e),()=>K.delete(e)}function ge(){const e=te();for(const t of K)t(e)}window.addEventListener("hashchange",ge);function Oe(){ge()}function je(){var n,s,r;const e=(n=window.Telegram)==null?void 0:n.WebApp;if(!e)return{tg:null,initData:"",user:null,lang:"ru"};e.ready(),e.expand(),e.enableClosingConfirmation(),e.disableVerticalSwipes&&e.disableVerticalSwipes(),ne(),e.onEvent("themeChanged",ne);const t=((s=e.initDataUnsafe)==null?void 0:s.user)??null,a=(t==null?void 0:t.language_code)==="en"||(r=t==null?void 0:t.language_code)!=null&&r.startsWith("en")?"en":"ru";return e.setHeaderColor&&e.setHeaderColor("#010108"),e.setBackgroundColor&&e.setBackgroundColor("#010108"),{tg:e,initData:e.initData||"",user:t,lang:a}}function ne(){const e=document.documentElement;e.style.setProperty("--bb-tg-bg","#010108"),e.style.setProperty("--bb-tg-text","#f1f5f9")}function Y(e){var a;const t=(a=window.Telegram)==null?void 0:a.WebApp;if(t!=null&&t.openTelegramLink&&e.includes("t.me/")){t.openTelegramLink(e);return}if(t!=null&&t.openLink){t.openLink(e);return}window.open(e,"_blank","noopener,noreferrer")}function S(){var e,t,a,n;(n=(a=(t=(e=window.Telegram)==null?void 0:e.WebApp)==null?void 0:t.HapticFeedback)==null?void 0:a.impactOccurred)==null||n.call(a,"light")}function E(e){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}function Ue(){return`
    <div class="bb-zone-drawer__bar-track">
      <div class="bb-zone-drawer__bar-fill" style="width: 0%"></div>
    </div>`}function We(e,t,a={}){var d,x,v,w,$,A;const n=H(e.lang),s=n.regions[t]??t,r=((d=n.zoneWhy)==null?void 0:d[t])??"",i=Number(((x=e.scores)==null?void 0:x[t])??0).toFixed(1),o=((v=n.zoneExercises)==null?void 0:v[t])??[],u=o.length>0?o.map(b=>`
                  <li class="bb-zone-drawer__exercise">
                    <p class="bb-zone-drawer__exercise-title">${E(b.title)}</p>
                    <p class="bb-zone-drawer__exercise-body">${E(b.body)}</p>
                    ${b.exerciseId!=null?`<button type="button" class="bb-zone-drawer__ex-open" data-open-exercise="${Number(b.exerciseId)}">${E(n.zoneOpenFullExercise)}</button>`:""}
                  </li>`).join(""):`<li class="bb-zone-drawer__exercise"><p class="bb-zone-drawer__exercise-body">${E(n.zoneExercisePlaceholder)}</p></li>`,l=document.createElement("div");l.className="bb-zone-drawer-host",l.innerHTML=`
    <div class="bb-zone-drawer-backdrop" data-close="1" aria-hidden="true"></div>
    <aside class="bb-zone-drawer glass" role="dialog" aria-modal="true" aria-labelledby="bb-zone-drawer-title">
      <header class="bb-zone-drawer__header">
        <div>
          <p class="bb-zone-drawer__eyebrow">${E(n.interactiveBrainKicker)}</p>
          <h2 id="bb-zone-drawer-title" class="bb-zone-drawer__title">${E(s)}</h2>
        </div>
        <button type="button" class="bb-zone-drawer__close" data-close="1" aria-label="${E(n.zoneDrawerCloseAria)}">
          <span aria-hidden="true">×</span>
        </button>
      </header>
      <div class="bb-zone-drawer__body">
        <div class="bb-zone-drawer__meter">
          <div class="bb-zone-drawer__meter-row">
            <span class="bb-zone-drawer__meter-label">${E(n.zoneCurrentLevel)}</span>
            <span class="bb-zone-drawer__meter-value">${E(i)}%</span>
          </div>
          ${Ue()}
        </div>
        <div class="bb-zone-drawer__why">
          <p class="bb-zone-drawer__why-title">${E(n.zoneWhyTitle)}</p>
          <p class="bb-zone-drawer__why-text">${E(r)}</p>
        </div>
        <div class="bb-zone-drawer__actions" data-paid-block="${e.paid?"1":"0"}">
          ${e.paid?`
            <div class="bb-zone-drawer__paid-menu">
              <button type="button" class="bb-zone-drawer__btn bb-zone-drawer__btn--ghost" data-go="history">
                ${E(n.zoneOpenHistory)}
              </button>
              <button type="button" class="bb-zone-drawer__btn bb-zone-drawer__btn--ghost" data-toggle="exercises">
                ${E(n.zoneExercisesHeading)}
              </button>
            </div>
            <div class="bb-zone-drawer__exercises" data-exercises hidden>
              <p class="bb-zone-drawer__exercises-cap">${E(n.zoneExerciseListCap)}</p>
              <ul class="bb-zone-drawer__exercise-list">
                ${u}
              </ul>
            </div>
            <p class="bb-zone-drawer__paid-hint">${E(n.zonePaidHint)}</p>
            <button type="button" class="bb-zone-drawer__btn bb-zone-drawer__btn--ghost bb-zone-drawer__btn--compact" data-scroll-zone="${t}">
              ${E(n.zoneReadMoreDetail)}
            </button>`:`
            <p class="bb-zone-drawer__lock-note">${E(n.zoneUnlockNote)}</p>
            <button type="button" class="bb-zone-drawer__btn bb-zone-drawer__btn--primary" data-go="boost">
              ${E(n.zoneBoostCta)}
            </button>
            <button type="button" class="bb-zone-drawer__btn bb-zone-drawer__btn--ghost bb-zone-drawer__btn--compact" data-scroll-zone="${t}">
              ${E(n.zoneReadMoreDetail)}
            </button>`}
        </div>
      </div>
    </aside>
  `,document.body.appendChild(l),document.body.classList.add("bb-zone-drawer-open");const T=l.querySelector(".bb-zone-drawer"),c=l.querySelector("[data-exercises]"),p=l.querySelector(".bb-zone-drawer-backdrop"),g=l.querySelector(".bb-zone-drawer__bar-fill"),y=()=>{var b;document.removeEventListener("keydown",_),document.body.classList.remove("bb-zone-drawer-open"),l.remove(),(b=a.onClose)==null||b.call(a)},_=b=>{b.key==="Escape"&&y()};return document.addEventListener("keydown",_),l.querySelectorAll("[data-close]").forEach(b=>{b.addEventListener("click",()=>{S(),y()})}),(w=l.querySelector('[data-go="boost"]'))==null||w.addEventListener("click",()=>{S(),e.tributeUrl?Y(e.tributeUrl):B("premium"),y()}),($=l.querySelector('[data-go="history"]'))==null||$.addEventListener("click",()=>{S(),B("history",{zone:t}),y()}),(A=l.querySelector('[data-toggle="exercises"]'))==null||A.addEventListener("click",()=>{if(S(),!c)return;c.hasAttribute("hidden")?c.removeAttribute("hidden"):c.setAttribute("hidden","")}),l.querySelectorAll("[data-scroll-zone]").forEach(b=>{b.addEventListener("click",()=>{S();const C=b.getAttribute("data-scroll-zone")||t;y(),requestAnimationFrame(()=>{var q;(q=document.getElementById(`zone-${C}`))==null||q.scrollIntoView({behavior:"smooth",block:"start"})})})}),l.querySelectorAll("[data-open-exercise]").forEach(b=>{b.addEventListener("click",()=>{S();const C=b.getAttribute("data-open-exercise")||"1";y(),B("exercise",{id:C})})}),requestAnimationFrame(()=>{if(T==null||T.classList.add("is-open"),p==null||p.classList.add("is-open"),g){const b=Math.max(0,Math.min(100,Number(i)||0));g.style.width="0%",requestAnimationFrame(()=>{g.style.width=`${b.toFixed(1)}%`})}}),{close:()=>{y()}}}function R(e){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}function Ge(e,{displayName:t,neuroScore:a,connectivity:n}){const s=(n==null?void 0:n.length)>0?`
    <div class="bb-connectivity glass rounded-2xl p-4 mt-5">
      <p class="bb-connectivity__title">${R(e.connectivityTitle)}</p>
      ${n.map(r=>`<p>• ${R(r)}</p>`).join(`
      `)}
    </div>`:"";return`
<section class="bb-section bb-cover" data-section="cover">
  <img src="${Se}" alt="" class="cover-full-brain-hero mb-4" width="360" height="260" decoding="async" />
  <div class="glass rounded-3xl p-6 sm:p-8 cover-neon-card border border-cyan-500/20">
    <p class="text-center text-sm uppercase tracking-[0.35em] text-cyan-200 mt-1 font-semibold drop-shadow-[0_0_16px_rgba(34,211,238,0.55)] bb-cover__kicker">
      ${R(e.heroBrain)}
    </p>
    <h1 class="text-center text-2xl sm:text-3xl font-bold mt-5 text-white drop-shadow-[0_0_20px_rgba(167,139,250,0.25)] neon-zone-title">
      ${R(t)}
    </h1>
    <p class="text-center text-slate-300/95 mt-3 text-[15px] leading-relaxed max-w-md mx-auto tracking-wide px-2">
      ${R(e.coverLine)}
    </p>
    <div class="mt-8 flex flex-col items-center justify-center">
      <p class="bb-cover__score-label text-cyan-100/90 text-sm mb-2 font-medium tracking-wide drop-shadow-[0_0_10px_rgba(34,211,238,0.35)]">
        ${R(e.scoreLabel)}
      </p>
      <div class="text-6xl sm:text-7xl font-black bg-gradient-to-r from-cyan-200 via-violet-300 to-fuchsia-300 bg-clip-text text-transparent neon-score-cover" data-neuro-score>
        ${Number(a).toFixed(1)}
      </div>
    </div>
    ${s}
  </div>
  <p class="text-center text-[11px] text-slate-500 mt-6">${R(e.footer)}</p>
</section>`}function ae({label:e,value:t,glow:a=!1}){const n=Math.max(0,Math.min(100,Number(t)||0)),s=Math.max(0,100-n),r=a?"pdf-bar-gradient pdf-bar-gradient--main":"pdf-bar-gradient pdf-bar-gradient--sub",i=Ve(e);return[`<div class="mb-3.5" data-bar-value="${n}">`,'<div class="flex justify-between text-xs text-slate-400 mb-1">',`<span>${i}</span>`,`<span class="text-cyan-100 font-bold tracking-wide">${n.toFixed(1)}%</span>`,"</div>",'<div class="pdf-bar-track">',`<div class="${r}" style="clip-path: inset(0 ${s.toFixed(2)}% 0 0);"></div>`,"</div>","</div>"].join(`
  `)}function Ve(e){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}function j(e){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}function Ye(e,t,a){const n=e.regions[t]??t,s=Ee[t],r=Number(a.main??0),i=e.progressMain(`${r.toFixed(1)}`),o=[ae({label:e.zoneLevel,value:r,glow:!0}),...(a.submetrics??[]).map(l=>ae({label:l.label,value:l.value,glow:!1}))].join(`
`),u=(a.bullets??[]).map(l=>`<li>${j(l)}</li>`).join(`
        `);return`
<section class="bb-section bb-region" data-section="region" data-region="${t}" id="zone-${t}">
  <button type="button" class="bb-region__illu-hit" data-open-zone="${t}" aria-label="${j(n)} — ${j(e.zoneIllustrationOpenAria)}">
    <img src="${s}" alt="" class="brain-float-top bb-region__illu" width="320" height="220" loading="lazy" decoding="async" />
  </button>
  <h2 class="bb-region__title neon-zone-title px-2">${j(n)}</h2>
  <p class="bb-region__progress-label">${j(i)}</p>
  <div class="glass rounded-2xl p-4 max-w-xl mx-auto w-full">
    ${o}
  </div>
  <div class="glass rounded-2xl p-4 mt-4 max-w-xl mx-auto w-full">
    <p class="bb-rec-title">${j(e.recTitle)}</p>
    <ul class="bb-rec-list">
        ${u}
    </ul>
  </div>
</section>`}function Je(e,t,a){const n=H(t.lang),s=t.userDisplayName||(t.lang==="en"?"Guest":"Гость"),r=[Ge(n,{displayName:s,neuroScore:t.neuroScore,connectivity:t.connectivity}),...O.map(i=>{var o,u;return Ye(n,i,{main:t.scores[i],bullets:((o=t.regions[i])==null?void 0:o.bullets)??[],submetrics:((u=t.regions[i])==null?void 0:u.submetrics)??[]})})];e.innerHTML=r.join(`
`),Ze(e),Qe(e),Ke(e),Xe(e,t,a)}function Xe(e,t,a){var o,u;const n=e.querySelectorAll("[data-open-zone]");if(!n.length)return;const s=l=>{e.querySelectorAll(".bb-region").forEach(T=>{const c=T.dataset.region;T.classList.toggle("is-zone-hot",!!l&&c===l)})},r=l=>{!l||!O.includes(l)||(s(l),We(t,l,{onClose:()=>s(null)}))};n.forEach(l=>{l.addEventListener("pointerenter",()=>s(l.getAttribute("data-open-zone")||"")),l.addEventListener("pointerleave",T=>{const c=T.relatedTarget;c instanceof Node&&e.contains(c)&&c.closest("[data-open-zone]")||s(null)}),l.addEventListener("click",T=>{T.preventDefault();const c=l.getAttribute("data-open-zone");c&&(S(),r(c))})});const i=(u=(o=a==null?void 0:a.params)==null?void 0:o.get)==null?void 0:u.call(o,"zone");i&&O.includes(i)&&requestAnimationFrame(()=>r(i))}function Ze(e){const t=e.querySelectorAll(".bb-section"),a=new IntersectionObserver(n=>{for(const s of n)s.isIntersecting&&(s.target.classList.add("is-visible"),a.unobserve(s.target))},{root:null,rootMargin:"0px 0px -8% 0px",threshold:.08});t.forEach(n=>a.observe(n))}function Qe(e){const t=e.querySelector("[data-neuro-score]");if(!t)return;const a=parseFloat(t.textContent||"0"),n=1200,s=performance.now(),r=i=>{const o=Math.min(1,(i-s)/n),u=1-(1-o)**3;t.textContent=(a*u).toFixed(1),o<1&&requestAnimationFrame(r)};requestAnimationFrame(r)}function Ke(e){const t=e.querySelectorAll("[data-bar-value]"),a=new IntersectionObserver(n=>{for(const s of n){if(!s.isIntersecting)continue;const r=s.target,i=parseFloat(r.getAttribute("data-bar-value")||"0"),o=r.querySelector(".pdf-bar-gradient");o&&(o.style.clipPath="inset(0 100% 0 0)",requestAnimationFrame(()=>{o.style.clipPath=`inset(0 ${Math.max(0,100-i).toFixed(2)}% 0 0)`})),a.unobserve(r)}},{threshold:.2});t.forEach(n=>a.observe(n))}function m(e){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}function et(){return{instruction:'<svg class="ex-ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.25" aria-hidden="true"><path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01"/></svg>',research:'<svg class="ex-ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.25" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3M11 8v6M8 11h6"/></svg>',amplify:'<svg class="ex-ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.25" aria-hidden="true"><path d="M12 3l1.8 5.5h5.7l-4.6 3.4 1.8 5.5-4.7-3.4-4.7 3.4 1.8-5.5-4.6-3.4h5.7L12 3z"/></svg>',results:'<svg class="ex-ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.25" aria-hidden="true"><path d="M4 19V5M9 19v-6M14 19V9M19 19v-9"/><path d="M4 19h16" stroke-linecap="round"/></svg>'}}function Q(e){return String(e||"").split(`
`).map(a=>`<p>${m(a)}</p>`).join("")}function tt(e){e.querySelectorAll(".ex-acc").forEach(t=>{const a=t.querySelector(".ex-acc__trigger");a&&a.addEventListener("click",()=>{const s=!(t.getAttribute("data-open")==="true");t.setAttribute("data-open",String(s)),a.setAttribute("aria-expanded",String(s)),S()})})}function G(e){requestAnimationFrame(()=>{var t;(t=e.querySelector(".ex-lux"))==null||t.classList.add("is-visible")})}async function nt(e,t,a,n){var y,_;const s=H(a.lang),r=et();e.className="bb-root bb-root--spa bb-root--exercise",e.innerHTML=`
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
    </div>`;const i=e.querySelector("#ex-back");if(i==null||i.addEventListener("click",()=>{S(),B("map")}),!Number.isFinite(n)||n<1){const d=e.querySelector(".ex-lux__scroll .ex-lux__inner");d&&(d.innerHTML=`<p class="ex-lux__err">${m(s.exerciseNotFound)}</p>`),G(e);return}if(!a.paid){e.querySelector(".ex-lux__scroll .ex-lux__inner").innerHTML=`
      <div class="ex-lux__hero">
        <p class="ex-lux__lock-title">${m(s.exercisePremiumTitle)}</p>
        <p class="ex-lux__lock-text">${m(s.exercisePremiumText)}</p>
        <button type="button" class="ex-lux__cta ex-lux__cta--inline" id="ex-unlock">${m(s.premiumCta)}</button>
      </div>`,(y=e.querySelector("#ex-unlock"))==null||y.addEventListener("click",()=>{S(),a.tributeUrl?Y(a.tributeUrl):B("premium")}),e.querySelector("#ex-cta").textContent=s.premiumCta,(_=e.querySelector("#ex-cta"))==null||_.addEventListener("click",()=>{S(),a.tributeUrl?Y(a.tributeUrl):B("premium")}),G(e);return}let o;try{o=await Be(t,n)}catch(d){const x=e.querySelector(".ex-lux__scroll .ex-lux__inner"),v=(d==null?void 0:d.status)===403?s.exercisePremiumTitle:(d==null?void 0:d.status)===404?s.exerciseNotFound:s.errorLoad;x&&(x.innerHTML=`<p class="ex-lux__err">${m(v)}</p>`),G(e);return}const u=Math.max(0,Math.min(4,(o.effectiveness||3)-1)),l=s.exerciseEfficiencyLabels[u]??"—",T=(o.regions||[]).map(d=>`<span class="ex-lux__pill">${m(s.regions[d]??d)}</span>`).join(""),c=(o.researchLinks||[]).map(d=>`<a class="ex-lux__link" href="${m(d.url)}" target="_blank" rel="noopener noreferrer">${m(d.label||d.url)}</a>`).join(""),p=o.instructionImageUrl?`<figure class="ex-lux__figure"><img src="${m(o.instructionImageUrl)}" alt="" loading="lazy" decoding="async" /></figure>`:"";e.querySelector(".ex-lux__scroll .ex-lux__inner").innerHTML=`
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
      <div class="ex-lux__pills">${T}</div>
      ${p}
    </div>

    <div class="ex-lux__accords">
      <div class="ex-acc" data-open="true">
        <button type="button" class="ex-acc__trigger" aria-expanded="true">
          <span class="ex-acc__ic">${r.instruction}</span>
          <span class="ex-acc__label">${m(s.exerciseAccInstruction)}</span>
          <span class="ex-acc__chev" aria-hidden="true"></span>
        </button>
        <div class="ex-acc__panel">
          <div class="ex-acc__panel-inner ex-lux__prose">${Q(o.instruction)}</div>
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
          <div class="ex-acc__panel-inner ex-lux__prose">${Q(o.amplify)}</div>
        </div>
      </div>
      <div class="ex-acc" data-open="false">
        <button type="button" class="ex-acc__trigger" aria-expanded="false">
          <span class="ex-acc__ic">${r.results}</span>
          <span class="ex-acc__label">${m(s.exerciseAccResults)}</span>
          <span class="ex-acc__chev" aria-hidden="true"></span>
        </button>
        <div class="ex-acc__panel">
          <div class="ex-acc__panel-inner ex-lux__prose">${Q(o.expectedResults)}</div>
        </div>
      </div>
    </div>
    <div class="ex-lux__scroll-pad"></div>`,tt(e);const g=e.querySelector("#ex-cta");g==null||g.addEventListener("click",()=>{var d,x,v;S(),(v=(x=(d=window.Telegram)==null?void 0:d.WebApp)==null?void 0:x.showAlert)==null||v.call(x,s.exerciseCtaMessage)}),G(e)}function V(e){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}function at(e,t){if(!e)return"—";try{return new Date(e).toLocaleString(t==="en"?"en-GB":"ru-RU",{day:"2-digit",month:"short",year:"numeric",hour:"2-digit",minute:"2-digit"})}catch{return e}}async function st(e,t,a){var l,T;const n=H(a.lang),s=te().params.get("zone"),r=document.createElement("section");r.className="bb-section is-visible bb-history",r.innerHTML=`
    <h2 class="bb-page-title bb-page-title--premium neon-zone-title">${V(n.historyTitle)}</h2>
    <p class="bb-page-sub text-slate-300/90 text-sm mb-4">${V(n.historySub)}</p>
  `;const i=document.createElement("div");i.className="space-y-3",i.textContent=n.loading,r.appendChild(i),e.replaceChildren(r);let o;try{o=await Ne(t)}catch{i.innerHTML=`<p class="bb-error">${V(n.errorLoad)}</p>`;return}const u=o.items??[];if(i.replaceChildren(),!u.length){const c=document.createElement("div");c.className="glass rounded-2xl p-5 text-center";const p=document.createElement("p");p.className="text-slate-200 mb-4",p.textContent=n.historyEmpty;const g=document.createElement("button");g.type="button",g.className="bb-btn-primary",g.textContent=n.startTest,g.addEventListener("click",()=>B("test")),c.append(p,g),i.appendChild(c);return}for(const[c,p]of u.entries()){const g=document.createElement("article");g.className=`glass rounded-2xl p-4 bb-history-card${c===0?" is-active":""}`;const y=document.createElement("div");y.className="flex justify-between items-start gap-2 mb-2";const _=document.createElement("div");if(_.innerHTML=`
      <p class="text-xs text-cyan-200/80 uppercase tracking-wide">${V(at(p.createdAt,a.lang))}</p>
      <p class="text-lg font-bold text-white mt-1 bb-type-display">NeuroScore <span class="text-cyan-200">${Number(p.neuroScore).toFixed(1)}</span></p>
    `,y.appendChild(_),c===0){const v=document.createElement("span");v.className="bb-badge",v.textContent=n.latest,y.appendChild(v)}g.appendChild(y);const d=document.createElement("div");d.className="bb-history-deltas";for(const v of O){const w=n.regions[v]??v,$=Number(((l=p.scores)==null?void 0:l[v])??0).toFixed(1),A=p.isFirst?"—":((T=p.deltas)==null?void 0:T[v])??"·",b=document.createElement("div");b.className=`bb-history-row${s===v?" bb-history-row--focus":""}`;const C=document.createElement("span");C.textContent=w;const q=document.createElement("span");q.textContent=`${$}%`;const h=document.createElement("span");h.textContent=A,typeof A=="string"&&A.includes("↑")&&(h.className="bb-delta-up"),typeof A=="string"&&A.includes("↓")&&(h.className="bb-delta-down"),b.append(C,q,h),d.appendChild(b)}g.appendChild(d);const x=document.createElement("button");x.type="button",x.className="bb-btn-ghost mt-3 w-full",x.textContent=n.openThisMap,x.addEventListener("click",()=>B("map")),g.appendChild(x),i.appendChild(g)}s&&u.length&&requestAnimationFrame(()=>{var c;(c=r.querySelector(".bb-history-row--focus"))==null||c.scrollIntoView({block:"center",behavior:"smooth"})})}function U(e){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}function rt(e,t){var n;const a=H(t.lang);e.innerHTML=`
    <section class="bb-section is-visible bb-premium">
      <div class="mb-3 rounded-full px-5 py-1.5 border border-cyan-400/30 bg-cyan-500/10 text-xs font-bold uppercase tracking-[0.35em] text-cyan-100 text-center bb-type-display">
        ${U(a.premiumBadge)}
      </div>
      <h2 class="bb-page-title bb-page-title--premium neon-cta-title mb-4">
        ${U(a.premiumTitle)}
      </h2>
      <p class="text-slate-200 text-center text-sm leading-relaxed mb-6">${U(a.premiumSub)}</p>
      <ul class="bb-premium-list glass rounded-2xl p-5 mb-6 space-y-3 text-sm text-slate-200">
        ${a.premiumBullets.map(s=>`<li>${U(s)}</li>`).join("")}
      </ul>
      <button type="button" class="bb-btn-premium-buy w-full" id="bb-premium-buy">${U(a.premiumCta)}</button>
    </section>
  `,(n=e.querySelector("#bb-premium-buy"))==null||n.addEventListener("click",()=>{S(),t.tributeUrl&&Y(t.tributeUrl)})}function M(e){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}async function it(e,t,a,{onProfile:n}={}){const s=H(a.lang),r={variant:a.testVariant||"development",questions:[],answers:{},step:0},i=document.createElement("section");i.className="bb-section is-visible bb-test",e.replaceChildren(i);async function o(){i.innerHTML=`<p class="text-cyan-200/80 text-sm">${M(s.loading)}</p>`;try{const c=await He(t,r.variant);r.questions=c.questions??[],r.step=0,r.answers={},l()}catch{i.innerHTML=`<p class="bb-error">${M(s.errorLoad)}</p>`}}function u(){i.innerHTML=`
      <div class="bb-test-pick">
        <div class="bb-test-pick__glow" aria-hidden="true"></div>
        <h2 class="bb-page-title bb-page-title--premium neon-zone-title">${M(s.testTitle)}</h2>
        <p class="bb-page-sub text-slate-300/90 text-sm mb-1 leading-relaxed">${M(s.testPickVariant)}</p>
        <div class="bb-test-variant-grid">
          <button type="button" class="bb-btn-hero" data-variant="sexual">
            <span class="bb-btn-hero__badge">${M(s.variantSexBadge)}</span>
            <span class="bb-btn-hero__label">${M(s.variantSex)}</span>
            <span class="bb-btn-hero__hint">${M(s.variantSexHint)}</span>
          </button>
          <button type="button" class="bb-btn-alt" data-variant="development">
            <span class="bb-btn-alt__label">${M(s.variantDev)}</span>
            <span class="bb-btn-alt__hint">${M(s.variantDevHint)}</span>
          </button>
        </div>
      </div>
    `,i.querySelectorAll("[data-variant]").forEach(c=>{c.addEventListener("click",()=>{S(),r.variant=c.getAttribute("data-variant")||"development",o()})})}function l(){const c=r.questions[r.step];if(!c){u();return}const p=r.questions.length,g=(r.step+1)/p*100;i.innerHTML=`
      <div class="bb-test-progress mb-4">
        <div class="flex justify-between text-xs text-cyan-200/80 mb-1">
          <span>${M(s.questionProgress(r.step+1,p))}</span>
          <span>${Math.round(g)}%</span>
        </div>
        <div class="pdf-bar-track"><div class="pdf-bar-gradient pdf-bar-gradient--main" style="clip-path: inset(0 ${(100-g).toFixed(1)}% 0 0)"></div></div>
      </div>
      <h2 class="bb-test-q-title">${M(c.topic)}</h2>
      <p class="text-slate-200 mb-4 leading-relaxed">${M(c.text)}</p>
      <div class="grid gap-2 bb-test-options" id="bb-test-options"></div>
    `;const y=i.querySelector("#bb-test-options");for(const _ of c.options??[]){const d=document.createElement("button");d.type="button",d.className="bb-test-option",d.innerHTML=`<span class="bb-test-option-key">${M(_.key)}</span><span>${M(_.label)}</span>`,d.addEventListener("click",()=>T(_.key)),y.appendChild(d)}}async function T(c){S();const p=r.questions[r.step];if(r.answers[p.id]=c,r.step+1<r.questions.length){r.step+=1,l();return}i.innerHTML=`
      <div class="bb-loading">
        <div class="bb-loading__pulse"></div>
        <p class="text-sm text-cyan-200/80">${M(s.computing)}</p>
      </div>`;try{const g={};for(const[_,d]of Object.entries(r.answers))g[String(_)]=d;const y=await Pe(t,{variant:r.variant,answers:g});n&&n(y),B("map")}catch{i.innerHTML=`<p class="bb-error">${M(s.errorLoad)}</p>`}}u()}let f=null,N=null;function ot(e){var r;document.body.classList.add("bb-app--needs-bot"),(r=document.querySelector(".bb-premium-fab"))==null||r.remove();const t=document.getElementById("bb-nav");t&&(t.hidden=!0,t.innerHTML="");const a=H(f.lang);e.className="bb-root bb-root--spa bb-root--bot-gate",e.replaceChildren();const n=document.createElement("div");n.className="bb-bot-gate",n.setAttribute("role","status");const s=document.createElement("p");s.className="bb-bot-gate__line",s.textContent=a.notRegistered,n.appendChild(s),e.appendChild(n)}async function lt(e){var a;if(N)return document.body.classList.remove("bb-app--needs-bot"),!0;const t=H(f.lang);e.className="bb-root bb-root--spa",e.innerHTML=`
      <div class="bb-loading">
        <div class="bb-loading__pulse"></div>
        <p class="text-sm text-cyan-200/80">${t.loading}</p>
      </div>`;try{return N=await Ce(f),document.body.classList.remove("bb-app--needs-bot"),me(N),(a=f.user)!=null&&a.first_name&&!N.userDisplayName&&(N.userDisplayName=[f.user.first_name,f.user.last_name].filter(Boolean).join(" ")),!0}catch(n){if((n==null?void 0:n.status)===401&&(n==null?void 0:n.detail)==="invalid_site_token"&&(f!=null&&f.siteToken)){try{localStorage.removeItem(X),localStorage.removeItem(Z)}catch{}return window.location.replace("/"),!1}if((n==null?void 0:n.status)===403&&(n==null?void 0:n.detail)==="not_registered")return ot(e),!1;const s=(n==null?void 0:n.status)===403?t.notRegistered:(n==null?void 0:n.status)===401?t.authError:t.errorLoad;return e.className="bb-root bb-root--spa",e.innerHTML=`<p class="bb-error">${s}</p>`,!1}}function ct(e){const t=document.getElementById("bb-nav");t&&t.querySelectorAll(".bb-nav__btn[data-route]").forEach(a=>{a.classList.toggle("is-active",a.dataset.route===e)})}function dt(e){if(!f)return;const t=e==="en"?"en":"ru";if(f.lang===t)return;f.lang=t,document.documentElement.lang=t;const a=H(t),n=document.getElementById("bb-header-wordmark");n&&(n.textContent=a.appBrandName),he(t)}function me(e){e!=null&&e.lang&&dt(e.lang)}function ut(e){var n;if((n=document.querySelector(".bb-premium-fab"))==null||n.remove(),e.paid||!e.tributeUrl)return;const t=H((f==null?void 0:f.lang)||e.lang),a=document.createElement("button");a.type="button",a.className="bb-premium-fab",a.textContent=t.premiumCta,a.addEventListener("click",()=>{S(),B("premium")}),document.body.appendChild(a)}function he(e){var s;const t=document.getElementById("bb-nav");if(!t)return;const a=H(e);t.hidden=!1;const n=f!=null&&f.siteToken?`<button type="button" class="bb-nav__btn bb-nav__btn--logout" data-site-logout>${a.navLogout}</button>`:"";t.innerHTML=`
    <button type="button" class="bb-nav__btn" data-route="map">${a.navMap}</button>
    <button type="button" class="bb-nav__btn" data-route="history">${a.navHistory}</button>
    <button type="button" class="bb-nav__btn" data-route="test">${a.navTest}</button>
    <button type="button" class="bb-nav__btn" data-route="premium">${a.navPremium}</button>
    ${n}
  `,t.querySelectorAll(".bb-nav__btn[data-route]").forEach(r=>{r.addEventListener("click",()=>{S(),B(r.dataset.route||"map")})}),(s=t.querySelector("[data-site-logout]"))==null||s.addEventListener("click",()=>{S();try{localStorage.removeItem(X),localStorage.removeItem(Z)}catch{}window.location.replace("/")})}async function se(e){var s;const t=document.getElementById("bb-root");if(!t||!f)return;const a=document.getElementById("bb-nav"),n=e.name==="exercise";if(document.body.classList.toggle("bb-route-exercise",n),n||ct(e.name),e.name!=="map"&&((s=document.querySelector(".bb-premium-fab"))==null||s.remove()),!!await lt(t)){if(he(f.lang),a&&(a.hidden=n),e.name==="premium"){rt(t,N);return}if(e.name==="test"){await it(t,f,N,{onProfile:r=>{N=r,me(r)}});return}if(e.name==="history"){await st(t,f,N);return}if(e.name==="exercise"){const r=parseInt(e.params.get("id")||"0",10);await nt(t,f,N,r);return}if(!N.hasMap&&e.name==="map"){B("test");return}Je(t,N,e),ut(N)}}async function re(e){const t=e.lang==="en"?"en":"ru";f={initData:e.initData??"",user:e.user??null,lang:t,siteToken:e.siteToken??""},N=null,document.body.classList.add("bb-app--telegram"),f.siteToken&&document.body.classList.add("bb-app--site");const a=document.getElementById("bb-root");if(!a)return;a.classList.add("bb-root--spa");const n=H(f.lang),s=document.getElementById("bb-header-wordmark");s&&(s.textContent=n.appBrandName),Re(i=>{se(i).catch(()=>{})}),Oe();const r=te();window.location.hash?await se(r):B("map")}const ie="/assets/full-glowing-brain-Cl127Rfm.png",oe=.088,le=15,ce=2,de=.4;function J(e,t,a){return Math.max(t,Math.min(a,e))}function bt(){var e,t;return((t=(e=window.matchMedia)==null?void 0:e.call(window,"(prefers-reduced-motion: reduce)"))==null?void 0:t.matches)??!1}function pt(e,t,a){const n=e.getBoundingClientRect(),s=80,r=Math.max(n.width+s*2,1),i=Math.max(n.height+s*2,1),o=n.left+n.width/2,u=n.top+n.height/2;return{nx:J((t-o)/(r*.5),-1,1),ny:J((a-u)/(i*.5),-1,1)}}function gt(e){var v,w;if(bt())return()=>{};const t=e.querySelector("[data-parallax-brain]"),a=e.querySelector("[data-parallax-glow]");if(!t)return()=>{};let n={nx:0,ny:0},s=!1,r={nx:0,ny:0},i=!1,o=0,u=0,l=0;const T=((w=(v=window.matchMedia)==null?void 0:v.call(window,"(pointer: coarse)"))==null?void 0:w.matches)??!1,c=()=>s?{tx:n.nx,ty:n.ny}:i?{tx:r.nx*.62,ty:r.ny*.62}:{tx:0,ty:0},p=()=>{l=0;const{tx:$,ty:A}=c();o+=($-o)*oe,u+=(A-u)*oe;const b=o*le,C=u*le,q=u*-ce,h=o*ce;if(t.style.transform=`translate3d(${b}px, ${C}px, 0) rotateX(${q}deg) rotateY(${h}deg)`,a){const P=-b*de,ye=-C*de;a.style.transform=`translate3d(calc(-50% + ${P}px), calc(-50% + ${ye}px), 0) scale(1.06)`}const{tx:k,ty:F}=c(),z=Math.abs(o-k)>.003||Math.abs(u-F)>.003,I=Math.abs(o)>.004||Math.abs(u)>.004;(z||I||i)&&(l=requestAnimationFrame(p))},g=()=>{l||(l=requestAnimationFrame(p))},y=$=>{if(!$.isTrusted)return;const{nx:A,ny:b}=pt(e,$.clientX,$.clientY);n={nx:A,ny:b},s=!0,g()},_=()=>{s=!0},d=()=>{s=!1,g()};e.addEventListener("pointermove",y,{passive:!0}),e.addEventListener("pointerenter",_),e.addEventListener("pointerleave",d),e.addEventListener("pointerdown",()=>{T&&typeof(DeviceOrientationEvent==null?void 0:DeviceOrientationEvent.requestPermission)=="function"&&DeviceOrientationEvent.requestPermission().then($=>{$==="granted"&&(i=!0)}).catch(()=>{})},{passive:!0});let x=null;return window.DeviceOrientationEvent&&(x=$=>{if($.gamma==null||$.beta==null)return;const A=J($.gamma/32,-1,1),b=J(($.beta-44)/36,-1,1);r={nx:A,ny:b},i=!0,g()},window.addEventListener("deviceorientation",x,!0)),t.style.willChange="transform",a&&(a.style.willChange="transform"),g(),()=>{e.removeEventListener("pointermove",y),e.removeEventListener("pointerenter",_),e.removeEventListener("pointerleave",d),x&&window.removeEventListener("deviceorientation",x,!0),l&&cancelAnimationFrame(l),t.style.willChange="",t.style.transform="",a&&(a.style.willChange="",a.style.transform="")}}const mt={root:null,rootMargin:"0px 0px -10% 0px",threshold:.08};function ht(e,{reducedMotion:t}){if(t)return e.querySelectorAll(".bb-landing-reveal").forEach(s=>s.classList.add("is-in-view")),()=>{};const a=e.querySelectorAll(".bb-landing-reveal");if(!a.length)return()=>{};const n=new IntersectionObserver(s=>{for(const r of s)r.isIntersecting&&(r.target.classList.add("is-in-view"),n.unobserve(r.target))},mt);return a.forEach(s=>n.observe(s)),()=>{n.disconnect()}}function L(e){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}const fe="bb-landing-lang",ft=960*1e3;function yt(){try{const e=sessionStorage.getItem(ee);if(!e)return null;const t=JSON.parse(e);return!(t!=null&&t.loginToken)||typeof t.loginToken!="string"||typeof t.startedAt!="number"||t.lang!=="en"&&t.lang!=="ru"?null:t}catch{return null}}function xt(e){try{sessionStorage.setItem(ee,JSON.stringify(e))}catch{}}function W(){try{sessionStorage.removeItem(ee)}catch{}}function _t(){try{const e=localStorage.getItem(fe);if(e==="en"||e==="ru")return e}catch{}return null}function vt(e){document.body.classList.add("bb-lang-gate-open");const t=document.createElement("div");t.className="bb-lang-gate",t.setAttribute("role","dialog"),t.setAttribute("aria-modal","true"),t.setAttribute("aria-labelledby","bb-lang-gate-title"),t.innerHTML=`
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
  `,document.body.appendChild(t);const a=n=>{try{localStorage.setItem(fe,n)}catch{}document.body.classList.remove("bb-lang-gate-open"),t.remove(),e(n)};t.querySelectorAll("[data-lang]").forEach(n=>{n.addEventListener("click",()=>a(n.getAttribute("data-lang")||"ru"))}),requestAnimationFrame(()=>{var n;(n=t.querySelector(".bb-lang-gate__btn"))==null||n.focus()})}async function wt(){const e=document.getElementById("bb-header"),t=document.getElementById("bb-nav");e&&(e.hidden=!0),t&&(t.hidden=!0);const a=document.getElementById("bb-root");if(!a)return;const n=_t();if(!n){a.className="bb-root",a.innerHTML="",vt(s=>{ue(s).catch(()=>{})});return}await ue(n)}async function ue(e){var q;const t=H(e);document.documentElement.lang=e;const a=document.getElementById("bb-root");if(!a)return;a.className="bb-root bb-root--landing",a.innerHTML=`
    <div class="bb-loading">
      <div class="bb-loading__pulse"></div>
    </div>`;let n={botUrl:"https://t.me/brainboosty?start=site",webappEntryUrl:"https://t.me/brainboosty?start=webapp",channelUrl:"https://t.me/androgenautist",hasAuthorPhoto:!1,hasChannelAvatar:!1,neuralMapHubUrl:"/#hub-login",hubHostDisplay:"neuralmap.brainboosty.app"};try{n={...n,...await Me()}}catch{}const s="/api/webapp/landing/photo",r=t.landingFeatures.map(h=>`<li>${L(h)}</li>`).join(""),i=window.matchMedia("(prefers-reduced-motion: reduce)").matches;a.innerHTML=`
    <div class="bb-landing">
      <header id="top" class="bb-landing-hero">
        <div class="bb-landing-hero__visual-anchor">
          <div class="bb-landing-hero__glow" aria-hidden="true" data-parallax-glow></div>
          <div class="bb-landing-hero__brain-layer" data-parallax-brain>
            <img class="bb-landing-hero__brain" src="${ie}" alt="" width="280" height="280" decoding="async" />
          </div>
        </div>
        <div class="bb-landing-hero__copy bb-landing-reveal">
        <p class="bb-landing-kicker">${L(t.landingKicker)}</p>
        <h1 class="bb-landing-title neon-zone-title">${L(t.landingTitle)}</h1>
        <p class="bb-landing-tagline">${L(t.landingTagline)}</p>
        <div class="bb-landing-hero__ctas">
          <a class="bb-landing-cta-primary" href="${L(n.botUrl)}" rel="noopener noreferrer">
            ${L(t.landingCta)}
          </a>
          <button type="button" class="bb-landing-cta-secondary" data-start-site-login>
            ${L(t.landingLoginTelegram)}
          </button>
        </div>
        <p class="bb-landing-cta-sub">${L(t.landingCtaSub)}</p>
        </div>
      </header>

      <section id="about" class="bb-landing-section bb-landing-reveal">
        <h2 class="bb-landing-section__title">${L(t.landingAboutTitle)}</h2>
        <article class="bb-landing-about glass bb-landing-hover-rise">
          <div class="bb-landing-about__photo-wrap">
            <img class="bb-landing-about__photo" src="${s}" alt="" width="320" height="320" loading="lazy" data-fallback-src="${ie}" />
            <div class="bb-landing-about__ring" aria-hidden="true"></div>
          </div>
          <div class="bb-landing-about__text">
            ${t.landingAboutParagraphs.map(h=>`<p>${L(h)}</p>`).join("")}
            <a class="bb-landing-link" href="${L(n.channelUrl)}" target="_blank" rel="noopener noreferrer">
              ${L(t.landingChannelLink)}
            </a>
          </div>
        </article>
      </section>

      <section id="project" class="bb-landing-section bb-landing-reveal">
        <h2 class="bb-landing-section__title">${L(t.landingProjectTitle)}</h2>
        <ul class="bb-landing-features">${r}</ul>
        <p class="bb-landing-disclaimer">${L(t.footer)}</p>
      </section>

      <section id="hub-login" class="bb-landing-section bb-landing-hub bb-landing-reveal">
        <p class="bb-landing-hub__domain" translate="no">${L(n.hubHostDisplay)}</p>
        <h2 class="bb-landing-section__title bb-landing-hub__title">${L(t.landingHubTitle)}</h2>
        <p class="bb-landing-hub__lead">${L(t.landingHubLead)}</p>
        <p class="bb-landing-hub__hint">${L(t.landingHubHint)}</p>
        <div class="bb-landing-hub__card glass bb-landing-hover-rise">
          <button type="button" class="bb-landing-hub__start" data-start-site-login>${L(t.landingHubStartLogin)}</button>
          <p class="bb-landing-hub__status" hidden></p>
        </div>
      </section>

      <section id="start" class="bb-landing-section bb-landing-final bb-landing-reveal">
        <div class="glass bb-landing-final__card bb-landing-hover-rise">
          <h2 class="bb-landing-final__title">${L(t.landingFinalTitle)}</h2>
          <p class="bb-landing-final__sub">${L(t.landingFinalSub)}</p>
          <a class="bb-landing-cta-primary bb-landing-cta-primary--lg" href="${L(n.botUrl)}" rel="noopener noreferrer">
            ${L(t.landingCta)}
          </a>
        </div>
      </section>

      <footer class="bb-landing-footer">
        <span>BrainBoosty · Neural Map</span>
      </footer>
    </div>
  `,a.querySelectorAll(".bb-landing-about__photo").forEach(h=>{const k=h.getAttribute("data-fallback-src");k&&h.addEventListener("error",()=>{h.removeAttribute("data-fallback-src"),h.src=k})}),a.querySelectorAll('a[href^="#"]').forEach(h=>{h.addEventListener("click",k=>{var I;const F=(I=h.getAttribute("href"))==null?void 0:I.slice(1);if(!F)return;const z=document.getElementById(F);z&&(k.preventDefault(),z.scrollIntoView({behavior:"smooth",block:"start"}))})});const o=a.querySelector(".bb-landing"),u=ht(o||a,{reducedMotion:i}),l=a.querySelector(".bb-landing-hero"),T=l?gt(l):()=>{};let c=null,p=null;const g="bb_tg_site_login",y="popup=yes,width=460,height=740,left=96,top=72,menubar=no,toolbar=no,status=no,scrollbars=yes,resizable=yes",_=()=>{try{p&&!p.closed&&p.close()}catch{}p=null},d=()=>{c!=null&&(clearInterval(c),c=null)},x=()=>{u(),T(),window.removeEventListener("pagehide",x)};window.addEventListener("pagehide",x);const v=a.querySelectorAll("[data-start-site-login]"),w=a.querySelector(".bb-landing-hub__status"),$=h=>{v.forEach(k=>{k.disabled=h})},A=h=>{try{if(_(),p=window.open("about:blank",g,y),p){p.location.href=h;try{p.focus()}catch{}return!0}}catch{_()}return!1},b=(h,k)=>{d();const F=async()=>{var z,I;try{const P=await qe(h);if(P.status==="ready"){d(),W(),_(),localStorage.setItem(X,P.accessToken),localStorage.setItem(Z,JSON.stringify({first_name:((z=P.user)==null?void 0:z.first_name)??"",last_name:((I=P.user)==null?void 0:I.last_name)??"",language_code:P.lang==="en"?"en":"ru"})),window.location.replace("/#map"),window.location.reload();return}(P.status==="expired"||P.status==="not_found")&&(d(),W(),_(),$(!1),w&&(w.textContent=k.landingHubExpired))}catch{}};c=setInterval(F,2e3),F()};v.forEach(h=>{h.addEventListener("click",async()=>{var F;const k=H(e);d(),W(),(F=document.getElementById("hub-login"))==null||F.scrollIntoView({behavior:"smooth",block:"start"}),$(!0),w&&(w.hidden=!1,w.textContent=k.landingHubPrepare);try{const z=await Ie(),I=z==null?void 0:z.loginToken,P=z==null?void 0:z.telegramLink;if(!I||!P)throw new Error(k.errorLoad);if(xt({loginToken:I,lang:e,startedAt:Date.now()}),A(P)){w&&(w.textContent=k.landingHubPolling),b(I,k);return}w&&(w.textContent=k.landingHubReturnSameTab),window.location.href=P}catch(z){d(),W(),_(),$(!1),w&&(w.hidden=!1,w.textContent=Ae(z,k.errorLoad))}})});const C=yt();C&&C.lang===e&&Date.now()-C.startedAt<ft?((q=document.getElementById("hub-login"))==null||q.scrollIntoView({behavior:"smooth",block:"start"}),$(!0),w&&(w.hidden=!1,w.textContent=t.landingHubPolling),b(C.loginToken,t)):C&&W()}function Lt(){try{const e=navigator.userAgent||"";if(/Telegram/i.test(e))return!0;const t=`${window.location.hash||""}${window.location.search||""}`;if(/tgWebAppPlatform|tgWebAppData|tgWebAppVersion/i.test(t))return!0}catch{}return!1}function $t(){var e;return(e=window.Telegram)!=null&&e.WebApp?Promise.resolve():new Promise(t=>{const a=document.createElement("script");a.src="https://telegram.org/js/telegram-web-app.js",a.async=!0,a.onload=()=>t(),a.onerror=()=>t(),document.head.appendChild(a)})}function Tt(){var a;const e=(a=window.Telegram)==null?void 0:a.WebApp;return e?(e.initData||"").trim().length>0:!1}function Et(){var e;try{return((e=localStorage.getItem(X))==null?void 0:e.trim())||""}catch{return""}}function St(){try{const e=localStorage.getItem(Z);return e?JSON.parse(e):null}catch{return null}}async function kt(){var n,s;Lt()&&await $t();const{initData:e,user:t,lang:a}=je();if(Tt())re({initData:e,user:t,lang:a,siteToken:""});else{const r=Et();if(r){const i=St(),o=(i==null?void 0:i.language_code)==="en"||(s=(n=i==null?void 0:i.language_code)==null?void 0:n.startsWith)!=null&&s.call(n,"en")||a==="en"?"en":"ru";re({initData:"",user:i?{first_name:i.first_name,last_name:i.last_name,language_code:i.language_code}:null,lang:o,siteToken:r})}else wt()}}kt().catch(()=>{});
