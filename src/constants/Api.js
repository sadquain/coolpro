const POST = {
    type: "post",
    headers: {
      "content-type": "multipart/form-data",
    },
    dataFormat: "formData",
  };
  const GET = {
    type: "get",
    dataFormat: "raw",
  };
  const PUT = {
    type: "put",
    dataFormat: "formData",
  };
  
  const updateRaw = {
    type: "put",
    dataFormat: "raw",
  };
  
  const DEL = {
    type: "delete",
  };

  export const SIGN_IN = {
    method: POST,
    path: "/api/login",
  };

export const USERS_LISTS = {
    method: GET,
    path: `/listUsers`,
  };