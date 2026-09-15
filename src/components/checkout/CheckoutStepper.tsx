import { Check } from 'lucide-react'
import { cn } from '@/lib/utils/helpers'

interface CheckoutStepperProps {
  currentStep: number
  steps: string[]
}

export const CheckoutStepper = ({
  currentStep,
  steps,
}: CheckoutStepperProps) => {
  return (
    <div className="mb-8 w-full overflow-x-auto">
      <div className="mx-auto flex min-w-max items-start justify-center px-4">
        {steps.map((label, index) => {
          const isCompleted = index < currentStep
          const isCurrent = index === currentStep
          const isUpcoming = index > currentStep

          return (
            <div
              key={index}
              className="flex items-start"
            >
              {/* =========================
                  STEP
              ========================== */}
              <div className="flex min-w-[72px] flex-col items-center">

                {/* Cercle */}
                <div
                  className={cn(
                    `
                      relative
                      flex
                      h-9
                      w-9
                      items-center
                      justify-center
                      rounded-full
                      text-xs
                      font-semibold
                      transition-all
                      duration-500
                    `,

                    isCompleted &&
                      `
                        bg-gradient-to-br
                        from-[#C89B3C]
                        via-[#D4AF37]
                        to-[#B8860B]
                        text-white
                        shadow-[0_4px_14px_rgba(212,175,55,0.22)]
                      `,

                    isCurrent &&
                      `
                        bg-gradient-to-br
                        from-[#C89B3C]
                        via-[#D4AF37]
                        to-[#B8860B]
                        text-white
                        ring-4
                        ring-[#D4AF37]/15
                        shadow-[0_5px_18px_rgba(212,175,55,0.28)]
                      `,

                    isUpcoming &&
                      `
                        border
                        border-[#D4AF37]/15
                        bg-[#FAFAFA]
                        text-grey-400
                      `
                  )}
                >
                  {isCompleted ? (
                    <Check
                      className="h-4 w-4"
                      strokeWidth={2.5}
                    />
                  ) : (
                    index + 1
                  )}

                  {/* Petit halo */}
                  {isCurrent && (
                    <span
                      className="
                        absolute
                        inset-[-5px]
                        -z-10
                        rounded-full
                        border
                        border-[#D4AF37]/15
                      "
                    />
                  )}
                </div>

                {/* Label */}
                <span
                  className={cn(
                    `
                      mt-2
                      hidden
                      whitespace-nowrap
                      text-[11px]
                      font-medium
                      transition-colors
                      duration-300
                      sm:block
                    `,
                    isCompleted || isCurrent
                      ? 'text-[#B8860B]'
                      : 'text-grey-400'
                  )}
                >
                  {label}
                </span>
              </div>

              {/* =========================
                  CONNECTEUR
              ========================== */}
              {index < steps.length - 1 && (
                <div
                  className="
                    mt-[18px]
                    h-[2px]
                    w-10
                    overflow-hidden
                    rounded-full
                    bg-grey-100
                    sm:w-16
                    md:w-20
                  "
                >
                  <div
                    className={cn(
                      `
                        h-full
                        rounded-full
                        transition-all
                        duration-500
                      `,
                      index < currentStep
                        ? `
                            w-full
                            bg-gradient-to-r
                            from-[#C89B3C]
                            via-[#D4AF37]
                            to-[#B8860B]
                          `
                        : 'w-0'
                    )}
                  />
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}