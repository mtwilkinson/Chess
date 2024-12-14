import {Injectable} from '@nestjs/common';
import {Prisma, PrismaClient} from "database/.prisma/client";



@Injectable()
export class TestService {
  async create(createTestDto: Prisma.FeedbackCreateInput) {
    const prismaClient = new PrismaClient()
    await prismaClient.feedback.create({data: createTestDto});
    console.info("Successfully saved high score attempt"); // Log that it was successful
    return (createTestDto)
  }

  async findAll() {
    const prismaClient = new PrismaClient()
    return prismaClient.feedback.findMany({});
  }
}
