import { GTM } from '@/gui/hooks/gtm';
import { localStorage, duration } from '@/gui/utils/misc/localStorage';
import { Link } from '@/gui/atoms/Link';
import { Mail } from '@/gui/atoms/Mail';
import { Phone } from '@/gui/atoms/Phone';
import { useSingleFetch } from '@/gui/hooks/useSingleFetch';
import { useTimeoutPromiseManager } from '@/gui/hooks/useTimeoutPromiseManager';
import { route } from '@/gui/screens/route';
import { useTranslation } from '@/utils/i18n';
import { safeConsole } from '@/utils/safeConsole';
import { _ } from '@/utils/types';
import { fields } from './fields';

import appStyles from '@/gui/styles.scss';
import styles from './styles.scss';

const access_key = conf.web3formsAccessKey;
const namespace = 'Screens/ContactUs';
const formStorage = new localStorage.Item(namespace, duration.day);

export const Screen_ContactUs: React.FC = () => {
  const me = React.useComponent(() => ({
    ref: {
      form: React.createRef<HTMLFormElement>(),
      firstname: React.createRef<HTMLInputElement>(),
      lastname: React.createRef<HTMLInputElement>(),
      phone: React.createRef<HTMLInputElement>(),
      email: React.createRef<HTMLInputElement>(),
      message: React.createRef<HTMLTextAreaElement>(),
    },
    state: {
      formPrompt: (access_key ? 'privacy' : 'availability-error') as FormPrompt,
      formStatus: 'ready' as 'ready' | 'sending' | 'sent',
    },
    formData: {
      firstname: '',
      lastname: '',
      phone: '',
      email: '',
      message: '',
    },
    formTimer: {} as NodeJS.Timeout,
  }));

  const [translate] = useTranslation(namespace);
  const [sendForm, isAbort] = useSingleFetch({
    url: 'https://api.web3forms.com/submit',
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
    timeout: 6e4,
  });
  const pushContactFormOutcome = GTM.usePushContactFormOutcome();
  const sendFormTimeoutManager = useTimeoutPromiseManager(5e3);
  React.useEffect(loadForm, []);

  function checkForm(event: React.FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    if (me.state.formStatus === 'ready') {
      resetForm();
      for (const { name } of Object.values(fields)) {
        checkInput(name)(me.ref[name].current);
      }
      if (getErrors()?.length) {
        me.updateState({ formPrompt: 'input-error' });
      } else {
        saveForm();
        void submitForm();
      }
    }
  }

  function checkInput(name: FieldName): Checker {
    const { assert, format } = fields[name];
    function listener(event?: Checker.Argument): boolean | null {
      const input = HTMLElement && (event instanceof HTMLElement ? event : event?.currentTarget);
      const type = HTMLElement && (event instanceof HTMLElement ? null : event?.type);
      if (input) {
        const value = format(input.value);
        if (type !== 'input') {
          input.value = value;
          saveForm();
        }
        me.formData[name] = value;
        const valid = assert(input.value);
        input.className = valid ? '' : styles.formError;
        return valid;
      } else {
        return null;
      }
    }
    return listener;
  }

  function focusNextEmptyInput(event: React.ChangeEvent<HTMLInputElement>): void {
    const form = me.ref.form.current;
    if (form && InputEvent && HTMLInputElement && HTMLTextAreaElement && !(event.nativeEvent instanceof InputEvent)) {
      let nextInputs = false;
      for (const input of form.querySelectorAll('input,textarea')) {
        if (input instanceof HTMLInputElement || input instanceof HTMLTextAreaElement) {
          if (nextInputs) {
            if (input.type === 'submit' || !input.value) {
              input.focus();
              break;
            }
          } else if (input === event.target) {
            nextInputs = true;
          }
        }
      }
    }
  }

  function getErrors(): NodeListOf<Element> | null {
    const selector = `input.${styles.formError},textarea.${styles.formError}`;
    return me.ref.form.current?.querySelectorAll(selector) ?? null;
  }

  function loadForm(): typeof saveForm {
    const data = formStorage.get();
    if (_.isObject(data)) {
      for (const { name } of Object.values(fields)) {
        const input = me.ref[name].current;
        if (input) {
          const value = data[name];
          const strValue = typeof value === 'string' ? value.slice(0, input.maxLength) : '';
          input.value = strValue;
          me.formData[name] = strValue;
        }
      }
    }
    return saveForm;
  }

  function renderInput(name: FieldName, autoComplete?: string): React.Node {
    const checkField = checkInput(name);
    const props = {
      autoComplete,
      disabled,
      maxLength: name === 'message' ? 2000 : 255,
      onBlur: checkField,
      onInput: checkField,
      placeholder: translate(`${name}-label`),
    };
    if (name === 'message') {
      return <textarea ref={me.ref[name]} {...props} />;
    } else {
      const type = autoComplete === 'email' || autoComplete === 'tel' ? autoComplete : 'text';
      return <input type={type} ref={me.ref[name]} onChange={focusNextEmptyInput} {...props} />;
    }
  }

  function resetForm(): void {
    getErrors()?.forEach((input) => {
      input.className = '';
    });
  }

  function saveForm(): void {
    if (me.state.formStatus !== 'sent') {
      formStorage.set(me.formData);
    }
  }

  async function submitForm(): Promise<void> {
    me.updateState({ formPrompt: 'send-in-progress', formStatus: 'sending' });
    const { firstname, lastname, phone, email, message } = me.formData;
    const name = `${firstname} ${lastname}`;
    const subject = `Contact form: ${name}`;
    try {
      void sendFormTimeoutManager.restart()?.then(() => {
        me.updateState({ formPrompt: 'timeout-warning' });
      });
      const response = await sendForm({
        body: JSON.stringify({ access_key, subject, name, phone, email, message }),
      });
      if (response.status === 200) {
        pushContactFormOutcome('Succès', 'Web3Forms a confirmé le bon traitement du formulaire');
        me.updateState({ formPrompt: 'send-success', formStatus: 'sent' });
        formStorage.remove();
      } else {
        pushContactFormOutcome('Echec', `Web3Forms a signalé une erreur de type ${response.status}`);
        me.updateState({ formPrompt: 'generic-error', formStatus: 'ready' });
        const content: unknown = (await response.json()) || (await response.text());
        safeConsole.warn(`Contact form error ${response.status}:`, content);
      }
    } catch (error) {
      if (error === isAbort.TIMEOUT) {
        pushContactFormOutcome('Echec', "Le formulaire n'a pas pu être envoyé à temps");
      } else {
        const message = "Une erreur inattendue s'est produite lors de l'envoi du formulaire";
        pushContactFormOutcome('Echec', message);
      }
      me.updateState({ formPrompt: 'generic-error', formStatus: 'ready' });
      safeConsole.warn(`Contact form error:`, error);
    } finally {
      sendFormTimeoutManager.abort();
    }
  }

  const formError = /-error$/.test(me.state.formPrompt);
  const submitLabel = me.state.formStatus === 'ready' ? 'send' : me.state.formStatus;
  const disabled = me.state.formStatus !== 'ready';

  return (
    <article classNames={[appStyles.darkTheme, styles.article]}>
      <div className={styles.content}>
        <div className={styles.infoContainer}>
          <div className={styles.info}>
            <div className={styles.email}>
              <Mail address="contact@claireduchamp.ch" />
            </div>
            <div className={styles.phone}>
              <Phone number="+41 78 926 94 64" />
            </div>
            <div className={styles.address}>
              <Link className={styles.addressLink} to="https://maps.app.goo.gl/b26oyumKkiTRXwmQA">
                <span className={styles.addressLine}>Claire Duchamp Architecte</span>
                <span className={styles.addressLine}>Rue de la Clergère 2</span>
                <span className={styles.addressLine}>CH-1800 Vevey</span>
              </Link>
            </div>
          </div>
        </div>
        <form ref={me.ref.form} className={styles.form} onSubmit={checkForm}>
          {renderInput('firstname', 'given-name')}
          {renderInput('lastname', 'family-name')}
          {renderInput('email', 'email')}
          {renderInput('phone', 'tel')}
          {renderInput('message')}
          <div classNames={[styles.promptBox, formError && styles.formError]}>{translate(me.state.formPrompt)}</div>
          <div className={styles.submitContainer}>
            {translate(submitLabel)}
            <div classNames={[styles.submitAnimation, me.state.formStatus === 'sending' && styles.sending]} />
            <input type="submit" disabled={disabled} value={translate(submitLabel)} />
          </div>
        </form>
      </div>
    </article>
  );
};

export const ContactUs = Object.assign(Screen_ContactUs, {
  route: route.fromLocales(namespace),
} as const);
