import { Image } from './common';

export interface Customer {
  id: number;
  first_name: string;
  last_name: string;
  license_card_number: string;
  license_card_image: Image;
  id_card_number: string;
  id_card_image: Image;
  id_card_image_location: string;
  contact_mobile: string;
  utility_bill_image: Image;
  utility_bill_image_location: string;
  is_verified: number;
  registered_date: Date;
  is_deleted: number;
  created_at: Date;
  updated_at: Date;
}
