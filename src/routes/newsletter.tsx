import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/newsletter')({
  beforeLoad: () => {
    throw redirect({ to: '/', hash: 'newsletter' })
  },
})