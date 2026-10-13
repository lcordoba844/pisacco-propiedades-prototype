import {
  Body,
  Delete,
  Get,
  HttpCode,
  JsonController,
  Param,
  Post,
  Put,
  UseBefore,
  OnUndefined,
  UploadedFiles,
} from 'routing-controllers';
import { OpenAPI, ResponseSchema } from 'routing-controllers-openapi';
import { Service } from 'typedi';

import {
  CreatePropertyRequest,
  PropertyResponse,
  UpdatePropertyRequest,
  UploadedFileDTO,
} from '@/application/property/property.dto';
import { PropertyService } from '@/application/property/property.service';
import { requireAuth } from '@/middlewares/auth.middleware';
import { fileUploadOptions } from '@/middlewares/upload.middleware';

@JsonController('/properties')
@Service()
export class PropertyController {
  constructor(private readonly propertyService: PropertyService) {}

  @Get()
  @OpenAPI({ summary: 'Get all properties' })
  @ResponseSchema(PropertyResponse, { isArray: true })
  public async getProperties(): Promise<PropertyResponse[]> {
    return await this.propertyService.getAllProperties();
  }

  @Get('/:id')
  @OpenAPI({ summary: 'Get one property' })
  @ResponseSchema(PropertyResponse)
  public async getPropertyById(
    @Param('id') id: string,
  ): Promise<PropertyResponse> {
    return await this.propertyService.getPropertyById(id);
  }

  @Post()
  @HttpCode(201)
  @UseBefore(requireAuth)
  @OpenAPI({ summary: 'Create a new property' })
  @ResponseSchema(PropertyResponse)
  public async createProperty(
    @Body() request: CreatePropertyRequest,
    @UploadedFiles('imagenes', { options: fileUploadOptions })
    files: Express.Multer.File[],
  ): Promise<PropertyResponse> {
    const cleanFiles: UploadedFileDTO[] = (files || []).map((file) => ({
      buffer: file.buffer,
      originalname: file.originalname,
      mimetype: file.mimetype,
      size: file.size,
    }));
    return await this.propertyService.createProperty(request, cleanFiles);
  }

  @Put('/:id')
  @UseBefore(requireAuth)
  @OpenAPI({ summary: 'Update a property' })
  @ResponseSchema(PropertyResponse)
  public async updateProperty(
    @Param('id') id: string,
    @Body() request: UpdatePropertyRequest,
  ): Promise<PropertyResponse> {
    return await this.propertyService.updateProperty(id, request);
  }

  @Delete('/:id')
  @OnUndefined(204)
  @HttpCode(204)
  @UseBefore(requireAuth)
  @OpenAPI({ summary: 'Delete a property' })
  public async deleteProperty(@Param('id') id: string): Promise<void> {
    await this.propertyService.deleteProperty(id);
  }
}
