Router.map(function() {

	this.route('placesCats', {
		path: '/places/cat/:cat',
		template: 'panelList',
		layoutTemplate: 'layoutMap',
		waitOn: function() {
			Session.set('showSidebar', true);
			return Meteor.subscribe('placesByCategory', this.params.cat);
		},
		data: function() {
			if(!this.ready()) return null;
			
			var places = K.findPlacesByCategory(this.params.cat).fetch();

			return {
				title: i18n('title_cats_users', this.params.cat),
				className: 'placesCats',
				//headerTemplate: 'search_cats',
				itemsTemplate: 'item_place_search',
				items: _.map(places, function(place) {
					return K.placeById(place._id);
				})
			};
		}
	});

	this.route('usersCats', {
		path: '/users/cat/:cat',
		template: 'panelList',
		layoutTemplate: 'layoutMap',
		waitOn: function() {
			Session.set('showSidebar', true);
			return Meteor.subscribe('usersByCategory', this.params.cat);
		},
		data: function() {
			if(!this.ready()) return null;
			
			var users = K.findUsersByCategory(this.params.cat).fetch();

			return {
				title: i18n('title_cats_users', this.params.cat),
				className: 'usersCats',
				//headerTemplate: 'search_cats',
				itemsTemplate: 'item_user_search',
				items: _.map(users, function(user) {
					return K.userById(user._id);
				})
			};
		}
	});	
});