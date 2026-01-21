import React from 'react'
import { useForm } from 'react-hook-form'

const LoginForm = () => {
  const form = useForm({
    defaultValues: {
      email: '',
      password: '',
    }
  });
  return (
    <div>LoginForm</div>
  )
}

export default LoginForm