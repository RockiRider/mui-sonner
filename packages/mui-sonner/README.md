[mui-sonner](https://mui-sonner.tsotne.co.uk/) is is a package that combines [sonner](https://www.npmjs.com/package/sonner) and [MUI](https://mui.com/) to achieve a simple, opinionated toast component for react.

If you are not using MUI, you should use [sonner](https://www.npmjs.com/package/sonner) directly.

## Demo

[View demo](https://mui-sonner.tsotne.co.uk/)

## Documentation

[View the documentation](https://mui-sonner.tsotne.co.uk/getting-started)

## Features

- **Avoids Context**: Like [sonner](https://www.npmjs.com/package/sonner), it doesn't use context.
- **Alerts**: The toast that is actually built around using the [Alert component from MUI](https://mui.com/material-ui/react-alert/), so it's easy to customize.
- **Styling**: Leverages MUI components, meaning the toast and components inside it will use your already defined MUI theme.

## Usage

`npm install mui-sonner`

Add <Toaster /> to your app, preferably quite high in the tree. After that you can use `toast()` from anywhere in your app.

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
