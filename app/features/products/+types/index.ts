export interface Product {
  id: string;
  name: string;
  description: string;
  commentCount: number;
  viewCount: number;
  upvoteCount: number;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  productCount: number;
}

export interface Route {
  LoaderArgs: {
    request: Request;
    params?: {
      category?: string;
      year?: string;
      month?: string;
      day?: string;
      week?: string;
    };
  };
  ComponentProps: {
    loaderData: {
      products?: Product[];
      categories?: Category[];
      category?: Category;
      query?: string;
      period?: {
        year: number;
        month?: number;
        day?: number;
        week?: number;
      };
    };
  };
} 