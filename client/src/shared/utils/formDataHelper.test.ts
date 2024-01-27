import { objectToFormData, formDataToObject } from "./formDataHelper";

describe("objectToFormData", () => {
    it("should convert a simple object to formData", () => {
        const obj = {
            title: "Hello World",
            body: "this is a test"
        };
        const result = objectToFormData(obj);

        expect(result.get("title")).toEqual(obj.title);
        expect(result.get("body")).toEqual(obj.body);
    });
    
    it("should handle a nested object to formData", () => {
        const obj = {
            article: {
                title: "Hello World",
                body: "this is a test",
                user: {
                    name: "Bob",
                    role: "admin"
                }
            }
        };
        const result = objectToFormData(obj);

        expect(result.get("article[title]")).toEqual(obj.article.title);
        expect(result.get("article[body]")).toEqual(obj.article.body);
        expect(result.get("article[user][name]")).toEqual(obj.article.user.name);
    });
    
    it("should handle a Date object to formData", () => {
        const obj = {
            article: {
                title: "Hello World",
                body: "this is a test",
                user: {
                    name: "Bob",
                    role: "admin"
                },
                created_at: new Date("2020-01-01")
            }
        };
        const result = objectToFormData(obj);

        expect(result.get("article[created_at]")).toEqual(obj.article.created_at.toISOString());
    });
    
    it("should handle a File object to formData", () => {
        const file = new File(["content"], "filename.txt");
        const obj = {
            article: {
                title: "Hello World",
                body: "this is a test",
                user: {
                    name: "Bob",
                    role: "admin"
                },
                created_at: new Date("2020-01-01"),
                file: file
            }
        };
        const result = objectToFormData(obj);

        expect(result.get("article[file]")).toEqual(obj.article.file);
    });
});

describe("formDataToObject", () => {
    it("should convert the formdata to an object", () =>{
        const formData = new FormData();
        formData.append("foo", "bar");
        formData.append("fizz", "buzz");

        const result = formDataToObject(formData);
        expect(result).toEqual({foo: "bar", fizz: "buzz"});
    });
});