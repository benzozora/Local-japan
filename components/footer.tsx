import React from 'react'

const Footer: React.FC = () => {
  return (
    <footer className="mt-auto py-4 border-t">
      <div className="container mx-auto px-4 max-w-3xl text-center text-sm text-muted-foreground">
        {new Date().getFullYear()} Local Japan. All rights reserved.
      </div>
    </footer>
  )
}

export default Footer
