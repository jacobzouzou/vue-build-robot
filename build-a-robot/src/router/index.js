import Vue from "vue";
import Router from "vue-router";
import HomePage from "../home/HomePage.vue";
import RobotBuilder from "../build/robotBuilder.vue";
import PartInfo from "../parts/PartInfo.vue";
import BrowsePart from "../parts/BrowsePart.vue";
import RobotHeads from "../parts/RobotHeads.vue";
import RobotArms from "../parts/RobotArms.vue";
import RobotTorsos from "../parts/RobotTorsos.vue";
import RobotBases from "../parts/RobotBases.vue";
import StandSideBar from "../sidebars/SideBarStandard.vue";
import BuildSideBar from "../sidebars/SideBarBuild.vue";
import ShoppingCart from "../cart/ShoppingCart.vue";

Vue.use(Router);

const childrenRoutes = [
  {
    name: "BrowseHeads",
    path: "heads",
    component: RobotHeads
  },
  {
    name: "BrowseArms",
    path: "arms",
    component: RobotArms
  },
  {
    name: "BrowseTorsos",
    path: "torsos",
    component: RobotTorsos
  },
  {
    name: "BrowseBases",
    path: "bases",
    component: RobotBases
  }
];

const routes = [
  {
    path: "/",
    name: "Home",
    components: {
      default: HomePage,
      sidebar: StandSideBar
    }
  },
  {
    path: "/build",
    name: "Build",
    components: {
      default: RobotBuilder,
      sidebar: BuildSideBar
    }
  },
  {
    path: "/parts/browse",
    name: "BrowsePart",
    component: BrowsePart,
    children: childrenRoutes
  },
  {
    path: "/parts/:partType/:id",
    name: "Parts",
    component: PartInfo,
    props: true,
    beforeEnter: (to, from, next) => {
      const isValidId = Number.isInteger(Number(to.params.id));
      next(isValidId);
    }
  },
  {
    path: "/cart",
    name: "Cart",
    component: ShoppingCart
  }
];

export default new Router({
  mode: "history",
  routes
});
