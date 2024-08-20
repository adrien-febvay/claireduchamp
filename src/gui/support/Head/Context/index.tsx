/** Create <Head> context. */
export const createHeadContext = (location: Location, mobile: boolean, responsive: boolean): Value => ({
  location,
  device: { desktop: !mobile, mobile, responsive },
});

/** <Head> context. */
export const Support_Head_Context = React.createContext({} as Value);

/** <Head> context. */
export const Context = Object.assign(Support_Head_Context, { create: createHeadContext });
