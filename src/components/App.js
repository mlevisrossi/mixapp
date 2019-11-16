import React, { Component } from 'react';
import PropTypes from 'prop-types';

//import './App.css';

import Header from "components/Header/Header.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import Footer from "components/Footer/Footer.js";
import Content from 'components/Content/Content.js';

class App extends Component {
  static propTypes = {
      children: PropTypes.object.isRequired
  }
  render() {
      const { children } = this.props;
      const { ...rest } = this.props;
      return (
      <div className="App">
          <Header
            color="transparent"
            brand="Mica app"
            rightLinks={<HeaderLinks />}
            fixed
            changeColorOnScroll={{
            height: 200,
            color: "white"
            }}
            {...rest}
            />
          <Content body={children} />
          <Footer />
      </div>
      );
  }
}

export default App;