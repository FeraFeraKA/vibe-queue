export default function HomePage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="mx-auto flex min-h-screen max-w-6xl flex-col items-center justify-center px-6 text-center">
        <p className="mb-4 text-sm font-medium uppercase tracking-[0.35em] text-muted-foreground">
          VibeQueue
        </p>

        <h1 className="max-w-4xl text-5xl font-bold tracking-tight md:text-7xl">
          Create a live music queue for your room
        </h1>

        <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
          Search Spotify tracks, add them to a shared queue, vote together, and
          pick the next song in real time.
        </p>

        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <button className="rounded-full bg-foreground px-6 py-3 font-medium text-background transition hover:opacity-90">
            Create room
          </button>

          <button className="rounded-full border border-border px-6 py-3 font-medium transition hover:bg-accent">
            Join room
          </button>
        </div>
      </section>
    </main>
  );
}
