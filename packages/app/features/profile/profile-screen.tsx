import { RedirectToSignIn, SignedIn, SignedOut, UserProfile } from '@clerk/nextjs'
import { Button, H1, XStack, YStack } from '@my/ui'

export function ProfileScreen() {
  return (
    <YStack ai={'center'} width="100%">
      <SignedIn>
        <XStack justifyContent="space-between" ai="center" width={'100%'} maxWidth={600} py={'$4'}>
          <H1>Your Profile</H1>
          <a href="mailto:devin@charlieai.app">
            <Button>Support</Button>
          </a>
          <a href="https://billing.stripe.com/p/login/eVa5oj8or81O4ta144">
            <Button>Manage subscription</Button>
          </a>
        </XStack>
        <UserProfile />
      </SignedIn>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </YStack>
  )
}
