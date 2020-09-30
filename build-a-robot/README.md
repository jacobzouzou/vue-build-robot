************************************************************************
* General
************************************************************************
# build-a-robot

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/)

************************************************************************
Install node.js
***********************************************************************
 -install nvm (node version manager)
 -install node: nvm install node_version
 -launch : nvm use node_version

************************************************************************
vue-cli-service: local dev web server, based on webpack-dev-server

************************************************************************
Component
************************************************************************

There are 2 types of component (Vue instances): global/local component, and single file component (file.vue)
global component pitlafes : global variables, string templates, css not encapsulated, no-build time compilation support,...

//global component 
 const World= Vue.component({
     "World",
     template:"<span>World !</span>"
 });

//local component: need to be declare before use it
 const Message= ()=>{
     "World",
     template:"Hello <World/>"
 });

 new Vue({
     el:"#app",
     template:"<Message/>",
     component:{
       Message
     }
 });

************************************************************************
Styling component
************************************************************************
 parent => child: 
  class style use inheritence (but some properties like "border" are not inheritable)
  parent class is applied to child root element, not to root element child (parent descendants)
  to apply parent style (class) to child, use deep selector ">>> or /deep/" to target any root element children

  example: 
   //apply parent class "content" to children with class "robot-name"
   .content >>> .robot-name {
        color: red;
        border: 2px solid blue;
    }

    or 
   .content /deep/ .robot-name {
        color: red;
        border: 2px solid blue;
    }

************************************************************************
Bind style:
************************************************************************
<template>

  <div>
    <p :style="{border:'2px solid red'}"></p>
    <p :style="saleBorderStyle"></p> 
  </div>
</template>
  <script>
    export default {
      name="MyComp",
      computed:{
        saleBorderStyle(){
          return {
            border: this.selectedRobot.head.onSale ? "2px solid red": "3px solid #aaa"
          }
        },
      }
    }
  </script>

************************************************************************
Bind class:
************************************************************************
<template>
  <div>
    <p :class="['sale-border']"></p>
    <p :class="{'sale-border': selectedRobot.head.onSale}"></p> 
    <p :class="[saleBorderClass]"></p> 
  </div>
</template>
  <script>
    export default {
      name="MyComp",
      computed:{
          saleBorderClass(){
          return this.selectedRobot.head.onSale ? "sale-border": "";
          },
        },
      }
    }
  </script>

************************************************************************
Use sass:
************************************************************************
install sass package : 
 npm i node-sass sass-loader --save-dev

example of sass syntaxe:
<style lang="scss">
.part {
  img {
    width: 165px;
  }
}

</style>

************************************************************************
Component lifecycle:
************************************************************************
beforeCreate => created => beforeMount=> mounted => beforeUpdate => updated => beforeDetroy => destroyed

************************************************************************
Mixins:
************************************************************************
1 Create mixin.js file
2 import file where to use it
3 add it to (target) mixins props: 

<script>
  import mixin from "mixin.js"
  export default {
      data(){

      },
      mixins:[myMixin],
      props:[],
      ...
  }

</script>

************************************************************************
Communication between components
************************************************************************
 Send data from parent to child with : use props (child html attribute) and slot (injection)
 Send data from child to parent: use event 

<script>
  export default {
    // props: ["parts","position"],
    props: {
      parts:{
        type:Array,
        requiered:true
      },
      position:{
        type: String,
        required:true,
        validator: function (value){
          return ['left','right', 'center', 'bottom', 'base'].includes(value);
        } 
      }
    }
      data(){

      },
      methods:{
        onClick(){
              this.$emit("event", data);
        }
      }
      ...
  }

</script>

************************************************************************
Routing
************************************************************************
install vue router package:
 from vue cli: "vue add router" 
 or
 from npm: 
    "npm install vue-router --save"
    1 create "router" folder and add index.js:
    
      import Vue from "vue";
      import Router from "vue-router";

      Vue.use(Router);
      const routes:[];
      export default new Router({        
        routes
      });

    2 conig main.js
      import Vue from "vue";
      import App from "./App.vue";
      import router from "./router/index"; 
      //import router from "./router";

      Vue.config.productionTip = false;

      new Vue({
        router,
        render: (h) => h(App),
      }).$mount('#app');


************************************************************************
router output: <router-view></route-view>
************************************************************************

************************************************************************
router link:
************************************************************************
<router-link to="/">: use route path ("/") //or
<router-link :to="{name:'Home'}">: bind to route object

