import React from 'react'
import './Card.css'


function Card(props) {

  const commentDate = new Date(props.date);

  function getFormattedDate() {
    const formattedDate = commentDate.toLocaleDateString("en-US", { year: 'numeric', month: 'short', day: '2-digit' });
    const today = new Date();
    const daysSince = Math.round((today.getTime() - commentDate.getTime()) / (1000 * 60 * 60 * 24));
    // (if less than a week)
    if (daysSince < 7) {
        return `${daysSince} days ago`;
    } else {
        return formattedDate;
    }
}

  return (
    <div className='wrapper'>
        <img className='cardImage' alt={props.title} src={props.img} />
        <div className='contentWrapper'>
            <div className='cardTitle'>{props.title}</div>
            <div className='subtitle'>{props.subtitle}</div>
            <div className='dateAndFav'>
                <div className='date'>{getFormattedDate()}</div>
                <div className='favIcon' onClick={() => props.handleFavorites(props.id)}>{props.isFavorite ? "★" : "☆" }</div>
            </div>
        </div>
    </div>
  )
}

export default Card