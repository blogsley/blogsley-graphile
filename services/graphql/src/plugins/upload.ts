import path from 'path';
import process from 'process';
import { Client } from 'minio';
import { Plugin } from 'postgraphile';
import { makeExtendSchemaPlugin, gql } from 'graphile-utils';

const port = parseInt(process.env.MINIO_PORT || (process.env.MINIO_SSL ? '443' : '9000'), 10);
const domain = process.env.MINIO_DOMAIN || 'localhost';

const client = new Client({
  endPoint: domain,
  port,
  useSSL: !!process.env.MINIO_SSL,
  accessKey: process.env.MINIO_ACCESS_KEY || 'blogsley',
  secretKey: process.env.MINIO_SECRET_KEY || 'blogsley',
});

export const createPresignedUrl = async (bucket: string, path: string) => {
  return await client.presignedPutObject(bucket, path);
};

export const UploadPlugin: Plugin = makeExtendSchemaPlugin(() => {
  return {
    typeDefs: gql`
      input UploadInput {
        directory: String
        filename: String!
      }
      type Upload {
        uploadUrl: String!
        url: String!
      }
      extend type Mutation {
        uploadFile(input: UploadInput!): Upload!
      }
    `,
    resolvers: {
      Mutation: {
        async uploadFile(query, { input }) {
          const filepath = path.join(input.directory || '', input.filename);
          const uploadUrl = await createPresignedUrl('blogsley', filepath);
          const url = `http://localhost:9000/blogsley/${filepath}`
          return { uploadUrl, url };
        },
      },
    },
  };
});