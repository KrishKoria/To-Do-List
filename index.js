import express from "express";

const app = express();
const items = [];
const workItems = [];
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));

app.get("/", function (req, res) {
	const today = new Date();
	const options = {
		weekday: "long",
		day: "numeric",
		month: "long"
	};
	const day = today.toLocaleDateString("en-US", options);

	res.render("list", {
		listTitle: day,
		newListItems: items,
	});
});

app.post("/", (req, res) => {
	const item = req.body.newItem;
	if (req.body.list === "Work") {
		workItems.push(item);
		res.redirect("/work");
	}else {
		items.push(item);
		res.redirect("/");
	}
});

app.get("/listItems", (req,res)=>{
	res.render("list", {
		listTitle: "Work List",
		newListItems: workItems
	});
});
app.post("/work", (req, res)=>{
	const item = req.body.newItem;
	workItems.push(item);
	res.redirect("/listItems");
});

app.listen(3000, function () {
	console.log("Server started on port 3000.");
});
