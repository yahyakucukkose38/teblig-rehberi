// ============================================================================
// ALTI SIFAT — "Dinimizi Yaşatan Altı Esas"
// ----------------------------------------------------------------------------
// Bu içerik özünde Türkçedir (Türkçe meal + hadis metinleri). Uygulamanın çok
// dilli konu sisteminden BAĞIMSIZ, kendi içinde duran bir bölümdür ve ana
// sayfadaki "6 Sıfat" butonundan açılan ekranda (app/six-attributes.tsx)
// gösterilir.
// ============================================================================

export type SaQuote = {
  /** Âyet/hadis meali. */
  text: string;
  /** Kaynak gösterimi (sûre/âyet veya hadis kaynağı). */
  ref: string;
};

export type SaItem = {
  /** Sıra numarası (1–6). */
  no: number;
  /** Esasın adı. */
  title: string;
  /** Başlığın altında vurgulu kısa cümle (varsa). */
  lead?: string;
  /** Açıklama gövdesi (paragraflar \n\n ile ayrılır). */
  body: string;
  verses: SaQuote[];
  hadiths: SaQuote[];
  /** "Hayatımıza nasıl taşırız?" maddeleri. */
  applications: string[];
};

export const sixAttributesIntro = {
  title: 'Dinimizi Yaşatan Altı Esas',
  lead: 'Nahmedühû ve nusallî alâ Resûlihi’l-kerîm.',
  body: 'Yüce Rabbimiz insanı kendisine kulluk etmesi için yaratmış, dünya ve ahiret mutluluğunun yolunu İslâm ile göstermiştir. İmanımızı güçlendirmek ve dinimizi güzelce yaşayabilmek için şu altı esası hayatımıza yerleştirmeliyiz:',
};

