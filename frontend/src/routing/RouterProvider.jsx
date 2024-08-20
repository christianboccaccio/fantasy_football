import {
  createBrowserRouter,
  RouterProvider as Router,
} from "react-router-dom";
import { UPLOAD_PAGE_PATH,DRAFT_BOARD_PATH } from "../constants/paths.js";
import HomePage from "../pages/HomePage.jsx";
import UploadPage from "../pages/UploadPage.jsx";
import DraftBoard from "../components/DraftBoard/DraftBoard.jsx";

const routes = [
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: DRAFT_BOARD_PATH,
    element: <DraftBoard />,
  },
  {
    path: UPLOAD_PAGE_PATH,
    element: <UploadPage />,
  },
];

const RouterProvider = () => {
  const router = createBrowserRouter(routes);
  return <Router router={router} />;
};

export default RouterProvider;
