import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { VerificationTokenWhereUniqueInput } from "../../../inputs/VerificationTokenWhereUniqueInput";

@TypeGraphQL.ArgsType()
export class FindUniqueVerificationTokenOrThrowArgs {
  @TypeGraphQL.Field(_type => VerificationTokenWhereUniqueInput, {
    nullable: false
  })
  where!: VerificationTokenWhereUniqueInput;
}
