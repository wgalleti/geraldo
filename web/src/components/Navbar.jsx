import { Link } from 'react-router-dom'
import { ExitIcon, HomeIcon, KeyboardIcon } from '@radix-ui/react-icons'
import { Logo } from '../components/Logo'
import { DropdownMenu } from './Dropdown/Index'
import { useAuth } from '../hooks/useAuth'
import { useEffect, useState, useMemo } from 'react'
import { cn } from '../utils/classname.js'

const CustomNavbar = () => {
  const [avatarLabel, setAvatarLabel] = useState('BR')
  const adminLinks = [
    { to: '/companies', title: 'Empresas', type: 'secondary' },
    { to: '/users', title: 'Usuários', type: 'secondary' }
  ]

  const registerLinks = [
    { to: '/payments', title: 'Pagamentos', type: 'secondary' },
    { to: '/unities', title: 'Medidas', type: 'secondary' },
    { to: '/product-groups', title: 'Grupos de Produtos', type: 'secondary' },
    { to: '/products', title: 'Produtos', type: 'secondary' },
    { type: 'separator' },
    { to: '/buyers', title: 'Compradores', type: 'secondary' },
    { to: '/suppliers', title: 'Fornecedores', type: 'secondary' }
  ]

  const { logout, user } = useAuth()

  const isAdmin = useMemo(
    () => user && (user?.is_manager || user?.is_superuser),
    [user]
  )
  const isBuyer = useMemo(() => user && (user?.is_buyer || isAdmin), [user])

  useEffect(() => {
    if (user?.username) {
      const names = user.username.split(' ')
      switch (names.length) {
        case 1:
          setAvatarLabel(`${names[0][0]}${names[0][1]}`.toUpperCase())
          break
        case 2:
          setAvatarLabel(`${names[0][0]}${names[1][0]}`.toUpperCase())
          break
        default:
          setAvatarLabel(
            `${names[0][0]}${names[names.length - 1][0]}`.toUpperCase()
          )
          break
      }
    }
  }, [user])

  return (
    <nav>
      <Logo className='h-full p-2' />
      <ul>
        <li>
          <Link to='/' className='flex gap-2'>
            <KeyboardIcon className='h-6 w-6' />
          </Link>
        </li>
        {isAdmin && (
          <li>
            <DropdownMenu.Root>
              <DropdownMenu.Trigger>
                <span>Administração</span>
              </DropdownMenu.Trigger>

              <DropdownMenu.Content>
                {adminLinks.map((link, index) => {
                  if (link && link?.type === 'separator') {
                    return <DropdownMenu.Separator key={index} />
                  }
                  return (
                    <DropdownMenu.Item key={index}>
                      <Link to={link.to}>{link.title}</Link>
                    </DropdownMenu.Item>
                  )
                })}
              </DropdownMenu.Content>
            </DropdownMenu.Root>
          </li>
        )}
        {isBuyer && (
          <li>
            <DropdownMenu.Root>
              <DropdownMenu.Trigger>
                <span>Cadastros</span>
              </DropdownMenu.Trigger>

              <DropdownMenu.Content>
                {registerLinks.map((link, index) => (
                  <DropdownMenu.Item key={index}>
                    <Link to={link.to}>{link.title}</Link>
                  </DropdownMenu.Item>
                ))}
              </DropdownMenu.Content>
            </DropdownMenu.Root>
          </li>
        )}

        <li>
          <DropdownMenu.Root>
            <DropdownMenu.Trigger>
              <span
                className={cn(
                  'flex items-center justify-center gap-1 rounded-full h-10 w-10 border border-dashed border-gray-600'
                )}
              >
                {avatarLabel}
              </span>
            </DropdownMenu.Trigger>

            <DropdownMenu.Content>
              <DropdownMenu.Item>
                <button
                  className='w-14 flex items-center justify-between'
                  onClick={logout}
                >
                  Sair
                  <ExitIcon className='h-3 w-3' />
                </button>
              </DropdownMenu.Item>
            </DropdownMenu.Content>
          </DropdownMenu.Root>
        </li>
      </ul>
    </nav>
  )
}

export { CustomNavbar }
