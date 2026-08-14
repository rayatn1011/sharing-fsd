import type { CSSProperties, ReactNode } from 'react';
import type { DesignSystem, Page, SlideMeta } from '@open-slide/core';

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
    accent: '#00DC82',
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

const CategoryLabel = ({
  label = '講者詮釋',
  symbol = '◇',
}: {
  label?: string;
  symbol?: string;
}) => (
  <div
    style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: 12,
      padding: '9px 16px',
      border: `1px dashed ${palette.accentLine}`,
      borderRadius: 999,
      background: palette.accentSoft,
      color: 'var(--osd-accent)',
      fontSize: 23,
      fontWeight: 700,
      lineHeight: 1,
      letterSpacing: '0.02em',
    }}
  >
    <span aria-hidden="true" style={{ fontSize: 24, lineHeight: 1 }}>
      {symbol}
    </span>
    {label}
  </div>
);

const PageFrame = ({
  children,
  section = 'PROBLEM FRAMEWORK',
  categoryLabel = '講者詮釋',
  categorySymbol = '◇',
}: {
  children: ReactNode;
  section?: string;
  categoryLabel?: string;
  categorySymbol?: string;
}) => (
  <div style={pageRoot}>
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
      <CategoryLabel label={categoryLabel} symbol={categorySymbol} />
    </header>

    <main style={{ flex: 1, minHeight: 0 }}>{children}</main>

    <footer
      style={{
        height: 24,
        display: 'flex',
        alignItems: 'center',
        gap: 18,
        color: palette.dim,
        fontSize: 22,
        fontWeight: 600,
        letterSpacing: '0.08em',
      }}
    >
      <span>PLACEMENT</span>
      <span aria-hidden="true" style={{ color: palette.borderStrong }}>
        ───
      </span>
      <span>OWNERSHIP</span>
      <span aria-hidden="true" style={{ color: palette.borderStrong }}>
        ───
      </span>
      <span>ENFORCEMENT</span>
    </footer>
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
        style={{
          margin: '22px 0 0',
          maxWidth: 1420,
          color: palette.textSoft,
          fontSize: 'var(--osd-size-body)',
          fontWeight: 500,
          lineHeight: 1.45,
        }}
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
      <span>new-code.ts</span>
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
    <div
      style={{
        marginTop: 28,
        color: 'var(--osd-accent)',
        fontSize: 24,
        fontWeight: 800,
        textAlign: 'center',
      }}
    >
      放哪裡？
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

const Cover: Page = () => (
  <PageFrame>
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
          style={{
            margin: 0,
            maxWidth: 900,
            fontFamily: 'var(--osd-font-display)',
            fontSize: 'var(--osd-size-hero)',
            fontWeight: 800,
            lineHeight: 0.94,
            letterSpacing: '-0.055em',
          }}
        >
          一段程式碼，
          <br />
          到底該放
          <br />
          哪裡？
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

const RoleCard = ({
  icon,
  role,
  answer,
  detail,
}: {
  icon: string;
  role: string;
  answer: string;
  detail: string;
}) => (
  <div
    style={{
      ...panelStyle,
      width: 390,
      height: 220,
      padding: 30,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
    }}
  >
    <div style={{ display: 'flex', alignItems: 'center', gap: 15 }}>
      <span aria-hidden="true" style={{ fontSize: 34 }}>
        {icon}
      </span>
      <span style={{ color: palette.textSoft, fontSize: 27, fontWeight: 700 }}>{role}</span>
    </div>
    <div
      style={{
        padding: '13px 17px',
        border: `1px dashed ${palette.accentLine}`,
        borderRadius: 12,
        background: palette.accentSoft,
        color: 'var(--osd-accent)',
        fontFamily: fonts.mono,
        fontSize: 25,
        fontWeight: 700,
      }}
    >
      {answer}
    </div>
    <div style={{ color: palette.muted, fontSize: 22, fontWeight: 600 }}>{detail}</div>
  </div>
);

const ProcessCue = ({ label }: { label: string }) => (
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
      › › ›
    </span>
  </div>
);

const CostChip = ({ symbol, title, detail }: { symbol: string; title: string; detail: string }) => (
  <div
    style={{
      display: 'flex',
      alignItems: 'center',
      gap: 14,
      padding: '17px 22px',
      border: `1px solid ${palette.border}`,
      borderRadius: 16,
      background: palette.whiteSoft,
      color: palette.textSoft,
      fontSize: 25,
      fontWeight: 700,
    }}
  >
    <span aria-hidden="true" style={{ color: 'var(--osd-accent)', fontSize: 27 }}>
      {symbol}
    </span>
    <span>{title}</span>
    <span style={{ color: palette.muted, fontWeight: 500 }}>{detail}</span>
  </div>
);

const ProblemSetup: Page = () => (
  <PageFrame>
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', gap: 34 }}>
      <PageHeading
        title={
          <>
            placement 分歧，會讓同一個成本
            <span style={{ color: 'var(--osd-accent)' }}>反覆出現</span>
          </>
        }
        lead="不是誰比較會背目錄，而是每個角色都得重新補齊判斷脈絡。"
      />

      <section
        aria-label="人、AI 與 reviewer 在不同 placement 答案間來回"
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          gap: 36,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <RoleCard icon="人" role="Implementer" answer="features/" detail="依業務修改來看" />
          <ProcessCue label="補 context" />
          <RoleCard icon="AI" role="Agent" answer="composables/" detail="依現有 pattern 來看" />
          <ProcessCue label="再解釋" />
          <RoleCard icon="評" role="Reviewer" answer="shared/" detail="依重用期待來看" />
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', gap: 24 }}>
          <CostChip symbol="↻" title="重構" detail="重新搬移" />
          <CostChip symbol="↔" title="review" detail="重講理由" />
          <CostChip symbol="＋" title="AI context" detail="補更多規則" />
        </div>
      </section>
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
        title="技術分類容易上手；業務修改卻可能散在三處"
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
      gap: 22,
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
      <span style={{ color: palette.textSoft, fontSize: 22 }}>一起變動、一起找到</span>
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
            Feature colocation，<span style={{ color: 'var(--osd-accent)' }}>真的改善了 locality</span>
          </>
        }
        lead="一起變動的程式碼靠近，搜尋、理解與修改的路徑都更短。"
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
        <ProcessCue label="colocate" />
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
        lead="分組改善了 locality；architecture contract 仍需要團隊明確定義。"
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
          <path d="M334 272 L680 270" fill="none" stroke={palette.borderStrong} strokeWidth="3" strokeDasharray="10 10" />
          <path d="M1346 272 L1000 270" fill="none" stroke={palette.borderStrong} strokeWidth="3" strokeDasharray="10 10" />
          <path d="M840 374 L840 330" fill="none" stroke={palette.borderStrong} strokeWidth="3" strokeDasharray="10 10" />
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
            top: 158,
            width: 508,
            height: 176,
            display: 'grid',
            placeItems: 'center',
            borderColor: 'var(--osd-accent)',
            background: palette.accentSoft,
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
            <div style={{ marginTop: 13, color: palette.textSoft, fontSize: 25, fontWeight: 600 }}>
              分組完成，不等於契約完成
            </div>
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
            用 FSD lens，把<span style={{ color: 'var(--osd-accent)' }}>判斷語言</span>接上機械護欄
          </>
        }
        lead="不是推銷唯一解，而是讓人與 AI 能共同判斷、讓 CI 保護可驗證的部分。"
      />

      <section
        aria-label="判斷語言與機械護欄的雙軌承諾"
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
            title="判斷語言"
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
            title="機械護欄"
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
          可理解　·　可 review　·　<span style={{ color: 'var(--osd-accent)' }}>可部分機械驗證</span>
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
  accent = false,
}: {
  icon: string;
  eyebrow: string;
  title: string;
  detail: ReactNode;
  accent?: boolean;
}) => (
  <div
    style={{
      ...panelStyle,
      height: 388,
      padding: 40,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      borderColor: accent ? 'var(--osd-accent)' : palette.borderStrong,
      borderStyle: accent ? 'solid' : 'dashed',
      boxShadow: accent ? '0 0 0 8px rgba(0, 220, 130, 0.06)' : undefined,
    }}
  >
    <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
      <span
        aria-hidden="true"
        style={{
          width: 52,
          height: 52,
          display: 'grid',
          placeItems: 'center',
          border: `2px ${accent ? 'solid' : 'dashed'} ${
            accent ? 'var(--osd-accent)' : palette.borderStrong
          }`,
          borderRadius: 15,
          color: accent ? 'var(--osd-accent)' : palette.textSoft,
          fontSize: 28,
          fontWeight: 800,
        }}
      >
        {icon}
      </span>
      <span
        style={{
          color: accent ? 'var(--osd-accent)' : palette.muted,
          fontSize: 23,
          fontWeight: 800,
          letterSpacing: '0.1em',
        }}
      >
        {eyebrow}
      </span>
    </div>

    <div
      style={{
        color: accent ? 'var(--osd-accent)' : 'var(--osd-text)',
        fontFamily: fonts.mono,
        fontSize: accent ? 76 : 49,
        fontWeight: 800,
        letterSpacing: '-0.04em',
      }}
    >
      {title}
    </div>

    <div style={{ color: palette.textSoft, fontSize: 32, fontWeight: 600, lineHeight: 1.45 }}>
      {detail}
    </div>
  </div>
);

