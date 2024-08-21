import { useSupported } from '../useSupported'

/**
 * @param permissionName
 * @returns {state: 'granted' | 'prompt' | 'denied'}
 */
interface PermissionReturn {
  state: PermissionState | undefined
}
export function usePermission(permissionName: string): PermissionReturn {
  const desc = { name: permissionName } as PermissionDescriptor
  const isSupported = useSupported(() => navigator && 'permissions' in navigator)
  let permissionStatus: PermissionReturn = { state: undefined }
  if (isSupported.value) {
    navigator.permissions.query(desc).then((value) => {
      permissionStatus!.state = value.state
    })
  }
  return permissionStatus
}
