import React, { Component } from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  children: PropTypes.node,
};

const defaultProps = {};

class DefaultFooter extends Component {

  constructor(props) {
    super(props);
    this.state = {
        Year: ''
    }
}


  componentDidMount() {
    var currentYear = new Date().getFullYear();
    console.log("currentYear==", currentYear);
    var year = 2019;
    if (currentYear == year) {
        this.setState({
            Year: currentYear
        })
    } else {
        this.setState({
            Year: year + '-' + new Date().getFullYear()
        })
    }
}
  render() {

    // eslint-disable-next-line
    const { children, ...attributes } = this.props;

    return (
      <React.Fragment>
       <span>© {this.state.Year} All Rights Reserved By RKWebtechnology</span>
        <span className="ml-auto">Developed By , <a href="http://www.rkwebtechnology.com">RKWebtechnology</a></span>
      </React.Fragment>
    );
  }
}

DefaultFooter.propTypes = propTypes;
DefaultFooter.defaultProps = defaultProps;

export default DefaultFooter;
