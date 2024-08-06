/** Create <Head> context. */
export const createHeadContext = (location: Location, isMobile: boolean): Value => ({ location, isMobile });

/** <Head> context. */
export const Support_Head_Context = React.createContext({} as Value);

/** <Head> context. */
export const Context = Object.assign(Support_Head_Context, { create: createHeadContext });
