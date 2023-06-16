import { Screen1 } from 'app/features/onboarding/screen-1'
import HomeScreen from 'app/page'
import Head from 'next/head'

export default function Page() {
  return (
    <>
      <Head>
        <title>User</title>
      </Head>
      <HomeScreen />
    </>
  )
}
