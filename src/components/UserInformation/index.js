import React from "react";
import moment from "moment";

import InformationItem from "./InformationItem";
import InformationBlock from "./InformationBlock";

import "./styles.css";
import Avatar from "../UI/Avatar";

const UserInformation = ({
  user: {
    id,
    avatar,
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
      <Avatar avatar={avatar} style={{ minWidth: "200px" }} />
      <div className="user-information">
        <InformationBlock title="Account" handleClick={goToEditUser("account")}>
          <InformationItem title="User name" value={username} />
          <InformationItem title="Password" value="********" />
        </InformationBlock>

        <InformationBlock
          title="Personal"
          handleClick={goToEditUser("profile")}
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
          <InformationItem title="Address" value={address} />
        </InformationBlock>

        <InformationBlock
          title="Contacts"
          handleClick={goToEditUser("contacts")}
        >
          <InformationItem title="Company" value={company} />
          <InformationItem title="Fax" value={fax} link={`tel: ${fax}`} />
          <InformationItem
            title="Facebook Link"
            value={facebook}
            link={facebook}
          />
          {phones.length ? (
            phones.map((phone, i) => (
              <InformationItem
                key={i}
                title={`Phone #${i + 1}`}
                value={phone}
                link={`tel: ${phone}`}
              />
            ))
          ) : (
            <InformationItem title={`Phone #1`} />
          )}
        </InformationBlock>

        <InformationBlock
          title="Capabilities"
          handleClick={goToEditUser("capabilities")}
        >
          <InformationItem title="Skills" value={skills.join(", ")} />
          <InformationItem title="Hobbies" value={hobbies.join(", ")} />
        </InformationBlock>
      </div>
    </div>
  );
};

export default UserInformation;
