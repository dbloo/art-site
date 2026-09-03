import {
  HeadContent,
  Scripts,
  createRootRouteWithContext,
} from '@tanstack/react-router'

import { CartProvider } from '#/context/CartContext'


import Navbar from '../components/ui/navbar'

import appCss from '../styles.css?url'

import type { QueryClient } from '@tanstack/react-query'
import { Footer } from '#/components/ui/footer'

interface MyRouterContext {
  queryClient: QueryClient
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        title: 'Dominic Bloomfield',
      },
    ],
    links: [
      {
        rel: 'stylesheet',
        href: appCss,
      },
    ],
  }),
  shellComponent: RootDocument,
})

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
            <CartProvider>

      <body>
        <Navbar />
        {children}
        <Footer />
        <Scripts />
      </body>
      </CartProvider>
    </html>
  )
}
