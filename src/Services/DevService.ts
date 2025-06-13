import { prisma } from '../prisma/client';
import { Link } from '@prisma/client';
import crypto from 'crypto';
import { customAlphabet } from 'nanoid';




class DevService {
    public async register({ url, Dev }: { url: string, DevId: string | null }) {
        const generateNanoId = customAlphabet("ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789", 5)
        const DevId = DevId === null ? generateNanoId() : DevId;
       
        const link = {
            id: crypto.randomUUID(),
            DevId:DevId,
            originalUrl: url,
            createdAt: new Date()
        } as Link;

        await prisma.link.create({ data: link });

        return { DevId: link.DevId }
    }
    public async findByIdentifier(identifier: string) {
        const link = await prisma.link.findUnique({ where: { DevId: identifier } });
        if (!link) {
            throw new Error("Not found..")
        }

        return { originalUrl: link.originalUrl }
    }

    
}

export const DevService = new DevService();
   

 