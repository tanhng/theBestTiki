import React, { Component } from 'react';

class CartScreen extends Component {
    state = {
        data: [],
        total: 0,
        detailModalVisible: false,
        selectedPost: undefined,
    };

    componentWillMount() {
        this.getData();
    }

    getData = async () => {
        try {
            fetch(
                `http://localhost:5000/post/gets/carts`,
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    credentials: 'include'
                }
            )
                .then(res => {
                    return res.json();
                })
                .then((data) => {
                    console.log('list ne', data)
                    this.setState({
                        data: data.data.data,
                    })
                    console.log('list state',this.state.data);

                })
            // console.log(result);
            // this.setState({
            //  total: result.data.total,
            //  data: result.data.data
            // });
            // window.scrollTo({ top: 0 });
        } catch (error) {
            window.alert(error.message);
        }
    };

    handlePostClick = (selectedPost) => {
        this.setState({
            detailModalVisible: true,
            selectedPost: selectedPost,
        });
    };

    closeDetailModal = () => {
        this.setState({
            detailModalVisible: false,
            selectedPost: undefined,
        });
    };
    handleDeleteClick=(selectedPost)=>{

        fetch(
            `http://localhost:5000/post/deleteCart`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify({
                    postDelete: selectedPost    
                }),
            }
        )
            .then(res => {
                return res.json();
            })
            .then((data) => {
            //    console.log('data front end ne',data.data.orderList);
            //  console.log('state luc dau ne',this.state.data);
            //  this.setState({
            //      data:data.data.orderList
            //  })
            //  console.log('state luc sau ne',this.state.data);
            fetch(
                `http://localhost:5000/post/gets/carts`,
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    credentials: 'include'
                }
            )
                .then(res => {
                    return res.json();
                })
                .then((data) => {
                    console.log('list ne', data)
                    this.setState({
                        data: data.data.data,
                    })
                    console.log('list state',this.state.data);

                })
            })
    }
    render() {
        return (
            <div>
                <div className="row">
                    {this.state.data.map(item => {
                        console.log(item);
                        return (
                            <div className="col-4 mt-4" key={item._id}>
                                <div className="card">
                                    <div
                                        className="card-img-top"

                                        style={{
                                            backgroundImage: `url(http://localhost:5000${item.imageUrl})`,
                                            backgroundSize: 'cover',
                                            backgroundPosition: 'center',
                                            backgroundRepeat: 'no-repeate',
                                            height: '350px',
                                            width: 'auto',
                                            margin: '10px',
                                            padding: '20px'
                                        }}
                                    ></div>


                                    <div className="card-body">
                                        <h5 className="card-title">{item.author.email}</h5>
                                        <h5 className="card-title" style={{ color: 'lightgrey' }}>{item.price}đ</h5>
                                        <p
                                            className="card-text"
                                            style={{
                                                height: '50px',
                                                textOverflow: 'ellipsis',
                                                overflow: 'hidden'
                                            }}
                                        >
                                            
                                            {item.name}
                                        </p>
                                        <a href="#" onClick={() => this.handlePostClick(item)}  className="btn btn-primary">
                                            Detail
                                        </a>
                                        <a href="#" onClick={(event)=>{ this.handleDeleteClick(item)}} className=" ml-4 btn btn-primary">
                                            Delete
                                        </a>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
                {this.state.detailModalVisible ? (
                    <div
                        className="modal fade show"
                        role="dialog"
                        tabIndex="-1"
                        style={{
                            display: 'block',
                            backgroundColor: 'rgba(0, 0, 0, 0.5)',
                        }}
                        onClick={this.closeDetailModal}
                    >
                        <div className="modal-dialog" role="document">
                            <div className="modal-content" onClick={(event) => {
                                event.stopPropagation();
                            }}>
                                <div className="modal-body">
                                    <div
                                        className="card-img-top"
                                        style={{
                                            backgroundImage: `url(http://localhost:5000${this.state.selectedPost.imageUrl})`,
                                            backgroundSize: 'cover',
                                            backgroundPosition: 'center',
                                            backgroundRepeat: 'no-repeate',
                                            height: '350px',
                                            width: 'auto'
                                        }}
                                    ></div>
                                    <div className="card-body">
                                        {/* <h5 className="card-title">{this.state.selectedPost}</h5> */}
                                        <p
                                            className="card-text"
                                        >
                                            {this.state.selectedPost.content}
                                        </p>
                                        
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button
                                        type="button"
                                        className="btn btn-secondary"
                                        onClick={this.closeDetailModal}
                                    >
                                        Close
                  </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : null}
            </div>
        );
    }
}

export default CartScreen;