const SourcePolicy: Page = () => (
  <PrimerFrame categoryLabel="現行官方 guidance／講者背景" categorySymbol="◐">
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', gap: 34 }}>
      <PageHeading
        title="先把 current source 說清楚"
        lead="本演講的現行 FSD guidance，以 fsd.how 與它連結的一手資料為準。"
      />

      <section
        aria-label="本演講的 FSD current source 與 legacy domain 使用界線"
        style={{
          flex: 1,
          display: 'grid',
          gridTemplateColumns: '1.28fr 0.72fr',
          alignItems: 'center',
          gap: 36,
        }}
      >
        <SourcePolicyCard
          icon="✓"
          eyebrow="CANONICAL SOURCE"
          title="fsd.how"
          accent
          detail={
            <>
              現行 guidance
              <br />
              2026-08-14 已查核的一手入口
            </>
          }
        />
        <SourcePolicyCard
          icon="!"
          eyebrow="SPEAKER CONTEXT"
          title="Legacy domain"
          detail={
            <>
              不作 current guidance
              <br />
              不計入架構案例
            </>
          }
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
        lead="app/ + pages/ + shared/ 就能作為有效起點；其他層有明確價值再加入。"
      />

      <section
        aria-label="App、Pages、Shared 為常見起點，Features 與 Entities 有價值再加入的 layer 階梯"
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 12,
        }}
      >
        <LayerTier name="app/" role="啟動、providers、routing" status="常見起點" width={790} />
        <LayerTier name="pages/" role="頁面組合與本地邏輯" status="常見起點" width={900} />
        <LayerTier
          name="features/"
          role="跨頁重用的使用者互動"
          status="有價值再加"
          width={1010}
          optional
        />
        <LayerTier
          name="entities/"
          role="穩定、可重用的 business model"
          status="有價值再加"
          width={1120}
          optional
        />
        <LayerTier name="shared/" role="無業務邏輯的基礎設施" status="常見起點" width={1230} />
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
        title="Slice 按業務意義分；segment 按內部目的分"
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
            <SegmentBox name="model/" purpose="狀態與規則" example="checkout.ts" />
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
        lead="高層只 import 更低層；外部依賴先穿過 Public API，不鑽進 slice internals。"
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
            <div style={{ color: palette.muted, fontSize: 22, fontWeight: 800, letterSpacing: '0.08em' }}>
              HIGHER LAYER
            </div>
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
            d="M840 122 L840 166 M840 216 L840 248"
            fill="none"
            stroke="var(--osd-accent)"
            strokeWidth="4"
            strokeDasharray="11 10"
          />
          <path d="M826 232 L840 250 L854 232" fill="none" stroke="var(--osd-accent)" strokeWidth="4" />
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
            LOWER LAYER · SLICE · features/payment/
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
        title="先留在 Pages；證據出現後再抽離"
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
        <DecisionColumn question="抽離能解決真實重複？" branchLabel="NO" outcome="延後抽離" />
        <DecisionArrow label="YES" />
        <DecisionColumn question="責任邊界已經穩定？" branchLabel="NO" outcome="延後抽離" />
        <DecisionArrow label="YES" />
        <ExtractionOutcome />

        <div
          style={{
            position: 'absolute',
            right: 10,
            bottom: 0,
            padding: '9px 15px',
            border: `1px dashed ${palette.accentLine}`,
            borderRadius: 999,
            color: palette.textSoft,
            fontSize: 22,
            fontWeight: 700,
          }}
        >
          NEXT · 第一個真實案例：抽得太早
        </div>
      </section>
    </div>
  </PrimerFrame>
);

const CaseFrame = ({
  children,
  categoryLabel = '匿名真實案例',
  categorySymbol = '●',
}: {
  children: ReactNode;
  categoryLabel?: string;
  categorySymbol?: string;
}) => (
  <PageFrame
    section="ARCHITECTURE CASES"
    categoryLabel={categoryLabel}
    categorySymbol={categorySymbol}
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
        fontSize: compact ? 19 : 22,
        fontWeight: 800,
      }}
    >
      {index}
    </div>
    <strong style={{ color: palette.textSoft, fontSize: compact ? 27 : 31, lineHeight: 1.2 }}>{title}</strong>
    <div
      style={{
        color: palette.muted,
        fontSize: compact ? 21 : 24,
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
        lead="只有一個使用情境時，UI、form 與 server-data policy 就被包成同一個 abstraction。"
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
            <ResponsibilityTile index="02" title="Form adapter" detail="field state · validation · error" />
            <ResponsibilityTile
              index="03"
              title="Server-data owner"
              detail="source · transform · loading policy"
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
        title="例外愈加愈多，control 仍無法獨立演進"
        lead="脫離 form 或替換資料來源，都得繞著原本的共用 abstraction 修補。"
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
          <path d="M286 154 L435 206" fill="none" stroke={palette.borderStrong} strokeWidth="3" strokeDasharray="9 10" />
          <path d="M1394 114 L1245 196" fill="none" stroke={palette.borderStrong} strokeWidth="3" strokeDasharray="9 10" />
          <path d="M1394 322 L1245 284" fill="none" stroke={palette.borderStrong} strokeWidth="3" strokeDasharray="9 10" />
        </svg>

        <PressureChip title="外層 wrapper" detail="把舊 contract 再包一層" style={{ left: 16, top: 96 }} />
        <PressureChip title="例外 prop" detail="為新情境繼續開洞" style={{ right: 16, top: 44 }} />
        <PressureChip title="更多條件分支" detail="責任仍留在同一處" style={{ right: 16, top: 252 }} />

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
        title="壓力測試：第二個 consumer 根本不是表單"
        lead="它只需要相同 UI；是否被迫繼承 form 與 data policy，會直接暴露邊界。"
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
          <strong style={{ color: 'var(--osd-text)', fontSize: 38, lineHeight: 1.2 }}>
            非表單 consumer
          </strong>
          <div style={{ color: palette.textSoft, fontSize: 26, fontWeight: 600, lineHeight: 1.4 }}>
            需要 options、value 與互動
            <br />
            不需要 form context
          </div>
        </div>

        <div
          style={{
            position: 'absolute',
            left: 582,
            top: 102,
            color: palette.muted,
            fontFamily: fonts.mono,
            fontSize: 22,
            fontWeight: 800,
          }}
        >
          import 整包責任
        </div>
        <div
          style={{
            position: 'absolute',
            left: 582,
            top: 366,
            color: 'var(--osd-accent)',
            fontFamily: fonts.mono,
            fontSize: 22,
            fontWeight: 800,
          }}
        >
          import UI contract
        </div>

        <ProbeRoute
          symbol="×"
          title="繼承整包 abstraction"
          detail="被迫建立假表單，或再加入 wrapper／例外 props。"
          style={{ right: 52, top: 42 }}
        />
        <ProbeRoute
          symbol="✓"
          title="只重用受控 UI"
          detail="consumer 自己擁有狀態與資料來源；form policy 不跟過來。"
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
      <div style={{ color: palette.muted, fontSize: 21, fontWeight: 800, letterSpacing: '0.07em' }}>
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
        title="修正不是搬家；是拆回三個可獨立演進的責任"
        lead="Owning page／feature 組合 policy；只有已穩定的 UI contract 才成為重用候選。"
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
          <path d="M840 340 L1198 302" fill="none" stroke="var(--osd-accent)" strokeWidth="4" />
          <path d="M1180 178 L1200 190 L1180 200" fill="none" stroke="var(--osd-accent)" strokeWidth="4" />
          <path d="M1180 291 L1200 302 L1180 313" fill="none" stroke="var(--osd-accent)" strokeWidth="4" />
          <path
            d="M930 70 L1424 70 L1424 90 M1424 135 L1424 156"
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
          >
            OWNING PAGE / FEATURE · POLICY OWNER
          </div>
          <OwnerTile
            eyebrow="RESPONSIBILITY 01"
            title="Server-data owner"
            detail="選來源、轉換資料，決定 loading／error policy。"
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
            height: 270,
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
              fontSize: 21,
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
            fontSize: 21,
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
            fontSize: 21,
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
            fontSize: 21,
            fontWeight: 800,
          }}
        >
          import via Public API
        </div>
      </section>
    </div>
  </CaseFrame>
);

const FeatureSchemaCard = ({
  feature,
  localComposition,
  schemaName,
}: {
  feature: string;
  localComposition: string;
  schemaName: string;
}) => (
  <div
    style={{
      ...panelStyle,
      width: 470,
      height: 356,
      padding: '72px 30px 30px',
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      gap: 20,
      borderColor: palette.borderStrong,
    }}
  >
    <div
      style={{
        position: 'absolute',
        left: 26,
        top: 18,
        color: palette.muted,
        fontSize: 21,
        fontWeight: 800,
        letterSpacing: '0.08em',
      }}
    >
      {feature} · FULL SCHEMA OWNER
    </div>
    <strong style={{ color: palette.textSoft, fontSize: 32 }}>{schemaName}</strong>
    <div
      style={{
        padding: '18px 20px',
        border: `1px solid ${palette.borderStrong}`,
        borderRadius: 14,
        background: palette.whiteSoft,
        color: palette.textSoft,
        fontSize: 24,
        fontWeight: 700,
      }}
    >
      {localComposition}
    </div>
    <div
      style={{
        padding: '18px 20px',
        border: `1px dashed ${palette.accentLine}`,
        borderRadius: 14,
        color: 'var(--osd-accent)',
        fontSize: 24,
        fontWeight: 700,
      }}
    >
      某項共通欄位規則
    </div>
  </div>
);

const ValidSchemaOwnership: Page = () => (
  <CaseFrame>
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', gap: 26 }}>
      <PageHeading
        title="案例二：各 feature 合理擁有不同完整 schema"
        lead="欄位組合與 feature-specific validation 本來就不必長成同一份。"
      />

      <section
        aria-label="三個 feature 各自擁有不同完整 schema，並保留一項語意相同的欄位規則"
        style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 30 }}
      >
        <div style={{ display: 'flex', justifyContent: 'center', gap: 34 }}>
          <FeatureSchemaCard feature="FEATURE A" schemaName="Schema A" localComposition="本地欄位組合 α" />
          <FeatureSchemaCard feature="FEATURE B" schemaName="Schema B" localComposition="本地欄位組合 β" />
          <FeatureSchemaCard feature="FEATURE C" schemaName="Schema C" localComposition="本地欄位組合 γ" />
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
          完整 schema 不同 <span style={{ color: palette.dim, padding: '0 12px' }}>≠</span> 所有規則都該各自複製
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
        title="同一語意規則被複製；修改一次，行為卻開始分岔"
        lead="有些副本被更新，有些被漏掉，甚至很難知道還有哪些地方必須同步。"
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
        >
          同一項欄位規則改變　·　副本結構示意，不代表實際數量
        </div>

        <div style={{ display: 'flex', gap: 36 }}>
          <RuleCopyCard owner="某個 feature" version="rule · NEW" status="這份已更新" symbol="✓" accent />
          <RuleCopyCard owner="另一個 feature" version="rule · OLD" status="這份仍是舊行為" symbol="!" />
          <RuleCopyCard owner="其他副本" version="rule · ?" status="影響範圍難發現" symbol="?" />
        </div>

        <div
          style={{
            width: 1380,
            padding: '18px 26px',
            border: `2px dashed ${palette.accentLine}`,
            borderRadius: 18,
            background: palette.accentSoft,
            color: palette.textSoft,
            fontSize: 28,
            fontWeight: 800,
            textAlign: 'center',
          }}
        >
          validation drift <span style={{ color: palette.dim, padding: '0 14px' }}>=</span>
          <span style={{ color: 'var(--osd-accent)' }}>同一語意，卻有不同驗證行為</span>
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
      height: 212,
    }}
  >
    <span
      style={{
        position: 'absolute',
        left: 0,
        top: 0,
        height: 149,
        borderLeft: '3px dashed var(--osd-accent)',
      }}
    />
    <span
      style={{
        position: 'absolute',
        left: 0,
        top: 195,
        height: 17,
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
        background: palette.bg,
        color: 'var(--osd-accent)',
        fontFamily: fonts.mono,
        fontSize: 19,
        fontWeight: 800,
        whiteSpace: 'nowrap',
      }}
    >
      import fieldRule
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
        title="保留完整 schema；只下沉已證明必須一致的 rule"
        lead="共享的是一項穩定責任，不是把所有 feature validation 合成 universal schema。"
      />

      <section
        aria-label="三個 feature schema 經具名 Public API 靜態依賴同一個 lower domain boundary field rule"
        style={{ position: 'relative', flex: 1, minHeight: 0 }}
      >
        <div style={{ position: 'absolute', left: 40, top: 10, zIndex: 3, display: 'flex', gap: 90 }}>
          <SchemaOwnerMini name="Feature A schema" detail="保留本地欄位組合" />
          <SchemaOwnerMini name="Feature B schema" detail="保留本地欄位組合" />
          <SchemaOwnerMini name="Feature C schema" detail="保留本地欄位組合" />
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
              fontSize: 21,
              fontWeight: 800,
              textAlign: 'center',
            }}
          >
            PUBLIC API · fieldRule
          </div>
          <strong style={{ color: 'var(--osd-accent)', fontSize: 30 }}>Shared field rule</strong>
          <div style={{ marginTop: 6, color: palette.textSoft, fontSize: 21, fontWeight: 700 }}>
            適當 lower domain boundary · 已證明必須一起變
          </div>
        </div>

        <div
          style={{
            position: 'absolute',
            right: 0,
            bottom: 0,
            padding: '10px 16px',
            border: `1px dashed ${palette.accentLine}`,
            borderRadius: 999,
            color: palette.textSoft,
            fontSize: 22,
            fontWeight: 800,
          }}
        >
          NEXT · 誰該擁有 app-wide auth state？
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
        title="案例三：Login behavior 錯誤擁有 app-wide token"
        lead="一次登入行為的 boundary，被延伸成整個 application 的 auth state owner。"
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
              title="Login behavior"
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
}: {
  eyebrow: string;
  title: string;
  children: ReactNode;
}) => (
  <div
    style={{
      ...panelStyle,
      width: 690,
      height: 376,
      padding: '32px 34px',
      display: 'flex',
      flexDirection: 'column',
      gap: 22,
      borderColor: palette.borderStrong,
      borderStyle: 'dashed',
    }}
  >
    <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
      <strong style={{ color: palette.textSoft, fontSize: 34 }}>{title}</strong>
      <span style={{ color: palette.muted, fontSize: 22, fontWeight: 800, letterSpacing: '0.07em' }}>
        {eyebrow}
      </span>
    </div>
    {children}
  </div>
);

