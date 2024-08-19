export const noop = () => {}

export const isString = (params: any) => {
  return typeof params === 'string'
}

export const isAllow = (status: PermissionState | undefined): boolean => {
  return status === 'granted' || status === 'prompt'
}
