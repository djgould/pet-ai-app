import { ProfileScreen } from 'app/features/profile/profile-screen'
import Head from 'next/head'

export default function Page() {
  return (
    <>
      <Head>
        <title>User</title>
      </Head>
      <ProfileScreen />
    </>
  )
}
