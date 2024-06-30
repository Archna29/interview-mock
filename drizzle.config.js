/** @type { import("drizzle-kit").Config } */
export default {
    schema: "./utils/schema.js",
    dialect: 'postgresql',
    dbCredentials: {
      url:'postgresql://interview-mock_owner:mgeFR24izPIL@ep-ancient-butterfly-a5sc44nr.us-east-2.aws.neon.tech/interview-mock?sslmode=require',
    }
  };
  