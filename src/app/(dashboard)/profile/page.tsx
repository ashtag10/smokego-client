'use client'

import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/lib/stores/authStore'
import { ProfileHeader } from '@/components/profile/ProfileHeader'
import { DeleteAccount } from '@/components/profile/DeleteAccount'
import { Heading } from '@/components/ui/Typography/Heading'
import { useLoyalty } from '@/lib/hooks/useLoyalty'
import { toast } from 'react-hot-toast'
import { usersApi } from '@/lib/api/users'

export default function ProfilePage() {
  const router = useRouter()
  const { user, clearAuth } = useAuthStore()
  const { points, history, vipStatus, isLoading } = useLoyalty()

  const handleEdit = () => {
    router.push('/profile/edit')
  }

  const handleDeleteAccount = async () => {
    try {
      const response = await usersApi.deleteAccount()
      if (response.success) {
        toast.success('Compte supprimé avec succès')
        clearAuth()
        router.push('/login')
      } else {
        toast.error(response.message || 'Erreur lors de la suppression')
      }
    } catch (error) {
      toast.error('Une erreur est survenue')
    }
  }

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <p className="text-grey-500">Veuillez vous connecter</p>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <Heading level="h1" className="mb-8">
        Mon profil
      </Heading>

      <div className="space-y-6">
        {/* En-tête */}
        <ProfileHeader user={user} onEdit={handleEdit} />

        

        {/* Points */}
       

        {/* Suppression de compte */}
        <DeleteAccount onDelete={handleDeleteAccount} />
      </div>
    </div>
  )
}