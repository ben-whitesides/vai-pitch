/* global React, IconSearch, IconBell, IconHome, IconUsers, IconChat, IconCalendar, IconChart, IconDollar, IconCheck, IconShield, IconTrophy, IconWhistle, IconSparkles, IconChevR, IconChevL, IconPlus, IconDotsH, IconActivity, IconArrowUp, IconClose, IconSend, VAIWingmark */

// ────────────────────────────────────────────────────────────────────────────
// VAI GAME OS — Dashboard Redesign
// 3 concept directions + audit, all using the existing VAI tokens (styles.css).
// ────────────────────────────────────────────────────────────────────────────

const T = {
  bg: '#060608',
  card: '#0c0c10',
  elevated: '#141418',
  surface: '#1a1a20',
  border: '#1e1e26',
  borderSoft: '#15151c',
  orange: '#F7941E',
  green: '#34D399',
  red: '#FF6B6B',
  yellow: '#FBBF24',
  blue: '#5577DD',
  textStrong: '#F5F0EB',
  textBody: '#C8C8D0',
  textMuted: '#8888A0',
  textFaint: '#4d4d60',
  fontHead: "'Oswald', system-ui, sans-serif",
  fontBody: "'DM Sans', system-ui, sans-serif",
  fontMono: "'JetBrains Mono', ui-monospace, monospace",
};

const Mono = ({ children, color = T.textMuted, size = 10, style }) => (
  <span style={{
    fontFamily: T.fontMono, fontWeight: 500, textTransform: 'uppercase',
    letterSpacing: '0.06em', fontSize: size, color, ...style,
  }}>{children}</span>
);

const Tag = ({ children, color = T.orange, bg, border }) => (
  <span style={{
    display: 'inline-flex', alignItems: 'center', gap: 4,
    padding: '3px 7px', borderRadius: 4,
    background: bg || `${color}15`,
    border: `1px solid ${border || color}40`,
    color, fontFamily: T.fontMono, fontWeight: 600, fontSize: 9,
    letterSpacing: '0.08em', textTransform: 'uppercase',
  }}>{children}</span>
);

const Dot = ({ color = T.green, size = 7, pulse = false, style }) => (
  <span className={pulse ? 'avanti-dot' : ''} style={{
    width: size, height: size, borderRadius: 999, background: color,
    flexShrink: 0, ...(pulse ? {} : style),
  }} />
);

// ────────────────────────────────────────────────────────────────────────────
// AUDIT SHEET — first artboard, plain text design notes
// ────────────────────────────────────────────────────────────────────────────
const AuditSheet = () => {
  const Block = ({ num, title, body, severity }) => (
    <div style={{ display: 'grid', gridTemplateColumns: '32px 1fr', gap: 14, padding: '14px 0', borderBottom: `1px solid ${T.borderSoft}` }}>
      <div style={{
        width: 28, height: 28, borderRadius: 6,
        background: severity === 'high' ? `${T.red}18` : severity === 'med' ? `${T.yellow}18` : `${T.green}18`,
        border: `1px solid ${severity === 'high' ? `${T.red}40` : severity === 'med' ? `${T.yellow}40` : `${T.green}40`}`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: severity === 'high' ? T.red : severity === 'med' ? T.yellow : T.green,
        fontFamily: T.fontMono, fontWeight: 700, fontSize: 11,
      }}>{num}</div>
      <div>
        <div style={{ fontFamily: T.fontHead, fontSize: 17, fontWeight: 600, color: T.textStrong, letterSpacing: '0.01em', marginBottom: 4 }}>{title}</div>
        <div style={{ fontFamily: T.fontBody, fontSize: 13.5, color: T.textBody, lineHeight: 1.55 }}>{body}</div>
      </div>
    </div>
  );

  return (
    <div style={{ background: T.bg, padding: '40px 56px', height: '100%', overflow: 'auto', fontFamily: T.fontBody }} className="no-scrollbar">
      <div style={{ maxWidth: 880 }}>
        <Mono color={T.orange} size={11}>VAI · GAME OS · DASHBOARD AUDIT</Mono>
        <h1 style={{ fontFamily: T.fontHead, fontSize: 48, fontWeight: 600, color: T.textStrong, margin: '8px 0 6px', letterSpacing: '-0.01em' }}>
          What we found, what we'll fix
        </h1>
        <p style={{ color: T.textMuted, fontSize: 14, lineHeight: 1.6, margin: '0 0 28px', maxWidth: 640 }}>
          The current dashboard works hard — live ticker, KPIs, a needs-action queue, AVANTI presence, multi-team standings — but every element is competing at the same volume. Below: the eight things keeping it from feeling like a 2026 enterprise SaaS, and the three concept directions we'll explore.
        </p>

        <div style={{ background: T.card, border: `1px solid ${T.border}`, borderRadius: 14, padding: '8px 24px', marginBottom: 32 }}>
          <Block num="01" severity="high" title="No visual hierarchy between equal-weight blocks"
            body="Live ticker, six KPIs, Needs Action, Status Overview — five horizontal bands, all equal in scale and contrast. The eye has nowhere to land first. Fix: introduce a clear focal hierarchy — one hero, two supporting tiers, one ambient layer." />
          <Block num="02" severity="high" title="The lede is buried"
            body="The most important thing on the screen — a payment 4 days overdue blocking play in 3 days — is rendered at the same size as everything else. Urgent items deserve roughly 2× the visual weight of routine ones." />
          <Block num="03" severity="med" title="KPI row is undifferentiated"
            body="Players, Teams, PLAY Index, Reg Collected, Waivers, Exceptions all share one treatment. They're three different kinds of metric (counts, health, alerts) and should look it. Group by category, vary by criticality." />
          <Block num="04" severity="med" title="Sidebar carries five layers of context before nav"
            body="GAME OS → Club Admin → Super Admin → Platform Administrator → org name → CLUB OS section → LIVE OPS section. That's five labels of context above any clickable item. Most users only need org + role + one nav. Collapse the rest." />
          <Block num="05" severity="med" title="Right column is a grab-bag"
            body="PLAY Health, This Week, League Standings — three unrelated widgets stacked. Reads as 'leftover space.' Either commit to a focused right-rail purpose (e.g. 'agenda') or fold these into the main grid where they earn their place." />
          <Block num="06" severity="high" title="AVANTI is decorative, not a verb"
            body="The pill pulses but doesn't do anything. The user's actual jobs are 'communicate, manage tryouts, manage registration, review finances' — AVANTI should execute those via command, not just notify. Concept C makes the pill a real ⌘K command bar." />
          <Block num="07" severity="med" title="Top chrome eats 25% of the viewport on a 13″ laptop"
            body="Breadcrumb + REVIEW MODE + Title + role badge + subtitle + live ticker = ~180px before useful content begins. Collapse breadcrumb into the title row, demote the live ticker to a sticky strip or right-rail." />
          <Block num="08" severity="low" title="Multi-team context is invisible from the dashboard"
            body="Most users focus on one team but org rollups matter. There's no team switcher in the layout — promote it to the header, treat it as a first-class control like Linear's project switcher." />
        </div>

        <Mono color={T.orange} size={11}>THREE DIRECTIONS YOU'LL SEE NEXT</Mono>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginTop: 12 }}>
          {[
            { letter: 'A', name: 'Refinement', desc: 'Same architecture you have now, hierarchy fixed. Hero card 2× scale. KPIs grouped. AVANTI becomes a real ⌘K bar.' },
            { letter: 'B', name: 'Evolution', desc: 'Agenda-first dashboard. Replaces KPI grid with a Today timeline + focused inbox. Multi-team switcher in header.' },
            { letter: 'C', name: 'Reinvention', desc: 'Command-center. One dominant focus card takes 60%. AVANTI omni-bar pinned at top center. Role switcher prominent.' },
          ].map(c => (
            <div key={c.letter} style={{ background: T.card, border: `1px solid ${T.border}`, borderRadius: 12, padding: 18 }}>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 8 }}>
                <span style={{ fontFamily: T.fontHead, fontSize: 32, fontWeight: 600, color: T.orange, lineHeight: 1 }}>{c.letter}</span>
                <span style={{ fontFamily: T.fontHead, fontSize: 16, fontWeight: 500, color: T.textStrong, letterSpacing: '0.02em', textTransform: 'uppercase' }}>{c.name}</span>
              </div>
              <p style={{ fontSize: 13, color: T.textBody, margin: 0, lineHeight: 1.5 }}>{c.desc}</p>
            </div>
          ))}
        </div>

        <p style={{ color: T.textFaint, fontSize: 12, margin: '36px 0 0', fontStyle: 'italic' }}>
          Use the Tweaks panel (toolbar toggle) to change density, AVANTI placement, sidebar style, and accent across all three concepts live.
        </p>
      </div>
    </div>
  );
};

