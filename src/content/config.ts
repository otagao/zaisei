import { defineCollection, z } from 'astro:content';

const transactionCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.date(),
    amount: z.number(),
    type: z.enum(['income', 'expense']),
    category: z.string(),
  }),
});

export const collections = {
  transactions: transactionCollection,
};