import { useState } from "react";
import { Article } from "../../shared/models/article.model";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

function ArticleForm({ article=null, headerText, buttonText, onSubmit }
    :{article?:Article|null, headerText:string, buttonText:string, onSubmit:any}) {
    const [formData, setFormData] = useState<Article>(
        article || {
            title: "",
            body: "",
            notes: "",
            links: "",
            image: null,
            status: "public"
        }
    );

    const handleSubmit =async (e:any) => {
        e.preventDefault();

        if(typeof onSubmit === "function") {
            onSubmit(formData);
        }
    }

    
    window.addEventListener('paste', e => {
        const fileInput = (document.getElementById("image") as HTMLInputElement);
        if(e.clipboardData !== null && e.clipboardData.files.length > 0){
            fileInput.files = e.clipboardData.files;
            setFormData({...formData, image: e.clipboardData.files[0]})
        }
      });

    return (
        <div>
            <h1>{headerText}</h1>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="titleInput">
                    <Form.Label>Title:</Form.Label>
                    <Form.Control 
                        type="text" 
                        value={formData.title} 
                        onChange={(e) => setFormData({
                            ...formData,
                            title: e.target.value})
                        } 
                        required 
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="image">
                    <Form.Label>Image:</Form.Label>
                    <Form.Control  
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                            setFormData({
                                ...formData,
                                image: (e.target as HTMLInputElement).files?.[0]
                            });
                            console.log((e.target as HTMLInputElement).files?.[0]);
                        }}
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="bodyInput">
                    <Form.Label>Body:</Form.Label>
                    <Form.Control 
                        as="textarea"
                        rows={7}
                        value={formData.body} 
                        onChange={(e) => setFormData({
                            ...formData,
                            body: e.target.value})
                        } 
                        required 
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="notesInput">
                    <Form.Label>Notes:</Form.Label>
                    <Form.Control 
                        as="textarea"
                        rows={4}
                        value={formData.notes} 
                        onChange={(e) => setFormData({
                            ...formData,
                            notes: e.target.value})
                        } 
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="linksInput">
                    <Form.Label>Links:</Form.Label>
                    <Form.Control 
                        type="text" 
                        value={formData.links} 
                        onChange={(e) => setFormData({
                            ...formData,
                            links: e.target.value})
                        }  
                    />
                </Form.Group>
                <Button type="submit" style={{float:"right"}}>{buttonText}</Button>
            </Form>
        </div>
    )
}

export default ArticleForm;