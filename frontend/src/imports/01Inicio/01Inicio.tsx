import svgPaths from "./svg-iecy9a7bb8";
import img01Inicio from "./55f9dae31470da02395e320d1c810840b44f82d2.png";
import imgImg22641 from "./1f58a614445d9fce31b44453a1e3a0395d49b1db.png";

function Container1() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['SF_Pro:Semibold',sans-serif] font-[590] justify-center leading-[0] relative shrink-0 text-[24px] text-white w-full" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[32px]">Balance Actual</p>
      </div>
    </div>
  );
}

function Heading1() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Heading 2">
      <div className="flex flex-col font-['SF_Pro:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[48px] text-white tracking-[-1.92px] w-full" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[56px]">$200</p>
      </div>
    </div>
  );
}

function Container() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-full" data-name="Container">
      <Container1 />
      <Heading1 />
    </div>
  );
}

function Container3() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['SF_Pro:Semibold',sans-serif] font-[590] justify-center leading-[0] relative shrink-0 text-[18px] text-white w-full" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[24px]">Ingresos Mes</p>
      </div>
    </div>
  );
}

function Heading2() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Heading 2">
      <div className="flex flex-col font-['SF_Pro:Bold',sans-serif] font-bold justify-end leading-[0] relative shrink-0 text-[#a6ff88] text-[36px] tracking-[-1.44px] w-full" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[42px]">+ $408</p>
      </div>
    </div>
  );
}

function Container2() {
  return (
    <div className="content-stretch flex flex-col gap-[3px] items-start relative shrink-0 w-[219px]" data-name="Container">
      <Container3 />
      <Heading2 />
    </div>
  );
}

function Container5() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['SF_Pro:Semibold',sans-serif] font-[590] justify-center leading-[0] relative shrink-0 text-[18px] text-white w-full" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[24px]">Gastos Mes</p>
      </div>
    </div>
  );
}

function Heading3() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Heading 2">
      <div className="flex flex-col font-['SF_Pro:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[#ff999a] text-[36px] tracking-[-1.44px] w-full" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[42px] whitespace-pre-wrap">{`-  $345`}</p>
      </div>
    </div>
  );
}

function Container4() {
  return (
    <div className="content-stretch flex flex-col gap-[3px] items-start relative shrink-0 w-[219px]" data-name="Container">
      <Container5 />
      <Heading3 />
    </div>
  );
}

function BalanceDetails() {
  return (
    <div className="relative shrink-0 w-full" data-name="Balance Details">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[12px] items-start relative size-full">
        <Container />
        <Container2 />
        <Container4 />
      </div>
    </div>
  );
}

function Container7() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g id="Container">
          <path d={svgPaths.p1c7e09f0} fill="var(--fill-0, #A6FF88)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Container8() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['SF_Pro:Medium',sans-serif] font-[510] justify-center leading-[0] relative shrink-0 text-[#a6ff88] text-[14px] tracking-[0.14px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[20px]">+2.5%</p>
      </div>
    </div>
  );
}

function Container9() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['SF_Pro:Semibold',sans-serif] font-[590] justify-center leading-[0] relative shrink-0 text-[#d7d7d7] text-[12px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[16px]">vs el mes pasado</p>
      </div>
    </div>
  );
}

function Container6() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full" data-name="Container">
      <Container7 />
      <Container8 />
      <Container9 />
    </div>
  );
}

function Margin() {
  return (
    <div className="relative shrink-0 w-full" data-name="Margin">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pt-[16px] relative size-full">
        <Container6 />
      </div>
    </div>
  );
}

function TotalBalanceCard() {
  return (
    <div className="backdrop-blur-[15px] bg-[rgba(255,255,255,0.1)] min-h-[200px] relative rounded-[8px] shrink-0 w-full" data-name="Total Balance Card">
      <div className="min-h-[inherit] overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col gap-[12px] items-start min-h-[inherit] p-[25px] relative size-full">
          <BalanceDetails />
          <Margin />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[rgba(199,198,202,0.2)] border-solid inset-0 pointer-events-none rounded-[8px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]" />
    </div>
  );
}

function Heading4() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Heading 3">
      <div className="flex flex-col font-['SF_Pro:Semibold',sans-serif] font-[590] justify-center leading-[0] relative shrink-0 text-[#f1f3f5] text-[24px] tracking-[-0.24px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[32px]">Metas Financieras</p>
      </div>
    </div>
  );
}

function AddSquareStreamlineCore() {
  return (
    <div className="overflow-clip relative shrink-0 size-[32px]" data-name="Add-Square Streamline Core">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
        <g id="add-square--square-remove-cross-buttons-add-plus-button-+-mathematics-math">
          <path clipRule="evenodd" d={svgPaths.p11e79e00} fill="var(--fill-0, #D7D7D7)" fillRule="evenodd" id="Subtract" />
        </g>
      </svg>
    </div>
  );
}

