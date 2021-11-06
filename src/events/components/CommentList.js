import React from 'react';

import CommentItem from './CommentItem';
import './CommentList.css';

const CommentList = props => {

    return (
        <div className="comment-list">
            {props.items.map(event => 
                <CommentItem
                    key={event.id} 
                    id={event.id} 
                    content={event.content}
                    images={JSON.parse(event.images)}
                    creatorId={event.userId}
                    user={event.user.name}
                    eventId={event.eventId}
                    onDeleteComment={props.onDeleteComment}
                    createdAt={event.createdAt}
                    profileImage={JSON.parse(event.user.images) || [""]}
                />
            )}
            
        </div>
    );
};
export default CommentList;
