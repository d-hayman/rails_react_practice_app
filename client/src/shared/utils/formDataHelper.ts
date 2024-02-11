/**
 * 
 * @param obj 
 * @param namespace 
 * @param formData 
 * @returns 
 */
export function objectToFormData(
    obj: any,
    namespace: string = '',
    formData: FormData = new FormData()
) : FormData {
    for (let propertyName in obj) {
        if (isValidProperty(obj, propertyName)) {
            const formKey = getFormKey(namespace, propertyName);
            appendToFormData(formData, formKey, obj[propertyName]);
        }
    }
    return formData;
}

/**
 * 
 * @param formData 
 * @returns 
 */
export function formDataToObject(formData: FormData): any {
    const obj:any = {};
    for (let key of formData.keys()) {
        obj[key] = formData.get(key);
    }
    return obj;
}

/**
 * 
 * @param obj 
 * @param propertyName 
 * @returns 
 */
export function isValidProperty(obj: any, propertyName: string) {
    return (
        Object.prototype.hasOwnProperty.call(obj, propertyName) &&
        obj[propertyName] !== undefined && 
        obj[propertyName] !== null &&
        obj[propertyName] !== ''
    );
}

/**
 * 
 * @param namespace 
 * @param propertyName 
 * @returns 
 */
function getFormKey(namespace: string, propertyName: string){
    return namespace ? `${namespace}[${propertyName}]` : propertyName;
}

/**
 * 
 * @param formData 
 * @param formKey 
 * @param value 
 */
function appendToFormData(formData: FormData, formKey: string, value: any) {
    if(value instanceof Date){
        appendAsDate(formData, formKey, value);
    } else if (isObjectButNotFile(value)){
        objectToFormData(value, formKey, formData);
    } else{
        formData.append(formKey, value);
    }
}

/**
 * 
 * @param formData 
 * @param formKey 
 * @param value 
 */
function appendAsDate(formData: FormData, formKey: string, value: Date) {
    formData.append(formKey, value.toISOString());
}

/**
 * 
 * @param value 
 * @returns 
 */
function isObjectButNotFile(value: any) {
    return typeof value === 'object' && !(value instanceof File);
}

