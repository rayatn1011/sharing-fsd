import type { CSSProperties, ReactNode } from 'react';
import type { DesignSystem, Page, SlideMeta, SlideTransition } from '@open-slide/core';
import legacyHomepage from './assets/feature-sliced-design-legacy-homepage.png';
import currentHomepage from './assets/fsd-how-current-homepage.png';
import qAndAQrCode from './assets/q-and-a-qr-code.png';
import threadsQrCode from './assets/threads-qr-code.png';

const FONT_HREF =
  'https://fonts.googleapis.com/css2?family=Public+Sans:wght@500;600;700;800&display=swap';
const FONT_LINK_ID = 'osd-webfont-feature-based-to-fsd';

if (typeof document !== 'undefined' && !document.getElementById(FONT_LINK_ID)) {
  const link = document.createElement('link');
  link.id = FONT_LINK_ID;
  link.rel = 'stylesheet';
  link.href = FONT_HREF;
  document.head.appendChild(link);
}

export const design: DesignSystem = {
  palette: {
    bg: '#020420',
    text: '#F8FAFC',
    accent: '#04ab80',
  },
  fonts: {
    display:
      '"Public Sans", "PingFang TC", "Noto Sans TC", system-ui, -apple-system, sans-serif',
    body: '"Public Sans", "PingFang TC", "Noto Sans TC", system-ui, -apple-system, sans-serif',
  },
  typeScale: {
    hero: 140,
    body: 38,
  },
  radius: 24,
};

export const transition: SlideTransition = {
  duration: 240,
  exit: {
    duration: 200,
    easing: 'cubic-bezier(0.4, 0, 1, 1)',
    keyframes: [{ opacity: 1 }, { opacity: 0 }],
  },
  enter: {
    duration: 240,
    delay: 40,
    easing: 'cubic-bezier(0, 0, 0.2, 1)',
    keyframes: [{ opacity: 0 }, { opacity: 1 }],
  },
};

const palette = {
  panel: '#08102F',
  panelStrong: '#0D173B',
  textSoft: '#D8E1EE',
  muted: '#94A3B8',
  dim: '#64748B',
  border: '#263759',
  borderStrong: '#3A4E72',
  accentSoft: 'rgba(0, 220, 130, 0.12)',
  accentLine: 'rgba(0, 220, 130, 0.48)',
  danger: '#F87171',
  dangerSoft: 'rgba(248, 113, 113, 0.1)',
  dangerLine: 'rgba(248, 113, 113, 0.58)',
  whiteSoft: 'rgba(248, 250, 252, 0.08)',
  grid: 'rgba(148, 163, 184, 0.055)',
};

const fonts = {
  mono: '"SFMono-Regular", Consolas, "Liberation Mono", ui-monospace, monospace',
};

const pageRoot: CSSProperties = {
  width: '100%',
  height: '100%',
  boxSizing: 'border-box',
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  gap: 28,
  padding: '104px 120px',
  backgroundColor: 'var(--osd-bg)',
  backgroundImage: `
    linear-gradient(${palette.grid} 1px, transparent 1px),
    linear-gradient(90deg, ${palette.grid} 1px, transparent 1px),
    radial-gradient(circle at 82% 16%, rgba(0, 220, 130, 0.13), transparent 29%)
  `,
  backgroundSize: '80px 80px, 80px 80px, 100% 100%',
  color: 'var(--osd-text)',
  fontFamily: 'var(--osd-font-body)',
  letterSpacing: '-0.018em',
};

const panelStyle: CSSProperties = {
  boxSizing: 'border-box',
  border: `2px solid ${palette.border}`,
  borderRadius: 'var(--osd-radius)',
  background: `linear-gradient(145deg, ${palette.panelStrong}, ${palette.panel})`,
};

const PageFrame = ({
  children,
  section = 'PROBLEM FRAMEWORK',
  categoryLabel = '講者詮釋',
  categorySymbol = '◇',
  sourceHref,
  sourceLabel = '官方文件 ↗',
}: {
  children: ReactNode;
  section?: string;
  categoryLabel?: string;
  categorySymbol?: string;
  sourceHref?: string;
  sourceLabel?: string;
}) => (
  <div style={pageRoot}>
    {/* @slide-comment id="c-99f470a8" ts="2026-08-15T14:57:43.461Z" text="eyJub3RlIjoi6KOc5LiK5a6Y5pa5IHNraWxsOlxuaHR0cHM6Ly9naXRodWIuY29tL2ZlYXR1cmUtc2xpY2VkL3NraWxscyJ9" */}
    <header
      style={{
        height: 32,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 14,
          color: palette.textSoft,
          fontSize: 23,
          fontWeight: 700,
          letterSpacing: '0.13em',
        }}
      >
        <span
          aria-hidden="true"
          style={{
            width: 38,
            height: 4,
            borderRadius: 999,
            background: 'var(--osd-accent)',
          }}
        />
        {section}
      </div>
      {sourceHref ? (
        <a
          href={sourceHref}
          target="_blank"
          rel="noreferrer"
          style={{
            padding: '7px 13px',
            border: `1px solid ${palette.accentLine}`,
            borderRadius: 999,
            color: 'var(--osd-accent)',
            fontSize: 20,
            fontWeight: 800,
            lineHeight: 1,
            textDecoration: 'none',
          }}
        >
          {sourceLabel}
        </a>
      ) : null}
    </header>

    <main style={{ flex: 1, minHeight: 0 }}>{children}</main>

  </div>
);

const PageHeading = ({
  title,
  lead,
}: {
  title: ReactNode;
  lead?: ReactNode;
}) => (
  <div>
    <h2
      style={{
        margin: 0,
        maxWidth: 1500,
        fontFamily: 'var(--osd-font-display)',
        fontSize: 68,
        fontWeight: 800,
        lineHeight: 1.08,
        letterSpacing: '-0.04em',
      }}
    >
      {title}
    </h2>
    {lead ? (
      <p
        style={{ margin: '22px 0 0', maxWidth: 1420, color: palette.textSoft, fontSize: '30px', fontWeight: 500, lineHeight: 1.45 }}
      >
        {lead}
      </p>
    ) : null}
  </div>
);

const CodeCard = () => (
  <div
    style={{
      ...panelStyle,
      position: 'absolute',
      left: 202,
      top: 176,
      width: 330,
      height: 220,
      padding: 28,
      borderColor: 'var(--osd-accent)',
      boxShadow: '0 0 0 8px rgba(0, 220, 130, 0.08), 0 28px 80px rgba(0, 0, 0, 0.32)',
    }}
  >
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        color: palette.textSoft,
        fontFamily: fonts.mono,
        fontSize: 23,
      }}
    >
      <span>new-file.ts</span>
      <span style={{ color: 'var(--osd-accent)' }}>&lt;/&gt;</span>
    </div>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginTop: 32 }}>
      <span
        aria-hidden="true"
        style={{ width: 242, height: 13, borderRadius: 999, background: palette.textSoft }}
      />
      <span
        aria-hidden="true"
        style={{ width: 196, height: 13, borderRadius: 999, background: palette.accentLine }}
      />
      <span
        aria-hidden="true"
        style={{ width: 224, height: 13, borderRadius: 999, background: palette.borderStrong }}
      />
    </div>
  </div>
);

const DirectoryChip = ({
  label,
  style,
}: {
  label: string;
  style: CSSProperties;
}) => (
  <div
    style={{
      ...panelStyle,
      ...style,
      position: 'absolute',
      width: 210,
      padding: '17px 20px',
      color: palette.textSoft,
      fontFamily: fonts.mono,
      fontSize: 23,
      fontWeight: 600,
      textAlign: 'center',
      borderStyle: 'dashed',
    }}
  >
    {label}
  </div>
);

const QuestionNode = ({ x, y }: { x: number; y: number }) => (
  <g>
    <circle
      cx={x}
      cy={y}
      r="21"
      fill={palette.panelStrong}
      stroke={palette.accentLine}
      strokeWidth="2"
    />
    <text
      x={x}
      y={y}
      fill={palette.textSoft}
      fontFamily={fonts.mono}
      fontSize="26"
      fontWeight="700"
      textAnchor="middle"
      dominantBaseline="middle"
    >
      ?
    </text>
  </g>
);

const Cover: Page = () => (
  <PageFrame section="v-taiwan Meetup #5">
    <div
      style={{
        height: '100%',
        display: 'grid',
        gridTemplateColumns: '1.12fr 0.88fr',
        alignItems: 'center',
        gap: 74,
      }}
    >
      <section>
        <h1
          style={{ margin: 0, maxWidth: 900, fontFamily: 'var(--osd-font-display)', fontSize: 128, fontWeight: 800, lineHeight: '1.15', letterSpacing: '-0.055em' }}
        >
          一段程式碼
          <br />
          到底該放哪裡？
        </h1>
        <p
          style={{
            margin: '36px 0 0',
            maxWidth: 820,
            color: palette.textSoft,
            fontSize: 'var(--osd-size-body)',
            fontWeight: 600,
            lineHeight: 1.35,
          }}
        >
          從 Feature-based 到 Feature-Sliced Design
        </p>
        <div
          style={{
            marginTop: 54,
            display: 'flex',
            alignItems: 'center',
            gap: 16,
            color: palette.muted,
            fontSize: 28,
            fontWeight: 600,
          }}
        >
          <span
            aria-hidden="true"
            style={{
              width: 12,
              height: 12,
              borderRadius: 999,
              background: 'var(--osd-accent)',
            }}
          />
          一隻狐狸
        </div>
      </section>

      <section
        aria-label="一段程式碼被多個目錄拉扯的示意圖"
        style={{
          position: 'relative',
          width: 734,
          height: 572,
          justifySelf: 'end',
        }}
      >
        <svg
          aria-hidden="true"
          viewBox="0 0 734 572"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
        >
          <path d="M180 72 L310 214" fill="none" stroke={palette.borderStrong} strokeWidth="3" strokeDasharray="10 10" />
          <path d="M554 72 L424 214" fill="none" stroke={palette.borderStrong} strokeWidth="3" strokeDasharray="10 10" />
          <path d="M180 500 L310 358" fill="none" stroke={palette.borderStrong} strokeWidth="3" strokeDasharray="10 10" />
          <path d="M554 500 L424 358" fill="none" stroke={palette.borderStrong} strokeWidth="3" strokeDasharray="10 10" />
          <QuestionNode x={245} y={143} />
          <QuestionNode x={489} y={143} />
          <QuestionNode x={245} y={429} />
          <QuestionNode x={489} y={429} />
          <circle cx="310" cy="214" r="6" fill="var(--osd-accent)" />
          <circle cx="424" cy="214" r="6" fill="var(--osd-accent)" />
          <circle cx="310" cy="358" r="6" fill="var(--osd-accent)" />
          <circle cx="424" cy="358" r="6" fill="var(--osd-accent)" />
        </svg>
        <DirectoryChip label="components/" style={{ left: 0, top: 28 }} />
        <DirectoryChip label="composables/" style={{ right: 0, top: 28 }} />
        <DirectoryChip label="utils/" style={{ left: 0, bottom: 28 }} />
        <DirectoryChip label="features/" style={{ right: 0, bottom: 28 }} />
        <CodeCard />
      </section>
    </div>
  </PageFrame>
);

const StructureStage = ({
  number,
  title,
  structure,
  question,
  detail,
  children,
  emphasized = false,
}: {
  number: string;
  title: string;
  structure: ReactNode;
  question: string;
  detail?: string;
  children?: ReactNode;
  emphasized?: boolean;
}) => (
  <article
    style={{
      ...panelStyle,
      height: '100%',
      padding: 22,
      display: 'flex',
      flexDirection: 'column',
      gap: 12,
      borderColor: emphasized ? 'var(--osd-accent)' : palette.border,
      boxShadow: emphasized
        ? '0 0 0 6px color-mix(in srgb, var(--osd-accent) 8%, transparent)'
        : 'none',
    }}
  >
    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
      <span
        aria-hidden="true"
        style={{
          width: 34,
          height: 34,
          flex: '0 0 auto',
          display: 'grid',
          placeItems: 'center',
          border: `2px solid ${emphasized ? 'var(--osd-accent)' : palette.borderStrong}`,
          borderRadius: 10,
          color: emphasized ? 'var(--osd-accent)' : palette.textSoft,
          fontSize: 22,
          fontWeight: 800,
        }}
      >
        {number}
      </span>
      <strong
        style={{
          color: emphasized ? 'var(--osd-accent)' : 'var(--osd-text)',
          fontSize: 28,
          fontWeight: 800,
          lineHeight: 1.1,
        }}
      >
        {title}
      </strong>
    </div>

    <div
      style={{
        minHeight: 84,
        padding: '12px 16px',
        border: `1px dashed ${emphasized ? 'var(--osd-accent)' : palette.borderStrong}`,
        borderRadius: 14,
        background: emphasized
          ? 'color-mix(in srgb, var(--osd-accent) 9%, transparent)'
          : palette.whiteSoft,
        color: palette.textSoft,
        fontFamily: fonts.mono,
        fontSize: 22,
        fontWeight: 600,
        lineHeight: 1.38,
      }}
    >
      {structure}
    </div>

    <div>
      <div
        style={{
          color: palette.muted,
          fontSize: 22,
          fontWeight: 800,
          letterSpacing: '0.08em',
        }}
      >
        主要判斷
      </div>
      <div style={{ marginTop: 4, color: palette.textSoft, fontSize: 23, fontWeight: 800, lineHeight: 1.3 }}>
        {question}
      </div>
    </div>

    {detail ? (
      <p style={{ margin: 0, color: palette.muted, fontSize: 22, fontWeight: 600, lineHeight: 1.35 }}>
        {detail}
      </p>
    ) : null}
    {children}
  </article>
);

const RoadmapArrow = ({ label }: { label: string }) => (
  <div
    aria-label={label}
    style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 10,
      color: palette.muted,
      fontSize: 22,
      fontWeight: 700,
      lineHeight: 1.25,
      textAlign: 'center',
    }}
  >
    <span>{label}</span>
    <span aria-hidden="true" style={{ color: 'var(--osd-accent)', fontSize: 34, lineHeight: 1 }}>
      ─›
    </span>
  </div>
);

const DeliverySupport = ({
  symbol,
  title,
  detail,
}: {
  symbol: string;
  title: string;
  detail: string;
}) => (
  <div
    style={{
      display: 'grid',
      gridTemplateColumns: '34px 1fr',
      gap: 10,
      alignItems: 'center',
      padding: '9px 12px',
      border: `1px solid ${palette.borderStrong}`,
      borderRadius: 12,
      background: palette.whiteSoft,
    }}
  >
    <span
      aria-hidden="true"
      style={{
        width: 32,
        height: 32,
        display: 'grid',
        placeItems: 'center',
        border: `1px solid var(--osd-accent)`,
        borderRadius: 9,
        color: 'var(--osd-accent)',
        fontSize: 22,
        fontWeight: 800,
      }}
    >
      {symbol}
    </span>
    <div style={{ minWidth: 0 }}>
      <strong style={{ color: palette.textSoft, fontSize: 22, fontWeight: 800 }}>{title}</strong>
      <span style={{ color: palette.muted, fontSize: 22, fontWeight: 600 }}>｜{detail}</span>
    </div>
  </div>
);

const ProcessCue = ({ label, trail = '› › ›' }: { label: string; trail?: string }) => (
  <div
    aria-label={label}
    style={{
      width: 128,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 6,
      color: palette.muted,
      fontSize: 22,
      fontWeight: 700,
      textAlign: 'center',
    }}
  >
    <span>{label}</span>
    <span
      aria-hidden="true"
      style={{ color: 'var(--osd-accent)', fontSize: 30, fontWeight: 500, letterSpacing: '0.12em' }}
    >
      {trail}
    </span>
  </div>
);

const ProblemSetup: Page = () => (
  <PageFrame>
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div>
        <h2
          style={{
            margin: 0,
            fontFamily: 'var(--osd-font-display)',
            fontSize: 68,
            fontWeight: 800,
            lineHeight: 1.08,
            letterSpacing: '-0.04em',
          }}
        >從三次結構迭代開始</h2>
        <p
          style={{
            margin: '14px 0 0',
            maxWidth: 1580,
            color: palette.textSoft,
            fontSize: 32,
            fontWeight: 500,
            lineHeight: 1.35,
          }}
        >
          Technical-based 解決技術分類；Feature-based 改善業務聚合；FSD 再補上明確規則與落地保護。
        </p>
      </div>

      <section
        aria-label="Technical-based、Feature-based 與 Feature-Sliced Design 的三階段演講路線圖"
        style={{
          flex: 1,
          minHeight: 0,
          display: 'grid',
          gridTemplateColumns: '455px 70px 455px 70px 550px',
          alignItems: 'stretch',
          gap: 20,
        }}
      >
        <StructureStage
          number="01"
          title="Technical-based"
          structure={
            <>
              components/
              <br />
              composables/
              <br />
              utils/
            </>
          }
          question="它是什麼技術角色？"
          detail="容易分類，但一次業務修改可能橫跨多個技術目錄。"
        />

        <RoadmapArrow label="改善 locality" />

        <StructureStage
          number="02"
          title="Feature-based"
          structure={
            <>
              features/
              <br />
              &nbsp;&nbsp;checkout/　search/　auth/
            </>
          }
          question="它屬於哪個業務能力？"
          detail="低耦合、高內聚；但依賴規則不明，長期仍會長成高耦合的巨型模組。"
        />

        <RoadmapArrow label="補上共同規則" />

        <StructureStage
          number="03"
          title="Feature-Sliced Design"
          structure={
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4px 18px' }}>
              <span>Layers</span>
              <span>Slices</span>
              <span>Public API</span>
              <span>Dependency direction</span>
            </div>
          }
          question="誰擁有、誰能依賴、如何持續迭代？"
          emphasized
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <DeliverySupport
              symbol="◇"
              title="Skill"
              detail="人類、AI 可共用的語言；決定業務邏輯分界"
            />
            <DeliverySupport
              symbol="▦"
              title="Steiger／CI"
              detail="保護可被自動化的規則，例如依賴循環、不符合 FSD 的依賴方向等"
            />
          </div>
        </StructureStage>
      </section>

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 12,
          color: palette.muted,
          fontSize: 22,
          fontWeight: 700,
        }}
      >
        <span aria-hidden="true" style={{ color: 'var(--osd-accent)' }}>
          ◇
        </span>
        三種結構並非成熟度排名，FSD 只是一種可選的規範框架
      </div>

      <div
        style={{
          padding: '11px 20px',
          border: '1px solid var(--osd-accent)',
          borderRadius: 14,
          background: 'color-mix(in srgb, var(--osd-accent) 9%, transparent)',
          color: palette.textSoft,
          fontSize: 26,
          fontWeight: 800,
          textAlign: 'center',
        }}
      >
        從分類，到聚合，再到共同規則與自動化防護。
      </div>
    </div>
  </PageFrame>
);