// ────────────────────────────────────────────────────────────────────────────
// SHARED PRIMITIVES — sidebar, headers, AVANTI surfaces
// ────────────────────────────────────────────────────────────────────────────

const NavItem = ({ icon: Ico, label, active, badge, dim, dense }) => (
  <button style={{
    display: 'flex', alignItems: 'center', gap: 10,
    width: '100%', padding: dense ? '6px 10px' : '8px 10px',
    background: active ? `${T.orange}14` : 'transparent',
    border: '1px solid', borderColor: active ? `${T.orange}30` : 'transparent',
    borderRadius: 7, cursor: 'pointer',
    color: active ? T.orange : dim ? T.textFaint : T.textBody,
    fontFamily: T.fontBody, fontSize: 13, fontWeight: active ? 600 : 500,
    textAlign: 'left',
  }}>
    <Ico size={15} stroke="currentColor" />
    <span style={{ flex: 1 }}>{label}</span>
    {badge && <Mono color={badge.color || T.orange} size={9}>{badge.text}</Mono>}
  </button>
);

const Sidebar = ({ active = 'Dashboard', dense = false, style = 'rail' }) => {
  const items = [
    { icon: IconHome, label: 'Dashboard' },
    { icon: IconUsers, label: 'Athletes' },
    { icon: IconShield, label: 'Roster' },
    { icon: IconActivity, label: 'Formation' },
    { icon: IconCalendar, label: 'Schedule' },
    { icon: IconChat, label: 'Comms', badge: { text: '3', color: T.green } },
    { icon: IconCheck, label: 'Compliance' },
    { icon: IconDollar, label: 'Registration' },
    { icon: IconWhistle, label: 'Tryouts' },
    { icon: IconTrophy, label: 'Recruiting', badge: { text: 'NEW', color: T.green } },
    { icon: IconSparkles, label: 'Coaches Corner', badge: { text: 'AI', color: T.green } },
  ];

  if (style === 'rail') {
    return (
      <aside style={{
        width: 64, height: '100%', background: T.bg,
        borderRight: `1px solid ${T.border}`,
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        padding: '14px 0', gap: 4,
      }}>
        <div style={{ marginBottom: 8 }}><VAIWingmark size={18} /></div>
        {items.map((i, idx) => (
          <button key={idx} title={i.label} style={{
            width: 40, height: 40, borderRadius: 8,
            background: i.label === active ? `${T.orange}18` : 'transparent',
            border: '1px solid', borderColor: i.label === active ? `${T.orange}40` : 'transparent',
            color: i.label === active ? T.orange : T.textMuted,
            cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
            position: 'relative',
          }}>
            <i.icon size={17} />
            {i.badge && <span style={{
              position: 'absolute', top: 4, right: 4,
              width: 6, height: 6, borderRadius: 999, background: i.badge.color,
            }} />}
          </button>
        ))}
        <div style={{ flex: 1 }} />
        <button title="Settings" style={{
          width: 36, height: 36, borderRadius: 999, background: T.surface,
          border: `1px solid ${T.border}`, color: T.textBody, cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>BW</button>
      </aside>
    );
  }

  return (
    <aside style={{
      width: 220, height: '100%', background: T.bg,
      borderRight: `1px solid ${T.border}`,
      display: 'flex', flexDirection: 'column', padding: 14,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '4px 6px 18px' }}>
        <VAIWingmark size={18} />
        <Mono color={T.textFaint} size={9}>GAME OS</Mono>
      </div>
      <Mono color={T.textFaint} size={9} style={{ padding: '4px 10px 8px' }}>NAVIGATE</Mono>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {items.map((i, idx) => (
          <NavItem key={idx} icon={i.icon} label={i.label} active={i.label === active} badge={i.badge} dense={dense} />
        ))}
      </div>
    </aside>
  );
};

// ────────────────────────────────────────────────────────────────────────────
// ORG / ROLE / TEAM SWITCHER — the missing primitive from the current design
// ────────────────────────────────────────────────────────────────────────────
const OrgSwitcher = ({ compact = false }) => (
  <button style={{
    display: 'flex', alignItems: 'center', gap: 10,
    padding: compact ? '6px 10px' : '8px 12px',
    background: T.card, border: `1px solid ${T.border}`,
    borderRadius: 8, cursor: 'pointer', color: T.textStrong,
    fontFamily: T.fontBody, fontSize: 13, fontWeight: 500,
  }}>
    <div style={{
      width: 22, height: 22, borderRadius: 5, background: `${T.orange}25`,
      border: `1px solid ${T.orange}50`, display: 'flex', alignItems: 'center',
      justifyContent: 'center', color: T.orange, fontFamily: T.fontHead,
      fontSize: 11, fontWeight: 700,
    }}>NL</div>
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', lineHeight: 1.2 }}>
      <span>Next Level Athlete</span>
      {!compact && <Mono size={9} color={T.textFaint}>FALL 2026 · 8 TEAMS</Mono>}
    </div>
    <IconChevR size={13} stroke={T.textMuted} />
  </button>
);

const TeamPill = ({ name, color = T.orange, active = false }) => (
  <button style={{
    display: 'flex', alignItems: 'center', gap: 6,
    padding: '5px 10px',
    background: active ? `${color}18` : T.card,
    border: `1px solid ${active ? `${color}50` : T.border}`,
    borderRadius: 999, cursor: 'pointer',
    color: active ? color : T.textBody,
    fontFamily: T.fontBody, fontSize: 12, fontWeight: 500,
  }}>
    <Dot color={color} size={6} />
    {name}
  </button>
);

const RoleBadge = ({ role = 'Club Admin' }) => (
  <button style={{
    display: 'inline-flex', alignItems: 'center', gap: 6,
    padding: '4px 8px',
    background: T.card, border: `1px solid ${T.border}`,
    borderRadius: 999, cursor: 'pointer',
    color: T.textBody, fontFamily: T.fontBody, fontSize: 11, fontWeight: 500,
  }}>
    <Dot color={T.green} size={6} pulse />
    {role}
    <IconChevR size={11} stroke={T.textMuted} />
  </button>
);

// ────────────────────────────────────────────────────────────────────────────
// AVANTI — three placement variants
// ────────────────────────────────────────────────────────────────────────────
const AvantiPill = ({ label = 'AVANTI', count = 2, active = true, size = 'md' }) => {
  const h = size === 'lg' ? 56 : 44;
  const px = size === 'lg' ? 20 : 16;
  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      {active && <>
        <div className="flagship-ring r1" />
        <div className="flagship-ring r2" />
        <div className="flagship-ring r3" />
      </>}
      <button className={`flagship-pill ${active ? 'active' : ''}`} style={{
        position: 'relative',
        height: h, padding: `0 ${px}px`,
        background: T.green, color: '#000',
        border: 'none', borderRadius: 999, cursor: 'pointer',
        fontFamily: T.fontHead, fontWeight: 600, fontSize: size === 'lg' ? 16 : 13,
        letterSpacing: '0.06em', textTransform: 'uppercase',
        display: 'inline-flex', alignItems: 'center', gap: 10,
      }}>
        <IconSparkles size={size === 'lg' ? 18 : 15} stroke="#000" />
        {label}
        {count != null && (
          <span style={{
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            minWidth: 22, height: 22, padding: '0 6px',
            background: '#000', color: T.green,
            borderRadius: 999, fontFamily: T.fontMono, fontWeight: 600, fontSize: 11,
          }}>{count}</span>
        )}
      </button>
    </div>
  );
};

const AvantiOmnibar = ({ width = 460 }) => (
  <div style={{
    display: 'flex', alignItems: 'center', gap: 10,
    width, height: 40, padding: '0 6px 0 14px',
    background: T.card, border: `1px solid ${T.green}40`,
    borderRadius: 999,
    boxShadow: `0 0 0 1px ${T.green}15, 0 0 20px -6px ${T.green}55`,
  }}>
    <IconSparkles size={15} stroke={T.green} />
    <span style={{ flex: 1, color: T.textBody, fontFamily: T.fontBody, fontSize: 13 }}>
      Ask AVANTI or run a command…
    </span>
    <Mono color={T.textFaint} size={10}>⌘K</Mono>
    <span style={{
      display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
      width: 28, height: 28, borderRadius: 999,
      background: T.green, color: '#000',
    }}>
      <IconSend size={13} stroke="#000" />
    </span>
  </div>
);

// ────────────────────────────────────────────────────────────────────────────
// CONCEPT A — REFINEMENT
// Same architecture as current. Hierarchy fixed.
// ────────────────────────────────────────────────────────────────────────────
const ConceptA = ({ density = 60, sidebar = 'rail', avantiPlace = 'pill', accent = T.orange }) => {
  const pad = density > 70 ? 14 : density > 40 ? 18 : 24;

  return (
    <div style={{ display: 'flex', width: '100%', height: '100%', background: T.bg, fontFamily: T.fontBody, position: 'relative', overflow: 'hidden' }}>
      <Sidebar active="Dashboard" style={sidebar} />

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        {/* Top bar */}
        <header style={{
          display: 'flex', alignItems: 'center', gap: 14,
          padding: `12px ${pad}px`, borderBottom: `1px solid ${T.border}`,
        }}>
          <OrgSwitcher />
          <RoleBadge />
          <div style={{ flex: 1 }} />
          {avantiPlace === 'omnibar' ? <AvantiOmnibar width={420} /> : (
            <div style={{
              display: 'flex', alignItems: 'center', gap: 8, padding: '6px 14px',
              background: T.card, border: `1px solid ${T.border}`, borderRadius: 999,
              color: T.textMuted, fontSize: 13, width: 280,
            }}>
              <IconSearch size={14} />
              Search athletes, teams, tournaments…
              <span style={{ flex: 1 }} />
              <Mono size={9} color={T.textFaint}>⌘K</Mono>
            </div>
          )}
          <button style={{ width: 36, height: 36, borderRadius: 999, background: 'transparent', border: `1px solid ${T.border}`, color: T.textBody, position: 'relative', cursor: 'pointer' }}>
            <IconBell size={15} />
            <span style={{ position: 'absolute', top: 7, right: 9, width: 7, height: 7, borderRadius: 999, background: T.red }} />
          </button>
        </header>

        {/* Title row */}
        <div style={{ padding: `${pad}px ${pad + 4}px 8px`, display: 'flex', alignItems: 'flex-end', gap: 14 }}>
          <div>
            <Mono color={T.textFaint}>DASHBOARD · FALL 2026 SEASON</Mono>
            <h1 style={{ fontFamily: T.fontHead, fontSize: 32, fontWeight: 600, color: T.textStrong, margin: '4px 0 0', letterSpacing: '0.005em' }}>
              Good morning, Ben
            </h1>
          </div>
          <div style={{ flex: 1 }} />
          <Mono color={T.green}>● 3 LIVE GAMES</Mono>
          <Mono color={T.textFaint}>SUN MAY 4 · 9:41 AM</Mono>
        </div>

        {/* Body grid */}
        <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '1fr 320px', gap: pad, padding: `8px ${pad + 4}px ${pad}px`, minHeight: 0, overflow: 'hidden' }}>
          {/* LEFT */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: pad, minHeight: 0 }}>
            {/* Hero — the lede, 2× weight */}
            <div style={{
              background: `linear-gradient(135deg, ${T.red}10 0%, transparent 60%)`,
              border: `1px solid ${T.red}40`,
              borderRadius: 12, padding: 20,
              boxShadow: `0 0 30px -10px ${T.red}40`,
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                <Tag color={T.red}>URGENT</Tag>
                <Mono color={T.textMuted}>BLOCKS PLAY · 3 DAYS</Mono>
                <span style={{ flex: 1 }} />
                <Mono color={T.textFaint}>OPENED 4D AGO</Mono>
              </div>
              <div style={{ fontFamily: T.fontHead, fontSize: 26, fontWeight: 600, color: T.textStrong, lineHeight: 1.15, marginBottom: 8 }}>
                Mia Rodriguez · Westfield Varsity payment overdue
              </div>
              <div style={{ color: T.textBody, fontSize: 14, lineHeight: 1.55, marginBottom: 16 }}>
                Medical form expired and payment outstanding. Saturday's match against Skyline blocked unless resolved. Override requires admin approval and a logged reason.
              </div>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                <button style={{ padding: '8px 16px', background: accent, color: '#000', border: 'none', borderRadius: 7, fontFamily: T.fontBody, fontWeight: 600, fontSize: 13, cursor: 'pointer' }}>Notify Family</button>
                <button style={{ padding: '8px 16px', background: 'transparent', color: T.textStrong, border: `1px solid ${T.border}`, borderRadius: 7, fontFamily: T.fontBody, fontWeight: 500, fontSize: 13, cursor: 'pointer' }}>Approve Override</button>
                <button style={{ padding: '8px 16px', background: 'transparent', color: T.textMuted, border: `1px solid ${T.border}`, borderRadius: 7, fontFamily: T.fontBody, fontWeight: 500, fontSize: 13, cursor: 'pointer' }}>Defer 24h</button>
                <span style={{ flex: 1 }} />
                <button style={{ padding: '8px 12px', background: 'transparent', color: T.green, border: `1px solid ${T.green}40`, borderRadius: 7, fontFamily: T.fontBody, fontWeight: 500, fontSize: 12, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6 }}>
                  <IconSparkles size={13} stroke={T.green} />
                  AVANTI: draft message
                </button>
              </div>
            </div>

            {/* Grouped KPIs — three categories */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: pad }}>
              {[
                { label: 'PEOPLE', color: T.orange, items: [
                  { v: '172', k: 'Athletes', s: '158 active · 14 pending' },
                  { v: '8', k: 'Teams', s: '4 V · 4 JV' },
                ] },
                { label: 'HEALTH', color: T.green, items: [
                  { v: '81%', k: 'PLAY Index', s: '↑ 2.4% this week', vColor: T.green },
                  { v: '88%', k: 'Roster Ready', s: 'across all teams' },
                ] },
                { label: 'NEEDS YOU', color: T.red, items: [
                  { v: '2', k: 'Exceptions', s: 'input today', vColor: T.red },
                  { v: '14/172', k: 'Waivers Missing', s: 'unsigned', vColor: T.yellow },
                ] },
              ].map(group => (
                <div key={group.label} style={{ background: T.card, border: `1px solid ${T.border}`, borderRadius: 10, padding: 14 }}>
                  <Mono color={group.color} style={{ marginBottom: 10 }}>{group.label}</Mono>
                  {group.items.map((it, i) => (
                    <div key={i} style={{ paddingTop: i === 0 ? 0 : 10, paddingBottom: i === group.items.length - 1 ? 0 : 10, borderBottom: i === group.items.length - 1 ? 'none' : `1px solid ${T.borderSoft}` }}>
                      <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
                        <span style={{ fontFamily: T.fontHead, fontSize: 24, fontWeight: 600, color: it.vColor || T.textStrong, letterSpacing: '0.005em' }}>{it.v}</span>
                        <span style={{ fontFamily: T.fontBody, fontSize: 12, color: T.textBody, fontWeight: 500 }}>{it.k}</span>
                      </div>
                      <Mono color={T.textFaint} size={10}>{it.s}</Mono>
                    </div>
                  ))}
                </div>
              ))}
            </div>

            {/* Secondary queue */}
            <div style={{ background: T.card, border: `1px solid ${T.border}`, borderRadius: 10, overflow: 'hidden' }}>
              <div style={{ display: 'flex', alignItems: 'center', padding: '10px 14px', borderBottom: `1px solid ${T.borderSoft}` }}>
                <Mono color={T.textBody}>QUEUE · 2 ITEMS</Mono>
                <span style={{ flex: 1 }} />
                <Mono color={T.green}>✓ 14 RESOLVED BY AVANTI THIS WEEK</Mono>
              </div>
              {[
                { tag: 'OVERRIDE', team: 'Coach Diaz · Westfield JV', title: 'Override request — Jordan Lee', meta: '2h ago', body: 'Medical form expired 3 days. Parent notified twice, no response.' },
                { tag: 'BATCH', team: '14 athletes · Fall Registration', title: 'Reminder batch ready to send', meta: '12:00 PM', body: 'Payment-only reminder. 7-day overdue threshold crossed.' },
              ].map((row, i) => (
                <div key={i} style={{
                  display: 'grid', gridTemplateColumns: '90px 1fr auto',
                  gap: 14, padding: '12px 14px',
                  borderBottom: i === 0 ? `1px solid ${T.borderSoft}` : 'none',
                }}>
                  <div>
                    <Tag color={i === 0 ? T.yellow : T.blue}>{row.tag}</Tag>
                    <Mono color={T.textFaint} size={9} style={{ marginTop: 6, display: 'block' }}>{row.meta}</Mono>
                  </div>
                  <div>
                    <Mono color={T.textFaint} size={10}>{row.team}</Mono>
                    <div style={{ fontFamily: T.fontBody, fontSize: 14, fontWeight: 600, color: T.textStrong, marginTop: 2 }}>{row.title}</div>
                    <div style={{ fontSize: 12.5, color: T.textBody, marginTop: 4, lineHeight: 1.5 }}>{row.body}</div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <button style={{ padding: '6px 12px', background: 'transparent', color: T.textBody, border: `1px solid ${T.border}`, borderRadius: 6, fontSize: 12, fontFamily: T.fontBody, fontWeight: 500, cursor: 'pointer' }}>Open</button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT — focused agenda */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: pad, minHeight: 0 }}>
            <div style={{ background: T.card, border: `1px solid ${T.border}`, borderRadius: 10, padding: 14 }}>
              <Mono color={T.textBody} style={{ marginBottom: 10 }}>LIVE NOW · 3 GAMES</Mono>
              {[
                { score: 'JHV 14 — 7 SHS', q: 'Q2 · 4:32', dot: T.red },
                { score: 'JHJ 21 — 0 NER', q: 'Q3 · 2:11', dot: T.green },
                { score: 'SKV 7 — 7 MCR', q: 'Q2 · 1:45', dot: T.yellow },
              ].map((g, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 0', borderBottom: i === 2 ? 'none' : `1px solid ${T.borderSoft}` }}>
                  <Dot color={g.dot} size={6} pulse />
                  <span style={{ fontFamily: T.fontHead, fontSize: 14, fontWeight: 600, color: T.textStrong, letterSpacing: '0.02em' }}>{g.score}</span>
                  <span style={{ flex: 1 }} />
                  <Mono color={T.textFaint}>{g.q}</Mono>
                </div>
              ))}
            </div>

            <div style={{ background: T.card, border: `1px solid ${T.border}`, borderRadius: 10, padding: 14 }}>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: 10 }}>
                <Mono color={T.textBody}>PLAY HEALTH</Mono>
                <span style={{ flex: 1 }} />
                <Mono color={T.textFaint}>BY TEAM</Mono>
              </div>
              {[
                { t: 'Jordan High Varsity', v: 91, c: T.green },
                { t: 'Jordan High JV', v: 83, c: T.yellow },
                { t: 'Skyline HS Varsity', v: 88, c: T.green },
                { t: 'Mountain Crest Varsity', v: 71, c: T.red },
              ].map((r, i) => (
                <div key={i} style={{ marginBottom: i === 3 ? 0 : 10 }}>
                  <div style={{ display: 'flex', alignItems: 'baseline', marginBottom: 4 }}>
                    <span style={{ fontSize: 12.5, color: T.textBody, fontWeight: 500 }}>{r.t}</span>
                    <span style={{ flex: 1 }} />
                    <Mono color={r.c} size={11}>{r.v}%</Mono>
                  </div>
                  <div style={{ height: 4, background: T.borderSoft, borderRadius: 999, overflow: 'hidden' }}>
                    <div style={{ width: `${r.v}%`, height: '100%', background: r.c }} />
                  </div>
                </div>
              ))}
            </div>

            <div style={{ background: T.card, border: `1px solid ${T.border}`, borderRadius: 10, padding: 14, flex: 1, minHeight: 0, overflow: 'hidden' }}>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: 10 }}>
                <Mono color={T.textBody}>THIS WEEK</Mono>
                <span style={{ flex: 1 }} />
                <button style={{ background: 'transparent', border: 'none', color: T.textMuted, fontSize: 11, cursor: 'pointer' }}>schedule →</button>
              </div>
              {[
                { d: 'TODAY', l: 'Practice — All Teams', t: '4:30 PM', dot: T.orange },
                { d: 'THU', l: 'Route Clinic — Varsity', t: '4:30 PM', dot: T.textMuted },
                { d: 'SAT', l: '6 games — WFF', t: '9:00 AM', dot: T.green },
              ].map((e, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '8px 0', borderBottom: i === 2 ? 'none' : `1px solid ${T.borderSoft}` }}>
                  <Mono color={e.dot} size={10} style={{ width: 38 }}>{e.d}</Mono>
                  <span style={{ flex: 1, fontSize: 13, color: T.textBody }}>{e.l}</span>
                  <Mono color={T.textFaint}>{e.t}</Mono>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {avantiPlace === 'pill' && (
        <div style={{ position: 'absolute', bottom: 22, right: 22, zIndex: 10 }}>
          <AvantiPill count={2} active />
        </div>
      )}
    </div>
  );
};

