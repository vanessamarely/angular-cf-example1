# Fundamentos de Angular


---

## Paso 0: Requisitos Previos

Antes de comenzar, asegúrate de tener instalado Node.js y el Angular CLI. Si no lo tienes, abre tu terminal y ejecuta:

```bash
npm install -g @angular/cli
```

---

## Paso 1: Creación del Proyecto

Vamos a crear un nuevo proyecto llamado `angular-example`. Usaremos dos opciones importantes:

- `--zoneless`: Le dice a Angular que no use la librería `zone.js`, lo que nos da un mejor rendimiento y un control más preciso de las actualizaciones.
- `--ssr=false`: Indica que no usaremos renderizado del lado del servidor (Server-Side Rendering), creando una aplicación de una sola página (SPA) tradicional.

```bash
ng new angular-example --zoneless --ssr=false
```

Cuando te pregunte por el formato de estilos, elige **CSS**. Si no usas la opción de arriba, entonces solo en las opciones que te aparecen dile que **'N'** a SSR y **'Yes'** en zoneless.

Una vez que termine, entra a la nueva carpeta:

```bash
cd angular-example
```

¡Ejecuta la aplicación! Vuelve a tu terminal y corre el siguiente comando:

```bash
ng serve -o
```

---

## Paso 2: El Componente de Data Binding

El **Data Binding** es la comunicación entre tu lógica (TypeScript) y tu vista (HTML). Crearemos un componente para ver cómo funciona.

### 1. Genera el componente

```bash
ng generate component databinding-test
```

### 2. Añade la lógica (`databinding-test.ts`)

Abre el archivo `src/app/databinding-test/databinding-test.ts` y reemplaza su contenido. Este código define las propiedades que mostraremos y modificaremos.

```ts
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-databinding-test',
  imports: [FormsModule],
  templateUrl: './databinding-test.html',
  styleUrl: './databinding-test.css',
})
export class DatabindingTest {
  // 1. interpolation and property binding
  title = 'Data Binding Test Component';
  urlImage = 'https://angular.io/assets/images/logos/angular/angular.png';
  isDisabled = false;

  // 2. event binding
  count = 0;

  increment() {
    this.count++;
  }

  // 3. two-way data binding
  name = 'Write something here...';
}
```

### 3. Añade a la vista (`databinding-test.html`)

Ahora, abre `src/app/databinding-test/databinding-test.html` y añade el siguiente código.

- **Interpolación** `{{ }}`: Muestra el valor de una propiedad en el HTML.
- **Property Binding** `[ ]`: Asigna el valor de una propiedad a un atributo HTML (como `src` o `disabled`).
- **Event Binding** `( )`: Ejecuta un método cuando ocurre un evento (como un click).
- **Two-Way Binding** `[( )]`: Combina los dos anteriores. ¡La vista actualiza la lógica y la lógica actualiza la vista!

```html
<h1>1. Interpolation and Property Binding</h1>
<p>{{ title }}</p>

<hr />

<h2>Property Binding</h2>
<img [src]="urlImage" [alt]="title" width="100" alt="angular-logo" />

<button [disabled]="isDisabled">Click me!</button>

<hr />

<h2>Event Binding</h2>
<button (click)="increment()">Increment</button>
<p>Count: {{ count }}</p>

<hr />

<h2>Two-Way Data Binding</h2>
<input [(ngModel)]="name" />
<p>You wrote: {{ name }}</p>
<hr />
```

---

## Paso 3: Tu Primera Directiva de Atributo (Highlight)

Una directiva es una clase que le da superpoderes a tus elementos HTML. Crearemos una que **resalte el fondo** de un elemento al pasar el mouse por encima.

### 1. Genera la directiva

```bash
ng generate directive highlight
```

### 2. Añade el código (`highlight.ts`)

Abre `src/app/highlight.ts` y reemplaza su contenido.

- `@Input()`: Es una "puerta de entrada". Permite que la directiva reciba valores desde el HTML, haciéndola configurable.
- `@HostListener()`: "Escucha" eventos que ocurren en el elemento donde se aplica la directiva (el host).
- `ElementRef` y `Renderer2`: Son herramientas seguras que Angular nos da para manipular el DOM directamente.

```ts
import { Directive, ElementRef, Host, HostListener, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appHighlight]',
})
export class Highlight {
  // inner variable to hold the color value
  private _color: string = 'yellow';

  // add ElementRef and Renderer2 to modify the DOM element
  constructor(private el: ElementRef, private renderer: Renderer2) {}

  @Input('appHighlight')
  set highlightColor(color: string) {
    this._color = color || 'yellow'; // default to yellow if no color is provided
  }

  @HostListener('mouseenter') onMouseEnter() {
    this.changeBackgroundColor(this._color);
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.changeBackgroundColor(null);
  }

  private changeBackgroundColor(color: string | null) {
    // use the Renderer to modify the element's style
    this.renderer.setStyle(this.el.nativeElement, 'backgroundColor', color);
  }
}
```

---

## Paso 4: La API de Composición de Directivas (Hoverable)

