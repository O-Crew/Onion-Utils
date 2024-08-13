interface TypedOptions {
  typeSpeed: number
}
export class Typed {
  constructor(
    private elementId: string,
    private string: string,
    private options: TypedOptions
  ) {
    this.begin()
  }
  begin() {
    const { typeSpeed } = this.options
    const element = document.getElementById(this.elementId)
    for (let i = 0; i < this.string.length; i++) {
      if (element) {
        setTimeout(
          () => {
            element.innerHTML += this.string.substring(i, i + 1)
            console.log(this.string.substring(i, i + 1))
          },
          typeSpeed * (i + 1)
        )
      }
    }
  }
}
