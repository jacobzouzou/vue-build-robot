# Vue JS
## Install node.js
 - install nvm (node version manager): download and install
 - install node: nvm install node_version
 - launch : nvm use node_version

vue-cli-service : local dev web server based on webpack-dev-server

## Component

There are 2 types of component (Vue instances): global/local component and single file component (file.vue).  
Global component pitlafes : global variables, string templates, css not encapsulated, no-build time compilation support,...

    <script>
    //global component 
    const World= Vue.component({
        name:"World",
        template:"<span>World !</span>"
    });

    //local component: need to be declared before using
    const Message = ()=>{
        component:{World},
        template:"Hello <World/>"
    });

    new Vue({
        el:"#app",
        template:"<Message/>",
        component:{
          Message
        }
    });
    </script>

### Styling component
 parent => child: 
 - class style use inheritence (but some properties like `border` are not inheritable).
 - parent class is applied to child root element, not to root element child (parent descendants).
 - To apply parent style (class) to child, use deep selector `>>>` or `/deep/` to target any root element children.

Example: 

Apply parent class `content` to children from  `robot-name` class

    <style>
      .content >>> .robot-name {
          color: red;
          border: 2px solid blue;   
        }

      or

      .content /deep/ .robot-name {
          color: red;
          border: 2px solid blue;
        }
    </style>

## Binding
### Bind style
    <template>
      <div>
        <!-- bind to object -->
        <p :style="{border:'2px solid red'}"></p>
        <!-- bind to computed prop -->
        <p :style="saleBorderStyle"></p> 
      </div>
    </template>

      <script>
        export default {
          computed:{
            saleBorderStyle(){
              return {
                border: this.selectedRobot.head.onSale ? "2px solid red": "3px solid #aaa"
              }
            },
          }
        }
      </script>

### Bind class
    <template>
      <div>
        <!-- bind to class name   -->
        <p :class="['sale-border']"></p>
        <!-- bind to object -->
        <p :class="{'sale-border': selectedRobot.head.onSale}"></p> 
        <!-- bind to computed prop -->
        <p :class="[saleBorderClass]"></p> 
      </div>
    </template>
      <script>
        export default {
          data(){
            return {
              selectedRobot:{}
            }
          },
          computed:{
              saleBorderClass(){
                return this.selectedRobot.head.onSale ? "sale-border": "";
              },
            },
          }
        }
      </script>

## SASS 
install sass package : 

    npm i node-sass sass-loader --save-dev

Example of sass syntaxe:

    <style lang="scss">
      .part {
        img {
          width: 165px;
        }
      }
    </style>

## Component lifecycle
beforeCreate => created => beforeMount=> mounted => beforeUpdate => updated => beforeDetroy => destroyed

## Mixins
Create mixin.js file  
import file where to use it  
add it to (target) mixins props  

Example:

    <script>
      import mixin from "mixin.js"
      export default {
          data(){
            return {
              name=""
            }
          },
          mixins:[myMixin],
          props:[],
          ...
      }
    </script>

## Communication between components
 Send data from parent to child with : use props (child html attribute) and slot (injection)  
 Send data from child to parent: use event 

 Exemple:

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
        },
        methods:{
          onClick(){
                this.$emit("event", data);
          }
        }
          ...
      }

    </script>

## Routing
### Install vue router package
    vue add router
 #### From npm
    npm install vue-router --save

create `router` folder and add `index.js`

    <script>
      import Vue from "vue";
      import Router from "vue-router";
      Vue.use(Router);
      const routes:[];
      export default new Router({        
        routes
      });
    </script>

config `main.js`

    <script>
      import Vue from "vue";
      import App from "./App.vue";
      import router from "./router/index";  //import router from "./router";

      Vue.config.productionTip = false;

      new Vue({
        router,
        render: (h) => h(App),
      }).$mount('#app');
    </script>

## Router
### Router link
    <template>
      <div>
        <!-- use route path ("/") //or -->
        <router-link to="/">
        <!--  bind to route object -->
        <router-link :to="{name:'Home'}">
        <!--  bind to route object with params-->
          <router-link :to="{
            name:'Parts',
            params:{
              id:this.selectedPart.id,
              partType:this.selectedPart.type
            }
          }">
        <!--  link output -->
        <router-view></route-view>
      </div>
    </template>

Navigate from javascript code

    <script>
    export default {
        showPartInfo(){
          this.$router.push("/parts");
        },
        // // path with params
        // showPartInfo(){
        //   this.$router.push({
        //     name:"Parts",
        //     params:{
        //       id:this.selectedPart.id,
        //       partType:this.selectedPart.type
        //     }
        //   });
        // },
    }
    </script>

