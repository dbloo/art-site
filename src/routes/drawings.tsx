import { createFileRoute } from '@tanstack/react-router'
import { ConstructionPage } from '#/components/ui/construction'

export const Route = createFileRoute('/drawings')({
  component: RouteComponent,
})

function RouteComponent() {
  return <ConstructionPage/>
}
