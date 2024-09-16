import{u,j as e,R as m,B as i}from"./index-BnDtDxmJ.js";import{l as p,S as f,P as j,m as b,g as N,u as v,f as w}from"./1558355117500-Bxdh337b.js";import{u as y,c as S,C as R,l as E}from"./index.esm-CXjW7jhD.js";const I=()=>{const d=u(),{register:x,handleSubmit:g,formState:{errors:a},control:h,setValue:o}=y({defaultValues:{email:"",password:""}}),t=async r=>{const n=new FormData;Object.keys(r).forEach(s=>{typeof r[s]=="object"&&r[s]!==null?Object.keys(r[s]).forEach(l=>{r[s][l]!==""&&(o(`${s}.${l}`,r[s][l]),n.append(`${s}[${l}]`,r[s][l]))}):r[s]!==""&&(o(s,r[s]),n.append(s,r[s]))});try{const s=await E(n);i.success(s.message),setTimeout(()=>d("/chat"),3e3)}catch(s){i.error("Login failed: "+s.response.data.message||s.message||s)}},c=r=>{i.error(r)};return e.jsx("div",{className:"p-10 min-h-screen flex items-center justify-center bg-gray-50",children:e.jsxs("div",{className:"flex lg:flex-row lg:w-[80%] shadow-lg rounded-xl min-h-[60vh]",children:[e.jsx("img",{className:"max-w-[450px] rounded-l-lg",src:p,alt:""}),e.jsx("div",{className:"bg-white w-full flex items-center justify-center",children:e.jsxs(f,{className:"max-w-[80%] w-full",type:"slideUp",duration:400,delay:300,children:[e.jsxs("div",{className:"text-center mb-10",children:[e.jsx("h1",{className:"text-5xl font-semibold",children:"Chào mừng trở lại!"}),e.jsx("p",{className:"text-gray-500 text-2xl mt-2",children:"Hãy đăng nhập để tiếp tục sử dụng!"})]}),e.jsxs("form",{className:"space-y-8",onSubmit:g(t),children:[e.jsxs("div",{className:"space-y-6",children:[e.jsxs("div",{className:"relative",children:[e.jsx("label",{htmlFor:"email",className:"block text-2xl font-medium text-left text-gray field-label",children:"E-mail"}),e.jsx("input",{className:S("text-3xl border-none mt-2 block w-full h-50 px-4 py-3 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500",{"ring-2 ring-red-500":a.email}),id:"email",type:"email",placeholder:"Nhập E-Mail",...x("email",{required:!0,pattern:/^\S+@\S+$/i})}),a.email&&e.jsx("span",{className:"text-red-500 text-md",children:"E-mail không hợp lệ"})]}),e.jsx(R,{name:"password",control:h,rules:{required:!0},render:({field:r})=>e.jsx(j,{id:"password",placeholder:"Nhập mật khẩu",error:a.password,innerRef:r.ref,isInvalid:a.password,value:r.value,onChange:r.onChange})})]}),e.jsxs("div",{className:"flex justify-between items-center",children:[e.jsx(m,{to:"/user/forgot-password",className:"text-md text-blue-600 hover:underline",children:"Quên mật khẩu?"}),e.jsx("button",{type:"submit",className:"bg-blue-600 text-white py-3 px-5 rounded-lg hover:bg-blue-700 transition-all",children:"Đăng nhập"})]})]}),e.jsxs("div",{className:"my-10",children:[e.jsxs("div",{className:"relative text-center",children:[e.jsx("span",{className:"absolute inset-x-0 top-1/2 -translate-y-1/2 h-px bg-gray-300"}),e.jsx("span",{className:"text-3xl relative bg-white px-4 text-lg text-gray-500",children:"hoặc"})]}),e.jsxs("div",{className:"mt-8 grid grid-cols-2 gap-6",children:[e.jsxs(b,{className:"border-none flex items-center justify-center gap-3 bg-gray-100 border border-gray-300 rounded-lg py-3 px-5 hover:bg-gray-200 transition-all",client_id:void 0,onReject:c,onResolve:t,children:[e.jsx("img",{className:"w-6",src:N,alt:"Google"}),"Google"]}),e.jsxs(v,{className:"border-none flex items-center justify-center gap-3 bg-gray-100 border border-gray-300 rounded-lg py-3 px-5 hover:bg-gray-200 transition-all",appId:void 0,onReject:c,onResolve:t,children:[e.jsx("img",{className:"w-6",src:w,alt:"Facebook"}),"Facebook"]})]})]}),e.jsxs("div",{className:"flex justify-center items-center gap-3 ",children:[e.jsx("p",{className:"text-gray-500 text-3xl",children:"Bạn chưa có tài khoản?"}),e.jsx(m,{to:"/user/register",className:"text-3xl text-blue-600 hover:underline",children:"Đăng ký"})]})]})})]})})};export{I as default};