const FolderBox = ({
  name,
  file,
  responsibility,
}: {
  name: string;
  file: string;
  responsibility: string;
}) => (
  <div
    style={{
      ...panelStyle,
      width: 350,
      height: 318,
      padding: 30,
      display: 'flex',
      flexDirection: 'column',
      gap: 22,
    }}
  >
    <div
      style={{
        color: 'var(--osd-accent)',
        fontFamily: fonts.mono,
        fontSize: 29,
        fontWeight: 800,
      }}
    >
      {name}
    </div>
    <div
      style={{
        padding: '18px 20px',
        border: `1px solid ${palette.borderStrong}`,
        borderRadius: 14,
        background: palette.whiteSoft,
        color: palette.textSoft,
        fontFamily: fonts.mono,
        fontSize: 22,
        fontWeight: 600,
      }}
    >
      {file}
    </div>
    <div style={{ color: palette.muted, fontSize: 25, lineHeight: 1.4 }}>{responsibility}</div>
  </div>
);

const TechnicalBaseline: Page = () => (
  <PageFrame>
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', gap: 34 }}>
      <PageHeading
        title="Technical-based 容易上手；修改卻可能散落多處"
        lead="看到檔案就知道它的技術角色，卻不一定看得出一次修改的完整邊界。"
      />

      <section
        aria-label="一次業務修改跨 components、composables 與 utils 追查"
        style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 24,
        }}
      >
        <div
          style={{
            ...panelStyle,
            width: 300,
            height: 318,
            padding: 30,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            gap: 24,
            borderColor: 'var(--osd-accent)',
            background: palette.accentSoft,
          }}
        >
          <span style={{ color: 'var(--osd-accent)', fontSize: 23, fontWeight: 800 }}>CHANGE</span>
          <strong style={{ fontSize: 37, lineHeight: 1.25 }}>一次業務修改</strong>
          <span style={{ color: palette.textSoft, fontSize: 25, lineHeight: 1.4 }}>
            從畫面一路追到狀態與規則
          </span>
        </div>

        <ProcessCue label="追查" />
        <FolderBox name="components/" file="CheckoutPanel.vue" responsibility="畫面與互動" />
        <FolderBox name="composables/" file="useCheckout.ts" responsibility="狀態與流程" />
        <FolderBox name="utils/" file="price-rule.ts" responsibility="計算與規則" />
      </section>

      <div
        style={{
          alignSelf: 'center',
          padding: '14px 24px',
          borderRadius: 999,
          background: palette.whiteSoft,
          color: palette.textSoft,
          fontSize: 26,
          fontWeight: 700,
        }}
      >
        <span style={{ color: 'var(--osd-accent)' }}>容易開始</span>
        <span style={{ color: palette.dim, padding: '0 16px' }}>≠</span>
        業務邊界集中
      </div>
    </div>
  </PageFrame>
);

const MiniFolder = ({ name, file }: { name: string; file: string }) => (
  <div
    style={{
      padding: '17px 20px',
      border: `1px solid ${palette.borderStrong}`,
      borderRadius: 14,
      background: palette.whiteSoft,
    }}
  >
    <div style={{ color: palette.muted, fontFamily: fonts.mono, fontSize: 22, fontWeight: 700 }}>
      {name}
    </div>
    <div
      style={{
        marginTop: 8,
        color: palette.textSoft,
        fontFamily: fonts.mono,
        fontSize: 22,
        fontWeight: 600,
      }}
    >
      {file}
    </div>
  </div>
);

const BeforeLocality = () => (
  <div
    style={{
      ...panelStyle,
      width: 620,
      height: 480,
      padding: 32,
      display: 'flex',
      flexDirection: 'column',
      gap: 16,
    }}
  >
    <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
      <strong style={{ fontSize: 30 }}>Technical-based</strong>
      <span style={{ color: palette.muted, fontSize: 22 }}>跨目錄追查</span>
    </div>
    <MiniFolder name="components/" file="CheckoutPanel.vue" />
    <MiniFolder name="composables/" file="useCheckout.ts" />
    <MiniFolder name="utils/" file="price-rule.ts" />
  </div>
);

const FeatureFile = ({ file, purpose }: { file: string; purpose: string }) => (
  <div
    style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 18,
      padding: '16px 20px',
      border: `1px solid ${palette.accentLine}`,
      borderRadius: 14,
      background: 'rgba(0, 220, 130, 0.075)',
    }}
  >
    <span style={{ color: palette.textSoft, fontFamily: fonts.mono, fontSize: 22, fontWeight: 600 }}>
      {file}
    </span>
    <span style={{ color: palette.muted, fontSize: 22 }}>{purpose}</span>
  </div>
);

const AfterLocality = () => (
  <div
    style={{
      ...panelStyle,
      width: 620,
      height: 480,
      padding: 32,
      display: 'flex',
      flexDirection: 'column',
      gap: 22,
      borderColor: 'var(--osd-accent)',
      boxShadow: '0 0 0 8px rgba(0, 220, 130, 0.06)',
    }}
  >
    <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
      <strong style={{ color: 'var(--osd-accent)', fontSize: 30 }}>features/checkout/</strong>
      <span style={{ color: palette.textSoft, fontSize: 22 }}>集中查詢、修改</span>
    </div>
    <FeatureFile file="CheckoutPanel.vue" purpose="畫面" />
    <FeatureFile file="useCheckout.ts" purpose="流程" />
    <FeatureFile file="price-rule.ts" purpose="規則" />
  </div>
);

const FeatureImprovement: Page = () => (
  <PageFrame>
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', gap: 34 }}>
      <PageHeading
        title={
          <>
            Feature-based；<span style={{ color: 'var(--osd-accent)' }}>改善了集中性</span>
          </>
        }
        lead="一起變動的程式碼靠近，搜尋、理解與修改的心智負擔更低"
      />

      <section
        aria-label="Technical-based 與 feature-based locality 的前後對照"
        style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 52,
        }}
      >
        <BeforeLocality />
        <ProcessCue label="集合" trail="› › ›" />
        <AfterLocality />
      </section>
    </div>
  </PageFrame>
);

const QuestionCard = ({
  symbol,
  question,
  term,
  style,
}: {
  symbol: string;
  question: string;
  term: string;
  style: CSSProperties;
}) => (
  <div
    style={{
      ...panelStyle,
      ...style,
      position: 'absolute',
      width: 334,
      height: 126,
      padding: '22px 24px',
      display: 'flex',
      alignItems: 'center',
      gap: 18,
    }}
  >
    <span
      aria-hidden="true"
      style={{
        width: 42,
        height: 42,
        flex: '0 0 auto',
        display: 'grid',
        placeItems: 'center',
        border: `2px solid ${palette.accentLine}`,
        borderRadius: 12,
        color: 'var(--osd-accent)',
        fontSize: 24,
        fontWeight: 800,
      }}
    >
      {symbol}
    </span>
    <div>
      <div style={{ color: palette.textSoft, fontSize: 28, fontWeight: 800 }}>{question}</div>
      <div style={{ marginTop: 6, color: palette.muted, fontSize: 22, fontWeight: 600 }}>{term}</div>
    </div>
  </div>
);

const GapFraming: Page = () => (
  <PageFrame>
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', gap: 24 }}>
      <PageHeading
        title={
          <>
            Feature 資料夾本身，<span style={{ color: 'var(--osd-accent)' }}>還沒有回答這五件事</span>
          </>
        }
        lead="分組改善了內聚；結構判斷仍需要團隊明確定義。"
      />

      <section
        aria-label="Feature box 周圍的五個未決問題"
        style={{
          position: 'relative',
          flex: 1,
          width: '100%',
          minHeight: 0,
        }}
      >
        <svg
          aria-hidden="true"
          viewBox="0 0 1680 500"
          preserveAspectRatio="none"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
        >
          <path d="M334 78 L680 222" fill="none" stroke={palette.borderStrong} strokeWidth="3" strokeDasharray="10 10" />
          <path d="M1346 78 L1000 222" fill="none" stroke={palette.borderStrong} strokeWidth="3" strokeDasharray="10 10" />
          <path d="M334 220 L680 270" fill="none" stroke={palette.borderStrong} strokeWidth="3" strokeDasharray="10 10" />
          <path d="M1346 220 L1000 270" fill="none" stroke={palette.borderStrong} strokeWidth="3" strokeDasharray="10 10" />
          <path d="M840 390 L840 230" fill="none" stroke={palette.borderStrong} strokeWidth="3" strokeDasharray="10 10" />
        </svg>

        <QuestionCard symbol="01" question="誰擁有？" term="OWNERSHIP" style={{ left: 0, top: 18 }} />
        <QuestionCard symbol="02" question="誰能依賴誰？" term="DEPENDENCY" style={{ right: 0, top: 18 }} />
        <QuestionCard symbol="03" question="外界從哪裡進？" term="PUBLIC API" style={{ left: 0, top: 212 }} />
        <QuestionCard symbol="04" question="何時值得抽離？" term="EVOLUTION TIMING" style={{ right: 0, top: 212 }} />
        <QuestionCard
          symbol="05"
          question="什麼能被保護？"
          term="ENFORCEMENT"
          style={{ left: 673, bottom: 0 }}
        />

        <div
          style={{
            ...panelStyle,
            position: 'absolute',
            left: 586,
            top: 198,
            width: 508,
            height: 176,
            display: 'grid',
            placeItems: 'center',
            borderColor: 'var(--osd-accent)',
            boxShadow: '0 0 0 8px rgba(0, 220, 130, 0.06)',
          }}
        >
          <div style={{ textAlign: 'center' }}>
            <div
              style={{
                color: 'var(--osd-accent)',
                fontFamily: fonts.mono,
                fontSize: 34,
                fontWeight: 800,
              }}
            >
              features/checkout/
            </div>
            <div style={{ marginTop: 13, color: palette.textSoft, fontSize: 25, fontWeight: 600 }}>分組完成，不等於規範完善</div>
          </div>
        </div>
      </section>
    </div>
  </PageFrame>
);

const TrackCard = ({
  icon,
  title,
  owner,
  details,
  accent = false,
}: {
  icon: string;
  title: string;
  owner: string;
  details: ReactNode;
  accent?: boolean;
}) => (
  <div
    style={{
      ...panelStyle,
      width: 650,
      height: 302,
      padding: 38,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      borderColor: accent ? 'var(--osd-accent)' : palette.borderStrong,
      boxShadow: accent ? '0 0 0 8px rgba(0, 220, 130, 0.06)' : undefined,
    }}
  >
    <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
      <span
        aria-hidden="true"
        style={{
          width: 56,
          height: 56,
          display: 'grid',
          placeItems: 'center',
          border: `2px ${accent ? 'solid' : 'dashed'} ${
            accent ? 'var(--osd-accent)' : palette.borderStrong
          }`,
          borderRadius: 16,
          color: accent ? 'var(--osd-accent)' : palette.textSoft,
          fontSize: 29,
          fontWeight: 800,
        }}
      >
        {icon}
      </span>
      <div>
        <div style={{ color: accent ? 'var(--osd-accent)' : 'var(--osd-text)', fontSize: 34, fontWeight: 800 }}>
          {title}
        </div>
        <div style={{ marginTop: 6, color: palette.muted, fontSize: 22, fontWeight: 600 }}>{owner}</div>
      </div>
    </div>
    <div style={{ color: palette.textSoft, fontSize: 28, fontWeight: 600, lineHeight: 1.5 }}>{details}</div>
  </div>
);

const Thesis: Page = () => (
  <PageFrame>
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', gap: 34 }}>
      <PageHeading
        title={
          <>
            用 FSD，完善<span style={{ color: 'var(--osd-accent)' }}>結構判斷</span>+<span style={{ color: 'var(--osd-accent)' }}>自動化防護</span>
          </>
        }
        lead="讓人與 AI 能共同判斷、讓 CI 保護可驗證的部分。"
      />

      <section
        aria-label="結構判斷與自動化防護的雙軌承諾"
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 30,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 34 }}>
          <TrackCard
            icon="↔"
            title="結構判斷"
            owner="人 ＋ AI"
            details={
              <>
                ownership · dependency
                <br />
                Public API · 抽離時機
              </>
            }
          />
          <span aria-hidden="true" style={{ color: 'var(--osd-accent)', fontSize: 54, fontWeight: 500 }}>
            ＋
          </span>
          <TrackCard
            icon="✓"
            title="自動化防護"
            owner="CI"
            accent
            details={
              <>
                只守可觀察、
                <br />
                可重複驗證的規則
              </>
            }
          />
        </div>

        <div
          style={{
            width: 1382,
            padding: '18px 28px',
            border: `1px dashed ${palette.accentLine}`,
            borderRadius: 18,
            background: palette.accentSoft,
            color: palette.textSoft,
            fontSize: 28,
            fontWeight: 700,
            textAlign: 'center',
          }}
        >
          <span style={{ color: 'var(--osd-accent)' }}>可理解</span>
          <span> · </span>
          <span style={{ color: 'var(--osd-accent)' }}>可 review</span>
          <span> · </span>
          <span style={{ color: 'var(--osd-accent)' }}>可部分 linter</span>
        </div>
      </section>
    </div>
  </PageFrame>
);

const PrimerFrame = ({
  children,
  categoryLabel = '現行官方 guidance',
  categorySymbol = '◆',
}: {
  children: ReactNode;
  categoryLabel?: string;
  categorySymbol?: string;
}) => (
  <PageFrame
    section="FSD PRIMER"
    categoryLabel={categoryLabel}
    categorySymbol={categorySymbol}
  >
    {children}
  </PageFrame>
);

const SourcePolicyCard = ({
  icon,
  eyebrow,
  title,
  detail,
  screenshot,
  screenshotAlt,
  accent = false,
}: {
  icon: string;
  eyebrow: string;
  title: string;
  detail: ReactNode;
  screenshot: string;
  screenshotAlt: string;
  accent?: boolean;
}) => (
  <div
    style={{
      ...panelStyle,
      height: 510,
      padding: 26,
      display: 'flex',
      flexDirection: 'column',
      gap: 16,
      borderColor: accent ? 'var(--osd-accent)' : palette.borderStrong,
      borderStyle: accent ? 'solid' : 'dashed',
      boxShadow: accent ? '0 0 0 8px rgba(0, 220, 130, 0.06)' : undefined,
    }}
  >
    <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
      <span
        aria-hidden="true"
        style={{
          width: 44,
          height: 44,
          display: 'grid',
          placeItems: 'center',
          border: `2px ${accent ? 'solid' : 'dashed'} ${
            accent ? 'var(--osd-accent)' : palette.borderStrong
          }`,
          borderRadius: 12,
          color: accent ? 'var(--osd-accent)' : palette.textSoft,
          fontSize: 24,
          fontWeight: 800,
          flex: '0 0 auto',
        }}
      >
        {icon}
      </span>
      <span
        style={{
          color: accent ? 'var(--osd-accent)' : palette.muted,
          fontSize: 21,
          fontWeight: 800,
          letterSpacing: '0.1em',
        }}
      >
        {eyebrow}
      </span>
    </div>

    <div
      style={{
        height: 270,
        overflow: 'hidden',
        border: `2px solid ${accent ? 'var(--osd-accent)' : palette.borderStrong}`,
        borderRadius: 16,
        background: palette.panelStrong,
      }}
    >
      <img
        src={screenshot}
        alt={screenshotAlt}
        style={{
          width: '100%',
          height: '100%',
          display: 'block',
          objectFit: 'cover',
          objectPosition: 'top',
        }}
      />
    </div>

    <div
      style={{
        color: accent ? 'var(--osd-accent)' : 'var(--osd-text)',
        fontFamily: fonts.mono,
        fontSize: accent ? 44 : 38,
        fontWeight: 800,
        letterSpacing: '-0.035em',
        lineHeight: 1.05,
      }}
    >
      {title}
    </div>

    <div style={{ color: palette.textSoft, fontSize: 22, fontWeight: 600, lineHeight: 1.35 }}>
      {detail}
    </div>
  </div>
);

const SourcePolicy: Page = () => (
  <PrimerFrame categoryLabel="現行官方 guidance／講者背景" categorySymbol="◐">
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', gap: 34 }}>
      <PageHeading
        title="查文件之前要小心"
        lead="FSD 官方文件，以 fsd.how 與它連結的一手資料為準。"
      />

      <section
        aria-label="本演講的 FSD current source 與 legacy domain 使用界線"
        style={{
          flex: 1,
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          alignItems: 'center',
          gap: 36,
        }}
      >
        <SourcePolicyCard
          icon="✓"
          eyebrow="CANONICAL SOURCE"
          title="fsd.how"
          accent
          screenshot={currentHomepage}
          screenshotAlt="新版 fsd.how 首頁，標題為 A clearer structure for frontend codebases"
          detail="新版畫面 · 現行官方文件入口"
        />
        <SourcePolicyCard
          icon="!"
          eyebrow="LEGACY WEBSITE"
          title="feature-sliced.design"
          screenshot={legacyHomepage}
          screenshotAlt="舊版 Feature-Sliced Design 首頁，藍色漸層主視覺"
          detail="舊版畫面 · 已與 FSD 官方無關（網域過期被第三方搶佔）"
        />
      </section>
    </div>
  </PrimerFrame>
);

const LayerTier = ({
  name,
  role,
  status,
  width,
  optional = false,
}: {
  name: string;
  role: string;
  status: string;
  width: number;
  optional?: boolean;
}) => (
  <div
    style={{
      ...panelStyle,
      width,
      height: 66,
      padding: '0 24px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 28,
      borderColor: optional ? palette.borderStrong : palette.accentLine,
      borderStyle: optional ? 'dashed' : 'solid',
      background: optional ? palette.whiteSoft : palette.accentSoft,
    }}
  >
    <div style={{ display: 'flex', alignItems: 'baseline', gap: 24 }}>
      <strong
        style={{
          color: optional ? palette.textSoft : 'var(--osd-accent)',
          fontFamily: fonts.mono,
          fontSize: 32,
        }}
      >
        {name}
      </strong>
      <span style={{ color: palette.muted, fontSize: 23, fontWeight: 600 }}>{role}</span>
    </div>
    <span
      style={{
        flex: '0 0 auto',
        padding: '8px 13px',
        border: `1px ${optional ? 'dashed' : 'solid'} ${
          optional ? palette.borderStrong : palette.accentLine
        }`,
        borderRadius: 999,
        color: optional ? palette.textSoft : 'var(--osd-accent)',
        fontSize: 22,
        fontWeight: 800,
        letterSpacing: '0.04em',
      }}
    >
      {status}
    </span>
  </div>
);

const LayersPrimer: Page = () => (
  <PrimerFrame>
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', gap: 26 }}>
      <PageHeading
        title="Layers 是責任層級；不是必填清單"
        lead="App、Pages、Shared 可先起步；Features、Entities 有價值再加，Widgets 不建議新採用。"
      />

      <section
        aria-label="App、Pages、Widgets、Features、Entities、Shared 的 layer 階梯與採用建議"
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 10,
        }}
      >
        <LayerTier name="app/" role="inits、providers、routes、styles" status="常見起點" width={780} />
        <LayerTier name="pages/" role="頁面組合與本地邏輯" status="常見起點" width={870} />
        <LayerTier
          name="widgets/"
          role="可重用的獨立 UI 區塊"
          status="不建議採用"
          width={960}
          optional
        />
        <LayerTier
          name="features/"
          role="跨頁重用的使用者互動"
          status="有價值再加"
          width={1050}
          optional
        />
        <LayerTier
          name="entities/"
          role="穩定、可重用的 business model"
          status="有價值再加"
          width={1140}
          optional
        />
        <LayerTier name="shared/" role="基礎設施，盡可能與業務邏輯無關" status="常見起點" width={1230} />
      </section>
    </div>
  </PrimerFrame>
);

