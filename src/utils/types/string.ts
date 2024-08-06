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