function Container11() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Heading4 />
      <AddSquareStreamlineCore />
    </div>
  );
}

function Margin1() {
  return (
    <div className="h-[32px] relative shrink-0 w-full" data-name="Margin">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-[24px] relative size-full">
        <Container11 />
      </div>
    </div>
  );
}

function TargetGoalStreamlineNova() {
  return (
    <div className="absolute left-0 size-[24px] top-0" data-name="Target-Goal Streamline Nova">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g clipPath="url(#clip0_1_751)" id="Target-Goal Streamline Nova">
          <path d={svgPaths.pb74a80} fill="var(--fill-0, white)" id="Vector" />
        </g>
        <defs>
          <clipPath id="clip0_1_751">
            <rect fill="white" height="24" width="24" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Tree4FillStreamlineMingcuteFill() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="Tree-4-Fill Streamline Mingcute-Fill">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
        <TargetGoalStreamlineNova />
      </div>
    </div>
  );
}

function OverlayBorderOverlayBlur() {
  return (
    <div className="backdrop-blur-[20px] bg-[rgba(241,243,245,0.4)] content-stretch flex items-center justify-center relative rounded-[12px] shrink-0 size-[48px]" data-name="Overlay+Border+OverlayBlur">
      <div className="-translate-x-1/2 absolute bg-[rgba(255,255,255,0)] left-1/2 rounded-[12px] size-[48px] top-0" data-name="Overlay+Shadow" />
      <Tree4FillStreamlineMingcuteFill />
    </div>
  );
}

function Heading5() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Heading 3">
      <div className="flex flex-col font-['SF_Pro:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[#f1f3f5] text-[14px] tracking-[0.14px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[20px]">Vacaciones</p>
      </div>
    </div>
  );
}

function Container15() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['SF_Pro:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#d7d7d7] text-[12px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[16px]">Playa El Tunco, El Salvador</p>
      </div>
    </div>
  );
}

function Container14() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[152px]" data-name="Container">
      <Heading5 />
      <Container15 />
    </div>
  );
}

function Container13() {
  return (
    <div className="content-stretch flex gap-[12px] items-center relative shrink-0" data-name="Container">
      <OverlayBorderOverlayBlur />
      <Container14 />
    </div>
  );
}

function Container12() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-between relative size-full">
        <Container13 />
        <div className="flex flex-col font-['SF_Pro:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[#a6ff87] text-[14px] text-right tracking-[0.14px] w-[39px]" style={{ fontVariationSettings: "'wdth' 100" }}>
          <p className="leading-[20px]">$200</p>
        </div>
      </div>
    </div>
  );
}

function Container18() {
  return (
    <div className="content-stretch flex flex-col items-start relative self-stretch shrink-0" data-name="Container">
      <div className="flex flex-col font-['SF_Pro:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[#f1f3f5] text-[14px] tracking-[0.14px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[20px]">Progreso</p>
      </div>
    </div>
  );
}

function Container19() {
  return (
    <div className="content-stretch flex flex-col items-start relative self-stretch shrink-0" data-name="Container">
      <div className="flex flex-col font-['SF_Pro:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[#f1f3f5] text-[14px] tracking-[0.14px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[20px]">65%</p>
      </div>
    </div>
  );
}

function Container17() {
  return (
    <div className="content-stretch flex h-[20px] items-start justify-between relative shrink-0 w-full" data-name="Container">
      <Container18 />
      <Container19 />
    </div>
  );
}

function Background() {
  return (
    <div className="bg-[#eeedf3] h-[4px] overflow-clip relative rounded-[9999px] shrink-0 w-full" data-name="Background">
      <div className="absolute bg-[#a6ff87] inset-[0_35%_0_0] rounded-[9999px]" data-name="Background" />
    </div>
  );
}

function Container21() {
  return (
    <div className="content-stretch flex flex-col items-start relative self-stretch shrink-0" data-name="Container">
      <div className="flex flex-col font-['SF_Pro:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#d7d7d7] text-[12px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[16px]">Ahorrado: $130</p>
      </div>
    </div>
  );
}

function Container22() {
  return (
    <div className="content-stretch flex flex-col items-start relative self-stretch shrink-0" data-name="Container">
      <div className="flex flex-col font-['SF_Pro:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#d7d7d7] text-[12px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[16px]">Restante: $70</p>
      </div>
    </div>
  );
}

function Container20() {
  return (
    <div className="content-stretch flex h-[20px] items-start justify-between pt-[4px] relative shrink-0 w-full" data-name="Container">
      <Container21 />
      <Container22 />
    </div>
  );
}

function Container16() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[8px] items-start relative size-full">
        <Container17 />
        <Background />
        <Container20 />
      </div>
    </div>
  );
}

