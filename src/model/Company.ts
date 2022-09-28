import { Field, Form } from "class-forms";

export const wait = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

const STATIC_COMPANIES = [
  { name: "Heimat", address: "Beustweg 8" },
  { name: "Ferien", address: "Trogweg 3" },
];

const asyncFetcher = async () => {
  await wait(1000);
  return STATIC_COMPANIES;
};
@Form({ valueFetcher: asyncFetcher })
export class Company {
  @Field({ primary: true })
  name: string;
  @Field()
  address: string;
}
