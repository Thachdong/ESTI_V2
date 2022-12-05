import { request } from "../method";

export type TProductWebsitePayload = {
  productId: string;
  description: string;
  summary: string;
  videoUrl: string;
  gallery: string;
  specifications: string;
  documents: string;
  categorys: string;
};

const BASE_URL = "ProductWebsite";

export const productsWebsite = {
  create: (payload: TProductWebsitePayload) =>
    request.post<TProductWebsitePayload, null>(BASE_URL, payload),
};
