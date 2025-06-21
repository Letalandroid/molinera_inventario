import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class CategoryService {

    constructor (private readonly prisma: PrismaService) {}

    get() {
        this.prisma.category.findMany();
    }

}
