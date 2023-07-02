import { Image, Square } from '@my/ui'
import { useEffect, useState } from 'react'

export interface Props {
  url: string
}

export default function ResultImage({ url }: Props) {
  const [watermarkUrl, setWatermarkUrl] = useState<string | null>(null)
  useEffect(() => {
    if (typeof window === 'undefined') return
    const run = async () => {
      const watermark = (await import('watermarkjs')).default
      try {
        watermark(url)
          .image(watermark.text.lowerLeft('watermark.js', '48px Josefin Slab', '#fff', 0.5))
          .dataUrl(function (img) {
            setWatermarkUrl(img.src)
          })
      } catch (e) {
        console.error(e)
      }
    }
    run()
  }, [url])
  console.log(watermarkUrl)
  if (!watermarkUrl) return null
  return (
    <Square
      backgroundColor={'$backgroundStrong'}
      f={1}
      alignContent="center"
      aspectRatio={1}
      position={'relative'}
    >
      <Image position="relative" source={{ uri: watermarkUrl }} width="100%" height="100%" />
    </Square>
  )
}
