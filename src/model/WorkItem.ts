import { Field, Form } from "object-forms";

@Form()
export class WorkItem {
  @Field()
  company: string;
  @Field()
  startDate: Date;
  @Field()
  endDate: Date;
  @Field()
  description: string;
  @Field()
  skills: string[];
}
