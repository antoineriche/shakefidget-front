import React from 'react';

class Navbar extends React.Component {
  render(){
    return (
      <ul className="nav nav-tabs card-header-tabs">
        {
          this.props.sections.map(
            (section, index) =>
              <li className="nav-item" key={section}>
                <div className="btn nav-link active" onClick={() => this.props.goTo(index)}>
                  {section}
                </div>
              </li>
          )
        }
      </ul>
    )
  }
}

export default Navbar;
