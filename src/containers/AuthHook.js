import { useState } from "react";
export default function useIsAuthenticated() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return { isAuthenticated, setIsAuthenticated };
}