// ────────────────────────────────────────────────────────────────────────────
// CONCEPT B — EVOLUTION
// Agenda-first. Today timeline + focused inbox. Multi-team in header.
// ────────────────────────────────────────────────────────────────────────────
const ConceptB = ({ density = 60, sidebar = 'wide', avantiPlace = 'pill', accent = T.orange }) => {
  const pad = density > 70 ? 14 : density > 40 ? 18 : 24;

  return (
    <div style={{ display: 'flex', width: '100%', height: '100%', background: T.bg, fontFamily: T.fontBody, position: 'relative', overflow: 'hidden' }}>
      <Sidebar active="Dashboard" style={sidebar} />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        {/* Top header — multi-team strip */}
        <header style={{ borderBottom: `1px solid ${T.border}` }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: `12px ${pad}px 10px` }}>
            <OrgSwitcher />
            <span style={{ width: 1, height: 22, background: T.border }} />
            <RoleBadge />
            <div style={{ flex: 1 }} />
            {avantiPlace === 'omnibar' ? <AvantiOmnibar width={460} /> : (
              <div style={{
                display: 'flex', alignItems: 'center', gap: 8, padding: '6px 14px',
                background: T.card, border: `1px solid ${T.border}`, borderRadius: 999,
                color: T.textMuted, fontSize: 13, width: 320,
              }}>
                <IconSearch size={14} />
                Search…
                <span style={{ flex: 1 }} />
                <Mono size={9} color={T.textFaint}>⌘K</Mono>
              </div>
            )}
            <button style={{ width: 36, height: 36, borderRadius: 999, background: 'transparent', border: `1px solid ${T.border}`, color: T.textBody, position: 'relative', cursor: 'pointer' }}>
              <IconBell size={15} />
              <span style={{ position: 'absolute', top: 7, right: 9, width: 7, height: 7, borderRadius: 999, background: T.red }} />
            </button>
          </div>
          {/* Team rail */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: `4px ${pad}px 12px`, overflow: 'auto' }} className="no-scrollbar">
            <Mono color={T.textFaint} style={{ marginRight: 4 }}>VIEW:</Mono>
            <TeamPill name="All teams" color={accent} active />
            <TeamPill name="Westfield Varsity" color={T.orange} />
            <TeamPill name="Westfield JV" color={T.orange} />
            <TeamPill name="Jordan High V" color={T.green} />
            <TeamPill name="Jordan High JV" color={T.green} />
            <TeamPill name="Skyline V" color={T.blue} />
            <TeamPill name="Mountain Crest" color={T.yellow} />
            <button style={{ padding: '5px 10px', background: 'transparent', border: `1px dashed ${T.border}`, borderRadius: 999, color: T.textMuted, fontSize: 12, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 4 }}>
              <IconPlus size={11} /> add
            </button>
          </div>
        </header>

        {/* Body */}
        <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '1fr 1.3fr', gap: 0, minHeight: 0, overflow: 'hidden' }}>
          {/* LEFT — Today timeline */}
          <div style={{ borderRight: `1px solid ${T.border}`, padding: pad, display: 'flex', flexDirection: 'column', minHeight: 0, overflow: 'hidden' }}>
            <div style={{ marginBottom: 14 }}>
              <Mono color={T.textFaint}>TODAY · MON MAY 4</Mono>
              <h2 style={{ fontFamily: T.fontHead, fontSize: 26, fontWeight: 600, color: T.textStrong, margin: '4px 0 0', letterSpacing: '0.005em' }}>
                Your day, in order
              </h2>
            </div>

            <div style={{ flex: 1, overflow: 'auto', position: 'relative', paddingLeft: 24 }} className="no-scrollbar">
              <div style={{ position: 'absolute', left: 7, top: 0, bottom: 0, width: 1, background: T.borderSoft }} />
              {[
                { t: '8:00', label: 'NOW', color: T.green, title: 'Morning brief from AVANTI', body: '2 items need you · 14 resolved overnight', tag: { c: T.green, t: 'AI' } },
                { t: '9:00', color: T.red, title: 'Mia Rodriguez — payment blocks Saturday', body: 'Overdue 4d · medical form expired · parent not responding', tag: { c: T.red, t: 'URGENT' }, action: 'Resolve' },
                { t: '10:30', color: T.yellow, title: 'Coach Diaz override request', body: 'Westfield JV · Jordan Lee · awaits your decision', tag: { c: T.yellow, t: 'REVIEW' } },
                { t: '12:00', color: T.blue, title: 'Send registration reminder batch', body: '14 athletes · $2,600 outstanding · drafted by AVANTI', tag: { c: T.blue, t: 'BATCH' }, action: 'Send' },
                { t: '4:30', color: T.textMuted, title: 'Practice — all teams', body: 'Park 3 · 4 fields · weather clear' },
                { t: '7:00', color: T.textMuted, title: 'Tryouts intake review', body: '23 new applications since Friday' },
              ].map((e, i) => (
                <div key={i} style={{ position: 'relative', paddingBottom: 14 }}>
                  <div style={{ position: 'absolute', left: -22, top: 6, width: 13, height: 13, borderRadius: 999, background: T.bg, border: `2px solid ${e.color}` }} />
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 4 }}>
                    <Mono color={e.color}>{e.t}</Mono>
                    {e.tag && <Tag color={e.tag.c}>{e.tag.t}</Tag>}
                  </div>
                  <div style={{ fontFamily: T.fontBody, fontSize: 14, fontWeight: 600, color: T.textStrong, marginBottom: 2 }}>{e.title}</div>
                  <div style={{ fontSize: 12.5, color: T.textBody, lineHeight: 1.5, marginBottom: e.action ? 8 : 0 }}>{e.body}</div>
                  {e.action && (
                    <button style={{ padding: '5px 12px', background: accent, color: '#000', border: 'none', borderRadius: 6, fontSize: 12, fontFamily: T.fontBody, fontWeight: 600, cursor: 'pointer' }}>{e.action}</button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT — Focus stack */}
          <div style={{ padding: pad, display: 'flex', flexDirection: 'column', gap: pad, minHeight: 0, overflow: 'auto' }} className="no-scrollbar">
            {/* Hero KPI strip — ratio-style */}
            <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr 1fr', gap: 12 }}>
              <div style={{ background: `linear-gradient(135deg, ${T.green}10, transparent)`, border: `1px solid ${T.green}30`, borderRadius: 10, padding: 14 }}>
                <Mono color={T.green}>PLAY INDEX</Mono>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginTop: 4 }}>
                  <span style={{ fontFamily: T.fontHead, fontSize: 38, fontWeight: 600, color: T.textStrong }}>81%</span>
                  <Mono color={T.green}><IconArrowUp size={10} stroke={T.green} /> 2.4%</Mono>
                </div>
                <div style={{ display: 'flex', gap: 2, marginTop: 8, height: 18 }}>
                  {[62, 70, 65, 72, 78, 75, 81].map((v, i) => (
                    <div key={i} style={{ flex: 1, background: T.green, opacity: 0.2 + (v / 100) * 0.8, borderRadius: 1 }} />
                  ))}
                </div>
              </div>
              <div style={{ background: T.card, border: `1px solid ${T.border}`, borderRadius: 10, padding: 14 }}>
                <Mono color={T.orange}>REVENUE</Mono>
                <div style={{ fontFamily: T.fontHead, fontSize: 28, fontWeight: 600, color: T.textStrong, marginTop: 4 }}>$21.8K</div>
                <Mono color={T.textFaint} size={10}>$2,600 outstanding</Mono>
              </div>
              <div style={{ background: T.card, border: `1px solid ${T.red}30`, borderRadius: 10, padding: 14 }}>
                <Mono color={T.red}>NEEDS YOU</Mono>
                <div style={{ fontFamily: T.fontHead, fontSize: 28, fontWeight: 600, color: T.red, marginTop: 4 }}>2</div>
                <Mono color={T.textFaint} size={10}>resolve today</Mono>
              </div>
            </div>

            {/* Compliance heatmap */}
            <div style={{ background: T.card, border: `1px solid ${T.border}`, borderRadius: 10, padding: 14 }}>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: 12 }}>
                <Mono color={T.textBody}>COMPLIANCE BY TEAM</Mono>
                <span style={{ flex: 1 }} />
                <Mono color={T.textFaint}>WAIVERS · MEDICAL · PAYMENT</Mono>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '160px repeat(3, 1fr) 60px', gap: 8, alignItems: 'center' }}>
                {[
                  { t: 'Jordan High V', v: [100, 95, 91], c: T.green },
                  { t: 'Jordan High JV', v: [88, 86, 83], c: T.yellow },
                  { t: 'Skyline V', v: [92, 95, 88], c: T.green },
                  { t: 'Westfield V', v: [82, 79, 71], c: T.red },
                  { t: 'Westfield JV', v: [78, 88, 81], c: T.yellow },
                  { t: 'Mountain Crest', v: [95, 91, 71], c: T.yellow },
                ].map((row, i) => (
                  <React.Fragment key={i}>
                    <span style={{ fontSize: 12.5, color: T.textBody }}>{row.t}</span>
                    {row.v.map((val, j) => (
                      <div key={j} style={{
                        height: 18, borderRadius: 4,
                        background: val >= 90 ? T.green : val >= 80 ? T.yellow : T.red,
                        opacity: 0.2 + (val / 100) * 0.6,
                        position: 'relative',
                      }}>
                        <span style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: T.fontMono, fontSize: 9, fontWeight: 600, color: T.textStrong }}>{val}</span>
                      </div>
                    ))}
                    <Mono color={row.c} size={11}>avg {Math.round(row.v.reduce((a, b) => a + b, 0) / 3)}%</Mono>
                  </React.Fragment>
                ))}
              </div>
            </div>

            {/* Live games */}
            <div style={{ background: T.card, border: `1px solid ${T.border}`, borderRadius: 10, padding: 14 }}>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: 10 }}>
                <Mono color={T.green}>● LIVE · 3 GAMES</Mono>
                <span style={{ flex: 1 }} />
                <Mono color={T.textFaint}>WATCH ALL →</Mono>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 }}>
                {[
                  { home: 'JHV', hs: 14, away: 'SHS', as: 7, q: 'Q2 4:32', lead: 'JHV +7', dot: T.green },
                  { home: 'JHJ', hs: 21, away: 'NER', as: 0, q: 'Q3 2:11', lead: 'JHJ +21', dot: T.green },
                  { home: 'SKV', hs: 7, away: 'MCR', as: 7, q: 'Q2 1:45', lead: 'TIED', dot: T.yellow },
                ].map((g, i) => (
                  <div key={i} style={{ background: T.elevated, border: `1px solid ${T.border}`, borderRadius: 8, padding: 10 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 6 }}>
                      <Dot color={g.dot} size={5} pulse />
                      <Mono color={T.textFaint} size={9}>{g.q}</Mono>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: 4 }}>
                      <span style={{ fontFamily: T.fontHead, fontSize: 18, fontWeight: 600, color: T.textStrong }}>{g.home}</span>
                      <span style={{ flex: 1 }} />
                      <span style={{ fontFamily: T.fontHead, fontSize: 22, fontWeight: 700, color: T.textStrong }}>{g.hs}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: 4, marginTop: 2 }}>
                      <span style={{ fontFamily: T.fontHead, fontSize: 14, fontWeight: 500, color: T.textMuted }}>{g.away}</span>
                      <span style={{ flex: 1 }} />
                      <span style={{ fontFamily: T.fontHead, fontSize: 18, fontWeight: 600, color: T.textMuted }}>{g.as}</span>
                    </div>
                    <Mono color={g.dot} size={10} style={{ marginTop: 6, display: 'block' }}>{g.lead}</Mono>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {avantiPlace === 'pill' && (
        <div style={{ position: 'absolute', bottom: 22, right: 22, zIndex: 10 }}>
          <AvantiPill count={2} active />
        </div>
      )}
    </div>
  );
};

