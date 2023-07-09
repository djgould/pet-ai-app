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
import { SignUp } from '@clerk/nextjs'

export function Screen4() {
  const linkProps = useLink({
    href: 'https://accounts.charlieai.app/sign-up',
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
          <H2 ta="center">To get started create your account!</H2>
          <Paragraph ta="center">
            Just upload 5 photos! Choose your photos of your pup, upload them, and we will generate
            100 images that you can save, print, or gift!
          </Paragraph>
        </YStack>

        <SignUp path="/sign-up" routing="path" signInUrl="/sign-in" />
        <XStack marginBottom="$4">
          <Button {...linkProps}>Create Account</Button>
        </XStack>
      </YStack>
      <ImageWall />
    </YStack>
  )
}
