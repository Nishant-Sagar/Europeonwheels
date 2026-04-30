import { useApi } from '../hooks/useApi'
import LoadingSpinner from '../components/LoadingSpinner'

export default function Stories() {
  const { data: stories, loading } = useApi('/stories')

  return (
    <>
      <section className="bg-stone-900 text-white pt-40 pb-20 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-accent-400 font-medium uppercase tracking-widest text-sm mb-3">From the road</p>
          <h1 className="font-display text-5xl md:text-6xl font-bold mb-4">Stories</h1>
          <p className="text-stone-300 text-lg">
            First-person dispatches from people who took the road less paved.
          </p>
        </div>
      </section>

      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          {loading ? (
            <LoadingSpinner />
          ) : (
            <div className="space-y-12">
              {(stories || []).map((story, i) => (
                <article key={story.id} className={`flex flex-col ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} gap-8 items-center card overflow-hidden`}>
                  <div className="md:w-1/2 h-64 md:h-80 overflow-hidden shrink-0">
                    <img src={story.image_url} alt={story.title} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                  </div>
                  <div className="p-8 flex-1">
                    <div className="flex items-center gap-3 text-sm text-stone-400 mb-4">
                      <span>{story.destination}</span>
                      <span>·</span>
                      <span>{new Date(story.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                      <span>·</span>
                      <span>{story.read_time_min} min read</span>
                    </div>
                    <h2 className="font-display text-2xl font-bold text-stone-900 mb-3 leading-tight">{story.title}</h2>
                    <p className="text-stone-500 leading-relaxed mb-4">{story.excerpt}</p>
                    <p className="text-stone-400 text-sm">By {story.author}</p>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  )
}
