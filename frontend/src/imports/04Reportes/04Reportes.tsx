import svgPaths from "./svg-pgsrpr9k0k";
import img04Reportes from "./55f9dae31470da02395e320d1c810840b44f82d2.png";
import imgImg22641 from "./1f58a614445d9fce31b44453a1e3a0395d49b1db.png";

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

function Container() {
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
      <Container />
    </div>
  );
}

function Heading1() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Heading 2">
      <div className="flex flex-col font-['SF_Pro:Semibold',sans-serif] font-[590] justify-center leading-[0] relative shrink-0 text-[#f1f3f5] text-[24px] tracking-[-0.24px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[32px]">Reportes</p>
      </div>
    </div>
  );
}

function Container2() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['SF_Pro:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#b1b1b1] text-[16px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[24px]">Resumen de tus hábitos de gasto.</p>
      </div>
    </div>
  );
}

function Container1() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[256px]" data-name="Container">
      <Heading1 />
      <Container2 />
    </div>
  );
}

function Button() {
  return (
    <div className="bg-[#f1f3f5] drop-shadow-[0px_4px_7.5px_rgba(0,0,0,0.05)] flex-[1_0_0] min-w-px relative rounded-[12px]" data-name="Button">
      <div className="flex flex-col items-center justify-center size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-center justify-center px-[24px] py-[8px] relative size-full">
          <div className="flex flex-col font-['SF_Pro:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#161618] text-[16px] text-center whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
            <p className="leading-[24px]">Semana</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Button1() {
  return (
    <div className="flex-[1_0_0] min-w-px relative rounded-[12px]" data-name="Button">
      <div className="flex flex-col items-center justify-center size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-center justify-center px-[24px] py-[8px] relative size-full">
          <div className="flex flex-col font-['SF_Pro:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#77767b] text-[16px] text-center whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
            <p className="leading-[24px]">Mes</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Button2() {
  return (
    <div className="flex-[1_0_0] min-w-px relative rounded-[12px]" data-name="Button">
      <div className="flex flex-col items-center justify-center size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-center justify-center px-[24px] py-[8px] relative size-full">
          <div className="flex flex-col font-['SF_Pro:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#77767b] text-[16px] text-center whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
            <p className="leading-[24px]">Año</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function OverlayBorderOverlayBlur() {
  return (
    <div className="backdrop-blur-[15px] bg-[rgba(255,255,255,0.1)] content-stretch flex items-center justify-between p-[7px] relative rounded-[12px] shrink-0 w-[342px]" data-name="Overlay+Border+OverlayBlur">
      <div aria-hidden="true" className="absolute border border-[rgba(199,198,202,0.2)] border-solid inset-0 pointer-events-none rounded-[12px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]" />
      <Button />
      <Button1 />
      <Button2 />
    </div>
  );
}

function HeaderSegmentedControl() {
  return (
    <div className="content-stretch flex flex-col gap-[15px] items-start relative shrink-0 w-full" data-name="Header & Segmented Control">
      <Container1 />
      <OverlayBorderOverlayBlur />
    </div>
  );
}

function Container4() {
  return (
    <div className="h-[8px] relative shrink-0 w-[13.333px]" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.3333 8">
        <g id="Container">
          <path d={svgPaths.p19734dc0} fill="var(--fill-0, #161618)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Container5() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['SF_Pro:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#161618] text-[16px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[24px]">{`+12% semanal `}</p>
      </div>
    </div>
  );
}

function Background() {
  return (
    <div className="bg-[#ff999a] content-stretch flex gap-[4px] items-center px-[12px] py-[4px] relative rounded-[12px] shrink-0" data-name="Background">
      <Container4 />
      <Container5 />
    </div>
  );
}

function Container3() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-between relative size-full">
        <div className="flex flex-col font-['SF_Pro:Semibold',sans-serif] font-[590] justify-center leading-[0] relative shrink-0 text-[18px] text-white whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          <p className="leading-[24px]">Gasto Total</p>
        </div>
        <Background />
      </div>
    </div>
  );
}

function Container6() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['SF_Pro:Semibold',sans-serif] font-[590] justify-center leading-[0] relative shrink-0 text-[12px] text-white tracking-[0.6px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[16px]">$500</p>
      </div>
    </div>
  );
}

function Container7() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['SF_Pro:Semibold',sans-serif] font-[590] justify-center leading-[0] relative shrink-0 text-[12px] text-white tracking-[0.6px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[16px]">$100</p>
      </div>
    </div>
  );
}

function Container8() {
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
        <Container6 />
        <Container7 />
        <Container8 />
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

function Container10() {
  return (
    <div className="content-stretch flex flex-col items-start relative self-stretch shrink-0" data-name="Container">
      <div className="flex flex-col font-['SF_Pro:Semibold',sans-serif] font-[590] justify-center leading-[0] relative shrink-0 text-[12px] text-white tracking-[0.6px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[16px]">Lun</p>
      </div>
    </div>
  );
}

function Container11() {
  return (
    <div className="content-stretch flex flex-col items-start relative self-stretch shrink-0" data-name="Container">
      <div className="flex flex-col font-['SF_Pro:Semibold',sans-serif] font-[590] justify-center leading-[0] relative shrink-0 text-[12px] text-white tracking-[0.6px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[16px]">Mar</p>
      </div>
    </div>
  );
}

function Container12() {
  return (
    <div className="content-stretch flex flex-col items-start relative self-stretch shrink-0" data-name="Container">
      <div className="flex flex-col font-['SF_Pro:Semibold',sans-serif] font-[590] justify-center leading-[0] relative shrink-0 text-[12px] text-white tracking-[0.6px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[16px]">Mié</p>
      </div>
    </div>
  );
}

function Container13() {
  return (
    <div className="content-stretch flex flex-col items-start relative self-stretch shrink-0" data-name="Container">
      <div className="flex flex-col font-['SF_Pro:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[#ff999a] text-[12px] tracking-[0.6px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[16px]">Jue</p>
      </div>
    </div>
  );
}

function Container14() {
  return (
    <div className="content-stretch flex flex-col items-start relative self-stretch shrink-0" data-name="Container">
      <div className="flex flex-col font-['SF_Pro:Semibold',sans-serif] font-[590] justify-center leading-[0] relative shrink-0 text-[12px] text-white tracking-[0.6px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[16px]">Vie</p>
      </div>
    </div>
  );
}

function Container15() {
  return (
    <div className="content-stretch flex flex-col items-start relative self-stretch shrink-0" data-name="Container">
      <div className="flex flex-col font-['SF_Pro:Semibold',sans-serif] font-[590] justify-center leading-[0] relative shrink-0 text-[12px] text-white tracking-[0.6px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[16px]">Sáb</p>
      </div>
    </div>
  );
}

function Container9() {
  return (
    <div className="h-[16px] relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start justify-between pl-[32px] pr-[8.02px] relative size-full">
        <Container10 />
        <Container11 />
        <Container12 />
        <Container13 />
        <Container14 />
        <Container15 />
      </div>
    </div>
  );
}

function ChartSection() {
  return (
    <div className="backdrop-blur-[15px] bg-[rgba(255,255,255,0.1)] relative rounded-[8px] shrink-0 w-[342px]" data-name="Chart Section">
      <div className="content-stretch flex flex-col gap-[12px] items-start overflow-clip p-[25px] relative rounded-[inherit] size-full">
        <Container3 />
        <AbstractRepresentationOfAChartUsingCssGradientsShapes />
        <Container9 />
      </div>
      <div aria-hidden="true" className="absolute border border-[rgba(199,198,202,0.2)] border-solid inset-0 pointer-events-none rounded-[8px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]" />
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

function OverlayBorderOverlayBlur1() {
  return (
    <div className="absolute backdrop-blur-[20px] bg-[rgba(241,243,245,0.4)] content-stretch flex items-center justify-center left-0 rounded-[12px] size-[48px] top-0" data-name="Overlay+Border+OverlayBlur">
      <div className="-translate-x-1/2 absolute bg-[rgba(255,255,255,0)] left-1/2 rounded-[12px] size-[48px] top-0" data-name="Overlay+Shadow" />
      <PastaBowlWarmStreamlineUltimate />
    </div>
  );
}

function Heading2() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-0 right-0 top-[92px]" data-name="Heading 3">
      <div className="flex flex-col font-['SF_Pro:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[16px] text-white whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[24px]">Comida</p>
      </div>
    </div>
  );
}

function Container16() {
  return (
    <div className="h-[116px] relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <OverlayBorderOverlayBlur1 />
        <div className="-translate-y-1/2 absolute flex flex-col font-['SF_Pro:Semibold',sans-serif] font-[590] justify-center leading-[0] left-0 text-[18px] text-white top-[75.5px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          <p className="leading-[24px]">Categoría Principal</p>
        </div>
        <Heading2 />
      </div>
    </div>
  );
}

function Container18() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['SF_Pro:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[16px] text-white w-full" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[24px]">26% del ingreso total</p>
      </div>
    </div>
  );
}

function Container17() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['SF_Pro:Semibold',sans-serif] font-[590] h-[46px] justify-center leading-[0] relative shrink-0 text-[#ff999a] text-[36px] w-full" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[24px]">-$108</p>
      </div>
      <Container18 />
    </div>
  );
}

function Margin() {
  return (
    <div className="relative shrink-0 w-full" data-name="Margin">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pt-[16px] relative size-full">
        <Container17 />
      </div>
    </div>
  );
}

function TopCategoryInsight() {
  return (
    <div className="backdrop-blur-[15px] bg-[rgba(255,255,255,0.1)] relative rounded-[8px] shrink-0 w-full" data-name="Top Category Insight">
      <div aria-hidden="true" className="absolute border border-[rgba(199,198,202,0.2)] border-solid inset-0 pointer-events-none rounded-[8px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]" />
      <div className="content-stretch flex flex-col gap-[12px] items-start p-[25px] relative size-full">
        <Container16 />
        <Margin />
      </div>
    </div>
  );
}

function Heading3() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0 w-full" data-name="Heading 3">
      <div className="flex flex-col font-['SF_Pro:Semibold',sans-serif] font-[590] justify-center leading-[0] relative shrink-0 text-[18px] text-white whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[24px]">Distribución de Gastos</p>
      </div>
    </div>
  );
}

