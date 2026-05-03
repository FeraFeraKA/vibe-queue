const About = () => {
  return (
    <section
      id="about"
      className="mx-auto max-w-4xl px-4 py-24 text-center relative z-10"
    >
      <p className="text-sm font-medium uppercase tracking-[0.3em] text-muted-foreground">
        About
      </p>

      <h2 className="mt-4 text-4xl md:text-6xl font-bold tracking-tight">
        Music feels better when everyone is part of it.
      </h2>

      <p className="mt-6 text-lg leading-8 text-muted-foreground">
        Vibe Queue is a simple way to choose music together. Create a room,
        share the link, and let everyone add tracks to one shared queue. Instead
        of arguing over what to play next, the room votes — and the most wanted
        tracks naturally rise to the top.
      </p>

      <p className="mt-4 text-lg leading-8 text-muted-foreground">
        It is built for parties, study sessions, Discord calls, small events, or
        any moment where the music should match the whole group’s mood.
      </p>
    </section>
  );
};

export default About;
