import { describe, expect, it } from 'vitest'
import { useSupported } from '../index'

describe('useSupported', () => {
  it('should return an object with a value property', () => {
    const callback = () => true
    const result = useSupported(callback)
    expect(result).toHaveProperty('value')
  })

  it('should return an object with the correct value', () => {
    const callback = () => true
    const result = useSupported(callback)
    expect(result.value).toBe(true)

    const callback2 = () => false
    const result2 = useSupported(callback2)
    expect(result2.value).toBe(false)
  })

  it('should return a readonly object', () => {
    const callback = () => true
    const result = useSupported(callback)
    expect(() => {
      result.value = false
    }).toThrowError()
  })
})
