// ============================================================================
// KARTI GÖRÜNTÜ OLARAK PAYLAŞMA
// ----------------------------------------------------------------------------
// Bir View referansını PNG'ye çevirip (react-native-view-shot) expo-sharing ile
// paylaşır. Native modül yoksa (ör. Expo Go) zarifçe metin paylaşımına döner.
// ============================================================================

import { type RefObject } from 'react';
import { Share, type View } from 'react-native';

export type ShareResult = 'image' | 'text';

/**
 * Kartı görüntü olarak paylaşmayı dener; mümkün değilse metni paylaşır.
 * @returns paylaşımın 'image' mi 'text' olarak mı yapıldığı
 */
export async function shareCardImage(
  ref: RefObject<View | null>,
  fallbackText: string,
  dialogTitle: string,
): Promise<ShareResult> {
  try {
    // Lazy import: native modül yoksa hata burada yakalanır.
    const ViewShot = require('react-native-view-shot');
    const Sharing = require('expo-sharing');

    const uri = await ViewShot.captureRef(ref, { format: 'png', quality: 0.95 });
    if (uri && (await Sharing.isAvailableAsync())) {
      await Sharing.shareAsync(uri, { mimeType: 'image/png', dialogTitle });
      return 'image';
    }
  } catch {
    // view-shot/sharing yoksa veya başarısızsa metne düş.
  }

  try {
    await Share.share({ message: fallbackText });
  } catch {
    // kullanıcı iptal etti
  }
  return 'text';
}
