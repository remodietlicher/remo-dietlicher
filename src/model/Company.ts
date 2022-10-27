import { getDefaultSession } from "@inrupt/solid-client-authn-browser";
import { Field, Form } from "class-forms";
import { DataModel, Edge, Node } from "graphorm";

export const wait = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

const STATIC_COMPANIES: Company[] = [
  { name: "Heimat", address: "Beustweg 8" },
  { name: "Ferien", address: "Trogweg 3" },
];

const asyncFetcher = async () => {
  await wait(1000);
  return STATIC_COMPANIES;
};

const asyncFetcher2 = async () => {
  const model = new DataModel({
    type: "comunica",
  });

  console.log(getDefaultSession().info);
  const results: Company[] | undefined = await model.manager.findAll(
    Company,
    ["https://fornax.solidcommunity.net/class-form-test.ttl"],
    { session: getDefaultSession() }
  );
  return results;
};

const onSubmitHandler = async (data) => {
  const model = new DataModel({
    type: "comunica",
  });

  const node = new Company(data["name"], data["address"]);

  await model.manager.save(
    node,
    "https://fornax.solidcommunity.net/class-form-test.ttl",
    {
      session: getDefaultSession(),
      baseIRI: "https://fornax.solidcommunity.net/class-form-test",
    }
  );
};
@Form(onSubmitHandler, { valueFetcher: asyncFetcher2 })
@Node("<http://dbpedia.org/ontology/Company>")
export class Company {
  @Field({ primary: true })
  @Edge("<http://xmlns.com/foaf/0.1/name>", {
    primary: true,
  })
  name: string;
  @Field()
  @Edge("<http://schema.org/address>")
  address: string;

  constructor(name: string, address: string) {
    this.name = name;
    this.address = address;
  }
}
