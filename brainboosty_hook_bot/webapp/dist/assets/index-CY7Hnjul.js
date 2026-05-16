(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))n(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const i of r.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&n(i)}).observe(document,{childList:!0,subtree:!0});function a(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(s){if(s.ep)return;s.ep=!0;const r=a(s);fetch(s.href,r)}})();const xe="/assets/full-glowing-brain-Cl127Rfm.png",we="/assets/amygdala-DP7dGDc4.png",Le="/assets/lobes-uZqghd8w.png",$e="/assets/frontal-gyrus-DPq4mhR0.png",Te="/assets/insula-CAJDukm_.png",Ee="/assets/pfc-BE-jJY5g.png",ke="/assets/tpj-Cgg8S5Iu.png",U=["prefrontal_cortex","brain_lobes","insular_cortex","temporoparietal_junction","amygdala","frontal_gyrus"],Se={prefrontal_cortex:Ee,brain_lobes:Le,insular_cortex:Te,temporoparietal_junction:ke,amygdala:we,frontal_gyrus:$e},Ae=xe;function ze(e){const t=U.map(n=>Number(e[n]??0)),a=t.reduce((n,s)=>n+s,0);return Math.round(a/Math.max(t.length,1)*10)/10}const K="bb-site-session",ee="bb-site-user",ae="bb-site-login-poll";function Ne(e,t=""){const a=e==null?void 0:e.detail;return typeof a=="string"&&a.trim()?a.trim():Array.isArray(a)&&a.length?a.map(n=>typeof n=="object"&&(n!=null&&n.msg)?n.msg:String(n)).filter(Boolean).join("; "):t||(e==null?void 0:e.message)||""}function Ce(e,t){const a={"Content-Type":"application/json"};e&&(a["X-Telegram-Init-Data"]=e);const n=(t||"").trim();return n&&(a.Authorization=`Bearer ${n}`),a}async function R(e,{initData:t="",siteToken:a="",method:n="GET",body:s}={}){const r=await fetch(`/api/webapp${e}`,{method:n,headers:Ce(t,a),body:s?JSON.stringify(s):void 0,cache:"no-store"});if(!r.ok){const i=new Error(`HTTP ${r.status}`);i.status=r.status;try{i.detail=(await r.json()).detail}catch{}throw i}return r.json()}function me(e){var s,r;const t=e.lang==="en"?"en":"ru",a={};for(const i of U)a[i]=Number(((s=e.scores)==null?void 0:s[i])??0);const n={};for(const i of U){const o=((r=e.regions)==null?void 0:r[i])??{};n[i]={main:Number(o.main??a[i]),bullets:o.bullets??[],submetrics:(o.submetrics??[]).map(u=>({label:u.label??u.label_ru??"",value:Number(u.value??a[i])}))}}return{lang:t,userDisplayName:e.userDisplayName??e.user_display_name??"Guest",paid:!!e.paid,hasMap:!!(e.hasMap??e.has_map??Object.keys(e.scores||{}).length),testVariant:e.testVariant??e.test_variant??"development",tributeUrl:e.tributeUrl??e.tribute_url??"",neuroScore:e.neuroScore!=null?Number(e.neuroScore):ze(a),scores:a,connectivity:e.connectivity??[],regions:n,snapshotId:e.snapshotId??e.snapshot_id??null,createdAt:e.createdAt??e.created_at??null}}async function Me(){return R("/landing",{initData:"",siteToken:""})}async function He(e){const t=await R("/profile",{initData:e.initData??"",siteToken:e.siteToken??""});return me(t)}async function Pe(e){return R("/history",{initData:e.initData??"",siteToken:e.siteToken??""})}async function Be(e,t="development"){return R(`/test/questions?variant=${encodeURIComponent(t)}`,{initData:e.initData??"",siteToken:e.siteToken??""})}async function Ie(e,{variant:t,answers:a}){const n={variant:t,answers:a},s=await R("/test/submit",{initData:e.initData??"",siteToken:e.siteToken??"",method:"POST",body:n});return me(s.profile)}async function qe(e,t){return R(`/exercises/${encodeURIComponent(String(t))}`,{initData:e.initData??"",siteToken:e.siteToken??""})}async function Fe(){return R("/auth/site/link",{initData:"",siteToken:"",method:"POST"})}async function De(e){return R(`/auth/site/poll?token=${encodeURIComponent(e)}`,{initData:"",siteToken:""})}const Re={landingKicker:"BrainBoosty · neuroscience, no fluff",landingTitle:"Upgrade your brain — see your Neural Map",landingTagline:"7 questions → a personal 6-zone brain map, NeuroScore, and clear next steps. All in Telegram.",landingCta:"Boost my brain",landingCtaSub:"Free start in the bot · 2 minutes",landingNavAbout:"About me",landingNavProject:"The project",landingNavHub:"Neural Map Hub",landingNavCta:"Open bot",landingHubTitle:"Neural Map Hub",landingHubLead:"Your brain map, test, history, and exercises—in the browser, same account as the bot and Mini App.",landingHubHint:"You need a profile after the bot onboarding. Tap the button — Telegram opens with /start and a one-time token; confirm with «Start», then return here; this tab will log you in automatically.",landingHubStartLogin:"Open Telegram and confirm",landingHubPrepare:"Preparing your link…",landingHubPolling:"Waiting for confirmation in Telegram… keep this tab open.",landingHubPollNetworkError:"Can't reach the server. Check your connection, refresh the page, or try again later.",landingHubExpired:"That link expired. Tap the button to try again.",landingHubPopupBlocked:"Pop-ups are blocked, so we couldn't open a separate small window. Allow pop-ups for this site or use the button below.",landingHubTryOpenWindow:"Open Telegram in a separate window",landingLoginTelegram:"Log in with Telegram",landingChannelAria:"Telegram channel",landingAboutTitle:"About me",landingAboutParagraphs:["Hi, I'm Damian — creator of BrainBoosty.","I went from anxiety, brain fog, and tension to clarity, inner strength, and confidence. Now I help others with neurobiology, hormones, and cognitive habits.","On my channel I share actionable insights—no marketing noise, only what actually shifts your state."],landingChannelLink:"→ Channel @androgenautist",landingProjectTitle:"What's inside",landingFeatures:["7-question cognitive test — development or sexual profile","Neural Map: 6 brain zones with NeuroScore and recommendations","Progress history and test-to-test comparison","Daily hooks and a private exercise channel"],landingFinalTitle:"Ready to see your map?",landingFinalSub:"Open the bot — onboarding takes a few minutes; your first map is free.",heroBrain:"NEURAL MAP",scoreLabel:"NeuroScore",coverLine:"Six zones · one profile. Numbers, focus, and a clear read—no clutter.",connectivityTitle:"Inter-region links (educational model)",zoneLevel:"Integrated zone level",progressMain:e=>`Your progress ${e}%`,recTitle:"Why this zone is your biggest pleasure lever",footer:"BrainBoosty · educational model · not a medical diagnosis",premiumCta:"Get full access",premiumBadge:"Full access",premiumTitle:"Get full access — today",premiumSub:"A 30-day personal plan, progress tracker, exercises for your profile, and the private channel.",premiumBullets:["Full brain map and all zone recommendations","Progress history with test comparisons","Retests and trend tracking","Private channel and daily hooks"],navMap:"Map",navHistory:"History",navTest:"Test",navPremium:"Access",navLogout:"Log out",appBrandName:"BrainBoosty",appHeaderTitle:"Neural Map",loading:"Loading your neuro profile…",computing:"Computing your brain map…",errorLoad:"Could not load data. Please try again later.",authError:"Open the app from the Telegram bot.",notRegistered:"Take the test in the bot first!",historyTitle:"Progress history",historySub:"Zone comparison across tests. Arrows show percentage-point change.",historyEmpty:"No saved tests yet. Take your first test to see history here.",startTest:"Take the test",latest:"Latest",openThisMap:"Open map",testTitle:"Cognitive test",testPickVariant:"Choose question style (7 steps):",variantDev:"Development & cognition",variantSex:"Sexual profile",variantSexBadge:"Maximum insight",variantSexHint:"Pleasure, drive, and your neural edge",variantDevHint:"Focus, habits, and cognitive style",questionProgress:(e,t)=>`Question ${e} of ${t}`,regions:{prefrontal_cortex:"Prefrontal cortex",brain_lobes:"Brain lobes · imagery",insular_cortex:"Insular cortex",temporoparietal_junction:"Temporoparietal junction",amygdala:"Amygdala",frontal_gyrus:"Frontal gyrus"},interactiveBrainKicker:"Zone",zoneIllustrationOpenAria:"open zone card",zoneDrawerCloseAria:"Close",zoneCurrentLevel:"Current level",zoneWhyTitle:"Why it matters",zoneBoostCta:"Boost this zone",zoneUnlockNote:"Full access unlocks personal drills per zone, progress tracking, and training history.",zoneOpenHistory:"History for this zone",zoneExercisesHeading:"Zone exercises",zoneExerciseListCap:"In your program for this zone:",zoneExercisePlaceholder:"More protocols are on the way — your full access already includes the base track.",zonePaidHint:"More protocols and metrics tailored to your profile are coming next.",zoneReadMoreDetail:"Full zone breakdown below in the feed",zoneWhy:{prefrontal_cortex:"Planning, impulse control, and focus. A stronger PFC means clearer decisions and fewer spirals.",brain_lobes:"Integrates imagery, language, and space. Balance here improves how you read reality and old patterns.",insular_cortex:"Interoception and emotional regulation — the bridge between body state and action.",temporoparietal_junction:"Perspective, attention, and social context — helps you update stories instead of locking in one view.",amygdala:"Threat and reward signaling. Tuning it reduces false alarms while keeping healthy drive.",frontal_gyrus:"Links effort, intention, and follow-through — trained with sequenced action and repetition."},zoneExercises:{prefrontal_cortex:[{title:"90-second stop frame",body:"Before an impulsive reply, state one value and one tiny next step out loud."}],brain_lobes:[{title:"Sensory anchor",body:"For 30s describe one object: color, texture, sound — no judgments."}],insular_cortex:[{title:"Rib-cage breath",body:"4 cycles: inhale 4 counts, soft pause, exhale 6 — attention on rib expansion.",exerciseId:1}],temporoparietal_junction:[{title:"Perspective swap",body:"Phrase the same situation two neutral ways — without «I'm right» framing."}],amygdala:[{title:"Tolerance window",body:"2 min: note 3 neutral facts around a trigger, then one action 2% softer."}],frontal_gyrus:[{title:"Three-step chain",body:"Write three micro-steps for one goal today; track completion only."}]},exerciseLoading:"Loading protocol…",exerciseNotFound:"Exercise not found.",exerciseBackAria:"Back",exerciseTagForWho:"For who",exerciseTagEfficiency:"Effectiveness",exerciseTagFirstResult:"First results",exerciseDifficulty:"Difficulty",exerciseFirstResultDays:e=>`~${e} days`,exerciseEfficiencyLabels:["Low","Moderate","High","Exceptional","Best for this region"],exerciseAccInstruction:"Instruction",exerciseAccResearch:"Research",exerciseAccAmplify:"How to amplify",exerciseAccResults:"Expected outcomes",exerciseNoResearch:"Links will appear here soon.",exerciseCtaPrimary:"Add to my training plan",exerciseCtaMessage:"Sync with your bot plan is coming soon. For now, block time on your calendar and log completion.",exercisePremiumTitle:"Full access",exercisePremiumText:"Channel exercises are available with BrainBoosty full access.",zoneOpenFullExercise:"Open full exercise"},he={landingKicker:"BrainBoosty · нейробиология без воды",landingTitle:"Прокачай мозг — увидь свою Neural Map",landingTagline:"7 вопросов → персональная карта из 6 зон мозга, NeuroScore и понятные шаги. Всё в Telegram.",landingCta:"Прокачать мозг",landingCtaSub:"Бесплатный старт в боте · 2 минуты",landingNavAbout:"Обо мне",landingNavProject:"Проект",landingNavHub:"Neural Map Hub",landingNavCta:"В бота",landingHubTitle:"Neural Map Hub",landingHubLead:"Карта мозга, тест, история и упражнения — в браузере, тот же аккаунт, что в боте и мини-приложении.",landingHubHint:"Нужен аккаунт после анкеты в боте. Нажми кнопку — откроется Telegram с командой /start и одноразовым токеном; подтверди «Start», вернись сюда: страница сама авторизуется.",landingHubStartLogin:"Открыть Telegram и подтвердить вход",landingHubPrepare:"Готовим ссылку…",landingHubPolling:"Ждём подтверждение в Telegram… не закрывай эту вкладку.",landingHubPollNetworkError:"Не удаётся связаться с сервером. Проверь интернет и обнови страницу или попробуй позже.",landingHubExpired:"Ссылка устарела. Нажми кнопку ещё раз.",landingHubPopupBlocked:"Не удалось открыть отдельное окно для Telegram (блокировка всплывающих окон). Разреши окна для этого сайта или нажми кнопку ниже — откроется компактное окно.",landingHubTryOpenWindow:"Открыть Telegram в отдельном окне",landingLoginTelegram:"Войти через Telegram",landingChannelAria:"Канал в Telegram",landingAboutTitle:"Обо мне",landingAboutParagraphs:["Привет, я Дамиан — автор BrainBoosty.","Сам прошёл путь от тревожности, тумана в голове и зажатости — к ясности, внутренней силе и уверенности. Сейчас помогаю другим по нейробиологии, гормонам и когнитивным привычкам.","В канале делюсь рабочими инсайтами без маркетинговой шелухи — только то, что реально меняет состояние."],landingChannelLink:"→ Канал @androgenautist",landingProjectTitle:"Что внутри",landingFeatures:["Когнитивный тест из 7 вопросов — два стиля (развитие / сексуальный профиль)","Neural Map: 6 зон мозга с NeuroScore и рекомендациями","История прогресса и сравнение между тестами","Ежедневные хуки и закрытый канал с упражнениями"],landingFinalTitle:"Готов увидеть свою карту?",landingFinalSub:"Открой бота — анкета займёт пару минут, первая карта бесплатно.",heroBrain:"NEURAL MAP",scoreLabel:"NeuroScore",coverLine:"Шесть зон · один профиль. Цифры, акценты и ясная картина без лишнего шума.",connectivityTitle:"Связность зон (образовательная модель)",zoneLevel:"Интегральный уровень зоны",progressMain:e=>`Твой прогресс ${e}%`,recTitle:"Почему эта зона — твой главный рычаг удовольствия",footer:"BrainBoosty · образовательная модель · не медицинский диагноз",premiumCta:"Забрать полный доступ",premiumBadge:"Полный доступ",premiumTitle:"Забери полный доступ — сегодня",premiumSub:"Персональный план на 30 дней, трекер прогресса, упражнения под твой профиль и закрытый канал.",premiumBullets:["Полная карта мозга и все рекомендации по зонам","История прогресса с сравнением тестов","Повторные тесты и отслеживание динамики","Закрытый канал и ежедневные хуки"],navMap:"Карта",navHistory:"История",navTest:"Тест",navPremium:"Доступ",navLogout:"Выйти",appBrandName:"BrainBoosty",appHeaderTitle:"Neural Map",loading:"Загружаем нейропрофиль…",computing:"Считаем твою карту мозга…",errorLoad:"Не удалось загрузить данные. Попробуйте позже.",authError:"Откройте приложение из Telegram-бота.",notRegistered:"Пройди тест в боте!",historyTitle:"История прогресса",historySub:"Сравнение зон между прохождениями. Стрелки — изменение в процентных пунктах.",historyEmpty:"Пока нет сохранённых тестов. Пройдите первый тест — и здесь появится история.",startTest:"Пройти тест",latest:"Актуально",openThisMap:"Открыть карту",testTitle:"Когнитивный тест",testPickVariant:"Выберите стиль вопросов (7 шагов):",variantDev:"Развитие и когниция",variantSex:"Сексуальный профиль",variantSexBadge:"Максимум инсайта",variantSexHint:"Удовольствие, драйв и нейронный рельеф",variantDevHint:"Фокус, привычки и когнитивный стиль",questionProgress:(e,t)=>`Вопрос ${e} из ${t}`,regions:{prefrontal_cortex:"Префронтальная кора",brain_lobes:"Доли мозга · образы",insular_cortex:"Островковая кора",temporoparietal_junction:"Височно-теменной узел",amygdala:"Амигдала",frontal_gyrus:"Лобная извилина"},interactiveBrainKicker:"Зона",zoneIllustrationOpenAria:"открыть карточку зоны",zoneDrawerCloseAria:"Закрыть",zoneCurrentLevel:"Текущий уровень",zoneWhyTitle:"Почему это важно",zoneBoostCta:"Прокачать эту зону",zoneUnlockNote:"Полный доступ открывает персональные упражнения под каждую зону, трекер и историю прокачки.",zoneOpenHistory:"История этой зоны",zoneExercisesHeading:"Упражнения для зоны",zoneExerciseListCap:"Сейчас в программе для этой зоны:",zoneExercisePlaceholder:"Скоро добавим ещё шаги — уже доступен базовый протокол в полном доступе.",zonePaidHint:"Дальше — больше протоколов и метрик именно под твой профиль.",zoneReadMoreDetail:"Подробный разбор зоны в ленте ниже",zoneWhy:{prefrontal_cortex:"Планирование, торможение импульсов и фокус. Сильная ПФК — ясные решения, меньше хаоса и откатов.",brain_lobes:"Интеграция образов, языка и пространства. Баланс здесь — лучшее восприятие реальности и выученные паттерны.",insular_cortex:"Телесная осознанность и эмоциональная регуляция. Островок связывает «что чувствую» с «что делаю».",temporoparietal_junction:"Перспектива, внимание и социальный контекст. TPJ помогает не застревать в одной интерпретации событий.",amygdala:"Детектор угроз и сигналов награды. Настрой амигдалы — меньше ложной тревоги, больше спокойного драйва.",frontal_gyrus:"Связь моторики, намерения и усилия. Тренируется через последовательные действия и повторение цели."},zoneExercises:{prefrontal_cortex:[{title:"90 секунд «стоп-рамка»",body:"Перед импульсивным ответом назови вслух одну ценность и одно следующее маленькое действие."}],brain_lobes:[{title:"Сенсорный якорь",body:"30 секунд описывай предмет из комнаты: цвет, фактура, звук — без оценок."}],insular_cortex:[{title:"Дыхание в ребро",body:"4 цикла: вдох 4 счёта, мягкая пауза, выдох 6 — внимание на расширении рёбер.",exerciseId:1}],temporoparietal_junction:[{title:"Смена ракурса",body:"Сформулируй ту же ситуацию двумя нейтральными формулировками, без «я прав»."}],amygdala:[{title:"Окно толерантности",body:"2 минуты: найди 3 нейтральных факта вокруг триггера, затем одно действие на 2% мягче."}],frontal_gyrus:[{title:"Цепочка на 3 шага",body:"Запиши три микрошага к одной цели на сегодня; отмечай только факт выполнения."}]},exerciseLoading:"Загружаем протокол…",exerciseNotFound:"Упражнение не найдено.",exerciseBackAria:"Назад",exerciseTagForWho:"Для кого",exerciseTagEfficiency:"Эффективность",exerciseTagFirstResult:"Первый результат",exerciseDifficulty:"Сложность",exerciseFirstResultDays:e=>`ориентир ≈ ${e} дн.`,exerciseEfficiencyLabels:["Низкая","Средняя","Высокая","Чрезвычайная","Оптимально для отдела"],exerciseAccInstruction:"Инструкция",exerciseAccResearch:"Исследования",exerciseAccAmplify:"Как усилить эффект",exerciseAccResults:"Ожидаемые результаты",exerciseNoResearch:"Ссылки будут добавлены.",exerciseCtaPrimary:"Добавить в мой план прокачки",exerciseCtaMessage:"Скоро здесь будет синхронизация с твоим планом в боте. Пока закрепи время в календаре и отметь выполнение в заметках.",exercisePremiumTitle:"Полный доступ",exercisePremiumText:"Экран упражнений из закрытого канала доступен с подпиской BrainBoosty.",zoneOpenFullExercise:"Полный экран упражнения"},Oe={ru:he,en:Re};function H(e){return Oe[e==="en"?"en":"ru"]??he}const ne=new Set;function se(){const e=(window.location.hash||"#map").replace(/^#/,""),[t,a]=e.split("?");return{name:t||"map",params:new URLSearchParams(a||"")}}function q(e,t={}){var n;const a=((n=t.toString)==null?void 0:n.call(t))||new URLSearchParams(t).toString();window.location.hash=a?`${e}?${a}`:e}function je(e){return ne.add(e),()=>ne.delete(e)}function fe(){const e=se();for(const t of ne)t(e)}window.addEventListener("hashchange",fe);function Ue(){fe()}function We(){var n,s,r;const e=(n=window.Telegram)==null?void 0:n.WebApp;if(!e)return{tg:null,initData:"",user:null,lang:"ru"};e.ready(),e.expand(),e.enableClosingConfirmation(),e.disableVerticalSwipes&&e.disableVerticalSwipes(),re(),e.onEvent("themeChanged",re);const t=((s=e.initDataUnsafe)==null?void 0:s.user)??null,a=(t==null?void 0:t.language_code)==="en"||(r=t==null?void 0:t.language_code)!=null&&r.startsWith("en")?"en":"ru";return e.setHeaderColor&&e.setHeaderColor("#010108"),e.setBackgroundColor&&e.setBackgroundColor("#010108"),{tg:e,initData:e.initData||"",user:t,lang:a}}function re(){const e=document.documentElement;e.style.setProperty("--bb-tg-bg","#010108"),e.style.setProperty("--bb-tg-text","#f1f5f9")}function Z(e){var a;const t=(a=window.Telegram)==null?void 0:a.WebApp;if(t!=null&&t.openTelegramLink&&e.includes("t.me/")){t.openTelegramLink(e);return}if(t!=null&&t.openLink){t.openLink(e);return}window.open(e,"_blank","noopener,noreferrer")}function z(){var e,t,a,n;(n=(a=(t=(e=window.Telegram)==null?void 0:e.WebApp)==null?void 0:t.HapticFeedback)==null?void 0:a.impactOccurred)==null||n.call(a,"light")}function A(e){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}function Ge(){return`
    <div class="bb-zone-drawer__bar-track">
      <div class="bb-zone-drawer__bar-fill" style="width: 0%"></div>
    </div>`}function Ve(e,t,a={}){var d,_,w,T,L,E;const n=H(e.lang),s=n.regions[t]??t,r=((d=n.zoneWhy)==null?void 0:d[t])??"",i=Number(((_=e.scores)==null?void 0:_[t])??0).toFixed(1),o=((w=n.zoneExercises)==null?void 0:w[t])??[],u=o.length>0?o.map(g=>`
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
          ${Ge()}
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
  `,document.body.appendChild(l),document.body.classList.add("bb-zone-drawer-open");const k=l.querySelector(".bb-zone-drawer"),c=l.querySelector("[data-exercises]"),b=l.querySelector(".bb-zone-drawer-backdrop"),p=l.querySelector(".bb-zone-drawer__bar-fill"),y=()=>{var g;document.removeEventListener("keydown",x),document.body.classList.remove("bb-zone-drawer-open"),l.remove(),(g=a.onClose)==null||g.call(a)},x=g=>{g.key==="Escape"&&y()};return document.addEventListener("keydown",x),l.querySelectorAll("[data-close]").forEach(g=>{g.addEventListener("click",()=>{z(),y()})}),(T=l.querySelector('[data-go="boost"]'))==null||T.addEventListener("click",()=>{z(),e.tributeUrl?Z(e.tributeUrl):q("premium"),y()}),(L=l.querySelector('[data-go="history"]'))==null||L.addEventListener("click",()=>{z(),q("history",{zone:t}),y()}),(E=l.querySelector('[data-toggle="exercises"]'))==null||E.addEventListener("click",()=>{if(z(),!c)return;c.hasAttribute("hidden")?c.removeAttribute("hidden"):c.setAttribute("hidden","")}),l.querySelectorAll("[data-scroll-zone]").forEach(g=>{g.addEventListener("click",()=>{z();const P=g.getAttribute("data-scroll-zone")||t;y(),requestAnimationFrame(()=>{var B;(B=document.getElementById(`zone-${P}`))==null||B.scrollIntoView({behavior:"smooth",block:"start"})})})}),l.querySelectorAll("[data-open-exercise]").forEach(g=>{g.addEventListener("click",()=>{z();const P=g.getAttribute("data-open-exercise")||"1";y(),q("exercise",{id:P})})}),requestAnimationFrame(()=>{if(k==null||k.classList.add("is-open"),b==null||b.classList.add("is-open"),p){const g=Math.max(0,Math.min(100,Number(i)||0));p.style.width="0%",requestAnimationFrame(()=>{p.style.width=`${g.toFixed(1)}%`})}}),{close:()=>{y()}}}function j(e){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}function Ye(e,{displayName:t,neuroScore:a,connectivity:n}){const s=(n==null?void 0:n.length)>0?`
    <div class="bb-connectivity glass rounded-2xl p-4 mt-5">
      <p class="bb-connectivity__title">${j(e.connectivityTitle)}</p>
      ${n.map(r=>`<p>• ${j(r)}</p>`).join(`
      `)}
    </div>`:"";return`
<section class="bb-section bb-cover" data-section="cover">
  <img src="${Ae}" alt="" class="cover-full-brain-hero mb-4" width="360" height="260" decoding="async" />
  <div class="glass rounded-3xl p-6 sm:p-8 cover-neon-card border border-cyan-500/20">
    <p class="text-center text-sm uppercase tracking-[0.35em] text-cyan-200 mt-1 font-semibold drop-shadow-[0_0_16px_rgba(34,211,238,0.55)] bb-cover__kicker">
      ${j(e.heroBrain)}
    </p>
    <h1 class="text-center text-2xl sm:text-3xl font-bold mt-5 text-white drop-shadow-[0_0_20px_rgba(167,139,250,0.25)] neon-zone-title">
      ${j(t)}
    </h1>
    <p class="text-center text-slate-300/95 mt-3 text-[15px] leading-relaxed max-w-md mx-auto tracking-wide px-2">
      ${j(e.coverLine)}
    </p>
    <div class="mt-8 flex flex-col items-center justify-center">
      <p class="bb-cover__score-label text-cyan-100/90 text-sm mb-2 font-medium tracking-wide drop-shadow-[0_0_10px_rgba(34,211,238,0.35)]">
        ${j(e.scoreLabel)}
      </p>
      <div class="text-6xl sm:text-7xl font-black bg-gradient-to-r from-cyan-200 via-violet-300 to-fuchsia-300 bg-clip-text text-transparent neon-score-cover" data-neuro-score>
        ${Number(a).toFixed(1)}
      </div>
    </div>
    ${s}
  </div>
  <p class="text-center text-[11px] text-slate-500 mt-6">${j(e.footer)}</p>
</section>`}function ie({label:e,value:t,glow:a=!1}){const n=Math.max(0,Math.min(100,Number(t)||0)),s=Math.max(0,100-n),r=a?"pdf-bar-gradient pdf-bar-gradient--main":"pdf-bar-gradient pdf-bar-gradient--sub",i=Je(e);return[`<div class="mb-3.5" data-bar-value="${n}">`,'<div class="flex justify-between text-xs text-slate-400 mb-1">',`<span>${i}</span>`,`<span class="text-cyan-100 font-bold tracking-wide">${n.toFixed(1)}%</span>`,"</div>",'<div class="pdf-bar-track">',`<div class="${r}" style="clip-path: inset(0 ${s.toFixed(2)}% 0 0);"></div>`,"</div>","</div>"].join(`
  `)}function Je(e){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}function G(e){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}function Xe(e,t,a){const n=e.regions[t]??t,s=Se[t],r=Number(a.main??0),i=e.progressMain(`${r.toFixed(1)}`),o=[ie({label:e.zoneLevel,value:r,glow:!0}),...(a.submetrics??[]).map(l=>ie({label:l.label,value:l.value,glow:!1}))].join(`
`),u=(a.bullets??[]).map(l=>`<li>${G(l)}</li>`).join(`
        `);return`
<section class="bb-section bb-region" data-section="region" data-region="${t}" id="zone-${t}">
  <button type="button" class="bb-region__illu-hit" data-open-zone="${t}" aria-label="${G(n)} — ${G(e.zoneIllustrationOpenAria)}">
    <img src="${s}" alt="" class="brain-float-top bb-region__illu" width="320" height="220" loading="lazy" decoding="async" />
  </button>
  <h2 class="bb-region__title neon-zone-title px-2">${G(n)}</h2>
  <p class="bb-region__progress-label">${G(i)}</p>
  <div class="glass rounded-2xl p-4 max-w-xl mx-auto w-full">
    ${o}
  </div>
  <div class="glass rounded-2xl p-4 mt-4 max-w-xl mx-auto w-full">
    <p class="bb-rec-title">${G(e.recTitle)}</p>
    <ul class="bb-rec-list">
        ${u}
    </ul>
  </div>
</section>`}function Ze(e,t,a){const n=H(t.lang),s=t.userDisplayName||(t.lang==="en"?"Guest":"Гость"),r=[Ye(n,{displayName:s,neuroScore:t.neuroScore,connectivity:t.connectivity}),...U.map(i=>{var o,u;return Xe(n,i,{main:t.scores[i],bullets:((o=t.regions[i])==null?void 0:o.bullets)??[],submetrics:((u=t.regions[i])==null?void 0:u.submetrics)??[]})})];e.innerHTML=r.join(`
`),Ke(e),et(e),tt(e),Qe(e,t,a)}function Qe(e,t,a){var o,u;const n=e.querySelectorAll("[data-open-zone]");if(!n.length)return;const s=l=>{e.querySelectorAll(".bb-region").forEach(k=>{const c=k.dataset.region;k.classList.toggle("is-zone-hot",!!l&&c===l)})},r=l=>{!l||!U.includes(l)||(s(l),Ve(t,l,{onClose:()=>s(null)}))};n.forEach(l=>{l.addEventListener("pointerenter",()=>s(l.getAttribute("data-open-zone")||"")),l.addEventListener("pointerleave",k=>{const c=k.relatedTarget;c instanceof Node&&e.contains(c)&&c.closest("[data-open-zone]")||s(null)}),l.addEventListener("click",k=>{k.preventDefault();const c=l.getAttribute("data-open-zone");c&&(z(),r(c))})});const i=(u=(o=a==null?void 0:a.params)==null?void 0:o.get)==null?void 0:u.call(o,"zone");i&&U.includes(i)&&requestAnimationFrame(()=>r(i))}function Ke(e){const t=e.querySelectorAll(".bb-section"),a=new IntersectionObserver(n=>{for(const s of n)s.isIntersecting&&(s.target.classList.add("is-visible"),a.unobserve(s.target))},{root:null,rootMargin:"0px 0px -8% 0px",threshold:.08});t.forEach(n=>a.observe(n))}function et(e){const t=e.querySelector("[data-neuro-score]");if(!t)return;const a=parseFloat(t.textContent||"0"),n=1200,s=performance.now(),r=i=>{const o=Math.min(1,(i-s)/n),u=1-(1-o)**3;t.textContent=(a*u).toFixed(1),o<1&&requestAnimationFrame(r)};requestAnimationFrame(r)}function tt(e){const t=e.querySelectorAll("[data-bar-value]"),a=new IntersectionObserver(n=>{for(const s of n){if(!s.isIntersecting)continue;const r=s.target,i=parseFloat(r.getAttribute("data-bar-value")||"0"),o=r.querySelector(".pdf-bar-gradient");o&&(o.style.clipPath="inset(0 100% 0 0)",requestAnimationFrame(()=>{o.style.clipPath=`inset(0 ${Math.max(0,100-i).toFixed(2)}% 0 0)`})),a.unobserve(r)}},{threshold:.2});t.forEach(n=>a.observe(n))}function m(e){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}function nt(){return{instruction:'<svg class="ex-ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.25" aria-hidden="true"><path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01"/></svg>',research:'<svg class="ex-ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.25" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3M11 8v6M8 11h6"/></svg>',amplify:'<svg class="ex-ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.25" aria-hidden="true"><path d="M12 3l1.8 5.5h5.7l-4.6 3.4 1.8 5.5-4.7-3.4-4.7 3.4 1.8-5.5-4.6-3.4h5.7L12 3z"/></svg>',results:'<svg class="ex-ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.25" aria-hidden="true"><path d="M4 19V5M9 19v-6M14 19V9M19 19v-9"/><path d="M4 19h16" stroke-linecap="round"/></svg>'}}function te(e){return String(e||"").split(`
`).map(a=>`<p>${m(a)}</p>`).join("")}function at(e){e.querySelectorAll(".ex-acc").forEach(t=>{const a=t.querySelector(".ex-acc__trigger");a&&a.addEventListener("click",()=>{const s=!(t.getAttribute("data-open")==="true");t.setAttribute("data-open",String(s)),a.setAttribute("aria-expanded",String(s)),z()})})}function J(e){requestAnimationFrame(()=>{var t;(t=e.querySelector(".ex-lux"))==null||t.classList.add("is-visible")})}async function st(e,t,a,n){var y,x;const s=H(a.lang),r=nt();e.className="bb-root bb-root--spa bb-root--exercise",e.innerHTML=`
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
    </div>`;const i=e.querySelector("#ex-back");if(i==null||i.addEventListener("click",()=>{z(),q("map")}),!Number.isFinite(n)||n<1){const d=e.querySelector(".ex-lux__scroll .ex-lux__inner");d&&(d.innerHTML=`<p class="ex-lux__err">${m(s.exerciseNotFound)}</p>`),J(e);return}if(!a.paid){e.querySelector(".ex-lux__scroll .ex-lux__inner").innerHTML=`
      <div class="ex-lux__hero">
        <p class="ex-lux__lock-title">${m(s.exercisePremiumTitle)}</p>
        <p class="ex-lux__lock-text">${m(s.exercisePremiumText)}</p>
        <button type="button" class="ex-lux__cta ex-lux__cta--inline" id="ex-unlock">${m(s.premiumCta)}</button>
      </div>`,(y=e.querySelector("#ex-unlock"))==null||y.addEventListener("click",()=>{z(),a.tributeUrl?Z(a.tributeUrl):q("premium")}),e.querySelector("#ex-cta").textContent=s.premiumCta,(x=e.querySelector("#ex-cta"))==null||x.addEventListener("click",()=>{z(),a.tributeUrl?Z(a.tributeUrl):q("premium")}),J(e);return}let o;try{o=await qe(t,n)}catch(d){const _=e.querySelector(".ex-lux__scroll .ex-lux__inner"),w=(d==null?void 0:d.status)===403?s.exercisePremiumTitle:(d==null?void 0:d.status)===404?s.exerciseNotFound:s.errorLoad;_&&(_.innerHTML=`<p class="ex-lux__err">${m(w)}</p>`),J(e);return}const u=Math.max(0,Math.min(4,(o.effectiveness||3)-1)),l=s.exerciseEfficiencyLabels[u]??"—",k=(o.regions||[]).map(d=>`<span class="ex-lux__pill">${m(s.regions[d]??d)}</span>`).join(""),c=(o.researchLinks||[]).map(d=>`<a class="ex-lux__link" href="${m(d.url)}" target="_blank" rel="noopener noreferrer">${m(d.label||d.url)}</a>`).join(""),b=o.instructionImageUrl?`<figure class="ex-lux__figure"><img src="${m(o.instructionImageUrl)}" alt="" loading="lazy" decoding="async" /></figure>`:"";e.querySelector(".ex-lux__scroll .ex-lux__inner").innerHTML=`
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
      <div class="ex-lux__pills">${k}</div>
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
          <div class="ex-acc__panel-inner ex-lux__prose">${te(o.instruction)}</div>
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
          <div class="ex-acc__panel-inner ex-lux__prose">${te(o.amplify)}</div>
        </div>
      </div>
      <div class="ex-acc" data-open="false">
        <button type="button" class="ex-acc__trigger" aria-expanded="false">
          <span class="ex-acc__ic">${r.results}</span>
          <span class="ex-acc__label">${m(s.exerciseAccResults)}</span>
          <span class="ex-acc__chev" aria-hidden="true"></span>
        </button>
        <div class="ex-acc__panel">
          <div class="ex-acc__panel-inner ex-lux__prose">${te(o.expectedResults)}</div>
        </div>
      </div>
    </div>
    <div class="ex-lux__scroll-pad"></div>`,at(e);const p=e.querySelector("#ex-cta");p==null||p.addEventListener("click",()=>{var d,_,w;z(),(w=(_=(d=window.Telegram)==null?void 0:d.WebApp)==null?void 0:_.showAlert)==null||w.call(_,s.exerciseCtaMessage)}),J(e)}function X(e){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}function rt(e,t){if(!e)return"—";try{return new Date(e).toLocaleString(t==="en"?"en-GB":"ru-RU",{day:"2-digit",month:"short",year:"numeric",hour:"2-digit",minute:"2-digit"})}catch{return e}}async function it(e,t,a){var l,k;const n=H(a.lang),s=se().params.get("zone"),r=document.createElement("section");r.className="bb-section is-visible bb-history",r.innerHTML=`
    <h2 class="bb-page-title bb-page-title--premium neon-zone-title">${X(n.historyTitle)}</h2>
    <p class="bb-page-sub text-slate-300/90 text-sm mb-4">${X(n.historySub)}</p>
  `;const i=document.createElement("div");i.className="space-y-3",i.textContent=n.loading,r.appendChild(i),e.replaceChildren(r);let o;try{o=await Pe(t)}catch{i.innerHTML=`<p class="bb-error">${X(n.errorLoad)}</p>`;return}const u=o.items??[];if(i.replaceChildren(),!u.length){const c=document.createElement("div");c.className="glass rounded-2xl p-5 text-center";const b=document.createElement("p");b.className="text-slate-200 mb-4",b.textContent=n.historyEmpty;const p=document.createElement("button");p.type="button",p.className="bb-btn-primary",p.textContent=n.startTest,p.addEventListener("click",()=>q("test")),c.append(b,p),i.appendChild(c);return}for(const[c,b]of u.entries()){const p=document.createElement("article");p.className=`glass rounded-2xl p-4 bb-history-card${c===0?" is-active":""}`;const y=document.createElement("div");y.className="flex justify-between items-start gap-2 mb-2";const x=document.createElement("div");if(x.innerHTML=`
      <p class="text-xs text-cyan-200/80 uppercase tracking-wide">${X(rt(b.createdAt,a.lang))}</p>
      <p class="text-lg font-bold text-white mt-1 bb-type-display">NeuroScore <span class="text-cyan-200">${Number(b.neuroScore).toFixed(1)}</span></p>
    `,y.appendChild(x),c===0){const w=document.createElement("span");w.className="bb-badge",w.textContent=n.latest,y.appendChild(w)}p.appendChild(y);const d=document.createElement("div");d.className="bb-history-deltas";for(const w of U){const T=n.regions[w]??w,L=Number(((l=b.scores)==null?void 0:l[w])??0).toFixed(1),E=b.isFirst?"—":((k=b.deltas)==null?void 0:k[w])??"·",g=document.createElement("div");g.className=`bb-history-row${s===w?" bb-history-row--focus":""}`;const P=document.createElement("span");P.textContent=T;const B=document.createElement("span");B.textContent=`${L}%`;const F=document.createElement("span");F.textContent=E,typeof E=="string"&&E.includes("↑")&&(F.className="bb-delta-up"),typeof E=="string"&&E.includes("↓")&&(F.className="bb-delta-down"),g.append(P,B,F),d.appendChild(g)}p.appendChild(d);const _=document.createElement("button");_.type="button",_.className="bb-btn-ghost mt-3 w-full",_.textContent=n.openThisMap,_.addEventListener("click",()=>q("map")),p.appendChild(_),i.appendChild(p)}s&&u.length&&requestAnimationFrame(()=>{var c;(c=r.querySelector(".bb-history-row--focus"))==null||c.scrollIntoView({block:"center",behavior:"smooth"})})}function V(e){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}function ot(e,t){var n;const a=H(t.lang);e.innerHTML=`
    <section class="bb-section is-visible bb-premium">
      <div class="mb-3 rounded-full px-5 py-1.5 border border-cyan-400/30 bg-cyan-500/10 text-xs font-bold uppercase tracking-[0.35em] text-cyan-100 text-center bb-type-display">
        ${V(a.premiumBadge)}
      </div>
      <h2 class="bb-page-title bb-page-title--premium neon-cta-title mb-4">
        ${V(a.premiumTitle)}
      </h2>
      <p class="text-slate-200 text-center text-sm leading-relaxed mb-6">${V(a.premiumSub)}</p>
      <ul class="bb-premium-list glass rounded-2xl p-5 mb-6 space-y-3 text-sm text-slate-200">
        ${a.premiumBullets.map(s=>`<li>${V(s)}</li>`).join("")}
      </ul>
      <button type="button" class="bb-btn-premium-buy w-full" id="bb-premium-buy">${V(a.premiumCta)}</button>
    </section>
  `,(n=e.querySelector("#bb-premium-buy"))==null||n.addEventListener("click",()=>{z(),t.tributeUrl&&Z(t.tributeUrl)})}function C(e){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}async function lt(e,t,a,{onProfile:n}={}){const s=H(a.lang),r={variant:a.testVariant||"development",questions:[],answers:{},step:0},i=document.createElement("section");i.className="bb-section is-visible bb-test",e.replaceChildren(i);async function o(){i.innerHTML=`<p class="text-cyan-200/80 text-sm">${C(s.loading)}</p>`;try{const c=await Be(t,r.variant);r.questions=c.questions??[],r.step=0,r.answers={},l()}catch{i.innerHTML=`<p class="bb-error">${C(s.errorLoad)}</p>`}}function u(){i.innerHTML=`
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
    `;const y=i.querySelector("#bb-test-options");for(const x of c.options??[]){const d=document.createElement("button");d.type="button",d.className="bb-test-option",d.innerHTML=`<span class="bb-test-option-key">${C(x.key)}</span><span>${C(x.label)}</span>`,d.addEventListener("click",()=>k(x.key)),y.appendChild(d)}}async function k(c){z();const b=r.questions[r.step];if(r.answers[b.id]=c,r.step+1<r.questions.length){r.step+=1,l();return}i.innerHTML=`
      <div class="bb-loading">
        <div class="bb-loading__pulse"></div>
        <p class="text-sm text-cyan-200/80">${C(s.computing)}</p>
      </div>`;try{const p={};for(const[x,d]of Object.entries(r.answers))p[String(x)]=d;const y=await Ie(t,{variant:r.variant,answers:p});n&&n(y),q("map")}catch{i.innerHTML=`<p class="bb-error">${C(s.errorLoad)}</p>`}}u()}let f=null,M=null;function ct(e){var r;document.body.classList.add("bb-app--needs-bot"),(r=document.querySelector(".bb-premium-fab"))==null||r.remove();const t=document.getElementById("bb-nav");t&&(t.hidden=!0,t.innerHTML="");const a=H(f.lang);e.className="bb-root bb-root--spa bb-root--bot-gate",e.replaceChildren();const n=document.createElement("div");n.className="bb-bot-gate",n.setAttribute("role","status");const s=document.createElement("p");s.className="bb-bot-gate__line",s.textContent=a.notRegistered,n.appendChild(s),e.appendChild(n)}async function dt(e){var a;if(M)return document.body.classList.remove("bb-app--needs-bot"),!0;const t=H(f.lang);e.className="bb-root bb-root--spa",e.innerHTML=`
      <div class="bb-loading">
        <div class="bb-loading__pulse"></div>
        <p class="text-sm text-cyan-200/80">${t.loading}</p>
      </div>`;try{return M=await He(f),document.body.classList.remove("bb-app--needs-bot"),ye(M),(a=f.user)!=null&&a.first_name&&!M.userDisplayName&&(M.userDisplayName=[f.user.first_name,f.user.last_name].filter(Boolean).join(" ")),!0}catch(n){if((n==null?void 0:n.status)===401&&(n==null?void 0:n.detail)==="invalid_site_token"&&(f!=null&&f.siteToken)){try{localStorage.removeItem(K),localStorage.removeItem(ee)}catch{}return window.location.replace("/"),!1}if((n==null?void 0:n.status)===403&&(n==null?void 0:n.detail)==="not_registered")return ct(e),!1;const s=(n==null?void 0:n.status)===403?t.notRegistered:(n==null?void 0:n.status)===401?t.authError:t.errorLoad;return e.className="bb-root bb-root--spa",e.innerHTML=`<p class="bb-error">${s}</p>`,!1}}function ut(e){const t=document.getElementById("bb-nav");t&&t.querySelectorAll(".bb-nav__btn[data-route]").forEach(a=>{a.classList.toggle("is-active",a.dataset.route===e)})}function bt(e){if(!f)return;const t=e==="en"?"en":"ru";if(f.lang===t)return;f.lang=t,document.documentElement.lang=t;const a=H(t),n=document.getElementById("bb-header-wordmark");n&&(n.textContent=a.appBrandName),_e(t)}function ye(e){e!=null&&e.lang&&bt(e.lang)}function pt(e){var n;if((n=document.querySelector(".bb-premium-fab"))==null||n.remove(),e.paid||!e.tributeUrl)return;const t=H((f==null?void 0:f.lang)||e.lang),a=document.createElement("button");a.type="button",a.className="bb-premium-fab",a.textContent=t.premiumCta,a.addEventListener("click",()=>{z(),q("premium")}),document.body.appendChild(a)}function _e(e){var s;const t=document.getElementById("bb-nav");if(!t)return;const a=H(e);t.hidden=!1;const n=f!=null&&f.siteToken?`<button type="button" class="bb-nav__btn bb-nav__btn--logout" data-site-logout>${a.navLogout}</button>`:"";t.innerHTML=`
    <button type="button" class="bb-nav__btn" data-route="map">${a.navMap}</button>
    <button type="button" class="bb-nav__btn" data-route="history">${a.navHistory}</button>
    <button type="button" class="bb-nav__btn" data-route="test">${a.navTest}</button>
    <button type="button" class="bb-nav__btn" data-route="premium">${a.navPremium}</button>
    ${n}
  `,t.querySelectorAll(".bb-nav__btn[data-route]").forEach(r=>{r.addEventListener("click",()=>{z(),q(r.dataset.route||"map")})}),(s=t.querySelector("[data-site-logout]"))==null||s.addEventListener("click",()=>{z();try{localStorage.removeItem(K),localStorage.removeItem(ee)}catch{}window.location.replace("/")})}async function oe(e){var s;const t=document.getElementById("bb-root");if(!t||!f)return;const a=document.getElementById("bb-nav"),n=e.name==="exercise";if(document.body.classList.toggle("bb-route-exercise",n),n||ut(e.name),e.name!=="map"&&((s=document.querySelector(".bb-premium-fab"))==null||s.remove()),!!await dt(t)){if(_e(f.lang),a&&(a.hidden=n),e.name==="premium"){ot(t,M);return}if(e.name==="test"){await lt(t,f,M,{onProfile:r=>{M=r,ye(r)}});return}if(e.name==="history"){await it(t,f,M);return}if(e.name==="exercise"){const r=parseInt(e.params.get("id")||"0",10);await st(t,f,M,r);return}if(!M.hasMap&&e.name==="map"){q("test");return}Ze(t,M,e),pt(M)}}async function le(e){const t=e.lang==="en"?"en":"ru";f={initData:e.initData??"",user:e.user??null,lang:t,siteToken:e.siteToken??""},M=null,document.body.classList.add("bb-app--telegram"),f.siteToken&&document.body.classList.add("bb-app--site");const a=document.getElementById("bb-root");if(!a)return;a.classList.add("bb-root--spa");const n=H(f.lang),s=document.getElementById("bb-header-wordmark");s&&(s.textContent=n.appBrandName),je(i=>{oe(i).catch(()=>{})}),Ue();const r=se();window.location.hash?await oe(r):q("map")}const ce="/assets/full-glowing-brain-Cl127Rfm.png",de=.088,ue=15,be=2,pe=.4;function Q(e,t,a){return Math.max(t,Math.min(a,e))}function gt(){var e,t;return((t=(e=window.matchMedia)==null?void 0:e.call(window,"(prefers-reduced-motion: reduce)"))==null?void 0:t.matches)??!1}function mt(e,t,a){const n=e.getBoundingClientRect(),s=80,r=Math.max(n.width+s*2,1),i=Math.max(n.height+s*2,1),o=n.left+n.width/2,u=n.top+n.height/2;return{nx:Q((t-o)/(r*.5),-1,1),ny:Q((a-u)/(i*.5),-1,1)}}function ht(e){var w,T;if(gt())return()=>{};const t=e.querySelector("[data-parallax-brain]"),a=e.querySelector("[data-parallax-glow]");if(!t)return()=>{};let n={nx:0,ny:0},s=!1,r={nx:0,ny:0},i=!1,o=0,u=0,l=0;const k=((T=(w=window.matchMedia)==null?void 0:w.call(window,"(pointer: coarse)"))==null?void 0:T.matches)??!1,c=()=>s?{tx:n.nx,ty:n.ny}:i?{tx:r.nx*.62,ty:r.ny*.62}:{tx:0,ty:0},b=()=>{l=0;const{tx:L,ty:E}=c();o+=(L-o)*de,u+=(E-u)*de;const g=o*ue,P=u*ue,B=u*-be,F=o*be;if(t.style.transform=`translate3d(${g}px, ${P}px, 0) rotateX(${B}deg) rotateY(${F}deg)`,a){const S=-g*pe,D=-P*pe;a.style.transform=`translate3d(calc(-50% + ${S}px), calc(-50% + ${D}px), 0) scale(1.06)`}const{tx:v,ty:h}=c(),I=Math.abs(o-v)>.003||Math.abs(u-h)>.003,N=Math.abs(o)>.004||Math.abs(u)>.004;(I||N||i)&&(l=requestAnimationFrame(b))},p=()=>{l||(l=requestAnimationFrame(b))},y=L=>{if(!L.isTrusted)return;const{nx:E,ny:g}=mt(e,L.clientX,L.clientY);n={nx:E,ny:g},s=!0,p()},x=()=>{s=!0},d=()=>{s=!1,p()};e.addEventListener("pointermove",y,{passive:!0}),e.addEventListener("pointerenter",x),e.addEventListener("pointerleave",d),e.addEventListener("pointerdown",()=>{k&&typeof(DeviceOrientationEvent==null?void 0:DeviceOrientationEvent.requestPermission)=="function"&&DeviceOrientationEvent.requestPermission().then(L=>{L==="granted"&&(i=!0)}).catch(()=>{})},{passive:!0});let _=null;return window.DeviceOrientationEvent&&(_=L=>{if(L.gamma==null||L.beta==null)return;const E=Q(L.gamma/32,-1,1),g=Q((L.beta-44)/36,-1,1);r={nx:E,ny:g},i=!0,p()},window.addEventListener("deviceorientation",_,!0)),t.style.willChange="transform",a&&(a.style.willChange="transform"),p(),()=>{e.removeEventListener("pointermove",y),e.removeEventListener("pointerenter",x),e.removeEventListener("pointerleave",d),_&&window.removeEventListener("deviceorientation",_,!0),l&&cancelAnimationFrame(l),t.style.willChange="",t.style.transform="",a&&(a.style.willChange="",a.style.transform="")}}const ft={root:null,rootMargin:"0px 0px -10% 0px",threshold:.08};function yt(e,{reducedMotion:t}){if(t)return e.querySelectorAll(".bb-landing-reveal").forEach(s=>s.classList.add("is-in-view")),()=>{};const a=e.querySelectorAll(".bb-landing-reveal");if(!a.length)return()=>{};const n=new IntersectionObserver(s=>{for(const r of s)r.isIntersecting&&(r.target.classList.add("is-in-view"),n.unobserve(r.target))},ft);return a.forEach(s=>n.observe(s)),()=>{n.disconnect()}}function $(e){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}const ve="bb-landing-lang",_t=960*1e3;function vt(){try{const e=sessionStorage.getItem(ae);if(!e)return null;const t=JSON.parse(e);return!(t!=null&&t.loginToken)||typeof t.loginToken!="string"||typeof t.startedAt!="number"||t.lang!=="en"&&t.lang!=="ru"?null:t}catch{return null}}function xt(e){try{sessionStorage.setItem(ae,JSON.stringify(e))}catch{}}function Y(){try{sessionStorage.removeItem(ae)}catch{}}function wt(){try{const e=localStorage.getItem(ve);if(e==="en"||e==="ru")return e}catch{}return null}function Lt(e){document.body.classList.add("bb-lang-gate-open");const t=document.createElement("div");t.className="bb-lang-gate",t.setAttribute("role","dialog"),t.setAttribute("aria-modal","true"),t.setAttribute("aria-labelledby","bb-lang-gate-title"),t.innerHTML=`
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
  `,document.body.appendChild(t);const a=n=>{try{localStorage.setItem(ve,n)}catch{}document.body.classList.remove("bb-lang-gate-open"),t.remove(),e(n)};t.querySelectorAll("[data-lang]").forEach(n=>{n.addEventListener("click",()=>a(n.getAttribute("data-lang")||"ru"))}),requestAnimationFrame(()=>{var n;(n=t.querySelector(".bb-lang-gate__btn"))==null||n.focus()})}async function $t(){const e=document.getElementById("bb-header"),t=document.getElementById("bb-nav");e&&(e.hidden=!0),t&&(t.hidden=!0);const a=document.getElementById("bb-root");if(!a)return;const n=wt();if(!n){a.className="bb-root",a.innerHTML="",Lt(s=>{ge(s).catch(()=>{})});return}await ge(n)}async function ge(e){var F;const t=H(e);document.documentElement.lang=e;const a=document.getElementById("bb-root");if(!a)return;a.className="bb-root bb-root--landing",a.innerHTML=`
    <div class="bb-loading">
      <div class="bb-loading__pulse"></div>
    </div>`;let n={botUrl:"https://t.me/brainboosty?start=site",webappEntryUrl:"https://t.me/brainboosty?start=webapp",channelUrl:"https://t.me/androgenautist",hasAuthorPhoto:!1,hasChannelAvatar:!1,neuralMapHubUrl:"/#hub-login",hubHostDisplay:"neuralmap.brainboosty.app"};try{n={...n,...await Me()}}catch{}const s="/api/webapp/landing/photo",r=t.landingFeatures.map(v=>`<li>${$(v)}</li>`).join(""),i=window.matchMedia("(prefers-reduced-motion: reduce)").matches;a.innerHTML=`
    <div class="bb-landing">
      <header id="top" class="bb-landing-hero">
        <div class="bb-landing-hero__visual-anchor">
          <div class="bb-landing-hero__glow" aria-hidden="true" data-parallax-glow></div>
          <div class="bb-landing-hero__brain-layer" data-parallax-brain>
            <img class="bb-landing-hero__brain" src="${ce}" alt="" width="280" height="280" decoding="async" />
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
            <img class="bb-landing-about__photo" src="${s}" alt="" width="320" height="320" loading="lazy" data-fallback-src="${ce}" />
            <div class="bb-landing-about__ring" aria-hidden="true"></div>
          </div>
          <div class="bb-landing-about__text">
            ${t.landingAboutParagraphs.map(v=>`<p>${$(v)}</p>`).join("")}
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
  `,a.querySelectorAll(".bb-landing-about__photo").forEach(v=>{const h=v.getAttribute("data-fallback-src");h&&v.addEventListener("error",()=>{v.removeAttribute("data-fallback-src"),v.src=h})}),a.querySelectorAll('a[href^="#"]').forEach(v=>{v.addEventListener("click",h=>{var S;const I=(S=v.getAttribute("href"))==null?void 0:S.slice(1);if(!I)return;const N=document.getElementById(I);N&&(h.preventDefault(),N.scrollIntoView({behavior:"smooth",block:"start"}))})});const o=a.querySelector(".bb-landing"),u=yt(o||a,{reducedMotion:i}),l=a.querySelector(".bb-landing-hero"),k=l?ht(l):()=>{};let c=null,b=null;const p="bb_tg_site_login",y="width=440,height=720,left=100,top=80,scrollbars=yes,resizable=yes,toolbar=no,menubar=no,location=no,status=no,directories=no",x=()=>{try{b&&!b.closed&&b.close()}catch{}b=null},d=()=>{c!=null&&(clearInterval(c),c=null)},_=()=>{u(),k(),window.removeEventListener("pagehide",_)};window.addEventListener("pagehide",_);const w=a.querySelectorAll("[data-start-site-login]"),T=a.querySelector(".bb-landing-hub__status"),L=v=>{w.forEach(h=>{h.disabled=v})},E=v=>{if(!T||(T.replaceChildren(),!v))return;const h=document.createElement("p");h.className="bb-landing-hub__status-line",h.textContent=v,T.appendChild(h)},g=(v,h)=>{if(!T)return;T.hidden=!1,T.replaceChildren();const I=document.createElement("p");I.className="bb-landing-hub__status-line",I.textContent=h.landingHubPopupBlocked;const N=document.createElement("button");N.type="button",N.className="bb-landing-hub__manual-popup",N.textContent=h.landingHubTryOpenWindow,N.addEventListener("click",()=>{const S=window.open(v,p,y);S&&(b=S,E(h.landingHubPolling))}),T.appendChild(I),T.appendChild(N)},P=(v,h)=>{d();let I=0,N=!1;const S=async()=>{var D,W;try{const O=await De(v);if(I=0,O.status==="ready"){d(),Y(),x(),localStorage.setItem(K,O.accessToken),localStorage.setItem(ee,JSON.stringify({first_name:((D=O.user)==null?void 0:D.first_name)??"",last_name:((W=O.user)==null?void 0:W.last_name)??"",language_code:O.lang==="en"?"en":"ru"})),window.location.hash="map",window.location.reload();return}(O.status==="expired"||O.status==="not_found")&&(d(),Y(),x(),L(!1),E(h.landingHubExpired))}catch{I+=1,I>=3&&!N&&(N=!0,E(h.landingHubPollNetworkError))}};c=setInterval(S,2e3),S()};w.forEach(v=>{v.addEventListener("click",async()=>{var N;const h=H(e);d(),Y(),(N=document.getElementById("hub-login"))==null||N.scrollIntoView({behavior:"smooth",block:"start"}),L(!0),T&&(T.hidden=!1,E(h.landingHubPrepare)),x(),b=window.open("about:blank",p,y);try{const S=await Fe(),D=S==null?void 0:S.loginToken,W=S==null?void 0:S.telegramLink;if(!D||!W)throw new Error(h.errorLoad);if(xt({loginToken:D,lang:e,startedAt:Date.now()}),b&&!b.closed){try{b.location.href=W}catch{}try{b.focus()}catch{}E(h.landingHubPolling),P(D,h);return}x(),g(W,h),P(D,h),L(!1)}catch(S){d(),Y(),x(),L(!1),T&&(T.hidden=!1,E(Ne(S,h.errorLoad)))}})});const B=vt();B&&B.lang===e&&Date.now()-B.startedAt<_t?((F=document.getElementById("hub-login"))==null||F.scrollIntoView({behavior:"smooth",block:"start"}),L(!0),T&&(T.hidden=!1,E(t.landingHubPolling)),P(B.loginToken,t)):B&&Y()}function Tt(){try{const e=navigator.userAgent||"";if(/Telegram/i.test(e))return!0;const t=`${window.location.hash||""}${window.location.search||""}`;if(/tgWebAppPlatform|tgWebAppData|tgWebAppVersion/i.test(t))return!0}catch{}return!1}function Et(){var e;return(e=window.Telegram)!=null&&e.WebApp?Promise.resolve():new Promise(t=>{const a=document.createElement("script");a.src="https://telegram.org/js/telegram-web-app.js",a.async=!0,a.onload=()=>t(),a.onerror=()=>t(),document.head.appendChild(a)})}function kt(){var a;const e=(a=window.Telegram)==null?void 0:a.WebApp;return e?(e.initData||"").trim().length>0:!1}function St(){var e;try{return((e=localStorage.getItem(K))==null?void 0:e.trim())||""}catch{return""}}function At(){try{const e=localStorage.getItem(ee);return e?JSON.parse(e):null}catch{return null}}async function zt(){var n,s;Tt()&&await Et();const{initData:e,user:t,lang:a}=We();if(kt())le({initData:e,user:t,lang:a,siteToken:""});else{const r=St();if(r){const i=At(),o=(i==null?void 0:i.language_code)==="en"||(s=(n=i==null?void 0:i.language_code)==null?void 0:n.startsWith)!=null&&s.call(n,"en")||a==="en"?"en":"ru";le({initData:"",user:i?{first_name:i.first_name,last_name:i.last_name,language_code:i.language_code}:null,lang:o,siteToken:r})}else $t()}}zt().catch(()=>{});
