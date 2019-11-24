import axios from "axios";

const apiBaseUrl = process.env.REACT_APP_SERVER_URL || "http://localhost:3000";

const APICaller = ({
  method = "get",
  reqUrl,
  data = {},
  headers = {
    "content-type": "application/json",
    Accept: "application/json"
  }
}) => {
  return new Promise(async (resolve, reject) => {
    const user = localStorage.getItem("user");
    let { token = false } = user ? JSON.parse(user) : {};

    let url = `${apiBaseUrl}/api/${reqUrl}`;
    headers = token ? { ...headers, Authorization: token } : headers;
    // console.log(url, "data", data, "method", method, "header", headers);

    let options = {
      method,
      url,
      data,
      headers
    };
    if (method.toLowerCase() === "get") delete options["data"];
    axios({ ...options })
      .then(response => {
        // console.log("%c{res}", "color: green", " => ", response); // eslint-disable-line no-console
        resolve(response);
      })
      .catch(error => {
        // if (
        //   error.response !== undefined &&
        //   error.response.status === 401 &&
        //   error.response &&
        //   error.response.data &&
        //   error.response.data.status === "Unauthorized" &&
        //   error.response.data.message === "Invalid token provided"
        // ) {
        //   // store.dispatch(logout());
        // }
        // console.log(
        //   "%c{err}",
        //   "color: red",
        //   ` => [${apiBaseUrl}/api/${reqUrl}] >>`,
        //   error.response
        // ); // eslint-disable-line no-console
        reject(error);
      });
  });
};
export default APICaller;
