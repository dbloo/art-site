import { createFileRoute } from '@tanstack/react-router'
import {Series} from '@/components/ui/series'

export const Route = createFileRoute('/series/$slug')({
  component: RouteComponent,
})


function RouteComponent() {
    const {slug} = Route.useParams();

  return (<Series slug ={slug}/>)
}
