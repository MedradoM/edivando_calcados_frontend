interface TProducts {
  id?: number;
  title: string;
  value: number;
  description: string;
  quantity: number;
  status?: "SD" | "SH";
  galery: TGallery;
  group: TGroup;
  brand: TBrands;
}

interface TProductsPost {
  id?: number;
  title: string;
  value: number;
  description: string;
  quantity: number;
  status?: "SD" | "SH";
  galery_id: number;
  group_id: number;
  brand_id: number;
}
