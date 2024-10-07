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
