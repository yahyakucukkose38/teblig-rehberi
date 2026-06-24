// ============================================================================
// TEBLİĞ ÇERÇEVESİ — "Tebliğde Ana Çerçeve" + "Kısa Konuşma Metni"
// ----------------------------------------------------------------------------
// Bu içerik özünde Türkçedir. Uygulamanın çok dilli konu sisteminden BAĞIMSIZ,
// kendi içinde duran bir bölümdür ve ana sayfadaki "Tebliğ Çerçevesi"
// butonundan açılan ekranda (app/dawah-framework.tsx) gösterilir.
//
// İçerik esnek "blok" yapısıyla tutulur; ekran her blok türünü kendi biçiminde
// render eder. Metinde **kalın** vurgular için çift yıldız kullanılabilir.
// ============================================================================

export type TfBlock =
  | { type: 'p'; text: string } // paragraf
  | { type: 'quote'; text: string } // vurgulu alıntı (çok satırlı olabilir, \n)
  | { type: 'subhead'; text: string } // ara başlık ("Mesela:" gibi)
  | { type: 'list'; items: string[] }; // madde listesi

export type TfSection = {
  no: number;
  title: string;
  blocks: TfBlock[];
};

export const dawahFrameworkIntro = {
  title: 'Tebliğde Ana Çerçeve',
};

export const dawahFramework: TfSection[] = [
  {
    no: 1,
    title: 'Tevhid: Allah’ı Tanımak',
    blocks: [
      { type: 'p', text: 'Tebliğin ilk ve en temel konusu **Allah’ı tanıtmak** olmalıdır.' },
      { type: 'p', text: 'İnsana önce şunu anlatmak gerekir:' },
      {
        type: 'quote',
        text:
          'Bu kâinat sahipsiz değildir.\nBu düzen tesadüf değildir.\nBu beden, bu ruh, bu akıl, bu kalp boşuna verilmemiştir.',
      },
      {
        type: 'p',
        text: 'Allah’ın birliği, yüceliği, kudreti ve azameti sade bir dille anlatılmalıdır.',
      },
      { type: 'subhead', text: 'Dünya ve kâinat örnekleriyle:' },
      {
        type: 'p',
        text:
          'Güneşin doğuşu, yıldızların düzeni, toprağın mahsul vermesi, yağmurun rahmet oluşu, insan bedenindeki mükemmel ölçü hep Allah’ın varlığını, birliğini ve kudretini gösterir.',
      },
      {
        type: 'p',
        text:
          'İnsanın yaratılışı da başlı başına bir tevhid dersidir. Gören göz, atan kalp, düşünen akıl, seven gönül insana Rabbini hatırlatır.',
      },
    ],
  },
  {
    no: 2,
    title: 'Marifetullah: Allah’ın İsim ve Sıfatlarını Bilmek',
    blocks: [
      {
        type: 'p',
        text:
          'Tebliğde sadece “Allah vardır” demek yetmez. İnsanın kalbine **Allah’ı tanıma sevgisi** yerleşmelidir.',
      },
      { type: 'p', text: 'Bunun için Allah’ın:' },
      { type: 'list', items: ['Esmâ-i Hüsnâ’sı,', 'Zâtî sıfatları,', 'Sübûtî sıfatları,'] },
      { type: 'p', text: 'sade bir dille anlatılmalıdır.' },
      { type: 'subhead', text: 'Mesela:' },
      {
        type: 'list',
        items: [
          'Allah **Hayy**’dır; hayat sahibidir.',
          'Allah **Alîm**’dir; her şeyi bilir.',
          'Allah **Semi‘**dir; her şeyi işitir.',
          'Allah **Basîr**’dir; her şeyi görür.',
          'Allah **Kadîr**’dir; her şeye gücü yeter.',
        ],
      },
      {
        type: 'p',
        text:
          'İnsan bunu idrak edince yalnız olmadığını anlar. Rabbini tanıyan insanın kalbinde iman kuvvetlenir.',
      },
      { type: 'quote', text: 'Davetle iman kuvvetlenir, muhabbetle kalbe yerleşir.' },
    ],
  },
  {
    no: 3,
    title: 'Ahiret: Hayat Sadece Bu Dünyadan İbaret Değildir',
    blocks: [
      { type: 'p', text: 'Tebliğde mutlaka **ahiret** anlatılmalıdır.' },
      {
        type: 'p',
        text:
          'Çünkü insan ölümden, kabirden, mahşerden, hesaptan haberdar olursa hayatına çeki düzen verir.',
      },
      { type: 'p', text: 'Şu hakikat sade şekilde söylenmelidir:' },
      {
        type: 'quote',
        text:
          'Ölüm yok oluş değildir.\nKabir son durak değildir.\nMahşer büyük buluşma yeridir.\nCennet Allah’ın rızasına erenlerin yurdudur.\nCehennem ise Allah’tan uzak kalmanın acı sonucudur.',
      },
      {
        type: 'p',
        text:
          'Mahşer sahneleri insanın kalbini uyandırır. Cennet tasvirleri ümit verir. Cehennem uyarısı insanı gafletten çıkarır.',
      },
      {
        type: 'p',
        text:
          'Fakat ahireti anlatırken sadece korkutmak değil, aynı zamanda kurtuluş yolunu da göstermek gerekir.',
      },
    ],
  },
  {
    no: 4,
    title: 'Risalet: Peygambersiz Yol Bulunmaz',
    blocks: [
      { type: 'p', text: 'İnsan şöyle sorabilir:' },
      { type: 'quote', text: '“Peki bunları söylüyorsun da nasıl kurtulacağız?”' },
      { type: 'p', text: 'Cevap şudur:' },
      {
        type: 'p',
        text:
          'Allah bizi başıboş bırakmamıştır. Peygamberler göndermiştir. Son rehber olarak da Peygamber Efendimiz ﷺ’i göndermiştir.',
      },
      {
        type: 'p',
        text:
          'Mutluluk, izzet, huzur ve kurtuluş isteyen kimse, Allah’ın gönderdiği rehbere tabi olmalıdır.',
      },
      {
        type: 'quote',
        text:
          '“Sen mutluluk mu istiyorsun?\nSen izzet mi istiyorsun?\nSen dünya ve ahirette kurtuluş mu istiyorsun?\nO hâlde Allah’ın dinine yönel.”',
      },
      {
        type: 'p',
        text:
          'Din hayattan kopuk değildir. Din sadece camide kalan bir bilgi değildir. Din eve, işe, aileye, ahlaka, ticarete, komşuluğa, gençliğe ve günlük hayata girmelidir.',
      },
    ],
  },
  {
    no: 5,
    title: 'Zimmet: İnsanın Sorumluluğu',
    blocks: [
      { type: 'p', text: 'İnsan Allah’a karşı sorumludur. Bu nimetlerin hesabı vardır.' },
      {
        type: 'list',
        items: [
          'Akıl nimettir.',
          'Ömür nimettir.',
          'Mal nimettir.',
          'Beden nimettir.',
          'İman nimeti ise en büyük nimettir.',
        ],
      },
      { type: 'p', text: 'İnsan bu nimetleri nerede kullandığını düşünmelidir.' },
      { type: 'p', text: 'Burada şöyle sorulabilir:' },
      { type: 'quote', text: '“Bu din benim hayatıma nasıl gelecek?”' },
      { type: 'p', text: 'Cevap:' },
      { type: 'p', text: 'Din, sadece bilmekle değil, yaşamakla hayata gelir.' },
      { type: 'list', items: ['İman, amel ister.', 'Muhabbet, fedakârlık ister.', 'Dava, gayret ister.'] },
    ],
  },
  {
    no: 6,
    title: 'Davet ve Sefer: Canla Malla Gayret',
    blocks: [
      {
        type: 'p',
        text:
          'İman eden insan sadece kendisiyle yetinmez. Başkalarının da kurtuluşu için dertlenir.',
      },
      { type: 'p', text: 'Bu sebeple davet çalışmasında insan teşvik edilmelidir:' },
      {
        type: 'list',
        items: [
          'Canıyla gayret etmeye,',
          'Malıyla destek olmaya,',
          'Vaktiyle hizmet etmeye,',
          'İnsanların ayağına gitmeye,',
          'Tebliğ için sefere çıkmaya.',
        ],
      },
      { type: 'p', text: 'Çünkü din hizmeti emek ister.' },
      { type: 'p', text: 'Burada çok güzel bir misal kullanılabilir:' },
      { type: 'quote', text: '“Sütü sağarsın ama kaba sağmazsan toprağa sağmış olursun.”' },
      {
        type: 'p',
        text: 'Yani emek vardır ama usul yoksa, niyet yoksa, hedef yoksa, o emek zayi olabilir.',
      },
      {
        type: 'p',
        text:
          'Onun için tebliğde hem giden kişinin niyeti olmalı hem de gidilen kişide bir niyet uyandırılmalıdır.',
      },
      {
        type: 'p',
        text:
          'Sadece anlatmak yetmez; insanın kalbinde bir yöneliş, bir arayış, bir adım atma arzusu oluşturulmalıdır.',
      },
    ],
  },
];

