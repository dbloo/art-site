import { createFileRoute } from '@tanstack/react-router'


import { Cart } from '#/components/ui/cart'

export const Route = createFileRoute('/cart')({
  component: RouteComponent,
})

function RouteComponent() {
  return (<div>

    <Cart></Cart>


  </div>)
}
