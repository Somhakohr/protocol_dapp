import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { CreditWhereUniqueInput } from "../../../inputs/CreditWhereUniqueInput";

@TypeGraphQL.ArgsType()
export class DeleteOneCreditArgs {
  @TypeGraphQL.Field(_type => CreditWhereUniqueInput, {
    nullable: false
  })
  where!: CreditWhereUniqueInput;
}
