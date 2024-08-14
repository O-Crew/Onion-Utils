interface AnyFn {
  (...args: any[]): any
}

export function useDebounce(fn: AnyFn, ms: number, options: { maxWait?: number } = {}) {
  return debounceWrapper(fn, ms, options)
}

function debounceWrapper(fn: AnyFn, ms: number, options: { maxWait?: number } = {}) {
  let timer: ReturnType<typeof setTimeout> | undefined
  let maxDuration = options.maxWait
  let maxTimer: ReturnType<typeof setTimeout> | undefined

  const _clearTimeout = (timer: ReturnType<typeof setTimeout> | undefined) => {
    clearTimeout(timer)
  }

  return function (...args: any) {
    return new Promise((resolve, reject) => {
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
