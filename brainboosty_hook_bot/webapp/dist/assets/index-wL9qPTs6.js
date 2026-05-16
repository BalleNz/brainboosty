(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))n(r);new MutationObserver(r=>{for(const s of r)if(s.type==="childList")for(const i of s.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&n(i)}).observe(document,{childList:!0,subtree:!0});function a(r){const s={};return r.integrity&&(s.integrity=r.integrity),r.referrerPolicy&&(s.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?s.credentials="include":r.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function n(r){if(r.ep)return;r.ep=!0;const s=a(r);fetch(r.href,s)}})();const Se="/assets/full-glowing-brain-Cl127Rfm.png",Te="/assets/amygdala-DP7dGDc4.png",ke="/assets/lobes-uZqghd8w.png",Ae="/assets/frontal-gyrus-DPq4mhR0.png",ze="/assets/insula-CAJDukm_.png",Ce="/assets/pfc-BE-jJY5g.png",Me="/assets/tpj-Cgg8S5Iu.png",q=["prefrontal_cortex","brain_lobes","insular_cortex","temporoparietal_junction","amygdala","frontal_gyrus"],Ne={prefrontal_cortex:Ce,brain_lobes:ke,insular_cortex:ze,temporoparietal_junction:Me,amygdala:Te,frontal_gyrus:Ae},He=Se;function Pe(e){const t=q.map(n=>Number(e[n]??0)),a=t.reduce((n,r)=>n+r,0);return Math.round(a/Math.max(t.length,1)*10)/10}const O="bb-site-session",U="bb-site-user";function qe(e,t,{jsonBody:a=!1}={}){const n={};a&&(n["Content-Type"]="application/json"),e&&(n["X-Telegram-Init-Data"]=e);const r=(t||"").trim();return r&&(n.Authorization=`Bearer ${r}`),n}async function F(e,{initData:t="",siteToken:a="",method:n="GET",body:r}={}){const s=await fetch(`/api/webapp${e}`,{method:n,headers:qe(t,a,{jsonBody:!!r}),body:r?JSON.stringify(r):void 0,cache:"no-store"});if(!s.ok){const i=new Error(`HTTP ${s.status}`);i.status=s.status;try{i.detail=(await s.json()).detail}catch{}throw i}return s.json()}function be(e){var r,s;const t=e.lang==="en"?"en":"ru",a={};for(const i of q)a[i]=Number(((r=e.scores)==null?void 0:r[i])??0);const n={};for(const i of q){const o=((s=e.regions)==null?void 0:s[i])??{};n[i]={main:Number(o.main??a[i]),bullets:o.bullets??[],submetrics:(o.submetrics??[]).map(c=>({label:c.label??c.label_ru??"",value:Number(c.value??a[i])}))}}return{lang:t,userDisplayName:e.userDisplayName??e.user_display_name??"Guest",paid:!!e.paid,hasMap:!!(e.hasMap??e.has_map??Object.keys(e.scores||{}).length),testVariant:e.testVariant??e.test_variant??"development",tributeUrl:e.tributeUrl??e.tribute_url??"",neuroScore:e.neuroScore!=null?Number(e.neuroScore):Pe(a),scores:a,connectivity:e.connectivity??[],regions:n,snapshotId:e.snapshotId??e.snapshot_id??null,createdAt:e.createdAt??e.created_at??null}}async function Ie(){return F("/landing",{initData:"",siteToken:""})}async function Be(e){const t=await F("/profile",{initData:e.initData??"",siteToken:e.siteToken??""});return be(t)}async function Re(e){return F("/history",{initData:e.initData??"",siteToken:e.siteToken??""})}async function Fe(e,t="development"){return F(`/test/questions?variant=${encodeURIComponent(t)}`,{initData:e.initData??"",siteToken:e.siteToken??""})}async function De(e,{variant:t,answers:a}){const n={variant:t,answers:a},r=await F("/test/submit",{initData:e.initData??"",siteToken:e.siteToken??"",method:"POST",body:n});return be(r.profile)}async function Oe(e,t){return F(`/exercises/${encodeURIComponent(String(t))}`,{initData:e.initData??"",siteToken:e.siteToken??""})}const Ue={landingKicker:"BrainBoosty · neuroscience, no fluff",landingTitle:"Upgrade your brain — see your Neural Map",landingTagline:"7 questions → a personal 6-zone brain map, NeuroScore, and clear next steps. All in Telegram.",landingCta:"Boost my brain",landingCtaSub:"Free start in the bot · 2 minutes",landingNavAbout:"About me",landingNavProject:"The project",landingNavHub:"Neural Map Hub",landingNavCta:"Open bot",landingHubTitle:"Neural Map Hub",landingHubLead:"Your brain map, test, history, and exercises—in the browser, same account as the bot and Mini App.",landingHubHint:"You need a profile after bot onboarding. Tap the button — official Telegram login opens; after you approve, you'll return here automatically.",landingHubStartLogin:"Log in with Telegram",landingHubErrorNotRegistered:"Finish onboarding in the bot (/start) first, then try «Log in with Telegram» again.",landingHubErrorNotConfigured:"Telegram login isn't configured on the server (TELEGRAM_OIDC_CLIENT_ID / SECRET in .env and Allowed URLs in BotFather).",landingHubErrorOidc:"Telegram sign-in failed. Please try again.",landingLoginTelegram:"Log in with Telegram",landingChannelAria:"Telegram channel",landingAboutTitle:"About me",landingAboutParagraphs:["Hi, I'm Damian — creator of BrainBoosty.","I went from anxiety, brain fog, and tension to clarity, inner strength, and confidence. Now I help others with neurobiology, hormones, and cognitive habits.","On my channel I share actionable insights—no marketing noise, only what actually shifts your state."],landingChannelLink:"→ Channel @androgenautist",landingProjectTitle:"What's inside",landingFeatures:["7-question cognitive test — development or sexual profile","Neural Map: 6 brain zones with NeuroScore and recommendations","Progress history and test-to-test comparison","Daily hooks and a private exercise channel"],landingFinalTitle:"Ready to see your map?",landingFinalSub:"Open the bot — onboarding takes a few minutes; your first map is free.",heroBrain:"NEURAL MAP",scoreLabel:"NeuroScore",coverLine:"Six zones · one profile. Numbers, focus, and a clear read—no clutter.",connectivityTitle:"Inter-region links (educational model)",zoneLevel:"Integrated zone level",progressMain:e=>`Your progress ${e}%`,recTitle:"Why this zone is your biggest pleasure lever",footer:"BrainBoosty · educational model · not a medical diagnosis",premiumCta:"Get full access",premiumBadge:"Full access",premiumTitle:"Get full access — today",premiumSub:"A 30-day personal plan, progress tracker, exercises for your profile, and the private channel.",premiumBullets:["Full brain map and all zone recommendations","Progress history with test comparisons","Retests and trend tracking","Private channel and daily hooks"],navMap:"Map",navHistory:"History",navTest:"Test",navPremium:"Access",navLogout:"Log out",appBrandName:"brainboosty",appHeaderTitle:"Neural Map",loading:"Loading your neuro profile…",computing:"Computing your brain map…",errorLoad:"Could not load data. Please try again later.",authError:"Open the app from the Telegram bot.",notRegistered:"Take the test in the bot first!",historyTitle:"Progress history",historySub:"Zone comparison across tests. Arrows show percentage-point change.",historyEmpty:"No saved tests yet. Take your first test to see history here.",startTest:"Take the test",latest:"Latest",openThisMap:"Open map",testTitle:"Cognitive test",testPickVariant:"Choose question style (7 steps):",variantDev:"Development & cognition",variantSex:"Sexual profile",variantSexBadge:"Maximum insight",variantSexHint:"Pleasure, drive, and your neural edge",variantDevHint:"Focus, habits, and cognitive style",questionProgress:(e,t)=>`Question ${e} of ${t}`,regions:{prefrontal_cortex:"Prefrontal cortex",brain_lobes:"Brain lobes · imagery",insular_cortex:"Insular cortex",temporoparietal_junction:"Temporoparietal junction",amygdala:"Amygdala",frontal_gyrus:"Frontal gyrus"},interactiveBrainKicker:"Zone",zoneIllustrationOpenAria:"open zone card",zoneDrawerCloseAria:"Close",zoneCurrentLevel:"Current level",zoneWhyTitle:"Why it matters",zoneBoostCta:"Boost this zone",zoneUnlockNote:"Full access unlocks personal drills per zone, progress tracking, and training history.",zoneOpenHistory:"History for this zone",zoneExercisesHeading:"Zone exercises",zoneExerciseListCap:"In your program for this zone:",zoneExercisePlaceholder:"More protocols are on the way — your full access already includes the base track.",zonePaidHint:"More protocols and metrics tailored to your profile are coming next.",zoneReadMoreDetail:"Full zone breakdown below in the feed",zoneWhy:{prefrontal_cortex:"Planning, impulse control, and focus. A stronger PFC means clearer decisions and fewer spirals.",brain_lobes:"Integrates imagery, language, and space. Balance here improves how you read reality and old patterns.",insular_cortex:"Interoception and emotional regulation — the bridge between body state and action.",temporoparietal_junction:"Perspective, attention, and social context — helps you update stories instead of locking in one view.",amygdala:"Threat and reward signaling. Tuning it reduces false alarms while keeping healthy drive.",frontal_gyrus:"Links effort, intention, and follow-through — trained with sequenced action and repetition."},zoneExercises:{prefrontal_cortex:[{title:"90-second stop frame",body:"Before an impulsive reply, state one value and one tiny next step out loud."}],brain_lobes:[{title:"Sensory anchor",body:"For 30s describe one object: color, texture, sound — no judgments."}],insular_cortex:[{title:"Rib-cage breath",body:"4 cycles: inhale 4 counts, soft pause, exhale 6 — attention on rib expansion.",exerciseId:1}],temporoparietal_junction:[{title:"Perspective swap",body:"Phrase the same situation two neutral ways — without «I'm right» framing."}],amygdala:[{title:"Tolerance window",body:"2 min: note 3 neutral facts around a trigger, then one action 2% softer."}],frontal_gyrus:[{title:"Three-step chain",body:"Write three micro-steps for one goal today; track completion only."}]},exerciseLoading:"Loading protocol…",exerciseNotFound:"Exercise not found.",exerciseBackAria:"Back",exerciseTagForWho:"For who",exerciseTagEfficiency:"Effectiveness",exerciseTagFirstResult:"First results",exerciseDifficulty:"Difficulty",exerciseFirstResultDays:e=>`~${e} days`,exerciseEfficiencyLabels:["Low","Moderate","High","Exceptional","Best for this region"],exerciseAccInstruction:"Instruction",exerciseAccResearch:"Research",exerciseAccAmplify:"How to amplify",exerciseAccResults:"Expected outcomes",exerciseNoResearch:"Links will appear here soon.",exerciseCtaPrimary:"Add to my training plan",exerciseCtaMessage:"Sync with your bot plan is coming soon. For now, block time on your calendar and log completion.",exercisePremiumTitle:"Full access",exercisePremiumText:"Channel exercises are available with BrainBoosty full access.",zoneOpenFullExercise:"Open full exercise"},pe={landingKicker:"BrainBoosty · нейробиология без воды",landingTitle:"Прокачай мозг — увидь свою Neural Map",landingTagline:"7 вопросов → персональная карта из 6 зон мозга, NeuroScore и понятные шаги. Всё в Telegram.",landingCta:"Прокачать мозг",landingCtaSub:"Бесплатный старт в боте · 2 минуты",landingNavAbout:"Обо мне",landingNavProject:"Проект",landingNavHub:"Neural Map Hub",landingNavCta:"В бота",landingHubTitle:"Neural Map Hub",landingHubLead:"Карта мозга, тест, история и упражнения — в браузере, тот же аккаунт, что в боте и мини-приложении.",landingHubHint:"Нужен аккаунт после анкеты в боте. Нажми кнопку — откроется официальный вход Telegram (Log in with Telegram), после подтверждения вернёшься сюда автоматически.",landingHubStartLogin:"Войти через Telegram",landingHubErrorNotRegistered:"Сначала пройди анкету в боте (/start), затем снова нажми «Войти через Telegram».",landingHubErrorNotConfigured:"Вход через Telegram не настроен на сервере (TELEGRAM_OIDC_CLIENT_ID / SECRET в .env и Allowed URLs в BotFather).",landingHubErrorOidc:"Не удалось войти через Telegram. Попробуй ещё раз.",landingLoginTelegram:"Войти через Telegram",landingChannelAria:"Канал в Telegram",landingAboutTitle:"Обо мне",landingAboutParagraphs:["Привет, я Дамиан — автор BrainBoosty.","Сам прошёл путь от тревожности, тумана в голове и зажатости — к ясности, внутренней силе и уверенности. Сейчас помогаю другим по нейробиологии, гормонам и когнитивным привычкам.","В канале делюсь рабочими инсайтами без маркетинговой шелухи — только то, что реально меняет состояние."],landingChannelLink:"→ Канал @androgenautist",landingProjectTitle:"Что внутри",landingFeatures:["Когнитивный тест из 7 вопросов — два стиля (развитие / сексуальный профиль)","Neural Map: 6 зон мозга с NeuroScore и рекомендациями","История прогресса и сравнение между тестами","Ежедневные хуки и закрытый канал с упражнениями"],landingFinalTitle:"Готов увидеть свою карту?",landingFinalSub:"Открой бота — анкета займёт пару минут, первая карта бесплатно.",heroBrain:"NEURAL MAP",scoreLabel:"NeuroScore",coverLine:"Шесть зон · один профиль. Цифры, акценты и ясная картина без лишнего шума.",connectivityTitle:"Связность зон (образовательная модель)",zoneLevel:"Интегральный уровень зоны",progressMain:e=>`Твой прогресс ${e}%`,recTitle:"Почему эта зона — твой главный рычаг удовольствия",footer:"BrainBoosty · образовательная модель · не медицинский диагноз",premiumCta:"Забрать полный доступ",premiumBadge:"Полный доступ",premiumTitle:"Забери полный доступ — сегодня",premiumSub:"Персональный план на 30 дней, трекер прогресса, упражнения под твой профиль и закрытый канал.",premiumBullets:["Полная карта мозга и все рекомендации по зонам","История прогресса с сравнением тестов","Повторные тесты и отслеживание динамики","Закрытый канал и ежедневные хуки"],navMap:"Карта",navHistory:"История",navTest:"Тест",navPremium:"Доступ",navLogout:"Выйти",appBrandName:"brainboosty",appHeaderTitle:"Neural Map",loading:"Загружаем нейропрофиль…",computing:"Считаем твою карту мозга…",errorLoad:"Не удалось загрузить данные. Попробуйте позже.",authError:"Откройте приложение из Telegram-бота.",notRegistered:"Пройди тест в боте!",historyTitle:"История прогресса",historySub:"Сравнение зон между прохождениями. Стрелки — изменение в процентных пунктах.",historyEmpty:"Пока нет сохранённых тестов. Пройдите первый тест — и здесь появится история.",startTest:"Пройти тест",latest:"Актуально",openThisMap:"Открыть карту",testTitle:"Когнитивный тест",testPickVariant:"Выберите стиль вопросов (7 шагов):",variantDev:"Развитие и когниция",variantSex:"Сексуальный профиль",variantSexBadge:"Максимум инсайта",variantSexHint:"Удовольствие, драйв и нейронный рельеф",variantDevHint:"Фокус, привычки и когнитивный стиль",questionProgress:(e,t)=>`Вопрос ${e} из ${t}`,regions:{prefrontal_cortex:"Префронтальная кора",brain_lobes:"Доли мозга · образы",insular_cortex:"Островковая кора",temporoparietal_junction:"Височно-теменной узел",amygdala:"Амигдала",frontal_gyrus:"Лобная извилина"},interactiveBrainKicker:"Зона",zoneIllustrationOpenAria:"открыть карточку зоны",zoneDrawerCloseAria:"Закрыть",zoneCurrentLevel:"Текущий уровень",zoneWhyTitle:"Почему это важно",zoneBoostCta:"Прокачать эту зону",zoneUnlockNote:"Полный доступ открывает персональные упражнения под каждую зону, трекер и историю прокачки.",zoneOpenHistory:"История этой зоны",zoneExercisesHeading:"Упражнения для зоны",zoneExerciseListCap:"Сейчас в программе для этой зоны:",zoneExercisePlaceholder:"Скоро добавим ещё шаги — уже доступен базовый протокол в полном доступе.",zonePaidHint:"Дальше — больше протоколов и метрик именно под твой профиль.",zoneReadMoreDetail:"Подробный разбор зоны в ленте ниже",zoneWhy:{prefrontal_cortex:"Планирование, торможение импульсов и фокус. Сильная ПФК — ясные решения, меньше хаоса и откатов.",brain_lobes:"Интеграция образов, языка и пространства. Баланс здесь — лучшее восприятие реальности и выученные паттерны.",insular_cortex:"Телесная осознанность и эмоциональная регуляция. Островок связывает «что чувствую» с «что делаю».",temporoparietal_junction:"Перспектива, внимание и социальный контекст. TPJ помогает не застревать в одной интерпретации событий.",amygdala:"Детектор угроз и сигналов награды. Настрой амигдалы — меньше ложной тревоги, больше спокойного драйва.",frontal_gyrus:"Связь моторики, намерения и усилия. Тренируется через последовательные действия и повторение цели."},zoneExercises:{prefrontal_cortex:[{title:"90 секунд «стоп-рамка»",body:"Перед импульсивным ответом назови вслух одну ценность и одно следующее маленькое действие."}],brain_lobes:[{title:"Сенсорный якорь",body:"30 секунд описывай предмет из комнаты: цвет, фактура, звук — без оценок."}],insular_cortex:[{title:"Дыхание в ребро",body:"4 цикла: вдох 4 счёта, мягкая пауза, выдох 6 — внимание на расширении рёбер.",exerciseId:1}],temporoparietal_junction:[{title:"Смена ракурса",body:"Сформулируй ту же ситуацию двумя нейтральными формулировками, без «я прав»."}],amygdala:[{title:"Окно толерантности",body:"2 минуты: найди 3 нейтральных факта вокруг триггера, затем одно действие на 2% мягче."}],frontal_gyrus:[{title:"Цепочка на 3 шага",body:"Запиши три микрошага к одной цели на сегодня; отмечай только факт выполнения."}]},exerciseLoading:"Загружаем протокол…",exerciseNotFound:"Упражнение не найдено.",exerciseBackAria:"Назад",exerciseTagForWho:"Для кого",exerciseTagEfficiency:"Эффективность",exerciseTagFirstResult:"Первый результат",exerciseDifficulty:"Сложность",exerciseFirstResultDays:e=>`ориентир ≈ ${e} дн.`,exerciseEfficiencyLabels:["Низкая","Средняя","Высокая","Чрезвычайная","Оптимально для отдела"],exerciseAccInstruction:"Инструкция",exerciseAccResearch:"Исследования",exerciseAccAmplify:"Как усилить эффект",exerciseAccResults:"Ожидаемые результаты",exerciseNoResearch:"Ссылки будут добавлены.",exerciseCtaPrimary:"Добавить в мой план прокачки",exerciseCtaMessage:"Скоро здесь будет синхронизация с твоим планом в боте. Пока закрепи время в календаре и отметь выполнение в заметках.",exercisePremiumTitle:"Полный доступ",exercisePremiumText:"Экран упражнений из закрытого канала доступен с подпиской BrainBoosty.",zoneOpenFullExercise:"Полный экран упражнения"},je={ru:pe,en:Ue};function N(e){return je[e==="en"?"en":"ru"]??pe}const Q=new Set,T={map:"map",test:"test",history:"history",access:"access",exercise:"exercise"},We=new Set(["api","health","webapp","tribute","fonts","assets","auth"]);function Ge(e){const t=(e||"/").replace(/\/+/g,"/");return t.length>1&&t.endsWith("/")?t.slice(0,-1):t||"/"}function X(){return Ge(window.location.pathname)}function K(){return new URLSearchParams(window.location.search)}function ge(e){return e==="premium"?T.access:e||T.map}function V(e,t=new URLSearchParams){const a=ge(e),n=new URLSearchParams(t);if(a===T.exercise){const i=parseInt(n.get("id")||"0",10);n.delete("id");const o=n.toString();return`/exercise/${i}${o?`?${o}`:""}`}if(a===T.map){const i=n.toString();return i?`/?${i}`:"/"}const r=n.toString(),s=`/${a}`;return r?`${s}?${r}`:s}function Ve(e){const t=e.match(/^\/exercise\/(\d+)\/?$/);if(!t)return null;const a=K();return a.set("id",t[1]),{name:T.exercise,params:a}}function ee(){const e=X(),t=Ve(e);if(t)return t;const a=K();return e==="/test"?{name:T.test,params:a}:e==="/history"?{name:T.history,params:a}:e==="/access"||e==="/premium"?{name:T.access,params:a}:e==="/"?{name:T.map,params:a}:{name:T.map,params:a}}function R(){const e=ee();for(const t of Q)t(e)}function M(e,t={}){const a=t instanceof URLSearchParams?new URLSearchParams(t):new URLSearchParams(t),n=V(e,a);`${X()}${window.location.search}`!==n&&history.pushState(null,"",n),R()}function Ye(e,t={}){const a=t instanceof URLSearchParams?new URLSearchParams(t):new URLSearchParams(t);history.replaceState(null,"",V(e,a)),R()}function Je(e){return Q.add(e),()=>Q.delete(e)}window.addEventListener("popstate",()=>R());function Xe(){R()}function Ze(){const e=window.location.hash.replace(/^#/,"").trim();if(e){const[t,a]=e.split("?"),n=new URLSearchParams(a||""),r=ge(t);if(r==="auth"||t.startsWith("auth/"))return!1;if(t==="hub-login"){const s=n.toString();return history.replaceState(null,"",s?`/hub-login?${s}`:"/hub-login"),window.location.hash="",!1}if([T.map,T.test,T.history,T.access,T.exercise,"premium"].includes(t))return history.replaceState(null,"",V(r,n)),window.location.hash="",R(),!1}return X()==="/premium"&&(history.replaceState(null,"",V(T.access,K())),R()),!1}function Qe(){const e=X();return e==="/"||e==="/hub-login"||e.startsWith("/api")||We.has(e.split("/")[1])?!1:/^\/(test|history|access|premium|exercise\/\d+)\/?$/.test(e)}function Ke(){var n,r,s;const e=(n=window.Telegram)==null?void 0:n.WebApp;if(!e)return{tg:null,initData:"",user:null,lang:"ru"};e.ready(),e.expand(),e.enableClosingConfirmation(),e.disableVerticalSwipes&&e.disableVerticalSwipes(),te(),e.onEvent("themeChanged",te);const t=((r=e.initDataUnsafe)==null?void 0:r.user)??null,a=(t==null?void 0:t.language_code)==="en"||(s=t==null?void 0:t.language_code)!=null&&s.startsWith("en")?"en":"ru";return e.setHeaderColor&&e.setHeaderColor("#010108"),e.setBackgroundColor&&e.setBackgroundColor("#010108"),{tg:e,initData:e.initData||"",user:t,lang:a}}function te(){const e=document.documentElement;e.style.setProperty("--bb-tg-bg","#010108"),e.style.setProperty("--bb-tg-text","#f1f5f9")}function Y(e){var a;const t=(a=window.Telegram)==null?void 0:a.WebApp;if(t!=null&&t.openTelegramLink&&e.includes("t.me/")){t.openTelegramLink(e);return}if(t!=null&&t.openLink){t.openLink(e);return}window.open(e,"_blank","noopener,noreferrer")}function k(){var e,t,a,n;(n=(a=(t=(e=window.Telegram)==null?void 0:e.WebApp)==null?void 0:t.HapticFeedback)==null?void 0:a.impactOccurred)==null||n.call(a,"light")}function S(e){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}function et(){return`
    <div class="bb-zone-drawer__bar-track">
      <div class="bb-zone-drawer__bar-fill" style="width: 0%"></div>
    </div>`}function tt(e,t,a={}){var u,v,w,x,m,$;const n=N(e.lang),r=n.regions[t]??t,s=((u=n.zoneWhy)==null?void 0:u[t])??"",i=Number(((v=e.scores)==null?void 0:v[t])??0).toFixed(1),o=((w=n.zoneExercises)==null?void 0:w[t])??[],c=o.length>0?o.map(b=>`
                  <li class="bb-zone-drawer__exercise">
                    <p class="bb-zone-drawer__exercise-title">${S(b.title)}</p>
                    <p class="bb-zone-drawer__exercise-body">${S(b.body)}</p>
                    ${b.exerciseId!=null?`<button type="button" class="bb-zone-drawer__ex-open" data-open-exercise="${Number(b.exerciseId)}">${S(n.zoneOpenFullExercise)}</button>`:""}
                  </li>`).join(""):`<li class="bb-zone-drawer__exercise"><p class="bb-zone-drawer__exercise-body">${S(n.zoneExercisePlaceholder)}</p></li>`,l=document.createElement("div");l.className="bb-zone-drawer-host",l.innerHTML=`
    <div class="bb-zone-drawer-backdrop" data-close="1" aria-hidden="true"></div>
    <aside class="bb-zone-drawer glass" role="dialog" aria-modal="true" aria-labelledby="bb-zone-drawer-title">
      <header class="bb-zone-drawer__header">
        <div>
          <p class="bb-zone-drawer__eyebrow">${S(n.interactiveBrainKicker)}</p>
          <h2 id="bb-zone-drawer-title" class="bb-zone-drawer__title">${S(r)}</h2>
        </div>
        <button type="button" class="bb-zone-drawer__close" data-close="1" aria-label="${S(n.zoneDrawerCloseAria)}">
          <span aria-hidden="true">×</span>
        </button>
      </header>
      <div class="bb-zone-drawer__body">
        <div class="bb-zone-drawer__meter">
          <div class="bb-zone-drawer__meter-row">
            <span class="bb-zone-drawer__meter-label">${S(n.zoneCurrentLevel)}</span>
            <span class="bb-zone-drawer__meter-value">${S(i)}%</span>
          </div>
          ${et()}
        </div>
        <div class="bb-zone-drawer__why">
          <p class="bb-zone-drawer__why-title">${S(n.zoneWhyTitle)}</p>
          <p class="bb-zone-drawer__why-text">${S(s)}</p>
        </div>
        <div class="bb-zone-drawer__actions" data-paid-block="${e.paid?"1":"0"}">
          ${e.paid?`
            <div class="bb-zone-drawer__paid-menu">
              <button type="button" class="bb-zone-drawer__btn bb-zone-drawer__btn--ghost" data-go="history">
                ${S(n.zoneOpenHistory)}
              </button>
              <button type="button" class="bb-zone-drawer__btn bb-zone-drawer__btn--ghost" data-toggle="exercises">
                ${S(n.zoneExercisesHeading)}
              </button>
            </div>
            <div class="bb-zone-drawer__exercises" data-exercises hidden>
              <p class="bb-zone-drawer__exercises-cap">${S(n.zoneExerciseListCap)}</p>
              <ul class="bb-zone-drawer__exercise-list">
                ${c}
              </ul>
            </div>
            <p class="bb-zone-drawer__paid-hint">${S(n.zonePaidHint)}</p>
            <button type="button" class="bb-zone-drawer__btn bb-zone-drawer__btn--ghost bb-zone-drawer__btn--compact" data-scroll-zone="${t}">
              ${S(n.zoneReadMoreDetail)}
            </button>`:`
            <p class="bb-zone-drawer__lock-note">${S(n.zoneUnlockNote)}</p>
            <button type="button" class="bb-zone-drawer__btn bb-zone-drawer__btn--primary" data-go="boost">
              ${S(n.zoneBoostCta)}
            </button>
            <button type="button" class="bb-zone-drawer__btn bb-zone-drawer__btn--ghost bb-zone-drawer__btn--compact" data-scroll-zone="${t}">
              ${S(n.zoneReadMoreDetail)}
            </button>`}
        </div>
      </div>
    </aside>
  `,document.body.appendChild(l),document.body.classList.add("bb-zone-drawer-open");const y=l.querySelector(".bb-zone-drawer"),d=l.querySelector("[data-exercises]"),f=l.querySelector(".bb-zone-drawer-backdrop"),p=l.querySelector(".bb-zone-drawer__bar-fill"),h=()=>{var b;document.removeEventListener("keydown",E),document.body.classList.remove("bb-zone-drawer-open"),l.remove(),(b=a.onClose)==null||b.call(a)},E=b=>{b.key==="Escape"&&h()};return document.addEventListener("keydown",E),l.querySelectorAll("[data-close]").forEach(b=>{b.addEventListener("click",()=>{k(),h()})}),(x=l.querySelector('[data-go="boost"]'))==null||x.addEventListener("click",()=>{k(),e.tributeUrl?Y(e.tributeUrl):M("premium"),h()}),(m=l.querySelector('[data-go="history"]'))==null||m.addEventListener("click",()=>{k(),M("history",{zone:t}),h()}),($=l.querySelector('[data-toggle="exercises"]'))==null||$.addEventListener("click",()=>{if(k(),!d)return;d.hasAttribute("hidden")?d.removeAttribute("hidden"):d.setAttribute("hidden","")}),l.querySelectorAll("[data-scroll-zone]").forEach(b=>{b.addEventListener("click",()=>{k();const C=b.getAttribute("data-scroll-zone")||t;h(),requestAnimationFrame(()=>{var H;(H=document.getElementById(`zone-${C}`))==null||H.scrollIntoView({behavior:"smooth",block:"start"})})})}),l.querySelectorAll("[data-open-exercise]").forEach(b=>{b.addEventListener("click",()=>{k();const C=b.getAttribute("data-open-exercise")||"1";h(),M("exercise",{id:C})})}),requestAnimationFrame(()=>{if(y==null||y.classList.add("is-open"),f==null||f.classList.add("is-open"),p){const b=Math.max(0,Math.min(100,Number(i)||0));p.style.width="0%",requestAnimationFrame(()=>{p.style.width=`${b.toFixed(1)}%`})}}),{close:()=>{h()}}}function P(e){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}function nt(e,{displayName:t,neuroScore:a,connectivity:n}){const r=(n==null?void 0:n.length)>0?`
    <div class="bb-connectivity glass rounded-2xl p-4 mt-5">
      <p class="bb-connectivity__title">${P(e.connectivityTitle)}</p>
      ${n.map(s=>`<p>• ${P(s)}</p>`).join(`
      `)}
    </div>`:"";return`
<section class="bb-section bb-cover" data-section="cover">
  <img src="${He}" alt="" class="cover-full-brain-hero mb-4" width="360" height="260" decoding="async" />
  <div class="glass rounded-3xl p-6 sm:p-8 cover-neon-card border border-cyan-500/20">
    <p class="text-center text-sm uppercase tracking-[0.35em] text-cyan-200 mt-1 font-semibold drop-shadow-[0_0_16px_rgba(34,211,238,0.55)] bb-cover__kicker">
      ${P(e.heroBrain)}
    </p>
    <h1 class="text-center text-2xl sm:text-3xl font-bold mt-5 text-white drop-shadow-[0_0_20px_rgba(167,139,250,0.25)] neon-zone-title">
      ${P(t)}
    </h1>
    <p class="text-center text-slate-300/95 mt-3 text-[15px] leading-relaxed max-w-md mx-auto tracking-wide px-2">
      ${P(e.coverLine)}
    </p>
    <div class="mt-8 flex flex-col items-center justify-center">
      <p class="bb-cover__score-label text-cyan-100/90 text-sm mb-2 font-medium tracking-wide drop-shadow-[0_0_10px_rgba(34,211,238,0.35)]">
        ${P(e.scoreLabel)}
      </p>
      <div class="text-6xl sm:text-7xl font-black bg-gradient-to-r from-cyan-200 via-violet-300 to-fuchsia-300 bg-clip-text text-transparent neon-score-cover" data-neuro-score>
        ${Number(a).toFixed(1)}
      </div>
    </div>
    ${r}
  </div>
  <p class="text-center text-[11px] text-slate-500 mt-6">${P(e.footer)}</p>
</section>`}function ne({label:e,value:t,glow:a=!1}){const n=Math.max(0,Math.min(100,Number(t)||0)),r=Math.max(0,100-n),s=a?"pdf-bar-gradient pdf-bar-gradient--main":"pdf-bar-gradient pdf-bar-gradient--sub",i=at(e);return[`<div class="mb-3.5" data-bar-value="${n}">`,'<div class="flex justify-between text-xs text-slate-400 mb-1">',`<span>${i}</span>`,`<span class="text-cyan-100 font-bold tracking-wide">${n.toFixed(1)}%</span>`,"</div>",'<div class="pdf-bar-track">',`<div class="${s}" style="clip-path: inset(0 ${r.toFixed(2)}% 0 0);"></div>`,"</div>","</div>"].join(`
  `)}function at(e){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}function B(e){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}function rt(e,t,a){const n=e.regions[t]??t,r=Ne[t],s=Number(a.main??0),i=e.progressMain(`${s.toFixed(1)}`),o=[ne({label:e.zoneLevel,value:s,glow:!0}),...(a.submetrics??[]).map(l=>ne({label:l.label,value:l.value,glow:!1}))].join(`
`),c=(a.bullets??[]).map(l=>`<li>${B(l)}</li>`).join(`
        `);return`
<section class="bb-section bb-region" data-section="region" data-region="${t}" id="zone-${t}">
  <button type="button" class="bb-region__illu-hit" data-open-zone="${t}" aria-label="${B(n)} — ${B(e.zoneIllustrationOpenAria)}">
    <img src="${r}" alt="" class="brain-float-top bb-region__illu" width="320" height="220" loading="lazy" decoding="async" />
  </button>
  <h2 class="bb-region__title neon-zone-title px-2">${B(n)}</h2>
  <p class="bb-region__progress-label">${B(i)}</p>
  <div class="glass rounded-2xl p-4 max-w-xl mx-auto w-full">
    ${o}
  </div>
  <div class="glass rounded-2xl p-4 mt-4 max-w-xl mx-auto w-full">
    <p class="bb-rec-title">${B(e.recTitle)}</p>
    <ul class="bb-rec-list">
        ${c}
    </ul>
  </div>
</section>`}function st(e,t,a){const n=N(t.lang),r=t.userDisplayName||(t.lang==="en"?"Guest":"Гость"),s=[nt(n,{displayName:r,neuroScore:t.neuroScore,connectivity:t.connectivity}),...q.map(i=>{var o,c;return rt(n,i,{main:t.scores[i],bullets:((o=t.regions[i])==null?void 0:o.bullets)??[],submetrics:((c=t.regions[i])==null?void 0:c.submetrics)??[]})})];e.innerHTML=s.join(`
`),ot(e),lt(e),ct(e),it(e,t,a)}function it(e,t,a){var o,c;const n=e.querySelectorAll("[data-open-zone]");if(!n.length)return;const r=l=>{e.querySelectorAll(".bb-region").forEach(y=>{const d=y.dataset.region;y.classList.toggle("is-zone-hot",!!l&&d===l)})},s=l=>{!l||!q.includes(l)||(r(l),tt(t,l,{onClose:()=>r(null)}))};n.forEach(l=>{l.addEventListener("pointerenter",()=>r(l.getAttribute("data-open-zone")||"")),l.addEventListener("pointerleave",y=>{const d=y.relatedTarget;d instanceof Node&&e.contains(d)&&d.closest("[data-open-zone]")||r(null)}),l.addEventListener("click",y=>{y.preventDefault();const d=l.getAttribute("data-open-zone");d&&(k(),s(d))})});const i=(c=(o=a==null?void 0:a.params)==null?void 0:o.get)==null?void 0:c.call(o,"zone");i&&q.includes(i)&&requestAnimationFrame(()=>s(i))}function ot(e){const t=e.querySelectorAll(".bb-section"),a=new IntersectionObserver(n=>{for(const r of n)r.isIntersecting&&(r.target.classList.add("is-visible"),a.unobserve(r.target))},{root:null,rootMargin:"0px 0px -8% 0px",threshold:.08});t.forEach(n=>a.observe(n))}function lt(e){const t=e.querySelector("[data-neuro-score]");if(!t)return;const a=parseFloat(t.textContent||"0"),n=1200,r=performance.now(),s=i=>{const o=Math.min(1,(i-r)/n),c=1-(1-o)**3;t.textContent=(a*c).toFixed(1),o<1&&requestAnimationFrame(s)};requestAnimationFrame(s)}function ct(e){const t=e.querySelectorAll("[data-bar-value]"),a=new IntersectionObserver(n=>{for(const r of n){if(!r.isIntersecting)continue;const s=r.target,i=parseFloat(s.getAttribute("data-bar-value")||"0"),o=s.querySelector(".pdf-bar-gradient");o&&(o.style.clipPath="inset(0 100% 0 0)",requestAnimationFrame(()=>{o.style.clipPath=`inset(0 ${Math.max(0,100-i).toFixed(2)}% 0 0)`})),a.unobserve(s)}},{threshold:.2});t.forEach(n=>a.observe(n))}function g(e){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}function dt(){return{instruction:'<svg class="ex-ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.25" aria-hidden="true"><path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01"/></svg>',research:'<svg class="ex-ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.25" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3M11 8v6M8 11h6"/></svg>',amplify:'<svg class="ex-ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.25" aria-hidden="true"><path d="M12 3l1.8 5.5h5.7l-4.6 3.4 1.8 5.5-4.7-3.4-4.7 3.4 1.8-5.5-4.6-3.4h5.7L12 3z"/></svg>',results:'<svg class="ex-ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.25" aria-hidden="true"><path d="M4 19V5M9 19v-6M14 19V9M19 19v-9"/><path d="M4 19h16" stroke-linecap="round"/></svg>'}}function Z(e){return String(e||"").split(`
`).map(a=>`<p>${g(a)}</p>`).join("")}function ut(e){e.querySelectorAll(".ex-acc").forEach(t=>{const a=t.querySelector(".ex-acc__trigger");a&&a.addEventListener("click",()=>{const r=!(t.getAttribute("data-open")==="true");t.setAttribute("data-open",String(r)),a.setAttribute("aria-expanded",String(r)),k()})})}function j(e){requestAnimationFrame(()=>{var t;(t=e.querySelector(".ex-lux"))==null||t.classList.add("is-visible")})}async function bt(e,t,a,n){var h,E;const r=N(a.lang),s=dt();e.className="bb-root bb-root--spa bb-root--exercise",e.innerHTML=`
    <div class="ex-lux">
      <div class="ex-lux__grid-bg" aria-hidden="true"></div>
      <header class="ex-lux__top">
        <button type="button" class="ex-lux__back" id="ex-back" aria-label="${g(r.exerciseBackAria)}">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M15 6l-6 6 6 6"/></svg>
        </button>
      </header>
      <div class="ex-lux__scroll">
        <div class="ex-lux__inner">
          <div class="ex-lux__loading">
            <div class="ex-lux__pulse"></div>
            <p>${g(r.exerciseLoading)}</p>
          </div>
        </div>
      </div>
      <div class="ex-lux__cta-bar">
        <button type="button" class="ex-lux__cta" id="ex-cta">${g(r.exerciseCtaPrimary)}</button>
      </div>
    </div>`;const i=e.querySelector("#ex-back");if(i==null||i.addEventListener("click",()=>{k(),M("map")}),!Number.isFinite(n)||n<1){const u=e.querySelector(".ex-lux__scroll .ex-lux__inner");u&&(u.innerHTML=`<p class="ex-lux__err">${g(r.exerciseNotFound)}</p>`),j(e);return}if(!a.paid){e.querySelector(".ex-lux__scroll .ex-lux__inner").innerHTML=`
      <div class="ex-lux__hero">
        <p class="ex-lux__lock-title">${g(r.exercisePremiumTitle)}</p>
        <p class="ex-lux__lock-text">${g(r.exercisePremiumText)}</p>
        <button type="button" class="ex-lux__cta ex-lux__cta--inline" id="ex-unlock">${g(r.premiumCta)}</button>
      </div>`,(h=e.querySelector("#ex-unlock"))==null||h.addEventListener("click",()=>{k(),a.tributeUrl?Y(a.tributeUrl):M("premium")}),e.querySelector("#ex-cta").textContent=r.premiumCta,(E=e.querySelector("#ex-cta"))==null||E.addEventListener("click",()=>{k(),a.tributeUrl?Y(a.tributeUrl):M("premium")}),j(e);return}let o;try{o=await Oe(t,n)}catch(u){const v=e.querySelector(".ex-lux__scroll .ex-lux__inner"),w=(u==null?void 0:u.status)===403?r.exercisePremiumTitle:(u==null?void 0:u.status)===404?r.exerciseNotFound:r.errorLoad;v&&(v.innerHTML=`<p class="ex-lux__err">${g(w)}</p>`),j(e);return}const c=Math.max(0,Math.min(4,(o.effectiveness||3)-1)),l=r.exerciseEfficiencyLabels[c]??"—",y=(o.regions||[]).map(u=>`<span class="ex-lux__pill">${g(r.regions[u]??u)}</span>`).join(""),d=(o.researchLinks||[]).map(u=>`<a class="ex-lux__link" href="${g(u.url)}" target="_blank" rel="noopener noreferrer">${g(u.label||u.url)}</a>`).join(""),f=o.instructionImageUrl?`<figure class="ex-lux__figure"><img src="${g(o.instructionImageUrl)}" alt="" loading="lazy" decoding="async" /></figure>`:"";e.querySelector(".ex-lux__scroll .ex-lux__inner").innerHTML=`
    <div class="ex-lux__hero">
      <div class="ex-lux__emoji" aria-hidden="true">${g(o.emoji||"◆")}</div>
      <h1 class="ex-lux__title">${g(o.title)}</h1>
      <p class="ex-lux__lede">${g(o.shortDescription)}</p>
      <div class="ex-lux__tags">
        <span class="ex-lux__tag"><span class="ex-lux__tag-k">${g(r.exerciseTagForWho)}</span>${g(o.forWho)}</span>
        <span class="ex-lux__tag"><span class="ex-lux__tag-k">${g(r.exerciseTagEfficiency)}</span>${g(l)}</span>
        <span class="ex-lux__tag"><span class="ex-lux__tag-k">${g(r.exerciseTagFirstResult)}</span>${g(r.exerciseFirstResultDays(o.firstResultDays))}</span>
      </div>
      <div class="ex-lux__meta-row">
        <div class="ex-lux__diff">
          <span class="ex-lux__diff-label">${g(r.exerciseDifficulty)}</span>
          <div class="ex-lux__diff-track"><span class="ex-lux__diff-fill" style="width: ${Number(o.difficulty||0)}%"></span></div>
          <span class="ex-lux__diff-num">${g(Number(o.difficulty||0))}</span>
        </div>
      </div>
      <div class="ex-lux__pills">${y}</div>
      ${f}
    </div>

    <div class="ex-lux__accords">
      <div class="ex-acc" data-open="true">
        <button type="button" class="ex-acc__trigger" aria-expanded="true">
          <span class="ex-acc__ic">${s.instruction}</span>
          <span class="ex-acc__label">${g(r.exerciseAccInstruction)}</span>
          <span class="ex-acc__chev" aria-hidden="true"></span>
        </button>
        <div class="ex-acc__panel">
          <div class="ex-acc__panel-inner ex-lux__prose">${Z(o.instruction)}</div>
        </div>
      </div>
      <div class="ex-acc" data-open="false">
        <button type="button" class="ex-acc__trigger" aria-expanded="false">
          <span class="ex-acc__ic">${s.research}</span>
          <span class="ex-acc__label">${g(r.exerciseAccResearch)}</span>
          <span class="ex-acc__chev" aria-hidden="true"></span>
        </button>
        <div class="ex-acc__panel">
          <div class="ex-acc__panel-inner ex-lux__prose ex-lux__links">${d||`<p>${g(r.exerciseNoResearch)}</p>`}</div>
        </div>
      </div>
      <div class="ex-acc" data-open="false">
        <button type="button" class="ex-acc__trigger" aria-expanded="false">
          <span class="ex-acc__ic">${s.amplify}</span>
          <span class="ex-acc__label">${g(r.exerciseAccAmplify)}</span>
          <span class="ex-acc__chev" aria-hidden="true"></span>
        </button>
        <div class="ex-acc__panel">
          <div class="ex-acc__panel-inner ex-lux__prose">${Z(o.amplify)}</div>
        </div>
      </div>
      <div class="ex-acc" data-open="false">
        <button type="button" class="ex-acc__trigger" aria-expanded="false">
          <span class="ex-acc__ic">${s.results}</span>
          <span class="ex-acc__label">${g(r.exerciseAccResults)}</span>
          <span class="ex-acc__chev" aria-hidden="true"></span>
        </button>
        <div class="ex-acc__panel">
          <div class="ex-acc__panel-inner ex-lux__prose">${Z(o.expectedResults)}</div>
        </div>
      </div>
    </div>
    <div class="ex-lux__scroll-pad"></div>`,ut(e);const p=e.querySelector("#ex-cta");p==null||p.addEventListener("click",()=>{var u,v,w;k(),(w=(v=(u=window.Telegram)==null?void 0:u.WebApp)==null?void 0:v.showAlert)==null||w.call(v,r.exerciseCtaMessage)}),j(e)}function W(e){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}function pt(e,t){if(!e)return"—";try{return new Date(e).toLocaleString(t==="en"?"en-GB":"ru-RU",{day:"2-digit",month:"short",year:"numeric",hour:"2-digit",minute:"2-digit"})}catch{return e}}async function gt(e,t,a){var l,y;const n=N(a.lang),r=ee().params.get("zone"),s=document.createElement("section");s.className="bb-section is-visible bb-history",s.innerHTML=`
    <h2 class="bb-page-title bb-page-title--premium neon-zone-title">${W(n.historyTitle)}</h2>
    <p class="bb-page-sub text-slate-300/90 text-sm mb-4">${W(n.historySub)}</p>
  `;const i=document.createElement("div");i.className="space-y-3",i.textContent=n.loading,s.appendChild(i),e.replaceChildren(s);let o;try{o=await Re(t)}catch{i.innerHTML=`<p class="bb-error">${W(n.errorLoad)}</p>`;return}const c=o.items??[];if(i.replaceChildren(),!c.length){const d=document.createElement("div");d.className="glass rounded-2xl p-5 text-center";const f=document.createElement("p");f.className="text-slate-200 mb-4",f.textContent=n.historyEmpty;const p=document.createElement("button");p.type="button",p.className="bb-btn-primary",p.textContent=n.startTest,p.addEventListener("click",()=>M("test")),d.append(f,p),i.appendChild(d);return}for(const[d,f]of c.entries()){const p=document.createElement("article");p.className=`glass rounded-2xl p-4 bb-history-card${d===0?" is-active":""}`;const h=document.createElement("div");h.className="flex justify-between items-start gap-2 mb-2";const E=document.createElement("div");if(E.innerHTML=`
      <p class="text-xs text-cyan-200/80 uppercase tracking-wide">${W(pt(f.createdAt,a.lang))}</p>
      <p class="text-lg font-bold text-white mt-1 bb-type-display">NeuroScore <span class="text-cyan-200">${Number(f.neuroScore).toFixed(1)}</span></p>
    `,h.appendChild(E),d===0){const w=document.createElement("span");w.className="bb-badge",w.textContent=n.latest,h.appendChild(w)}p.appendChild(h);const u=document.createElement("div");u.className="bb-history-deltas";for(const w of q){const x=n.regions[w]??w,m=Number(((l=f.scores)==null?void 0:l[w])??0).toFixed(1),$=f.isFirst?"—":((y=f.deltas)==null?void 0:y[w])??"·",b=document.createElement("div");b.className=`bb-history-row${r===w?" bb-history-row--focus":""}`;const C=document.createElement("span");C.textContent=x;const H=document.createElement("span");H.textContent=`${m}%`;const I=document.createElement("span");I.textContent=$,typeof $=="string"&&$.includes("↑")&&(I.className="bb-delta-up"),typeof $=="string"&&$.includes("↓")&&(I.className="bb-delta-down"),b.append(C,H,I),u.appendChild(b)}p.appendChild(u);const v=document.createElement("button");v.type="button",v.className="bb-btn-ghost mt-3 w-full",v.textContent=n.openThisMap,v.addEventListener("click",()=>M("map")),p.appendChild(v),i.appendChild(p)}r&&c.length&&requestAnimationFrame(()=>{var d;(d=s.querySelector(".bb-history-row--focus"))==null||d.scrollIntoView({block:"center",behavior:"smooth"})})}function D(e){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}function mt(e,t){var n;const a=N(t.lang);e.innerHTML=`
    <section class="bb-section is-visible bb-premium">
      <div class="mb-3 rounded-full px-5 py-1.5 border border-cyan-400/30 bg-cyan-500/10 text-xs font-bold uppercase tracking-[0.35em] text-cyan-100 text-center bb-type-display">
        ${D(a.premiumBadge)}
      </div>
      <h2 class="bb-page-title bb-page-title--premium neon-cta-title mb-4">
        ${D(a.premiumTitle)}
      </h2>
      <p class="text-slate-200 text-center text-sm leading-relaxed mb-6">${D(a.premiumSub)}</p>
      <ul class="bb-premium-list glass rounded-2xl p-5 mb-6 space-y-3 text-sm text-slate-200">
        ${a.premiumBullets.map(r=>`<li>${D(r)}</li>`).join("")}
      </ul>
      <button type="button" class="bb-btn-premium-buy w-full" id="bb-premium-buy">${D(a.premiumCta)}</button>
    </section>
  `,(n=e.querySelector("#bb-premium-buy"))==null||n.addEventListener("click",()=>{k(),t.tributeUrl&&Y(t.tributeUrl)})}function A(e){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}async function ht(e,t,a,{onProfile:n}={}){const r=N(a.lang),s={variant:a.testVariant||"development",questions:[],answers:{},step:0},i=document.createElement("section");i.className="bb-section is-visible bb-test",e.replaceChildren(i);async function o(){i.innerHTML=`<p class="text-cyan-200/80 text-sm">${A(r.loading)}</p>`;try{const d=await Fe(t,s.variant);s.questions=d.questions??[],s.step=0,s.answers={},l()}catch{i.innerHTML=`<p class="bb-error">${A(r.errorLoad)}</p>`}}function c(){i.innerHTML=`
      <div class="bb-test-pick">
        <div class="bb-test-pick__glow" aria-hidden="true"></div>
        <h2 class="bb-page-title bb-page-title--premium neon-zone-title">${A(r.testTitle)}</h2>
        <p class="bb-page-sub text-slate-300/90 text-sm mb-1 leading-relaxed">${A(r.testPickVariant)}</p>
        <div class="bb-test-variant-grid">
          <button type="button" class="bb-btn-hero" data-variant="sexual">
            <span class="bb-btn-hero__badge">${A(r.variantSexBadge)}</span>
            <span class="bb-btn-hero__label">${A(r.variantSex)}</span>
            <span class="bb-btn-hero__hint">${A(r.variantSexHint)}</span>
          </button>
          <button type="button" class="bb-btn-alt" data-variant="development">
            <span class="bb-btn-alt__label">${A(r.variantDev)}</span>
            <span class="bb-btn-alt__hint">${A(r.variantDevHint)}</span>
          </button>
        </div>
      </div>
    `,i.querySelectorAll("[data-variant]").forEach(d=>{d.addEventListener("click",()=>{k(),s.variant=d.getAttribute("data-variant")||"development",o()})})}function l(){const d=s.questions[s.step];if(!d){c();return}const f=s.questions.length,p=(s.step+1)/f*100;i.innerHTML=`
      <div class="bb-test-progress mb-4">
        <div class="flex justify-between text-xs text-cyan-200/80 mb-1">
          <span>${A(r.questionProgress(s.step+1,f))}</span>
          <span>${Math.round(p)}%</span>
        </div>
        <div class="pdf-bar-track"><div class="pdf-bar-gradient pdf-bar-gradient--main" style="clip-path: inset(0 ${(100-p).toFixed(1)}% 0 0)"></div></div>
      </div>
      <h2 class="bb-test-q-title">${A(d.topic)}</h2>
      <p class="text-slate-200 mb-4 leading-relaxed">${A(d.text)}</p>
      <div class="grid gap-2 bb-test-options" id="bb-test-options"></div>
    `;const h=i.querySelector("#bb-test-options");for(const E of d.options??[]){const u=document.createElement("button");u.type="button",u.className="bb-test-option",u.innerHTML=`<span class="bb-test-option-key">${A(E.key)}</span><span>${A(E.label)}</span>`,u.addEventListener("click",()=>y(E.key)),h.appendChild(u)}}async function y(d){k();const f=s.questions[s.step];if(s.answers[f.id]=d,s.step+1<s.questions.length){s.step+=1,l();return}i.innerHTML=`
      <div class="bb-loading">
        <div class="bb-loading__pulse"></div>
        <p class="text-sm text-cyan-200/80">${A(r.computing)}</p>
      </div>`;try{const p={};for(const[E,u]of Object.entries(s.answers))p[String(E)]=u;const h=await De(t,{variant:s.variant,answers:p});n&&n(h),M("map")}catch{i.innerHTML=`<p class="bb-error">${A(r.errorLoad)}</p>`}}c()}let _=null,z=null,G=null;function me(){G&&(G(),G=null)}function ft(){me();const e=document.getElementById("bb-header");if(!e)return;const t=()=>{const a=window.scrollY||document.documentElement.scrollTop||0;e.classList.toggle("bb-header--scroll-hidden",a>56)};window.addEventListener("scroll",t,{passive:!0}),t(),G=()=>{window.removeEventListener("scroll",t),e.classList.remove("bb-header--scroll-hidden")}}function he(e){const t=document.getElementById("bb-header");if(!t)return;if(e==="map"&&!document.body.classList.contains("bb-app--needs-bot")){t.hidden=!1;const n=document.getElementById("bb-header-wordmark");n&&(n.textContent="brainboosty"),ft()}else t.hidden=!0,me()}function xt(e){var s;document.body.classList.add("bb-app--needs-bot"),he(""),(s=document.querySelector(".bb-premium-fab"))==null||s.remove();const t=document.getElementById("bb-nav");t&&(t.hidden=!0,t.innerHTML="");const a=N(_.lang);e.className="bb-root bb-root--spa bb-root--bot-gate",e.replaceChildren();const n=document.createElement("div");n.className="bb-bot-gate",n.setAttribute("role","status");const r=document.createElement("p");r.className="bb-bot-gate__line",r.textContent=a.notRegistered,n.appendChild(r),e.appendChild(n)}async function _t(e){var a;if(z)return document.body.classList.remove("bb-app--needs-bot"),!0;const t=N(_.lang);e.className="bb-root bb-root--spa",e.innerHTML=`
      <div class="bb-loading">
        <div class="bb-loading__pulse"></div>
        <p class="text-sm text-cyan-200/80">${t.loading}</p>
      </div>`;try{return z=await Be(_),document.body.classList.remove("bb-app--needs-bot"),fe(z),(a=_.user)!=null&&a.first_name&&!z.userDisplayName&&(z.userDisplayName=[_.user.first_name,_.user.last_name].filter(Boolean).join(" ")),!0}catch(n){if((n==null?void 0:n.status)===401&&(n==null?void 0:n.detail)==="invalid_site_token"&&(_!=null&&_.siteToken)){try{localStorage.removeItem(O),localStorage.removeItem(U)}catch{}return window.location.replace("/"),!1}if((n==null?void 0:n.status)===403&&(n==null?void 0:n.detail)==="not_registered")return xt(e),!1;const r=(n==null?void 0:n.status)===403?t.notRegistered:(n==null?void 0:n.status)===401?t.authError:t.errorLoad;return e.className="bb-root bb-root--spa",e.innerHTML=`<p class="bb-error">${r}</p>`,!1}}function yt(e){const t=document.getElementById("bb-nav");t&&t.querySelectorAll(".bb-nav__btn[data-route]").forEach(a=>{a.classList.toggle("is-active",a.dataset.route===e)})}function vt(e){if(!_)return;const t=e==="en"?"en":"ru";_.lang!==t&&(_.lang=t,document.documentElement.lang=t,xe(t))}function fe(e){e!=null&&e.lang&&vt(e.lang)}function wt(e){var n;if((n=document.querySelector(".bb-premium-fab"))==null||n.remove(),e.paid||!e.tributeUrl)return;const t=N((_==null?void 0:_.lang)||e.lang),a=document.createElement("button");a.type="button",a.className="bb-premium-fab",a.textContent=t.premiumCta,a.addEventListener("click",()=>{k(),M(T.access)}),document.body.appendChild(a)}function xe(e){var r;const t=document.getElementById("bb-nav");if(!t)return;const a=N(e);t.hidden=!1;const n=_!=null&&_.siteToken?`<button type="button" class="bb-nav__btn bb-nav__btn--logout" data-site-logout>${a.navLogout}</button>`:"";t.innerHTML=`
    <button type="button" class="bb-nav__btn" data-route="map">${a.navMap}</button>
    <button type="button" class="bb-nav__btn" data-route="history">${a.navHistory}</button>
    <button type="button" class="bb-nav__btn" data-route="test">${a.navTest}</button>
    <button type="button" class="bb-nav__btn" data-route="access">${a.navPremium}</button>
    ${n}
  `,t.querySelectorAll(".bb-nav__btn[data-route]").forEach(s=>{s.addEventListener("click",()=>{k(),M(s.dataset.route||"map")})}),(r=t.querySelector("[data-site-logout]"))==null||r.addEventListener("click",()=>{k();try{localStorage.removeItem(O),localStorage.removeItem(U)}catch{}window.location.replace("/")})}async function ae(e){var r;const t=document.getElementById("bb-root");if(!t||!_)return;he(e.name);const a=document.getElementById("bb-nav"),n=e.name==="exercise";if(document.body.classList.toggle("bb-route-exercise",n),n||yt(e.name),e.name!=="map"&&((r=document.querySelector(".bb-premium-fab"))==null||r.remove()),!!await _t(t)){if(xe(_.lang),a&&(a.hidden=n),e.name===T.access){mt(t,z);return}if(e.name==="test"){await ht(t,_,z,{onProfile:s=>{z=s,fe(s)}});return}if(e.name==="history"){await gt(t,_,z);return}if(e.name==="exercise"){const s=parseInt(e.params.get("id")||"0",10);await bt(t,_,z,s);return}if(!z.hasMap&&e.name==="map"){M("test");return}st(t,z,e),wt(z)}}async function re(e){const t=e.lang==="en"?"en":"ru";_={initData:e.initData??"",user:e.user??null,lang:t,siteToken:e.siteToken??""},z=null,document.body.classList.add("bb-app--telegram"),_.siteToken&&document.body.classList.add("bb-app--site");const a=document.getElementById("bb-root");if(a){if(a.classList.add("bb-root--spa"),Je(n=>{ae(n).catch(()=>{})}),Xe(),window.location.pathname.replace(/\/+$/,"")==="/hub-login"){Ye(T.map);return}await ae(ee())}}const se="/assets/full-glowing-brain-Cl127Rfm.png",ie=.088,oe=15,le=2,ce=.4;function J(e,t,a){return Math.max(t,Math.min(a,e))}function Lt(){var e,t;return((t=(e=window.matchMedia)==null?void 0:e.call(window,"(prefers-reduced-motion: reduce)"))==null?void 0:t.matches)??!1}function Et(e,t,a){const n=e.getBoundingClientRect(),r=80,s=Math.max(n.width+r*2,1),i=Math.max(n.height+r*2,1),o=n.left+n.width/2,c=n.top+n.height/2;return{nx:J((t-o)/(s*.5),-1,1),ny:J((a-c)/(i*.5),-1,1)}}function $t(e){var w,x;if(Lt())return()=>{};const t=e.querySelector("[data-parallax-brain]"),a=e.querySelector("[data-parallax-glow]");if(!t)return()=>{};let n={nx:0,ny:0},r=!1,s={nx:0,ny:0},i=!1,o=0,c=0,l=0;const y=((x=(w=window.matchMedia)==null?void 0:w.call(window,"(pointer: coarse)"))==null?void 0:x.matches)??!1,d=()=>r?{tx:n.nx,ty:n.ny}:i?{tx:s.nx*.62,ty:s.ny*.62}:{tx:0,ty:0},f=()=>{l=0;const{tx:m,ty:$}=d();o+=(m-o)*ie,c+=($-c)*ie;const b=o*oe,C=c*oe,H=c*-le,I=o*le;if(t.style.transform=`translate3d(${b}px, ${C}px, 0) rotateX(${H}deg) rotateY(${I}deg)`,a){const Ee=-b*ce,$e=-C*ce;a.style.transform=`translate3d(calc(-50% + ${Ee}px), calc(-50% + ${$e}px), 0) scale(1.06)`}const{tx:ye,ty:ve}=d(),we=Math.abs(o-ye)>.003||Math.abs(c-ve)>.003,Le=Math.abs(o)>.004||Math.abs(c)>.004;(we||Le||i)&&(l=requestAnimationFrame(f))},p=()=>{l||(l=requestAnimationFrame(f))},h=m=>{if(!m.isTrusted)return;const{nx:$,ny:b}=Et(e,m.clientX,m.clientY);n={nx:$,ny:b},r=!0,p()},E=()=>{r=!0},u=()=>{r=!1,p()};e.addEventListener("pointermove",h,{passive:!0}),e.addEventListener("pointerenter",E),e.addEventListener("pointerleave",u),e.addEventListener("pointerdown",()=>{y&&typeof(DeviceOrientationEvent==null?void 0:DeviceOrientationEvent.requestPermission)=="function"&&DeviceOrientationEvent.requestPermission().then(m=>{m==="granted"&&(i=!0)}).catch(()=>{})},{passive:!0});let v=null;return window.DeviceOrientationEvent&&(v=m=>{if(m.gamma==null||m.beta==null)return;const $=J(m.gamma/32,-1,1),b=J((m.beta-44)/36,-1,1);s={nx:$,ny:b},i=!0,p()},window.addEventListener("deviceorientation",v,!0)),t.style.willChange="transform",a&&(a.style.willChange="transform"),p(),()=>{e.removeEventListener("pointermove",h),e.removeEventListener("pointerenter",E),e.removeEventListener("pointerleave",u),v&&window.removeEventListener("deviceorientation",v,!0),l&&cancelAnimationFrame(l),t.style.willChange="",t.style.transform="",a&&(a.style.willChange="",a.style.transform="")}}const St={root:null,rootMargin:"0px 0px -10% 0px",threshold:.08};function Tt(e,{reducedMotion:t}){if(t)return e.querySelectorAll(".bb-landing-reveal").forEach(r=>r.classList.add("is-in-view")),()=>{};const a=e.querySelectorAll(".bb-landing-reveal");if(!a.length)return()=>{};const n=new IntersectionObserver(r=>{for(const s of r)s.isIntersecting&&(s.target.classList.add("is-in-view"),n.unobserve(s.target))},St);return a.forEach(r=>n.observe(r)),()=>{n.disconnect()}}function L(e){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}const _e="bb-landing-lang",kt={not_registered:"landingHubErrorNotRegistered",oidc_not_configured:"landingHubErrorNotConfigured",token_exchange_failed:"landingHubErrorOidc",invalid_state:"landingHubErrorOidc",state_expired:"landingHubErrorOidc",missing_code:"landingHubErrorOidc"};function At(){try{const e=localStorage.getItem(_e);if(e==="en"||e==="ru")return e}catch{}return null}function zt(e,t){const a=kt[t];return a&&e[a]?e[a]:e.landingHubErrorOidc}function Ct(){const e=(window.location.pathname||"").replace(/\/+$/,"")||"/";if(e!=="/hub-login"&&e!=="/")return null;if(e==="/hub-login")return new URLSearchParams(window.location.search).get("error");const t=(window.location.hash||"").replace(/^#/,"");if(!t.startsWith("hub-login"))return null;const a=t.includes("?")?t.slice(t.indexOf("?")+1):"";return new URLSearchParams(a).get("error")}function de(){return((window.location.pathname||"").replace(/\/+$/,"")||"/")==="/hub-login"}function Mt(e){document.body.classList.add("bb-lang-gate-open");const t=document.createElement("div");t.className="bb-lang-gate",t.setAttribute("role","dialog"),t.setAttribute("aria-modal","true"),t.setAttribute("aria-labelledby","bb-lang-gate-title"),t.innerHTML=`
    <div class="bb-lang-gate__backdrop" aria-hidden="true"></div>
    <div class="bb-lang-gate__dialog glass">
      <p id="bb-lang-gate-title" class="bb-lang-gate__title bb-wordmark" translate="no">brainboosty</p>
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
  `,document.body.appendChild(t);const a=n=>{try{localStorage.setItem(_e,n)}catch{}document.body.classList.remove("bb-lang-gate-open"),t.remove(),e(n)};t.querySelectorAll("[data-lang]").forEach(n=>{n.addEventListener("click",()=>a(n.getAttribute("data-lang")||"ru"))}),requestAnimationFrame(()=>{var n;(n=t.querySelector(".bb-lang-gate__btn"))==null||n.focus()})}async function Nt(){const e=document.getElementById("bb-header"),t=document.getElementById("bb-nav");e&&(e.hidden=!0),t&&(t.hidden=!0);const a=document.getElementById("bb-root");if(!a)return;const n=At();if(!n){a.className="bb-root",a.innerHTML="",Mt(r=>{ue(r).catch(()=>{})});return}await ue(n)}async function ue(e){var v,w;const t=N(e);document.documentElement.lang=e;const a=document.getElementById("bb-root");if(!a)return;a.className="bb-root bb-root--landing",a.innerHTML=`
    <div class="bb-loading">
      <div class="bb-loading__pulse"></div>
    </div>`;let n={botUrl:"https://t.me/brainboosty?start=webapp",webappEntryUrl:"https://t.me/brainboosty?start=webapp",channelUrl:"https://t.me/androgenautist",hasAuthorPhoto:!1,hasChannelAvatar:!1,neuralMapHubUrl:"/hub-login",hubHostDisplay:"neuralmap.brainboosty.app",oidcLoginUrl:"/api/webapp/auth/oidc/start",oidcConfigured:!1};try{n={...n,...await Ie()}}catch{}const r="/api/webapp/landing/photo",s=t.landingFeatures.map(x=>`<li>${L(x)}</li>`).join(""),i=window.matchMedia("(prefers-reduced-motion: reduce)").matches,o=n.oidcLoginUrl||"/api/webapp/auth/oidc/start";a.innerHTML=`
    <div class="bb-landing">
      <header id="top" class="bb-landing-hero">
        <div class="bb-landing-hero__visual-anchor">
          <div class="bb-landing-hero__glow" aria-hidden="true" data-parallax-glow></div>
          <div class="bb-landing-hero__brain-layer" data-parallax-brain>
            <img class="bb-landing-hero__brain" src="${se}" alt="" width="280" height="280" decoding="async" />
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
            <img class="bb-landing-about__photo" src="${r}" alt="" width="320" height="320" loading="lazy" data-fallback-src="${se}" />
            <div class="bb-landing-about__ring" aria-hidden="true"></div>
          </div>
          <div class="bb-landing-about__text">
            ${t.landingAboutParagraphs.map(x=>`<p>${L(x)}</p>`).join("")}
            <a class="bb-landing-link" href="${L(n.channelUrl)}" target="_blank" rel="noopener noreferrer">
              ${L(t.landingChannelLink)}
            </a>
          </div>
        </article>
      </section>

      <section id="project" class="bb-landing-section bb-landing-reveal">
        <h2 class="bb-landing-section__title">${L(t.landingProjectTitle)}</h2>
        <ul class="bb-landing-features">${s}</ul>
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
        <span>Neural Map</span>
      </footer>
    </div>
  `,a.querySelectorAll(".bb-landing-about__photo").forEach(x=>{const m=x.getAttribute("data-fallback-src");m&&x.addEventListener("error",()=>{x.removeAttribute("data-fallback-src"),x.src=m})}),a.querySelectorAll('a[href^="#"]').forEach(x=>{x.addEventListener("click",m=>{var C;const $=(C=x.getAttribute("href"))==null?void 0:C.slice(1);if(!$)return;const b=document.getElementById($);b&&(m.preventDefault(),b.scrollIntoView({behavior:"smooth",block:"start"}))})});const c=a.querySelector(".bb-landing"),l=Tt(c||a,{reducedMotion:i}),y=a.querySelector(".bb-landing-hero"),d=y?$t(y):()=>{},f=()=>{l(),d(),window.removeEventListener("pagehide",f)};window.addEventListener("pagehide",f);const p=a.querySelectorAll("[data-start-site-login]"),h=a.querySelector(".bb-landing-hub__status"),E=x=>{if(!h||(h.hidden=!x,h.replaceChildren(),!x))return;const m=document.createElement("p");m.className="bb-landing-hub__status-line",m.textContent=x,h.appendChild(m)};p.forEach(x=>{x.addEventListener("click",()=>{var $;const m=N(e);if(($=document.getElementById("hub-login"))==null||$.scrollIntoView({behavior:"smooth",block:"start"}),!n.oidcConfigured){E(m.landingHubErrorNotConfigured);return}window.location.href=o})});const u=Ct();u?((v=document.getElementById("hub-login"))==null||v.scrollIntoView({behavior:"smooth",block:"start"}),E(zt(t,u)),de()&&window.location.search&&history.replaceState(null,"","/hub-login")):de()&&((w=document.getElementById("hub-login"))==null||w.scrollIntoView({behavior:"smooth",block:"start"}))}function Ht(){try{const e=navigator.userAgent||"";if(/Telegram/i.test(e))return!0;const t=`${window.location.hash||""}${window.location.search||""}`;if(/tgWebAppPlatform|tgWebAppData|tgWebAppVersion/i.test(t))return!0}catch{}return!1}function Pt(){var e;return(e=window.Telegram)!=null&&e.WebApp?Promise.resolve():new Promise(t=>{const a=document.createElement("script");a.src="https://telegram.org/js/telegram-web-app.js",a.async=!0,a.onload=()=>t(),a.onerror=()=>t(),document.head.appendChild(a)})}function qt(){var a;const e=(a=window.Telegram)==null?void 0:a.WebApp;return e?(e.initData||"").trim().length>0:!1}function It(){var e;try{return((e=localStorage.getItem(O))==null?void 0:e.trim())||""}catch{return""}}async function Bt(){var a,n,r,s,i;const t=(a=new URLSearchParams(window.location.search).get("oidc_handoff"))==null?void 0:a.trim();if(!t)return!1;try{const o=await fetch(`/api/webapp/auth/oidc/handoff?oidc_handoff=${encodeURIComponent(t)}`,{cache:"no-store"});if(!o.ok)return!1;const c=await o.json(),l=(n=c==null?void 0:c.accessToken)==null?void 0:n.trim();if(!l)return!1;const y=c.lang==="en"?"en":"ru";return localStorage.setItem(O,l),localStorage.setItem(U,JSON.stringify({first_name:((r=c.user)==null?void 0:r.first_name)??"",last_name:((s=c.user)==null?void 0:s.last_name)??"",language_code:((i=c.user)==null?void 0:i.language_code)==="en"?"en":y})),window.location.replace("/"),!0}catch{return!1}}function Rt(){var s;const e=(window.location.hash||"").replace(/^#/,"");if(!e.startsWith("auth/callback"))return!1;const t=e.includes("?")?e.slice(e.indexOf("?")+1):"",a=new URLSearchParams(t),n=(s=a.get("access_token"))==null?void 0:s.trim();if(!n)return!1;const r=a.get("lang")==="en"?"en":"ru";try{localStorage.setItem(O,n),localStorage.setItem(U,JSON.stringify({first_name:a.get("first_name")||"",last_name:"",language_code:r}))}catch{return!1}return window.location.replace("/"),!0}function Ft(){try{const e=localStorage.getItem(U);return e?JSON.parse(e):null}catch{return null}}async function Dt(){var n,r;if(Ze(),await Bt()||Rt())return;if(Qe()){window.location.replace("/");return}Ht()&&await Pt();const{initData:e,user:t,lang:a}=Ke();if(qt())re({initData:e,user:t,lang:a,siteToken:""});else{const s=It();if(s){const i=Ft(),o=(i==null?void 0:i.language_code)==="en"||(r=(n=i==null?void 0:i.language_code)==null?void 0:n.startsWith)!=null&&r.call(n,"en")||a==="en"?"en":"ru";re({initData:"",user:i?{first_name:i.first_name,last_name:i.last_name,language_code:i.language_code}:null,lang:o,siteToken:s})}else Nt()}}Dt().catch(()=>{});
