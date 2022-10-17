import React, { useEffect, useState, Suspense } from "react";
import useLocalStorage from "./hooks/useLocalStorage";
import { createTheme, NextUIProvider, Loading } from "@nextui-org/react";
import useDarkMode from "use-dark-mode";
import { Layout } from "./layout";
import { Box } from "./components/Box";
import TodoList from "./components/TodoList";
const Login = React.lazy(() => import("./views/Login"));



const App = () => {
  const [user, setUser] = useState({});
  const token = useLocalStorage("token");
  console.log(user)

  const lightTheme = createTheme({
    type: "light",
  });

  const darkTheme = createTheme({
    type: "dark",
  });
 
  const darkMode = useDarkMode(false);

  useEffect(() => {
    setUser(token);
  }, []);

  return (
    <NextUIProvider theme={darkMode.value ? darkTheme : lightTheme}>
      {user.length > 0 && user[0] !== undefined ? (
        <Layout>
          <Box css={{ px: "$24", mt: "$8", "@xsMax": { px: "$10" } }}>
            <TodoList/>
          </Box>
        </Layout>
      ) : (
        <Suspense
          fallback={
           <Box css={{
            width:"100%",
            height:"100vh",
            display:"flex",
            justifyContent:"center",
            alignItems:"center"
           }}>
             <Loading
              type="default"
              loadingCss={{ $$loadingSize: "100px", $$loadingBorder: "10px" }}
            />
           </Box>
          }
        >
          <Login />
        </Suspense>
      )}
    </NextUIProvider>
  );
};

export default App;