function GoalCard1NewCar() {
  return (
    <div className="backdrop-blur-[15px] bg-[rgba(255,255,255,0.1)] relative rounded-[8px] shrink-0 w-full" data-name="Goal Card 1: New Car">
      <div aria-hidden="true" className="absolute border border-[rgba(199,198,202,0.2)] border-solid inset-0 pointer-events-none rounded-[8px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]" />
      <div className="content-stretch flex flex-col gap-[24px] items-start p-[25px] relative size-full">
        <Margin1 />
        <Container12 />
        <Container16 />
      </div>
    </div>
  );
}

function Container10() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <GoalCard1NewCar />
    </div>
  );
}

function HeaderSegmentedControl() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[342px]" data-name="Header & Segmented Control">
      <Container10 />
    </div>
  );
}

function Heading6() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Heading 3">
      <div className="flex flex-col font-['SF_Pro:Semibold',sans-serif] font-[590] justify-center leading-[0] relative shrink-0 text-[#f1f3f5] text-[24px] tracking-[-0.24px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[32px]">Transacciones</p>
      </div>
    </div>
  );
}

function AddSquareStreamlineCore1() {
  return (
    <div className="overflow-clip relative shrink-0 size-[32px]" data-name="Add-Square Streamline Core">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
        <g id="add-square--square-remove-cross-buttons-add-plus-button-+-mathematics-math">
          <path clipRule="evenodd" d={svgPaths.p11e79e00} fill="var(--fill-0, #D7D7D7)" fillRule="evenodd" id="Subtract" />
        </g>
      </svg>
    </div>
  );
}

function Container23() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Heading6 />
      <AddSquareStreamlineCore1 />
    </div>
  );
}

function Margin2() {
  return (
    <div className="h-[32px] relative shrink-0 w-full" data-name="Margin">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-[24px] relative size-full">
        <Container23 />
      </div>
    </div>
  );
}

function CarStreamlineFontAwesome() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="Car Streamline Font-Awesome">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Car Streamline Font-Awesome">
          <path d={svgPaths.p172c400} fill="var(--fill-0, white)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function OverlayBorderOverlayBlur1() {
  return (
    <div className="backdrop-blur-[20px] bg-[rgba(241,243,245,0.4)] content-stretch flex items-center justify-center relative rounded-[12px] shrink-0 size-[48px]" data-name="Overlay+Border+OverlayBlur">
      <div className="-translate-x-1/2 absolute bg-[rgba(255,255,255,0)] left-1/2 rounded-[12px] size-[48px] top-0" data-name="Overlay+Shadow" />
      <CarStreamlineFontAwesome />
    </div>
  );
}

function Container27() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['SF_Pro:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[#f1f3f5] text-[14px] tracking-[0.14px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[20px]">Transporte</p>
      </div>
    </div>
  );
}

function Container28() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['SF_Pro:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#d7d7d7] text-[12px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[16px]">Sabado, 16 de mayo</p>
      </div>
    </div>
  );
}

function Container26() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[114px]" data-name="Container">
      <Container27 />
      <Container28 />
    </div>
  );
}

function Container25() {
  return (
    <div className="content-stretch flex items-center relative shrink-0" data-name="Container">
      <Container26 />
    </div>
  );
}

function TransportTransaction() {
  return (
    <div className="content-stretch flex gap-[10px] items-center relative shrink-0" data-name="Transport Transaction">
      <OverlayBorderOverlayBlur1 />
      <Container25 />
    </div>
  );
}

function Container29() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['SF_Pro:Medium',sans-serif] font-[510] justify-center leading-[0] relative shrink-0 text-[#ff999a] text-[14px] tracking-[0.14px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[20px]">-$50</p>
      </div>
    </div>
  );
}

function TransactionItem() {
  return (
    <div className="relative rounded-[8px] shrink-0 w-full" data-name="Transaction Item">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between pr-[12px] py-[12px] relative size-full">
          <TransportTransaction />
          <Container29 />
        </div>
      </div>
    </div>
  );
}

function ServiceFillStreamlineRemixFill() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="Service-Fill Streamline Remix-Fill">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Service-Fill Streamline Remix-Fill">
          <path d={svgPaths.p136f0f0} fill="var(--fill-0, white)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function OverlayBorderOverlayBlur2() {
  return (
    <div className="backdrop-blur-[20px] bg-[rgba(241,243,245,0.4)] content-stretch flex items-center justify-center relative rounded-[12px] shrink-0 size-[48px]" data-name="Overlay+Border+OverlayBlur">
      <div className="-translate-x-1/2 absolute bg-[rgba(255,255,255,0)] left-1/2 rounded-[12px] size-[48px] top-0" data-name="Overlay+Shadow" />
      <ServiceFillStreamlineRemixFill />
    </div>
  );
}

function Container32() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['SF_Pro:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[#f1f3f5] text-[14px] tracking-[0.14px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[20px]">{`Internet `}</p>
      </div>
    </div>
  );
}

function Container33() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['SF_Pro:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#d7d7d7] text-[12px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[16px]">Viernes, 15 de mayo</p>
      </div>
    </div>
  );
}

