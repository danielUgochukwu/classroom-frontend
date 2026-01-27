import { Subject } from "../types";

export const MOCK_SUBJECTS: Subject[] = [
    {
        id: 1,
        code: "CS101",
        name: "Introduction to Computer Science",
        department: "Computer Science",
        description: "Fundamental concepts of computing and programming.",
        createdAt: new Date().toISOString(),
    },
    {
        id: 2,
        code: "ENG201",
        name: "Advanced English Literature",
        department: "English",
        description: "In-depth analysis of classic and modern literary works.",
        createdAt: new Date().toISOString(),
    },
    {
        id: 3,
        code: "MATH301",
        name: "Linear Algebra",
        department: "Mathematics",
        description: "Study of vectors, vector spaces, and linear transformations.",
        createdAt: new Date().toISOString(),
    },
];
