import type { GuideOptions } from "@scena/guides";
import { ref } from "./ref";

const sharedOptions: Partial<GuideOptions> = {
  scrollOptions: {
    container: { value: undefined },
    threshold: 30,
    throttleTime: 30,
    getScrollPosition() {
      return [
        ref.editor.infiniteViewer.getScrollLeft(),
        ref.editor.infiniteViewer.getScrollTop()
      ];
    }
  }
};
export const horizontalGuidesOptions: Partial<GuideOptions> = Object.assign(
  {
    type: "horizontal"
  } as Partial<GuideOptions>,
  sharedOptions
);
export const verticalGuidesOptions: Partial<GuideOptions> = Object.assign(
  {
    type: "vertical"
  } as Partial<GuideOptions>,
  sharedOptions
);

type GuideEventListeners = Flatten<
  Parameters<import("@scena/guides").default["on"]>
>;
export const horizontalGuideEventListners: GuideEventListeners = {
  dragStart(e) {
    console.log("HO", e, ref.editor.userPreferences.showGuides);
    if (!ref.editor.userPreferences.showGuides) {
      e.stop();
      e.preventDrag();
    }
  },

  requestScroll(e) {
    console.log("REQ");
    if (!ref.editor.userPreferences.showGuides) {
      e.stop();
    } else {
      const deltaY = e.direction[1] * 10;
      ref.editor.infiniteViewer.scrollBy(0, deltaY);
    }
  }
};
export const verticalGuideEventListners: GuideEventListeners = {
  dragStart(e) {
    console.log("VE", e, ref.editor.userPreferences.showGuides);
    if (!ref.editor.userPreferences.showGuides) {
      e.stop();
      e.preventDrag();

      console.log(e);
    }
  },

  requestScroll(e) {
    if (!ref.editor.userPreferences.showGuides) {
      e.stop();
    } else {
      const deltaX = e.direction[0] * 10;
      ref.editor.infiniteViewer.scrollBy(deltaX, 0);
    }
  }
};
