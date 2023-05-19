import { useAuth } from '@clerk/nextjs'
import { Spinner, YStack } from '@my/ui'
import { useRouter } from 'solito/router'

export function OnboardingBoundary({ children }: { children: React.ReactNode }) {
  const { isLoaded, isSignedIn } = useAuth()
  const router = useRouter()

  if (!isLoaded) {
    return (
      <YStack jc="center" ai="center">
        <Spinner size="large" />
      </YStack>
    )
  }

  console.log('isSignedIn', isSignedIn)
  console.log('window.location.pathname', window.location.pathname)

  if (
    (isSignedIn && window.location.pathname.startsWith('/onboarding')) ||
    window.location.pathname === '/'
  ) {
    router.push('/orders')
    return (
      <YStack jc="center" ai="center">
        <Spinner size="large" />
      </YStack>
    )
  }

  return <div>{children}</div>
}
