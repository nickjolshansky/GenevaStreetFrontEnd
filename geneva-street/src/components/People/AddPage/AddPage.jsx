import React, { useState } from "react";
import {} from "@mui/material";
import AddPersonForm from "./AddPersonForm/AddPersonForm";
import AddRelationshipForm from "./AddRelationshipForm/AddRelationshipForm";
import "./AddPage.css";

const AddPage = () => {
  return (
    <div className="add-page">
      <AddPersonForm />
      <AddRelationshipForm />
    </div>
  );
};

export default AddPage;
