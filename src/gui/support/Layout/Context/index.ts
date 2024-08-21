import { Scroll } from './Scroll';

/** Layout context. */
export const Context = Object.assign(React.createContext<Value>({ scroll: new Scroll() }), { Scroll });
