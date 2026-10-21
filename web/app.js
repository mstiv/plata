(() => {
  const NB = "\u00A0";
  const MODULES = ["home", "cards", "crypto", "transfer", "scan", "market", "stable"];
  const TAB_FOR = { home: "home", history: "home", transfer: "home", market: "home", stable: "home", cards: "cards", scan: "scan", crypto: "crypto", profile: "profile" };
  const LANG_IDX = { en: 0, es: 1, ru: 2 };
  const LOCALE = { en: "en-US", es: "es-ES", ru: "ru-RU" };

  const RATES = { USD: 1, EUR: 0.9315, USDT: 0.999, MXN: 18.42 };
  const CUR = {
    USD: { s: "$", bg: "#1F3B73" }, EUR: { s: "€", bg: "#3B4A8C" }, USDT: { s: "₮", bg: "#26A17B" },
    MXN: { s: "$", bg: "#0F7A4A" }, BTC: { s: "₿", bg: "#F7931A" }, pUSD: { s: "p$", bg: "linear-gradient(140deg,#7FE3B5,#2F8F67)" },
    ETH: { s: "Ξ", bg: "#627EEA" }, SOL: { s: "◎", bg: "linear-gradient(135deg,#9945FF,#14F195)" },
  };
  const RAILS = { cross: { fee: 0.5, speed: "instant", label: "transfer_cross" }, swift: { fee: 15, speed: "days12", label: null }, usdt: { fee: 1, speed: "min1", label: null } };
  const RECIPIENTS = [
    { name: "Ana R.", av: "AR", bg: "#DCE9FB", fg: "#1F4E8C", meta: "ES · IBAN •• 0482", cur: "EUR" },
    { name: "Jorge P.", av: "JP", bg: "#FFE9C7", fg: "#8A5A00", meta: "MX · CLABE •• 7731", cur: "MXN" },
    { name: "Li W.", av: "LW", bg: "#E3F2E8", fg: "#1E7A55", meta: "USDT · TRC-20 · TQ7h…9fXk", cur: "USDT" },
  ];
  const ASSETS = {
    btc: { name: "Bitcoin", sym: "BTC", cls: "c-btc", g: "₿", price: 67458, chg: 2.4, dec: 4 },
    eth: { name: "Ethereum", sym: "ETH", cls: "c-eth", g: "Ξ", price: 1780.2, chg: 1.1, dec: 3 },
    usdt: { name: "Tether", sym: "USDT", cls: "c-usdt", g: "₮", price: 1, chg: 0, dec: 2 },
    sol: { name: "Solana", sym: "SOL", cls: "c-sol", g: "◎", price: 40.34, chg: 4.8, dec: 2 },
  };
  const NETS = {
    btc: ["Bitcoin", "c-btc", 2, "~1.20 USD", "BTC"],
    eth: ["Ethereum", "c-eth", 12, "~0.80 USD", "ETH · USDT · USDC · pUSD"],
    trx: ["Tron", "c-trx", 19, "~1.00 USD", "TRX · USDT · pUSD"],
    bnb: ["BNB Chain", "c-bnb", 15, "~0.05 USD", "BNB · USDT · USDC"],
    sol: ["Solana", "c-sol", 32, "~0.001 USD", "SOL · USDC · USDT"],
    pol: ["Polygon", "c-pol", 128, "~0.01 USD", "POL · USDT · USDC"],
    ton: ["TON", "c-ton", 1, "~0.02 USD", "TON · USDT"],
    ltc: ["Litecoin", "c-ltc", 6, "~0.03 USD", "LTC"],
    avax: ["Avalanche", "c-avax", 1, "~0.03 USD", "AVAX · USDC"],
  };
  const RECV = {
    "TRC-20": "TQ7hK2mV9xPq4LrN8sWfE3bJ6yUcD9fXk",
    "ERC-20": "0x51cB7e94A0d3F28c6E1b9a47D2f05E8c3a20e",
    BTC: "bc1q9x4w7mk2v8n3hz5tq6jl0yd4rs8f2ce8z3w",
    SOL: "7Hp3QmX9kVr2N4bWfT8sJcY6uL1dE5gA9oZqRkM",
  };
  const CARDS = {
    visa: { cls: "visa", nameKey: "cards_visa", num: "4412 7380 5521 9031", cvv: "382", logo: `<span class="visa-word">VISA</span>`, spent: 1840, typeKey: "cards_virtual" },
    mc: { cls: "mc", nameKey: "cards_mc", num: "5599 2041 8836 1174", cvv: "917", logo: `<span class="mc-logo"><i></i><i></i></span>`, spent: 3260, typeKey: "cards_physical" },
    mir: { cls: "mir", nameKey: "cards_mir", num: "2200 1508 3349 6620", cvv: "054", logo: `<span class="mir-word">МИР</span>`, spent: 420, typeKey: "cards_virtual" },
  };
  const PRODUCTS = [
    { id: "coffee", cat: "g", e: "☕", bg: "linear-gradient(140deg,#F3E3D3,#E2C7A9)", key: "p_coffee", price: 18, cur: "USD" },
    { id: "fruit", cat: "g", e: "🥭", bg: "linear-gradient(140deg,#FFF0C9,#FFD98A)", key: "p_fruit", price: 12, cur: "USD" },
    { id: "sim", cat: "s", e: "📶", bg: "linear-gradient(140deg,#DCE9FB,#B9D2F5)", key: "p_sim", price: 10, cur: "EUR" },
    { id: "taxi", cat: "s", e: "🚕", bg: "linear-gradient(140deg,#FFF3D1,#FFE08F)", key: "p_taxi", price: 8, cur: "USD" },
    { id: "hotel", cat: "t", e: "🏨", bg: "linear-gradient(140deg,#E3F2E8,#BFE2CC)", key: "p_hotel", price: 120, cur: "USDT" },
    { id: "tour", cat: "t", e: "🌴", bg: "linear-gradient(140deg,#FFE8D6,#FFC9A6)", key: "p_tour", price: 85, cur: "USD" },
  ];

  let txSeq = 100;
  const state = {
    lang: localStorage.getItem("plata_lang") || "es",
    phase: "springboard",
    view: "home",
    bal: { USD: 12840.5, EUR: 3210, USDT: 1280, BTC: 0.0421, ETH: 0.91, SOL: 12.4, pUSD: 500 },
    card: "visa",
    frozen: { visa: false, mc: false, mir: true },
    limits: { visa: 5000, mc: 8000, mir: 3000 },
    tr: { amount: "250", cur: "EUR", rail: "cross", rcp: 0, step: "form", last: null },
    scanStep: "scan",
    payWith: "usdt",
    cart: {},
    marketCat: "all",
    supply: 48250000,
    stx: [
      { id: "s1", kind: "mint", amt: 250000, hash: "0x7a3f9e21…c91e", block: 19284431 },
      { id: "s2", kind: "xfer", amt: -18400, hash: "0x19bd04c7…44a0", block: 19284102 },
      { id: "s3", kind: "redeem", amt: -40000, hash: "0xe02c5b18…7f13", block: 19283877 },
    ],
    tx: [
      { id: 1, av: ["ML", "#FFE3DA", "#C2401C"], name: "María L.", subKey: "tx1_sub", amt: 42, cur: "USD", cat: "transfer", when: "today", time: "08:47" },
      { id: 2, icon: "cards", nameKey: "tx2_name", subKey: "tx2_sub", amt: -18.5, cur: "USD", cat: "card", when: "today", time: "08:15" },
      { id: 3, av: ["₮", "#D9F3E8", "#1E7A55"], nameKey: "tx3_name", subKey: "tx3_sub", amt: 500, cur: "USDT", cat: "crypto", when: "yesterday", time: "19:30" },
      { id: 4, icon: "swap", nameKey: "tx4_name", subKey: "tx4_sub", amt: -200, cur: "USD", cat: "fx", when: "yesterday", time: "12:05" },
      { id: 5, av: ["☕", "#F3E3D3", "#6B3E26"], name: "Café Habana", subKey: "cat_card", amt: -6.8, cur: "USD", cat: "card", when: "yesterday", time: "09:20" },
      { id: 6, av: ["₿", "#FFEBD1", "#B86A00"], name: "Bitcoin", subKey: "cat_crypto", amt: 0.005, cur: "BTC", cat: "crypto", when: "yesterday", time: "08:02" },
    ],
    txFilter: "all",
    notifRead: false,
    sec: { twofa: true, faceid: true, push: true },
    sheet: null,
    dirty: false,
  };

  const $ = (id) => document.getElementById(id);
  const t = (key) => {
    const v = (PLATA_I18N[state.lang] || {})[key];
    if (v != null) return v;
    const s = PLATA_STRINGS[key];
    if (s) return s[LANG_IDX[state.lang]] ?? s[0];
    return PLATA_I18N.en[key] ?? key;
  };
  const money = (n, dec = 2) => {
    const [i, f] = Math.abs(n).toFixed(dec).split(".");
    return (n < 0 ? "−" : "") + i.replace(/\B(?=(\d{3})+(?!\d))/g, ",") + (dec ? "." + f : "");
  };
  const decFor = (cur) => (cur === "BTC" ? 4 : cur === "ETH" ? 3 : 2);
  const signed = (n, cur) => (n > 0 ? "+" : "−") + money(Math.abs(n), decFor(cur));
  const flag = (cur) => `<span class="flag" style="background:${CUR[cur]?.bg || "#555"}">${CUR[cur]?.s || ""}</span>`;
  const portfolio = () => Object.entries(ASSETS).reduce((s, [, a]) => s + (state.bal[a.sym] || 0) * a.price, 0);

  /* ───────── Icons ───────── */
  const ic = (d) => `<svg viewBox="0 0 24 24">${d}</svg>`;
  const I = {
    home: ic(`<path d="M3.5 10.2 12 3.5l8.5 6.7V19a1.5 1.5 0 0 1-1.5 1.5h-4.2v-5.6H9.2v5.6H5A1.5 1.5 0 0 1 3.5 19z"/>`),
    cards: ic(`<rect x="2.5" y="5" width="19" height="14" rx="3"/><path d="M2.5 9.8h19M6.5 15h4"/>`),
    wallet: ic(`<path d="M4.5 6.5h13a2.5 2.5 0 0 1 2.5 2.5v9a2.5 2.5 0 0 1-2.5 2.5h-12A2.5 2.5 0 0 1 3 18V6.2A2.7 2.7 0 0 1 5.7 3.5H16v3"/><path d="M15.5 11.5H20v4h-4.5a2 2 0 0 1 0-4z"/>`),
    user: ic(`<circle cx="12" cy="8.2" r="4.2"/><path d="M4 20.5c.9-3.9 4.1-6.2 8-6.2s7.1 2.3 8 6.2"/>`),
    scan: ic(`<path d="M4 8V6a2 2 0 0 1 2-2h2M16 4h2a2 2 0 0 1 2 2v2M20 16v2a2 2 0 0 1-2 2h-2M8 20H6a2 2 0 0 1-2-2v-2M4 12h16"/>`),
    send: ic(`<path d="M7 17 17 7M9 7h8v8"/>`),
    down: ic(`<path d="M12 5v14M6 13l6 6 6-6"/>`),
    plus: ic(`<path d="M12 5v14M5 12h14"/>`),
    swap: ic(`<path d="M7 4 3 8l4 4M3 8h14M17 20l4-4-4-4M21 16H7"/>`),
    globe: ic(`<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c2.5 2.6 3.8 5.6 3.8 9s-1.3 6.4-3.8 9c-2.5-2.6-3.8-5.6-3.8-9S9.5 5.6 12 3z"/>`),
    bag: ic(`<path d="M5 8h14l-1 12H6L5 8z"/><path d="M9 8V6a3 3 0 0 1 6 0v2"/>`),
    coin: ic(`<circle cx="12" cy="12" r="9"/><path d="M9 9.5c0-1.1 1.3-2 3-2s3 .9 3 2-1.3 1.7-3 2.1-3 1-3 2.2 1.3 2 3 2 3-.9 3-2M12 6v1.5M12 16.5V18"/>`),
    bell: ic(`<path d="M12 3a6 6 0 0 0-6 6v4l-1.5 3h15L18 13V9a6 6 0 0 0-6-6Z"/><path d="M10 19a2 2 0 0 0 4 0"/>`),
    back: ic(`<path d="M15 5l-7 7 7 7"/>`),
    snow: ic(`<path d="M12 3v18M4.2 7.5l15.6 9M4.2 16.5l15.6-9M9.5 4.5 12 7l2.5-2.5M9.5 19.5 12 17l2.5 2.5"/>`),
    eye: ic(`<path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12z"/><circle cx="12" cy="12" r="3"/>`),
    sliders: ic(`<path d="M4 7h10M18 7h2M4 17h4M12 17h8"/><circle cx="16" cy="7" r="2"/><circle cx="10" cy="17" r="2"/>`),
    check: ic(`<path d="M5 12.5 10 17 19 7.5"/>`),
    search: ic(`<circle cx="11" cy="11" r="6.5"/><path d="m16 16 4 4"/>`),
    shield: ic(`<path d="M12 3 4.5 6v5.5c0 4.6 3.2 8.3 7.5 9.5 4.3-1.2 7.5-4.9 7.5-9.5V6L12 3z"/><path d="m9 12 2 2 4-4"/>`),
    lang: ic(`<path d="M4 5h9M8.5 3v2M6 5c.5 3.5 2.5 6 6 7.5M11 5c-.6 3.6-3 6.4-6.5 8M13 21l4-9 4 9M14.5 17.5h5"/>`),
    logout: ic(`<path d="M14 4h4a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-4M10 16l-4-4 4-4M6 12h10"/>`),
    lock: ic(`<rect x="5" y="11" width="14" height="9" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/>`),
    copy: ic(`<rect x="8" y="8" width="12" height="12" rx="2"/><path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2"/>`),
    mark: `<svg viewBox="0 0 64 64" fill="none"><circle cx="32" cy="32" r="29" stroke="currentColor" stroke-width="3"/><path d="M25 46V19h9.5a7.5 7.5 0 0 1 0 15H25" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
    contactless: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" opacity=".85"><path d="M8 8.5a5 5 0 0 1 0 7M11.5 6a8.5 8.5 0 0 1 0 12M15 3.5a12 12 0 0 1 0 17"/></svg>`,
    emv: `<svg width="40" height="30" viewBox="0 0 40 30"><defs><linearGradient id="emv" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#F3DDA4"/><stop offset="1" stop-color="#B8934A"/></linearGradient></defs><rect x=".5" y=".5" width="39" height="29" rx="6" fill="url(#emv)"/><path d="M13 .5v29M27 .5v29M.5 10h12.5M.5 20h12.5M27 10h12.5M27 20h12.5M13 15h14" stroke="#8C6E33" stroke-opacity=".55"/></svg>`,
  };
  const MOD_ICON = { home: I.home, cards: I.cards, crypto: I.wallet, transfer: I.globe, scan: I.scan, market: I.bag, stable: I.coin };
  const sized = (svg, size = 18, w = 2) => svg.replace("<svg", `<svg width="${size}" height="${size}" stroke="currentColor" fill="none" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round"`);

  function qrSVG(seedStart) {
    const N = 25;
    let seed = seedStart;
    const rnd = () => ((seed = (seed * 1103515245 + 12345) & 0x7fffffff) / 0x7fffffff);
    const inFinder = (x, y) => (x < 8 && y < 8) || (x > N - 9 && y < 8) || (x < 8 && y > N - 9);
    let r = "";
    for (let y = 0; y < N; y++) for (let x = 0; x < N; x++) {
      if (inFinder(x, y) || (x >= 10 && x < 15 && y >= 10 && y < 15)) continue;
      if (rnd() > 0.52) r += `<rect x="${x}" y="${y}" width="1" height="1"/>`;
    }
    const finder = (x, y) => `<rect x="${x}" y="${y}" width="7" height="7" rx="1.6"/><rect x="${x + 1}" y="${y + 1}" width="5" height="5" rx="1" fill="#fff"/><rect x="${x + 2}" y="${y + 2}" width="3" height="3" rx=".6"/>`;
    return `<svg viewBox="0 0 ${N} ${N}" fill="#1A1C17" shape-rendering="crispEdges">${r}${finder(0, 0)}${finder(N - 7, 0)}${finder(0, N - 7)}<rect x="10.8" y="10.8" width="3.4" height="3.4" rx="1" fill="#FF5A30"/></svg>`;
  }
  const QR = qrSVG(20261022);

  /* ───────── Shared fragments ───────── */
  const txName = (x) => (x.nameKey ? t(x.nameKey) : x.name);
  const txSub = (x) => (x.subKey ? t(x.subKey) : x.sub || "");
  const txIcon = (x) => x.icon ? `<div class="ric">${I[x.icon]}</div>` : `<div class="ric" style="background:${x.av[1]};color:${x.av[2]}">${x.av[0]}</div>`;
  const txRow = (x) => `
    <div class="row ${x.fresh ? "fresh" : ""}" data-act="tx" data-arg="${x.id}">${txIcon(x)}
      <div><div class="rn">${txName(x)}</div><div class="rs">${txSub(x)}</div></div>
      <div class="ra ${x.amt > 0 ? "pos" : ""}">${signed(x.amt, x.cur)}<small>${x.cur}</small></div></div>`;
  const backBtn = (to = "home") => `<button class="icbtn" data-go="${to}">${I.back}</button>`;
  const addTx = (x) => { state.tx.forEach((o) => (o.fresh = false)); state.tx.unshift({ id: ++txSeq, when: "today", time: "09:4" + (txSeq % 10), fresh: true, ...x }); };

  /* ───────── Launch views ───────── */
  const SB_ICON = {
    calendar: ["linear-gradient(160deg,#fff,#F1F1F1)", null],
    photos: ["linear-gradient(160deg,#FFB86B,#FF6B8A 60%,#8A6BFF)", `<circle cx="12" cy="8" r="3"/><circle cx="8" cy="14" r="3"/><circle cx="16" cy="14" r="3"/>`],
    camera: ["linear-gradient(160deg,#9AA0A6,#5F6368)", `<rect x="3" y="7" width="18" height="13" rx="3"/><path d="M8 7l1.5-3h5L16 7"/><circle cx="12" cy="13.5" r="3.5"/>`],
    mail: ["linear-gradient(160deg,#5AB8FF,#1A73E8)", `<rect x="3" y="5.5" width="18" height="13" rx="2.5"/><path d="m4 7 8 6 8-6"/>`],
    clock: ["linear-gradient(160deg,#2B2B2B,#000)", `<circle cx="12" cy="12" r="8.5"/><path d="M12 7v5l3.5 2"/>`],
    weather: ["linear-gradient(160deg,#6EC6FF,#2A7BE4)", `<circle cx="9" cy="9" r="3.5"/><path d="M8 19h9a3.5 3.5 0 0 0 0-7 5 5 0 0 0-9.6 1.6A3 3 0 0 0 8 19z"/>`],
    maps: ["linear-gradient(160deg,#B7E4A8,#5BBF6E)", `<path d="M9 4 3 6v14l6-2 6 2 6-2V4l-6 2-6-2z"/><path d="M9 4v14M15 6v14"/>`],
    notes: ["linear-gradient(160deg,#FFE680,#FFC93C)", `<path d="M6 4h12v16H6z"/><path d="M9 9h6M9 13h6M9 17h4"/>`],
    settings: ["linear-gradient(160deg,#B0B4B9,#6E7378)", `<circle cx="12" cy="12" r="3.2"/><path d="M12 2.8v2.6M12 18.6v2.6M21.2 12h-2.6M5.4 12H2.8M18.5 5.5l-1.8 1.8M7.3 16.7l-1.8 1.8M18.5 18.5l-1.8-1.8M7.3 7.3 5.5 5.5"/>`],
    music: ["linear-gradient(160deg,#FF6B81,#FA2D48)", `<path d="M9 18V6l10-2v12"/><circle cx="6.5" cy="18" r="2.5"/><circle cx="16.5" cy="16" r="2.5"/>`],
    messages: ["linear-gradient(160deg,#6BE37A,#28C840)", `<path d="M12 4c4.7 0 8.5 3.1 8.5 7s-3.8 7-8.5 7c-1 0-2-.1-2.9-.4L5 19.5l1.2-3.4C4.5 14.8 3.5 13 3.5 11c0-3.9 3.8-7 8.5-7z"/>`],
    phone: ["linear-gradient(160deg,#6BE37A,#28C840)", `<path d="M7 3.5h2.5l1.5 4-2 1.3a10 10 0 0 0 6.2 6.2l1.3-2 4 1.5V17a3 3 0 0 1-3 3A15.5 15.5 0 0 1 4 6.5a3 3 0 0 1 3-3z"/>`],
    browser: ["linear-gradient(160deg,#7CC4FF,#2F80ED)", `<circle cx="12" cy="12" r="8.5"/><path d="m15.5 8.5-2 5-5 2 2-5 5-2z"/>`],
  };
  function sbApp(k) {
    const [bg, path] = SB_ICON[k];
    const day = new Date().getDate();
    const inner = k === "calendar"
      ? `<div style="text-align:center;line-height:1;color:#111"><div style="font-size:9px;font-weight:600;color:#FA2D48;text-transform:uppercase">${new Intl.DateTimeFormat(LOCALE[state.lang], { weekday: "short" }).format(new Date())}</div><div style="font-size:26px;font-weight:400;margin-top:2px">${day}</div></div>`
      : `<svg viewBox="0 0 24 24">${path}</svg>`;
    return `<button class="app" data-act="wiggle"><span class="ai" style="background:${bg}">${inner}</span><span>${t("sb_" + k)}</span></button>`;
  }
  function vSpringboard() {
    const d = new Intl.DateTimeFormat(LOCALE[state.lang], { weekday: "long", day: "numeric", month: "long" }).format(new Date());
    return `
      <div class="sb-clock"><div class="d">${d}</div><div class="h">9:41</div></div>
      <div class="sb-grid">
        ${["calendar", "photos", "camera", "mail", "clock", "weather", "maps", "notes"].map(sbApp).join("")}
        <button class="app plata" data-act="launch" id="plataIcon"><span class="ai">${I.mark}</span><span>Plata</span></button>
        ${sbApp("settings")}
      </div>
      <div class="sb-dots"><i></i><i></i></div>
      <div class="sb-dock">${["phone", "browser", "messages", "music"].map(sbApp).join("")}</div>`;
  }
  function vSplash() {
    return `
      <div class="splash-logo">${I.mark}</div>
      <div class="splash-name">Plata</div>
      <div class="splash-tag">${t("tagline")}</div>
      <div class="splash-bar"><i></i></div>
      <div class="splash-sec">${I.lock}${t("secure_conn")}</div>`;
  }
  function vSkeleton() {
    const sk = (w, h, extra = "") => `<div class="sk" style="width:${w};height:${h}px;${extra}"></div>`;
    return `
      <div class="hdr"><div>${sk("90px", 10)}${sk("150px", 24, "margin-top:8px")}</div><div class="hdr-r">${sk("42px", 42, "border-radius:50%")}${sk("42px", 42, "border-radius:50%")}</div></div>
      ${sk("100%", 186, "border-radius:26px")}
      <div style="display:flex;gap:8px;margin-top:12px">${sk("120px", 54, "border-radius:18px")}${sk("120px", 54, "border-radius:18px")}${sk("100px", 54, "border-radius:18px")}</div>
      <div class="quick">${sk("58px", 58, "border-radius:20px;margin:0 auto")}${sk("58px", 58, "border-radius:20px;margin:0 auto")}${sk("58px", 58, "border-radius:20px;margin:0 auto")}${sk("58px", 58, "border-radius:20px;margin:0 auto")}</div>
      ${sk("140px", 16, "margin-top:24px")}
      ${sk("100%", 210, "border-radius:22px;margin-top:10px")}`;
  }

  /* ───────── App views ───────── */
  function vHome() {
    const [i, f] = money(state.bal.USD).split(".");
    return `
      <div class="hdr">
        <div><div class="greet">${t("greet")}</div><div class="uname">${t("userName")}</div></div>
        <div class="hdr-r"><button class="icbtn" data-act="notif">${I.bell}${state.notifRead ? "" : `<i class="dot"></i>`}</button><button class="avatar" data-go="profile">CM</button></div>
      </div>
      <div class="bcard" data-act="account" data-arg="USD">
        <div class="top"><span>${t("mainAccount")}</span><span class="mk">${I.mark}</span></div>
        <div class="bal" id="homeBal">${i}<small>.${f} USD</small></div>
        <div class="sub">${t("accountMask")}</div>
        <div class="acts">
          <button class="pill" data-act="topup"><span class="gl">+</span>${t("topUp")}</button>
          <button class="pill" data-go="transfer"><span class="gl">↗</span>${t("send")}</button>
        </div>
      </div>
      <div class="accs">
        ${["EUR", "USDT", "BTC", "pUSD"].map((c) => `<button class="acc" data-act="account" data-arg="${c}"><div class="cur" style="background:${CUR[c].bg}">${CUR[c].s}</div><div><b>${money(state.bal[c], decFor(c))}</b><span>${c}</span></div></button>`).join("")}
      </div>
      <div class="quick">
        <button class="qa" data-go="transfer"><span class="qi">${I.globe}</span>${t("transfer")}</button>
        <button class="qa" data-go="scan"><span class="qi">${I.scan}</span>${t("m_scan")}</button>
        <button class="qa" data-go="market"><span class="qi">${I.bag}</span>${t("m_market")}</button>
        <button class="qa" data-go="stable"><span class="qi">${I.coin}</span>${t("m_stable")}</button>
      </div>
      <div class="sect">${t("recent")}<button data-go="history" style="color:var(--accent);font-size:13px;font-weight:500">${t("all")}</button></div>
      <div class="list">${state.tx.slice(0, 4).map(txRow).join("")}</div>`;
  }

  function vHistory() {
    const f = state.txFilter;
    const list = state.tx.filter((x) => f === "all" || (f === "in" && x.amt > 0) || (f === "out" && x.amt < 0) || (f === "crypto" && x.cat === "crypto"));
    const group = (w) => {
      const items = list.filter((x) => x.when === w);
      return items.length ? `<div class="lbl-sm" style="margin-top:14px">${t(w)}</div><div class="list">${items.map(txRow).join("")}</div>` : "";
    };
    return `
      <div class="title-row">${backBtn()}<h2>${t("history_title")}</h2></div>
      <div class="chips">${["all", "in", "out", "crypto"].map((k) => `<button class="chip ${f === k ? "on" : ""}" data-act="filter" data-arg="${k}">${t("f_" + k)}</button>`).join("")}</div>
      ${list.length ? group("today") + group("yesterday") : `<div class="empty"><div>🗂️</div>${t("no_tx")}</div>`}`;
  }

  function vCards() {
    const c = CARDS[state.card];
    const frozen = state.frozen[state.card];
    const limit = state.limits[state.card];
    const pct = Math.min(100, Math.round((c.spent / limit) * 100));
    return `
      <div class="title-row"><h2>${t("cards_title")}</h2><button class="icbtn sp" data-act="issue">${I.plus}</button></div>
      <div class="chips">${Object.keys(CARDS).map((k) => `<button class="chip ${k === state.card ? "on" : ""}" data-act="card" data-arg="${k}">${t(CARDS[k].nameKey)}</button>`).join("")}</div>
      <div class="pcard ${c.cls} ${frozen ? "is-frozen" : ""}" data-act="cardDetails" style="cursor:pointer">
        <div class="p-top">
          <div><div class="p-bank">${I.mark}Plata</div><div class="p-type">${t(c.typeKey)}</div></div>
          ${I.contactless}
        </div>
        <div class="chipic">${I.emv}</div>
        <div class="num">${(c.num.slice(0, 4) + "  ••••  ••••  " + c.num.slice(-4)).replace(/ /g, NB)}</div>
        <div class="p-bot"><div><span class="lbl">Carlos M.</span>12 / 29</div><div class="netlogo">${c.logo}</div></div>
        ${frozen ? `<div class="frozen-tag">❄ ${t("cards_frozen")}</div>` : ""}
      </div>
      <div class="card-acts">
        <button class="qa" data-act="freeze"><span class="qi">${I.snow}</span>${frozen ? t("cards_active") : t("cards_freeze")}</button>
        <button class="qa" data-act="cardDetails"><span class="qi">${I.eye}</span>${t("cards_details")}</button>
        <button class="qa" data-act="limit"><span class="qi">${I.sliders}</span>${t("cards_limit")}</button>
      </div>
      <button class="meter" data-act="limit" style="width:100%;text-align:left">
        <div class="mt"><span>${t("cards_spent")}</span><b>${money(c.spent)} / ${money(limit, 0)} USD</b></div>
        <div class="bar"><i style="width:${pct}%"></i></div>
      </button>
      <div style="height:14px"></div>
      <button class="btn dark" data-act="issue">${sized(I.plus)}${t("cards_issue")}</button>`;
  }

  function vCrypto() {
    const total = portfolio();
    const [i, f] = money(total).split(".");
    return `
      <div class="title-row"><h2>${t("crypto_title")}</h2></div>
      <div class="bcard">
        <div class="top"><span>${t("crypto_total")}</span><span class="mk">${I.mark}</span></div>
        <div class="bal">${i}<small>.${f} USD</small><span class="delta">▲ 2.4%</span></div>
        <svg class="spark" viewBox="0 0 320 46" preserveAspectRatio="none">
          <defs><linearGradient id="sg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#E0BE7A" stop-opacity=".35"/><stop offset="1" stop-color="#E0BE7A" stop-opacity="0"/></linearGradient></defs>
          <path d="M0 38 L25 34 L50 36 L75 28 L100 30 L125 22 L150 26 L175 18 L200 21 L225 14 L250 17 L275 9 L300 11 L320 5 L320 46 L0 46 Z" fill="url(#sg)"/>
          <path class="l" d="M0 38 L25 34 L50 36 L75 28 L100 30 L125 22 L150 26 L175 18 L200 21 L225 14 L250 17 L275 9 L300 11 L320 5"/>
        </svg>
        <div class="acts">
          <button class="pill" data-act="send"><span class="gl">↗</span>${t("crypto_send")}</button>
          <button class="pill" data-act="receive"><span class="gl">↓</span>${t("crypto_receive")}</button>
        </div>
      </div>
      <div class="sect">${t("crypto_networks")}<span>${t("crypto_chains")} · ${t("crypto_assets")}</span></div>
      <div class="nets">${Object.entries(NETS).map(([k, n]) => `<button class="net" data-act="network" data-arg="${k}"><i class="${n[1]}">${n[0][0]}</i>${n[0]}</button>`).join("")}</div>
      <div class="sect">${t("crypto_total")}</div>
      <div class="list">${Object.entries(ASSETS).map(([k, a]) => {
        const v = state.bal[a.sym] * a.price;
        return `<div class="row" data-act="asset" data-arg="${k}"><div class="coin ${a.cls}">${a.g}</div><div><div class="rn">${a.name}</div><div class="rs">${money(state.bal[a.sym], a.dec)} ${a.sym}</div></div><div class="ra">${money(v)}<small class="${a.chg ? "up" : "flat"}">${a.chg ? "+" : ""}${a.chg.toFixed(1)}%</small></div></div>`;
      }).join("")}</div>`;
  }

  function trCalc() {
    const amt = parseFloat(state.tr.amount) || 0;
    const rail = RAILS[state.tr.rail];
    return { amt, fee: rail.fee, rail, recv: amt * RATES[state.tr.cur], rate: RATES[state.tr.cur], total: amt + rail.fee };
  }

  function vTransfer() {
    const r = RECIPIENTS[state.tr.rcp];
    const c = trCalc();
    if (state.tr.step === "done") {
      const L = state.tr.last;
      return `
        <div class="done">
          <div class="check"><i>${I.check}</i></div>
          <h3>${t("transfer_success")}</h3>
          <div class="big">${money(L.recv)} ${L.cur}</div>
          <p>${L.name} · ${L.meta}</p>
          <div class="timeline">
            <div class="tl"><i>${I.check}</i><div>${t("transfer_send")} · ${money(L.amt)} USD</div><span>09:41:02</span></div>
            <div class="tl"><i>${I.check}</i><div>${t("transfer_rate")} · 1 USD = ${L.rate} ${L.cur}</div><span>09:41:03</span></div>
            <div class="tl"><i>${I.check}</i><div>${t("transfer_track")}</div><span>PL-7Q2K9</span></div>
          </div>
          <div class="btn-row"><button class="btn line" data-act="receiptToast">${t("receipt")}</button><button class="btn dark" data-act="transferHome">${t("m_home")}</button></div>
        </div>`;
    }
    const busy = state.tr.step === "processing";
    const railName = { cross: t("transfer_cross"), swift: "SWIFT", usdt: "USDT" };
    return `
      <div class="title-row">${backBtn()}<h2>${t("transfer_title")}</h2></div>
      <div class="chips">${Object.keys(RAILS).map((k) => `<button class="chip ${state.tr.rail === k ? "on" : ""}" data-act="rail" data-arg="${k}">${railName[k]}</button>`).join("")}</div>
      <button class="recip" data-act="recipient" style="width:100%;text-align:left"><div class="avatar" style="background:${r.bg};color:${r.fg}">${r.av}</div><div><b>${r.name}</b><span>${r.meta}</span></div><span class="chg">${t("change")}</span></button>
      <button class="amt focus" data-act="keypad" style="width:100%;text-align:left"><label>${t("transfer_send")}</label><div class="av"><b>${money(c.amt)}</b><span class="cur-pill">${flag("USD")}USD</span></div></button>
      <div class="swap"><i>${I.swap}</i></div>
      <div class="amt"><label>${t("transfer_receive")}</label><div class="av"><b>${money(c.recv)}</b><button class="cur-pill" data-act="currency">${flag(state.tr.cur)}${state.tr.cur} ▾</button></div></div>
      <div class="lines">
        <div class="ln"><span>${t("transfer_rate")}</span><b>1 USD = ${c.rate} ${state.tr.cur}</b></div>
        <div class="ln"><span>${t("transfer_fee")}</span><b>${money(c.fee)} USD</b></div>
        <div class="ln"><span>${t("speed")}</span><b>${t(c.rail.speed)}</b></div>
        <div class="ln total"><span>${t("transfer_total")}</span><b>${money(c.total)} USD</b></div>
      </div>
      <button class="btn" data-act="sendTransfer" ${busy || !c.amt ? "disabled" : ""}>${busy ? `<span class="spinner"></span>${t("processing")}` : t("transfer_continue")}</button>`;
  }

  const PAY = {
    usdt: { coin: `<span class="coin c-usdt">₮</span>`, name: "USDT", amt: "12.40", cur: "USDT", debit: ["USDT", 12.4], label: "Tether TRC-20" },
    btc: { coin: `<span class="coin c-btc">₿</span>`, name: "BTC", amt: "0.00018", cur: "BTC", debit: ["BTC", 0.00018], label: "Bitcoin" },
    card: { coin: `<span class="coin" style="background:#1A3A6B;font-size:9px;font-style:italic">VISA</span>`, name: "Visa", amt: "12.40", cur: "USD", debit: ["USD", 12.4], label: "Visa •• 9031" },
  };
  function vScan() {
    const p = PAY[state.payWith];
    if (state.scanStep === "paid") {
      return `
        <div class="done">
          <div class="check"><i>${I.check}</i></div>
          <h3>${t("scan_paid")}</h3>
          <div class="big">${p.amt} ${p.cur}</div>
          <p>${t("scan_merchant")} · ${t("scan_order")}</p>
          <div class="timeline">
            <div class="tl"><i>${I.check}</i><div>${t("scan_asset")} · ${p.label}</div><span>09:42:10</span></div>
            <div class="tl"><i>${I.check}</i><div>${t("transfer_track")}</div><span>SP-48XN1</span></div>
          </div>
          <div class="btn-row"><button class="btn line" data-act="rescan">${t("rescan")}</button><button class="btn dark" data-go="home">${t("m_home")}</button></div>
        </div>`;
    }
    const busy = state.scanStep === "processing";
    return `
      <div class="scan-head"><h2>${t("scan_title")}</h2><button class="icbtn" data-go="home">✕</button></div>
      <div class="finder" data-act="rescan" style="cursor:pointer">
        <div class="qrbox">${QR}</div>
        <i class="corner tl"></i><i class="corner tr"></i><i class="corner bl"></i><i class="corner br"></i>
        <div class="scanline"></div>
        <div class="found">✓ ${t("scan_merchant")}</div>
      </div>
      <div class="sheet">
        <div class="merch" data-act="merchant">
          <div class="ml">☕</div>
          <div><b>${t("scan_merchant")}</b><span>${t("scan_order")}</span></div>
          <div class="due"><span>${t("scan_total")}</span><b>12.40 USD</b></div>
        </div>
        <div class="payopts">${Object.entries(PAY).map(([k, o]) => `<button class="po ${state.payWith === k ? "on" : ""}" data-act="payWith" data-arg="${k}">${o.coin}<b>${o.name}</b>${o.amt}</button>`).join("")}</div>
        <button class="btn" data-act="payScan" ${busy ? "disabled" : ""}>${busy ? `<span class="spinner"></span>${t("processing")}` : `${t("checkout")} · ${p.amt} ${p.cur}`}</button>
      </div>`;
  }

  const cartCount = () => Object.values(state.cart).reduce((a, b) => a + b, 0);
  function vMarket() {
    const cats = [["all", "market_featured"], ["g", "market_cat1"], ["s", "market_cat2"], ["t", "market_cat3"]];
    const list = PRODUCTS.filter((p) => state.marketCat === "all" || p.cat === state.marketCat);
    const n = cartCount();
    return `
      <div class="title-row">${backBtn()}<h2>${t("market_title")}</h2><button class="icbtn sp" data-act="cart">${I.bag}${n ? `<i class="cnt">${n}</i>` : ""}</button></div>
      <label class="search">${I.search}<input id="mSearch" placeholder="${t("market_search")}" autocomplete="off"></label>
      <div class="chips">${cats.map(([k, key]) => `<button class="chip ${state.marketCat === k ? "on" : ""}" data-act="cat" data-arg="${k}">${t(key)}</button>`).join("")}</div>
      <div class="banner" data-act="cat" data-arg="all" style="cursor:pointer"><small>${t("m_market")}</small><h3>${t("market_pay_any")}</h3><span class="curs">${t("market_currencies")}</span><div class="art">🛍️</div></div>
      <div class="grid2">${list.map((p) => `
        <div class="prod" data-act="product" data-arg="${p.id}" data-name="${t(p.key).toLowerCase()}"><div class="ph" style="background:${p.bg}">${p.e}</div><b>${t(p.key)}</b>
          <div class="pr"><span>${money(p.price)}<small style="font-size:11px;color:var(--muted);font-weight:500"> ${p.cur}</small></span>
          <button class="add ${state.cart[p.id] ? "ok" : ""}" data-act="quickAdd" data-arg="${p.id}">${state.cart[p.id] ? state.cart[p.id] : "+"}</button></div></div>`).join("")}</div>`;
  }

  function vStable() {
    const C = 2 * Math.PI * 36;
    const seg = (pct, off, color) => `<circle cx="42" cy="42" r="36" stroke="${color}" stroke-dasharray="${(pct / 100) * C} ${C}" stroke-dashoffset="${-(off / 100) * C}"/>`;
    const stxRow = (s) => {
      const meta = { mint: [I.plus, "#DFF3E8", "#1E7A55", "stable_mint"], redeem: [I.down, "#FFF1D9", "#9A6B12", "stable_redeem"], xfer: [I.send, "", "", "transfer_cross"] }[s.kind];
      return `<div class="row ${s.fresh ? "fresh" : ""}" data-act="stx" data-arg="${s.id}"><div class="ric" style="${meta[1] ? `background:${meta[1]};color:${meta[2]}` : ""}">${meta[0]}</div><div><div class="rn">${t(meta[3])}</div><div class="hash">${s.hash}</div></div><div class="ra ${s.amt > 0 ? "pos" : ""}">${s.amt > 0 ? "+" : "−"}${money(Math.abs(s.amt), 0)}<small>pUSD</small></div></div>`;
    };
    return `
      <div class="title-row">${backBtn()}<h2>${t("stable_title")}</h2></div>
      <div class="token">
        <div class="tk"><i>p$</i><div><b>pUSD</b><span>Plata USD · ERC-20 / TRC-20</span></div><span class="peg">${t("stable_peg")}</span></div>
        <div class="sup">${t("stable_supply")}</div>
        <div class="supv">${money(state.supply, 0)}</div>
        <div class="acts">
          <button class="pill" data-act="mint" data-arg="mint"><span class="gl">+</span>${t("stable_mint")}</button>
          <button class="pill ghost" data-act="mint" data-arg="redeem"><span class="gl">↓</span>${t("stable_redeem")}</button>
        </div>
      </div>
      <div class="reserve" data-act="reserve">
        <svg class="donut" viewBox="0 0 84 84">${seg(100, 0, "#E9E8E0")}${seg(62, 0, "#2F8F67")}${seg(28, 62, "#7FE3B5")}${seg(10, 90, "#E0BE7A")}</svg>
        <div class="rl">
          <div class="rh">${t("stable_reserves")} · <b>${t("stable_backed")}</b></div>
          <div><i style="background:#2F8F67"></i>USD<b>62%</b></div>
          <div><i style="background:#7FE3B5"></i>EUR<b>28%</b></div>
          <div><i style="background:#E0BE7A"></i>T-bills<b>10%</b></div>
        </div>
      </div>
      <div class="sect">${t("stable_settle")}</div>
      <div class="list">${state.stx.slice(0, 5).map(stxRow).join("")}</div>`;
  }

  function vProfile() {
    const row = (act, icon, label, val = "", arg = "") => `<button class="mrow" data-act="${act}" ${arg ? `data-arg="${arg}"` : ""} style="width:100%;text-align:left"><span class="ric">${icon}</span>${label}<em>${val}</em></button>`;
    return `
      <div class="prof"><div class="avatar">CM</div><h3>${t("userName")}</h3><span class="kyc">${sized(I.check, 12, 3)}${t("profile_kyc")}</span></div>
      <div class="menu">
        ${row("lang", I.lang, t("profile_lang"), t("langName"))}
        ${row("security", I.shield, t("security"), "2FA · Face ID")}
        ${row("notif", I.bell, t("notif_title"), state.notifRead ? "" : "3")}
        ${row("goto", I.cards, t("cards_title"), "3", "cards")}
        ${row("goto", I.wallet, t("crypto_title"), "9", "crypto")}
      </div>
      <div class="about"><b>${t("profile_about")}</b>${t("profile_about_text")}</div>
      <div style="height:12px"></div>
      <div class="menu">${row("logout", I.logout, t("logout"))}</div>`;
  }

  const VIEWS = { home: vHome, history: vHistory, cards: vCards, crypto: vCrypto, transfer: vTransfer, scan: vScan, market: vMarket, stable: vStable, profile: vProfile };

  /* ───────── Sheets ───────── */
  const head = (title) => `<div class="grab"></div><div class="bs-head"><h3>${title}</h3><button class="bs-x" data-act="closeSheet">✕</button></div>`;
  const busyBtn = (label, act) => state.sheet.step === "busy"
    ? `<button class="btn" disabled><span class="spinner"></span>${t("processing")}</button>`
    : `<button class="btn" data-act="${act}">${label}</button>`;
  const doneBlock = (title, big, sub) => `
    <div class="grab"></div>
    <div class="done"><div class="check"><i>${I.check}</i></div><h3>${title}</h3><div class="big">${big}</div><p>${sub}</p></div>
    <div style="height:18px"></div><button class="btn dark" data-act="closeSheet">${t("done")}</button>`;
  const presets = (vals, cur, fmt = (v) => money(v, 0)) => `<div class="presets">${vals.map((v) => `<button class="${cur === v ? "on" : ""}" data-act="preset" data-arg="${v}">${fmt(v)}</button>`).join("")}</div>`;

  const SHEETS = {
    tx(s) {
      const x = state.tx.find((o) => o.id === s.id);
      if (!x) return "";
      return `${head(t("tx_details"))}
        <div class="bs-hero">${txIcon(x)}<b class="${x.amt > 0 ? "pos" : ""}">${signed(x.amt, x.cur)} ${x.cur}</b><span>${txName(x)}</span></div>
        <div class="kv">
          <div><span>${t("status")}</span><b class="pos">✓ ${t("completed")}</b></div>
          <div><span>${t("date")}</span><b>${t(x.when)}, ${x.time}</b></div>
          <div><span>${t("category")}</span><b>${t("cat_" + x.cat)}</b></div>
          <div><span>${t("tx_id")}</span><b class="mono">PL-${(x.id * 7919).toString(36).toUpperCase()}</b></div>
        </div>
        <div class="btn-row"><button class="btn line" data-act="receiptToast">${t("receipt")}</button><button class="btn dark" data-act="repeat" data-arg="${x.cat}">${t("repeat")}</button></div>`;
    },
    notif() {
      const n = (i, icon, bg, fg, title, body, ago, act, arg) => `<button class="notif" data-act="${act}" data-arg="${arg}"><span class="ric" style="background:${bg};color:${fg}">${icon}</span><div><b>${title}${state.notifRead ? "" : `<i class="unread"></i>`}</b><span>${body}</span></div><em>${ago} ${t("min_ago")}</em></button>`;
      return `${head(t("notif_title"))}
        <div class="list" style="padding:4px 14px">
          ${n(1, "ML", "#FFE3DA", "#C2401C", t("n1_t"), "María L. · +42.00 USD", 2, "tx", 1)}
          ${n(2, sized(I.cards, 18, 1.8), "#EEECE4", "#252722", t("n2_t"), "Visa •• 4412 · −18.50 USD", 34, "tx", 2)}
          ${n(3, sized(I.shield, 18, 1.8), "#DFF3E8", "#1E7A55", t("n3_t"), t("n3_b"), 58, "security", "")}
        </div>
        <div style="height:14px"></div>
        <button class="btn line" data-act="markRead">${t("mark_read")}</button>`;
    },
    account(s) {
      const c = s.cur;
      const nums = { USD: "PL 4821 0093 7710", EUR: "PL 4821 0093 7711", USDT: "TQ7h…9fXk · TRC-20", BTC: "bc1q9x…8z3w", pUSD: "0x51cB…a20e · ERC-20" };
      const crypto = ["USDT", "BTC", "pUSD"].includes(c);
      return `${head(t("account_details"))}
        <div class="bs-hero"><div class="ric" style="background:${CUR[c].bg};color:#fff;border-radius:50%">${CUR[c].s}</div><b>${money(state.bal[c], decFor(c))} ${c}</b><span>${t("balance")}</span></div>
        <div class="kv">
          <div><span>${t("holder")}</span><b>Carlos M.</b></div>
          <div><span>${crypto ? t("address") : t("account_number")}</span><b class="mono">${nums[c]}<button class="cp" data-act="copyToast">${t("copy")}</button></b></div>
          <div><span>${t("status")}</span><b class="pos">✓ ${t("cards_active")}</b></div>
        </div>
        <div class="btn-row">
          ${crypto ? `<button class="btn line" data-act="receive">${t("crypto_receive")}</button>` : `<button class="btn line" data-act="topup">${t("topUp")}</button>`}
          <button class="btn dark" data-act="exchange" data-arg="${c === "BTC" || c === "pUSD" ? "USDT" : c}">${t("exchange")}</button>
        </div>`;
    },
    topup(s) {
      if (s.step === "done") return doneBlock(t("topup_done"), `+${money(s.amt)} USD`, t(s.method === "card" ? "m_card" : s.method === "bank" ? "m_bank" : "m_crypto_dep"));
      const m = (k, icon, key) => `<button class="opt ${s.method === k ? "on" : ""}" data-act="method" data-arg="${k}"><span class="ric">${icon}</span>${t(key)}<span class="radio"></span></button>`;
      return `${head(t("topup_title"))}
        <div class="lbl-sm">${t("method")}</div>
        ${m("card", I.cards, "m_card")}${m("bank", I.globe, "m_bank")}${m("crypto", I.coin, "m_crypto_dep")}
        <div class="lbl-sm" style="margin-top:12px">${t("transfer_amount")} · USD</div>
        ${presets([100, 250, 500], s.amt)}
        ${busyBtn(`${t("topUp")} · ${money(s.amt)} USD`, "doTopup")}`;
    },
    exchange(s) {
      const rate = RATES[s.to] / RATES[s.from];
      if (s.step === "done") return doneBlock(t("exchange_done"), `${money(s.amt * rate)} ${s.to}`, `${money(s.amt)} ${s.from} → ${s.to}`);
      const row = (dir, cur, amt) => `<button class="opt" data-act="cycleCur" data-arg="${dir}">${flag(cur)}<div>${t(dir)} · ${cur}<small>${t("balance")}: ${money(state.bal[cur])}</small></div><em style="font-size:18px;color:var(--ink);font-weight:600">${money(amt)}</em></button>`;
      return `${head(t("exchange"))}
        ${row("from", s.from, s.amt)}
        <div class="swap" style="margin:-4px 0 4px"><i data-act="swapCur" style="cursor:pointer">${I.swap}</i></div>
        ${row("to", s.to, s.amt * rate)}
        <div class="lbl-sm" style="margin-top:12px">${t("transfer_amount")} · ${s.from}</div>
        ${presets([100, 500, 1000], s.amt)}
        <div class="lines" style="margin-top:0"><div class="ln"><span>${t("transfer_rate")}</span><b>1 ${s.from} = ${rate.toFixed(4)} ${s.to}</b></div><div class="ln"><span>${t("transfer_fee")}</span><b>0.00</b></div></div>
        ${busyBtn(t("confirm"), "doExchange")}`;
    },
    recipient() {
      return `${head(t("choose_recipient"))}
        ${RECIPIENTS.map((r, i) => `<button class="opt ${state.tr.rcp === i ? "on" : ""}" data-act="pickRecipient" data-arg="${i}"><span class="avatar" style="background:${r.bg};color:${r.fg}">${r.av}</span><div>${r.name}<small>${r.meta}</small></div><span class="radio"></span></button>`).join("")}`;
    },
    currency() {
      return `${head(t("choose_currency"))}
        ${Object.keys(RATES).map((c) => `<button class="opt ${state.tr.cur === c ? "on" : ""}" data-act="pickCurrency" data-arg="${c}">${flag(c)}<div>${c}<small>1 USD = ${RATES[c]} ${c}</small></div><span class="radio"></span></button>`).join("")}`;
    },
    keypad(s) {
      const recv = (parseFloat(s.val) || 0) * RATES[state.tr.cur];
      return `${head(t("enter_amount"))}
        <div class="kp-val">${s.val || "0"}<small>USD</small></div>
        <div class="kp-sub">≈ ${money(recv)} ${state.tr.cur}</div>
        <div class="keypad">${["1", "2", "3", "4", "5", "6", "7", "8", "9", ".", "0", "⌫"].map((k) => `<button data-act="key" data-arg="${k}">${k}</button>`).join("")}</div>
        <button class="btn" data-act="keypadDone">${t("done")}</button>`;
    },
    cardDetails(s) {
      const c = CARDS[state.card];
      return `${head(t("cards_details") + " · " + t(c.nameKey))}
        <div class="kv">
          <div><span>${t("card_number")}</span><b class="mono">${s.show ? c.num : c.num.slice(0, 4) + " •••• •••• " + c.num.slice(-4)}<button class="cp" data-act="copyToast">${t("copy")}</button></b></div>
          <div><span>${t("expiry")}</span><b>12 / 29</b></div>
          <div><span>CVV</span><b class="mono">${s.show ? c.cvv : "•••"}</b></div>
          <div><span>${t("holder")}</span><b>CARLOS M.</b></div>
        </div>
        <button class="btn dark" data-act="toggleShow">${sized(I.eye)}${s.show ? t("hide") : t("show")}</button>`;
    },
    limit(s) {
      return `${head(t("cards_limit") + " · " + t(CARDS[state.card].nameKey))}
        <div class="range-v" id="rangeV">${money(s.val, 0)} USD</div>
        <input class="range" type="range" min="500" max="20000" step="500" value="${s.val}" id="limitRange">
        <div class="range-l"><span>500</span><span>20,000</span></div>
        <button class="btn" data-act="saveLimit">${t("save")}</button>`;
    },
    issue(s) {
      if (s.step === "done") return doneBlock(t("issue_done"), t(CARDS[s.net].nameKey), `${t(s.type === "virtual" ? "cards_virtual" : "cards_physical")} · Plata`);
      return `${head(t("issue_now"))}
        <div class="lbl-sm">${t("issue_network")}</div>
        ${Object.entries(CARDS).map(([k, c]) => `<button class="opt ${s.net === k ? "on" : ""}" data-act="issueNet" data-arg="${k}"><span class="ric" style="background:${{ visa: "#1A3A6B", mc: "#2B241F", mir: "#145440" }[k]};color:#fff;font-size:11px;font-weight:700">${{ visa: "VISA", mc: "MC", mir: "МИР" }[k]}</span>${t(c.nameKey)}<span class="radio"></span></button>`).join("")}
        <div class="lbl-sm" style="margin-top:12px">${t("issue_type")}</div>
        <div class="chips">${["virtual", "physical"].map((k) => `<button class="chip ${s.type === k ? "on" : ""}" data-act="issueType" data-arg="${k}">${t("cards_" + k)}</button>`).join("")}</div>
        ${busyBtn(t("issue_now"), "doIssue")}`;
    },
    send(s) {
      const a = ASSETS[s.asset];
      const pre = { usdt: [50, 100, 250], btc: [0.001, 0.005, 0.01], eth: [0.05, 0.1, 0.25], sol: [1, 2.5, 5] }[s.asset];
      const fee = { usdt: "1.00 USDT", btc: "0.00002 BTC", eth: "0.0004 ETH", sol: "0.000005 SOL" }[s.asset];
      if (s.step === "done") return doneBlock(t("crypto_sent"), `${s.amt} ${a.sym}`, "TQ7h…9fXk");
      return `${head(t("crypto_send"))}
        <div class="lbl-sm">${t("asset")}</div>
        <div class="chips">${Object.entries(ASSETS).map(([k, x]) => `<button class="chip ${s.asset === k ? "on" : ""}" data-act="sendAsset" data-arg="${k}">${x.sym}</button>`).join("")}</div>
        <div class="kv">
          <div><span>${t("address")}</span><b class="mono">TQ7h…9fXk</b></div>
          <div><span>${t("balance")}</span><b>${money(state.bal[a.sym], a.dec)} ${a.sym}</b></div>
          <div><span>${t("network_fee")}</span><b>${fee}</b></div>
        </div>
        <div class="lbl-sm">${t("transfer_amount")} · ${a.sym}</div>
        ${presets(pre, s.amt, (v) => String(v))}
        ${busyBtn(`${t("crypto_send")} · ${s.amt} ${a.sym}`, "doSend")}`;
    },
    receive(s) {
      const addr = RECV[s.net];
      return `${head(t("crypto_receive"))}
        <div class="chips" style="justify-content:center">${Object.keys(RECV).map((k) => `<button class="chip ${s.net === k ? "on" : ""}" data-act="recvNet" data-arg="${k}">${k}</button>`).join("")}</div>
        <div class="qr-big">${qrSVG(addr.length * 7919 + addr.charCodeAt(3))}</div>
        <div class="addr">${addr}</div>
        <p class="hint-sm">${t("receive_hint")}</p>
        <div class="btn-row"><button class="btn line" data-act="copyToast">${sized(I.copy)}${t("copy")}</button><button class="btn dark" data-act="shareToast">${t("share")}</button></div>`;
    },
    asset(s) {
      const a = ASSETS[s.id];
      const pts = Array.from({ length: 24 }, (_, i) => 90 - i * 2.6 + Math.sin(i * 1.3 + a.price) * 12);
      const d = pts.map((y, i) => `${i ? "L" : "M"}${(i * 320) / 23} ${y.toFixed(1)}`).join(" ");
      return `${head(a.name)}
        <div class="bs-hero"><span class="coin ${a.cls}">${a.g}</span><b>${money(a.price)} USD</b><span class="${a.chg ? "up" : "flat"}">${a.chg ? "+" : ""}${a.chg.toFixed(1)}% · 24h</span></div>
        <svg class="chart" viewBox="0 0 320 120" preserveAspectRatio="none"><path d="${d} L320 120 L0 120 Z" fill="rgba(255,90,48,.08)"/><path class="l" d="${d}"/></svg>
        <div class="kv">
          <div><span>${t("holdings")}</span><b>${money(state.bal[a.sym], a.dec)} ${a.sym}</b></div>
          <div><span>${t("balance")}</span><b>${money(state.bal[a.sym] * a.price)} USD</b></div>
        </div>
        <div class="btn-row"><button class="btn line" data-act="receive">${t("crypto_receive")}</button><button class="btn dark" data-act="send" data-arg="${s.id}">${t("crypto_send")}</button></div>`;
    },
    network(s) {
      const n = NETS[s.id];
      return `${head(n[0])}
        <div class="bs-hero"><span class="coin ${n[1]}">${n[0][0]}</span><span class="kyc">● ${t("net_status")}</span></div>
        <div class="kv">
          <div><span>${t("tokens")}</span><b>${n[4]}</b></div>
          <div><span>${t("confirmations")}</span><b>${n[2]}</b></div>
          <div><span>${t("avg_fee")}</span><b>${n[3]}</b></div>
        </div>
        <div class="btn-row"><button class="btn line" data-act="receive">${t("crypto_receive")}</button><button class="btn dark" data-act="send">${t("crypto_send")}</button></div>`;
    },
    merchant() {
      return `${head(t("scan_merchant"))}
        <div class="bs-hero"><div class="ric" style="background:linear-gradient(140deg,#6B3E26,#3C2014);color:#F3D5B5;font-size:26px">☕</div><span class="kyc">${sized(I.check, 12, 3)}${t("merchant_verified")}</span></div>
        <div class="kv">
          <div><span>${t("address")}</span><b>Calle Obispo 305, La Habana</b></div>
          <div><span>${t("category")}</span><b>Café</b></div>
          <div><span>${t("scan_asset")}</span><b>USDT · BTC · Visa · Mastercard · ${t("cards_mir")}</b></div>
        </div>
        <button class="btn dark" data-act="closeSheet">${t("close")}</button>`;
    },
    product(s) {
      const p = PRODUCTS.find((o) => o.id === s.id);
      return `${head(t(p.key))}
        <div style="height:150px;border-radius:22px;background:${p.bg};display:grid;place-items:center;font-size:72px;margin-bottom:14px">${p.e}</div>
        <p class="desc">${t("delivery_today")}</p>
        <div class="kv">
          <div><span>${t("price")}</span><b>${money(p.price)} ${p.cur}</b></div>
          <div><span>≈</span><b>${["USD", "EUR", "USDT"].filter((c) => c !== p.cur).map((c) => `${money((p.price / RATES[p.cur]) * RATES[c])} ${c}`).join(" · ")}</b></div>
          <div><span>${t("qty")}</span><span class="stepper"><button data-act="qty" data-arg="-1">−</button><b>${s.qty}</b><button data-act="qty" data-arg="1">+</button></span></div>
        </div>
        <button class="btn" data-act="addCart">${t("add_cart")} · ${money(p.price * s.qty)} ${p.cur}</button>`;
    },
    cart(s) {
      const items = Object.entries(state.cart).filter(([, q]) => q > 0).map(([id, q]) => ({ p: PRODUCTS.find((o) => o.id === id), q }));
      const totalUSD = items.reduce((sum, { p, q }) => sum + (p.price / RATES[p.cur]) * q, 0);
      if (s.step === "done") return doneBlock(t("order_paid"), `${money(s.paid)} ${s.payFrom === "usdt" ? "USDT" : "USD"}`, t("delivery_today"));
      if (!items.length) return `${head(t("cart"))}<div class="empty"><div>🛒</div>${t("cart_empty")}</div><button class="btn dark" data-act="closeSheet">${t("close")}</button>`;
      const src = (k, label) => `<button class="chip ${s.payFrom === k ? "on" : ""}" data-act="payFrom" data-arg="${k}">${label}</button>`;
      return `${head(t("cart"))}
        <div class="list" style="padding:4px 14px;margin-bottom:14px">${items.map(({ p, q }) => `<div class="cart-row"><div class="ph" style="background:${p.bg}">${p.e}</div><div><b>${t(p.key)}</b><span>${money(p.price)} ${p.cur}</span></div><span class="stepper"><button data-act="cartQty" data-arg="${p.id}:-1">−</button><b>${q}</b><button data-act="cartQty" data-arg="${p.id}:1">+</button></span></div>`).join("")}</div>
        <div class="lbl-sm">${t("pay_from")}</div>
        <div class="chips">${src("usd", t("usd_account"))}${src("usdt", "USDT")}${src("card", "Visa •• 9031")}</div>
        <div class="lines" style="margin-top:0"><div class="ln total"><span>${t("total")}</span><b>${money(totalUSD)} USD</b></div></div>
        ${busyBtn(`${t("checkout")} · ${money(totalUSD)} USD`, "doCheckout")}`;
    },
    mint(s) {
      const isMint = s.mode === "mint";
      if (s.step === "done") return doneBlock(t(isMint ? "minted" : "redeemed"), `${isMint ? "+" : "−"}${money(s.amt, 0)} pUSD`, `${t("stable_supply")}: ${money(state.supply, 0)}`);
      return `${head(t(isMint ? "stable_mint" : "stable_redeem") + " · pUSD")}
        <div class="lbl-sm">${t("transfer_amount")}</div>
        ${presets([50000, 250000, 1000000], s.amt)}
        <div class="kv">
          <div><span>${isMint ? t("source") : t("to")}</span><b>${t("reserve_acc")}</b></div>
          <div><span>${t("network")}</span><b>ERC-20</b></div>
          <div><span>${t("transfer_rate")}</span><b>1 pUSD = 1.00 USD</b></div>
          <div><span>${t("stable_supply")}</span><b>${money(state.supply + (isMint ? s.amt : -s.amt), 0)}</b></div>
        </div>
        ${busyBtn(t("confirm"), "doMint")}`;
    },
    stx(s) {
      const x = state.stx.find((o) => o.id === s.id);
      const k = { mint: "stable_mint", redeem: "stable_redeem", xfer: "transfer_cross" }[x.kind];
      return `${head(t(k))}
        <div class="bs-hero"><span class="coin" style="background:linear-gradient(140deg,#7FE3B5,#2F8F67);color:#0B1F17">p$</span><b class="${x.amt > 0 ? "pos" : ""}">${x.amt > 0 ? "+" : "−"}${money(Math.abs(x.amt), 0)} pUSD</b></div>
        <div class="kv">
          <div><span>${t("status")}</span><b class="pos">✓ ${t("completed")}</b></div>
          <div><span>Tx hash</span><b class="mono">${x.hash}<button class="cp" data-act="copyToast">${t("copy")}</button></b></div>
          <div><span>${t("block")}</span><b class="mono">${x.block.toLocaleString("en-US")}</b></div>
          <div><span>${t("confirmations")}</span><b>64</b></div>
          <div><span>${t("network")}</span><b>ERC-20</b></div>
        </div>
        <button class="btn dark" data-act="closeSheet">${t("close")}</button>`;
    },
    reserve() {
      const sup = state.supply;
      return `${head(t("attest"))}
        <div class="bs-hero"><b>${money(sup, 0)} USD</b><span>${t("total_reserves")}</span></div>
        <div class="kv">
          <div><span>${t("coverage")}</span><b class="pos">100%</b></div>
          <div><span>USD · 62%</span><b>${money(sup * 0.62, 0)}</b></div>
          <div><span>EUR · 28%</span><b>${money(sup * 0.28, 0)}</b></div>
          <div><span>T-bills · 10%</span><b>${money(sup * 0.1, 0)}</b></div>
          <div><span>${t("attest_last")}</span><b>${t("attest_today")}</b></div>
        </div>
        <button class="btn dark" data-act="closeSheet">${t("close")}</button>`;
    },
    lang() {
      return `${head(t("profile_lang"))}
        ${["es", "en", "ru"].map((l) => `<button class="opt ${state.lang === l ? "on" : ""}" data-lang="${l}"><span class="ric" style="font-size:12px;font-weight:700">${l.toUpperCase()}</span>${PLATA_I18N[l].langName}<span class="radio"></span></button>`).join("")}`;
    },
    security() {
      const r = (k, key, icon) => `<button class="opt" data-act="sec" data-arg="${k}"><span class="ric">${icon}</span>${t(key)}<span class="tgl ${state.sec[k] ? "on" : ""}"></span></button>`;
      return `${head(t("security"))}${r("twofa", "twofa", I.shield)}${r("faceid", "faceid", I.user)}${r("push", "push", I.bell)}`;
    },
  };

  function renderSheet() {
    const host = $("sheetHost");
    const s = state.sheet;
    if (!s) {
      host.classList.remove("open");
      return;
    }
    const html = SHEETS[s.type](s);
    const bs = host.querySelector(".bs");
    if (host.classList.contains("open") && bs) {
      bs.innerHTML = html;
    } else {
      host.innerHTML = `<div class="backdrop" data-act="closeSheet"></div><div class="bs">${html}</div>`;
      void host.offsetWidth;
      host.classList.add("open");
    }
    const range = $("limitRange");
    if (range) range.oninput = () => { state.sheet.val = +range.value; $("rangeV").textContent = `${money(+range.value, 0)} USD`; };
  }
  function openSheet(type, data = {}) { state.sheet = { type, ...data }; renderSheet(); }
  function closeSheet() {
    state.sheet = null;
    renderSheet();
    if (state.dirty) { state.dirty = false; renderPhone(false); }
  }
  function runSheet(ms, apply) {
    const type = state.sheet.type;
    state.sheet.step = "busy";
    renderSheet();
    setTimeout(() => {
      if (!state.sheet || state.sheet.type !== type) return;
      apply();
      state.sheet.step = "done";
      state.dirty = true;
      renderSheet();
    }, ms);
  }

  /* ───────── Rendering ───────── */
  function renderTabbar() {
    const active = TAB_FOR[state.view];
    const tab = (id, icon, label, extra = "") => `<button class="tab ${extra} ${active === id ? "on" : ""}" data-go="${id}">${icon}${label}</button>`;
    $("tabbar").innerHTML = tab("home", I.home, t("nav_home")) + tab("cards", I.cards, t("nav_cards")) + tab("scan", I.scan, "", "scan") + tab("crypto", I.wallet, t("nav_wallets")) + tab("profile", I.user, t("nav_profile"));
  }

  function currentView() {
    if (state.phase === "springboard") return ["sb", vSpringboard()];
    if (state.phase === "splash") return ["splash", vSplash()];
    if (state.phase === "loading") return ["", vSkeleton()];
    const scanDark = state.view === "scan" && state.scanStep !== "paid";
    return [scanDark ? "scanv" : "", VIEWS[state.view]()];
  }

  function renderPhone(animate = true, enter = false) {
    const host = $("views");
    const prev = [...host.querySelectorAll(".view")];
    const [cls, html] = currentView();
    const v = document.createElement("div");
    v.className = `view ${cls} ${enter ? "enter" : ""}`;
    v.innerHTML = html;
    if (!animate) v.classList.add("instant");
    host.appendChild(v);
    if (animate && prev.length) {
      prev.forEach((old) => {
        old.classList.remove("on", "enter");
        old.classList.add("out");
        setTimeout(() => old.remove(), 400);
      });
    } else {
      prev.forEach((old) => old.remove());
    }
    requestAnimationFrame(() => requestAnimationFrame(() => {
      v.classList.add("on");
      if (!animate) requestAnimationFrame(() => v.classList.remove("instant"));
    }));
    const screen = host.parentElement;
    const dark = state.phase === "springboard" || state.phase === "splash" || (state.phase === "app" && state.view === "scan" && state.scanStep !== "paid");
    screen.classList.toggle("dark", dark);
    screen.classList.toggle("no-tabs", state.phase !== "app");
    renderTabbar();
    const search = $("mSearch");
    if (search) search.oninput = () => {
      const q = search.value.trim().toLowerCase();
      v.querySelectorAll(".prod").forEach((p) => (p.style.display = !q || p.dataset.name.includes(q) ? "" : "none"));
    };
  }

  function renderExplain() {
    const key = state.phase !== "app" ? "intro" : MODULES.includes(state.view) ? state.view : "home";
    const e = (PLATA_EXPLAIN[state.lang] || PLATA_EXPLAIN.en)[key];
    $("explain").innerHTML = `
      <div class="ex-kicker"><i></i>${e.kicker}</div>
      <h1 class="ex-title">${e.title}</h1>
      <p class="ex-lead">${e.lead}</p>
      <ul class="ex-points">${e.points.map((p) => `<li><i>${I.check}</i>${p}</li>`).join("")}</ul>
      <div class="ex-stats">${e.stats.map(([v, k]) => `<div><b>${v}</b><span>${k}</span></div>`).join("")}</div>`;
  }

  function renderRail() {
    document.documentElement.lang = state.lang;
    $("railTagline").textContent = t("tagline");
    $("langLabel").textContent = t("language");
    const ex = PLATA_EXPLAIN[state.lang] || PLATA_EXPLAIN.en;
    const activeMod = state.phase === "app" && MODULES.includes(state.view) ? state.view : null;
    $("mods").innerHTML = MODULES.map((m) => `
      <button class="mod ${m === activeMod ? "on" : ""}" data-go="${m}">
        <span class="mi">${MOD_ICON[m]}</span>
        <span class="ml">${t("m_" + m)}<span class="ms">${ex[m].kicker}</span></span>
      </button>`).join("");
    document.querySelectorAll(".seg [data-lang]").forEach((b) => b.classList.toggle("on", b.dataset.lang === state.lang));
  }

  const renderAll = (animate = false) => { renderRail(); renderExplain(); renderPhone(animate); };

  /* ───────── Navigation & launch ───────── */
  let timers = [];
  const later = (ms, fn) => timers.push(setTimeout(fn, ms));
  const clearTimers = () => { timers.forEach(clearTimeout); timers = []; };

  function go(view) {
    clearTimers();
    const wasApp = state.phase === "app";
    state.phase = "app";
    if (state.sheet) { state.sheet = null; renderSheet(); }
    if (view === state.view && wasApp && view !== "transfer" && view !== "scan") return;
    state.view = view;
    if (view === "transfer") state.tr.step = "form";
    if (view === "scan") state.scanStep = "scan";
    renderRail();
    renderExplain();
    renderPhone(wasApp, !wasApp);
  }

  function toSpringboard() {
    clearTimers();
    state.phase = "springboard";
    state.sheet = null;
    renderSheet();
    renderAll(true);
  }

  function launch() {
    if (state.phase !== "springboard") return;
    const screen = $("views").parentElement;
    const icon = document.querySelector("#plataIcon .ai");
    const sr = screen.getBoundingClientRect();
    const ir = icon.getBoundingClientRect();
    const k = sr.width / 390;
    const L = document.createElement("div");
    L.className = "launch";
    L.style.setProperty("--t", `${(ir.top - sr.top) / k}px`);
    L.style.setProperty("--l", `${(ir.left - sr.left) / k}px`);
    L.style.setProperty("--r", `${(sr.right - ir.right) / k}px`);
    L.style.setProperty("--b", `${(sr.bottom - ir.bottom) / k}px`);
    screen.appendChild(L);
    void L.offsetWidth;
    L.classList.add("open");
    state.phase = "splash";
    later(480, () => { renderPhone(false); screen.classList.add("dark"); });
    later(800, () => L.remove());
    later(2300, () => { state.phase = "loading"; renderPhone(true); });
    later(3200, () => {
      state.phase = "app";
      state.view = "home";
      renderRail();
      renderExplain();
      renderPhone(false, true);
    });
  }

  function toast(title, sub = "") {
    const el = $("toast");
    el.innerHTML = `<span class="ti-ic">${I.mark}</span><div><b>${title}</b>${sub ? `<span>${sub}</span>` : ""}</div>`;
    el.classList.add("show");
    clearTimeout(toast.tm);
    toast.tm = setTimeout(() => el.classList.remove("show"), 2400);
  }

  function setLang(lang) {
    if (!PLATA_I18N[lang]) return;
    state.lang = lang;
    localStorage.setItem("plata_lang", lang);
    renderAll(false);
    if (state.sheet) renderSheet();
  }

  /* ───────── Actions ───────── */
  const S = () => state.sheet;
  const A = {
    launch,
    wiggle: (_, el) => { el.classList.remove("wiggle"); void el.offsetWidth; el.classList.add("wiggle"); },
    closeSheet,
    goto: (v) => go(v),
    logout: toSpringboard,

    notif: () => openSheet("notif"),
    markRead: () => { state.notifRead = true; state.dirty = true; renderSheet(); },
    tx: (id) => openSheet("tx", { id: +id }),
    repeat: (cat) => { if (cat === "transfer") go("transfer"); else { closeSheet(); toast(t("repeat"), t("cat_" + cat)); } },
    receiptToast: () => toast(t("receipt_saved"), "PDF"),
    copyToast: () => toast(t("copied")),
    shareToast: () => toast(t("share"), "Plata"),
    filter: (k) => { state.txFilter = k; renderPhone(false); },

    account: (cur) => openSheet("account", { cur }),
    topup: () => openSheet("topup", { method: "card", amt: 250 }),
    method: (k) => { S().method = k; renderSheet(); },
    preset: (v) => { S().amt = +v; renderSheet(); },
    doTopup: () => runSheet(1100, () => {
      const s = S();
      state.bal.USD += s.amt;
      addTx({ icon: "plus", nameKey: "cat_topup", subKey: s.method === "card" ? "m_card" : s.method === "bank" ? "m_bank" : "m_crypto_dep", amt: s.amt, cur: "USD", cat: "topup" });
      toast(t("topup_done"), `+${money(s.amt)} USD`);
    }),
    exchange: (from) => openSheet("exchange", { from: from || "USD", to: from === "EUR" ? "USD" : "EUR", amt: 500 }),
    cycleCur: (dir) => {
      const opts = ["USD", "EUR", "USDT"];
      const s = S();
      let n = opts[(opts.indexOf(s[dir]) + 1) % opts.length];
      if (n === s[dir === "from" ? "to" : "from"]) n = opts[(opts.indexOf(n) + 1) % opts.length];
      s[dir] = n;
      renderSheet();
    },
    swapCur: () => { const s = S(); [s.from, s.to] = [s.to, s.from]; renderSheet(); },
    doExchange: () => runSheet(1000, () => {
      const s = S();
      const got = (s.amt * RATES[s.to]) / RATES[s.from];
      state.bal[s.from] -= s.amt;
      state.bal[s.to] += got;
      addTx({ icon: "swap", nameKey: "cat_fx", sub: `${s.from} → ${s.to}`, amt: -s.amt, cur: s.from, cat: "fx" });
      toast(t("exchange_done"), `${money(got)} ${s.to}`);
    }),

    rail: (k) => { state.tr.rail = k; if (k === "usdt") state.tr.cur = "USDT"; renderPhone(false); },
    recipient: () => openSheet("recipient"),
    pickRecipient: (i) => { state.tr.rcp = +i; state.tr.cur = RECIPIENTS[+i].cur; if (state.tr.cur === "USDT") state.tr.rail = "usdt"; else if (state.tr.rail === "usdt") state.tr.rail = "cross"; state.dirty = true; closeSheet(); },
    currency: () => openSheet("currency"),
    pickCurrency: (c) => { state.tr.cur = c; state.dirty = true; closeSheet(); },
    keypad: () => openSheet("keypad", { val: state.tr.amount }),
    key: (k) => {
      const s = S();
      let v = s.val === "0" ? "" : s.val;
      if (k === "⌫") v = v.slice(0, -1);
      else if (k === ".") { if (!v.includes(".")) v = (v || "0") + "."; }
      else if (!(v.includes(".") && v.split(".")[1].length >= 2) && v.replace(".", "").length < 7) v += k;
      s.val = v;
      renderSheet();
    },
    keypadDone: () => { state.tr.amount = S().val || "0"; state.dirty = true; closeSheet(); },
    sendTransfer: () => {
      const c = trCalc();
      const r = RECIPIENTS[state.tr.rcp];
      state.tr.step = "processing";
      renderPhone(false);
      later(1300, () => {
        state.tr.step = "done";
        state.tr.last = { amt: c.amt, recv: c.recv, rate: c.rate, cur: state.tr.cur, name: r.name, meta: r.meta };
        state.bal.USD -= c.total;
        addTx({ av: [r.av, r.bg, r.fg], name: r.name, subKey: "transfer_cross", amt: -c.total, cur: "USD", cat: "transfer" });
        renderPhone(true);
        toast(t("transfer_success"), `${money(c.recv)} ${state.tr.cur} → ${r.name}`);
      });
    },
    transferHome: () => { go("home"); requestAnimationFrame(() => $("homeBal")?.classList.add("bump")); },

    card: (k) => { state.card = k; renderPhone(false); },
    freeze: () => { state.frozen[state.card] = !state.frozen[state.card]; renderPhone(false); toast(state.frozen[state.card] ? t("card_frozen_t") : t("card_active_t"), t(CARDS[state.card].nameKey)); },
    cardDetails: () => openSheet("cardDetails", { show: false }),
    toggleShow: () => { S().show = !S().show; renderSheet(); },
    limit: () => openSheet("limit", { val: state.limits[state.card] }),
    saveLimit: () => { state.limits[state.card] = S().val; state.dirty = true; toast(t("limit_saved"), `${money(S().val, 0)} USD`); closeSheet(); },
    issue: () => openSheet("issue", { net: "visa", type: "virtual" }),
    issueNet: (k) => { S().net = k; renderSheet(); },
    issueType: (k) => { S().type = k; renderSheet(); },
    doIssue: () => runSheet(1300, () => { const s = S(); state.card = s.net; state.frozen[s.net] = false; toast(t("issue_done"), t(CARDS[s.net].nameKey)); }),

    send: (asset) => openSheet("send", { asset: ASSETS[asset] ? asset : "usdt", amt: ASSETS[asset] ? { usdt: 100, btc: 0.005, eth: 0.1, sol: 2.5 }[asset] : 100 }),
    sendAsset: (k) => { S().asset = k; S().amt = { usdt: 100, btc: 0.005, eth: 0.1, sol: 2.5 }[k]; renderSheet(); },
    doSend: () => runSheet(1200, () => {
      const s = S(); const a = ASSETS[s.asset];
      state.bal[a.sym] -= s.amt;
      addTx({ av: [a.g, "#EEECE4", "#252722"], name: a.name, subKey: "cat_crypto", amt: -s.amt, cur: a.sym, cat: "crypto" });
      toast(t("crypto_sent"), `${s.amt} ${a.sym}`);
    }),
    receive: () => openSheet("receive", { net: "TRC-20" }),
    recvNet: (k) => { S().net = k; renderSheet(); },
    asset: (id) => openSheet("asset", { id }),
    network: (id) => openSheet("network", { id }),

    payWith: (k) => { state.payWith = k; renderPhone(false); },
    rescan: () => { state.scanStep = "scan"; renderPhone(false); },
    merchant: () => openSheet("merchant"),
    payScan: () => {
      const p = PAY[state.payWith];
      state.scanStep = "processing";
      renderPhone(false);
      later(1200, () => {
        state.scanStep = "paid";
        state.bal[p.debit[0]] -= p.debit[1];
        addTx({ av: ["☕", "#F3E3D3", "#6B3E26"], name: "Café Habana", subKey: "cat_scan", amt: -p.debit[1], cur: p.debit[0], cat: "scan" });
        renderPhone(true);
        toast(t("scan_paid"), `${t("scan_merchant")} · ${p.amt} ${p.cur}`);
      });
    },

    cat: (k) => { state.marketCat = k; renderPhone(false); },
    product: (id) => openSheet("product", { id, qty: 1 }),
    qty: (d) => { S().qty = Math.max(1, S().qty + +d); renderSheet(); },
    addCart: () => { const s = S(); state.cart[s.id] = (state.cart[s.id] || 0) + s.qty; state.dirty = true; toast(t("added"), `${t(PRODUCTS.find((p) => p.id === s.id).key)} × ${s.qty}`); closeSheet(); },
    quickAdd: (id) => { state.cart[id] = (state.cart[id] || 0) + 1; renderPhone(false); toast(t("added"), t(PRODUCTS.find((p) => p.id === id).key)); },
    cart: () => openSheet("cart", { payFrom: "usd" }),
    cartQty: (arg) => { const [id, d] = arg.split(":"); state.cart[id] = Math.max(0, (state.cart[id] || 0) + +d); if (!state.cart[id]) delete state.cart[id]; state.dirty = true; renderSheet(); },
    payFrom: (k) => { S().payFrom = k; renderSheet(); },
    doCheckout: () => runSheet(1200, () => {
      const s = S();
      const total = Object.entries(state.cart).reduce((sum, [id, q]) => { const p = PRODUCTS.find((o) => o.id === id); return sum + (p.price / RATES[p.cur]) * q; }, 0);
      const cur = s.payFrom === "usdt" ? "USDT" : "USD";
      s.paid = total;
      state.bal[cur] -= total;
      state.cart = {};
      addTx({ icon: "bag", nameKey: "m_market", subKey: "order_paid", amt: -total, cur, cat: "market" });
      toast(t("order_paid"), `${money(total)} ${cur}`);
    }),

    mint: (mode) => openSheet("mint", { mode, amt: 250000 }),
    doMint: () => runSheet(1300, () => {
      const s = S(); const isMint = s.mode === "mint";
      state.supply += isMint ? s.amt : -s.amt;
      state.stx.forEach((x) => (x.fresh = false));
      const hex = () => Math.floor(Math.random() * 0xffff).toString(16).padStart(4, "0");
      state.stx.unshift({ id: "s" + ++txSeq, kind: s.mode, amt: isMint ? s.amt : -s.amt, hash: `0x${hex()}${hex()}…${hex()}`, block: 19284431 + txSeq, fresh: true });
      toast(t(isMint ? "minted" : "redeemed"), `${money(s.amt, 0)} pUSD`);
    }),
    stx: (id) => openSheet("stx", { id }),
    reserve: () => openSheet("reserve"),

    lang: () => openSheet("lang"),
    security: () => openSheet("security"),
    sec: (k) => { state.sec[k] = !state.sec[k]; renderSheet(); },
    homebar: toSpringboard,
  };

  document.addEventListener("click", (e) => {
    const el = e.target.closest("[data-go],[data-lang],[data-act]");
    if (!el) return;
    if (el.closest(".launch")) return;
    const d = el.dataset;
    if (d.lang) return setLang(d.lang);
    if (d.go) {
      if (state.phase === "splash" || state.phase === "loading") return;
      return go(d.go);
    }
    const fn = A[d.act];
    if (fn) fn(d.arg ?? "", el);
  });

  document.addEventListener("keydown", (e) => {
    if (e.metaKey || e.ctrlKey || e.altKey || e.target.tagName === "INPUT") return;
    const k = e.key.toLowerCase();
    if (k === "escape" && state.sheet) return closeSheet();
    if (k === "0") return toSpringboard();
    if (k === "enter" && state.phase === "springboard") return launch();
    if (k >= "1" && k <= "7") return go(MODULES[+k - 1]);
    if (k === "e") return setLang("en");
    if (k === "s") return setLang("es");
    if (k === "r") return setLang("ru");
    const i = MODULES.indexOf(state.view);
    if (k === "arrowright" || k === "arrowdown") return go(MODULES[(i + 1 + MODULES.length) % MODULES.length]);
    if (k === "arrowleft" || k === "arrowup") return go(MODULES[(Math.max(i, 0) - 1 + MODULES.length) % MODULES.length]);
  });

  function fit() {
    const stage = $("stage");
    const s = Math.max(0.5, Math.min(1.15, (stage.clientHeight - 64) / 864, (stage.clientWidth - 48) / 410));
    $("phoneFit").style.setProperty("--s", s.toFixed(3));
  }
  window.addEventListener("resize", fit);

  renderAll(false);
  fit();
})();
