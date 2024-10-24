# Notes on React

## React Component Lifecycle
### 1. **Writing JSX** (Component Definition)

In React, components are written as **JSX** (JavaScript XML), which looks like HTML but gets converted into JavaScript objects by React. For example:

```jsx
function MyComponent() {
  return <h1>Hello, World!</h1>;
}
```

- This JSX gets **transpiled** by tools like Babel into plain JavaScript using `React.createElement`.
  
  ```jsx
  // JSX equivalent in pure JS
  React.createElement('h1', null, 'Hello, World!');
  ```

### 2. **Virtual DOM** (React's In-Memory Representation)

Once JSX is converted into JavaScript objects, React uses this data to create a **virtual DOM**. The virtual DOM is a lightweight representation of what the actual DOM should look like after rendering.

- Virtual DOM nodes (or "elements") are just plain JavaScript objects that describe the structure of the UI (e.g., the type of the element, its props, and children).

### 3. **Rendering to the Real DOM**

The actual lifecycle and journey to the real DOM begin when a component is mounted or updated. Here's the lifecycle in detail:

---

### **Initial Render (Mounting Phase)**

When a React component is first rendered to the DOM, this process happens:

#### 1. **Constructor/Initialization (if class component)**:
- For class components, the constructor is called first to initialize state and props.
  
#### 2. **Render Method (or Functional Component Execution)**:
- React **calls the `render()` function** (or directly runs the body of a functional component).
- This method returns the JSX (which React has converted into virtual DOM elements).

#### 3. **Reconciliation**:
- React **compares** the virtual DOM with the current state of the real DOM (since this is the first render, the real DOM is either empty or has placeholders).
- It determines which parts of the virtual DOM need to be rendered into the real DOM.

#### 4. **Real DOM Update**:
- React **commits the changes** to the real DOM by creating actual DOM elements (e.g., `<h1>Hello, World!</h1>`) and placing them in the browser's DOM.
  
#### 5. **useEffect / componentDidMount**:
- After the initial render, React executes any side effects like `useEffect` (in functional components) or `componentDidMount` (in class components).
- These hooks run *after* the component is rendered into the real DOM, giving access to the final DOM nodes.

---

### **Updating Phase (Re-renders)**

When state or props change, React updates the component:

#### 1. **State/Props Change**:
- When the state changes (using `useState`, `setState`, etc.), React re-triggers the render process.

#### 2. **Render (Again)**:
- React runs the component's render function again to produce a new virtual DOM tree based on the updated state/props.

#### 3. **Reconciliation (Diffing Algorithm)**:
- React compares the new virtual DOM with the previous virtual DOM (this is called **reconciliation**).
- React uses a **diffing algorithm** to figure out the minimal number of changes needed to update the real DOM (e.g., only changing the text inside an `<h1>`).

#### 4. **Update Real DOM**:
- Based on the diff, React updates only the necessary parts of the real DOM.
  
#### 5. **useEffect Cleanup & useEffect (or componentDidUpdate)**:
- After updating the real DOM, React executes `useEffect` or `componentDidUpdate`, running any side effects based on the latest state/props.
- `useEffect` can also clean up any resources if necessary, especially when dependencies have changed.

---

### **Unmounting Phase**

When a component is no longer needed and is removed from the DOM:

#### 1. **useEffect Cleanup (or componentWillUnmount)**:
- Before the component is removed from the DOM, React runs the **cleanup phase** for any side effects (e.g., removing event listeners, aborting network requests).
  
#### 2. **Remove from the Real DOM**:
- React removes the component's DOM elements from the real DOM.

---

### **Summary of the Journey:**

1. **JSX** → Transpiled to `React.createElement`.
2. **Virtual DOM** → React creates an in-memory representation of the UI.
3. **Initial Rendering**:
   - React mounts components by rendering the virtual DOM into the **real DOM**.
4. **Updates/Re-renders**:
   - When state or props change, React **diffs** the virtual DOM and efficiently updates only the necessary parts of the real DOM.
