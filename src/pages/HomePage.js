import StartingPageContent from "../content/StartingPage/StartingPageContent";
import { motion } from "framer-motion";

const HomePage = () => {
  return (
    <motion.div
      exit={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
    >
      <StartingPageContent></StartingPageContent>
    </motion.div>
  );
};

export default HomePage;
