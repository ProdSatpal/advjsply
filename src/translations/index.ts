
import enTranslations from './en';
import hiTranslations from './hi';
import mrTranslations from './mr';

export type Language = 'en' | 'hi' | 'mr';
export type Translations = Record<string, string>;

export const translations: Record<Language, Translations> = {
  en: enTranslations,
  hi: hiTranslations,
  mr: mrTranslations
};

export default translations;
