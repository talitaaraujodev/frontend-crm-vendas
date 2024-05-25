import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "../components/Layout";
import CustomerList from "../pages/ListCustomers";
import ListAgentsPage from "../pages/ListAgents";
import NewCustomerPage from "../pages/NewCustomer";
import NewAgentPage from "../pages/NewAgent";
import ReportPage from "../pages/ReportGenerate";

export function MainRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/list-customers" element={<CustomerList />}></Route>
        </Route>
        <Route element={<Layout />}>
          <Route path="/" element={<ListAgentsPage />}></Route>
        </Route>
        <Route element={<Layout />}>
          <Route path="/create-customer" element={<NewCustomerPage />}></Route>
        </Route>
        <Route element={<Layout />}>
          <Route path="/create-agent" element={<NewAgentPage />}></Route>
        </Route>
        <Route element={<Layout />}>
          <Route path="/report" element={<ReportPage />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
