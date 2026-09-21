import ownStyles from './styles.scss';

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

  const { className, project, styles, ...divAttributes } = props;
  const { longDescription, surface, quote, text, info } = project;
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
    </div>
  );
});

export const ProjectCoverText = Screen_Project_CoverText;
