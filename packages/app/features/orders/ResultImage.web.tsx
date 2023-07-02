import { Image, Square } from '@my/ui'
import { useEffect } from 'react'
import React = require('react')
import * as watermark from 'watermarkjs'

export interface Props {
  url: string
}

export default function ResultImage({ url }: Props) {
  const [watermarkUrl, setWatermarkUrl] = React.useState<string | null>(null)
  useEffect(() => {
    console.log('ResultImage useEffect')
    watermark(url)
      .image(watermark.text.lowerLeft('watermark.js', '48px Josefin Slab', '#fff', 0.5))
      .dataUrl(function (img) {
        setWatermarkUrl(img.src)
      })
  }, [url])
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
