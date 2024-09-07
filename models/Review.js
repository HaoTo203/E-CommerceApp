class Review {
  constructor(userId, rating, review, imageUri) {
    this.userId = userId;
    this.rating = rating;
    this.review = review;
    this.imageUri = imageUri;
    this.date = new Date();
  }
}

export default Review;
