import InfiniteViewer, {
  EVENTS as INFINITE_VIEWER_EVENTS
} from "infinite-viewer";
import Guides, { EVENTS as GUIDE_EVENTS } from "@scena/guides";

import { userPreferences } from "./userPreferences";
import {
  infiniteViewerEventListeners,
  infiniteViewerOptions
} from "./InfiniteViewer";
import {
  horizontalGuidesOptions,
  verticalGuidesOptions,
  horizontalGuideEventListners,
  verticalGuideEventListners
} from "./Guides";

const eventListenerDict = {
  horizontalGuides: {
    EVENTS: GUIDE_EVENTS,
    listeners: horizontalGuideEventListners
  },
  infiniteViewer: {
    EVENTS: INFINITE_VIEWER_EVENTS,
    listeners: infiniteViewerEventListeners
  },
  verticalGuides: {
    EVENTS: GUIDE_EVENTS,
    listeners: verticalGuideEventListners
  }
};

export default class Editor {
  public infiniteViewer: InfiniteViewer;
  public horizontalGuides: Guides;
  public verticalGuides: Guides;
  public userPreferences = userPreferences;

  constructor() {
    const el = document.querySelector("stage") as HTMLElement;
    this.infiniteViewer = new InfiniteViewer(
      el.querySelector<HTMLElement>(".scena-viewer")!,
      el.querySelector<HTMLElement>(".scena-viewport-container")!,
      infiniteViewerOptions
    );

    const containerEl = this.infiniteViewer.getContainer();

    horizontalGuidesOptions.scrollOptions!.container = containerEl;
    this.horizontalGuides = new Guides(
      el.querySelector<HTMLElement>(".scena-horizontal.scena-guides")!,
      horizontalGuidesOptions
    );

    verticalGuidesOptions.scrollOptions!.container = containerEl;
    this.verticalGuides = new Guides(
      el.querySelector<HTMLElement>(".scena-vertical.scena-guides")!,
      verticalGuidesOptions
    );

    const keys = Object.keys(eventListenerDict);
    keys.forEach((key) =>
      this.initEventListeners(key as keyof typeof eventListenerDict)
    );

    window.addEventListener(
      "resize",
      () => {
        this.horizontalGuides.resize();
        this.verticalGuides.resize();
      },
      { passive: true }
    );
  }

  private initEventListeners(type: keyof typeof eventListenerDict) {
    const { EVENTS, listeners } = eventListenerDict[type];
    const emitter = this[type];

    console.log(EVENTS, listeners);
    EVENTS.forEach((eventName) => {
      emitter.on(eventName, function (e) {
        if (typeof listeners[eventName] !== "undefined")
          listeners[eventName](e);
      });
    });
  }
}
