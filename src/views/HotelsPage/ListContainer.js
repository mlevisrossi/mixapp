import React from "react";
// core components
import HotelsList from "views/HotelsPage/HotelsList.js";
import ReactPaginate from 'react-paginate';

import 'assets/css/components/paginationStyle.css';

export default class ListContainer extends React.Component {
    constructor(props) {
      super(props);
  
      this.state = {
        currentData: [],
        offset: 0,
        pageCount: 0
      };
    }
  
    loadHotels() {
      const currentData = this.props.data.slice(this.state.offset, this.state.offset + this.props.pageLimit);
      this.setState({
        currentData: currentData,
        pageCount: Math.ceil(this.props.data.length / this.props.pageLimit),
      });
    }
  
    handlePageClick = (data) => {
      let selected = data.selected;
      let offset = Math.ceil(selected * this.props.pageLimit);
  
      this.setState({ offset: offset }, () => {
        this.loadHotels();
      });
    };
  
    componentDidMount() {
        this.loadHotels();
    }

    render() {
        return (
            <div>
                <HotelsList hotelsList={(this.state.currentData)} className='textCenter' letter={(this.props.letter)} />
                <ReactPaginate
                    previousLabel={'PREV'}
                    nextLabel={'NEXT'}
                    breakLabel={'...'}
                    breakClassName={'paginationLink'}
                    pageCount={this.state.pageCount}
                    marginPagesDisplayed={1}
                    pageRangeDisplayed={3}
                    onPageChange={this.handlePageClick}
                    pageClassName={'paginationLink'}
                    containerClassName={'pagination'}
                    subContainerClassName={'paginationLink'}
                    activeClassName={'active'}
                    disabledClassName={'disabled'}
                    previousClassName={'paginationLink'}
                    nextClassName={'paginationLink'}
                />
            </div>
        )
    }
}