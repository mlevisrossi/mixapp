export async function getExtendedOrderFromApiAsync(jsonData) {
  let data = JSON.stringify(jsonData) 
  const request = new Request('http://localhost:8080/multicontext');
  fetch(request, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: data,
  })
  .then((response) => response.json())
    .then((responseJson) => {
      return responseJson;
    })
    .catch((error) => {
      console.error(error);
    });

}