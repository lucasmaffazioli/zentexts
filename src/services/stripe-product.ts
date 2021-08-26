import { stripe } from './stripe';

export default async function getStripeProduct() {
  const price = await stripe.prices.retrieve('price_1JOeiCL7uhZFf3CIM78F0shL', {
    expand: ['product'],
  });

  const product = {
    priceId: price.id,
    amount: new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price.unit_amount / 100),
  };

  return product;
}
