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

  return {
    getMicrophoneAccess,
    startRecording,
    stopRecording,
    saveAudio,
    sendAudio,
    audioChunks
  }
}