const SegmentBox = ({
  name,
  purpose,
  example,
}: {
  name: string;
  purpose: string;
  example: string;
}) => (
  <div
    style={{
      ...panelStyle,
      height: 220,
      padding: 28,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      borderColor: palette.borderStrong,
    }}
  >
    <div
      style={{
        color: 'var(--osd-accent)',
        fontFamily: fonts.mono,
        fontSize: 34,
        fontWeight: 800,
      }}
    >
      {name}
    </div>
    <div style={{ color: palette.textSoft, fontSize: 32, fontWeight: 700 }}>{purpose}</div>
    <div style={{ color: palette.muted, fontFamily: fonts.mono, fontSize: 22, fontWeight: 600 }}>
      {example}
    </div>
  </div>
);

const SlicesAndSegments: Page = () => (
  <PrimerFrame>
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', gap: 30 }}>
      <PageHeading
        title="Slice 按業務語意分「片」；segment 按目的分「段」"
        lead="pages/checkout/ 是業務 slice；ui/、model/、api/ 是它的內部分區。"
      />

      <section
        aria-label="pages checkout slice 內含 ui、model 與 api segments"
        style={{ flex: 1, display: 'grid', placeItems: 'center' }}
      >
        <div
          style={{
            ...panelStyle,
            position: 'relative',
            width: 1330,
            height: 382,
            padding: '68px 46px 42px',
            borderColor: 'var(--osd-accent)',
            boxShadow: '0 0 0 8px rgba(0, 220, 130, 0.055)',
          }}
        >
          <div
            style={{
              position: 'absolute',
              left: 36,
              top: -24,
              padding: '12px 20px',
              border: '2px solid var(--osd-accent)',
              borderRadius: 999,
              background: 'var(--osd-bg)',
              color: 'var(--osd-accent)',
              fontFamily: fonts.mono,
              fontSize: 26,
              fontWeight: 800,
            }}
          >
            SLICE · pages/checkout/
          </div>
          <div
            style={{
              position: 'absolute',
              right: 36,
              top: 18,
              color: palette.muted,
              fontSize: 22,
              fontWeight: 700,
              letterSpacing: '0.06em',
            }}
          >
            業務責任邊界
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 28 }}>
            <SegmentBox name="ui/" purpose="畫面與互動" example="CheckoutPage.vue" />
            <SegmentBox name="model/" purpose="狀態與規則" example="useCheckout.ts" />
            <SegmentBox name="api/" purpose="後端互動" example="submit-order.ts" />
          </div>
        </div>
      </section>
    </div>
  </PrimerFrame>
);

const SliceInternal = ({ name, purpose }: { name: string; purpose: string }) => (
  <div
    style={{
      width: 286,
      height: 90,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 8,
      border: `1px solid ${palette.borderStrong}`,
      borderRadius: 15,
      background: palette.whiteSoft,
    }}
  >
    <strong style={{ color: palette.textSoft, fontFamily: fonts.mono, fontSize: 27 }}>{name}</strong>
    <span style={{ color: palette.muted, fontSize: 22, fontWeight: 600 }}>{purpose}</span>
  </div>
);

const DependencyAndPublicApi: Page = () => (
  <PrimerFrame>
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', gap: 26 }}>
      <PageHeading
        title="依賴向下；slice 對外只開具名入口"
        lead="上層只更低層；外部依賴先穿過 Public API，不鑽進 slice 內部。"
      />

      <section
        aria-label="Pages 透過具名 Public API 向下依賴 Features 的示意圖"
        style={{ position: 'relative', flex: 1, minHeight: 0 }}
      >
        <div
          style={{
            ...panelStyle,
            position: 'absolute',
            left: 510,
            top: 0,
            width: 660,
            height: 122,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 32px',
          }}
        >
          <div>
            <div style={{ color: palette.muted, fontSize: 22, fontWeight: 800, letterSpacing: '0.08em' }}>HIGHER LAYER</div>
            <div
              style={{
                marginTop: 8,
                color: 'var(--osd-text)',
                fontFamily: fonts.mono,
                fontSize: 32,
                fontWeight: 800,
              }}
            >
              pages/checkout/
            </div>
          </div>
          <span style={{ color: palette.textSoft, fontSize: 25, fontWeight: 700 }}>Page composition</span>
        </div>

        <svg
          aria-hidden="true"
          viewBox="0 0 1680 584"
          preserveAspectRatio="none"
          style={{ position: 'absolute', inset: 0, zIndex: 2, width: '100%', height: '100%' }}
        >
          <path
            d="M840 122 L840 166 M840 200 L840 110"
            fill="none"
            stroke="var(--osd-accent)"
            strokeWidth="4"
            strokeDasharray="11 10"
          />
          <path d="M826 130 L840 156 L854 130" fill="none" stroke="var(--osd-accent)" strokeWidth="4" />
        </svg>
        <div
          style={{
            position: 'absolute',
            left: 870,
            top: 134,
            color: 'var(--osd-accent)',
            fontFamily: fonts.mono,
            fontSize: 22,
            fontWeight: 800,
          }}
        >
          import
        </div>

        <div
          style={{
            ...panelStyle,
            position: 'absolute',
            left: 270,
            top: 190,
            width: 1140,
            height: 244,
            padding: '72px 42px 34px',
            borderColor: 'var(--osd-accent)',
            boxShadow: '0 0 0 8px rgba(0, 220, 130, 0.055)',
          }}
        >
          <div
            style={{
              position: 'absolute',
              left: 32,
              bottom: 18,
              color: palette.muted,
              fontSize: 22,
              fontWeight: 800,
              letterSpacing: '0.08em',
            }}
          >
            下層 · SLICE · features/payment/
          </div>
          <div
            style={{
              position: 'absolute',
              left: 260,
              top: -24,
              zIndex: 3,
              width: 620,
              padding: '11px 18px',
              border: '2px solid var(--osd-accent)',
              borderRadius: 999,
              background: 'var(--osd-bg)',
              color: 'var(--osd-accent)',
              fontFamily: fonts.mono,
              fontSize: 22,
              fontWeight: 800,
              textAlign: 'center',
            }}
          >
            PUBLIC API · features/payment/index.ts
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', gap: 28 }}>
            <SliceInternal name="ui/" purpose="internal" />
            <SliceInternal name="model/" purpose="internal" />
            <SliceInternal name="api/" purpose="internal" />
          </div>
        </div>
      </section>
    </div>
  </PrimerFrame>
);

const LayerStructureExceptions: Page = () => (
  <PrimerFrame>
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', gap: 26 }}>
      <PageHeading
        title="哪些 Layer 有 slice？App、Shared 是例外"
        lead="App、Shared 直接分 segment；其餘 Layer 先按業務語意切 slice，再在 slice 內分 segment。"
      />

      <section
        aria-label="FSD layers 中有 slice 的四層與只有 segment 的 App、Shared 對照"
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 10,
        }}
      >
        <LayerTier
          name="app/"
          role="inits/、providers/、routes/、styles/"
          status="只有 segment"
          width={780}
        />
        <LayerTier
          name="pages/"
          role="checkout/ → ui/、model/、api/"
          status="slice + segment"
          width={870}
          optional
        />
        <LayerTier
          name="widgets/"
          role="header/ → ui/、model/、api/"
          status="slice + segment"
          width={960}
          optional
        />
        <LayerTier
          name="features/"
          role="payment/ → ui/、model/、api/"
          status="slice + segment"
          width={1050}
          optional
        />
        <LayerTier
          name="entities/"
          role="order/ → ui/、model/、api/"
          status="slice + segment"
          width={1140}
          optional
        />
        <LayerTier
          name="shared/"
          role="ui/、api/、lib/"
          status="只有 segment"
          width={1230}
        />
      </section>
    </div>
  </PrimerFrame>
);

const ProjectTreeRow = ({
  depth,
  name,
  detail,
  expanded = false,
  file = false,
  optional = false,
  accent = false,
}: {
  depth: number;
  name: string;
  detail?: string;
  expanded?: boolean;
  file?: boolean;
  optional?: boolean;
  accent?: boolean;
}) => (
  <div
    style={{
      minHeight: 34,
      display: 'grid',
      gridTemplateColumns: '24px 24px 420px 1fr',
      alignItems: 'center',
      paddingLeft: depth * 36,
      color: optional ? palette.textSoft : 'var(--osd-text)',
    }}
  >
    <span aria-hidden="true" style={{ color: palette.muted, fontSize: 19, textAlign: 'center' }}>
      {file ? '' : expanded ? '▾' : '▸'}
    </span>
    <span
      aria-hidden="true"
      style={{
        color: file ? palette.muted : accent ? 'var(--osd-accent)' : '#93A4BB',
        fontSize: file ? 16 : 19,
        lineHeight: 1,
        textAlign: 'center',
      }}
    >
      {file ? '▪' : '▰'}
    </span>
    <strong
      style={{
        color: accent ? 'var(--osd-accent)' : optional ? palette.textSoft : 'var(--osd-text)',
        fontFamily: fonts.mono,
        fontSize: file ? 21 : 24,
        fontWeight: 800,
        whiteSpace: file ? 'nowrap' : undefined,
      }}
    >
      {name}
    </strong>
    {detail ? (
      <span style={{ color: optional ? palette.muted : palette.textSoft, fontSize: 20, fontWeight: 700 }}>
        {detail}
      </span>
    ) : null}
  </div>
);

const StructureCue = ({
  label,
  title,
  detail,
  accent = false,
}: {
  label: string;
  title: string;
  detail: string;
  accent?: boolean;
}) => (
  <div
    style={{
      ...panelStyle,
      minHeight: 118,
      padding: '18px 22px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      gap: 5,
      borderColor: accent ? palette.accentLine : palette.borderStrong,
      background: accent ? palette.accentSoft : palette.whiteSoft,
    }}
  >
    <span style={{ color: accent ? 'var(--osd-accent)' : palette.muted, fontSize: 18, fontWeight: 900, letterSpacing: '0.08em' }}>
      {label}
    </span>
    <strong style={{ color: accent ? 'var(--osd-accent)' : palette.textSoft, fontSize: 25 }}>{title}</strong>
    <span style={{ color: palette.muted, fontSize: 20, fontWeight: 700, lineHeight: 1.35 }}>{detail}</span>
  </div>
);

const ProjectStructureOverview: Page = () => (
  <PrimerFrame categoryLabel="現行官方 guidance／示意結構" categorySymbol="◈">
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', gap: 24 }}>
      <PageHeading
        title="一個 FSD 專案，大概會長這樣"
        lead="先看 Layer，再看 slice，最後看 segment；不是每個 Layer 都必須出現。"
      />

      <section
        aria-label="以檔案樹概覽 App、Pages、Features、Entities、Shared 的 FSD 專案結構"
        style={{ flex: 1, minHeight: 0, display: 'grid', gridTemplateColumns: '1090px 1fr', alignItems: 'center', gap: 34 }}
      >
        <div
          style={{
            ...panelStyle,
            boxSizing: 'border-box',
            height: 574,
            padding: '22px 30px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            borderColor: palette.borderStrong,
            background: 'rgba(12, 22, 42, 0.72)',
          }}
        >
          <ProjectTreeRow depth={0} name="src/" expanded accent />
          <ProjectTreeRow depth={1} name="app/" detail="直接分 segments" expanded />
          <ProjectTreeRow depth={2} name="routes/" />
          <ProjectTreeRow depth={2} name="providers/" />
          <ProjectTreeRow depth={1} name="pages/" detail="Layer → slice → segment" expanded />
          <ProjectTreeRow depth={2} name="home/" />
          <ProjectTreeRow depth={2} name="checkout/" expanded />
          <ProjectTreeRow depth={3} name="ui/ · model/ · api/ · index.ts" file />
          <ProjectTreeRow depth={1} name="features/" detail="有真實重用後再加" expanded optional />
          <ProjectTreeRow depth={2} name="apply-coupon/" detail="ui/ · model/ · index.ts" optional />
          <ProjectTreeRow depth={1} name="entities/" detail="有穩定 domain model 再加" expanded optional />
          <ProjectTreeRow depth={2} name="product/" detail="model/ · index.ts" optional />
          <ProjectTreeRow depth={1} name="shared/" detail="直接分 segments" expanded />
          <ProjectTreeRow depth={2} name="ui/ · api/ · lib/ · auth/ · ..." file />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <StructureCue label="START HERE" title="先有骨架" detail="app/ ＋ pages/ ＋ shared/ 就是有效起點" accent />
          <StructureCue label="EXTRACT LATER" title="看到重複再擴充" detail="Features、Entities 不用預先建立空目錄" />
          <StructureCue label="READ THE TREE" title="名稱代表責任" detail="slice 說業務語意；segment 說程式碼目的" />
        </div>
      </section>
    </div>
  </PrimerFrame>
);

const DecisionColumn = ({
  question,
  branchLabel,
  outcome,
  accent = false,
}: {
  question: string;
  branchLabel: string;
  outcome: string;
  accent?: boolean;
}) => (
  <div style={{ width: 320, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
    <div
      style={{
        ...panelStyle,
        width: '100%',
        height: 124,
        padding: '24px 26px',
        display: 'grid',
        placeItems: 'center',
        color: 'var(--osd-text)',
        fontSize: 32,
        fontWeight: 800,
        lineHeight: 1.35,
        textAlign: 'center',
      }}
    >
      {question}
    </div>
    <div aria-hidden="true" style={{ width: 2, height: 28, background: palette.borderStrong }} />
    <div
      style={{
        padding: '5px 11px',
        border: `1px solid ${palette.borderStrong}`,
        borderRadius: 999,
        color: palette.textSoft,
        fontSize: 22,
        fontWeight: 800,
      }}
    >
      {branchLabel}
    </div>
    <div aria-hidden="true" style={{ width: 2, height: 16, background: palette.borderStrong }} />
    <div
      style={{
        width: '100%',
        height: 94,
        display: 'grid',
        placeItems: 'center',
        border: `2px ${accent ? 'solid' : 'dashed'} ${
          accent ? 'var(--osd-accent)' : palette.borderStrong
        }`,
        borderRadius: 17,
        background: accent ? palette.accentSoft : palette.whiteSoft,
        color: accent ? 'var(--osd-accent)' : palette.textSoft,
        fontFamily: outcome.includes('/') ? fonts.mono : 'var(--osd-font-body)',
        fontSize: 27,
        fontWeight: 800,
        textAlign: 'center',
      }}
    >
      {outcome}
    </div>
  </div>
);

const DecisionArrow = ({ label }: { label: string }) => (
  <div
    style={{
      width: 76,
      marginTop: 39,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 2,
      color: 'var(--osd-accent)',
      fontSize: 22,
      fontWeight: 800,
    }}
  >
    <span>{label}</span>
    <span aria-hidden="true" style={{ fontSize: 38, lineHeight: 1 }}>
      →
    </span>
  </div>
);

const ExtractionOutcome = () => (
  <div
    style={{
      ...panelStyle,
      width: 350,
      height: 164,
      padding: '22px 26px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 8,
      borderColor: 'var(--osd-accent)',
      background: palette.accentSoft,
      boxShadow: '0 0 0 8px rgba(0, 220, 130, 0.055)',
      textAlign: 'center',
    }}
  >
    <strong style={{ color: 'var(--osd-accent)', fontSize: 32, lineHeight: 1.2 }}>
      再抽到有價值的 lower layer
    </strong>
    <span style={{ color: palette.textSoft, fontSize: 22, fontWeight: 600, lineHeight: 1.3 }}>
      不是先建空資料夾
    </span>
  </div>
);

const PagesFirst: Page = () => (
  <PrimerFrame categoryLabel="現行官方 guidance／講者詮釋" categorySymbol="◈">
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', gap: 26 }}>
      <PageHeading
        title="先留在 Pages；真的要共用再抽離"
        lead="不是看到「可能重用」就抽；先問真實重複與穩定邊界。"
      />

      <section
        aria-label="Pages First 與延後抽離 decision tree"
        style={{
          position: 'relative',
          flex: 1,
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'center',
          paddingTop: 22,
        }}
      >
        <DecisionColumn
          question="現在只服務一個 page？"
          branchLabel="YES"
          outcome="留在 pages/checkout/"
          accent
        />
        <DecisionArrow label="NO" />
        <DecisionColumn question="抽離能解決實際出現的重複問題？" branchLabel="NO" outcome="延後抽離" />
        <DecisionArrow label="YES" />
        <DecisionColumn question="責任邊界已經穩定？" branchLabel="NO" outcome="延後抽離" />
        <DecisionArrow label="YES" />
        <ExtractionOutcome />

      </section>
    </div>
  </PrimerFrame>
);

const CaseFrame = ({
  children,
  categoryLabel = '匿名真實案例',
  categorySymbol = '●',
  sourceHref,
  sourceLabel,
}: {
  children: ReactNode;
  categoryLabel?: string;
  categorySymbol?: string;
  sourceHref?: string;
  sourceLabel?: string;
}) => (
  <PageFrame
    section="ARCHITECTURE CASES"
    categoryLabel={categoryLabel}
    categorySymbol={categorySymbol}
    sourceHref={sourceHref}
    sourceLabel={sourceLabel}
  >
    {children}
  </PageFrame>
);

const ResponsibilityTile = ({
  index,
  title,
  detail,
  accent = false,
  compact = false,
}: {
  index: string;
  title: string;
  detail: ReactNode;
  accent?: boolean;
  compact?: boolean;
}) => (
  <div
    style={{
      height: compact ? 170 : 260,
      padding: compact ? 20 : 28,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      border: `2px ${accent ? 'solid' : 'dashed'} ${
        accent ? 'var(--osd-accent)' : palette.borderStrong
      }`,
      borderRadius: 18,
      background: accent ? palette.accentSoft : palette.whiteSoft,
    }}
  >
    <div
      style={{
        width: compact ? 36 : 42,
        height: compact ? 36 : 42,
        display: 'grid',
        placeItems: 'center',
        border: `1px solid ${accent ? 'var(--osd-accent)' : palette.borderStrong}`,
        borderRadius: 12,
        color: accent ? 'var(--osd-accent)' : palette.textSoft,
        fontFamily: fonts.mono,
        fontSize: 22,
        fontWeight: 800,
      }}
    >
      {index}
    </div>
    <strong style={{ color: palette.textSoft, fontSize: compact ? 27 : 31, lineHeight: 1.2 }}>{title}</strong>
    <div
      style={{
        color: palette.muted,
        fontSize: compact ? 22 : 24,
        fontWeight: 600,
        lineHeight: 1.4,
      }}
    >
      {detail}
    </div>
  </div>
);

const PrematureSharedDecision: Page = () => (
  <CaseFrame>
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', gap: 28 }}>
      <PageHeading
        title="案例一：全專案共用，卻綁住三種責任"
        lead="只有一個使用情境時，UI、form 與 server-data policy 就被包進同一個共用元件。"
      />

      <section
        aria-label="單一全專案共用元件同時包住 UI control、form adapter 與 server-data owner"
        style={{ flex: 1, display: 'grid', placeItems: 'center' }}
      >
        <div
          style={{
            ...panelStyle,
            position: 'relative',
            width: 1390,
            height: 448,
            padding: '82px 42px 38px',
            borderColor: 'var(--osd-accent)',
            boxShadow: '0 0 0 8px rgba(0, 220, 130, 0.055)',
          }}
        >
          <div
            style={{
              position: 'absolute',
              left: 32,
              top: -24,
              padding: '10px 17px',
              border: '2px solid var(--osd-accent)',
              borderRadius: 999,
              background: 'var(--osd-bg)',
              color: 'var(--osd-accent)',
              fontFamily: fonts.mono,
              fontSize: 23,
              fontWeight: 800,
            }}
          >
            PUBLIC API · shared component
          </div>
          <div
            style={{
              position: 'absolute',
              right: 34,
              top: 25,
              color: palette.muted,
              fontSize: 22,
              fontWeight: 800,
              letterSpacing: '0.07em',
            }}
          >
            ONE SHARED RESPONSIBILITY
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 28 }}>
            <ResponsibilityTile index="01" title="UI control" detail="顯示資料與回報互動" />
            <ResponsibilityTile index="02" title="Form adapter" detail="表單狀態 · 驗證 · 錯誤處理" />
            <ResponsibilityTile
              index="03"
              title="Server-data owner"
              detail="資料源 · 轉換 · 載入狀態"
            />
          </div>
        </div>
      </section>
    </div>
  </CaseFrame>
);

