(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))n(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const i of r.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&n(i)}).observe(document,{childList:!0,subtree:!0});function a(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(s){if(s.ep)return;s.ep=!0;const r=a(s);fetch(s.href,r)}})();const me="/assets/full-glowing-brain-Cl127Rfm.png",he="/assets/amygdala-DP7dGDc4.png",fe="/assets/lobes-uZqghd8w.png",xe="/assets/frontal-gyrus-DPq4mhR0.png",ve="/assets/insula-CAJDukm_.png",_e="/assets/pfc-BE-jJY5g.png",ye="/assets/tpj-Cgg8S5Iu.png",q=["prefrontal_cortex","brain_lobes","insular_cortex","temporoparietal_junction","amygdala","frontal_gyrus"],we={prefrontal_cortex:_e,brain_lobes:fe,insular_cortex:ve,temporoparietal_junction:ye,amygdala:he,frontal_gyrus:xe},$e=me;function Le(e){const t=q.map(n=>Number(e[n]??0)),a=t.reduce((n,s)=>n+s,0);return Math.round(a/Math.max(t.length,1)*10)/10}function Ee(e){const t={"Content-Type":"application/json"};return e&&(t["X-Telegram-Init-Data"]=e),t}async function H(e,{initData:t,method:a="GET",body:n}={}){const s=await fetch(`/api/webapp${e}`,{method:a,headers:Ee(t),body:n?JSON.stringify(n):void 0});if(!s.ok){const r=new Error(`HTTP ${s.status}`);r.status=s.status;try{r.detail=(await s.json()).detail}catch{}throw r}return s.json()}function se(e){var s,r;const t=e.lang==="en"?"en":"ru",a={};for(const i of q)a[i]=Number(((s=e.scores)==null?void 0:s[i])??0);const n={};for(const i of q){const o=((r=e.regions)==null?void 0:r[i])??{};n[i]={main:Number(o.main??a[i]),bullets:o.bullets??[],submetrics:(o.submetrics??[]).map(d=>({label:d.label??d.label_ru??"",value:Number(d.value??a[i])}))}}return{lang:t,userDisplayName:e.userDisplayName??e.user_display_name??"Guest",paid:!!e.paid,hasMap:!!(e.hasMap??e.has_map??Object.keys(e.scores||{}).length),testVariant:e.testVariant??e.test_variant??"development",tributeUrl:e.tributeUrl??e.tribute_url??"",neuroScore:e.neuroScore!=null?Number(e.neuroScore):Le(a),scores:a,connectivity:e.connectivity??[],regions:n,snapshotId:e.snapshotId??e.snapshot_id??null,createdAt:e.createdAt??e.created_at??null}}async function ze(){return H("/landing",{initData:""})}async function R(e){const t=await H("/profile",{initData:e.initData});return se(t)}async function ke(e){return H("/history",{initData:e.initData})}async function Te(e,t="development"){return H(`/test/questions?variant=${encodeURIComponent(t)}`,{initData:e.initData})}async function Ae(e,{variant:t,answers:a}){const n={variant:t,answers:a},s=await H("/test/submit",{initData:e.initData,method:"POST",body:n});return se(s.profile)}async function Se(e,t){return H(`/exercises/${encodeURIComponent(String(t))}`,{initData:e.initData})}const Me={landingKicker:"BrainBoosty · neuroscience, no fluff",landingTitle:"Upgrade your brain — see your Neural Map",landingTagline:"7 questions → a personal 6-zone brain map, NeuroScore, and clear next steps. All in Telegram.",landingCta:"Boost my brain",landingCtaSub:"Free start in the bot · 2 minutes",landingNavAbout:"About me",landingNavProject:"The project",landingNavCta:"Open bot",landingLoginTelegram:"Log in with Telegram",landingChannelAria:"Telegram channel",landingAboutTitle:"About me",landingAboutParagraphs:["Hi, I'm @androgenautist — creator of BrainBoosty.","I went from anxiety, brain fog, and tension to clarity, inner strength, and confidence. Now I help others with neurobiology, hormones, and cognitive habits.","On my channel I share actionable insights—no marketing noise, only what actually shifts your state."],landingChannelLink:"→ Channel @androgenautist",landingProjectTitle:"What's inside",landingFeatures:["7-question cognitive test — development or sexual profile","Neural Map: 6 brain zones with NeuroScore and recommendations","Progress history and test-to-test comparison","Daily hooks and a private exercise channel"],landingFinalTitle:"Ready to see your map?",landingFinalSub:"Open the bot — onboarding takes a few minutes; your first map is free.",heroBrain:"NEURAL MAP",scoreLabel:"NeuroScore",coverLine:"Six zones · one profile. Numbers, focus, and a clear read—no clutter.",connectivityTitle:"Inter-region links (educational model)",zoneLevel:"Integrated zone level",progressMain:e=>`Your progress ${e}%`,recTitle:"Why this zone is your biggest pleasure lever",footer:"BrainBoosty · educational model · not a medical diagnosis",premiumCta:"Get full access",premiumBadge:"Full access",premiumTitle:"Get full access — today",premiumSub:"A 30-day personal plan, progress tracker, exercises for your profile, and the private channel.",premiumBullets:["Full brain map and all zone recommendations","Progress history with test comparisons","Retests and trend tracking","Private channel and daily hooks"],navMap:"Map",navHistory:"History",navTest:"Test",navPremium:"Access",appBrandName:"BrainBoosty",appHeaderTitle:"Neural Map",loading:"Loading your neuro profile…",computing:"Computing your brain map…",errorLoad:"Could not load data. Please try again later.",authError:"Open the app from the Telegram bot.",notRegistered:"Complete the bot questionnaire first (/start).",historyTitle:"Progress history",historySub:"Zone comparison across tests. Arrows show percentage-point change.",historyEmpty:"No saved tests yet. Take your first test to see history here.",startTest:"Take the test",latest:"Latest",openThisMap:"Open map",testTitle:"Cognitive test",testPickVariant:"Choose question style (7 steps):",variantDev:"Development & cognition",variantSex:"Sexual profile",variantSexBadge:"Maximum insight",variantSexHint:"Pleasure, drive, and your neural edge",variantDevHint:"Focus, habits, and cognitive style",questionProgress:(e,t)=>`Question ${e} of ${t}`,regions:{prefrontal_cortex:"Prefrontal cortex",brain_lobes:"Brain lobes · imagery",insular_cortex:"Insular cortex",temporoparietal_junction:"Temporoparietal junction",amygdala:"Amygdala",frontal_gyrus:"Frontal gyrus"},interactiveBrainKicker:"Zone",zoneIllustrationOpenAria:"open zone card",zoneDrawerCloseAria:"Close",zoneCurrentLevel:"Current level",zoneWhyTitle:"Why it matters",zoneBoostCta:"Boost this zone",zoneUnlockNote:"Full access unlocks personal drills per zone, progress tracking, and training history.",zoneOpenHistory:"History for this zone",zoneExercisesHeading:"Zone exercises",zoneExerciseListCap:"In your program for this zone:",zoneExercisePlaceholder:"More protocols are on the way — your full access already includes the base track.",zonePaidHint:"More protocols and metrics tailored to your profile are coming next.",zoneReadMoreDetail:"Full zone breakdown below in the feed",zoneWhy:{prefrontal_cortex:"Planning, impulse control, and focus. A stronger PFC means clearer decisions and fewer spirals.",brain_lobes:"Integrates imagery, language, and space. Balance here improves how you read reality and old patterns.",insular_cortex:"Interoception and emotional regulation — the bridge between body state and action.",temporoparietal_junction:"Perspective, attention, and social context — helps you update stories instead of locking in one view.",amygdala:"Threat and reward signaling. Tuning it reduces false alarms while keeping healthy drive.",frontal_gyrus:"Links effort, intention, and follow-through — trained with sequenced action and repetition."},zoneExercises:{prefrontal_cortex:[{title:"90-second stop frame",body:"Before an impulsive reply, state one value and one tiny next step out loud."}],brain_lobes:[{title:"Sensory anchor",body:"For 30s describe one object: color, texture, sound — no judgments."}],insular_cortex:[{title:"Rib-cage breath",body:"4 cycles: inhale 4 counts, soft pause, exhale 6 — attention on rib expansion.",exerciseId:1}],temporoparietal_junction:[{title:"Perspective swap",body:"Phrase the same situation two neutral ways — without «I'm right» framing."}],amygdala:[{title:"Tolerance window",body:"2 min: note 3 neutral facts around a trigger, then one action 2% softer."}],frontal_gyrus:[{title:"Three-step chain",body:"Write three micro-steps for one goal today; track completion only."}]},exerciseLoading:"Loading protocol…",exerciseNotFound:"Exercise not found.",exerciseBackAria:"Back",exerciseTagForWho:"For who",exerciseTagEfficiency:"Effectiveness",exerciseTagFirstResult:"First results",exerciseDifficulty:"Difficulty",exerciseFirstResultDays:e=>`~${e} days`,exerciseEfficiencyLabels:["Low","Moderate","High","Exceptional","Best for this region"],exerciseAccInstruction:"Instruction",exerciseAccResearch:"Research",exerciseAccAmplify:"How to amplify",exerciseAccResults:"Expected outcomes",exerciseNoResearch:"Links will appear here soon.",exerciseCtaPrimary:"Add to my training plan",exerciseCtaMessage:"Sync with your bot plan is coming soon. For now, block time on your calendar and log completion.",exercisePremiumTitle:"Full access",exercisePremiumText:"Channel exercises are available with BrainBoosty full access.",zoneOpenFullExercise:"Open full exercise"},re={landingKicker:"BrainBoosty · нейробиология без воды",landingTitle:"Прокачай мозг — увидь свою Neural Map",landingTagline:"7 вопросов → персональная карта из 6 зон мозга, NeuroScore и понятные шаги. Всё в Telegram.",landingCta:"Прокачать мозг",landingCtaSub:"Бесплатный старт в боте · 2 минуты",landingNavAbout:"Обо мне",landingNavProject:"Проект",landingNavCta:"В бота",landingLoginTelegram:"Войти через Telegram",landingChannelAria:"Канал в Telegram",landingAboutTitle:"Обо мне",landingAboutParagraphs:["Привет, я @androgenautist — автор BrainBoosty.","Сам прошёл путь от тревожности, тумана в голове и зажатости — к ясности, внутренней силе и уверенности. Сейчас помогаю другим по нейробиологии, гормонам и когнитивным привычкам.","В канале делюсь рабочими инсайтами без маркетинговой шелухи — только то, что реально меняет состояние."],landingChannelLink:"→ Канал @androgenautist",landingProjectTitle:"Что внутри",landingFeatures:["Когнитивный тест из 7 вопросов — два стиля (развитие / сексуальный профиль)","Neural Map: 6 зон мозга с NeuroScore и рекомендациями","История прогресса и сравнение между тестами","Ежедневные хуки и закрытый канал с упражнениями"],landingFinalTitle:"Готов увидеть свою карту?",landingFinalSub:"Открой бота — анкета займёт пару минут, первая карта бесплатно.",heroBrain:"NEURAL MAP",scoreLabel:"NeuroScore",coverLine:"Шесть зон · один профиль. Цифры, акценты и ясная картина без лишнего шума.",connectivityTitle:"Связность зон (образовательная модель)",zoneLevel:"Интегральный уровень зоны",progressMain:e=>`Твой прогресс ${e}%`,recTitle:"Почему эта зона — твой главный рычаг удовольствия",footer:"BrainBoosty · образовательная модель · не медицинский диагноз",premiumCta:"Забрать полный доступ",premiumBadge:"Полный доступ",premiumTitle:"Забери полный доступ — сегодня",premiumSub:"Персональный план на 30 дней, трекер прогресса, упражнения под твой профиль и закрытый канал.",premiumBullets:["Полная карта мозга и все рекомендации по зонам","История прогресса с сравнением тестов","Повторные тесты и отслеживание динамики","Закрытый канал и ежедневные хуки"],navMap:"Карта",navHistory:"История",navTest:"Тест",navPremium:"Доступ",appBrandName:"BrainBoosty",appHeaderTitle:"Neural Map",loading:"Загружаем нейропрофиль…",computing:"Считаем твою карту мозга…",errorLoad:"Не удалось загрузить данные. Попробуйте позже.",authError:"Откройте приложение из Telegram-бота.",notRegistered:"Сначала пройдите анкету в боте (/start).",historyTitle:"История прогресса",historySub:"Сравнение зон между прохождениями. Стрелки — изменение в процентных пунктах.",historyEmpty:"Пока нет сохранённых тестов. Пройдите первый тест — и здесь появится история.",startTest:"Пройти тест",latest:"Актуально",openThisMap:"Открыть карту",testTitle:"Когнитивный тест",testPickVariant:"Выберите стиль вопросов (7 шагов):",variantDev:"Развитие и когниция",variantSex:"Сексуальный профиль",variantSexBadge:"Максимум инсайта",variantSexHint:"Удовольствие, драйв и нейронный рельеф",variantDevHint:"Фокус, привычки и когнитивный стиль",questionProgress:(e,t)=>`Вопрос ${e} из ${t}`,regions:{prefrontal_cortex:"Префронтальная кора",brain_lobes:"Доли мозга · образы",insular_cortex:"Островковая кора",temporoparietal_junction:"Височно-теменной узел",amygdala:"Амигдала",frontal_gyrus:"Лобная извилина"},interactiveBrainKicker:"Зона",zoneIllustrationOpenAria:"открыть карточку зоны",zoneDrawerCloseAria:"Закрыть",zoneCurrentLevel:"Текущий уровень",zoneWhyTitle:"Почему это важно",zoneBoostCta:"Прокачать эту зону",zoneUnlockNote:"Полный доступ открывает персональные упражнения под каждую зону, трекер и историю прокачки.",zoneOpenHistory:"История этой зоны",zoneExercisesHeading:"Упражнения для зоны",zoneExerciseListCap:"Сейчас в программе для этой зоны:",zoneExercisePlaceholder:"Скоро добавим ещё шаги — уже доступен базовый протокол в полном доступе.",zonePaidHint:"Дальше — больше протоколов и метрик именно под твой профиль.",zoneReadMoreDetail:"Подробный разбор зоны в ленте ниже",zoneWhy:{prefrontal_cortex:"Планирование, торможение импульсов и фокус. Сильная ПФК — ясные решения, меньше хаоса и откатов.",brain_lobes:"Интеграция образов, языка и пространства. Баланс здесь — лучшее восприятие реальности и выученные паттерны.",insular_cortex:"Телесная осознанность и эмоциональная регуляция. Островок связывает «что чувствую» с «что делаю».",temporoparietal_junction:"Перспектива, внимание и социальный контекст. TPJ помогает не застревать в одной интерпретации событий.",amygdala:"Детектор угроз и сигналов награды. Настрой амигдалы — меньше ложной тревоги, больше спокойного драйва.",frontal_gyrus:"Связь моторики, намерения и усилия. Тренируется через последовательные действия и повторение цели."},zoneExercises:{prefrontal_cortex:[{title:"90 секунд «стоп-рамка»",body:"Перед импульсивным ответом назови вслух одну ценность и одно следующее маленькое действие."}],brain_lobes:[{title:"Сенсорный якорь",body:"30 секунд описывай предмет из комнаты: цвет, фактура, звук — без оценок."}],insular_cortex:[{title:"Дыхание в ребро",body:"4 цикла: вдох 4 счёта, мягкая пауза, выдох 6 — внимание на расширении рёбер.",exerciseId:1}],temporoparietal_junction:[{title:"Смена ракурса",body:"Сформулируй ту же ситуацию двумя нейтральными формулировками, без «я прав»."}],amygdala:[{title:"Окно толерантности",body:"2 минуты: найди 3 нейтральных факта вокруг триггера, затем одно действие на 2% мягче."}],frontal_gyrus:[{title:"Цепочка на 3 шага",body:"Запиши три микрошага к одной цели на сегодня; отмечай только факт выполнения."}]},exerciseLoading:"Загружаем протокол…",exerciseNotFound:"Упражнение не найдено.",exerciseBackAria:"Назад",exerciseTagForWho:"Для кого",exerciseTagEfficiency:"Эффективность",exerciseTagFirstResult:"Первый результат",exerciseDifficulty:"Сложность",exerciseFirstResultDays:e=>`ориентир ≈ ${e} дн.`,exerciseEfficiencyLabels:["Низкая","Средняя","Высокая","Чрезвычайная","Оптимально для отдела"],exerciseAccInstruction:"Инструкция",exerciseAccResearch:"Исследования",exerciseAccAmplify:"Как усилить эффект",exerciseAccResults:"Ожидаемые результаты",exerciseNoResearch:"Ссылки будут добавлены.",exerciseCtaPrimary:"Добавить в мой план прокачки",exerciseCtaMessage:"Скоро здесь будет синхронизация с твоим планом в боте. Пока закрепи время в календаре и отметь выполнение в заметках.",exercisePremiumTitle:"Полный доступ",exercisePremiumText:"Экран упражнений из закрытого канала доступен с подпиской BrainBoosty.",zoneOpenFullExercise:"Полный экран упражнения"},Ce={ru:re,en:Me};function S(e){return Ce[e==="en"?"en":"ru"]??re}const V=new Set;function Y(){const e=(window.location.hash||"#map").replace(/^#/,""),[t,a]=e.split("?");return{name:t||"map",params:new URLSearchParams(a||"")}}function A(e,t={}){var n;const a=((n=t.toString)==null?void 0:n.call(t))||new URLSearchParams(t).toString();window.location.hash=a?`${e}?${a}`:e}function Ne(e){return V.add(e),()=>V.delete(e)}function ie(){const e=Y();for(const t of V)t(e)}window.addEventListener("hashchange",ie);function Be(){ie()}function qe(){var n,s,r;const e=(n=window.Telegram)==null?void 0:n.WebApp;if(!e)return{tg:null,initData:"",user:null,lang:"ru"};e.ready(),e.expand(),e.enableClosingConfirmation(),e.disableVerticalSwipes&&e.disableVerticalSwipes(),X(),e.onEvent("themeChanged",X);const t=((s=e.initDataUnsafe)==null?void 0:s.user)??null,a=(t==null?void 0:t.language_code)==="en"||(r=t==null?void 0:t.language_code)!=null&&r.startsWith("en")?"en":"ru";return e.setHeaderColor&&e.setHeaderColor("#010108"),e.setBackgroundColor&&e.setBackgroundColor("#010108"),{tg:e,initData:e.initData||"",user:t,lang:a}}function X(){const e=document.documentElement;e.style.setProperty("--bb-tg-bg","#010108"),e.style.setProperty("--bb-tg-text","#f1f5f9")}function U(e){var a;const t=(a=window.Telegram)==null?void 0:a.WebApp;if(t!=null&&t.openTelegramLink&&e.includes("t.me/")){t.openTelegramLink(e);return}if(t!=null&&t.openLink){t.openLink(e);return}window.open(e,"_blank","noopener,noreferrer")}function z(){var e,t,a,n;(n=(a=(t=(e=window.Telegram)==null?void 0:e.WebApp)==null?void 0:t.HapticFeedback)==null?void 0:a.impactOccurred)==null||n.call(a,"light")}function L(e){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}function Pe(){return`
    <div class="bb-zone-drawer__bar-track">
      <div class="bb-zone-drawer__bar-fill" style="width: 0%"></div>
    </div>`}function Fe(e,t,a={}){var u,v,_,C,E,T;const n=S(e.lang),s=n.regions[t]??t,r=((u=n.zoneWhy)==null?void 0:u[t])??"",i=Number(((v=e.scores)==null?void 0:v[t])??0).toFixed(1),o=((_=n.zoneExercises)==null?void 0:_[t])??[],d=o.length>0?o.map(g=>`
                  <li class="bb-zone-drawer__exercise">
                    <p class="bb-zone-drawer__exercise-title">${L(g.title)}</p>
                    <p class="bb-zone-drawer__exercise-body">${L(g.body)}</p>
                    ${g.exerciseId!=null?`<button type="button" class="bb-zone-drawer__ex-open" data-open-exercise="${Number(g.exerciseId)}">${L(n.zoneOpenFullExercise)}</button>`:""}
                  </li>`).join(""):`<li class="bb-zone-drawer__exercise"><p class="bb-zone-drawer__exercise-body">${L(n.zoneExercisePlaceholder)}</p></li>`,l=document.createElement("div");l.className="bb-zone-drawer-host",l.innerHTML=`
    <div class="bb-zone-drawer-backdrop" data-close="1" aria-hidden="true"></div>
    <aside class="bb-zone-drawer glass" role="dialog" aria-modal="true" aria-labelledby="bb-zone-drawer-title">
      <header class="bb-zone-drawer__header">
        <div>
          <p class="bb-zone-drawer__eyebrow">${L(n.interactiveBrainKicker)}</p>
          <h2 id="bb-zone-drawer-title" class="bb-zone-drawer__title">${L(s)}</h2>
        </div>
        <button type="button" class="bb-zone-drawer__close" data-close="1" aria-label="${L(n.zoneDrawerCloseAria)}">
          <span aria-hidden="true">×</span>
        </button>
      </header>
      <div class="bb-zone-drawer__body">
        <div class="bb-zone-drawer__meter">
          <div class="bb-zone-drawer__meter-row">
            <span class="bb-zone-drawer__meter-label">${L(n.zoneCurrentLevel)}</span>
            <span class="bb-zone-drawer__meter-value">${L(i)}%</span>
          </div>
          ${Pe()}
        </div>
        <div class="bb-zone-drawer__why">
          <p class="bb-zone-drawer__why-title">${L(n.zoneWhyTitle)}</p>
          <p class="bb-zone-drawer__why-text">${L(r)}</p>
        </div>
        <div class="bb-zone-drawer__actions" data-paid-block="${e.paid?"1":"0"}">
          ${e.paid?`
            <div class="bb-zone-drawer__paid-menu">
              <button type="button" class="bb-zone-drawer__btn bb-zone-drawer__btn--ghost" data-go="history">
                ${L(n.zoneOpenHistory)}
              </button>
              <button type="button" class="bb-zone-drawer__btn bb-zone-drawer__btn--ghost" data-toggle="exercises">
                ${L(n.zoneExercisesHeading)}
              </button>
            </div>
            <div class="bb-zone-drawer__exercises" data-exercises hidden>
              <p class="bb-zone-drawer__exercises-cap">${L(n.zoneExerciseListCap)}</p>
              <ul class="bb-zone-drawer__exercise-list">
                ${d}
              </ul>
            </div>
            <p class="bb-zone-drawer__paid-hint">${L(n.zonePaidHint)}</p>
            <button type="button" class="bb-zone-drawer__btn bb-zone-drawer__btn--ghost bb-zone-drawer__btn--compact" data-scroll-zone="${t}">
              ${L(n.zoneReadMoreDetail)}
            </button>`:`
            <p class="bb-zone-drawer__lock-note">${L(n.zoneUnlockNote)}</p>
            <button type="button" class="bb-zone-drawer__btn bb-zone-drawer__btn--primary" data-go="boost">
              ${L(n.zoneBoostCta)}
            </button>
            <button type="button" class="bb-zone-drawer__btn bb-zone-drawer__btn--ghost bb-zone-drawer__btn--compact" data-scroll-zone="${t}">
              ${L(n.zoneReadMoreDetail)}
            </button>`}
        </div>
      </div>
    </aside>
  `,document.body.appendChild(l),document.body.classList.add("bb-zone-drawer-open");const w=l.querySelector(".bb-zone-drawer"),c=l.querySelector("[data-exercises]"),f=l.querySelector(".bb-zone-drawer-backdrop"),p=l.querySelector(".bb-zone-drawer__bar-fill"),b=()=>{var g;document.removeEventListener("keydown",x),document.body.classList.remove("bb-zone-drawer-open"),l.remove(),(g=a.onClose)==null||g.call(a)},x=g=>{g.key==="Escape"&&b()};return document.addEventListener("keydown",x),l.querySelectorAll("[data-close]").forEach(g=>{g.addEventListener("click",()=>{z(),b()})}),(C=l.querySelector('[data-go="boost"]'))==null||C.addEventListener("click",()=>{z(),e.tributeUrl?U(e.tributeUrl):A("premium"),b()}),(E=l.querySelector('[data-go="history"]'))==null||E.addEventListener("click",()=>{z(),A("history",{zone:t}),b()}),(T=l.querySelector('[data-toggle="exercises"]'))==null||T.addEventListener("click",()=>{if(z(),!c)return;c.hasAttribute("hidden")?c.removeAttribute("hidden"):c.setAttribute("hidden","")}),l.querySelectorAll("[data-scroll-zone]").forEach(g=>{g.addEventListener("click",()=>{z();const M=g.getAttribute("data-scroll-zone")||t;b(),requestAnimationFrame(()=>{var N;(N=document.getElementById(`zone-${M}`))==null||N.scrollIntoView({behavior:"smooth",block:"start"})})})}),l.querySelectorAll("[data-open-exercise]").forEach(g=>{g.addEventListener("click",()=>{z();const M=g.getAttribute("data-open-exercise")||"1";b(),A("exercise",{id:M})})}),requestAnimationFrame(()=>{if(w==null||w.classList.add("is-open"),f==null||f.classList.add("is-open"),p){const g=Math.max(0,Math.min(100,Number(i)||0));p.style.width="0%",requestAnimationFrame(()=>{p.style.width=`${g.toFixed(1)}%`})}}),{close:()=>{b()}}}function B(e){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}function He(e,{displayName:t,neuroScore:a,connectivity:n}){const s=(n==null?void 0:n.length)>0?`
    <div class="bb-connectivity glass rounded-2xl p-4 mt-5">
      <p class="bb-connectivity__title">${B(e.connectivityTitle)}</p>
      ${n.map(r=>`<p>• ${B(r)}</p>`).join(`
      `)}
    </div>`:"";return`
<section class="bb-section bb-cover" data-section="cover">
  <img src="${$e}" alt="" class="cover-full-brain-hero mb-4" width="360" height="260" decoding="async" />
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
        ${Number(a).toFixed(1)}
      </div>
    </div>
    ${s}
  </div>
  <p class="text-center text-[11px] text-slate-500 mt-6">${B(e.footer)}</p>
</section>`}function Z({label:e,value:t,glow:a=!1}){const n=Math.max(0,Math.min(100,Number(t)||0)),s=Math.max(0,100-n),r=a?"pdf-bar-gradient pdf-bar-gradient--main":"pdf-bar-gradient pdf-bar-gradient--sub",i=Ie(e);return[`<div class="mb-3.5" data-bar-value="${n}">`,'<div class="flex justify-between text-xs text-slate-400 mb-1">',`<span>${i}</span>`,`<span class="text-cyan-100 font-bold tracking-wide">${n.toFixed(1)}%</span>`,"</div>",'<div class="pdf-bar-track">',`<div class="${r}" style="clip-path: inset(0 ${s.toFixed(2)}% 0 0);"></div>`,"</div>","</div>"].join(`
  `)}function Ie(e){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}function F(e){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}function De(e,t,a){const n=e.regions[t]??t,s=we[t],r=Number(a.main??0),i=e.progressMain(`${r.toFixed(1)}`),o=[Z({label:e.zoneLevel,value:r,glow:!0}),...(a.submetrics??[]).map(l=>Z({label:l.label,value:l.value,glow:!1}))].join(`
`),d=(a.bullets??[]).map(l=>`<li>${F(l)}</li>`).join(`
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
        ${d}
    </ul>
  </div>
</section>`}function Re(e,t,a){const n=S(t.lang),s=t.userDisplayName||(t.lang==="en"?"Guest":"Гость"),r=[He(n,{displayName:s,neuroScore:t.neuroScore,connectivity:t.connectivity}),...q.map(i=>{var o,d;return De(n,i,{main:t.scores[i],bullets:((o=t.regions[i])==null?void 0:o.bullets)??[],submetrics:((d=t.regions[i])==null?void 0:d.submetrics)??[]})})];e.innerHTML=r.join(`
`),je(e),Ue(e),We(e),Oe(e,t,a)}function Oe(e,t,a){var o,d;const n=e.querySelectorAll("[data-open-zone]");if(!n.length)return;const s=l=>{e.querySelectorAll(".bb-region").forEach(w=>{const c=w.dataset.region;w.classList.toggle("is-zone-hot",!!l&&c===l)})},r=l=>{!l||!q.includes(l)||(s(l),Fe(t,l,{onClose:()=>s(null)}))};n.forEach(l=>{l.addEventListener("pointerenter",()=>s(l.getAttribute("data-open-zone")||"")),l.addEventListener("pointerleave",w=>{const c=w.relatedTarget;c instanceof Node&&e.contains(c)&&c.closest("[data-open-zone]")||s(null)}),l.addEventListener("click",w=>{w.preventDefault();const c=l.getAttribute("data-open-zone");c&&(z(),r(c))})});const i=(d=(o=a==null?void 0:a.params)==null?void 0:o.get)==null?void 0:d.call(o,"zone");i&&q.includes(i)&&requestAnimationFrame(()=>r(i))}function je(e){const t=e.querySelectorAll(".bb-section"),a=new IntersectionObserver(n=>{for(const s of n)s.isIntersecting&&(s.target.classList.add("is-visible"),a.unobserve(s.target))},{root:null,rootMargin:"0px 0px -8% 0px",threshold:.08});t.forEach(n=>a.observe(n))}function Ue(e){const t=e.querySelector("[data-neuro-score]");if(!t)return;const a=parseFloat(t.textContent||"0"),n=1200,s=performance.now(),r=i=>{const o=Math.min(1,(i-s)/n),d=1-(1-o)**3;t.textContent=(a*d).toFixed(1),o<1&&requestAnimationFrame(r)};requestAnimationFrame(r)}function We(e){const t=e.querySelectorAll("[data-bar-value]"),a=new IntersectionObserver(n=>{for(const s of n){if(!s.isIntersecting)continue;const r=s.target,i=parseFloat(r.getAttribute("data-bar-value")||"0"),o=r.querySelector(".pdf-bar-gradient");o&&(o.style.clipPath="inset(0 100% 0 0)",requestAnimationFrame(()=>{o.style.clipPath=`inset(0 ${Math.max(0,100-i).toFixed(2)}% 0 0)`})),a.unobserve(r)}},{threshold:.2});t.forEach(n=>a.observe(n))}function m(e){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}function Ge(){return{instruction:'<svg class="ex-ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.25" aria-hidden="true"><path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01"/></svg>',research:'<svg class="ex-ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.25" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3M11 8v6M8 11h6"/></svg>',amplify:'<svg class="ex-ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.25" aria-hidden="true"><path d="M12 3l1.8 5.5h5.7l-4.6 3.4 1.8 5.5-4.7-3.4-4.7 3.4 1.8-5.5-4.6-3.4h5.7L12 3z"/></svg>',results:'<svg class="ex-ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.25" aria-hidden="true"><path d="M4 19V5M9 19v-6M14 19V9M19 19v-9"/><path d="M4 19h16" stroke-linecap="round"/></svg>'}}function G(e){return String(e||"").split(`
`).map(a=>`<p>${m(a)}</p>`).join("")}function Ve(e){e.querySelectorAll(".ex-acc").forEach(t=>{const a=t.querySelector(".ex-acc__trigger");a&&a.addEventListener("click",()=>{const s=!(t.getAttribute("data-open")==="true");t.setAttribute("data-open",String(s)),a.setAttribute("aria-expanded",String(s)),z()})})}function O(e){requestAnimationFrame(()=>{var t;(t=e.querySelector(".ex-lux"))==null||t.classList.add("is-visible")})}async function Ye(e,t,a,n){var b,x;const s=S(a.lang),r=Ge();e.className="bb-root bb-root--spa bb-root--exercise",e.innerHTML=`
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
    </div>`;const i=e.querySelector("#ex-back");if(i==null||i.addEventListener("click",()=>{z(),A("map")}),!Number.isFinite(n)||n<1){const u=e.querySelector(".ex-lux__scroll .ex-lux__inner");u&&(u.innerHTML=`<p class="ex-lux__err">${m(s.exerciseNotFound)}</p>`),O(e);return}if(!a.paid){e.querySelector(".ex-lux__scroll .ex-lux__inner").innerHTML=`
      <div class="ex-lux__hero">
        <p class="ex-lux__lock-title">${m(s.exercisePremiumTitle)}</p>
        <p class="ex-lux__lock-text">${m(s.exercisePremiumText)}</p>
        <button type="button" class="ex-lux__cta ex-lux__cta--inline" id="ex-unlock">${m(s.premiumCta)}</button>
      </div>`,(b=e.querySelector("#ex-unlock"))==null||b.addEventListener("click",()=>{z(),a.tributeUrl?U(a.tributeUrl):A("premium")}),e.querySelector("#ex-cta").textContent=s.premiumCta,(x=e.querySelector("#ex-cta"))==null||x.addEventListener("click",()=>{z(),a.tributeUrl?U(a.tributeUrl):A("premium")}),O(e);return}let o;try{o=await Se(t,n)}catch(u){const v=e.querySelector(".ex-lux__scroll .ex-lux__inner"),_=(u==null?void 0:u.status)===403?s.exercisePremiumTitle:(u==null?void 0:u.status)===404?s.exerciseNotFound:s.errorLoad;v&&(v.innerHTML=`<p class="ex-lux__err">${m(_)}</p>`),O(e);return}const d=Math.max(0,Math.min(4,(o.effectiveness||3)-1)),l=s.exerciseEfficiencyLabels[d]??"—",w=(o.regions||[]).map(u=>`<span class="ex-lux__pill">${m(s.regions[u]??u)}</span>`).join(""),c=(o.researchLinks||[]).map(u=>`<a class="ex-lux__link" href="${m(u.url)}" target="_blank" rel="noopener noreferrer">${m(u.label||u.url)}</a>`).join(""),f=o.instructionImageUrl?`<figure class="ex-lux__figure"><img src="${m(o.instructionImageUrl)}" alt="" loading="lazy" decoding="async" /></figure>`:"";e.querySelector(".ex-lux__scroll .ex-lux__inner").innerHTML=`
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
      <div class="ex-lux__pills">${w}</div>
      ${f}
    </div>

    <div class="ex-lux__accords">
      <div class="ex-acc" data-open="true">
        <button type="button" class="ex-acc__trigger" aria-expanded="true">
          <span class="ex-acc__ic">${r.instruction}</span>
          <span class="ex-acc__label">${m(s.exerciseAccInstruction)}</span>
          <span class="ex-acc__chev" aria-hidden="true"></span>
        </button>
        <div class="ex-acc__panel">
          <div class="ex-acc__panel-inner ex-lux__prose">${G(o.instruction)}</div>
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
          <div class="ex-acc__panel-inner ex-lux__prose">${G(o.amplify)}</div>
        </div>
      </div>
      <div class="ex-acc" data-open="false">
        <button type="button" class="ex-acc__trigger" aria-expanded="false">
          <span class="ex-acc__ic">${r.results}</span>
          <span class="ex-acc__label">${m(s.exerciseAccResults)}</span>
          <span class="ex-acc__chev" aria-hidden="true"></span>
        </button>
        <div class="ex-acc__panel">
          <div class="ex-acc__panel-inner ex-lux__prose">${G(o.expectedResults)}</div>
        </div>
      </div>
    </div>
    <div class="ex-lux__scroll-pad"></div>`,Ve(e);const p=e.querySelector("#ex-cta");p==null||p.addEventListener("click",()=>{var u,v,_;z(),(_=(v=(u=window.Telegram)==null?void 0:u.WebApp)==null?void 0:v.showAlert)==null||_.call(v,s.exerciseCtaMessage)}),O(e)}function j(e){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}function Xe(e,t){if(!e)return"—";try{return new Date(e).toLocaleString(t==="en"?"en-GB":"ru-RU",{day:"2-digit",month:"short",year:"numeric",hour:"2-digit",minute:"2-digit"})}catch{return e}}async function Ze(e,t,a){var l,w;const n=S(a.lang),s=Y().params.get("zone"),r=document.createElement("section");r.className="bb-section is-visible bb-history",r.innerHTML=`
    <h2 class="bb-page-title bb-page-title--premium neon-zone-title">${j(n.historyTitle)}</h2>
    <p class="bb-page-sub text-slate-300/90 text-sm mb-4">${j(n.historySub)}</p>
  `;const i=document.createElement("div");i.className="space-y-3",i.textContent=n.loading,r.appendChild(i),e.replaceChildren(r);let o;try{o=await ke(t)}catch{i.innerHTML=`<p class="bb-error">${j(n.errorLoad)}</p>`;return}const d=o.items??[];if(i.replaceChildren(),!d.length){const c=document.createElement("div");c.className="glass rounded-2xl p-5 text-center";const f=document.createElement("p");f.className="text-slate-200 mb-4",f.textContent=n.historyEmpty;const p=document.createElement("button");p.type="button",p.className="bb-btn-primary",p.textContent=n.startTest,p.addEventListener("click",()=>A("test")),c.append(f,p),i.appendChild(c);return}for(const[c,f]of d.entries()){const p=document.createElement("article");p.className=`glass rounded-2xl p-4 bb-history-card${c===0?" is-active":""}`;const b=document.createElement("div");b.className="flex justify-between items-start gap-2 mb-2";const x=document.createElement("div");if(x.innerHTML=`
      <p class="text-xs text-cyan-200/80 uppercase tracking-wide">${j(Xe(f.createdAt,a.lang))}</p>
      <p class="text-lg font-bold text-white mt-1 bb-type-display">NeuroScore <span class="text-cyan-200">${Number(f.neuroScore).toFixed(1)}</span></p>
    `,b.appendChild(x),c===0){const _=document.createElement("span");_.className="bb-badge",_.textContent=n.latest,b.appendChild(_)}p.appendChild(b);const u=document.createElement("div");u.className="bb-history-deltas";for(const _ of q){const C=n.regions[_]??_,E=Number(((l=f.scores)==null?void 0:l[_])??0).toFixed(1),T=f.isFirst?"—":((w=f.deltas)==null?void 0:w[_])??"·",g=document.createElement("div");g.className=`bb-history-row${s===_?" bb-history-row--focus":""}`;const M=document.createElement("span");M.textContent=C;const N=document.createElement("span");N.textContent=`${E}%`;const P=document.createElement("span");P.textContent=T,typeof T=="string"&&T.includes("↑")&&(P.className="bb-delta-up"),typeof T=="string"&&T.includes("↓")&&(P.className="bb-delta-down"),g.append(M,N,P),u.appendChild(g)}p.appendChild(u);const v=document.createElement("button");v.type="button",v.className="bb-btn-ghost mt-3 w-full",v.textContent=n.openThisMap,v.addEventListener("click",()=>A("map")),p.appendChild(v),i.appendChild(p)}s&&d.length&&requestAnimationFrame(()=>{var c;(c=r.querySelector(".bb-history-row--focus"))==null||c.scrollIntoView({block:"center",behavior:"smooth"})})}function I(e){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}function Je(e,t){var n;const a=S(t.lang);e.innerHTML=`
    <section class="bb-section is-visible bb-premium">
      <div class="mb-3 rounded-full px-5 py-1.5 border border-cyan-400/30 bg-cyan-500/10 text-xs font-bold uppercase tracking-[0.35em] text-cyan-100 text-center bb-type-display">
        ${I(a.premiumBadge)}
      </div>
      <h2 class="bb-page-title bb-page-title--premium neon-cta-title mb-4">
        ${I(a.premiumTitle)}
      </h2>
      <p class="text-slate-200 text-center text-sm leading-relaxed mb-6">${I(a.premiumSub)}</p>
      <ul class="bb-premium-list glass rounded-2xl p-5 mb-6 space-y-3 text-sm text-slate-200">
        ${a.premiumBullets.map(s=>`<li>${I(s)}</li>`).join("")}
      </ul>
      <button type="button" class="bb-btn-premium-buy w-full" id="bb-premium-buy">${I(a.premiumCta)}</button>
    </section>
  `,(n=e.querySelector("#bb-premium-buy"))==null||n.addEventListener("click",()=>{z(),t.tributeUrl&&U(t.tributeUrl)})}function k(e){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}async function Qe(e,t,a,{onProfile:n}={}){const s=S(a.lang),r={variant:a.testVariant||"development",questions:[],answers:{},step:0},i=document.createElement("section");i.className="bb-section is-visible bb-test",e.replaceChildren(i);async function o(){i.innerHTML=`<p class="text-cyan-200/80 text-sm">${k(s.loading)}</p>`;try{const c=await Te(t,r.variant);r.questions=c.questions??[],r.step=0,r.answers={},l()}catch{i.innerHTML=`<p class="bb-error">${k(s.errorLoad)}</p>`}}function d(){i.innerHTML=`
      <div class="bb-test-pick">
        <div class="bb-test-pick__glow" aria-hidden="true"></div>
        <h2 class="bb-page-title bb-page-title--premium neon-zone-title">${k(s.testTitle)}</h2>
        <p class="bb-page-sub text-slate-300/90 text-sm mb-1 leading-relaxed">${k(s.testPickVariant)}</p>
        <div class="bb-test-variant-grid">
          <button type="button" class="bb-btn-hero" data-variant="sexual">
            <span class="bb-btn-hero__badge">${k(s.variantSexBadge)}</span>
            <span class="bb-btn-hero__label">${k(s.variantSex)}</span>
            <span class="bb-btn-hero__hint">${k(s.variantSexHint)}</span>
          </button>
          <button type="button" class="bb-btn-alt" data-variant="development">
            <span class="bb-btn-alt__label">${k(s.variantDev)}</span>
            <span class="bb-btn-alt__hint">${k(s.variantDevHint)}</span>
          </button>
        </div>
      </div>
    `,i.querySelectorAll("[data-variant]").forEach(c=>{c.addEventListener("click",()=>{z(),r.variant=c.getAttribute("data-variant")||"development",o()})})}function l(){const c=r.questions[r.step];if(!c){d();return}const f=r.questions.length,p=(r.step+1)/f*100;i.innerHTML=`
      <div class="bb-test-progress mb-4">
        <div class="flex justify-between text-xs text-cyan-200/80 mb-1">
          <span>${k(s.questionProgress(r.step+1,f))}</span>
          <span>${Math.round(p)}%</span>
        </div>
        <div class="pdf-bar-track"><div class="pdf-bar-gradient pdf-bar-gradient--main" style="clip-path: inset(0 ${(100-p).toFixed(1)}% 0 0)"></div></div>
      </div>
      <h2 class="bb-test-q-title">${k(c.topic)}</h2>
      <p class="text-slate-200 mb-4 leading-relaxed">${k(c.text)}</p>
      <div class="grid gap-2 bb-test-options" id="bb-test-options"></div>
    `;const b=i.querySelector("#bb-test-options");for(const x of c.options??[]){const u=document.createElement("button");u.type="button",u.className="bb-test-option",u.innerHTML=`<span class="bb-test-option-key">${k(x.key)}</span><span>${k(x.label)}</span>`,u.addEventListener("click",()=>w(x.key)),b.appendChild(u)}}async function w(c){z();const f=r.questions[r.step];if(r.answers[f.id]=c,r.step+1<r.questions.length){r.step+=1,l();return}i.innerHTML=`
      <div class="bb-loading">
        <div class="bb-loading__pulse"></div>
        <p class="text-sm text-cyan-200/80">${k(s.computing)}</p>
      </div>`;try{const p={};for(const[x,u]of Object.entries(r.answers))p[String(x)]=u;const b=await Ae(t,{variant:r.variant,answers:p});n&&n(b),A("map")}catch{i.innerHTML=`<p class="bb-error">${k(s.errorLoad)}</p>`}}d()}let $=null,y=null;function Ke(e){const t=document.getElementById("bb-nav");t&&t.querySelectorAll(".bb-nav__btn").forEach(a=>{a.classList.toggle("is-active",a.dataset.route===e)})}function et(e){if(!$)return;const t=e==="en"?"en":"ru";if($.lang===t)return;$.lang=t,document.documentElement.lang=t;const a=S(t),n=document.getElementById("bb-header-wordmark");n&&(n.textContent=a.appBrandName),oe(t)}function D(e){e!=null&&e.lang&&et(e.lang)}function tt(e){var n;if((n=document.querySelector(".bb-premium-fab"))==null||n.remove(),e.paid||!e.tributeUrl)return;const t=S(($==null?void 0:$.lang)||e.lang),a=document.createElement("button");a.type="button",a.className="bb-premium-fab",a.textContent=t.premiumCta,a.addEventListener("click",()=>{z(),A("premium")}),document.body.appendChild(a)}function oe(e){const t=document.getElementById("bb-nav");if(!t)return;const a=S(e);t.hidden=!1,t.innerHTML=`
    <button type="button" class="bb-nav__btn" data-route="map">${a.navMap}</button>
    <button type="button" class="bb-nav__btn" data-route="history">${a.navHistory}</button>
    <button type="button" class="bb-nav__btn" data-route="test">${a.navTest}</button>
    <button type="button" class="bb-nav__btn" data-route="premium">${a.navPremium}</button>
  `,t.querySelectorAll(".bb-nav__btn").forEach(n=>{n.addEventListener("click",()=>{z(),A(n.dataset.route||"map")})})}async function J(e){var r,i;const t=document.getElementById("bb-root");if(!t||!$)return;const a=document.getElementById("bb-header"),n=document.getElementById("bb-nav"),s=e.name==="exercise";if(document.body.classList.toggle("bb-route-exercise",s),a&&(a.hidden=s),n&&(n.hidden=s),s||Ke(e.name),e.name!=="map"&&((r=document.querySelector(".bb-premium-fab"))==null||r.remove()),e.name==="premium"){y||(y=await R($),D(y)),Je(t,y);return}if(e.name==="test"){y||(y=await R($),D(y)),await Qe(t,$,y,{onProfile:o=>{y=o,D(o)}});return}if(e.name==="history"){y||(y=await R($),D(y)),await Ze(t,$,y);return}if(!y){const o=S($.lang);t.innerHTML=`
      <div class="bb-loading">
        <div class="bb-loading__pulse"></div>
        <p class="text-sm text-cyan-200/80">${o.loading}</p>
      </div>`;try{y=await R($),D(y),(i=$.user)!=null&&i.first_name&&!y.userDisplayName&&(y.userDisplayName=[$.user.first_name,$.user.last_name].filter(Boolean).join(" "))}catch(d){const l=(d==null?void 0:d.status)===403?o.notRegistered:(d==null?void 0:d.status)===401?o.authError:o.errorLoad;t.innerHTML=`<p class="bb-error">${l}</p>`;return}}if(e.name==="exercise"){const o=parseInt(e.params.get("id")||"0",10);await Ye(t,$,y,o);return}if(!y.hasMap&&e.name==="map"){A("test");return}Re(t,y,e),tt(y)}async function nt(e){$={...e,lang:"ru"},y=null,document.body.classList.add("bb-app--telegram");const t=document.getElementById("bb-root");if(!t)return;t.classList.add("bb-root--spa");const a=S($.lang),n=document.getElementById("bb-header"),s=document.getElementById("bb-header-wordmark");s&&(s.textContent=a.appBrandName),n&&(n.hidden=!1,n.classList.add("is-visible")),oe($.lang),Ne(i=>{J(i).catch(()=>{})}),Be();const r=Y();window.location.hash?await J(r):A("map")}const Q="/assets/full-glowing-brain-Cl127Rfm.png",at=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 48" fill="none">
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
`,K=.088,ee=15,te=2,ne=.4;function W(e,t,a){return Math.max(t,Math.min(a,e))}function st(){var e,t;return((t=(e=window.matchMedia)==null?void 0:e.call(window,"(prefers-reduced-motion: reduce)"))==null?void 0:t.matches)??!1}function rt(e,t,a){const n=e.getBoundingClientRect(),s=80,r=Math.max(n.width+s*2,1),i=Math.max(n.height+s*2,1),o=n.left+n.width/2,d=n.top+n.height/2;return{nx:W((t-o)/(r*.5),-1,1),ny:W((a-d)/(i*.5),-1,1)}}function it(e){var _,C;if(st())return()=>{};const t=e.querySelector("[data-parallax-brain]"),a=e.querySelector("[data-parallax-glow]");if(!t)return()=>{};let n={nx:0,ny:0},s=!1,r={nx:0,ny:0},i=!1,o=0,d=0,l=0;const w=((C=(_=window.matchMedia)==null?void 0:_.call(window,"(pointer: coarse)"))==null?void 0:C.matches)??!1,c=()=>s?{tx:n.nx,ty:n.ny}:i?{tx:r.nx*.62,ty:r.ny*.62}:{tx:0,ty:0},f=()=>{l=0;const{tx:E,ty:T}=c();o+=(E-o)*K,d+=(T-d)*K;const g=o*ee,M=d*ee,N=d*-te,P=o*te;if(t.style.transform=`translate3d(${g}px, ${M}px, 0) rotateX(${N}deg) rotateY(${P}deg)`,a){const pe=-g*ne,ge=-M*ne;a.style.transform=`translate3d(calc(-50% + ${pe}px), calc(-50% + ${ge}px), 0) scale(1.06)`}const{tx:ce,ty:de}=c(),ue=Math.abs(o-ce)>.003||Math.abs(d-de)>.003,be=Math.abs(o)>.004||Math.abs(d)>.004;(ue||be||i)&&(l=requestAnimationFrame(f))},p=()=>{l||(l=requestAnimationFrame(f))},b=E=>{if(!E.isTrusted)return;const{nx:T,ny:g}=rt(e,E.clientX,E.clientY);n={nx:T,ny:g},s=!0,p()},x=()=>{s=!0},u=()=>{s=!1,p()};e.addEventListener("pointermove",b,{passive:!0}),e.addEventListener("pointerenter",x),e.addEventListener("pointerleave",u),e.addEventListener("pointerdown",()=>{w&&typeof(DeviceOrientationEvent==null?void 0:DeviceOrientationEvent.requestPermission)=="function"&&DeviceOrientationEvent.requestPermission().then(E=>{E==="granted"&&(i=!0)}).catch(()=>{})},{passive:!0});let v=null;return window.DeviceOrientationEvent&&(v=E=>{if(E.gamma==null||E.beta==null)return;const T=W(E.gamma/32,-1,1),g=W((E.beta-44)/36,-1,1);r={nx:T,ny:g},i=!0,p()},window.addEventListener("deviceorientation",v,!0)),t.style.willChange="transform",a&&(a.style.willChange="transform"),p(),()=>{e.removeEventListener("pointermove",b),e.removeEventListener("pointerenter",x),e.removeEventListener("pointerleave",u),v&&window.removeEventListener("deviceorientation",v,!0),l&&cancelAnimationFrame(l),t.style.willChange="",t.style.transform="",a&&(a.style.willChange="",a.style.transform="")}}const ot={root:null,rootMargin:"0px 0px -10% 0px",threshold:.08};function lt(e,{reducedMotion:t}){if(t)return e.querySelectorAll(".bb-landing-reveal").forEach(s=>s.classList.add("is-in-view")),()=>{};const a=e.querySelectorAll(".bb-landing-reveal");if(!a.length)return()=>{};const n=new IntersectionObserver(s=>{for(const r of s)r.isIntersecting&&(r.target.classList.add("is-in-view"),n.unobserve(r.target))},ot);return a.forEach(s=>n.observe(s)),()=>{n.disconnect()}}function h(e){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}const le="bb-landing-lang";function ct(){try{const e=localStorage.getItem(le);if(e==="en"||e==="ru")return e}catch{}return null}function dt(e){document.body.classList.add("bb-lang-gate-open");const t=document.createElement("div");t.className="bb-lang-gate",t.setAttribute("role","dialog"),t.setAttribute("aria-modal","true"),t.setAttribute("aria-labelledby","bb-lang-gate-title"),t.innerHTML=`
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
  `,document.body.appendChild(t);const a=n=>{try{localStorage.setItem(le,n)}catch{}document.body.classList.remove("bb-lang-gate-open"),t.remove(),e(n)};t.querySelectorAll("[data-lang]").forEach(n=>{n.addEventListener("click",()=>a(n.getAttribute("data-lang")||"ru"))}),requestAnimationFrame(()=>{var n;(n=t.querySelector(".bb-lang-gate__btn"))==null||n.focus()})}async function ut(){const e=document.getElementById("bb-header"),t=document.getElementById("bb-nav");e&&(e.hidden=!0),t&&(t.hidden=!0);const a=document.getElementById("bb-root");if(!a)return;const n=ct();if(!n){a.className="bb-root",a.innerHTML="",dt(s=>{ae(s).catch(()=>{})});return}await ae(n)}async function ae(e){const t=S(e);document.documentElement.lang=e;const a=document.getElementById("bb-root");if(!a)return;a.className="bb-root bb-root--landing",a.innerHTML=`
    <div class="bb-loading">
      <div class="bb-loading__pulse"></div>
    </div>`;let n={botUrl:"https://t.me/BRAINBOOSTY?start=site",webappEntryUrl:"https://t.me/BRAINBOOSTY?start=webapp",channelUrl:"https://t.me/androgenautist",hasAuthorPhoto:!1,hasChannelAvatar:!1};try{n={...n,...await ze()}}catch{}const s="/api/webapp/landing/photo",i=n.hasChannelAvatar?'<img class="bb-landing-nav__channel-img" src="/api/webapp/landing/channel-avatar" alt="" width="38" height="38" loading="lazy" />':'<span class="bb-landing-nav__channel-fallback" aria-hidden="true">TG</span>',o=t.landingFeatures.map(b=>`<li>${h(b)}</li>`).join(""),d=window.matchMedia("(prefers-reduced-motion: reduce)").matches;a.innerHTML=`
    <div class="bb-landing">
      <nav class="bb-landing-nav glass bb-landing-reveal bb-landing-reveal--fade-only" aria-label="Menu">
        <a href="#top" class="bb-landing-nav__logo">${at}</a>
        <div class="bb-landing-nav__tail">
          <div class="bb-landing-nav__links">
            <a href="#about">${h(t.landingNavAbout)}</a>
            <a href="#project">${h(t.landingNavProject)}</a>
            <a href="#start" class="bb-landing-nav__cta">${h(t.landingNavCta)}</a>
          </div>
          <div class="bb-landing-nav__extras">
            <a class="bb-landing-nav__channel" href="${h(n.channelUrl)}" target="_blank" rel="noopener noreferrer" aria-label="${h(t.landingChannelAria)}">
              ${i}
            </a>
            <a class="bb-landing-nav__login" href="${h(n.webappEntryUrl)}" rel="noopener noreferrer">${h(t.landingLoginTelegram)}</a>
          </div>
        </div>
      </nav>

      <header id="top" class="bb-landing-hero">
        <div class="bb-landing-hero__visual-anchor">
          <div class="bb-landing-hero__glow" aria-hidden="true" data-parallax-glow></div>
          <div class="bb-landing-hero__brain-layer" data-parallax-brain>
            <img class="bb-landing-hero__brain" src="${Q}" alt="" width="280" height="280" decoding="async" />
          </div>
        </div>
        <div class="bb-landing-hero__copy bb-landing-reveal">
        <p class="bb-landing-kicker">${h(t.landingKicker)}</p>
        <h1 class="bb-landing-title neon-zone-title">${h(t.landingTitle)}</h1>
        <p class="bb-landing-tagline">${h(t.landingTagline)}</p>
        <div class="bb-landing-hero__ctas">
          <a class="bb-landing-cta-primary" href="${h(n.botUrl)}" rel="noopener noreferrer">
            ${h(t.landingCta)}
          </a>
          <a class="bb-landing-cta-secondary" href="${h(n.webappEntryUrl)}" rel="noopener noreferrer">
            ${h(t.landingLoginTelegram)}
          </a>
        </div>
        <p class="bb-landing-cta-sub">${h(t.landingCtaSub)}</p>
        </div>
      </header>

      <section id="about" class="bb-landing-section bb-landing-reveal">
        <h2 class="bb-landing-section__title">${h(t.landingAboutTitle)}</h2>
        <article class="bb-landing-about glass bb-landing-hover-rise">
          <div class="bb-landing-about__photo-wrap">
            <img class="bb-landing-about__photo" src="${s}" alt="" width="320" height="320" loading="lazy" data-fallback-src="${Q}" />
            <div class="bb-landing-about__ring" aria-hidden="true"></div>
          </div>
          <div class="bb-landing-about__text">
            ${t.landingAboutParagraphs.map(b=>`<p>${h(b)}</p>`).join("")}
            <a class="bb-landing-link" href="${h(n.channelUrl)}" target="_blank" rel="noopener noreferrer">
              ${h(t.landingChannelLink)}
            </a>
          </div>
        </article>
      </section>

      <section id="project" class="bb-landing-section bb-landing-reveal">
        <h2 class="bb-landing-section__title">${h(t.landingProjectTitle)}</h2>
        <ul class="bb-landing-features">${o}</ul>
        <p class="bb-landing-disclaimer">${h(t.footer)}</p>
      </section>

      <section id="start" class="bb-landing-section bb-landing-final bb-landing-reveal">
        <div class="glass bb-landing-final__card bb-landing-hover-rise">
          <h2 class="bb-landing-final__title">${h(t.landingFinalTitle)}</h2>
          <p class="bb-landing-final__sub">${h(t.landingFinalSub)}</p>
          <a class="bb-landing-cta-primary bb-landing-cta-primary--lg" href="${h(n.botUrl)}" rel="noopener noreferrer">
            ${h(t.landingCta)}
          </a>
        </div>
      </section>

      <footer class="bb-landing-footer">
        <span>BrainBoosty · Neural Map</span>
      </footer>
    </div>
  `,a.querySelectorAll(".bb-landing-about__photo").forEach(b=>{const x=b.getAttribute("data-fallback-src");x&&b.addEventListener("error",()=>{b.removeAttribute("data-fallback-src"),b.src=x})}),a.querySelectorAll(".bb-landing-nav__channel-img").forEach(b=>{b.addEventListener("error",()=>{const x=b.closest(".bb-landing-nav__channel");x&&(x.innerHTML='<span class="bb-landing-nav__channel-fallback" aria-hidden="true">TG</span>')})}),a.querySelectorAll('a[href^="#"]').forEach(b=>{b.addEventListener("click",x=>{var _;const u=(_=b.getAttribute("href"))==null?void 0:_.slice(1);if(!u)return;const v=document.getElementById(u);v&&(x.preventDefault(),v.scrollIntoView({behavior:"smooth",block:"start"}))})});const l=a.querySelector(".bb-landing"),w=lt(l||a,{reducedMotion:d}),c=a.querySelector(".bb-landing-hero"),f=c?it(c):()=>{},p=()=>{w(),f(),window.removeEventListener("pagehide",p)};window.addEventListener("pagehide",p)}function bt(){var a;const e=(a=window.Telegram)==null?void 0:a.WebApp;return e?(e.initData||"").trim().length>0:!1}const{initData:pt,user:gt,lang:mt}=qe();bt()?nt({initData:pt,user:gt,lang:mt}):ut();
