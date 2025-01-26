'use client'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { Button } from "@/components/ui/button"
import { User2, ChevronUp, Menu, Home, Search, Map, Info, History as HistoryIcon, ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"
import Image from "next/image"
import Link from "next/link"
import { useState, useTransition } from "react"
import { useRouter } from "next/navigation"
import { HistoryList } from "./history-list"

const NavigationItem = ({ href, icon: Icon, children }: { href: string; icon: any; children: React.ReactNode }) => (
  <Link href={href}>
    <Button variant="ghost" className="w-full justify-start gap-2">
      <Icon className="h-4 w-4" />
      <span>{children}</span>
    </Button>
  </Link>
)

const SidebarContent = ({ isMobile = false }: { isMobile?: boolean }) => {
  const [isHistoryOpen, setIsHistoryOpen] = useState(false)
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const enableSaveChatHistory = process.env.NEXT_PUBLIC_ENABLE_SAVE_CHAT_HISTORY === 'true'

  const handleHistoryToggle = (open: boolean) => {
    setIsHistoryOpen(open)
    if (open) {
      startTransition(() => {
        router.refresh()
      })
    }
  }

  return (
    <div className={cn(
      "flex flex-col h-full",
      isMobile ? "min-h-[100dvh]" : "h-screen"
    )}>
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

      {/* Main Navigation */}
      <div className="flex-1 overflow-y-auto p-2 space-y-1">
        <NavigationItem href="/" icon={Home}>
          Home
        </NavigationItem>
        <NavigationItem href="/search" icon={Search}>
          Search
        </NavigationItem>
        <NavigationItem href="/places" icon={Map}>
          Places
        </NavigationItem>
        <NavigationItem href="/about" icon={Info}>
          About
        </NavigationItem>

        {/* History Section */}
        {enableSaveChatHistory && (
          <Collapsible
            open={isHistoryOpen}
            onOpenChange={handleHistoryToggle}
            className="space-y-1"
          >
            <CollapsibleTrigger asChild>
              <Button 
                variant="ghost" 
                className="w-full justify-start gap-2"
              >
                <HistoryIcon className="h-4 w-4" />
                <span>History</span>
                <ChevronDown className={cn(
                  "ml-auto h-4 w-4 transition-transform duration-200",
                  isHistoryOpen && "rotate-180"
                )} />
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="relative data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down">
              <div className="pl-6 pr-2 max-h-[60vh] overflow-y-auto">
                {isPending ? (
                  <div className="text-foreground/30 text-sm text-center py-4">
                    Loading...
                  </div>
                ) : (
                  <HistoryList userId="anonymous" />
                )}
              </div>
            </CollapsibleContent>
          </Collapsible>
        )}
      </div>

      {/* Footer with Dropdown Menu */}
      <div className="border-t p-2 sticky bottom-0 bg-background">
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

export function MainSidebar() {
  return (
    <>
      {/* Mobile View */}
      <div className="lg:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="fixed top-4 left-4 z-40 md:top-2 md:left-2"
              aria-label="Open menu"
            >
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent 
            side="left" 
            className="w-full max-w-[300px] p-0 sm:w-[300px]"
          >
            <SheetHeader className="sr-only">
              <SheetTitle>Navigation Menu</SheetTitle>
              <SheetDescription>
                Access navigation links and user settings
              </SheetDescription>
            </SheetHeader>
            <SidebarContent isMobile />
          </SheetContent>
        </Sheet>
      </div>

      {/* Desktop View */}
      <div className="hidden lg:block">
        <div className="w-64 border-r bg-background fixed top-0 left-0 bottom-0 z-30">
          <SidebarContent />
        </div>
        <div className="w-64 flex-shrink-0" aria-hidden="true" />
      </div>
    </>
  )
}
