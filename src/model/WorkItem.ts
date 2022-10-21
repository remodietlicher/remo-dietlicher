import { getDefaultSession } from "@inrupt/solid-client-authn-browser";
import { Field, Form } from "class-forms";
import { DataModel, Edge, Node } from "graphorm";
import { Company } from "./Company";

const onSubmitHandler = async (data) => {
  console.log("Submitting data for Company class:");
  const model = new DataModel({
    type: "comunica",
    nodes: [WorkItem],
  });

  const node = undefined;

  console.log(getDefaultSession().info);
  await model.manager.save(
    node,
    ["https://fornax.solidcommunity.net/class-form-test.ttl"],
    { session: getDefaultSession() }
  );
};
@Form(onSubmitHandler)
@Node("http://dbpedia.org/ontology/Work")
export class WorkItem {
  @Field({ primary: true })
  @Edge("http://schema.org/description")
  description: string;
  @Field()
  @Edge("http://dbpedia.org/ontology/Company")
  company: Company;
  @Field()
  @Edge("http://schema.org/startDate")
  startDate: Date;
  @Field()
  @Edge("http://schema.org/endDate")
  endDate: Date;
}
