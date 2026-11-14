import { Trans, useTranslation } from 'react-i18next';
import { Link, screens } from '@/gui/atoms/Link';

import ownStyles from './styles.scss';

const namespace = 'Screens/Project/CoverText';

export const Screen_Project_CoverText = React.forwardRef<Handle, Props>((props, ref) => {
  const me = React.useComponent(
    () => ({
      rootRef: React.createRef<HTMLDivElement>(),
    }),
    {
      props,
    },
  );

  React.useImperativeHandle(ref, () => me);

  const [translate] = useTranslation(namespace);

  const { children, className, project, styles, ...divAttributes } = props;
  const { longDescription, surface, quote, text, info, callToAction } = project;
  const allStyles = React.extendStyles(ownStyles, styles);

  return (
    <div classNames={[allStyles.coverText, className]} ref={me.rootRef} {...divAttributes}>
      <div className={allStyles.coverBlock}>
        {longDescription && <p>{longDescription}</p>}
        {surface && <p>{surface}</p>}
      </div>
      {quote?.text && (
        <div className={allStyles.quote}>
          <i>{quote.text}</i>
          {quote.author && <i>—&nbsp;{quote.author}</i>}
        </div>
      )}
      <div classNames={[allStyles.coverBlock, allStyles.textBlock]}>
        {text?.split('\n').map((paragraph, index) => <p key={index}>{paragraph}</p>)}
      </div>
      {children}
      {info?.flat().length && (
        <div className={allStyles.info}>
          {info.map((infoColumn, columnIndex) => (
            <div key={columnIndex} className={allStyles.infoColumn}>
              {infoColumn.map((infoCell, rowIndex) => (
                <div key={rowIndex} className={allStyles.infoCell}>
                  {infoCell}
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
      {callToAction && (
        <Link to={screens.ContactUs} classNames={[allStyles.callToAction]}>
          <div>
            <Trans t={translate} i18nKey="contact-and-order">
              <span className={allStyles.noWrap} />
            </Trans>
          </div>
        </Link>
      )}
    </div>
  );
});

export const ProjectCoverText = Screen_Project_CoverText;
