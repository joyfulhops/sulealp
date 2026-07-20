export type Service = {
  slug: string;
  title: string;
  shortTitle: string;
  cardDescription: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  intro: string;
  suitableFor: string[];
  scope: string[];
  process: { title: string; text: string }[];
  outcomes: string[];
  faqs: { question: string; answer: string }[];
};

export const services: Service[] = [
  {
    slug: "luks-konut-danismanligi",
    title: "Lüks Konut Danışmanlığı",
    shortTitle: "Lüks Konut",
    cardDescription:
      "Seçkin konut portföylerinde gizlilik, konum analizi ve değer odaklı temsil.",
    metaTitle: "Lüks Konut Danışmanlığı | Şule Alp",
    metaDescription:
      "Lüks konut alım-satımında gizlilik, konum analizi ve değer odaklı danışmanlık için Şule Alp ile iletişime geçin.",
    h1: "Lüks Konut Danışmanlığı",
    intro:
      "Lüks konut danışmanlığı, yalnızca bir mülkü bulmak veya satmakla sınırlı değildir. Konumun uzun vadeli değeri, gizlilik ihtiyacı, yaşam tarzı uyumu ve piyasa dinamikleri birlikte değerlendirilir. Şule Alp, yüksek değerli konut süreçlerinde müvekkilin hedeflerini netleştirir; seçenekleri ölçülebilir kriterlerle karşılaştırır ve sürecin her adımında şeffaf iletişim sağlar. Amacı, acele kararları azaltmak ve sürdürülebilir bir yaşam veya yatırım sonucu üretmektir.",
    suitableFor: [
      "Seçkin bir konuta taşınmayı planlayan bireyler ve aileler",
      "Portföyüne yüksek değerli konut eklemek isteyen yatırımcılar",
      "Gizlilik ve özel temsil bekleyen müvekkiller",
      "Satış sürecini itibarlı ve kontrollü yönetmek isteyen malikler",
    ],
    scope: [
      "İhtiyaç ve hedef analizi",
      "Konum ve yaşam kalitesi değerlendirmesi",
      "Piyasa ve değer karşılaştırması",
      "Görüşme, müzakere ve süreç koordinasyonu",
      "İşlem sonrası yönlendirme",
    ],
    process: [
      {
        title: "Keşif görüşmesi",
        text: "Hedefler, zaman planı, bütçe aralığı ve gizlilik beklentileri netleştirilir.",
      },
      {
        title: "Kısa liste ve değerlendirme",
        text: "Uygun seçenekler kriterlere göre süzülür; avantaj–risk tablosu çıkarılır.",
      },
      {
        title: "Süreç yönetimi",
        text: "Görüşmeler, müzakere ve işlem adımları düzenli bilgilendirme ile ilerler.",
      },
    ],
    outcomes: [
      "Netleşmiş karar kriterleri",
      "Karşılaştırmalı seçenek değerlendirmesi",
      "Kontrollü ve gizlilik odaklı süreç yönetimi",
    ],
    faqs: [
      {
        question: "Lüks konut danışmanlığı kimler için uygundur?",
        answer:
          "Yüksek değerli bir konut alım veya satımında özel temsil, gizlilik ve stratejik yönlendirme arayan müvekkiller için uygundur.",
      },
      {
        question: "Süreç ne kadar sürer?",
        answer:
          "Süre; piyasa koşulları, mülk tipi ve müvekkil hedeflerine göre değişir. İlk görüşmede gerçekçi bir zaman çerçevesi paylaşılır.",
      },
      {
        question: "Yalnızca alım tarafına mı hizmet veriyorsunuz?",
        answer:
          "Hayır. Hem alım hem satış süreçlerinde, müvekkilin hedefi doğrultusunda danışmanlık sunulur.",
      },
    ],
  },
  {
    slug: "yatirim-stratejisi",
    title: "Yatırım Stratejisi",
    shortTitle: "Yatırım",
    cardDescription:
      "Getiri senaryoları, risk dengesi ve uzun vadeli portföy optimizasyonu.",
    metaTitle: "Gayrimenkul Yatırım Stratejisi | Şule Alp",
    metaDescription:
      "Gayrimenkul yatırımında risk, getiri ve zamanlama dengesi için Şule Alp’in stratejik danışmanlık yaklaşımını inceleyin.",
    h1: "Gayrimenkul Yatırım Stratejisi",
    intro:
      "Başarılı bir gayrimenkul yatırımı, yalnızca fırsat görmekle değil; doğru zamanda, doğru varlık sınıfında ve doğru risk seviyesinde ilerlemekle mümkün olur. Yatırım stratejisi danışmanlığı; hedeflenen getiri, likidite ihtiyacı, risk toleransı ve piyasa döngüsü birlikte ele alınarak kurgulanır. Şule Alp, kararları duygusal acelecilikten uzaklaştırır; analiz, senaryo ve önceliklendirme ile yatırımcının yol haritasını netleştirir.",
    suitableFor: [
      "İlk yüksek değerli gayrimenkul yatırımını planlayanlar",
      "Portföyünü çeşitlendirmek isteyen yatırımcılar",
      "Risk ve getiri dengesini yeniden gözden geçirenler",
      "Kentsel dönüşüm fırsatlarını yatırım perspektifiyle değerlendirenler",
    ],
    scope: [
      "Yatırım hedefi ve risk profili analizi",
      "Senaryo bazlı değerlendirme",
      "Konum ve varlık tipi karşılaştırması",
      "Zamanlama ve çıkış stratejisi çerçevesi",
      "Karar özeti ve aksiyon planı",
    ],
    process: [
      {
        title: "Hedef netleştirme",
        text: "Getiri beklentisi, süre, likidite ve risk sınırları belirlenir.",
      },
      {
        title: "Senaryo çalışması",
        text: "Olası senaryolar avantaj, risk ve zamanlama açısından karşılaştırılır.",
      },
      {
        title: "Aksiyon planı",
        text: "Öncelikli adımlar, kontrol noktaları ve karar kriterleri yazılı hale getirilir.",
      },
    ],
    outcomes: [
      "Net yatırım kriterleri",
      "Karşılaştırmalı senaryo çerçevesi",
      "Uygulanabilir aksiyon planı",
    ],
    faqs: [
      {
        question: "Yatırım danışmanlığı garanti getiri sunar mı?",
        answer:
          "Hayır. Amaç, riskleri görünür kılmak ve daha bilinçli karar vermenizi sağlamaktır; garanti getiri vaat edilmez.",
      },
      {
        question: "Hangi varlık tipleri değerlendirilir?",
        answer:
          "Müvekkil hedefine göre lüks konut, dönüşüm odaklı fırsatlar ve seçili yatırım senaryoları ele alınabilir.",
      },
      {
        question: "Tek görüşme yeterli midir?",
        answer:
          "İlk görüşme yön belirler. Kapsamlı strateji için ihtiyaç halinde devam eden danışmanlık planlanabilir.",
      },
    ],
  },
  {
    slug: "kentsel-donusum-danismanligi",
    title: "Kentsel Dönüşüm Danışmanlığı",
    shortTitle: "Kentsel Dönüşüm",
    cardDescription:
      "Hak sahipliği, süreç yönetimi ve değer artıran dönüşüm planlaması.",
    metaTitle: "Kentsel Dönüşüm Danışmanlığı | Şule Alp",
    metaDescription:
      "Kentsel dönüşüm süreçlerinde hak sahibi ve yatırımcı bakış açısıyla danışmanlık. Kentler Dönüşüyor programı deneyimiyle.",
    h1: "Kentsel Dönüşüm Danışmanlığı",
    intro:
      "Kentsel dönüşüm; teknik, hukuki ve finansal katmanları olan uzun soluklu bir süreçtir. Hak sahipleri için anlaşılırlık ve adil değer; yatırımcılar için risk, zamanlama ve proje kalitesi kritik hale gelir. Şule Alp, CNBC-e’de sunduğu “Kentler Dönüşüyor” programındaki sektörel bakışını danışmanlık yaklaşımına taşır; karmaşık süreci sadeleştirir ve karar noktalarını görünür kılar.",
    suitableFor: [
      "Dönüşüm sürecindeki hak sahipleri",
      "Proje ve yatırım fırsatlarını değerlendiren yatırımcılar",
      "Belediye / bölge bazlı dönüşüm gündemini takip edenler",
      "Süreç iletişiminde profesyonel destek arayan taraflar",
    ],
    scope: [
      "Mevcut durum ve hedef analizi",
      "Süreç adımlarının sadeleştirilmesi",
      "Hak sahibi / yatırımcı perspektifiyle değerlendirme",
      "Risk ve zamanlama çerçevesi",
      "İletişim ve karar desteği",
    ],
    process: [
      {
        title: "Durum tespiti",
        text: "Mevcut konum, hedefler ve sürecin hangi aşamada olduğu netleştirilir.",
      },
      {
        title: "Çerçeve oluşturma",
        text: "Kritik sorular, riskler ve karar kriterleri bir araya getirilir.",
      },
      {
        title: "Yönlendirme",
        text: "Sonraki adımlar ve ihtiyaç duyulan uzmanlık alanları planlanır.",
      },
    ],
    outcomes: [
      "Sadeleştirilmiş süreç haritası",
      "Karar noktalarının görünürlüğü",
      "Hak sahibi veya yatırımcıya özel yaklaşım",
    ],
    faqs: [
      {
        question: "Hukuki temsil hizmeti veriyor musunuz?",
        answer:
          "Danışmanlık; süreç anlayışı ve karar desteği odaklıdır. Hukuki temsil gerektiğinde ilgili uzmanlarla koordinasyon önerilir.",
      },
      {
        question: "Yalnızca İstanbul mu?",
        answer:
          "Odak büyükşehir ve dönüşüm gündemi yüksek bölgeler olmakla birlikte, görüşme kapsamında ihtiyaç değerlendirilir.",
      },
      {
        question: "Program ile danışmanlık aynı şey midir?",
        answer:
          "Hayır. Program kamuoyu bilgilendirmesine; danışmanlık ise kişiye özel sürece odaklanır.",
      },
      {
        question: "İlk adım nedir?",
        answer:
          "Kısa bir ön görüşme ile durumunuz ve beklentiniz dinlenir; uygun destek modeli önerilir.",
      },
    ],
  },
  {
    slug: "ozel-musteri-temsili",
    title: "Özel Müşteri Temsili",
    shortTitle: "Özel Temsil",
    cardDescription:
      "Discreet, kişiye özel süreç yönetimi ve uçtan uca işlem temsilciliği.",
    metaTitle: "Özel Müşteri Temsili | Şule Alp",
    metaDescription:
      "Gizlilik ve kişiye özel gayrimenkul süreç yönetimi için Şule Alp’in özel müşteri temsili hizmetini inceleyin.",
    h1: "Özel Müşteri Temsili",
    intro:
      "Bazı süreçler standart bir işlem akışından daha fazlasını gerektirir: gizlilik, hız, tek muhatap ve yüksek dikkat. Özel müşteri temsili; müvekkilin zamanını koruyan, iletişimi sadeleştiren ve karar kalitesini yükselten bir temsil modelidir. Şule Alp, uçtan uca süreçte müvekkil adına koordinasyonu üstlenir; gereksiz karmaşayı azaltır ve her adımı hedeflerle hizalar.",
    suitableFor: [
      "Gizlilik öncelikli müvekkiller",
      "Yoğun temposu nedeniyle tek muhatap isteyenler",
      "Birden fazla tarafın koordinasyonunu gerektiren işlemler",
      "Yurt içi / yurt dışı bağlantılı süreç yönetimleri",
    ],
    scope: [
      "Tek muhataplı süreç yönetimi",
      "Gizlilik protokolü ve iletişim düzeni",
      "Taraflar arası koordinasyon",
      "Karar özetleri ve ilerleme takibi",
      "İşlem kapanışına kadar temsil",
    ],
    process: [
      {
        title: "Brief ve sınırlar",
        text: "Hedefler, yetki sınırları ve gizlilik çerçevesi netleştirilir.",
      },
      {
        title: "Koordinasyon",
        text: "Görüşmeler, doküman akışı ve taraflar arası iletişim yönetilir.",
      },
      {
        title: "Kapanış",
        text: "Süreç özeti paylaşılır; sonraki adımlar için yönlendirme yapılır.",
      },
    ],
    outcomes: [
      "Tek merkezden yönetilen süreç",
      "Azaltılmış iletişim karmaşası",
      "Gizlilik odaklı ilerleme",
    ],
    faqs: [
      {
        question: "Özel temsil ne kadar kapsayıcıdır?",
        answer:
          "Kapsam, müvekkil brief’ine göre belirlenir. İhtiyaç halinde sınırlı veya uçtan uca model tercih edilebilir.",
      },
      {
        question: "Uluslararası müvekkillerle çalışıyor musunuz?",
        answer:
          "İhtiyaç halinde uzaktan görüşme ve koordinasyon modeli ile ilerlenebilir. Detaylar ilk görüşmede netleştirilir.",
      },
      {
        question: "Diğer hizmetlerle birlikte alınabilir mi?",
        answer:
          "Evet. Lüks konut, yatırım veya kentsel dönüşüm danışmanlığı ile birlikte kurgulanabilir.",
      },
    ],
  },
];

export function getServiceBySlug(slug: string) {
  return services.find((s) => s.slug === slug);
}
