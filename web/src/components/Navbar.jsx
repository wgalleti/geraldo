import { Link } from "react-router-dom";
import { ExitIcon } from "@radix-ui/react-icons";
import { Logo } from "../components/Logo";
import { DropdownMenu } from "../components/DropDown/Index";
import { useAuth } from "../hooks/useAuth";


const CustomNavbar = () => {
  const adminLinks = [
    { to: "/companies", title: "Empresas", type: "secondary" },
    { to: "/users", title: "Usuários", type: "secondary" },
  ]

  const registerLinks = [
    { to: "/payments", title: "Pagamentos", type: "secondary" },
    { to: "/unities", title: "Medidas", type: "secondary" },
    { to: "/product-groups", title: "Grupos de Produtos", type: "secondary" },
    { to: "/products", title: "Produtos", type: "secondary" },
    { to: "/buyers", title: "Compradores", type: "secondary" },
    { to: "/suppliers", title: "Fornecedores", type: "secondary" },
  ];

  const { logout } = useAuth();
  return (
    <nav>
      <Logo className="h-full p-2" />
      <ul>
        <li><Link to="/">Dashboard</Link></li>
        <li>
          <DropdownMenu.Root>
            <DropdownMenu.Trigger>
              <span>Administração</span>
            </DropdownMenu.Trigger>

            <DropdownMenu.Content>
              {adminLinks.map((link, index) => (
                <DropdownMenu.Item
                  key={index}
                >
                  <Link to={link.to}>{link.title}</Link>
                </DropdownMenu.Item>
              ))}
            </DropdownMenu.Content>
          </DropdownMenu.Root>
        </li>

        <li>
          <DropdownMenu.Root>
            <DropdownMenu.Trigger>
              <span>Cadastros</span>
            </DropdownMenu.Trigger>

            <DropdownMenu.Content>
              {registerLinks.map((link, index) => (
                <DropdownMenu.Item
                  key={index}
                >
                  <Link to={link.to}>{link.title}</Link>
                </DropdownMenu.Item>
              ))}
            </DropdownMenu.Content>
          </DropdownMenu.Root>
        </li>
        <li>
          <button onClick={logout} className="flex items-center justify-center gap-1">
            Sair
            <ExitIcon />
          </button>
        </li>
      </ul>
    </nav>
  );
}

export { CustomNavbar }
