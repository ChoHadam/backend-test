import { Controller, Get, Req, ValidationPipe } from '@nestjs/common';
import { AppService } from './app.service';
import { RequestHeaderDTO } from './dto/request-header.dto';
import { RequestHeaders } from './request-headers.decorator';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  //프록시 처리
  @Get()
  async proxy(
    @Req() request: Request,
    @RequestHeaders(new ValidationPipe({ validateCustomDecorators: true }))
    headers: RequestHeaderDTO,
  ) {
    return await this.appService.proxy(request, headers.id);
  }

  @Get('challenge1')
  challenge1(): number {
    return this.appService.challenge1();
  }

  @Get('challenge2')
  challenge2(): number {
    return this.appService.challenge2();
  }
}
