import { describe, expect, it, vi } from 'vitest'
import { useDebounce } from '..'

describe('useDebounce', () => {
  it('does not call the function immediately', () => {
    const fn = vi.fn()
    const debouncedFn = useDebounce(fn, 100)
    debouncedFn()
    expect(fn).not.toHaveBeenCalled()
  })

  it('calls the function after the specified delay', async () => {
    const fn = vi.fn()
    const debouncedFn = useDebounce(fn, 100)
    debouncedFn()
    await new Promise((resolve) => setTimeout(resolve, 150))
    expect(fn).toHaveBeenCalledTimes(1)
  })
  it('debounces with ms <= 0', async () => {
    const fn = vi.fn()
    const debouncedFn = useDebounce(fn, 0)
    debouncedFn()
    expect(fn).toHaveBeenCalledTimes(1)
  })

  it('calls the function with correct arguments', () => {
    const fn = vi.fn((arg1, arg2) => arg1 + arg2)
    const debouncedFn = useDebounce(fn, 100)
    debouncedFn(1, 2)
    setTimeout(() => {
      expect(fn).toHaveBeenCalledWith(1, 2)
    }, 200)
  })

  it('does not call the function multiple times when called multiple times within the delay period', async () => {
    const fn = vi.fn()
    const debouncedFn = useDebounce(fn, 100)
    debouncedFn()
    debouncedFn()
    await new Promise((resolve) => setTimeout(resolve, 150))
    expect(fn).toHaveBeenCalledTimes(1)
  })

  it('calls the function when the maxWait option is specified and the delay period is exceeded', async () => {
    const fn = vi.fn()
    const debouncedFn = useDebounce(fn, 100, { maxWait: 50 })
    debouncedFn()
    await new Promise((resolve) => setTimeout(resolve, 150))
    expect(fn).toHaveBeenCalledTimes(1)
  })

  it('calls the function with maxWait option when delay is greater than maxWait', async () => {
    const fn = vi.fn()
    const debouncedFn = useDebounce(fn, 1000, { maxWait: 500 })
    debouncedFn()
    await new Promise((resolve) => setTimeout(resolve, 500))
    expect(fn).toHaveBeenCalledTimes(1)
  })

  it('does not call the function when maxWait option is specified and delay is less than maxWait', async () => {
    const fn = vi.fn()
    const debouncedFn = useDebounce(fn, 50, { maxWait: 100 })
    debouncedFn()
    await new Promise((resolve) => setTimeout(resolve, 150))
    expect(fn).toHaveBeenCalledTimes(1)
  })
})
