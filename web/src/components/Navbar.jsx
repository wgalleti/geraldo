import { Container, Nav, Navbar, Offcanvas } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

export default function CustomNavbar() {
  const links = [
    { to: "/companies", title: "Empresas", type: "secondary" },
    { to: "/users", title: "Usuários", type: "secondary" },
    { to: "/payments", title: "Pagamentos", type: "secondary" },
    { to: "/unities", title: "Medidas", type: "secondary" },
    { to: "/product-groups", title: "Grupos de Produtos", type: "secondary" },
    { to: "/products", title: "Produtos", type: "secondary" },
    { to: "/buyers", title: "Compradores", type: "secondary" },
    { to: "/suppliers", title: "Fornecedores", type: "secondary" },
  ];
  return (
    <Navbar
      collapseOnSelect
      variant="dark"
      fixed="sticky"
      expand={false}
      className="bg-gradient-to-b from-gray-700"
    >
      <Container fluid>
        <Navbar.Toggle aria-controls="offcanvasNavbar" />
        <Navbar.Brand className="mx-2">Geraldo</Navbar.Brand>
        <Nav className="flex-grow">
          {links &&
            links
              .filter((f) => f.type === "main" || false)
              .map((l) => (
                <LinkContainer to={l.to} key={l.to}>
                  <Nav.Link>{l.title}</Nav.Link>
                </LinkContainer>
              ))}
        </Nav>
        <Navbar.Offcanvas
          id="offcanvasNavbar"
          aria-labelledby="offcanvasNavbarLabel"
          placement="start"
          className="bg-gray-700 text-gray-200"
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title id="offcanvasNavbarLabel">Options</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Nav className="justify-content-end flex-grow-1 pe-3">
              <LinkContainer to="/">
                <Nav.Link>Home</Nav.Link>
              </LinkContainer>
              {links &&
                links
                  .filter((f) => f.type === "secondary" || false)
                  .map((l) => (
                    <LinkContainer to={l.to} key={l.to}>
                      <Nav.Link>{l.title}</Nav.Link>
                    </LinkContainer>
                  ))}
            </Nav>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  );
};