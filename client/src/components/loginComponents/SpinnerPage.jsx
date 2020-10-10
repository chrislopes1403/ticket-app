import React from "react";
import "./SpinnerPage.css"
const SpinnerPage = () => {
  return (
    <>
      <div className="spinner-border" role="status" id="Spinner">
        <span className="sr-only">Loading...</span>
      </div>
    </>
  );
}

export default SpinnerPage;