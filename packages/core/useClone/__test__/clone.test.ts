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
  it('number type', () => {
    const a = 1
    const b = useClone(a)
    expect(a).toBeTypeOf('number')
    expect(b).toBeTypeOf('number')
    expect(a).toEqual(b)
  })
  it('null type', () => {
    const a = null
    const b = useClone(a)
    expect(b).toBe(null)
    expect(a).toEqual(b)
  })
  it('Nested Object', () => {
    const a = { x: 1, y: { z: 2 } }
    const b = useClone(a)
    b.y.z = 3
    expect(a).toEqual({ x: 1, y: { z: 2 } })
  })
  it('Nested Array', () => {
    const a = [1, [2, 3, [4, 5]]]
    const b = useClone(a)
    b[1][2][0] = 5
    expect(a).toEqual([1, [2, 3, [4, 5]]])
  })
  it('Date Object', () => {
    const a = new Date()
    const b = useClone(a)
    expect(a.getTime()).toEqual(b.getTime())
    expect(a).not.toBe(b)
  })
  it('RegExp Object', () => {
    const a = /a/
    const b = useClone(a)
    expect(a).toEqual(b)
    expect(a).not.toBe(b)
  })
  it('Symbol Type', () => {
    const a = Symbol(1)
    const b = useClone(a)
    expect(a).toBe(b)
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
})
