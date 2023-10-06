import { ref } from './ref'

export const userPreferences = { showGuides: true }

export const userPreferencesListeners: Partial<Record<keyof typeof userPreferences, (optionValue: boolean, e?: MouseEvent) => void>> = {
  showGuides (optionValue) {
    ref.editor.horizontalGuides.setState({ showGuides: optionValue })
    ref.editor.verticalGuides.setState({ showGuides: optionValue })

    const hGuidesEl = ref.editor.horizontalGuides.getElement().parentElement!
    const vGuidesEl = ref.editor.verticalGuides.getElement().parentElement!
    hGuidesEl.toggleAttribute('disabled', !optionValue)
    vGuidesEl.toggleAttribute('disabled', !optionValue)
    hGuidesEl!.parentElement?.getElementsByClassName('scena-reset')[0]!.toggleAttribute('disabled', !optionValue)
  },
}
