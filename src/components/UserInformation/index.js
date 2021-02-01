import React from "react";

import { ReactComponent as UserIcon } from "../../icons/list-of-users.svg";
import InformationItem from "./InformationItem";
import InformationBlock from "./InformationBlock";
import "./styles.css";

const UserInformation = ({ user }) => {
  return (
    <div className="user-information-container">
      <div className="user-information-img-container">
        <UserIcon className="user-information-img" />
      </div>
      <div className="user-information">
        <InformationBlock title="Account">
          <InformationItem title="User name" value={user.username} />
          <InformationItem title="Password" value="********" />
        </InformationBlock>

        <InformationBlock title="Personal">
          <InformationItem title="First name" value={user.firstName} />
          <InformationItem title="Last name" value={user.lastName} />
          <InformationItem title="Birth date" value={user.birthDate} />
          <InformationItem title="Email" value={user.email} />
          <InformationItem title="Address" value={user.address} />
        </InformationBlock>

        <InformationBlock title="Contacts">
          <InformationItem title="Company" value={user.company} />
          <InformationItem title="Fax" value={user.fax} />
          <InformationItem title="Facebook Link" value={user.facebook} />
          {user.phones.map((phone, i) => (
            <InformationItem key={i} title={`Phone #${i + 1}`} value={phone} />
          ))}
        </InformationBlock>

        <InformationBlock title="Capabilities">
          <InformationItem title="Skills" value={user.skills.join(", ")} />
          <InformationItem title="Hobbies" value={user.hobbies.join(", ")} />
        </InformationBlock>
      </div>
    </div>
  );
};

export default UserInformation;
