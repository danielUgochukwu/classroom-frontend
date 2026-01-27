import {
  BaseRecord,
  DataProvider,
  GetListParams,
  GetListResponse,
} from "@refinedev/core";
import { MOCK_SUBJECTS } from "@/constans/mock-data";

export const dataProvider: DataProvider = {
  getList: async <TData extends BaseRecord = BaseRecord>({
    resource,
  }: GetListParams): Promise<GetListResponse<TData>> => {
    if (resource === "subjects") {
      return {
        data: MOCK_SUBJECTS as unknown as TData[],
        total: MOCK_SUBJECTS.length,
      };
    }

    return { data: [], total: 0 };
  },

  getOne: async () => {
    throw new Error("This function is not present in the mock data provider.");
  },
  create: async () => {
    throw new Error("This function is not present in the mock data provider.");
  },
  update: async () => {
    throw new Error("This function is not present in the mock data provider.");
  },
  deleteOne: async () => {
    throw new Error("This function is not present in the mock data provider.");
  },

  getApiUrl: () => "",
};
