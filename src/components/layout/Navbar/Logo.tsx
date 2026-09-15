import Link from 'next/link'

export const Logo = () => {
  return (
    <Link href="/" className="flex items-center gap-2 group">
      <div className="relative w-10 h-10">
        <div className="w-10 h-10 bg-gold-main rounded-full flex items-center justify-center shadow-md group-hover:shadow-gold transition-shadow duration-300">
          <span className="text-black font-serif font-bold text-xl">
            OH
          </span>
        </div>
      </div>
      <span className="font-serif text-2xl font-bold text-gold-main group-hover:text-gold-dark transition-colors duration-300">
        Ousman
      </span>
    </Link>
  )
}