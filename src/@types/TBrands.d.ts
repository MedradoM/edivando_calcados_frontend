interface TBrands {
  id: number;
  name: string;
  img: FileList | null;
}

interface TBrandsPost {
  id: number;
  name: string;
  img: File;
}
