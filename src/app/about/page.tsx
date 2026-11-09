export default function AboutPage() {
  return (
    <main className="mx-auto w-full max-w-[1280px] flex-1 flex-col font-sans px-4 py-24 sm:px-6">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-4xl font-extrabold tracking-tight text-ink sm:text-5xl mb-8">
          Tentang Telusurin
        </h1>
        
        <div className="prose prose-lg prose-ink leading-relaxed space-y-8">
          <p className="text-xl text-ink-muted leading-relaxed">
            Telusurin lahir dari kebutuhan akan transparansi data publik yang mudah diakses, dimengerti, dan diverifikasi oleh siapa saja.
          </p>

          <section>
            <h2 className="text-2xl font-bold text-ink mb-4">Visi & Misi</h2>
            <p>
              Visi kami adalah menjadi jembatan antara data publik yang kompleks dengan pemahaman masyarakat. 
              Misi kami adalah menyediakan platform pembanding data yang jujur, tanpa manipulasi, dan sepenuhnya dapat ditelusuri ke sumber aslinya.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-ink mb-4">Mengapa Telusurin?</h2>
            <p>
              Seringkali, membandingkan performa layanan publik antar daerah menjadi tantangan karena data tersebar di berbagai dokumen PDF yang sulit diolah. 
              Telusurin hadir untuk mengumpulkan data tersebut ke dalam satu dashboard terpadu, menjadikannya alat bantu pengambilan keputusan berbasis fakta untuk setiap warga.
            </p>
          </section>

          <section className="bg-ink/[0.03] p-8 rounded-2xl border border-rule">
            <h2 className="text-xl font-bold text-ink mb-4">Penafian & Independensi</h2>
            <p className="text-sm">
              Telusurin adalah inisiatif independen yang dikembangkan untuk kompetisi WIA MIA 2026. 
              Kami menggunakan data statistik resmi (seperti BPS) sebagai sumber utama, 
              namun <strong>Telusurin tidak memiliki hubungan struktural, afiliasi, maupun dukungan resmi dari badan terkait.</strong>
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-ink mb-4">Prinsip Data Kami</h2>
            <ul className="space-y-4">
              <li><strong>Bebas Asumsi:</strong> Kami tidak menambah atau mengurangi angka. Jika data tidak tersedia, kami tampilkan apa adanya.</li>
              <li><strong>Audit-Ready:</strong> Setiap angka dilengkapi ID sumber agar Anda dapat melakukan audit silang secara mandiri.</li>
              <li><strong>Netral:</strong> Platform ini tidak memberikan opini daerah mana yang &ldquo;terbaik&rdquo;, melainkan menyajikan fakta numerik untuk interpretasi Anda.</li>
            </ul>
          </section>
        </div>
      </div>
    </main>
  );
}
