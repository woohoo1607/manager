import React from "react";
import moment from "moment";

import { ReactComponent as UserIcon } from "../../icons/list-of-users.svg";
import InformationItem from "./InformationItem";
import InformationBlock from "./InformationBlock";

import "./styles.css";

const UserInformation = ({
  user: {
    id = 0,
    username = "",
    firstName = "",
    lastName = "",
    birthDate = "",
    email = "",
    address = "",
    company = "",
    fax = "",
    facebook = "",
    phones = [],
    skills = [],
    hobbies = [],
  },
  goToEditUser = () => {},
}) => {
  return (
    <div className="user-information-container">
      <div className="user-information-img-container">
        <UserIcon className="user-information-img" />
      </div>
      <div className="user-information">
        <InformationBlock
          title="Account"
          goToEditUser={goToEditUser("account")}
        >
          <InformationItem title="User name" value={username} />
          <InformationItem title="Password" value="********" />
        </InformationBlock>

        <InformationBlock
          title="Personal"
          goToEditUser={goToEditUser("profile")}
        >
          <InformationItem title="First name" value={firstName} />
          <InformationItem title="Last name" value={lastName} />
          <InformationItem
            title="Birth date"
            value={moment(birthDate).format("DD.MM.YYYY")}
          />
          <InformationItem
            title="Email"
            value={email}
            link={`mailto: ${email}`}
          />
          {address && <InformationItem title="Address" value={address} />}
        </InformationBlock>

        <InformationBlock
          title="Contacts"
          goToEditUser={goToEditUser("contacts")}
        >
          <InformationItem title="Company" value={company} />
          <InformationItem title="Fax" value={fax} link={`tel: ${fax}`} />
          <InformationItem
            title="Facebook Link"
            value={facebook}
            link={facebook}
          />
          {phones[0] &&
            phones.map((phone, i) => (
              <InformationItem
                key={i}
                title={`Phone #${i + 1}`}
                value={phone}
                link={`tel: ${phone}`}
              />
            ))}
        </InformationBlock>

        <InformationBlock
          title="Capabilities"
          goToEditUser={goToEditUser("capabilities")}
        >
          <InformationItem title="Skills" value={skills.join(", ")} />
          {hobbies && (
            <InformationItem title="Hobbies" value={hobbies.join(", ")} />
          )}
        </InformationBlock>
      </div>
    </div>
  );
};

export default UserInformation;
