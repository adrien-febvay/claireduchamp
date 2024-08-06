import type * as Fields from './fields';

declare module '.' {
  type Checker = (arg0: Checker.Argument) => void;

  namespace Checker {
    type Argument = React.SyntheticEvent<Input> | Input | null;
  }

  type Data = { [Key in FieldName]: string };

  type FieldName = Fields.Name;

  type FormPrompt =
    | 'availability-error'
    | 'generic-error'
    | 'input-error'
    | 'privacy'
    | 'send-success'
    | 'send-in-progress'
    | 'timeout-warning';

  type Input = HTMLInputElement | HTMLTextAreaElement;
}

declare module './fields' {
  type Asserter = (value: string) => boolean;

  type Field = { assert: Asserter; format: Formatter };

  type Name = keyof typeof fields;

  type Formatter = (value: string) => string;
}
