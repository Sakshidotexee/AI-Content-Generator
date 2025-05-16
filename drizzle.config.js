// drizzle.config.ts
/** @type {import("drizzle-kit").Config}*/

export default ({
  dialect: "postgresql",
  schema: "./utils/schema.tsx",
  dbCredentials:{
    url: 'postgresql://neondb_owner:npg_t3Kg1cOfmCEH@ep-icy-lab-a1xct80t-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require',
  }
});
