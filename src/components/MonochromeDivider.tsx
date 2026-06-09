interface MonochromeDividerProps {
  imageUrl?: string
  label?: string
  className?: string
}

const defaultImages = [
  'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1920&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1479839672679-a46483c0e7c8?q=80&w=1920&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1920&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=1920&auto=format&fit=crop',
]

export default function MonochromeDivider({
  imageUrl,
  label,
  className = '',
}: MonochromeDividerProps) {
  const url = imageUrl || defaultImages[Math.floor(Math.random() * defaultImages.length)]

  return (
    <section className={`relative w-full h-[30vh] md:h-[40vh] overflow-hidden ${className}`}>
      {/* Grayscale architectural image */}
      <div
        className="absolute inset-0 bg-cover bg-center grayscale contrast-125"
        style={{ backgroundImage: `url(${url})` }}
      />
      {/* Dark overlay for depth */}
      <div className="absolute inset-0 bg-black/40" />
      {/* Neon yellow diagonal line */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute w-[200%] h-[2px] bg-loakim-lime/80"
          style={{
            top: '50%',
            left: '-50%',
            transform: 'rotate(-12deg)',
            transformOrigin: 'center',
          }}
        />
      </div>
      {/* Optional centered label */}
      {label && (
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-[4rem] md:text-[6rem] font-bold text-transparent tracking-tight"
            style={{ WebkitTextStroke: '1px rgba(212, 255, 0, 0.6)' }}
          >
            {label}
          </span>
        </div>
      )}
    </section>
  )
}
