import type { EventEmitter } from 'events';

declare module '.' {
  namespace _ {
    namespace Event {
      type Emitter = Native.Emitter | Custom.Emitter;

      namespace Emitter {
        type Generic =
          | (Native.Emitter.Generic & Partial<Custom.Emitter.Generic>)
          | (Partial<Native.Emitter.Generic> & Custom.Emitter.Generic);
      }

      type Listener<Emitter, Type extends string> = Is.Custom.Emitter<
        Emitter,
        Custom.Listener<Emitter, Type>,
        Is.Native.Emitter<Emitter, Native.Listener<Emitter, Type>, Listener.Generic>
      >;

      namespace Listener {
        type Generic = (this: Emitter.Generic, ...args: any[]) => void;

        type Options = {
          /**
           * Sets when the listener will be invoked depdending on the event's `eventPhase` attribute value:
           * - If `true`, the listener will not be invoked when `{ eventPhase: 'BUBBLING_PHASE' }`
           * - If `false` or omitted, the listener will not be invoked when `{ eventPhase: 'CAPTURING_PHASE' }`
           * - Either way, the listener will be invoked when `{ eventPhase: 'AT_TARGET' }`
           */
          capture?: boolean;

          /**
           * When `true`, the listener will not cancel the event by invoking preventDefault().
           *
           * This is used to enable performance optimizations described in § 2.8 Observing event listeners.
           */
          passive?: boolean;

          /** When `true`, the listener will only be invoked once after which the event listener will be removed. */
          once?: boolean;

          /** If an `AbortSignal` is passed, then the event listener will be removed when signal is aborted. */
          signal?: AbortSignal;

          /** Setting specific to Firefox (Gecko). If true, the listener receives synthetic events distributed by web content. */
          wantsUntrusted?: boolean;
        };
      }

      type Type<Emitter> = _.Resolve<
        Is.Custom.Emitter<Emitter, Custom.Type<Emitter>, Is.Native.Emitter<Emitter, Native.Type<Emitter>, string>>
      >;

      namespace Types {
        // Splits event types.
        type Split<Input extends string> = _.Trim.Map.Shallow<_.Split.Into.Array<Input, ','>>;
      }

      namespace Is {
        namespace Custom {
          type Emitter<Emitter, Then, Else = never> = Emitter extends Event.Custom.Emitter
            ? Event.Custom.Declaration<Emitter> extends never
              ? Else
              : Then
            : Else;
        }

        namespace Native {
          type Emitter<Emitter, Then, Else = never> = Emitter extends Event.Native.Emitter
            ? Event.Native.Declaration<Emitter> extends never
              ? Else
              : Then
            : Else;
        }
      }

      namespace Custom {
        type Declaration<Emitter> = {
          [Name in keyof Maps]: Emitter extends Maps[Name][0]
            ? Maps[Name][0] extends Emitter
              ? Maps[Name]
              : never
            : never;
        }[keyof Maps];

        type Emitter = Maps[keyof Maps][0];

        namespace Emitter {
          interface Generic {
            on(type: string, listener: Listener.Generic, options?: Event.Listener.Options): void;
            off(type: string, listener: Listener.Generic, options?: Event.Listener.Options): void;
          }
        }

        type Listener<Emitter, Type extends string> = {
          [Index in keyof Types.Split<Type>]: (
            this: Emitter,
            ...args: Listener.Arguments<Emitter, Types.Split<Type>[Index] & string>
          ) => void;
        }[number];

        namespace Listener {
          type Arguments<Emitter, Type extends string> = string extends Type
            ? unknown[]
            : Type extends Custom.Type<Emitter>
              ? (Declaration<Emitter>[1] & { [Key in string]: never })[Type] extends never
                ? unknown[]
                : (Declaration<Emitter>[1] & { [Key in string]: never })[Type]
              : unknown[];

          type Generic = (this: Emitter.Generic, ...args: unknown[]) => void;
        }

        interface Maps {
          EventEmitter: [EventEmitter, { [Key in string]: unknown[] }];
        }

        type Type<Emitter> = _.Resolve<keyof Declaration<Emitter>[1]>;
      }

      namespace Native {
        type Declaration<Emitter> = {
          [Name in keyof Maps]: Emitter extends Maps[Name][0]
            ? Maps[Name][0] extends Emitter
              ? Maps[Name]
              : never
            : never;
        }[keyof Maps];

        type Emitter = Maps[keyof Maps][0];

        namespace Emitter {
          interface Generic {
            addEventListener(type: string, listener: Listener.Generic, options?: Event.Listener.Options): void;
            removeEventListener(type: string, listener: Listener.Generic, options?: Event.Listener.Options): void;
          }
        }

        type Listener<Emitter, Type extends string> = {
          [Index in keyof Types.Split<Type>]: (
            this: Emitter,
            event: Listener.Argument<Emitter, Types.Split<Type>[Index] & string>,
          ) => void;
        }[number];

        namespace Listener {
          type Argument<Emitter, Type extends string> = string extends Type
            ? Event
            : Type extends Native.Type<Emitter>
              ? (Declaration<Emitter>[1] & { [Key in string]: never })[Type]
              : Event;

          type Generic = (this: Emitter.Generic, event: Event) => void;
        }

