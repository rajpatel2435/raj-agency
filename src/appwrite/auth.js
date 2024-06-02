// Avoid repeated code so I am creating class component

import conf from '../conf/conf.js'
import { Client, Account, ID } from "appwrite";

// creating class

export class AuthService {

    client = new Client();
    account;

    // constructor
    // constructor always acess by this
    constructor() {
        this.client.setEndpoint(conf.appwriteUrl).setProject(conf.appwriteProjectId);
        this.account = new Account(this.client);
    }

    // creating method

    async createAccount({ email, password, name }) {
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name);

            if (userAccount) {
                return this.login(email, password);

            } else {
                return userAccount;
            }
        } catch (error) {
            throw error;
        }
    };
    async login({ email, password }) {

        try {
            return await this.createEmailSession({ email, password });

        } catch (error) {
            throw error;
        }
    };
    async getCurrentUser() {
        try {
            return await this.account.get();
        } catch (error) {
            throw error;
            console.log("Appwrite service :: getCurrentUser()::", error)
        }

        return null;
    };
    async logOut() { 
        try {
            return await this.account.deleteSessions();
        } catch (error) {
            console.log(error);
        }
    };
}

const authService= new AuthServices();
export default authService;