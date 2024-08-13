import { describe, expect, it, vi } from 'vitest'
import { useClone } from '../index'

describe('clone function', () => {
  it('same reference', () => {
    const a = [1, 2, 3]
    const b = a
    expect(a).toEqual(b)
    b[1] = 4
    expect(a).toEqual([1, 4, 3])
  })

  it("change b doesn't affect a", () => {
    const a = [1, 2, 3]
    const b = useClone(a)
    b[1] = 4
    expect(a).toEqual([1, 2, 3])
  })
  it('Object Type', () => {
    const a = { x: 1, y: 2 }
    const b = useClone(a)
    b.y = 3
    expect(a).toEqual({ x: 1, y: 2 })
  })
  it('Object with function', () => {
    const fn = vi.fn(() => {
      console.log('test')
    })
    const a = {
      x: 1,
      y: 2,
      fn: fn
    }
    a.fn()
    expect(a.fn).toBeTypeOf('function')
    expect(fn).toBeCalledTimes(1)
    const b = useClone(a)
    expect(b.fn).toBeTypeOf('function')
  })
  it('should return the same value for primitive types', () => {
    expect(useClone(1)).toBe(1)
    expect(useClone('hello')).toBe('hello')
    expect(useClone(true)).toBe(true)
  })
  it('should return null for null and undefined', () => {
    expect(useClone(null)).toBeNull()
    expect(useClone(undefined)).toBeUndefined()
  })
  it('should clone objects with nested properties', () => {
    const object = { a: 1, b: { c: 2 } }
    const clonedObject = useClone(object)
    expect(clonedObject).toEqual(object)
    expect(clonedObject).not.toBe(object)
    expect(clonedObject.b).not.toBe(object.b)
  })
  it('should clone Array objects', () => {
    const array = [1, 2, 3]
    const clonedArray = useClone(array)
    expect(clonedArray).toEqual(array)
    expect(clonedArray).not.toBe(array)
  })
  it('Nested Array', () => {
    const a = [1, [2, 3, [4, 5]]]
    const b = useClone(a)
    b[1][2][0] = 5
    expect(a).toEqual([1, [2, 3, [4, 5]]])
  })
  it('should clone Date objects', () => {
    const date = new Date()
    const clonedDate = useClone(date)
    expect(clonedDate).toEqual(date)
    expect(clonedDate).not.toBe(date)
  })
  it('should clone RegExp objects', () => {
    const regExp = /hello/
    const clonedRegExp = useClone(regExp)
    expect(clonedRegExp).toEqual(regExp)
    expect(clonedRegExp).not.toBe(regExp)
  })
  it('Symbol Type', () => {
    const a = Symbol(1)
    const b = useClone(a)
    expect(a).toBe(b)
  })
  it('should clone Map objects', () => {
    const map = new Map([[1, 2]])
    const clonedMap = useClone(map)
    expect(clonedMap).toEqual(map)
    expect(clonedMap).not.toBe(map)
  })
  it('Map Type', () => {
    const a: Map<any, any> = new Map([
      [1, 2],
      [3, 4]
    ])
    const b = useClone(a)
    expect(b.get(1)).toBe(2)
    b.set(2, new Map([['y', 1]]))
    expect(b.get(2).get('y')).toBe(1)
  })
  it('should handle circular references', () => {
    const object: Record<any, any> = { a: 1 }
    object.b = object
    const clonedObject = useClone(object)
    expect(clonedObject).toEqual(object)
    expect(clonedObject).not.toBe(object)
    expect(clonedObject.b).toBe(clonedObject)
  })
})
