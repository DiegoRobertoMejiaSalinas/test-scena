import type { InfiniteViewerOptions } from 'infinite-viewer'
import { ref } from './ref'

export const infiniteViewerEventListeners: Flatten<Parameters<import('infinite-viewer').default['on']>> = {
  dragStart (e) { if (e.inputEvent.target.nodeName === "A") e.stop() },

  scroll (e) {
    ref.editor.horizontalGuides.scroll(e.scrollLeft)
    ref.editor.horizontalGuides.scrollGuides(e.scrollTop)
    ref.editor.horizontalGuides.forceUpdate()

    ref.editor.verticalGuides.scroll(e.scrollTop)
    ref.editor.verticalGuides.scrollGuides(e.scrollLeft)
    ref.editor.verticalGuides.forceUpdate()
  },

  pinch (e) {
    const unit = Math.round(Math.floor(1 / e.zoom) * 50) || 50
    ref.editor.horizontalGuides.setState({ unit, zoom: e.zoom })
    ref.editor.verticalGuides.setState({ unit, zoom: e.zoom })
    ref.editor.horizontalGuides.forceUpdate()
    ref.editor.verticalGuides.forceUpdate()
  },
}

export const infiniteViewerOptions: Partial<InfiniteViewerOptions> = {
  useAutoZoom: true, usePinch: true
}
