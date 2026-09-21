

import { createFileRoute } from '@tanstack/react-router'
import {useForm} from '@tanstack/react-form'
import {useState, useEffect} from 'react'
import { Spinner } from '#/components/ui/spinner'

import {
  Field,
  FieldError,
  FieldGroup,
  FieldSet,
} from "@/components/ui/field"

import { Input } from "@/components/ui/input"
import {Textarea} from "@/components/ui/textarea"

import { AnimatePresence, motion } from 'framer-motion'


import { StyledButton } from '#/components/ui/button'
import { submitContactForm } from '../serverFunctions/contact'
import { ConstructionPage } from '#/components/ui/construction'
import {z} from "zod"






export const Route = createFileRoute('/contact')({
  component: RouteComponent,
})

export const  contactSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Please enter a valid email address'),
  message: z.string().min(1, 'Message is required'),
})

function RouteComponent() {

    const construction = true;

    const [status, setStatus] = useState(0)
    const [isLoading, setIsLoading] = useState(false);
    const [showMessage, setShowMessage] = useState(false);



  


   

const contactForm = useForm({
  validators: { onSubmit: contactSchema},
  defaultValues: {
    name: '',
    email: '',
    message: '',
  },
  onSubmit: async ({value}) => {
    try {
                setIsLoading(true);
                await submitContactForm({ data: value  as any })
                setStatus(2)
                contactForm.reset()
                setIsLoading(false)
            } catch (error) {
                setIsLoading(false);

                console.error('Error sending message:', error)
                setStatus(1)
            }
  }
})

useEffect(() => {
  if (status === 2) {
    setShowMessage(true);
    const timer = setTimeout(() => setShowMessage(false), 3000); // disappears after 3s
    return () => clearTimeout(timer);
  }
}, [status]);

if (construction) return <ConstructionPage/>

  return (
    <section className="w-screen h-auto flex justify-center items-center lg:p-20 pt-20 p-5">

        <div className="mt-20 lg:w-1/2 w-full  h-250 flex flex-col gap-5">
        <div className = "">
        <motion.h1 
        initial={{ y: -40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
        
        className = "lg:text-6xl text-6xl font-black text-black">
            
            Contact
            
            </motion.h1>
        <motion.p 
        
        initial={{ y: -40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.12 }}
            className="mt-5 font-light">
                
                Interested in working with me, or just have an inquiry? Drop me a line!
                
                </motion.p>
        </div>

        <div className="w-full h-auto">
            <FieldSet>
                
                <FieldGroup>
                    <motion.p 

                    initial={{ y: -40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.13 }}
                    
                    
                    className='mt-10 font-light'>Name</motion.p>
                    <contactForm.Field name="name"
                    children = {(field) => {
                        const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
                        return(
                            <Field>

                                <motion.div  initial={{ y: -40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.14 }} >
                                <Input
                                    id= {field.name}
                                    name= {field.name}
                                    value={field.state.value}
                                    onChange={(e) => field.handleChange(e.target.value)}
                                    onBlur={field.handleBlur}
                                    aria-invalid={isInvalid}
                                    type = "text"
                                    placeholder = "e.g John Doe"
                                    autoComplete = "off"
                                    className = "text-xl border-black"
                                />
                                </motion.div>

                                {isInvalid && <FieldError errors = {field.state.meta.errors}/>}

                            </Field>
                        )
                    }}/>

                    <motion.p 

                    initial={{ y: -40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.15 }}
                    
                    
                    className='mt-5 font-light'>Email</motion.p>
                    <contactForm.Field name="email"
                    children = {(field) => {
                        const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
                        return(
                            <Field>


                                    <motion.div  initial={{ y: -40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.16 }} >
                                <Input
                                    id= {field.name}
                                    name= {field.name}
                                    value={field.state.value}
                                    onChange={(e) => field.handleChange(e.target.value)}
                                    onBlur={field.handleBlur}
                                    aria-invalid={isInvalid}
                                    type = "text"
                                    placeholder = "e.g john.doe@example.com"
                                    autoComplete = "off"
                                    className = "text-xl border-black"
                                />
                        </motion.div>
                                {isInvalid && <FieldError errors = {field.state.meta.errors}/>}

                            </Field>
                        )
                    }}/>

                    <motion.p 

                    initial={{ y: -40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.17 }}
                    
                    
                    className='mt-5 font-light'>Message</motion.p>
                    <contactForm.Field name="message"
                    children = {(field) => {
                        const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
                        return(
                            <Field>

                            <motion.div  initial={{ y: -40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.18 }} >
                                <Textarea
                                    id= {field.name}
                                    name= {field.name}
                                    value={field.state.value}
                                    onChange={(e) => field.handleChange(e.target.value)}
                                    onBlur={field.handleBlur}
                                    aria-invalid={isInvalid}
                                    placeholder = ""
                                    autoComplete = "off"
                                    className = "text-xl mt-0 items-start border-black h-50"
                                />
                                </motion.div>

                                {isInvalid  && <FieldError errors = {field.state.meta.errors}/>}

                            </Field>
                        )
                    }}/>

<motion.div  initial={{ y: -40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.19 }} >
                    <StyledButton disabled = {isLoading} type = "submit" onClick={contactForm.handleSubmit} className = "w-full" color=''>{isLoading ? <Spinner/>: "Submit"}</StyledButton>
                    </motion.div>
                    {status == 1 && <p className = "text-red-500 mt-10">An error occurred. Please try again later.</p>}
                    <AnimatePresence>
                                {showMessage &&  <motion.p
                                    layout
                                    initial={{ y: -10, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.5 }}
                                
                                className = "text-center w-full z-1000 text-black mt-10">Message Sent! We'll reach out to you shortly.</motion.p>}
                                </AnimatePresence>
                    



                </FieldGroup>

            </FieldSet>
        </div>
        </div>

    </section>)
}

