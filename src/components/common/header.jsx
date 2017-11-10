import React from 'react';
import { Link, IndexLink } from 'react-router';

const Header = () => (
  <nav>
    <IndexLink to="/" activeClassName="active">
      Home
    </IndexLink>
    {' | '}
    <Link to="/courses" href="/courses" activeClassName="active">
      Courses
    </Link>
    {' | '}
    <Link to="/about" href="/about" activeClassName="active">
      About
    </Link>
  </nav>
);

export default Header;
