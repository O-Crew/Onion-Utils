import { BooleanFn } from '@onion/core/shared'

export function useSupported(callback: BooleanFn) {
  if (typeof callback !== 'function') {
    return Promise.reject('Callback must be a function')
  }

  return Boolean(callback())
}
