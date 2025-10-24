import { User } from 'lucide-react'
import React from 'react'
import { Button } from './components/ui/button'

const ProfileButton = () => {
  return (
    <Button variant="outline" className="flex items-center gap-1 cursor-pointer">
      <User size={16} />
      Войти
    </Button>
  )
}

export default ProfileButton