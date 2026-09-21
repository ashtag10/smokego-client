'use client'

import {useEffect, useState} from 'react'
import Image from 'next/image'
import {cn} from '@/lib/utils/helpers'

const languages = [
  {
    code: 'en',
    name: 'English',
    flag: '/flags/gb.svg',
  },
  {
    code: 'pt',
    name: 'Português',
    flag: '/flags/pt.svg',
  },
  {
    code: 'de',
    name: 'Deutsch',
    flag: '/flags/de.svg',
  },
  {
    code: 'es',
    name: 'Español',
    flag: '/flags/es.svg',
  },
  {
    code: 'fr',
    name: 'Français',
    flag: '/flags/fr.svg',
  },
  {
    code: 'it',
    name: 'Italiano',
    flag: '/flags/it.svg',
  },
  {
    code: 'ja',
    name: 'Japonais',
    flag: '/flags/jp.svg',
  },
  {
    code: 'nl',
    name: 'Néerlandais',
    flag: '/flags/nl.svg',
  },
  {
    code: 'pl',
    name: 'Polonais',
    flag: '/flags/pl.svg',
  },
  {
    code: 'el',
    name: 'Grec',
    flag: '/flags/gr.svg',
  },
  {
    code: 'ro',
    name: 'Roumain',
    flag: '/flags/ro.svg',
  },
  {
    code: 'bg',
    name: 'Bulgare',
    flag: '/flags/bg.svg',
  },
  {
    code: 'cs',
    name: 'Tchèque',
    flag: '/flags/cz.svg',
  },
  {
    code: 'ko',
    name: 'Coréen',
    flag: '/flags/kr.svg',
  },
  {
    code: 'ru',
    name: 'Russe',
    flag: '/flags/ru.svg',
  },
  {
    code: 'ar',
    name: 'Arabe',
    flag: '/flags/sa.svg',
  },
] as const

type LanguageCode = (typeof languages)[number]['code']

export const LanguageSelector = () => {
  const [open, setOpen] = useState(false)
  const [language, setLanguage] =
    useState<LanguageCode>('fr')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)

    const savedLanguage =
      localStorage.getItem(
        'ousmane-chicha-language',
      ) as LanguageCode | null

    if (
      savedLanguage &&
      languages.some(
        (item) => item.code === savedLanguage,
      )
    ) {
      setLanguage(savedLanguage)
    }
  }, [])

  const currentLanguage =
    languages.find(
      (item) => item.code === language,
    ) ??
    languages.find(
      (item) => item.code === 'fr',
    )!

  const handleLanguageChange = (
    newLanguage: LanguageCode,
  ) => {
    setLanguage(newLanguage)

    localStorage.setItem(
      'ousmane-chicha-language',
      newLanguage,
    )

    document.documentElement.lang =
      newLanguage

    document.documentElement.dir =
      newLanguage === 'ar'
        ? 'rtl'
        : 'ltr'

    setOpen(false)

    window.dispatchEvent(
      new CustomEvent('languagechange', {
        detail: {
          language: newLanguage,
        },
      }),
    )
  }

  if (!mounted) {
    return (
      <div className="relative">
        <button
          type="button"
          aria-label="Choisir la langue"
          className="flex h-10 w-10 items-center justify-center"
        >
          <Image
            src="/flags/fr.svg"
            alt="Français"
            width={28}
            height={20}
            className="h-5 w-7 object-cover"
          />
        </button>
      </div>
    )
  }

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() =>
          setOpen((value) => !value)
        }
        aria-expanded={open}
        aria-label="Choisir la langue"
        className="flex h-10 w-10 items-center justify-center"
      >
        <Image
          src={currentLanguage.flag}
          alt={currentLanguage.name}
          width={28}
          height={20}
          className="h-5 w-7 object-cover"
        />
      </button>

      {open && (
        <>
          <button
            type="button"
            aria-label="Fermer"
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-40 cursor-default"
          />

          <div
            className="
              absolute
              right-0
              top-full
              z-50
              mt-1
              w-[220px]
              border
              border-[#e5e5e5]
              bg-white
              py-[14px]
              shadow-[0_4px_18px_rgba(0,0,0,0.12)]
            "
          >
            <div
              className="
                max-h-[700px]
                overflow-y-auto
                [&::-webkit-scrollbar]:w-[6px]
                [&::-webkit-scrollbar-track]:bg-transparent
                [&::-webkit-scrollbar-thumb]:rounded-full
                [&::-webkit-scrollbar-thumb]:bg-gray-300
                hover:[&::-webkit-scrollbar-thumb]:bg-gray-400
              "
            >
              {languages.map((item) => {
                const active =
                  item.code === language

                return (
                  <button
                    key={item.code}
                    type="button"
                    onClick={() =>
                      handleLanguageChange(
                        item.code,
                      )
                    }
                    className={cn(
                      `
                        flex
                        h-[56px]
                        w-full
                        items-center
                        gap-[12px]
                        px-[18px]
                        text-left
                        transition-colors
                      `,
                      active
                        ? 'bg-[#f7f7f7]'
                        : 'bg-white hover:bg-[#f7f7f7]',
                    )}
                  >
                    <Image
                      src={item.flag}
                      alt=""
                      width={22}
                      height={16}
                      className="h-[16px] w-[22px] shrink-0 object-cover"
                    />

                    <span
                      className={cn(
                        'text-[14px] leading-none text-[#333]',
                        active &&
                          'font-medium text-black',
                      )}
                    >
                      {item.name}
                    </span>
                  </button>
                )
              })}
            </div>
          </div>
        </>
      )}
    </div>
  )
}