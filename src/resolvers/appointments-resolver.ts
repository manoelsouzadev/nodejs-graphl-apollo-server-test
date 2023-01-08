import { Appointment } from "./../dtos/models/appointment-model";
import {
  Arg,
  Query,
  Mutation,
  Resolver,
  FieldResolver,
  Root,
} from "type-graphql";
import { CreateAppointmentInput } from "../dtos/inputs/create-appointment-input";
import { Customer } from "../dtos/models/customer-model";
import { v4 as uuidv4 } from 'uuid';

@Resolver(() => Appointment)
export class AppointmentsResolver {
  users: Appointment[] = [];

  @Query(() => [Appointment])
  async appointments() {
    return this.users;
  }

  @Mutation(() => Appointment)
  async createAppointment(@Arg("data") data: CreateAppointmentInput) {
    const appointment = {
      startsAt: data.startsAt,
      endsAt: data.endsAt,
    };
    this.users.push(appointment);

    return appointment;
  }

  @FieldResolver(() => Customer)
  async customer(@Root() appointment: Appointment) {
    console.log(appointment);

    return {
      name: "User " + uuidv4(),
    };
  }
}
