const STORAGE_KEY = "swiped.sections.v8";
const LEGACY_STORAGE_KEY = "swiped.sections.v1";
const PROFILE_STORAGE_KEY = "swiped.profile.v1";
const BUDGET_STORAGE_KEY = "swiped.budget.v1";
const OPEN_PULL_THRESHOLD = 0.34;
const DEFAULT_VISIBLE_ORDER = ["budget", "home", "notes"];
const TODAY = new Date();

const palette = [
  "#2ecf85",
  "#ffba49",
  "#4aa8ff",
  "#ef5b5b",
  "#14b8a6",
  "#f0719b",
  "#8fb339",
  "#a06cd5"
];

const sectionTemplates = [
  {
    id: "work",
    name: "Work",
    icon: "work",
    accent: "#2ecf85",
    kicker: "Today",
    headline: "Protect the deep work.",
    brief: "Two focused blocks, one client reply, and a clean closeout before the day ends.",
    metrics: [
      ["Focus", "2 Blocks"],
      ["Due", "Proposal"],
      ["Energy", "High"]
    ],
    notes: [
      "Draft the product timeline before checking messages.",
      "Send the client summary after the second focus block.",
      "Wrap open tabs into the Friday review list."
    ]
  },
  {
    id: "budget",
    name: "Budget",
    icon: "budget",
    accent: "#ffba49",
    kicker: "This week",
    headline: "Keep cash visible.",
    brief: "Track the grocery run, review subscriptions, and move savings once the card clears.",
    metrics: [
      ["Spend", "$142"],
      ["Bills", "2 Left"],
      ["Saved", "$80"]
    ],
    notes: [
      "Check the renewal dates for streaming and storage.",
      "Set aside the transfer before weekend spending.",
      "Log receipts while the categories are still obvious."
    ]
  },
  {
    id: "home",
    name: "Home",
    icon: "home",
    accent: "#14b8a6",
    kicker: "Reset",
    headline: "Clear the small friction.",
    brief: "Laundry, kitchen counters, and the mail stack get a quick pass tonight.",
    metrics: [
      ["Laundry", "1 Load"],
      ["Kitchen", "10 Min"],
      ["Errand", "Mail"]
    ],
    notes: [
      "Start laundry before dinner so it does not drift.",
      "Sort mail into action, archive, and recycle.",
      "Prep tomorrow's bag after the counters are clear."
    ]
  },
  {
    id: "school",
    name: "School",
    icon: "school",
    accent: "#4aa8ff",
    kicker: "Coursework",
    headline: "Stay ahead of the reading.",
    brief: "Finish the chapter notes, clean up citations, and queue the quiz review.",
    metrics: [
      ["Reading", "18 Pages"],
      ["Quiz", "Wed"],
      ["Grade", "A-"]
    ],
    notes: [
      "Turn the lecture outline into flash cards.",
      "Mark confusing examples for office hours.",
      "Export the citation list before the paper draft."
    ]
  },
  {
    id: "notes",
    name: "Notes",
    icon: "notes",
    accent: "#f0719b",
    kicker: "Capture",
    headline: "Keep the loose thoughts.",
    brief: "Quick notes, small reminders, and raw ideas live here before they become plans.",
    metrics: [
      ["Open", "7 Notes"],
      ["Pinned", "2"],
      ["Review", "Tonight"]
    ],
    notes: [
      "Pin anything that needs action this week.",
      "Move project notes into the right section during review.",
      "Keep rough ideas short so they stay easy to sort."
    ]
  },
  {
    id: "people",
    name: "People",
    icon: "people",
    accent: "#a06cd5",
    kicker: "Connections",
    headline: "Remember who matters.",
    brief: "Follow-ups, birthdays, check-ins, and relationship notes stay close.",
    metrics: [
      ["Birthday", "Add date"],
      ["Phone", "Add number"],
      ["Social", "Add handle"]
    ],
    notes: [
      "Add contact info, social handles, reminders, and notes for this person.",
      "Upload a picture from Customize to turn this into a contact card.",
      "Tap a contact method or social handle to open it."
    ],
    person: {
      birthday: "",
      phone: "",
      email: "",
      address: "",
      socials: [{ id: "social-instagram", platform: "instagram", handle: "" }],
      notes: "",
      reminders: []
    }
  },
  {
    id: "goals",
    name: "Goals",
    icon: "goals",
    accent: "#8fb339",
    kicker: "Direction",
    headline: "Move one target forward.",
    brief: "Track the goals that need visible progress instead of vague intention.",
    metrics: [
      ["Quarter", "3 Goals"],
      ["Next", "Milestone"],
      ["Progress", "42%"]
    ],
    notes: [
      "Choose the next concrete milestone.",
      "Attach each goal to one weekly action.",
      "Drop goals that no longer deserve attention."
    ]
  },
  {
    id: "health",
    name: "Health",
    icon: "health",
    accent: "#ef5b5b",
    kicker: "Baseline",
    headline: "Make the basics easy.",
    brief: "Hydration, walk, lift session, and an early wind down are the anchors.",
    metrics: [
      ["Water", "5 Cups"],
      ["Move", "28 Min"],
      ["Sleep", "10:45"]
    ],
    notes: [
      "Put the gym bag by the door before lunch.",
      "Swap the second coffee for water.",
      "Set the room before the phone goes on the charger."
    ]
  },
  {
    id: "habits",
    name: "Habits",
    icon: "habits",
    accent: "#00a878",
    kicker: "Rhythm",
    headline: "Keep the streak gentle.",
    brief: "Tiny repeated actions, streaks, and routines get a calm place to land.",
    metrics: [
      ["Streak", "6 Days"],
      ["Today", "4"],
      ["Anchor", "Morning"]
    ],
    notes: [
      "Do the smallest version when energy is low.",
      "Reset missed habits without making it dramatic.",
      "Pair new habits with routines that already happen."
    ]
  },
  {
    id: "reading",
    name: "Reading",
    icon: "reading",
    accent: "#7c6cff",
    kicker: "Shelf",
    headline: "Keep the next page ready.",
    brief: "Books, articles, highlights, and reading queues stay in one focused lane.",
    metrics: [
      ["Current", "1 Book"],
      ["Queue", "5"],
      ["Pages", "24"]
    ],
    notes: [
      "Capture one sentence worth remembering.",
      "Move finished reads into the archive list.",
      "Keep one short article ready for downtime."
    ]
  },
  {
    id: "tasks",
    name: "Tasks",
    icon: "tasks",
    accent: "#4aa8ff",
    kicker: "Action",
    headline: "Finish the visible list.",
    brief: "Errands, admin, and quick obligations get sorted into a simple queue.",
    metrics: [
      ["Open", "9"],
      ["Due", "2"],
      ["Done", "4"]
    ],
    notes: [
      "Mark the one task that unblocks the others.",
      "Batch errands before leaving the house.",
      "Move stale tasks to someday or delete them."
    ]
  },
  {
    id: "travel",
    name: "Travel",
    icon: "travel",
    accent: "#14b8a6",
    kicker: "Trips",
    headline: "Keep the next route clean.",
    brief: "Itineraries, packing, reservations, and trip ideas stay ready to use.",
    metrics: [
      ["Next", "Airport"],
      ["Pack", "12 Items"],
      ["Plans", "3"]
    ],
    notes: [
      "Save confirmation numbers with the trip notes.",
      "Start the packing list from the reusable basics.",
      "Check transit time before locking the day plan."
    ]
  }
];

const iconPaths = {
  work: '<rect x="4" y="7" width="16" height="12" rx="2"></rect><path d="M9 7V5a3 3 0 0 1 6 0v2"></path><path d="M4 12h16"></path>',
  budget: '<circle cx="12" cy="12" r="8"></circle><path d="M12 7v10"></path><path d="M15 9.5c-.8-.7-1.8-1-3-1-1.6 0-2.6.7-2.6 1.8 0 2.8 5.4 1.3 5.4 4.2 0 1.1-1 2-2.8 2-1.3 0-2.5-.4-3.3-1.2"></path>',
  home: '<path d="M3 11.5 12 4l9 7.5"></path><path d="M5.5 10.5V20h13v-9.5"></path><path d="M10 20v-6h4v6"></path>',
  school: '<path d="M3 8.5 12 4l9 4.5-9 4.5-9-4.5z"></path><path d="M6.5 10.5v5c2.8 2 8.2 2 11 0v-5"></path><path d="M21 9v6"></path>',
  notes: '<path d="M6 4h9l3 3v13H6z"></path><path d="M15 4v4h4"></path><path d="M9 12h6"></path><path d="M9 16h4"></path>',
  people: '<circle cx="9" cy="8" r="3"></circle><circle cx="16" cy="9" r="2.5"></circle><path d="M4 19c.8-3 2.5-5 5-5s4.2 2 5 5"></path><path d="M13 15c2.5.2 4 1.6 5 4"></path>',
  goals: '<circle cx="12" cy="12" r="8"></circle><circle cx="12" cy="12" r="4"></circle><path d="M12 12 19 5"></path><path d="M18 5h3v3"></path>',
  health: '<path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.7A4 4 0 0 1 19 10c0 5.6-7 10-7 10z"></path><path d="M8 12h3l1-3 2 6 1-3h2"></path>',
  habits: '<path d="M7 12a5 5 0 0 1 8-4"></path><path d="M15 4v4h4"></path><path d="M17 12a5 5 0 0 1-8 4"></path><path d="M9 20v-4H5"></path>',
  reading: '<path d="M5 5h6a3 3 0 0 1 3 3v12a3 3 0 0 0-3-3H5z"></path><path d="M19 5h-5a3 3 0 0 0-3 3"></path><path d="M19 5v12h-5a3 3 0 0 0-3 3"></path>',
  tasks: '<path d="M8 6h12"></path><path d="M8 12h12"></path><path d="M8 18h12"></path><path d="m3.5 6 1.2 1.2L7 4.8"></path><path d="m3.5 12 1.2 1.2L7 10.8"></path><path d="m3.5 18 1.2 1.2L7 16.8"></path>',
  travel: '<path d="M3 16 21 7l-7 14-3-6-8 1z"></path><path d="M11 15 21 7"></path>'
};

