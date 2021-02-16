import faker from "faker";
import { HOBBIES, LANGUAGES, SKILLS } from "../mocks";

const randomDate = (start, end) =>
  new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));

const getValuesFromObjectsArray = (arr = []) => arr.map(({ value }) => value);

const imageToBlob = async (image) => {
  try {
    const base64Response = await fetch(image);
    const { ok = true } = base64Response;
    if (ok) {
      return await base64Response.blob();
    }
  } catch (error) {
    return null;
  }
};

export const generateAvatar = () =>
  new Promise((resolve, reject) => {
    imageToBlob("https://picsum.photos/200")
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });

const generatePhone = () =>
  `+38 ${faker.phone.phoneNumber().replace(/-/gi, " ")}`;

export const generateAccount = () => {
  faker.locale = "uk";
  return {
    id: faker.random.uuid(),
    avatar: null,
    username: faker.internet.userName(),
    password: faker.internet.password(),
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    birthDate: randomDate(new Date(1980, 0, 1), new Date(2002, 0, 1)),
    email: faker.internet.email(),
    address: `${faker.address.city()}, ${faker.address.streetAddress()}`,
    gender: faker.random.arrayElement(["Male", "Female"]),
    company: faker.company.companyName(),
    github: `https://www.github.com/${faker.internet.domainWord()}`,
    facebook: `https://www.facebook.com/${faker.internet.domainWord()}`,
    language: faker.random.arrayElement(getValuesFromObjectsArray(LANGUAGES)),
    fax: generatePhone(),
    phones: [generatePhone()],
    skills: faker.random.arrayElements(getValuesFromObjectsArray(SKILLS), 3),
    information: faker.lorem.sentence(),
    hobbies: faker.random.arrayElements(HOBBIES),
    lastUpdate: randomDate(new Date(2021, 0, 1), new Date()),
  };
};
