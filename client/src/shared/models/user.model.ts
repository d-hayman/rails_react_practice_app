import { isArray } from "util";
import { Permission } from "./permission.model";

/**
 * 
 */
class User {
    /**
     * ID, a number, but we treat it as a string since we do no math with it but plenty of concatenation in routing
     */
    id?:string = '';
    /**
     * user's username
     */
    username:string = '';
    /**
     * user's email
     */
    email:string = '';
    /**
     * Permission List
     */
    permissions:Permission[] = [];

    /**
     * 
     * @param dataset 
     * @returns 
     */
    public static buildUserData(dataset:any):User {
        const user = new User();
        user.id = dataset.id ?? '';
        user.username = dataset.username ?? '';
        user.email = dataset.email ?? '';

        if(dataset.permissions !== undefined && Array.isArray(dataset.permissions)){
            for(const permission of dataset.permissions){
                user.permissions.push(Permission.buildPermissionData(permission));
            }
        }
        return user;
    }
}

export {User}