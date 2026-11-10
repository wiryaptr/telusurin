export const siteConfig = {
  name: "Telusurin",
  tagline:
    "Bandingkan layanan publik antardaerah, lengkap dengan sumber dan batas datanya.",
  nav: {
    home: "Beranda",
    dashboard: "Dashboard",
    about: "About",
  },
  statusLabels: {
    resmi: "Resmi",
    belumTerverifikasi: "Belum terverifikasi",
    contoh: "Contoh",
  },
  statusBanner: {
    hasStatusNote: true,
    text: {
      resmi: "Sumber resmi telah terverifikasi.",
      belumTerverifikasi: "Ada data yang belum terverifikasi.",
      contoh: "Ada data contoh untuk pengujian.",
    },
  },
  features: {
    csv: true,
  },
} as const;
