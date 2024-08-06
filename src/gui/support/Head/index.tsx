import { Context } from './Context';

/** Document header. */
export const Support_Head: React.FC<Props> = ({ children, lang, status }) => {
  const context = React.useContext(Context);
  context.children = [context.children, children];
  context.lang = lang ?? context.lang;
  context.status = status ?? context.status;
  return null;
};

/** Document header. */
export const Head = Object.assign(Support_Head, { Context });
