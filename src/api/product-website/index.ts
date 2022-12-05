import { request } from "../method";

export type TProductWebsite = {
  productId: string;
  description: string;
  summary: string;
  videoUrl: string;
  gallery: string[];
  specifications: string;
  categorys: string[];
};

export type TProductWebsitePayload = Omit<TProductWebsite, "gallery" | "categorys"> & {
  gallery: string;
  categorys: string;
}

const BASE_URL = "ProductWebsite";

export const productsWebsite = {
  create: (payload: TProductWebsitePayload) =>
    request.post<TProductWebsitePayload, null>(BASE_URL, payload),
};
