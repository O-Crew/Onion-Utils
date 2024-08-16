import { rawTypeUtil } from '@onion/packages/shared'

let clonedMap = new WeakMap()
export function useClone(target: any): any {
  if (typeof target !== 'object' || target === null) return target

  if (clonedMap.has(target)) return clonedMap.get(target)

  const rawType = rawTypeUtil(target)

  if (rawType === 'regexp') return new RegExp(target)

  if (rawType === 'array') {
    return target.map((item: any) => {
      return useClone(item)
    })
  }

  if (rawType === 'date') {
    return new Date(target)
  }

  if (rawType === 'map') {
    for (const [key, value] of target) {
      return new Map([[useClone(key), useClone(value)]])
    }
  }

  const source = {} as { [key: string]: any }
  clonedMap.set(target, source)
  Object.keys(target).forEach((key) => {
    if (rawTypeUtil(target[key]) === 'date') {
      source[key] = new Date(target[key])
    } else {
      source[key] = useClone(target[key])
    }
  })

  clonedMap = new WeakMap()

  return source
}