const PressureChip = ({
  title,
  detail,
  style,
}: {
  title: string;
  detail: string;
  style: CSSProperties;
}) => (
  <div
    style={{
      ...panelStyle,
      ...style,
      position: 'absolute',
      width: 286,
      minHeight: 112,
      padding: '20px 22px',
      borderStyle: 'dashed',
      background: palette.whiteSoft,
    }}
  >
    <div style={{ display: 'flex', alignItems: 'center', gap: 11 }}>
      <span aria-hidden="true" style={{ color: 'var(--osd-accent)', fontSize: 25, fontWeight: 800 }}>
        ＋
      </span>
      <strong style={{ color: palette.textSoft, fontSize: 27 }}>{title}</strong>
    </div>
    <div style={{ marginTop: 8, color: palette.muted, fontSize: 22, fontWeight: 600 }}>{detail}</div>
  </div>
);

const ConsequenceBadge = ({ symbol, title }: { symbol: string; title: string }) => (
  <div
    style={{
      width: 350,
      height: 82,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 14,
      border: `2px dashed ${palette.borderStrong}`,
      borderRadius: 16,
      background: palette.whiteSoft,
      color: palette.textSoft,
      fontSize: 27,
      fontWeight: 800,
    }}
  >
    <span aria-hidden="true" style={{ color: 'var(--osd-accent)', fontSize: 30 }}>
      {symbol}
    </span>
    {title}
  </div>
);

const PrematureSharedConsequence: Page = () => (
  <CaseFrame>
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', gap: 24 }}>
      <PageHeading
        title="這個元件破破爛爛，但總有人在縫縫補補"
        lead="例外愈加愈多，無法獨立迭代"
      />

      <section
        aria-label="共用元件外圍增生 wrapper 與例外 props，仍無法脫離 form 或替換資料來源"
        style={{ position: 'relative', flex: 1, minHeight: 0 }}
      >
        <svg
          aria-hidden="true"
          viewBox="0 0 1680 500"
          preserveAspectRatio="none"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
        >
          <path d="M300 154 L435 206" fill="none" stroke={palette.borderStrong} strokeWidth="3" strokeDasharray="9 10" />
          <path d="M1380 114 L1245 196" fill="none" stroke={palette.borderStrong} strokeWidth="3" strokeDasharray="9 10" />
          <path d="M1380 322 L1245 284" fill="none" stroke={palette.borderStrong} strokeWidth="3" strokeDasharray="9 10" />
        </svg>

        <PressureChip title="外層 wrapper" detail="把舊 contract 再包一層" style={{ left: 16, top: 96 }} />
        <PressureChip title="例外 prop" detail="為新情境繼續開洞" style={{ right: 16, top: 44 }} />
        <PressureChip title="更多條件分支" detail="責任仍留在同一處" style={{ right: 16, top: 352 }} />

        <div
          style={{
            ...panelStyle,
            position: 'absolute',
            left: 435,
            top: 74,
            width: 810,
            height: 300,
            padding: '70px 42px 34px',
            borderColor: 'var(--osd-accent)',
            background: palette.accentSoft,
          }}
        >
          <div
            style={{
              position: 'absolute',
              left: 28,
              top: 18,
              color: 'var(--osd-accent)',
              fontFamily: fonts.mono,
              fontSize: 23,
              fontWeight: 800,
            }}
          >
            SHARED COMPONENT · RESPONSIBILITIES STILL COUPLED
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
            <ResponsibilityTile index="UI" title="Control" detail="presentation" accent compact />
            <ResponsibilityTile index="F" title="Form" detail="binding policy" compact />
            <ResponsibilityTile index="S" title="Server" detail="data policy" compact />
          </div>
        </div>

        <div
          style={{
            position: 'absolute',
            left: 472,
            bottom: 0,
            display: 'flex',
            gap: 36,
          }}
        >
          <ConsequenceBadge symbol="×" title="無法脫離 form" />
          <ConsequenceBadge symbol="×" title="難以替換 data source" />
        </div>
      </section>
    </div>
  </CaseFrame>
);

const ProbeRoute = ({
  symbol,
  title,
  detail,
  accent = false,
  style,
}: {
  symbol: string;
  title: string;
  detail: ReactNode;
  accent?: boolean;
  style: CSSProperties;
}) => (
  <div
    style={{
      ...panelStyle,
      ...style,
      position: 'absolute',
      width: 680,
      height: 170,
      padding: '26px 32px',
      display: 'grid',
      gridTemplateColumns: '64px 1fr',
      alignItems: 'center',
      gap: 24,
      borderColor: accent ? 'var(--osd-accent)' : palette.borderStrong,
      borderStyle: accent ? 'solid' : 'dashed',
      background: accent ? palette.accentSoft : palette.whiteSoft,
    }}
  >
    <span
      aria-hidden="true"
      style={{
        width: 56,
        height: 56,
        display: 'grid',
        placeItems: 'center',
        border: `2px ${accent ? 'solid' : 'dashed'} ${
          accent ? 'var(--osd-accent)' : palette.borderStrong
        }`,
        borderRadius: 16,
        color: accent ? 'var(--osd-accent)' : palette.textSoft,
        fontSize: 30,
        fontWeight: 800,
      }}
    >
      {symbol}
    </span>
    <div>
      <strong style={{ color: accent ? 'var(--osd-accent)' : palette.textSoft, fontSize: 31 }}>
        {title}
      </strong>
      <div style={{ marginTop: 10, color: palette.muted, fontSize: 24, fontWeight: 600, lineHeight: 1.35 }}>
        {detail}
      </div>
    </div>
  </div>
);

const SecondConsumerProbe: Page = () => (
  <CaseFrame categoryLabel="合成案例" categorySymbol="△">
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', gap: 24 }}>
      <PageHeading
        title="問題來了...第二個要用的根本不是表單"
        lead="它只需要相同 UI；被迫繼承 form 與 data policy。"
      />

      <section
        aria-label="合成的非表單 consumer 對過早共享與責任分離兩條路施壓"
        style={{ position: 'relative', flex: 1, minHeight: 0 }}
      >
        <svg
          aria-hidden="true"
          viewBox="0 0 1680 500"
          preserveAspectRatio="none"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
        >
          <path d="M520 246 L790 128" fill="none" stroke={palette.borderStrong} strokeWidth="4" strokeDasharray="11 10" />
          <path d="M520 246 L790 366" fill="none" stroke="var(--osd-accent)" strokeWidth="4" strokeDasharray="11 10" />
          <path d="M772 118 L792 127 L777 142" fill="none" stroke={palette.borderStrong} strokeWidth="4" />
          <path d="M776 351 L792 367 L770 373" fill="none" stroke="var(--osd-accent)" strokeWidth="4" />
        </svg>

        <div
          style={{
            ...panelStyle,
            position: 'absolute',
            left: 52,
            top: 126,
            width: 468,
            height: 244,
            padding: 34,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            borderStyle: 'dashed',
          }}
        >
          <div style={{ color: palette.muted, fontSize: 22, fontWeight: 800, letterSpacing: '0.08em' }}>
            SYNTHETIC PRESSURE TEST
          </div>
          <strong style={{ color: 'var(--osd-text)', fontSize: 38, lineHeight: 1.2 }}>非表單情境</strong>
          <div style={{ color: palette.textSoft, fontSize: 26, fontWeight: 600, lineHeight: 1.4 }}>
            需要 options、value 與互動
            <br />
            不需要 form context
          </div>
        </div>

        <div
          style={{
            position: 'absolute',
            left: 700,
            top: 102,
            color: palette.muted,
            fontFamily: fonts.mono,
            fontSize: 22,
            fontWeight: 800,
          }}
        >import 一整包</div>
        <div
          style={{
            position: 'absolute',
            left: 700,
            top: 366,
            color: 'var(--osd-accent)',
            fontFamily: fonts.mono,
            fontSize: 22,
            fontWeight: 800,
          }}
        >
          import UI
        </div>

        <ProbeRoute
          symbol="×"
          title="繼承整包抽象"
          detail="被迫建立假表單，或再加入 wrapper／例外 props。"
          style={{ right: 52, top: 42 }}
        />
        <ProbeRoute
          symbol="✓"
          title="只重用 UI"
          detail="元件自己擁有狀態與資料來源。"
          accent
          style={{ right: 52, bottom: 26 }}
        />
      </section>
    </div>
  </CaseFrame>
);

const OwnerTile = ({
  eyebrow,
  title,
  detail,
  style,
}: {
  eyebrow: string;
  title: string;
  detail: ReactNode;
  style: CSSProperties;
}) => (
  <div
    style={{
      ...panelStyle,
      ...style,
      position: 'absolute',
      width: 760,
      height: 150,
      padding: '24px 28px',
      display: 'grid',
      gridTemplateColumns: '280px 1fr',
      alignItems: 'center',
      gap: 24,
      borderColor: palette.borderStrong,
    }}
  >
    <div>
      <div style={{ color: palette.muted, fontSize: 22, fontWeight: 800, letterSpacing: '0.07em' }}>
        {eyebrow}
      </div>
      <strong style={{ display: 'block', marginTop: 8, color: palette.textSoft, fontSize: 29 }}>
        {title}
      </strong>
    </div>
    <div style={{ color: palette.textSoft, fontSize: 24, fontWeight: 600, lineHeight: 1.4 }}>{detail}</div>
  </div>
);

const ResponsibilityCorrection: Page = () => (
  <CaseFrame categoryLabel="現行官方 guidance／講者詮釋" categorySymbol="◈">
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', gap: 22 }}>
      <PageHeading
        title="拆分三個可獨立迭代的部分"
        lead="在對應的 page 組合；只有已穩定、可重用的 UI 合約 才下移 features / entities / shared。"
      />

      <section
        aria-label="Server-data owner 與 form adapter 留在 owning page 或 feature，透過 runtime data flow 使用具名 Public API 的 UI control"
        style={{ position: 'relative', flex: 1, minHeight: 0 }}
      >
        <svg
          aria-hidden="true"
          viewBox="0 0 1680 500"
          preserveAspectRatio="none"
          style={{ position: 'absolute', inset: 0, zIndex: 4, width: '100%', height: '100%' }}
        >
          <path d="M840 154 L1198 190" fill="none" stroke="var(--osd-accent)" strokeWidth="4" />
          <path d="M840 290 L1198 302" fill="none" stroke="var(--osd-accent)" strokeWidth="4" />
          <path d="M1180 178 L1200 190 L1180 200" fill="none" stroke="var(--osd-accent)" strokeWidth="4" />
          <path d="M1180 291 L1200 302 L1180 313" fill="none" stroke="var(--osd-accent)" strokeWidth="4" />
          <path
            d="M930 60 L1424 60 L1424 90 M1424 135 L1424 156"
            fill="none"
            stroke={palette.textSoft}
            strokeWidth="3"
            strokeDasharray="11 10"
          />
          <path d="M1411 142 L1424 160 L1437 142" fill="none" stroke={palette.textSoft} strokeWidth="3" />
        </svg>

        <div
          style={{
            ...panelStyle,
            position: 'absolute',
            left: 22,
            top: 22,
            zIndex: 1,
            width: 930,
            height: 440,
            borderColor: palette.borderStrong,
            borderStyle: 'dashed',
          }}
        >
          <div
            style={{
              position: 'absolute',
              left: 28,
              top: 18,
              color: palette.muted,
              fontSize: 22,
              fontWeight: 800,
              letterSpacing: '0.08em',
            }}
          >由 PAGE 管理</div>
          <OwnerTile
            eyebrow="RESPONSIBILITY 01"
            title="Server-data owner"
            detail="載入資料、資料轉換、載入狀態／錯誤處理。"
            style={{ left: 62, top: 82 }}
          />
          <OwnerTile
            eyebrow="RESPONSIBILITY 02"
            title="Form adapter"
            detail="綁定 field state、validation 與 error presentation。"
            style={{ left: 62, top: 266 }}
          />
        </div>

        <div
          style={{
            ...panelStyle,
            position: 'absolute',
            right: 30,
            top: 112,
            zIndex: 3,
            width: 452,
            height: 350,
            padding: '76px 34px 32px',
            borderColor: 'var(--osd-accent)',
            background: palette.accentSoft,
            boxShadow: '0 0 0 8px rgba(0, 220, 130, 0.055)',
          }}
        >
          <div
            style={{
              position: 'absolute',
              left: '50%',
              top: -22,
              width: 420,
              transform: 'translateX(-50%)',
              padding: '8px 13px',
              border: '2px solid var(--osd-accent)',
              borderRadius: 999,
              background: 'var(--osd-bg)',
              color: 'var(--osd-accent)',
              fontFamily: fonts.mono,
              fontSize: 22,
              fontWeight: 800,
              textAlign: 'center',
            }}
          >
            PUBLIC API · controlledControl
          </div>
          <strong style={{ color: 'var(--osd-accent)', fontSize: 34 }}>UI control</strong>
          <div
            style={{
              marginTop: 20,
              color: palette.textSoft,
              fontFamily: fonts.mono,
              fontSize: 22,
              fontWeight: 700,
              lineHeight: 1.55,
            }}
          >
            options · value · loading
            <br />
            onChange
          </div>
          <div style={{ marginTop: 14, color: palette.muted, fontSize: 22, fontWeight: 600 }}>
            不知道 form library／endpoint
          </div>
        </div>

        <div
          style={{
            position: 'absolute',
            left: 944,
            top: 132,
            zIndex: 4,
            color: 'var(--osd-accent)',
            fontFamily: fonts.mono,
            fontSize: 22,
            fontWeight: 800,
          }}
        >
          options + loading
        </div>
        <div
          style={{
            position: 'absolute',
            left: 962,
            top: 326,
            zIndex: 4,
            color: 'var(--osd-accent)',
            fontFamily: fonts.mono,
            fontSize: 22,
            fontWeight: 800,
          }}
        >
          value / onChange
        </div>
        <div
          style={{
            position: 'absolute',
            left: 1010,
            top: 38,
            zIndex: 4,
            color: palette.textSoft,
            fontFamily: fonts.mono,
            fontSize: 22,
            fontWeight: 800,
          }}
        >{'透過 Public API import '}</div>
      </section>
    </div>
  </CaseFrame>
);

const FeatureSchemaCard = ({
  feature,
  schemaName,
  localFields,
  passwordField,
}: {
  feature: string;
  schemaName: string;
  localFields: string;
  passwordField: string;
}) => (
  <div
    style={{
      ...panelStyle,
      width: 470,
      height: 395,
      padding: '72px 30px 28px',
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      gap: 18,
      borderColor: palette.borderStrong,
    }}
  >
    <div
      style={{
        position: 'absolute',
        left: 26,
        top: 18,
        color: palette.muted,
        fontSize: 22,
        fontWeight: 800,
        letterSpacing: '0.08em',
      }}
    >
      {feature}
    </div>
    <strong style={{ color: palette.textSoft, fontFamily: fonts.mono, fontSize: 30 }}>
      {schemaName}
    </strong>
    <div
      style={{
        padding: '16px 20px',
        border: `1px solid ${palette.borderStrong}`,
        borderRadius: 14,
        background: palette.whiteSoft,
      }}
    >
      <div style={{ color: palette.muted, fontSize: 20, fontWeight: 800, letterSpacing: '0.06em' }}>
        本地欄位組合
      </div>
      <div
        style={{
          marginTop: 8,
          color: palette.textSoft,
          fontFamily: fonts.mono,
          fontSize: 24,
          fontWeight: 700,
        }}
      >
        {localFields}
      </div>
    </div>
    <div
      style={{
        padding: '16px 20px',
        border: `1px dashed ${palette.accentLine}`,
        borderRadius: 14,
        background: palette.accentSoft,
      }}
    >
      <div
        style={{ color: 'var(--osd-accent)', fontSize: 20, fontWeight: 800, letterSpacing: '0.06em' }}
      >
        共用 password 規則
      </div>
      <div
        style={{
          marginTop: 8,
          color: 'var(--osd-accent)',
          fontFamily: fonts.mono,
          fontSize: 24,
          fontWeight: 700,
        }}
      >
        {passwordField}
      </div>
    </div>
  </div>
);

const ValidSchemaOwnership: Page = () => (
  <CaseFrame>
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', gap: 26 }}>
      <PageHeading
        title="案例二：註冊、登入、修改密碼各有不同 schema"
        lead="欄位組合不同、驗證條件也不同，完整 schema 本來就不該共用一份。"
      />

      <section
        aria-label="註冊、登入、修改密碼各自擁有不同完整 schema，卻都套用同一項 password 欄位規則"
        style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 30 }}
      >
        <div style={{ display: 'flex', justifyContent: 'center', gap: 34 }}>
          <FeatureSchemaCard
            feature="註冊"
            schemaName="registerSchema"
            localFields="email · nickname"
            passwordField="password"
          />
          <FeatureSchemaCard
            feature="登入"
            schemaName="loginSchema"
            localFields="email · rememberMe"
            passwordField="password"
          />
          <FeatureSchemaCard
            feature="修改密碼"
            schemaName="changePasswordSchema"
            localFields="currentPassword"
            passwordField="newPassword"
          />
        </div>
        <div
          style={{
            alignSelf: 'center',
            padding: '13px 24px',
            border: `1px dashed ${palette.borderStrong}`,
            borderRadius: 999,
            color: palette.textSoft,
            fontSize: 25,
            fontWeight: 800,
          }}
        >
          完整 schema 不同 <span style={{ color: palette.dim, padding: '0 12px' }}>≠</span> password
          規則也要各自複製
        </div>
      </section>
    </div>
  </CaseFrame>
);