const FailureDependencyRow = ({
  consumer,
  destination,
}: {
  consumer: string;
  destination: string;
}) => (
  <div
    style={{
      height: 82,
      display: 'grid',
      gridTemplateColumns: '210px 120px 1fr',
      alignItems: 'center',
      gap: 14,
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
        color: 'var(--osd-accent)',
        fontFamily: fonts.mono,
        fontSize: 22,
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
        padding: '15px 17px',
        border: `1px dashed ${palette.accentLine}`,
        borderRadius: 14,
        color: 'var(--osd-accent)',
        fontFamily: fonts.mono,
        fontSize: 22,
        fontWeight: 700,
        textAlign: 'center',
      }}
    >
      {destination}
    </div>
  </div>
);

const TokenCopyRow = ({
  owner,
  value,
  status,
}: {
  owner: string;
  value: string;
  status: string;
}) => (
  <div
    style={{
      height: 82,
      display: 'grid',
      gridTemplateColumns: '210px 150px 1fr',
      alignItems: 'center',
      gap: 14,
      padding: '0 18px',
      border: `1px solid ${palette.borderStrong}`,
      borderRadius: 14,
      background: palette.whiteSoft,
    }}
  >
    <strong style={{ color: palette.textSoft, fontFamily: fonts.mono, fontSize: 22 }}>{owner}</strong>
    <span style={{ color: 'var(--osd-accent)', fontFamily: fonts.mono, fontSize: 22, fontWeight: 800 }}>
      {value}
    </span>
    <span style={{ color: palette.muted, fontSize: 22, fontWeight: 700 }}>{status}</span>
  </div>
);

const AuthOwnershipConsequence: Page = () => (
  <CaseFrame>
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', gap: 26 }}>
      <PageHeading
        title="其他 consumers，只剩反向依賴或各自複製"
        lead="Token owner 藏在 login feature，會同時破壞依賴方向與狀態一致性。"
      />

      <section
        aria-label="其他 feature 與 shared api 反向依賴 features login，或各自複製 token state 的兩種後果"
        style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 44 }}
      >
        <FailurePathCard eyebrow="STATIC DEPENDENCY" title="反向依賴 login">
          <FailureDependencyRow consumer="other feature" destination="features/login/token" />
          <FailureDependencyRow consumer="shared/api" destination="features/login/token" />
          <div style={{ color: palette.muted, fontSize: 23, fontWeight: 700, textAlign: 'center' }}>
            lower infrastructure 被迫知道 higher feature
          </div>
        </FailurePathCard>

        <FailurePathCard eyebrow="STATE COPIES" title="各自維護 token">
          <TokenCopyRow owner="consumer A" value="token · copy A" status="獨立更新" />
          <TokenCopyRow owner="consumer B" value="token · copy B" status="一致性無 owner" />
          <div style={{ color: palette.muted, fontSize: 23, fontWeight: 700, textAlign: 'center' }}>
            同一個 auth truth，開始出現多個版本
          </div>
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

const AuthOwnershipCorrection: Page = () => (
  <CaseFrame categoryLabel="現行官方 guidance／匿名真實案例" categorySymbol="◈">
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', gap: 22 }}>
      <PageHeading
        title="Login 使用 auth state；不擁有它"
        lead="本案例的 simple token／session，由穩定的 shared/auth boundary 承接。"
      />

      <section
        aria-label="Login 與其他 authenticated flows 向下依賴 shared auth Public API 的 ownership correction"
        style={{ position: 'relative', flex: 1, minHeight: 0 }}
      >
        <svg
          aria-hidden="true"
          viewBox="0 0 1680 500"
          preserveAspectRatio="none"
          style={{ position: 'absolute', inset: 0, zIndex: 2, width: '100%', height: '100%' }}
        >
          <path d="M430 170 L690 286" fill="none" stroke="var(--osd-accent)" strokeWidth="4" strokeDasharray="11 10" />
          <path d="M1250 170 L990 286" fill="none" stroke="var(--osd-accent)" strokeWidth="4" strokeDasharray="11 10" />
          <path d="M672 270 L692 287 L666 292" fill="none" stroke="var(--osd-accent)" strokeWidth="4" />
          <path d="M1008 270 L988 287 L1014 292" fill="none" stroke="var(--osd-accent)" strokeWidth="4" />
        </svg>

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

        <div
          style={{
            position: 'absolute',
            left: 496,
            top: 205,
            zIndex: 3,
            color: 'var(--osd-accent)',
            fontFamily: fonts.mono,
            fontSize: 22,
            fontWeight: 800,
          }}
        >
          depend on Public API
        </div>
        <div
          style={{
            position: 'absolute',
            right: 496,
            top: 205,
            zIndex: 3,
            color: 'var(--osd-accent)',
            fontFamily: fonts.mono,
            fontSize: 22,
            fontWeight: 800,
          }}
        >
          depend on Public API
        </div>

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
          <div style={{ marginTop: 13, color: palette.textSoft, fontSize: 25, fontWeight: 700 }}>
            current token　·　minimal session
          </div>
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
          本案選擇 <span style={{ color: palette.dim, padding: '0 8px' }}>≠</span> 所有 auth domain 的唯一答案
        </div>
      </section>
    </div>
  </CaseFrame>
);

