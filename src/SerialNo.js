const SerialNo = props => {
  const id = props.id;
  const userName = props.userName;
  const userPassword = props.userPassword;
  const input = props.input;
  const [Data, setData] = useState(null);

  const token = userName + ":" + userPassword;
  const DataToken = base64.encode(token);
  const header = new Headers();
  //Please keep in mind we have to provide some space in Basic like "Basic "
  header.set("Authorization", "Basic " + DataToken);
  const session_url = "http://ssmt.vivostore.com.sg/api/serialnumber";
  fetch(session_url, {
    method: "GET",
    headers: header
  })
    .then(response => response.json())
    .then(responseJSON => {
      console.log("SerialNo File");
      console.log(responseJSON);
      setData(responseJSON);
    })
    .catch(error => console.log(error.message));

  const Condition = Data.find(value => {
    if (value.product_id == id && value.serialNumber == input) {
      return "yes";
    } else {
      return "No";
    }
  });

  return Condition;
};
export default SerialNo;
