import { Publisher, Subjects, TicketUpdatedEvent } from "@rjrtickets/common";

export class TicketUpdatePublisher extends Publisher<TicketUpdatedEvent> {
  subject: Subjects.TicketUpdated = Subjects.TicketUpdated;
}
