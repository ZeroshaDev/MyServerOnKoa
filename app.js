const koa = require("koa");
const bodyParser = require("koa-bodyparser");
const cors = require("@koa/cors");

const regiterRouter = require('./registration');
const authRouter = require("./authentication");
const tasksRouter = require('./tasks');

let app = new koa();

require("./mongoose")(app);

app.use(bodyParser());
app.use(cors());
app.use(regiterRouter.routes()).use(regiterRouter.allowedMethods());
app.use(authRouter.routes()).use(authRouter.allowedMethods());
app.use(tasksRouter.routes()).use(tasksRouter.allowedMethods());

app.listen(3000, () => {
  console.log("server started at http://localhost:3000");
});
