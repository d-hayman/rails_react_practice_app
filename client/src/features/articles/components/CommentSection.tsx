// API_URL comes from env
import PropTypes, {InferProps} from "prop-types";
import { useState, useEffect } from 'react';
import  DeletionModal from '../../../shared/components/DeletionModal';
import Paginator from '../../../shared/components/Pagination';
import { fetchAllComments, createComment, deleteComment } from "../../../shared/services/comments.service";
import { Alert, Button, Col, Container, Form, Row } from "react-bootstrap";
import { listifyErrors } from "../../../shared/utils/responseHelpers";
import styles from '../../../assets/styles/CommentSection.module.css';

const commentsPropTypes = {
    articleId: PropTypes.string.isRequired
};

type commentsTypes = InferProps<typeof commentsPropTypes>;

function CommentSection({articleId} : commentsTypes){
    const hasCommentDestroy = (localStorage.getItem("permissions")??'').includes("Comment:destroy");
    const hasCommentCreate = (localStorage.getItem("permissions")??'').includes("Comment:create");
    const hasUserId = localStorage.getItem("userId")??'0'
    
    const [page, setPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [comments, setComments] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error,setError] = useState<any>(null);
    const [totalComments, setTotalComments] = useState(0);

    const [newCommentBody, setNewCommentBody] = useState('');
    const [showErrorAlert, setShowErrorAlert] = useState(false);
    const [errorAlertBody, setErrorAlertBody] = useState<any>({});
        
    async function loadComments() {
        try {
            //MUI paginator is 0-indexed but Kaminari is 1-indexed
            let data = await fetchAllComments(articleId, page);
            if(data.comments) {
                setComments(data.comments);
                setTotalComments(data.total_count);
                setRowsPerPage(Number.parseInt(data.per_page));
            }
            setLoading(false);
        } catch(e) {
            setError(e);
            setLoading(false);
            console.error("Failed to fetch comments: ", e);
        }
    }

    useEffect(() => {
        loadComments();
    }, [page,articleId])

    const handlePageChange = (page: number) => {
        setPage(page);
    }

    const handleSubmit = async (e:any) => {
        e.preventDefault();
        if (!newCommentBody)
            return;
        try {
            const response = await createComment(articleId, newCommentBody);
            if (response.ok) {
                loadComments();
                setNewCommentBody('');
            } else {
                const json = await response.json();
                setErrorAlertBody(json);
                setShowErrorAlert(true);
            }
        } catch (e) {
            setErrorAlertBody({error: `${e}`});
            setShowErrorAlert(true);
            console.error("Failed to create invite: ", e);
        }
    };

    return <Container>
        <Row>
            <h3>Comments</h3>
        {loading && <p>Loading... </p>}
        {error && <p>Error loading comments.</p>}
        {comments.map((comment:any) => (
            <Col key={comment.id} className={styles.comment_container} sm={12}>

                <p className={styles.details_section}>{comment.body}</p>
                
                <div style={{float:"left"}}>{comment.created_at} by: {comment.username}</div>
                    { (hasCommentDestroy || comment.user_id == hasUserId) &&
                    <div style={{float:"right"}}>
                        <DeletionModal title={comment.body} parent={articleId} id={comment.id} deletion={deleteComment} callback={()=>{loadComments();}}/>
                    </div>
                    }
            </Col>
        ))}
        <Col sm={12}><Paginator 
            currentPage={page}
            totalItems={totalComments}
            itemsPerPage={rowsPerPage}
            onPageChange={handlePageChange}
        /></Col>
        </Row>
        { hasCommentCreate &&
        <Row>
            { showErrorAlert &&
            <Alert variant="danger" onClose={() => setShowErrorAlert(false)} dismissible>
                <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
                <ul>{listifyErrors(errorAlertBody)}</ul>
            </Alert>}
            <h3>Create Comment</h3>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="bodyInput">
                    <Form.Label>Body:</Form.Label>
                    <Form.Control 
                        as="textarea"
                        rows={7}
                        value={newCommentBody} 
                        onChange={(e) => setNewCommentBody(e.target.value)
                        } 
                        required 
                    />
                </Form.Group>
                <Button type="submit" style={{float:"right"}}>Submit</Button>
            </Form>
        </Row>}
    </Container>
}

export default CommentSection;