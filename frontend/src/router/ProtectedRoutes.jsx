import { useContext } from "react"
import SignIn from "../pages/signIn";
import { AuthContext } from "../context/AuthContext"
const ProtectedRoutes = ({children}) => {
  const {isAuthenticated} = useContext(AuthContext);
  return children
}

export default ProtectedRoutes