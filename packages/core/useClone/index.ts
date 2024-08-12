import { rawTypeUtil } from 'packages/shared'

export function useClone(target: any): any {
  const rawType = rawTypeUtil(target)

  if (typeof target !== 'object') return target

  if (rawType === 'regexp') return new RegExp(target)

  if (rawType === 'array') {
    return target.map((item: any) => {
      return useClone(item)
    })
  }

  if (target === null) return target

  if (rawType === 'date') {
    return new Date(target)
  }

  if (rawType === 'map') {
    for (const [key, value] of target) {
      return new Map([[useClone(key), useClone(value)]])
    }
  }
  const source = {} as { [key: string]: any }

  Object.keys(target).forEach((key) => {
    if (rawTypeUtil(target[key]) === 'date') {
      source[key] = new Date(target[key])
    } else {
      source[key] = useClone(target[key])
    }
  })
  return source
}
