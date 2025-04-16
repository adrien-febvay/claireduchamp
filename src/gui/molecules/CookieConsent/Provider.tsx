import Cookies from 'js-cookie';
import { CookieConsentContext as Context } from './Context';

const COOKIE_CONSENT_KEY = 'cookie-consent';

function getUserChoice() {
  const rawUserChoice = Cookies.get(COOKIE_CONSENT_KEY);
  const userChoice = rawUserChoice === 'accept' || rawUserChoice === 'deny' ? rawUserChoice : undefined;
  return userChoice;
}

export function CookieConsentProvider(props: Props) {
  const [hidden, setHidden] = React.useState(false);
  const [openDialog, setOpenDialog] = React.useState<() => void>();
  const [userChoice, setUserChoice] = React.useState<UserChoice | undefined>(getUserChoice());

  function setAndSaveUserChoice(value: UserChoice) {
    Cookies.set(COOKIE_CONSENT_KEY, value);
    setUserChoice(value);
  }

  return (
    <Context.Provider value={[hidden, setHidden, openDialog, setOpenDialog, userChoice, setAndSaveUserChoice]}>
      {props.children}
    </Context.Provider>
  );
}
