import type { _ } from '@/utils/types';
import type { onFontLoad as My } from '.';

export type Memo = {
  font: My.Font;
  fontFace: My.Font.Face;
  init: { [Type in Exclude<FontFaceLoadStatus, 'unloaded'>]: true | null };
  ret: My.ReturnType;
  setStatus?: (status: My.Font.Status) => void;
  state: _.Resolve<
    { [Type in Exclude<FontFaceLoadStatus, 'unloaded'>]: FontFaceSet | null } & {
      [Type in My.Font.Status.Additional | 'unloaded']: true | null;
    }
  >;
};

declare module '.' {
  namespace onFontLoad {
    type Callback = (fontFace: Font.Face, event?: Event) => void;

    type Font = _.Resolve<{ [Prop in Font.Prop]?: string } & { family: string }>;

    namespace Font {
      namespace Event {
        type Type = Status | 'resolved' | 'unresolved' | 'all' | '*';

        namespace Type {
          type Arg = Type | readonly Type[];
        }
      }

      type Face = FontFace | _.Resolve<Font & { status: Status.Additional }>;

      type Initializer = Font | (() => Font);

      type Prop = _.Resolve<(typeof fontProps)[number]>;

      namespace Status {
        type Additional = _.Resolve<Exclude<Status, FontFaceLoadStatus>>;
      }
    }

    type ReturnType = readonly [fontFace: My.Font.Face, resolved: boolean];
  }
}
