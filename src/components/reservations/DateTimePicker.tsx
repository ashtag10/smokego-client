'use client'

import { useEffect, useMemo, useState } from 'react'
import { CalendarDays, Check, Clock3 } from 'lucide-react'
import { cn } from '@/lib/utils/helpers'

interface DateTimePickerProps {
  onSelect: (date: string, time: string) => void
  selectedDate?: string
  selectedTime?: string
}

export const DateTimePicker = ({
  onSelect,
  selectedDate,
  selectedTime,
}: DateTimePickerProps) => {
  const [date, setDate] = useState(selectedDate || '')
  const [time, setTime] = useState(selectedTime || '')

  /**
   * Synchronise les valeurs venant du parent.
   */
  useEffect(() => {
    setDate(selectedDate || '')
  }, [selectedDate])

  useEffect(() => {
    setTime(selectedTime || '')
  }, [selectedTime])

  /**
   * Génération des 7 prochains jours.
   */
  const dates = useMemo(() => {
    return Array.from({ length: 7 }, (_, index) => {
      const currentDate = new Date()

      currentDate.setHours(0, 0, 0, 0)
      currentDate.setDate(currentDate.getDate() + index)

      const year = currentDate.getFullYear()
      const month = String(currentDate.getMonth() + 1).padStart(2, '0')
      const day = String(currentDate.getDate()).padStart(2, '0')

      return {
        value: `${year}-${month}-${day}`,
        label: currentDate.toLocaleDateString('fr-FR', {
          weekday: 'short',
          day: 'numeric',
          month: 'short',
        }),
        isToday: index === 0,
      }
    })
  }, [])

  /**
   * Horaires du lounge :
   *
   * 18h → 23h
   * 00h → 02h
   *
   * Soit :
   * 18:00
   * 19:00
   * 20:00
   * 21:00
   * 22:00
   * 23:00
   * 00:00
   * 01:00
   * 02:00
   */
  const times = useMemo(
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

  /**
   * Vérifie si un créneau est déjà passé aujourd'hui.
   */
  const isTimePast = (timeValue: string) => {
    if (!date) return false

    const today = new Date()
    const selectedDateObject = new Date(`${date}T00:00:00`)

    const isToday =
      today.getFullYear() === selectedDateObject.getFullYear() &&
      today.getMonth() === selectedDateObject.getMonth() &&
      today.getDate() === selectedDateObject.getDate()

    if (!isToday) return false

    const [hours, minutes] = timeValue.split(':').map(Number)

    const selectedDateTime = new Date()
    selectedDateTime.setHours(hours, minutes, 0, 0)

    return selectedDateTime <= today
  }

  const handleDateSelect = (value: string) => {
    setDate(value)

    /**
     * Si l'heure actuellement sélectionnée est déjà passée
     * pour cette date, on la réinitialise.
     */
    if (time) {
      const selectedTimeIsPast =
        dates.find((item) => item.value === value)?.isToday &&
        isTimePast(time)

      if (selectedTimeIsPast) {
        setTime('')
        return
      }

      onSelect(value, time)
    }
  }

  const handleTimeSelect = (value: string) => {
    if (isTimePast(value)) return

    setTime(value)

    if (date) {
      onSelect(date, value)
    }
  }

  return (
    <div className="space-y-7">
      {/* ==================== DATE ==================== */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gold-light">
            <CalendarDays className="w-4 h-4 text-gold-main" />
          </div>

          <div>
            <label className="block text-sm font-semibold text-black-main">
              Choisissez votre date
            </label>

            <p className="text-xs text-grey-500">
              Sélectionnez un jour pour votre réservation
            </p>
          </div>
        </div>

        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin">
          {dates.map((item) => {
            const isSelected = date === item.value

            return (
              <button
                key={item.value}
                type="button"
                onClick={() => handleDateSelect(item.value)}
                className={cn(
                  'relative min-w-[105px] px-4 py-3 rounded-xl border text-sm',
                  'transition-all duration-200 flex-shrink-0',
                  'focus:outline-none focus:ring-2 focus:ring-gold-main/30',

                  isSelected
                    ? [
                        'border-gold-main',
                        'bg-gold-main',
                        'text-white',
                        'shadow-md shadow-gold-main/20',
                      ]
                    : [
                        'border-grey-200',
                        'bg-white',
                        'text-grey-700',
                        'hover:border-gold-main/60',
                        'hover:bg-gold-light/30',
                      ]
                )}
              >
                {isSelected && (
                  <span className="absolute top-2 right-2">
                    <Check className="w-3.5 h-3.5" />
                  </span>
                )}

                <span className="block capitalize font-medium">
                  {item.label}
                </span>

                {item.isToday && (
                  <span
                    className={cn(
                      'block text-[11px] mt-1',
                      isSelected
                        ? 'text-white/80'
                        : 'text-gold-main font-medium'
                    )}
                  >
                    Aujourd'hui
                  </span>
                )}
              </button>
            )
          })}
        </div>
      </div>

      {/* ==================== HEURE ==================== */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gold-light">
            <Clock3 className="w-4 h-4 text-gold-main" />
          </div>

          <div>
            <label className="block text-sm font-semibold text-black-main">
              Choisissez votre heure
            </label>

            <p className="text-xs text-grey-500">
              Disponible de 18h00 à 02h00
            </p>
          </div>
        </div>

        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2">
          {times.map((item) => {
            const isSelected = time === item.value
            const isPast = isTimePast(item.value)

            return (
              <button
                key={item.value}
                type="button"
                disabled={isPast}
                onClick={() => handleTimeSelect(item.value)}
                className={cn(
                  'relative px-4 py-3 rounded-xl border text-sm font-medium',
                  'transition-all duration-200',
                  'focus:outline-none focus:ring-2 focus:ring-gold-main/30',

                  isPast && [
                    'border-grey-100',
                    'bg-grey-50',
                    'text-grey-300',
                    'cursor-not-allowed',
                  ],

                  !isPast &&
                    !isSelected && [
                      'border-grey-200',
                      'bg-white',
                      'text-grey-700',
                      'hover:border-gold-main/60',
                      'hover:bg-gold-light/30',
                    ],

                  isSelected && [
                    'border-gold-main',
                    'bg-gold-main',
                    'text-white',
                    'shadow-md shadow-gold-main/20',
                  ]
                )}
              >
                {isSelected && (
                  <span className="absolute top-1.5 right-1.5">
                    <Check className="w-3 h-3" />
                  </span>
                )}

                {item.label}
              </button>
            )
          })}
        </div>
      </div>

      {/* ==================== RÉSUMÉ ==================== */}
      {date && time && (
        <div className="flex items-center justify-between gap-4 rounded-xl border border-gold-main/20 bg-gold-light/20 px-4 py-3">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-gold-main flex items-center justify-center">
              <Check className="w-4 h-4 text-white" />
            </div>

            <div>
              <p className="text-xs text-grey-500">
                Votre réservation
              </p>

              <p className="text-sm font-semibold text-black-main">
                {new Date(`${date}T00:00:00`).toLocaleDateString('fr-FR', {
                  weekday: 'long',
                  day: 'numeric',
                  month: 'long',
                })}
                {' · '}
                {time.replace(':', 'h')}
              </p>
            </div>
          </div>

          <span className="hidden sm:block text-xs font-medium text-gold-dark">
            Sélectionné
          </span>
        </div>
      )}
    </div>
  )
}