export const sixAttributes: SaItem[] = [
  {
    no: 1,
    title: 'İman ve Kelime-i Tevhid',
    lead: 'Lâ ilâhe illallah Muhammedün Resûlullah.',
    body:
      'Bu söz; Allah’tan başka ibadete layık hiçbir ilâh bulunmadığına ve Hz. Muhammed’in ﷺ Allah’ın kulu ve elçisi olduğuna inanmak demektir.\n\n' +
      'İman; Allah’a, meleklerine, kitaplarına, peygamberlerine, ahiret gününe, kaza ve kadere gönülden inanmaktır. Mümin, nimetlerin Allah’tan geldiğini bilir; sıkıntılar karşısında sabırla Rabbine dayanır.',
    verses: [
      {
        text:
          'Müminler ancak Allah’a ve Resulüne iman eden, sonra da şüpheye düşmeyen kimselerdir.',
        ref: 'Hucurât, 49/15',
      },
    ],
    hadiths: [
      {
        text: 'Kim Allah’tan başka ilâh olmadığını bilerek ölürse cennete girer.',
        ref: 'Müslim, Îmân, 43',
      },
    ],
    applications: [
      'Tevhid inancımızı doğru şekilde öğreniriz.',
      'Allah’a güvenir ve yalnız O’ndan yardım isteriz.',
      'Peygamber Efendimiz’in ﷺ sünnetini öğrenip yaşamaya çalışırız.',
      'İmanımızı güzel davranışlarla güçlendiririz.',
    ],
  },
  {
    no: 2,
    title: 'Namazı Dosdoğru Kılmak',
    body:
      'Namaz, imandan sonra en önemli ibadetlerden biridir. Kulun Rabbiyle bağını kuvvetlendirir, kalbini arındırır ve onu kötülüklerden korur.',
    verses: [
      { text: 'Şüphesiz namaz, hayâsızlıktan ve kötülükten alıkoyar.', ref: 'Ankebût, 29/45' },
      { text: 'Sabır ve namazla Allah’tan yardım isteyin.', ref: 'Bakara, 2/45' },
    ],
    hadiths: [
      {
        text:
          'Beş vakit namazın misali, sizden birinin kapısının önünden akan ve her gün beş defa yıkandığı bol sulu bir nehir gibidir.',
        ref: 'Müslim, Mesâcid, 284',
      },
    ],
    applications: [
      'Beş vakit namazı vaktinde kılmaya gayret ederiz.',
      'Abdestimizi ve namazımızı doğru şekilde öğreniriz.',
      'Namazda okuduklarımızın anlamlarını öğreniriz.',
      'Ailemizi ve çevremizi namaza güzellikle teşvik ederiz.',
    ],
  },
  {
    no: 3,
    title: 'İlim ve Zikir',
    body:
      'İlim, Allah’ın bizden ne istediğini ve dinimizi nasıl yaşayacağımızı öğrenmektir. Zikir ise Allah’ı anmak, O’nun bizi gördüğünü bilerek yaşamaktır.',
    verses: [
      { text: 'De ki: Hiç bilenlerle bilmeyenler bir olur mu?', ref: 'Zümer, 39/9' },
      { text: 'Bilesiniz ki kalpler ancak Allah’ı anmakla huzur bulur.', ref: 'Ra‘d, 13/28' },
    ],
    hadiths: [
      {
        text: 'Kim ilim öğrenmek için bir yola girerse Allah ona cennete giden yolu kolaylaştırır.',
        ref: 'Müslim, Zikir, 39',
      },
    ],
    applications: [
      'Her gün Kur’an-ı Kerim okuruz.',
      'Temel dinî bilgilerimizi güvenilir kaynaklardan öğreniriz.',
      'Sabah ve akşam dualarına devam ederiz.',
      'Dilimizi istiğfar, salavat ve güzel sözlerle meşgul ederiz.',
      'Öğrendiğimiz bilgileri hayatımıza uygulamaya çalışırız.',
    ],
  },
  {
    no: 4,
    title: 'Müslümana İkram ve Güzel Ahlâk',
    body:
      'Müslüman; kardeşini sever, ona yardım eder, kusurlarını araştırmaz ve insanlara güzel davranır. İkram yalnızca maddi yardım değildir; güler yüz, güzel söz ve gönül almak da ikramdır.',
    verses: [{ text: 'Müminler ancak kardeştirler.', ref: 'Hucurât, 49/10' }],
    hadiths: [
      {
        text:
          'Sizden biri kendisi için sevdiğini kardeşi için de sevmedikçe gerçek anlamda iman etmiş olmaz.',
        ref: 'Buhârî, Îmân, 7; Müslim, Îmân, 71',
      },
      {
        text: 'Kul, kardeşinin yardımında bulunduğu sürece Allah da kulun yardımındadır.',
        ref: 'Müslim, Zikir, 38',
      },
    ],
    applications: [
      'İnsanlara güler yüz ve güzel sözle yaklaşırız.',
      'İhtiyaç sahiplerine imkânımız ölçüsünde yardım ederiz.',
      'Müslümanların kusurlarını araştırmayız.',
      'Yaşlılara hürmet, küçüklere merhamet gösteririz.',
      'Helal kazanca ve kul hakkına dikkat ederiz.',
    ],
  },
  {
    no: 5,
    title: 'Niyeti Düzeltmek ve İhlâs',
    body:
      'Niyet, amellerin ruhudur. İbadetlerimizi ve iyiliklerimizi insanların övgüsünü kazanmak için değil, yalnızca Allah’ın rızası için yapmalıyız.',
    verses: [
      {
        text: 'Oysa onlara, dini yalnız Allah’a has kılarak O’na kulluk etmeleri emredilmişti.',
        ref: 'Beyyine, 98/5',
      },
    ],
    hadiths: [
      {
        text: 'Ameller ancak niyetlere göredir. Herkese ancak niyet ettiği şey vardır.',
        ref: 'Buhârî, Bed’ü’l-vahy, 1; Müslim, İmâre, 155',
      },
    ],
    applications: [
      'Her işe Allah’ın rızasını gözeterek başlarız.',
      'Yaptığımız iyilikleri gösterişten koruruz.',
      'Niyetimizi zaman zaman kontrol ederiz.',
      'İnsanların övgüsünden çok Allah’ın rızasını önemseriz.',
      'Gizli iyilikler yapmaya gayret ederiz.',
    ],
  },
  {
    no: 6,
    title: 'Davet ve Tebliğ',
    body:
      'Müslüman, öğrendiği güzellikleri hikmetli ve merhametli bir üslupla başkalarıyla paylaşır. Davet; kırmak, zorlamak veya tartışmak değil, İslâm’ı güzel söz ve güzel davranışlarla sevdirmektir.',
    verses: [
      { text: 'Rabbinin yoluna hikmetle ve güzel öğütle davet et.', ref: 'Nahl, 16/125' },
      {
        text: 'Sizden hayra çağıran, iyiliği emreden ve kötülükten sakındıran bir topluluk bulunsun.',
        ref: 'Âl-i İmrân, 3/104',
      },
    ],
    hadiths: [
      { text: 'Benden bir ayet dahi olsa başkalarına ulaştırınız.', ref: 'Buhârî, Enbiyâ, 50' },
      {
        text:
          'Allah’ın senin vasıtanla bir kişiye hidayet vermesi, senin için kırmızı develere sahip olmaktan daha hayırlıdır.',
        ref: 'Buhârî, Fezâilü’s-sahâbe, 9; Müslim, Fezâilü’s-sahâbe, 34',
      },
    ],
    applications: [
      'Önce öğrenir, sonra bildiğimiz doğru bilgiyi paylaşırız.',
      'İnsanlara sevgi, sabır ve hikmetle yaklaşırız.',
      'Sözümüzle birlikte davranışlarımızla da örnek oluruz.',
      'Uygun zaman ve güzel bir üslup seçeriz.',
      'Bilmediğimiz konularda ehline danışırız.',
      'Dua ederek hidayetin yalnızca Allah’tan olduğunu biliriz.',
    ],
  },
];

export const sixAttributesConclusion = {
  title: 'Sonuç',
  body:
    'Bu altı esasın gayesi; imanımızı güçlendirmek, ibadetlerimizi güzelleştirmek, güzel ahlâklı olmak ve Allah’ın rızasını kazanmaktır. Dünya hayatı geçici, ahiret hayatı ise ebedîdir. En büyük nimet, iman üzere yaşamak ve iman üzere Rabbimizin huzuruna çıkabilmektir.',
  verse: {
    text:
      'Ey iman edenler! Allah’tan O’na yaraşır şekilde korkun ve ancak Müslümanlar olarak can verin.',
    ref: 'Âl-i İmrân, 3/102',
  },
  dua:
    'Rabbimiz imanımızı kuvvetlendirsin, ibadetlerimizi kabul eylesin, öğrendiklerimizle amel etmeyi ve İslâm’ın güzelliklerini hikmetle insanlara ulaştırmayı nasip etsin. Âmin.',
};
