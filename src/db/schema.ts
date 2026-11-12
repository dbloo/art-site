import { pgTable, integer, text, timestamp } from 'drizzle-orm/pg-core'

export const contactFormSubmissions = pgTable('contact_form_submissions', {
  id: integer('id').primaryKey().generatedAlwaysAsIdentity(),
  name: text().notNull(),
  email: text().notNull(),
  message: text().notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
})

export const emailSubmissions = pgTable('emails', {
  id: integer('id').primaryKey().generatedAlwaysAsIdentity(),
  email: text().notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
})

export const originalsStock = pgTable('originals_stock', {
  id: integer('id').primaryKey().generatedAlwaysAsIdentity(),
  name: text().notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  stock: integer('stock').notNull(),
})

export const EmailSubscriptions = pgTable('email_subscriptions', {
  id: integer('id').primaryKey().generatedAlwaysAsIdentity(),
  email: text().notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
})
