import { GraduationCap, School } from "lucide-react";

export const USER_ROLES = {
  STUDENT: "student",
  TEACHER: "teacher",
  ADMIN: "admin",
};

export const ROLE_OPTIONS = [
  {
    value: USER_ROLES.STUDENT,
    label: "Student",
    icon: GraduationCap,
  },
  {
    value: USER_ROLES.TEACHER,
    label: "Teacher",
    icon: School,
  },
];

export const DEPARTMENTS = [
  "Computer Science",
  "Mathematics",
  "Physics",
  "Chemistry",
  "Biology",
  "English",
  "History",
  "Geography",
  "Economics",
  "Business Administration",
  "Engineering",
  "Psychology",
  "Sociology",
  "Political Science",
  "Philosophy",
  "Education",
  "Fine Arts",
  "Music",
  "Physical Education",
  "Law",
] as const;

export const DEPARTMENT_OPTIONS = DEPARTMENTS.map((dept) => ({
  value: dept,
  label: dept,
}));

export const MAX_FILE_SIZE = 3 * 1024 * 1024; // 3MB in bytes
export const ALLOWED_TYPES = [
  "image/png",
  "image/jpeg",
  "image/jpg",
  "image/webp",
];

type EnvValidator = (value: string, key: string) => string;

const validateHttpUrl: EnvValidator = (value, key) => {
  let parsedUrl: URL;
  try {
    parsedUrl = new URL(value);
  } catch {
    throw new Error(`${key} must be a valid URL`);
  }

  if (parsedUrl.protocol !== "http:" && parsedUrl.protocol !== "https:") {
    throw new Error(`${key} must start with http:// or https://`);
  }

  return value;
};

const validateKeyLikeValue: EnvValidator = (value, key) => {
  const isValid = /^[a-zA-Z0-9_-]+$/.test(value);
  if (!isValid) {
    throw new Error(
      `${key} must contain only letters, numbers, underscores, or hyphens`
    );
  }

  return value;
};

const getEnvVar = (key: string, validate?: EnvValidator): string => {
  const value = import.meta.env[key];
  if (typeof value !== "string" || value.trim().length === 0) {
    throw new Error(`Missing environment variable: ${key}`);
  }

  const cleanedValue = value.trim();
  return validate ? validate(cleanedValue, key) : cleanedValue;
};

export const CLOUDINARY_UPLOAD_URL = getEnvVar(
  "VITE_CLOUDINARY_UPLOAD_URL",
  validateHttpUrl
);
export const CLOUDINARY_CLOUD_NAME = getEnvVar(
  "VITE_CLOUDINARY_CLOUD_NAME",
  validateKeyLikeValue
);
export const BACKEND_BASE_URL = getEnvVar(
  "VITE_BACKEND_BASE_URL",
  validateHttpUrl
);

export const BASE_URL = getEnvVar("VITE_API_URL", validateHttpUrl).replace(
  /\/+$/,
  ""
);
export const ACCESS_TOKEN_KEY = getEnvVar(
  "VITE_ACCESS_TOKEN_KEY",
  validateKeyLikeValue
);
export const REFRESH_TOKEN_KEY = getEnvVar(
  "VITE_REFRESH_TOKEN_KEY",
  validateKeyLikeValue
);

export const REFRESH_TOKEN_URL = `${BASE_URL}/refresh-token`;

export const CLOUDINARY_UPLOAD_PRESET = getEnvVar(
  "VITE_CLOUDINARY_UPLOAD_PRESET",
  validateKeyLikeValue
);

export const teachers = [
  {
    id: "1",
    name: "John Doe",
  },
  {
    id: "2",
    name: "Jane Smith",
  },
  {
    id: "3",
    name: "Dr. Alan Turing",
  },
];

export const subjects = [
  {
    id: 1,
    name: "Mathematics",
    code: "MATH",
  },
  {
    id: 2,
    name: "Computer Science",
    code: "CS",
  },
  {
    id: 3,
    name: "Physics",
    code: "PHY",
  },
  {
    id: 4,
    name: "Chemistry",
    code: "CHEM",
  },
];
