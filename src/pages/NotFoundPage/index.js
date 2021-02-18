import React from "react";
import TemplatePage from "../../components/TemplatePage";

import "./styles.css";

const NotFoundPage = () => (
  <TemplatePage>
    <div className="not-found">
      <h2 className="not-found__title">
        <span>Error 404:</span> page not found
      </h2>
    </div>
  </TemplatePage>
);

export default NotFoundPage;
