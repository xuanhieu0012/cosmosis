import React,{ useState, useEffect} from 'react';

function DisplayComment({comment, setTogglePostSubmit}){
const {comment_text, comments_author, image_url, like, id} = comment 
const [toggleLikeDislike, setToggleLikeDislike] = useState(false)
const [handleBtnLike, setHandleBtnLike] = useState(like)
function handleDeleteComment(){
    fetch(`/comments/${id}`,{
        method: 'DELETE'
    })
    setTogglePostSubmit(togglePostSubmit => !togglePostSubmit)

}
function handleLikeBtn(){
    
    if (toggleLikeDislike === false){
        setHandleBtnLike( ()=>handleBtnLike + 1)
        setToggleLikeDislike(true)
        
    }
    else{
        setHandleBtnLike(()=>handleBtnLike - 1)
        setToggleLikeDislike(false)
       
    }

}
useEffect(() =>{
    fetch(`/comments/${id}`,{
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({like: handleBtnLike})
    })
},[handleBtnLike])



return<div className="eachComment">
        <div className="comment-authorName">
            <h3>{comments_author}</h3>
            <button className="close-comment-button" onClick={handleDeleteComment}>x</button>
        </div>
        <p className="comment-text">{comment_text}</p>
        {image_url.length === 0 ? null : <img className="commentPicture" src= {image_url} />}
        <div className="likeNumber-and-button">
        <p>{handleBtnLike}</p>
        <button className="like-dislike-btn" onClick={handleLikeBtn}>{toggleLikeDislike === false ? '❤' : '❤'}</button>
        </div>
</div>

}

export default DisplayComment;