const RuleCopyCard = ({
  owner,
  version,
  status,
  symbol,
  accent = false,
}: {
  owner: string;
  version: string;
  status: string;
  symbol: string;
  accent?: boolean;
}) => (
  <div
    style={{
      ...panelStyle,
      width: 430,
      height: 250,
      padding: 30,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      borderColor: accent ? 'var(--osd-accent)' : palette.borderStrong,
      borderStyle: accent ? 'solid' : 'dashed',
      background: accent ? palette.accentSoft : palette.whiteSoft,
    }}
  >
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <span style={{ color: palette.muted, fontSize: 22, fontWeight: 800, letterSpacing: '0.07em' }}>
        {owner}
      </span>
      <span
        aria-hidden="true"
        style={{
          width: 42,
          height: 42,
          display: 'grid',
          placeItems: 'center',
          border: `2px ${accent ? 'solid' : 'dashed'} ${
            accent ? 'var(--osd-accent)' : palette.borderStrong
          }`,
          borderRadius: 12,
          color: accent ? 'var(--osd-accent)' : palette.textSoft,
          fontSize: 24,
          fontWeight: 800,
        }}
      >
        {symbol}
      </span>
    </div>
    <strong
      style={{
        color: accent ? 'var(--osd-accent)' : palette.textSoft,
        fontFamily: fonts.mono,
        fontSize: 34,
      }}
    >
      {version}
    </strong>
    <div style={{ color: palette.textSoft, fontSize: 25, fontWeight: 700 }}>{status}</div>
  </div>
);

const ValidationDrift: Page = () => (
  <CaseFrame>
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', gap: 24 }}>
      <PageHeading
        title="同一規則被複製；修改一次，行為卻開始分岔"
        lead="有些檔案被更新，有些被漏掉，甚至很難知道還有哪些地方必須同步。"
      />

      <section
        aria-label="語意相同的欄位規則副本在部分 feature 更新後產生 validation drift"
        style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 32 }}
      >
        <div
          style={{
            width: 1380,
            padding: '16px 24px',
            border: `1px solid ${palette.borderStrong}`,
            borderRadius: 16,
            background: palette.whiteSoft,
            color: palette.textSoft,
            fontSize: 26,
            fontWeight: 800,
            textAlign: 'center',
          }}
        >{'同一項欄位規則改變 '}</div>

        <div style={{ display: 'flex', gap: 36 }}>
          <RuleCopyCard owner="註冊" version="password · NEW" status="這份已更新" symbol="✓" accent />
          <RuleCopyCard owner="登入" version="password · OLD" status="這份仍是舊行為" symbol="!" />
          <RuleCopyCard owner="修改密碼" version="password · ?" status="影響範圍難發現" symbol="?" />
        </div>

        <div
          style={{
            width: 1380,
            padding: '18px 26px',
            border: '2px dashed rgba(248, 113, 113, 0.62)',
            borderRadius: 18,
            background: 'rgba(248, 113, 113, 0.12)',
            color: palette.textSoft,
            fontSize: 28,
            fontWeight: 800,
            textAlign: 'center',
          }}
        >
          <span style={{ color: '#F87171' }}>卻有不同驗證行為</span>
        </div>
      </section>
    </div>
  </CaseFrame>
);

const SchemaOwnerMini = ({ name, detail }: { name: string; detail: string }) => (
  <div
    style={{
      ...panelStyle,
      width: 390,
      height: 138,
      padding: '22px 26px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      borderColor: palette.borderStrong,
    }}
  >
    <strong style={{ color: palette.textSoft, fontFamily: fonts.mono, fontSize: 27 }}>{name}</strong>
    <span style={{ color: palette.muted, fontSize: 22, fontWeight: 700 }}>{detail}</span>
  </div>
);

const FieldRuleImportArrow = ({ left }: { left: number }) => (
  <div
    aria-hidden="true"
    style={{
      position: 'absolute',
      left,
      top: 148,
      zIndex: 4,
      height: 140,
    }}
  >
    <span
      style={{
        position: 'absolute',
        left: 0,
        top: 0,
        height: 140,
        borderLeft: '3px dashed var(--osd-accent)',
      }}
    />
    <span
      style={{
        position: 'absolute',
        left: 16,
        top: 58,
        padding: '5px 9px',
        border: `1px solid ${palette.accentLine}`,
        borderRadius: 999,
        background: 'var(--osd-bg)',
        color: 'var(--osd-accent)',
        fontFamily: fonts.mono,
        fontSize: 22,
        fontWeight: 800,
        whiteSpace: 'nowrap',
      }}
    >
      Import
    </span>
    <span
      style={{
        position: 'absolute',
        left: -10,
        bottom: -8,
        color: 'var(--osd-accent)',
        fontSize: 22,
        lineHeight: 1,
      }}
    >
      ▼
    </span>
  </div>
);

const StableRuleCorrection: Page = () => (
  <CaseFrame categoryLabel="現行官方 guidance／講者詮釋" categorySymbol="◈">
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', gap: 22 }}>
      <PageHeading
        title="保留完整 schema；只下移已證明必須一致的 rule"
        lead="共享的是某一條穩定規則，不把所有 feature 驗證，合成一個通用 schema。"
      />

      <section
        aria-label="三個 feature schema 經具名 Public API 靜態依賴同一個 lower domain boundary field rule"
        style={{ position: 'relative', flex: 1, minHeight: 0 }}
      >
        <div style={{ position: 'absolute', left: 40, top: 10, zIndex: 3, display: 'flex', gap: 90 }}>
          <SchemaOwnerMini name="註冊 schema" detail="保留本地欄位組合" />
          <SchemaOwnerMini name="登入 schema" detail="保留本地欄位組合" />
          <SchemaOwnerMini name="修改密碼 schema" detail="保留本地欄位組合" />
        </div>

        <FieldRuleImportArrow left={235} />
        <FieldRuleImportArrow left={715} />
        <FieldRuleImportArrow left={1195} />

        <div
          style={{
            ...panelStyle,
            position: 'absolute',
            left: 190,
            top: 320,
            zIndex: 3,
            width: 1050,
            height: 150,
            padding: '58px 32px 14px',
            borderColor: 'var(--osd-accent)',
            background: palette.accentSoft,
            boxShadow: '0 0 0 8px rgba(0, 220, 130, 0.055)',
            textAlign: 'center',
          }}
        >
          <div
            style={{
              position: 'absolute',
              left: 25,
              top: -22,
              zIndex: 5,
              width: 1000,
              padding: '8px 13px',
              border: '2px solid var(--osd-accent)',
              borderRadius: 999,
              background: 'var(--osd-bg)',
              color: 'var(--osd-accent)',
              fontFamily: fonts.mono,
              fontSize: 22,
              fontWeight: 800,
              textAlign: 'center',
            }}
          >
            PUBLIC API · User Entity
          </div>
          <strong style={{ color: 'var(--osd-accent)', fontSize: 30 }}>共用的欄位規則</strong>
          <div style={{ marginTop: 6, color: palette.textSoft, fontSize: 22, fontWeight: 700 }}>
            適當下移層級
          </div>
        </div>

      </section>
    </div>
  </CaseFrame>
);

