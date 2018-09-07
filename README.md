# binding-by-dirty-checking

this solution uses timer (observer) which checks model object 5 times per second and if recognize any changes then refresh data on DOM.
To speed up the process this solution adds "data-binding-id" attribute for each observable DOM element .
Next creates "listToWatch" array with similar structure:
```
[
	{var: "label1", id: "1000", attr: "label"}
	{var: "x1.y1.z1", id: "1000", attr: "title"}
	{var: "label1", id: "1000", attr: "alt"}
	{var: "label1", id: "1001", attr: "label"}
	{var: "x1.y1.z1", id: "1001", attr: "title"}
	{var: "label1", id: "1001", attr: "alt"}
	{var: "label1", id: "1002", attr: "label"}
	{var: "x1.y1.z1", id: "1002", attr: "title"}
	{var: "label1", id: "1002", attr: "alt"}
	{var: "x1.y1.z1", id: "1003", attr: "label"}
	{var: "x1.y1.z1", id: "1003", attr: "title"}
	{var: "label1", id: "1003", attr: "alt"}
	{var: "label3", id: "1004", attr: "label"}
	{var: "x3.y3.z3", id: "1004", attr: "title"}
	{var: "label3", id: "1004", attr: "alt"}
	{var: "label2", id: "1005", attr: "label"}
	{var: "x2.y2.z2", id: "1005", attr: "href"}
	{var: "label3", id: "1006", attr: "label"}
	{var: "x3.y3.z3", id: "1006", attr: "href"}
]
```
This array stores ID and attribute for each observable element; it's helpful for quick determine ID when observer recognizes any change in model object.

Next, when element's ID is found, script change attribute for new value.

