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
  H2,
} from '@my/ui'
import { LinearGradient } from '@tamagui/linear-gradient'
import { ChevronDown, ChevronUp } from '@tamagui/lucide-icons'
import React, { useState } from 'react'
import { useLink } from 'solito/link'
import { ImageWall } from './ImageWall'

export function Screen2() {
  const linkProps = useLink({
    href: '/onboarding/3',
  })

  return (
    <YStack f={1} jc="center" ai="center" fullscreen overflow="hidden">
      <YStack fullscreen zIndex={'$1'} f={1} jc="flex-end" ai="center">
        <LinearGradient
          position="absolute"
          colors={['transparent', 'rgba(0,0,0,0.9)', 'rgba(0,0,0,1)']}
          locations={[0.0, 0.3, 1.0]}
          width="100%"
          height="$19"
        />
        <YStack space="$4" maw={600} pb="$4">
          <H2 ta="center">Generated based on images of your dog</H2>
          <Paragraph ta="center">
            CharlieAI learns what your dog looks like from the photos you already have
          </Paragraph>
        </YStack>

        <XStack marginBottom="$4">
          <Button {...linkProps}>Next</Button>
        </XStack>
      </YStack>

      <ImageWall />
    </YStack>
  )
}
