// ============================================================================
// PAYLAŞMA YARDIMCILARI (React Native Share API)
// ----------------------------------------------------------------------------
// Her konudan KISA ve ÖZGÜN bir "paylaşılabilir tebliğ mesajı" üretilir.
// Mesajın altına nazik bir imza ve kaynak notu eklenir.
// ============================================================================

import { Share } from 'react-native';
import i18n from '../i18n';
import { APP_NAME } from '../config/appConfig';
import type { LanguageCode, Topic } from '../types/content';
import { getTopicContent } from './localize';

const APP_SIGNATURE = APP_NAME;

/** Paylaşılacak metni biçimlendirir (başlık + kısa mesaj + nazik davet + imza). */
export function buildShareMessage(title: string, body: string): string {
  const cta = i18n.t('share.cta');
  return `${title}\n\n${body}\n\n${cta}\n\n— ${APP_SIGNATURE}`;
}

/** Bir konuyu sistem paylaşım sayfasıyla paylaşır. */
export async function shareTopic(topic: Topic, lang: LanguageCode): Promise<void> {
  const c = getTopicContent(topic, lang);
  const message = buildShareMessage(c.title, c.shareText);
  try {
    await Share.share({ message, title: c.title });
  } catch {
    // Kullanıcı paylaşmayı iptal ettiyse sessizce geç.
  }
}

/** Serbest bir metni (ör. günün notu) paylaşır. */
export async function shareText(title: string, body: string): Promise<void> {
  const message = buildShareMessage(title, body);
  try {
    await Share.share({ message, title });
  } catch {
    // sessizce geç
  }
}