function Container31() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[114px]" data-name="Container">
      <Container32 />
      <Container33 />
    </div>
  );
}

function Container30() {
  return (
    <div className="content-stretch flex items-center relative shrink-0" data-name="Container">
      <Container31 />
    </div>
  );
}

function InternetTransaction() {
  return (
    <div className="content-stretch flex gap-[10px] items-center relative shrink-0" data-name="Internet Transaction">
      <OverlayBorderOverlayBlur2 />
      <Container30 />
    </div>
  );
}

function Container34() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['SF_Pro:Medium',sans-serif] font-[510] justify-center leading-[0] relative shrink-0 text-[#ff999a] text-[14px] tracking-[0.14px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[20px]">-$50</p>
      </div>
    </div>
  );
}

function TransactionItem1() {
  return (
    <div className="relative rounded-[8px] shrink-0 w-full" data-name="Transaction Item">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between pr-[12px] py-[12px] relative size-full">
          <InternetTransaction />
          <Container34 />
        </div>
      </div>
    </div>
  );
}

function PastaBowlWarmStreamlineUltimateSvg() {
  return (
    <div className="absolute inset-[-0.11%_0_0_0]" data-name="Pasta-Bowl-Warm--Streamline-Ultimate.svg">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24.0268">
        <g id="Pasta-Bowl-Warm--Streamline-Ultimate.svg">
          <g id="Group">
            <path d={svgPaths.p1e049100} fill="var(--fill-0, white)" id="Vector" />
            <path d={svgPaths.p34dcbb80} fill="var(--fill-0, white)" id="Vector_2" />
          </g>
          <path d={svgPaths.pcc85770} fill="var(--fill-0, white)" id="Vector_3" />
          <path d={svgPaths.p3a6deb80} fill="var(--fill-0, white)" id="Vector_4" />
        </g>
      </svg>
    </div>
  );
}

function PastaBowlWarmStreamlineUltimate() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="Pasta-Bowl-Warm Streamline Ultimate">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
        <PastaBowlWarmStreamlineUltimateSvg />
      </div>
    </div>
  );
}

function OverlayBorderOverlayBlur3() {
  return (
    <div className="backdrop-blur-[20px] bg-[rgba(241,243,245,0.4)] content-stretch flex items-center justify-center relative rounded-[12px] shrink-0 size-[48px]" data-name="Overlay+Border+OverlayBlur">
      <div className="-translate-x-1/2 absolute bg-[rgba(255,255,255,0)] left-1/2 rounded-[12px] size-[48px] top-0" data-name="Overlay+Shadow" />
      <PastaBowlWarmStreamlineUltimate />
    </div>
  );
}

function Container37() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['SF_Pro:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[#f1f3f5] text-[14px] tracking-[0.14px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[20px]">Supermercado</p>
      </div>
    </div>
  );
}

function Container38() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['SF_Pro:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#d7d7d7] text-[12px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[16px]">Jueves, 14 de mayo</p>
      </div>
    </div>
  );
}

function Container36() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[112px]" data-name="Container">
      <Container37 />
      <Container38 />
    </div>
  );
}

function Container35() {
  return (
    <div className="content-stretch flex items-center relative shrink-0" data-name="Container">
      <Container36 />
    </div>
  );
}

function SupermarketTransaction() {
  return (
    <div className="content-stretch flex gap-[10px] items-center relative shrink-0" data-name="Supermarket Transaction">
      <OverlayBorderOverlayBlur3 />
      <Container35 />
    </div>
  );
}

function Container39() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['SF_Pro:Medium',sans-serif] font-[510] justify-center leading-[0] relative shrink-0 text-[#ff999a] text-[14px] tracking-[0.14px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[20px]">-$108</p>
      </div>
    </div>
  );
}

function TransactionItem2() {
  return (
    <div className="relative rounded-[8px] shrink-0 w-full" data-name="Transaction Item">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between pr-[12px] py-[12px] relative size-full">
          <SupermarketTransaction />
          <Container39 />
        </div>
      </div>
    </div>
  );
}

function CashBriefcaseStreamlineUltimate() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="Cash-Briefcase Streamline Ultimate">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g clipPath="url(#clip0_1_738)" id="Cash-Briefcase Streamline Ultimate">
          <path d={svgPaths.p1c35a320} fill="var(--fill-0, white)" id="Vector" />
        </g>
        <defs>
          <clipPath id="clip0_1_738">
            <rect fill="white" height="24" width="24" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function OverlayBorderOverlayBlur4() {
  return (
    <div className="backdrop-blur-[20px] bg-[rgba(241,243,245,0.4)] content-stretch flex items-center justify-center relative rounded-[12px] shrink-0 size-[48px]" data-name="Overlay+Border+OverlayBlur">
      <div className="-translate-x-1/2 absolute bg-[rgba(255,255,255,0)] left-1/2 rounded-[12px] size-[48px] top-0" data-name="Overlay+Shadow" />
      <CashBriefcaseStreamlineUltimate />
    </div>
  );
}

