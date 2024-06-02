import React, { useCallback } from 'react'
import { useForm, Controller } from "react-hook-form"
import {useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import authService from '../../appwrite/auth'
import  appwriteService  from '../../appwrite/databaseClass'
import Select from '../Select'


function PostForm({post}) {
 const { register,handleSubmit,watch,setValue,getValues,control } = useForm({
  defaultValues: {
  title: post?.title || "",
  slug: post?.slug || "",
  content: post?.content || "",
  status: post?.status || "active"


 } 
});


const navigate= useNavigate();

const userData= useSelector((state)=>{
  state.auth.userData
});

const submit= async (data)=>{ 

  console.log(data);
if(post){
  const file = data.image[0] ? await appwriteService.uploadFile(data.image[0]) : null ;

  if(file){
    const fileId= file.$id;
    data.featuredImage = fileId;

    await appwriteService.createPost({...data, userId: userData.$id })
  }
}else{
  const file = await appwriteService.uploadFile(data.image[0]);

            if (file) {
                const fileId = file.$id;
                data.featuredImage = fileId;
                const dbPost = await appwriteService.createPost({ ...data, userId: userData.$id });

                if (dbPost) {
                    navigate(`/post/${dbPost.$id}`);
                }
            }

}
};

const slugTransform= useCallback((value)=>{
if(value && typeof value==="string"){
  return value.toLowerCase().replace(/[^a-zA-Z\d\s]+/g,'-').replace(/\s/g,"-")
}

React.useEffect(()=>{
  // value is the whole form data
  // title as we set the external name
  // setValue whihc is from react useform
watch((value, {name})=>{
  if(name === "title"){
    setValue("slug",slugTransform(value.title),{ shouldValidate:true})
  }
})


},[
watch,slugTransform,setValue
]);

},[]);

  return (
<form 
onSubmit={handleSubmit(submit)}
>
<div>
<input  {...register("title", { required: true, maxLength: 50 })} />
<input {...register("content", { required: true, maxLength: 1500 })} />
<input onInput={(e)=> {
  setValue("slug", slugTransform(e.currentTarget.value), {shouldValidate: true})
}} {...register("slug", { required: true, maxLength: 50 })} />
<input {...register("status", { required: true, maxLength: 50 })} />


<div>
  <input type='file' capture="user" accept='image/png,image/jpg,image/jpeg' {...register("image",{required:!post})} />

   {post && (
    <div>
<img src={appWriteService.getFilePreview(post.featuredImage)} alt={post.title} />
      </div>
   )}
</div>
</div>
<Select
                    options={["active", "inactive"]}
                    label="Status"
                    className="mb-4"
                    {...register("status", { required: true })}
                />
<button type="submit"> {  post ? "update" : "submit "}</button>
</form>
  )
}

export default PostForm