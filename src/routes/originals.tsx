import { createFileRoute } from '@tanstack/react-router'
import { ConstructionPage } from '#/components/ui/construction'

export const Route = createFileRoute('/originals')({
  component: RouteComponent,
})

function RouteComponent() {
  return <ConstructionPage/>
}
