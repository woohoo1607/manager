import React from "react";
import { useHistory } from "react-router-dom";

import TemplatePage from "../TemplatePage";
import UsersTable from "../../components/UsersTable";
import Button from "../../components/Button";

import "./styles.css";

const data = [];

const HomePage = () => {
  const { push } = useHistory();

  const createNewUser = () => push(`/users/new`);

  return (
    <TemplatePage title="List of users">
      <>
        <UsersTable data={data} />
        {!data.length && (
          <div className="no-data">
            <h2 className="title title-secondary">No users here:(</h2>
            <Button onClick={createNewUser}>Create new user</Button>
          </div>
        )}
      </>
    </TemplatePage>
  );
};

export default HomePage;
