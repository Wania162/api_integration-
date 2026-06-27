import { useSelector } from "react-redux";
import { User, Mail, ShieldCheck, KeyRound } from "lucide-react";

import Layout from "@/components/layout/Layout";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const Profile = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <Layout>
      <div className="max-w-5xl mx-auto py-8 px-4">

        <h1 className="text-4xl font-bold mb-8">
          My Profile
        </h1>

        <Card className="rounded-2xl shadow-xl">
          <CardHeader className="items-center border-b pb-6">

            <div className="w-24 h-24 rounded-full bg-black text-white flex items-center justify-center text-4xl font-bold">
              {user?.email?.charAt(0).toUpperCase() || "U"}
            </div>

            <CardTitle className="text-3xl mt-4">
              {user?.email?.split("@")[0] || "User"}
            </CardTitle>

            <p className="text-gray-500">
              Document Management System User
            </p>

          </CardHeader>

          <CardContent className="grid md:grid-cols-2 gap-6 pt-8">

            <div className="border rounded-xl p-5">
              <div className="flex items-center gap-3 mb-2">
                <Mail className="w-5 h-5" />
                <h3 className="font-semibold">
                  Email
                </h3>
              </div>

              <p className="text-gray-600 break-all">
                {user?.email}
              </p>
            </div>

            <div className="border rounded-xl p-5">
              <div className="flex items-center gap-3 mb-2">
                <ShieldCheck className="w-5 h-5" />
                <h3 className="font-semibold">
                  Email Verified
                </h3>
              </div>

              <p className="text-green-600 font-medium">
                Yes
              </p>
            </div>

            <div className="border rounded-xl p-5">
              <div className="flex items-center gap-3 mb-2">
                <User className="w-5 h-5" />
                <h3 className="font-semibold">
                  User ID
                </h3>
              </div>

              <p className="text-gray-600 break-all">
                {user?.id}
              </p>
            </div>

            <div className="border rounded-xl p-5">
              <div className="flex items-center gap-3 mb-2">
                <KeyRound className="w-5 h-5" />
                <h3 className="font-semibold">
                  Role
                </h3>
              </div>

              <p className="text-gray-600">
                {user?.role || "Authenticated"}
              </p>
            </div>

          </CardContent>
        </Card>

      </div>
    </Layout>
  );
};

export default Profile;