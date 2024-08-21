export {};

declare module '.' {
  namespace _ {
    type Event<Host extends Event.Host.Generic = Event.Host.Generic, Type extends string = Event.Type<Host>> = Values<{
      [Name in Event.Host.Name]: If.Equals<
        Host,
        Event.Map[Name][0],
        Exclude<Type, keyof Event.Map[Name][1]> extends never ? Value<Event.Map[Name][1], Type> : globalThis.Event
      >;
    }>;

    namespace Event {
      namespace Host {
        type Generic = {
          addEventListener: (type: string, listener: Listener.Generic, options?: Listener.Options.Argument) => void;

          removeEventListener: (type: string, listener: Listener.Generic, options?: Listener.Options.Argument) => void;
        };

        type Name = { [Key in keyof Event.Map]: Key }[keyof Event.Map];

        type Registered = Event.Map[keyof Event.Map][0];

        type Using<Type extends string> = Values<{
          [Name in Event.Host.Name]: Type extends keyof Event.Map[Name][1] ? Event.Map[Name][0] : never;
        }>;
      }

      type Listener<
        Host extends Host.Generic = Host.Generic,
        Type extends string = Event.Type<Host>,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      > = (this: Host, event: Event<Host, Type>) => any;

      namespace Listener {
        type Generic = EventListenerOrEventListenerObject;

        // type Generic<This extends Host.Generic = Host.Generic> = (this: This, event: globalThis.Event) => any;

        type Options = EventListenerOptions;

        namespace Options {
          type Argument = boolean | Options;
        }
      }

      interface Map {
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

      type Type<Host extends Host.Generic = Host.Registered> = Values<{
        [Name in Host.Name]: If.Equals<Host, Map[Name][0], keyof Map[Name][1]>;
      }>;

      namespace Type {
        type Registered = Values<{ [Name in Host.Name]: keyof Map[Name][1] }>;
      }
    }
  }
}
