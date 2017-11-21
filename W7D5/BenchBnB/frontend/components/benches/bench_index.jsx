import React from 'react';
import BenchIndexItem from './bench_index_item';

export default class BenchIndex extends React.Component {
  componentDidMount() {
    this.props.fetchBenches();
  }

  render() {
    // console.log(this.props.benches);
    return (<div>
      <ul>
        {this.props.benches.map(
          bench => <BenchIndexItem key={bench.description}
                                   bench={bench}/>
        )}
      </ul>
    </div>);
  }
}
