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

const CategoryLabel = () => (
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
      ◇
    </span>
    講者詮釋
  </div>
);

const PageFrame = ({ children }: { children: ReactNode }) => (
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
        PROBLEM FRAMEWORK
      </div>
      <CategoryLabel />
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
];

export const meta: SlideMeta = {
  title: '一段程式碼，到底該放哪裡？從 Feature-based 到 Feature-Sliced Design',
  createdAt: '2026-08-14T12:02:31.878Z',
};

export default [Cover, ProblemSetup, TechnicalBaseline, FeatureImprovement, GapFraming, Thesis] satisfies Page[];