function Heading3Margin() {
  return (
    <div className="relative shrink-0 w-[292px]" data-name="Heading 3:margin">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-[16px] relative size-full">
        <Heading3 />
      </div>
    </div>
  );
}

function PieLayer() {
  return (
    <div className="-translate-x-1/2 -translate-y-1/2 absolute h-[213.913px] left-1/2 top-1/2 w-[180.489px]" data-name="PieLayer">
      <div className="absolute inset-[0_0_0_-0.19%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 180.823 213.913">
          <g id="PieLayer">
            <g id="pie12" />
            <g id="pie11" />
            <g id="pie10" />
            <g id="pie9" />
            <g id="pie8" />
            <g id="pie7" />
            <g id="pie6" />
            <g id="pie5" />
            <g id="pie4" />
            <path d={svgPaths.p17fb3f00} fill="var(--fill-0, #A6FF88)" id="pie1" />
            <path d={svgPaths.p1d5b3b00} fill="var(--fill-0, white)" id="pie2" />
            <path d={svgPaths.p346bc500} fill="var(--fill-0, #FF999A)" id="pie3" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function MainChart() {
  return (
    <div className="absolute left-0 size-[246px] top-0" data-name="MainChart">
      <PieLayer />
      <div className="-translate-y-1/2 absolute flex flex-col font-['SF_Pro:Regular',sans-serif] font-normal justify-center leading-[0] left-[calc(50%-5px)] text-[16px] text-white top-[calc(50%-14px)] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[24px]">Total</p>
      </div>
      <p className="absolute font-['SF_Pro:Bold',sans-serif] font-bold leading-[normal] left-[calc(50%-17px)] text-[#ff999a] text-[22.799px] top-[calc(50%-2px)] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        $208
      </p>
    </div>
  );
}

function Frame() {
  return (
    <div className="relative shrink-0 size-[246px]">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <MainChart />
      </div>
    </div>
  );
}

function Container20() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['SF_Pro:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#ff999a] text-[16px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[24px]">Comida</p>
      </div>
    </div>
  );
}

function Container19() {
  return (
    <div className="content-stretch flex gap-[8px] h-[24px] items-center relative shrink-0" data-name="Container">
      <div className="bg-[#ff999a] relative rounded-[12px] shrink-0 size-[12px]" data-name="Background" />
      <Container20 />
    </div>
  );
}

function Container22() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['SF_Pro:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#a6ff88] text-[16px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[24px]">Servicios</p>
      </div>
    </div>
  );
}

