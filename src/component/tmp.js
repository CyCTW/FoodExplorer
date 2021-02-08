// add lat and lng attribute in child component of GoogleMapReact
  // const myTodo = {
  //   title: "Test Axios 2",
  //   completed: false,
  // };
  // useEffect(() => {
  //   createTodo(myTodo)
  //     .then((response) => {
  //       console.log("API responsed", response);
  //     })
  //     .catch((err) => {
  //       console.log("API error", err);
  //     });
  //   readAll()
  //     .then((response) => {
  //       console.log("Response ", response);
  //     })
  //     .catch((err) => {
  //       console.log("API error", err);
  //     });
  // }, []);
  const decodeToken = () => {
    const st = window.location.href;
    const targetURL = "#confirmation_token=";
    const pos = st.search(targetURL);
    setToken(st.slice(pos + targetURL.length));
  };
  const [token, setToken] = useState()
  useEffect(() => {
    decodeToken()

    if (token !== null) {
      console.log("enter???")
      console.log(token)
      AuthConfirm({token})
      AuthLogin()
    }
  }, [token]);