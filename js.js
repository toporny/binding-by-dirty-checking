
function DataBind(model) {
    this.counter = 1000;
    this.timerId = null;
    this.listToWatch = [];
    this.modelCopy;
    this.model = model;

    var elements = document.querySelectorAll('[data-bind], [data-bind-href], [data-bind-src], [data-bind-alt], [data-bind-title]');
    for (o=0; o<elements.length; o++) {
        this.element = elements[o];
        for (var i = 0, atts = this.element.attributes; i < this.element.attributes.length; i++) {
            if (atts[i].nodeName == 'data-bind') {  // do label
                this.doAttr(atts[i], 'label');
            } else if (atts[i].nodeName.substr(0, 10) == 'data-bind-') {   // do attribute
                this.doAttr(atts[i], 'attribute');
            }
        }
    }

    // create copy of model object
    this.modelCopy = JSON.parse(JSON.stringify(model));

    //timer: dirty checking for deep object
    this.startTimer();
}

// change label (or attrubute)
DataBind.prototype.doAttr = function(node, kind) {   // do change label
    try {
        if (eval('model.' + node.nodeValue) !== undefined) {
            var id = this.addID(this.element, node);
            if (kind == 'label') {
                this.element.innerHTML = eval('model.' + node.nodeValue);
                this.makelistToWatch(node, id, 'label' );
            }
            else if (kind == 'attribute') {
                this.element.setAttribute(node.nodeName.substr(10), eval('model.' + node.nodeValue));
                this.makelistToWatch(node, id, node.nodeName.substr(10));
            }
        } else {
            this.displayWarning(node.nodeValue);
        }
    } catch (err) {
        this.displayWarning(node.nodeValue);
    }
};



// change element (label or attribute) by ID.
// It is used by timer
DataBind.prototype.changeById = function(id, attr, new_val) {
    var els = document.querySelectorAll('[data-binding-id="'+id+'"]')
    if (attr == 'label') {
        els[0].innerHTML = new_val;
    }
    else {
        els[0].setAttribute(attr, new_val);
    }
};


// start timer and observe model 
DataBind.prototype.startTimer = function(value) {
    this.timerId = setInterval(this.doInTimer.bind(this, value), 200); // check 5 times/sec
};


// end timer (not used so far)
DataBind.prototype.stopTimer = function(value) {
    window.clearInterval(this.timerId);
};


// observe model object for each time  
DataBind.prototype.doInTimer = function(value) {
    var changed = false;
    for (var i=0; i < this.listToWatch.length; i++) {
        new_val = eval('this.model.' + this.listToWatch[i].var);
        old_val = eval('this.modelCopy.' + this.listToWatch[i].var);
        if (old_val != new_val) {
            changed = true;
            this.changeById(this.listToWatch[i].id, this.listToWatch[i].attr, new_val);
        }
    }
    // if at least one change was make then refresh all modelCopy
    if (changed == true) {
        this.modelCopy = JSON.parse(JSON.stringify(model));
    }
}


// add ID to each observable element
DataBind.prototype.addID = function(element, node) {
    if (!element.hasAttribute("data-binding-id")) {
        var ctr = this.counter++;
        element.setAttribute("data-binding-id", ctr);
        return ''+ctr;
    } else {
        var aa = element.getAttribute("data-binding-id");
        return aa;
    } 
}


// make list oto watch
DataBind.prototype.makelistToWatch = function(node, id, attrName) {
    this.listToWatch.push ({var:  node.nodeValue, id:id, attr:attrName});
    //console.log (this.listToWatch);
};



// displayWarning if value is not defined in model
DataBind.prototype.displayWarning = function(value) {
    console.warn("Warning! ("+ value+ ") not defined in Model!");
};


