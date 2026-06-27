import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { addPost } from "@/services/postService";

import Layout from "@/components/layout/Layout";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const AddPost = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      await addPost(data);

      alert("Post Added Successfully");

      reset();

      navigate("/posts");
    } catch (error) {
      console.log(error);
      alert("Failed to Add Post");
    }
  };

  return (
    <Layout>
      <div className="max-w-3xl mx-auto py-8 px-4">
        <Card className="shadow-xl rounded-2xl">
          <CardHeader>
            <CardTitle className="text-3xl text-center">
              Add New Post
            </CardTitle>
          </CardHeader>

          <CardContent>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-5"
            >
              <div>
                <Label>Name</Label>

                <Input
                  type="text"
                  placeholder="Enter Name"
                  {...register("name", {
                    required: "Name is required",
                  })}
                />

                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.name.message}
                  </p>
                )}
              </div>

              <div>
                <Label>Description</Label>

                <textarea
                  rows={5}
                  placeholder="Enter Description"
                  className="w-full rounded-md border p-3 focus:outline-none focus:ring-2 focus:ring-black"
                  {...register("description", {
                    required: "Description is required",
                  })}
                />

                {errors.description && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.description.message}
                  </p>
                )}
              </div>

              <div className="flex gap-3">
                <Button
                  type="submit"
                  className="flex-1"
                >
                  Add Post
                </Button>

                <Button
                  type="button"
                  variant="outline"
                  className="flex-1"
                  onClick={() => navigate("/posts")}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default AddPost;