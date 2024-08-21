import { isAllow } from '@onion/shared'
import { usePermission } from '../usePermission'
import { useSupported } from '../useSupported'

interface ClipboardReturn {
  text: string
  isSupported: boolean
  copy: () => void
}

export function useClipboard(target: string, options: object = {}): ClipboardReturn {
  const isSupported = useSupported(() => navigator && 'clipboard' in navigator)
  const permissionWrite = usePermission('clipboard-write')
  const permissionRead = usePermission('clipboard-read')

  let text = ''
  if (isSupported.value && isAllow(permissionRead.state)) {
    navigator.clipboard.readText().then((value) => {
      text = value
    })
  }

  const copy = () => {
    if (isAllow(permissionWrite.state)) {
      navigator.clipboard.writeText(target)
    }
  }

  return { text, isSupported, copy }
}
