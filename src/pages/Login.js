import AuthForm from "../content/Auth/AuthForm";
import { motion } from "framer-motion";

const LoginPage = () => {
  return (
    <motion.div
      exit={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
    >
      <AuthForm />
    </motion.div>
  );
};

export default LoginPage;
