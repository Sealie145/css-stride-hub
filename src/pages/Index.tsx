// Update this page (the content is just a fallback if you fail to update the page)

import { Navigate } from "react-router-dom";

const Index = () => {
  // Redirect to login page as entry point
  return <Navigate to="/login" replace />;
};

export default Index;
