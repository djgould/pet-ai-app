import { XStack, YStack, H1, H3, Paragraph, Button, H2, Image, Square } from '@my/ui'
import { HomeScreen } from 'app/features/home/screen'
import { Twitter } from '@tamagui/lucide-icons'
import { LinearGradient } from '@tamagui/linear-gradient'
import { useLink } from 'solito/link'
import Head from 'next/head'
import { useAuth } from '@clerk/nextjs'

export default function Page() {
  const linkProps = useLink({
    href: '/onboarding/0',
  })
  const dashboardLinkProps = useLink({
    href: '/orders',
  })

  const { isLoaded, isSignedIn } = useAuth()

  return (
    <>
      <Head>
        <title>CharlieAI</title>
      </Head>
      <YStack>
        <XStack
          padding={'$4'}
          borderBottomWidth={'$1'}
          borderBottomColor={'$gray6'}
          justifyContent="space-between"
        >
          <XStack alignItems="center" space="$4">
            <Image
              source={{
                uri: 'https://imagedelivery.net/Pg1MxPV3UBYR5Z4j-Ai2dQ/4fa8c284-c91b-49f3-87d9-0387e7d50900/public',
              }}
              width="50px"
              height="50px"
              borderRadius="50px"
            />
            <H2>CharlieAI</H2>
          </XStack>
          {isLoaded && (
            <Button backgroundColor="$blue8" {...dashboardLinkProps}>
              {isSignedIn ? 'Dashboard' : 'Sign In'}
            </Button>
          )}
        </XStack>
        <YStack alignItems="center" space="$4">
          <div
            style={{
              maxWidth: '650px',
              width: '100%',
              height: '30%',
              position: 'absolute',
              background: 'radial-gradient(rgba(0, 0, 255, .6), transparent, transparent)',
            }}
          />
          <XStack
            marginTop="$10"
            maxWidth={600}
            justifyContent={'center'}
            borderWidth={1}
            borderColor="$gray8"
            paddingVertical="$1"
            paddingHorizontal="$2"
            borderRadius={'$2'}
          >
            <Paragraph textAlign="center">
              Used by <Paragraph color={'$blue11'}>countless</Paragraph> dog lovers
            </Paragraph>
          </XStack>
          <XStack maxWidth={600} justifyContent={'center'}>
            <H1 textAlign="center">
              Create fun images of your pup{' '}
              <H1 position="relative" color={'$blue9'}>
                using AI{' '}
                <svg
                  style={{ position: 'absolute', top: `67%`, left: 0, opacity: 0.6 }}
                  aria-hidden="true"
                  viewBox="0 0 418 42"
                  class="absolute top-2/3 left-0 h-[0.58em] w-full fill-blue-500/60"
                  preserveAspectRatio="none"
                  fill="rgb(0, 145, 255)"
                  width="100%"
                >
                  <path d="M203.371.916c-26.013-2.078-76.686 1.963-124.73 9.946L67.3 12.749C35.421 18.062 18.2 21.766 6.004 25.934 1.244 27.561.828 27.778.874 28.61c.07 1.214.828 1.121 9.595-1.176 9.072-2.377 17.15-3.92 39.246-7.496C123.565 7.986 157.869 4.492 195.942 5.046c7.461.108 19.25 1.696 19.17 2.582-.107 1.183-7.874 4.31-25.75 10.366-21.992 7.45-35.43 12.534-36.701 13.884-2.173 2.308-.202 4.407 4.442 4.734 2.654.187 3.263.157 15.593-.78 35.401-2.686 57.944-3.488 88.365-3.143 46.327.526 75.721 2.23 130.788 7.584 19.787 1.924 20.814 1.98 24.557 1.332l.066-.011c1.201-.203 1.53-1.825.399-2.335-2.911-1.31-4.893-1.604-22.048-3.261-57.509-5.556-87.871-7.36-132.059-7.842-23.239-.254-33.617-.116-50.627.674-11.629.54-42.371 2.494-46.696 2.967-2.359.259 8.133-3.625 26.504-9.81 23.239-7.825 27.934-10.149 28.304-14.005.417-4.348-3.529-6-16.878-7.066Z"></path>
                </svg>
              </H1>
            </H1>
          </XStack>
          <XStack maxWidth={600} justifyContent={'center'} px={'$4'}>
            <Paragraph textAlign="center">
              Take pictures of your dog and generate a hundred new and fun images. Join thousands of
              happy customers and have fun with your pup today!
            </Paragraph>
          </XStack>
          <XStack justifyContent="center">
            <Button backgroundColor="$blue8" {...linkProps}>
              Start a free trial
            </Button>
          </XStack>
          <XStack
            maxWidth={1000}
            px="$4"
            justifyContent="center"
            alignContent="stretch"
            width="100%"
            space="$4"
            marginTop="$6"
            marginBottom="$10"
          >
            <YStack flexGrow={1} aspectRatio={1} display="flex" flexShrink={1}>
              <Paragraph textAlign="center" fontWeight="800">
                Original Photo
              </Paragraph>
              <Square backgroundColor={'$backgroundStrong'} f={1} alignContent="center">
                <Image
                  source={{
                    uri: 'https://www.devgould.com/content/images/2023/06/a-photo-of-sks-dog.jpg',
                  }}
                  width="100%"
                  height="100%"
                  borderRadius={'$3'}
                />
              </Square>
            </YStack>
            <YStack flexGrow={1} aspectRatio={1} display="flex" flexShrink={1}>
              <Paragraph textAlign="center" fontWeight="800">
                After CharlieAI
              </Paragraph>
              <Square backgroundColor={'$backgroundStrong'} f={1} alignContent="center">
                <Image
                  source={{
                    uri: 'https://imagedelivery.net/Pg1MxPV3UBYR5Z4j-Ai2dQ/f4ed57f8-9cf8-42e1-2acd-84b5fdd09500/public',
                  }}
                  width="100%"
                  height="100%"
                  borderRadius={'$3'}
                />
              </Square>
            </YStack>
          </XStack>
        </YStack>
        <YStack alignItems="center" space="$4" backgroundColor={'$blue2Dark'} py="$6">
          <XStack maxWidth={600} justifyContent={'center'}>
            <H2 textAlign="center">See what our customers have been creating</H2>
          </XStack>
          <XStack
            space="$4"
            width={'100%'}
            maxWidth={1000}
            px="$4"
            justifyContent="center"
            alignContent="stretch"
          >
            <Image
              source={{
                uri: 'https://imagedelivery.net/Pg1MxPV3UBYR5Z4j-Ai2dQ/51745853-5d6c-4c86-e358-ebdb45537400/public',
              }}
              flexGrow={1}
              aspectRatio={1}
              borderRadius={'$3'}
            />
            <Image
              source={{
                uri: 'https://imagedelivery.net/Pg1MxPV3UBYR5Z4j-Ai2dQ/8f4c9f90-c893-4e1a-a86b-1b4f0e9fb600/public',
              }}
              flexGrow={1}
              aspectRatio={1}
              borderRadius={'$3'}
            />
            <Image
              source={{
                uri: 'https://imagedelivery.net/Pg1MxPV3UBYR5Z4j-Ai2dQ/b2d0966e-e157-4d85-6fc4-3f94243e7b00/public',
              }}
              flexGrow={1}
              aspectRatio={1}
              borderRadius={'$3'}
            />
            <Image
              source={{
                uri: 'https://imagedelivery.net/Pg1MxPV3UBYR5Z4j-Ai2dQ/cfefec61-63e3-4ce4-01a7-bc05e23ba700/public',
              }}
              flexGrow={1}
              aspectRatio={1}
              borderRadius={'$3'}
            />
          </XStack>
          <XStack
            space="$4"
            width={'100%'}
            maxWidth={1000}
            px="$4"
            justifyContent="center"
            alignContent="stretch"
          >
            <Image
              source={{
                uri: 'https://imagedelivery.net/Pg1MxPV3UBYR5Z4j-Ai2dQ/1f06e666-0f40-43ef-9caa-d1d4888ff900/public',
              }}
              flexGrow={1}
              aspectRatio={1}
              borderRadius={'$3'}
            />
            <Image
              source={{
                uri: 'https://imagedelivery.net/Pg1MxPV3UBYR5Z4j-Ai2dQ/d727be3f-f9ea-43b2-70d6-c1fcbaea2b00/public',
              }}
              flexGrow={1}
              aspectRatio={1}
              borderRadius={'$3'}
            />
            <Image
              source={{
                uri: 'https://imagedelivery.net/Pg1MxPV3UBYR5Z4j-Ai2dQ/557dc67e-7ae4-49b3-0497-db364e1aff00/public',
              }}
              flexGrow={1}
              aspectRatio={1}
              borderRadius={'$3'}
            />
            <Image
              source={{
                uri: 'https://imagedelivery.net/Pg1MxPV3UBYR5Z4j-Ai2dQ/717e2119-1428-443a-e979-90a96c826e00/public',
              }}
              flexGrow={1}
              aspectRatio={1}
              borderRadius={'$3'}
            />
          </XStack>
          <XStack
            space="$4"
            width={'100%'}
            maxWidth={1000}
            px="$4"
            justifyContent="center"
            alignContent="stretch"
          >
            <Image
              source={{
                uri: 'https://imagedelivery.net/Pg1MxPV3UBYR5Z4j-Ai2dQ/2113ba4f-e2e0-4d95-20aa-e38d0c44de00/public',
              }}
              flexGrow={1}
              aspectRatio={1}
              borderRadius={'$3'}
            />
            <Image
              source={{
                uri: 'https://imagedelivery.net/Pg1MxPV3UBYR5Z4j-Ai2dQ/21533073-804f-409f-df92-1189ebf06700/public',
              }}
              flexGrow={1}
              aspectRatio={1}
              borderRadius={'$3'}
            />
            <Image
              source={{
                uri: 'https://imagedelivery.net/Pg1MxPV3UBYR5Z4j-Ai2dQ/f3773088-61ce-4d74-6db2-0694b0f84600/public',
              }}
              flexGrow={1}
              aspectRatio={1}
              borderRadius={'$3'}
            />
            <Image
              source={{
                uri: 'https://imagedelivery.net/Pg1MxPV3UBYR5Z4j-Ai2dQ/3e9e07ea-e92c-4164-0f6e-460ef0dfd800/public',
              }}
              flexGrow={1}
              aspectRatio={1}
              borderRadius={'$3'}
            />
          </XStack>
        </YStack>
        <XStack
          borderTopWidth={1}
          borderTopColor={'$gray6'}
          padding="$4"
          justifyContent="space-between"
        >
          <Paragraph color="$gray9">
            Powered By{' '}
            <a href="https://tamagui.dev/" target="_blank">
              Tamagui
            </a>
            , and{' '}
            <a href="https://vercel.com/" target="_blank">
              Vercel
            </a>
          </Paragraph>
          <Paragraph color="$gray9">Created by Devin Gould (me@devgould.com)</Paragraph>
          <a href="https://twitter.com/devingould18" target="_blank">
            <Twitter color="$gray9" />
          </a>
        </XStack>
      </YStack>
    </>
  )
}
