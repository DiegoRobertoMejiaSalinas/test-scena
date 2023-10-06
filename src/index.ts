import "./demo.css";

import { userPreferencesListeners } from "./userPreferences";
import { ref } from "./ref";
import Editor from "./Editor";

const demo = {
  userPreferenceBtns(editor: Editor) {
    const toggle = function (this: Element, _e?: Event) {
      const option = this.getAttribute(
        "data-preference"
      ) as keyof typeof editor.userPreferences;
      if (option == null) throw Error("Missing preference attribute.");

      const optionValue = !editor.userPreferences[option];
      editor.userPreferences[option] = optionValue;
      this.classList.toggle("selected", optionValue);

      userPreferencesListeners[option]?.(optionValue);
    };
    document
      .querySelectorAll("menu-bar .preference [data-preference]")
      .forEach((button) => {
        button.addEventListener("click", toggle);

        const option = button.getAttribute(
          "data-preference"
        ) as keyof typeof editor.userPreferences;
        if (option == null) throw Error("Missing preference attribute.");

        button.classList.toggle("selected", !!editor.userPreferences[option]);
        userPreferencesListeners[option]?.(editor.userPreferences[option]);
      });
  },

  init() {
    const editor = new Editor();
    ref.editor = editor;
    this.userPreferenceBtns(editor);
    window.requestAnimationFrame(() => {
      editor.verticalGuides.resize();
      editor.horizontalGuides.resize();
      editor.infiniteViewer.scrollCenter();
    });

    return editor;
  }
};
declare global {
  var editor: import("./Editor").default;
}
document.addEventListener("DOMContentLoaded", () => {
  window.editor = demo.init();
});
