# universal-virtual-scroll

![npm](https://img.shields.io/npm/v/universal-virtual-scroll)
![license](https://img.shields.io/npm/l/universal-virtual-scroll)
![bundle size](https://img.shields.io/bundlephobia/min/universal-virtual-scroll)
![typescript](https://img.shields.io/badge/TypeScript-Ready-blue)
![framework](https://img.shields.io/badge/framework-agnostic-green)

A lightweight and framework-agnostic virtual scrolling library for efficiently rendering large lists and grids with smooth performance.

---

## Installation

```bash
npm install universal-virtual-scroll
```

---

## Import

```js
import {
  UniversalVirtualScroll
} from 'universal-virtual-scroll';
```

---

# Angular Example

## app.component.html

```html
<div #viewport class="viewport">

  <div
    #content
    [style.paddingTop.px]="paddingTop"
    [style.paddingBottom.px]="paddingBottom">

    @for (item of visibleItems; track item.name) {

      <div class="card">

        {{ item.name }}

      </div>

    }

  </div>

</div>
```

---

## app.component.ts

```ts
import {
  AfterViewInit,
  Component,
  ElementRef,
  ViewChild
} from '@angular/core';

import {
  UniversalVirtualScroll
} from 'universal-virtual-scroll';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent
implements AfterViewInit {

  @ViewChild('viewport')
  viewport!: ElementRef;

  @ViewChild('content')
  content!: ElementRef;

  visibleItems: any[] = [];

  paddingTop = 0;

  paddingBottom = 0;

  items = Array.from(
    { length: 100000 },
    (_, i) => ({
      name: `Item ${i + 1}`
    })
  );

  ngAfterViewInit(): void {

    new UniversalVirtualScroll({

      viewport:
        this.viewport.nativeElement,

      content:
        this.content.nativeElement,

      items: this.items,

      itemHeight: 100,

      itemWidth: 200,

      onUpdate: (
        items,
        top,
        bottom
      ) => {

        this.visibleItems = items;

        this.paddingTop = top;

        this.paddingBottom = bottom;
      }
    });
  }
}
```

---

## app.component.css

```css
.viewport {
  height: 100vh;
  overflow-y: auto;
}

.card {
  height: 100px;
}
```

---

# React Example

## App.jsx

```jsx
import {
  useEffect,
  useRef,
  useState
} from 'react';

import {
  UniversalVirtualScroll
} from 'universal-virtual-scroll';

function App() {

  const viewportRef = useRef(null);

  const contentRef = useRef(null);

  const [visibleItems, setVisibleItems] =
    useState([]);

  const [paddingTop, setPaddingTop] =
    useState(0);

  const [paddingBottom, setPaddingBottom] =
    useState(0);

  const items = Array.from(
    { length: 100000 },
    (_, i) => ({
      name: `Item ${i + 1}`
    })
  );

  useEffect(() => {

    const virtualScroll =
      new UniversalVirtualScroll({

        viewport:
          viewportRef.current,

        content:
          contentRef.current,

        items,

        itemHeight: 100,

        itemWidth: 200,

        onUpdate: (
          items,
          top,
          bottom
        ) => {

          setVisibleItems(items);

          setPaddingTop(top);

          setPaddingBottom(bottom);
        }
      });

    return () => {

      virtualScroll.destroy();

    };

  }, []);

  return (

    <div
      ref={viewportRef}
      className="viewport">

      <div
        ref={contentRef}
        style={{
          paddingTop,
          paddingBottom
        }}>

        {

          visibleItems.map(item => (

            <div
              key={item.name}
              className="card">

              {item.name}

            </div>

          ))
        }

      </div>

    </div>
  );
}

export default App;
```

---

## App.css

```css
.viewport {
  height: 100vh;
  overflow-y: auto;
}

.card {
  height: 100px;
}
```

---

# Next.js Example

## app/page.jsx

```jsx
'use client';

import {
  useEffect,
  useRef,
  useState
} from 'react';

import {
  UniversalVirtualScroll
} from 'universal-virtual-scroll';

export default function Home() {

  const viewportRef = useRef(null);

  const contentRef = useRef(null);

  const [visibleItems, setVisibleItems] =
    useState([]);

  const [paddingTop, setPaddingTop] =
    useState(0);

  const [paddingBottom, setPaddingBottom] =
    useState(0);

  const items = Array.from(
    { length: 100000 },
    (_, i) => ({
      name: `Item ${i + 1}`
    })
  );

  useEffect(() => {

    const virtualScroll =
      new UniversalVirtualScroll({

        viewport:
          viewportRef.current,

        content:
          contentRef.current,

        items,

        itemHeight: 100,

        itemWidth: 200,

        onUpdate: (
          items,
          top,
          bottom
        ) => {

          setVisibleItems(items);

          setPaddingTop(top);

          setPaddingBottom(bottom);
        }
      });

    return () => {

      virtualScroll.destroy();

    };

  }, []);

  return (

    <div
      ref={viewportRef}
      className="viewport">

      <div
        ref={contentRef}
        style={{
          paddingTop,
          paddingBottom
        }}>

        {

          visibleItems.map(item => (

            <div
              key={item.name}
              className="card">

              {item.name}

            </div>

          ))
        }

      </div>

    </div>
  );
}
```

---

## app/globals.css

```css
.viewport {
  height: 100vh;
  overflow-y: auto;
}

.card {
  height: 100px;
}
```

---

# Configuration

| Option | Type | Description |
|---|---|---|
| viewport | HTMLElement | Scroll container |
| content | HTMLElement | Content wrapper |
| items | Array | Full dataset |
| itemHeight | Number | Item height |
| itemWidth | Number | Item width |
| onUpdate | Function | Update callback |

---

# Methods

## updateItems

```js
virtualScroll.updateItems(newItems);
```

---

## destroy

```js
virtualScroll.destroy();
```

---

# Important

- `viewport` must have fixed height
- `viewport` must use `overflow-y: auto`
- `itemHeight` must match actual item height
- `itemWidth` must match actual item width

---

# License

MIT