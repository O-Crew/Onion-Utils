import { type AnyFn, noop } from '@onion/shared'

interface OptionsParams {
  maxWait?: number
  rejectOnCancel?: boolean
}

/**
 * @param fn The function to debounce
 * @param ms The delay in milliseconds
 * @param options An object with optional properties
 * @returns A debounced version of the given function
 */
export function useDebounce(fn: AnyFn, ms: number, options: { maxWait?: number } = {}) {
  return debounceWrapper(fn, ms, options)
}

function debounceWrapper(fn: AnyFn, ms: number, options: OptionsParams) {
  let timer: ReturnType<typeof setTimeout> | undefined
  let maxDuration = options.maxWait
  let maxTimer: ReturnType<typeof setTimeout> | undefined
  let lastRejector: (val?: any) => void = noop

  const _clearTimeout = (timer: ReturnType<typeof setTimeout> | undefined) => {
    clearTimeout(timer)
    lastRejector()
    lastRejector = noop
  }

  return function (...args: any) {
    return new Promise((resolve, reject) => {
      lastRejector = options.rejectOnCancel ? reject : resolve
      if (ms <= 0) resolve(fn(...args))
      if (timer) clearTimeout(timer)
      if (maxDuration && !maxTimer) {
        maxTimer = setTimeout(() => {
          resolve(fn(...args))
          _clearTimeout(timer)
        }, maxDuration)
      }

      timer = setTimeout(() => {
        resolve(fn(...args))
        clearTimeout(maxTimer)
      }, ms)
    })
  }
}