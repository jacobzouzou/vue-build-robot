// export  default{
//     bind:(element,binding)=>{
//         if(binding.arg!=="position") return;
//         Object.keys(binding.modifiers).forEach((key)=>{
//             element.style[key]="5px";
//         });
//         element.style.position='absolute';
//     }
// }

// //bind to object

// const applyStyle=function(element, binding){
//     Object.keys(binding.value).forEach((position)=>{
//         element.style[position]=binding.value[position];
//     });
//     element.style.position='absolute';
// };
// export  default{
//     bind:(element,binding)=>{
//         applyStyle(element,binding);
//     },
//     update:(element, binding)=>{
//         applyStyle(element,binding);
//     },
//     componentUdapted:()=>{

//     },
//     unbind:()=>{

//     }
// }

//above code can be replaced  by 
export  default function (element, binding){
    Object.keys(binding.value).forEach((position)=>{
        element.style[position]=binding.value[position];
    });
    element.style.position='absolute';
}