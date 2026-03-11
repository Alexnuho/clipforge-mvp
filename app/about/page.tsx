export default function AboutPage() {
  const values = [
    {
      title: "Simple First",
      desc: "ClipForge dibangun dengan filosofi workflow sederhana: tempel link, proses, review hasil.",
    },
    {
      title: "Creator Focused",
      desc: "Fokus utama produk ini adalah membantu creator dan personal workflow agar lebih cepat dan konsisten.",
    },
    {
      title: "Scalable Foundation",
      desc: "Versi saat ini adalah MVP, tetapi fondasinya disiapkan untuk berkembang menjadi produk SaaS yang lebih besar.",
    },
  ];

  return (
    <main className="min-h-screen px-6 py-14 text-white">
      <div className="mx-auto max-w-6xl">
        <div className="rounded-[28px] border border-white/10 bg-white/5 p-8 shadow-2xl shadow-black/20">
          <p className="inline-flex rounded-full border border-white/10 bg-white/5 px-4 py-1 text-sm text-white/70">
            About ClipForge
          </p>

          <h1 className="mt-4 text-4xl font-bold tracking-tight md:text-6xl">
            Creator Workflow
            <span className="mt-2 block bg-gradient-to-r from-white via-blue-300 to-violet-300 bg-clip-text text-transparent">
              Built Simpler
            </span>
          </h1>

          <p className="mt-5 max-w-3xl leading-8 text-white/60">
            ClipForge adalah prototype AI video repurposing tool yang dirancang
            untuk membantu mengubah satu link video menjadi beberapa short clips
            yang lebih siap pakai. Produk ini dimulai dari kebutuhan personal,
            lalu dikembangkan dengan arah yang jelas menuju creator SaaS yang
            lebih matang.
          </p>
        </div>

        <section className="mt-10 grid gap-6 md:grid-cols-3">
          {values.map((item) => (
            <div
              key={item.title}
              className="rounded-[28px] border border-white/10 bg-white/5 p-6 shadow-xl shadow-black/20"
            >
              <h2 className="text-2xl font-semibold">{item.title}</h2>
              <p className="mt-4 leading-7 text-white/60">{item.desc}</p>
            </div>
          ))}
        </section>

        <section className="mt-10 grid gap-6 lg:grid-cols-2">
          <div className="rounded-[28px] border border-white/10 bg-white/5 p-6 shadow-xl shadow-black/20">
            <p className="text-sm text-white/45">Vision</p>
            <h2 className="mt-3 text-3xl font-semibold">Dari MVP ke Produk Nyata</h2>
            <p className="mt-4 leading-8 text-white/60">
              Tujuan jangka panjang ClipForge adalah menjadi platform yang
              memudahkan creator, freelancer, dan tim konten untuk mengubah
              video panjang menjadi short-form content secara lebih efisien,
              konsisten, dan scalable.
            </p>
          </div>

          <div className="rounded-[28px] border border-white/10 bg-white/5 p-6 shadow-xl shadow-black/20">
            <p className="text-sm text-white/45">Current Status</p>
            <h2 className="mt-3 text-3xl font-semibold">Personal Prototype</h2>
            <p className="mt-4 leading-8 text-white/60">
              Saat ini ClipForge masih berada pada tahap prototype untuk
              eksplorasi personal workflow. Namun UI, flow, dan struktur project
              sudah dibangun agar mudah dikembangkan ke integrasi AI, database,
              auth, dan deployment production yang lebih serius.
            </p>
          </div>
        </section>

        <section className="mt-10 rounded-[32px] border border-white/10 bg-white/5 p-8 text-center shadow-2xl shadow-black/20 md:p-12">
          <p className="inline-flex rounded-full border border-white/10 bg-white/5 px-4 py-1 text-sm text-white/70">
            Next Step
          </p>

          <h2 className="mt-5 text-3xl font-bold md:text-5xl">
            Build the Future of
            <span className="mt-2 block bg-gradient-to-r from-white via-blue-300 to-violet-300 bg-clip-text text-transparent">
              AI Creator Workflow
            </span>
          </h2>

          <p className="mx-auto mt-4 max-w-2xl leading-8 text-white/60">
            Prototype ini adalah fondasi. Tahap berikutnya bisa mencakup auth,
            AI processing sungguhan, database, billing, team features, dan
            publish workflow yang lebih advanced.
          </p>
        </section>
      </div>
    </main>
  );
}