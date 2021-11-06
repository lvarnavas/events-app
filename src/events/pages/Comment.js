import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import CommentList from '../components/CommentList';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import { useHttpClient } from '../../shared/hooks/http-hook';

const Comment = () => {
    const {isLoading, error, sendRequest, clearError} = useHttpClient();
    const [loadedComment, setLoadedComment] = useState();
    const eventId = useParams().eventId;

    useEffect(() => {
        const fetchComments = async () => {
            try {
                const responseData = await sendRequest(
                    `${process.env.REACT_APP_BACKEND_URL}/events/comment/${eventId}` 
                )
                setLoadedComment(responseData.comment);
            } catch (err) {}
        };
        fetchComments();
    }, [sendRequest, eventId]);

    const commentDeletedHandler = (deletedCommentId) => {
        setLoadedComment(prevComments => 
            prevComments.filter(comment => comment.id !== deletedCommentId)
        );
    };

    return (
        <React.Fragment>
            <ErrorModal error={error} onClear={clearError} />
            {isLoading && (
                <div className="center">
                    <LoadingSpinner />
                </div>
            )}
            {!isLoading && loadedComment && <CommentList 
                items={loadedComment}
                onDeleteComment={commentDeletedHandler}
            />}
        </React.Fragment>
    );
};
export default Comment;