function Container42() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['SF_Pro:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[#f1f3f5] text-[14px] tracking-[0.14px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[20px]">Salario Mensual</p>
      </div>
    </div>
  );
}

function Container43() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['SF_Pro:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#d7d7d7] text-[12px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[16px]">Miércoles, 13 de mayo</p>
      </div>
    </div>
  );
}

function Container41() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[126px]" data-name="Container">
      <Container42 />
      <Container43 />
    </div>
  );
}

function Container40() {
  return (
    <div className="content-stretch flex items-center relative shrink-0" data-name="Container">
      <Container41 />
    </div>
  );
}

function SalaryTransaction() {
  return (
    <div className="content-stretch flex gap-[10px] items-center relative shrink-0" data-name="Salary Transaction">
      <OverlayBorderOverlayBlur4 />
      <Container40 />
    </div>
  );
}

function Container44() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['SF_Pro:Medium',sans-serif] font-[510] justify-center leading-[0] relative shrink-0 text-[#a6ff88] text-[14px] tracking-[0.14px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[20px]">+$408</p>
      </div>
    </div>
  );
}

function TransactionItem3() {
  return (
    <div className="relative rounded-[8px] shrink-0 w-full" data-name="Transaction Item">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between pr-[12px] py-[12px] relative size-full">
          <SalaryTransaction />
          <Container44 />
        </div>
      </div>
    </div>
  );
}

function Container24() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[16px] items-start relative size-full">
        <TransactionItem />
        <TransactionItem1 />
        <TransactionItem2 />
        <TransactionItem3 />
      </div>
    </div>
  );
}

function RecentTransactions() {
  return (
    <div className="backdrop-blur-[15px] bg-[rgba(255,255,255,0.1)] relative rounded-[8px] shrink-0 w-full" data-name="Recent Transactions">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col gap-[12px] items-start p-[25px] relative size-full">
          <Margin2 />
          <Container24 />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[rgba(199,198,202,0.2)] border-solid inset-0 pointer-events-none rounded-[8px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]" />
    </div>
  );
}

function Heading7() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Heading 3">
      <div className="flex flex-col font-['SF_Pro:Semibold',sans-serif] font-[590] justify-center leading-[0] relative shrink-0 text-[24px] text-white whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[32px]">Gastos Semanales</p>
      </div>
    </div>
  );
}

function Container46() {
  return (
    <div className="h-[4.933px] relative w-[8px]" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8 4.93333">
        <g id="Container">
          <path d={svgPaths.p5cc7680} fill="var(--fill-0, #161618)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Button() {
  return (
    <div className="bg-[#ff999a] h-[24px] relative rounded-[28px] shrink-0 w-[60px]" data-name="Button">
      <div className="-translate-x-1/2 -translate-y-1/2 absolute flex flex-col font-['SF_Pro:Semibold',sans-serif] font-[590] justify-center leading-[0] left-[calc(50%-6px)] text-[#161618] text-[12px] text-center top-1/2 tracking-[0.6px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[16px]">Mes</p>
      </div>
      <div className="-translate-x-1/2 -translate-y-1/2 absolute flex h-[8px] items-center justify-center left-[calc(50%+17px)] top-[calc(50%+0.47px)] w-[4.933px]" style={{ "--transform-inner-width": "1183", "--transform-inner-height": "22" } as React.CSSProperties}>
        <div className="-rotate-90 flex-none">
          <Container46 />
        </div>
      </div>
    </div>
  );
}

function Container45() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-between relative size-full">
        <Heading7 />
        <Button />
      </div>
    </div>
  );
}

function Container47() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['SF_Pro:Semibold',sans-serif] font-[590] justify-center leading-[0] relative shrink-0 text-[12px] text-white tracking-[0.6px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[16px]">$500</p>
      </div>
    </div>
  );
}

function Container48() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['SF_Pro:Semibold',sans-serif] font-[590] justify-center leading-[0] relative shrink-0 text-[12px] text-white tracking-[0.6px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[16px]">$100</p>
      </div>
    </div>
  );
}

function Container49() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['SF_Pro:Semibold',sans-serif] font-[590] justify-center leading-[0] relative shrink-0 text-[12px] text-white tracking-[0.6px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[16px]">$0</p>
      </div>
    </div>
  );
}

function YAxisLabels() {
  return (
    <div className="absolute bottom-px left-0 top-[12px] w-[34px]" data-name="Y-Axis Labels">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start justify-between py-[24px] relative size-full">
        <Container47 />
        <Container48 />
        <Container49 />
      </div>
    </div>
  );
}

function Background1() {
  return (
    <div className="absolute bg-[#161618] content-stretch flex flex-col items-start left-[-3.06%] opacity-0 px-[8px] py-[4px] right-[-3.03%] rounded-[2px] top-[-90px]" data-name="Background">
      <div className="flex flex-col font-['SF_Pro:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[10px] text-white whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[15px]">1.2k</p>
      </div>
    </div>
  );
}

