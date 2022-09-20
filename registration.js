const Router = require("koa-router");
const jwt = require("./jwt");

const router = new Router({ prefix: "/register" });

router.post("/", async (ctx) => {
  const requestUsername = ctx.request.body.username;
  const requestPassword = ctx.request.body.password;

  const user = await ctx.app.User.findOne({ username: requestUsername });
  if (requestUsername !== "" && requestPassword !== "") {
    if (user !== null && user.username === requestUsername) {
      ctx.status = 409;
      ctx.body = { error: "Username already in use" };
    } else {
      ctx.status = 201;
      const newUser = new ctx.app.User({
        username: requestUsername,
        password: requestPassword,
      });
      await newUser.save();
      const user = await ctx.app.User.findOne({
        username: requestUsername,
        password: requestPassword,
      });
      ctx.body = {
        token: jwt.issue({
          user: user,
        }),
      };
    }
  } else {
    ctx.status = 400;
    ctx.body = { error: "Username or password cannot be empty" };
  }
});

module.exports = router;