function dateInDays(days) {
  const date = new Date(TODAY);
  date.setDate(date.getDate() + days);
  return date.toISOString().slice(0, 10);
}

function defaultBudgetData() {
  return {
    bankAccounts: [
      { id: uid("acct"), name: "Checking", amount: 1850 },
      { id: uid("acct"), name: "Savings", amount: 4200 }
    ],
    creditCards: [
      { id: uid("card"), name: "Everyday Card", limit: 4000, available: 2650, amountDue: 180, dueDate: dateInDays(5) }
    ],
    incomeJobs: [
      { id: uid("income"), name: "Primary Job", type: "salary", gross: 3200, frequency: "biweekly", taxPct: 22 }
    ],
    bills: [
      { id: uid("bill"), name: "Rent", amount: 1600, frequency: "monthly", dueDate: dateInDays(2) },
      { id: uid("bill"), name: "Electric", amount: 92, frequency: "monthly", dueDate: dateInDays(6) }
    ],
    subscriptions: [
      { id: uid("sub"), name: "Music", amount: 10.99, frequency: "monthly", nextRenewal: dateInDays(3) },
      { id: uid("sub"), name: "Cloud Storage", amount: 2.99, frequency: "monthly", nextRenewal: dateInDays(18) }
    ]
  };
}

const state = {
  sections: loadSections(),
  profile: loadProfile(),
  budget: loadBudget(),
  activeIndex: 0,
  activeFloat: 0,
  pointer: null,
  mode: null,
  pullProgress: 0,
  detailOpen: false,
  detailPointer: null,
  selectedColor: null,
  pendingIconImage: ""
};

const els = {
  root: document.documentElement,
  appShell: document.getElementById("appShell"),
  activeTitle: document.getElementById("activeTitle"),
  summaryHeadline: document.getElementById("summaryHeadline"),
  summaryText: document.getElementById("summaryText"),
  summaryIcon: document.getElementById("summaryIcon"),
  sectionKicker: document.getElementById("sectionKicker"),
  metricStrip: document.getElementById("metricStrip"),
  sectionCount: document.getElementById("sectionCount"),
  briefList: document.getElementById("briefList"),
  briefItems: document.getElementById("briefItems"),
  wheelZone: document.getElementById("wheelZone"),
  wheelItems: document.getElementById("wheelItems"),
  wheelScrubberWrap: document.getElementById("wheelScrubberWrap"),
  wheelScrubber: document.getElementById("wheelScrubber"),
  paintLayer: document.getElementById("paintLayer"),
  detailView: document.getElementById("detailView"),
  detailContent: document.getElementById("detailContent"),
  closeDetailButton: document.getElementById("closeDetailButton"),
  detailEditButton: document.getElementById("detailEditButton"),
  detailLabel: document.getElementById("detailLabel"),
  detailKicker: document.getElementById("detailKicker"),
  detailTitle: document.getElementById("detailTitle"),
  detailSummary: document.getElementById("detailSummary"),
  detailGrid: document.getElementById("detailGrid"),
  notesPanelTitle: document.getElementById("notesPanelTitle"),
  detailNotes: document.getElementById("detailNotes"),
  settingsButton: document.getElementById("settingsButton"),
  editSectionButton: document.getElementById("editSectionButton"),
  editorBackdrop: document.getElementById("editorBackdrop"),
  editorForm: document.getElementById("editorForm"),
  closeEditorButton: document.getElementById("closeEditorButton"),
  hideSectionButton: document.getElementById("hideSectionButton"),
  editorIconPreview: document.getElementById("editorIconPreview"),
  iconInput: document.getElementById("iconInput"),
  resetIconButton: document.getElementById("resetIconButton"),
  nameInput: document.getElementById("nameInput"),
  headlineInput: document.getElementById("headlineInput"),
  briefInput: document.getElementById("briefInput"),
  notesInput: document.getElementById("notesInput"),
  swatches: document.getElementById("swatches"),
  settingsBackdrop: document.getElementById("settingsBackdrop"),
  closeSettingsButton: document.getElementById("closeSettingsButton"),
  doneSettingsButton: document.getElementById("doneSettingsButton"),
  settingsList: document.getElementById("settingsList"),
  firstNameInput: document.getElementById("firstNameInput"),
  addPersonButton: document.getElementById("addPersonButton"),
  addJobButton: document.getElementById("addJobButton")
};

function loadSections() {
  const legacySections = loadLegacySections();

  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (Array.isArray(saved) && saved.length) {
      return ensureHome(saved.map((section) => normalizeSection(section)));
    }
  } catch (error) {
    console.warn("Could not load saved sections", error);
  }

  const defaults = sectionTemplates.map((template) => {
    const legacy = legacySections.find((section) => section.name?.toLowerCase() === template.name.toLowerCase());
    return normalizeSection({
      ...template,
      ...legacy,
      id: template.id,
      templateId: template.id,
      icon: template.icon,
      enabled: DEFAULT_VISIBLE_ORDER.includes(template.id)
    }, template);
  });

  return sortDefaultSections(defaults);
}

function loadLegacySections() {
  try {
    const legacy = JSON.parse(localStorage.getItem(LEGACY_STORAGE_KEY));
    return Array.isArray(legacy) ? legacy : [];
  } catch (error) {
    return [];
  }
}

function normalizeSection(section, template = sectionTemplates[0]) {
  const matchingTemplate = sectionTemplates.find((item) => item.id === (section.templateId || section.id)) || template;
  return {
    id: section.id || matchingTemplate.id || uid("section"),
    templateId: section.templateId || matchingTemplate.id || "notes",
    name: section.name || matchingTemplate.name || "Section",
    icon: section.icon || matchingTemplate.icon || "notes",
    iconImage: section.iconImage || "",
    enabled: matchingTemplate.id === "home" ? true : section.enabled !== false,
    accent: section.accent || matchingTemplate.accent || palette[0],
    kicker: section.kicker || matchingTemplate.kicker || "Today",
    headline: section.headline || matchingTemplate.headline || "Make space for what matters.",
    brief: section.brief || matchingTemplate.brief || "A focused section for your priorities and quick notes.",
    metrics: Array.isArray(section.metrics) && section.metrics.length ? section.metrics : matchingTemplate.metrics || [["Open", "3 Items"], ["Next", "Today"], ["Mode", "Focus"]],
    notes: Array.isArray(section.notes) && section.notes.length ? section.notes : matchingTemplate.notes || ["Add the first note for this section."],
    person: matchingTemplate.id === "people" ? normalizePerson(section.person, section.name || matchingTemplate.name) : undefined
  };
}

function normalizePerson(person = {}, fallbackName = "Person") {
  return {
    birthday: person.birthday || "",
    phone: person.phone || "",
    email: person.email || "",
    address: person.address || "",
    socials: normalizePersonList(person.socials, [{ id: uid("social"), platform: "instagram", handle: "" }]),
    notes: person.notes || "",
    reminders: normalizePersonList(person.reminders, []).filter((reminder) => {
      return reminder.title || reminder.date;
    })
  };
}

function normalizePersonList(list, fallback) {
  return Array.isArray(list) && list.length ? list.map((item) => ({ ...item, id: item.id || uid("person") })) : fallback;
}

function ensureEditablePerson(section) {
  if (!section.person) {
    section.person = normalizePerson({}, section.name);
  }
  section.person.socials = Array.isArray(section.person.socials) ? section.person.socials : [];
  section.person.reminders = Array.isArray(section.person.reminders) ? section.person.reminders : [];
  return section.person;
}

