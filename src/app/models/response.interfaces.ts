export interface IResponse {
  status: string;
  response: string;
}

export interface ApiResponse {
  success: boolean;
  message: string | null;
  content: any[];
}

export interface ApiResponseSingle {
  success: boolean;
  message: string | null;
  content: any;
}
