import { Card, H2, Paragraph, XStack, Spinner, Button, H1, YStack, Image, Progress } from '@my/ui'
import { AlertCircle, Moon } from '@tamagui/lucide-icons'
import { useUser } from 'app/provider/User'
import { DateTime } from 'luxon'
import { Link, useLink } from 'solito/link'

export function OrderCard({ order }) {
  const linkProps = useLink({
    href: `/orders/${order.id}`,
  })

  return (
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
      {...linkProps}
      overflow="hidden"
    >
      <Card.Header padded>
        <XStack>
          <YStack>
            <OrderStatus status={order.status} />
            <Paragraph theme="alt2">
              {DateTime.fromISO(order.createdAt).toFormat("MM-dd-yy 'at' HH:mm")}
            </Paragraph>
          </YStack>
        </XStack>
      </Card.Header>

      <XStack
        flex={1}
        justifyContent="center"
        alignContent="stretch"
        space="$4"
        width="100%"
        paddingHorizontal="$4"
        overflow="hidden"
      >
        {order.resultImages?.length > 0
          ? order?.resultImages?.slice(0, 5).map((image) => {
              return <Image source={{ uri: image.url }} aspectRatio={1} />
            })
          : order?.trainingImages?.slice(0, 5).map((image) => {
              return <Image source={{ uri: image.url }} aspectRatio={1} />
            })}
      </XStack>
      <Card.Footer padded>
        <XStack flex={1} />
        <Button borderRadius="$10">{getOrderButtonText(order)}</Button>
      </Card.Footer>
      <CardBackground status={order.status} eta={order.eta} />
    </Card>
  )
}

function OrderStatus({ status }) {
  const user = useUser()

  if (status === 'UPLOADING_MODEL' || status === 'INFERING' || status === 'TRAINING') {
    return <H2>Generating Images</H2>
  } else if (status === 'PENDING') {
    return user.data?.tier !== 'basic' ? <H2>Payment Required</H2> : <H2>Pending</H2>
  } else if (status === 'COMPLETED') {
    return <H2>Completed</H2>
  } else if (status === 'FAILED') {
    return <H2>Failed</H2>
  }

  return <H2>{status}</H2>
}

function getOrderButtonText({ status, eta }) {
  if (status === 'UPLOADING_MODEL' || status === 'INFERING' || status === 'TRAINING') {
    return `ETA ${Math.floor(eta / 60)} minutes ${eta % 60} seconds`
  } else if (status === 'COMPLETED') {
    return 'View Order'
  } else if (status === 'FAILED') {
    return 'Contact Suppport'
  }

  return 'Contact Support'
}

function CardBackground({ status, eta }) {
  if (status === 'UPLOADING_MODEL' || status === 'INFERING' || status === 'TRAINING') {
    return (
      <Card.Background justifyContent="flex-end" paddingHorizontal="$4" pb="$2">
        <Progress value={Math.max(((1900 - eta) / 1900) * 100 || 0, 2)}>
          <Progress.Indicator animation="bouncy" />
        </Progress>
      </Card.Background>
    )
  } else if (status === 'COMPLETE') {
    return (
      <Card.Background justifyContent="center">
        <Moon size={64} />
      </Card.Background>
    )
  } else if (status === 'FAILED') {
    return (
      <Card.Background justifyContent="center" alignItems="center">
        <AlertCircle size={64} />
      </Card.Background>
    )
  }

  return null
}
