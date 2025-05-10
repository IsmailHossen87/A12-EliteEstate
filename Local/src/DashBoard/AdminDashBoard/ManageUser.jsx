import { useQuery } from "@tanstack/react-query";
import React from "react";
import { MdAdminPanelSettings, MdDelete } from "react-icons/md";
import { FaMagento } from "react-icons/fa";
import Swal from "sweetalert2";
import UseAxiosSecure from "../../Hooks/useAxiosSecure";
import useAuth from "../../Hooks/useAuth";

const ManageUser = () => {
  const axiosSecure = UseAxiosSecure();
  const {user} = useAuth()


  const { data: users = [], refetch } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const { data } = await axiosSecure.get("/users");
      return data;
    },
  });

  // delete
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/usersDelete/${id}`)
          .then((res) => {
            if (res.data && res.data.deletedCount > 0) {
              Swal.fire({
                title: "Deleted!",
                text: "User has been deleted successfully.",
                icon: "success",
              });
              refetch();
            } else {
              Swal.fire({
                title: "Error!",
                text: "Failed to delete user.",
                icon: "error",
              });
            }
          })
          .catch((error) => {
            console.error("Delete error:", error);
            Swal.fire({
              title: "Error!",
              text: "Something went wrong. Please try again.",
              icon: "error",
            });
          });
      }
    });
  };
  

  // admin and agent
  const handleRoleChange = (id, role) => {
    axiosSecure.patch("/user/role", { id, role }).then((res) => {
      if (res.data.success) {
        Swal.fire("Success", `User has been updated to ${role}`, "success");
        // window.location.reload();
      }
      refetch();
    });
  };

  return (
    <>
      <div className="md:mx-5 overflow-x-auto rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-blue-100">
            <tr>
              <th className="py-3.5 px-4 text-sm font-normal text-left ">
                No
              </th>
              <th className="px-4 py-3.5 text-sm font-normal text-left ">
                Name
              </th>
              <th className="px-4 py-3.5 text-sm font-normal text-left ">
                Role
              </th>
              <th className="px-4 py-3.5 text-sm font-normal text-left ">
                Email
              </th>
              <th className="px-4 py-3.5 text-sm font-normal text-left ">
                Admin
              </th>
              <th className="px-4 py-3.5 text-sm font-normal text-left ">
                Agent
              </th>
              <th className="px-4 py-3.5 text-sm font-normal text-left ">
                Fraud
              </th>
              <th className="px-4 py-3.5 text-sm font-normal text-left ">
                Delete
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {users?.map((item, index) => (
              <tr key={item._id}>
                <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap">
                  {index + 1}
                </td>
                <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap">
                  {item.name}
                </td>
                <td
                  className={`px-4 py-4 text-sm whitespace-nowrap ${
                    item.role === "admin"
                      ? "text-red-500 font-bold"
                      : item.role === "agent"
                      ? "text-blue-500 font-semibold"
                      : item.role === "user"
                      ? "text-green-500"
                      : "text-gray-500"
                  }`}
                >
                  {item.role}
                </td>
                <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap">
                  {item.email}
                </td>
                {/* admin */}
                <td className="px-4 py-4 text-sm whitespace-nowrap">
                  {item.status === "fraud" ? (
                    <button
                      disabled
                      className="text-white rounded-[7px] bg-red-500 p-2 text-2xl focus:outline-none"
                    >
                      <MdAdminPanelSettings />
                    </button>
                  ) : item.role === "user" || item.role === "agent" ? (
                    <button
                      onClick={() => handleRoleChange(item._id, "admin")}
                      className="text-white rounded-[7px] bg-green-400 p-2 hover:text-black text-2xl focus:outline-none"
                    >
                      <MdAdminPanelSettings />
                    </button>
                  ) : (
                    <button
                      disabled
                      className="text-white rounded-[7px] bg-red-500 p-2 text-2xl focus:outline-none"
                    >
                      <MdAdminPanelSettings />
                    </button>
                  )}
                </td>
                {/* agent */}
                <td className="px-4 py-4 text-sm whitespace-nowrap">
                  {item.role == "agent" ? (
                    <button className="text-white rounded-[7px] bg-red-500 p-2  hover:text-black text-2xl focus:outline-none">
                      {" "}
                      <FaMagento></FaMagento>{" "}
                    </button>
                  ) : (
                    <button
                      onClick={() => handleRoleChange(item._id, "agent")}
                      className="text-white rounded-[7px] bg-green-400 p-2  hover:text-black text-2xl focus:outline-none"
                    >
                      {" "}
                      <FaMagento></FaMagento>{" "}
                    </button>
                  )}
                </td>
                  {/* fraud */}
                <td className="px-4 py-4 text-sm whitespace-nowrap">
                  {item.role == "agent" ? (
                    item.status == "fraud" ? (
                      <p>Fraud</p>
                    ) : (
                      <button
                        onClick={() => handleRoleChange(item._id, "fraud")}
                        className="bg-green-400 p-2 rounded-md text-2xl focus:outline-none"
                      >
                        {" "}
                        <FaMagento></FaMagento>{" "}
                      </button>
                    )
                  ) : (
                    <button
                      disabled
                      className="bg-red-500 p-2 rounded-md  text-2xl focus:outline-none"
                    >
                      {" "}
                      <FaMagento></FaMagento>{" "}
                    </button>
                  )}
                </td>
                {/* delete 🆗*/}
                <td className="px-4 py-4 text-sm whitespace-nowrap">
                  <button
                    onClick={() => handleDelete(item._id)}
                    className="text-white rounded-[7px] bg-green-400 p-2  hover:text-black text-2xl focus:outline-none"
                  >
                    {" "}
                    <MdDelete></MdDelete>{" "}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ManageUser;
