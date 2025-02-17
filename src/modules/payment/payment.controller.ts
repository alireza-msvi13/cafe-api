import { Body, Controller, Get, Post, Query, Res, UseGuards } from "@nestjs/common";
import { PaymentService } from "./payment.service";
import { PaymentDto } from "./dto/payment.dto";
import { Response } from "express";
import { JwtGuard } from "../auth/guards/access-token.guard";
import { ApiConsumes, ApiOperation } from "@nestjs/swagger";
import { SwaggerContentTypes } from "src/common/enums/swagger.enum";
import { GetUser } from "src/common/decorators/get-user.decorator";

@Controller("Payment")
@UseGuards(JwtGuard)
export class PaymentController {
  constructor(private paymentService: PaymentService) { }

  @Post("gateway")
  @ApiOperation({ summary: "payment gateway" })
  @ApiConsumes(SwaggerContentTypes.FORM_URL_ENCODED, SwaggerContentTypes.JSON)
  paymentGatewat(
    @Body() paymentDto: PaymentDto,
    @GetUser('id') userId: string,
    @Res() response: Response
  ) {
    return this.paymentService.paymentGatewat(paymentDto, userId, response);
  }

  @Get("verify")
  @ApiOperation({ summary: "payment verify" })
  async paymentVerify(
    @Query("Authority") authority: string,
    @Query("Status") status: string,
    @Res() response: Response
  ) {
    return await this.paymentService.paymentVerify(authority, status, response);
  }


}
