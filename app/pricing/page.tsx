export default function PricingPage() {
  const plans = [
    {
      name: "Free",
      price: "Rp0",
      subtitle: "Untuk uji coba pribadi",
      features: [
        "Input link YouTube",
        "Maksimal 5 clip simulasi",
        "History di browser",
        "UI prototype workflow",
      ],
      highlight: false,
      button: "Mulai Gratis",
    },
    {
      name: "Pro",
      price: "Rp99.000",
      subtitle: "Untuk creator yang lebih serius",
      features: [
        "Semua fitur Free",
        "Export tanpa watermark",
        "Subtitle template premium",
        "Auto caption & hashtag",
        "Publish workflow lebih cepat",
      ],
      highlight: true,
      button: "Upgrade ke Pro",
    },
    {
      name: "Team",
      price: "Custom",
      subtitle: "Untuk bisnis dan tim konten",
      features: [
        "Semua fitur Pro",
        "Multi-user workspace",
        "Riwayat project tim",
        "Admin dashboard",
        "Workflow kolaborasi",
      ],
      highlight: false,
      button: "Hubungi Kami",
    },
  ];

  return (
    <main className="min-h-screen px-6 py-14 text-white">
      <div className="mx-auto max-w-6xl">
        <div className="rounded-[28px] border border-white/10 bg-white/5 p-8 text-center shadow-2xl shadow-black/20">
          <p className="inline-flex rounded-full border border-white/10 bg-white/5 px-4 py-1 text-sm text-white/70">
            Pricing ClipForge
          </p>

          <h1 className="mt-4 text-4xl font-bold tracking-tight md:text-6xl">
            Paket yang Fleksibel
            <span className="mt-2 block bg-gradient-to-r from-white via-blue-300 to-violet-300 bg-clip-text text-transparent">
              untuk Creator dan Bisnis
            </span>
          </h1>

          <p className="mx-auto mt-4 max-w-2xl leading-8 text-white/60">
            Mulai dari versi gratis untuk eksplorasi, lalu naik ke Pro atau Team
            saat workflow konten kamu semakin serius.
          </p>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`rounded-[28px] border p-6 shadow-xl shadow-black/20 ${
                plan.highlight
                  ? "border-blue-500/30 bg-gradient-to-b from-blue-500/10 to-violet-500/10"
                  : "border-white/10 bg-white/5"
              }`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-2xl font-semibold">{plan.name}</h2>
                  <p className="mt-2 text-white/55">{plan.subtitle}</p>
                </div>

                {plan.highlight && (
                  <span className="rounded-full border border-blue-400/30 bg-blue-500/15 px-3 py-1 text-xs font-medium text-blue-300">
                    Recommended
                  </span>
                )}
              </div>

              <div className="mt-6">
                <p className="text-4xl font-bold">{plan.price}</p>
                {plan.price !== "Custom" && (
                  <p className="mt-2 text-sm text-white/45">per bulan</p>
                )}
              </div>

              <div className="mt-6 space-y-3">
                {plan.features.map((feature) => (
                  <div
                    key={feature}
                    className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white/75"
                  >
                    {feature}
                  </div>
                ))}
              </div>

              <button
                className={`mt-8 w-full rounded-2xl px-5 py-4 font-medium transition ${
                  plan.highlight
                    ? "bg-gradient-to-r from-blue-500 to-violet-500 text-white shadow-lg shadow-blue-500/20 hover:opacity-95"
                    : "border border-white/10 bg-white/10 text-white hover:bg-white/15"
                }`}
              >
                {plan.button}
              </button>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}