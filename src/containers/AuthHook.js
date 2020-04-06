import { useEffect, useState } from "react";
export default function useIsAuthenticated() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  console.log("isAuthenticated: ", isAuthenticated);

  return { isAuthenticated, setIsAuthenticated };
}
