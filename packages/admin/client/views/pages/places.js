
Template.pageAdminPlaces.onRendered(function() {
	var self = this;

	$(self.firstNode).find('.list-group.items-list:first').btsListFilter('.items-search', {
		itemChild: '.place-btn-name',
		loadingClass: 'loading-lg',
		sourceData: function(val, cb) {
			
			Meteor.subscribe('placesByName', val, function() {
				var items = _.map( K.findPlacesByName(val).fetch(), function(item) {
					return K.placeById(item._id);
				}); 
				cb(items);
			});
		},
		sourceNode: function(data) {
			var item$ = $('<div>');
			Blaze.renderWithData(Template.itemPlaceAdmin, data, item$[0]);
			return item$[0].firstChild;
		},
		cancelNode: function() {
			return self.$('.search-canc');
		}
	});
});

Template.itemPlaceAdmin_admin_btns.onRendered(function() {
	var self = this;
	self.$('.item-btn-del').btsConfirmButton(function(e) {
		e.stopPropagation();
		K.Admin.removePlace(self.data.id);
	});
});


/*Moved in plugin edit Place_edit.js Template.pageAdmin_admin_owner.helpers({
	owner: function() {
		return this.userId ? K.userById(this.userId) : {username: ''}
	}
});*/

Template.pageAdminPlace_admin_owner.onRendered(function() {

	var self = this,
		placeId = self.data.id,
		input$ = self.$('.input-owner');

	// https://github.com/twitter/typeahead.js
	input$.typeahead({
		limit: 1,
		minLength: 1,
		highlight: true,
		classNames: {
			suggestion:''
		},
	},
	{
		name: 'users',
		display: 'username',
		templates: {
			suggestion: function(u) {
				var div = $('<div>')[0];
				//return K.Util.tmpl('<a class="btn user-btn-name">{username}</a>',u);
				Blaze.renderWithData(Template.item_user, u, div);
				$(div).find('a').attr('href','#');
				return div;
			}
		},

		source: _.debounce(function(text, sync, cb) {
			
			if(!text.length) return [];

			Meteor.subscribe('usersByName', text, function() {
			
				var users = K.findUsersByName(text).fetch();
				
				cb(users);
			});

		}, 300)
	})
	.on('typeahead:select', function(e) {
		
		K.Admin.updatePlaceOwner(placeId, e.target.value);

		self.data.update();
	});
});