You can use "props" to pass params to router  

Set "route" props to true
     
    <script>
      const routes = [
            {
                path: "/parts/:partType/:id",
                name: "Parts",
                component: PartInfo,
                props:true 
            },
        ];

        export default {

        }
      </script>

in target component code

    <script>  
      export default {
        props:['partType', 'id'],
        computed:{
          part() {
            // deconstruct object
            const {partType, id}=this;      
            return parts[partType].find(part =>part.id=== +id);
          },
        }
      }
      // you can validate props: see earlier;
    </script>  

### Use named view
    <script>
      // router file: index.js
      export default{
        const routes = [
          {
            path: "/",
            name: "Home",
            components:{
                default: HomePage,
                // use named view
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

### Use `history` mode to remove # in url
    <script>
        export default new Router({
            mode:"history",
            routes
        });
    </script>

## Vuex (View X):
- One state for several objects,
- Mutations are synchronous,
- Actions  are async,
- Getters are use to read state.

### Install

    npm install vuex@[version] --save
Create store folder in scr folder  
Add index.js in store 

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

### Config `main.js`
    <script>
      // import store
      import store from "./store";

      Vue.config.productionTip = false;

      new Vue({
        store,
        router,
        render: (h) => h(App),
      }).$mount('#app');

    </script>

### Read state from store
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
### Use action to with API
  config proxy: add `vue.congi.js` file to project root

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

### Use action from store
Install axios for api

    npm install axios
Example:

    <script>
      // import axios
      import axios from "axios"

      export default {
        actions:{
            getParts({commit}){
              //use relative url with vue proxy config earlier
              //use htpp://localhost/api/parts if not use proxy
              axios.get("/api/parts")
              .then(result=>commit("updateParts",result.data))
              .catch(console.error);
            },
            addRobotToCart({commit, state}, robot){
                  const cart=[...state.cart, robot];
                  return axios.post("/api/cart", cart)
                  //Commit use mutations; mutaion use 'state' and object to save
                  .then(()=>commit("addRobotToCart",robot));
              }
          },
          methods: {
            addToCart() {
              const robot = this.selectedRobot;
              const total =
                robot.head.cost +
                robot.leftArm.cost +
                robot.torso.cost +
                robot.rightArm.cost +
                robot.base.cost;

              //To commit need "mutation":  here "addRobotToCart"
              this.$store.commit("addRobotToCart",Object.assign({}, robot, { total }));
              this.addedToCart=true;

              // // dispatch use an action
              // // action use a context (commit), state and object needet to make job
              // this.$store.dispatch("addRobotToCart", Object.assign({}, robot, { total }))
              // .then(()=>this.$router.push("/cart"));
              // this.addedToCart=true;
            },

          },
    </script>


### Organize store with modules

Create file for each module, in `modules` folder: example `robots.js`

    <script>
      export default {
        state:{},
        mutations:{},
        action:{},
        getters:{}
      }
    </script>

Import module file in main store file: `./store/index.js`

    <script>  

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

### Map getters and state
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

### Map actions
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

## Directives and filters
 Create js file

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

Directive can receive arg (position) and modifiers (top.right)

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

Use directive

    <template>
        <div>
          <span class="sale" v-pin:position.top.right v-show="selectedPart.onSale">Sale!</span>
        </div>
    </template>

Directive can bind to an object 

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
### Declare global directive (in main.js)

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

## Create filters
  Create filter js file 

      <script>
        export default function (amount,symbol){
            return `${symbol} ${amount.toFixed(2)}`;
        }
        //declare global filter in main.js like directive
      </script>

## Deploy app
Zero config integrate many packages.  
npm run buid: create deployable dist folder, copy dist folder to web server  
deployment guide: https://cli.vuejs.org/guide/deployment.html

build for different mode: development, staging, production

    npm run build -- --mode:staging

Create environment variable files:  env.staging.js file to project root.  
env var must prefix by : VUE_APP_, except NODE_ENV=XXXXXXX
  
  ### Build a production deployemnent

  config server

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

## Deep linking

    npm install --save connect-history-api-fallback

In server `index.js` file

      <script>
        const history=require("connect-history-api-fallback");
        const app = express();
        app.use(history({index:"/index.html"}));
        ...
      </script>

## Webpack config
generate webpack

    vue inspect --mode=production > webpack.config.js

Constumize webpack from `vue.config.js` file

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
Use object and function syntaxes

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

 Manage active nav-link color

    add "exact" in router-link elt