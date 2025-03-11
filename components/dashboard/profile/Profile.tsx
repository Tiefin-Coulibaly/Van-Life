import { FaUserCircle, FaCamera } from "react-icons/fa";

const Profile = () => {
  return (
    <section className="bg-white p-6 rounded-lg shadow-md mb-6">
      <h2 className="text-2xl font-semibold text-gray-900 mb-6">Profile Settings</h2>

      {/* Profile Picture Upload */}
      <div className="flex items-center gap-4">
        <div className="relative w-24 h-24">
          <img
            src="https://via.placeholder.com/100" // Replace with user image later
            alt="Profile"
            className="w-24 h-24 object-cover rounded-full border border-gray-300"
          />
          <label className="absolute bottom-0 right-0 bg-black text-white p-1.5 rounded-full cursor-pointer">
            <FaCamera className="text-white text-sm" />
            <input type="file" className="hidden" />
          </label>
        </div>

        <div>
          <h3 className="text-xl font-semibold text-gray-800">John Doe</h3>
          <p className="text-gray-600">johndoe@example.com</p>
        </div>
      </div>

      {/* Editable Fields */}
      <form className="mt-6 space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Full Name</label>
          <input
            type="text"
            placeholder="John Doe"
            className="mt-1 w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-black"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Email Address</label>
          <input
            type="email"
            placeholder="johndoe@example.com"
            className="mt-1 w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-black"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">New Password</label>
          <input
            type="password"
            placeholder="********"
            className="mt-1 w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-black"
          />
        </div>

        <div className="flex justify-end gap-4 mt-6">
          <button type="button" className="px-4 py-2 border rounded-md text-gray-700 hover:bg-gray-100">
            Cancel
          </button>
          <button type="submit" className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-900">
            Save Changes
          </button>
        </div>
      </form>
    </section>
  );
};

export default Profile;
