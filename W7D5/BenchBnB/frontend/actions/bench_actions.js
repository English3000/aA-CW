import { fetchBenchesReq,
         createBenchReq } from '../util/bench_api_util';

export const RECEIVE_BENCHES = 'RECEIVE_BENCHES';

export const receiveBenches = benches => ({
  type: RECEIVE_BENCHES,
  benches
});

// export const fetchBenches = () => dispatch => (
//   fetchBenchesReq().then(benches => dispatch(receiveBenches(benches)))
// );

export const fetchBenches = () => async (dispatch) => {
  return dispatch(receiveBenches(await fetchBenchesReq()));
};

export const createBench = bench => async (dispatch) => {
  return dispatch(receiveBenches(await createBenchReq(bench)));
};
