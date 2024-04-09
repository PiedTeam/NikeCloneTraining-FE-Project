import { NextUIProvider } from "@nextui-org/react";

const App = () => {
  return (
    <>
      <NextUIProvider>
        <h1 className="text-red-400">Hello World</h1>
      </NextUIProvider>
    </>
  );
};

export default App;
