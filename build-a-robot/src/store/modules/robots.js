import axios from "axios";

export default {
    namespaced:true,
    state:{
        cart:[],
        //you can provide empty object
        parts:null,
        foo:"robots-foo"
    },
    mutations:{
        addRobotToCart(state, robot){
            state.cart.push(robot);
        },
        updateParts(state , parts){
            state.parts=parts;
        }
    },
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
    getters:{
        cartSaleItems(state){
            return state.cart.filter(item=>item.head.onSale);
        },
        foo(state){
            return `Robots-getter / ${state.foo}`;
        }
    }
};