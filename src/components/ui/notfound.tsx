import { Link } from '@tanstack/react-router'
import { StyledButton } from './button'
import { ArrowLeft } from 'lucide-react'

export function NotFound() {
  return (
    <main className="rise-in mx-auto flex min-h-[80svh] w-full max-w-7xl flex-col justify-center px-5 pb-20 pt-28 lg:px-12 lg:pt-36">
      <p
        aria-hidden="true"
        className="text-[7rem] font-black leading-none tracking-tighter sm:text-[10rem] lg:text-[16rem]"
      >
        <span className="bg-[#FADE3E] px-3 lg:px-6">404</span>
      </p>

      <h1 className="mt-8 text-4xl font-black tracking-tight lg:mt-12 lg:text-6xl">
        This page doesn't exist.
      </h1>
      <p className="mt-3 max-w-md text-lg font-light text-black/60 lg:text-xl">
        The link may be broken, or the page may have moved.
      </p>

      <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-8">
        <StyledButton
          to="/"
          className="border border-black bg-white text-black"
        >
        <ArrowLeft/>
          Back to home
          
        </StyledButton>

        
      </div>
    </main>
  )
}