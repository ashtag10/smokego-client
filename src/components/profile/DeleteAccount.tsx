'use client'

import { useState } from 'react'
import { AlertTriangle, ShieldAlert, Trash2, X } from 'lucide-react'

import { PrimaryButton } from '@/components/ui/Button/PrimaryButton'
import { SecondaryButton } from '@/components/ui/Button/SecondaryButton'
import { Heading } from '@/components/ui/Typography/Heading'
import { Paragraph } from '@/components/ui/Typography/Paragraph'
import { Modal } from '@/components/ui/Modal/Modal'

interface DeleteAccountProps {
  onDelete: () => Promise<void>
  isLoading?: boolean
}

export const DeleteAccount = ({
  onDelete,
  isLoading = false,
}: DeleteAccountProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [confirmationText, setConfirmationText] = useState('')

  const handleOpenModal = () => {
    setConfirmationText('')
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    if (isLoading) return

    setConfirmationText('')
    setIsModalOpen(false)
  }

  const handleDelete = async () => {
    if (confirmationText !== 'SUPPRIMER' || isLoading) return

    try {
      await onDelete()
      setConfirmationText('')
      setIsModalOpen(false)
    } catch (error) {
      console.error('Failed to delete account:', error)
    }
  }

  return (
    <>
      {/* =====================================================
          ZONE SUPPRESSION DU COMPTE
      ===================================================== */}
      <div
        className="
          group
          relative
          overflow-hidden
          rounded-2xl
          border
          border-red-100
          bg-white
          p-6
          shadow-sm
          transition-all
          duration-300
          hover:border-red-200
          hover:shadow-[0_10px_30px_rgba(239,68,68,0.08)]
        "
      >
        {/* Accent latéral */}
        <div
          className="
            absolute
            left-0
            top-0
            h-full
            w-[3px]
            bg-gradient-to-b
            from-red-400
            via-red-500
            to-red-600
          "
        />

        <div className="flex flex-col gap-5">
          {/* Header */}
          <div className="flex items-start gap-4">
            {/* Icône */}
            <div
              className="
                flex
                h-12
                w-12
                shrink-0
                items-center
                justify-center
                rounded-xl
                bg-red-50
                text-red-500
                ring-1
                ring-red-100
                transition-all
                duration-300
                group-hover:bg-red-100
              "
            >
              <Trash2 className="h-5 w-5" />
            </div>

            <div className="min-w-0">
              <Heading
                level="h5"
                className="text-lg font-semibold text-black-main"
              >
                Supprimer mon compte
              </Heading>

              <p className="mt-1 text-xs font-medium uppercase tracking-wider text-red-500">
                Zone de sécurité
              </p>
            </div>
          </div>

          {/* Description */}
          <div
            className="
              rounded-xl
              border
              border-red-100
              bg-red-50/60
              p-4
            "
          >
            <div className="flex items-start gap-3">
              <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-red-500" />

              <Paragraph className="text-sm leading-relaxed text-red-700/80">
                Cette action est irréversible. Votre compte et vos données
                seront supprimés après un délai de 30 jours.
              </Paragraph>
            </div>
          </div>

          {/* Bouton */}
          <div>
            <button
              type="button"
              onClick={handleOpenModal}
              className="
                inline-flex
                items-center
                gap-2
                rounded-full
                border
                border-red-200
                bg-white
                px-5
                py-2.5
                text-sm
                font-medium
                text-red-600
                transition-all
                duration-300
                hover:border-red-500
                hover:bg-red-500
                hover:text-white
                hover:shadow-[0_6px_20px_rgba(239,68,68,0.20)]
                active:scale-[0.98]
              "
            >
              <Trash2 className="h-4 w-4" />
              Supprimer mon compte
            </button>
          </div>
        </div>
      </div>

      {/* =====================================================
          MODAL DE CONFIRMATION
      ===================================================== */}
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title="Confirmer la suppression"
      >
        <div className="space-y-6">
          {/* Alerte */}
          <div
            className="
              rounded-xl
              border
              border-red-200
              bg-red-50
              p-4
            "
          >
            <div className="flex items-start gap-3">
              <div
                className="
                  flex
                  h-10
                  w-10
                  shrink-0
                  items-center
                  justify-center
                  rounded-full
                  bg-red-100
                  text-red-600
                "
              >
                <ShieldAlert className="h-5 w-5" />
              </div>

              <div>
                <p className="font-semibold text-red-700">
                  Attention, cette action est définitive
                </p>

                <p className="mt-1 text-sm leading-relaxed text-red-600/80">
                  La suppression de votre compte entraînera la suppression
                  de vos informations personnelles et de vos données.
                </p>
              </div>
            </div>
          </div>

          {/* Confirmation */}
          <div className="space-y-3">
            <Paragraph className="text-sm text-grey-600">
              Pour confirmer la suppression de votre compte, tapez exactement
              le mot{' '}
              <span className="font-bold tracking-wide text-red-600">
                SUPPRIMER
              </span>{' '}
              dans le champ ci-dessous.
            </Paragraph>

            <div className="relative">
              <input
                type="text"
                placeholder="Tapez SUPPRIMER"
                value={confirmationText}
                onChange={(e) => setConfirmationText(e.target.value)}
                disabled={isLoading}
                autoComplete="off"
                className="
                  w-full
                  rounded-xl
                  border
                  border-grey-200
                  bg-grey-50
                  px-4
                  py-3
                  text-sm
                  font-medium
                  text-black-main
                  placeholder:text-grey-400
                  transition-all
                  duration-200
                  focus:border-red-400
                  focus:bg-white
                  focus:outline-none
                  focus:ring-2
                  focus:ring-red-500/15
                  disabled:cursor-not-allowed
                  disabled:opacity-60
                "
              />

              {confirmationText === 'SUPPRIMER' && (
                <div
                  className="
                    absolute
                    right-3
                    top-1/2
                    flex
                    h-6
                    w-6
                    -translate-y-1/2
                    items-center
                    justify-center
                    rounded-full
                    bg-green-500
                    text-white
                  "
                >
                  <svg
                    className="h-3.5 w-3.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={3}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
              )}
            </div>

            {confirmationText.length > 0 &&
              confirmationText !== 'SUPPRIMER' && (
                <p className="text-xs text-red-500">
                  Le texte de confirmation est incorrect.
                </p>
              )}
          </div>

          {/* Actions */}
          <div className="flex flex-col-reverse gap-3 border-t border-grey-100 pt-5 sm:flex-row sm:justify-end">
            <SecondaryButton
              onClick={handleCloseModal}
              disabled={isLoading}
              className="rounded-full"
            >
              Annuler
            </SecondaryButton>

            <button
              type="button"
              onClick={handleDelete}
              disabled={
                confirmationText !== 'SUPPRIMER' || isLoading
              }
              className="
                inline-flex
                min-h-[42px]
                items-center
                justify-center
                gap-2
                rounded-full
                bg-red-600
                px-5
                py-2.5
                text-sm
                font-medium
                text-white
                shadow-sm
                transition-all
                duration-300
                hover:bg-red-700
                hover:shadow-[0_6px_20px_rgba(239,68,68,0.20)]
                active:scale-[0.98]
                disabled:cursor-not-allowed
                disabled:opacity-40
                disabled:hover:shadow-none
              "
            >
              {isLoading ? (
                <>
                  <span
                    className="
                      h-4
                      w-4
                      animate-spin
                      rounded-full
                      border-2
                      border-white/30
                      border-t-white
                    "
                  />
                  Suppression...
                </>
              ) : (
                <>
                  <Trash2 className="h-4 w-4" />
                  Confirmer la suppression
                </>
              )}
            </button>
          </div>
        </div>
      </Modal>
    </>
  )
}