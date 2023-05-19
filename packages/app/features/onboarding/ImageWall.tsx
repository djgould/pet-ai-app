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
            uri: 'https://placekitten.com/200/200',
            width: 100,
            height: 100,
          }}
        />

        <Image
          source={{
            uri: 'https://placekitten.com/200/200',
            width: 100,
            height: 100,
          }}
        />

        <Image
          source={{
            uri: 'https://placekitten.com/200/200',
            width: 100,
            height: 100,
          }}
        />
      </YStack>
      <YStack space={space} marginBottom={imageOffset} zIndex="$0">
        <Image
          source={{
            uri: 'https://placekitten.com/200/200',
            width: 100,
            height: 100,
          }}
        />
        <Image
          source={{
            uri: 'https://placekitten.com/200/200',
            width: 100,
            height: 100,
          }}
        />

        <Image
          source={{
            uri: 'https://placekitten.com/200/200',
            width: 100,
            height: 100,
          }}
        />

        <Image
          source={{
            uri: 'https://placekitten.com/200/200',
            width: 100,
            height: 100,
          }}
        />
      </YStack>
      <YStack space={space} marginTop="$10" zIndex="$0">
        <Image
          source={{
            uri: 'https://placekitten.com/200/200',
            width: 100,
            height: 100,
          }}
        />
        <Image
          source={{
            uri: 'https://placekitten.com/200/200',
            width: 100,
            height: 100,
          }}
        />

        <Image
          source={{
            uri: 'https://placekitten.com/200/200',
            width: 100,
            height: 100,
          }}
        />
      </YStack>
    </XStack>
  )
}
