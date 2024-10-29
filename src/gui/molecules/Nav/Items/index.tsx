import { useTranslation } from '@/utils/i18n';
import { Link, screens } from '@/gui/atoms/Link';
import { useRouterContext } from '@/gui/hooks/useRouterContext';
import { Template } from './Template';
import { _ } from '@/utils/types';

const namespace = 'molecules/Nav';

const itemKeys = ['projects', 'services', 'about-us', 'contact-us'] as const;
const itemScreens = {
  'projects': 'Projects',
  'services': 'Services',
  'about-us': 'AboutUs',
  'contact-us': 'ContactUs',
} as const;

export function Molecule_Nav_Items(props: Props) {
  const { children, keys, ...divAttrs } = props;
  const routerContext = useRouterContext();
  const [translate] = useTranslation(namespace);

  const safeKeys = keys?.filter((key) => itemKeys.includes(key)) ?? itemKeys;
  const maxIndex = safeKeys.length - 1;

  const safeChildren = [..._.forceIterable(children)];
  const child = safeChildren[0];
  const element = React.isValidElement(child) ? child : null;
  const template = element?.type === Template ? element : null;
  const itemAttrs = template?.props as _.Nullish<object>;
  const otherChildrens = template ? safeChildren.slice(1) : safeChildren;

  return (
    <div {...divAttrs}>
      {safeKeys.map((key, index) => {
        const to = screens[itemScreens[key]];
        return (
          <div key={key} {...itemAttrs}>
            <Link to={to}>{routerContext.Screen === to ? <h1>{translate(key)}</h1> : translate(key)}</Link>
            {index === maxIndex && otherChildrens}
          </div>
        );
      })}
    </div>
  );
}

export const Items = Object.assign(Molecule_Nav_Items, { Template });
