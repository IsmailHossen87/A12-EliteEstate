import { createBrowserRouter } from "react-router-dom";
import AllProperties from "../Components/AllComponents";
import Details from "../Components/Details";
import Home from "../Components/Home";
import Offer from "../Components/Offer";
import Payment from "../Components/Payment/Payment";
import PrivateRoute from "../Context/PrivateRoute/PrivateRoute";
import Profile from "../Context/PrivateRoute/Profile/Profile";
import ManagePropertise from "../DashBoard/AdminDashBoard/ManagePropertise";
import ManageUser from "../DashBoard/AdminDashBoard/ManageUser";
import ReviewAdmin from "../DashBoard/AdminDashBoard/ReviewAdmin";
import AddItem from "../DashBoard/AgentDashBoard/AddItem";
import MyAddedItem from "../DashBoard/AgentDashBoard/MyAddedItem";
import MySold from "../DashBoard/AgentDashBoard/MySold";
import Requested from "../DashBoard/AgentDashBoard/Requested";
import UpdateItem from "../DashBoard/AgentDashBoard/UpdateItem";
import DashBoard from "../DashBoard/DashBoard";
import MyReviews from "../DashBoard/UserDahBoard/MyReviews";
import PropertyBought from "../DashBoard/UserDahBoard/PropertyBaught";
import WishList from "../DashBoard/UserDahBoard/WishList";
import MainLayOut from "../LayOut/MainLayOut";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import AdminRoute from "../Context/PrivateRoute/AdminRoute";
import Error from "../Components/Error";
import AdvertiseSection from "../DashBoard/AdminDashBoard/AdvertiseSection";
import Contact from "../Components/Contact";
import ReaujableProfile from "../Components/ReaujableProfile";
import About from "../Components/About";

const Routes = createBrowserRouter([
  {
    path: "/",
    element: <MainLayOut></MainLayOut>,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/about",
        element: <About></About>,
      },
      {
        path: "/contract",
        element: <Contact></Contact>,
      },
      {
        path: "/PropertyCard",
        element: <AllProperties></AllProperties>,
      },
      {
        path: "/details/:id",
        element: (
          <PrivateRoute>
            <Details></Details>
          </PrivateRoute>
        ),
      },
      {
        path: "/register",
        element: <Register></Register>,
      },
    ],
  },

  {
    path: "dashboard",
    element: (
      <PrivateRoute>
        <DashBoard />
      </PrivateRoute>
    ),
    errorElement: <Error />,
    children: [
      {
          index:'true',
          element:<ReaujableProfile></ReaujableProfile>
      },
      {
        path: "userProfile",
        element: <ReaujableProfile></ReaujableProfile>,
      },

      {
        path: "WishList",
        element: (
          <PrivateRoute>
            <WishList></WishList>
          </PrivateRoute>
        ),
      },
      {
        path: "make-offer/:id",
        element: (
          <PrivateRoute>
            <Offer></Offer>
          </PrivateRoute>
        ),
      },
      {
        path: "propertyBought",
        element: <PropertyBought></PropertyBought>,
      },
      {
        path: "reviews",
        element: <MyReviews></MyReviews>,
      },
      {
        path: "payment/:id",
        element: (
          <PrivateRoute>
            <Payment></Payment>
          </PrivateRoute>
        ),
      },
      // agent
      {
        path: "agentProfile",
        element: <ReaujableProfile></ReaujableProfile>,
      },
      {
        path: "agentAdded",
        element: (
          <PrivateRoute>
            <MyAddedItem></MyAddedItem>
          </PrivateRoute>
        ),
      },
      {
        path: "addProperty",
        element: (
          <PrivateRoute>
            <AddItem></AddItem>
          </PrivateRoute>
        ),
      },
      {
        path: "updateProperty/:id",
        element: (
          <PrivateRoute>
            <UpdateItem></UpdateItem>
          </PrivateRoute>
        ),
      },
      {
        path: "agentSold",
        element: (
          <PrivateRoute>
            <MySold></MySold>
          </PrivateRoute>
        ),
      },
      {
        path: "agentRequested",
        element: (
          <PrivateRoute>
            <Requested></Requested>
          </PrivateRoute>
        ),
      },
      // admin
      {
        path: "manageRole",
        element: (
          <AdminRoute>
            <ManageUser></ManageUser>
          </AdminRoute>
        ),
      },
      {
        path: "adminProfile",
        element: (
          <AdminRoute>
            <ReaujableProfile></ReaujableProfile>
          </AdminRoute>
        ),
      },
      {
        path: "adminManage",
        element: (
          <AdminRoute>
            <ManagePropertise></ManagePropertise>
          </AdminRoute>
        ),
      },
      {
        path: "adminReview",
        element: (
          <AdminRoute>
            <ReviewAdmin></ReviewAdmin>
          </AdminRoute>
        ),
      },
      {
        path: "advertiseProperty",
        element: (
          <AdminRoute>
            <AdvertiseSection></AdvertiseSection>
          </AdminRoute>
        ),
      },
    ],
  },
]);

export default Routes;
