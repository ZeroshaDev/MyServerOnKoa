const Router = require("koa-router");
const jsonwebtoken = require("jsonwebtoken");
const jwt = require("./jwt");
const router = new Router({ prefix: "/tasks" });
router.use(jwt.errorHandler()).use(jwt.jwt());

router.get("/getposts", async function (ctx) {
  const headers = ctx.request.header;
  const jwt = jsonwebtoken.decode(headers.authorization.slice(7));
  const user = jwt.payload.user;
  ctx.status = 200;
  ctx.type = "application/json";
  ctx.body = await ctx.app.List.find({ createdBy: user.username });
});

router.post("/addpost", async function (ctx) {
  let item = ctx.request.body;
  const headers = ctx.request.header;
  const jwt = jsonwebtoken.decode(headers.authorization.slice(7));
  const user = jwt.payload.user;
  let newWrite = new ctx.app.List({
    id: item.id,
    content: item.content,
    completed: item.completed,
    createdBy: user.username,
  });
  newWrite.save(function (err) {
    if (err) {
      throw err;
    }
  });
  ctx.status = 200;
  ctx.body = "Post successfully saved";
});

router.put("/editpost", async function (ctx) {
  const headers = ctx.request.header;
  const jwt = jsonwebtoken.decode(headers.authorization.slice(7));
  const user = jwt.payload.user;
  await ctx.app.List.findOneAndUpdate(
    { id: ctx.request.body.id, createdBy: user.username },
    { content: ctx.request.body.content, completed: ctx.request.body.completed }
  );
  ctx.status = 200;
  ctx.body = "Completely updated";
});

router.delete("/deletepost", async function (ctx) {
  const headers = ctx.request.header;
  const jwt = jsonwebtoken.decode(headers.authorization.slice(7));
  const user = jwt.payload.user;
  await ctx.app.List.findOneAndDelete({
    id: ctx.request.body.id,
    createdBy:user.username,
  });
  ctx.status = 200;
  ctx.body = "Completely deleted";
});

module.exports = router;
