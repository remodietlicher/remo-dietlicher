import { Field, Form } from "class-forms";
import { Edge, Node } from "graphorm";

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
@Node("http://dbpedia.org/ontology/Company")
export class Company {
  @Field({ primary: true })
  @Edge("http://xmlns.com/foaf/0.1/name")
  name: string;
  @Field()
  @Edge("http://schema.org/address")
  address: string;
}