function DataPointsBars() {
  return (
    <div className="bg-gradient-to-b from-[#f1f3f5] h-[7px] relative rounded-tl-[4px] rounded-tr-[4px] shrink-0 to-[rgba(255,255,255,0)] w-[32px]" data-name="Data Points/Bars">
      <Background1 />
    </div>
  );
}

function Background2() {
  return (
    <div className="absolute bg-[#f1f3f5] content-stretch flex flex-col items-center justify-center left-[-6.03%] p-[4px] right-[-7.09%] rounded-[2px] top-[-31px]" data-name="Background">
      <div className="absolute bg-[rgba(255,255,255,0)] inset-0 rounded-[2px] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)]" data-name="Overlay+Shadow" />
      <div className="flex flex-col font-['SF_Pro:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[#161618] text-[10px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[15px]">$108</p>
      </div>
    </div>
  );
}

function OverlayHorizontalBorder() {
  return (
    <div className="bg-gradient-to-b from-[#ff999a] h-[115px] relative rounded-tl-[4px] rounded-tr-[4px] shrink-0 to-[rgba(241,243,245,0)] w-[32px]" data-name="Overlay+HorizontalBorder">
      <Background2 />
    </div>
  );
}

function ChartBarsLineApproximation() {
  return (
    <div className="flex-[1_0_0] h-full min-w-px relative" data-name="Chart Bars/Line approximation">
      <div className="flex flex-row items-end size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-end justify-between pl-[32px] pr-[0.05px] relative size-full">
          <div className="absolute blur-[6px] bottom-0 h-[152px] left-[32px] right-0 rounded-tl-[12px] rounded-tr-[12px]" data-name="A subtle background gradient to represent area under line" />
          <DataPointsBars />
          <div className="bg-gradient-to-b from-[#f1f3f5] h-[7px] relative rounded-tl-[4px] rounded-tr-[4px] shrink-0 to-[rgba(255,255,255,0)] w-[32px]" data-name="Background" />
          <div className="bg-gradient-to-b from-[#f1f3f5] h-[7px] relative rounded-tl-[4px] rounded-tr-[4px] shrink-0 to-[rgba(255,255,255,0)] w-[32px]" data-name="Background" />
          <OverlayHorizontalBorder />
          <div className="bg-gradient-to-b from-[#f1f3f5] h-[57.5px] relative rounded-tl-[4px] rounded-tr-[4px] shrink-0 to-[rgba(255,255,255,0)] w-[32px]" data-name="Background" />
          <div className="bg-gradient-to-b from-[#f1f3f5] h-[57px] relative rounded-tl-[4px] rounded-tr-[4px] shrink-0 to-[rgba(255,255,255,0)] w-[32px]" data-name="Background" />
        </div>
      </div>
    </div>
  );
}

function AbstractRepresentationOfAChartUsingCssGradientsShapes() {
  return (
    <div className="h-[268px] relative shrink-0 w-full" data-name="Abstract Representation of a Chart using CSS Gradients/Shapes">
      <div aria-hidden="true" className="absolute border-[#c7c6ca] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-end size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-end pb-[25px] pt-[12px] px-[8px] relative size-full">
          <YAxisLabels />
          <ChartBarsLineApproximation />
        </div>
      </div>
    </div>
  );
}

function Container51() {
  return (
    <div className="content-stretch flex flex-col items-start relative self-stretch shrink-0" data-name="Container">
      <div className="flex flex-col font-['SF_Pro:Semibold',sans-serif] font-[590] justify-center leading-[0] relative shrink-0 text-[12px] text-white tracking-[0.6px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[16px]">Lun</p>
      </div>
    </div>
  );
}

function Container52() {
  return (
    <div className="content-stretch flex flex-col items-start relative self-stretch shrink-0" data-name="Container">
      <div className="flex flex-col font-['SF_Pro:Semibold',sans-serif] font-[590] justify-center leading-[0] relative shrink-0 text-[12px] text-white tracking-[0.6px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[16px]">Mar</p>
      </div>
    </div>
  );
}

function Container53() {
  return (
    <div className="content-stretch flex flex-col items-start relative self-stretch shrink-0" data-name="Container">
      <div className="flex flex-col font-['SF_Pro:Semibold',sans-serif] font-[590] justify-center leading-[0] relative shrink-0 text-[12px] text-white tracking-[0.6px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[16px]">Mié</p>
      </div>
    </div>
  );
}

function Container54() {
  return (
    <div className="content-stretch flex flex-col items-start relative self-stretch shrink-0" data-name="Container">
      <div className="flex flex-col font-['SF_Pro:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[#ff999a] text-[12px] tracking-[0.6px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[16px]">Jue</p>
      </div>
    </div>
  );
}

