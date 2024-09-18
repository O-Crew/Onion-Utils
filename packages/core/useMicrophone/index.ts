export const useMicrophone = () => {
  let mediaRecorder: MediaRecorder
  let audioChunks: Blob[] = []
  let mediaStream: MediaStream | null = null

  async function getMicrophoneAccess(): Promise<MediaStream | undefined> {
    try {
      mediaStream = await navigator.mediaDevices.getUserMedia({ audio: true })
      return mediaStream
    } catch (e) {
      console.log(e)
    }
  }

  function startRecording(stream: MediaStream | undefined) {
    if (!stream) return
    mediaRecorder = new MediaRecorder(stream)
    mediaRecorder.ondataavailable = (event) => {
      audioChunks.push(event.data)
    }
    mediaRecorder.start()
    console.log('开始录音')
  }

  function stopRecording(): Promise<Blob> {
    return new Promise((resolve) => {
      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunks, { type: 'audio/wav' })
        audioChunks = []
        stopMicrophone()
        resolve(audioBlob)
      }

      mediaRecorder.stop()
      console.log('停止录音')
    })
  }

  function stopMicrophone() {
    if (mediaStream) {
      mediaStream.getTracks().forEach((track) => track.stop())
      mediaStream = null
      console.log('麦克风已关闭')
    }
  }

  function sendAudio(audioBlob: Blob) {}

  function saveAudio(audioBlob: Blob) {
    const audioUrl = URL.createObjectURL(audioBlob)
    const downloadLink = document.createElement('a')
    downloadLink.href = audioUrl
    downloadLink.download = 'recording.wav'
    document.body.appendChild(downloadLink)
    downloadLink.click()
    document.body.removeChild(downloadLink)
    console.log('音频已保存')
  }

  function createWavBuffer(
    audioChunks: Float32Array[],
    bufferLength: number,
    sampleRate: number
  ): ArrayBuffer {
    const buffer = new ArrayBuffer(44 + bufferLength * 2)
    const view = new DataView(buffer)

    // WAV 文件头
    writeString(view, 0, 'RIFF')
    view.setUint32(4, 36 + bufferLength * 2, true)
    writeString(view, 8, 'WAVE')
    writeString(view, 12, 'fmt ')
    view.setUint32(16, 16, true)
    view.setUint16(20, 1, true)
    view.setUint16(22, 1, true)
    view.setUint32(24, sampleRate, true)
    view.setUint32(28, sampleRate * 2, true)
    view.setUint16(32, 2, true)
    view.setUint16(34, 16, true)
    writeString(view, 36, 'data')
    view.setUint32(40, bufferLength * 2, true)

    // 音频数据
    let offset = 44
    for (const chunk of audioChunks) {
      for (let i = 0; i < chunk.length; i++) {
        view.setInt16(offset, chunk[i] * 32767, true)
        offset += 2
      }
    }

    return buffer
  }

  function writeString(view: DataView, offset: number, string: string) {
    for (let i = 0; i < string.length; i++) {
      view.setUint8(offset + i, string.charCodeAt(i))
    }
  }

  return {
    getMicrophoneAccess,
    startRecording,
    stopRecording,
    saveAudio,
    sendAudio,
    createWavBuffer,
    audioChunks
  }
}