Esta es una característica avanzada. Crearemos una **"super-directiva"** que reutiliza la lógica de **Highlight** y le añade una nueva funcionalidad.

### 1. Genera la directiva

```bash
ng generate directive hoverable
```

### 2. Añade el código (`hoverable.ts`)

Abre `src/app/hoverable.ts`.

- `hostDirectives`: Esta es la magia. Le dice a nuestra directiva que "absorba" toda la funcionalidad de otra directiva.
- `inputs: [...]`: Mapea el input de nuestra directiva (`appHoverable`) al input de la directiva que estamos componiendo (`appHighlight`), permitiendo que pasemos el color.

```ts
import { Directive, HostBinding, Input } from '@angular/core';
import { Highlight } from './highlight';

@Directive({
  selector: '[appHoverable]',
  hostDirectives: [{ directive: Highlight, inputs: ['appHighlight: appHoverable'] }],
})
export class Hoverable {
  @HostBinding('style.cursor') cursor = 'pointer';

  @Input() appHoverable: string = '';
  constructor() {}
}
```

---

## Paso 5: El Componente de Directivas

Ahora crearemos un componente para **probar** nuestras nuevas directivas y el **control de flujo moderno**.

### 1. Genera el componente

```bash
ng generate component test-directives
```

### 2. Añade la lógica (`test-directives.ts`)

Abre `src/app/test-directives/test-directives.ts`. Este componente es muy simple. Lo importante es cómo **declara sus dependencias** en el array `imports`.

```ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Highlight } from '../highlight';
import { Hoverable } from '../hoverable';

@Component({
  selector: 'app-test-directives',
  standalone: true,
  imports: [CommonModule, Highlight, Hoverable], // Declara que usará estas directivas
  templateUrl: './test-directives.html',
  styleUrl: './test-directives.css',
})
export class TestDirectives {
  showElement = true;

  toggle() {
    this.showElement = !this.showElement;
  }

  list = ['Angular', 'React', 'Vue', 'Svelte'];
}
```

### 3. Añade la vista (`test-directives.html`)

Abre `src/app/test-directives/test-directives.html`.

- `@if` y `@for`: Es la **nueva sintaxis** de Angular para renderizado condicional y bucles. Es más limpia y **no** requiere importar módulos.

```html
<h1>Directives</h1>

<h2>Structural Directives</h2>
<h3>if</h3>
<button (click)="toggle()">Show/Hide</button>

@if (showElement){
  <p>Este párrafo se renderiza condicionalmente.</p>
} @else {
  <p>El párrafo está oculto.</p>
}

<hr />

<h3>for</h3>
<p>Lista de Frameworks:</p>
<ul>
  @for(item of list; track item){
    <li>{{ item }}</li>
  }
</ul>

<hr />
<h3>Highlight Directive</h3>
<p appHighlight>Este párrafo usa el resaltado por defecto.</p>
<p [appHighlight]="'lightgreen'">
  Este párrafo tiene un color de resaltado personalizado.
</p>

<hr />
<h3>Hoverable Directive</h3>
<p [appHoverable]="'lightblue'">
  Este párrafo se resalta en azul claro y además cambia el cursor.
</p>
```

---

## Paso 6: Configuración Final y Ejecución

Finalmente, vamos a decirle a nuestro componente principal **App** que muestre los dos nuevos componentes que creamos.

### 1. Actualiza la lógica de `app.ts`

Abre `src/app/app.ts` y asegúrate de que importe y declare los dos nuevos componentes.

```ts
import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DatabindingTest } from './databinding-test/databinding-test';
import { TestDirectives } from './test-directives/test-directives';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, DatabindingTest, TestDirectives],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('angular-example');
}
```

### 2. Actualiza la vista de `app.html`

Abre `src/app/app.html` y añade los selectores de tus nuevos componentes.

```html
<main class="main">
  <div class="content">
    <div class="card">
      <h1>Hello, {{ title() }}</h1>
      <p>Congratulations! Your app is running. 🎉</p>

      <app-databinding-test />
      <app-test-directives />
    </div>
  </div>
</main>
```

---

## Resumen de contenido

- **Paso 0:** Requisitos Previos  
- **Paso 1:** Creación del Proyecto  
- **Paso 2:** El Componente de Data Binding  
  1. Genera el componente  
  2. Añade la lógica (`databinding-test.ts`)  
  3. Añade a la vista (`databinding-test.html`)  
- **Paso 3:** Tu Primera Directiva de Atributo (Highlight)  
  1. Genera la directiva  
  2. Añade el código (`highlight.ts`)  
- **Paso 4:** La API de Composición de Directivas (Hoverable)  
  1. Genera la directiva  
  2. Añade el código (`hoverable.ts`)  
- **Paso 5:** El Componente de Directivas  
  1. Genera el componente  
  2. Añade la lógica (`test-directives.ts`)  
  3. Añade la vista (`test-directives.html`)  
- **Paso 6:** Configuración Final y Ejecución  
  1. Actualiza la lógica de `app.ts`  
  2. Actualiza la vista de `app.html`

---
