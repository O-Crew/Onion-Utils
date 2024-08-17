import { type BooleanFn } from '@onion/shared'
import { readonly } from '@onion/shared/reactivity'

export function useSupported(callback: BooleanFn) {
  if (typeof callback !== 'function') {
    throw new Error('Callback must be a function')
  }

  const isSupported = { value: Boolean(callback()) }

  return readonly(isSupported)
}
