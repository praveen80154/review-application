import React, { useState, useEffect } from "react";
import axios from "axios";
import { Modal, Button } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';

function Home() {
  const [products, setProducts] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState(0);
  const [category, setCategory] = useState("");

  const [viewRating, setViewRating] = useState([]);
  const [viewReview, setViewReview] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const [rating, setRating] = useState("");
  const [review, setReview] = useState("");
  const [visibleReviewForms, setVisibleReviewForms] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      title: title,
      description: description,
      amount: amount,
      category: category,
    };

    await axios.post("http://localhost:8001/addproduct", data);
    setTitle("");
    setDescription("");
    setAmount("");
    setCategory("");
  };

  const deleteButton = async (key) => {
    await axios.delete(`http://localhost:8001/delete/${key}`);
  };

  const reviewButton = async (key) => {
    const response = await axios.get(`http://localhost:8001/reviews/${key}`);
    const product = response.data.product;
    setViewRating(product.rating);
    setViewReview(product.review);
    setShowModal(true);
  };

  const handlereview = async (e, key) => {
    e.preventDefault();
    const data = {
      rating: rating,
      review: review,
    };

    await axios.put(`http://localhost:8001/edit/${key}`, data);
    setReview("");
    setRating("");
    setVisibleReviewForms((prev) => ({ ...prev, [key]: false }));
  };

  useEffect(() => {
    const fetchproducts = async () => {
      try {
        const response = await axios.get("http://localhost:8001/allproducts");
        setProducts(response.data.products);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchproducts();
  }, []);

  const toggleReviewForm = (productId) => {
    setVisibleReviewForms((prev) => ({
      ...prev,
      [productId]: !prev[productId],
    }));
  };

  return (
    <div className="container">
      <h2>Products</h2>
      <div className="row">
        {products.map((product) => (
          <div className="col-md-4 mb-4" key={product._id}>
            <div className="card h-100 bg-primary">
              <div className="card-body d-flex flex-column">
                <h3 className="card-title">{product.title}</h3>
                <p className="card-text flex-grow-1">{product.description}</p>
                <p className="card-text">Amount: {product.amount}</p>
                <p className="card-text">Category: {product.category}</p>
                <button className="btn btn-light mb-2" onClick={() => toggleReviewForm(product._id)}>
                  Enter rating
                </button>

                <button className="btn btn-danger mb-2" onClick={() => deleteButton(product._id)}>
                  Delete Product
                </button>

                <button className="btn btn-info mb-2" onClick={() => reviewButton(product._id)}>
                  View Reviews
                </button>

                {visibleReviewForms[product._id] && (
                  <form
                    onSubmit={(e) => {
                      handlereview(e, product._id);
                    }}
                  >
                    <div className="form-group">
                      <input
                        type="number"
                        className="form-control"
                        value={rating}
                        placeholder="Enter rating out of 5"
                        onChange={(e) => setRating(e.target.value)}
                      />
                    </div>
                    <div className="form-group">
                      <input
                        type="text"
                        className="form-control"
                        value={review}
                        placeholder="Enter review"
                        onChange={(e) => setReview(e.target.value)}
                      />
                    </div>
                    <button className="btn btn-success" type="submit">Add</button>
                  </form>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-5">
        <h1>Add Product</h1>
        <form
          onSubmit={handleSubmit}
        >
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              value={title}
              placeholder="Enter title"
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <br></br>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              value={description}
              placeholder="Enter description"
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <br></br>
          <div className="form-group">
            <input
              type="number"
              className="form-control"
              value={amount}
              placeholder="Enter amount"
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>
          <br></br>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              value={category}
              placeholder="Enter category"
              onChange={(e) => setCategory(e.target.value)}
            />
          </div>
          <br></br>
          <button className="btn btn-primary" type="submit">Add</button>
        </form>
      </div>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Product Reviews</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>Ratings</h4>
          {viewRating.length > 0 ? (
            viewRating.map((rate, index) => <p key={index}>{rate}</p>)
          ) : (
            <p>No ratings available</p>
          )}
          <h4>Reviews</h4>
          {viewReview.length > 0 ? (
            viewReview.map((rev, index) => <p key={index}>{rev}</p>)
          ) : (
            <p>No reviews available</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Home;