path with parms from routerLink

    <router-link :to="{
        name:'Parts',
        params:{
          id:this.selectedPart.id,
          partType:this.selectedPart.type
        }
      }">

Navigate from javascript code: 
 Examples:
    showPartInfo(){
      this.$router.push("/parts");
    },

    // path with params
    showPartInfo(){
      this.$router.push({
        name:"Parts",
        params:{
          id:this.selectedPart.id,
          partType:this.selectedPart.type
        }
      });
    },

    You can use "props" to pass params to router:
     - set route props to true: 
     Example:
     const routes = [
          ...,
          {
              path: "/parts/:partType/:id",
              name: "Parts",
              component: PartInfo,
              props:true 
          },
          ...
          ];
    
    in target component code: 
    Example:
    export default {
      props:['partType', 'id'],
      computed:{
        part() {
          const {partType, id}=this;      
          return parts[partType].find(part =>part.id=== +id);
        },
      }
    }

    you can validate props: see earlier;

************************************************************************
Use named view
************************************************************************
<script>
  export default{
    const routes = [
      {
        path: "/",
        name: "Home",
        components:{
            default: HomePage,
            sidebar: StandSideBar
        } 
      },
    // Navigation guard: from and to 
    //  can be done on route or component
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
  }
</script>

  ... App.vue

<template>
    <div class="container">
      <aside class="aside">
      <!--name view-->
        <router-view name="sidebar"></router-view>
      </aside>
      <main>
        <!--default view-->
        <router-view></router-view>
      </main>
    </div>
</template>

************************************************************************
Use "history" mode to remove # in url
************************************************************************
<script>
    export default new Router({
        mode:"history",
        routes
    });
</script>

************************************************************************
VUEX (View X):
************************************************************************
One state for several objects
Mutation is synchronous
Actions  are async
Getters are use to read state

npm install vuex@[version] --save
1 create store folder in scr
2 add index.js

<script>
  import Vue from "vue";
  import Vuex from "vuex";

  Vue.use(Vuex);

  export default new Vuex.Store({
    state:{
      cart:[],
    },
    mutations:{
      addRobotToCart(state, robot){
        state.cart.push(robot);
      },
      updateParts(state , parts){
        state.parts=parts;
      }
    },
    getters:{
      cartSaleItems(state){
          return state.cart.filter(item=>item.head.onSale);
      }
    }      
  });
</script>

 ************************************************************************
3 config main.js
************************************************************************
<script>
  import store from "./store";

  Vue.config.productionTip = false;

  new Vue({
    store,
    router,
    render: (h) => h(App),
  }).$mount('#app');

</script>

 ************************************************************************
Read store from state:
 ************************************************************************
<script>
  export default {
    name:"",
    computed:{
    cart(){
      return this.$store.state.robots.cart;
    },
    saleCart(){
      return this.$store.getters.cartSaleItems;
    }
  }
</script>
 ...
************************************************************************
Use action to with API
 ************************************************************************
  install axios
  config proxy: add "vue.congi.js" file to project root
  <script>
   module.exports={
      devServer:{
            proxy:{
                "/api":{
                    target:"http://localhost:8081",
                    changeOrigin:true
                }
            }
        }
    }
    </script>

************************************************************************
Use action from store
************************************************************************
<script>
  export default {
    actions:{
        getParts({commit}){
           //use relative url not : htpp://localhost/api/parts with vue proxy
           axios.get("/api/parts")
           .then(result=>commit("updateParts",result.data))
           .catch(console.error);
        },
        addRobotToCart({commit, state}, robot){
              const cart=[...state.cart, robot];
              return axios.post("/api/cart", cart)
              .then(()=>commit("addRobotToCart",robot));
          }
      },
      //Commit => mutations (use 'state' and object to save)
        methods: {
          addToCart() {
            const robot = this.selectedRobot;
            const total =
              robot.head.cost +
              robot.leftArm.cost +
              robot.torso.cost +
              robot.rightArm.cost +
              robot.base.cost;

            //"addRobotToCart" is an mutation in store file index.js
            this.$store.commit("addRobotToCart",Object.assign({}, robot, { total }));
            this.addedToCart=true;

            // // dispatch => actions (use a context (commit), state and object to use: make job)
            // this.$store.dispatch("addRobotToCart", Object.assign({}, robot, { total }))
            // .then(()=>this.$router.push("/cart"));
            // this.addedToCart=true;
          },

        },
</script>


************************************************************************
Organize store with modules
************************************************************************

create a store file for each module, example robots.js
<script>
  export default {

  }
</script>
import module in main store file, store/index.js

<script>  ...
  import robotsModules from "./modules/robots";
  import usersModules from "./modules/users";
  Vue.use(Vuex);
  export default new Vuex.Store({
      modules:{
          robots:robotsModules,
          users:usersModules
      }

  });

 </script> 

<script>
export default {
    name: 'Cart',
    created(){
    //use namespaced actions
    this.$store.dispatch("robots/getParts");
    }, 
    computed: {
      cart(){
          return this.$store.state.robots.cart;
      },
      saledCart(){
          //access to namespaced getters
          return this.$store.getters["robots/cartSaleItems"];
      }
  },
}
</script>
// Use namespaced getters
// "state" and "getters" pass to mutations 
// getters modules are local to module
<script>
  export default {
      mutations: {
      updateCurrentUser(state, user) {
        state.user = user;
      },
    },
    getters: {
      foo(state, getters, rootState){
        //use rootState to access to rootState, not avalaible in mutations and actions
        return `Users-getter/ ${state.foo}`;
      }
    },
    ...
  }
  </script>

************************************************************************
Map getters and state
************************************************************************
<script>
export default {
  name: "App",
  computed: {
    // rootFoo(){
    //   return this.$store.state.foo;
    // },
    // usersFoo(){
    //   return this.$store.state.users.foo;
    // },

    ...mapState({
      rootFoo:"foo",
      usersFoo:state =>state.users.foo,
    }),

    // robotsFoo(){
    //   return this.$store.state.robots.foo;
    // },
    ...mapState("robots",{robotsFoo:"foo"}),//or
    ...mapState({robotsFoo:state =>state.robots.foo}),

    // rootGetterFoo(){
    //   return this.$store.getters.foo;
    // },
    // usersGetterFoo(){
    //   return this.$store.getters["users/foo"];
    // },
    ...mapGetters({
      rootGetterFoo:"foo",
      usersGetterFoo: ()=> this$store.getters["users/foo"],
    }),
    
    // robotsGetterFoo(){
    //   return this.$store.getters['robots/foo'];
    // },
    ...mapGetters("robots",{robotsGetterFoo:"foo"}), or
    ...mapGetters({robotsGetterFoo:state =>state.getters["robots/foo"] }),
  },
};
</script>
************************************************************************
MAP ACTIONS
************************************************************************
<script>
import {mapActions} from "vuex";

export default {

  methods:{
    ...mapActions("robots",["getParts","addRobotToCart"]),
  },
  addToCart(){
      const robot = this.selectedRobot;
      const total =
        robot.head.cost +
        robot.leftArm.cost +
        robot.torso.cost +
        robot.rightArm.cost +
        robot.base.cost;

      //use store 
      //dispatch return a Promise
      
      // this.$store.dispatch("robots/addRobotToCart",Object.assign({}, robot, { total }))
      // .then(()=>this.$router.push("/cart"));

      //use mapping
      this.addRobotToCar(Object.assign({}, robot, { total }))
      .then(()=>this.$router.push("/cart"));
  }
}
// Idem for map mutations
</script>

************************************************************************
Directives and filters
************************************************************************
 create js file
  <script>
  export  default {
    bind:(element)=>{
          element.style.position='absolute';
          element.style.bottom="5px";
          element.style.right="5px";
      }
    }
  </script>
 
  import file  in target component

  <script>
  import pinDirective from "../shared/pin-direcitve";

  export default {
      ...
      //directive: v-pin
      directives:{
        pin:pinDirective
      },
      ...
    }
  </script>

  directive can receive arg (position) and modifiers (top.right)
  <script>
      export  default {
          //direct hook
          bind:(element,binding)=>{
              if(binding.arg!=="position") return;
              Object.keys(binding.modifiers).forEach((key)=>{
                  element.style[key]="5px";
              });
              element.style.position='absolute';
          }
      }
  </script>    
use directive
<template>
    <div>
      <span class="sale" v-pin:position.top.right v-show="selectedPart.onSale">Sale!</span>
    </div>
</template>

directive can bind to an object 
<template>
    <div>
        <span class="sale" v-pin="{bottom:'5px', left:'5px'}" v-show="selectedPart.onSale">Sale!</span>
    </div>
</tempate>
<script>
        //use others hooks than "bind"
        const applyStyle=function(element, binding){
            Object.keys(binding.value).forEach((position)=>{
                element.style[position]=binding.value[position];
            });
            element.style.position='absolute';
        };
      export default {
            bind:(element,binding)=>{
              Object.keys(binding.value).forEach((position)=>{
                element.style[position]="5px";
            });
            element.style.position='absolute';
          },
          // bind:(element,binding)=>{
          //     applyStyle(element,binding);
          // },
          // update:(element, binding)=>{
          //     applyStyle(element,binding);
          // }
      }
 </script>     
************************************************************************
Declare global directive (in main.js)
************************************************************************
 <script> 
   import pinDirective from './shared/pin-directive';
   Vue.config.productionTip = false;
   Vue.directive("pin",pinDirective);
   new Vue({
      store,
      router,
      render: (h) => h(App),
    }).$mount('#app');
  </script>
************************************************************************
Create filters
************************************************************************
  1 create filter js file 
  <script>
    export default function (amount,symbol){
        return `${symbol} ${amount.toFixed(2)}`;
    }
    //declare global filter in main.js like directive
  </script>

************************************************************************
Deploy app
************************************************************************
    zero config integrate many packages
    npm run buid: create deployable dist folder, copy dist folder to web server
    deployment guide: https://cli.vuejs.org/guide/deployment.html

    build for different mode: development, staging, production
     npm run build -- --mode:staging

     1 create environment variable files:  env.staging.js file to project root
     2 env var must prefix by : VUE_APP_, except NODE_ENV=XXXXXXX
     
     build a production deployemnent
     config server:

  <script>
      const path = require('path')
      const express = require("express");

      const app = express();

      app.get('/api/parts', (req, res) =>
        res.send({
          heads: [
            {
              id: 1,
              description:
                "A robot head with an unusually large eye and teloscpic neck -- excellent for exploring high spaces.",
              title: "Large Cyclops",
              src: "/api/images/head-big-eye.png",
              type: "heads",
              cost: 1225.5
            },
            {
              id: 2,
          ]
        })
      );

      app.post('/api/cart', (req, res) => 
        setTimeout(() => res.status(201).send(), 800)
      );

      app.post('/api/sign-in', (req, res) => res.status(200).send());

      app.use('/api/images', express.static('images'));
      app.use("/",express.static("dist",{index:'index.html'}));

      app.listen(8081, () => console.log('Server listening on port 8081!'));
  </script>

************************************************************************
Deep linking
************************************************************************
npm install --save connect-history-api-fallback

//in server index.js file
  <script>
    const history=require("connect-history-api-fallback");
    const app = express();
    app.use(history({index:"/index.html"}));
    ...
  </script>

************************************************************************
WEBPACK CONFIG
************************************************************************
generate webpack:
  > vue inspect --mode=production > webpack.config.js

    Constumize webpack from vue.config.js file:
   <script> 
    module.exports={
      configureWebpack:{
          module:{
              rules:[
                  {
                      test:/\.coffee$/,
                      use:['coffee-loader']
                  },
                  {
                      test:/\.(png|jpe?g|gif)(\?.*)?$/,
                      use:[{
                          loader:"url-loader",
                          options:{
                              limit:5000,
                              name:"img/[name].[hash:8].[ext]"
                          }
                      }]
                  }
              ]
          }
      },
      devServer:{
          proxy:{
              "/api":{
                  target:"http://localhost:8081",
                  changeOrigin:true
              }
          }
      }
  }
  </script>
use object and function syntaxes:
<script>
        module.exports = {
            configureWebpack: (config) => {
                config.module.rules.push({
                    test: /\.coffee$/,
                    use: ['coffee-loader']
                });

                const newRule = {
                    test: /\.(png|jpe?g|gif)(\?.*)?$/,
                    use: [
                        {
                            loader: "url-loader",
                            options: {
                                limit: 15000,
                                name: "img/[name].[hash:8].[ext]"
                            }
                        }]
                }
                const imageRulesIndex= config.module.rules
                .findIndex(x=>x.test.source.includes("png|jpe?g|gif"));
                config.module.rules.splice(imageRulesIndex,1,newRule);
            },
            devServer: {
                proxy: {
                    "/api": {
                        target: "http://localhost:8081",
                        changeOrigin: true
                    }
                }
            }
        }
 </script>     

 Manage active nav-link color: add "exact" in router-link elt