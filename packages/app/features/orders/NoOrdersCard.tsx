import { Button, Card, YStack, H4 } from '@my/ui'
import { useLink } from 'solito/link'

export function NoOrdersCard() {
  const linkProps = useLink({
    href: '/selector',
  })

  return (
    <YStack f={1} jc="center" ai="center" width="100%">
      <Card
        elevate
        size="$4"
        bordered
        animation="bouncy"
        width={'100%'}
        maxWidth={600}
        height={300}
        scale={0.9}
        hoverStyle={{ scale: 0.925 }}
        pressStyle={{ scale: 0.875 }}
        jc="center"
        ai="center"
      >
        <H4>You haven't started an order yet</H4>
        <Button mt="$4" {...linkProps}>
          Get started
        </Button>
      </Card>
    </YStack>
  )
}
