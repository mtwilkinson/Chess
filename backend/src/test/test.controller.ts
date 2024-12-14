import {Controller, Get, Post, Body, Patch, Param, Delete, Req, Res, HttpException, HttpStatus} from '@nestjs/common';
import { TestService } from './test.service';
import {Prisma} from "database/.prisma/client";

@Controller('api/test')
export class TestController {
  constructor(private readonly testService: TestService) {}

  @Post()
  async create(@Body() createTestDto: Prisma.FeedbackCreateInput) {
    try {
      return await this.testService.create(createTestDto);
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST)
    }
  }

  @Get()
  async findAll() {
    let data;
    try {
      data = await this.testService.findAll();
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST)
    }
    if (data.length !== 0) {
      return data;
    } else {
      throw new HttpException('no data found', HttpStatus.OK)
    }
  }
}
