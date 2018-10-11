import React from 'react';
import { Link } from 'react-router-dom';
import RouterFragment from './router/RouterFragment';

const Main = () => (
  <RouterFragment index="m">
    <Link to="/a">a</Link>
    <p>asdasjdlksa</p>
    <Link to="/b">b</Link>
    <div>bewqew</div>
  </RouterFragment>
);

export default Main;
