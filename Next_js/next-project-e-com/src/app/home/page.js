import ProtectedRoute from "@/Components/ProtectedRoute";
import React from "react";

const page = () => {
  return (
    <ProtectedRoute>
      <div>This is Home page</div>
    </ProtectedRoute>
  );
};

export default page;
