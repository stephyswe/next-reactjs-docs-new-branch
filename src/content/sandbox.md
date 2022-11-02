---
id: sandbox
title: Sandbox
---

```js
```

<Sandpack>


```js App.js hidden
import Gallery from './Gallery.js';
export default function App() {
  return (
    <Gallery />
  );
}
```

```js components/Gallery.js active
import Profile from './Profile.js';
export default function Gallery() {
  return (
    <section>
      <h1>Amazing scientists</h1>
      <Profile />
      <Profile />
      <Profile />
    </section>
  );
}
```

```json package.json
{
  "name": "sandpack",
  "scripts": {
    "start": "react-scripts start"
  },
  "dependencies": {},
  "devDependencies": {}
}
```

</Sandpack>