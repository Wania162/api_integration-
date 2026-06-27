import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import DataTable from "react-data-table-component";
import {
  Search,
  Plus,
  Pencil,
  Trash2,
} from "lucide-react";

import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  getPosts,
  deletePost,
} from "@/services/postService";

import {
  setPosts,
  setLoading,
  setError,
} from "@/redux/slices/postSlice";

const Posts = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { posts, loading } = useSelector(
    (state) => state.posts
  );

  const [search, setSearch] = useState("");

  const fetchPosts = async () => {
    try {
      dispatch(setLoading(true));

      const data = await getPosts();

      dispatch(setPosts(data));
    } catch (error) {
      console.log(error);
      dispatch(setError("Failed to fetch posts"));
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const filteredPosts = useMemo(() => {
    return posts.filter((post) =>
      post.name
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  }, [posts, search]);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this post?"
    );

    if (!confirmDelete) return;

    try {
      await deletePost(id);

      alert("Post Deleted Successfully");

      fetchPosts();
    } catch (error) {
      console.log(error);
      alert("Failed to Delete Post");
    }
  };

  const columns = [
    {
      name: "ID",
      selector: (row) => row.id,
      sortable: true,
      width: "80px",
    },
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Description",
      selector: (row) => row.description,
      grow: 2,
    },
    {
      name: "Actions",
      cell: (row) => (
        <div className="flex gap-2">

          <Button
            size="sm"
            className="bg-black hover:bg-gray-800"
            onClick={() =>
              navigate(`/edit-post/${row.id}`)
            }
          >
            <Pencil size={16} className="mr-1" />
            Edit
          </Button>

          <Button
            size="sm"
            variant="destructive"
            onClick={() => handleDelete(row.id)}
          >
            <Trash2 size={16} className="mr-1" />
            Delete
          </Button>

        </div>
      ),
    },
  ];

  return (
    <Layout>

      <div className="bg-white rounded-2xl shadow-xl p-6">

        <div className="flex flex-col lg:flex-row justify-between items-center gap-5 mb-8">

          <div>
            <h1 className="text-4xl font-bold">
              Posts Management
            </h1>

            <p className="text-gray-500 mt-2">
              View, search, edit and delete your posts.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">

            <div className="relative">

              <Search
                size={18}
                className="absolute left-3 top-3 text-gray-400"
              />

              <Input
                placeholder="Search post..."
                className="pl-10 w-72"
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
              />

            </div>

            <Button
              className="bg-black hover:bg-gray-800"
              onClick={() => navigate("/add-post")}
            >
              <Plus
                size={18}
                className="mr-2"
              />
              Add Post
            </Button>

          </div>

        </div>

        <DataTable
          columns={columns}
          data={filteredPosts}
          progressPending={loading}
          pagination
          highlightOnHover
          striped
          responsive
          fixedHeader
          fixedHeaderScrollHeight="500px"
        />

      </div>

    </Layout>
  );
};

export default Posts;