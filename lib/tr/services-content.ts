// Turkish copy for lib/services-content.ts, by service slug. Segment and website text is keyed by their
// ids/slugs. To be reviewed by a native speaker.

type PageText = {
  keyLine: string;
  intro: string;
  hookLine?: string;
  segments?: Record<string, { name: string; text: string }>;
  websites?: Record<string, { name?: string; platform?: string; build: string; text: string }>;
  closing: string;
  metaDescription: string;
};

export const pages: Record<string, PageText> = {
  "social-media-creatives": {
    keyLine: "1.000+ kreatif teslim edildi",
    intro: "Her markanın kendi sesi vardır, bu yüzden her marka kendi alanını alır. Bunlar topluca yığılmış gönderiler değil: her bölüm, hızlı stüdyo içeriğinden kurumsal LinkedIn karusellerine kadar, ait olduğu markanın tarzındaki işleri gösterir.",
    segments: {
      "anebos-studios": { name: "Anebos Studios gönderileri", text: "Hız için kurgulanmış stüdyo içeriği: cesur, ritmik ve saatler içinde hazır." },
      trenddeck: { name: "TrendDeck gönderileri", text: "Bir WPC deck ve kaplama markası için sıfırdan zirveye içerik: gönderiler, karuseller ve reklam reels'leri." },
      "aba-group": { name: "ABA Group gönderileri", text: "Beş birim, beş kitle, tek kararlı el: tekrara düşmeden ayrı sesler." },
      "beatrix-konnect": { name: "Beatrix Konnect gönderileri", text: "Önce LinkedIn: uluslararası bir BPO şirketini doğru müşterilerin önünde tutan statik gönderiler ve karuseller." },
      treatsforlife: { name: "Treatsforlife gönderileri", text: "Ekrandan neredeyse tadına bakabileceğiniz doğal gıdalar: bal, kuruyemiş, şilajit, zeytin ve incir." },
      bakebox: { name: "Bakebox gönderileri", text: "Evde pişirme kutusunu eğlenceli ve paylaşılabilir hale getirmek." },
      ndrmf: { name: "NDRMF gönderileri", text: "Kurumsal bir cilayla iklim eylemi iletişimi." },
    },
    closing: "Kaydırmayı durduran içeriğe mi ihtiyacınız var?",
    metaDescription: "1.000+ sosyal medya kreatifi teslim edildi; her marka kendi sesiyle tasarlandı. Gönderiler, karuseller ve reels.",
  },
  "videography-reels": {
    keyLine: "100+ reels teslim edildi",
    intro: "Dikkat ilk saniyede kazanılır ve ritimle korunur. Aşağıdaki her bölüm, onu kazanmanın farklı bir yolu.",
    hookLine: "Az önce 5 saniye boyunca bir merminin balona çarpışını izlediniz. Markanıza kazandırabileceğim ilginin bu olduğunu bir düşünün.",
    segments: {
      ugc: { name: "UGC içerik reels'leri", text: "Akışın doğal bir parçası gibi hissettiren, içerik üretici tarzı videolar." },
      documentary: { name: "Belgesel ve foto muhabirliği", text: "Hikâye odaklı, gerçek anlardan oluşan, duygu için çekilip kurgulanmış görüntüler." },
      "b-roll": { name: "B-roll ve metin döngüleri", text: "Hızlı ve sessiz izlemeye uygun hikâye anlatımı için döngüsel görseller ve cesur tipografi." },
      "product-demos": { name: "Ürün demoları ve reklam filmleri", text: "Hareket halindeki ürünler; hem geniş bir reklam filmi hem de bir reels kurgusu." },
      kinetic: { name: "Hızlı tempolu kinetik kısa videolar", text: "Dikkati tutmak için ritimle kurgulanmış enerji." },
      "ai-motion": { name: "Yapay zekâ tabanlı hareketli grafikler", text: "Yapay zekâ destekli görseller, özenli bir harekete dönüştürüldü." },
      commercial: { name: "Reklam reels'leri", text: "Reels formatında marka reklamları." },
    },
    closing: "Bu ilgiyi markanızda ister misiniz?",
    metaDescription: "100+ reels teslim edildi: UGC, belgesel, kinetik, yapay zekâ hareketli grafikleri ve reklam reels'leri.",
  },
  "print-media": {
    keyLine: "250+ teslimat",
    intro: "Dergilerden kartvizitlere, baskı bir markanın fiziksel hale geldiği yerdir. Aşağıdaki her parça ekranda doğru görünmek ve elde doğru hissettirmek için yapıldı.",
    segments: {
      "magazines-posters": { name: "Dergiler ve posterler", text: "Net bir mesajı ve güçlü bir ilk okuması olan editoryal sayfa düzenleri ve posterler." },
      itineraries: { name: "Gezi programı tasarımları", text: "Gezginlerin uçağa binmeden yolculuğu hissetmesini sağlayan, özenle hazırlanmış gezi programları." },
      "book-covers": { name: "Kitap kapakları", text: "Tek bir görselde koca bir hikâye taşıyan kapaklar." },
      brochures: { name: "Broşürler", text: "Okuru yönlendiren, net ve düzenli broşürler." },
      "visiting-cards": { name: "Kartvizitler", text: "Küçük formatlarda kalıcı bir ilk izlenim." },
      letterheads: { name: "Antetli kâğıtlar", text: "Her belgeyi markaya uygun gösteren kırtasiye." },
    },
    closing: "İnsanların saklayacağı bir baskıya mı ihtiyacınız var?",
    metaDescription: "250+ basılı teslimat: dergiler, posterler, gezi programları, kitap kapakları, broşürler, kartvizitler ve antetli kâğıtlar.",
  },
  "branding-guidelines": {
    keyLine: "Sıfırdan kurulan 10+ marka",
    intro: "İşe markanın kim olduğunu tanımlayarak başlarım: yazı tipi, renkleri, öğeleri. Ardından logo gelir, sonra da gelecekteki her parçayı tutarlı tutan kılavuzlar.",
    closing: "Sıfırdan bir marka mı kuruyorsunuz?",
    metaDescription: "Sıfırdan kurulan 10+ marka: logolar, renk paletleri, kılavuzlar ve marka varlıkları.",
  },
  "website-design": {
    keyLine: "20+ web sitesi yapıldı",
    intro: "Web siteleri, dikkatin eyleme dönüştüğü yerdir. İşte tasarladığım yedi tanesi; her birinin platformu, nasıl yapıldığı ve güncel durumuyla.",
    websites: {
      treatsforlife: { build: "Sıfırdan yapıldı", text: "Doğal gıda markası için sıfırdan kurulan ve markanın kendi hikâyesi etrafında tasarlanan bir Shopify mağazası: Pakistan'ın dört bir yanından toplanan saf iyilik (bal, kuruyemiş, şilajit, khanda, zeytin, incir). Markanın bir satış kanalı yoktu; bu mağaza o kanal oldu. Etkin değil: marka artık Bahreyn'den yönetiliyor." },
      safirwear: { build: "Yeniden tasarlanan sayfa düzeni ve görsel stili", text: "B2B özel ürün markası için yeniden tasarlanmış bir web sitesi: sitenin görünümünü ve hissini şekillendiren yeni bir sayfa düzeni ve yeni bir görsel stil. İçerik müşteri tarafından sağlanmıştı. Vercel tabanlı bir çıktı olarak teslim edildi." },
      "beatrix-konnect": { build: "Sıfırdan yapıldı", text: "Uluslararası bir BPO ve çağrı merkezi hizmet sağlayıcısı için sıfırdan kurulan, şirketin hikâyesi ve hizmetleri etrafında tasarlanarak pazarında öne çıkmasını sağlayan bir WordPress web sitesi." },
      trenddeck: { build: "Yeniden tasarım (sıfırdan değil)", text: "Bir WPC deck ve kaplama markasının Webflow üzerindeki web sitesinin sıfırdan yapımı değil, yeniden tasarımı. Müşteri sayfa düzeninin ve sitede gösterilen görsellerin düzenlenmesini istedi; yeniden tasarım tam olarak bunu sunuyor." },
      fairmans: { name: "Fairmans Real Estate Agents (Birmingham, Birleşik Krallık)", build: "Yapıldı", text: "Birmingham merkezli yerel bir emlak ajansı için, gerçek zamanlı ilan indekslemeyle optimize edilmiş bir WordPress emlak ilan sitesi. Ekibin satılık, kiralık veya uzun süreli kiralık mülkleri hızla listeleyebilmesi için bir arka uç platformu da kuruldu." },
      "casa-de-rococco": { platform: "Uygulanamaz", build: "Konsept maket", text: "Markanın renklerine dayanarak bir şirket mağazası kurmaya başlamak için markanın yöneticilerine sunulan bir müşteri maketi. Marka şu anda Amazon ve Temu'da başarıyla satış yapıyor. Web sitesi şu anda mevcut değil: bu canlı bir site değil, bir konsept maket." },
      "yumi-furnitures": { build: "Yapıldı (özel sözleşme)", text: "2025'te özel bir sözleşmeyle İslamabad'dan, kanepe gibi modern mobilyalar satan Birleşik Krallık merkezli bir şirket için kurulan bir Shopify mağazası. Mağazanın üretimlerini sergilemesi ve müşteri sorularını yönetmesi gerekiyordu." },
    },
    closing: "Sizin kadar çok çalışan bir web sitesine mi ihtiyacınız var?",
    metaDescription: "Shopify, Elementor, WordPress, Figma ve Webflow üzerinde yapılmış 20+ web sitesi.",
  },
  "packaging-design": {
    keyLine: "100+ tasarım teslim edildi",
    intro: "Ambalaj, bir markanın birinin elinde gerçeğe dönüştüğü andır. Aşağıdaki her form kendi yerini alıyor.",
    segments: {
      "box-and-bottle": { name: "Kutu ve şişe ambalajı", text: "Rafta ve kutu açılışında iyi görünecek şekilde tasarlanmış kutular ve şişeler." },
      "pouch-and-packet": { name: "Poşet ve paket tasarımı", text: "Marka sisteminden dışa doğru inşa edilmiş poşetler ve paketler." },
      "stickers-and-labels": { name: "Etiket ve sticker tasarımı", text: "Ambalajı tamamlayan etiketler ve stickerlar." },
    },
    closing: "Açılmadan satan bir ambalaj mı?",
    metaDescription: "100+ ambalaj tasarımı: 3D modeller, kutular, şişeler, poşetler, stickerlar ve etiketler.",
  },
  "presentations-pitchdecks": {
    keyLine: "4 öne çıkan sunum",
    intro: "Teslimatlar ve beklenti: bu sadece bir sunum değil, tüketici psikolojisine dayanan kanca tarzı bir akış: kanca, kanıt, talep.",
    segments: {
      "anebos-nova-model": { name: "Anebos Nova Model", text: "Stüdyonun kendi model sunumu." },
      "nivora-travels": { name: "Nivora Travels Plan tarzı", text: "Bir hikâye olarak sunulan seyahat planı." },
      "facing-north": { name: "Facing North Pitch Deck", text: "Lüks bir tur operatörü için hazırlanmış bir sunum." },
      reweave: { name: "Reweave Pitch Deck", text: "Reweave markası için bir pitch deck." },
    },
    closing: "Sunacak bir şeyiniz mi var?",
    metaDescription: "Tüketici psikolojisi üzerine kurulu pitch deck'ler: kanca, kanıt, talep.",
  },
};
