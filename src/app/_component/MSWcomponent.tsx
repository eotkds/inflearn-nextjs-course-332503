'use client'
import { Suspense, use } from 'react'
import { handlers } from '@/mocks/handlers'
const mockingEnabledPromise =
  typeof window !== 'undefined'
    ? import('@/mocks/browser').then(async ({ default: worker }) => {
      if (process.env.NODE_ENV === 'production') {
        return;
      }
      await worker.start({
        onUnhandledRequest(request, print) {
          if (request.url.includes('_next')) {
            return
          }
          print.warning()
        },
      })
      worker.use(...handlers);
      (module as any).hot?.dispose(() => { worker.stop(); }); // !69098 Module incorrectly persists between hot updates (HMR) in the browser
      console.log(worker.listHandlers())
    })
    : Promise.resolve()
export function MSWProvider({
                              children,
                            }: Readonly<{
  children: React.ReactNode
}>) {
  // If MSW is enabled, we need to wait for the worker to start,
  // so we wrap the children in a Suspense boundary until it's ready.
  return (
    <Suspense fallback={null}>
      <MSWProviderWrapper>{children}</MSWProviderWrapper>
    </Suspense>
  )
}
function MSWProviderWrapper({
                              children,
                            }: Readonly<{
  children: React.ReactNode
}>) {
  use(mockingEnabledPromise)
  return children
}