// Backend server URL
const BASE_URL = "http://localhost:5000/api";

// User Routes
export const LOGIN_URL = BASE_URL + "/user/login";
export const REGISTER_URL = BASE_URL + "/user/register";
export const EDIT_PROFILE_URL = BASE_URL + "/user/edit-profile";
export const DELETE_ACCOUNT_URL = BASE_URL + "/user/delete-profile";

// Project Routes
export const CREATE_PROJECT_URL = BASE_URL + "/project/create-project";
export const ADD_FILE_URL = BASE_URL + "/project/add-files";

export const GET_ALL_PROJECTS_URL = BASE_URL + "/project/get-all-projects";
export const GET_PROJECT_URL = BASE_URL + "/project/get-project/:project-id";

export const PROJECT_REVIEW_URL = BASE_URL + "/project/review/project-review";
export const FILE_REVIEW_URL = BASE_URL + "/project/review/file-review";
export const SNIPPET_REVIEW_URL = BASE_URL + "/project/review/snip-review";

export const DELETE_PROJECT_URL = BASE_URL + "/project/delete-project/";
export const DELETE_FILE_URL = BASE_URL + "/project/delete-file";
export const DELETE_SNIP_URL = BASE_URL + "/project/delete-snip"

// File Routes
