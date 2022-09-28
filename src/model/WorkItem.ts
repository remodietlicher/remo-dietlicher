import { Field, Form } from "class-forms";
import { Edge, Node } from "graphorm";
import { Company } from "./Company";

@Form()
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
