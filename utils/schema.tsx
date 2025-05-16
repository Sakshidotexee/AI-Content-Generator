import { pgTable, serial, text, varchar } from "drizzle-orm/pg-core";

export const AIOutput= pgTable('aiOutput',{
    id:serial('id').primaryKey(),
    FormData:varchar('formData').notNull(),
    aiResponse:text('aiResponse'),
    templateSlug:varchar('template-slug').notNull(),
    createdBy: text("createdBy"),
    createdAt:varchar('createdAt')
})