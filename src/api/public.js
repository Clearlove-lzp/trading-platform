import axios from "axios";
import { agencyStr } from "@/axiosConfig/enviromentConfig.js";

// 文件上传接口
export const uploadFile = agencyStr + `/api/data/upload/file`;
export const uploadSample = agencyStr + `/api/data/upload/sample`;
