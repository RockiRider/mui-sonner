# Mui - Sonner

This is a package that combines [sonner](https://www.npmjs.com/package/sonner) and [MUI](https://mui.com/) to achieve a simple, opinionated toast component for react.

## Usage

`npm install mui-sonner`

Add <Toaster /> to your app, it will be the place where all your toasts will be rendered. After that you can use toast() from anywhere in your app.

```jsx
import { Toaster, toast } from "mui-sonner";

// ...

function App() {
  return (
    <div>
      <Toaster />
      <button onClick={() => toast("My first toast")}>toast please</button>
    </div>
  );
}
```

## Documentation

Coming soon
