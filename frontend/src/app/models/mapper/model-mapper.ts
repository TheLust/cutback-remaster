import { Profile } from "../response/profile";
import { Language, Preferences, Theme } from "../response/preferences";
import { Gender } from "../response/gender";

export function toProfile(response: any): Profile {
  const profile: Profile = response as Profile;

  let preferences: Preferences = profile.preferences as Preferences;
  preferences = {
    language: Language[preferences.language.toString() as keyof typeof Language],
    theme: Theme[preferences.theme.toString() as keyof typeof Theme]
  }
  profile.preferences = preferences;
  profile.gender = Gender[profile.gender as keyof typeof Gender];

  return profile;
}
