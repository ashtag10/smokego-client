'use client'

import { FormEvent, useState } from 'react'
import { ArrowRight, Check, Mail } from 'lucide-react'

export const NewsletterSection = () => {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!email.trim()) {
      return
    }

    /*
     * TODO:
     * Brancher ici l'endpoint newsletter du backend
     * lorsque celui-ci sera disponible.
     */
    setSubmitted(true)
  }

  return (
    <section className="bg-[#FDFBF7] py-16 md:py-20 lg:py-24">
      <div className="mx-auto w-full max-w-[1000px] px-5 text-center sm:px-8">
        <div className="mx-auto flex h-12 w-12 items-center justify-center border border-[#C9A94E] text-[#B8943E]">
          <Mail
            className="h-5 w-5"
            strokeWidth={1.5}
          />
        </div>

        <p className="mt-6 text-[10px] font-medium uppercase tracking-[0.3em] text-[#B8943E]">
          Ousmane Hooka
        </p>

        <h2 className="mt-3 font-serif text-3xl font-medium tracking-[-0.02em] text-[#1A1A1A] sm:text-4xl lg:text-5xl">
          Restez dans notre univers
        </h2>

        <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-[#6B6B6B]">
          Recevez nos nouveautés, nouvelles saveurs, collections et actualités
          directement dans votre boîte mail.
        </p>

        {!submitted ? (
          <form
            onSubmit={handleSubmit}
            className="mx-auto mt-9 flex max-w-xl flex-col gap-2 sm:flex-row"
          >
            <label
              htmlFor="newsletter-email"
              className="sr-only"
            >
              Votre adresse email
            </label>

            <input
              id="newsletter-email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="Votre adresse email"
              required
              className="h-12 min-w-0 flex-1 border border-[#D1D1D1] bg-white px-4 text-sm text-[#1A1A1A] outline-none transition-colors placeholder:text-[#8A8A8A] focus:border-[#C9A94E]"
            />

            <button
              type="submit"
              className="group flex h-12 items-center justify-center gap-3 bg-[#0A0A0A] px-6 text-[10px] font-semibold uppercase tracking-[0.16em] text-white transition-colors hover:bg-[#C9A94E]"
            >
              S'inscrire

              <ArrowRight
                className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                strokeWidth={1.5}
              />
            </button>
          </form>
        ) : (
          <div className="mx-auto mt-9 flex max-w-xl items-center justify-center gap-3 border border-[#C9A94E] bg-white px-5 py-4 text-sm text-[#1A1A1A]">
            <Check
              className="h-5 w-5 text-[#B8943E]"
              strokeWidth={1.5}
            />

            <span>
              Merci. Votre inscription a bien été prise en compte.
            </span>
          </div>
        )}

        <p className="mt-4 text-[10px] text-[#8A8A8A]">
          Aucun spam. Désinscription possible à tout moment.
        </p>
      </div>
    </section>
  )
}