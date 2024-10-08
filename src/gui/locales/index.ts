import { _ } from '@/utils/types';

import aboutCareerFr from './about-career-fr.md';
import aboutCareerEn from './about-career-en.md';
import aboutReferencesFr from './about-references-fr.md';
import aboutReferencesEn from './about-references-en.md';
import legalNoticeFr from './legal-notice-fr.md';
import legalNoticeEn from './legal-notice-en.md';
import privacyPolicyFr from './privacy-policy-fr.md';
import privacyPolicyEn from './privacy-policy-en.md';

import fr from './fr.json';
import en from './en.json';

/** Markdown translations. */
const md = {
  fr: {
    'Screens/AboutUs': { career: aboutCareerFr, references: aboutReferencesFr },
    'Screens/LegalNotice': { content: legalNoticeFr },
    'Screens/PrivacyPolicy': { content: privacyPolicyFr },
  },
  en: {
    'Screens/AboutUs': { career: aboutCareerEn, references: aboutReferencesEn },
    'Screens/LegalNotice': { content: legalNoticeEn },
    'Screens/PrivacyPolicy': { content: privacyPolicyEn },
  },
};

/** Translations. */
export const locales = merge({ fr, en }, md);

/** Deep merge two `Left` and `Right` types in the most simple manner. */
type Merge<Left, Right> = Left extends object
  ? Right extends object
    ? {
        [Key in keyof Left | keyof Right]: Key extends keyof Right
          ? Key extends keyof Left
            ? Merge<Left[Key], Right[Key]>
            : Right[Key]
          : Key extends keyof Left
            ? Left[Key]
            : never;
      }
    : Right
  : Right;

/**
 * Deep merge two objects.
 * @param left Object to merge into.
 * @param right Object to merge on the other.
 * @returns An object accordingly.
 */
function merge<Left extends object, Right extends object>(left: Left, right: Right): Merge<Left, Right>;

function merge(left: _.Dict, right: _.Dict): object {
  const merged = { ...left };
  for (const key in right) {
    const leftValue = left[key];
    const rightValue = right[key];
    merged[key] = _.isObject(leftValue) && _.isObject(rightValue) ? merge(leftValue, rightValue) : rightValue;
  }
  return merged;
}
