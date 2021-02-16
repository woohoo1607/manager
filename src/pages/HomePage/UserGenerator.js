import React, { useEffect, useState } from "react";
import Button from "../../components/UI/Button";
import { generateAccount, generateAvatar } from "../../helpers/generateAccount";
import { usersService } from "../../services/db/UsersService";
import { sendErrorNotification } from "../../actions/notificationActions";
import { useDispatch } from "react-redux";

const generateFakeAccounts = ({ count = 50 }) => {
  const accounts = [];
  for (let i = 0; i < count; i++) {
    accounts.push(generateAccount());
  }
  return accounts;
};

const UserGenerator = ({ loading, fetchUsers }) => {
  const dispatch = useDispatch();

  const [isGenerating, setIsGenerating] = useState(false);

  const handleClickGenerateUsers = () => setIsGenerating(true);

  useEffect(() => {
    let isMounted = true;
    if (isGenerating) {
      loading(true);
      new Promise((resolve) => {
        const accounts = generateFakeAccounts({ count: 50 });
        resolve(
          Promise.all(
            accounts.map((account) => {
              return new Promise((resolve, reject) => {
                generateAvatar().then((res) => {
                  account.avatar = res;
                  resolve(account);
                });
              });
            })
          )
        );
      })
        .then((res) => usersService.clearAll().then(() => res))
        .then((res) => usersService.addMany(res))
        .then(() => (isMounted ? fetchUsers() : null))
        .catch(({ message = "error" }) => {
          dispatch(sendErrorNotification({ message }));
        })
        .finally(() => {
          return isMounted ? setIsGenerating(false) : null;
        });
    }
    return () => (isMounted = false);
  }, [isGenerating, dispatch, fetchUsers, setIsGenerating, loading]);

  return (
    <Button
      className="generate-button"
      onClick={handleClickGenerateUsers}
      disabled={isGenerating}
    >
      Generate accounts
    </Button>
  );
};

export default UserGenerator;
