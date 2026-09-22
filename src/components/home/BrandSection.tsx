'use client'

import Link from 'next/link'
import { ArrowRight, Sparkles } from 'lucide-react'

export const BrandSection = () => {
  return (
    <section className="bg-[#0A0A0A] py-20 text-white md:py-24 lg:py-32">
      <div className="mx-auto w-full max-w-[1600px] px-5 sm:px-8 lg:px-10">
        <div className="grid min-h-[520px] overflow-hidden lg:grid-cols-[0.9fr_1.1fr]">
          {/* LEFT — BRAND VISUAL */}
          <div className="relative flex min-h-[420px] items-center justify-center overflow-hidden bg-[#151515] lg:min-h-[620px]">
            {/* Decorative gold circles */}
            <div className="absolute -left-24 -top-24 h-72 w-72 rounded-full border border-[#C9A94E]/20" />
            <div className="absolute -bottom-32 -right-24 h-96 w-96 rounded-full border border-[#C9A94E]/10" />

            <div className="relative z-10 flex flex-col items-center text-center">
              <div className="relative flex h-28 w-28 items-center justify-center rounded-full border border-[#C9A94E]/60 sm:h-36 sm:w-36">
                <div className="h-5 w-5 rounded-full bg-[#C9A94E]" />

                <div className="absolute -top-3 h-9 w-9 rounded-full border-2 border-[#C9A94E] bg-[#151515]" />
              </div>

              <div className="mt-8">
                <p className="font-sans text-4xl font-extrabold lowercase tracking-[-0.06em] sm:text-5xl">
                  ousmane
                </p>

                <p className="mt-2 text-[9px] font-medium uppercase tracking-[0.55em] text-[#C9A94E]">
                  Hooka
                </p>
              </div>
            </div>

            <div className="absolute bottom-6 left-6 flex items-center gap-2 text-[9px] uppercase tracking-[0.22em] text-white/40">
              <Sparkles className="h-3.5 w-3.5" strokeWidth={1.5} />
              L'art de la chicha
            </div>
          </div>

          {/* RIGHT — CONTENT */}
          <div className="flex flex-col justify-center bg-[#111111] px-7 py-14 sm:px-10 md:px-14 lg:px-16 xl:px-20">
            <p className="mb-5 text-[10px] font-medium uppercase tracking-[0.3em] text-[#C9A94E]">
              Notre histoire
            </p>

            <h2 className="max-w-2xl font-serif text-4xl font-medium leading-[1.05] tracking-[-0.03em] sm:text-5xl lg:text-6xl">
              L'univers
              <br />
              <span className="text-[#C9A94E]">Ousmane Chicha</span>
            </h2>

            <div className="mt-8 max-w-xl space-y-5 text-sm leading-7 text-white/60 sm:text-base">
              <p>
                Ousmane Hooka est pensé comme un univers autour de la chicha,
                où la qualité des produits rencontre l'expérience et l'élégance.
              </p>

              <p>
                Retrouvez une sélection de chichas, saveurs, accessoires et
                packs, pensée pour accompagner chaque moment avec élégance.
              </p>
            </div>

            <div className="mt-10">
              <Link
                href="/"
                className="group inline-flex items-center gap-4 border-b border-white/40 pb-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-white transition-colors hover:border-[#C9A94E] hover:text-[#C9A94E]"
              >
                Découvrir notre univers

                <ArrowRight
                  className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                  strokeWidth={1.5}
                />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}