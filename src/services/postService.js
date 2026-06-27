import api from "./axios";

export const getPosts = async () => {
  const response = await api.get("/rest/v1/posts");
  return response.data;
};

export const addPost = async (data) => {
  const response = await api.post(
    "/rest/v1/posts",
    data,
    {
      headers: {
        Prefer: "return=representation",
      },
    }
  );

  return response.data;
};

export const updatePost = async (id, data) => {
  const response = await api.patch(
    `/rest/v1/posts?id=eq.${id}`,
    data,
    {
      headers: {
        Prefer: "return=representation",
      },
    }
  );

  return response.data;
};

export const deletePost = async (id) => {
  return await api.delete(`/rest/v1/posts?id=eq.${id}`);
};