function Container55() {
  return (
    <div className="content-stretch flex flex-col items-start relative self-stretch shrink-0" data-name="Container">
      <div className="flex flex-col font-['SF_Pro:Semibold',sans-serif] font-[590] justify-center leading-[0] relative shrink-0 text-[12px] text-white tracking-[0.6px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[16px]">Vie</p>
      </div>
    </div>
  );
}

function Container56() {
  return (
    <div className="content-stretch flex flex-col items-start relative self-stretch shrink-0" data-name="Container">
      <div className="flex flex-col font-['SF_Pro:Semibold',sans-serif] font-[590] justify-center leading-[0] relative shrink-0 text-[12px] text-white tracking-[0.6px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[16px]">Sáb</p>
      </div>
    </div>
  );
}

function Container50() {
  return (
    <div className="h-[16px] relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start justify-between pl-[32px] pr-[8.02px] relative size-full">
        <Container51 />
        <Container52 />
        <Container53 />
        <Container54 />
        <Container55 />
        <Container56 />
      </div>
    </div>
  );
}

function ChartSection() {
  return (
    <div className="backdrop-blur-[15px] bg-[rgba(255,255,255,0.1)] relative rounded-[8px] shrink-0 w-[342px]" data-name="Chart Section">
      <div className="content-stretch flex flex-col gap-[12px] items-start overflow-clip p-[25px] relative rounded-[inherit] size-full">
        <Container45 />
        <AbstractRepresentationOfAChartUsingCssGradientsShapes />
        <Container50 />
      </div>
      <div aria-hidden="true" className="absolute border border-[rgba(199,198,202,0.2)] border-solid inset-0 pointer-events-none rounded-[8px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]" />
    </div>
  );
}

function Main() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[32px] items-start left-0 max-w-[1280px] overflow-clip pt-[24px] px-[24px] right-0 top-[101px]" data-name="Main">
      <TotalBalanceCard />
      <HeaderSegmentedControl />
      <RecentTransactions />
      <ChartSection />
    </div>
  );
}

function Heading() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Heading 1">
      <div className="flex flex-col font-['SF_Pro:Semibold',sans-serif] font-[590] justify-center leading-[0] relative shrink-0 text-[24px] text-white tracking-[-1.2px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[32px]">FinanceFlux</p>
      </div>
    </div>
  );
}

