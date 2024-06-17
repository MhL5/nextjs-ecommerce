import { PrismaClient } from "@prisma/client";
import { env } from "../env";

const prismaClientSingleton = () => {
  return new PrismaClient();
};

declare const globalThis: {
  prismaGlobal: ReturnType<typeof prismaClientSingleton>;
} & typeof global;

const prismaBase = globalThis.prismaGlobal ?? prismaClientSingleton();

const prisma = prismaBase.$extends({
  query: {
    cart: {
      async update({ args, query }) {
        args.data = { ...args.data, updatedAt: new Date() };
        return query(args);
      },
    },
  },
});

if (env.NODE_ENV !== "production") globalThis.prismaGlobal = prismaBase;

export default prisma;
