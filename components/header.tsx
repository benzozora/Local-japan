import React from 'react'
import { cn } from '@/lib/utils'

export const Header: React.FC = () => {
  return (
    <header className="fixed w-full p-1 md:p-2 flex justify-end items-center z-10 backdrop-blur md:backdrop-blur-none bg-background/80 md:bg-transparent">
      <div className="flex gap-0.5">
        {/* Theme toggle moved to sidebar */}
      </div>
    </header>
  )
}

export default Header
