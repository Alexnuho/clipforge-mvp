export default function ContactPage() {
  const contactItems = [
    {
      title: "Email",
      value: "hello@clipforge.app",
      desc: "Untuk pertanyaan umum, kerja sama, atau feedback produk.",
    },
    {
      title: "Creator Support",
      value: "support@clipforge.app",
      desc: "Untuk bantuan seputar workflow, clip results, dan penggunaan fitur.",
    },
    {
      title: "Business Inquiry",
      value: "business@clipforge.app",
      desc: "Untuk kolaborasi bisnis, team workflow, dan kebutuhan enterprise.",
    },
  ];

  return (
    <main className="min-h-screen px-6 py-14 text-white">
      <div className="mx-auto max-w-6xl">
        <div className="rounded-[28px] border border-white/10 bg-white/5 p-8 shadow-2xl shadow-black/20">
          <p className="inline-flex rounded-full border border-white/10 bg-white/5 px-4 py-1 text-sm text-white/70">
            Contact ClipForge
          </p>

          <h1 className="mt-4 text-4xl font-bold tracking-tight md:text-6xl">
            Hubungi Kami
            <span className="mt-2 block bg-gradient-to-r from-white via-blue-300 to-violet-300 bg-clip-text text-transparent">
              untuk Feedback dan Kolaborasi
            </span>
          </h1>

          <p className="mt-5 max-w-3xl leading-8 text-white/60">
            ClipForge masih berkembang sebagai personal prototype menuju produk
            SaaS yang lebih matang. Kalau kamu punya ide, feedback, atau ingin
            berdiskusi soal pengembangan creator tools, halaman ini jadi titik
            awal yang tepat.
          </p>
        </div>

        <section className="mt-10 grid gap-6 md:grid-cols-3">
          {contactItems.map((item) => (
            <div
              key={item.title}
              className="rounded-[28px] border border-white/10 bg-white/5 p-6 shadow-xl shadow-black/20"
            >
              <p className="text-sm text-white/45">{item.title}</p>
              <h2 className="mt-3 text-2xl font-semibold">{item.value}</h2>
              <p className="mt-4 leading-7 text-white/60">{item.desc}</p>
            </div>
          ))}
        </section>

        <section className="mt-10 grid gap-6 lg:grid-cols-2">
          <div className="rounded-[28px] border border-white/10 bg-white/5 p-6 shadow-xl shadow-black/20">
            <p className="text-sm text-white/45">Why Contact Us</p>
            <h2 className="mt-3 text-3xl font-semibold">
              Feedback Sangat Berharga
            </h2>
            <p className="mt-4 leading-8 text-white/60">
              Karena ClipForge masih dalam tahap pengembangan, masukan dari user,
              creator, dan calon pengguna bisnis sangat penting untuk membentuk
              fitur yang benar-benar berguna di dunia nyata.
            </p>
          </div>

          <div className="rounded-[28px] border border-white/10 bg-white/5 p-6 shadow-xl shadow-black/20">
            <p className="text-sm text-white/45">Response Scope</p>
            <h2 className="mt-3 text-3xl font-semibold">
              Personal, Creator, dan Business
            </h2>
            <p className="mt-4 leading-8 text-white/60">
              Halaman contact ini cocok untuk kebutuhan sederhana seperti
              pertanyaan produk, sampai diskusi yang lebih besar seperti model
              monetisasi, fitur team, atau arah pengembangan platform.
            </p>
          </div>
        </section>

        <section className="mt-10 rounded-[32px] border border-white/10 bg-white/5 p-8 text-center shadow-2xl shadow-black/20 md:p-12">
          <p className="inline-flex rounded-full border border-white/10 bg-white/5 px-4 py-1 text-sm text-white/70">
            Let’s Build
          </p>

          <h2 className="mt-5 text-3xl font-bold md:text-5xl">
            Bangun Masa Depan
            <span className="mt-2 block bg-gradient-to-r from-white via-blue-300 to-violet-300 bg-clip-text text-transparent">
              Creator Workflow Bersama
            </span>
          </h2>

          <p className="mx-auto mt-4 max-w-2xl leading-8 text-white/60">
            ClipForge dimulai sebagai personal MVP, tapi arahnya jelas: menjadi
            produk yang membantu creator dan tim konten bekerja lebih cepat,
            lebih rapi, dan lebih scalable.
          </p>
        </section>
      </div>
    </main>
  );
}