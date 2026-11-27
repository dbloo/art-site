import {SALE} from "./sale"

const TEXT = `SITEWIDE ${SALE.percentOff}% OFF SALE`
const REPEATS = 8;
export const Banner = () => {
  const items = Array.from({ length: REPEATS }, (_, i) => (
    <span key={i} className="mx-8">{TEXT}</span>
  ))

  return (
    <div className="w-full h-10  flex items-center overflow-hidden bg-[#FADE22] z-10  absolute top-17 lg:top-25 text-black font-black">
      <div className="flex w-max marquee whitespace-nowrap text-xl hover:paused">
        <div className="flex shrink-0">{items}</div>
        <div className="flex shrink-0" aria-hidden="true">{items}</div>
      </div>
    </div>
  )
}