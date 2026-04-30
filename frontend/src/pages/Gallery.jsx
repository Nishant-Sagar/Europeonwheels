const photos = [
  { url: '/images/switzerland.jpg', caption: 'Swiss Alps' },
  { url: '/images/italy.jpg', caption: 'Italian Coast' },
  { url: '/images/gallery-amalfi.jpg', caption: 'Amalfi Coast' },
  { url: '/images/exp-family.jpg', caption: 'Road through the Alps' },
  { url: '/images/germany.jpg', caption: 'Germany Castles' },
  { url: '/images/austria.jpg', caption: 'Austria Alpine Beauty' },
  { url: '/images/czech-republic.jpg', caption: 'Prague' },
  { url: '/images/story-travel-guide.jpg', caption: 'Mountain Pass' },
  { url: '/images/hungary.jpg', caption: 'Budapest' },
  { url: '/images/cta-bg.jpg', caption: 'Switzerland Scenic Route' },
  { url: '/images/dest-grand-europe.jpg', caption: 'Grand Europe Route' },
  { url: '/images/exp-golf.jpg', caption: 'Golf + Europe' },
]

export default function Gallery() {
  return (
    <>
      <section className="bg-stone-900 text-white pt-40 pb-20 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-accent-400 font-medium uppercase tracking-widest text-sm mb-3">Visual diary</p>
          <h1 className="font-display text-5xl md:text-6xl font-bold mb-4">Gallery</h1>
          <p className="text-stone-300 text-lg">
            A glimpse of the countries and experiences we plan across selected Europe.
          </p>
        </div>
      </section>

      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
            {photos.map((photo, i) => (
              <div key={i} className="break-inside-avoid group relative overflow-hidden rounded-lg cursor-pointer">
                <img
                  src={photo.url}
                  alt={photo.caption}
                  className="w-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-end">
                  <p className="text-white font-medium px-4 py-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    {photo.caption}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
