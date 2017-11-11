import React from 'react';

class Tab extends React.Component {
  constructor(props) {
    super(props); //{ [object, object, object] }
    // console.log(props);
    this.state = { index: 0 };
  }



  render() {
    return (
      <div className="flex-div tabs-div">
        <h1 className="center-header">Hello From Tabs</h1>
        <br />
        <div className="flex-div tab-titles-div">
          <h1>{this.props.tabsArray[0].title}</h1>
          <h1>{this.props.tabsArray[1].title}</h1>
          <h1>{this.props.tabsArray[2].title}</h1>
        </div>
        <ul className="flex-list">
          {
            // this.props.tabsArray.map(object => (
            //
            // ))
            this.props.tabsArray.map(object => (
              <div>
                <article key={object.title}>{object.content}</article>
              </div>
            ))
          }
        </ul>
      </div>
    );
  }
}

export default Tab;
