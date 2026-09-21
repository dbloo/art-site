import {createServerFn} from '@tanstack/react-start'

export const submitContactForm = createServerFn({method: 'POST'})
.handler(async (ctx: any) => {
})

