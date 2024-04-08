// Backend server URL
const BASE_URL = "http://localhost:5000/api";

// User Routes
export const LOGIN_URL = BASE_URL + "/user/login";
export const REGISTER_URL = BASE_URL + "/user/register";
export const EDIT_PROFILE_URL = BASE_URL + "/user/edit-profile";

// Project Routes
export const CREATE_PROJECT_URL = BASE_URL + "/project/create-project";
export const GET_ALL_PROJECTS_URL = BASE_URL + "/project/get-all-projects";

export const GET_PROJECT_URL = BASE_URL + "/project/get-project";
export const CREATE_PROJECT_REVIEW_URL = BASE_URL + "/project/review/project-review";

export const GET_FILE_REVIEW_URL = BASE_URL + "/project/review/file-review";
export const UPLOAD_TO_SERVER_URL = BASE_URL + "/project/upload-file";
export const GET_FILE_CONTENTS = BASE_URL + "/project/get-file-content";
