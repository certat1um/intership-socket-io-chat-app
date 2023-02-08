import { Controller, Get } from "@nestjs/common/decorators";

@Controller('rooms')
export class RoomsController {

  @Get()
  async getRoomsPage() {
    return 1;
  }

  @Get('simple')
  async getSimpleRoomPage() {
    return 1;
  }
}