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
} from '@my/ui'
import { LinearGradient } from '@tamagui/linear-gradient'
import { ChevronDown, ChevronUp } from '@tamagui/lucide-icons'
import React, { useState } from 'react'
import { useLink } from 'solito/link'
import { ImageWall } from './ImageWall'

export function HomeScreen() {
  const linkProps = useLink({
    href: '/onboarding/1',
  })

  return (
    <YStack
      f={1}
      jc="center"
      ai="center"
      fullscreen
      overflow="hidden"
      backgroundColor={'$background'}
    >
      <YStack fullscreen zIndex={'$1'} f={1} jc="flex-end" ai="center">
        <LinearGradient
          position="absolute"
          colors={['transparent', 'rgba(0,0,0,0.9)', 'rgba(0,0,0,1)']}
          locations={[0.0, 0.3, 1.0]}
          width="100%"
          height="$19"
        />
        <YStack space="$4" maw={600}>
          <H1 ta="center">Welcome to CharlieAI!</H1>
          <Paragraph ta="center">
            Lets transform your pet photos into personalized masterpieces!
          </Paragraph>
        </YStack>

        <XStack marginBottom="$4">
          <Button {...linkProps}>Get Started</Button>
        </XStack>
      </YStack>

      <ImageWall />
    </YStack>
  )
}
