'use client'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { User2, ChevronUp } from "lucide-react"
import { cn } from "@/lib/utils"
import Image from "next/image"

export function MainSidebar() {
  return (
    <div className="h-screen w-64 border-r bg-background fixed top-0 left-0 flex flex-col">
      {/* Header */}
      <div className="p-4 border-b flex items-center gap-2">
        <Image 
          src="/logo.png" 
          alt="Local Japan Logo" 
          width={24} 
          height={24} 
          className="object-contain" 
        />
        <h2 className="font-semibold">Local Japan</h2>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto p-4">
        {/* Add your main sidebar content here */}
      </div>

      {/* Footer with Dropdown Menu */}
      <div className="border-t p-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button 
              variant="ghost" 
              className="w-full justify-start gap-2"
            >
              <User2 className="h-4 w-4" />
              <span>Username</span>
              <ChevronUp className="ml-auto h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            side="top"
            align="start"
            className="w-[--radix-dropdown-menu-trigger-width]"
          >
            <DropdownMenuItem>
              <span>Account</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <span>Settings</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <span>Sign out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
}