function sortDefaultSections(sections) {
  const ordered = [];
  DEFAULT_VISIBLE_ORDER.forEach((id) => {
    const section = sections.find((item) => item.templateId === id);
    if (section) ordered.push(section);
  });

  return [
    ...ordered,
    ...sections.filter((section) => !DEFAULT_VISIBLE_ORDER.includes(section.templateId))
  ];
}

function ensureHome(sections) {
  const hasHome = sections.some((section) => section.templateId === "home");
  const nextSections = hasHome ? sections : [normalizeSection({ ...getTemplate("home"), enabled: true }), ...sections];
  nextSections.forEach((section) => {
    if (section.templateId === "home") section.enabled = true;
  });
  return nextSections;
}

function getTemplate(templateId) {
  return sectionTemplates.find((template) => template.id === templateId) || sectionTemplates[0];
}

function saveSections() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state.sections));
  } catch (error) {
    window.alert("That image is too large to save here. Try a smaller icon or picture.");
    console.warn("Could not save sections", error);
  }
}

function loadProfile() {
  try {
    const saved = JSON.parse(localStorage.getItem(PROFILE_STORAGE_KEY));
    return { firstName: saved?.firstName || "Antonio" };
  } catch (error) {
    return { firstName: "Antonio" };
  }
}

function saveProfile() {
  localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(state.profile));
}

function loadBudget() {
  try {
    const saved = JSON.parse(localStorage.getItem(BUDGET_STORAGE_KEY));
    if (saved && typeof saved === "object") {
      return normalizeBudget(saved);
    }
  } catch (error) {
    console.warn("Could not load budget", error);
  }
  return normalizeBudget(defaultBudgetData());
}

function normalizeBudget(budget) {
  const defaults = defaultBudgetData();
  return {
    bankAccounts: normalizeList(budget.bankAccounts, defaults.bankAccounts),
    creditCards: normalizeList(budget.creditCards, defaults.creditCards),
    incomeJobs: normalizeList(budget.incomeJobs, defaults.incomeJobs),
    bills: normalizeList(budget.bills, defaults.bills),
    subscriptions: normalizeList(budget.subscriptions, defaults.subscriptions)
  };
}

function normalizeList(list, fallback) {
  return Array.isArray(list) ? list.map((item) => ({ ...item, id: item.id || uid("item") })) : fallback;
}

function saveBudget() {
  localStorage.setItem(BUDGET_STORAGE_KEY, JSON.stringify(state.budget));
}

function uid(prefix) {
  return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}

function visibleSections() {
  const visible = state.sections.filter((section) => section.enabled);
  return visible.length ? visible : [state.sections[0]];
}

function activeSection() {
  const sections = visibleSections();
  return sections[state.activeIndex] || sections[0];
}

function isTemplate(section, templateId) {
  return section.templateId === templateId;
}

function setAccent(section) {
  els.root.style.setProperty("--accent", section.accent);
  els.root.style.setProperty("--accent-soft", hexToRgba(section.accent, 0.14));
}

function createIcon(section, className) {
  const icon = document.createElement("span");
  icon.className = className;
  icon.append(createIconGraphic(section));
  return icon;
}

function createIconGraphic(section) {
  if (section.iconImage) {
    const image = document.createElement("img");
    image.alt = "";
    image.src = section.iconImage;
    return image;
  }

  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("viewBox", "0 0 24 24");
  svg.setAttribute("fill", "none");
  svg.setAttribute("stroke", "currentColor");
  svg.setAttribute("stroke-width", "2");
  svg.setAttribute("stroke-linecap", "round");
  svg.setAttribute("stroke-linejoin", "round");
  svg.setAttribute("aria-hidden", "true");
  svg.innerHTML = iconPaths[section.icon] || iconPaths.notes;
  return svg;
}

function render() {
  const section = activeSection();
  const sections = visibleSections();
  const display = getDisplaySection(section);
  setAccent(section);
  els.activeTitle.textContent = display.name;
  els.sectionKicker.textContent = display.kicker;
  renderSummaryHeadline(section, display);
  els.summaryText.textContent = display.brief;
  els.sectionCount.textContent = `${state.activeIndex + 1} of ${sections.length}`;
  els.summaryIcon.replaceChildren(createIconGraphic(section));

  const metrics = getSummaryMetrics(section, display);
  els.metricStrip.replaceChildren(...metrics.slice(0, 3).map(createMetricTile));
  els.metricStrip.hidden = metrics.length === 0;

  const summaryItems = getSummaryItems(section, display);
  els.briefItems.replaceChildren(...summaryItems.map(createBriefItem));
  els.briefList.hidden = summaryItems.length === 0;

  renderDetail(display);
  renderWheel();
  renderWheelScrubber();
}

function getDisplaySection(section) {
  if (isTemplate(section, "home")) {
    const firstName = state.profile.firstName?.trim();
    return {
      ...section,
      headline: firstName ? `Welcome, ${firstName}.` : "Welcome.",
      brief: "Use the wheel to move through the parts of your day, then pull up for the details."
    };
  }

  if (isTemplate(section, "people")) {
    const age = getAge(section.person?.birthday);
    return {
      ...section,
      headline: section.name,
      brief: age ? `${age} years old` : ""
    };
  }

  return section;
}

function renderSummaryHeadline(section, display) {
  if (isTemplate(section, "home")) {
    const firstName = state.profile.firstName?.trim();
    els.summaryHeadline.replaceChildren(
      document.createTextNode("Welcome"),
      firstName ? document.createTextNode(", ") : document.createTextNode("."),
      firstName ? createAccentName(firstName) : document.createTextNode("")
    );
    return;
  }

  els.summaryHeadline.textContent = display.headline;
}

function createAccentName(name) {
  const span = document.createElement("span");
  span.className = "accent-name";
  span.textContent = `${name}.`;
  return span;
}

function getSummaryMetrics(section, display) {
  if (isTemplate(section, "budget")) return getBudgetMetrics();
  if (isTemplate(section, "people")) return getPeopleMetrics(section);
  return display.metrics;
}

function getSummaryItems(section, display) {
  if (isTemplate(section, "budget")) return getUpcomingBills(3);
  if (isTemplate(section, "people")) return getPeopleSummaryItems(section);
  return display.notes.slice(0, 3).map((note) => ({ text: note }));
}

function createMetricTile([label, value]) {
  const tile = document.createElement("article");
  tile.className = "metric-tile";
  tile.innerHTML = `<strong></strong><span></span>`;
  tile.querySelector("strong").textContent = label;
  tile.querySelector("span").textContent = value;
  return tile;
}

function createBriefItem(item) {
  const entry = typeof item === "string" ? { text: item } : item;
  const row = document.createElement("article");
  row.className = "brief-item";
  const dot = document.createElement("span");
  dot.className = "brief-dot";
  const copy = document.createElement("p");
  copy.textContent = entry.detail ? `${entry.text} - ${entry.detail}` : entry.text;
  row.append(dot, copy);
  return row;
}

function renderDetail(section) {
  els.detailLabel.textContent = section.name;
  els.detailKicker.textContent = section.kicker;
  els.detailTitle.textContent = section.headline;
  els.detailSummary.textContent = section.brief;

  if (isTemplate(section, "budget")) {
    els.notesPanelTitle.textContent = "Budget Planner";
    renderBudgetDetail();
    return;
  }

  if (isTemplate(section, "people")) {
    els.notesPanelTitle.textContent = "Contact Card";
    renderPeopleDetail(section);
    return;
  }

  els.notesPanelTitle.textContent = "Important Notes";
  els.detailGrid.replaceChildren(
    ...section.metrics.map(([label, value]) => {
      const tile = document.createElement("article");
      tile.className = "detail-tile";
      tile.innerHTML = `<strong></strong><span></span>`;
      tile.querySelector("strong").textContent = label;
      tile.querySelector("span").textContent = value;
      return tile;
    })
  );
  els.detailNotes.replaceChildren(
    ...section.notes.map((note) => {
      const row = document.createElement("article");
      row.className = "note-row";
      const copy = document.createElement("p");
      copy.textContent = note;
      row.append(copy);
      return row;
    })
  );
}

function getBudgetMetrics() {
  const stats = getBudgetStats();
  return [
    ["Balance", formatMoney(stats.balance)],
    ["Income", formatMoney(stats.monthlyNetIncome)],
    ["Due soon", formatMoney(stats.dueSoon)]
  ];
}

function getPeopleMetrics(section) {
  return [];
}

function getPeopleSummaryItems(section) {
  const person = section.person || normalizePerson({}, section.name);
  return person.reminders
    .filter((reminder) => reminder.title || reminder.date)
    .sort((a, b) => String(a.date || "9999-12-31").localeCompare(String(b.date || "9999-12-31")))
    .slice(0, 3)
    .map((reminder) => ({
      text: reminder.title || "Reminder",
      detail: reminder.date ? formatDate(reminder.date) : ""
    }));
}

