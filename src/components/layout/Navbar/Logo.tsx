import Link from 'next/link'

export const Logo = () => {
  return (
    <Link
      href="/"
      aria-label="Ousmane Chicha"
      className="flex shrink-0 items-center justify-center gap-2.5 sm:gap-3.5"
    >
      {/* Icône */}
      <div className="relative flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-black sm:h-10 sm:w-10">
        <div className="h-2 w-2 rounded-full bg-white sm:h-2.5 sm:w-2.5" />

        <div className="absolute -top-1.5 h-2.5 w-2.5 rounded-full border-2 border-white bg-black sm:-top-2 sm:h-3 sm:w-3 sm:border-[2.5px]" />
      </div>

      {/* Texte */}
      <div className="flex flex-col items-start leading-none">
        <span className="font-sans text-[24px] font-extrabold lowercase tracking-[-0.06em] text-black sm:text-[30px] lg:text-[36px]">
          ousmane
        </span>

        <span className="mt-[3px] text-[6px] font-medium uppercase tracking-[0.42em] text-black sm:mt-[4px] sm:text-[7px] lg:text-[8px] lg:tracking-[0.48em]">
          Hooka
        </span>
      </div>
    </Link>
  )
}