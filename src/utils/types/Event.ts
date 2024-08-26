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

        type Options = EventListenerOptions | boolean;
      }

      type Type<Emitter> = _.Resolve<
        Is.Custom.Emitter<Emitter, Custom.Type<Emitter>, Is.Native.Emitter<Emitter, Native.Type<Emitter>, string>>
      >;

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

        type Listener<Emitter, Type extends string> = (
          this: Emitter,
          ...args: Listener.Arguments<Emitter, Type>
        ) => void;

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

        type Listener<Emitter, Type extends string> = (this: Emitter, event: Listener.Argument<Emitter, Type>) => void;

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
