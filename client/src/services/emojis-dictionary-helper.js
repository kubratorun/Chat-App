import { fetchEmojis } from 'emojibase';

export const getEmojisDictionary = async () => {
  const emojis = await fetchEmojis('en', {
    shortcodes: ['emojibase', 'en/cldr']
  });

  let map = {};
  emojis.forEach((emoji) => {
    emoji.shortcodes.forEach((code) => {
      map[`:${code}:`] = emoji.emoji;
    });
  });

  return map;
};
