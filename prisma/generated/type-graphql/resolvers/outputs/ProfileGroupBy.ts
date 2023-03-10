import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { ProfileAvgAggregate } from "../outputs/ProfileAvgAggregate";
import { ProfileCountAggregate } from "../outputs/ProfileCountAggregate";
import { ProfileMaxAggregate } from "../outputs/ProfileMaxAggregate";
import { ProfileMinAggregate } from "../outputs/ProfileMinAggregate";
import { ProfileSumAggregate } from "../outputs/ProfileSumAggregate";

@TypeGraphQL.ObjectType("ProfileGroupBy", {
  isAbstract: true
})
export class ProfileGroupBy {
  @TypeGraphQL.Field(_type => TypeGraphQL.Int, {
    nullable: false
  })
  id!: number;

  @TypeGraphQL.Field(_type => String, {
    nullable: false
  })
  handle!: string;

  @TypeGraphQL.Field(_type => String, {
    nullable: false
  })
  title!: string;

  @TypeGraphQL.Field(_type => String, {
    nullable: false
  })
  summary!: string;

  @TypeGraphQL.Field(_type => String, {
    nullable: false
  })
  job_type!: string;

  @TypeGraphQL.Field(_type => String, {
    nullable: false
  })
  pref_location!: string;

  @TypeGraphQL.Field(_type => String, {
    nullable: false
  })
  salary!: string;

  @TypeGraphQL.Field(_type => String, {
    nullable: false
  })
  years_of_exp!: string;

  @TypeGraphQL.Field(_type => [String], {
    nullable: true
  })
  link!: string[] | null;

  @TypeGraphQL.Field(_type => String, {
    nullable: false
  })
  address!: string;

  @TypeGraphQL.Field(_type => [String], {
    nullable: true
  })
  skills!: string[] | null;

  @TypeGraphQL.Field(_type => [GraphQLScalars.JSONResolver], {
    nullable: true
  })
  education!: Prisma.JsonValue[] | null;

  @TypeGraphQL.Field(_type => [GraphQLScalars.JSONResolver], {
    nullable: true
  })
  experience!: Prisma.JsonValue[] | null;

  @TypeGraphQL.Field(_type => Boolean, {
    nullable: false
  })
  minted!: boolean;

  @TypeGraphQL.Field(_type => String, {
    nullable: false
  })
  user_id!: string;

  @TypeGraphQL.Field(_type => String, {
    nullable: false
  })
  ipfs_hash!: string;

  @TypeGraphQL.Field(_type => String, {
    nullable: false
  })
  resume!: string;

  @TypeGraphQL.Field(_type => ProfileCountAggregate, {
    nullable: true
  })
  _count!: ProfileCountAggregate | null;

  @TypeGraphQL.Field(_type => ProfileAvgAggregate, {
    nullable: true
  })
  _avg!: ProfileAvgAggregate | null;

  @TypeGraphQL.Field(_type => ProfileSumAggregate, {
    nullable: true
  })
  _sum!: ProfileSumAggregate | null;

  @TypeGraphQL.Field(_type => ProfileMinAggregate, {
    nullable: true
  })
  _min!: ProfileMinAggregate | null;

  @TypeGraphQL.Field(_type => ProfileMaxAggregate, {
    nullable: true
  })
  _max!: ProfileMaxAggregate | null;
}
