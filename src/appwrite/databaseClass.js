import {Client, Databases, Storage, Query , ID} from "appwrite";
import conf from '../conf/conf.js'
export class Database{

    client = new Client();
    databases;
    bucket;


constructor(){

    console.log(conf)
    this.client.setEndpoint('https://cloud.appwrite.io/v1').setProject(conf.appwriteProjectId);
// this.client.setEndpoint(conf.appwriteUrl).setProject(conf.appwriteProjectId);
this.databases= new Databases(this.client)
console.log(this.databases);
this.bucket= new Storage(this.client)
}

async getPost(slug){

    try {
        return await this.databases.getDocument(conf.appwriteDatabaseId, conf.appwriteCollectionId,slug)
    } catch (error) {
        console.log(error);
        return false;
    }

}

async getPosts(queries= [Query.equal("status","active")]){
    try {
        return await this.databases.listDocuments(conf.appwriteDatabaseId,conf.appwriteCollectionId,queries);
    } catch (error) {
        console.log(error);
    }
}

async createPost({ title,slug,content,featuredImage,status, userId}){
    try {
        return await this.databases.createDocument(conf.appwriteDatabaseId,conf.appwriteCollectionId,slug,{
            title,content,featuredImage,status,userId,slug
        })
    } catch (error) {
        console.log(error);
    }
}


async updatePost(slug, {title,content,featuredImage,status}){
    try {
        return await this.databases.updateDocument(
            conf.appwriteDatabaseId,
            conf.appwriteCollectionId,
            slug,
            {
                title,content,featuredImage,status
            }
        )
    } catch (error) {
        console.log(error);
    }
}


async deletePost(slug){
    try {
        await this.databases.deleteDocument(
            conf.appwriteDatabaseId,
            conf.appwriteCollectionId,
            slug
        )
        return true;

    } catch (error) {
        console.log(error);
        return false
    }
}


// storage services

async uploadFile(file){
    try{
        return await this.bucket.createFile(
            conf.appwriteBucketId,
            ID.unique(),
            file
        )

    }catch(error){
        console.log(error);
        return false
    }
}



async deleteFile(fileId){
    try{
        return await this.bucket.deleteFile(
            conf.appwriteBucketId,
            fileId
        )

    }catch(error){
        console.log(error);
        return false
    }
}


filePreview(fileId){
return this.bucket.getfilePreview(
    conf.appwriteBucketId,
    fileId
).href
}
}

const appwriteService = new Database();

export default appwriteService ;