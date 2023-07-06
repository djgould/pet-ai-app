import { Image, Square } from '@my/ui'
import 'yet-another-react-lightbox/styles.css'

export interface Props {
  url: string
}

export default function ResultImage({ url }: Props) {
  return (
    <Square
      backgroundColor={'$backgroundStrong'}
      f={1}
      alignContent="center"
      aspectRatio={1}
      position={'relative'}
    >
      <Image position="relative" source={{ uri: url }} width="100%" height="100%" />
    </Square>
  )
}
