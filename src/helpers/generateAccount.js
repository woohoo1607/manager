import faker from "faker";
import { SKILLS } from "../components/UserForms/skillsList";
import { LANGUAGES } from "../components/UserForms/languagesList";
import { HOBBIES } from "../components/UserForms/hobbies";
import { avatars } from "./avatars";

const randomDate = (start, end) =>
  new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));

const getValuesFromObjectsArray = (arr = []) => arr.map(({ value }) => value);

const imageToBlob = async (image) => {
  const base64Response = await fetch(image);
  return await base64Response.blob();
};

export const generateAccount = async () => {
  faker.locale = "uk";
  const avatar = await imageToBlob(faker.random.arrayElement(avatars));
  console.log(avatar);
  return {
    id: faker.random.uuid(),
    avatar: avatar,
    username: faker.internet.userName(),
    password: faker.internet.password(),
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    birthDate: randomDate(new Date(1980, 0, 1), new Date(2002, 0, 1)),
    email: faker.internet.email(),
    address: `${faker.address.city()}, ${faker.address.streetAddress()}`,
    gender: faker.random.arrayElement(["Male", "Female"]),
    company: faker.company.companyName(),
    github: `www.github.com/${faker.internet.userName()}`,
    facebook: `www.facebook.com/${faker.internet.userName()}`,
    language: faker.random.arrayElement(getValuesFromObjectsArray(LANGUAGES)),
    fax: `+38 ${faker.phone.phoneNumber().replace(/-/gi, " ")}`,
    phones: [`+38 ${faker.phone.phoneNumber().replace(/-/gi, " ")}`],
    skills: faker.random.arrayElements(getValuesFromObjectsArray(SKILLS), 3),
    information: faker.lorem.sentence(),
    hobbies: faker.random.arrayElements(HOBBIES),
    lastUpdate: randomDate(new Date(2021, 0, 1), new Date()),
  };
};
