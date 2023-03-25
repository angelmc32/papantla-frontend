import { AppShell } from "@mantine/core";
import AppFooter from "./AppFooter";
import AppNavbar from "./AppNavbar";

const Layout = ({ children }: any) => {
  return (
    <AppShell header={<AppNavbar />} styles={globalStyles}>
      {children}
    </AppShell>
  );
};

export default Layout;

const globalStyles = {
  main: {
    alignItems: "center",
    display: "flex",
    flexDirection: "column" as "column",
    marginTop: "56px",
    minHeight: "calc(100vh - 56px)",
    padding: "4rem 1rem",
  },
};
