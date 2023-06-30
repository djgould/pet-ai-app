const canvas = document.createElement('canvas')
canvas.width = 768
canvas.height = 768

const img = new Image()
img.onload = function () {
  const ctx = canvas.getContext('2d')
  ctx.drawImage(img, 0, 0, 768, 768)
  const dataUrl = canvas.toDataURL()
  // do something with the resized image data URL
}
img.src = 'path/to/image.jpg'