const WiringBox = ({
  eyebrow,
  title,
  detail,
  style,
  accent = false,
}: {
  eyebrow: string;
  title: string;
  detail: ReactNode;
  style: CSSProperties;
  accent?: boolean;
}) => (
  <div
    style={{
      ...panelStyle,
      ...style,
      position: 'absolute',
      padding: '20px 24px',
      borderColor: accent ? 'var(--osd-accent)' : palette.borderStrong,
      background: accent ? palette.accentSoft : `linear-gradient(145deg, ${palette.panelStrong}, ${palette.panel})`,
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
    <strong
      style={{
        display: 'block',
        marginTop: 7,
        color: accent ? 'var(--osd-accent)' : palette.textSoft,
        fontSize: 29,
      }}
    >
      {title}
    </strong>
    <div style={{ marginTop: 6, color: palette.textSoft, fontSize: 22, fontWeight: 600, lineHeight: 1.4 }}>
      {detail}
    </div>
  </div>
);

const AuthWiring: Page = () => (
  <CaseFrame categoryLabel="現行官方 guidance／講者詮釋" categorySymbol="◈">
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', gap: 20 }}>
      <PageHeading
        title="App 接線；每次 request 才讀最新 token"
        lead="app.use()／provide-inject 是 composition mechanism，不是新的 auth owner。"
      />

      <section
        aria-label="App composition root 將 current token provider 接給 shared api，interceptor 每次 request 讀 shared auth 最新 token"
        style={{ position: 'relative', flex: 1, minHeight: 0 }}
      >
        <svg
          aria-hidden="true"
          viewBox="0 0 1680 500"
          preserveAspectRatio="none"
          style={{ position: 'absolute', inset: 0, zIndex: 2, width: '100%', height: '100%' }}
        >
          <defs>
            <marker
              id="auth-static-arrow"
              viewBox="0 0 22 22"
              refX="20"
              refY="11"
              markerWidth="22"
              markerHeight="22"
              markerUnits="userSpaceOnUse"
              orient="auto"
            >
              <path d="M2 2 L20 11 L2 20" fill="none" stroke={palette.borderStrong} strokeWidth="3" />
            </marker>
          </defs>
          <path d="M650 132 L340 205" fill="none" stroke={palette.borderStrong} strokeWidth="3" strokeDasharray="10 10" markerEnd="url(#auth-static-arrow)" />
          <path d="M1030 132 L1340 205" fill="none" stroke={palette.borderStrong} strokeWidth="3" strokeDasharray="10 10" markerEnd="url(#auth-static-arrow)" />
          <path d="M840 132 L840 220" fill="none" stroke="var(--osd-accent)" strokeWidth="4" />
          <path d="M826 204 L840 222 L854 204" fill="none" stroke="var(--osd-accent)" strokeWidth="4" />
          <path d="M1140 280 L980 280" fill="none" stroke="var(--osd-accent)" strokeWidth="4" />
          <path d="M996 267 L978 280 L996 293" fill="none" stroke="var(--osd-accent)" strokeWidth="4" />
          <path d="M700 280 L540 280" fill="none" stroke="var(--osd-accent)" strokeWidth="4" />
          <path d="M556 267 L538 280 L556 293" fill="none" stroke="var(--osd-accent)" strokeWidth="4" />
        </svg>

        <div
          style={{
            ...panelStyle,
            position: 'absolute',
            left: 360,
            top: 0,
            zIndex: 3,
            width: 960,
            height: 132,
            padding: '16px 24px',
            borderColor: palette.borderStrong,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 20 }}>
            <div style={{ color: palette.muted, fontSize: 22, fontWeight: 800, letterSpacing: '0.08em', whiteSpace: 'nowrap' }}>
              APP · COMPOSITION ROOT
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <span style={{ padding: '7px 10px', border: `1px solid ${palette.borderStrong}`, borderRadius: 999, color: palette.textSoft, fontFamily: fonts.mono, fontSize: 22, fontWeight: 800, whiteSpace: 'nowrap' }}>Vue Plugin · app.use()</span>
              <span style={{ padding: '7px 10px', border: `1px dashed ${palette.accentLine}`, borderRadius: 999, color: 'var(--osd-accent)', fontFamily: fonts.mono, fontSize: 22, fontWeight: 800, whiteSpace: 'nowrap' }}>provide / inject</span>
            </div>
          </div>
          <strong style={{ display: 'block', marginTop: 7, color: palette.textSoft, fontSize: 28 }}>
            wire getToken provider
          </strong>
        </div>

        <div style={{ position: 'absolute', left: 432, top: 168, zIndex: 4, color: palette.muted, fontFamily: fonts.mono, fontSize: 22, fontWeight: 800 }}>
          import contract
        </div>
        <div style={{ position: 'absolute', right: 432, top: 168, zIndex: 4, color: palette.muted, fontFamily: fonts.mono, fontSize: 22, fontWeight: 800 }}>
          import contract
        </div>
        <div style={{ position: 'absolute', left: 860, top: 168, zIndex: 4, color: 'var(--osd-accent)', fontFamily: fonts.mono, fontSize: 22, fontWeight: 800 }}>
          wire once
        </div>

        <WiringBox
          eyebrow="AUTH STATE OWNER"
          title="shared/auth"
          detail="current token · minimal session"
          style={{ left: 70, top: 246, zIndex: 3, width: 470, height: 156 }}
        />
        <WiringBox
          eyebrow="TOKEN PROVIDER"
          title="getToken()"
          detail="returns current value"
          style={{ left: 700, top: 258, zIndex: 3, width: 280, height: 160, textAlign: 'center' }}
          accent
        />
        <WiringBox
          eyebrow="API INFRASTRUCTURE"
          title="shared/api"
          detail="request interceptor · Authorization"
          style={{ right: 70, top: 246, zIndex: 3, width: 470, height: 156 }}
        />

        <div style={{ position: 'absolute', left: 548, top: 295, zIndex: 4, color: 'var(--osd-accent)', fontFamily: fonts.mono, fontSize: 22, fontWeight: 800 }}>
          read latest
        </div>
        <div style={{ position: 'absolute', right: 548, top: 295, zIndex: 4, color: 'var(--osd-accent)', fontFamily: fonts.mono, fontSize: 22, fontWeight: 800 }}>
          per request
        </div>

        <div
          style={{
            position: 'absolute',
            left: 440,
            bottom: 0,
            width: 800,
            padding: '10px 18px',
            border: `1px dashed ${palette.accentLine}`,
            borderRadius: 999,
            color: palette.textSoft,
            fontSize: 22,
            fontWeight: 800,
            textAlign: 'center',
          }}
        >
          setup-time token snapshot　<span style={{ color: palette.dim }}>×</span>　request-time current read　<span style={{ color: 'var(--osd-accent)' }}>✓</span>
        </div>
      </section>
    </div>
  </CaseFrame>
);

const FrameworkFrame = ({
  children,
  categoryLabel = '現行官方 guidance／講者詮釋',
  categorySymbol = '◈',
}: {
  children: ReactNode;
  categoryLabel?: string;
  categorySymbol?: string;
}) => (
  <PageFrame section="FRAMEWORK SEAMS" categoryLabel={categoryLabel} categorySymbol={categorySymbol}>
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
  <FrameworkFrame>
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', gap: 28 }}>
      <PageHeading
        title="Nuxt page 與 FSD Page：同名，責任不同"
        lead="一個描述 framework route manifest；一個封裝 application page module。"
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
      fontSize: 23,
      fontWeight: 700,
      lineHeight: 1.5,
      whiteSpace: 'nowrap',
    }}
  >
    {children}
  </div>
);

const AdapterArrow = ({ label, runtime = false }: { label: string; runtime?: boolean }) => (
  <div style={{ width: 250, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 9 }}>
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
        title="薄 route adapter，守住 Page boundary"
        lead="Nuxt entry 經具名 Public API 接線；business behavior 不留在 scanner 目錄。"
      />

      <section
        aria-label="Nuxt route adapter 經 FSD Page Public API 靜態依賴並 render application page"
        style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 32 }}
      >
        <div
          style={{
            ...panelStyle,
            width: 610,
            height: 340,
            padding: '30px 32px',
            borderColor: palette.borderStrong,
            borderStyle: 'dashed',
          }}
        >
          <div style={{ color: palette.muted, fontSize: 22, fontWeight: 800, letterSpacing: '0.08em' }}>
            NUXT ROUTE ADAPTER · src/app/routes/index.vue
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
          <AdapterArrow label="static import · via Public API" />
          <AdapterArrow label="runtime flow · render page" runtime />
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

const SnapshotCheck = ({ command }: { command: string }) => (
  <div
    style={{
      height: 64,
      padding: '0 20px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      border: `1px solid ${palette.borderStrong}`,
      borderRadius: 14,
      background: palette.whiteSoft,
    }}
  >
    <span style={{ color: palette.textSoft, fontFamily: fonts.mono, fontSize: 23, fontWeight: 700 }}>
      {command}
    </span>
    <span style={{ color: 'var(--osd-accent)', fontFamily: fonts.mono, fontSize: 22, fontWeight: 900 }}>
      PASS · ✓
    </span>
  </div>
);

const EvidencePill = ({ eyebrow, value }: { eyebrow: string; value: string }) => (
  <div
    style={{
      minWidth: 330,
      padding: '12px 18px',
      border: `1px solid ${palette.borderStrong}`,
      borderRadius: 999,
      background: palette.whiteSoft,
      textAlign: 'center',
    }}
  >
    <span style={{ color: palette.muted, fontSize: 22, fontWeight: 800, letterSpacing: '0.06em' }}>
      {eyebrow} ·{' '}
    </span>
    <span style={{ color: palette.textSoft, fontFamily: fonts.mono, fontSize: 22, fontWeight: 800 }}>
      {value}
    </span>
  </div>
);

const NuxtFixtureEvidence: Page = () => (
  <FrameworkFrame categoryLabel="已驗證版本 snapshot" categorySymbol="■">
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', gap: 22 }}>
      <PageHeading
        title="Nuxt 4.5.2 fixture：這條 seam 有 build evidence"
        lead="2026-08-14 snapshot；不是唯一 Nuxt 4 config，也不是 deployment certification。"
      />

      <section style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 24 }}>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 38 }}>
          <div
            style={{
              ...panelStyle,
              width: 700,
              height: 356,
              padding: '28px 32px',
              borderColor: palette.borderStrong,
            }}
          >
            <div style={{ color: palette.muted, fontSize: 22, fontWeight: 800, letterSpacing: '0.08em' }}>
              nuxt.config.ts · VERIFIED CONFIG
            </div>
            <div style={{ marginTop: 22, padding: '18px 22px', border: `1px solid ${palette.borderStrong}`, borderRadius: 14, background: '#040821' }}>
              <ConfigLine accent>{"srcDir: 'src/',"}</ConfigLine>
              <ConfigLine>{"dir: { app: 'app',"}</ConfigLine>
              <ConfigLine>{"  pages: 'app/routes',"}</ConfigLine>
              <ConfigLine>{"  layouts: 'app/layouts' },"}</ConfigLine>
              <ConfigLine>{'// src/app/routes/index.vue'}</ConfigLine>
              <ConfigLine accent>{"import { HomePage } from '@/pages/home'"}</ConfigLine>
            </div>
          </div>

          <div
            style={{
              ...panelStyle,
              width: 700,
              height: 356,
              padding: '28px 32px',
              display: 'flex',
              flexDirection: 'column',
              gap: 15,
              borderColor: 'var(--osd-accent)',
              boxShadow: '0 0 0 8px rgba(0, 220, 130, 0.055)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
              <span style={{ color: 'var(--osd-accent)', fontSize: 22, fontWeight: 800, letterSpacing: '0.08em' }}>
                SNAPSHOT PASS 防線
              </span>
              <span style={{ color: palette.muted, fontSize: 22, fontWeight: 800 }}>
                Nuxt 4.5.2 · TS 6.0.3
              </span>
            </div>
            <SnapshotCheck command="prepare" />
            <SnapshotCheck command="typecheck" />
            <SnapshotCheck command="production build" />
            <div style={{ color: palette.muted, fontSize: 22, fontWeight: 700, textAlign: 'right' }}>
              vue-tsc 3.3.9 · production output inspected
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 18 }}>
          <EvidencePill eyebrow="SOURCE ROOT" value="src/app.vue" />
          <EvidencePill eyebrow="BUILT-IN @" value="@ → src/" />
          <EvidencePill eyebrow="ROUTE ENTRY" value="@/pages/home" />
          <div
            style={{
              minWidth: 430,
              padding: '12px 18px',
              border: `1px dashed ${palette.accentLine}`,
              borderRadius: 999,
              color: palette.textSoft,
              fontSize: 22,
              fontWeight: 800,
              textAlign: 'center',
            }}
          >
            NEXT · server-state / cache seam
          </div>
        </div>
      </section>
    </div>
  </FrameworkFrame>
);

