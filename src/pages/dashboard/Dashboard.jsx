import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import {
  FileText,
  PlusCircle,
  User,
  ArrowRight,
} from "lucide-react";

import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";

const Dashboard = () => {
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);
  const { posts } = useSelector((state) => state.posts);

  return (
    <Layout>
      {/* Welcome Section */}

      <div className="bg-black text-white rounded-2xl p-8 shadow-xl mb-8">
        <h1 className="text-4xl font-bold">
          Welcome Back 👋
        </h1>

        <p className="text-gray-300 mt-2">
          {user?.email}
        </p>

        <p className="text-gray-400 mt-3">
          Manage your posts and documents from one place.
        </p>
      </div>

      {/* Cards */}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {/* Posts */}

        <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-2xl transition">

          <FileText
            size={40}
            className="text-black mb-4"
          />

          <h2 className="text-2xl font-bold">
            Total Posts
          </h2>

          <p className="text-5xl font-bold mt-3">
            {posts.length}
          </p>

          <Button
            className="mt-6 w-full bg-black hover:bg-gray-800"
            onClick={() => navigate("/posts")}
          >
            View Posts
          </Button>

        </div>

        {/* Add Post */}

        <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-2xl transition">

          <PlusCircle
            size={40}
            className="text-black mb-4"
          />

          <h2 className="text-2xl font-bold">
            Add New Post
          </h2>

          <p className="text-gray-500 mt-3">
            Create a new post instantly.
          </p>

          <Button
            className="mt-6 w-full bg-black hover:bg-gray-800"
            onClick={() => navigate("/add-post")}
          >
            Add Post
          </Button>

        </div>

        {/* Profile */}

        <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-2xl transition">

          <User
            size={40}
            className="text-black mb-4"
          />

          <h2 className="text-2xl font-bold">
            My Profile
          </h2>

          <p className="text-gray-500 mt-3">
            Manage your account information.
          </p>

          <Button
            className="mt-6 w-full bg-black hover:bg-gray-800"
            onClick={() => navigate("/profile")}
          >
            Open Profile
          </Button>

        </div>

      </div>

      {/* Recent Activity */}

      <div className="bg-white rounded-2xl shadow-lg p-6 mt-8">

        <div className="flex justify-between items-center">

          <h2 className="text-2xl font-bold">
            Recent Activity
          </h2>

          <Button
            variant="ghost"
            onClick={() => navigate("/posts")}
          >
            View All
            <ArrowRight className="ml-2" size={18} />
          </Button>

        </div>

        <div className="mt-6">

          {posts.length === 0 ? (
            <p className="text-gray-500">
              No posts available.
            </p>
          ) : (
            posts.slice(0, 5).map((post) => (
              <div
                key={post.id}
                className="border-b py-4 flex justify-between"
              >
                <div>
                  <h3 className="font-semibold">
                    {post.name}
                  </h3>

                  <p className="text-gray-500 text-sm">
                    {post.description}
                  </p>
                </div>

                <Button
                  size="sm"
                  onClick={() => navigate(`/edit-post/${post.id}`)}
                >
                  Edit
                </Button>
              </div>
            ))
          )}

        </div>

      </div>
    </Layout>
  );
};

export default Dashboard;