const AuthScopeCard = ({
  eyebrow,
  title,
  detail,
  accent = false,
}: {
  eyebrow: string;
  title: string;
  detail: ReactNode;
  accent?: boolean;
}) => (
  <div
    style={{
      width: 500,
      height: 210,
      padding: '28px 30px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      border: `2px ${accent ? 'dashed' : 'solid'} ${
        accent ? 'var(--osd-accent)' : palette.borderStrong
      }`,
      borderRadius: 18,
      background: accent ? palette.accentSoft : palette.whiteSoft,
    }}
  >
    <div
      style={{
        color: accent ? 'var(--osd-accent)' : palette.muted,
        fontSize: 22,
        fontWeight: 800,
        letterSpacing: '0.08em',
      }}
    >
      {eyebrow}
    </div>
    <strong style={{ color: palette.textSoft, fontSize: 34, lineHeight: 1.15 }}>{title}</strong>
    <div style={{ color: palette.muted, fontSize: 24, fontWeight: 600, lineHeight: 1.4 }}>
      {detail}
    </div>
  </div>
);

const AuthOwnershipMistake: Page = () => (
  <CaseFrame>
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', gap: 24 }}>
      <PageHeading
        title="案例三：Login 功能錯誤擁有 app 層級的 token"
        lead="一次登入行為，卻管理了整個 application 的 auth state。"
      />

      <section
        aria-label="features login 同時包住 login behavior 與 app-wide token 的錯誤責任邊界"
        style={{ flex: 1, display: 'grid', placeItems: 'center' }}
      >
        <div
          style={{
            ...panelStyle,
            position: 'relative',
            width: 1320,
            height: 400,
            padding: '96px 56px 42px',
            borderColor: palette.borderStrong,
            borderStyle: 'dashed',
          }}
        >
          <div
            style={{
              position: 'absolute',
              left: 34,
              top: 22,
              color: palette.textSoft,
              fontFamily: fonts.mono,
              fontSize: 24,
              fontWeight: 800,
            }}
          >
            features/login/ · ONE FEATURE BOUNDARY
          </div>
          <div
            style={{
              position: 'absolute',
              right: 34,
              top: 20,
              padding: '8px 14px',
              border: `1px dashed ${palette.accentLine}`,
              borderRadius: 999,
              color: 'var(--osd-accent)',
              fontSize: 22,
              fontWeight: 800,
            }}
          >
            OWNER MISMATCH · !
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 42 }}>
            <AuthScopeCard
              eyebrow="USER ACTION"
              title="Login"
              detail="取得憑證、處理登入結果"
            />
            <div
              style={{
                width: 106,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 8,
                color: 'var(--osd-accent)',
                fontSize: 22,
                fontWeight: 800,
                textAlign: 'center',
              }}
            >
              <span>stores</span>
              <span aria-hidden="true" style={{ fontSize: 42, lineHeight: 0.8 }}>
                →
              </span>
            </div>
            <AuthScopeCard
              eyebrow="APP-WIDE STATE"
              title="Token"
              detail="生命週期跨越單次登入行為"
              accent
            />
          </div>

          <div
            style={{
              position: 'absolute',
              left: 300,
              bottom: 18,
              width: 720,
              color: palette.textSoft,
              fontSize: 24,
              fontWeight: 800,
              textAlign: 'center',
            }}
          >
            行為的完成點 <span style={{ color: palette.dim, padding: '0 12px' }}>≠</span>
            狀態的 owner
          </div>
        </div>
      </section>
    </div>
  </CaseFrame>
);

const FailurePathCard = ({
  eyebrow,
  title,
  children,
  danger = false,
}: {
  eyebrow: string;
  title: string;
  children: ReactNode;
  danger?: boolean;
}) => (
  <div
    style={{
      ...panelStyle,
      width: 1100,
      height: 360,
      padding: '32px 34px',
      display: 'flex',
      flexDirection: 'column',
      gap: 22,
      borderColor: danger ? palette.dangerLine : palette.borderStrong,
      borderStyle: 'dashed',
      ...(danger
        ? { background: `linear-gradient(145deg, ${palette.dangerSoft}, ${palette.panel})` }
        : {}),
    }}
  >
    <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
      <strong style={{ color: danger ? palette.danger : palette.textSoft, fontSize: 34 }}>{title}</strong>
      <span
        style={{
          color: danger ? palette.danger : palette.muted,
          fontSize: 22,
          fontWeight: 800,
          letterSpacing: '0.07em',
        }}
      >
        {eyebrow}
      </span>
    </div>
    {children}
  </div>
);

const FailureDependencyRow = ({
  consumer,
  destination,
  violation,
}: {
  consumer: string;
  destination: string;
  violation: string;
}) => (
  <div
    style={{
      height: 82,
      display: 'grid',
      gridTemplateColumns: '240px 140px 1fr',
      alignItems: 'center',
      gap: 12,
    }}
  >
    <div
      style={{
        padding: '15px 17px',
        border: `1px solid ${palette.borderStrong}`,
        borderRadius: 14,
        background: palette.whiteSoft,
        color: palette.textSoft,
        fontFamily: fonts.mono,
        fontSize: 22,
        fontWeight: 700,
        textAlign: 'center',
      }}
    >
      {consumer}
    </div>
    <div
      style={{
        color: palette.danger,
        fontFamily: fonts.mono,
        fontSize: 20,
        fontWeight: 800,
        textAlign: 'center',
      }}
    >
      <span>import</span>
      <div aria-hidden="true" style={{ marginTop: 3, fontSize: 31, lineHeight: 0.8 }}>
        ┄→
      </div>
    </div>
    <div
      style={{
        minWidth: 0,
        padding: '10px 12px',
        border: `1px solid ${palette.dangerLine}`,
        borderRadius: 14,
        background: palette.dangerSoft,
        color: palette.textSoft,
        textAlign: 'center',
      }}
    >
      <div style={{ fontFamily: fonts.mono, fontSize: 20, fontWeight: 800 }}>{destination}</div>
      <div style={{ marginTop: 4, color: palette.danger, fontSize: 18, fontWeight: 800 }}>
        {violation}
      </div>
    </div>
  </div>
);

const AuthOwnershipConsequence: Page = () => (
  <CaseFrame>
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', gap: 26 }}>
      <PageHeading
        title="Token 錯放在 Login Feature，被迫變不當依賴"
        lead="新 Feature 不應直接依賴同層 login slice；Shared API 也不能向上依賴 Feature。"
      />

      <section
        aria-label="新增 feature 對 login slice 的 same-layer cross-import，以及 shared api 對 login feature 的 upward import"
        style={{ flex: 1, display: 'grid', placeItems: 'center' }}
      >
        <FailurePathCard eyebrow="TWO INVALID PATHS" title="其他 consumers 無法沿著正常依賴方向取得 token" danger>
          <FailureDependencyRow
            consumer="新增 feature"
            destination="features/login/"
            violation="same-layer cross-import"
          />
          <FailureDependencyRow
            consumer="shared/api"
            destination="features/login/"
            violation="upward import"
          />
          <div style={{ color: palette.danger, fontSize: 22, fontWeight: 800, textAlign: 'center' }}>管理方放錯層級，使用方就找不到合法的依賴路徑</div>
        </FailurePathCard>
      </section>
    </div>
  </CaseFrame>
);

const AuthConsumerBox = ({
  eyebrow,
  title,
  detail,
  style,
}: {
  eyebrow: string;
  title: string;
  detail: string;
  style: CSSProperties;
}) => (
  <div
    style={{
      ...panelStyle,
      ...style,
      position: 'absolute',
      width: 520,
      height: 160,
      padding: '20px 28px',
      borderColor: palette.borderStrong,
    }}
  >
    <div style={{ color: palette.muted, fontSize: 22, fontWeight: 800, letterSpacing: '0.08em' }}>
      {eyebrow}
    </div>
    <strong style={{ display: 'block', marginTop: 8, color: palette.textSoft, fontSize: 30 }}>
      {title}
    </strong>
    <div style={{ marginTop: 5, color: palette.muted, fontSize: 22, fontWeight: 600, lineHeight: 1.4 }}>{detail}</div>
  </div>
);

const AuthDependencyCue = ({ left }: { left: number }) => (
  <div
    style={{
      position: 'absolute',
      left,
      top: 184,
      zIndex: 3,
      width: 260,
      color: 'var(--osd-accent)',
      fontFamily: fonts.mono,
      fontSize: 22,
      fontWeight: 800,
      textAlign: 'center',
    }}
  >
    <div>依賴 shared/auth</div>
    <div aria-hidden="true" style={{ marginTop: 4, fontSize: 38, lineHeight: 1 }}>
      ↓
    </div>
  </div>
);

const AuthOwnershipCorrection: Page = () => (
  <CaseFrame categoryLabel="現行官方 guidance／匿名真實案例" categorySymbol="◈">
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', gap: 22 }}>
      <PageHeading
        title="Login 使用 auth state；不擁有它"
        lead="本案例的 simple token／session，由穩定的 shared/auth 管理。"
      />

      <section
        aria-label="Login 與其他 authenticated flows 向下依賴 shared auth Public API 的 ownership correction"
        style={{ position: 'relative', flex: 1, minHeight: 0 }}
      >
        <AuthConsumerBox
          eyebrow="USER ACTION"
          title="features/login/"
          detail="登入成功後，使用 auth contract 更新狀態"
          style={{ left: 170, top: 10 }}
        />
        <AuthConsumerBox
          eyebrow="OTHER AUTHENTICATED FLOWS"
          title="其他 consumers"
          detail="透過同一 contract 讀取 current state"
          style={{ right: 170, top: 10 }}
        />

        <AuthDependencyCue left={300} />
        <AuthDependencyCue left={1120} />

        <div
          style={{
            ...panelStyle,
            position: 'absolute',
            left: 365,
            top: 286,
            zIndex: 3,
            width: 950,
            height: 166,
            padding: '58px 34px 24px',
            borderColor: 'var(--osd-accent)',
            background: palette.accentSoft,
            boxShadow: '0 0 0 8px rgba(0, 220, 130, 0.055)',
            textAlign: 'center',
          }}
        >
          <div
            style={{
              position: 'absolute',
              left: 25,
              top: -22,
              width: 900,
              padding: '8px 13px',
              border: '2px solid var(--osd-accent)',
              borderRadius: 999,
              background: 'var(--osd-bg)',
              color: 'var(--osd-accent)',
              fontFamily: fonts.mono,
              fontSize: 22,
              fontWeight: 800,
            }}
          >
            PUBLIC API · shared/auth
          </div>
          <strong style={{ color: 'var(--osd-accent)', fontSize: 34 }}>Auth state owner</strong>
          <div style={{ marginTop: 13, color: palette.textSoft, fontSize: 25, fontWeight: 700 }}>auth tokens · session ID</div>
        </div>

        <div
          style={{
            position: 'absolute',
            right: 8,
            bottom: 0,
            padding: '9px 15px',
            border: `1px dashed ${palette.accentLine}`,
            borderRadius: 999,
            color: palette.textSoft,
            fontSize: 22,
            fontWeight: 800,
          }}
        >
          此情境決策僅供參考，不等於所有 auth 的標準答案
        </div>
      </section>
    </div>
  </CaseFrame>
);

const IocCriterion = ({ children }: { children: ReactNode }) => (
  <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12, color: palette.textSoft, fontSize: 24, fontWeight: 700, lineHeight: 1.4 }}>
    <span aria-hidden="true" style={{ color: 'var(--osd-accent)', fontSize: 20, lineHeight: 1.6 }}>◆</span>
    <span>{children}</span>
  </div>
);

const IocPathCard = ({
  layer,
  role,
  question,
  first,
  second,
  third,
  example,
  accent = false,
}: {
  layer: string;
  role: string;
  question: string;
  first: string;
  second: string;
  third: string;
  example: string;
  accent?: boolean;
}) => (
  <div
    style={{
      ...panelStyle,
      boxSizing: 'border-box',
      width: 690,
      height: 390,
      padding: '28px 32px',
      display: 'flex',
      flexDirection: 'column',
      borderColor: accent ? 'var(--osd-accent)' : palette.borderStrong,
      background: accent ? palette.accentSoft : `linear-gradient(145deg, ${palette.panelStrong}, ${palette.panel})`,
      boxShadow: accent ? '0 0 0 8px rgba(0, 220, 130, 0.055)' : undefined,
    }}
  >
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 20 }}>
      <span style={{ color: 'var(--osd-accent)', fontSize: 22, fontWeight: 900, letterSpacing: '0.1em' }}>{layer}</span>
      <span style={{ padding: '7px 12px', border: `1px solid ${palette.accentLine}`, borderRadius: 999, color: palette.textSoft, fontSize: 19, fontWeight: 800, letterSpacing: '0.06em' }}>{role}</span>
    </div>
    <strong style={{ marginTop: 22, color: 'var(--osd-text)', fontSize: 32, fontWeight: 800, lineHeight: 1.3 }}>{question}</strong>
    <div style={{ marginTop: 24, display: 'flex', flexDirection: 'column', gap: 10 }}>
      <IocCriterion>{first}</IocCriterion>
      <IocCriterion>{second}</IocCriterion>
      <IocCriterion>{third}</IocCriterion>
    </div>
    <div style={{ marginTop: 'auto', paddingTop: 15, borderTop: `1px solid ${palette.borderStrong}`, color: 'var(--osd-accent)', fontSize: 21, fontWeight: 800 }}>
      {example}
    </div>
  </div>
);

const AuthWiring: Page = () => (
  <CaseFrame categoryLabel="現行官方 guidance／講者詮釋" categorySymbol="◈">
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', gap: 24 }}>
      <PageHeading
        title="遇到 dependency 問題：一定要下移嗎？"
        lead="不一定。先分辨：你要改變 ownership，還是只改變組裝方式？"
      />

      <section
        aria-label="面對跨模組 dependency 時，比較下移 ownership 與在 App 透過 IoC 組裝兩條路"
        style={{ flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 32 }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 24 }}>
          <IocPathCard
            layer="LOWER LAYER"
            role="MOVE OWNERSHIP"
            question="這真的能穩定、可預期的被管理嗎？"
            first="語意穩定，可被下層自然擁有"
            second="多個使用方共用相同 contract"
            third="下移後不帶上層的業務工作"
            example="例：多個頁面共用商品資料 → entities/product"
          />

          <div style={{ width: 72, height: 72, display: 'grid', placeItems: 'center', border: `1px solid ${palette.borderStrong}`, borderRadius: '50%', color: palette.muted, fontFamily: fonts.mono, fontSize: 22, fontWeight: 900 }}>
            OR
          </div>

          <IocPathCard
            layer="APP"
            role="COMPOSE WITH IoC"
            question="只是需要 App 把兩邊接起來嗎？"
            first="dependency 的生命週期依賴 app 層"
            second="具體實作可能依 runtime 替換"
            third="只換連接方式，功能不用搬家"
            example="例：App 把 analytics callback 傳給各功能"
            accent
          />
        </div>

        <div
          style={{
            alignSelf: 'center',
            width: 1320,
            padding: '14px 22px',
            border: `1px dashed ${palette.accentLine}`,
            borderRadius: 999,
            color: palette.textSoft,
            fontSize: 25,
            fontWeight: 800,
            textAlign: 'center',
          }}
        >
          思考題：這次真的要搬資料，還是只需要 App 改變 wiring？
        </div>
      </section>
    </div>
  </CaseFrame>
);

const CrossImportStrategy = ({
  index,
  title,
  detail,
  accent = false,
}: {
  index: string;
  title: string;
  detail: string;
  accent?: boolean;
}) => (
  <div
    style={{
      minHeight: 92,
      padding: '16px 20px',
      display: 'grid',
      gridTemplateColumns: '54px 170px 1fr',
      alignItems: 'center',
      gap: 16,
      border: `1px solid ${accent ? 'var(--osd-accent)' : palette.borderStrong}`,
      borderRadius: 16,
      background: accent ? palette.accentSoft : palette.whiteSoft,
    }}
  >
    <span style={{ color: 'var(--osd-accent)', fontFamily: fonts.mono, fontSize: 22, fontWeight: 900 }}>{index}</span>
    <strong style={{ color: 'var(--osd-text)', fontSize: 27 }}>{title}</strong>
    <span style={{ color: palette.textSoft, fontSize: 23, fontWeight: 700 }}>{detail}</span>
  </div>
);

const CrossImportPrimer: Page = () => (
  <CaseFrame
    categoryLabel="現行官方 guidance"
    categorySymbol="◈"
    sourceHref="https://fsd.how/docs/guides/issues/cross-imports/"
  >
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', gap: 24 }}>
      <PageHeading
        title="Cross-import：同一 Layer 的 slice 互相依賴"
        lead="它是邊界開始模糊的警訊，不是單純換一條 import path。"
      />

      <section
        aria-label="以 features cart import features product 說明 cross-import，並列出四種官方處理策略"
        style={{ flex: 1, minHeight: 0, display: 'grid', gridTemplateColumns: '660px 1fr', alignItems: 'center', gap: 56 }}
      >
        <div
          style={{
            ...panelStyle,
            height: 430,
            padding: '34px 38px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div style={{ alignSelf: 'flex-start', color: 'var(--osd-accent)', fontSize: 21, fontWeight: 900, letterSpacing: '0.08em' }}>
            官方案例
          </div>
          <div style={{ marginTop: 34, display: 'flex', alignItems: 'center', gap: 18 }}>
            <div style={{ width: 220, padding: '24px 20px', border: `1px solid ${palette.borderStrong}`, borderRadius: 16, background: palette.panelStrong, textAlign: 'center' }}>
              <span style={{ color: palette.muted, fontSize: 20, fontWeight: 800 }}>FEATURE</span>
              <strong style={{ display: 'block', marginTop: 8, color: 'var(--osd-text)', fontFamily: fonts.mono, fontSize: 27 }}>cart</strong>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 7, color: palette.danger }}>
              <span style={{ fontFamily: fonts.mono, fontSize: 18, fontWeight: 900 }}>IMPORTS</span>
              <span aria-hidden="true" style={{ fontSize: 42, lineHeight: 1 }}>⇢</span>
            </div>

            <div style={{ width: 220, padding: '24px 20px', border: `1px solid ${palette.borderStrong}`, borderRadius: 16, background: palette.panelStrong, textAlign: 'center' }}>
              <span style={{ color: palette.muted, fontSize: 20, fontWeight: 800 }}>FEATURE</span>
              <strong style={{ display: 'block', marginTop: 8, color: 'var(--osd-text)', fontFamily: fonts.mono, fontSize: 27 }}>product</strong>
            </div>
          </div>

          <strong style={{ marginTop: 34, color: palette.danger, fontSize: 30 }}>SAME LAYER · CROSS-IMPORT</strong>
          <span style={{ marginTop: 12, color: palette.textSoft, fontSize: 24, fontWeight: 700 }}>code smell 不等於一律禁止</span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <CrossImportStrategy index="A" title="合併" detail="總是一起改，就視為一個 slice" />
          <CrossImportStrategy index="B" title="下移" detail="共用 domain logic 放到 lower layer" />
          <CrossImportStrategy index="C" title="上層組裝" detail="由 Pages／App 用 IoC 接起來" />
          <CrossImportStrategy index="D" title="保留" detail="無法避免時，只經 Public API" />
        </div>
      </section>

      <div style={{ alignSelf: 'center', padding: '10px 18px', border: `1px dashed ${palette.accentLine}`, borderRadius: 999, color: palette.muted, fontSize: 21, fontWeight: 800 }}>
        Shared／App 沒有 slice，因此內部 import 不算 cross-import
      </div>
    </div>
  </CaseFrame>
);

const XNotationRule = ({ label, detail }: { label: string; detail: string }) => (
  <div
    style={{
      minHeight: 112,
      padding: '20px 24px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      gap: 7,
      border: `1px solid ${palette.borderStrong}`,
      borderRadius: 16,
      background: palette.whiteSoft,
    }}
  >
    <strong style={{ color: 'var(--osd-accent)', fontSize: 25 }}>{label}</strong>
    <span style={{ color: palette.textSoft, fontSize: 24, fontWeight: 700 }}>{detail}</span>
  </div>
);

const XNotationPrimer: Page = () => (
  <CaseFrame categoryLabel="現行官方 guidance" categorySymbol="◈">
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', gap: 24 }}>
      <PageHeading
        title="@x：讓無法避免的 Entity cross-import 變得可見"
        lead="只用在 Entities，而且是最後手段。"
      />

      <section
        aria-label="用 artist import song cross-reference 說明 @x notation 的方向與使用限制"
        style={{ flex: 1, minHeight: 0, display: 'grid', gridTemplateColumns: '800px 1fr', alignItems: 'center', gap: 44 }}
      >
        <div
          style={{
            ...panelStyle,
            height: 430,
            boxSizing: 'border-box',
            padding: '34px 30px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          <span style={{ color: 'var(--osd-accent)', fontSize: 21, fontWeight: 900, letterSpacing: '0.08em' }}>官方案例</span>

          <div style={{ width: '100%', marginTop: 34, display: 'grid', gridTemplateColumns: '220px 70px minmax(0, 1fr)', alignItems: 'center', gap: 14 }}>
            <div style={{ boxSizing: 'border-box', width: '100%', minWidth: 0, padding: '24px 14px', border: `1px solid ${palette.borderStrong}`, borderRadius: 16, background: palette.panelStrong, textAlign: 'center' }}>
              <span style={{ color: palette.muted, fontSize: 19, fontWeight: 800 }}>CONSUMER</span>
              <strong style={{ display: 'block', marginTop: 8, color: 'var(--osd-text)', fontFamily: fonts.mono, fontSize: 21, whiteSpace: 'nowrap' }}>entities/artist</strong>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 7, color: palette.danger }}>
              <span style={{ fontFamily: fonts.mono, fontSize: 17, fontWeight: 900 }}>IMPORTS</span>
              <span aria-hidden="true" style={{ fontSize: 40, lineHeight: 1 }}>⇢</span>
            </div>

            <div style={{ boxSizing: 'border-box', width: '100%', minWidth: 0, padding: '24px 14px', border: `1px solid ${palette.accentLine}`, borderRadius: 16, background: palette.accentSoft, textAlign: 'center' }}>
              <span style={{ color: 'var(--osd-accent)', fontSize: 19, fontWeight: 800 }}>SPECIAL PUBLIC API</span>
              <strong style={{ display: 'block', marginTop: 8, color: 'var(--osd-text)', fontFamily: fonts.mono, fontSize: 20, whiteSpace: 'nowrap' }}>entities/song/@x/artist</strong>
            </div>
          </div>

          <div style={{ marginTop: 34, paddingTop: 24, borderTop: `1px solid ${palette.borderStrong}`, color: palette.textSoft, fontSize: 25, fontWeight: 800, textAlign: 'center' }}>
            <span style={{ color: 'var(--osd-accent)', fontFamily: fonts.mono }}>A/@x/B</span> = A 專門暴露給 B
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <XNotationRule label="只限 Entities" detail="Features／Widgets 不使用 @x" />
          <XNotationRule label="先問能不能合併" detail="邊界可合併，就不要建立 @x" />
          <XNotationRule label="暴露最小 surface" detail="寫註解紀錄原因，並不定期重新檢查" />
        </div>
      </section>

      <div style={{ alignSelf: 'center', padding: '11px 20px', border: `1px dashed ${palette.accentLine}`, borderRadius: 999, color: palette.textSoft, fontSize: 22, fontWeight: 800, whiteSpace: 'nowrap' }}>
        <span style={{ color: 'var(--osd-accent)' }}>帶來的好處：</span>
        依賴集中在可搜尋的入口，review 看得見例外，重構時也找得到拆除點
      </div>
    </div>
  </CaseFrame>
);

const FrameworkFrame = ({
  children,
  categoryLabel = '現行官方 guidance／講者詮釋',
  categorySymbol = '◈',
  sourceHref,
  sourceLabel,
}: {
  children: ReactNode;
  categoryLabel?: string;
  categorySymbol?: string;
  sourceHref?: string;
  sourceLabel?: string;
}) => (
  <PageFrame
    section="FRAMEWORK SEAMS"
    categoryLabel={categoryLabel}
    categorySymbol={categorySymbol}
    sourceHref={sourceHref}
    sourceLabel={sourceLabel}
  >
    {children}
  </PageFrame>
);

const ResponsibilityRow = ({ label, detail }: { label: string; detail: string }) => (
  <div
    style={{
      minHeight: 72,
      padding: '14px 18px',
      display: 'grid',
      gridTemplateColumns: '210px 1fr',
      alignItems: 'center',
      gap: 18,
      border: `1px solid ${palette.borderStrong}`,
      borderRadius: 14,
      background: palette.whiteSoft,
    }}
  >
    <strong style={{ color: palette.textSoft, fontFamily: fonts.mono, fontSize: 22 }}>{label}</strong>
    <span style={{ color: palette.muted, fontSize: 22, fontWeight: 700 }}>{detail}</span>
  </div>
);

const PageResponsibilityCard = ({
  eyebrow,
  path,
  accent = false,
  children,
}: {
  eyebrow: string;
  path: string;
  accent?: boolean;
  children: ReactNode;
}) => (
  <div
    style={{
      ...panelStyle,
      width: 690,
      height: 388,
      padding: '30px 32px',
      display: 'flex',
      flexDirection: 'column',
      gap: 17,
      borderColor: accent ? 'var(--osd-accent)' : palette.borderStrong,
      borderStyle: accent ? 'solid' : 'dashed',
      boxShadow: accent ? '0 0 0 8px rgba(0, 220, 130, 0.055)' : undefined,
    }}
  >
    <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
      <span style={{ color: accent ? 'var(--osd-accent)' : palette.muted, fontSize: 22, fontWeight: 800, letterSpacing: '0.08em' }}>
        {eyebrow}
      </span>
      <span style={{ color: palette.textSoft, fontFamily: fonts.mono, fontSize: 22, fontWeight: 800 }}>
        {path}
      </span>
    </div>
    {children}
  </div>
);

const NuxtNamingSeam: Page = () => (
  <FrameworkFrame sourceHref="https://fsd.how/docs/guides/tech/with-nuxtjs/">
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', gap: 28 }}>
      <PageHeading
        title="Nuxt page 與 FSD Page：同名，責任不同"
        lead="一個描述框架的路由資料；一個封裝 application page module。"
      />

      <section
        aria-label="Nuxt route manifest 與 FSD Page application module 的責任對照"
        style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 44 }}
      >
        <PageResponsibilityCard eyebrow="FRAMEWORK-OWNED ROUTE" path="app/routes/[id].vue">
          <ResponsibilityRow label="file path" detail="決定 URL 與 dynamic params" />
          <ResponsibilityRow label="definePageMeta" detail="layout 與 route metadata" />
          <ResponsibilityRow label="adapter" detail="把 params 轉成 page input" />
        </PageResponsibilityCard>

        <div aria-hidden="true" style={{ color: 'var(--osd-accent)', fontSize: 56, fontWeight: 700 }}>
          ≠
        </div>

        <PageResponsibilityCard eyebrow="APPLICATION-OWNED PAGE" path="pages/product/" accent>
          <ResponsibilityRow label="composition" detail="組裝 page UI 與 lower layers" />
          <ResponsibilityRow label="page state" detail="query、validation、local policy" />
          <ResponsibilityRow label="business rules" detail="屬於這個 page 的行為" />
        </PageResponsibilityCard>
      </section>
    </div>
  </FrameworkFrame>
);

const RouteCodeLine = ({ children, accent = false }: { children: ReactNode; accent?: boolean }) => (
  <div
    style={{
      color: accent ? 'var(--osd-accent)' : palette.textSoft,
      fontFamily: fonts.mono,
      fontSize: 24,
      fontWeight: 700,
      lineHeight: 1.5,
      whiteSpace: 'nowrap',
    }}
  >
    {children}
  </div>
);

const AdapterArrow = ({ label, runtime = false }: { label: string; runtime?: boolean }) => (
  <div style={{ width: 320, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 9 }}>
    <span
      style={{
        color: runtime ? 'var(--osd-accent)' : palette.textSoft,
        fontFamily: fonts.mono,
        fontSize: 22,
        fontWeight: 800,
        textAlign: 'center',
      }}
    >
      {label}
    </span>
    <div style={{ width: '100%', display: 'flex', alignItems: 'center' }}>
      <span
        aria-hidden="true"
        style={{
          flex: 1,
          borderTop: `3px ${runtime ? 'solid' : 'dashed'} ${
            runtime ? 'var(--osd-accent)' : palette.borderStrong
          }`,
        }}
      />
      <span
        aria-hidden="true"
        style={{ color: runtime ? 'var(--osd-accent)' : palette.textSoft, fontSize: 32, lineHeight: 0.8 }}
      >
        ›
      </span>
    </div>
  </div>
);

const NuxtRouteAdapter: Page = () => (
  <FrameworkFrame categoryLabel="現行官方 guidance" categorySymbol="◆">
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', gap: 28 }}>
      <PageHeading
        title="Route 處理頁面邊界，Page 處理頁面內容"
        lead="Nuxt file based route 匯入 page slice。"
      />

      <section
        aria-label="Nuxt route adapter 經 FSD Page Public API 靜態依賴並 render application page"
        style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 32 }}
      >
        <div
          style={{
            ...panelStyle,
            width: 680,
            height: 340,
            padding: '30px 32px',
            borderColor: palette.borderStrong,
            borderStyle: 'dashed',
          }}
        >
          <div style={{ color: palette.muted, fontSize: 22, fontWeight: 800, letterSpacing: '0.08em' }}>
            NUXT ROUTE · @/app/routes/index.vue
          </div>
          <div style={{ marginTop: 30, padding: '22px 24px', border: `1px solid ${palette.borderStrong}`, borderRadius: 14, background: '#040821' }}>
            <RouteCodeLine accent>{"import { HomePage } from '@/pages/home'"}</RouteCodeLine>
            <RouteCodeLine>{"definePageMeta({ layout: 'default' })"}</RouteCodeLine>
            <RouteCodeLine>{'<template><HomePage /></template>'}</RouteCodeLine>
          </div>
          <div style={{ marginTop: 24, color: palette.muted, fontSize: 22, fontWeight: 700 }}>
            URL contract · Nuxt metadata · input adapter
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 52 }}>
          <AdapterArrow label="通過具名的Public API匯入" />
        </div>

        <div
          style={{
            ...panelStyle,
            position: 'relative',
            width: 560,
            height: 340,
            padding: '78px 34px 30px',
            borderColor: 'var(--osd-accent)',
            background: palette.accentSoft,
            boxShadow: '0 0 0 8px rgba(0, 220, 130, 0.055)',
          }}
        >
          <div
            style={{
              position: 'absolute',
              left: 28,
              top: -22,
              width: 504,
              padding: '8px 13px',
              border: '2px solid var(--osd-accent)',
              borderRadius: 999,
              background: 'var(--osd-bg)',
              color: 'var(--osd-accent)',
              fontFamily: fonts.mono,
              fontSize: 22,
              fontWeight: 800,
              textAlign: 'center',
            }}
          >
            PUBLIC API · @/pages/home
          </div>
          <div style={{ color: palette.muted, fontSize: 22, fontWeight: 800, letterSpacing: '0.08em' }}>
            FSD PAGE MODULE
          </div>
          <strong style={{ display: 'block', marginTop: 14, color: 'var(--osd-accent)', fontSize: 36 }}>
            HomePage
          </strong>
          <div style={{ marginTop: 26, color: palette.textSoft, fontSize: 26, fontWeight: 700, lineHeight: 1.55 }}>
            page composition
            <br />
            page-specific state
            <br />
            business rules
          </div>
        </div>
      </section>

      <div
        style={{
          alignSelf: 'center',
          padding: '10px 18px',
          border: `1px dashed ${palette.accentLine}`,
          borderRadius: 999,
          color: palette.textSoft,
          fontSize: 22,
          fontWeight: 800,
        }}
      >
        framework directory <span style={{ color: palette.dim, padding: '0 8px' }}>≠</span> business owner
      </div>
    </div>
  </FrameworkFrame>
);

const ConfigLine = ({ children, accent = false }: { children: ReactNode; accent?: boolean }) => (
  <div
    style={{
      color: accent ? 'var(--osd-accent)' : palette.textSoft,
      fontFamily: fonts.mono,
      fontSize: 25,
      fontWeight: 700,
      lineHeight: 1.48,
      whiteSpace: 'pre',
    }}
  >
    {children}
  </div>
);

const NuxtFileCard = ({ path, children }: { path: string; children: ReactNode }) => (
  <div
    style={{
      ...panelStyle,
      boxSizing: 'border-box',
      width: 700,
      height: 430,
      padding: '28px 32px',
      borderColor: palette.borderStrong,
    }}
  >
    <div style={{ color: palette.muted, fontSize: 22, fontWeight: 800, letterSpacing: '0.08em' }}>
      FILE · {path}
    </div>
    <div
      style={{
        marginTop: 22,
        padding: '18px 22px',
        border: `1px solid ${palette.borderStrong}`,
        borderRadius: 14,
        background: '#040821',
      }}
    >
      {children}
    </div>
  </div>
);

const NuxtFixtureEvidence: Page = () => (
  <FrameworkFrame categoryLabel="已驗證版本 snapshot" categorySymbol="■">
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', gap: 22 }}>
      <PageHeading
        title="Nuxt 4 設定方式"
      />

      <section style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 24 }}>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 38 }}>
          <NuxtFileCard path="nuxt.config.ts">
            <ConfigLine accent>{'export default defineNuxtConfig({'}</ConfigLine>
            <ConfigLine>{"  srcDir: 'src/',"}</ConfigLine>
            <ConfigLine>{'  dir: {'}</ConfigLine>
            <ConfigLine>{"    app: 'app',"}</ConfigLine>
            <ConfigLine>{"    pages: 'app/routes',"}</ConfigLine>
            <ConfigLine>{"    layouts: 'app/layouts',"}</ConfigLine>
            <ConfigLine>{'  },'}</ConfigLine>
            <ConfigLine>{'})'}</ConfigLine>
          </NuxtFileCard>

          <NuxtFileCard path="src/app/routes/index.vue">
            <ConfigLine accent>{'<script setup lang="ts">'}</ConfigLine>
            <ConfigLine>{"import { HomePage } from '@/pages/home'"}</ConfigLine>
            <ConfigLine>{'</script>'}</ConfigLine>
            <br />
            <ConfigLine accent>{'<template>'}</ConfigLine>
            <ConfigLine>{'  <HomePage />'}</ConfigLine>
            <ConfigLine accent>{'</template>'}</ConfigLine>
          </NuxtFileCard>
        </div>
      </section>
    </div>
  </FrameworkFrame>
);

const CacheContractCore = () => (
  <div
    style={{
      ...panelStyle,
      position: 'relative',
      width: 700,
      height: 360,
      padding: '64px 36px 24px',
      borderColor: 'var(--osd-accent)',
      background: palette.accentSoft,
      boxShadow: '0 0 0 8px rgba(0, 220, 130, 0.055)',
    }}
  >
    <div
      style={{
        position: 'absolute',
        left: 28,
        top: -22,
        width: 644,
        padding: '8px 13px',
        border: '2px solid var(--osd-accent)',
        borderRadius: 999,
        background: 'var(--osd-bg)',
        color: 'var(--osd-accent)',
        fontFamily: fonts.mono,
        fontSize: 22,
        fontWeight: 800,
        textAlign: 'center',
      }}
    >
      PUBLIC API · owning module
    </div>
    <div style={{ color: palette.muted, fontSize: 22, fontWeight: 800, letterSpacing: '0.08em' }}>
      QUERY OPTIONS FACTORY
    </div>
    <strong style={{ display: 'block', marginTop: 8, color: 'var(--osd-accent)', fontSize: 38 }}>
      Cache contract
    </strong>
    <div style={{ marginTop: 18, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
      <div
        style={{
          padding: '14px 22px',
          border: `1px solid ${palette.accentLine}`,
          borderRadius: 15,
          background: palette.whiteSoft,
        }}
      >
        <div style={{ color: palette.muted, fontSize: 22, fontWeight: 800 }}>CACHE IDENTITY</div>
        <div style={{ marginTop: 6, color: palette.textSoft, fontFamily: fonts.mono, fontSize: 26, fontWeight: 800 }}>
          queryKey
        </div>
      </div>
      <div
        style={{
          padding: '14px 22px',
          border: `1px solid ${palette.accentLine}`,
          borderRadius: 15,
          background: palette.whiteSoft,
        }}
      >
        <div style={{ color: palette.muted, fontSize: 22, fontWeight: 800 }}>REQUEST CONTRACT</div>
        <div style={{ marginTop: 6, color: palette.textSoft, fontFamily: fonts.mono, fontSize: 26, fontWeight: 800 }}>
          queryOptions
        </div>
      </div>
    </div>
    <div style={{ marginTop: 14, color: palette.textSoft, fontSize: 28, fontWeight: 700 }}>
      一個 owner，對外提供同一份 identity
    </div>
  </div>
);

const CacheConsumerChip = ({ command, purpose }: { command: string; purpose: string }) => (
  <div
    style={{
      height: 58,
      padding: '0 16px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 10,
      border: `1px solid ${palette.borderStrong}`,
      borderRadius: 15,
      background: palette.whiteSoft,
    }}
  >
    <span
      style={{
        color: palette.textSoft,
        fontFamily: fonts.mono,
        fontSize: 22,
        fontWeight: 800,
        whiteSpace: 'nowrap',
      }}
    >
      {command}
    </span>
    <span style={{ color: palette.muted, fontSize: 22, fontWeight: 700, whiteSpace: 'nowrap' }}>{purpose}</span>
  </div>
);

const CacheContract: Page = () => (
  <FrameworkFrame
    categoryLabel="現行官方 guidance／講者詮釋"
    categorySymbol="◈"
    sourceHref="https://fsd.how/docs/guides/tech/with-react-query/"
  >
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', gap: 24 }}>
      <PageHeading
        title="Cache ID 由 owner 對外"
        lead="Read、prefetch、write、invalidate，共用同一份 query key／query options"
      />

      <section
        aria-label="Owning module 經 Public API 對外提供 query key 與 request contract，讓讀取、預取、寫入與失效共用 cache identity"
        style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 24 }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 34 }}>
          <CacheContractCore />
          <AdapterArrow label="使用同樣的 contract" />
          <div
            style={{
              ...panelStyle,
              width: 630,
              height: 360,
              padding: '28px 30px',
              display: 'flex',
              flexDirection: 'column',
              gap: 10,
              borderColor: palette.borderStrong,
            }}
          >
            <div style={{ color: palette.muted, fontFamily: fonts.mono, fontSize: 22, fontWeight: 800 }}>
              const qc = useQueryClient()
            </div>
            <CacheConsumerChip command="useQuery(options)" purpose="read" />
            <CacheConsumerChip command="qc.prefetchQuery(options)" purpose="prefetch" />
            <CacheConsumerChip command="qc.setQueryData(queryKey, next)" purpose="write" />
            <CacheConsumerChip command="qc.invalidateQueries({ queryKey })" purpose="invalidate" />
          </div>
        </div>

        <div
          style={{
            width: 1390,
            padding: '11px 20px',
            border: `1px dashed ${palette.accentLine}`,
            borderRadius: 999,
            color: palette.textSoft,
            fontSize: 23,
            fontWeight: 800,
            textAlign: 'center',
          }}
        >
          Placement = 實際 owner ＋ reuse evidence　<span style={{ color: palette.dim }}>≠</span>　endpoint response → Entity
        </div>
      </section>
    </div>
  </FrameworkFrame>
);

const ReactiveContractCard = ({
  status,
  eyebrow,
  lineOne,
  lineTwo,
  outcome,
  accent = false,
}: {
  status: string;
  eyebrow: string;
  lineOne: string;
  lineTwo: string;
  outcome: string;
  accent?: boolean;
}) => (
  <div
    style={{
      ...panelStyle,
      width: 690,
      height: 350,
      padding: '30px 34px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      borderColor: accent ? 'var(--osd-accent)' : palette.borderStrong,
      borderStyle: accent ? 'solid' : 'dashed',
      background: accent ? palette.accentSoft : `linear-gradient(145deg, ${palette.panelStrong}, ${palette.panel})`,
      boxShadow: accent ? '0 0 0 8px rgba(0, 220, 130, 0.055)' : undefined,
    }}
  >
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <span style={{ color: accent ? 'var(--osd-accent)' : palette.muted, fontSize: 22, fontWeight: 800, letterSpacing: '0.08em' }}>
        {eyebrow}
      </span>
      <span
        style={{
          padding: '7px 12px',
          border: `1px ${accent ? 'solid' : 'dashed'} ${accent ? 'var(--osd-accent)' : palette.borderStrong}`,
          borderRadius: 999,
          color: accent ? 'var(--osd-accent)' : palette.textSoft,
          fontSize: 22,
          fontWeight: 800,
        }}
      >
        {status}
      </span>
    </div>
    <div style={{ padding: '24px 26px', border: `1px solid ${palette.borderStrong}`, borderRadius: 15, background: '#040821' }}>
      <RouteCodeLine accent={accent}>{lineOne}</RouteCodeLine>
      <RouteCodeLine>{lineTwo}</RouteCodeLine>
    </div>
    <div style={{ color: accent ? 'var(--osd-accent)' : palette.textSoft, fontSize: 29, fontWeight: 800 }}>
      {outcome}
    </div>
  </div>
);

const ReactiveSeam: Page = () => (
  <FrameworkFrame categoryLabel="現行官方 guidance／講者轉譯" categorySymbol="◈">
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', gap: 26 }}>
      <PageHeading
        title="要自動追蹤，就傳入 reactive value 或 getter"
        lead="Getter／ref 留在 queryKey；直接讀值，不具備響應性。"
      />

      <section
        aria-label="Getter 穿過 query factory Public API 並留在 query key，與先讀 route param 成 plain snapshot 的錯誤對照"
        style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 28 }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 46 }}>
          <ReactiveContractCard
            status="TRACKED · ✓"
            eyebrow="PUBLIC CONTRACT · REACTIVE"
            lineOne="const id = () => route.params.id"
            lineTwo="useQuery(postQueries.detail(id))"
            outcome="URL 改變 → key 改變 → refetch"
            accent
          />
          <ReactiveContractCard
            status="SNAPSHOT · ×"
            eyebrow="PLAIN VALUE · TOO EARLY"
            lineOne="const id = route.params.id"
            lineTwo="useQuery(postQueries.detail(id))"
            outcome="URL 改變，query 仍不知道"
          />
        </div>
        <div
          style={{
            padding: '11px 22px',
            border: `1px dashed ${palette.accentLine}`,
            borderRadius: 999,
            color: palette.textSoft,
            fontSize: 24,
            fontWeight: 800,
          }}
        >
          關鍵是 queryKey 必須是響應式<span style={{ color: 'var(--osd-accent)' }}>{''}</span>
        </div>
      </section>
    </div>
  </FrameworkFrame>
);

const LifecycleQuestionCard = ({ index, question }: { index: string; question: string }) => (
  <div
    style={{
      ...panelStyle,
      boxSizing: 'border-box',
      width: 430,
      height: 250,
      padding: '30px 34px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      gap: 24,
    }}
  >
    <span style={{ color: 'var(--osd-accent)', fontFamily: fonts.mono, fontSize: 24, fontWeight: 900 }}>{index}</span>
    <strong style={{ color: 'var(--osd-text)', fontSize: 40, lineHeight: 1.25 }}>{question}</strong>
  </div>
);

const SsrAndDraftSeam: Page = () => (
  <FrameworkFrame categoryLabel="現行官方 guidance／講者詮釋" categorySymbol="◈">
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', gap: 22 }}>
      <PageHeading
        title="共用 state 前，先問三件事"
        lead="不要先選 store。先看它的 lifecycle。"
      />

      <section
        aria-label="共用狀態前，先判斷建立、修改與丟棄時機"
        style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 38 }}
      >
        <div style={{ display: 'flex', alignItems: 'stretch', gap: 30 }}>
          <LifecycleQuestionCard index="01" question="何時建立？" />
          <LifecycleQuestionCard index="02" question="誰可以修改？" />
          <LifecycleQuestionCard index="03" question="何時丟棄？" />
        </div>

        <div
          style={{
            width: 1350,
            padding: '22px 28px',
            border: `1px solid ${palette.accentLine}`,
            borderRadius: 18,
            background: palette.accentSoft,
            color: palette.textSoft,
            fontSize: 32,
            fontWeight: 850,
            textAlign: 'center',
          }}
        >
          答案不同，就不該硬塞進同一個 <span style={{ color: 'var(--osd-accent)' }}>mutable owner</span>
        </div>
      </section>
    </div>
  </FrameworkFrame>
);

const OperationsFrame = ({
  children,
  categoryLabel = '講者詮釋',
  categorySymbol = '◇',
  sourceHref,
  sourceLabel,
}: {
  children: ReactNode;
  categoryLabel?: string;
  categorySymbol?: string;
  sourceHref?: string;
  sourceLabel?: string;
}) => (
  <PageFrame
    section="ARCHITECTURE OPERATIONS"
    categoryLabel={categoryLabel}
    categorySymbol={categorySymbol}
    sourceHref={sourceHref}
    sourceLabel={sourceLabel}
  >
    {children}
  </PageFrame>
);

const PolicyTile = ({ index, title, detail }: { index: string; title: string; detail: string }) => (
  <div
    style={{
      height: 126,
      padding: '20px 24px',
      display: 'grid',
      gridTemplateColumns: '48px 1fr',
      alignItems: 'center',
      gap: 18,
      border: `1px solid ${palette.borderStrong}`,
      borderRadius: 16,
      background: palette.whiteSoft,
    }}
  >
    <span
      style={{
        width: 44,
        height: 44,
        display: 'grid',
        placeItems: 'center',
        border: `1px solid ${palette.accentLine}`,
        borderRadius: 13,
        color: 'var(--osd-accent)',
        fontFamily: fonts.mono,
        fontSize: 22,
        fontWeight: 800,
      }}
    >
      {index}
    </span>
    <div>
      <strong style={{ color: palette.textSoft, fontSize: 29 }}>{title}</strong>
      <div style={{ marginTop: 6, color: palette.muted, fontSize: 22, fontWeight: 700 }}>{detail}</div>
    </div>
  </div>
);

const HumanJudgment: Page = () => (
  <OperationsFrame categoryLabel="團隊 policy／講者詮釋" categorySymbol="◐">
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', gap: 26 }}>
      <PageHeading
        title="在 AI 時代，人的工作是什麼"
        lead="工具看的到結構；看不見產品語意、責任邊界與風險取捨。"
      />

      <section
        aria-label="人負責制定 business language、ownership boundary、例外與 severity policy"
        style={{ flex: 1, display: 'grid', placeItems: 'center' }}
      >
        <div
          style={{
            ...panelStyle,
            position: 'relative',
            width: 1390,
            height: 440,
            padding: '74px 38px 30px',
            borderColor: 'var(--osd-accent)',
            boxShadow: '0 0 0 8px rgba(0, 220, 130, 0.055)',
          }}
        >
          <div
            style={{
              position: 'absolute',
              left: 32,
              top: -22,
              padding: '9px 18px',
              border: '2px solid var(--osd-accent)',
              borderRadius: 999,
              background: 'var(--osd-bg)',
              color: 'var(--osd-accent)',
              fontSize: 23,
              fontWeight: 800,
            }}
          >
            HUMAN · POLICY OWNER
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 22 }}>
            <PolicyTile index="01" title="業務語言" detail="團隊真正使用的業務詞彙" />
            <PolicyTile index="02" title="所有權、責任邊界" detail="誰負責、為什麼在一起" />
            <PolicyTile index="03" title="例外狀況" detail="何時偏離，以及移除條件" />
            <PolicyTile index="04" title="嚴重性" detail="哪些是絕對不能違反、哪些先跳警告" />
          </div>
          <div style={{ marginTop: 18, color: palette.textSoft, fontSize: 28, fontWeight: 800, textAlign: 'center' }}>
            高成本或跨邊界的決定，最終責任仍在人
          </div>
        </div>
      </section>
    </div>
  </OperationsFrame>
);

const LanguageRoleCard = ({
  symbol,
  title,
  detail,
  accent = false,
}: {
  symbol: string;
  title: string;
  detail: string;
  accent?: boolean;
}) => (
  <div
    style={{
      ...panelStyle,
      width: 380,
      height: 300,
      padding: '28px 30px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      borderColor: accent ? 'var(--osd-accent)' : palette.borderStrong,
      borderStyle: accent ? 'solid' : 'dashed',
      background: accent ? palette.accentSoft : `linear-gradient(145deg, ${palette.panelStrong}, ${palette.panel})`,
    }}
  >
    <span
      style={{
        width: 52,
        height: 52,
        display: 'grid',
        placeItems: 'center',
        border: `2px solid ${accent ? 'var(--osd-accent)' : palette.borderStrong}`,
        borderRadius: 16,
        color: accent ? 'var(--osd-accent)' : palette.textSoft,
        fontSize: 28,
        fontWeight: 800,
      }}
    >
      {symbol}
    </span>
    <strong style={{ color: accent ? 'var(--osd-accent)' : palette.textSoft, fontSize: 34 }}>{title}</strong>
    <div style={{ color: palette.muted, fontSize: 28, fontWeight: 700, lineHeight: 1.4 }}>{detail}</div>
  </div>
);

const SharedLanguageStack = () => (
  <div
    style={{
      ...panelStyle,
      width: 520,
      height: 330,
      padding: '30px 32px',
      display: 'flex',
      flexDirection: 'column',
      gap: 18,
      borderColor: 'var(--osd-accent)',
      boxShadow: '0 0 0 8px rgba(0, 220, 130, 0.055)',
    }}
  >
    <div style={{ color: 'var(--osd-accent)', fontSize: 22, fontWeight: 800, letterSpacing: '0.08em' }}>
      共同的判斷語言
    </div>
    <CacheConsumerChip command="Skill" purpose="decision framework" />
    <CacheConsumerChip command="CONTEXT" purpose="domain language" />
    <CacheConsumerChip command="AGENTS.md" purpose="policy + exceptions" />
  </div>
);

const LanguageArrow = ({ label }: { label: string }) => (
  <div style={{ width: 130, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 9 }}>
    <span style={{ color: palette.textSoft, fontSize: 22, fontWeight: 800, textAlign: 'center' }}>{label}</span>
    <div style={{ width: '100%', display: 'flex', alignItems: 'center' }}>
      <span style={{ flex: 1, borderTop: `3px dashed ${palette.borderStrong}` }} />
      <span aria-hidden="true" style={{ color: palette.muted, fontSize: 31, lineHeight: 0.8 }}>
        ›
      </span>
    </div>
  </div>
);

const HumanAiLanguage: Page = () => (
  <OperationsFrame>
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', gap: 24 }}>
      <PageHeading
        title="人與 AI，需要讀同一份判斷語言"
        lead="Skill、CONTEXT 與 AGENTS.md 同時支援實作與審核。"
      />

      <section
        aria-label="人與 AI 共同讀取 Skill、CONTEXT 與架構文件，依同一語言實作與 review，但 AI 不是最終裁決者"
        style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 28 }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
          <LanguageRoleCard symbol="人" title="Human" detail="質疑、補脈絡、承擔最終取捨" />
          <LanguageArrow label="來源依據" />
          <SharedLanguageStack />
          <LanguageArrow label="來源依據" />
          <LanguageRoleCard symbol="AI" title="AI 協作" detail="在明確規則內產出、review、修復" accent />
        </div>
        <div
          style={{
            padding: '11px 24px',
            border: `1px dashed ${palette.accentLine}`,
            borderRadius: 999,
            color: palette.textSoft,
            fontSize: 24,
            fontWeight: 800,
          }}
        >
          模棱兩可的業務功能／例外／邊界變化　<span style={{ color: 'var(--osd-accent)' }}>→ 回到人</span>
        </div>
      </section>
    </div>
  </OperationsFrame>
);

const GuardRow = ({ rule, detail }: { rule: string; detail: string }) => (
  <div
    style={{
      height: 74,
      padding: '0 20px',
      display: 'grid',
      gridTemplateColumns: '310px 1fr',
      alignItems: 'center',
      gap: 18,
      border: `1px solid ${palette.borderStrong}`,
      borderRadius: 14,
      background: palette.whiteSoft,
    }}
  >
    <strong style={{ color: palette.textSoft, fontFamily: fonts.mono, fontSize: 22, whiteSpace: 'nowrap' }}>
      {rule}
    </strong>
    <span style={{ color: palette.muted, fontSize: 22, fontWeight: 700 }}>{detail}</span>
  </div>
);

const GuardColumn = ({
  eyebrow,
  title,
  accent = false,
  children,
}: {
  eyebrow: string;
  title: string;
  accent?: boolean;
  children: ReactNode;
}) => (
  <div
    style={{
      ...panelStyle,
      width: 760,
      height: 352,
      padding: '26px 28px',
      display: 'flex',
      flexDirection: 'column',
      gap: 14,
      borderColor: accent ? 'var(--osd-accent)' : palette.borderStrong,
      borderStyle: accent ? 'solid' : 'dashed',
      boxShadow: accent ? '0 0 0 8px rgba(0, 220, 130, 0.055)' : undefined,
    }}
  >
    <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
      <strong style={{ color: accent ? 'var(--osd-accent)' : palette.textSoft, fontSize: 32 }}>{title}</strong>
      <span style={{ color: palette.muted, fontSize: 22, fontWeight: 800, letterSpacing: '0.08em' }}>
        {eyebrow}
      </span>
    </div>
    {children}
  </div>
);

const SteigerBoundary: Page = () => (
  <OperationsFrame
    categoryLabel="現行工具 source／團隊 policy"
    categorySymbol="◐"
    sourceHref="https://github.com/feature-sliced/steiger"
    sourceLabel="官方 GitHub ↗"
  >
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', gap: 24 }}>
      <PageHeading
        title="Steiger：通用檔案結構與專案架構檢查工具"
        lead="硬性規定與業務經驗要分開，Linter 能檢查，不代表就是最終的架構決策。"
      />

      <section
        aria-label="Steiger 可作 hard gate 的 import Public API folder checks，與 threshold reference count naming 等 heuristic diagnostics 對照"
        style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 24 }}
      >
        <div style={{ display: 'flex', gap: 42 }}>
          <GuardColumn eyebrow="OBSERVABLE STRUCTURE" title="Hard structural guards" accent>
            <GuardRow rule="forbidden-imports" detail="layer direction／cross-import" />
            <GuardRow rule="no-public-api-sidestep" detail="不繞過具名入口" />
            <GuardRow rule="folder contract" detail="slice／segment／Public API" />
          </GuardColumn>
          <GuardColumn eyebrow="REVIEW SIGNALS" title="Heuristic diagnostics">
            <GuardRow rule="thresholds" detail="20 slices／15 shared-lib modules" />
            <GuardRow rule="reference count" detail="0–1 reference 只是一個 signal" />
            <GuardRow rule="naming／typically" detail="英文假設與「通常」規則" />
          </GuardColumn>
        </div>
        <div
          style={{
            width: 1442,
            padding: '11px 22px',
            border: `1px dashed ${palette.accentLine}`,
            borderRadius: 999,
            color: palette.textSoft,
            fontSize: 23,
            fontWeight: 800,
            textAlign: 'center',
          }}
        >
          PASS <span style={{ color: palette.dim }}>≠</span> business boundary 正確／完整符合 FSD／完全沒有 circular dependencies
        </div>
      </section>
    </div>
  </OperationsFrame>
);

const CheckBadge = ({ label }: { label: string }) => (
  <div
    style={{
      height: 64,
      padding: '4px 10px',
      display: 'grid',
      placeItems: 'center',
      border: `1px solid ${palette.borderStrong}`,
      borderRadius: 999,
      background: palette.whiteSoft,
      color: palette.textSoft,
      fontFamily: fonts.mono,
      fontSize: 22,
      fontWeight: 800,
      lineHeight: 1.1,
      textAlign: 'center',
    }}
  >
    {label}
  </div>
);

const DeliveryDefense = ({
  eyebrow,
  title,
  detail,
  accent = false,
  children,
}: {
  eyebrow: string;
  title: string;
  detail: string;
  accent?: boolean;
  children: ReactNode;
}) => (
  <div
    style={{
      ...panelStyle,
      width: accent ? 760 : 520,
      height: 332,
      padding: '30px 32px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      borderColor: accent ? 'var(--osd-accent)' : palette.borderStrong,
      borderStyle: accent ? 'solid' : 'dashed',
      boxShadow: accent ? '0 0 0 8px rgba(0, 220, 130, 0.055)' : undefined,
    }}
  >
    <div>
      <div style={{ color: accent ? 'var(--osd-accent)' : palette.muted, fontSize: 22, fontWeight: 800, letterSpacing: '0.08em' }}>
        {eyebrow}
      </div>
      <strong style={{ display: 'block', marginTop: 10, color: palette.textSoft, fontSize: 36 }}>{title}</strong>
      <div style={{ marginTop: 8, color: palette.muted, fontSize: 23, fontWeight: 700 }}>{detail}</div>
    </div>
    <div style={{ display: 'grid', gridTemplateColumns: accent ? 'repeat(3, 1fr)' : '1fr 1fr', gap: 12 }}>
      {children}
    </div>
  </div>
);

const HuskyCiMatrix: Page = () => (
  <OperationsFrame categoryLabel="團隊 policy" categorySymbol="●">
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', gap: 24 }}>
      <PageHeading
        title="在 pre-push 預檢查；remote CI 共同防護"
        lead="Hook timing 是團隊規範；兩端執行的，都只是不能忘記的自動化檢查。"
      />

      <section
        aria-label="Husky pre-push 本機預檢查接到 remote CI 共同守門，兩端執行 Steiger typecheck build tests 與 custom checks"
        style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 26 }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 38 }}>
          <DeliveryDefense eyebrow="LOCAL · TEAM POLICY" title=".husky/pre-push" detail="push 前先檢查，加速收到 feedback">
            <CheckBadge label="Steiger" />
            <CheckBadge label="ESLint" />
            <CheckBadge label="typecheck" />
            <CheckBadge label="tests" />
          </DeliveryDefense>
          <AdapterArrow label="push · same policy" runtime />
          <DeliveryDefense eyebrow="REMOTE · SHARED GATE" title="CI defense" detail="每個人都不能跳過的共同結果" accent>
            <CheckBadge label="Steiger" />
            <CheckBadge label="ESLint" />
            <CheckBadge label="typecheck" />
            <CheckBadge label="tests" />
            <CheckBadge label="..." />
            <CheckBadge label="build" />
          </DeliveryDefense>
        </div>
        <div
          style={{
            padding: '11px 24px',
            border: `1px dashed ${palette.accentLine}`,
            borderRadius: 999,
            color: palette.textSoft,
            fontSize: 24,
            fontWeight: 800,
          }}
        >
          pre-push 不取代 remote CI；CI 也不裁決 business semantics
        </div>
      </section>
    </div>
  </OperationsFrame>
);

const ControlLoopNode = ({
  eyebrow,
  title,
  detail,
  width,
  accent = false,
}: {
  eyebrow: string;
  title: string;
  detail: ReactNode;
  width: number;
  accent?: boolean;
}) => (
  <div
    style={{
      ...panelStyle,
      width,
      height: 240,
      padding: '22px 24px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      borderColor: accent ? 'var(--osd-accent)' : palette.borderStrong,
      borderStyle: accent ? 'solid' : 'dashed',
      background: accent ? palette.accentSoft : `linear-gradient(145deg, ${palette.panelStrong}, ${palette.panel})`,
      boxShadow: accent ? '0 0 0 8px rgba(0, 220, 130, 0.055)' : undefined,
    }}
  >
    <div style={{ color: accent ? 'var(--osd-accent)' : palette.muted, fontSize: 22, fontWeight: 800, letterSpacing: '0.08em' }}>
      {eyebrow}
    </div>
    <strong style={{ color: accent ? 'var(--osd-accent)' : palette.textSoft, fontSize: 30 }}>{title}</strong>
    <div style={{ color: palette.textSoft, fontSize: 28, fontWeight: 700, lineHeight: 1.35 }}>{detail}</div>
  </div>
);

const WorkflowArrow = ({ label }: { label: string }) => (
  <div style={{ width: 130, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 9 }}>
    <span style={{ color: palette.textSoft, fontSize: 22, fontWeight: 800, textAlign: 'center' }}>{label}</span>
    <div style={{ width: '100%', display: 'flex', alignItems: 'center' }}>
      <span style={{ flex: 1, borderTop: '4px solid var(--osd-accent)' }} />
      <span aria-hidden="true" style={{ color: 'var(--osd-accent)', fontSize: 34, lineHeight: 0.8 }}>
        ›
      </span>
    </div>
  </div>
);

const ControlLoopSynthesis: Page = () => (
  <OperationsFrame>
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', gap: 22 }}>
      <PageHeading
        title="控制迴路不對稱：決策權不平均"
        lead="明確規則 → 共用判斷語言 → 自動保護；只有例外與邊界改變回到人。"
      />

      <section
        aria-label="人制定政策，人與 AI 依共同語言實作與 review，AI 在明確規則內自我修復，CI 守機械結果，模糊例外或邊界改變才回到人"
        style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16 }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 22 }}>
          <ControlLoopNode
            eyebrow="FINAL POLICY OWNER"
            title="人制定 architecture policy"
            detail={<>language · boundary · exceptions · severity</>}
            width={400}
            accent
          />
          <WorkflowArrow label="寫成明確規則" />
          <ControlLoopNode
            eyebrow="SHARED LANGUAGE"
            title="人 ＋ AI 實作／review"
            detail={<>Skill · CONTEXT · AGENTS.md</>}
            width={450}
          />
          <WorkflowArrow label="交付可檢查結果" />
          <ControlLoopNode
            eyebrow="MECHANICAL DEFENSE"
            title="CI 守住 executable checks"
            detail={<>imports · Public API · types · build · tests</>}
            width={400}
          />
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
          <div
            style={{
              width: 720,
              padding: '14px 20px',
              border: `1px solid ${palette.borderStrong}`,
              borderRadius: 16,
              background: palette.whiteSoft,
              color: palette.textSoft,
              fontSize: 23,
              fontWeight: 800,
              textAlign: 'center',
            }}
          >
            AI：明確規則內自我修復　<span style={{ color: 'var(--osd-accent)' }}>↻</span>　再交回 review／CI
          </div>
          <div
            style={{
              width: 720,
              padding: '14px 20px',
              border: `2px solid ${palette.accentLine}`,
              borderRadius: 16,
              background: palette.accentSoft,
              color: palette.textSoft,
              fontSize: 23,
              fontWeight: 800,
              textAlign: 'center',
            }}
          >
            規則模糊／例外／責任邊界改變　<span style={{ color: 'var(--osd-accent)' }}>→ 只回到人</span>
          </div>
        </div>
      </section>
    </div>
  </OperationsFrame>
);

const TakeawayQuestion = ({
  index,
  term,
  question,
}: {
  index: string;
  term: string;
  question: string;
}) => (
  <div
    style={{
      ...panelStyle,
      width: 470,
      height: 250,
      padding: '28px 30px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      borderColor: palette.borderStrong,
    }}
  >
    <span
      style={{
        width: 48,
        height: 48,
        display: 'grid',
        placeItems: 'center',
        border: `1px solid ${palette.accentLine}`,
        borderRadius: 14,
        color: 'var(--osd-accent)',
        fontFamily: fonts.mono,
        fontSize: 22,
        fontWeight: 800,
      }}
    >
      {index}
    </span>
    <strong style={{ color: 'var(--osd-accent)', fontFamily: fonts.mono, fontSize: 30 }}>{term}</strong>
    <div style={{ color: palette.textSoft, fontSize: 28, fontWeight: 800, lineHeight: 1.35 }}>{question}</div>
  </div>
);

const MethodConclusion: Page = () => (
  <PageFrame section="TAKEAWAYS" categoryLabel="講者詮釋" categorySymbol="◇">
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', gap: 24 }}>
      <PageHeading
        title="即使不採用 FSD，也請帶走三個問題"
        lead="FSD 是一個完整的方法論框架；真正要留下的是可共同理解、可 review、可迭代的議題。"
      />

      <section
        aria-label="不採用 FSD 仍應回答 ownership dependency 與 evolution rules 三個帶走問題"
        style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 30 }}
      >
        <div style={{ display: 'flex', gap: 36 }}>
          <TakeawayQuestion index="01" term="OWNERSHIP" question="誰對這段責任負責？" />
          <TakeawayQuestion index="02" term="DEPENDENCY" question="誰能依賴誰？如何保護規則？" />
          <TakeawayQuestion index="03" term="EVOLUTION RULES" question="何時抽離、例外如何回饋？" />
        </div>

        <div
          style={{
            width: 1482,
            padding: '20px 28px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            border: '2px solid var(--osd-accent)',
            borderRadius: 20,
            background: palette.accentSoft,
          }}
        >
          <strong style={{ color: palette.textSoft, fontSize: 29 }}>
            明確規則　→　共用判斷語言　→　自動保護
          </strong>
        </div>
      </section>
    </div>
  </PageFrame>
);

const QrCodeCard = ({ src, alt, label }: { src: string; alt: string; label: string }) => (
  <div
    style={{
      width: 242,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 14,
    }}
  >
    <div
      style={{
        width: 242,
        height: 242,
        display: 'grid',
        placeItems: 'center',
        borderRadius: 24,
        background: '#FFFFFF',
        boxShadow: '0 18px 56px rgba(0, 0, 0, 0.32)',
      }}
    >
      <img
        src={src}
        alt={alt}
        style={{
          width: 212,
          height: 212,
          display: 'block',
          imageRendering: 'pixelated',
        }}
      />
    </div>
    <strong
      style={{
        color: palette.textSoft,
        fontFamily: fonts.mono,
        fontSize: 24,
        fontWeight: 800,
        letterSpacing: '0.12em',
      }}
    >
      {label}
    </strong>
  </div>
);

const QandA: Page = () => (
  <div
    style={{
      ...pageRoot,
      display: 'grid',
      placeItems: 'center',
      padding: 120,
    }}
  >
    <div
      aria-hidden="true"
      style={{
        position: 'absolute',
        left: 170,
        top: 150,
        width: 270,
        height: 270,
        border: `2px solid ${palette.accentLine}`,
        borderRadius: '50%',
        opacity: 0.5,
      }}
    />
    <div
      aria-hidden="true"
      style={{
        position: 'absolute',
        right: 120,
        bottom: 80,
        width: 410,
        height: 410,
        border: `2px solid ${palette.borderStrong}`,
        borderRadius: '50%',
        opacity: 0.45,
      }}
    />

    <div
      style={{
        position: 'relative',
        width: 1460,
        height: 470,
        display: 'grid',
        gridTemplateColumns: '1fr 526px',
        alignItems: 'center',
        gap: 62,
        padding: '48px 66px 48px 88px',
        boxSizing: 'border-box',
        border: `2px solid ${palette.borderStrong}`,
        borderRadius: 48,
        background: `linear-gradient(145deg, rgba(13, 23, 59, 0.9), rgba(8, 16, 47, 0.76))`,
        boxShadow: '0 36px 120px rgba(0, 0, 0, 0.34), 0 0 90px rgba(0, 220, 130, 0.07)',
      }}
    >
      <div aria-hidden="true" style={{ position: 'absolute', left: 96, top: -3, width: 190, borderTop: '5px solid var(--osd-accent)', borderRadius: 999 }} />
      <div aria-hidden="true" style={{ position: 'absolute', right: 96, bottom: -3, width: 190, borderTop: '5px solid var(--osd-accent)', borderRadius: 999 }} />
      <div aria-hidden="true" style={{ position: 'absolute', left: 52, bottom: 52, width: 14, height: 14, border: '3px solid var(--osd-accent)', borderRadius: '50%' }} />
      <div aria-hidden="true" style={{ position: 'absolute', right: 52, top: 52, width: 14, height: 14, border: '3px solid var(--osd-accent)', borderRadius: '50%' }} />

      <h1
        style={{
          margin: 0,
          color: 'var(--osd-text)',
          fontFamily: 'var(--osd-font-display)',
          fontSize: 174,
          fontWeight: 800,
          lineHeight: 1.18,
          letterSpacing: '-0.06em',
        }}
      >
        Q<span style={{ color: 'var(--osd-accent)' }}>&amp;</span>A
      </h1>

      <div style={{ display: 'flex', alignItems: 'center', gap: 42 }}>
        <QrCodeCard src={qAndAQrCode} alt="Q&A QR code" label="Q&A" />
        <QrCodeCard src={threadsQrCode} alt="Threads QR code" label="THREADS" />
      </div>
    </div>
  </div>
);

export const meta: SlideMeta = {
  title: '一段程式碼，到底該放哪裡？從 Feature-based 到 Feature-Sliced Design',
  createdAt: '2026-08-14T12:02:31.878Z',
};

export default [
  Cover,
  ProblemSetup,
  TechnicalBaseline,
  FeatureImprovement,
  GapFraming,
  Thesis,
  SourcePolicy,
  LayersPrimer,
  SlicesAndSegments,
  DependencyAndPublicApi,
  LayerStructureExceptions,
  ProjectStructureOverview,
  PagesFirst,
  PrematureSharedDecision,
  PrematureSharedConsequence,
  SecondConsumerProbe,
  ResponsibilityCorrection,
  ValidSchemaOwnership,
  ValidationDrift,
  StableRuleCorrection,
  AuthOwnershipMistake,
  AuthOwnershipConsequence,
  AuthOwnershipCorrection,
  AuthWiring,
  CrossImportPrimer,
  XNotationPrimer,
  NuxtNamingSeam,
  NuxtRouteAdapter,
  NuxtFixtureEvidence,
  CacheContract,
  ReactiveSeam,
  HumanJudgment,
  HumanAiLanguage,
  SteigerBoundary,
  HuskyCiMatrix,
  MethodConclusion,
  QandA,
] satisfies Page[];
