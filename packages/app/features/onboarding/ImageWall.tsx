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

export function ImageWall({ space = '$4', imageOffset = '$-10' }: Props) {
  return (
    <XStack position="absolute" top="$10" space={space}>
      <YStack space={space} marginTop="$10" zIndex="$0">
        <Image
          source={{
            uri: imageStyles[0]?.imageUrl,
            width: 100,
            height: 100,
          }}
        />

        <Image
          source={{
            uri: imageStyles[1]?.imageUrl,
            width: 100,
            height: 100,
          }}
        />

        <Image
          source={{
            uri: imageStyles[2]?.imageUrl,
            width: 100,
            height: 100,
          }}
        />
      </YStack>
      <YStack space={space} marginBottom={imageOffset} zIndex="$0">
        <Image
          source={{
            uri: imageStyles[3]?.imageUrl,
            width: 100,
            height: 100,
          }}
        />
        <Image
          source={{
            uri: imageStyles[4]?.imageUrl,
            width: 100,
            height: 100,
          }}
        />

        <Image
          source={{
            uri: imageStyles[5]?.imageUrl,
            width: 100,
            height: 100,
          }}
        />

        <Image
          source={{
            uri: imageStyles[6]?.imageUrl,
            width: 100,
            height: 100,
          }}
        />
      </YStack>
      <YStack space={space} marginTop="$10" zIndex="$0">
        <Image
          source={{
            uri: imageStyles[7]?.imageUrl,
            width: 100,
            height: 100,
          }}
        />
        <Image
          source={{
            uri: imageStyles[8]?.imageUrl,
            width: 100,
            height: 100,
          }}
        />

        <Image
          source={{
            uri: imageStyles[9]?.imageUrl,
            width: 100,
            height: 100,
          }}
        />
      </YStack>
    </XStack>
  )
}
