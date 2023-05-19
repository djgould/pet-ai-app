import { OrdersScreen } from 'app/features/orders/orders-screen'
import Head from 'next/head'

export default function Page() {
  return (
    <>
      <Head>
        <title>User</title>
      </Head>
      <OrdersScreen />
    </>
  )
}
