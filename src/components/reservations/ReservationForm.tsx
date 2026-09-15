'use client'

import { useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  CalendarDays,
  Clock3,
  Users,
  Armchair,
  MessageSquare,
  ArrowLeft,
  Check,
  Sparkles,
  Info,
  ChevronRight,
} from 'lucide-react'

import { TextInput } from '@/components/ui/Input/TextInput'
import { SelectInput } from '@/components/ui/Input/SelectInput'
import { PrimaryButton } from '@/components/ui/Button/PrimaryButton'
import { SecondaryButton } from '@/components/ui/Button/SecondaryButton'
import type { Table } from '@/lib/types/reservation'

interface ReservationFormData {
  date: string
  time: string
  peopleCount: number
  tableId?: string
  message: string
}

interface ReservationFormProps {
  tables: Table[]
  onSubmit: (data: ReservationFormData) => Promise<void>
  isLoading?: boolean
}

const formatLocalDate = (date: Date): string => {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')

  return `${year}-${month}-${day}`
}

export const ReservationForm = ({
  tables,
  onSubmit,
  isLoading = false,
}: ReservationFormProps) => {
  const router = useRouter()

  const [formData, setFormData] = useState<ReservationFormData>({
    date: '',
    time: '',
    peopleCount: 2,
    tableId: undefined,
    message: '',
  })

  const [error, setError] = useState<string | null>(null)

  /* =========================================================
     CRÉNEAUX
  ========================================================= */

  const timeSlots = useMemo(
    () => [
      { value: '18:00', label: '18h00' },
      { value: '19:00', label: '19h00' },
      { value: '20:00', label: '20h00' },
      { value: '21:00', label: '21h00' },
      { value: '22:00', label: '22h00' },
      { value: '23:00', label: '23h00' },
      { value: '00:00', label: '00h00' },
      { value: '01:00', label: '01h00' },
      { value: '02:00', label: '02h00' },
    ],
    []
  )

  /* =========================================================
     DATES
  ========================================================= */

  const dateOptions = useMemo(() => {
    return Array.from({ length: 7 }, (_, index) => {
      const date = new Date()

      date.setHours(12, 0, 0, 0)
      date.setDate(date.getDate() + index)

      const value = formatLocalDate(date)

      let label = date.toLocaleDateString('fr-FR', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
      })

      label = label.charAt(0).toUpperCase() + label.slice(1)

      if (index === 0) {
        label += ' — Aujourd’hui'
      }

      return {
        value,
        label,
      }
    })
  }, [])

  /* =========================================================
     PERSONNES
  ========================================================= */

  const peopleOptions = useMemo(() => {
    return Array.from({ length: 12 }, (_, index) => {
      const count = index + 1

      return {
        value: String(count),
        label: `${count} personne${count > 1 ? 's' : ''}`,
      }
    })
  }, [])

  /* =========================================================
     TABLES DISPONIBLES
  ========================================================= */

  const availableTables = useMemo(() => {
    return tables.filter(
      (table) => table.capacity >= formData.peopleCount
    )
  }, [tables, formData.peopleCount])

  const tableOptions = useMemo(() => {
    return [
      {
        value: '',
        label: 'Aucune préférence',
      },
      ...availableTables.map((table) => ({
        value: table.id,
        label: `${table.name} • ${table.capacity} pers.`,
      })),
    ]
  }, [availableTables])

  /* =========================================================
     UPDATE
  ========================================================= */

  const updateFormData = <K extends keyof ReservationFormData>(
    field: K,
    value: ReservationFormData[K]
  ) => {
    setFormData((previous) => ({
      ...previous,
      [field]: value,
    }))

    setError(null)
  }

  /* =========================================================
     PEOPLE CHANGE
  ========================================================= */

  const handlePeopleChange = (value: string) => {
    const peopleCount = Number(value)

    const selectedTable = tables.find(
      (table) => table.id === formData.tableId
    )

    const shouldRemoveTable =
      selectedTable && selectedTable.capacity < peopleCount

    setFormData((previous) => ({
      ...previous,
      peopleCount,
      tableId: shouldRemoveTable ? undefined : previous.tableId,
    }))

    setError(null)
  }

  /* =========================================================
     SUBMIT
  ========================================================= */

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault()

    setError(null)

    if (!formData.date) {
      setError('Veuillez sélectionner une date.')
      return
    }

    if (!formData.time) {
      setError('Veuillez sélectionner une heure.')
      return
    }

    if (
      !Number.isInteger(formData.peopleCount) ||
      formData.peopleCount < 1
    ) {
      setError(
        'Veuillez sélectionner un nombre de personnes valide.'
      )
      return
    }

    if (formData.tableId) {
      const selectedTable = tables.find(
        (table) => table.id === formData.tableId
      )

      if (
        !selectedTable ||
        selectedTable.capacity < formData.peopleCount
      ) {
        setError(
          'La table sélectionnée ne peut pas accueillir ce nombre de personnes.'
        )
        return
      }
    }

    try {
      await onSubmit({
        date: formData.date,
        time: formData.time,
        peopleCount: formData.peopleCount,
        tableId: formData.tableId || undefined,
        message: formData.message.trim(),
      })
    } catch (submitError) {
      console.error(
        'Reservation submission failed:',
        submitError
      )

      setError(
        'Impossible de créer la réservation. Veuillez réessayer.'
      )
    }
  }

  /* =========================================================
     FORMAT DATE RÉSUMÉ
  ========================================================= */

  const formattedSummaryDate = formData.date
    ? new Date(
        `${formData.date}T12:00:00`
      ).toLocaleDateString('fr-FR', {
        weekday: 'short',
        day: 'numeric',
        month: 'long',
      })
    : null

  const selectedTable = tables.find(
    (table) => table.id === formData.tableId
  )

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="space-y-6"
    >
      {/* =====================================================
          INTRO
      ====================================================== */}

      <section
        className="
          relative
          overflow-hidden
          rounded-2xl
          border
          border-grey-100
          bg-black-main
          p-6
          sm:p-7
        "
      >
        {/* Décorations */}

        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            -right-20
            -top-20
            h-48
            w-48
            rounded-full
            bg-gold-main/10
            blur-3xl
          "
        />

        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            -bottom-24
            -left-16
            h-40
            w-40
            rounded-full
            bg-gold-main/5
            blur-3xl
          "
        />

        <div className="relative z-10">
          <div className="flex items-center gap-3">
            <div
              className="
                flex
                h-11
                w-11
                shrink-0
                items-center
                justify-center
                rounded-xl
                bg-gold-main
                text-black-main
                shadow-[0_6px_25px_rgba(245,166,35,0.18)]
              "
            >
              <Sparkles className="h-5 w-5" />
            </div>

            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-gold-main">
                SmokeGo Lounge
              </p>

              <h2 className="mt-1 font-serif text-xl font-semibold text-white">
                Réservez votre expérience
              </h2>
            </div>
          </div>

          <p className="mt-5 max-w-xl text-sm leading-relaxed text-black">
            Choisissez votre date, votre heure et votre espace.
            Nous préparons votre table pour une expérience
            SmokeGo unique.
          </p>

          {/* Ligne décorative */}

          <div className="mt-6 h-px bg-gradient-to-r from-gold-main/40 via-white/10 to-transparent" />

          <div className="mt-4 flex items-center gap-2 text-xs text-white/50">
            <Info className="h-3.5 w-3.5 text-gold-main" />

            <span>
              Les réservations sont disponibles jusqu'à 7 jours à
              l'avance.
            </span>
          </div>
        </div>
      </section>

      {/* =====================================================
          ERREUR
      ====================================================== */}

      {error && (
        <div
          role="alert"
          className="
            flex
            items-start
            gap-3
            rounded-xl
            border
            border-red-200
            bg-red-50
            px-4
            py-3
            text-sm
            text-red-600
          "
        >
          <span
            className="
              mt-0.5
              flex
              h-5
              w-5
              shrink-0
              items-center
              justify-center
              rounded-full
              bg-red-100
              text-xs
              font-bold
            "
          >
            !
          </span>

          <p>{error}</p>
        </div>
      )}

      {/* =====================================================
          ÉTAPE 01 — DATE & HEURE
      ====================================================== */}

      <section
        className="
          overflow-hidden
          rounded-2xl
          border
          border-grey-100
          bg-white
          shadow-[0_5px_25px_rgba(0,0,0,0.035)]
        "
      >
        <div className="border-b border-grey-100 px-5 py-4 sm:px-6">
          <div className="flex items-center gap-3">
            <div
              className="
                flex
                h-9
                w-9
                items-center
                justify-center
                rounded-xl
                bg-black-main
                text-gold-main
              "
            >
              <span className="text-xs font-bold">01</span>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-black-main">
                Quand souhaitez-vous venir ?
              </h3>

              <p className="mt-0.5 text-xs text-grey-400">
                Sélectionnez votre date et votre heure
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-5 p-5 sm:p-6 md:grid-cols-2">
          {/* DATE */}

          <div className="space-y-2.5">
            <div className="flex items-center gap-2">
              <CalendarDays className="h-4 w-4 text-gold-main" />

              <label className="text-xs font-semibold uppercase tracking-wide text-black-main">
                Date
              </label>

              <span className="text-red-500">*</span>
            </div>

            <SelectInput
              label=""
              options={dateOptions}
              value={formData.date}
              onChange={(event) =>
                updateFormData(
                  'date',
                  event.target.value
                )
              }
              required
              placeholder="Sélectionnez une date"
            />
          </div>

          {/* HEURE */}

          <div className="space-y-2.5">
            <div className="flex items-center gap-2">
              <Clock3 className="h-4 w-4 text-gold-main" />

              <label className="text-xs font-semibold uppercase tracking-wide text-black-main">
                Heure
              </label>

              <span className="text-red-500">*</span>
            </div>

            <SelectInput
              label=""
              options={timeSlots}
              value={formData.time}
              onChange={(event) =>
                updateFormData(
                  'time',
                  event.target.value
                )
              }
              required
              placeholder="Sélectionnez une heure"
            />

            <p className="text-[11px] text-grey-400">
              Ouverture : 18h00 — 02h00
            </p>
          </div>
        </div>
      </section>

      {/* =====================================================
          ÉTAPE 02 — PERSONNES
      ====================================================== */}

      <section
        className="
          overflow-hidden
          rounded-2xl
          border
          border-grey-100
          bg-white
          shadow-[0_5px_25px_rgba(0,0,0,0.035)]
        "
      >
        <div className="border-b border-grey-100 px-5 py-4 sm:px-6">
          <div className="flex items-center gap-3">
            <div
              className="
                flex
                h-9
                w-9
                items-center
                justify-center
                rounded-xl
                bg-black-main
                text-gold-main
              "
            >
              <span className="text-xs font-bold">02</span>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-black-main">
                Votre groupe
              </h3>

              <p className="mt-0.5 text-xs text-grey-400">
                Combien de personnes seront présentes ?
              </p>
            </div>
          </div>
        </div>

        <div className="p-5 sm:p-6">
          <div className="max-w-md space-y-2.5">
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-gold-main" />

              <label className="text-xs font-semibold uppercase tracking-wide text-black-main">
                Nombre de personnes
              </label>

              <span className="text-red-500">*</span>
            </div>

            <SelectInput
              label=""
              options={peopleOptions}
              value={String(formData.peopleCount)}
              onChange={(event) =>
                handlePeopleChange(
                  event.target.value
                )
              }
              required
              placeholder="Nombre de personnes"
            />
          </div>

          <div
            className="
              mt-5
              flex
              items-start
              gap-3
              rounded-xl
              border
              border-gold-main/10
              bg-[#FFFDF8]
              px-4
              py-3
            "
          >
            <Users className="mt-0.5 h-4 w-4 shrink-0 text-gold-main" />

            <p className="text-xs leading-relaxed text-grey-500">
              Nous vous proposerons uniquement les tables
              adaptées à votre groupe.
            </p>
          </div>
        </div>
      </section>

      {/* =====================================================
          ÉTAPE 03 — TABLE
      ====================================================== */}

      {tables.length > 0 && (
        <section
          className="
            overflow-hidden
            rounded-2xl
            border
            border-grey-100
            bg-white
            shadow-[0_5px_25px_rgba(0,0,0,0.035)]
          "
        >
          <div className="border-b border-grey-100 px-5 py-4 sm:px-6">
            <div className="flex items-center gap-3">
              <div
                className="
                  flex
                  h-9
                  w-9
                  items-center
                  justify-center
                  rounded-xl
                  bg-black-main
                  text-gold-main
                "
              >
                <span className="text-xs font-bold">03</span>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-black-main">
                  Votre espace
                </h3>

                <p className="mt-0.5 text-xs text-grey-400">
                  Choisissez votre table préférée
                </p>
              </div>
            </div>
          </div>

          <div className="p-5 sm:p-6">
            {availableTables.length > 0 ? (
              <>
                <div className="space-y-2.5">
                  <div className="flex items-center gap-2">
                    <Armchair className="h-4 w-4 text-gold-main" />

                    <label className="text-xs font-semibold uppercase tracking-wide text-black-main">
                      Table souhaitée
                    </label>

                    <span className="text-xs text-grey-400">
                      (optionnel)
                    </span>
                  </div>

                  <SelectInput
                    label=""
                    options={tableOptions}
                    value={formData.tableId || ''}
                    onChange={(event) =>
                      updateFormData(
                        'tableId',
                        event.target.value ||
                          undefined
                      )
                    }
                  />
                </div>

                {selectedTable && (
                  <div
                    className="
                      mt-4
                      flex
                      items-center
                      justify-between
                      rounded-xl
                      border
                      border-gold-main/15
                      bg-gold-main/5
                      px-4
                      py-3
                    "
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className="
                          flex
                          h-9
                          w-9
                          items-center
                          justify-center
                          rounded-lg
                          bg-gold-main
                          text-black-main
                        "
                      >
                        <Armchair className="h-4 w-4" />
                      </div>

                      <div>
                        <p className="text-xs text-grey-500">
                          Table sélectionnée
                        </p>

                        <p className="mt-0.5 text-sm font-semibold text-black-main">
                          {selectedTable.name}
                        </p>
                      </div>
                    </div>

                    <div className="text-right">
                      <p className="text-[10px] uppercase tracking-wide text-grey-400">
                        Capacité
                      </p>

                      <p className="text-sm font-semibold text-gold-dark">
                        {selectedTable.capacity} pers.
                      </p>
                    </div>
                  </div>
                )}
              </>
            ) : (
              <div
                className="
                  rounded-xl
                  border
                  border-orange-200
                  bg-orange-50
                  p-4
                "
              >
                <div className="flex items-start gap-3">
                  <Info className="mt-0.5 h-4 w-4 shrink-0 text-orange-600" />

                  <div>
                    <p className="text-sm font-medium text-orange-700">
                      Aucune table adaptée
                    </p>

                    <p className="mt-1 text-xs leading-relaxed text-orange-600">
                      Aucune table ne peut accueillir{' '}
                      {formData.peopleCount}{' '}
                      personne
                      {formData.peopleCount > 1
                        ? 's'
                        : ''}
                      .
                      <br />
                      Vous pouvez néanmoins continuer sans
                      sélectionner de table.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      {/* =====================================================
          ÉTAPE 04 — MESSAGE
      ====================================================== */}

      <section
        className="
          overflow-hidden
          rounded-2xl
          border
          border-grey-100
          bg-white
          shadow-[0_5px_25px_rgba(0,0,0,0.035)]
        "
      >
        <div className="border-b border-grey-100 px-5 py-4 sm:px-6">
          <div className="flex items-center gap-3">
            <div
              className="
                flex
                h-9
                w-9
                items-center
                justify-center
                rounded-xl
                bg-black-main
                text-gold-main
              "
            >
              <span className="text-xs font-bold">04</span>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-black-main">
                Une demande particulière ?
              </h3>

              <p className="mt-0.5 text-xs text-grey-400">
                Faites-nous part de vos préférences
              </p>
            </div>
          </div>
        </div>

        <div className="p-5 sm:p-6">
          <div className="flex items-center gap-2">
            <MessageSquare className="h-4 w-4 text-gold-main" />

            <label className="text-xs font-semibold uppercase tracking-wide text-black-main">
              Message
            </label>

            <span className="text-xs text-grey-400">
              (optionnel)
            </span>
          </div>

          <div className="mt-2.5">
            <TextInput
              label=""
              placeholder="Anniversaire, décoration spéciale, préférence de table..."
              value={formData.message}
              onChange={(event) =>
                updateFormData(
                  'message',
                  event.target.value
                )
              }
              className="min-h-[120px] resize-none"
            />
          </div>

          <p className="mt-2 text-[11px] text-grey-400">
            Notre équipe fera son possible pour répondre à votre
            demande.
          </p>
        </div>
      </section>

      {/* =====================================================
          RÉSUMÉ
      ====================================================== */}

      {(formData.date ||
        formData.time ||
        formData.peopleCount ||
        formData.tableId) && (
        <section
          className="
            relative
            overflow-hidden
            rounded-2xl
            border
            border-gold-main/20
            bg-gradient-to-br
            from-[#FFFDF8]
            via-white
            to-white
            shadow-[0_8px_30px_rgba(0,0,0,0.04)]
          "
        >
          {/* Décoration */}

          <div
            aria-hidden="true"
            className="
              pointer-events-none
              absolute
              -right-16
              -top-16
              h-36
              w-36
              rounded-full
              bg-gold-main/10
              blur-3xl
            "
          />

          <div className="relative p-5 sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-gold-dark">
                  Votre expérience
                </p>

                <h3 className="mt-1 font-serif text-lg font-semibold text-black-main">
                  Résumé de réservation
                </h3>
              </div>

              <div
                className="
                  flex
                  h-10
                  w-10
                  items-center
                  justify-center
                  rounded-xl
                  bg-black-main
                  text-gold-main
                "
              >
                <Check className="h-5 w-5" />
              </div>
            </div>

            <div className="my-5 h-px bg-gradient-to-r from-gold-main/30 via-grey-100 to-transparent" />

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {/* Date */}

              {formData.date && (
                <div
                  className="
                    flex
                    items-center
                    gap-3
                    rounded-xl
                    border
                    border-grey-100
                    bg-white
                    p-3
                  "
                >
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#FAF9F7] text-gold-main">
                    <CalendarDays className="h-4 w-4" />
                  </div>

                  <div className="min-w-0">
                    <p className="text-[10px] uppercase tracking-wide text-grey-400">
                      Date
                    </p>

                    <p className="mt-0.5 truncate text-sm font-semibold capitalize text-black-main">
                      {formattedSummaryDate}
                    </p>
                  </div>
                </div>
              )}

              {/* Heure */}

              {formData.time && (
                <div
                  className="
                    flex
                    items-center
                    gap-3
                    rounded-xl
                    border
                    border-grey-100
                    bg-white
                    p-3
                  "
                >
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#FAF9F7] text-gold-main">
                    <Clock3 className="h-4 w-4" />
                  </div>

                  <div>
                    <p className="text-[10px] uppercase tracking-wide text-grey-400">
                      Heure
                    </p>

                    <p className="mt-0.5 text-sm font-semibold text-black-main">
                      {formData.time}
                    </p>
                  </div>
                </div>
              )}

              {/* Personnes */}

              <div
                className="
                  flex
                  items-center
                  gap-3
                  rounded-xl
                  border
                  border-grey-100
                  bg-white
                  p-3
                "
              >
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#FAF9F7] text-gold-main">
                  <Users className="h-4 w-4" />
                </div>

                <div>
                  <p className="text-[10px] uppercase tracking-wide text-grey-400">
                    Participants
                  </p>

                  <p className="mt-0.5 text-sm font-semibold text-black-main">
                    {formData.peopleCount}{' '}
                    personne
                    {formData.peopleCount > 1
                      ? 's'
                      : ''}
                  </p>
                </div>
              </div>

              {/* Table */}

              {selectedTable && (
                <div
                  className="
                    flex
                    items-center
                    gap-3
                    rounded-xl
                    border
                    border-grey-100
                    bg-white
                    p-3
                  "
                >
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#FAF9F7] text-gold-main">
                    <Armchair className="h-4 w-4" />
                  </div>

                  <div className="min-w-0">
                    <p className="text-[10px] uppercase tracking-wide text-grey-400">
                      Table
                    </p>

                    <p className="mt-0.5 truncate text-sm font-semibold text-black-main">
                      {selectedTable.name}
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Confirmation */}

            <div className="mt-4 flex items-center gap-2 text-xs text-grey-500">
              <Check className="h-3.5 w-3.5 text-green-600" />

              <span>
                Vérifiez les informations avant de confirmer.
              </span>
            </div>
          </div>
        </section>
      )}

      {/* =====================================================
          ACTIONS
      ====================================================== */}

      <div
        className="
          flex
          flex-col-reverse
          gap-3
          border-t
          border-grey-100
          pt-6
          sm:flex-row
          sm:items-center
          sm:justify-between
        "
      >
        <SecondaryButton
          type="button"
          onClick={() => router.back()}
          disabled={isLoading}
          className="
            w-full
            sm:w-auto
            min-w-[140px]
          "
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Retour
        </SecondaryButton>

        <PrimaryButton
          type="submit"
          isLoading={isLoading}
          disabled={isLoading}
          className="
            group
            w-full
            sm:w-auto
            sm:min-w-[280px]
            text-sm
            py-3
            shadow-[0_8px_25px_rgba(245,166,35,0.18)]
            transition-all
            duration-300
            hover:shadow-[0_12px_30px_rgba(245,166,35,0.28)]
          "
        >
          {!isLoading && (
            <Check className="mr-2 h-4 w-4" />
          )}

          {isLoading
            ? 'Confirmation en cours...'
            : 'Confirmer ma réservation'}

          {!isLoading && (
            <ChevronRight
              className="
                ml-2
                h-4
                w-4
                transition-transform
                duration-300
                group-hover:translate-x-1
              "
            />
          )}
        </PrimaryButton>
      </div>

      {/* =====================================================
          NOTE
      ====================================================== */}

      <div className="flex justify-center px-4">
        <p className="max-w-lg text-center text-[11px] leading-relaxed text-grey-400">
          En confirmant cette réservation, vous acceptez les
          conditions de réservation de SmokeGo.
        </p>
      </div>
    </form>
  )
}