5. **Side Effects**:
   - `useEffect` or lifecycle methods manage any side effects like DOM manipulation, data fetching, etc.
6. **Unmounting**:
   - React cleans up before removing a component from the DOM.

This cycle repeats every time state or props change, ensuring efficient updates to the real DOM based on changes in your app's data.

## Refs
### 1. **What are Refs in React?**
- **Refs** (short for references) provide a way to access and interact with **DOM elements** or **React components** directly.
- They are typically used for tasks that require direct manipulation of DOM elements, such as focusing an input field, triggering animations, or measuring element size.

### 2. **How to Create Refs?**
- Use the **`useRef()`** hook in functional components to create a mutable `ref` object:
  
  ```js
  const myRef = useRef(null);
  ```

- The `ref` object has a `.current` property, which is initialized to `null` and will eventually hold the reference to the DOM element once it is mounted.

### 3. **Assigning Refs to DOM Elements:**
- To assign a ref to a DOM element, use the `ref` attribute in JSX:
  
  ```js
  <input ref={myRef} />
  ```

- After the component mounts, React will update `myRef.current` with the reference to the actual DOM element (e.g., the `<input>` element).

### 4. **Accessing the DOM Node:**
- **When React renders the component** and mounts the DOM element, the `.current` property of the ref gets updated with the actual DOM element.
- This update occurs synchronously after the rendering phase, and you can safely access the ref in a **`useEffect()`** hook, which runs after the component is mounted.

  ```js
  useEffect(() => {
    console.log(myRef.current); // Access the DOM element
  }, []); // This runs after the component is mounted
  ```

### 5. **Common Use Cases for Refs:**
- **Direct DOM Manipulation:** Refs allow you to bypass the React rendering cycle to perform operations directly on the DOM (e.g., focusing an input or scrolling).
  
  ```js
  myRef.current.focus();
  ```

- **Accessing Child Components:** Refs can be used to reference child components, provided that they are class components or React elements (though using refs for components is less common in modern functional components).
  
- **Maintaining Values Across Renders (Without Triggering Re-renders):** Unlike state, **changing the value of `ref.current` does not cause a re-render**. This makes refs ideal for storing values that should persist across renders without affecting the rendering lifecycle (e.g., timers, instance variables).

### 6. **Important Notes:**
- **Avoid Overusing Refs:** Rely on the declarative nature of React as much as possible. Refs are an escape hatch for when you need direct DOM manipulation but shouldn’t be used extensively for general state management.
- **Not for Calculating Layouts:** Using refs for calculating layouts, such as getting element dimensions, should be done after the DOM is rendered (inside `useEffect()`), as the ref will be `null` during the initial render.
  
  ```js
  useEffect(() => {
    const height = myRef.current.clientHeight; // Access height of the DOM element
  }, []);
  ```

### 7. **Example:**
Here’s an example illustrating how `useRef()` works:

```js
import React, { useRef, useEffect } from 'react';

function MyComponent() {
  const inputRef = useRef(null); // Step 1: Create ref

  useEffect(() => {
    // Step 3: Access DOM element after mounting
    inputRef.current.focus(); // Focus on input element when the component mounts
  }, []); // Empty dependency array so it runs only after initial render

  return (
    <input ref={inputRef} type="text" placeholder="Focus me on load" /> // Step 2: Assign ref
  );
}

export default MyComponent;
```

### 8. **Summary:**
- **Refs** in React are used for accessing DOM elements directly or for storing persistent values without causing re-renders.
- **`useRef()`** creates a mutable ref object with a `.current` property, which gets updated after the DOM is mounted.
- **Refs are synchronous in assignment** but should be accessed in effects like `useEffect()` to ensure the DOM is updated.
- They allow direct manipulation of the DOM but should be used sparingly to maintain React’s declarative style.


### 9. `forwardRef` in React

**What is `forwardRef`?**
- `forwardRef` is a utility function in React that allows you to pass a `ref` from a parent component to a child component. It enables the parent component to directly reference a DOM element or another component within the child.

**How it is used?**
- It wraps a functional component so that it can receive a `ref` and forward it to an internal element.
  
