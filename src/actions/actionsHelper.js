export const removeUnnecessaryUserProperties = (user) => {
  const newUser = { ...user };
  delete newUser.repeatPassword;
  delete newUser.allowedUnsubmittedStep;
  newUser.lastUpdate = new Date();
  return newUser;
};
