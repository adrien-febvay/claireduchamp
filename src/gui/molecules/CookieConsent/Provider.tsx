import Cookies from 'js-cookie';
import { useState } from 'react';
import { CookieConsentContext as Context } from './Context';

const COOKIE_CONSENT_KEY = 'cookie-consent';

function getUserChoice() {
  const rawUserChoice = Cookies.get(COOKIE_CONSENT_KEY);
  const userChoice = rawUserChoice === 'accept' || rawUserChoice === 'deny' ? rawUserChoice : undefined;
  return userChoice;
}

export function CookieConsentProvider(props: Props) {
  const [userChoice, setUserChoice] = useState<UserChoice | undefined>(getUserChoice());

  function accept() {
    Cookies.set(COOKIE_CONSENT_KEY, 'accept');
    setUserChoice('accept');
  }

  function deny() {
    Cookies.set(COOKIE_CONSENT_KEY, 'deny');
    setUserChoice('deny');
  }

  return <Context.Provider value={[userChoice, accept, deny]}>{props.children}</Context.Provider>;
}
