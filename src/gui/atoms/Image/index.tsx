import useStyles from 'isomorphic-style-loader/useStyles';

import ownStyles from './styles.scss';

export const Atom_Image: React.FC<Props> = (props) => {
  useStyles(ownStyles);

  const { className, fadeIn, spanAttrs, styles, ...imgProps } = props;
  const { onError, onLoad, ...imgAttrs } = imgProps;
  const [error, setError] = React.useState(false);
  const [loaded, setLoaded] = React.useState(false);
  const allStyles = React.extendStyles(ownStyles, styles);

  return (
    <span
      classNames={[
        allStyles.root,
        error && allStyles.error,
        fadeIn !== false && allStyles.fadeIn,
        loaded ? allStyles.loaded : allStyles.loading,
        className,
      ]}
      {...spanAttrs}
    >
      <img
        classNames={allStyles.image}
        onError={(event): void => {
          setError(true);
          return onError?.(event);
        }}
        onLoad={(event): void => {
          setLoaded(true);
          return onLoad?.(event);
        }}
        {...imgAttrs}
      />
    </span>
  );
};

export const Image = Atom_Image;