function firstSocialLabel(person) {
  const social = person.socials.find((item) => item.handle);
  return social ? `${titleCase(social.platform)} ${formatHandle(social.handle)}` : "";
}

function getBudgetStats() {
  const bankTotal = state.budget.bankAccounts.reduce((sum, account) => sum + toNumber(account.amount), 0);
  const annualNetIncome = state.budget.incomeJobs.reduce((sum, job) => {
    return sum + toNumber(job.gross) * annualMultiplier(job.frequency) * (1 - toNumber(job.taxPct) / 100);
  }, 0);
  const annualGrossIncome = state.budget.incomeJobs.reduce((sum, job) => sum + toNumber(job.gross) * annualMultiplier(job.frequency), 0);
  const annualBills = state.budget.bills.reduce((sum, bill) => sum + toNumber(bill.amount) * annualMultiplier(bill.frequency), 0);
  const annualSubscriptions = state.budget.subscriptions.reduce((sum, item) => sum + toNumber(item.amount) * annualMultiplier(item.frequency), 0);
  const cardDueSoon = state.budget.creditCards
    .filter((card) => isWithinDays(card.dueDate, 7))
    .reduce((sum, card) => sum + toNumber(card.amountDue), 0);
  const billDueSoon = state.budget.bills
    .filter((bill) => isWithinDays(bill.dueDate, 7))
    .reduce((sum, bill) => sum + toNumber(bill.amount), 0);
  const subscriptionDueSoon = state.budget.subscriptions
    .filter((item) => isWithinDays(item.nextRenewal, 7))
    .reduce((sum, item) => sum + toNumber(item.amount), 0);
  const creditLimit = state.budget.creditCards.reduce((sum, card) => sum + toNumber(card.limit), 0);
  const creditAvailable = state.budget.creditCards.reduce((sum, card) => sum + toNumber(card.available), 0);

  return {
    balance: bankTotal,
    annualNetIncome,
    annualGrossIncome,
    monthlyNetIncome: annualNetIncome / 12,
    monthlyGrossIncome: annualGrossIncome / 12,
    annualBills,
    annualSubscriptions,
    netAfterExpenses: annualNetIncome - annualBills - annualSubscriptions,
    dueSoon: cardDueSoon + billDueSoon + subscriptionDueSoon,
    creditLimit,
    creditAvailable
  };
}

function getUpcomingBills(days) {
  const bills = state.budget.bills
    .filter((bill) => isWithinDays(bill.dueDate, days))
    .sort((a, b) => String(a.dueDate).localeCompare(String(b.dueDate)))
    .map((bill) => ({
      text: bill.name || "Bill",
      detail: `${formatMoney(toNumber(bill.amount))} due ${formatDate(bill.dueDate)}`
    }));
  return bills.length ? bills : [{ text: `No bills due in the next ${days} days` }];
}

function renderBudgetDetail() {
  const stats = getBudgetStats();
  els.detailGrid.replaceChildren(...getBudgetMetrics().map(createMetricTile));
  els.detailNotes.replaceChildren(
    createBudgetOverview(stats),
    createBudgetAccounts(),
    createBudgetCreditCards(stats),
    createBudgetIncome(stats),
    createBudgetBills(),
    createBudgetSubscriptions()
  );
}

function renderPeopleDetail(section) {
  const person = section.person || normalizePerson({}, section.name);
  els.detailGrid.replaceChildren(...getPeopleMetrics(section).map(createMetricTile));
  els.detailNotes.replaceChildren(
    createPeopleCardPanel(section, person),
    createPeopleContactPanel(person),
    createPeopleSocialPanel(person),
    createPeopleNotesPanel(person),
    createPeopleRemindersPanel(person)
  );
}

function createPeopleCardPanel(section, person) {
  const panel = createPeoplePanel("Profile");
  const card = document.createElement("div");
  card.className = "contact-card";
  card.append(createIcon(section, "contact-photo"));
  const copy = document.createElement("div");
  copy.innerHTML = "<strong></strong><span></span>";
  copy.querySelector("strong").textContent = section.name;
  copy.querySelector("span").textContent = person.birthday ? `Birthday ${formatDate(person.birthday)}` : "Add birthday and contact details below.";
  card.append(copy);
  panel.append(card);
  return panel;
}

function createPeopleContactPanel(person) {
  const panel = createPeoplePanel("Contact Info");
  const fields = document.createElement("div");
  fields.className = "contact-fields";
  fields.append(
    createPersonField("birthday", "Birthday", "date", person.birthday),
    createPersonField("phone", "Phone", "tel", person.phone),
    createPersonField("email", "Email", "email", person.email),
    createPersonField("address", "Address", "text", person.address)
  );
  panel.append(fields, createContactLinks(person));
  return panel;
}

function createPeopleSocialPanel(person) {
  const panel = createPeoplePanel("Social Media");
  const rows = document.createElement("div");
  rows.className = "contact-rows";
  person.socials.forEach((social, index) => rows.append(createSocialRow(social, index)));
  panel.append(rows, createPersonAddButton("social", "Add Social"));
  return panel;
}

function createPeopleNotesPanel(person) {
  const panel = createPeoplePanel("Notes");
  const label = document.createElement("label");
  label.className = "contact-field full-field";
  const span = document.createElement("span");
  span.textContent = "Notes";
  const textarea = document.createElement("textarea");
  textarea.rows = 4;
  textarea.dataset.personField = "notes";
  textarea.value = person.notes;
  label.append(span, textarea);
  panel.append(label);
  return panel;
}

function createPeopleRemindersPanel(person) {
  const panel = createPeoplePanel("Reminders");
  const rows = document.createElement("div");
  rows.className = "contact-rows";
  person.reminders.forEach((reminder, index) => rows.append(createReminderRow(reminder, index)));
  panel.append(rows, createPersonAddButton("reminder", "Add Reminder"));
  return panel;
}

function createPeoplePanel(title) {
  const section = document.createElement("section");
  section.className = "people-panel";
  const header = document.createElement("header");
  header.innerHTML = "<h3></h3>";
  header.querySelector("h3").textContent = title;
  section.append(header);
  return section;
}

function createPersonField(field, label, type, value) {
  const wrapper = document.createElement("label");
  wrapper.className = "contact-field";
  const span = document.createElement("span");
  span.textContent = label;
  const input = document.createElement("input");
  input.type = type;
  input.dataset.personField = field;
  input.value = value || "";
  wrapper.append(span, input);
  return wrapper;
}

function createContactLinks(person) {
  const links = document.createElement("div");
  links.className = "contact-links";
  [
    ["Call", person.phone ? `tel:${cleanPhone(person.phone)}` : ""],
    ["Text", person.phone ? `sms:${cleanPhone(person.phone)}` : ""],
    ["Email", person.email ? `mailto:${person.email}` : ""],
    ["Maps", person.address ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(person.address)}` : ""]
  ].forEach(([label, href]) => {
    if (!href) return;
    links.append(createExternalLink(label, href));
  });
  return links;
}

function createSocialRow(social, index) {
  const row = document.createElement("article");
  row.className = "contact-row";
  row.append(
    createPersonListField("socials", index, "platform", "Platform", "select", social.platform, socialPlatforms()),
    createPersonListField("socials", index, "handle", "Handle / URL", "text", social.handle)
  );
  const href = socialLink(social.platform, social.handle);
  if (href) row.append(createExternalLink("Open", href));
  row.append(createPersonRemoveButton("socials", index));
  return row;
}

function createReminderRow(reminder, index) {
  const row = document.createElement("article");
  row.className = "contact-row";
  row.append(
    createPersonListField("reminders", index, "title", "Reminder", "text", reminder.title),
    createPersonListField("reminders", index, "date", "Date", "date", reminder.date),
    createPersonRemoveButton("reminders", index)
  );
  return row;
}

function createPersonListField(list, index, field, label, type, value, options = []) {
  const wrapper = document.createElement("label");
  wrapper.className = "contact-field";
  const span = document.createElement("span");
  span.textContent = label;
  let input;

  if (type === "select") {
    input = document.createElement("select");
    options.forEach((option) => {
      const item = document.createElement("option");
      item.value = option;
      item.textContent = titleCase(option);
      input.append(item);
    });
  } else {
    input = document.createElement("input");
    input.type = type;
  }

  input.dataset.personList = list;
  input.dataset.index = String(index);
  input.dataset.field = field;
  input.value = value || "";
  wrapper.append(span, input);
  return wrapper;
}

function createPersonAddButton(type, label) {
  const button = document.createElement("button");
  button.className = "ghost-button compact-button people-add-button";
  button.type = "button";
  button.dataset.addPersonItem = type;
  button.textContent = label;
  button.addEventListener("click", (event) => {
    event.stopPropagation();
    addPersonItem(type);
  });
  return button;
}

function createPersonRemoveButton(list, index) {
  const button = document.createElement("button");
  button.className = "mini-button remove-button";
  button.type = "button";
  button.dataset.removePersonItem = list;
  button.dataset.index = String(index);
  button.textContent = "Remove";
  button.addEventListener("click", (event) => {
    event.stopPropagation();
    removePersonItem(list, index);
  });
  return button;
}

function createExternalLink(label, href) {
  const link = document.createElement("a");
  link.className = "contact-link";
  link.href = href;
  link.target = "_blank";
  link.rel = "noopener noreferrer";
  link.textContent = label;
  return link;
}

function socialPlatforms() {
  return ["instagram", "x", "facebook", "linkedin", "tiktok", "snapchat", "youtube", "website"];
}

function socialLink(platform, handle) {
  const clean = String(handle || "").trim();
  if (!clean) return "";
  if (/^https?:\/\//i.test(clean)) return clean;
  const value = clean.replace(/^@/, "");
  return {
    instagram: `https://instagram.com/${value}`,
    x: `https://x.com/${value}`,
    facebook: `https://facebook.com/${value}`,
    linkedin: `https://linkedin.com/in/${value}`,
    tiktok: `https://tiktok.com/@${value}`,
    snapchat: `https://snapchat.com/add/${value}`,
    youtube: `https://youtube.com/@${value}`,
    website: `https://${value}`
  }[platform] || `https://${value}`;
}

