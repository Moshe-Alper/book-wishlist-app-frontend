export function RatingReview({ rating }) {
    return (
      <div>
        {[1, 2, 3, 4, 5].map((star) => (
          <span 
            key={star}
            style={{ 
              color: rating >= star ? 'gold' : 'gray', 
              fontSize: '1rem',
            }}
          >
            {' '}★{' '}
          </span>
        ))}
      </div>
    )
  }
  
