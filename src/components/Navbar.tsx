import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { pages } from "../utils/constants";

const StyledNavbar = styled.nav`
  height: 10rem;
  background-color: green;
  display: flex;
  align-items: center;
  justify-content: space-around;

  margin-bottom: 3rem;

  .logo {
    font-size: 3rem;
  }

  .random-item {
    font-size: 3rem;
  }

  .page-routes {
    list-style: none;
    display: flex;
    gap: 1.5rem;

    &__item {
      font-size: 2rem;
    }
  }
`;

const Navbar = () => {
  const pagesLinks = pages.map((item) => {
    return (
      <Link to={`/${item.url}`} key={item.id}>
        <li className="page-routes__item">{item.name}</li>
      </Link>
    );
  });

  return (
    <StyledNavbar>
      <div className="logo">logo</div>
      <ul className="page-routes">{pagesLinks}</ul>
      <div className="random-item">random item</div>
    </StyledNavbar>
  );
};

export default Navbar;
