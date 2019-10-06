import React, { Component } from 'react'

const pageSize = 9;

class HomeScreen extends Component {
    state = {
		data: [],
		total: 0,
		currentPageNumber: 1,
    detailModalVisible: false,
    selectedPost: undefined,
    };
    

    componentWillMount() {
		this.getData(1);
	}

    getData = async pageNumber => {
		try {
			const result = await fetch(
				`http://localhost:5000/post/get/posts?pageNumber=${pageNumber}&pageSize=${pageSize}`,
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
			});
			console.log(result);
			this.setState({
				total: result.data.total,
				data: result.data.data
			});
			window.scrollTo({ top: 0 });
		} catch (error) {
			window.alert(error.message);
		}
    };
    


    handlePageChange = newPageNumber => {
		// call getData
		this.getData(newPageNumber);

		// setState currentPageNumber
		this.setState({
			currentPageNumber: newPageNumber
		});
	};

	handlePrevClick = () => {
		if (this.state.currentPageNumber > 1) {
			// getData
			this.getData(this.state.currentPageNumber - 1);

			// setState
			this.setState({
				currentPageNumber: this.state.currentPageNumber - 1
			});
		}
	};

	handleNextClick = () => {
		const maxPageNumber = Math.ceil(this.state.total / pageSize);
		if (this.state.currentPageNumber < maxPageNumber) {
			// getData
			this.getData(this.state.currentPageNumber + 1);

			// setState
			this.setState({
				currentPageNumber: this.state.currentPageNumber + 1
			});
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

    render() {
		const maxPageNumber = Math.ceil(this.state.total / pageSize);
		const paginations = [];
		for (let i = 0; i < maxPageNumber; i += 1) {
			paginations.push(i + 1);
		}
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
										<h5 className="card-title">ahihi</h5>
										<p
											className="card-text"
											style={{
												height: '50px',
												textOverflow: 'ellipsis',
												overflow: 'hidden'
											}}
										>
											{item.content}
										</p>
										<a href="#" onClick={() => this.handlePostClick(item)} className="btn btn-primary">
											Detail
										</a>
									</div>
								</div>
							</div>
						);
					})}
				</div>

				<nav aria-label="Page navigation example">
					<ul
						className="pagination"
						style={{ float: 'right', marginTop: '30px', marginBottom: '30px' }}
					>
						<li className="page-item">
							<a
								className="page-link"
								aria-label="Previous"
								onClick={this.handlePrevClick}
							>
								<span aria-hidden="true">&laquo;</span>
								<span className="sr-only">Previous</span>
							</a>
						</li>
						{paginations.map(item => {
							const isActive = item === this.state.currentPageNumber;
							let classNameValue = '';
							if (isActive) {
								classNameValue = 'page-item active';
							} else {
								classNameValue = 'page-item';
							}
							return (
								<li className={classNameValue} key={item}>
									<a
										className="page-link"
										onClick={() => {
											this.handlePageChange(item);
										}}
									>
										{item}
									</a>
								</li>
							);
						})}
						<li className="page-item">
							<a
								className="page-link"
								aria-label="Next"
								onClick={this.handleNextClick}
							>
								<span aria-hidden="true">&raquo;</span>
								<span className="sr-only">Next</span>
							</a>
						</li>
					</ul>
				</nav>

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
                      backgroundImage: `url(http://localhost:3001${this.state.selectedPost.imageUrl})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      backgroundRepeat: 'no-repeate',
                      height: '350px',
                      width: 'auto'
                    }}
                  ></div>
                  <div className="card-body">
                    <h5 className="card-title">{this.state.selectedPost.author.fullName}</h5>
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
		)
    }
}

export default HomeScreen;