// ────────────────────────────────────────────────────────────────────────────
// CONCEPT C — REINVENTION
// Command center. One dominant focus. AVANTI omnibar at top center.
// ────────────────────────────────────────────────────────────────────────────
const ConceptC = ({ density = 60, sidebar = 'rail', avantiPlace = 'omnibar', accent = T.orange }) => {
  const pad = density > 70 ? 14 : density > 40 ? 18 : 24;

  return (
    <div style={{ display: 'flex', width: '100%', height: '100%', background: T.bg, fontFamily: T.fontBody, position: 'relative', overflow: 'hidden' }}>
      <Sidebar active="Dashboard" style={sidebar} />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        {/* Slim top bar with AVANTI omnibar centered */}
        <header style={{
          display: 'grid', gridTemplateColumns: '1fr auto 1fr', alignItems: 'center', gap: 14,
          padding: `12px ${pad}px`, borderBottom: `1px solid ${T.border}`,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <OrgSwitcher compact />
            <RoleBadge />
          </div>
          <AvantiOmnibar width={520} />
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, justifyContent: 'flex-end' }}>
            <Mono color={T.green}>● 3 LIVE</Mono>
            <button style={{ width: 32, height: 32, borderRadius: 999, background: 'transparent', border: `1px solid ${T.border}`, color: T.textBody, position: 'relative', cursor: 'pointer' }}>
              <IconBell size={14} />
              <span style={{ position: 'absolute', top: 6, right: 8, width: 6, height: 6, borderRadius: 999, background: T.red }} />
            </button>
          </div>
        </header>

        {/* Hero command center */}
        <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '1.55fr 1fr', gap: 0, minHeight: 0, overflow: 'hidden' }}>
          {/* LEFT — Hero focus */}
          <div style={{
            padding: `${pad + 6}px ${pad + 6}px`,
            background: `radial-gradient(circle at 20% 0%, ${T.red}08 0%, transparent 50%), radial-gradient(circle at 100% 100%, ${T.orange}06 0%, transparent 60%)`,
            display: 'flex', flexDirection: 'column', minHeight: 0, overflow: 'hidden',
          }}>
            <div style={{ marginBottom: 14 }}>
              <Mono color={T.textFaint}>FOCUS · ONE THING THAT MATTERS NOW</Mono>
            </div>

            <div style={{
              flex: '0 0 auto',
              background: T.card, border: `1px solid ${T.red}50`, borderRadius: 16, padding: 28,
              boxShadow: `0 0 40px -12px ${T.red}50, inset 0 1px 0 ${T.red}15`,
              marginBottom: pad,
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
                <Tag color={T.red}>URGENT</Tag>
                <Mono color={T.red}>BLOCKS PLAY · 3 DAYS</Mono>
                <span style={{ flex: 1 }} />
                <button style={{ background: 'transparent', border: `1px solid ${T.border}`, borderRadius: 6, color: T.textMuted, padding: '4px 8px', fontSize: 11, cursor: 'pointer' }}>Snooze 24h</button>
              </div>
              <div style={{ fontFamily: T.fontHead, fontSize: 38, fontWeight: 600, color: T.textStrong, lineHeight: 1.05, letterSpacing: '-0.005em', marginBottom: 8 }}>
                Mia Rodriguez · payment blocks Saturday
              </div>
              <Mono color={T.textMuted} size={11} style={{ marginBottom: 16, display: 'block' }}>
                WESTFIELD VARSITY · #18 · WR · 4 DAYS OVERDUE
              </Mono>
              <div style={{ color: T.textBody, fontSize: 14.5, lineHeight: 1.6, marginBottom: 18 }}>
                Medical form expired and registration payment outstanding. The Saturday match against Skyline is blocked unless resolved. AVANTI has drafted a parent message and prepared an override path — you decide.
              </div>

              {/* AVANTI suggested action */}
              <div style={{
                background: `${T.green}0a`, border: `1px solid ${T.green}30`,
                borderRadius: 10, padding: 14, marginBottom: 16,
                display: 'flex', alignItems: 'flex-start', gap: 12,
              }}>
                <div style={{ width: 30, height: 30, borderRadius: 8, background: T.green, color: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <IconSparkles size={15} stroke="#000" />
                </div>
                <div style={{ flex: 1 }}>
                  <Mono color={T.green} size={10}>AVANTI RECOMMENDS</Mono>
                  <div style={{ fontSize: 13.5, color: T.textBody, marginTop: 4, lineHeight: 1.55 }}>
                    Send draft text to parent + start medical-form re-up flow. Estimated resolution: <strong style={{ color: T.textStrong }}>under 6 hours based on similar cases.</strong>
                  </div>
                </div>
                <button style={{ padding: '6px 14px', background: T.green, color: '#000', border: 'none', borderRadius: 6, fontFamily: T.fontBody, fontWeight: 600, fontSize: 12, cursor: 'pointer', flexShrink: 0 }}>
                  Run
                </button>
              </div>

              <div style={{ display: 'flex', gap: 8 }}>
                <button style={{ flex: 1, padding: '12px 16px', background: accent, color: '#000', border: 'none', borderRadius: 8, fontFamily: T.fontBody, fontWeight: 600, fontSize: 14, cursor: 'pointer' }}>Notify Family</button>
                <button style={{ flex: 1, padding: '12px 16px', background: 'transparent', color: T.textStrong, border: `1px solid ${T.border}`, borderRadius: 8, fontFamily: T.fontBody, fontWeight: 500, fontSize: 14, cursor: 'pointer' }}>Approve Override</button>
                <button style={{ padding: '12px 16px', background: 'transparent', color: T.textMuted, border: `1px solid ${T.border}`, borderRadius: 8, fontFamily: T.fontBody, fontWeight: 500, fontSize: 14, cursor: 'pointer' }}>Defer</button>
              </div>
            </div>

            {/* Up next */}
            <Mono color={T.textFaint} style={{ marginBottom: 8 }}>UP NEXT · 2 ITEMS</Mono>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
              {[
                { tag: 'REVIEW', c: T.yellow, title: 'Coach Diaz override request', body: 'Westfield JV · Jordan Lee · awaits your decision', meta: '2h ago' },
                { tag: 'BATCH', c: T.blue, title: 'Send registration reminder', body: '14 athletes · $2,600 outstanding · drafted', meta: '12:00 PM' },
              ].map((r, i) => (
                <div key={i} style={{ background: T.card, border: `1px solid ${T.border}`, borderRadius: 10, padding: 14 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8 }}>
                    <Tag color={r.c}>{r.tag}</Tag>
                    <span style={{ flex: 1 }} />
                    <Mono color={T.textFaint}>{r.meta}</Mono>
                  </div>
                  <div style={{ fontSize: 13.5, fontWeight: 600, color: T.textStrong, marginBottom: 4 }}>{r.title}</div>
                  <div style={{ fontSize: 12, color: T.textMuted, lineHeight: 1.5 }}>{r.body}</div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT — Pulse panel */}
          <div style={{
            borderLeft: `1px solid ${T.border}`,
            padding: `${pad + 6}px ${pad}px`,
            display: 'flex', flexDirection: 'column', gap: pad - 2, minHeight: 0, overflow: 'auto',
          }} className="no-scrollbar">
            <Mono color={T.textFaint}>PULSE · ORG-WIDE</Mono>

            {/* Big single number */}
            <div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, marginBottom: 6 }}>
                <span style={{ fontFamily: T.fontHead, fontSize: 64, fontWeight: 600, color: T.textStrong, letterSpacing: '-0.01em', lineHeight: 1 }}>81%</span>
                <div>
                  <Mono color={T.green}>PLAY INDEX</Mono>
                  <div style={{ fontSize: 12, color: T.textBody, marginTop: 2, display: 'flex', alignItems: 'center', gap: 4 }}>
                    <IconArrowUp size={12} stroke={T.green} />
                    <span style={{ color: T.green, fontWeight: 600 }}>2.4%</span>
                    <span style={{ color: T.textMuted }}>this week</span>
                  </div>
                </div>
              </div>
              {/* Sparkline */}
              <svg width="100%" height="48" viewBox="0 0 300 48" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="grad-c" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={T.green} stopOpacity="0.4" />
                    <stop offset="100%" stopColor={T.green} stopOpacity="0" />
                  </linearGradient>
                </defs>
                <path d="M0 36 L40 32 L80 30 L120 28 L160 22 L200 24 L240 18 L300 12 L300 48 L0 48 Z" fill="url(#grad-c)" />
                <path d="M0 36 L40 32 L80 30 L120 28 L160 22 L200 24 L240 18 L300 12" fill="none" stroke={T.green} strokeWidth="1.5" />
              </svg>
            </div>

            {/* Three live games inline */}
            <div>
              <Mono color={T.textBody} style={{ marginBottom: 8 }}>LIVE NOW · 3 GAMES</Mono>
              {[
                { score: 'JHV 14 — 7 SHS', q: 'Q2 4:32', dot: T.green },
                { score: 'JHJ 21 — 0 NER', q: 'Q3 2:11', dot: T.green },
                { score: 'SKV 7 — 7 MCR', q: 'Q2 1:45', dot: T.yellow },
              ].map((g, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '7px 0', borderBottom: i === 2 ? 'none' : `1px solid ${T.borderSoft}` }}>
                  <Dot color={g.dot} size={6} pulse />
                  <span style={{ fontFamily: T.fontHead, fontSize: 14, fontWeight: 600, color: T.textStrong, letterSpacing: '0.02em' }}>{g.score}</span>
                  <span style={{ flex: 1 }} />
                  <Mono color={T.textFaint}>{g.q}</Mono>
                </div>
              ))}
            </div>

            {/* Money */}
            <div style={{ background: T.card, border: `1px solid ${T.border}`, borderRadius: 10, padding: 14 }}>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: 6 }}>
                <Mono color={T.orange}>REGISTRATION · FALL 2026</Mono>
                <span style={{ flex: 1 }} />
                <Mono color={T.textFaint}>92% COLLECTED</Mono>
              </div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
                <span style={{ fontFamily: T.fontHead, fontSize: 32, fontWeight: 600, color: T.textStrong }}>$21,800</span>
                <Mono color={T.yellow}>$2,600 OUT</Mono>
              </div>
              <div style={{ height: 6, background: T.borderSoft, borderRadius: 999, overflow: 'hidden', marginTop: 10 }}>
                <div style={{ width: '92%', height: '100%', background: T.orange }} />
              </div>
            </div>

            {/* Compliance mini */}
            <div style={{ background: T.card, border: `1px solid ${T.border}`, borderRadius: 10, padding: 14 }}>
              <Mono color={T.textBody} style={{ marginBottom: 10 }}>COMPLIANCE · BY TEAM</Mono>
              {[
                { t: 'Jordan High Varsity', v: 91, c: T.green },
                { t: 'Skyline HS Varsity', v: 88, c: T.green },
                { t: 'Jordan High JV', v: 83, c: T.yellow },
                { t: 'Mountain Crest', v: 71, c: T.red },
              ].map((r, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '5px 0' }}>
                  <span style={{ flex: 1, fontSize: 12.5, color: T.textBody }}>{r.t}</span>
                  <div style={{ width: 100, height: 4, background: T.borderSoft, borderRadius: 999, overflow: 'hidden' }}>
                    <div style={{ width: `${r.v}%`, height: '100%', background: r.c }} />
                  </div>
                  <Mono color={r.c} size={11} style={{ width: 32, textAlign: 'right' }}>{r.v}%</Mono>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ────────────────────────────────────────────────────────────────────────────
// MOBILE COMPANION — quick mobile view of the redesigned dashboard
// ────────────────────────────────────────────────────────────────────────────
const MobileDash = ({ accent = T.orange }) => (
  <div style={{ width: 390, height: 844, background: T.bg, borderRadius: 40, boxShadow: `0 0 0 8px ${T.surface}, 0 30px 60px -20px rgba(0,0,0,0.7)`, overflow: 'hidden', position: 'relative', fontFamily: T.fontBody }} className="ambient-glow">
    {/* Status bar */}
    <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 44, padding: '0 22px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', zIndex: 10, fontSize: 13, fontWeight: 600, color: T.textStrong }}>
      <span>9:41</span>
      <Mono size={11}>••• WiFi —</Mono>
    </div>

    <div style={{ position: 'absolute', inset: '44px 0 0 0', overflow: 'auto', paddingBottom: 88 }} className="no-scrollbar">
      {/* Header */}
      <div style={{ padding: '12px 18px 8px', display: 'flex', alignItems: 'center', gap: 10 }}>
        <VAIWingmark size={18} />
        <span style={{ flex: 1 }} />
        <RoleBadge />
        <button style={{ width: 32, height: 32, borderRadius: 999, background: 'transparent', border: `1px solid ${T.border}`, color: T.textBody, position: 'relative' }}>
          <IconBell size={14} />
          <span style={{ position: 'absolute', top: 6, right: 8, width: 6, height: 6, borderRadius: 999, background: T.red }} />
        </button>
      </div>

      <div style={{ padding: '8px 18px 16px' }}>
        <Mono color={T.textFaint}>DASHBOARD · MON MAY 4</Mono>
        <h1 style={{ fontFamily: T.fontHead, fontSize: 26, fontWeight: 600, color: T.textStrong, margin: '4px 0 0' }}>Good morning, Ben</h1>
      </div>

      {/* Hero card */}
      <div style={{ margin: '0 14px 14px', background: T.card, border: `1px solid ${T.red}50`, borderRadius: 14, padding: 16, boxShadow: `0 0 24px -10px ${T.red}50` }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 10 }}>
          <Tag color={T.red}>URGENT</Tag>
          <Mono color={T.textMuted}>3 DAYS</Mono>
        </div>
        <div style={{ fontFamily: T.fontHead, fontSize: 19, fontWeight: 600, color: T.textStrong, lineHeight: 1.2, marginBottom: 6 }}>
          Mia Rodriguez · payment blocks Saturday
        </div>
        <div style={{ fontSize: 12.5, color: T.textBody, lineHeight: 1.5, marginBottom: 12 }}>
          Medical form expired + payment outstanding. AVANTI has drafted a parent message.
        </div>
        <div style={{ display: 'flex', gap: 6 }}>
          <button style={{ flex: 1, padding: '10px', background: accent, color: '#000', border: 'none', borderRadius: 7, fontWeight: 600, fontSize: 12, fontFamily: T.fontBody }}>Notify family</button>
          <button style={{ flex: 1, padding: '10px', background: 'transparent', color: T.textStrong, border: `1px solid ${T.border}`, borderRadius: 7, fontWeight: 500, fontSize: 12, fontFamily: T.fontBody }}>Override</button>
        </div>
      </div>

      {/* KPI strip */}
      <div style={{ padding: '0 14px 14px', display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8 }}>
        {[
          { label: 'PLAY', v: '81%', c: T.green },
          { label: 'REV', v: '$21.8K', c: T.orange },
          { label: 'TODO', v: '2', c: T.red },
        ].map(k => (
          <div key={k.label} style={{ background: T.card, border: `1px solid ${T.border}`, borderRadius: 10, padding: 10 }}>
            <Mono color={k.c} size={9}>{k.label}</Mono>
            <div style={{ fontFamily: T.fontHead, fontSize: 20, fontWeight: 600, color: T.textStrong, marginTop: 2 }}>{k.v}</div>
          </div>
        ))}
      </div>

      {/* Live */}
      <div style={{ padding: '0 14px 14px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '0 4px 8px' }}>
          <Mono color={T.green}>● LIVE · 3</Mono>
          <span style={{ flex: 1 }} />
          <Mono color={T.textFaint}>SEE ALL →</Mono>
        </div>
        {[
          { score: 'JHV 14 — 7 SHS', q: 'Q2 4:32', dot: T.green },
          { score: 'JHJ 21 — 0 NER', q: 'Q3 2:11', dot: T.green },
        ].map((g, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px', background: T.card, border: `1px solid ${T.border}`, borderRadius: 8, marginBottom: 6 }}>
            <Dot color={g.dot} size={6} pulse />
            <span style={{ fontFamily: T.fontHead, fontSize: 14, fontWeight: 600, color: T.textStrong, letterSpacing: '0.02em' }}>{g.score}</span>
            <span style={{ flex: 1 }} />
            <Mono color={T.textFaint}>{g.q}</Mono>
          </div>
        ))}
      </div>

      {/* This week */}
      <div style={{ padding: '0 14px 14px' }}>
        <Mono color={T.textBody} style={{ padding: '0 4px 8px', display: 'block' }}>THIS WEEK</Mono>
        {[
          { d: 'TODAY', l: 'Practice — All Teams', t: '4:30 PM', c: T.orange },
          { d: 'THU', l: 'Route Clinic — V', t: '4:30 PM', c: T.textMuted },
          { d: 'SAT', l: '6 games — WFF', t: '9:00 AM', c: T.green },
        ].map((e, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px', background: T.card, border: `1px solid ${T.border}`, borderRadius: 8, marginBottom: 6 }}>
            <Mono color={e.c} size={10} style={{ width: 44 }}>{e.d}</Mono>
            <span style={{ flex: 1, fontSize: 13, color: T.textBody }}>{e.l}</span>
            <Mono color={T.textFaint}>{e.t}</Mono>
          </div>
        ))}
      </div>
    </div>

    {/* Floating AVANTI */}
    <div style={{ position: 'absolute', bottom: 20, left: '50%', transform: 'translateX(-50%)', zIndex: 20 }}>
      <AvantiPill count={2} active />
    </div>
  </div>
);

const MobileFrame = ({ children }) => (
  <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: T.bg }} className="ambient-glow">
    {children}
  </div>
);

Object.assign(window, {
  AuditSheet, ConceptA, ConceptB, ConceptC, MobileDash, MobileFrame, T,
});
