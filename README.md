# React Router Dynamic Example

React Router 의 컴포넌트를 url 경로에 따라 동적으로 호출하는 예제입니다.

- http://localhost:8081/#/a -> a.js 
- http://localhost:8081/#/b -> b.js 
- http://localhost:8081/#/ -> m.js `<RouterFragment index="m">`

**getting started**

```shell
$ npm install
$ npm run serv or build
```

**< / > data.json**

직접 작성하거나 webpack 을 통해 생성하면 됩니다.

```json
{
  "m": "m.js",
  "a": "a.js",
  "b": "b.js"
}
```

**< / > main.js**

아래와 같은 컴포넌트를 만들어 호출하세요.

```js
import React from 'react';
import { Link } from 'react-router-dom';
import RouterFragment from './resolver/RouterFragment';

const Main = () => (
  <RouterFragment index="m">
    <Link to="/a">a</Link>
    <p>asdasjdlksa</p>
    <Link to="/b">b</Link>
    <div>bewqew</div>
  </RouterFragment>
);

export default Main;
```