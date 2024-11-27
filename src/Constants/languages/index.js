import LocalizedStrings from 'react-native-localization';
import en from './en';
import ta from './ta';

let strings = new LocalizedStrings({
  en: en,
  ta: ta,

});
export const changeLaguage = (languageKey) => {
  strings.setLanguage(languageKey);
};
export default strings;