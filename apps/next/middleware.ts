import { authMiddleware } from '@clerk/nextjs'

export default authMiddleware({
  beforeAuth(req, evt) {
    console.log(req, evt)
  },
  publicRoutes: ['/', '/onboarding/(.*)'],
})

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
}
