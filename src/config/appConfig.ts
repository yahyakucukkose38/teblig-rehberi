// ============================================================================
// UYGULAMA YAPILANDIRMASI
// ----------------------------------------------------------------------------
// Uygulama adını ve alternatiflerini buradan kolayca değiştirebilirsiniz.
// APP_NAME değerini değiştirmek, paylaşım imzası gibi yerleri günceller.
// (Mağaza adı için app.json > expo.name değerini de güncellemeyi unutmayın.)
// ============================================================================

/** Aktif uygulama adı. */
export const APP_NAME = 'Tebliğ Rehberi';

/** Hızlıca geçiş yapılabilecek alternatif isimler. */
export const ALTERNATIVE_NAMES = [
  'Davet Rehberi',
  'Hikmetle Tebliğ',
  'İslamı Anlat',
  'Guide to Dawah',
] as const;

/** Sürüm bilgisi (ayarlar ekranında gösterilir). */
export const APP_VERSION = '1.0.0';

/**
 * İçerik yönetişimi bayrağı.
 * true yapıldığında YALNIZCA ehil bir kişi tarafından onaylanmış
 * (review.approved === true) konular kullanıcıya gösterilir.
 * Varsayılan false — onay süreci tamamlanana dek tüm içerik görünür kalır,
 * böylece bayrağı açmak mevcut içeriği aniden gizlemez.
 */
export const REQUIRE_CONTENT_APPROVAL = false;
