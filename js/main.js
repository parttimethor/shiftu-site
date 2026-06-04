/* =========================================================
   Shift Ü — interactions
   ========================================================= */
(function () {
  "use strict";

  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const isTouch = window.matchMedia("(hover: none)").matches;
  const isSmall = window.matchMedia("(max-width: 760px)").matches;
  const $ = (s, c) => (c || document).querySelector(s);
  const $$ = (s, c) => Array.from((c || document).querySelectorAll(s));
  const lerp = (a, b, t) => a + (b - a) * t;
  const clamp = (v, a, b) => Math.min(b, Math.max(a, v));

  /* ---------- year ---------- */
  const yr = $("[data-year]");
  if (yr) yr.textContent = new Date().getFullYear();

  /* ---------- nav: stuck + burger ---------- */
  const nav = $("[data-nav]");
  const burger = $("[data-burger]");
  const mobileMenu = $("[data-mobile-menu]");

  const onScroll = () => {
    if (nav) nav.classList.toggle("is-stuck", window.scrollY > 24);
    const prog = $("[data-progress]");
    if (prog) {
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      prog.style.width = (max > 0 ? (h.scrollTop / max) * 100 : 0) + "%";
    }
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  if (burger && mobileMenu) {
    const toggle = (open) => {
      burger.classList.toggle("is-open", open);
      mobileMenu.classList.toggle("is-open", open);
      burger.setAttribute("aria-expanded", String(open));
    };
    burger.addEventListener("click", () =>
      toggle(!mobileMenu.classList.contains("is-open"))
    );
    $$("a", mobileMenu).forEach((a) => a.addEventListener("click", () => toggle(false)));
  }

  /* ---------- reveal on scroll ---------- */
  const revealEls = $$("[data-reveal]");
  if ("IntersectionObserver" in window && !prefersReduced) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e, i) => {
          if (e.isIntersecting) {
            const sibs = $$("[data-reveal]", e.target.parentElement);
            const idx = sibs.indexOf(e.target);
            e.target.style.transitionDelay = Math.min(idx, 5) * 70 + "ms";
            e.target.classList.add("is-in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );
    revealEls.forEach((el) => io.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add("is-in"));
  }

  /* ---------- cursor glow ---------- */
  const cursor = $("[data-cursor]");
  if (cursor && !isTouch && !prefersReduced) {
    let cx = -1000, cy = -1000, tx = -1000, ty = -1000;
    window.addEventListener("mousemove", (e) => { tx = e.clientX; ty = e.clientY; }, { passive: true });
    const raf = () => {
      cx = lerp(cx, tx, 0.18); cy = lerp(cy, ty, 0.18);
      cursor.style.transform = `translate3d(${cx}px,${cy}px,0)`;
      requestAnimationFrame(raf);
    };
    raf();
  }

  /* ---------- magnetic buttons ---------- */
  if (!isTouch && !prefersReduced) {
    $$("[data-magnetic]").forEach((el) => {
      el.addEventListener("mousemove", (e) => {
        const r = el.getBoundingClientRect();
        const mx = e.clientX - r.left - r.width / 2;
        const my = e.clientY - r.top - r.height / 2;
        el.style.transform = `translate(${mx * 0.18}px, ${my * 0.28}px)`;
      });
      el.addEventListener("mouseleave", () => { el.style.transform = ""; });
    });
  }

  /* ---------- card tilt ---------- */
  if (!isTouch && !prefersReduced) {
    $$("[data-tilt]").forEach((card) => {
      card.addEventListener("mousemove", (e) => {
        const r = card.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width - 0.5;
        const py = (e.clientY - r.top) / r.height - 0.5;
        card.style.transform = `perspective(800px) rotateY(${px * 8}deg) rotateX(${-py * 8}deg) translateY(-4px)`;
      });
      card.addEventListener("mouseleave", () => { card.style.transform = ""; });
    });
  }

  /* ---------- count up ---------- */
  const counters = $$("[data-count]");
  if (counters.length) {
    const cio = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        const el = e.target;
        const target = parseFloat(el.dataset.count);
        const suffix = el.dataset.suffix || "";
        if (prefersReduced) { el.textContent = target + suffix; cio.unobserve(el); return; }
        const dur = 1400; const start = performance.now();
        const tick = (now) => {
          const p = clamp((now - start) / dur, 0, 1);
          const eased = 1 - Math.pow(1 - p, 3);
          el.textContent = Math.round(target * eased) + suffix;
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
        cio.unobserve(el);
      });
    }, { threshold: 0.5 });
    counters.forEach((c) => cio.observe(c));
  }

  /* ---------- mascot: float (CSS) + cursor-follow + click bounce ---------- */
  const mascotEl = $("[data-mascot]");
  if (mascotEl && !isTouch && !prefersReduced) {
    let mvx = 0, mvy = 0, tvx = 0, tvy = 0;
    window.addEventListener("mousemove", (e) => {
      tvx = e.clientX / window.innerWidth - 0.5;
      tvy = e.clientY / window.innerHeight - 0.5;
    }, { passive: true });
    const mascotTick = () => {
      mvx = lerp(mvx, tvx, 0.06); mvy = lerp(mvy, tvy, 0.06);
      mascotEl.style.transform = "translate(" + (mvx * 26) + "px," + (mvy * 16) + "px)";
      requestAnimationFrame(mascotTick);
    };
    mascotTick();
    mascotEl.addEventListener("click", () => {
      mascotEl.classList.add("is-bounce");
      setTimeout(() => mascotEl.classList.remove("is-bounce"), 680);
    });
  }

  /* ---------- contact form -> prefilled email ---------- */
  const cform = $("[data-contact-form]");
  if (cform) {
    cform.addEventListener("submit", (e) => {
      e.preventDefault();
      const d = new FormData(cform);
      const name = (d.get("name") || "").toString().trim();
      const biz = (d.get("business") || "").toString().trim();
      const email = (d.get("email") || "").toString().trim();
      const industry = (d.get("industry") || "").toString().trim();
      const msg = (d.get("message") || "").toString().trim();
      const subject = `Shift Ü demo request — ${biz || name || "new lead"}`;
      const body =
        `Name: ${name}\n` +
        `Business: ${biz}\n` +
        `Industry: ${industry}\n` +
        `Email: ${email}\n\n` +
        `${msg}`;
      const ok = $("[data-form-ok]");
      if (ok) ok.classList.add("is-shown");
      window.location.href =
        `mailto:christian@shiftu.io?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    });
  }

  /* =========================================================
     Floating assistant — scripted FAQ helper
     (inspired by Section AI's persistent widget)
     ========================================================= */
  (function assistant() {
    if (!document.body) return;

    const FAQ = [
      { k: ["work", "how", "loop", "do you do", "what is"], a: "Shift Ü runs one deterministic loop — intake → schedule → follow-up → bill → route — 24/7, with approval gates and a full audit trail. Want to <a href='product.html#demo'>watch it work a live lead</a>?" },
      { k: ["price", "cost", "pricing", "how much", "expensive"], a: "Pricing tracks your volume and which modules you switch on. The fastest way to a real number is a quick demo — <a href='contact.html'>book one here</a>." },
      { k: ["industr", "who", "fit", "dealership", "dental", "accounting", "insurance", "restaurant"], a: "We're built for appointment-driven businesses: car dealerships (live today), plus dental, accounting, insurance, and restaurants. <a href='industries.html'>See your industry →</a>" },
      { k: ["demo", "book", "call", "talk", "meeting", "started", "sign up"], a: "Let's do it — <a href='contact.html'>book a 20-minute demo</a> and we'll run the loop on your workflows." },
      { k: ["safe", "trust", "determin", "hallucinat", "reliable", "secure", "bound"], a: "It only does what it's configured to do — bounded, gated, and logged. No improvised actions, no surprises." },
      { k: ["human", "team", "people", "staff", "replace", "job"], a: "Routine work runs automatically; anything that needs a person is routed to your team with the full context attached. It frees the front desk, it doesn't replace the judgment." },
      { k: ["hi", "hey", "hello", "yo"], a: "Hey! Ask me how the loop works, what it costs, or which industries we cover." },
      { k: ["tool", "connect", "crm", "calendar", "integrat", "sms"], a: "Shift Ü plugs into the tools you already run — CRM, calendar, SMS, invoicing. No rip-and-replace." }
    ];
    const FALLBACK = "Good question — the honest answer is a quick demo will cover it best. <a href='contact.html'>Want to book one?</a>";
    const CHIPS = ["How does it work?", "Pricing?", "Which industries?", "Book a demo"];

    const launch = document.createElement("button");
    launch.className = "asst-launch";
    launch.setAttribute("aria-label", "Ask Shift Ü");
    launch.innerHTML = `<img class="asst-launch__ico asst-launch__ava" src="assets/mascot-thomas.png" alt="" /><span>Ask Shift Ü</span>`;

    const panel = document.createElement("div");
    panel.className = "asst";
    panel.setAttribute("role", "dialog");
    panel.setAttribute("aria-label", "Shift Ü assistant");
    panel.innerHTML =
      `<div class="asst__head">
         <img class="asst__ava asst__ava--img" src="assets/mascot-thomas.png" alt="" />
         <div class="asst__id"><b>Shift Ü</b><span>online</span></div>
         <button class="asst__close" data-asst-close aria-label="Close assistant">✕</button>
       </div>
       <div class="asst__body" data-asst-body aria-live="polite"></div>
       <div class="asst__chips" data-asst-chips></div>
       <form class="asst__form" data-asst-form>
         <input class="asst__input" data-asst-input placeholder="Ask anything…" aria-label="Ask the assistant" autocomplete="off" />
         <button class="asst__send" type="submit" aria-label="Send">
           <svg viewBox="0 0 24 24" style="width:18px;height:18px;fill:none;stroke:#fff;stroke-width:2;stroke-linecap:round;stroke-linejoin:round"><path d="M22 2L11 13M22 2l-7 20-4-9-9-4z"/></svg>
         </button>
       </form>`;

    document.body.appendChild(launch);
    document.body.appendChild(panel);

    const body = panel.querySelector("[data-asst-body]");
    const chipsWrap = panel.querySelector("[data-asst-chips]");
    const form = panel.querySelector("[data-asst-form]");
    const input = panel.querySelector("[data-asst-input]");

    const esc = (s) => s.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
    function addMsg(html, who) {
      const m = document.createElement("div");
      m.className = "am am--" + who;
      m.innerHTML = html;
      body.appendChild(m);
      body.scrollTop = body.scrollHeight;
    }
    function answer(q) {
      const s = q.toLowerCase();
      for (const f of FAQ) if (f.k.some((k) => s.includes(k))) return f.a;
      return FALLBACK;
    }
    function ask(q) {
      addMsg(esc(q), "me");
      const a = answer(q);
      setTimeout(() => addMsg(a, "ai"), prefersReduced ? 60 : 430);
    }

    CHIPS.forEach((c) => {
      const b = document.createElement("button");
      b.className = "asst__chip"; b.type = "button"; b.textContent = c;
      b.addEventListener("click", () => ask(c));
      chipsWrap.appendChild(b);
    });

    let greeted = false;
    function open() {
      panel.classList.add("is-open");
      launch.classList.add("is-hidden");
      if (!greeted) {
        greeted = true;
        addMsg("Hey — I'm the Shift Ü assistant. Ask me how the loop works, what it costs, or which industries we cover.", "ai");
      }
      setTimeout(() => input.focus(), 200);
    }
    function close() {
      panel.classList.remove("is-open");
      launch.classList.remove("is-hidden");
    }
    launch.addEventListener("click", open);
    panel.querySelector("[data-asst-close]").addEventListener("click", close);
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const v = input.value.trim();
      if (!v) return;
      input.value = "";
      ask(v);
    });
    document.addEventListener("keydown", (e) => { if (e.key === "Escape" && panel.classList.contains("is-open")) close(); });
  })();

  /* =========================================================
     Interactive demo
     ========================================================= */
  const scenarios = {
    dealership: {
      title: "shift-ü · dealership ops",
      cust: { name: "Marcus T.", initials: "M" },
      steps: [
        { t: "sys", text: "New lead · Web form · 11:42 PM" },
        { t: "in", text: "Is the 2023 RAV4 still available? What's the out-the-door price?" },
        { t: "ai", text: "Hi Marcus — yes, the 2023 RAV4 XLE is on the lot. Out-the-door is $34,980 incl. fees. Want to see it? I've got tomorrow 10:00 AM or 2:30 PM open." },
        { t: "in", text: "2:30 works." },
        { t: "sys", text: "Booked · Test drive · Tomorrow 2:30 PM · Reminder set" },
        { t: "ai", text: "You're booked for 2:30 PM. I'll text a reminder an hour before. Reply STOP to opt out anytime." },
        { t: "sys", text: "Sales rep notified · Lead enriched · Handed off ✓" }
      ]
    },
    dental: {
      title: "shift-ü · dental front desk",
      cust: { name: "Priya R.", initials: "P" },
      steps: [
        { t: "sys", text: "Missed call → text-back · 6:18 PM" },
        { t: "in", text: "Hi, do you have any cleaning appointments this week?" },
        { t: "ai", text: "We do! I can offer Thu 9:00 AM or Fri 1:15 PM for a cleaning. Are you a returning patient?" },
        { t: "in", text: "Returning — Friday please." },
        { t: "sys", text: "Booked · Cleaning · Fri 1:15 PM · Insurance on file" },
        { t: "ai", text: "Done — Friday 1:15 PM. I'll send a reminder and your intake form the day before." },
        { t: "sys", text: "Front desk freed · Confirmed ✓" }
      ]
    },
    accounting: {
      title: "shift-ü · accounting intake",
      cust: { name: "Dana L.", initials: "D" },
      steps: [
        { t: "sys", text: "New intake · Contact form · Tax season" },
        { t: "in", text: "I need help filing my small-business return. Do you take new clients?" },
        { t: "ai", text: "We do. I can book a 30-min discovery call — Tue 11:00 AM or Wed 3:00 PM — and send a checklist of docs to bring." },
        { t: "in", text: "Wednesday at 3." },
        { t: "sys", text: "Booked · Discovery call · Wed 3:00 PM · Checklist sent" },
        { t: "ai", text: "Booked for Wed 3:00 PM. The document checklist is in your inbox. Talk soon." },
        { t: "sys", text: "Routed to senior accountant ✓" }
      ]
    },
    insurance: {
      title: "shift-ü · insurance quotes",
      cust: { name: "Sam K.", initials: "S" },
      steps: [
        { t: "sys", text: "New quote request · Web · Auto" },
        { t: "in", text: "Looking for a quote on a 2021 Civic. Currently paying $180/mo." },
        { t: "ai", text: "Happy to help — I can often beat that. I'll need your postal code and driving history. Call back today at 4:00 PM or tomorrow 9:30 AM?" },
        { t: "in", text: "Today at 4 is good." },
        { t: "sys", text: "Booked · Quote call · Today 4:00 PM · Details captured" },
        { t: "ai", text: "Set for 4:00 PM today. I've logged your vehicle and current rate so we hit the ground running." },
        { t: "sys", text: "Assigned to licensed broker ✓" }
      ]
    },
    restaurant: {
      title: "shift-ü · restaurant host",
      cust: { name: "Jordan M.", initials: "J" },
      steps: [
        { t: "sys", text: "New message · Instagram DM · Fri 7:55 PM" },
        { t: "in", text: "Do you have a table for 6 tomorrow around 7?" },
        { t: "ai", text: "We'd love to have you. For a party of 6 I can do 6:45 or 8:15 — which works better?" },
        { t: "in", text: "6:45." },
        { t: "sys", text: "Booked · Reservation · 6 guests · Tomorrow 6:45 PM" },
        { t: "ai", text: "Booked for 6 at 6:45 PM tomorrow. I'll text a confirmation. See you then!" },
        { t: "sys", text: "Added to floor plan · Host notified ✓" }
      ]
    }
  };

  const feed = $("[data-demo-feed]");
  const typingEl = $("[data-demo-typing]");
  const titleEl = $("[data-demo-title]");
  const tabs = $$("[data-demo-tabs] .demo__tab");
  const replayBtn = $("[data-demo-replay]");
  let runToken = 0;
  let current = "dealership";

  const sleep = (ms, token) =>
    new Promise((res, rej) => {
      const id = setTimeout(() => (token === runToken ? res() : rej("cancel")), ms);
      if (token !== runToken) { clearTimeout(id); rej("cancel"); }
    });

  function bubble(step) {
    const wrap = document.createElement("div");
    const sc = scenarios[current];
    if (step.t === "sys") {
      wrap.className = "msg msg--sys";
      wrap.innerHTML = `<div class="msg__body">${step.text}</div>`;
    } else if (step.t === "ai") {
      wrap.className = "msg msg--ai";
      wrap.innerHTML =
        `<span class="msg__avatar">Ü</span>` +
        `<div><div class="msg__meta">Shift Ü</div><div class="msg__body">${step.text}</div></div>`;
    } else {
      wrap.className = "msg msg--in";
      wrap.innerHTML =
        `<span class="msg__avatar">${sc.cust.initials}</span>` +
        `<div><div class="msg__meta">${sc.cust.name}</div><div class="msg__body">${step.text}</div></div>`;
    }
    feed.appendChild(wrap);
    feed.scrollTop = feed.scrollHeight;
  }

  async function typeInComposer(label, token) {
    if (prefersReduced) { typingEl.innerHTML = ""; return; }
    const full = label;
    for (let i = 0; i <= full.length; i++) {
      if (token !== runToken) throw "cancel";
      typingEl.innerHTML = full.slice(0, i) + `<span class="caret"></span>`;
      await sleep(16 + Math.random() * 22, token);
    }
    await sleep(260, token);
    typingEl.innerHTML = "";
  }

  async function runScenario(key) {
    runToken++;
    const token = runToken;
    current = key;
    const sc = scenarios[key];
    if (titleEl) titleEl.textContent = sc.title;
    feed.innerHTML = "";
    typingEl.innerHTML = "";

    try {
      await sleep(280, token);
      for (const step of sc.steps) {
        if (token !== runToken) return;
        if (step.t === "sys") {
          await sleep(prefersReduced ? 120 : 520, token);
          bubble(step);
        } else if (step.t === "ai") {
          await typeInComposer("Shift Ü is composing…", token);
          bubble(step);
        } else {
          await typeInComposer(sc.cust.name + " is typing…", token);
          bubble(step);
        }
        await sleep(prefersReduced ? 200 : 620, token);
      }
      typingEl.innerHTML = `<span style="color:var(--good)">● scenario complete — loop ran hands-free</span>`;
    } catch (e) { /* cancelled */ }
  }

  if (feed && tabs.length) {
    tabs.forEach((tab) => {
      tab.addEventListener("click", () => {
        tabs.forEach((t) => { t.classList.remove("is-active"); t.setAttribute("aria-selected", "false"); });
        tab.classList.add("is-active");
        tab.setAttribute("aria-selected", "true");
        runScenario(tab.dataset.scenario);
      });
    });
    if (replayBtn) replayBtn.addEventListener("click", () => runScenario(current));

    // auto-start when scrolled into view (once)
    let started = false;
    const dio = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting && !started) { started = true; runScenario("dealership"); }
      });
    }, { threshold: 0.35 });
    dio.observe($("#demo"));
  }

  /* =========================================================
     Hero: playable product console.
     The visitor messages Shift Ü like a customer (type, or tap a
     preset) and watches it work — pipeline stages light up, a reply
     types in, status chips resolve (green = handled). Auto-demos when
     idle so the hero is never static. No WebGL, no particle field.
     ========================================================= */
  function initConsole() {
    const root = $("[data-console]");
    if (!root) return;
    const feed = $("[data-feed]", root);
    const form = $("[data-form]", root);
    const input = $("[data-input]", root);
    const presetsWrap = $("[data-presets]", root);
    const stages = $$("[data-stage]", root);
    let busy = false, idleTimer = null, autoIdx = 0, ran = 0;

    const SC = {
      rav4: { q: "Is the 2023 RAV4 still available?",
        reply: "Yes — the RAV4 XLE is on the lot, $34,980 out-the-door. I've got tomorrow 10:00 AM or 2:30 PM open for a test drive.",
        chips: ["Test drive · Tue 2:30", "Reminder set", "Rep notified ✓"] },
      cleaning: { q: "Book me a cleaning this Friday",
        reply: "Done — Friday 1:15 PM for a cleaning. I'll text a reminder and your intake form the day before.",
        chips: ["Booked · Fri 1:15", "Reminder set", "Confirmed ✓"] },
      civic: { q: "Can I get a quote on my 2021 Civic?",
        reply: "Happy to help — I can usually beat $180/mo. I'll call you today at 4:00 PM with options once I have your postal code.",
        chips: ["Callback · 4:00 PM", "Details captured", "Broker assigned ✓"] },
      table: { q: "Table for 6 tonight at 7?",
        reply: "We'd love to have you — I can do 6:45 or 8:15 tonight. I'll hold 6:45 and text you a confirmation.",
        chips: ["Reservation · 6:45 PM", "Confirmed ✓", "Host notified ✓"] },
      taxes: { q: "I need help filing my small-business taxes",
        reply: "I can book a 30-minute discovery call — Tuesday 11:00 or Wednesday 3:00 — and send a checklist of docs to bring.",
        chips: ["Discovery · Wed 3:00", "Checklist sent", "Routed to senior ✓"] }
    };
    const ORDER = ["rav4", "cleaning", "civic", "table", "taxes"];
    const DEFAULT = {
      reply: "Got it. I'll capture that, book the next step, follow up on your cadence, and hand off anything that needs a human. Here's what happens next.",
      chips: ["Captured", "Next step booked", "Handed off ✓"]
    };

    const esc = (s) => s.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
    const sleep = (ms) => new Promise((r) => setTimeout(r, prefersReduced ? Math.min(ms, 60) : ms));

    function matchScenario(text) {
      const s = text.toLowerCase();
      if (/rav4|car|vehicle|test drive|dealer|truck|suv|availab|out.?the.?door/.test(s)) return SC.rav4;
      if (/clean|dental|teeth|dentist|hygien|checkup|cavity/.test(s)) return SC.cleaning;
      if (/quote|insur|civic|policy|premium|coverage|\brate\b/.test(s)) return SC.civic;
      if (/table|reserv|dinner|tonight|party|seat/.test(s)) return SC.table;
      if (/tax|account|file|return|bookkeep|invoice|payroll/.test(s)) return SC.taxes;
      return Object.assign({ q: text }, DEFAULT);
    }

    function addMsg(text, who) {
      const m = document.createElement("div");
      m.className = "msg msg--" + (who === "me" ? "in" : "ai");
      const av = who === "me" ? "You" : "Ü";
      const nm = who === "me" ? "Customer" : "Shift Ü";
      m.innerHTML = '<span class="msg__avatar">' + av + '</span>' +
        '<div><div class="msg__meta">' + nm + '</div><div class="msg__body">' + esc(text) + '</div></div>';
      feed.appendChild(m); feed.scrollTop = feed.scrollHeight; return m;
    }
    function addTyping() {
      const m = document.createElement("div");
      m.className = "msg msg--ai";
      m.innerHTML = '<span class="msg__avatar">Ü</span><div><div class="msg__meta">Shift Ü</div>' +
        '<div class="msg__body msg__body--typing"><span></span><span></span><span></span></div></div>';
      feed.appendChild(m); feed.scrollTop = feed.scrollHeight; return m;
    }
    function resetStages() { stages.forEach((s) => s.classList.remove("is-active", "is-done")); }

    async function run(sc) {
      if (busy) return;
      busy = true; clearTimeout(idleTimer); ran++;
      while (feed.children.length > 6) feed.removeChild(feed.firstChild); // keep the feed tidy
      addMsg(sc.q, "me");
      resetStages();
      const typing = addTyping();
      for (let i = 0; i < stages.length; i++) {
        await sleep(200);
        if (i > 0) stages[i - 1].classList.replace("is-active", "is-done");
        stages[i].classList.add("is-active");
      }
      await sleep(380);
      stages[stages.length - 1].classList.replace("is-active", "is-done");
      typing.remove();
      addMsg(sc.reply, "ai");
      const row = document.createElement("div");
      row.className = "statusrow";
      feed.appendChild(row);
      for (let i = 0; i < sc.chips.length; i++) {
        await sleep(prefersReduced ? 60 : 340);
        const s = document.createElement("span");
        s.className = "statuschip" + (i === sc.chips.length - 1 ? " statuschip--done" : "");
        s.textContent = sc.chips[i];
        row.appendChild(s);
        requestAnimationFrame(() => s.classList.add("is-in"));
        feed.scrollTop = feed.scrollHeight;
      }
      busy = false;
    }

    ORDER.forEach((id) => {
      const b = document.createElement("button");
      b.type = "button"; b.className = "preset"; b.textContent = SC[id].q;
      b.addEventListener("click", () => run(SC[id]));
      presetsWrap.appendChild(b);
    });
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const v = input.value.trim(); if (!v) return;
      input.value = "";
      run(matchScenario(v));
    });

    addMsg("Hey — I'm Shift Ü. Message me like a customer would, or tap a question below to watch how I'd handle it.", "ai");
  }


  /* ---------- CSS settle: wrap headline words + seed custom props ---------- */
  function setupSettle() {
    const blocks = $$("[data-settle]");
    if (!blocks.length) return;
    if (prefersReduced) {
      blocks.forEach((b) => b.classList.add("is-settled"));
      const acc = $("[data-settle-accent]"); if (acc) acc.classList.add("is-swept");
      return;
    }
    let order = 0;
    blocks.forEach((block) => {
      $$(".line", block).forEach((line) => {
        const words = line.textContent.split(/(\s+)/);
        line.textContent = "";
        words.forEach((wtext) => {
          if (/^\s+$/.test(wtext)) { line.appendChild(document.createTextNode(wtext)); return; }
          const span = document.createElement("span");
          span.className = "word";
          span.textContent = wtext;
          const dx = (Math.random() * 10 - 5).toFixed(1);
          span.style.setProperty("--dx", dx + "px");
          span.style.setProperty("--dy", (10 + Math.random() * 10).toFixed(0) + "px");
          span.style.setProperty("--d", (order * 75) + "ms");
          order++;
          line.appendChild(span);
        });
      });
    });
    // trigger after layout
    requestAnimationFrame(() => requestAnimationFrame(() => {
      blocks.forEach((b) => b.classList.add("is-settled"));
    }));
    // once the accent line settles, fire the one-shot light-sweep
    const acc = $("[data-settle-accent]");
    if (acc) {
      const lastWord = acc.querySelector(".word:last-of-type") || acc;
      let fired = false;
      const fire = () => { if (!fired) { fired = true; acc.classList.add("is-swept"); } };
      lastWord.addEventListener("transitionend", (e) => { if (e.propertyName === "transform") fire(); });
      setTimeout(fire, 2600); // fallback if transitionend is missed
    }
  }

  /* ---------- scroll choreography: plain IO class toggles; GSAP optional ---------- */
  function setupScrollChoreography() {
    if (!("IntersectionObserver" in window)) return;

    // ambient handoff on the hero canvas (CSS does the scale/dim)
    const hero = $("[data-hero]");
    if (hero) {
      const io = new IntersectionObserver((entries) => {
        entries.forEach((e) => hero.classList.toggle("is-ambient", e.intersectionRatio < 0.55));
      }, { threshold: [0, 0.55, 1] });
      io.observe(hero);
    }

    // tag sections so their CSS bookend animations only run while in view
    [["#shift", "shift"], ["#cta", "cta"], [".cta", "cta"]].forEach(([sel]) => {
      const el = $(sel);
      if (!el) return;
      const io = new IntersectionObserver((entries) => {
        entries.forEach((e) => el.classList.toggle("is-in", e.isIntersecting));
      }, { threshold: 0.2 });
      io.observe(el);
    });

    // stat settle-LOCK: add .is-locked to each number right as the count-up ends
    const stats = $$("[data-count]");
    if (stats.length && !prefersReduced) {
      const sio = new IntersectionObserver((entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          const el = e.target;
          // count-up runs ~1400ms (existing); lock just after
          setTimeout(() => el.classList.add("is-locked"), 1480);
          sio.unobserve(el);
        });
      }, { threshold: 0.5 });
      stats.forEach((s) => sio.observe(s));
    }

    // how-it-works: pulse each loop step's icon as it enters
    const steps = $$(".loop__step");
    if (steps.length && !prefersReduced) {
      const lio = new IntersectionObserver((entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          e.target.classList.add("is-pulse");
          setTimeout(() => e.target.classList.remove("is-pulse"), 900);
          lio.unobserve(e.target);
        });
      }, { threshold: 0.4 });
      steps.forEach((s) => lio.observe(s));
    }

    // OPTIONAL polish: if GSAP/ScrollTrigger happen to be present, smooth the
    // ambient handoff scrub. Never required; CSS already covers the degrade path.
    if (window.gsap && window.ScrollTrigger && hero && !prefersReduced) {
      try {
        const canvas = $("[data-three]");
        if (canvas) {
          window.gsap.to(canvas, {
            scale: 0.82, opacity: 0.55, yPercent: -4,
            ease: "none",
            scrollTrigger: { trigger: hero, start: "top top", end: "bottom top", scrub: 0.6 }
          });
        }
      } catch (e) { /* GSAP optional — ignore */ }
    }

    // wire the hero "watch the loop run a real lead" CTA to a same-page #demo
    // if one exists (home variant); otherwise the href already points cross-page.
    const cta = $("[data-loop-cta]");
    const demo = $("#demo");
    if (cta && demo) {
      cta.addEventListener("click", (e) => {
        if (cta.getAttribute("href").indexOf("#demo") === cta.getAttribute("href").length - 5) {
          e.preventDefault();
          demo.scrollIntoView({ behavior: prefersReduced ? "auto" : "smooth", block: "start" });
        }
      });
    }
  }

  /* ---------- boot ---------- */
  initConsole();
  setupSettle();
  setupScrollChoreography();
})();