function formatHandle(handle) {
  const clean = String(handle || "").trim();
  if (!clean) return "";
  return /^https?:\/\//i.test(clean) ? clean : `@${clean.replace(/^@/, "")}`;
}

function cleanPhone(phone) {
  return String(phone || "").replace(/[^\d+]/g, "");
}

function createBudgetOverview(stats) {
  const section = createBudgetSection("Year Overview");
  section.append(
    createOverviewGrid([
      ["Net Income", formatMoney(stats.annualNetIncome)],
      ["Bills", formatMoney(stats.annualBills)],
      ["Subscriptions", formatMoney(stats.annualSubscriptions)],
      ["After Expenses", formatMoney(stats.netAfterExpenses)]
    ])
  );
  return section;
}

function createBudgetAccounts() {
  const section = createBudgetSection("Bank Accounts", formatMoney(getBudgetStats().balance));
  section.append(createBudgetRows("bankAccounts", [
    ["name", "Account", "text"],
    ["amount", "Amount", "number"]
  ]));
  section.append(createAddButton("bankAccounts", "Add Account"));
  return section;
}

function createBudgetCreditCards(stats) {
  const section = createBudgetSection("Credit Cards", `${formatMoney(stats.creditAvailable)} available of ${formatMoney(stats.creditLimit)}`);
  state.budget.creditCards.forEach((card, index) => {
    const limit = toNumber(card.limit);
    const available = toNumber(card.available);
    const usedPercent = limit > 0 ? clamp(((limit - available) / limit) * 100, 0, 100) : 0;
    const row = createBudgetRow("creditCards", index, [
      ["name", "Card", "text"],
      ["limit", "Limit", "number"],
      ["available", "Available", "number"],
      ["amountDue", "Due", "number"],
      ["dueDate", "Due Date", "date"]
    ]);
    const meter = document.createElement("div");
    meter.className = "credit-meter";
    meter.innerHTML = `<span></span><strong></strong>`;
    meter.querySelector("span").style.width = `${usedPercent}%`;
    meter.querySelector("strong").textContent = `${Math.round(usedPercent)}% used`;
    row.append(meter);
    section.append(row);
  });
  section.append(createAddButton("creditCards", "Add Credit Card"));
  return section;
}

function createBudgetIncome(stats) {
  const section = createBudgetSection("Income", `${formatMoney(stats.monthlyNetIncome)} / month after taxes`);
  state.budget.incomeJobs.forEach((job, index) => {
    const row = createBudgetRow("incomeJobs", index, [
      ["name", "Job", "text"],
      ["type", "Type", "select", ["salary", "hourly"]],
      ["gross", "Gross/Period", "number"],
      ["frequency", "Paid", "select", frequencyOptions()],
      ["taxPct", "Tax %", "number"]
    ]);
    const grossYear = toNumber(job.gross) * annualMultiplier(job.frequency);
    const netYear = grossYear * (1 - toNumber(job.taxPct) / 100);
    const calc = document.createElement("p");
    calc.className = "budget-calc";
    calc.textContent = `${formatMoney(netYear / 12)} monthly net, ${formatMoney(netYear)} yearly net. Gross: ${formatMoney(grossYear / 12)} monthly, ${formatMoney(grossYear)} yearly.`;
    row.append(calc);
    section.append(row);
  });
  section.append(createAddButton("incomeJobs", "Add Income"));
  return section;
}

function createBudgetBills() {
  const section = createBudgetSection("Upcoming Bills", `${formatMoney(getBudgetStats().annualBills)} / year`);
  section.append(createBudgetRows("bills", [
    ["name", "Bill", "text"],
    ["amount", "Amount", "number"],
    ["frequency", "Frequency", "select", frequencyOptions()],
    ["dueDate", "Due Date", "date"]
  ]));
  section.append(createAddButton("bills", "Add Bill"));
  return section;
}

function createBudgetSubscriptions() {
  const section = createBudgetSection("Subscriptions", `${formatMoney(getBudgetStats().annualSubscriptions)} / year`);
  section.append(createBudgetRows("subscriptions", [
    ["name", "Subscription", "text"],
    ["amount", "Amount", "number"],
    ["frequency", "Frequency", "select", frequencyOptions()],
    ["nextRenewal", "Next Renewal", "date"]
  ]));
  section.append(createAddButton("subscriptions", "Add Subscription"));
  return section;
}

function createBudgetSection(title, meta = "") {
  const section = document.createElement("section");
  section.className = "budget-panel";
  const header = document.createElement("header");
  header.innerHTML = "<h3></h3><span></span>";
  header.querySelector("h3").textContent = title;
  header.querySelector("span").textContent = meta;
  section.append(header);
  return section;
}

function createOverviewGrid(items) {
  const grid = document.createElement("div");
  grid.className = "overview-grid";
  items.forEach(([label, value]) => grid.append(createMetricTile([label, value])));
  return grid;
}

function createBudgetRows(listName, fields) {
  const container = document.createElement("div");
  container.className = "budget-rows";
  state.budget[listName].forEach((_, index) => container.append(createBudgetRow(listName, index, fields)));
  return container;
}

function createBudgetRow(listName, index, fields) {
  const item = state.budget[listName][index];
  const row = document.createElement("article");
  row.className = "budget-row";
  fields.forEach(([field, label, type, options]) => row.append(createBudgetField(listName, index, item, field, label, type, options)));

  const remove = document.createElement("button");
  remove.className = "mini-button remove-button";
  remove.type = "button";
  remove.dataset.removeBudget = listName;
  remove.dataset.index = String(index);
  remove.textContent = "Remove";
  row.append(remove);
  return row;
}

function createBudgetField(listName, index, item, field, label, type, options = []) {
  const wrapper = document.createElement("label");
  wrapper.className = "budget-field";
  const labelText = document.createElement("span");
  labelText.textContent = label;
  let input;

  if (type === "select") {
    input = document.createElement("select");
    options.forEach((option) => {
      const itemOption = document.createElement("option");
      itemOption.value = option;
      itemOption.textContent = titleCase(option);
      input.append(itemOption);
    });
  } else {
    input = document.createElement("input");
    input.type = type;
    if (type === "number") {
      input.step = "0.01";
      input.min = "0";
    }
  }

  input.dataset.budgetList = listName;
  input.dataset.index = String(index);
  input.dataset.field = field;
  input.value = item[field] ?? "";
  wrapper.append(labelText, input);
  return wrapper;
}

function createAddButton(listName, label) {
  const button = document.createElement("button");
  button.className = "ghost-button compact-button";
  button.type = "button";
  button.dataset.addBudget = listName;
  button.textContent = label;
  return button;
}

function frequencyOptions() {
  return ["weekly", "biweekly", "semimonthly", "monthly", "quarterly", "yearly"];
}

function annualMultiplier(frequency) {
  return {
    weekly: 52,
    biweekly: 26,
    semimonthly: 24,
    monthly: 12,
    quarterly: 4,
    yearly: 1
  }[frequency] || 12;
}

function isWithinDays(dateValue, days) {
  if (!dateValue) return false;
  const target = new Date(`${dateValue}T00:00:00`);
  const today = new Date(TODAY.toISOString().slice(0, 10));
  const diff = (target - today) / 86400000;
  return diff >= 0 && diff <= days;
}

