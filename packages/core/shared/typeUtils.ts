export function rawTypeUtil(value: any): string {
  let typeStr = Object.prototype.toString.call(value)
  return typeStr.substring(8, typeStr.length - 1).toLowerCase()
}
