interface TImage {
  id: number;
  name: string;
  img: FileList | null;
  type: string;
}

interface TImagePost {
  id?: number;
  img: number[];
  type?: string;
  name?: string;
}
