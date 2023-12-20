import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';

const MAX_REQUEST_COUNT = 10;

@Injectable()
export class SchedulerService {
  private readonly logger = new Logger(SchedulerService.name);
  private userRequestQueue: { [key: string]: Request[] } = {}; // 각 유저 아이디별 요청 큐를 저장할 객체

  constructor() {}

  @Cron('* * * * * *')
  async handleCron() {
    this.logger.debug('Called every second');

    for (const key of Object.keys(this.userRequestQueue)) {
      if (this.userRequestQueue[key].length > 0) {
        const requests = this.userRequestQueue[key].splice(
          0,
          MAX_REQUEST_COUNT,
        );

        for (const request of requests) {
          // A 서버에 요청 전달
          console.log('A 서버에 요청 전달', request);
        }
      }
    }
  }

  addRequest(request: Request, userId: string) {
    if (!this.userRequestQueue[userId]) {
      this.userRequestQueue[userId] = []; // 해당 유저 아이디의 큐가 없으면 초기화
    }
    this.userRequestQueue[userId].push(request);
  }
}
