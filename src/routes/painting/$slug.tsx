import { createFileRoute } from '@tanstack/react-router'
import {ItemInfoPaintings} from '../../components/ui/productinfo'

export const Route = createFileRoute('/painting/$slug')({
  component: RouteComponent,
})

function RouteComponent() {
  const {slug} = Route.useParams();
  return (<ItemInfoPaintings slug={slug}></ItemInfoPaintings>)
}
