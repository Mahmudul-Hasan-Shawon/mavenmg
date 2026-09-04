import * as THREE from 'three'
import { themeState, onThemeChange, type ThemeName } from '../utils/theme'

/** Per-theme palettes for the WebGL scenes. Additive blending only works on
 *  dark backgrounds, so light mode switches to normal blending + deep violets. */
export const SCENE_PALETTES: Record<
  ThemeName,
  { nodeA: string; nodeB: string; line: string; flow: string; core: string; opacity: number }
> = {
  dark: {
    nodeA: '#8B4FBF',
    nodeB: '#DACAFF',
    line: '#612C8B',
    flow: '#DACAFF',
    core: '#612C8B',
    opacity: 1,
  },
  light: {
    nodeA: '#7b3cbe',
    nodeB: '#4a3070',
    line: '#6d2fa5',
    flow: '#2c1846',
    core: '#b493d8',
    opacity: 0.9,
  },
}

export function isLight(name: ThemeName) {
  return name === 'light'
}

/** Swap a material between additive (dark) and normal (light) blending. */
export function retintMaterial(
  mat: THREE.Material,
  theme: ThemeName,
  apply: (m: typeof mat, theme: ThemeName) => void
) {
  mat.blending = theme === 'light' ? THREE.NormalBlending : THREE.AdditiveBlending
  mat.needsUpdate = true
  apply(mat, theme)
}

/** Subscribe a scene to theme changes; fires immediately with current theme. */
export function watchSceneTheme(
  apply: (theme: ThemeName) => void,
  deps: unknown[] = []
): () => void {
  const off = onThemeChange((t) => apply(t))
  apply(themeState.name)
  void deps
  return off
}
