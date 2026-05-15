(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))n(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const i of r.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&n(i)}).observe(document,{childList:!0,subtree:!0});function a(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(s){if(s.ep)return;s.ep=!0;const r=a(s);fetch(s.href,r)}})();const ye="/assets/full-glowing-brain-Cl127Rfm.png",we="/assets/amygdala-DP7dGDc4.png",$e="/assets/lobes-uZqghd8w.png",Le="/assets/frontal-gyrus-DPq4mhR0.png",Ee="/assets/insula-CAJDukm_.png",ke="/assets/pfc-BE-jJY5g.png",Te="/assets/tpj-Cgg8S5Iu.png",B=["prefrontal_cortex","brain_lobes","insular_cortex","temporoparietal_junction","amygdala","frontal_gyrus"],Se={prefrontal_cortex:ke,brain_lobes:$e,insular_cortex:Ee,temporoparietal_junction:Te,amygdala:we,frontal_gyrus:Le},Ae=ye;function ze(e){const t=B.map(n=>Number(e[n]??0)),a=t.reduce((n,s)=>n+s,0);return Math.round(a/Math.max(t.length,1)*10)/10}const V="bb-site-session",Y="bb-site-user";function Me(e,t){const a={"Content-Type":"application/json"};e&&(a["X-Telegram-Init-Data"]=e);const n=(t||"").trim();return n&&(a.Authorization=`Bearer ${n}`),a}async function P(e,{initData:t="",siteToken:a="",method:n="GET",body:s}={}){const r=await fetch(`/api/webapp${e}`,{method:n,headers:Me(t,a),body:s?JSON.stringify(s):void 0});if(!r.ok){const i=new Error(`HTTP ${r.status}`);i.status=r.status;try{i.detail=(await r.json()).detail}catch{}throw i}return r.json()}function de(e){var s,r;const t=e.lang==="en"?"en":"ru",a={};for(const i of B)a[i]=Number(((s=e.scores)==null?void 0:s[i])??0);const n={};for(const i of B){const o=((r=e.regions)==null?void 0:r[i])??{};n[i]={main:Number(o.main??a[i]),bullets:o.bullets??[],submetrics:(o.submetrics??[]).map(l=>({label:l.label??l.label_ru??"",value:Number(l.value??a[i])}))}}return{lang:t,userDisplayName:e.userDisplayName??e.user_display_name??"Guest",paid:!!e.paid,hasMap:!!(e.hasMap??e.has_map??Object.keys(e.scores||{}).length),testVariant:e.testVariant??e.test_variant??"development",tributeUrl:e.tributeUrl??e.tribute_url??"",neuroScore:e.neuroScore!=null?Number(e.neuroScore):ze(a),scores:a,connectivity:e.connectivity??[],regions:n,snapshotId:e.snapshotId??e.snapshot_id??null,createdAt:e.createdAt??e.created_at??null}}async function Ne(){return P("/landing",{initData:"",siteToken:""})}async function R(e){const t=await P("/profile",{initData:e.initData??"",siteToken:e.siteToken??""});return de(t)}async function Ce(e){return P("/history",{initData:e.initData??"",siteToken:e.siteToken??""})}async function He(e,t="development"){return P(`/test/questions?variant=${encodeURIComponent(t)}`,{initData:e.initData??"",siteToken:e.siteToken??""})}async function Be(e,{variant:t,answers:a}){const n={variant:t,answers:a},s=await P("/test/submit",{initData:e.initData??"",siteToken:e.siteToken??"",method:"POST",body:n});return de(s.profile)}async function qe(e,t){return P(`/exercises/${encodeURIComponent(String(t))}`,{initData:e.initData??"",siteToken:e.siteToken??""})}const Ie={landingKicker:"BrainBoosty · neuroscience, no fluff",landingTitle:"Upgrade your brain — see your Neural Map",landingTagline:"7 questions → a personal 6-zone brain map, NeuroScore, and clear next steps. All in Telegram.",landingCta:"Boost my brain",landingCtaSub:"Free start in the bot · 2 minutes",landingNavAbout:"About me",landingNavProject:"The project",landingNavHub:"Neural Map Hub",landingNavCta:"Open bot",landingHubHeroLink:"Already in BrainBoosty? Open Neural Map Hub",landingHubTitle:"Neural Map Hub",landingHubLead:"Your brain map, test, history, and exercises—in the browser, same account as the bot and Mini App.",landingHubHint:"Finish the bot questionnaire first—without a profile, sign-in won’t work.",landingLoginTelegram:"Log in with Telegram",landingChannelAria:"Telegram channel",landingAboutTitle:"About me",landingAboutParagraphs:["Hi, I'm @androgenautist — creator of BrainBoosty.","I went from anxiety, brain fog, and tension to clarity, inner strength, and confidence. Now I help others with neurobiology, hormones, and cognitive habits.","On my channel I share actionable insights—no marketing noise, only what actually shifts your state."],landingChannelLink:"→ Channel @androgenautist",landingProjectTitle:"What's inside",landingFeatures:["7-question cognitive test — development or sexual profile","Neural Map: 6 brain zones with NeuroScore and recommendations","Progress history and test-to-test comparison","Daily hooks and a private exercise channel"],landingFinalTitle:"Ready to see your map?",landingFinalSub:"Open the bot — onboarding takes a few minutes; your first map is free.",heroBrain:"NEURAL MAP",scoreLabel:"NeuroScore",coverLine:"Six zones · one profile. Numbers, focus, and a clear read—no clutter.",connectivityTitle:"Inter-region links (educational model)",zoneLevel:"Integrated zone level",progressMain:e=>`Your progress ${e}%`,recTitle:"Why this zone is your biggest pleasure lever",footer:"BrainBoosty · educational model · not a medical diagnosis",premiumCta:"Get full access",premiumBadge:"Full access",premiumTitle:"Get full access — today",premiumSub:"A 30-day personal plan, progress tracker, exercises for your profile, and the private channel.",premiumBullets:["Full brain map and all zone recommendations","Progress history with test comparisons","Retests and trend tracking","Private channel and daily hooks"],navMap:"Map",navHistory:"History",navTest:"Test",navPremium:"Access",navLogout:"Log out",appBrandName:"BrainBoosty",appHeaderTitle:"Neural Map",loading:"Loading your neuro profile…",computing:"Computing your brain map…",errorLoad:"Could not load data. Please try again later.",authError:"Open the app from the Telegram bot.",notRegistered:"Complete the bot questionnaire first (/start).",historyTitle:"Progress history",historySub:"Zone comparison across tests. Arrows show percentage-point change.",historyEmpty:"No saved tests yet. Take your first test to see history here.",startTest:"Take the test",latest:"Latest",openThisMap:"Open map",testTitle:"Cognitive test",testPickVariant:"Choose question style (7 steps):",variantDev:"Development & cognition",variantSex:"Sexual profile",variantSexBadge:"Maximum insight",variantSexHint:"Pleasure, drive, and your neural edge",variantDevHint:"Focus, habits, and cognitive style",questionProgress:(e,t)=>`Question ${e} of ${t}`,regions:{prefrontal_cortex:"Prefrontal cortex",brain_lobes:"Brain lobes · imagery",insular_cortex:"Insular cortex",temporoparietal_junction:"Temporoparietal junction",amygdala:"Amygdala",frontal_gyrus:"Frontal gyrus"},interactiveBrainKicker:"Zone",zoneIllustrationOpenAria:"open zone card",zoneDrawerCloseAria:"Close",zoneCurrentLevel:"Current level",zoneWhyTitle:"Why it matters",zoneBoostCta:"Boost this zone",zoneUnlockNote:"Full access unlocks personal drills per zone, progress tracking, and training history.",zoneOpenHistory:"History for this zone",zoneExercisesHeading:"Zone exercises",zoneExerciseListCap:"In your program for this zone:",zoneExercisePlaceholder:"More protocols are on the way — your full access already includes the base track.",zonePaidHint:"More protocols and metrics tailored to your profile are coming next.",zoneReadMoreDetail:"Full zone breakdown below in the feed",zoneWhy:{prefrontal_cortex:"Planning, impulse control, and focus. A stronger PFC means clearer decisions and fewer spirals.",brain_lobes:"Integrates imagery, language, and space. Balance here improves how you read reality and old patterns.",insular_cortex:"Interoception and emotional regulation — the bridge between body state and action.",temporoparietal_junction:"Perspective, attention, and social context — helps you update stories instead of locking in one view.",amygdala:"Threat and reward signaling. Tuning it reduces false alarms while keeping healthy drive.",frontal_gyrus:"Links effort, intention, and follow-through — trained with sequenced action and repetition."},zoneExercises:{prefrontal_cortex:[{title:"90-second stop frame",body:"Before an impulsive reply, state one value and one tiny next step out loud."}],brain_lobes:[{title:"Sensory anchor",body:"For 30s describe one object: color, texture, sound — no judgments."}],insular_cortex:[{title:"Rib-cage breath",body:"4 cycles: inhale 4 counts, soft pause, exhale 6 — attention on rib expansion.",exerciseId:1}],temporoparietal_junction:[{title:"Perspective swap",body:"Phrase the same situation two neutral ways — without «I'm right» framing."}],amygdala:[{title:"Tolerance window",body:"2 min: note 3 neutral facts around a trigger, then one action 2% softer."}],frontal_gyrus:[{title:"Three-step chain",body:"Write three micro-steps for one goal today; track completion only."}]},exerciseLoading:"Loading protocol…",exerciseNotFound:"Exercise not found.",exerciseBackAria:"Back",exerciseTagForWho:"For who",exerciseTagEfficiency:"Effectiveness",exerciseTagFirstResult:"First results",exerciseDifficulty:"Difficulty",exerciseFirstResultDays:e=>`~${e} days`,exerciseEfficiencyLabels:["Low","Moderate","High","Exceptional","Best for this region"],exerciseAccInstruction:"Instruction",exerciseAccResearch:"Research",exerciseAccAmplify:"How to amplify",exerciseAccResults:"Expected outcomes",exerciseNoResearch:"Links will appear here soon.",exerciseCtaPrimary:"Add to my training plan",exerciseCtaMessage:"Sync with your bot plan is coming soon. For now, block time on your calendar and log completion.",exercisePremiumTitle:"Full access",exercisePremiumText:"Channel exercises are available with BrainBoosty full access.",zoneOpenFullExercise:"Open full exercise"},ue={landingKicker:"BrainBoosty · нейробиология без воды",landingTitle:"Прокачай мозг — увидь свою Neural Map",landingTagline:"7 вопросов → персональная карта из 6 зон мозга, NeuroScore и понятные шаги. Всё в Telegram.",landingCta:"Прокачать мозг",landingCtaSub:"Бесплатный старт в боте · 2 минуты",landingNavAbout:"Обо мне",landingNavProject:"Проект",landingNavHub:"Neural Map Hub",landingNavCta:"В бота",landingHubHeroLink:"Уже в BrainBoosty? Войти в Neural Map Hub",landingHubTitle:"Neural Map Hub",landingHubLead:"Карта мозга, тест, история и упражнения — в браузере, тот же аккаунт, что в боте и мини-приложении.",landingHubHint:"Сначала пройди анкету в боте — без профиля вход не откроется.",landingLoginTelegram:"Войти через Telegram",landingChannelAria:"Канал в Telegram",landingAboutTitle:"Обо мне",landingAboutParagraphs:["Привет, я @androgenautist — автор BrainBoosty.","Сам прошёл путь от тревожности, тумана в голове и зажатости — к ясности, внутренней силе и уверенности. Сейчас помогаю другим по нейробиологии, гормонам и когнитивным привычкам.","В канале делюсь рабочими инсайтами без маркетинговой шелухи — только то, что реально меняет состояние."],landingChannelLink:"→ Канал @androgenautist",landingProjectTitle:"Что внутри",landingFeatures:["Когнитивный тест из 7 вопросов — два стиля (развитие / сексуальный профиль)","Neural Map: 6 зон мозга с NeuroScore и рекомендациями","История прогресса и сравнение между тестами","Ежедневные хуки и закрытый канал с упражнениями"],landingFinalTitle:"Готов увидеть свою карту?",landingFinalSub:"Открой бота — анкета займёт пару минут, первая карта бесплатно.",heroBrain:"NEURAL MAP",scoreLabel:"NeuroScore",coverLine:"Шесть зон · один профиль. Цифры, акценты и ясная картина без лишнего шума.",connectivityTitle:"Связность зон (образовательная модель)",zoneLevel:"Интегральный уровень зоны",progressMain:e=>`Твой прогресс ${e}%`,recTitle:"Почему эта зона — твой главный рычаг удовольствия",footer:"BrainBoosty · образовательная модель · не медицинский диагноз",premiumCta:"Забрать полный доступ",premiumBadge:"Полный доступ",premiumTitle:"Забери полный доступ — сегодня",premiumSub:"Персональный план на 30 дней, трекер прогресса, упражнения под твой профиль и закрытый канал.",premiumBullets:["Полная карта мозга и все рекомендации по зонам","История прогресса с сравнением тестов","Повторные тесты и отслеживание динамики","Закрытый канал и ежедневные хуки"],navMap:"Карта",navHistory:"История",navTest:"Тест",navPremium:"Доступ",navLogout:"Выйти",appBrandName:"BrainBoosty",appHeaderTitle:"Neural Map",loading:"Загружаем нейропрофиль…",computing:"Считаем твою карту мозга…",errorLoad:"Не удалось загрузить данные. Попробуйте позже.",authError:"Откройте приложение из Telegram-бота.",notRegistered:"Сначала пройдите анкету в боте (/start).",historyTitle:"История прогресса",historySub:"Сравнение зон между прохождениями. Стрелки — изменение в процентных пунктах.",historyEmpty:"Пока нет сохранённых тестов. Пройдите первый тест — и здесь появится история.",startTest:"Пройти тест",latest:"Актуально",openThisMap:"Открыть карту",testTitle:"Когнитивный тест",testPickVariant:"Выберите стиль вопросов (7 шагов):",variantDev:"Развитие и когниция",variantSex:"Сексуальный профиль",variantSexBadge:"Максимум инсайта",variantSexHint:"Удовольствие, драйв и нейронный рельеф",variantDevHint:"Фокус, привычки и когнитивный стиль",questionProgress:(e,t)=>`Вопрос ${e} из ${t}`,regions:{prefrontal_cortex:"Префронтальная кора",brain_lobes:"Доли мозга · образы",insular_cortex:"Островковая кора",temporoparietal_junction:"Височно-теменной узел",amygdala:"Амигдала",frontal_gyrus:"Лобная извилина"},interactiveBrainKicker:"Зона",zoneIllustrationOpenAria:"открыть карточку зоны",zoneDrawerCloseAria:"Закрыть",zoneCurrentLevel:"Текущий уровень",zoneWhyTitle:"Почему это важно",zoneBoostCta:"Прокачать эту зону",zoneUnlockNote:"Полный доступ открывает персональные упражнения под каждую зону, трекер и историю прокачки.",zoneOpenHistory:"История этой зоны",zoneExercisesHeading:"Упражнения для зоны",zoneExerciseListCap:"Сейчас в программе для этой зоны:",zoneExercisePlaceholder:"Скоро добавим ещё шаги — уже доступен базовый протокол в полном доступе.",zonePaidHint:"Дальше — больше протоколов и метрик именно под твой профиль.",zoneReadMoreDetail:"Подробный разбор зоны в ленте ниже",zoneWhy:{prefrontal_cortex:"Планирование, торможение импульсов и фокус. Сильная ПФК — ясные решения, меньше хаоса и откатов.",brain_lobes:"Интеграция образов, языка и пространства. Баланс здесь — лучшее восприятие реальности и выученные паттерны.",insular_cortex:"Телесная осознанность и эмоциональная регуляция. Островок связывает «что чувствую» с «что делаю».",temporoparietal_junction:"Перспектива, внимание и социальный контекст. TPJ помогает не застревать в одной интерпретации событий.",amygdala:"Детектор угроз и сигналов награды. Настрой амигдалы — меньше ложной тревоги, больше спокойного драйва.",frontal_gyrus:"Связь моторики, намерения и усилия. Тренируется через последовательные действия и повторение цели."},zoneExercises:{prefrontal_cortex:[{title:"90 секунд «стоп-рамка»",body:"Перед импульсивным ответом назови вслух одну ценность и одно следующее маленькое действие."}],brain_lobes:[{title:"Сенсорный якорь",body:"30 секунд описывай предмет из комнаты: цвет, фактура, звук — без оценок."}],insular_cortex:[{title:"Дыхание в ребро",body:"4 цикла: вдох 4 счёта, мягкая пауза, выдох 6 — внимание на расширении рёбер.",exerciseId:1}],temporoparietal_junction:[{title:"Смена ракурса",body:"Сформулируй ту же ситуацию двумя нейтральными формулировками, без «я прав»."}],amygdala:[{title:"Окно толерантности",body:"2 минуты: найди 3 нейтральных факта вокруг триггера, затем одно действие на 2% мягче."}],frontal_gyrus:[{title:"Цепочка на 3 шага",body:"Запиши три микрошага к одной цели на сегодня; отмечай только факт выполнения."}]},exerciseLoading:"Загружаем протокол…",exerciseNotFound:"Упражнение не найдено.",exerciseBackAria:"Назад",exerciseTagForWho:"Для кого",exerciseTagEfficiency:"Эффективность",exerciseTagFirstResult:"Первый результат",exerciseDifficulty:"Сложность",exerciseFirstResultDays:e=>`ориентир ≈ ${e} дн.`,exerciseEfficiencyLabels:["Низкая","Средняя","Высокая","Чрезвычайная","Оптимально для отдела"],exerciseAccInstruction:"Инструкция",exerciseAccResearch:"Исследования",exerciseAccAmplify:"Как усилить эффект",exerciseAccResults:"Ожидаемые результаты",exerciseNoResearch:"Ссылки будут добавлены.",exerciseCtaPrimary:"Добавить в мой план прокачки",exerciseCtaMessage:"Скоро здесь будет синхронизация с твоим планом в боте. Пока закрепи время в календаре и отметь выполнение в заметках.",exercisePremiumTitle:"Полный доступ",exercisePremiumText:"Экран упражнений из закрытого канала доступен с подпиской BrainBoosty.",zoneOpenFullExercise:"Полный экран упражнения"},Pe={ru:ue,en:Ie};function M(e){return Pe[e==="en"?"en":"ru"]??ue}const X=new Set;function Z(){const e=(window.location.hash||"#map").replace(/^#/,""),[t,a]=e.split("?");return{name:t||"map",params:new URLSearchParams(a||"")}}function z(e,t={}){var n;const a=((n=t.toString)==null?void 0:n.call(t))||new URLSearchParams(t).toString();window.location.hash=a?`${e}?${a}`:e}function Fe(e){return X.add(e),()=>X.delete(e)}function be(){const e=Z();for(const t of X)t(e)}window.addEventListener("hashchange",be);function De(){be()}function Re(){var n,s,r;const e=(n=window.Telegram)==null?void 0:n.WebApp;if(!e)return{tg:null,initData:"",user:null,lang:"ru"};e.ready(),e.expand(),e.enableClosingConfirmation(),e.disableVerticalSwipes&&e.disableVerticalSwipes(),Q(),e.onEvent("themeChanged",Q);const t=((s=e.initDataUnsafe)==null?void 0:s.user)??null,a=(t==null?void 0:t.language_code)==="en"||(r=t==null?void 0:t.language_code)!=null&&r.startsWith("en")?"en":"ru";return e.setHeaderColor&&e.setHeaderColor("#010108"),e.setBackgroundColor&&e.setBackgroundColor("#010108"),{tg:e,initData:e.initData||"",user:t,lang:a}}function Q(){const e=document.documentElement;e.style.setProperty("--bb-tg-bg","#010108"),e.style.setProperty("--bb-tg-text","#f1f5f9")}function W(e){var a;const t=(a=window.Telegram)==null?void 0:a.WebApp;if(t!=null&&t.openTelegramLink&&e.includes("t.me/")){t.openTelegramLink(e);return}if(t!=null&&t.openLink){t.openLink(e);return}window.open(e,"_blank","noopener,noreferrer")}function T(){var e,t,a,n;(n=(a=(t=(e=window.Telegram)==null?void 0:e.WebApp)==null?void 0:t.HapticFeedback)==null?void 0:a.impactOccurred)==null||n.call(a,"light")}function E(e){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}function Oe(){return`
    <div class="bb-zone-drawer__bar-track">
      <div class="bb-zone-drawer__bar-fill" style="width: 0%"></div>
    </div>`}function je(e,t,a={}){var d,f,x,A,v,k;const n=M(e.lang),s=n.regions[t]??t,r=((d=n.zoneWhy)==null?void 0:d[t])??"",i=Number(((f=e.scores)==null?void 0:f[t])??0).toFixed(1),o=((x=n.zoneExercises)==null?void 0:x[t])??[],l=o.length>0?o.map(g=>`
                  <li class="bb-zone-drawer__exercise">
                    <p class="bb-zone-drawer__exercise-title">${E(g.title)}</p>
                    <p class="bb-zone-drawer__exercise-body">${E(g.body)}</p>
                    ${g.exerciseId!=null?`<button type="button" class="bb-zone-drawer__ex-open" data-open-exercise="${Number(g.exerciseId)}">${E(n.zoneOpenFullExercise)}</button>`:""}
                  </li>`).join(""):`<li class="bb-zone-drawer__exercise"><p class="bb-zone-drawer__exercise-body">${E(n.zoneExercisePlaceholder)}</p></li>`,c=document.createElement("div");c.className="bb-zone-drawer-host",c.innerHTML=`
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
          ${Oe()}
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
                ${l}
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
  `,document.body.appendChild(c),document.body.classList.add("bb-zone-drawer-open");const L=c.querySelector(".bb-zone-drawer"),b=c.querySelector("[data-exercises]"),y=c.querySelector(".bb-zone-drawer-backdrop"),p=c.querySelector(".bb-zone-drawer__bar-fill"),w=()=>{var g;document.removeEventListener("keydown",u),document.body.classList.remove("bb-zone-drawer-open"),c.remove(),(g=a.onClose)==null||g.call(a)},u=g=>{g.key==="Escape"&&w()};return document.addEventListener("keydown",u),c.querySelectorAll("[data-close]").forEach(g=>{g.addEventListener("click",()=>{T(),w()})}),(A=c.querySelector('[data-go="boost"]'))==null||A.addEventListener("click",()=>{T(),e.tributeUrl?W(e.tributeUrl):z("premium"),w()}),(v=c.querySelector('[data-go="history"]'))==null||v.addEventListener("click",()=>{T(),z("history",{zone:t}),w()}),(k=c.querySelector('[data-toggle="exercises"]'))==null||k.addEventListener("click",()=>{if(T(),!b)return;b.hasAttribute("hidden")?b.removeAttribute("hidden"):b.setAttribute("hidden","")}),c.querySelectorAll("[data-scroll-zone]").forEach(g=>{g.addEventListener("click",()=>{T();const N=g.getAttribute("data-scroll-zone")||t;w(),requestAnimationFrame(()=>{var C;(C=document.getElementById(`zone-${N}`))==null||C.scrollIntoView({behavior:"smooth",block:"start"})})})}),c.querySelectorAll("[data-open-exercise]").forEach(g=>{g.addEventListener("click",()=>{T();const N=g.getAttribute("data-open-exercise")||"1";w(),z("exercise",{id:N})})}),requestAnimationFrame(()=>{if(L==null||L.classList.add("is-open"),y==null||y.classList.add("is-open"),p){const g=Math.max(0,Math.min(100,Number(i)||0));p.style.width="0%",requestAnimationFrame(()=>{p.style.width=`${g.toFixed(1)}%`})}}),{close:()=>{w()}}}function H(e){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}function Ue(e,{displayName:t,neuroScore:a,connectivity:n}){const s=(n==null?void 0:n.length)>0?`
    <div class="bb-connectivity glass rounded-2xl p-4 mt-5">
      <p class="bb-connectivity__title">${H(e.connectivityTitle)}</p>
      ${n.map(r=>`<p>• ${H(r)}</p>`).join(`
      `)}
    </div>`:"";return`
<section class="bb-section bb-cover" data-section="cover">
  <img src="${Ae}" alt="" class="cover-full-brain-hero mb-4" width="360" height="260" decoding="async" />
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
    ${s}
  </div>
  <p class="text-center text-[11px] text-slate-500 mt-6">${H(e.footer)}</p>
</section>`}function K({label:e,value:t,glow:a=!1}){const n=Math.max(0,Math.min(100,Number(t)||0)),s=Math.max(0,100-n),r=a?"pdf-bar-gradient pdf-bar-gradient--main":"pdf-bar-gradient pdf-bar-gradient--sub",i=We(e);return[`<div class="mb-3.5" data-bar-value="${n}">`,'<div class="flex justify-between text-xs text-slate-400 mb-1">',`<span>${i}</span>`,`<span class="text-cyan-100 font-bold tracking-wide">${n.toFixed(1)}%</span>`,"</div>",'<div class="pdf-bar-track">',`<div class="${r}" style="clip-path: inset(0 ${s.toFixed(2)}% 0 0);"></div>`,"</div>","</div>"].join(`
  `)}function We(e){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}function I(e){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}function Ge(e,t,a){const n=e.regions[t]??t,s=Se[t],r=Number(a.main??0),i=e.progressMain(`${r.toFixed(1)}`),o=[K({label:e.zoneLevel,value:r,glow:!0}),...(a.submetrics??[]).map(c=>K({label:c.label,value:c.value,glow:!1}))].join(`
`),l=(a.bullets??[]).map(c=>`<li>${I(c)}</li>`).join(`
        `);return`
<section class="bb-section bb-region" data-section="region" data-region="${t}" id="zone-${t}">
  <button type="button" class="bb-region__illu-hit" data-open-zone="${t}" aria-label="${I(n)} — ${I(e.zoneIllustrationOpenAria)}">
    <img src="${s}" alt="" class="brain-float-top bb-region__illu" width="320" height="220" loading="lazy" decoding="async" />
  </button>
  <h2 class="bb-region__title neon-zone-title px-2">${I(n)}</h2>
  <p class="bb-region__progress-label">${I(i)}</p>
  <div class="glass rounded-2xl p-4 max-w-xl mx-auto w-full">
    ${o}
  </div>
  <div class="glass rounded-2xl p-4 mt-4 max-w-xl mx-auto w-full">
    <p class="bb-rec-title">${I(e.recTitle)}</p>
    <ul class="bb-rec-list">
        ${l}
    </ul>
  </div>
</section>`}function Ve(e,t,a){const n=M(t.lang),s=t.userDisplayName||(t.lang==="en"?"Guest":"Гость"),r=[Ue(n,{displayName:s,neuroScore:t.neuroScore,connectivity:t.connectivity}),...B.map(i=>{var o,l;return Ge(n,i,{main:t.scores[i],bullets:((o=t.regions[i])==null?void 0:o.bullets)??[],submetrics:((l=t.regions[i])==null?void 0:l.submetrics)??[]})})];e.innerHTML=r.join(`
`),Je(e),Xe(e),Ze(e),Ye(e,t,a)}function Ye(e,t,a){var o,l;const n=e.querySelectorAll("[data-open-zone]");if(!n.length)return;const s=c=>{e.querySelectorAll(".bb-region").forEach(L=>{const b=L.dataset.region;L.classList.toggle("is-zone-hot",!!c&&b===c)})},r=c=>{!c||!B.includes(c)||(s(c),je(t,c,{onClose:()=>s(null)}))};n.forEach(c=>{c.addEventListener("pointerenter",()=>s(c.getAttribute("data-open-zone")||"")),c.addEventListener("pointerleave",L=>{const b=L.relatedTarget;b instanceof Node&&e.contains(b)&&b.closest("[data-open-zone]")||s(null)}),c.addEventListener("click",L=>{L.preventDefault();const b=c.getAttribute("data-open-zone");b&&(T(),r(b))})});const i=(l=(o=a==null?void 0:a.params)==null?void 0:o.get)==null?void 0:l.call(o,"zone");i&&B.includes(i)&&requestAnimationFrame(()=>r(i))}function Je(e){const t=e.querySelectorAll(".bb-section"),a=new IntersectionObserver(n=>{for(const s of n)s.isIntersecting&&(s.target.classList.add("is-visible"),a.unobserve(s.target))},{root:null,rootMargin:"0px 0px -8% 0px",threshold:.08});t.forEach(n=>a.observe(n))}function Xe(e){const t=e.querySelector("[data-neuro-score]");if(!t)return;const a=parseFloat(t.textContent||"0"),n=1200,s=performance.now(),r=i=>{const o=Math.min(1,(i-s)/n),l=1-(1-o)**3;t.textContent=(a*l).toFixed(1),o<1&&requestAnimationFrame(r)};requestAnimationFrame(r)}function Ze(e){const t=e.querySelectorAll("[data-bar-value]"),a=new IntersectionObserver(n=>{for(const s of n){if(!s.isIntersecting)continue;const r=s.target,i=parseFloat(r.getAttribute("data-bar-value")||"0"),o=r.querySelector(".pdf-bar-gradient");o&&(o.style.clipPath="inset(0 100% 0 0)",requestAnimationFrame(()=>{o.style.clipPath=`inset(0 ${Math.max(0,100-i).toFixed(2)}% 0 0)`})),a.unobserve(r)}},{threshold:.2});t.forEach(n=>a.observe(n))}function h(e){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}function Qe(){return{instruction:'<svg class="ex-ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.25" aria-hidden="true"><path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01"/></svg>',research:'<svg class="ex-ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.25" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3M11 8v6M8 11h6"/></svg>',amplify:'<svg class="ex-ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.25" aria-hidden="true"><path d="M12 3l1.8 5.5h5.7l-4.6 3.4 1.8 5.5-4.7-3.4-4.7 3.4 1.8-5.5-4.6-3.4h5.7L12 3z"/></svg>',results:'<svg class="ex-ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.25" aria-hidden="true"><path d="M4 19V5M9 19v-6M14 19V9M19 19v-9"/><path d="M4 19h16" stroke-linecap="round"/></svg>'}}function J(e){return String(e||"").split(`
`).map(a=>`<p>${h(a)}</p>`).join("")}function Ke(e){e.querySelectorAll(".ex-acc").forEach(t=>{const a=t.querySelector(".ex-acc__trigger");a&&a.addEventListener("click",()=>{const s=!(t.getAttribute("data-open")==="true");t.setAttribute("data-open",String(s)),a.setAttribute("aria-expanded",String(s)),T()})})}function O(e){requestAnimationFrame(()=>{var t;(t=e.querySelector(".ex-lux"))==null||t.classList.add("is-visible")})}async function et(e,t,a,n){var w,u;const s=M(a.lang),r=Qe();e.className="bb-root bb-root--spa bb-root--exercise",e.innerHTML=`
    <div class="ex-lux">
      <div class="ex-lux__grid-bg" aria-hidden="true"></div>
      <header class="ex-lux__top">
        <button type="button" class="ex-lux__back" id="ex-back" aria-label="${h(s.exerciseBackAria)}">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M15 6l-6 6 6 6"/></svg>
        </button>
      </header>
      <div class="ex-lux__scroll">
        <div class="ex-lux__inner">
          <div class="ex-lux__loading">
            <div class="ex-lux__pulse"></div>
            <p>${h(s.exerciseLoading)}</p>
          </div>
        </div>
      </div>
      <div class="ex-lux__cta-bar">
        <button type="button" class="ex-lux__cta" id="ex-cta">${h(s.exerciseCtaPrimary)}</button>
      </div>
    </div>`;const i=e.querySelector("#ex-back");if(i==null||i.addEventListener("click",()=>{T(),z("map")}),!Number.isFinite(n)||n<1){const d=e.querySelector(".ex-lux__scroll .ex-lux__inner");d&&(d.innerHTML=`<p class="ex-lux__err">${h(s.exerciseNotFound)}</p>`),O(e);return}if(!a.paid){e.querySelector(".ex-lux__scroll .ex-lux__inner").innerHTML=`
      <div class="ex-lux__hero">
        <p class="ex-lux__lock-title">${h(s.exercisePremiumTitle)}</p>
        <p class="ex-lux__lock-text">${h(s.exercisePremiumText)}</p>
        <button type="button" class="ex-lux__cta ex-lux__cta--inline" id="ex-unlock">${h(s.premiumCta)}</button>
      </div>`,(w=e.querySelector("#ex-unlock"))==null||w.addEventListener("click",()=>{T(),a.tributeUrl?W(a.tributeUrl):z("premium")}),e.querySelector("#ex-cta").textContent=s.premiumCta,(u=e.querySelector("#ex-cta"))==null||u.addEventListener("click",()=>{T(),a.tributeUrl?W(a.tributeUrl):z("premium")}),O(e);return}let o;try{o=await qe(t,n)}catch(d){const f=e.querySelector(".ex-lux__scroll .ex-lux__inner"),x=(d==null?void 0:d.status)===403?s.exercisePremiumTitle:(d==null?void 0:d.status)===404?s.exerciseNotFound:s.errorLoad;f&&(f.innerHTML=`<p class="ex-lux__err">${h(x)}</p>`),O(e);return}const l=Math.max(0,Math.min(4,(o.effectiveness||3)-1)),c=s.exerciseEfficiencyLabels[l]??"—",L=(o.regions||[]).map(d=>`<span class="ex-lux__pill">${h(s.regions[d]??d)}</span>`).join(""),b=(o.researchLinks||[]).map(d=>`<a class="ex-lux__link" href="${h(d.url)}" target="_blank" rel="noopener noreferrer">${h(d.label||d.url)}</a>`).join(""),y=o.instructionImageUrl?`<figure class="ex-lux__figure"><img src="${h(o.instructionImageUrl)}" alt="" loading="lazy" decoding="async" /></figure>`:"";e.querySelector(".ex-lux__scroll .ex-lux__inner").innerHTML=`
    <div class="ex-lux__hero">
      <div class="ex-lux__emoji" aria-hidden="true">${h(o.emoji||"◆")}</div>
      <h1 class="ex-lux__title">${h(o.title)}</h1>
      <p class="ex-lux__lede">${h(o.shortDescription)}</p>
      <div class="ex-lux__tags">
        <span class="ex-lux__tag"><span class="ex-lux__tag-k">${h(s.exerciseTagForWho)}</span>${h(o.forWho)}</span>
        <span class="ex-lux__tag"><span class="ex-lux__tag-k">${h(s.exerciseTagEfficiency)}</span>${h(c)}</span>
        <span class="ex-lux__tag"><span class="ex-lux__tag-k">${h(s.exerciseTagFirstResult)}</span>${h(s.exerciseFirstResultDays(o.firstResultDays))}</span>
      </div>
      <div class="ex-lux__meta-row">
        <div class="ex-lux__diff">
          <span class="ex-lux__diff-label">${h(s.exerciseDifficulty)}</span>
          <div class="ex-lux__diff-track"><span class="ex-lux__diff-fill" style="width: ${Number(o.difficulty||0)}%"></span></div>
          <span class="ex-lux__diff-num">${h(Number(o.difficulty||0))}</span>
        </div>
      </div>
      <div class="ex-lux__pills">${L}</div>
      ${y}
    </div>

    <div class="ex-lux__accords">
      <div class="ex-acc" data-open="true">
        <button type="button" class="ex-acc__trigger" aria-expanded="true">
          <span class="ex-acc__ic">${r.instruction}</span>
          <span class="ex-acc__label">${h(s.exerciseAccInstruction)}</span>
          <span class="ex-acc__chev" aria-hidden="true"></span>
        </button>
        <div class="ex-acc__panel">
          <div class="ex-acc__panel-inner ex-lux__prose">${J(o.instruction)}</div>
        </div>
      </div>
      <div class="ex-acc" data-open="false">
        <button type="button" class="ex-acc__trigger" aria-expanded="false">
          <span class="ex-acc__ic">${r.research}</span>
          <span class="ex-acc__label">${h(s.exerciseAccResearch)}</span>
          <span class="ex-acc__chev" aria-hidden="true"></span>
        </button>
        <div class="ex-acc__panel">
          <div class="ex-acc__panel-inner ex-lux__prose ex-lux__links">${b||`<p>${h(s.exerciseNoResearch)}</p>`}</div>
        </div>
      </div>
      <div class="ex-acc" data-open="false">
        <button type="button" class="ex-acc__trigger" aria-expanded="false">
          <span class="ex-acc__ic">${r.amplify}</span>
          <span class="ex-acc__label">${h(s.exerciseAccAmplify)}</span>
          <span class="ex-acc__chev" aria-hidden="true"></span>
        </button>
        <div class="ex-acc__panel">
          <div class="ex-acc__panel-inner ex-lux__prose">${J(o.amplify)}</div>
        </div>
      </div>
      <div class="ex-acc" data-open="false">
        <button type="button" class="ex-acc__trigger" aria-expanded="false">
          <span class="ex-acc__ic">${r.results}</span>
          <span class="ex-acc__label">${h(s.exerciseAccResults)}</span>
          <span class="ex-acc__chev" aria-hidden="true"></span>
        </button>
        <div class="ex-acc__panel">
          <div class="ex-acc__panel-inner ex-lux__prose">${J(o.expectedResults)}</div>
        </div>
      </div>
    </div>
    <div class="ex-lux__scroll-pad"></div>`,Ke(e);const p=e.querySelector("#ex-cta");p==null||p.addEventListener("click",()=>{var d,f,x;T(),(x=(f=(d=window.Telegram)==null?void 0:d.WebApp)==null?void 0:f.showAlert)==null||x.call(f,s.exerciseCtaMessage)}),O(e)}function j(e){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}function tt(e,t){if(!e)return"—";try{return new Date(e).toLocaleString(t==="en"?"en-GB":"ru-RU",{day:"2-digit",month:"short",year:"numeric",hour:"2-digit",minute:"2-digit"})}catch{return e}}async function nt(e,t,a){var c,L;const n=M(a.lang),s=Z().params.get("zone"),r=document.createElement("section");r.className="bb-section is-visible bb-history",r.innerHTML=`
    <h2 class="bb-page-title bb-page-title--premium neon-zone-title">${j(n.historyTitle)}</h2>
    <p class="bb-page-sub text-slate-300/90 text-sm mb-4">${j(n.historySub)}</p>
  `;const i=document.createElement("div");i.className="space-y-3",i.textContent=n.loading,r.appendChild(i),e.replaceChildren(r);let o;try{o=await Ce(t)}catch{i.innerHTML=`<p class="bb-error">${j(n.errorLoad)}</p>`;return}const l=o.items??[];if(i.replaceChildren(),!l.length){const b=document.createElement("div");b.className="glass rounded-2xl p-5 text-center";const y=document.createElement("p");y.className="text-slate-200 mb-4",y.textContent=n.historyEmpty;const p=document.createElement("button");p.type="button",p.className="bb-btn-primary",p.textContent=n.startTest,p.addEventListener("click",()=>z("test")),b.append(y,p),i.appendChild(b);return}for(const[b,y]of l.entries()){const p=document.createElement("article");p.className=`glass rounded-2xl p-4 bb-history-card${b===0?" is-active":""}`;const w=document.createElement("div");w.className="flex justify-between items-start gap-2 mb-2";const u=document.createElement("div");if(u.innerHTML=`
      <p class="text-xs text-cyan-200/80 uppercase tracking-wide">${j(tt(y.createdAt,a.lang))}</p>
      <p class="text-lg font-bold text-white mt-1 bb-type-display">NeuroScore <span class="text-cyan-200">${Number(y.neuroScore).toFixed(1)}</span></p>
    `,w.appendChild(u),b===0){const x=document.createElement("span");x.className="bb-badge",x.textContent=n.latest,w.appendChild(x)}p.appendChild(w);const d=document.createElement("div");d.className="bb-history-deltas";for(const x of B){const A=n.regions[x]??x,v=Number(((c=y.scores)==null?void 0:c[x])??0).toFixed(1),k=y.isFirst?"—":((L=y.deltas)==null?void 0:L[x])??"·",g=document.createElement("div");g.className=`bb-history-row${s===x?" bb-history-row--focus":""}`;const N=document.createElement("span");N.textContent=A;const C=document.createElement("span");C.textContent=`${v}%`;const q=document.createElement("span");q.textContent=k,typeof k=="string"&&k.includes("↑")&&(q.className="bb-delta-up"),typeof k=="string"&&k.includes("↓")&&(q.className="bb-delta-down"),g.append(N,C,q),d.appendChild(g)}p.appendChild(d);const f=document.createElement("button");f.type="button",f.className="bb-btn-ghost mt-3 w-full",f.textContent=n.openThisMap,f.addEventListener("click",()=>z("map")),p.appendChild(f),i.appendChild(p)}s&&l.length&&requestAnimationFrame(()=>{var b;(b=r.querySelector(".bb-history-row--focus"))==null||b.scrollIntoView({block:"center",behavior:"smooth"})})}function F(e){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}function at(e,t){var n;const a=M(t.lang);e.innerHTML=`
    <section class="bb-section is-visible bb-premium">
      <div class="mb-3 rounded-full px-5 py-1.5 border border-cyan-400/30 bg-cyan-500/10 text-xs font-bold uppercase tracking-[0.35em] text-cyan-100 text-center bb-type-display">
        ${F(a.premiumBadge)}
      </div>
      <h2 class="bb-page-title bb-page-title--premium neon-cta-title mb-4">
        ${F(a.premiumTitle)}
      </h2>
      <p class="text-slate-200 text-center text-sm leading-relaxed mb-6">${F(a.premiumSub)}</p>
      <ul class="bb-premium-list glass rounded-2xl p-5 mb-6 space-y-3 text-sm text-slate-200">
        ${a.premiumBullets.map(s=>`<li>${F(s)}</li>`).join("")}
      </ul>
      <button type="button" class="bb-btn-premium-buy w-full" id="bb-premium-buy">${F(a.premiumCta)}</button>
    </section>
  `,(n=e.querySelector("#bb-premium-buy"))==null||n.addEventListener("click",()=>{T(),t.tributeUrl&&W(t.tributeUrl)})}function S(e){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}async function st(e,t,a,{onProfile:n}={}){const s=M(a.lang),r={variant:a.testVariant||"development",questions:[],answers:{},step:0},i=document.createElement("section");i.className="bb-section is-visible bb-test",e.replaceChildren(i);async function o(){i.innerHTML=`<p class="text-cyan-200/80 text-sm">${S(s.loading)}</p>`;try{const b=await He(t,r.variant);r.questions=b.questions??[],r.step=0,r.answers={},c()}catch{i.innerHTML=`<p class="bb-error">${S(s.errorLoad)}</p>`}}function l(){i.innerHTML=`
      <div class="bb-test-pick">
        <div class="bb-test-pick__glow" aria-hidden="true"></div>
        <h2 class="bb-page-title bb-page-title--premium neon-zone-title">${S(s.testTitle)}</h2>
        <p class="bb-page-sub text-slate-300/90 text-sm mb-1 leading-relaxed">${S(s.testPickVariant)}</p>
        <div class="bb-test-variant-grid">
          <button type="button" class="bb-btn-hero" data-variant="sexual">
            <span class="bb-btn-hero__badge">${S(s.variantSexBadge)}</span>
            <span class="bb-btn-hero__label">${S(s.variantSex)}</span>
            <span class="bb-btn-hero__hint">${S(s.variantSexHint)}</span>
          </button>
          <button type="button" class="bb-btn-alt" data-variant="development">
            <span class="bb-btn-alt__label">${S(s.variantDev)}</span>
            <span class="bb-btn-alt__hint">${S(s.variantDevHint)}</span>
          </button>
        </div>
      </div>
    `,i.querySelectorAll("[data-variant]").forEach(b=>{b.addEventListener("click",()=>{T(),r.variant=b.getAttribute("data-variant")||"development",o()})})}function c(){const b=r.questions[r.step];if(!b){l();return}const y=r.questions.length,p=(r.step+1)/y*100;i.innerHTML=`
      <div class="bb-test-progress mb-4">
        <div class="flex justify-between text-xs text-cyan-200/80 mb-1">
          <span>${S(s.questionProgress(r.step+1,y))}</span>
          <span>${Math.round(p)}%</span>
        </div>
        <div class="pdf-bar-track"><div class="pdf-bar-gradient pdf-bar-gradient--main" style="clip-path: inset(0 ${(100-p).toFixed(1)}% 0 0)"></div></div>
      </div>
      <h2 class="bb-test-q-title">${S(b.topic)}</h2>
      <p class="text-slate-200 mb-4 leading-relaxed">${S(b.text)}</p>
      <div class="grid gap-2 bb-test-options" id="bb-test-options"></div>
    `;const w=i.querySelector("#bb-test-options");for(const u of b.options??[]){const d=document.createElement("button");d.type="button",d.className="bb-test-option",d.innerHTML=`<span class="bb-test-option-key">${S(u.key)}</span><span>${S(u.label)}</span>`,d.addEventListener("click",()=>L(u.key)),w.appendChild(d)}}async function L(b){T();const y=r.questions[r.step];if(r.answers[y.id]=b,r.step+1<r.questions.length){r.step+=1,c();return}i.innerHTML=`
      <div class="bb-loading">
        <div class="bb-loading__pulse"></div>
        <p class="text-sm text-cyan-200/80">${S(s.computing)}</p>
      </div>`;try{const p={};for(const[u,d]of Object.entries(r.answers))p[String(u)]=d;const w=await Be(t,{variant:r.variant,answers:p});n&&n(w),z("map")}catch{i.innerHTML=`<p class="bb-error">${S(s.errorLoad)}</p>`}}l()}let _=null,$=null;function rt(e){const t=document.getElementById("bb-nav");t&&t.querySelectorAll(".bb-nav__btn").forEach(a=>{a.classList.toggle("is-active",a.dataset.route===e)})}function it(e){if(!_)return;const t=e==="en"?"en":"ru";if(_.lang===t)return;_.lang=t,document.documentElement.lang=t;const a=M(t),n=document.getElementById("bb-header-wordmark");n&&(n.textContent=a.appBrandName),pe(t)}function D(e){e!=null&&e.lang&&it(e.lang)}function ot(e){var n;if((n=document.querySelector(".bb-premium-fab"))==null||n.remove(),e.paid||!e.tributeUrl)return;const t=M((_==null?void 0:_.lang)||e.lang),a=document.createElement("button");a.type="button",a.className="bb-premium-fab",a.textContent=t.premiumCta,a.addEventListener("click",()=>{T(),z("premium")}),document.body.appendChild(a)}function pe(e){const t=document.getElementById("bb-nav");if(!t)return;const a=M(e);t.hidden=!1,t.innerHTML=`
    <button type="button" class="bb-nav__btn" data-route="map">${a.navMap}</button>
    <button type="button" class="bb-nav__btn" data-route="history">${a.navHistory}</button>
    <button type="button" class="bb-nav__btn" data-route="test">${a.navTest}</button>
    <button type="button" class="bb-nav__btn" data-route="premium">${a.navPremium}</button>
  `,t.querySelectorAll(".bb-nav__btn").forEach(n=>{n.addEventListener("click",()=>{T(),z(n.dataset.route||"map")})})}async function ee(e){var r,i;const t=document.getElementById("bb-root");if(!t||!_)return;const a=document.getElementById("bb-header"),n=document.getElementById("bb-nav"),s=e.name==="exercise";if(document.body.classList.toggle("bb-route-exercise",s),a&&(a.hidden=s),n&&(n.hidden=s),s||rt(e.name),e.name!=="map"&&((r=document.querySelector(".bb-premium-fab"))==null||r.remove()),e.name==="premium"){$||($=await R(_),D($)),at(t,$);return}if(e.name==="test"){$||($=await R(_),D($)),await st(t,_,$,{onProfile:o=>{$=o,D(o)}});return}if(e.name==="history"){$||($=await R(_),D($)),await nt(t,_,$);return}if(!$){const o=M(_.lang);t.innerHTML=`
      <div class="bb-loading">
        <div class="bb-loading__pulse"></div>
        <p class="text-sm text-cyan-200/80">${o.loading}</p>
      </div>`;try{$=await R(_),D($),(i=_.user)!=null&&i.first_name&&!$.userDisplayName&&($.userDisplayName=[_.user.first_name,_.user.last_name].filter(Boolean).join(" "))}catch(l){if((l==null?void 0:l.status)===401&&(l==null?void 0:l.detail)==="invalid_site_token"&&(_!=null&&_.siteToken)){try{localStorage.removeItem(V),localStorage.removeItem(Y)}catch{}window.location.replace("/");return}const c=(l==null?void 0:l.status)===403?o.notRegistered:(l==null?void 0:l.status)===401?o.authError:o.errorLoad;t.innerHTML=`<p class="bb-error">${c}</p>`;return}}if(e.name==="exercise"){const o=parseInt(e.params.get("id")||"0",10);await et(t,_,$,o);return}if(!$.hasMap&&e.name==="map"){z("test");return}Ve(t,$,e),ot($)}async function te(e){var o;const t=e.lang==="en"?"en":"ru";_={initData:e.initData??"",user:e.user??null,lang:t,siteToken:e.siteToken??""},$=null,document.body.classList.add("bb-app--telegram"),_.siteToken&&document.body.classList.add("bb-app--site");const a=document.getElementById("bb-root");if(!a)return;a.classList.add("bb-root--spa");const n=M(_.lang),s=document.getElementById("bb-header"),r=document.getElementById("bb-header-wordmark");if(r&&(r.textContent=n.appBrandName),s)if(s.hidden=!1,s.classList.add("is-visible"),(o=s.querySelector(".bb-header__logout"))==null||o.remove(),_.siteToken){s.classList.add("bb-header--with-logout");const l=document.createElement("button");l.type="button",l.className="bb-header__logout",l.textContent=n.navLogout,l.addEventListener("click",()=>{try{localStorage.removeItem(V),localStorage.removeItem(Y)}catch{}window.location.replace("/")}),s.appendChild(l)}else s.classList.remove("bb-header--with-logout");pe(_.lang),Fe(l=>{ee(l).catch(()=>{})}),De();const i=Z();window.location.hash?await ee(i):z("map")}const ne="/assets/full-glowing-brain-Cl127Rfm.png",lt=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 48" fill="none">
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
`,ae=.088,se=15,re=2,ie=.4;function G(e,t,a){return Math.max(t,Math.min(a,e))}function ct(){var e,t;return((t=(e=window.matchMedia)==null?void 0:e.call(window,"(prefers-reduced-motion: reduce)"))==null?void 0:t.matches)??!1}function dt(e,t,a){const n=e.getBoundingClientRect(),s=80,r=Math.max(n.width+s*2,1),i=Math.max(n.height+s*2,1),o=n.left+n.width/2,l=n.top+n.height/2;return{nx:G((t-o)/(r*.5),-1,1),ny:G((a-l)/(i*.5),-1,1)}}function ut(e){var x,A;if(ct())return()=>{};const t=e.querySelector("[data-parallax-brain]"),a=e.querySelector("[data-parallax-glow]");if(!t)return()=>{};let n={nx:0,ny:0},s=!1,r={nx:0,ny:0},i=!1,o=0,l=0,c=0;const L=((A=(x=window.matchMedia)==null?void 0:x.call(window,"(pointer: coarse)"))==null?void 0:A.matches)??!1,b=()=>s?{tx:n.nx,ty:n.ny}:i?{tx:r.nx*.62,ty:r.ny*.62}:{tx:0,ty:0},y=()=>{c=0;const{tx:v,ty:k}=b();o+=(v-o)*ae,l+=(k-l)*ae;const g=o*se,N=l*se,C=l*-re,q=o*re;if(t.style.transform=`translate3d(${g}px, ${N}px, 0) rotateX(${C}deg) rotateY(${q}deg)`,a){const xe=-g*ie,_e=-N*ie;a.style.transform=`translate3d(calc(-50% + ${xe}px), calc(-50% + ${_e}px), 0) scale(1.06)`}const{tx:me,ty:he}=b(),fe=Math.abs(o-me)>.003||Math.abs(l-he)>.003,ve=Math.abs(o)>.004||Math.abs(l)>.004;(fe||ve||i)&&(c=requestAnimationFrame(y))},p=()=>{c||(c=requestAnimationFrame(y))},w=v=>{if(!v.isTrusted)return;const{nx:k,ny:g}=dt(e,v.clientX,v.clientY);n={nx:k,ny:g},s=!0,p()},u=()=>{s=!0},d=()=>{s=!1,p()};e.addEventListener("pointermove",w,{passive:!0}),e.addEventListener("pointerenter",u),e.addEventListener("pointerleave",d),e.addEventListener("pointerdown",()=>{L&&typeof(DeviceOrientationEvent==null?void 0:DeviceOrientationEvent.requestPermission)=="function"&&DeviceOrientationEvent.requestPermission().then(v=>{v==="granted"&&(i=!0)}).catch(()=>{})},{passive:!0});let f=null;return window.DeviceOrientationEvent&&(f=v=>{if(v.gamma==null||v.beta==null)return;const k=G(v.gamma/32,-1,1),g=G((v.beta-44)/36,-1,1);r={nx:k,ny:g},i=!0,p()},window.addEventListener("deviceorientation",f,!0)),t.style.willChange="transform",a&&(a.style.willChange="transform"),p(),()=>{e.removeEventListener("pointermove",w),e.removeEventListener("pointerenter",u),e.removeEventListener("pointerleave",d),f&&window.removeEventListener("deviceorientation",f,!0),c&&cancelAnimationFrame(c),t.style.willChange="",t.style.transform="",a&&(a.style.willChange="",a.style.transform="")}}const bt={root:null,rootMargin:"0px 0px -10% 0px",threshold:.08};function pt(e,{reducedMotion:t}){if(t)return e.querySelectorAll(".bb-landing-reveal").forEach(s=>s.classList.add("is-in-view")),()=>{};const a=e.querySelectorAll(".bb-landing-reveal");if(!a.length)return()=>{};const n=new IntersectionObserver(s=>{for(const r of s)r.isIntersecting&&(r.target.classList.add("is-in-view"),n.unobserve(r.target))},bt);return a.forEach(s=>n.observe(s)),()=>{n.disconnect()}}function m(e){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}const ge="bb-landing-lang";function gt(){try{const e=localStorage.getItem(ge);if(e==="en"||e==="ru")return e}catch{}return null}function mt(e){document.body.classList.add("bb-lang-gate-open");const t=document.createElement("div");t.className="bb-lang-gate",t.setAttribute("role","dialog"),t.setAttribute("aria-modal","true"),t.setAttribute("aria-labelledby","bb-lang-gate-title"),t.innerHTML=`
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
  `,document.body.appendChild(t);const a=n=>{try{localStorage.setItem(ge,n)}catch{}document.body.classList.remove("bb-lang-gate-open"),t.remove(),e(n)};t.querySelectorAll("[data-lang]").forEach(n=>{n.addEventListener("click",()=>a(n.getAttribute("data-lang")||"ru"))}),requestAnimationFrame(()=>{var n;(n=t.querySelector(".bb-lang-gate__btn"))==null||n.focus()})}async function ht(){const e=document.getElementById("bb-header"),t=document.getElementById("bb-nav");e&&(e.hidden=!0),t&&(t.hidden=!0);const a=document.getElementById("bb-root");if(!a)return;const n=gt();if(!n){a.className="bb-root",a.innerHTML="",mt(s=>{oe(s).catch(()=>{})});return}await oe(n)}async function oe(e){const t=M(e);document.documentElement.lang=e;const a=document.getElementById("bb-root");if(!a)return;a.className="bb-root bb-root--landing",a.innerHTML=`
    <div class="bb-loading">
      <div class="bb-loading__pulse"></div>
    </div>`;let n={botUrl:"https://t.me/brainboosty?start=site",webappEntryUrl:"https://t.me/brainboosty?start=webapp",channelUrl:"https://t.me/androgenautist",hasAuthorPhoto:!1,hasChannelAvatar:!1,neuralMapHubUrl:"/#hub-login",hubHostDisplay:"neuralmap.brainboosty.app"};try{n={...n,...await Ne()}}catch{}const s="/api/webapp/landing/photo",i=n.hasChannelAvatar?'<img class="bb-landing-nav__channel-img" src="/api/webapp/landing/channel-avatar" alt="" width="38" height="38" loading="lazy" />':'<span class="bb-landing-nav__channel-fallback" aria-hidden="true">TG</span>',o=t.landingFeatures.map(u=>`<li>${m(u)}</li>`).join(""),l=window.matchMedia("(prefers-reduced-motion: reduce)").matches;a.innerHTML=`
    <div class="bb-landing">
      <nav class="bb-landing-nav glass bb-landing-reveal bb-landing-reveal--fade-only" aria-label="Menu">
        <a href="#top" class="bb-landing-nav__logo">${lt}</a>
        <div class="bb-landing-nav__tail">
          <div class="bb-landing-nav__links">
            <a href="#about">${m(t.landingNavAbout)}</a>
            <a href="#project">${m(t.landingNavProject)}</a>
            <a href="#hub-login">${m(t.landingNavHub)}</a>
            <a href="#start" class="bb-landing-nav__cta">${m(t.landingNavCta)}</a>
          </div>
          <div class="bb-landing-nav__extras">
            <a class="bb-landing-nav__channel" href="${m(n.channelUrl)}" target="_blank" rel="noopener noreferrer" aria-label="${m(t.landingChannelAria)}">
              ${i}
            </a>
            <a class="bb-landing-nav__login" href="${m(n.webappEntryUrl)}" rel="noopener noreferrer">${m(t.landingLoginTelegram)}</a>
          </div>
        </div>
      </nav>

      <header id="top" class="bb-landing-hero">
        <div class="bb-landing-hero__visual-anchor">
          <div class="bb-landing-hero__glow" aria-hidden="true" data-parallax-glow></div>
          <div class="bb-landing-hero__brain-layer" data-parallax-brain>
            <img class="bb-landing-hero__brain" src="${ne}" alt="" width="280" height="280" decoding="async" />
          </div>
        </div>
        <div class="bb-landing-hero__copy bb-landing-reveal">
        <p class="bb-landing-kicker">${m(t.landingKicker)}</p>
        <h1 class="bb-landing-title neon-zone-title">${m(t.landingTitle)}</h1>
        <p class="bb-landing-tagline">${m(t.landingTagline)}</p>
        <div class="bb-landing-hero__ctas">
          <a class="bb-landing-cta-primary" href="${m(n.botUrl)}" rel="noopener noreferrer">
            ${m(t.landingCta)}
          </a>
          <a class="bb-landing-cta-secondary" href="${m(n.webappEntryUrl)}" rel="noopener noreferrer">
            ${m(t.landingLoginTelegram)}
          </a>
        </div>
        <p class="bb-landing-cta-sub">${m(t.landingCtaSub)}</p>
        <p class="bb-landing-hub-hero-link-wrap">
          <a href="#hub-login" class="bb-landing-hub-hero-link">${m(t.landingHubHeroLink)}</a>
        </p>
        </div>
      </header>

      <section id="about" class="bb-landing-section bb-landing-reveal">
        <h2 class="bb-landing-section__title">${m(t.landingAboutTitle)}</h2>
        <article class="bb-landing-about glass bb-landing-hover-rise">
          <div class="bb-landing-about__photo-wrap">
            <img class="bb-landing-about__photo" src="${s}" alt="" width="320" height="320" loading="lazy" data-fallback-src="${ne}" />
            <div class="bb-landing-about__ring" aria-hidden="true"></div>
          </div>
          <div class="bb-landing-about__text">
            ${t.landingAboutParagraphs.map(u=>`<p>${m(u)}</p>`).join("")}
            <a class="bb-landing-link" href="${m(n.channelUrl)}" target="_blank" rel="noopener noreferrer">
              ${m(t.landingChannelLink)}
            </a>
          </div>
        </article>
      </section>

      <section id="project" class="bb-landing-section bb-landing-reveal">
        <h2 class="bb-landing-section__title">${m(t.landingProjectTitle)}</h2>
        <ul class="bb-landing-features">${o}</ul>
        <p class="bb-landing-disclaimer">${m(t.footer)}</p>
      </section>

      <section id="hub-login" class="bb-landing-section bb-landing-hub bb-landing-reveal">
        <p class="bb-landing-hub__domain" translate="no">${m(n.hubHostDisplay)}</p>
        <h2 class="bb-landing-section__title bb-landing-hub__title">${m(t.landingHubTitle)}</h2>
        <p class="bb-landing-hub__lead">${m(t.landingHubLead)}</p>
        <p class="bb-landing-hub__hint">${m(t.landingHubHint)}</p>
        <div class="bb-landing-hub__card glass bb-landing-hover-rise">
          <div id="bb-tg-login-widget" class="bb-landing-hub__widget"></div>
        </div>
      </section>

      <section id="start" class="bb-landing-section bb-landing-final bb-landing-reveal">
        <div class="glass bb-landing-final__card bb-landing-hover-rise">
          <h2 class="bb-landing-final__title">${m(t.landingFinalTitle)}</h2>
          <p class="bb-landing-final__sub">${m(t.landingFinalSub)}</p>
          <a class="bb-landing-cta-primary bb-landing-cta-primary--lg" href="${m(n.botUrl)}" rel="noopener noreferrer">
            ${m(t.landingCta)}
          </a>
        </div>
      </section>

      <footer class="bb-landing-footer">
        <span>BrainBoosty · Neural Map</span>
      </footer>
    </div>
  `,a.querySelectorAll(".bb-landing-about__photo").forEach(u=>{const d=u.getAttribute("data-fallback-src");d&&u.addEventListener("error",()=>{u.removeAttribute("data-fallback-src"),u.src=d})}),a.querySelectorAll(".bb-landing-nav__channel-img").forEach(u=>{u.addEventListener("error",()=>{const d=u.closest(".bb-landing-nav__channel");d&&(d.innerHTML='<span class="bb-landing-nav__channel-fallback" aria-hidden="true">TG</span>')})}),a.querySelectorAll('a[href^="#"]').forEach(u=>{u.addEventListener("click",d=>{var A;const f=(A=u.getAttribute("href"))==null?void 0:A.slice(1);if(!f)return;const x=document.getElementById(f);x&&(d.preventDefault(),x.scrollIntoView({behavior:"smooth",block:"start"}))})});const c=a.querySelector(".bb-landing"),L=pt(c||a,{reducedMotion:l}),b=a.querySelector(".bb-landing-hero"),y=b?ut(b):()=>{},p=()=>{L(),y(),window.removeEventListener("pagehide",p)};window.addEventListener("pagehide",p),window.__bbTelegramAuth=async u=>{var f,x;const d=M(e);try{const A=await fetch("/api/webapp/auth/site",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(u)});let v={};try{v=await A.json()}catch{v={}}if(!A.ok){const k=v==null?void 0:v.detail,g=A.status===403?d.notRegistered:A.status===401?d.authError:typeof k=="string"?k:d.errorLoad;window.alert(g);return}localStorage.setItem(V,v.accessToken),localStorage.setItem(Y,JSON.stringify({first_name:((f=v.user)==null?void 0:f.first_name)??u.first_name,last_name:((x=v.user)==null?void 0:x.last_name)??u.last_name??"",language_code:v.lang==="en"?"en":"ru"})),window.location.replace("/#map"),window.location.reload()}catch{window.alert(d.errorLoad)}};const w=a.querySelector("#bb-tg-login-widget");if(w&&n.botUsername){const u=document.createElement("script");u.src="https://telegram.org/js/telegram-widget.js?22",u.async=!0,u.setAttribute("data-telegram-login",n.botUsername),u.setAttribute("data-size","large"),u.setAttribute("data-radius","12"),u.setAttribute("data-onauth","window.__bbTelegramAuth(user)"),u.setAttribute("data-request-access","write"),w.appendChild(u)}}function ft(){var a;const e=(a=window.Telegram)==null?void 0:a.WebApp;return e?(e.initData||"").trim().length>0:!1}function vt(){var e;try{return((e=localStorage.getItem(V))==null?void 0:e.trim())||""}catch{return""}}function xt(){try{const e=localStorage.getItem(Y);return e?JSON.parse(e):null}catch{return null}}const{initData:_t,user:yt,lang:le}=Re();var U,ce;if(ft())te({initData:_t,user:yt,lang:le,siteToken:""});else{const e=vt();if(e){const t=xt(),a=(t==null?void 0:t.language_code)==="en"||(ce=(U=t==null?void 0:t.language_code)==null?void 0:U.startsWith)!=null&&ce.call(U,"en")||le==="en"?"en":"ru";te({initData:"",user:t?{first_name:t.first_name,last_name:t.last_name,language_code:t.language_code}:null,lang:a,siteToken:e})}else ht()}