function Container21() {
  return (
    <div className="content-stretch flex gap-[8px] h-[24px] items-center relative shrink-0" data-name="Container">
      <div className="bg-[#a6ff88] relative rounded-[12px] shrink-0 size-[12px]" data-name="Background" />
      <Container22 />
    </div>
  );
}

function Container24() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['SF_Pro:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[16px] text-white whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[24px]">Transporte</p>
      </div>
    </div>
  );
}

function Container23() {
  return (
    <div className="content-stretch flex gap-[8px] h-[24px] items-center relative shrink-0" data-name="Container">
      <div className="bg-white relative rounded-[12px] shrink-0 size-[12px]" data-name="Background" />
      <Container24 />
    </div>
  );
}

function Legend() {
  return (
    <div className="content-start flex flex-wrap gap-[16px] items-start justify-center px-[2px] relative shrink-0 w-[266px]" data-name="Legend">
      <Container19 />
      <Container21 />
      <Container23 />
    </div>
  );
}

function LegendMargin() {
  return (
    <div className="relative shrink-0" data-name="Legend:margin">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pt-[16px] relative size-full">
        <Legend />
      </div>
    </div>
  );
}

function DonutChartArea() {
  return (
    <div className="backdrop-blur-[15px] bg-[rgba(255,255,255,0.1)] min-h-[300px] relative rounded-[8px] shrink-0 w-full" data-name="Donut Chart Area">
      <div aria-hidden="true" className="absolute border border-[rgba(199,198,202,0.2)] border-solid inset-0 pointer-events-none rounded-[8px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]" />
      <div className="flex flex-col items-center min-h-[inherit] size-full">
        <div className="content-stretch flex flex-col gap-[12px] items-center min-h-[inherit] p-[25px] relative size-full">
          <Heading3Margin />
          <Frame />
          <LegendMargin />
        </div>
      </div>
    </div>
  );
}

