import React from 'react';
import { Grid, Row, Col } from 'react-bootstrap';

class Gallery extends React.Component {
  createGroupedArray(arr, chunkSize) {
    var groups = [], i;
    for (i = 0; i < arr.length; i += chunkSize) {
        groups.push(arr.slice(i, i + chunkSize));
    }
    return groups;
  }

  render(){
    const chunkedArray = this.createGroupedArray(this.props.items, this.props.colCount);
    return(
      <Grid>
        {
          chunkedArray.map(
            (row, rowIndex) =>
              <Row key={rowIndex}>
                {
                  row.map(
                    (item, columnIndex) => (
                      <Col key={"item_"+rowIndex+"_"+columnIndex} md={(12/this.props.colCount)}>
                        {item}
                      </Col>
                    )
                  )
                }
            </Row>
          )
        }
      </Grid>
    )};
}

Gallery.defaultProps = {
  colCount:12
};

export default Gallery;
