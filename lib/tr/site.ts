// Turkish copy for lib/site.ts. Only text lives here; slugs, colours, numbers and links come from the
// English data, so the two languages can't drift apart. To be reviewed by a native speaker.

export const identity = {
  role: "Kurucu ve Kreatif Uzman",
  tagline: "Kurşun kalemle hayal edildi. Renkle teslim edildi.",
  location: "İslamabad, Pakistan (GMT+5)",
};

export const navLabels: Record<string, string> = {
  "/": "Ana sayfa",
  "/about": "Hakkımda",
  "/services": "Hizmetler",
  "/case-studies": "Vaka çalışmaları",
  "/contact": "İletişim",
};

// By service slug.
export const services: Record<string, { name: string; short: string; hook: string; number?: string; unit: string }> = {
  "social-media-creatives": { name: "Sosyal Medya Kreatifleri", short: "Sosyal", hook: "Kaydır. Dur. Hatırla.", number: "1.000+", unit: "kreatif" },
  "videography-reels": { name: "Videografi ve Reels", short: "Video", hook: "Markanıza kazandırabileceğim ilgiyi bir düşünün.", unit: "reels" },
  "print-media": { name: "Basılı Medya", short: "Baskı", hook: "Bazı şeyler elde tutulmayı hak eder.", unit: "teslimat" },
  "branding-guidelines": { name: "Marka Kimliği ve Kılavuzlar", short: "Marka", hook: "Logo bir yüzdür. Marka bir kişiliktir.", unit: "sıfırdan marka" },
  "website-design": { name: "Web Sitesi Tasarımı", short: "Web siteleri", hook: "Web siteniz ilk el sıkışmanızdır.", unit: "web sitesi" },
  "packaging-design": { name: "Ambalaj ve Tasarım", short: "Ambalaj", hook: "İnsanların ilk dokunduğu şey markanızdır.", unit: "tasarım" },
  "presentations-pitchdecks": { name: "Sunumlar ve Pitch Deck'ler", short: "Pitch deck", hook: "Pitch deck, son teslim tarihi olan bir ilk izlenimdir.", unit: "öne çıkan sunum" },
};

export const keyNumberLabels = ["Yıllık deneyim", "Teslim edilen kreatif", "Aktif marka", "Sertifika"];

// By case slug.
export const featuredWork: Record<string, { summary: string; tag?: string }> = {
  "anebos-studios": { summary: "Kendi stüdyom: göz alıcı kreatifler, aynı gün teslim.", tag: "Ana vaka çalışması" },
  "aba-group": { summary: "Beş birim, beş ses, tek kararlı el.", tag: "Ana vaka çalışması" },
  trenddeck: { summary: "Bilinmezlikten kaçınılmaza: sıfırdan inşa edilen bir WPC deck markası." },
  treatsforlife: { summary: "Doğal gıdalar, bir Shopify mağazası ve üç ayda kurulan bir marka." },
};

export const processSteps = [
  { title: "Dinle", body: "İşe ihtiyacınızla başlarım: bu marka insanlara ne hissettirmeli, ne hatırlatmalı ve ne yaptırmalı?" },
  { title: "Vizyonu şekillendir", body: "Sizin vizyonunuzun üzerine inşa ederim ya da birini yaratmanıza yardım ederim." },
  { title: "Teslim et", body: "Kaydırmayı durduran, ilgiyi tutan ve insanlara net bir sonraki adım sunan kreatifler." },
];

// Client quotes, translated. By the client's name (the name itself stays as written).
export const quotes: Record<string, { quote: string; title: string; source: string }> = {
  "Huma Maryum": { quote: "Muneeb, İslamabad'daki birçok Tim Hortons lansmanında lojistik ve kreatif işleri harika bir şekilde üstlenerek destek oldu.", title: "Pazarlama Müdürü, Tim Hortons", source: "LinkedIn" },
  "Mr Waqas": { quote: "Treatsforlife, Muneeb'in emeği ve özverisiyle iyi uygulanmış ve gerçeğe dönüşmüş bir hayaldi. Tüm projeyi nasıl yönettiğinizi ve her ayrıntıyı büyük bir özveriyle nasıl takip ettiğinizi takdir ediyorum.", title: "CEO, Treats For Life", source: "WhatsApp mesajı" },
  "Shahid Raja": { quote: "BIC SZABIST'in medya varlığını sıfırdan tasarlayıp inşa ettiğin olağanüstü çalışma için teşekkürler, Muneeb.", title: "Kurucu ve Lider, BIC SZABIST", source: "WhatsApp mesajı" },
  "Dhuvani E.": { quote: "Süreci tam bir aydınlanmaydı. Sadece tasarım yapmadı; şirketimize bir hikâye ve yön kazandırdı.", title: "Müdür, Al Arab News (eski ana müşteri, Yumi Furniture)", source: "WhatsApp mesajı" },
  "Zubair Ibraheem": { quote: "Mükemmel bir iş birlikçi; her zaman en kaliteli sonuçları sağlıyor. Kendisini kesinlikle tavsiye ediyor, ona başarılar diliyorum!", title: "İçerik Üreticisi x ABD Büyükelçiliği", source: "LinkedIn" },
  "Mr Zaryab Raja": { quote: "Green Pakistan Agro Farms olarak, bizim için harika bir web sitesi tasarlayıp geliştirdiği için Muneeb'e içtenlikle teşekkür ederiz. Uzmanlığınız ve yaratıcılığınız, şirketimizi ve misyonumuzu daha geniş bir kitleye tanıtmamıza gerçekten yardımcı oldu.", title: "Green Pakistan Agro Farms", source: "WhatsApp mesajı" },
};

export const story = [
  "Başlangıçta hayat bir A4 kâğıdı ve yarısı açılmış bir kurşun kalemden ibaretti. Sınır gökyüzüydü ve tasarımın nereye gideceğine hayal gücü karar veriyordu.",
  "Sonra üniversitenin ilk yıllarında biri bana sıradan bir soru sordu: logom nasıl görünmeli? Adobe'nin ne olduğunu bile bilmiyordum.",
  "Ben de günlüğümü aldım, bir eskiz çizdim ve onu dijital bir baskıya dönüştürdüm. Her şey böyle başladı.",
  "Kalem hiç durmadı. Mürekkebin yerini yalnızca Pantone ve hex kodları aldı.",
];
