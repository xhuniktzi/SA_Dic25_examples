import { Module } from "@nestjs/common";
import { Redis } from "ioredis";
import { RedisStorageRepository } from "./repositories/redis.repository";

@Module({
    providers: [
        {
            provide: "REDIS_CLIENT",
            useFactory: () =>
                new Redis({
                    host: "redis",
                    port: 6379,
                }),
        },
        RedisStorageRepository,
    ],
    exports: ["REDIS_CLIENT", RedisStorageRepository],
})
export class RedisModule {}