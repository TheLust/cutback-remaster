export enum Language {
  EN = 'en',
  RO = 'ro'
}

export enum Theme {
  LIGHT = 'light',
  DARK = 'dark'
}

export interface Preferences {
  language: Language;
  theme: Theme;
}
