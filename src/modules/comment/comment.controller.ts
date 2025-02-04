import { Body, Controller, Get, Param, ParseIntPipe, Post, Put, Query, Res, UseGuards } from '@nestjs/common';
import { CommentService } from './comment.service';
import { ApiConsumes, ApiOperation } from '@nestjs/swagger';
import { SwaggerContentTypes } from 'src/common/enums/swagger.enum';
import { CreateCommentDto } from './dto/create-comment.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { JwtGuard } from '../auth/guards/access-token.guard';
import { Response } from 'express';
import { GetUser } from 'src/common/decorators/get-user.decorator';
import { AdminGuard } from '../auth/guards/admin.guard';




@Controller('comment')
@UseGuards(JwtGuard)
export class CommentController {
  constructor(private commentService: CommentService) { }

  @Post("/")
  @ApiOperation({ summary: "create new comment for menu item" })
  @ApiConsumes(SwaggerContentTypes.FORM_URL_ENCODED, SwaggerContentTypes.JSON)
  createComment(
    @Body() createCommentDto: CreateCommentDto,
    @Res() response: Response,
    @GetUser("id") userId: string,
  ) {
    return this.commentService.createComment(createCommentDto, response, userId);
  }
  @Get("/")
  @UseGuards(AdminGuard)
  @ApiOperation({ summary: "see all comments by admin" })
  getAllComment(
    @Query() paginationDto: PaginationDto,
    @Res() response: Response,
  ) {
    return this.commentService.getAllComment(paginationDto, response)
  }
  @Put("/accept/:id")
  @UseGuards(AdminGuard)
  @ApiOperation({ summary: "accept comment for menu item by admin" })
  acceptComment(
    @Param("id") id: string,
    @Res() response: Response) {
    return this.commentService.acceptComment(id, response)
  }
  @Put("/reject/:id")
  @UseGuards(AdminGuard)
  @ApiOperation({ summary: "reject comment for menu item by admin" })
  rejectComment(
    @Param("id") id: string,
    @Res() response: Response) {
    return this.commentService.rejectComment(id, response)
  }
}
