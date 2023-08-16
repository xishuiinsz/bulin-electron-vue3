import { createRouter, createWebHashHistory } from "vue-router";
import Home from "@/views/Home.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/excelBatchFill",
    name: "ExcelBatchFill",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(
        /* webpackChunkName: "excelBatchFill" */ "@/views/excelBatchFill.vue"
      ),
  },
  {
    path: "/exportPicturesInJson",
    name: "ExportPicturesInJson",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(
        /* webpackChunkName: "exportPicturesInJson" */ "@/views/exportPicturesInJson/exportPicturesInJson.vue"
      ),
  },
  {
    path: "/generatePicture",
    name: "GeneratePicture",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(
        /* webpackChunkName: "generatePicture" */ "@/views/generatePicture/generatePicture.vue"
      ),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
