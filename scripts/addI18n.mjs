// Yeni i18n anahtarlarını (kart + bildirim) 5 dile güvenli biçimde ekler.
// Çalıştırma: node scripts/addI18n.mjs   (tek seferlik yardımcı)
import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const DIR = join(process.cwd(), 'src', 'i18n');

const ADD = {
  tr: {
    card: { title: 'Paylaşım Kartı', shareText: 'Metni paylaş', shareImage: 'Görüntü olarak paylaş', screenshotHint: 'İpucu: Kartın ekran görüntüsünü alıp paylaşabilirsiniz.', open: 'Kart oluştur' },
    notif: { title: 'Günün Tebliğ Notu 🌙', body: 'Bugünün kısa ilkesine göz at ve güzelce paylaş.' },
    settings: { notificationTime: 'Hatırlatma saati', permissionNeeded: 'Bildirim izni verilmedi. Lütfen telefon ayarlarından izin verin.' },
  },
  en: {
    card: { title: 'Share Card', shareText: 'Share text', shareImage: 'Share as image', screenshotHint: 'Tip: You can screenshot this card and share it.', open: 'Create card' },
    notif: { title: 'Note of the Day 🌙', body: "Take a look at today's short principle and share it kindly." },
    settings: { notificationTime: 'Reminder time', permissionNeeded: 'Notification permission was denied. Please enable it in your phone settings.' },
  },
  fr: {
    card: { title: 'Carte de partage', shareText: 'Partager le texte', shareImage: 'Partager en image', screenshotHint: "Astuce : faites une capture d'écran de cette carte pour la partager.", open: 'Créer une carte' },
    notif: { title: 'Note du jour 🌙', body: 'Découvre le court principe du jour et partage-le avec bienveillance.' },
    settings: { notificationTime: 'Heure du rappel', permissionNeeded: "L'autorisation de notification a été refusée. Veuillez l'activer dans les réglages du téléphone." },
  },
  'pt-BR': {
    card: { title: 'Cartão de compartilhamento', shareText: 'Compartilhar texto', shareImage: 'Compartilhar como imagem', screenshotHint: 'Dica: tire um print deste cartão e compartilhe.', open: 'Criar cartão' },
    notif: { title: 'Nota do dia 🌙', body: 'Veja o breve princípio de hoje e compartilhe com gentileza.' },
    settings: { notificationTime: 'Horário do lembrete', permissionNeeded: 'A permissão de notificação foi negada. Ative-a nas configurações do telefone.' },
  },
  de: {
    card: { title: 'Teilen-Karte', shareText: 'Text teilen', shareImage: 'Als Bild teilen', screenshotHint: 'Tipp: Mach einen Screenshot dieser Karte und teile ihn.', open: 'Karte erstellen' },
    notif: { title: 'Notiz des Tages 🌙', body: 'Sieh dir das kurze Prinzip des Tages an und teile es freundlich.' },
    settings: { notificationTime: 'Erinnerungszeit', permissionNeeded: 'Die Benachrichtigungsberechtigung wurde verweigert. Bitte aktiviere sie in den Telefoneinstellungen.' },
  },
};

function deepMerge(target, src) {
  for (const k of Object.keys(src)) {
    if (src[k] && typeof src[k] === 'object' && !Array.isArray(src[k])) {
      target[k] = deepMerge(target[k] || {}, src[k]);
    } else {
      target[k] = src[k];
    }
  }
  return target;
}

for (const lang of Object.keys(ADD)) {
  const file = join(DIR, lang + '.json');
  const obj = JSON.parse(readFileSync(file, 'utf8'));
  deepMerge(obj, ADD[lang]);
  writeFileSync(file, JSON.stringify(obj, null, 2) + '\n', 'utf8');
  console.log('guncellendi: ' + lang + '.json');
}