function getAge(dateValue) {
  if (!dateValue) return "";
  const birthDate = new Date(`${dateValue}T00:00:00`);
  if (Number.isNaN(birthDate.getTime())) return "";
  const today = TODAY;
  let age = today.getFullYear() - birthDate.getFullYear();
  const hasHadBirthday = today.getMonth() > birthDate.getMonth() || (today.getMonth() === birthDate.getMonth() && today.getDate() >= birthDate.getDate());
  if (!hasHadBirthday) age -= 1;
  return age >= 0 ? String(age) : "";
}

function formatDate(dateValue) {
  if (!dateValue) return "soon";
  const [year, month, day] = String(dateValue).split("-");
  return `${month}/${day}/${String(year).slice(2)}`;
}

function formatMoney(value) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: Math.abs(value) >= 1000 ? 0 : 2
  }).format(toNumber(value));
}

function toNumber(value) {
  const number = Number(value);
  return Number.isFinite(number) ? number : 0;
}

function titleCase(value) {
  return String(value).replace(/(^|\s)\w/g, (match) => match.toUpperCase());
}

function renderWheel() {
  const rect = els.wheelItems.getBoundingClientRect();
  const width = rect.width || window.innerWidth;
  const height = rect.height || 360;
  const radius = Math.min(width * 0.36, 184);
  const centerX = width / 2;
  const centerY = height - 58;
  const sections = visibleSections();
  const count = sections.length;

  els.wheelItems.replaceChildren(
    ...sections.map((section, index) => {
      const offset = circularOffset(index - state.activeFloat, count);
      const angle = offset * 32;
      const rad = (angle * Math.PI) / 180;
      const distance = Math.abs(offset);
      const item = document.createElement("button");
      item.type = "button";
      item.className = `wheel-item${index === state.activeIndex ? " is-active" : ""}`;
      item.dataset.index = String(index);
      item.style.setProperty("--item-accent", section.accent);
      item.style.setProperty("--item-opacity", String(clamp(1 - Math.max(0, distance - 2.2) * 0.34, 0, 1)));
      item.style.transform = [
        "translate(-50%, -50%)",
        `translate(${centerX + Math.sin(rad) * radius}px, ${centerY - Math.cos(rad) * radius}px)`,
        `rotate(${angle * 0.16}deg)`,
        `scale(${clamp(1.02 - distance * 0.1, 0.78, 1.04)})`
      ].join(" ");
      item.setAttribute("aria-label", section.name);
      item.addEventListener("click", () => {
        snapTo(index);
      });
      item.append(createIcon(section, "section-icon"));
      const label = document.createElement("span");
      label.className = "wheel-label";
      label.textContent = section.name;
      item.append(label);
      return item;
    })
  );
}

function renderWheelScrubber() {
  const count = visibleSections().length;
  const showScrubber = count >= 7;
  els.wheelScrubberWrap.hidden = !showScrubber;
  if (!showScrubber) return;

  els.wheelScrubber.max = String(count - 1);
  els.wheelScrubber.value = String(state.activeIndex);
}

function circularOffset(value, count) {
  return ((((value + count / 2) % count) + count) % count) - count / 2;
}

function snapTo(index) {
  const count = visibleSections().length;
  state.activeIndex = ((index % count) + count) % count;
  state.activeFloat = state.activeIndex;
  popSummary();
  render();
}

function popSummary() {
  els.summarySpace?.classList.remove("pop");
  requestAnimationFrame(() => {
    els.summarySpace?.classList.add("pop");
  });
}

function onPointerDown(event) {
  if (state.detailOpen || event.button > 0) return;
  const targetItem = event.target instanceof Element ? event.target.closest(".wheel-item") : null;
  state.pointer = {
    id: event.pointerId,
    x: event.clientX,
    y: event.clientY,
    startFloat: state.activeFloat,
    targetIndex: targetItem ? Number(targetItem.dataset.index) : state.activeIndex,
    hasWheeled: false,
    pullTargetSelected: false
  };
  state.mode = null;
  state.pullProgress = 0;
  els.wheelZone.setPointerCapture(event.pointerId);
}

function onPointerMove(event) {
  if (!state.pointer || event.pointerId !== state.pointer.id) return;

  const dx = event.clientX - state.pointer.x;
  const dy = event.clientY - state.pointer.y;
  const absX = Math.abs(dx);
  const absY = Math.abs(dy);

  if (!state.mode && Math.max(absX, absY) > 8) {
    state.mode = absY > absX && dy < 0 ? "pull" : "wheel";
  }

  if (state.mode === "pull") {
    event.preventDefault();
    selectPullTarget();
    const progress = clamp(-dy / (window.innerHeight * 0.52), 0, 1);
    setPullProgress(progress);
    maybeOpenDetailFromPull();
    return;
  }

  if (state.mode === "wheel") {
    event.preventDefault();
    const perItem = Math.max(52, window.innerWidth * 0.16);
    state.activeFloat = state.pointer.startFloat - dx / perItem;
    const nextIndex = normalizeIndex(Math.round(state.activeFloat), visibleSections().length);
    if (nextIndex !== state.activeIndex) {
      state.activeIndex = nextIndex;
      state.pointer.hasWheeled = true;
      render();
    } else {
      renderWheel();
    }

    const pulledAfterWheel = state.pointer.hasWheeled && dy < -46 && absY > 46;
    const strongUpwardPull = dy < -82 && absY > absX * 0.44;
    if (pulledAfterWheel || strongUpwardPull) {
      state.mode = "pull";
      selectPullTarget();
      setPullProgress(clamp(-dy / (window.innerHeight * 0.52), 0, 1));
      maybeOpenDetailFromPull();
    }
  }
}

function selectPullTarget() {
  if (!state.pointer || state.pointer.pullTargetSelected) return;

  const targetIndex = state.pointer.hasWheeled ? state.activeIndex : state.pointer.targetIndex;
  if (Number.isInteger(targetIndex) && targetIndex !== state.activeIndex) {
    state.activeIndex = normalizeIndex(targetIndex, visibleSections().length);
    state.activeFloat = state.activeIndex;
    render();
  }

  state.pointer.pullTargetSelected = true;
}

function onPointerUp(event) {
  if (!state.pointer || event.pointerId !== state.pointer.id) return;
  const shouldOpen = state.mode === "pull" && state.pullProgress >= OPEN_PULL_THRESHOLD;

  if (state.mode === "wheel") {
    snapTo(Math.round(state.activeFloat));
  } else if (shouldOpen) {
    openDetail();
  } else {
    setPullProgress(0);
  }

  state.pointer = null;
  state.mode = null;
}

function cancelActiveGesture() {
  if (!state.pointer) return;

  if (state.mode === "wheel") {
    snapTo(Math.round(state.activeFloat));
  } else if (!state.detailOpen) {
    setPullProgress(0);
  }

  state.pointer = null;
  state.mode = null;
}

function maybeOpenDetailFromPull() {
  if (state.detailOpen || state.mode !== "pull") return;

  if (state.pullProgress >= OPEN_PULL_THRESHOLD) {
    openDetail();
  }
}

function setPullProgress(progress) {
  const nextProgress = clamp(progress, 0, 1);
  state.pullProgress = nextProgress;
  els.root.style.setProperty("--paint-progress", nextProgress.toFixed(3));
  els.paintLayer.setAttribute("aria-hidden", nextProgress === 0 ? "true" : "false");
}

function openDetail() {
  state.detailOpen = true;
  state.pointer = null;
  state.mode = null;
  setPullProgress(1);
  els.detailView.setAttribute("aria-hidden", "false");
  els.detailView.classList.add("is-open");
}

function closeDetail() {
  state.detailOpen = false;
  state.detailPointer = null;
  els.detailView.classList.remove("is-open");
  els.detailView.setAttribute("aria-hidden", "true");
  render();
  window.setTimeout(() => {
    if (!state.detailOpen) {
      setPullProgress(0);
      els.paintLayer.setAttribute("aria-hidden", "true");
    }
  }, 120);
}

function onDetailPointerDown(event) {
  if (!state.detailOpen || event.button > 0) return;
  state.detailPointer = {
    id: event.pointerId,
    x: event.clientX,
    y: event.clientY
  };
}

function onDetailPointerMove(event) {
  if (!state.detailPointer || event.pointerId !== state.detailPointer.id) return;

  const dx = event.clientX - state.detailPointer.x;
  const dy = event.clientY - state.detailPointer.y;
  const atTop = els.detailContent.scrollTop <= 0;

  if (atTop && dy > 92 && Math.abs(dy) > Math.abs(dx) * 1.25) {
    closeDetail();
  }
}

function onDetailPointerUp(event) {
  if (!state.detailPointer || event.pointerId !== state.detailPointer.id) return;
  state.detailPointer = null;
}

