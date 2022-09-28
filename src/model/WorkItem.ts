import { Field, Form } from "class-forms";
import { Company } from "./Company";

@Form()
export class WorkItem {
  @Field({ primary: true })
  description: string;
  @Field()
  company: Company;
  @Field()
  startDate: Date;
  @Field()
  endDate: Date;
}
