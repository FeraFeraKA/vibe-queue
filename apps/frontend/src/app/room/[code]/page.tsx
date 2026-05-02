type RoomPageProps = {
  params: Promise<{
    code: string;
  }>;
};

export default async function RoomPage({ params }: RoomPageProps) {
  const { code } = await params;

  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="mx-auto flex min-h-screen max-w-6xl flex-col px-6 py-8">
        <header className="flex items-center justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground">
              Room
            </p>

            <h1 className="mt-2 text-3xl font-bold tracking-tight">
              VibeQueue #{code}
            </h1>
          </div>

          <button className="rounded-full border border-border px-4 py-2 text-sm font-medium transition hover:bg-accent">
            Copy link
          </button>
        </header>

        <section className="mt-10 grid flex-1 gap-6 lg:grid-cols-[1fr_320px]">
          <div className="rounded-3xl border border-border bg-card p-6">
            <p className="text-sm text-muted-foreground">Now playing</p>

            <div className="mt-6 flex min-h-64 items-center justify-center rounded-2xl border border-dashed border-border">
              <p className="text-muted-foreground">
                Тут скоро будет текущий трек
              </p>
            </div>
          </div>

          <aside className="rounded-3xl border border-border bg-card p-6">
            <p className="text-sm text-muted-foreground">Online users</p>

            <div className="mt-6 space-y-3">
              <div className="rounded-2xl bg-accent px-4 py-3">Kolyan</div>
              <div className="rounded-2xl bg-accent px-4 py-3">Guest</div>
            </div>
          </aside>
        </section>
      </section>
    </main>
  );
}
