import { PartialType } from '@nestjs/swagger';
import { CreateRestaurantAddressDto } from './create-restaurant-address.dto';

export class UpdateRestaurantAddressDto extends PartialType(CreateRestaurantAddressDto) {}