        interface Maps {
          AbortSignal: [AbortSignal, AbortSignalEventMap];
          AbstractWorker: [AbstractWorker, AbstractWorkerEventMap];
          Animation: [Animation, AnimationEventMap];
          AudioScheduledSourceNode: [AudioScheduledSourceNode, AudioScheduledSourceNodeEventMap];
          AudioWorkletNode: [AudioWorkletNode, AudioWorkletNodeEventMap];
          BaseAudioContext: [BaseAudioContext, BaseAudioContextEventMap];
          BroadcastChannel: [BroadcastChannel, BroadcastChannelEventMap];
          Document: [Document, DocumentEventMap];
          Element: [Element, ElementEventMap];
          EventSource: [EventSource, EventSourceEventMap];
          FileReader: [FileReader, FileReaderEventMap];
          FontFaceSet: [FontFaceSet, FontFaceSetEventMap];
          GlobalEventHandlers: [GlobalEventHandlers, GlobalEventHandlersEventMap];
          HTMLBodyElement: [HTMLBodyElement, HTMLBodyElementEventMap];
          HTMLElement: [HTMLElement, HTMLElementEventMap];
          HTMLFrameSetElement: [HTMLFrameSetElement, HTMLFrameSetElementEventMap];
          HTMLMediaElement: [HTMLMediaElement, HTMLMediaElementEventMap];
          HTMLVideoElement: [HTMLVideoElement, HTMLVideoElementEventMap];
          IDBDatabase: [IDBDatabase, IDBDatabaseEventMap];
          IDBOpenDBRequest: [IDBOpenDBRequest, IDBOpenDBRequestEventMap];
          IDBRequest: [IDBRequest, IDBRequestEventMap];
          IDBTransaction: [IDBTransaction, IDBTransactionEventMap];
          MIDIAccess: [MIDIAccess, MIDIAccessEventMap];
          MIDIInput: [MIDIInput, MIDIInputEventMap];
          MIDIPort: [MIDIPort, MIDIPortEventMap];
          MathMLElement: [MathMLElement, MathMLElementEventMap];
          MediaDevices: [MediaDevices, MediaDevicesEventMap];
          MediaKeySession: [MediaKeySession, MediaKeySessionEventMap];
          MediaQueryList: [MediaQueryList, MediaQueryListEventMap];
          MediaRecorder: [MediaRecorder, MediaRecorderEventMap];
          MediaSource: [MediaSource, MediaSourceEventMap];
          MediaStream: [MediaStream, MediaStreamEventMap];
          MediaStreamTrack: [MediaStreamTrack, MediaStreamTrackEventMap];
          MessagePort: [MessagePort, MessagePortEventMap];
          Notification: [Notification, NotificationEventMap];
          OfflineAudioContext: [OfflineAudioContext, OfflineAudioContextEventMap];
          OffscreenCanvas: [OffscreenCanvas, OffscreenCanvasEventMap];
          PaymentRequest: [PaymentRequest, PaymentRequestEventMap];
          Performance: [Performance, PerformanceEventMap];
          PermissionStatus: [PermissionStatus, PermissionStatusEventMap];
          PictureInPictureWindow: [PictureInPictureWindow, PictureInPictureWindowEventMap];
          RTCDTMFSender: [RTCDTMFSender, RTCDTMFSenderEventMap];
          RTCDataChannel: [RTCDataChannel, RTCDataChannelEventMap];
          RTCDtlsTransport: [RTCDtlsTransport, RTCDtlsTransportEventMap];
          RTCIceTransport: [RTCIceTransport, RTCIceTransportEventMap];
          RTCPeerConnection: [RTCPeerConnection, RTCPeerConnectionEventMap];
          RTCSctpTransport: [RTCSctpTransport, RTCSctpTransportEventMap];
          RemotePlayback: [RemotePlayback, RemotePlaybackEventMap];
          SVGElement: [SVGElement, SVGElementEventMap];
          SVGSVGElement: [SVGSVGElement, SVGSVGElementEventMap];
          ScreenOrientation: [ScreenOrientation, ScreenOrientationEventMap];
          ScriptProcessorNode: [ScriptProcessorNode, ScriptProcessorNodeEventMap];
          ServiceWorker: [ServiceWorker, ServiceWorkerEventMap];
          ServiceWorkerContainer: [ServiceWorkerContainer, ServiceWorkerContainerEventMap];
          ServiceWorkerRegistration: [ServiceWorkerRegistration, ServiceWorkerRegistrationEventMap];
          ShadowRoot: [ShadowRoot, ShadowRootEventMap];
          SourceBuffer: [SourceBuffer, SourceBufferEventMap];
          SourceBufferList: [SourceBufferList, SourceBufferListEventMap];
          SpeechSynthesis: [SpeechSynthesis, SpeechSynthesisEventMap];
          SpeechSynthesisUtterance: [SpeechSynthesisUtterance, SpeechSynthesisUtteranceEventMap];
          TextTrack: [TextTrack, TextTrackEventMap];
          TextTrackCue: [TextTrackCue, TextTrackCueEventMap];
          TextTrackList: [TextTrackList, TextTrackListEventMap];
          VideoDecoder: [VideoDecoder, VideoDecoderEventMap];
          VideoEncoder: [VideoEncoder, VideoEncoderEventMap];
          VisualViewport: [VisualViewport, VisualViewportEventMap];
          WakeLockSentinel: [WakeLockSentinel, WakeLockSentinelEventMap];
          WebSocket: [WebSocket, WebSocketEventMap];
          Window: [Window, WindowEventMap];
          Worker: [Worker, WorkerEventMap];
          XMLHttpRequest: [XMLHttpRequest, XMLHttpRequestEventMap];
          XMLHttpRequestEventTarget: [XMLHttpRequestEventTarget, XMLHttpRequestEventTargetEventMap];
        }

        type Type<Emitter> = _.Resolve<keyof Declaration<Emitter>[1]>;
      }
    }
  }
}
