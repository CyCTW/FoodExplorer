/* Import faunaDB sdk */
const faunadb = require("faunadb");
const q = faunadb.query;

/* export our lambda function as named "handler" export */
exports.handler = async (event, context) => {
  /* configure faunaDB Client with our secret */
  const client = new faunadb.Client({
    secret: process.env.FAUNADB_SERVER_SECRET,
  });

  console.log("Eventtttt", event);
  /* parse the string body into a useable JS object */
  const obj = JSON.parse(event.body);
  const category = obj.category;
  const userId = obj.userId;
  const foodname = obj.foodname;

  console.log("Function `updateNewFood` invoked", category, foodname);
  /* construct the fauna query */
  return client
    .query(
      q.Update(
        q.Select(["ref"], q.Get(q.Match(q.Index("FoodList_Id"), userId))),
        {
          data: { foodList: { category: [foodname] } },
        }
      )
    )
    .then((response) => {
      console.log("success", response);
      /* Success! return the response with statusCode 200 */
      return {
        statusCode: 200,
        body: JSON.stringify(response),
      };
    })
    .catch((error) => {
      console.log("error", error);
      /* Error! return the error with statusCode 400 */
      return {
        statusCode: 400,
        body: JSON.stringify(event),
      };
    });
};