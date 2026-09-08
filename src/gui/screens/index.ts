import { AboutUs } from './AboutUs';
import { ContactUs } from './ContactUs';
import { Home } from './Home';
import { LegalNotice } from './LegalNotice';
import { NotFound } from './NotFound';
import { Press } from './Press';
import { PrivacyPolicy } from './PrivacyPolicy';
import { Project } from './Project';
import { Projects } from './Projects';
import { Services } from './Services';

const lexicon = {
  AboutUs,
  ContactUs,
  Home,
  LegalNotice,
  Press,
  PrivacyPolicy,
  Project,
  Projects,
  Services,
};

const list = Object.values(lexicon).concat(NotFound) as Screen[];

export const screens = Object.assign(list, lexicon);
