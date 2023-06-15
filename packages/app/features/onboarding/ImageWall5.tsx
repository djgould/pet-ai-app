import {
  Anchor,
  Button,
  H1,
  Paragraph,
  Separator,
  Sheet,
  XStack,
  YStack,
  useToastController,
  Image,
  SpaceTokens,
} from '@my/ui'
import { ChevronDown, ChevronUp } from '@tamagui/lucide-icons'
import React, { useState } from 'react'
import { useLink } from 'solito/link'
import imageStyles from 'app/constants/imageStyles'

interface Props {
  space?: SpaceTokens
  imageOffset?: SpaceTokens
}

export function ImageWall5({ space = '$4', imageOffset = '$-10' }: Props) {
  return (
    <YStack space={space} width="100%" maxWidth={600}>
      <XStack justifyContent="center" space={'$4'} width="100%">
        <YStack space={space} marginTop="$10" zIndex="$0" width="100%">
          <Image
            source={{
              uri: 'https://imagedelivery.net/Pg1MxPV3UBYR5Z4j-Ai2dQ/4a50946d-b579-4892-a765-89b8e7339e00/public',
            }}
            aspectRatio={1}
          />

          <Image
            source={{
              uri: 'https://imagedelivery.net/Pg1MxPV3UBYR5Z4j-Ai2dQ/22c7e5b3-957d-4443-7b23-ed6b29481d00/public',
            }}
            aspectRatio={1}
          />
        </YStack>
        <YStack space={space} marginTop="$10" zIndex="$0">
          <Image
            source={{
              uri: 'https://imagedelivery.net/Pg1MxPV3UBYR5Z4j-Ai2dQ/c398867f-7c6d-4398-aceb-84d716d50800/public',
            }}
            aspectRatio={1}
          />
          <Image
            source={{
              uri: 'https://imagedelivery.net/Pg1MxPV3UBYR5Z4j-Ai2dQ/27f74a7a-e483-40aa-bec4-f431bffb5d00/public',
            }}
            aspectRatio={1}
          />
        </YStack>
      </XStack>
      <XStack space={space} maw={600} justifyContent="center">
        <Image
          source={{
            uri: 'https://imagedelivery.net/Pg1MxPV3UBYR5Z4j-Ai2dQ/27f74a7a-e483-40aa-bec4-f431bffb5d00/public',
          }}
          aspectRatio={1}
        />
      </XStack>
    </YStack>
  )
}
