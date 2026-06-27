import Navbar from "./Navbar";

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <Navbar />

      <main className="max-w-7xl mx-auto mt-6">
        {children}
      </main>
    </div>
  );
};

export default Layout;