// eslint-disable-next-line @typescript-eslint/no-unused-vars
import type { _ } from '.';

declare module '.' {
  namespace _ {
    namespace If {
      type Chars<Char extends string, Input, Then, Else = never> = Input extends Char
        ? Then
        : Input extends `${Char}${infer Rest}`
          ? Chars<Char, Rest, Then, Else>
          : Else;
    }

    type Digit = '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9';

    type Letter = Letter.Upcase | Letter.Lowcase;

    namespace Letter {
      // eslint-disable-next-line prettier/prettier
      type Lowcase = 'a' | 'b' | 'c' | 'd' | 'e' | 'f' | 'g' | 'h' | 'i' | 'j' | 'k' | 'l' | 'm' | 'n' | 'o' | 'p' | 'q' | 'r' | 's' | 't' | 'u' | 'v' | 'w' | 'x' | 'y' | 'z';

      type Upcase = Uppercase<Lowcase>;
    }

    namespace If {
      type Letters<Input, Then, Else = never> = If.Chars<Letter, Input, Then, Else>;

      namespace Letters {
        type Lowcase<Input, Then, Else = never> = If.Chars<Letter.Lowcase, Input, Then, Else>;

        type Upcase<Input, Then, Else = never> = If.Chars<Letter.Upcase, Input, Then, Else>;
      }
    }

    /** Trims the left side of `Input` string type. */
    type LTrim<Input> = Input extends `${SpaceLike}${infer Trimmed}` ? LTrim<Trimmed> | Exclude<Input, string> : Input;

    /** Trims the left side of properties of an `Input` type. */
    namespace LTrim {
      /** Trims the left side of properties of an `Input` type. */
      namespace Map {
        /** Deep trims the left side of properties of an `Input` type. */
        type Deep<Input> = { [Key in keyof Input]: _.Resolve<LTrim<Deep<Input[Key]>>> } | Exclude<Input, object>;

        /** Shallow trims the left side of properties of an `Input` type. */
        type Shallow<Input> = { [Key in keyof Input]: _.Resolve<LTrim<Input[Key]>> } | Exclude<Input, object>;
      }
    }

    /** Trims the right side of `Input` string type. */
    type RTrim<Input> = Input extends `${infer Trimmed}${SpaceLike}` ? RTrim<Trimmed> | Exclude<Input, string> : Input;

    /** Trims the right side of properties of an `Input` type. */
    namespace RTrim {
      /** Trims the right side of properties of an `Input` type. */
      namespace Map {
        /** Deep trims the right side of properties of an `Input` type. */
        type Deep<Input> = { [Key in keyof Input]: _.Resolve<RTrim<Deep<Input[Key]>>> } | Exclude<Input, object>;

        /** Shallow trims the right side of properties of an `Input` type. */
        type Shallow<Input> = { [Key in keyof Input]: _.Resolve<RTrim<Input[Key]>> } | Exclude<Input, object>;
      }
    }

    /** Space-like characters. */
    type SpaceLike = ' ' | '\t' | '\r' | '\n';

    /** Trims the `Input` string type. */
    type Trim<Input> = LTrim<RTrim<Input>>;

    /** Trims the side of properties of an `Input` type. */
    namespace Trim {
      /** Trims the side of properties of an `Input` type. */
      namespace Map {
        /** Deep trims the properties of an `Input` type. */
        type Deep<Input> = { [Key in keyof Input]: _.Resolve<Trim<Deep<Input[Key]>>> } | Exclude<Input, object>;

        /** Shallow trims the properties of an `Input` type. */
        type Shallow<Input> = { [Key in keyof Input]: _.Resolve<Trim<Input[Key]>> } | Exclude<Input, object>;
      }
    }

    /** Splits an `Input` string using a `Separator`.  */
    namespace Split {
      /** Splits an `Input` string using a `Separator`.  */
      namespace Into {
        /** Splits an `Input`string into an array  using a `Separator`.  */
        type Array<Input, Separator extends string, Output extends string[] = []> =
          | Exclude<Input, string>
          | (string extends Input
              ? [...Output, string]
              : Extract<Input, string> extends never
                ? Output
                : Input extends `${infer Chunk}${Separator}${infer Rest}`
                  ? Array<Rest, Separator, [...Output, Chunk]>
                  : Exclude<[...Output, Extract<Input, string>], [never]>); // Exclude [never] to avoid weird TS behaviour

        /** Splits an `Input` into an union string using a `Separator`.  */
        type Union<Input, Separator extends string, Output extends string = never> =
          | Exclude<Input, string>
          | (string extends Input
              ? string
              : Extract<Input, string> extends `${infer Chunk}${Separator}${infer Rest}`
                ? _.Resolve<Union<Rest, Separator, Output | Chunk>>
                : Output | Extract<Input, string>);
      }
    }

    type Word = Letter | Digit | '_';

    namespace Word {
      type Lowcase = Letter.Lowcase | Digit | '_';

      type Upcase = Letter.Upcase | Digit | '_';
    }

    namespace If {
      type Word<Input, Then, Else = never> = If.Chars<_.Word, Input, Then, Else>;

      namespace Word {
        type Lowcase<Input, Then, Else = never> = If.Chars<_.Word.Lowcase, Input, Then, Else>;

        type Upcase<Input, Then, Else = never> = If.Chars<_.Word.Upcase, Input, Then, Else>;
      }
    }
  }
}
