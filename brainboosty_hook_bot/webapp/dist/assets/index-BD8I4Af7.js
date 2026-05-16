(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))n(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const i of r.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&n(i)}).observe(document,{childList:!0,subtree:!0});function a(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(s){if(s.ep)return;s.ep=!0;const r=a(s);fetch(s.href,r)}})();const ye="/assets/full-glowing-brain-Cl127Rfm.png",ve="/assets/amygdala-DP7dGDc4.png",_e="/assets/lobes-uZqghd8w.png",we="/assets/frontal-gyrus-DPq4mhR0.png",$e="/assets/insula-CAJDukm_.png",Le="/assets/pfc-BE-jJY5g.png",Te="/assets/tpj-Cgg8S5Iu.png",I=["prefrontal_cortex","brain_lobes","insular_cortex","temporoparietal_junction","amygdala","frontal_gyrus"],ke={prefrontal_cortex:Le,brain_lobes:_e,insular_cortex:$e,temporoparietal_junction:Te,amygdala:ve,frontal_gyrus:we},Ee=ye;function Se(e){const t=I.map(n=>Number(e[n]??0)),a=t.reduce((n,s)=>n+s,0);return Math.round(a/Math.max(t.length,1)*10)/10}const G="bb-site-session",V="bb-site-user",X="bb-site-login-poll";function Ae(e,t=""){const a=e==null?void 0:e.detail;return typeof a=="string"&&a.trim()?a.trim():Array.isArray(a)&&a.length?a.map(n=>typeof n=="object"&&(n!=null&&n.msg)?n.msg:String(n)).filter(Boolean).join("; "):t||(e==null?void 0:e.message)||""}function ze(e,t){const a={"Content-Type":"application/json"};e&&(a["X-Telegram-Init-Data"]=e);const n=(t||"").trim();return n&&(a.Authorization=`Bearer ${n}`),a}async function B(e,{initData:t="",siteToken:a="",method:n="GET",body:s}={}){const r=await fetch(`/api/webapp${e}`,{method:n,headers:ze(t,a),body:s?JSON.stringify(s):void 0});if(!r.ok){const i=new Error(`HTTP ${r.status}`);i.status=r.status;try{i.detail=(await r.json()).detail}catch{}throw i}return r.json()}function le(e){var s,r;const t=e.lang==="en"?"en":"ru",a={};for(const i of I)a[i]=Number(((s=e.scores)==null?void 0:s[i])??0);const n={};for(const i of I){const o=((r=e.regions)==null?void 0:r[i])??{};n[i]={main:Number(o.main??a[i]),bullets:o.bullets??[],submetrics:(o.submetrics??[]).map(b=>({label:b.label??b.label_ru??"",value:Number(b.value??a[i])}))}}return{lang:t,userDisplayName:e.userDisplayName??e.user_display_name??"Guest",paid:!!e.paid,hasMap:!!(e.hasMap??e.has_map??Object.keys(e.scores||{}).length),testVariant:e.testVariant??e.test_variant??"development",tributeUrl:e.tributeUrl??e.tribute_url??"",neuroScore:e.neuroScore!=null?Number(e.neuroScore):Se(a),scores:a,connectivity:e.connectivity??[],regions:n,snapshotId:e.snapshotId??e.snapshot_id??null,createdAt:e.createdAt??e.created_at??null}}async function Me(){return B("/landing",{initData:"",siteToken:""})}async function Ce(e){const t=await B("/profile",{initData:e.initData??"",siteToken:e.siteToken??""});return le(t)}async function Ne(e){return B("/history",{initData:e.initData??"",siteToken:e.siteToken??""})}async function He(e,t="development"){return B(`/test/questions?variant=${encodeURIComponent(t)}`,{initData:e.initData??"",siteToken:e.siteToken??""})}async function Pe(e,{variant:t,answers:a}){const n={variant:t,answers:a},s=await B("/test/submit",{initData:e.initData??"",siteToken:e.siteToken??"",method:"POST",body:n});return le(s.profile)}async function Be(e,t){return B(`/exercises/${encodeURIComponent(String(t))}`,{initData:e.initData??"",siteToken:e.siteToken??""})}async function qe(){return B("/auth/site/link",{initData:"",siteToken:"",method:"POST"})}async function Ie(e){return B(`/auth/site/poll?token=${encodeURIComponent(e)}`,{initData:"",siteToken:""})}const Fe={landingKicker:"BrainBoosty · neuroscience, no fluff",landingTitle:"Upgrade your brain — see your Neural Map",landingTagline:"7 questions → a personal 6-zone brain map, NeuroScore, and clear next steps. All in Telegram.",landingCta:"Boost my brain",landingCtaSub:"Free start in the bot · 2 minutes",landingNavAbout:"About me",landingNavProject:"The project",landingNavHub:"Neural Map Hub",landingNavCta:"Open bot",landingHubTitle:"Neural Map Hub",landingHubLead:"Your brain map, test, history, and exercises—in the browser, same account as the bot and Mini App.",landingHubHint:"You need a profile after the bot onboarding. Tap the button — Telegram opens with /start and a one-time token; confirm with «Start», then return here; this tab will log you in automatically.",landingHubStartLogin:"Open Telegram and confirm",landingHubPrepare:"Preparing your link…",landingHubPolling:"Waiting for confirmation in Telegram… keep this tab open.",landingHubExpired:"That link expired. Tap the button to try again.",landingHubPopupBlocked:"Your browser blocked the Telegram window. Allow pop-ups for this site and try again.",landingHubReturnSameTab:"Telegram will open next. After you tap Start in the bot, return to this browser tab to finish sign-in.",landingLoginTelegram:"Log in with Telegram",landingChannelAria:"Telegram channel",landingAboutTitle:"About me",landingAboutParagraphs:["Hi, I'm Damian — creator of BrainBoosty.","I went from anxiety, brain fog, and tension to clarity, inner strength, and confidence. Now I help others with neurobiology, hormones, and cognitive habits.","On my channel I share actionable insights—no marketing noise, only what actually shifts your state."],landingChannelLink:"→ Channel @androgenautist",landingProjectTitle:"What's inside",landingFeatures:["7-question cognitive test — development or sexual profile","Neural Map: 6 brain zones with NeuroScore and recommendations","Progress history and test-to-test comparison","Daily hooks and a private exercise channel"],landingFinalTitle:"Ready to see your map?",landingFinalSub:"Open the bot — onboarding takes a few minutes; your first map is free.",heroBrain:"NEURAL MAP",scoreLabel:"NeuroScore",coverLine:"Six zones · one profile. Numbers, focus, and a clear read—no clutter.",connectivityTitle:"Inter-region links (educational model)",zoneLevel:"Integrated zone level",progressMain:e=>`Your progress ${e}%`,recTitle:"Why this zone is your biggest pleasure lever",footer:"BrainBoosty · educational model · not a medical diagnosis",premiumCta:"Get full access",premiumBadge:"Full access",premiumTitle:"Get full access — today",premiumSub:"A 30-day personal plan, progress tracker, exercises for your profile, and the private channel.",premiumBullets:["Full brain map and all zone recommendations","Progress history with test comparisons","Retests and trend tracking","Private channel and daily hooks"],navMap:"Map",navHistory:"History",navTest:"Test",navPremium:"Access",navLogout:"Log out",appBrandName:"BrainBoosty",appHeaderTitle:"Neural Map",loading:"Loading your neuro profile…",computing:"Computing your brain map…",errorLoad:"Could not load data. Please try again later.",authError:"Open the app from the Telegram bot.",notRegistered:"Take the test in the bot first!",historyTitle:"Progress history",historySub:"Zone comparison across tests. Arrows show percentage-point change.",historyEmpty:"No saved tests yet. Take your first test to see history here.",startTest:"Take the test",latest:"Latest",openThisMap:"Open map",testTitle:"Cognitive test",testPickVariant:"Choose question style (7 steps):",variantDev:"Development & cognition",variantSex:"Sexual profile",variantSexBadge:"Maximum insight",variantSexHint:"Pleasure, drive, and your neural edge",variantDevHint:"Focus, habits, and cognitive style",questionProgress:(e,t)=>`Question ${e} of ${t}`,regions:{prefrontal_cortex:"Prefrontal cortex",brain_lobes:"Brain lobes · imagery",insular_cortex:"Insular cortex",temporoparietal_junction:"Temporoparietal junction",amygdala:"Amygdala",frontal_gyrus:"Frontal gyrus"},interactiveBrainKicker:"Zone",zoneIllustrationOpenAria:"open zone card",zoneDrawerCloseAria:"Close",zoneCurrentLevel:"Current level",zoneWhyTitle:"Why it matters",zoneBoostCta:"Boost this zone",zoneUnlockNote:"Full access unlocks personal drills per zone, progress tracking, and training history.",zoneOpenHistory:"History for this zone",zoneExercisesHeading:"Zone exercises",zoneExerciseListCap:"In your program for this zone:",zoneExercisePlaceholder:"More protocols are on the way — your full access already includes the base track.",zonePaidHint:"More protocols and metrics tailored to your profile are coming next.",zoneReadMoreDetail:"Full zone breakdown below in the feed",zoneWhy:{prefrontal_cortex:"Planning, impulse control, and focus. A stronger PFC means clearer decisions and fewer spirals.",brain_lobes:"Integrates imagery, language, and space. Balance here improves how you read reality and old patterns.",insular_cortex:"Interoception and emotional regulation — the bridge between body state and action.",temporoparietal_junction:"Perspective, attention, and social context — helps you update stories instead of locking in one view.",amygdala:"Threat and reward signaling. Tuning it reduces false alarms while keeping healthy drive.",frontal_gyrus:"Links effort, intention, and follow-through — trained with sequenced action and repetition."},zoneExercises:{prefrontal_cortex:[{title:"90-second stop frame",body:"Before an impulsive reply, state one value and one tiny next step out loud."}],brain_lobes:[{title:"Sensory anchor",body:"For 30s describe one object: color, texture, sound — no judgments."}],insular_cortex:[{title:"Rib-cage breath",body:"4 cycles: inhale 4 counts, soft pause, exhale 6 — attention on rib expansion.",exerciseId:1}],temporoparietal_junction:[{title:"Perspective swap",body:"Phrase the same situation two neutral ways — without «I'm right» framing."}],amygdala:[{title:"Tolerance window",body:"2 min: note 3 neutral facts around a trigger, then one action 2% softer."}],frontal_gyrus:[{title:"Three-step chain",body:"Write three micro-steps for one goal today; track completion only."}]},exerciseLoading:"Loading protocol…",exerciseNotFound:"Exercise not found.",exerciseBackAria:"Back",exerciseTagForWho:"For who",exerciseTagEfficiency:"Effectiveness",exerciseTagFirstResult:"First results",exerciseDifficulty:"Difficulty",exerciseFirstResultDays:e=>`~${e} days`,exerciseEfficiencyLabels:["Low","Moderate","High","Exceptional","Best for this region"],exerciseAccInstruction:"Instruction",exerciseAccResearch:"Research",exerciseAccAmplify:"How to amplify",exerciseAccResults:"Expected outcomes",exerciseNoResearch:"Links will appear here soon.",exerciseCtaPrimary:"Add to my training plan",exerciseCtaMessage:"Sync with your bot plan is coming soon. For now, block time on your calendar and log completion.",exercisePremiumTitle:"Full access",exercisePremiumText:"Channel exercises are available with BrainBoosty full access.",zoneOpenFullExercise:"Open full exercise"},ce={landingKicker:"BrainBoosty · нейробиология без воды",landingTitle:"Прокачай мозг — увидь свою Neural Map",landingTagline:"7 вопросов → персональная карта из 6 зон мозга, NeuroScore и понятные шаги. Всё в Telegram.",landingCta:"Прокачать мозг",landingCtaSub:"Бесплатный старт в боте · 2 минуты",landingNavAbout:"Обо мне",landingNavProject:"Проект",landingNavHub:"Neural Map Hub",landingNavCta:"В бота",landingHubTitle:"Neural Map Hub",landingHubLead:"Карта мозга, тест, история и упражнения — в браузере, тот же аккаунт, что в боте и мини-приложении.",landingHubHint:"Нужен аккаунт после анкеты в боте. Нажми кнопку — откроется Telegram с командой /start и одноразовым токеном; подтверди «Start», вернись сюда: страница сама авторизуется.",landingHubStartLogin:"Открыть Telegram и подтвердить вход",landingHubPrepare:"Готовим ссылку…",landingHubPolling:"Ждём подтверждение в Telegram… не закрывай эту вкладку.",landingHubExpired:"Ссылка устарела. Нажми кнопку ещё раз.",landingHubPopupBlocked:"Браузер заблокировал окно Telegram. Разреши всплывающие окна для этого сайта и нажми кнопку снова.",landingHubReturnSameTab:"Сейчас откроется Telegram. После кнопки Start в боте вернись в этот браузер на эту вкладку — вход завершится сам.",landingLoginTelegram:"Войти через Telegram",landingChannelAria:"Канал в Telegram",landingAboutTitle:"Обо мне",landingAboutParagraphs:["Привет, я Дамиан — автор BrainBoosty.","Сам прошёл путь от тревожности, тумана в голове и зажатости — к ясности, внутренней силе и уверенности. Сейчас помогаю другим по нейробиологии, гормонам и когнитивным привычкам.","В канале делюсь рабочими инсайтами без маркетинговой шелухи — только то, что реально меняет состояние."],landingChannelLink:"→ Канал @androgenautist",landingProjectTitle:"Что внутри",landingFeatures:["Когнитивный тест из 7 вопросов — два стиля (развитие / сексуальный профиль)","Neural Map: 6 зон мозга с NeuroScore и рекомендациями","История прогресса и сравнение между тестами","Ежедневные хуки и закрытый канал с упражнениями"],landingFinalTitle:"Готов увидеть свою карту?",landingFinalSub:"Открой бота — анкета займёт пару минут, первая карта бесплатно.",heroBrain:"NEURAL MAP",scoreLabel:"NeuroScore",coverLine:"Шесть зон · один профиль. Цифры, акценты и ясная картина без лишнего шума.",connectivityTitle:"Связность зон (образовательная модель)",zoneLevel:"Интегральный уровень зоны",progressMain:e=>`Твой прогресс ${e}%`,recTitle:"Почему эта зона — твой главный рычаг удовольствия",footer:"BrainBoosty · образовательная модель · не медицинский диагноз",premiumCta:"Забрать полный доступ",premiumBadge:"Полный доступ",premiumTitle:"Забери полный доступ — сегодня",premiumSub:"Персональный план на 30 дней, трекер прогресса, упражнения под твой профиль и закрытый канал.",premiumBullets:["Полная карта мозга и все рекомендации по зонам","История прогресса с сравнением тестов","Повторные тесты и отслеживание динамики","Закрытый канал и ежедневные хуки"],navMap:"Карта",navHistory:"История",navTest:"Тест",navPremium:"Доступ",navLogout:"Выйти",appBrandName:"BrainBoosty",appHeaderTitle:"Neural Map",loading:"Загружаем нейропрофиль…",computing:"Считаем твою карту мозга…",errorLoad:"Не удалось загрузить данные. Попробуйте позже.",authError:"Откройте приложение из Telegram-бота.",notRegistered:"Пройди тест в боте!",historyTitle:"История прогресса",historySub:"Сравнение зон между прохождениями. Стрелки — изменение в процентных пунктах.",historyEmpty:"Пока нет сохранённых тестов. Пройдите первый тест — и здесь появится история.",startTest:"Пройти тест",latest:"Актуально",openThisMap:"Открыть карту",testTitle:"Когнитивный тест",testPickVariant:"Выберите стиль вопросов (7 шагов):",variantDev:"Развитие и когниция",variantSex:"Сексуальный профиль",variantSexBadge:"Максимум инсайта",variantSexHint:"Удовольствие, драйв и нейронный рельеф",variantDevHint:"Фокус, привычки и когнитивный стиль",questionProgress:(e,t)=>`Вопрос ${e} из ${t}`,regions:{prefrontal_cortex:"Префронтальная кора",brain_lobes:"Доли мозга · образы",insular_cortex:"Островковая кора",temporoparietal_junction:"Височно-теменной узел",amygdala:"Амигдала",frontal_gyrus:"Лобная извилина"},interactiveBrainKicker:"Зона",zoneIllustrationOpenAria:"открыть карточку зоны",zoneDrawerCloseAria:"Закрыть",zoneCurrentLevel:"Текущий уровень",zoneWhyTitle:"Почему это важно",zoneBoostCta:"Прокачать эту зону",zoneUnlockNote:"Полный доступ открывает персональные упражнения под каждую зону, трекер и историю прокачки.",zoneOpenHistory:"История этой зоны",zoneExercisesHeading:"Упражнения для зоны",zoneExerciseListCap:"Сейчас в программе для этой зоны:",zoneExercisePlaceholder:"Скоро добавим ещё шаги — уже доступен базовый протокол в полном доступе.",zonePaidHint:"Дальше — больше протоколов и метрик именно под твой профиль.",zoneReadMoreDetail:"Подробный разбор зоны в ленте ниже",zoneWhy:{prefrontal_cortex:"Планирование, торможение импульсов и фокус. Сильная ПФК — ясные решения, меньше хаоса и откатов.",brain_lobes:"Интеграция образов, языка и пространства. Баланс здесь — лучшее восприятие реальности и выученные паттерны.",insular_cortex:"Телесная осознанность и эмоциональная регуляция. Островок связывает «что чувствую» с «что делаю».",temporoparietal_junction:"Перспектива, внимание и социальный контекст. TPJ помогает не застревать в одной интерпретации событий.",amygdala:"Детектор угроз и сигналов награды. Настрой амигдалы — меньше ложной тревоги, больше спокойного драйва.",frontal_gyrus:"Связь моторики, намерения и усилия. Тренируется через последовательные действия и повторение цели."},zoneExercises:{prefrontal_cortex:[{title:"90 секунд «стоп-рамка»",body:"Перед импульсивным ответом назови вслух одну ценность и одно следующее маленькое действие."}],brain_lobes:[{title:"Сенсорный якорь",body:"30 секунд описывай предмет из комнаты: цвет, фактура, звук — без оценок."}],insular_cortex:[{title:"Дыхание в ребро",body:"4 цикла: вдох 4 счёта, мягкая пауза, выдох 6 — внимание на расширении рёбер.",exerciseId:1}],temporoparietal_junction:[{title:"Смена ракурса",body:"Сформулируй ту же ситуацию двумя нейтральными формулировками, без «я прав»."}],amygdala:[{title:"Окно толерантности",body:"2 минуты: найди 3 нейтральных факта вокруг триггера, затем одно действие на 2% мягче."}],frontal_gyrus:[{title:"Цепочка на 3 шага",body:"Запиши три микрошага к одной цели на сегодня; отмечай только факт выполнения."}]},exerciseLoading:"Загружаем протокол…",exerciseNotFound:"Упражнение не найдено.",exerciseBackAria:"Назад",exerciseTagForWho:"Для кого",exerciseTagEfficiency:"Эффективность",exerciseTagFirstResult:"Первый результат",exerciseDifficulty:"Сложность",exerciseFirstResultDays:e=>`ориентир ≈ ${e} дн.`,exerciseEfficiencyLabels:["Низкая","Средняя","Высокая","Чрезвычайная","Оптимально для отдела"],exerciseAccInstruction:"Инструкция",exerciseAccResearch:"Исследования",exerciseAccAmplify:"Как усилить эффект",exerciseAccResults:"Ожидаемые результаты",exerciseNoResearch:"Ссылки будут добавлены.",exerciseCtaPrimary:"Добавить в мой план прокачки",exerciseCtaMessage:"Скоро здесь будет синхронизация с твоим планом в боте. Пока закрепи время в календаре и отметь выполнение в заметках.",exercisePremiumTitle:"Полный доступ",exercisePremiumText:"Экран упражнений из закрытого канала доступен с подпиской BrainBoosty.",zoneOpenFullExercise:"Полный экран упражнения"},De={ru:ce,en:Fe};function C(e){return De[e==="en"?"en":"ru"]??ce}const J=new Set;function Z(){const e=(window.location.hash||"#map").replace(/^#/,""),[t,a]=e.split("?");return{name:t||"map",params:new URLSearchParams(a||"")}}function P(e,t={}){var n;const a=((n=t.toString)==null?void 0:n.call(t))||new URLSearchParams(t).toString();window.location.hash=a?`${e}?${a}`:e}function Re(e){return J.add(e),()=>J.delete(e)}function de(){const e=Z();for(const t of J)t(e)}window.addEventListener("hashchange",de);function Oe(){de()}function je(){var n,s,r;const e=(n=window.Telegram)==null?void 0:n.WebApp;if(!e)return{tg:null,initData:"",user:null,lang:"ru"};e.ready(),e.expand(),e.enableClosingConfirmation(),e.disableVerticalSwipes&&e.disableVerticalSwipes(),Q(),e.onEvent("themeChanged",Q);const t=((s=e.initDataUnsafe)==null?void 0:s.user)??null,a=(t==null?void 0:t.language_code)==="en"||(r=t==null?void 0:t.language_code)!=null&&r.startsWith("en")?"en":"ru";return e.setHeaderColor&&e.setHeaderColor("#010108"),e.setBackgroundColor&&e.setBackgroundColor("#010108"),{tg:e,initData:e.initData||"",user:t,lang:a}}function Q(){const e=document.documentElement;e.style.setProperty("--bb-tg-bg","#010108"),e.style.setProperty("--bb-tg-text","#f1f5f9")}function U(e){var a;const t=(a=window.Telegram)==null?void 0:a.WebApp;if(t!=null&&t.openTelegramLink&&e.includes("t.me/")){t.openTelegramLink(e);return}if(t!=null&&t.openLink){t.openLink(e);return}window.open(e,"_blank","noopener,noreferrer")}function S(){var e,t,a,n;(n=(a=(t=(e=window.Telegram)==null?void 0:e.WebApp)==null?void 0:t.HapticFeedback)==null?void 0:a.impactOccurred)==null||n.call(a,"light")}function k(e){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}function Ue(){return`
    <div class="bb-zone-drawer__bar-track">
      <div class="bb-zone-drawer__bar-fill" style="width: 0%"></div>
    </div>`}function We(e,t,a={}){var u,v,_,N,T,p;const n=C(e.lang),s=n.regions[t]??t,r=((u=n.zoneWhy)==null?void 0:u[t])??"",i=Number(((v=e.scores)==null?void 0:v[t])??0).toFixed(1),o=((_=n.zoneExercises)==null?void 0:_[t])??[],b=o.length>0?o.map(c=>`
                  <li class="bb-zone-drawer__exercise">
                    <p class="bb-zone-drawer__exercise-title">${k(c.title)}</p>
                    <p class="bb-zone-drawer__exercise-body">${k(c.body)}</p>
                    ${c.exerciseId!=null?`<button type="button" class="bb-zone-drawer__ex-open" data-open-exercise="${Number(c.exerciseId)}">${k(n.zoneOpenFullExercise)}</button>`:""}
                  </li>`).join(""):`<li class="bb-zone-drawer__exercise"><p class="bb-zone-drawer__exercise-body">${k(n.zoneExercisePlaceholder)}</p></li>`,l=document.createElement("div");l.className="bb-zone-drawer-host",l.innerHTML=`
    <div class="bb-zone-drawer-backdrop" data-close="1" aria-hidden="true"></div>
    <aside class="bb-zone-drawer glass" role="dialog" aria-modal="true" aria-labelledby="bb-zone-drawer-title">
      <header class="bb-zone-drawer__header">
        <div>
          <p class="bb-zone-drawer__eyebrow">${k(n.interactiveBrainKicker)}</p>
          <h2 id="bb-zone-drawer-title" class="bb-zone-drawer__title">${k(s)}</h2>
        </div>
        <button type="button" class="bb-zone-drawer__close" data-close="1" aria-label="${k(n.zoneDrawerCloseAria)}">
          <span aria-hidden="true">×</span>
        </button>
      </header>
      <div class="bb-zone-drawer__body">
        <div class="bb-zone-drawer__meter">
          <div class="bb-zone-drawer__meter-row">
            <span class="bb-zone-drawer__meter-label">${k(n.zoneCurrentLevel)}</span>
            <span class="bb-zone-drawer__meter-value">${k(i)}%</span>
          </div>
          ${Ue()}
        </div>
        <div class="bb-zone-drawer__why">
          <p class="bb-zone-drawer__why-title">${k(n.zoneWhyTitle)}</p>
          <p class="bb-zone-drawer__why-text">${k(r)}</p>
        </div>
        <div class="bb-zone-drawer__actions" data-paid-block="${e.paid?"1":"0"}">
          ${e.paid?`
            <div class="bb-zone-drawer__paid-menu">
              <button type="button" class="bb-zone-drawer__btn bb-zone-drawer__btn--ghost" data-go="history">
                ${k(n.zoneOpenHistory)}
              </button>
              <button type="button" class="bb-zone-drawer__btn bb-zone-drawer__btn--ghost" data-toggle="exercises">
                ${k(n.zoneExercisesHeading)}
              </button>
            </div>
            <div class="bb-zone-drawer__exercises" data-exercises hidden>
              <p class="bb-zone-drawer__exercises-cap">${k(n.zoneExerciseListCap)}</p>
              <ul class="bb-zone-drawer__exercise-list">
                ${b}
              </ul>
            </div>
            <p class="bb-zone-drawer__paid-hint">${k(n.zonePaidHint)}</p>
            <button type="button" class="bb-zone-drawer__btn bb-zone-drawer__btn--ghost bb-zone-drawer__btn--compact" data-scroll-zone="${t}">
              ${k(n.zoneReadMoreDetail)}
            </button>`:`
            <p class="bb-zone-drawer__lock-note">${k(n.zoneUnlockNote)}</p>
            <button type="button" class="bb-zone-drawer__btn bb-zone-drawer__btn--primary" data-go="boost">
              ${k(n.zoneBoostCta)}
            </button>
            <button type="button" class="bb-zone-drawer__btn bb-zone-drawer__btn--ghost bb-zone-drawer__btn--compact" data-scroll-zone="${t}">
              ${k(n.zoneReadMoreDetail)}
            </button>`}
        </div>
      </div>
    </aside>
  `,document.body.appendChild(l),document.body.classList.add("bb-zone-drawer-open");const L=l.querySelector(".bb-zone-drawer"),d=l.querySelector("[data-exercises]"),h=l.querySelector(".bb-zone-drawer-backdrop"),g=l.querySelector(".bb-zone-drawer__bar-fill"),y=()=>{var c;document.removeEventListener("keydown",m),document.body.classList.remove("bb-zone-drawer-open"),l.remove(),(c=a.onClose)==null||c.call(a)},m=c=>{c.key==="Escape"&&y()};return document.addEventListener("keydown",m),l.querySelectorAll("[data-close]").forEach(c=>{c.addEventListener("click",()=>{S(),y()})}),(N=l.querySelector('[data-go="boost"]'))==null||N.addEventListener("click",()=>{S(),e.tributeUrl?U(e.tributeUrl):P("premium"),y()}),(T=l.querySelector('[data-go="history"]'))==null||T.addEventListener("click",()=>{S(),P("history",{zone:t}),y()}),(p=l.querySelector('[data-toggle="exercises"]'))==null||p.addEventListener("click",()=>{if(S(),!d)return;d.hasAttribute("hidden")?d.removeAttribute("hidden"):d.setAttribute("hidden","")}),l.querySelectorAll("[data-scroll-zone]").forEach(c=>{c.addEventListener("click",()=>{S();const E=c.getAttribute("data-scroll-zone")||t;y(),requestAnimationFrame(()=>{var $;($=document.getElementById(`zone-${E}`))==null||$.scrollIntoView({behavior:"smooth",block:"start"})})})}),l.querySelectorAll("[data-open-exercise]").forEach(c=>{c.addEventListener("click",()=>{S();const E=c.getAttribute("data-open-exercise")||"1";y(),P("exercise",{id:E})})}),requestAnimationFrame(()=>{if(L==null||L.classList.add("is-open"),h==null||h.classList.add("is-open"),g){const c=Math.max(0,Math.min(100,Number(i)||0));g.style.width="0%",requestAnimationFrame(()=>{g.style.width=`${c.toFixed(1)}%`})}}),{close:()=>{y()}}}function q(e){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}function Ge(e,{displayName:t,neuroScore:a,connectivity:n}){const s=(n==null?void 0:n.length)>0?`
    <div class="bb-connectivity glass rounded-2xl p-4 mt-5">
      <p class="bb-connectivity__title">${q(e.connectivityTitle)}</p>
      ${n.map(r=>`<p>• ${q(r)}</p>`).join(`
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
        ${Number(a).toFixed(1)}
      </div>
    </div>
    ${s}
  </div>
  <p class="text-center text-[11px] text-slate-500 mt-6">${q(e.footer)}</p>
</section>`}function K({label:e,value:t,glow:a=!1}){const n=Math.max(0,Math.min(100,Number(t)||0)),s=Math.max(0,100-n),r=a?"pdf-bar-gradient pdf-bar-gradient--main":"pdf-bar-gradient pdf-bar-gradient--sub",i=Ve(e);return[`<div class="mb-3.5" data-bar-value="${n}">`,'<div class="flex justify-between text-xs text-slate-400 mb-1">',`<span>${i}</span>`,`<span class="text-cyan-100 font-bold tracking-wide">${n.toFixed(1)}%</span>`,"</div>",'<div class="pdf-bar-track">',`<div class="${r}" style="clip-path: inset(0 ${s.toFixed(2)}% 0 0);"></div>`,"</div>","</div>"].join(`
  `)}function Ve(e){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}function F(e){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}function Ye(e,t,a){const n=e.regions[t]??t,s=ke[t],r=Number(a.main??0),i=e.progressMain(`${r.toFixed(1)}`),o=[K({label:e.zoneLevel,value:r,glow:!0}),...(a.submetrics??[]).map(l=>K({label:l.label,value:l.value,glow:!1}))].join(`
`),b=(a.bullets??[]).map(l=>`<li>${F(l)}</li>`).join(`
        `);return`
<section class="bb-section bb-region" data-section="region" data-region="${t}" id="zone-${t}">
  <button type="button" class="bb-region__illu-hit" data-open-zone="${t}" aria-label="${F(n)} — ${F(e.zoneIllustrationOpenAria)}">
    <img src="${s}" alt="" class="brain-float-top bb-region__illu" width="320" height="220" loading="lazy" decoding="async" />
  </button>
  <h2 class="bb-region__title neon-zone-title px-2">${F(n)}</h2>
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
</section>`}function Je(e,t,a){const n=C(t.lang),s=t.userDisplayName||(t.lang==="en"?"Guest":"Гость"),r=[Ge(n,{displayName:s,neuroScore:t.neuroScore,connectivity:t.connectivity}),...I.map(i=>{var o,b;return Ye(n,i,{main:t.scores[i],bullets:((o=t.regions[i])==null?void 0:o.bullets)??[],submetrics:((b=t.regions[i])==null?void 0:b.submetrics)??[]})})];e.innerHTML=r.join(`
`),Ze(e),Qe(e),Ke(e),Xe(e,t,a)}function Xe(e,t,a){var o,b;const n=e.querySelectorAll("[data-open-zone]");if(!n.length)return;const s=l=>{e.querySelectorAll(".bb-region").forEach(L=>{const d=L.dataset.region;L.classList.toggle("is-zone-hot",!!l&&d===l)})},r=l=>{!l||!I.includes(l)||(s(l),We(t,l,{onClose:()=>s(null)}))};n.forEach(l=>{l.addEventListener("pointerenter",()=>s(l.getAttribute("data-open-zone")||"")),l.addEventListener("pointerleave",L=>{const d=L.relatedTarget;d instanceof Node&&e.contains(d)&&d.closest("[data-open-zone]")||s(null)}),l.addEventListener("click",L=>{L.preventDefault();const d=l.getAttribute("data-open-zone");d&&(S(),r(d))})});const i=(b=(o=a==null?void 0:a.params)==null?void 0:o.get)==null?void 0:b.call(o,"zone");i&&I.includes(i)&&requestAnimationFrame(()=>r(i))}function Ze(e){const t=e.querySelectorAll(".bb-section"),a=new IntersectionObserver(n=>{for(const s of n)s.isIntersecting&&(s.target.classList.add("is-visible"),a.unobserve(s.target))},{root:null,rootMargin:"0px 0px -8% 0px",threshold:.08});t.forEach(n=>a.observe(n))}function Qe(e){const t=e.querySelector("[data-neuro-score]");if(!t)return;const a=parseFloat(t.textContent||"0"),n=1200,s=performance.now(),r=i=>{const o=Math.min(1,(i-s)/n),b=1-(1-o)**3;t.textContent=(a*b).toFixed(1),o<1&&requestAnimationFrame(r)};requestAnimationFrame(r)}function Ke(e){const t=e.querySelectorAll("[data-bar-value]"),a=new IntersectionObserver(n=>{for(const s of n){if(!s.isIntersecting)continue;const r=s.target,i=parseFloat(r.getAttribute("data-bar-value")||"0"),o=r.querySelector(".pdf-bar-gradient");o&&(o.style.clipPath="inset(0 100% 0 0)",requestAnimationFrame(()=>{o.style.clipPath=`inset(0 ${Math.max(0,100-i).toFixed(2)}% 0 0)`})),a.unobserve(r)}},{threshold:.2});t.forEach(n=>a.observe(n))}function f(e){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}function et(){return{instruction:'<svg class="ex-ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.25" aria-hidden="true"><path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01"/></svg>',research:'<svg class="ex-ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.25" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3M11 8v6M8 11h6"/></svg>',amplify:'<svg class="ex-ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.25" aria-hidden="true"><path d="M12 3l1.8 5.5h5.7l-4.6 3.4 1.8 5.5-4.7-3.4-4.7 3.4 1.8-5.5-4.6-3.4h5.7L12 3z"/></svg>',results:'<svg class="ex-ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.25" aria-hidden="true"><path d="M4 19V5M9 19v-6M14 19V9M19 19v-9"/><path d="M4 19h16" stroke-linecap="round"/></svg>'}}function Y(e){return String(e||"").split(`
`).map(a=>`<p>${f(a)}</p>`).join("")}function tt(e){e.querySelectorAll(".ex-acc").forEach(t=>{const a=t.querySelector(".ex-acc__trigger");a&&a.addEventListener("click",()=>{const s=!(t.getAttribute("data-open")==="true");t.setAttribute("data-open",String(s)),a.setAttribute("aria-expanded",String(s)),S()})})}function O(e){requestAnimationFrame(()=>{var t;(t=e.querySelector(".ex-lux"))==null||t.classList.add("is-visible")})}async function nt(e,t,a,n){var y,m;const s=C(a.lang),r=et();e.className="bb-root bb-root--spa bb-root--exercise",e.innerHTML=`
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
    </div>`;const i=e.querySelector("#ex-back");if(i==null||i.addEventListener("click",()=>{S(),P("map")}),!Number.isFinite(n)||n<1){const u=e.querySelector(".ex-lux__scroll .ex-lux__inner");u&&(u.innerHTML=`<p class="ex-lux__err">${f(s.exerciseNotFound)}</p>`),O(e);return}if(!a.paid){e.querySelector(".ex-lux__scroll .ex-lux__inner").innerHTML=`
      <div class="ex-lux__hero">
        <p class="ex-lux__lock-title">${f(s.exercisePremiumTitle)}</p>
        <p class="ex-lux__lock-text">${f(s.exercisePremiumText)}</p>
        <button type="button" class="ex-lux__cta ex-lux__cta--inline" id="ex-unlock">${f(s.premiumCta)}</button>
      </div>`,(y=e.querySelector("#ex-unlock"))==null||y.addEventListener("click",()=>{S(),a.tributeUrl?U(a.tributeUrl):P("premium")}),e.querySelector("#ex-cta").textContent=s.premiumCta,(m=e.querySelector("#ex-cta"))==null||m.addEventListener("click",()=>{S(),a.tributeUrl?U(a.tributeUrl):P("premium")}),O(e);return}let o;try{o=await Be(t,n)}catch(u){const v=e.querySelector(".ex-lux__scroll .ex-lux__inner"),_=(u==null?void 0:u.status)===403?s.exercisePremiumTitle:(u==null?void 0:u.status)===404?s.exerciseNotFound:s.errorLoad;v&&(v.innerHTML=`<p class="ex-lux__err">${f(_)}</p>`),O(e);return}const b=Math.max(0,Math.min(4,(o.effectiveness||3)-1)),l=s.exerciseEfficiencyLabels[b]??"—",L=(o.regions||[]).map(u=>`<span class="ex-lux__pill">${f(s.regions[u]??u)}</span>`).join(""),d=(o.researchLinks||[]).map(u=>`<a class="ex-lux__link" href="${f(u.url)}" target="_blank" rel="noopener noreferrer">${f(u.label||u.url)}</a>`).join(""),h=o.instructionImageUrl?`<figure class="ex-lux__figure"><img src="${f(o.instructionImageUrl)}" alt="" loading="lazy" decoding="async" /></figure>`:"";e.querySelector(".ex-lux__scroll .ex-lux__inner").innerHTML=`
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
      <div class="ex-lux__pills">${L}</div>
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
          <div class="ex-acc__panel-inner ex-lux__prose ex-lux__links">${d||`<p>${f(s.exerciseNoResearch)}</p>`}</div>
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
    <div class="ex-lux__scroll-pad"></div>`,tt(e);const g=e.querySelector("#ex-cta");g==null||g.addEventListener("click",()=>{var u,v,_;S(),(_=(v=(u=window.Telegram)==null?void 0:u.WebApp)==null?void 0:v.showAlert)==null||_.call(v,s.exerciseCtaMessage)}),O(e)}function j(e){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}function at(e,t){if(!e)return"—";try{return new Date(e).toLocaleString(t==="en"?"en-GB":"ru-RU",{day:"2-digit",month:"short",year:"numeric",hour:"2-digit",minute:"2-digit"})}catch{return e}}async function st(e,t,a){var l,L;const n=C(a.lang),s=Z().params.get("zone"),r=document.createElement("section");r.className="bb-section is-visible bb-history",r.innerHTML=`
    <h2 class="bb-page-title bb-page-title--premium neon-zone-title">${j(n.historyTitle)}</h2>
    <p class="bb-page-sub text-slate-300/90 text-sm mb-4">${j(n.historySub)}</p>
  `;const i=document.createElement("div");i.className="space-y-3",i.textContent=n.loading,r.appendChild(i),e.replaceChildren(r);let o;try{o=await Ne(t)}catch{i.innerHTML=`<p class="bb-error">${j(n.errorLoad)}</p>`;return}const b=o.items??[];if(i.replaceChildren(),!b.length){const d=document.createElement("div");d.className="glass rounded-2xl p-5 text-center";const h=document.createElement("p");h.className="text-slate-200 mb-4",h.textContent=n.historyEmpty;const g=document.createElement("button");g.type="button",g.className="bb-btn-primary",g.textContent=n.startTest,g.addEventListener("click",()=>P("test")),d.append(h,g),i.appendChild(d);return}for(const[d,h]of b.entries()){const g=document.createElement("article");g.className=`glass rounded-2xl p-4 bb-history-card${d===0?" is-active":""}`;const y=document.createElement("div");y.className="flex justify-between items-start gap-2 mb-2";const m=document.createElement("div");if(m.innerHTML=`
      <p class="text-xs text-cyan-200/80 uppercase tracking-wide">${j(at(h.createdAt,a.lang))}</p>
      <p class="text-lg font-bold text-white mt-1 bb-type-display">NeuroScore <span class="text-cyan-200">${Number(h.neuroScore).toFixed(1)}</span></p>
    `,y.appendChild(m),d===0){const _=document.createElement("span");_.className="bb-badge",_.textContent=n.latest,y.appendChild(_)}g.appendChild(y);const u=document.createElement("div");u.className="bb-history-deltas";for(const _ of I){const N=n.regions[_]??_,T=Number(((l=h.scores)==null?void 0:l[_])??0).toFixed(1),p=h.isFirst?"—":((L=h.deltas)==null?void 0:L[_])??"·",c=document.createElement("div");c.className=`bb-history-row${s===_?" bb-history-row--focus":""}`;const E=document.createElement("span");E.textContent=N;const $=document.createElement("span");$.textContent=`${T}%`;const A=document.createElement("span");A.textContent=p,typeof p=="string"&&p.includes("↑")&&(A.className="bb-delta-up"),typeof p=="string"&&p.includes("↓")&&(A.className="bb-delta-down"),c.append(E,$,A),u.appendChild(c)}g.appendChild(u);const v=document.createElement("button");v.type="button",v.className="bb-btn-ghost mt-3 w-full",v.textContent=n.openThisMap,v.addEventListener("click",()=>P("map")),g.appendChild(v),i.appendChild(g)}s&&b.length&&requestAnimationFrame(()=>{var d;(d=r.querySelector(".bb-history-row--focus"))==null||d.scrollIntoView({block:"center",behavior:"smooth"})})}function D(e){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}function rt(e,t){var n;const a=C(t.lang);e.innerHTML=`
    <section class="bb-section is-visible bb-premium">
      <div class="mb-3 rounded-full px-5 py-1.5 border border-cyan-400/30 bg-cyan-500/10 text-xs font-bold uppercase tracking-[0.35em] text-cyan-100 text-center bb-type-display">
        ${D(a.premiumBadge)}
      </div>
      <h2 class="bb-page-title bb-page-title--premium neon-cta-title mb-4">
        ${D(a.premiumTitle)}
      </h2>
      <p class="text-slate-200 text-center text-sm leading-relaxed mb-6">${D(a.premiumSub)}</p>
      <ul class="bb-premium-list glass rounded-2xl p-5 mb-6 space-y-3 text-sm text-slate-200">
        ${a.premiumBullets.map(s=>`<li>${D(s)}</li>`).join("")}
      </ul>
      <button type="button" class="bb-btn-premium-buy w-full" id="bb-premium-buy">${D(a.premiumCta)}</button>
    </section>
  `,(n=e.querySelector("#bb-premium-buy"))==null||n.addEventListener("click",()=>{S(),t.tributeUrl&&U(t.tributeUrl)})}function z(e){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}async function it(e,t,a,{onProfile:n}={}){const s=C(a.lang),r={variant:a.testVariant||"development",questions:[],answers:{},step:0},i=document.createElement("section");i.className="bb-section is-visible bb-test",e.replaceChildren(i);async function o(){i.innerHTML=`<p class="text-cyan-200/80 text-sm">${z(s.loading)}</p>`;try{const d=await He(t,r.variant);r.questions=d.questions??[],r.step=0,r.answers={},l()}catch{i.innerHTML=`<p class="bb-error">${z(s.errorLoad)}</p>`}}function b(){i.innerHTML=`
      <div class="bb-test-pick">
        <div class="bb-test-pick__glow" aria-hidden="true"></div>
        <h2 class="bb-page-title bb-page-title--premium neon-zone-title">${z(s.testTitle)}</h2>
        <p class="bb-page-sub text-slate-300/90 text-sm mb-1 leading-relaxed">${z(s.testPickVariant)}</p>
        <div class="bb-test-variant-grid">
          <button type="button" class="bb-btn-hero" data-variant="sexual">
            <span class="bb-btn-hero__badge">${z(s.variantSexBadge)}</span>
            <span class="bb-btn-hero__label">${z(s.variantSex)}</span>
            <span class="bb-btn-hero__hint">${z(s.variantSexHint)}</span>
          </button>
          <button type="button" class="bb-btn-alt" data-variant="development">
            <span class="bb-btn-alt__label">${z(s.variantDev)}</span>
            <span class="bb-btn-alt__hint">${z(s.variantDevHint)}</span>
          </button>
        </div>
      </div>
    `,i.querySelectorAll("[data-variant]").forEach(d=>{d.addEventListener("click",()=>{S(),r.variant=d.getAttribute("data-variant")||"development",o()})})}function l(){const d=r.questions[r.step];if(!d){b();return}const h=r.questions.length,g=(r.step+1)/h*100;i.innerHTML=`
      <div class="bb-test-progress mb-4">
        <div class="flex justify-between text-xs text-cyan-200/80 mb-1">
          <span>${z(s.questionProgress(r.step+1,h))}</span>
          <span>${Math.round(g)}%</span>
        </div>
        <div class="pdf-bar-track"><div class="pdf-bar-gradient pdf-bar-gradient--main" style="clip-path: inset(0 ${(100-g).toFixed(1)}% 0 0)"></div></div>
      </div>
      <h2 class="bb-test-q-title">${z(d.topic)}</h2>
      <p class="text-slate-200 mb-4 leading-relaxed">${z(d.text)}</p>
      <div class="grid gap-2 bb-test-options" id="bb-test-options"></div>
    `;const y=i.querySelector("#bb-test-options");for(const m of d.options??[]){const u=document.createElement("button");u.type="button",u.className="bb-test-option",u.innerHTML=`<span class="bb-test-option-key">${z(m.key)}</span><span>${z(m.label)}</span>`,u.addEventListener("click",()=>L(m.key)),y.appendChild(u)}}async function L(d){S();const h=r.questions[r.step];if(r.answers[h.id]=d,r.step+1<r.questions.length){r.step+=1,l();return}i.innerHTML=`
      <div class="bb-loading">
        <div class="bb-loading__pulse"></div>
        <p class="text-sm text-cyan-200/80">${z(s.computing)}</p>
      </div>`;try{const g={};for(const[m,u]of Object.entries(r.answers))g[String(m)]=u;const y=await Pe(t,{variant:r.variant,answers:g});n&&n(y),P("map")}catch{i.innerHTML=`<p class="bb-error">${z(s.errorLoad)}</p>`}}b()}let x=null,M=null;function ot(e){var r;document.body.classList.add("bb-app--needs-bot"),(r=document.querySelector(".bb-premium-fab"))==null||r.remove();const t=document.getElementById("bb-nav");t&&(t.hidden=!0,t.innerHTML="");const a=C(x.lang);e.className="bb-root bb-root--spa bb-root--bot-gate",e.replaceChildren();const n=document.createElement("div");n.className="bb-bot-gate",n.setAttribute("role","status");const s=document.createElement("p");s.className="bb-bot-gate__line",s.textContent=a.notRegistered,n.appendChild(s),e.appendChild(n)}async function lt(e){var a;if(M)return document.body.classList.remove("bb-app--needs-bot"),!0;const t=C(x.lang);e.className="bb-root bb-root--spa",e.innerHTML=`
      <div class="bb-loading">
        <div class="bb-loading__pulse"></div>
        <p class="text-sm text-cyan-200/80">${t.loading}</p>
      </div>`;try{return M=await Ce(x),document.body.classList.remove("bb-app--needs-bot"),ue(M),(a=x.user)!=null&&a.first_name&&!M.userDisplayName&&(M.userDisplayName=[x.user.first_name,x.user.last_name].filter(Boolean).join(" ")),!0}catch(n){if((n==null?void 0:n.status)===401&&(n==null?void 0:n.detail)==="invalid_site_token"&&(x!=null&&x.siteToken)){try{localStorage.removeItem(G),localStorage.removeItem(V)}catch{}return window.location.replace("/"),!1}if((n==null?void 0:n.status)===403&&(n==null?void 0:n.detail)==="not_registered")return ot(e),!1;const s=(n==null?void 0:n.status)===403?t.notRegistered:(n==null?void 0:n.status)===401?t.authError:t.errorLoad;return e.className="bb-root bb-root--spa",e.innerHTML=`<p class="bb-error">${s}</p>`,!1}}function ct(e){const t=document.getElementById("bb-nav");t&&t.querySelectorAll(".bb-nav__btn[data-route]").forEach(a=>{a.classList.toggle("is-active",a.dataset.route===e)})}function dt(e){if(!x)return;const t=e==="en"?"en":"ru";if(x.lang===t)return;x.lang=t,document.documentElement.lang=t;const a=C(t),n=document.getElementById("bb-header-wordmark");n&&(n.textContent=a.appBrandName),be(t)}function ue(e){e!=null&&e.lang&&dt(e.lang)}function ut(e){var n;if((n=document.querySelector(".bb-premium-fab"))==null||n.remove(),e.paid||!e.tributeUrl)return;const t=C((x==null?void 0:x.lang)||e.lang),a=document.createElement("button");a.type="button",a.className="bb-premium-fab",a.textContent=t.premiumCta,a.addEventListener("click",()=>{S(),P("premium")}),document.body.appendChild(a)}function be(e){var s;const t=document.getElementById("bb-nav");if(!t)return;const a=C(e);t.hidden=!1;const n=x!=null&&x.siteToken?`<button type="button" class="bb-nav__btn bb-nav__btn--logout" data-site-logout>${a.navLogout}</button>`:"";t.innerHTML=`
    <button type="button" class="bb-nav__btn" data-route="map">${a.navMap}</button>
    <button type="button" class="bb-nav__btn" data-route="history">${a.navHistory}</button>
    <button type="button" class="bb-nav__btn" data-route="test">${a.navTest}</button>
    <button type="button" class="bb-nav__btn" data-route="premium">${a.navPremium}</button>
    ${n}
  `,t.querySelectorAll(".bb-nav__btn[data-route]").forEach(r=>{r.addEventListener("click",()=>{S(),P(r.dataset.route||"map")})}),(s=t.querySelector("[data-site-logout]"))==null||s.addEventListener("click",()=>{S();try{localStorage.removeItem(G),localStorage.removeItem(V)}catch{}window.location.replace("/")})}async function ee(e){var s;const t=document.getElementById("bb-root");if(!t||!x)return;const a=document.getElementById("bb-nav"),n=e.name==="exercise";if(document.body.classList.toggle("bb-route-exercise",n),n||ct(e.name),e.name!=="map"&&((s=document.querySelector(".bb-premium-fab"))==null||s.remove()),!!await lt(t)){if(be(x.lang),a&&(a.hidden=n),e.name==="premium"){rt(t,M);return}if(e.name==="test"){await it(t,x,M,{onProfile:r=>{M=r,ue(r)}});return}if(e.name==="history"){await st(t,x,M);return}if(e.name==="exercise"){const r=parseInt(e.params.get("id")||"0",10);await nt(t,x,M,r);return}if(!M.hasMap&&e.name==="map"){P("test");return}Je(t,M,e),ut(M)}}async function te(e){const t=e.lang==="en"?"en":"ru";x={initData:e.initData??"",user:e.user??null,lang:t,siteToken:e.siteToken??""},M=null,document.body.classList.add("bb-app--telegram"),x.siteToken&&document.body.classList.add("bb-app--site");const a=document.getElementById("bb-root");if(!a)return;a.classList.add("bb-root--spa");const n=C(x.lang),s=document.getElementById("bb-header-wordmark");s&&(s.textContent=n.appBrandName),Re(i=>{ee(i).catch(()=>{})}),Oe();const r=Z();window.location.hash?await ee(r):P("map")}const ne="/assets/full-glowing-brain-Cl127Rfm.png",ae=.088,se=15,re=2,ie=.4;function W(e,t,a){return Math.max(t,Math.min(a,e))}function bt(){var e,t;return((t=(e=window.matchMedia)==null?void 0:e.call(window,"(prefers-reduced-motion: reduce)"))==null?void 0:t.matches)??!1}function pt(e,t,a){const n=e.getBoundingClientRect(),s=80,r=Math.max(n.width+s*2,1),i=Math.max(n.height+s*2,1),o=n.left+n.width/2,b=n.top+n.height/2;return{nx:W((t-o)/(r*.5),-1,1),ny:W((a-b)/(i*.5),-1,1)}}function gt(e){var _,N;if(bt())return()=>{};const t=e.querySelector("[data-parallax-brain]"),a=e.querySelector("[data-parallax-glow]");if(!t)return()=>{};let n={nx:0,ny:0},s=!1,r={nx:0,ny:0},i=!1,o=0,b=0,l=0;const L=((N=(_=window.matchMedia)==null?void 0:_.call(window,"(pointer: coarse)"))==null?void 0:N.matches)??!1,d=()=>s?{tx:n.nx,ty:n.ny}:i?{tx:r.nx*.62,ty:r.ny*.62}:{tx:0,ty:0},h=()=>{l=0;const{tx:T,ty:p}=d();o+=(T-o)*ae,b+=(p-b)*ae;const c=o*se,E=b*se,$=b*-re,A=o*re;if(t.style.transform=`translate3d(${c}px, ${E}px, 0) rotateX(${$}deg) rotateY(${A}deg)`,a){const fe=-c*ie,xe=-E*ie;a.style.transform=`translate3d(calc(-50% + ${fe}px), calc(-50% + ${xe}px), 0) scale(1.06)`}const{tx:H,ty:ge}=d(),me=Math.abs(o-H)>.003||Math.abs(b-ge)>.003,he=Math.abs(o)>.004||Math.abs(b)>.004;(me||he||i)&&(l=requestAnimationFrame(h))},g=()=>{l||(l=requestAnimationFrame(h))},y=T=>{if(!T.isTrusted)return;const{nx:p,ny:c}=pt(e,T.clientX,T.clientY);n={nx:p,ny:c},s=!0,g()},m=()=>{s=!0},u=()=>{s=!1,g()};e.addEventListener("pointermove",y,{passive:!0}),e.addEventListener("pointerenter",m),e.addEventListener("pointerleave",u),e.addEventListener("pointerdown",()=>{L&&typeof(DeviceOrientationEvent==null?void 0:DeviceOrientationEvent.requestPermission)=="function"&&DeviceOrientationEvent.requestPermission().then(T=>{T==="granted"&&(i=!0)}).catch(()=>{})},{passive:!0});let v=null;return window.DeviceOrientationEvent&&(v=T=>{if(T.gamma==null||T.beta==null)return;const p=W(T.gamma/32,-1,1),c=W((T.beta-44)/36,-1,1);r={nx:p,ny:c},i=!0,g()},window.addEventListener("deviceorientation",v,!0)),t.style.willChange="transform",a&&(a.style.willChange="transform"),g(),()=>{e.removeEventListener("pointermove",y),e.removeEventListener("pointerenter",m),e.removeEventListener("pointerleave",u),v&&window.removeEventListener("deviceorientation",v,!0),l&&cancelAnimationFrame(l),t.style.willChange="",t.style.transform="",a&&(a.style.willChange="",a.style.transform="")}}const mt={root:null,rootMargin:"0px 0px -10% 0px",threshold:.08};function ht(e,{reducedMotion:t}){if(t)return e.querySelectorAll(".bb-landing-reveal").forEach(s=>s.classList.add("is-in-view")),()=>{};const a=e.querySelectorAll(".bb-landing-reveal");if(!a.length)return()=>{};const n=new IntersectionObserver(s=>{for(const r of s)r.isIntersecting&&(r.target.classList.add("is-in-view"),n.unobserve(r.target))},mt);return a.forEach(s=>n.observe(s)),()=>{n.disconnect()}}function w(e){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}const pe="bb-landing-lang",ft=960*1e3;function xt(){try{const e=sessionStorage.getItem(X);if(!e)return null;const t=JSON.parse(e);return!(t!=null&&t.loginToken)||typeof t.loginToken!="string"||typeof t.startedAt!="number"||t.lang!=="en"&&t.lang!=="ru"?null:t}catch{return null}}function yt(e){try{sessionStorage.setItem(X,JSON.stringify(e))}catch{}}function R(){try{sessionStorage.removeItem(X)}catch{}}function vt(){try{const e=localStorage.getItem(pe);if(e==="en"||e==="ru")return e}catch{}return null}function _t(e){document.body.classList.add("bb-lang-gate-open");const t=document.createElement("div");t.className="bb-lang-gate",t.setAttribute("role","dialog"),t.setAttribute("aria-modal","true"),t.setAttribute("aria-labelledby","bb-lang-gate-title"),t.innerHTML=`
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
  `,document.body.appendChild(t);const a=n=>{try{localStorage.setItem(pe,n)}catch{}document.body.classList.remove("bb-lang-gate-open"),t.remove(),e(n)};t.querySelectorAll("[data-lang]").forEach(n=>{n.addEventListener("click",()=>a(n.getAttribute("data-lang")||"ru"))}),requestAnimationFrame(()=>{var n;(n=t.querySelector(".bb-lang-gate__btn"))==null||n.focus()})}async function wt(){const e=document.getElementById("bb-header"),t=document.getElementById("bb-nav");e&&(e.hidden=!0),t&&(t.hidden=!0);const a=document.getElementById("bb-root");if(!a)return;const n=vt();if(!n){a.className="bb-root",a.innerHTML="",_t(s=>{oe(s).catch(()=>{})});return}await oe(n)}async function oe(e){var T;const t=C(e);document.documentElement.lang=e;const a=document.getElementById("bb-root");if(!a)return;a.className="bb-root bb-root--landing",a.innerHTML=`
    <div class="bb-loading">
      <div class="bb-loading__pulse"></div>
    </div>`;let n={botUrl:"https://t.me/brainboosty?start=site",webappEntryUrl:"https://t.me/brainboosty?start=webapp",channelUrl:"https://t.me/androgenautist",hasAuthorPhoto:!1,hasChannelAvatar:!1,neuralMapHubUrl:"/#hub-login",hubHostDisplay:"neuralmap.brainboosty.app"};try{n={...n,...await Me()}}catch{}const s="/api/webapp/landing/photo",r=t.landingFeatures.map(p=>`<li>${w(p)}</li>`).join(""),i=window.matchMedia("(prefers-reduced-motion: reduce)").matches;a.innerHTML=`
    <div class="bb-landing">
      <header id="top" class="bb-landing-hero">
        <div class="bb-landing-hero__visual-anchor">
          <div class="bb-landing-hero__glow" aria-hidden="true" data-parallax-glow></div>
          <div class="bb-landing-hero__brain-layer" data-parallax-brain>
            <img class="bb-landing-hero__brain" src="${ne}" alt="" width="280" height="280" decoding="async" />
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
            <img class="bb-landing-about__photo" src="${s}" alt="" width="320" height="320" loading="lazy" data-fallback-src="${ne}" />
            <div class="bb-landing-about__ring" aria-hidden="true"></div>
          </div>
          <div class="bb-landing-about__text">
            ${t.landingAboutParagraphs.map(p=>`<p>${w(p)}</p>`).join("")}
            <a class="bb-landing-link" href="${w(n.channelUrl)}" target="_blank" rel="noopener noreferrer">
              ${w(t.landingChannelLink)}
            </a>
          </div>
        </article>
      </section>

      <section id="project" class="bb-landing-section bb-landing-reveal">
        <h2 class="bb-landing-section__title">${w(t.landingProjectTitle)}</h2>
        <ul class="bb-landing-features">${r}</ul>
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
  `,a.querySelectorAll(".bb-landing-about__photo").forEach(p=>{const c=p.getAttribute("data-fallback-src");c&&p.addEventListener("error",()=>{p.removeAttribute("data-fallback-src"),p.src=c})}),a.querySelectorAll('a[href^="#"]').forEach(p=>{p.addEventListener("click",c=>{var A;const E=(A=p.getAttribute("href"))==null?void 0:A.slice(1);if(!E)return;const $=document.getElementById(E);$&&(c.preventDefault(),$.scrollIntoView({behavior:"smooth",block:"start"}))})});const o=a.querySelector(".bb-landing"),b=ht(o||a,{reducedMotion:i}),l=a.querySelector(".bb-landing-hero"),L=l?gt(l):()=>{};let d=null;const h=()=>{d!=null&&(clearInterval(d),d=null)},g=()=>{b(),L(),window.removeEventListener("pagehide",g)};window.addEventListener("pagehide",g);const y=a.querySelectorAll("[data-start-site-login]"),m=a.querySelector(".bb-landing-hub__status"),u=p=>{y.forEach(c=>{c.disabled=p})},v=p=>{const c=window.open("about:blank","_blank");return c?(c.location.href=p,!0):!1},_=(p,c)=>{h();const E=async()=>{var $,A;try{const H=await Ie(p);if(H.status==="ready"){h(),R(),localStorage.setItem(G,H.accessToken),localStorage.setItem(V,JSON.stringify({first_name:(($=H.user)==null?void 0:$.first_name)??"",last_name:((A=H.user)==null?void 0:A.last_name)??"",language_code:H.lang==="en"?"en":"ru"})),window.location.replace("/#map"),window.location.reload();return}(H.status==="expired"||H.status==="not_found")&&(h(),R(),u(!1),m&&(m.textContent=c.landingHubExpired))}catch{}};d=setInterval(E,2e3),E()};y.forEach(p=>{p.addEventListener("click",async()=>{var E;const c=C(e);h(),R(),(E=document.getElementById("hub-login"))==null||E.scrollIntoView({behavior:"smooth",block:"start"}),u(!0),m&&(m.hidden=!1,m.textContent=c.landingHubPrepare);try{const $=await qe(),A=$==null?void 0:$.loginToken,H=$==null?void 0:$.telegramLink;if(!A||!H)throw new Error(c.errorLoad);if(yt({loginToken:A,lang:e,startedAt:Date.now()}),v(H)){m&&(m.textContent=c.landingHubPolling),_(A,c);return}m&&(m.textContent=c.landingHubReturnSameTab),window.location.href=H}catch($){h(),R(),u(!1),m&&(m.hidden=!1,m.textContent=Ae($,c.errorLoad))}})});const N=xt();N&&N.lang===e&&Date.now()-N.startedAt<ft?((T=document.getElementById("hub-login"))==null||T.scrollIntoView({behavior:"smooth",block:"start"}),u(!0),m&&(m.hidden=!1,m.textContent=t.landingHubPolling),_(N.loginToken,t)):N&&R()}function $t(){try{const e=navigator.userAgent||"";if(/Telegram/i.test(e))return!0;const t=`${window.location.hash||""}${window.location.search||""}`;if(/tgWebAppPlatform|tgWebAppData|tgWebAppVersion/i.test(t))return!0}catch{}return!1}function Lt(){var e;return(e=window.Telegram)!=null&&e.WebApp?Promise.resolve():new Promise(t=>{const a=document.createElement("script");a.src="https://telegram.org/js/telegram-web-app.js",a.async=!0,a.onload=()=>t(),a.onerror=()=>t(),document.head.appendChild(a)})}function Tt(){var a;const e=(a=window.Telegram)==null?void 0:a.WebApp;return e?(e.initData||"").trim().length>0:!1}function kt(){var e;try{return((e=localStorage.getItem(G))==null?void 0:e.trim())||""}catch{return""}}function Et(){try{const e=localStorage.getItem(V);return e?JSON.parse(e):null}catch{return null}}async function St(){var n,s;$t()&&await Lt();const{initData:e,user:t,lang:a}=je();if(Tt())te({initData:e,user:t,lang:a,siteToken:""});else{const r=kt();if(r){const i=Et(),o=(i==null?void 0:i.language_code)==="en"||(s=(n=i==null?void 0:i.language_code)==null?void 0:n.startsWith)!=null&&s.call(n,"en")||a==="en"?"en":"ru";te({initData:"",user:i?{first_name:i.first_name,last_name:i.last_name,language_code:i.language_code}:null,lang:o,siteToken:r})}else wt()}}St().catch(()=>{});
