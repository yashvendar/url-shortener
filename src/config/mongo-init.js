db = db.getSiblingDB("url-shortner");
db.createUser({
  user: "yash",
  pwd: "yash1234",
  roles: [{ role: "readWrite", db: "url-shortner" }],
});
print("End Adding the User Roles.");