Example:

```jsx
import React, { forwardRef } from 'react';

const MyInput = forwardRef((props, ref) => {
  return <input ref={ref} {...props} />;
});

export default MyInput;
```

Usage in a parent component:

```jsx
import React, { useRef } from 'react';
import MyInput from './MyInput';

function App() {
  const inputRef = useRef();

  const focusInput = () => {
    inputRef.current.focus(); // Using the forwarded ref to focus the input
  };

  return (
    <div>
      <MyInput ref={inputRef} />
      <button onClick={focusInput}>Focus Input</button>
    </div>
  );
}

export default App;
```

**When to use `forwardRef`?**
- Use `forwardRef` when you need to access a child component's DOM element or component instance from a parent.
- It's especially useful when building reusable components that need to expose some internal behavior, such as focusing on an input field, scrolling a container, or interacting with a canvas element.

By using `forwardRef`, you can make sure that the `ref` is correctly passed from parent to child, without the need for the parent to "reach inside" the child component manually.

### 10. `useImperativeHandle` in React

**What is `useImperativeHandle`?**
- `useImperativeHandle` is a React hook that allows you to customize the instance value that is exposed when a parent component uses a `ref` on a child component. 
- It works with `forwardRef` to define what functionality or value is exposed to the parent, instead of directly exposing the child’s DOM node or component instance.

**How it is used?**
- You wrap this hook inside a `forwardRef` component to give the parent control over a specific set of methods or properties, rather than giving full access to the DOM node or the whole component.

Example:

```jsx
import React, { forwardRef, useImperativeHandle, useRef } from 'react';

const MyInput = forwardRef((props, ref) => {
  const inputRef = useRef();

  // Using useImperativeHandle to expose a custom API to the parent
  useImperativeHandle(ref, () => ({
    focus: () => {
      inputRef.current.focus();
    },
    blur: () => {
      inputRef.current.blur();
    },
  }));

  return <input ref={inputRef} {...props} />;
});

export default MyInput;
```

Usage in a parent component:

```jsx
import React, { useRef } from 'react';
import MyInput from './MyInput';

function App() {
  const inputRef = useRef();

  const focusInput = () => {
    inputRef.current.focus(); // Calls the custom focus method defined in useImperativeHandle
  };

  const blurInput = () => {
    inputRef.current.blur(); // Calls the custom blur method defined in useImperativeHandle
  };

  return (
    <div>
      <MyInput ref={inputRef} />
      <button onClick={focusInput}>Focus Input</button>
      <button onClick={blurInput}>Blur Input</button>
    </div>
  );
}

export default App;
```

**How it works:**
1. In the `MyInput` component, we use `forwardRef` to accept a `ref` from the parent component.
2. Inside `MyInput`, the `useImperativeHandle` hook is used to define custom methods (e.g., `focus`, `blur`) that will be exposed when the parent accesses the ref.
3. These custom methods interact with the actual `inputRef` (the DOM node) but only expose what we explicitly define.
4. The parent (`App` component) can now use these custom methods via the `inputRef`.

**When to use `useImperativeHandle`:**
- Use it when you need to expose a **custom API** to the parent component.
- It's useful for controlling behavior of DOM elements (e.g., inputs, canvases, videos) from the parent, while keeping the internal implementation (like managing refs or extra logic) encapsulated in the child.
- It provides a layer of abstraction that helps keep internal details hidden while still giving external control over specific behaviors.

By using `useImperativeHandle`, you can make sure the parent component only has access to a controlled set of actions, improving encapsulation and modularity in your code.

## Portals
In React, **Portals** provide a way to render components outside of their parent component's DOM hierarchy while still preserving the same React tree structure. Essentially, a Portal allows you to render a part of your UI somewhere else in the DOM, separate from the rest of the components, while still maintaining React's event handling and state management.

### Key Use Case
Portals are especially useful when you need to render elements that should break out of the parent container's layout, such as:
- Modals or Dialogs
- Tooltips
- Popups
- Overlays

