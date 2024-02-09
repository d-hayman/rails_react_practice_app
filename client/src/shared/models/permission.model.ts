/**
 * 
 */
class Permission {
    /**
     * ID, a number, but we treat it as a string since we do no math with it but plenty of concatenation in routing
     */
    id:string = '';
    /**
     * permission model
     */
    model:string = '';
    /**
     * action
     */
    action:string = '';

    /**
     * 
     * @param dataset 
     * @returns 
     */
    public static buildPermissionData(dataset:any):Permission {
        const permission = new Permission();
        permission.id = dataset.id ?? '';
        permission.model = dataset.model ?? '';
        permission.action = dataset.action ?? '';
        return permission;
    }
}

export {Permission}