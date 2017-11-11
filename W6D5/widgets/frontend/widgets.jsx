import React from 'react';
import Clock from './clock';
import Tab from './tabs';

class Widget extends React.Component {
  constructor() {
    super();
    this.state = {
      tab: 0
    };
  }


  render() {
    return (
      <div>
        <Clock />
        <Tab tabsArray={tabsArray} />
      </div>
    );
  }
}
 //needs props array [title="", content="", {}]
 
const tabsArray = [
  {title: "Tab1", content: "C1"},
  {title: "Tab2", content: "C2"},
  {title: "Tab3", content: "C3"}
];

export default Widget;
