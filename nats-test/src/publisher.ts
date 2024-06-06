import nats from 'node-nats-streaming';
import { TicketCreatePublisher } from './events/ticket-create-publisher';

console.clear();

const stan = nats.connect('ticketing', 'abc', {
  url: 'http://localhost:4222',
});

stan.on('connect', async () => {
  console.log('Publisher connected to NATS');

  const publisher = new TicketCreatePublisher(stan);

  try {
    await publisher.publish({
      id: '123',
      title: 'concert',
      price: 20000
    });
  } catch (err) {
    console.error(err);
  }

  // const data = JSON.stringify({
  //   id: '123',
  //   title: 'concert',
  //   price: 20000
  // });
  //
  // stan.publish('ticket:created', data, () => {
  //   console.log('Event published');
  // });
});