function normalizeIndex(index, count) {
  return ((index % count) + count) % count;
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function hexToRgba(hex, alpha) {
  const value = hex.replace("#", "");
  const bigint = Number.parseInt(value.length === 3 ? value.split("").map((char) => char + char).join("") : value, 16);
  const red = (bigint >> 16) & 255;
  const green = (bigint >> 8) & 255;
  const blue = bigint & 255;
  return `rgba(${red}, ${green}, ${blue}, ${alpha})`;
}

function openEditor() {
  const section = activeSection();
  state.selectedColor = section.accent;
  state.pendingIconImage = section.iconImage || "";
  els.hideSectionButton.disabled = section.templateId === "home";
  els.hideSectionButton.textContent = section.templateId === "home" ? "Home Locked" : "Hide";
  els.nameInput.value = section.name;
  els.headlineInput.value = section.headline;
  els.briefInput.value = section.brief;
  els.notesInput.value = section.notes.join("\n");
  els.iconInput.value = "";
  renderEditorIcon();
  renderSwatches();
  els.editorBackdrop.hidden = false;
  window.setTimeout(() => els.nameInput.focus(), 60);
}

function closeEditor() {
  els.editorBackdrop.hidden = true;
}

function renderSwatches() {
  els.swatches.replaceChildren(
    ...palette.map((color) => {
      const label = document.createElement("label");
      label.className = "swatch";
      label.style.setProperty("--swatch-color", color);
      label.title = color;
      label.setAttribute("aria-label", color);
      const input = document.createElement("input");
      input.type = "radio";
      input.name = "accent";
      input.value = color;
      input.checked = state.selectedColor === color;
      input.addEventListener("change", () => {
        state.selectedColor = color;
      });
      label.append(input);
      return label;
    })
  );
}

function renderEditorIcon() {
  const section = { ...activeSection(), iconImage: state.pendingIconImage };
  els.editorIconPreview.replaceChildren(createIconGraphic(section));
}

function saveEditor(event) {
  event.preventDefault();
  const section = activeSection();
  const notes = els.notesInput.value
    .split("\n")
    .map((note) => note.trim())
    .filter(Boolean);

  section.name = els.nameInput.value.trim() || section.name;
  section.headline = els.headlineInput.value.trim() || section.headline;
  section.brief = els.briefInput.value.trim() || section.brief;
  section.accent = state.selectedColor || section.accent;
  section.iconImage = state.pendingIconImage;
  section.notes = notes.length ? notes : ["Add the first note for this section."];
  section.metrics = deriveMetrics(section);
  if (isTemplate(section, "people")) {
    section.person = normalizePerson(section.person, section.name);
  }

  saveSections();
  render();
  closeEditor();
}

function deriveMetrics(section) {
  const noteCount = section.notes.length;
  return [
    ["Notes", String(noteCount)],
    ["Focus", section.name],
    ["Color", palette.indexOf(section.accent) + 1 > 0 ? `Accent ${palette.indexOf(section.accent) + 1}` : "Custom"]
  ];
}

function readIconFile(file, onReady) {
  if (!file || !file.type.startsWith("image/")) return;

  const reader = new FileReader();
  reader.addEventListener("load", () => {
    resizeIconImage(String(reader.result), onReady);
  });
  reader.readAsDataURL(file);
}

function resizeIconImage(source, onReady) {
  const image = new Image();
  image.addEventListener("load", () => {
    const size = 256;
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    const smallestSide = Math.min(image.width, image.height);
    const sourceX = (image.width - smallestSide) / 2;
    const sourceY = (image.height - smallestSide) / 2;

    canvas.width = size;
    canvas.height = size;
    context.drawImage(image, sourceX, sourceY, smallestSide, smallestSide, 0, 0, size, size);
    onReady(canvas.toDataURL("image/png"));
  });
  image.src = source;
}

function openSettings() {
  els.firstNameInput.value = state.profile.firstName || "";
  renderSettings();
  els.settingsBackdrop.hidden = false;
}

function closeSettings() {
  els.settingsBackdrop.hidden = true;
}

function renderSettings() {
  const visibleCount = visibleSections().length;
  els.settingsList.replaceChildren(
    ...state.sections.map((section, index) => {
      const isHome = section.templateId === "home";
      const row = document.createElement("article");
      row.className = "settings-row";
      row.style.setProperty("--row-accent", section.accent);

      const icon = createIcon(section, "settings-icon");
      const copy = document.createElement("div");
      copy.className = "settings-copy";
      if (section.templateId === "people") {
        const nameInput = document.createElement("input");
        nameInput.className = "settings-name-input";
        nameInput.dataset.renameSection = section.id;
        nameInput.value = section.name;
        nameInput.maxLength = 28;
        nameInput.setAttribute("aria-label", "Person name");
        const status = document.createElement("span");
        status.textContent = section.enabled ? "Showing in wheel" : "Hidden from wheel";
        copy.append(nameInput, status);
      } else {
        copy.innerHTML = "<strong></strong><span></span>";
        copy.querySelector("strong").textContent = section.name;
        copy.querySelector("span").textContent = section.enabled ? "Showing in wheel" : "Hidden from wheel";
      }

      const actions = document.createElement("div");
      actions.className = "settings-actions";

      const toggle = document.createElement("label");
      toggle.className = "toggle";
      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.checked = section.enabled;
      checkbox.disabled = isHome || (section.enabled && visibleCount <= 1);
      checkbox.addEventListener("change", () => {
        section.enabled = checkbox.checked;
        keepActiveSectionVisible();
        saveSections();
        render();
        renderSettings();
      });
      const switchTrack = document.createElement("span");
      toggle.append(checkbox, switchTrack);

      const uploadLabel = document.createElement("label");
      uploadLabel.className = "mini-button";
      uploadLabel.textContent = "Icon";
      const uploadInput = document.createElement("input");
      uploadInput.type = "file";
      uploadInput.accept = "image/*";
      uploadInput.hidden = true;
      uploadInput.addEventListener("change", () => {
        readIconFile(uploadInput.files?.[0], (dataUrl) => {
          section.iconImage = dataUrl;
          saveSections();
          render();
          renderSettings();
        });
      });
      uploadLabel.append(uploadInput);

      const orderControls = document.createElement("div");
      orderControls.className = "order-controls";
      orderControls.append(
        createOrderButton(index, -1),
        createOrderButton(index, 1)
      );

      const remove = document.createElement("button");
      remove.className = "mini-button";
      remove.type = "button";
      remove.dataset.removeSection = section.id;
      remove.disabled = isHome;
      remove.textContent = isHome ? "Locked" : "Remove";

      actions.append(toggle, orderControls, uploadLabel, remove);
      row.append(icon, copy, actions);
      return row;
    })
  );
}

function createOrderButton(index, direction) {
  const button = document.createElement("button");
  button.className = "mini-button order-button";
  button.type = "button";
  button.dataset.moveIndex = String(index);
  button.dataset.direction = String(direction);
  button.textContent = direction < 0 ? "Up" : "Down";
  button.disabled = direction < 0 ? index === 0 : index === state.sections.length - 1;
  return button;
}

function keepActiveSectionVisible() {
  const sections = visibleSections();
  state.activeIndex = clamp(state.activeIndex, 0, sections.length - 1);
  state.activeFloat = state.activeIndex;
}

function hideActiveSection() {
  const visible = visibleSections();
  if (visible.length <= 1 || activeSection().templateId === "home") return;

  activeSection().enabled = false;
  keepActiveSectionVisible();
  saveSections();
  render();
  closeEditor();
}

function addSectionFromTemplate(templateId) {
  const template = getTemplate(templateId);
  const count = state.sections.filter((section) => section.templateId === templateId && section.enabled).length + 1;
  const section = normalizeSection({
    ...template,
    id: uid(templateId),
    templateId,
    name: templateId === "people" ? `Person ${count}` : `Job ${count}`,
    enabled: true
  }, template);
  const homeIndex = state.sections.findIndex((item) => item.templateId === "home");
  state.sections.splice(Math.max(homeIndex + 1, state.sections.length), 0, section);
  state.activeIndex = visibleSections().findIndex((item) => item.id === section.id);
  state.activeFloat = state.activeIndex;
  saveSections();
  render();
  renderSettings();
}

function removeSection(sectionId) {
  const index = state.sections.findIndex((section) => section.id === sectionId);
  if (index < 0 || state.sections[index].templateId === "home") return;

  const section = state.sections[index];
  const duplicateCount = state.sections.filter((item) => item.templateId === section.templateId).length;
  if (duplicateCount > 1 || ["people", "work"].includes(section.templateId)) {
    state.sections.splice(index, 1);
  } else {
    section.enabled = false;
  }

  keepActiveSectionVisible();
  saveSections();
  render();
  renderSettings();
}

function renameSection(sectionId, name) {
  const section = state.sections.find((item) => item.id === sectionId);
  const nextName = name.trim();
  if (!section || !nextName) return;
  section.name = nextName;
  if (section.templateId === "people") {
    section.headline = nextName;
    section.person = normalizePerson(section.person, nextName);
  }
  saveSections();
  render();
}

function moveSection(index, direction) {
  const target = index + direction;
  if (target < 0 || target >= state.sections.length) return;
  const activeId = activeSection().id;
  const [section] = state.sections.splice(index, 1);
  state.sections.splice(target, 0, section);
  const nextActive = visibleSections().findIndex((item) => item.id === activeId);
  state.activeIndex = Math.max(0, nextActive);
  state.activeFloat = state.activeIndex;
  saveSections();
  render();
  renderSettings();
}

function updateBudgetValue(target) {
  const listName = target.dataset.budgetList;
  const index = Number(target.dataset.index);
  const field = target.dataset.field;
  if (!listName || !field || !state.budget[listName]?.[index]) return;

  state.budget[listName][index][field] = target.type === "number" ? toNumber(target.value) : target.value;
  saveBudget();
  if (isTemplate(activeSection(), "budget")) render();
}

function addBudgetItem(listName) {
  const item = {
    bankAccounts: { id: uid("acct"), name: "New Account", amount: 0 },
    creditCards: { id: uid("card"), name: "New Card", limit: 0, available: 0, amountDue: 0, dueDate: dateInDays(7) },
    incomeJobs: { id: uid("income"), name: "New Income", type: "salary", gross: 0, frequency: "biweekly", taxPct: 20 },
    bills: { id: uid("bill"), name: "New Bill", amount: 0, frequency: "monthly", dueDate: dateInDays(7) },
    subscriptions: { id: uid("sub"), name: "New Subscription", amount: 0, frequency: "monthly", nextRenewal: dateInDays(7) }
  }[listName];

  if (!item) return;
  state.budget[listName].push(item);
  saveBudget();
  render();
}

function removeBudgetItem(listName, index) {
  if (!state.budget[listName]?.[index]) return;
  state.budget[listName].splice(index, 1);
  saveBudget();
  render();
}

function updatePersonValue(target, shouldRender = true) {
  const section = activeSection();
  if (!isTemplate(section, "people")) return;
  const person = ensureEditablePerson(section);

  const directField = target.dataset.personField;
  if (directField) {
    person[directField] = target.value;
    saveSections();
    if (shouldRender) render();
    return;
  }

  const listName = target.dataset.personList;
  const index = Number(target.dataset.index);
  const field = target.dataset.field;
  if (!listName || !field || !person[listName]?.[index]) return;

  person[listName][index][field] = target.value;
  saveSections();
  if (shouldRender) render();
}

function addPersonItem(type) {
  const section = activeSection();
  if (!isTemplate(section, "people")) return;
  const person = ensureEditablePerson(section);

  if (type === "social") {
    person.socials.push({ id: uid("social"), platform: "instagram", handle: "" });
  }

  if (type === "reminder") {
    person.reminders.push({ id: uid("reminder"), title: "", date: "" });
  }

  saveSections();
  render();
}

function removePersonItem(listName, index) {
  const section = activeSection();
  if (!isTemplate(section, "people")) return;
  const person = ensureEditablePerson(section);
  if (!person[listName]?.[index]) return;
  person[listName].splice(index, 1);
  saveSections();
  render();
}

function handleKeys(event) {
  if (els.settingsBackdrop.hidden === false) {
    if (event.key === "Escape") closeSettings();
    return;
  }

  if (els.editorBackdrop.hidden === false) {
    if (event.key === "Escape") closeEditor();
    return;
  }

  if (state.detailOpen && event.key === "Escape") {
    closeDetail();
    return;
  }

  if (event.key === "ArrowRight") {
    snapTo(state.activeIndex + 1);
  }

  if (event.key === "ArrowLeft") {
    snapTo(state.activeIndex - 1);
  }
}

function registerServiceWorker() {
  const supportsServiceWorker = "serviceWorker" in navigator;
  const canRegisterHere = ["http:", "https:"].includes(window.location.protocol);

  if (supportsServiceWorker && canRegisterHere) {
    window.addEventListener("load", () => {
      navigator.serviceWorker.register("./service-worker.js").catch((error) => {
        console.warn("Service worker registration failed", error);
      });
    });
  }
}

els.wheelZone.addEventListener("pointerdown", onPointerDown);
els.wheelZone.addEventListener("pointermove", onPointerMove);
els.wheelZone.addEventListener("pointerup", onPointerUp);
els.wheelZone.addEventListener("pointercancel", onPointerUp);
window.addEventListener("pointerup", onPointerUp);
window.addEventListener("pointercancel", onPointerUp);
window.addEventListener("blur", cancelActiveGesture);
els.closeDetailButton.addEventListener("pointerup", (event) => {
  event.stopPropagation();
  closeDetail();
});
els.closeDetailButton.addEventListener("click", closeDetail);
els.detailView.addEventListener("pointerdown", onDetailPointerDown);
els.detailView.addEventListener("pointermove", onDetailPointerMove);
els.detailView.addEventListener("pointerup", onDetailPointerUp);
els.detailView.addEventListener("pointercancel", onDetailPointerUp);
els.detailEditButton.addEventListener("click", openEditor);
els.editSectionButton.addEventListener("click", openEditor);
els.settingsButton.addEventListener("click", openSettings);
els.closeEditorButton.addEventListener("click", closeEditor);
els.editorBackdrop.addEventListener("click", (event) => {
  if (event.target === els.editorBackdrop) closeEditor();
});
els.editorForm.addEventListener("submit", saveEditor);
els.iconInput.addEventListener("change", () => {
  readIconFile(els.iconInput.files?.[0], (dataUrl) => {
    state.pendingIconImage = dataUrl;
    renderEditorIcon();
  });
});
els.resetIconButton.addEventListener("click", () => {
  state.pendingIconImage = "";
  els.iconInput.value = "";
  renderEditorIcon();
});
els.hideSectionButton.addEventListener("click", hideActiveSection);
els.detailNotes.addEventListener("change", (event) => {
  if (event.target instanceof HTMLInputElement || event.target instanceof HTMLSelectElement) {
    updateBudgetValue(event.target);
    updatePersonValue(event.target);
  }
});
els.detailNotes.addEventListener("input", (event) => {
  if (event.target instanceof HTMLTextAreaElement) {
    updatePersonValue(event.target, false);
  }

  if (event.target instanceof HTMLInputElement && (event.target.dataset.personField || event.target.dataset.personList)) {
    updatePersonValue(event.target, false);
  }
});
els.detailNotes.addEventListener("click", (event) => {
  const target = event.target;
  if (!(target instanceof HTMLElement)) return;

  const addButton = target.closest("[data-add-budget]");
  if (addButton) {
    addBudgetItem(addButton.dataset.addBudget);
    return;
  }

  const removeButton = target.closest("[data-remove-budget]");
  if (removeButton) {
    removeBudgetItem(removeButton.dataset.removeBudget, Number(removeButton.dataset.index));
    return;
  }

  const addPersonButton = target.closest("[data-add-person-item]");
  if (addPersonButton) {
    addPersonItem(addPersonButton.dataset.addPersonItem);
    return;
  }

  const removePersonButton = target.closest("[data-remove-person-item]");
  if (removePersonButton) {
    removePersonItem(removePersonButton.dataset.removePersonItem, Number(removePersonButton.dataset.index));
  }
});
els.closeSettingsButton.addEventListener("click", closeSettings);
els.doneSettingsButton.addEventListener("click", closeSettings);
els.settingsBackdrop.addEventListener("click", (event) => {
  if (event.target === els.settingsBackdrop) closeSettings();
});
els.firstNameInput.addEventListener("input", () => {
  state.profile.firstName = els.firstNameInput.value.trim();
  saveProfile();
  render();
});
els.addPersonButton.addEventListener("click", () => addSectionFromTemplate("people"));
els.addJobButton.addEventListener("click", () => addSectionFromTemplate("work"));
els.settingsList.addEventListener("click", (event) => {
  const target = event.target;
  if (!(target instanceof HTMLElement)) return;

  const removeButton = target.closest("[data-remove-section]");
  if (removeButton) {
    removeSection(removeButton.dataset.removeSection);
    return;
  }

  const moveButton = target.closest("[data-move-index]");
  if (moveButton) {
    moveSection(Number(moveButton.dataset.moveIndex), Number(moveButton.dataset.direction));
  }
});
els.settingsList.addEventListener("input", (event) => {
  const target = event.target;
  if (target instanceof HTMLInputElement && target.dataset.renameSection) {
    renameSection(target.dataset.renameSection, target.value);
  }
});
els.wheelScrubber.addEventListener("input", () => {
  snapTo(Number(els.wheelScrubber.value));
});
window.addEventListener("keydown", handleKeys);
window.addEventListener("resize", renderWheel);

render();
registerServiceWorker();
