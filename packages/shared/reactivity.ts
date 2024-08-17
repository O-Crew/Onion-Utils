export function readonly(target: any) {
  return new Proxy(target, {
    get(target, prop) {
      return target[prop]
    },
    set(target, prop, value) {
      throw new Error(`Cannot set read-only property: '${target}'`)
    }
  })
}
