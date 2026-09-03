import { createFileRoute } from '@tanstack/react-router'
import { ConstructionPage } from '@/components/ui/construction'

export const Route = createFileRoute('/contact')({
  component: RouteComponent,
})

function RouteComponent() {
  return <ConstructionPage/>
}