function ProfileImage() {
  return (
    <div className="backdrop-blur-[15px] bg-[rgba(255,255,255,0.1)] relative rounded-[43px] shrink-0 size-[32px]" data-name="Profile Image">
      <div aria-hidden="true" className="absolute border border-[rgba(199,198,202,0.2)] border-solid inset-0 pointer-events-none rounded-[43px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]" />
      <div className="flex flex-col items-center justify-center size-full">
        <div className="content-stretch flex flex-col items-center justify-center p-[25px] relative size-full">
          <div className="relative rounded-[154.737px] shadow-[0px_6.737px_6.737px_0px_rgba(0,0,0,0.25)] shrink-0 size-[32px]" data-name="IMG_2264 1">
            <div aria-hidden="true" className="absolute bg-clip-padding border-0 border-[transparent] border-solid inset-0 pointer-events-none rounded-[154.737px]">
              <div className="absolute bg-clip-padding bg-gradient-to-b border-0 border-[transparent] border-solid from-[#c193d2] inset-0 rounded-[154.737px] to-[#706bd0]" />
              <img alt="" className="absolute bg-clip-padding border-0 border-[transparent] border-solid max-w-none object-cover rounded-[154.737px] size-full" src={imgImg22641} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Container57() {
  return (
    <div className="relative shrink-0 w-[342px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-between relative size-full">
        <Heading />
        <ProfileImage />
      </div>
    </div>
  );
}

function HeaderTopAppBar() {
  return (
    <div className="absolute backdrop-blur-[32px] content-stretch flex h-[101px] items-end justify-between left-0 px-[24px] py-[16px] top-0 w-[390px]" data-name="Header - TopAppBar">
      <Container57 />
    </div>
  );
}

function GradientInterfaceEssentialStar2RewardRatingRateSocialStarMediaFavoriteLikeStarsSpark() {
  return (
    <div className="absolute inset-[0_-0.01%_-0.01%_-0.01%]" data-name="Gradient/Interface Essential/star-2--reward-rating-rate-social-star-media-favorite-like-stars-spark">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24.0027 24.0023">
        <g id="Gradient/Interface Essential/star-2--reward-rating-rate-social-star-media-favorite-like-stars-spark">
          <path clipRule="evenodd" d={svgPaths.p14caf600} fill="var(--fill-0, white)" fillRule="evenodd" id="Union" />
        </g>
      </svg>
    </div>
  );
}

function Star2StreamlineSharpGradientFree() {
  return (
    <div className="overflow-clip relative shrink-0 size-[24px]" data-name="Star-2 Streamline Sharp-Gradient-Free">
      <GradientInterfaceEssentialStar2RewardRatingRateSocialStarMediaFavoriteLikeStarsSpark />
    </div>
  );
}

function Margin3() {
  return (
    <div className="content-stretch flex flex-col items-start pt-[4px] relative shrink-0" data-name="Margin">
      <div className="flex flex-col font-['SF_Pro:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[10px] text-white whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[15px]">Inicio</p>
      </div>
    </div>
  );
}

function Link() {
  return (
    <div className="h-[45px] relative rounded-[12px] shrink-0 w-[60px]" data-name="Link">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-center justify-center px-[16px] py-[4px] relative size-full">
        <Star2StreamlineSharpGradientFree />
        <Margin3 />
      </div>
    </div>
  );
}

function MoneyWalletOpenStreamlineUltimate() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Money-Wallet-Open Streamline Ultimate">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g clipPath="url(#clip0_1_718)" id="Money-Wallet-Open Streamline Ultimate">
          <path d={svgPaths.p34284b00} fill="var(--fill-0, #77767B)" id="Vector" />
        </g>
        <defs>
          <clipPath id="clip0_1_718">
            <rect fill="white" height="20" width="20" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Margin4() {
  return (
    <div className="content-stretch flex flex-col items-start pt-[4px] relative shrink-0" data-name="Margin">
      <div className="flex flex-col font-['SF_Pro:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#77767b] text-[10px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[15px]">Transacciones</p>
      </div>
    </div>
  );
}

function Link1() {
  return (
    <div className="h-[45px] relative rounded-[12px] shrink-0 w-[60px]" data-name="Link">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-center justify-center px-[16px] py-[4px] relative size-full">
        <MoneyWalletOpenStreamlineUltimate />
        <Margin4 />
      </div>
    </div>
  );
}

function AddSquareStreamlineCore2() {
  return (
    <div className="overflow-clip relative shrink-0 size-[20px]" data-name="Add-Square Streamline Core">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="add-square--square-remove-cross-buttons-add-plus-button-+-mathematics-math">
          <path clipRule="evenodd" d={svgPaths.p202d0c00} fill="var(--fill-0, #77767B)" fillRule="evenodd" id="Subtract" />
        </g>
      </svg>
    </div>
  );
}

function Margin5() {
  return (
    <div className="content-stretch flex flex-col items-start pt-[4px] relative shrink-0" data-name="Margin">
      <div className="flex flex-col font-['SF_Pro:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#77767b] text-[10px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[15px]">Añadir</p>
      </div>
    </div>
  );
}

function Link2() {
  return (
    <div className="h-[45px] relative rounded-[12px] shrink-0 w-[60px]" data-name="Link">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-center justify-center px-[16px] py-[4px] relative size-full">
        <AddSquareStreamlineCore2 />
        <Margin5 />
      </div>
    </div>
  );
}

function SignalFullPhoneMobileDeviceSignalWirelessSmartphoneIphoneBarBarsFullAndroid() {
  return (
    <div className="absolute inset-[3.13%]" data-name="signal-full--phone-mobile-device-signal-wireless-smartphone-iphone-bar-bars-full-android">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18.75 18.75">
        <g id="signal-full--phone-mobile-device-signal-wireless-smartphone-iphone-bar-bars-full-android">
          <path clipRule="evenodd" d={svgPaths.p1cf46e00} fill="var(--fill-0, #77767B)" fillRule="evenodd" id="Union" />
        </g>
      </svg>
    </div>
  );
}

function SignalFullStreamlinePlump() {
  return (
    <div className="overflow-clip relative shrink-0 size-[20px]" data-name="Signal-Full Streamline Plump">
      <SignalFullPhoneMobileDeviceSignalWirelessSmartphoneIphoneBarBarsFullAndroid />
    </div>
  );
}

function Margin6() {
  return (
    <div className="content-stretch flex flex-col items-start pt-[4px] relative shrink-0" data-name="Margin">
      <div className="flex flex-col font-['SF_Pro:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#77767b] text-[10px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[15px]">Reportes</p>
      </div>
    </div>
  );
}

function Link3() {
  return (
    <div className="h-[45px] relative rounded-[12px] shrink-0 w-[60px]" data-name="Link">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-center justify-center px-[16px] py-[4px] relative size-full">
        <SignalFullStreamlinePlump />
        <Margin6 />
      </div>
    </div>
  );
}

function BottomNavBar() {
  return (
    <div className="absolute bg-[#161618] bottom-0 content-stretch flex gap-[28px] items-center left-0 px-[22px] py-[16px] w-[390px]" data-name="BottomNavBar">
      <Link />
      <Link1 />
      <Link2 />
      <Link3 />
    </div>
  );
}

export default function Component01Inicio() {
  return (
    <div className="relative size-full" data-name="01-Inicio">
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
        <img alt="" className="absolute max-w-none object-cover size-full" src={img01Inicio} />
        <div className="absolute bg-[rgba(0,0,0,0.49)] inset-0" />
      </div>
      <Main />
      <HeaderTopAppBar />
      <BottomNavBar />
    </div>
  );
}