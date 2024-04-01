import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Button,
  UncontrolledCollapse,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  UncontrolledDropdown,
  Media,
  NavbarBrand,
  Navbar,
  NavItem,
  Nav,
  Container,
  Row,
  Col,
} from "reactstrap";
import { API_URL } from "../../../config";

export default () => {
  const navigate = useNavigate();
  const logoutHandler = (e) => {
    fetch(`${API_URL}/logout`, {
      method: "GET",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((rs) => {
        if (rs.logout) {
          alert("logout successfully!");
          navigate("/login");
        } else {
          console.log("logout fail: ", rs);
        }
      });
  };
  return (
    <>
      <header className="header-global">
        <Navbar
          className="navbar-main navbar-transparent navbar-light headroom"
          expand="lg"
          id="navbar-main"
        >
          <Container>
            <NavbarBrand className="mr-lg-5" to="/" tag={Link}>
              <img
                alt="..."
                src="https://upload.wikimedia.org/wikipedia/commons/8/8a/GPSK_logo_800x800.jpg"
              />
            </NavbarBrand>
            <button className="navbar-toggler" id="navbar_global">
              <span className="navbar-toggler-icon" />
            </button>
            <UncontrolledCollapse toggler="#navbar_global" navbar>
              <div className="navbar-collapse-header">
                <Row>
                  <Col className="collapse-brand" xs="6">
                    <Link to="/">
                      <img
                        alt="..."
                        src="https://upload.wikimedia.org/wikipedia/commons/2/2f/Baby.tux.sit-800x800.png"
                      />
                    </Link>
                  </Col>
                  <Col className="collapse-close" xs="6">
                    <button className="navbar-toggler" id="navbar_global">
                      <span />
                      <span />
                    </button>
                  </Col>
                </Row>
              </div>
              <Nav className="navbar-nav-hover align-items-lg-center" navbar>
                <UncontrolledDropdown nav>
                  <DropdownToggle nav>
                    <i className="ni ni-collection d-lg-none mr-1" />
                    <span className="nav-link-inner--text">Examples</span>
                  </DropdownToggle>
                  <DropdownMenu>
                    <DropdownItem to="/" tag={Link}>
                      Landing
                    </DropdownItem>
                    <DropdownItem to="/profile" tag={Link}>
                      Profile
                    </DropdownItem>
                    <DropdownItem to="/login" tag={Link}>
                      Login
                    </DropdownItem>
                    <DropdownItem to="/register" tag={Link}>
                      Register
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
              </Nav>
              <Nav className="align-items-lg-center ml-lg-auto" navbar>
                <NavItem className="d-none d-lg-block ml-lg-4">
                  <Button
                    className="btn-neutral btn-icon"
                    color="default"
                    target="_blank"
                    onClick={logoutHandler}
                  >
                    <span className="btn-inner--icon">
                      <i className="fa fa-cloud-download mr-2" />
                    </span>
                    <span className="nav-link-inner--text ml-1">Logout</span>
                  </Button>
                </NavItem>
              </Nav>
            </UncontrolledCollapse>
          </Container>
        </Navbar>
      </header>
    </>
  );
};
