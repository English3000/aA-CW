import React from 'react';
import BenchMap from './bench_map';
import BenchIndex from './bench_index';

export default ({ benches, fetchBenches }) => (<div>
  <BenchMap benches={benches} />
  <BenchIndex benches={benches} fetchBenches={fetchBenches}/>
</div>);
