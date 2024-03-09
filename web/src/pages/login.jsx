import { Logo } from '../components/Logo'
import { Form } from 'devextreme-react'
import { useAuth } from '../hooks/useAuth'
import { useRef } from 'react'

export const LoginPage = () => {
  const formRef = useRef(null)
  const { login } = useAuth()
  const formConfig = {
    labelLocation: 'top',
    items: [
      {
        dataField: 'email',
        label: {
          text: 'Email'
        },
        validationRules: [{ type: 'required' }]
      },
      {
        dataField: 'password',
        label: {
          text: 'Senha'
        },
        editorType: 'dxTextBox',
        editorOptions: {
          mode: 'password'
        },
        validationRules: [{ type: 'required' }]
      },
      {
        itemType: 'button',
        buttonOptions: {
          text: 'Entrar',
          icon: 'user',
          useSubmitBehavior: true,
          elementAttr: {
            class: 'btn-login'
          }
        },
        horizontalAlignment: 'center'
      }
    ]
  }

  const submitHandle = (e) => {
    e.preventDefault()
    const formData = formRef.current.instance.option('formData')
    login(formData)
  }

  return (
    <div className='h-full w-full flex flex-col text-gray-300 justify-center items-center'>
      <Logo className='h-14 p-1 border rounded-lg shadow-md' />
      <span className='text-3xl tracking-tighter font-thin uppercase'>
        Geraldo
      </span>

      <form onSubmit={submitHandle} className='w-[500px]'>
        <Form {...formConfig} className='w-full h-fit p-5' ref={formRef} />
      </form>
    </div>
  )
}
