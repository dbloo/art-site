import { createFileRoute } from '@tanstack/react-router'
import { useCart } from '#/context/CartContext'
import { Spinner } from '#/components/ui/spinner'

import { Cart } from '#/components/ui/cart'
import { useEffect, useState } from 'react'

export const Route = createFileRoute('/cart')({
  component: RouteComponent,
})

function RouteComponent() {
  return (<div>

    <Cart></Cart>


  </div>)
}
