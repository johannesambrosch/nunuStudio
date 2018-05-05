"use strict";

function LockedPanel(parent, obj)
{
	Element.call(this, parent);

	this.element.style.overflow = "auto";
	this.element.style.top = "0px";
	this.element.style.left = "0px";
	this.element.style.width = "100%";
	this.element.style.height = "100%";
	this.element.style.backgroundColor = Editor.theme.panelColor;

	this.preventDragEvents();

	//Self pointer
	var self = this;

	//Mouse inside panel
	this.focused = false;
	this.element.onmouseenter = function()
	{
		self.focused = true;
	};

	this.element.onmouseleave = function()
	{
		self.focused = false;
	};

	//Default form
	this.form = new Form(this.element);
	this.form.position.set(5, 5);
	this.form.spacing.set(5, 5);

	//Name
	this.form.addText("Name");
	this.name = this.form.addText("");
	this.form.nextRow();

	//Type
	if(Editor.settings.general.showType)
	{
		this.form.addText("Type");
		this.type = this.form.addText("");
		this.form.nextRow();
	}

	//UUID
	if(Editor.settings.general.showUUID)
	{
		this.form.addText("UUID");
		this.uuid = this.form.addText("");
		this.form.nextRow();
	}

	//Attach object
	this.attach(obj);
}

LockedPanel.prototype = Object.create(Element.prototype);

//Attach object to panel
LockedPanel.prototype.attach = function(obj)
{
	this.obj = obj;
};

//Update panel ui
LockedPanel.prototype.updateInterface = function()
{
	if(this.visible)
	{
		this.element.style.visibility = "visible";
		this.form.updateInterface();
	}
	else
	{
		this.element.style.visibility = "hidden";
	}
};

//Update panel information
LockedPanel.prototype.updatePanel = function()
{
	this.name.setText(this.obj.name);
	
	if(this.type !== undefined)
	{
		this.type.setText(this.obj.type);
	}

	if(this.uuid !== undefined)
	{
		this.uuid.setText(this.obj.uuid);
	}
};