Normally, when you create a component, it gets rendered as a child of its parent DOM node. However, with a Portal, you can render that component into any other DOM node, which might be outside the current React component tree.

### How Portals Work
React provides a method called `ReactDOM.createPortal` to achieve this. The syntax is as follows:

```jsx
ReactDOM.createPortal(child, container)
```

- `child`: The React component or elements you want to render.
- `container`: The target DOM element where you want to render the child component.

### Example

```jsx
import React from 'react';
import ReactDOM from 'react-dom';

function Modal({ children }) {
  return ReactDOM.createPortal(
    <div className="modal">
      {children}
    </div>,
    document.getElementById('modal-root')  // Target DOM element outside of the main component tree
  );
}

function App() {
  return (
    <div>
      <h1>Hello World!</h1>
      <Modal>
        <p>This is a modal dialog</p>
      </Modal>
    </div>
  );
}

export default App;
```

In this example:
1. The `Modal` component is rendered outside of the `<div>` containing "Hello World!" because it's being mounted into the DOM element with an `id` of `modal-root`, which exists outside the main React app.
2. Despite this, React's event system continues to work normally within the modal as though it was part of the component tree.

### Benefits
- **DOM Isolation**: Allows components like modals to avoid being restricted by CSS styles or layout constraints in parent containers.
- **Event Bubbling**: Despite rendering in different parts of the DOM, events continue to propagate as expected in the React hierarchy.

Portals make it easier to handle certain UI patterns where you want more control over the DOM placement of a component.

## Context API

### 1. **Purpose of Context API**:
The **Context API** is a tool in React that allows you to share state and data across multiple components without having to manually pass props down through every level of the component tree. It is mainly used to avoid **prop drilling** (passing props down multiple levels), making state management simpler for deeply nested or unrelated components.

### 2. **Key Components of Context API**:
- **`createContext()`**: This function creates a context object. It returns two components:
  - **Provider**: This is a wrapper component that holds the state or data you want to share. It provides the context's value to all its descendants.
  - **Consumer** (or `useContext()` hook): Components can consume the shared data by using either the `useContext()` hook (in functional components) or the `Consumer` component (in class components).

### 3. **Basic Steps to Use Context**:
   - **Create a Context**:
     ```jsx
     const MyContext = React.createContext();
     ```
   - **Wrap the Provider** around the components that need access to the context:
     ```jsx
     <MyContext.Provider value={/* shared data */}>
       <ComponentA />
       <ComponentB />
     </MyContext.Provider>
     ```
   - **Consume the Context** in child components using `useContext`:
     ```jsx
     const contextValue = React.useContext(MyContext);
     ```

### 4. **Example**:
```jsx
// 1. Create Context
const MyContext = React.createContext();

function App() {
  const value = { user: "John Doe" };

  // 2. Wrap components with the Provider
  return (
    <MyContext.Provider value={value}>
      <ComponentA />
      <ComponentB /> {/* Both can access context */}
    </MyContext.Provider>
  );
}

function ComponentB() {
  // 3. Consume context in ComponentB
  const context = React.useContext(MyContext);
  return <div>{context.user}</div>; // Output: John Doe
}
```

### 5. **Key Considerations**:
- **Provider and Consumer Relationship**: Any component that wants to access the context must be a **descendant** of the `Provider`. If a component is outside the `Provider`, it cannot access the context.
  
- **No Direct Parent-Child Relationship Needed**: Components do **not** have to be directly related (parent-child) to share context. They can be anywhere within the component tree as long as they are descendants of the same `Provider`.

### 6. **React Behaviour with Context and Re-render**

Summary of Re-rendering Rules:

1. **Context Consumers Re-render on Value Change**: Any component that **accesses** a context value will re-render if that value changes.
2. **Selective Re-renders**: Components that access only part of the context will not re-render if the part they depend on hasn’t changed.
3. **Efficient Updates**: React re-renders only the components that depend on the context value that has changed, keeping updates efficient.

This behavior ensures that React updates only the necessary components when state changes propagate through the context.

---

By using the **Context API**, you can simplify state management in applications with deeply nested components or multiple components that need access to shared data.