export const notes: (string | undefined)[] = [
  `Message:
一段程式碼該放哪裡，不只是路徑選擇，而是長期協作與理解成本。

Context:
[近逐字稿] 各位好，我是一隻狐狸。今天想先問一個很普通、但很難長期維持一致的問題：你手上這段新程式碼，到底該放哪裡？當答案只存在某個人的腦中，每次修改都要先重新理解一次。久了之後，路徑選擇就不只是 folder trivia，而是團隊持續付出的協作成本。

Transition:
我們先從標題這個問題出發，把它放進一個具體修改情境：同一段程式碼，為什麼不同角色會給出不同位置？

Required details:
完整說出正式標題與講者「一隻狐狸」；強調問題是判斷如何被共享，不是背出唯一資料夾答案。

Timing:
45 秒（0:00–0:45）。

Sources:
講者詮釋；依 .scratch/fsd-talk-authoring-brief/spec.md 的 Problem Statement 與 locked page map。本頁沒有外部或版本敏感技術聲明。

Possible Q&A:
問：是不是每段程式碼都有唯一正確位置？答：不一定；需要先知道 ownership、dependency、實際重用與 lifecycle context，才有可解釋的選擇。

Safety boundary:
不宣稱存在萬用 placement 答案，不量化生產力損失，也不把這個一般修改情境包裝成匿名真實案例。`,

  `Message:
placement 分歧會放大重構、review 與 AI context 成本。

Context:
[近逐字稿] 想像同一段 code：implementer 依業務修改把它放進 feature，AI 依現有 pattern 建議 composable，reviewer 又因預期重用要求 shared。這三個答案未必有人明顯錯，但每次來回都要重新補 context、重講理由，甚至重做搬移。AI 不是問題來源；它只是把團隊原本沒有共同說清楚的判斷放大給我們看。

Transition:
承接剛才的 placement 情境，這些來回不是 AI 才有的問題；它反映團隊缺少共同判斷。接下來先看我們最熟悉、也最合理的既有組織方式。

Required details:
明講三種成本：重構重新搬移、review 重講理由、AI context 持續補規則；不要加入速度、準確率或節省比例等數字。

Timing:
45 秒（0:45–1:30）。

Sources:
講者詮釋；依 authoring spec 的 problem framing。本頁沒有外部實證或版本敏感技術聲明。

Possible Q&A:
問：這是不是 AI 特有的問題？答：不是；人與人的 review 也會遇到，AI 只是更明顯暴露 criteria 不一致。

Safety boundary:
不責怪 AI，不聲稱有實證研究支持特定成本幅度，也不把示意角色或路徑說成講者親身案例。`,

  `Message:
Technical-based organization 容易理解與起步，但一次業務修改的邊界可能散落在多個技術目錄。

Context:
先公平承認它的優點：看到 components、composables、utils，新成員通常很快能知道檔案的技術角色。再沿著一次業務修改追查：畫面、狀態、計算規則可能分散在三處；問題不是任何單一目錄錯，而是 business change boundary 未必和 technical role 對齊。

Transition:
承接 placement 分歧，我們先公平承認 technical-based organization 是容易上手的起點；但一次業務修改仍要跨目錄追查，所以自然會開始尋找更好的 locality。

Required details:
精確使用 Technical-based organization；例子限定 components、composables、utils。把「容易開始」與「業務邊界可能散落」同時講完整。

Timing:
120 秒（1:30–3:30）。

Sources:
CONTEXT.md 的 Technical-based organization 定義；講者詮釋。本頁沒有 framework API 或版本聲明。

Possible Q&A:
問：Technical-based organization 是 anti-pattern 嗎？答：不是，它是可理解的起點；限制只是技術分類未必對齊業務修改。

Safety boundary:
不稱為 layered architecture 或 technical layers；不說所有修改必然跨目錄，也不把這種起點畫成愚蠢或錯誤答案。`,

  `Message:
Feature-based organization 讓一起變動的程式碼靠近，真實改善 locality。

Context:
用同一組示意檔案做前後對照：原先要跨三個技術目錄尋找，colocate 後可以從同一項 business capability 進入。先停留在這個改善本身：navigation path 變短，相關 code 更容易一起理解與修改。完成承認後，再問「靠近」是否已經等於責任與依賴都清楚。

Transition:
承接對 locality 的需求，feature colocation 的確讓一起變動的程式靠近；但靠近之後，責任、依賴與對外邊界是否也已經說清楚？

Required details:
使用 Feature-based organization 的精確概念：依 business capability colocate；不要在本頁把它改名成 FSD。

Timing:
90 秒（3:30–5:00）。

Sources:
CONTEXT.md 的 Feature-based organization 定義；講者詮釋。本頁沒有外部或版本敏感技術聲明。

Possible Q&A:
問：做到 feature-based 還不夠嗎？答：可以夠，前提是團隊另外有明確的 boundary、dependency 與演進 policy。

Safety boundary:
不可把 feature-based 等同 FSD；不可說 colocation 消除所有 coupling，也不可用貶低前頁的方式製造改善。`,

  `Message:
Feature 資料夾是分組；它本身不會替團隊共同定義 ownership、dependency、Public API、抽離時機與 enforcement。

Context:
依序把五件事留成問句，不在這頁搶答：誰對這段責任負責？誰可以依賴誰？外部要從哪個入口使用？什麼時候才值得抽離？哪些規則可以交給工具持續保護？Feature-based organization 可以另外制定這些 policy；主張只是資料夾名稱本身不會自動提供答案。

Transition:
承接 feature colocation 的真實改善，我們把仍未共同定義的這五件事，轉成全場要回答的問題；下一頁先說明要用什麼 lens，以及最後要建立什麼方法。

Required details:
五項必須完整且名稱一致：ownership、dependency、Public API、抽離時機、enforcement；Public API 保持精確大小寫。

Timing:
90 秒（5:00–6:30）。

Sources:
.scratch/fsd-talk-authoring-brief/spec.md 的 Problem Statement；CONTEXT.md 的 Feature-based organization 定義；講者詮釋。

Possible Q&A:
問：Feature-based organization 不能自己定義這些嗎？答：可以；這裡只說 folder 本身不會替團隊定義，必須另外明確化。

Safety boundary:
不說 feature-based 永遠無法回答五問，不暗示 FSD 會自動解決，也不提前教 layers、slices 或 placement rule。`,

  `Message:
用 FSD lens 建立人與 AI 共用的判斷語言，並讓 CI 保護其中可機械驗證的部分。

Context:
[近逐字稿] 所以今天不是要賣一張新的資料夾答案表，也不是說 FSD 是唯一解。我會把它當成一個具體 lens：先讓人與 AI 用同一套語言談 ownership、dependency、Public API 與演進，再把真正可觀察、可重複驗證的部分交給 CI。最後要得到的是一套可理解、可 review、也可部分機械保護的方法。

Transition:
承接這五個未決問題，我們會先建立人與 AI 共用的判斷語言，再把可機械驗證的部分交給護欄。下一頁先交代 current source，然後進入最低必要 FSD primer。

Required details:
精確使用 FSD lens；明講非唯一解。CI 只保護可機械驗證的範圍，不替人判斷 business boundary。

Timing:
30 秒（6:30–7:00）。

Sources:
CONTEXT.md 的 FSD lens 與 Architecture operationalization 定義；講者承諾。本頁不是 current official FSD guidance，也沒有版本敏感 API claim。

Possible Q&A:
問：一定要採用 FSD 嗎？答：不用；FSD 是具體 lens，ownership、dependency 與 evolution rules 可以遷移到其他架構方法。

Safety boundary:
不稱 FSD 為唯一解，不宣稱 CI 能證明 business boundary 或全部 architecture correctness，也不在本頁提前引用 legacy domain 或展開 primer。`,

  `Message:
本演講的現行 FSD guidance，以 fsd.how 與它連結的一手資料為準。

Context:
用 20–30 秒交代來源政策：fsd.how 是本演講 authoring 當日（2026-08-14）重新查核的 current entry，後續 layers、Public API 與 Pages First 都從這裡延伸。舊網域只作講者背景；畫面不引用舊網址，也不把網域經過算成架構案例。

Transition:
承接前頁「用 FSD lens 建立共同語言」的承諾，先說清楚這套語言以哪個 current source 為準；接著從第一個最低必要概念 layers 開始。

Required details:
精確說「本演講採用 fsd.how」，不要說網站自行宣布唯一 canonical。現行 guidance 與講者背景必須用文字與不同圖示分標；來源說明控制在 20–30 秒。

Timing:
35 秒（7:00–7:35）。

Sources:
https://fsd.how/（authoring-day 查核：2026-08-14；scope：現行 FSD 文件入口）；https://fsd.how/docs/get-started/overview/（查核：2026-08-14；scope：現行入門概念）。Live docs 未顯示可確認的逐頁發布日期或通用版本選擇器。舊網域經過依 AGENTS.md 僅作講者背景，不列為 current guidance source。

Possible Q&A:
問：為什麼不使用舊網域？答：這份演講固定從 2026-08-14 查核的 fsd.how 與其一手連結延伸；舊網域經過只保留為講者背景，不在現場擴寫成官方歷史。

Safety boundary:
不把 source policy 冒充 fsd.how 首頁的自我宣告，不引用 legacy domain，不把未在本頁一手來源發布的失去控制 chronology 說成官方歷史，也不把來源故事算作第一個真實案例。`,

  `Message:
Layers 表達責任與依賴層級；not all layers are required，App、Pages、Shared 可作常見起點。

Context:
先解釋 layer 不是待辦清單，而是責任量與可依賴範圍的標準語言。圖上只放後續案例需要的最低示意：App、Pages、Shared 用實線與「常見起點」標籤；Features、Entities 用虛線與「有價值再加」標籤。這不是完整 layer 清單。

Transition:
承接 source policy，現在開始建立最低術語：先用 layers 說責任層級；下一頁再進到每個 business area 如何形成 slice，以及 slice 內如何分 segment。

Required details:
必須明講 not all layers are required；App／Pages／Shared 是常見、有效的起點，不是強制最低配備。現行 docs 仍列 Processes（deprecated），並 generally discourage Widgets；primer 為控制範圍不在觀眾畫面展開。

Timing:
90 秒（7:35–9:05）。

Sources:
https://fsd.how/docs/reference/layers/（authoring-day 查核：2026-08-14；scope：layer responsibility、not all layers、App／Pages／Shared common baseline、Features／Pages guidance）；https://fsd.how/docs/get-started/overview/（查核：2026-08-14；scope：layer overview）。兩者為未標逐頁發布日期的 current live docs。

Possible Q&A:
問：Widgets 與 Processes 去哪裡？答：現行 reference 仍列出它們；Processes 已 deprecated，Widgets 在 current guide generally discouraged。這頁只保留後續案例真正需要的最低層次語言。

Safety boundary:
不宣稱 FSD 只有畫面上的五層，不把 App／Pages／Shared 說成每個專案的硬性三件套，也不把空 layer folders 或目錄外觀等同 architecture operationalization。`,

  `Message:
Slice 依產品／業務意義聚合；segment 只描述 slice 內程式碼的技術用途。

Context:
把 pages/checkout/ 畫成封閉的 business responsibility boundary：checkout 是 slice 名稱，取自產品語言；ui、model、api 是 slice 內常見 segments，分別承接畫面、狀態規則與後端互動。這種內部分區不等於回到全專案的 components／types／utils 技術目錄。

Transition:
承接 layers 的責任層級，下一步看每層如何用 business slices 聚合程式碼、再用 segments 整理內部；有了內部結構後，下一頁才能說明外部如何安全依賴它。

Required details:
Slice 名稱不由標準固定，應由 domain 決定；ui／model／api 是常見而非必備或完整清單。App 與 Shared 是例外：不含 business slices，直接由 segments 組成。

Timing:
85 秒（9:05–10:30）。

Sources:
https://fsd.how/docs/reference/slices-segments/（authoring-day 查核：2026-08-14；scope：slice hierarchy、business meaning、segments、App／Shared exception）；https://fsd.how/docs/get-started/overview/（查核：2026-08-14；scope：layers／slices／segments overview）。

Possible Q&A:
問：Slice 就是 feature 嗎？答：不是；slice 是 layer 內的 business partition，Pages、Features、Entities 等 layer 都可以有 slices，而 App／Shared 是例外。

Safety boundary:
不把 checkout 示意說成唯一命名，不宣稱每個 slice 都必須同時有 ui／model／api，也不把 segment 擴張成跨全專案的 technical-based organization。`,

  `Message:
跨 slice 的 static dependency 只往嚴格較低 layer，外部 consumer 透過具名 Public API 使用 slice。

Context:
虛線箭頭代表 static import：較高的 pages/checkout/ 向下依賴 features/payment/，箭頭先穿過具名入口 features/payment/index.ts，再使用 slice 對外承諾的內容。Public API 保護 consumer 不必知道 ui／model／api 的內部路徑；它是 architecture contract，不是 runtime security gate。

Transition:
承接 slice 的內部責任框，現在補上外部依賴契約：誰可以 import 誰，以及入口在哪裡。規則清楚後，下一頁就能問最容易被忽略的問題：這個 lower-layer boundary 什麼時候才值得建立？

Required details:
明講「嚴格較低 layer」與 same-layer slice isolation；同一 slice 內部仍可互相引用，App／Shared segments 有例外。index.ts 是本頁常見實作例，不宣稱所有環境永遠只能有單一 index entry。

Timing:
100 秒（10:30–12:10）。

Sources:
https://fsd.how/docs/reference/layers/（authoring-day 查核：2026-08-14；scope：layer import rule 與 App／Shared exception）；https://fsd.how/docs/reference/slices-segments/（查核：2026-08-14；scope：slice isolation、Public API rule）；https://fsd.how/docs/reference/public-api/（查核：2026-08-14；scope：Public API contract、index re-export 的常見實作與例外）。

Possible Q&A:
問：建立 index.ts 就能強制大家不 deep import 嗎？答：不能；它先建立 contract，後續還需要 linter 或 custom checks 保護可觀察的違規。

Safety boundary:
不把虛線箭頭說成 runtime data flow，不把 Public API 當 security boundary，也不宣稱 index file 本身能阻止 deep imports；本頁不展開 cross-import／environment-specific entry 的完整百科。`,

  `Message:
Pages First：先讓 code 留在 owning page；真實重複與穩定邊界出現後，再抽到帶來價值的 lower layer。

Context:
Decision tree 是對 current FSD 2.1 guidance 的講者整理：單一 page 使用就留在 Pages；即使多處出現，也先問抽離是否處理真實重複、責任邊界是否穩定。不確定時延後抽離是有效決策。最後的 lower layer 仍要依責任判斷，不是自動建立 Feature 或 Entity。

Transition:
承接前頁的 dependency／Public API contract，現在補上建立 boundary 的時機。下一頁進入第一個匿名真實案例：當 UI control、form adapter 與 server-data owner 太早一起被抽成共用責任，會付出什麼代價？

Required details:
三個判斷依序講完整：是否單頁使用、抽離是否解決真實重複、責任邊界是否穩定。不要把「兩處」說成官方硬門檻；Shared infrastructure 與 App-wide wiring 不套用這棵簡化的 page-business-code decision tree。

Timing:
110 秒（12:10–14:00）。

Sources:
https://fsd.how/docs/guides/migration/from-v2-0/（authoring-day 查核：2026-08-14；version／scope：FSD 2.1 Pages First、可先停在 Pages、跨 several pages 有重用需求再下移）；https://fsd.how/docs/reference/layers/（查核：2026-08-14；scope：未重用 UI 可留在 Page、Feature 的跨頁重用指標）；https://fsd.how/docs/guides/issues/excessive-entities/（查核：2026-08-14；version／scope：FSD 2.1 deferred decomposition、可不建立 Entities、需求穩定後再重構）。

Possible Q&A:
問：重複出現就一定要抽嗎？答：不一定；先看是否真的需要同一責任、是否不會永遠一起變，以及 boundary 是否穩定。少量 duplication 可能比過早建立 global boundary 更安全。

Safety boundary:
「真實重複＋穩定邊界」是本演講對多個 current guidance 的綜合判斷，不冒充單一官方逐字硬規則；不提供逐檔 migration plan，也不把 Pages First 擴張成所有 App／Shared placement 的唯一演算法。`,

  `Message:
案例一的原始錯誤，是在只有一個使用情境時，就把 UI control、form adapter 與特定 server-data owner 做成一個全專案共用責任。

Context:
這是匿名親身事實：團隊確實把三種責任包進同一個共用元件。觀眾畫面刻意不交代產品、業務名稱、元件種類或具體表單；三個框只描述已確認的 responsibility boundary，不替案例補造情節。

Transition:
承接前頁 Pages First 的「證據出現後再抽離」，這裡看見相反決策：證據尚未出現，boundary 已經全域化。下一頁沿著這個原決策，檢查實際可觀察的維護後果。

Required details:
三項責任都要講到：UI control 負責呈現與互動；form adapter 負責 field state／validation／error；server-data owner 負責資料來源、轉換與 loading／error policy。這不是在說三者永遠不能同頁組合，而是不應未經證明就成為同一個 shared responsibility。

Timing:
60 秒（14:00–15:00）。

Sources:
.scratch/fsd-talk-authoring-brief/issues/01-select-public-real-pitfalls.md 的「親身事實確認」與「主案例一」；.scratch/fsd-talk-authoring-brief/spec.md 的 case truth table（authoring scope 查核：2026-08-14）。本頁因果來自匿名親身事實，不是 FSD 官方案例。

Possible Q&A:
問：共用 form component 都是錯的嗎？答：不是；只有當一起變動的責任與重用情境已被觀察到，才有足夠證據決定它們是否應形成同一 boundary。

Safety boundary:
不揭露產品、業務或元件種類；不加入成員選擇器、設定表單、動態牆、具體欄位、endpoint 名稱或 submit lifecycle；也不把單一匿名事件概括成所有專案的普遍結論。`,

  `Message:
三種責任被綁在一起後，wrapper、例外 props 與分支只能繼續包在外面；control 仍無法脫離 form，也難以替換資料來源。

Context:
匿名親身因果只保留已核准的兩個後果：control 難以單獨使用、data source 難以替換。圖上的 wrapper／例外 prop／條件分支是結構類型，不代表真實數量或實際命名；它們用來呈現 spec 已核准的增生方向。

Transition:
承接上一頁的三責任耦合，這頁把維護代價具象化。下一頁不再加強真實故事，而是明確切換成合成的第二 consumer，測試這個 boundary 能否承受不同使用方式。

Required details:
先說結果，再指出修補為何沒有改變 owner：新 wrapper 或 exception 仍以原 shared component 為中心，三種 policy 沒有真正分離。不得提 standalone、hideError、sourceMode 等 prototype prop 名稱為親身事實。

Timing:
75 秒（15:00–16:15）。

Sources:
.scratch/fsd-talk-authoring-brief/issues/01-select-public-real-pitfalls.md 的主案例一因果；.scratch/fsd-talk-authoring-brief/spec.md 頁 13 map 與 truth table（查核：2026-08-14）。

Possible Q&A:
問：增加一個 prop 為什麼不行？答：單一例外未必有問題；警訊是每個新 consumer 都要繼承無關 policy，boundary 仍無法獨立演進。

Safety boundary:
不聲稱 wrapper 或 props 的真實數量，不虛構實際 prop 名稱、資料來源、表單 library 或事故；不把「難以」誇大成完全不可能重構。`,

  `Message:
合成的第二個非表單 consumer 只需要 UI contract；若仍得繼承 form 與 data policy，過早共享的錯誤邊界就被暴露。

Context:
本頁整個 consumer 情境都明標「合成案例」。它是 Ticket 05 選定的 guided probe，不是講者親身產品細節：左側只保留抽象的非表單需求，右側比較「匯入整包責任」與「只匯入受控 UI」兩條結構路徑。

Transition:
承接真實後果，我們用合成壓力測試回答「第二種使用方式來時會怎樣」。測試顯示重用單位應縮小到穩定 UI contract；下一頁回到可公開的 boundary correction。

Required details:
分類先講再示範：非表單 consumer、假表單、第二條使用路徑都屬合成。虛線箭頭表示 static import，兩條都附 import label；本頁不描述 runtime submit flow。

Timing:
80 秒（16:15–17:35）。

Sources:
.scratch/fsd-talk-authoring-brief/issues/05-prototype-nuxt-ui-form-boundary.md（resolved guided probe B）；prototype/nuxt-ui-form-boundary commit 059326be75e53b39500b4496a9301a9963e41c04 的 prototype HTML（只取 boundary insight，非 production implementation）；https://ui.nuxt.com/docs/components/form 與 /form-field（Context7 library /llmstxt/ui_nuxt_llms_txt，authoring-day 查核：2026-08-14；scope：current Form state/schema/error mechanics，不支持本頁架構處方）。

Possible Q&A:
問：第二個 consumer 一定要放 shared/ui 嗎？答：不一定；先確認重用已經真實存在、control 不含 feature policy，才把它視為 lower reusable boundary 候選。

Safety boundary:
不得把第二 consumer、假表單、URL state、成員選擇器、設定表單、動態牆或任何 prototype prop 說成親身事實；Nuxt UI 文件只證明 library mechanics，不決定 ownership。`,

  `Message:
修正是分離 UI control、form adapter 與 server-data owner；owning page／feature 組合 policy，只重用已證明穩定的 responsibility。

Context:
圖上左側責任框是 owning page／feature：server-data owner 提供 options／loading，form adapter 提供 value／onChange 與 validation/error binding。右側 UI control 只收受控 contract，透過具名 Public API 對外；實線是 runtime data flow，虛線是 static import。

Transition:
承接第二 consumer 壓力測試，這頁把可重用與不可綁死的責任拆開。案例一的教訓是「不該一起變的責任被過早共享」；下一頁刻意轉到相反問題：合理分開的 feature schemas 中，有一項該一致的規則卻沒有共享。

Required details:
server-data owner 決定 fetch／transform／loading／error policy；form adapter 只處理 binding／validation／error presentation；UI control 不知道 form library、query library 或 endpoint。shared/ui 只是符合條件後的候選，不是所有 control 的預設位置。

Timing:
85 秒（17:35–19:00）。

Sources:
https://fsd.how/docs/reference/layers/（查核：2026-08-14；scope：Pages 可保留未重用 UI、Shared UI 不含 business logic但可含 UI logic）；https://fsd.how/docs/guides/migration/from-v2-0/ 與 /guides/issues/excessive-entities/（查核：2026-08-14；scope：Pages First／deferred decomposition）；https://fsd.how/docs/reference/public-api/（查核：2026-08-14；scope：Public API contract）；Ticket 05 與主案例一提供三責任 boundary evidence。

Possible Q&A:
問：form adapter 也能重用嗎？答：可以，但要等多個真實 consumer 證明 form contract 本身穩定；本案例只證明受控 UI responsibility 值得先獨立。

Safety boundary:
三責任分法與「穩定責任才共享」是符合 current guidance 的講者詮釋，不冒充 fsd.how 逐字處方；不把 Shared 說成完全沒有 application-aware code，也不建立 universal shared/form。`,

  `Message:
案例二先承認合理差異：各 feature 可以擁有不同完整 schema 與自己的欄位組合。

Context:
匿名親身事實是多個 feature 的完整 schema 本來就不同；畫面使用 Feature A／B／C 與 α／β／γ 只作匿名結構示意，不代表真實 feature 名稱、數量或欄位。每個封閉框都保留自己的 composition owner。

Transition:
承接案例一「不要過早把 policy 綁成同一責任」，這裡先保留 feature schema 的合理自治。下一頁只聚焦其中語意本應一致、卻被複製成多份的欄位規則。

Required details:
完整 schema 可有不同 required／optional 組合與 feature-specific validation；不要把「不同」本身稱為 drift，也不要提出 universal user schema 作解法。

Timing:
70 秒（19:00–20:10）。

Sources:
.scratch/fsd-talk-authoring-brief/issues/01-select-public-real-pitfalls.md 的主案例二親身事實；.scratch/fsd-talk-authoring-brief/spec.md 頁 16 map 與 truth table；https://fsd.how/docs/guides/examples/types/（authoring-day 查核：2026-08-14；scope：validation schema 應與使用端 colocate，表單 input schema 可在相應 ui／model）。

Possible Q&A:
問：為什麼不直接共用整份 schema？答：因為不同 feature 的欄位組合與 policy 合理不同；全域 schema 會把不一起變的責任重新耦合。

Safety boundary:
不宣稱實際有三個 feature，不說出註冊、登入、密碼、email 或任何產品欄位；A／B／C 只是結構示意。`,

  `Message:
Validation drift 發生在語意本應一致的 field rule 被複製後，只更新部分副本，讓不同流程出現不同驗證行為。

Context:
這是匿名親身因果：共同規則變更時，團隊只修改部分副本，其他副本被漏掉，甚至難以知道完整影響範圍。NEW／OLD／? 三張卡是狀態示意，不代表實際版本、數量或具體欄位。

Transition:
承接各 feature schema 的合理自治，這頁把問題縮小到一個必須一致的語意規則。下一頁不合併完整 schemas，而是只替這項穩定規則建立單一可發現 owner。

Required details:
先區分 feature-specific variation 與 validation drift：前者是意圖差異，後者是同一語意在副本間意外分岔。漏改與不可發現的影響範圍都要講到。

Timing:
80 秒（20:10–21:30）。

Sources:
.scratch/fsd-talk-authoring-brief/issues/01-select-public-real-pitfalls.md 的「親身事實確認：重複的是欄位規則」與主案例二決定；.scratch/fsd-talk-authoring-brief/spec.md 頁 17 map 與 truth table（查核：2026-08-14）。「validation drift」是本演講／CONTEXT.md 的術語，不是 fsd.how 官方 pattern 名稱。

Possible Q&A:
問：所有 duplication 都是 drift 嗎？答：不是；只有語意被要求一致、卻因副本同步失敗而意外分岔，才是這裡的 validation drift。

Safety boundary:
不揭露或猜測具體欄位、規則內容、feature 名稱與副本數量；不把 NEW／OLD 當真實版本紀錄，也不宣稱 duplication 一律有害。`,

  `Message:
修正是讓 feature schema 繼續在本地組合，只把已證明必須一起變動的 shared field rule 放進單一 lower owner，經 Public API 重用。

Context:
上方三個 schema frame 仍各自封閉；虛線箭頭代表它們 static import 同一個 fieldRule Public API。下方只是一個適當 lower domain boundary，不寫死 FSD layer，因為 business meaning 與實際 reuse context 才能決定是 Entity model 或其他 owner。「Shared field rule」是共享的規則，不等於 FSD shared/ layer。

Transition:
承接 validation drift，這頁建立單一可發現 owner，同時保留 feature-specific schema。兩個案例完成對照後，下一頁只用問題轉場到第三案：app-wide auth state 究竟由誰擁有；本 ticket 不提前回答。

Required details:
三支虛線箭頭都代表 import fieldRule；Public API 只暴露穩定規則。口頭明講對照：案例一是不該共享的責任過早共享；案例二是該一致的穩定規則沒有共享。

Timing:
90 秒（21:30–23:00）。

Sources:
https://fsd.how/docs/guides/examples/types/（查核：2026-08-14；scope：schema colocation）；https://fsd.how/docs/reference/layers/（查核：2026-08-14；scope：lower-layer dependency direction、Feature／Entity validation placement）；https://fsd.how/docs/reference/public-api/（查核：2026-08-14；scope：explicit contract）；https://fsd.how/docs/guides/migration/from-custom/（查核：2026-08-14；scope：會分岔的 duplication 可保留、business logic 副本需同步的成本）；主案例二提供 drift truth boundary。

Possible Q&A:
問：field rule 應該放 shared/ 還是 entities/? 答：不能只靠名稱決定；若有 business/domain meaning，通常不應放 FSD shared/ business logic，應依實際 owner 與 reuse 放在適當 lower domain boundary。

Safety boundary:
「完整 schema 留本地、只下沉穩定 field rule」是符合 current guidance 的講者詮釋，不是 fsd.how 明文處方；不把 shared field rule 等同 Shared layer，不把完整 schema 一起下沉，也不提前實作或說明 Ticket 14 的 auth 解法。`,

  `Message:
案例三的原始錯誤，是讓 Login feature 擁有生命週期跨越單次登入行為的 app-wide token。

Context:
這是匿名親身事實：token 曾由 login feature 持有。畫面只呈現已核准的責任錯置，不揭露產品、登入流程、storage、refresh 或 current-user 實作。Login behavior 取得憑證並更新 auth state 可以是合理行為；錯的是因此把 application-wide state ownership 一起收進單一 feature。

Transition:
承接前頁「app-wide auth state 究竟由誰擁有」的問題，這頁先固定原始決策：行為與狀態被放進同一 feature boundary。下一頁沿著這個 owner mismatch，看其他 consumers 與 API infrastructure 會被迫付出什麼代價。

Required details:
明講兩個 lifecycle：login 是一次 user action；token 會被後續 authenticated requests 與 flows 使用。實線 stores 箭頭只表示登入結果在 runtime 寫入 token，不表示這個 owner 正確。

Timing:
65 秒（23:00–24:05）。

Sources:
.scratch/fsd-talk-authoring-brief/issues/01-select-public-real-pitfalls.md 的主案例三親身事實；.scratch/fsd-talk-authoring-brief/spec.md 的頁 19 map 與 auth truth table（authoring scope 查核：2026-08-14）；https://fsd.how/docs/guides/examples/auth/（current live docs 查核：2026-08-14；scope：login action 與 app-wide token placement）。本頁的事件因果來自匿名親身事實，不是 fsd.how 官方案例。

Possible Q&A:
問：Login 寫入 token，不就代表它擁有 token？答：不一定；行為可以呼叫 auth contract 更新狀態，但 owner 應由狀態的 scope、lifecycle 與 consumers 決定。

Safety boundary:
不補造產品、登入 UI、storage、refresh、session 欄位或事故；不把一次匿名事件概括成所有 Login feature 都不能觸碰 token，也不提前宣稱 shared/auth 是所有 auth domain 的唯一答案。`,

  `Message:
Token owner 藏在 Login feature，其他 features 與 shared API client 只剩反向依賴，或各自維護狀態副本。

Context:
匿名親身因果可公開的範圍是「其他功能與共用 Axios client 也需要同一狀態」。畫面中的 other feature、consumer A／B 是一般結構示意，不是原事件的實際功能名稱或數量；copy A／B 只用來顯示副本沒有單一一致性 owner，不是實際版本紀錄。

Transition:
承接前頁錯置的 owner，這頁把依賴與 state consistency 的後果分成兩條路。兩條都不好，所以下一頁回到最根本的問題：哪個 lower boundary 才能讓 login 與其他 consumers 合法依賴？

Required details:
左側虛線只表示 static import：other feature 與 shared/api 反向知道 features/login。右側是另一種失敗選擇：各 consumer 維護 token copy；本頁不宣稱副本一定已造成特定 runtime bug。

Timing:
70 秒（24:05–25:15）。

Sources:
.scratch/fsd-talk-authoring-brief/issues/01-select-public-real-pitfalls.md 的主案例三因果；.scratch/fsd-talk-authoring-brief/spec.md 的頁 20 map 與 truth table（查核：2026-08-14）；https://fsd.how/docs/guides/examples/auth/（current live docs 查核：2026-08-14；scope：不建議在 single feature/page 放 app-wide token、另一 feature 與 API requests 的 dependency problem）。

Possible Q&A:
問：用 localStorage 就沒有依賴問題了嗎？答：storage 可讓 lower code 讀值，但仍需明確 owner、key／refresh policy 與測試 boundary；它不是自動完成 architecture ownership。

Safety boundary:
不把 other feature、consumer A／B、profile、permission 或 authenticated API 名稱說成全部原事件細節；不宣稱一定形成 circular dependency、token stale 事故或安全漏洞，也不把所有複製一律視為錯。`,

  `Message:
本案例把 simple token／minimal session 放進穩定的 shared/auth boundary；login 與其他 consumers 都向下依賴它。

Context:
這一頁同時包含匿名案例修正與 current official guidance。shared/auth 是本案例對簡單 auth state 的具體選擇；fsd.how 也接受 current user／session Entity 等其他 placement，尤其當 profile domain 與複雜 business state 有真實重用時。畫面中的其他 consumers 是一般結構示意。

Transition:
承接反向依賴與副本問題，這頁先修正 ownership：讓高層 login behavior 與其他 flows 共同依賴穩定 lower contract。下一頁再處理另一個問題：App 如何把 current token 接給 shared/api，而不製造 stale snapshot？

Required details:
虛線箭頭表示 static dependency，且先穿過 shared/auth Public API。Login 可以讀寫 auth contract，但不擁有 state；simple token／minimal session 是本案例 scope，不建立 universal User store。

Timing:
80 秒（25:15–26:35）。

Sources:
https://fsd.how/docs/guides/examples/auth/（current live docs 查核：2026-08-14；scope：Shared 或 Entity placement、Login action、pages／features 不宜擁有 app-wide token）；https://fsd.how/docs/reference/layers/（查核：2026-08-14；scope：Shared auth／API infrastructure 與 downward dependency）；.scratch/fsd-talk-authoring-brief/issues/01-select-public-real-pitfalls.md 的主案例三修正決定。

Possible Q&A:
問：Auth 一定放 shared/auth 嗎？答：不是；simple token／minimal session 適合這個 lower infrastructure boundary，若 current-user／profile domain 與 business logic 已形成穩定 Entity，owner 可以不同。

Safety boundary:
不把 shared/auth 說成所有 auth domain 的唯一官方答案，不把 token 等同完整 User domain，不宣稱畫面上的其他 consumers 是親身事件全部細節，也不把 Shared 說成可以承載任意 business logic。`,

  `Message:
App composition root 將 current-token provider 接給 shared/api；request interceptor 每次 request 才呼叫 provider 取得最新 token。

Context:
本頁的 ownership 仍在 shared/auth；App 只負責組裝具體依賴，shared/api 只負責 HTTP infrastructure。選定的 Vue 落點是 app.use(plugin, options) 安裝 plugin，install(app, options) 可用 app.provide() 暴露 API instance，descendant components 再 inject()；getToken provider 由 App 以 options／configuration 接給 client。這些都是 composition mechanics，不是新的 auth owner。

Transition:
承接 shared/auth ownership，這頁補齊 API client 的 runtime wiring：不是在 App 啟動時複製 token，而是每次 request 讀 current value。Auth 案例完成後，下一頁把同一個「framework entry 不等於 business owner」判斷帶到 Nuxt routing seam。

Required details:
先指出虛線是 App 對兩個 Shared contracts 的 static imports；實線是 runtime call flow。每次 request：interceptor 呼叫 getToken()，provider 再讀 current auth state。禁止把 setup-time token value capture 成 snapshot。Vue Plugin／app.use()／provide-inject 是可選 composition mechanism；FSD 不要求使用它們。

Timing:
85 秒（26:35–28:00）。

Sources:
https://fsd.how/docs/guides/examples/auth/ 與 https://fsd.how/docs/guides/examples/api-requests/（current live docs 查核：2026-08-14；scope：auth placement、API client、provider/context/injection alternatives；exact getToken getter 是相容的講者轉譯）；https://vuejs.org/api/application.html#app-use、https://vuejs.org/guide/reusability/plugins.html、https://vuejs.org/guide/components/provide-inject.html#app-level-provide（Context7 /websites/vuejs，查核：2026-08-14；scope：Vue 3 app.use、plugin install、app.provide 與 inject mechanics）；https://github.com/axios/axios/blob/v1.x/docs/pages/advanced/headers.md 與 https://github.com/axios/axios/blob/v1.x/docs/pages/advanced/authentication.md（Context7 /axios/axios，查核：2026-08-14；version scope：Axios v1.x request interceptor 與 request-time dynamic Authorization header）。

Possible Q&A:
問：既然 shared/auth 與 shared/api 都在 Shared，為什麼還要 DI？答：本案例用 provider 解耦 storage／client、方便測試與替換；若 auth owner 在 Entity，App wiring 還能避免 Shared 反向 import。這不是所有 Shared segments 間唯一合法做法。

Safety boundary:
getToken callback shape、Vue Plugin wiring 與 request-time interceptor 是符合官方 mechanics 的講者實作，不是 fsd.how 明文硬規則；不把 app.use() 說成 DI 本身，不暗示 Axios 直接 inject()，也不宣稱 provider 能自動處理 refresh race、SSR 或安全儲存。`,

  `Message:
Nuxt page 是 framework-owned route manifest；FSD Page 是 application-owned page module，同名不代表同一責任。

Context:
左側聚焦 Nuxt scanner 與 compiler 需要的 contract：file path／dynamic params、definePageMeta、必要 adapter。右側聚焦 FSD Page slice：page composition、page-specific state／queries／validation 與 business rules。「route manifest」對「application module」是本演講對兩份 official guidance 的責任整理，不是 Nuxt 或 FSD 的逐字術語。

Transition:
承接 Auth 案例的 composition root：framework mechanism 可以接線，但不因此取得 business ownership。這頁先把兩個 pages 名稱拆開；下一頁再用薄 route adapter 與具名 Public API 把它們接回來。

Required details:
Nuxt route entry 可保留 URL contract、Nuxt metadata 與 params adaptation；FSD Page 可包含 page UI、state、queries、validation 與 rules。這是 lifecycle／ownership seam，不只是避免 folder name collision。

Timing:
45 秒（28:00–28:45）。

Sources:
https://nuxt.com/docs/4.x/getting-started/routing/ 與 https://nuxt.com/docs/4.x/directory-structure/app/pages（Context7 /websites/nuxt_4_x，current 4.x docs 查核：2026-08-14；scope：file-based route generation、page metadata／route contract）；https://fsd.how/docs/guides/tech/with-nuxtjs/ 與 https://fsd.how/docs/reference/layers/（current live docs 查核：2026-08-14；scope：Nuxt pages name conflict、FSD Pages responsibility）；.scratch/fsd-talk-authoring-brief/research/03-nuxt-routing.md 的 source comparison。

Possible Q&A:
問：為什麼不直接把所有 page logic 留在 Nuxt page file？答：可以，但 route topology 會同時成為 application module boundary；薄 adapter 讓 URL lifecycle 與 page business evolution 可分開 review。

Safety boundary:
不把 app/routes 說成 Nuxt 4 default；它是後續 fixture 的 custom seam。不把 FSD Page 縮成單一 component，也不把 fsd.how Nuxt guide 中版本未標示且互相不一致的 exact config 當成 Nuxt 4.5.2 證據。`,

  `Message:
薄 Nuxt route adapter 只保留 framework contract，並經 FSD Page Public API import／render application module。

Context:
左側三行 code 是經 fixture 驗證的 seam 摘要：route entry 從 @/pages/home 取得 HomePage，保留 definePageMeta，再 render component。右側 Public API 明確標在 FSD Page boundary 上；route 不 deep import ui/home-page.vue。虛線表示 static import，實線表示 runtime render flow。

Transition:
承接兩種 page 責任，這頁展示如何不犧牲任何一邊：Nuxt convention 繼續掌握 route，FSD Page 繼續掌握 application behavior。下一頁用 Nuxt 4.5.2 fixture 證明 custom directories、alias 與 production build module graph 確實接得起來。

Required details:
Route entry 不必零程式碼；URL contract、definePageMeta 與必要 param translation 可以留下，但 business orchestration 不應留在 scanner directory。Public API 是 static module contract，不是 runtime security gate。

Timing:
55 秒（28:45–29:40）。

Sources:
https://fsd.how/docs/guides/tech/with-nuxtjs/（current live docs 查核：2026-08-14；scope：thin route entry 從 FSD Page Public API import／render）；https://fsd.how/docs/reference/public-api/（查核：2026-08-14；scope：slice contract、explicit exports、避免 deep import）；https://nuxt.com/docs/4.x/getting-started/routing/ 與 https://nuxt.com/docs/4.x/directory-structure/app/pages（Context7 /websites/nuxt_4_x，查核：2026-08-14；scope：route files 與 metadata）；.scratch/fsd-talk-authoring-brief/research/10-nuxt4-fixture-verification.md 的 exact route adapter。

Possible Q&A:
問：這不是重複兩份 page 嗎？答：不是；route file 是 framework manifest／adapter，FSD Page 是 application module，兩者有不同 owner 與 lifecycle。

Safety boundary:
不要求 route entry 完全零邏輯，不 deep import FSD internals，不宣稱所有 layout 都屬於 App，也不把 @/pages/home 說成 Nuxt 4 的唯一 project layout。`,

  `Message:
Nuxt 4.5.2 fixture 已驗證 custom directories、source-root app.vue、內建 @ alias、Public API route import 與 production build seam。

Context:
這是 dated evidence snapshot。左側六行 code 同時顯示 srcDir、dir.app／pages／layouts 與 route 經 @/pages/home Public API import；下方 evidence chips補上 source-root src/app.vue 與 @ 指向 src。右側 PASS 防線來自同一 fixture 的 prepare、typecheck 與 production build，並檢查 generated types／manifest／chunks。

Transition:
承接薄 adapter 的 architecture design，這頁補上版本化 executable evidence。Routing seam 接好後，下一頁才會進入 server-state／cache seam；本頁只做轉場，不提前講 query factory、cache key、reactive input 或 SSR policy。

Required details:
精確版本為 Nuxt 4.5.2、TypeScript 6.0.3、vue-tsc 3.3.9。正確 app component 是 source-root src/app.vue，不是 src/app/app.vue。內建 @ 在 fixture generated config 指向 src；route import 經 FSD Page Public API。三個 PASS 證明 scanner、generated types、module graph 與 production compiler 可接通。

Timing:
50 秒（29:40–30:30）。

Sources:
.scratch/fsd-talk-authoring-brief/research/10-nuxt4-fixture-verification.md（verified 2026-08-14；exact scope：Nuxt 4.5.2 + TypeScript 6.0.3 + vue-tsc 3.3.9，prepare／typecheck／production build 與 artifacts）；https://nuxt.com/docs/4.x/api/nuxt-config、https://nuxt.com/docs/4.x/getting-started/upgrade、https://nuxt.com/docs/4.x/getting-started/routing/、https://nuxt.com/docs/4.x/api/commands/prepare、https://nuxt.com/docs/4.x/guide/concepts/typescript、https://nuxt.com/docs/4.x/api/commands/build（Context7 /websites/nuxt_4_x 與 official current 4.x docs，查核：2026-08-14；scope：srcDir、directories、routing、alias／generated TS config、commands）。Current docs 支持 config semantics；exact combination 的 PASS 只由 dated fixture 支持。

Possible Q&A:
問：為什麼不是 src/app/app.vue？答：fixture 與 Nuxt config semantics都顯示 custom srcDir 下的 app component 位於 source root src/app.vue；dir.app 只指定 router.options 等 app integration files 的 prefix。

Safety boundary:
不把這個 snapshot 說成所有 Nuxt 4 專案的唯一設定、完整 runtime／SSR／deployment certification，或未來版本保證；不得把已失敗的 TypeScript 7.0.2 + vue-tsc 3.3.9 說成通過組合，也不得在本頁提前實作 Ticket 15 的 Vue Query 內容。`,
];

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
  NuxtNamingSeam,
  NuxtRouteAdapter,
  NuxtFixtureEvidence,
] satisfies Page[];