function MainContent() {
  return (
    <div className="content-stretch flex flex-col gap-[32px] items-start max-w-[1024px] pt-[16px] px-[24px] w-full" data-name="Main Content">
      <HeaderSegmentedControl />
      <ChartSection />
      <TopCategoryInsight />
      <DonutChartArea />
    </div>
  );
}

function GradientInterfaceEssentialStar2RewardRatingRateSocialStarMediaFavoriteLikeStarsSpark() {
  return (
    <div className="absolute inset-[0_-0.01%_-0.01%_-0.01%]" data-name="Gradient/Interface Essential/star-2--reward-rating-rate-social-star-media-favorite-like-stars-spark">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24.0027 24.0023">
        <g id="Gradient/Interface Essential/star-2--reward-rating-rate-social-star-media-favorite-like-stars-spark">
          <path clipRule="evenodd" d={svgPaths.p14caf600} fill="var(--fill-0, #77767B)" fillRule="evenodd" id="Union" />
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

function Margin1() {
  return (
    <div className="content-stretch flex flex-col items-start pt-[4px] relative shrink-0" data-name="Margin">
      <div className="flex flex-col font-['SF_Pro:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#77767b] text-[10px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
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
        <Margin1 />
      </div>
    </div>
  );
}

function MoneyWalletOpenStreamlineUltimate() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Money-Wallet-Open Streamline Ultimate">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g clipPath="url(#clip0_1_804)" id="Money-Wallet-Open Streamline Ultimate">
          <path d={svgPaths.p34284b00} fill="var(--fill-0, #77767B)" id="Vector" />
        </g>
        <defs>
          <clipPath id="clip0_1_804">
            <rect fill="white" height="20" width="20" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Margin2() {
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
        <Margin2 />
      </div>
    </div>
  );
}

function AddSquareStreamlineCore() {
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

function Margin3() {
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
        <AddSquareStreamlineCore />
        <Margin3 />
      </div>
    </div>
  );
}

function SignalFullPhoneMobileDeviceSignalWirelessSmartphoneIphoneBarBarsFullAndroid() {
  return (
    <div className="absolute inset-[3.13%]" data-name="signal-full--phone-mobile-device-signal-wireless-smartphone-iphone-bar-bars-full-android">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18.75 18.75">
        <g id="signal-full--phone-mobile-device-signal-wireless-smartphone-iphone-bar-bars-full-android">
          <path clipRule="evenodd" d={svgPaths.p1cf46e00} fill="var(--fill-0, white)" fillRule="evenodd" id="Union" />
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

function Margin4() {
  return (
    <div className="content-stretch flex flex-col items-start pt-[4px] relative shrink-0" data-name="Margin">
      <div className="flex flex-col font-['SF_Pro:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[10px] text-white whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
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
        <Margin4 />
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

export default function Component04Reportes() {
  return (
    <div className="relative size-full" data-name="04-Reportes">
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
        <img alt="" className="absolute max-w-none object-cover size-full" src={img04Reportes} />
        <div className="absolute bg-[rgba(0,0,0,0.49)] inset-0" />
      </div>
      <HeaderTopAppBar />
      <div className="absolute left-0 right-0 top-[101px] bottom-[77px]" data-name="Main">
        <MainContent />
      </div>
      <BottomNavBar />
    </div>
  );
}