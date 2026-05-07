import { useState, useEffect, useContext, createContext } from "react";
import api from "../utils/axios";
import { useAuth } from "./Authcontext";

const DataContext = createContext();

export function useData() {
  return useContext(DataContext);
}

export default function DataProvider(props) {
  const { children } = props;
  const { globalUser } = useAuth();
  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchProducts = async () => {
    try {
      setIsLoading(true);
      const response = await api.get("/api:HQaAbRYz/products");
      setProducts(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error al cargar productos:", error.message); // Usar console.error para errores
    } finally {
      setIsLoading(false);
    }
  };

  const fetchUsers = async () => {
    try {
      setIsLoading(true);
      const response = await api.get("/api:HQaAbRYz/user");
      setUsers(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error al cargar users:", error.message); // Usar console.error para errores
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (globalUser) {
      fetchProducts();
      fetchUsers();
    }
  }, [globalUser]);

  const value = { products, users, isLoading, fetchProducts, fetchUsers };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}
