export const fetchBenchesReq = () => $.ajax({
  method: 'GET',
  url: '/api/benches'
});

export const createBenchReq = bench => $.ajax({
  method: 'POST',
  url: '/api/benches',
  data: bench
});
