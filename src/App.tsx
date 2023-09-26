import { useLocation } from "react-router-dom";
import "./App.scss";
import Navigatorbar from "./component/navbar/Navigatorbar";
import Router from "./route/Router";
import { Layout } from "antd";
import { AlertContextProvider } from "./context/AlertContext";
import { AuthenticationContextProvider } from "./context/AuthenticationContext";

const { Header, Footer, Content } = Layout;

export function App() {
  const location = useLocation();
  return (
    <>
      <AuthenticationContextProvider>
        <AlertContextProvider>
          <Layout className="layout">
            {location.pathname !== "/login" && (
              <Header className="header">
                <Navigatorbar />
              </Header>
            )}

            <Content className="content">
              <Router />
            </Content>
            {location.pathname !== "/login" && (
              <Footer className="footer"></Footer>
            )}
          </Layout>
        </AlertContextProvider>
      </AuthenticationContextProvider>
    </>
  );
}

export default App;
