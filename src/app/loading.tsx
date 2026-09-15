export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="text-center">
        <div className="w-16 h-16 bg-gold-main/20 rounded-full flex items-center justify-center mx-auto animate-pulse">
          <div className="w-12 h-12 bg-gold-main rounded-full flex items-center justify-center">
            <span className="text-white font-serif font-bold text-xl">SG</span>
          </div>
        </div>
        <p className="mt-4 text-grey-500 text-sm">Chargement...</p>
        <div className="mt-4 flex justify-center">
          <div className="w-6 h-6 border-3 border-gold-main border-t-transparent rounded-full animate-spin" />
        </div>
      </div>
    </div>
  )
}