export const dawahSpeech = {
  title: 'Kısa Konuşma Metni',
  opening: 'Aziz kardeşim,',
  paragraphs: [
    'İnsan bu dünyaya boşuna gelmedi. Bu kâinat sahipsiz değil. Güneşin doğuşunda, yağmurun inişinde, toprağın dirilişinde, insanın yaratılışında Rabbimizin kudreti var.',
    'Allah birdir. Her şeyi yaratan, yaşatan, rızık veren, bilen, gören ve işiten O’dur.',
    'Bizim en büyük vazifemiz Rabbimizi tanımaktır. Allah’ı tanıyan insan kendini de tanır. Allah’ı bilen insan niçin yaşadığını da bilir.',
    'Fakat hayat sadece bu dünyadan ibaret değildir. Ölüm var. Kabir var. Mahşer var. Hesap var. Cennet var. Cehennem var.',
    'Peki insan nasıl kurtulur?',
    'Allah bizi başıboş bırakmadı. Peygamberler gönderdi. Son peygamber olarak Efendimiz Muhammed Mustafa ﷺ’i gönderdi.',
    'Kim izzet istiyorsa Allah’ın dinine sarılmalı. Kim huzur istiyorsa Rabbine yönelmeli. Kim kurtuluş istiyorsa Peygamberimizin yoluna girmeli.',
    'Bu din hayatımıza girmeli. Evimize, işimize, ahlakımıza, dilimize, kalbimize girmeli.',
    'Ve bu iman sadece bizde kalmamalı. Başka gönüllere de ulaşmalı.',
    'Çünkü davetle iman kuvvetlenir. Muhabbetle kalbe yerleşir. Gayretle hayata dönüşür.',
    'O hâlde canımızla, malımızla, vaktimizle Allah yolunda hizmete niyet edelim. Gidelim, anlatalım, sevdirelim, davet edelim.',
    'Çünkü sütü sağarsın ama kaba sağmazsan toprağa sağmış olursun. Emek zayi olmasın. Niyet sağlam olsun. Usul güzel olsun. Hedef Allah’ın rızası olsun.',
  ],
  dua:
    'Rabbimiz bizi kendisini tanıyan, seven, dinine hizmet eden ve ahiret yurdunda kurtuluşa eren kullarından eylesin. Âmin.',
};
